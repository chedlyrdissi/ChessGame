import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
# database
from . import db

# blueprints
from . import main
from . import auth
from . import multiplayer
from . import active_games
from . import finished_games
from . import profile

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
    app.register_blueprint(profile.bp)
    app.register_blueprint(active_games.bp)
    app.register_blueprint(finished_games.bp)
    app.register_blueprint(multiplayer.bp)

    # Create a directory in a known location to save files to.
    image_uploads_dir = os.path.join(app.instance_path, 'image_uploads')
    os.makedirs(image_uploads_dir, exist_ok=True)
    app.config["UPLOAD_FOLDER"] = image_uploads_dir
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

    profile.setUpload(image_uploads_dir)

    @app.errorhandler(InvalidUsage)
    def handle_invalid_usage(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    @app.route('/uploads/<path:filename>', methods=('GET',))
    def download_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

    return app