import functools
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import db_get

bp = Blueprint('active_games', __name__, url_prefix='/')

@bp.route('/active-games', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        return jsonify(username='some username', pw='some pw')

    elif request.method == 'GET': # TODO remove
        resp = []
        resp.append({"id":"0", "whitePlayer":"white0", "blackPlayer":"black0"})
        resp.append({"id":"1", "whitePlayer":"white1", "blackPlayer":"black1"})
        resp.append({"id":"2", "whitePlayer":"white2", "blackPlayer":"black2"})
        resp.append({"id":"3", "whitePlayer":"white3", "blackPlayer":"black3"})

        json = {"games": resp}
        # for i in range(len(resp)):
        #     json[i] = resp[i]

        print(json)
        return json

