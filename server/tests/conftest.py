import pytest

from app import create_app


# APP'S Specific JSON DATA ====================================================
# This is where you can create your pytest fixtures to test against...
# =============================================================================


@pytest.fixture(scope='module')
def app(request):
    """Creates a flask.Flask app with the 'development' config/context.
    :request: test request
    :returns: flask.Flask object
    """

    app = create_app()
    ctx = app.app_context()

    ctx.push()

    def tear_down():
        ctx.pop()

    request.addfinalizer(tear_down)
    return app


@pytest.fixture
def client(app):
    """Creates a flask.Flask test_client object
    :app: fixture that provided the flask.Flask app
    :returns: flask.Flask test_client object
    """

    return app.test_client()
