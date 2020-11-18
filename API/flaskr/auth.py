import functools
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import db_get
from flaskr.invalid_exception import InvalidUsage

bp = Blueprint('auth', __name__, url_prefix='/auth')

insertUserQuery = """INSERT INTO user (username, password) VALUES (?, ?);"""
validUser = """SELECT id FROM user WHERE username = ?;"""
verifyCredentials = """SELECT id, username, created, last_modified FROM user WHERE username = ? AND password = ?;"""

@bp.route('/register', methods=('POST',))
def register():
    if request.method == 'POST':

        body = eval(request.data)
        username = body['username']
        password = body['password']

        if not username:
            raise InvalidUsage('Username is required.')
        elif not password:
            raise InvalidUsage('Password is required.')

        db = db_get()
        if db.execute(validUser, (username,)).fetchone() is not None:
            db.close()
            raise InvalidUsage('User {} exists.'.format(username))
        else:
            db.execute(insertUserQuery, (username, password))
            user = db.execute(verifyCredentials, (username, password)).fetchone()

            db.commit()
            db.close()

            return {
                'id': user['id'],
                'username': user['username'],
                'created': user['created'],
                'last_modified': user['last_modified']
            }

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        data = eval(request.data)
        db = db_get()

        if (data['username'] and data['password']):
            user = db.execute(verifyCredentials, (data['username'], data['password'])).fetchone()
            db.close()

            if user is None:
                raise InvalidUsage('Invalid credentials.')

            return {
                'id': user['id'],
                'username': user['username'],
                'created': user['created'],
                'last_modified': user['last_modified']
            }

        elif not data['username']:
            raise InvalidUsage('username hasn\'t been provided')
        elif not data['password']:
            raise InvalidUsage('password hasn\'t been provided')
