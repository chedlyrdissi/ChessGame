import sqlite3
import click
from flask import current_app, g
from flask.cli import with_appcontext

def db_get():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def db_close(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

# open_resource() opens a file relative to the flaskr package,
# which is useful since you won’t necessarily know where that location is
# when deploying the application later. db_get returns a database connection,
# which is used to execute the commands read from the file.
def db_execute(sqlfile):
    db = db_get()

    with current_app.open_resource(sqlfile) as f:
        db.executescript(f.read().decode('utf8'))

# click.command() defines a command line command called db-init
# that calls the db_init function and shows a success message to the user.
# You can read Command Line Interface to learn more about writing commands.
@click.command('db-init')
@with_appcontext
def db_init_command():
    """Clear the existing data and create new tables."""
    db_execute('schema.sql')
    click.echo('Initialized the database.')

@click.command('db-populate')
@with_appcontext
def db_populate_command():
    """Clear the existing data and create new tables."""
    db_execute('populate_dummy.sql')
    click.echo('Populated the database with dummy data.')


@click.command('db-drop')
@with_appcontext
def db_drop_command():
    """Clear the existing data and create new tables."""
    db_execute('drop_db.sql')
    click.echo('Dropped the database.')

def app_init(app):
    # app.teardown_appcontext() tells Flask to call that function when cleaning up after returning the response.
    app.teardown_appcontext(db_close)
    # app.cli.add_command() adds a new command that can be called with the flask command.
    app.cli.add_command(db_init_command)
    app.cli.add_command(db_drop_command)
    app.cli.add_command(db_populate_command)
