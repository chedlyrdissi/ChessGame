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

@bp.route('/active-games', methods=('GET', 'POST', 'PUT'))
def activeGames():
    print("active games")
    if request.method == 'POST':
        # create game
        return jsonify(username='some username', pw='some pw')
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
