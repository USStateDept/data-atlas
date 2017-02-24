from flask_restful import Resource, request

from app.api import api
from app.api.controllers.upload import post_table
from app.helpers import api_response

# from app.data import bulk_upload


class Upload(Resource):
    """Upload Class is the Resource for uploading a data to a single table

    For a single table ingestion this will be a single controller call.

    For multiple tables in the ingestion JSON -- call ``upload.post_table``
    on each element in the ``multiple`` array from the JSON object.

    :extends Resource
    :returns: a JSON response
    """

    @api_response
    def post(self):
        json_data = request.get_json(force=True)

        response = []
        if 'multiple' in json_data:
            for table in json_data['multiple']:
                if 'table' in table and 'data' in table:
                    response.append(post_table(table))
                else:
                    return {
                        'error': 'You must specify a table with data to upload'
                    }
        else:
            if 'table' in json_data and 'data' in json_data:
                response = post_table(json_data)
            else:
                return {
                    'error': 'You must specify a table with data to upload'
                }

        if len(response) > 1:
            for res in response:
                if 'error' in res:
                    return {'error': response}
                else:
                    return {'created': response}
        else:
            return response


# Add resource endpoints here =================================================
api.add_resource(Upload, '/upload')
