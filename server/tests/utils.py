def json_request(method, url, client, headers={}, data=None):
    """Executes json requests.

    :method: 'GET', 'POST', 'PUT' or 'DELETE' (case sensitive)
    :url: a string object (valid as url)
    :client: flask.Flask.test_client
    :headers: Optional headers.
        As default uses Content-Type: application/json
    :data: Optional data for POST or PUT requests
    :returns: the request response.
    """

    allowed_methods = {
        'GET': lambda: client.get(url, headers=headers),
        'POST': lambda: client.post(url, headers=headers, data=data),
        'PUT': lambda: client.put(url, headers=headers, data=data),
        'DELETE': lambda: client.delete(url, headers=headers),
    }

    if 'Content-Type' not in headers:
        headers.update({'Content-Type': 'application/json'})

    return allowed_methods[method]()
