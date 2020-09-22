to start the app:

For Linux and Mac:
$ export FLASK_APP=flaskr
$ export FLASK_ENV=development
$ flask run

For Windows cmd, use set instead of export:
> set FLASK_APP=flaskr
> set FLASK_ENV=development
> flask run

For Windows PowerShell, use $env: instead of export:
> $env:FLASK_APP = "flaskr"
> $env:FLASK_ENV = "development"
> flask run

To initialize db:
> flask db-init