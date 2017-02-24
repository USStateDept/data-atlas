"""
This is where to create decorator functions to be used throughout the API.abs\

@author: Jordan Taylor
@github: jtaylor32
"""

import collections
import functools

from flask import jsonify


def api_response(function):
    """Decorator function that creates a standard API response

    :function: The dictionary returned will have a key-value pair from below
        success -> GET, 200
        error   -> Bad Request, 400
        created -> POST, 201
        updated -> PUT, 200
        deleted -> DELETE, 200
        no-data -> No Content, 204

    :returns: jsonify(response), status code
    """

    available_result_keys = [
        'success',
        'error',
        'created',
        'updated',
        'deleted',
        'no-data'
    ]

    status_code_and_descriptions = {
        'success': (200, 'Successful Operation'),
        'error': (400, 'Bad Request'),
        'created': (201, 'Successfully created'),
        'updated': (200, 'Successfully updated'),
        'deleted': (200, 'Successfully deleted'),
        'no-data': (204, '')
    }

    @functools.wraps(function)
    def make_response(*args, **kwargs):

        result = function(*args, **kwargs)

        if not set(available_result_keys) & set(result):
            raise ValueError('Invalid result key.')

        status_code, description = status_code_and_descriptions[
            next(iter(result.keys()))
        ]

        status_code = ('status_code', status_code)
        description = (
            ('description', description) if status_code[1] != 400 else
            ('error', description)
        )
        data = (
            ('data', next(iter(result.values()))) if status_code[1] != 204 else
            ('data', '')
        )

        return jsonify(collections.OrderedDict([
            status_code, description, data]))

    return make_response
