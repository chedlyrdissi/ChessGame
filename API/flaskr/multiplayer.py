from flask import (
    Blueprint, flash, g, redirect, request, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import db_get,db_close

bp = Blueprint('multiplayer', __name__, url_prefix='/game')

getActiveGamesQuery = """
        SELECT ac.id,
               bu.username AS blackPlayer,
               wu.username AS whitePlayer,
               cu.username AS currentPlayer
        FROM active_game AS ac
        LEFT JOIN user wu ON ac.player_white_id = wu.id
        LEFT JOIN user bu ON ac.player_black_id = bu.id
        LEFT JOIN user cu ON ac.current_player = cu.id
        WHERE ac.id = ? ;"""

piecePositionQuery = "SELECT row, col, piece, color, first_move FROM piece_positions AS p WHERE p.game_id == ?"

updatePiece = """UPDATE piece_positions
                            SET row = ?, col = ?, first_move = false
                            WHERE game_id == ? AND piece == ? AND color == ? AND row = ? AND col = ?;"""

deletePiece = "DELETE FROM piece_positions WHERE game_id == ? AND row == ? AND col == ? AND piece != ? AND color != ? ;"

updateCurrentPlayer = """update active_game
                            SET current_player =
                            CASE    WHEN current_player == player_white_id THEN (SELECT player_black_id FROM active_game WHERE id = ?)
                                    WHEN current_player == player_black_id THEN (SELECT player_white_id FROM active_game WHERE id = ?)
                            END
                            WHERE id = ?;"""

@bp.route('/<gameId>', methods=('GET', 'POST'))
def gameMove(gameId):
    if request.method == 'POST':
        error = None
        body = eval(request.data)
        # after every move only 2 operations can be done
        # updating the movement of the moving piece
        # or
        # deleting a piece that has been destroyed
        # validate data

        db = db_get()
        db.execute(updatePiece, (body['row'], body['column'], gameId, body['piece'], body['color'], body['previous_row'], body['previous_col']))
        db.execute(deletePiece, (gameId, body['row'], body['column'], body['piece'], body['color']))
        db.execute(updateCurrentPlayer, (gameId, gameId, gameId))

        db.commit()

        try:
            resp = getBoardResponse(gameId, db)
        except Exception as e:
            error = e.args

        if error != None:
            flash(error)
        db_close()

        return resp

    elif request.method == 'GET':
        error = None
        db = db_get()
        try:
            resp = getBoardResponse(gameId, db)
        except Exception as e:
            error = e.args

        if error != None:
            flash(error)
        db_close()

        return resp

def getBoard(gameId, db):
    board = [[{}, {}, {}, {}, {}, {}, {}, {}],
             [{}, {}, {}, {}, {}, {}, {}, {}],
             [{}, {}, {}, {}, {}, {}, {}, {}],
             [{}, {}, {}, {}, {}, {}, {}, {}],
             [{}, {}, {}, {}, {}, {}, {}, {}],
             [{}, {}, {}, {}, {}, {}, {}, {}],
             [{}, {}, {}, {}, {}, {}, {}, {}],
             [{}, {}, {}, {}, {}, {}, {}, {}]]

    for pos in db.execute(piecePositionQuery, gameId).fetchall():
        board[pos['row']][pos['col']] = {'c': pos['color'], 'p': pos['piece'], 'f': pos['first_move'] == 1}

    return board

def getBoardResponse(gameId, db):
    activeGame = db.execute(getActiveGamesQuery, gameId).fetchone()

    if activeGame['id'] == None:
        raise Exception('game does not exist')
    elif (activeGame['whitePlayer'] == None) and (activeGame['whitePlayer'] == None) and (
            activeGame['currentPlayer'] == None):
        raise Exception('game data is corrupted')

    board = getBoard(gameId, db)

    return { 'id': activeGame['id'],
             'whitePlayer': activeGame['whitePlayer'],
             'blackPlayer': activeGame['blackPlayer'],
             'currentPlayer': activeGame['currentPlayer'],
             'board': board }