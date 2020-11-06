import functools
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import db_get
from flaskr.invalid_exception import InvalidUsage

bp = Blueprint('active_games', __name__, url_prefix='/')

getActiveGamesQuery = """SELECT ac.id,
                   wu.username AS whitePlayer,
                   bu.username AS blackPlayer,
                   cu.username AS currentPlayer,
                   ac.start_time AS startTime
                FROM active_game AS ac
                LEFT JOIN user AS wu ON wu.id = ac.player_white_id
                LEFT JOIN user AS bu ON bu.id = ac.player_black_id
                LEFT JOIN user AS cu ON cu.id = ac.current_player"""

createGameFullPlayers = """INSERT INTO active_game (player_white_id, player_black_id, current_player) VALUES (?,?,?);"""
createGamePartialPlayers = """INSERT INTO active_game (player_white_id, current_player) VALUES (?,?);"""
initiateGamePieces = """INSERT INTO piece_positions (game_id, row, col, piece, color) 
                            VALUES  (?,0,0,'rook', 'b'),(?,0,7,'rook', 'b'),
                                    (?,0,1,'knight', 'b'),(?,0,6,'knight', 'b'),
                                    (?,0,2,'bishop', 'b'),(?,0,5,'bishop', 'b'),
                                    (?,0,3,'queen', 'b'),(?,0,4,'king', 'b'),
                                    (?,1,0,'pawn', 'b'),(?,1,1,'pawn', 'b'),
                                    (?,1,2,'pawn', 'b'),(?,1,3,'pawn', 'b'),
                                    (?,1,4,'pawn', 'b'),(?,1,5,'pawn', 'b'),
                                    (?,1,6,'pawn', 'b'),(?,1,7,'pawn', 'b'),
                                    (?,7,0,'rook', 'w'),(?,7,7,'rook', 'w'),
                                    (?,7,1,'knight', 'w'),(?,7,6,'knight', 'w'),
                                    (?,7,2,'bishop', 'w'),(?,7,5,'bishop', 'w'),
                                    (?,7,3,'queen', 'w'),(?,7,4,'king', 'w'),
                                    (?,6,0,'pawn', 'w'),(?,6,1,'pawn', 'w'),
                                    (?,6,2,'pawn', 'w'),(?,6,3,'pawn', 'w'),
                                    (?,6,4,'pawn', 'w'),(?,6,5,'pawn', 'w'),
                                    (?,6,6,'pawn', 'w'),(?,6,7,'pawn', 'w');"""
getUserQuery = """SELECT * FROM user WHERE id = ?;"""
getGameQuery = """SELECT * FROM active_game WHERE id = ?;"""
joinGameQuery = """UPDATE active_game SET player_black_id = ? WHERE id = ? AND NOT (player_white_id = ?);"""
getEnnemyPlayersQuery = """SELECT id, username FROM user WHERE id <> ?"""

@bp.route('/active-games', methods=('GET', 'POST', 'PUT'))
def activeGames():
    if request.method == 'POST':
        # create game
        body = eval(request.data)
        print(body)
        db = db_get()
        if len(db.execute(getUserQuery, (body['id'],)).fetchall()) < 1:
            raise InvalidUsage('Creator does not exist', status_code=501)

        if "ennemyPlayer" in body:
            # full game
            if len(db.execute(getUserQuery, (body['ennemyPlayer'],)).fetchall()) < 1:
                # error = "ennemy player does not exist"
                raise InvalidUsage('ennemy player does not exist', status_code=502)
            else:
                cursor = db.execute(createGameFullPlayers, (body['id'], body['ennemyPlayer'], body['id']))
        else:
            # partial
            cursor = db.execute(createGamePartialPlayers, (body['id'], body['id']))

        gameId = cursor.lastrowid
        print(gameId)
        db.execute(initiateGamePieces, tuple([gameId for i in range(32)]))

        db.commit()
        db.close()

        return {'new_game_id': gameId, 'game_status': 1 if "ennemyPlayer" in body else 0}
    elif request.method == 'GET':
        resp = []
        for row in db_get().execute(getActiveGamesQuery).fetchall():
            resp.append({"id": row["id"], "whitePlayer": row["whitePlayer"], "blackPlayer": row["blackPlayer"], "creationDate": row["startTime"]})
        json = {"games": resp}
        return json
    elif request.method == 'PUT':
        # adding second player
        body = eval(request.data)
        print(body)
        db = db_get()

        if len(db.execute(getUserQuery, (body['id'],)).fetchall()) < 1:
            print('Player does not exist')
            raise InvalidUsage('Player does not exist', status_code=503)
        if len(db.execute(getGameQuery, (body['gameId'],)).fetchall()) < 1:
            print('Game does not exist')
            raise InvalidUsage('Game does not exist', status_code=504)

        cursor = db.execute(joinGameQuery, (body['id'], body['gameId'], body['id']))
        print(cursor.rowcount)
        db.commit()
        db.close()

        if cursor.rowcount < 1:
            raise InvalidUsage('Can\'t play online multiplayer alone', status_code=505)

        return {'gameId': body['gameId']}


@bp.route('/ennemy-players/<id>', methods=('GET',))
def ennemyPlayers(id):
    if request.method == 'GET':
        resp = []
        for row in db_get().execute(getEnnemyPlayersQuery, (id,)).fetchall():
            resp.append({"id": row["id"], "username": row["username"]})

        return {"ennemyPlayers": resp}
