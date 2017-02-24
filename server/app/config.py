import os


class BaseConfig(object):
    """Base configuration."""
    APP_DIR = os.path.abspath(os.path.dirname(__file__))
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))

    ERROR_404_HELP = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://'
    # Be sure to have a SECRET_KEY environment variable in production
    SECRET_KEY = os.getenv(
        'SECRET_KEY',
        '1d94e52c-1c89-4515-b87a-f48cf3cb7f0b',
    )


class ProductionConfig(BaseConfig):
    """Production configuration."""
    ENV = 'production'
    DEBUG = False
    # Be sure to have a DATABASE_URL variable set in production environment
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '')


class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    ENV = 'development'
    DEBUG = True
    # Configure your env to have DATABASE_URL set locally or hard code it
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'postgresql://postgres@localhost/bulk_upload',
    )


class TestingConfig(BaseConfig):
    """Test configuration."""
    ENV = 'testing'
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'postgresql://postgres@localhost/bulk_upload',
    )
