import functools
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import db_get
from flaskr.invalid_exception import InvalidUsage

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

deleteBoardQuery = """DELETE FROM piece_positions WHERE game_id = ?;"""
insertFinishedGameQuery = """INSERT INTO finished_game (game_id, player_white_id, player_black_id, winner, start_time, end_time) SELECT ac.id, ac.player_white_id, ac.player_black_id, ac.current_player, ac.start_time, CURRENT_TIMESTAMP FROM active_game AS ac WHERE ac.id = ?;"""
deleteActiveGameQuery = """DELETE FROM active_game WHERE id = ?;"""
checkActiveGameId = """SELECT * FROM active_game WHERE id = ?;"""

@bp.route('/finished-games', methods=('GET', 'POST'))
def finishedGames():
    if request.method == 'POST':
        # end game
        body = eval(request.data)
        if not 'id' in body:
            raise InvalidUsage('Game Id not provided', status_code=507)
        error = None
        db = db_get()
        if len(db.execute(checkActiveGameId, (body['id'],)).fetchall()) < 1:
            error = 'Game Does not exist'
        else:
            db.execute(deleteBoardQuery, (body['id'],))
            cursor = db.execute(insertFinishedGameQuery, (body['id'],))
            db.execute(deleteActiveGameQuery, (body['id'],))

        db.commit()
        db.close()

        if error == None:
            return {'gameId': cursor.lastrowid}
        else:
            raise InvalidUsage(error, status_code=508)

    elif request.method == 'GET':
        resp = []
        for row in db_get().execute(getFinishedGamesQuery).fetchall():
            resp.append({"id": row["id"], "whitePlayer": row["whitePlayer"], "blackPlayer": row["blackPlayer"], "winner": row["winner"], "start": row["startTime"], "finish": row["finishTime"]})

        return {"games": resp}
