import functools
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from flaskr.db import db_get
from flaskr.invalid_exception import InvalidUsage
import os

bp = Blueprint('profile', __name__, url_prefix='/')

upload = None

def setUpload(directory):
    global upload
    upload = directory

@bp.route('/profile', methods=('GET', 'POST'))
def profileEdit():
    if request.method == 'POST':
        body = request.form
        picture = request.files.get('profilePic')
        print(body)
        print(picture)
        for (key, val) in body.items():
            print('key='+key,' value='+val)
        print(picture)
        print(upload)
        resp = {'id': body.get('id')}
        db = db_get()
        usernameIdCheckQuery = """SELECT * FROM user WHERE id = ? AND username = ?;"""
        updateUsernameQuery = """UPDATE user SET username = ? WHERE id = ? AND username = ?;"""
        if len(db.execute(usernameIdCheckQuery, (body.get('id'), body.get('username'))).fetchall()) > 0:
            picture.save(os.path.join(upload, secure_filename(picture.filename)))
            if (body.get('updatedUsername') != None) and (len(body.get('updatedUsername')) >= 8) and (body.get('updatedUsername') != body.get('username')):
                print(db.execute(updateUsernameQuery, (body.get('updatedUsername'), body.get('id'), body.get('username'))).rowcount)
                resp['username'] = body.get('updatedUsername')
            else:
                resp['username'] = body.get('username')
        else:
            raise InvalidUsage('user does not exist')

        return resp
    elif request.method == 'GET':
        return {}
