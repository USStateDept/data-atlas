from flask_restful import Resource

from app.api import api
from app.api.controllers.schema import (
    get_single_table,
    get_tables,
)
from app.helpers import api_response


class Schema(Resource):
    """Schema Class is the Resource for a single table schema
    in a database

    :extends Resource
    :returns: a JSON response
    """

    @api_response
    def get(self, table_name):
        response = get_single_table(table_name)
        return response


class SchemaList(Resource):
    """SchemaList Class is the Resource for fetching all table schemas
    in a database

    :extends Resource
    :returns: a JSON response
    """

    @api_response
    def get(self):
        response = get_tables()
        return response


# Add resource endpoints here =================================================
api.add_resource(Schema, '/schema/<table_name>')
api.add_resource(SchemaList, '/schema')
