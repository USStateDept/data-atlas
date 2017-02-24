# data-atlas' REST API

The main purpose for the _data-atlas_ API is to allow for a dynamic frontend client to interact with a powerful, yet lightweight, backend API.

The upload process will have capabilities to read and write to any schema that the API is configured with.

Based on shear fact that data ingestion, at it's core is a pain - we are out to solve a complex problem with a simple solution. The backend RESTful API will make for a fast and efficient way for client applications to send and receive data from multiple endpoints.

The backend upload process will ingestion data using **transactions** -- this is key in keeping data sets consistent with the potential ingestion data.  Once the data set is then cleaned for ingestion it will be process and ingested the proper way.

## Configurations

* Python 3.5+
* PostgreSQL

## Features

* Three Endpoints
    1. A specific table's schema - the _table_name_ passed through the URL
    2. A full database's schema (all tables with their unique schemas)
    3. A upload endpoint that will take a specifically structure JSON Object that will be sent through from the client application.

### Mapping Configurations

The key to the [**Mapping Configuration**](docs/table_mappings.md) settings is that as engineers we try and solve complex problems through data analysis and having tons of data we want to correctly map in the database this is key! We have the capabilities to logically and dynamically ingested "many-to-many" data sets through junction mapping configurations.

The concept of [**many-to-many**](https://en.wikipedia.org/wiki/Many-to-many_(data_model)) relationships can very powerful in specific use cases. We want to offer that ingestion integration we offer while still effectively allow for more advanced structured schemas.

## Future Iteration Features

- Allowing for multiple database connections
- Support JOIN table mappings
- Support MySQL/other databases
