import functools
from flask import (
    Blueprint, flash, g, redirect, request, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import db_get

bp = Blueprint('multiplayer', __name__, url_prefix='/game')

@bp.route('/<gameId>', methods=('GET', 'POST'))
def gameMove(gameId):
    if request.method == 'POST':
        # return jsonify(username='some username', pw='some pw')
        return {'status': 'not implemented'}
    elif request.method == 'GET':
        query = """
        SELECT ac.id,
               bu.username AS blackPlayer,
               wu.username AS whitePlayer,
               cu.username AS currentPlayer,
               ac.current_cell_row AS currentRow,
               ac.current_cell_column AS currentCol,
               ac.next_cell_row AS nextRow,
               ac.next_cell_column AS nextCol
        FROM active_game AS ac
        LEFT JOIN user wu ON ac.player_white_id = wu.id
        LEFT JOIN user bu ON ac.player_black_id = bu.id
        LEFT JOIN user cu ON ac.current_player = cu.id
        WHERE ac.id = ? ;"""

        error = None
        activeGame = db_get().execute(query, gameId).fetchone()
        if activeGame['id'] == None:
            error = 'game does not exist'
        elif (activeGame['whitePlayer'] == None) and (activeGame['whitePlayer'] == None) and (activeGame['currentPlayer'] == None):
            error = 'game data is corrupted'
        if error == None:
            flash(error)

        return { 'id': activeGame['id'],
                 'whitePlayer': activeGame['whitePlayer'],
                 'blackPlayer': activeGame['blackPlayer'],
                 'currentPlayer': activeGame['currentPlayer'],
                 'currentRow': activeGame['currentRow'] if activeGame['currentRow'] == None else 'null',
                 'currentCol': activeGame['currentCol'] if activeGame['currentCol'] == None else 'null',
                 'nextRow': activeGame['nextRow'] if activeGame['nextRow'] == None else 'null',
                 'nextCol': activeGame['nextCol'] if activeGame['nextCol'] == None else 'null'}
