from sqlalchemy import *

# TODO allow for postgis fields (Geometry is needed for current test database)
from geoalchemy2 import Geometry

from app.extensions import db
from app.table_mappings import (
    junction_tables,
    mapping,
    plugins,
    hidden_plugin_fields,
    upload_tables,
)


def get_json_fields(table_name):
    """When given a table return the fields that are type JSON

    :param table_name: The table'name
    :type table_name: String
    :return: list of fields that are type JSON
    """
    metadata = MetaData()

    metadata.reflect(bind=db.engine)

    json_fields = []

    try:
        table = metadata.tables[table_name]

        for column in table.columns:
            if str(column.type) == 'JSON':
                json_fields.append(column.name)
            else:
                continue

        return json_fields

    except KeyError:
        return "That table does not exist in the database."


def get_primary_key(table_name):
    """When given a table return the primary key column name

    :param table_name: The table's name
    :type table_name: String
    :return: String
    """
    metadata = MetaData()

    metadata.reflect(bind=db.engine)

    try:
        table = metadata.tables[table_name]

        for column in table.columns:
            if column.primary_key:
                return str(column.name)
            else:
                continue

    except KeyError:
        return "That table does not exist in the database."


def get_table_headers(table_name):
    """Retrieve and return a single table's header names

    :param table_name: The table_name string to use
    :returns: list of Strings
    """
    if table_name in junction_tables:
        return {'error': 'The schema name you are wishing to GET is not valid'}

    metadata = MetaData()

    metadata.reflect(bind=db.engine)

    try:
        table = metadata.tables[table_name]

        headers = []

        for column in table.columns:
            headers.append(str(column.name))

        if len(headers) == 0:
            return {'error': 'The schema name you are wishing to GET is not valid'}

    except KeyError:
        return {'error': 'The schema name you are wishing to GET is not valid'}

    return headers


def get_single_table(table_name):
    """Retrieve and return a single table's schema

    :param table_name: The table_name string to use
    :returns: dictionary response
    """
    if table_name in junction_tables:
        return {'error': 'The schema name you are wishing to GET is not valid'}

    if table_name not in upload_tables:
        return {'error': 'The table name you are wishing to GET is not valid'}

    response = []
    junctions = {}
    external_plugins = []
    hidden_columns = []

    metadata = MetaData()

    metadata.reflect(bind=db.engine)

    try:
        table = metadata.tables[table_name]

        if table.name in mapping:

            require_key = 'required' in mapping[table.name]
            optional_key = 'not_required' in mapping[table.name]

            if require_key is True and optional_key is True:
                junctions = {
                    'trigger_table': table.name,
                    'required_fields': mapping[table.name]['required'],
                    'optional_fields': mapping[table.name]['not_required'],
                }
            elif require_key is True and optional_key is False:
                junctions = {
                    'trigger_table': table.name,
                    'required_fields': mapping[table.name]['required'],
                }

        if table.name in plugins:
            external_plugins.append(plugins[table.name])

        if table.name in hidden_plugin_fields:
            hidden_columns = hidden_plugin_fields[table.name]

        properties = []

        for column in table.columns:
            mappable = True
            foreign_keys = []

            if any(column.name in name for name in hidden_columns):
                mappable = False

            for key in column.foreign_keys:
                foreign_keys.append(key.target_fullname)

            properties.append({
                'mappable': mappable,
                'foreign_keys': foreign_keys,
                'primary_key': column.primary_key,
                'nullable': str(column.nullable),
                'type': str(column.type),
                'column': str(column.name)
            })

        if len(junctions) > 0 and len(external_plugins) > 0:

            response.append({
                'table': {
                    'plugins': external_plugins,
                    'junctions': junctions,
                    'table_properties': properties,
                    'table_name': table.name,
                }
            })

        elif len(junctions) > 0:

            response.append({
                'table': {
                    'junctions': junctions,
                    'table_properties': properties,
                    'table_name': table.name,
                }
            })

        else:

            response.append({
                'table': {
                    'table_properties': properties,
                    'table_name': table.name
                }
            })

    except KeyError:
        return {'error': 'The schema name you are wishing to GET is not valid'}

    return {'success': response}


def get_tables():
    """Retrieve and return all of a database's table-schema pairs

    :returns: dictionary response
    """

    tables = []
    mappings = []
    hidden_tables = []
    external_plugins = []
    tables_hidden_columns = []

    for table in mapping:

        require_key = 'required' in mapping[table]
        optional_key = 'not_required' in mapping[table]

        if require_key is True and optional_key is True:
            mappings.append({
                'trigger_table': table,
                'required_fields': mapping[table]['required'],
                'optional_fields': mapping[table]['not_required'],
            })
        elif require_key is True and optional_key is False:
            mappings.append({
                'trigger_table': table,
                'required_fields': mapping[table]['required'],
            })
        else:
            continue

        for junction_table in mapping[table]['junction_tables']:
            hidden_tables.append(junction_table)

    for table in plugins:
        external_plugins.append({
            'table': table,
            'plugins': plugins[table],
        })

    for table in hidden_plugin_fields:
        tables_hidden_columns.append({
            'table': table,
            'hidden_columns': hidden_plugin_fields[table],
        })

    metadata = MetaData()

    try:
        metadata.reflect(bind=db.engine)

        for table in metadata.sorted_tables:

            # Do not return the junction tables and their schemas
            if any(table.name == item for item in hidden_tables):
                continue

            # Do not return the table if it is not uploadable
            if table.name not in upload_tables:
                continue

            properties = []
            junctions = []
            table_plugins = []
            hidden_columns = []

            for mapped_table in mappings:
                if table.name in mapped_table['trigger_table']:
                    junctions = mapped_table

            for plugin in external_plugins:
                if table.name in plugin['table']:
                    table_plugins = plugin['plugins']

            for table_hidden_columns in tables_hidden_columns:
                if table.name in table_hidden_columns['table']:
                    hidden_columns = table_hidden_columns['hidden_columns']

            for column in table.columns:
                mappable = True
                foreign_keys = []

                if any(column.name in name for name in hidden_columns):
                    mappable = False

                for key in column.foreign_keys:
                    foreign_keys.append(key.target_fullname)

                properties.append({
                    'mappable': mappable,
                    'foreign_keys': foreign_keys,
                    'primary_key': column.primary_key,
                    'nullable': str(column.nullable),
                    'type': str(column.type),
                    'column': str(column.name)
                })

            if len(junctions) > 0 and len(table_plugins) > 0:

                tables.append({
                    'table': {
                        'plugins': table_plugins,
                        'junctions': junctions,
                        'table_properties': properties,
                        'table_name': table.name,
                    }
                })

            elif len(junctions) > 0:

                tables.append({
                    'table': {
                        'junctions': junctions,
                        'table_properties': properties,
                        'table_name': table.name,
                    }
                })

            else:

                tables.append({
                    'table': {
                        'table_properties': properties,
                        'table_name': table.name
                    }
                })

    except ConnectionError:
        return {'error': 'Database connection error check configurations'}

    return {'success': tables}
