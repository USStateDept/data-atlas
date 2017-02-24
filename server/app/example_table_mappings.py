"""This file will establish the mapping of columns in tables to other tables
and their foreign key constraints

If you have junction tables that are populated based on foreign keys this is
where you will create your mappings

This mapping created the junctions throughout your backend system effectively
so you have nothing other than configure and GO => => =>
"""

'''
junction_tables
:type: list
:elements: type: String the junction table names in your schema
'''
junction_tables = [
    'books_authors',
    'books_languages',
    'books_versions',
]


'''
Mapping structure...

    'table_name': {
        'junction_tables': {
            'junction_table_name': {
                'mapped_table': 'table_name',
                'mapped_field': 'column_name',
                'columns': {
                    'column_name': {
                        'reference_table': 'reference_column_name',
                    },
                    'column_name': {
                        'reference_table': 'reference_column_name',
                    }
                },
            },
        },
        'required': [
            'column_name',
            ...
        ],
        'not_required': [
            'column_name',
            ...
        ],
        'selectors': {
            'column_name': 'select_table',
            ...
        }
    ...
    }

    'table_name'            => the KEY REQUIRED for the uploader to work
        'ingest_table_name' => the name of the table that will fire the
            junction aggregation

    'junction_tables'       => the KEY REQUIRED for the uploader to work
        'junction_table_name'
                            => the name of the table in the database that is
                               your junction table

    'mapped_table'          => the KEY REQUIRED for the uploader to work
        'table_name'        => the name of the table you have the many to many
            relationship with (selectors column's table)

    'mapped_field'          => the KEY REQUIRED for the uploader to work
        'column_name'       => the name of the primary key column you will be
            fetching from the 'mapped_table'

    'columns'               => the KEY REQUIRED for the uploader to work
        'column_name'       => the name of the column mapped in your
            junction table
        'reference_table'   => the name of the table the column_name is
            referencing
        'reference_column_name'
                            => the name of the column in the reference_table
                               mapping to the column_name

    'required'              => the KEY REQUIRED for the uploader to work
        'column_name'       => this is the column name of the required
            junctions to fire when uploading data to them

    'not_required'          => the KEY REQUIRED for the uploader to work
        'column_name'       => this is the column name of the optional
            junctions calls when uploading data

    'selectors'             => the KEY REQUIRED for the uploader to work
        'column_name'       => the name of the column in the 'select_table'
            that must be unique to get a primary key back with
        'select_table'      => the name of the table you are firing a junction
            aggregation with


    ===========================================================================
    NOTE: Think of the 'columns' like describing the junction table's schema ==
    ===========================================================================
'''
mapping = {
    'books': {
        'junction_tables': {
            'books_authors': {
                'mapped_table': 'authors',
                'mapped_field': 'id',
                'columns': {
                    'book_id': {
                        'books': 'id',
                    },
                    'author_id': {
                        'authors': 'id',
                    }
                },
            },
            'books_languages': {
                'mapped_table': 'languages',
                'mapped_field': 'id',
                'columns': {
                    'book_id': {
                        'books': 'id',
                    },
                    'language_id': {
                        'languages': 'id',
                    }
                },
            },
            'books_versions': {
                'mapped_table': 'versions',
                'mapped_field': 'id',
                'columns': {
                    'book_id': {
                        'books': 'id',
                    },
                    'version_id': {
                        'versions': 'id',
                    }
                },
            },
        },
        'required': [
            'author_email',
        ],
        'not_required': [
            'language_name',
            'version_number',
        ],
        'selectors': {
            'author_email': 'books_authors',
            'language_name': 'books_languages',
            'version_number': 'books_versions',
        }
    }
}


'''
The plugins are for external api calls for the front end to be told to use

The first key in the dictionary is the ``name`` of the table that will be
triggering the plugin call.

Note within the table's ``name`` list you will have dictionary(ies) of
key-value pairs for linking a ``plugin`` with the appropriate ``value``
to append to the plugin (API) calls.

Within the ``value`` of the plugin you will have two specific KEYS required
for the mappings ...
    'query_params'  => These are the required params you are passing into the
        external API
    'mapped_fields' => These are the fields in the database you are mapping to
        (the client will need to handle this passing of data)

This is strictly to notify the front end with external calls to request and
append to their data sets they want to ingest.
'''
plugins = {
    'books': [
        {
            'amazon_books_api': {
                'query_params': ['author_name', ],
                'mapped_fields': ['other_books', ]
            },
        },
    ],
}


'''
The hidden plugin fields will make sure the client knows you cannot map data
to these fields.

They will be linked to external API calls the client handles.
'''
hidden_plugin_fields = {
    'leads': ['locations', ]
}
