"""
Utility functions used throughout the application
"""
from flask_restful import abort


def abort_bad_endpoint():
    abort(404, message='That end point does not exist')


def abort_bad_upload_json():
    abort(404, message='You must specify a table with data to upload')


def abort_table_not_found(table_name):
    abort(404, message='Table >' + table_name + '< was not found')


def abort_column_not_found(column_name, table_name):
    return {'message': 'Column >' + column_name + '< was not found in >' + table_name + '<.'}


def abort_database_insert_error(row):
    abort(400, message='Insert error: failed at statement -->' + row)


# This function was written might be used for later date
#   Moved to utils for now
def get_sequence_names():
    """Return all of the columns that are associated with sequences so they
    will be sanity checked and will not allow for insertion

    :return: list of sequences associated with column_names
    """

    from sqlalchemy import text

    results = []

    sequences_info_sql = text('SELECT * FROM information_schema.sequences;')

    connection = db.engine.connect()

    try:

        db_output = connection.execute(sequences_info_sql)

        for row in db_output:
            results.append(row)

    except SQLAlchemyError as e:

        return {'selection_error': e}

    return results


# function to validate all the items in a list are equal
def validate_all_list_items(list):
    return all(x == list[0] for x in list)
