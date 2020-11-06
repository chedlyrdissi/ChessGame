import os
from flask import Flask, jsonify
from flask_cors import CORS
# database
from . import db

# blueprints
from . import main
from . import auth
from . import multiplayer
from . import active_games
from . import finished_games

# error handler
from flaskr.invalid_exception import InvalidUsage

# tuto: https://flask.palletsprojects.com/en/1.1.x/tutorial/database/

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    # TODO to be changed to firebase, or not

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    db.app_init(app)
    # registering the blueprints aka routes
    app.register_blueprint(main.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(active_games.bp)
    app.register_blueprint(finished_games.bp)
    app.register_blueprint(multiplayer.bp)

    @app.errorhandler(InvalidUsage)
    def handle_invalid_usage(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    return app