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

usernameIdCheckQuery = """SELECT * FROM user WHERE id = ? AND username = ?;"""
idCheckQuery = """SELECT * FROM user WHERE id = ?;"""
updateUsernameQuery = """UPDATE user SET username = ? WHERE id = ? AND username = ?;"""

def setUpload(directory):
    global upload
    upload = directory

def allowedFile(file=None):
    ALLOWEDFILETYPES = ('image/jpeg')
    return file.content_type in ALLOWEDFILETYPES

@bp.route('/profile', methods=('GET', 'POST'))
def profileEdit():
    if request.method == 'POST':
        body = request.form.to_dict()
        body['id'] = request.args.get('id')

        picture = request.files.get('profilePic')
        if not allowedFile(picture):
            raise InvalidUsage('Image type not allowed, please send an jpeg')

        resp = {'id': body.get('id')}
        db = db_get()
        if len(db.execute(usernameIdCheckQuery, (body.get('id'), body.get('username'))).fetchall()) > 0:
            picture.save(os.path.join(upload, secure_filename(picture.filename)))
            if (body.get('updatedUsername') != None) and (len(body.get('updatedUsername')) >= 8) and (body.get('updatedUsername') != body.get('username')):
                print(db.execute(updateUsernameQuery, (body.get('updatedUsername'), body.get('id'), body.get('username'))).rowcount)
                resp['username'] = body.get('updatedUsername')
            else:
                resp['username'] = body.get('username')
        else:
            raise InvalidUsage('user does not exist')

        resp['picturePath'] = "{0}.jpeg".format(body['id'])
        return resp

    elif request.method == 'GET':
        body = request.args
        if not 'id' in body:
            raise InvalidUsage('user not provided')
        db = db_get()
        queryRes = db.execute(idCheckQuery, (body['id'],)).fetchall()
        if len(queryRes) == 1:
            return {'picturePath': "{0}.jpeg".format(body['id']), 'username': queryRes[0]['username'], 'id': body['id']}
        else:
            raise InvalidUsage('user does not exist')
