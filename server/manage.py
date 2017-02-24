"""
This is where you manage your API application.

In development settings you can start the API with the runserver command.

    python manage.py runserver

In production settings you must deploy it with the gunicorn command.

    gunicorn manage:app

@author: Jordan Taylor
@github: jtaylor32
"""

import os
from flask_script import Manager, Shell, Server

from app import create_app
from app.extensions import db

app = create_app()

manager = Manager(app)


def _make_context():
    """Return context dict for a shell session so you can access
    app, db, and the User model by default.
    """
    return {'app': app, 'db': db}

#  access python shell with context
manager.add_command(
    'shell',
    Shell(make_context=_make_context)
)

# run the application
manager.add_command(
    'runserver',
    Server(port=(os.getenv('FLASK_PORT') or 5000), host='0.0.0.0')
)


if __name__ == '__main__':
    manager.run()
