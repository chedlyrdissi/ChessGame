import functools
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify, json
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import db_get

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':

        username = request.form['username']
        password = request.form['password']
        db = db_get()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif db.execute(
            'SELECT id FROM user WHERE username = ?', (username,)
        ).fetchone() is not None:
            error = 'User {} is already registered.'.format(username)

        if error is None:
            db.execute(
                'INSERT INTO user (username, password) VALUES (?, ?)',
                (username, generate_password_hash(password))
            )
            db.commit()
            return redirect(url_for('auth.login'))

        flash(error)
        return jsonify(username='some username', pw='some pw')

    elif request.method == 'GET': # TODO remove
        print(request.query_string)
        return request.query_string


@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        data = eval(request.data)

        db = db_get()
        error = None

        if (data['username'] and data['password']):
            user = db.execute(
                'SELECT id, username, created, last_modified FROM user WHERE username = ? AND password = ?;', (data['username'], data['password'])
            ).fetchone()

            if user is None:
                error = 'Invalid credentials.'

            if error is None:
                return {
                    'id': user['id'],
                    'username': user['username'],
                    'created': user['created'],
                    'last_modified': user['last_modified']
                }

        elif not data['username']:
            error = 'username hasn\'t been provided'
        elif not data['password']:
            error = 'password hasn\'t been provided'

        flash(error)
    return ""