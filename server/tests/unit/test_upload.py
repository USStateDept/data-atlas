"""
Unit tests for controllers/upload.py

TODO: some of the function connect to databases
    ( so implement spin up/tear down function ) for later database tests
"""
from app.api.controllers import upload


# def test_check_json_type():



def test_create_abstract_junction_insert():
    one = 'INSERT INTO leads_countries(lead_fid, country_id)' \
          'VALUES (:lead_fid, :country_id)'
    two = 'INSERT INTO leads_countries(country_id, lead_fid)' \
          'VALUES (:country_id, :lead_fid)'

    assert upload.create_abstract_junction_insert('leads', 'leads_countries') == one \
        or upload.create_abstract_junction_insert('leads', 'leads_countries') == two


def test_validate_junction_data(valid_data_json):
    """Testing out validate_junction_data method this is supposed to return a
    Boolean True or an error message
    """
    # TODO flush out better tests for this method
    assert upload.validate_junction_data('leads', valid_data_json) is True


def test_check_data_columns():
    """Testing out check_data_columns method this is supposed to return a new
    dictionary that has values for all the elements in a list

    The new dictionary will have elements from the list as it's keys if there
    is key missing from the dictionary
    """
    row_dict = {
        "one": "value_one",
        "two": "value_two",
    }

    columns = ['one', 'two', 'three']

    result_dict = {
        "one": "value_one",
        "two": "value_two",
        "three": None,
    }

    assert upload.check_data_columns(columns, row_dict) == \
        result_dict
    # Make abstract assertion error here for future pushes
    # assert upload.check_data_columns(columns, row_dict) != \
    #     row_dict, "Missing another key-value pair"


def test_get_data_columns(valid_data_json):
    """Testing out get_data_columns method this is supposed to return a list of
    elements that are all the keys in a dictionary or JSON Object
    """
    lead_columns = [
        'project_title',
        'project_number',
        'project_size',
        'project_description',
        'country_name',
        'sector',
        'test_name',
    ]

    # Test made up list and list of dicts =====================================
    list_one = [
        'one',
        'two',
        'three',
    ]

    one_object = [
        {
            'one': 'one',
            'two': 'two',
            'three': 'three',
        },
        {
            'one': 'one',
            'three': 'three',
        },
    ]
    # =========================================================================

    assert set(upload.get_data_columns(valid_data_json)) == \
        set(lead_columns)
    assert set(upload.get_data_columns(one_object)) == \
        set(list_one)


def test_get_hooked_table_id():
    """Testing out get_hooked_table_id method this is supposed to return a
    String of the columns name that references the first parameter's FK column
    name
    """

    # test BIDS mapping data -> must return ``fid`` (fk from the leads table)
    assert upload.get_hooked_table_id('leads', 'leads_countries') == \
        'fid'
    assert upload.get_hooked_table_id('leads', 'leads_tests') == \
        'fid'
    assert upload.get_hooked_table_id('leads', 'leads_sectors') == \
        'fid'
    assert upload.get_hooked_table_id('leads', 'table_not_there') == \
        {'error':
            'Mapping configuration error. Missing the junction table: table_not_there'}


def test_create_abstract_insert():
    table_json = {
        'one': 'one',
        'two': 'two',
    }

    table_insert_one = 'INSERT INTO table(one, two) ' \
                   'VALUES (:one, :two) RETURNING fid'
    table_insert_two = 'INSERT INTO table(two, one) ' \
                   'VALUES (:two, :one) RETURNING fid'

    no_return_insert_one = 'INSERT INTO table(one, two) ' \
                       'VALUES (:one, :two)'
    no_return_insert_two = 'INSERT INTO table(two, one) ' \
                       'VALUES (:two, :one)'

    assert upload.create_abstract_insert('table', table_json, 'fid') == table_insert_one \
        or upload.create_abstract_insert('table', table_json, 'fid') == table_insert_two
    assert upload.create_abstract_insert('table', table_json) == no_return_insert_one \
        or upload.create_abstract_insert('table', table_json) == no_return_insert_two


def test_post_table():
    """Testing out the else constraints on post_table method
    """

    # no ``table`` key in JSON
    bad_table = {
        "no_table_key": "",
    }
    # no ``data`` key in JSON
    bad_data = {
        "table": "table",
        "no_data_key": "",
    }
    # no table String in JSON
    no_table = {
        "table": "",
    }
    # no data values in JSON
    no_data = {
        "table": "some_table",
        "data": "",
    }

    # json tests
    assert upload.post_table(bad_table) == \
        {'error': 'You must have the \'table\' key in your JSON object'}
    assert upload.post_table(bad_data) == \
        {'error': 'You must have the \'data\' key in your JSON object'}
    assert upload.post_table(no_table) == \
        {'error': 'You must specify a table with data to upload'}
    assert upload.post_table(no_data) == \
        {'error': 'You must enter data allocated with your table'}
