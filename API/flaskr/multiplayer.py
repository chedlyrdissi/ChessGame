from flask import (
    Blueprint, flash, g, redirect, request, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import db_get

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
                            SET row = ?, col = ?, first_move = ?
                            WHERE game_id == ? AND piece == ? AND color == ?;"""

deletePiece = "DELETE FROM piece_positions WHERE game_id == ? AND piece == ? AND color == ?;"

getPiece = "SELECT id FROM piece_positions WHERE game_id == ? AND col == ? AND row == ?"

@bp.route('/<gameId>', methods=('GET', 'POST'))
def gameMove(gameId):
    if request.method == 'POST':
        body = eval(request.data)
        # print('something' in body)
        print(body)
        # after every move only 2 operations can be done
        # updating the movement of the moving piece
        # or
        # deleting a piece that has been destroyed

        # validate data

        # get piece
        db = db_get()
        piece = db.execute(getPiece, gameId, body['row'], body['col']).fetchone()

        if piece != None:
            db.execute(deletePiece, gameId, body['piece'], body['color'])

        db.execute(updatePiece, body['row'], body['col'], body['first_move'] == 'true', gameId, body['piece'], body['color'])

        return {'status': 'not implemented'}
    elif request.method == 'GET':
        error = None
        db = db_get()
        activeGame = db.execute(getActiveGamesQuery, gameId).fetchone()

        if activeGame['id'] == None:
            error = 'game does not exist'
        elif (activeGame['whitePlayer'] == None) and (activeGame['whitePlayer'] == None) and (activeGame['currentPlayer'] == None):
            error = 'game data is corrupted'

        if error != None:
            flash(error)

        board = getBoard(gameId, db)

        return { 'id': activeGame['id'],
                 'whitePlayer': activeGame['whitePlayer'],
                 'blackPlayer': activeGame['blackPlayer'],
                 'currentPlayer': activeGame['currentPlayer'],
                 'board': board}

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