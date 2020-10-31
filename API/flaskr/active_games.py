import functools
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import db_get

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

@bp.route('/active-games', methods=('GET', 'POST', 'PUT'))
def activeGames():
    print("active games")
    if request.method == 'POST':
        body = eval(request.data)

        # create game
        db = db_get()
        if('blackPlayer' in body):
            cursor = db.execute(createGameFullPlayers, (body['whitePlayer'], body['blackPlayer'], body['whitePlayer']))
        else:
            cursor = db.execute(createGamePartialPlayers, (body['whitePlayer'], body['whitePlayer']))
        gameId = cursor.lastrowid
        print(gameId)
        db.execute(initiateGamePieces, tuple([gameId for i in range(32)]))

        db.commit()
        db.close()

        return {'new_game_id': gameId, 'status': 'incomplete'}
    elif request.method == 'GET':
        resp = []
        for row in db_get().execute(getActiveGamesQuery).fetchall():
            resp.append({"id": row["id"], "whitePlayer": row["whitePlayer"], "blackPlayer": row["blackPlayer"], "creationDate": row["startTime"]})
        json = {"games": resp}
        return json
    elif request.method == 'PUT':
        # adding second player
        print("putting")
        body = eval(request.data)
        print(body)
        return {'status': 'ok'}
