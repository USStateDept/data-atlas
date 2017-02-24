import json
import pytest
from flask import url_for

from app.api.controllers import schema
from tests.utils import json_request


# def test_get_json_fields():
#     output = ['locations']
#     table_name = 'leads'
#     assert schema.get_json_fields(table_name) == output


# def test_upload_api_endpoint(accept_json, client):
#     res = client.get(url_for('api.upload'), headers=accept_json)
#     assert res.mimetype == 'application/json'


# def test_schema_api_endpoint(accept_json, client):
#     res = client.get(url_for('api.schemalist'), headers=accept_json)
#     assert res.mimetype == 'application/json'


@pytest.mark.parametrize('http_method, http_path', (
    ('GET', '/api/v1/schema'),
    ('GET', '/api/v1/schema/leads'),
    ('POST', '/api/v1/upload'),
))
def test_endpoints_mimetypes(http_method, http_path, client):
    res = client.open(method=http_method, path=http_path)
    assert res.mimetype == 'application/json'


@pytest.mark.parametrize('http_method, http_path', (
    ('GET', '/api/v1/schema'),
    ('GET', '/api/v1/schema/countries'),
    ('GET', '/api/v1/schema/leads'),
    ('GET', '/api/v1/schema/sectors'),
    ('GET', '/api/v1/schema/tests'),
))
def test_endpoints_200_status_codes(http_method, http_path, client):
    res = client.open(method=http_method, path=http_path)
    assert res.status_code == 200


@pytest.mark.parametrize('http_method, http_path', (
    ('GET', '/api/v1/schema/notreal1'),
    ('GET', '/api/v1/schema/notreal2'),
    ('GET', '/api/v1/schema/notreal3'),
))
def test_400_get_request(http_method, http_path, client):
    response = json_request(method=http_method, url=http_path, client=client)
    response = json.loads(response.data.decode('utf-8'))

    expected = {
        'status_code': 400,
        'data': 'The table name you are wishing to GET is not valid',
        'error': 'Bad Request',
    }

    assert sorted(response.items()) == sorted(expected.items())


@pytest.mark.parametrize('http_method, http_path', (
    ('GET', '/api/v1/schema'),
    ('GET', '/api/v1/schema/leads'),
))
def test_200_get_request(http_method, http_path, client):
    response = json_request(method=http_method, url=http_path, client=client)
    response = json.loads(response.data.decode('utf-8'))

    assert response['status_code'] == 200
    assert response['description'] == 'Successful Operation'


def test_get_primary_key():
    account_id = schema.get_primary_key('accounts')
    lead_id = schema.get_primary_key('leads')
    no_id = schema.get_primary_key('no_table')
    null_id = schema.get_primary_key('')

    assert account_id == 'id'
    assert lead_id == 'fid'
    assert no_id == 'That table does not exist in the database.'
    assert null_id == 'That table does not exist in the database.'


def test_get_table_headers():
    account_columns = [
        'id', 'password', 'email',
        'role', 'created_at', 'updated_at',
        'verification_token', 'is_verified',
    ]
    account_headers = schema.get_table_headers('accounts')

    lead_columns = [
        'fid', 'project_title', 'project_number',
        'project_size', 'project_description', 'locations',
    ]
    lead_headers = schema.get_table_headers('leads')

    no_headers = schema.get_table_headers('no_table')

    no_junction_headers = schema.get_table_headers('leads_countries')

    assert sorted(account_headers) == sorted(account_columns)
    assert sorted(lead_headers) == sorted(lead_columns)
    assert no_headers == {'error': 'The schema name you are wishing to GET is not valid'}
    assert no_junction_headers == {'error': 'The schema name you are wishing to GET is not valid'}
