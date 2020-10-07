import functools
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import db_get

bp = Blueprint('finished_games', __name__, url_prefix='/')

getFinishedGamesQuery = """
    select fg.id,
       wu.username as whitePlayer,
       bu.username as blackPlayer,
       w.username as winner,
       fg.start_time as startTime,
       fg.end_time as finishTime
    from finished_game as fg
    left join user as wu on wu.id = fg.player_white_id
    left join user as bu on bu.id = fg.player_black_id
    left join user as w on w.id = fg.winner"""

@bp.route('/finished-games', methods=('GET', 'POST', 'PUT'))
def finishedGames():
    if request.method == 'POST':
        # create game
        return jsonify(username='some username', pw='some pw')
    elif request.method == 'GET':
        resp = []
        for row in db_get().execute(getFinishedGamesQuery).fetchall():
            resp.append({"id": row["id"], "whitePlayer": row["whitePlayer"], "blackPlayer": row["blackPlayer"], "winner": row["winner"], "start": row["startTime"], "finish": row["finishTime"]})

        return {"games": resp}
    elif request.method == 'PUT':
        # adding second player
        print("putting")
        body = eval(request.data)
        print(body)
        return {'status': 'ok'}
