let t = {
  "data": [
    {
      "table": {
        "name": "leads",
        "properties": [
          { "column_name":"fid","nullable":"False","primary_key":true,"type":"INTEGER" },
          { "column_name":"project_title","nullable":"False","primary_key":false,"type":"TEXT" },
          { "column_name":"project_number","nullable":"False","primary_key":false,"type":"VARCHAR(255)" },
          { "column_name":"project_size","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"project_description","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"keyword","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"source","nullable":"False","primary_key":false,"type":"VARCHAR(255)" },
          { "column_name":"project_announced","nullable":"True","primary_key":false,"type":"VARCHAR(255)" },
          { "column_name":"tender_date","nullable":"True","primary_key":false,"type":"VARCHAR(255)" },
          { "column_name":"implementing_entity","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"project_pocs","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"post_comments","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"submitting_officer","nullable":"False","primary_key":false,"type":"VARCHAR(255)" },
          { "column_name":"submitting_officer_contact","nullable":"False","primary_key":false,"type":"TEXT" },
          { "column_name":"link_to_project","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"business_url","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"cleared","nullable":"True","primary_key":false,"type":"BOOLEAN" },
          { "column_name":"archived","nullable":"True","primary_key":false,"type":"BOOLEAN" },
          { "column_name":"auto_archive_date","nullable":"True","primary_key":false,"type":"DATE" },
          { "column_name":"the_geom","nullable":"True","primary_key":false,"type":"geometry(POINT,4326)" },
          { "column_name":"editable","nullable":"True","primary_key":false,"type":"BOOLEAN" },
          { "column_name":"locations","nullable":"True","primary_key":false,"type":"JSON" }
        ],
        "junctions": [
          { "column_name":"country_name","nullable":"True","primary_key":false,"type":"geometry(POINT,4326)" },
          { "column_name":"regions_name","nullable":"True","primary_key":false,"type":"BOOLEAN" },
        ],
        "rules": [
          {"oneOf": ["country_name","region_name"]}
        ]
      }
    }
  ]
  
}






export const schemaSamples = {
  "data": [
    {
      "table": {
        "table_name": "accounts", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "password", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "email", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "role", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "created_at", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TIMESTAMP WITH TIME ZONE"
          }, 
          {
            "column": "updated_at", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TIMESTAMP WITH TIME ZONE"
          }, 
          {
            "column": "verification_token", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "is_verified", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "BOOLEAN"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "countries", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "sovereignt", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "geounit", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "dos_region", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "iso_a2", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "iso_a3", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "website", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "feedback", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "feedback_type", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "feedback_results", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "created_at", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "TIMESTAMP WITH TIME ZONE"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "input_types", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "input_type_name", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "knex_migrations", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "name", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "batch", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "INTEGER"
          }, 
          {
            "column": "migration_time", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TIMESTAMP WITH TIME ZONE"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "leads", 
        "table_properties": [
          {
            "column": "fid", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "project_title", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "project_number", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "project_size", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "project_description", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "keyword", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "source", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "project_announced", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "DATE"
          }, 
          {
            "column": "tender_date", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "DATE"
          }, 
          {
            "column": "implementing_entity", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "project_pocs", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "post_comments", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "submitting_officer", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "submitting_officer_contact", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "link_to_project", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "business_url", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "cleared", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "BOOLEAN"
          }, 
          {
            "column": "archived", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "BOOLEAN"
          }, 
          {
            "column": "auto_archive_date", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "DATE"
          }, 
          {
            "column": "the_geom", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "geometry(POINT,4326)"
          }, 
          {
            "column": "editable", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "BOOLEAN"
          }, 
          {
            "column": "locations", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "JSON"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "option_groups", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "option_group_name", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "question_options", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "question_id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "INTEGER"
          }, 
          {
            "column": "option_choice_id", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "INTEGER"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "sectors", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "sector", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "session", 
        "table_properties": [
          {
            "column": "sid", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "sess", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "JSON"
          }, 
          {
            "column": "expire", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TIMESTAMP WITH TIME ZONE"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "spatial_ref_sys", 
        "table_properties": [
          {
            "column": "srid", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "auth_name", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(256)"
          }, 
          {
            "column": "auth_srid", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "INTEGER"
          }, 
          {
            "column": "srtext", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(2048)"
          }, 
          {
            "column": "proj4text", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(2048)"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "subscriptions", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "title", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "last_results_hash", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "frequency", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "INTEGER"
          }, 
          {
            "column": "contacted_at", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": false, 
            "type": "TIMESTAMP WITH TIME ZONE"
          }, 
          {
            "column": "email", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "filters", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "JSON"
          }, 
          {
            "column": "created_at", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TIMESTAMP WITH TIME ZONE"
          }, 
          {
            "column": "updated_at", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TIMESTAMP WITH TIME ZONE"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "option_choices", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "option_group_id", 
            "foreign_keys": [
              "option_groups.id"
            ], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "INTEGER"
          }, 
          {
            "column": "option_choice_name", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "questions", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "input_type_id", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "INTEGER"
          }, 
          {
            "column": "option_group_id", 
            "foreign_keys": [
              "option_groups.id"
            ], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "INTEGER"
          }, 
          {
            "column": "feedback_id", 
            "foreign_keys": [
              "feedback.id"
            ], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "INTEGER"
          }, 
          {
            "column": "question_name", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "question_text", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "question_description", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "VARCHAR(255)"
          }, 
          {
            "column": "question_required", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "BOOLEAN"
          }, 
          {
            "column": "answer_required", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "BOOLEAN"
          }
        ]
      }
    }, 
    {
      "table": {
        "table_name": "answers", 
        "table_properties": [
          {
            "column": "id", 
            "foreign_keys": [], 
            "nullable": "False", 
            "primary_key": true, 
            "type": "INTEGER"
          }, 
          {
            "column": "answer_text", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TEXT"
          }, 
          {
            "column": "question_id", 
            "foreign_keys": [
              "questions.id"
            ], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "INTEGER"
          }, 
          {
            "column": "feedback_result_id", 
            "foreign_keys": [
              "feedback_results.id"
            ], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "INTEGER"
          }, 
          {
            "column": "created_at", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TIMESTAMP WITH TIME ZONE"
          }, 
          {
            "column": "updated_at", 
            "foreign_keys": [], 
            "nullable": "True", 
            "primary_key": false, 
            "type": "TIMESTAMP WITH TIME ZONE"
          }
        ]
      }
    }
  ], 
  "description": "Successful Operation", 
  "status_code": 200
}







export const testFileData = [
  {"Field1": "sadf","Field2": 1,"Field3": 869,"Field4": 2,"Field5": 5,"Field6": 'false',"Field7": 54,"Field8": 23,},
  {"Field1": 61235,"Field2": 4784,"Field3": "","Field4": 2,"Field5": null,"Field6": 'false',"Field7": 54,"Field8": 324,},
  {"Field1": "fewq","Field2": 1,"Field3": 145,"Field4": 2,"Field5": 45,"Field6": 'True',"Field7": 54,"Field8": 54567,},
  {"Field1": 4,"Field2": 687,"Field3": "","Field4": 5213,"Field5": "","Field6": 'TRUE',"Field7": 54,"Field8": 324,},
  {"Field1": 356,"Field2": 6,"Field3": 145,"Field4":86,"Field5": 6,"Field6": 'false',"Field7": 54,"Field8": 896,},
  {"Field1": 125,"Field2": undefined,"Field3": 145,"Field4": 2,"Field5": 26,"Field6": 'TRUe',"Field7": 54,"Field8": 6,},
  {"Field1": "fqfewf","Field2": 1,"Field3": 32541,"Field4": "","Field5": 67734,"Field6": 'False',"Field7": 54,"Field8": 324,},
  {"Field1": 5,"Field2": 4578,"Field3": 145,"Field4": 2,"Field5": 833,"Field6": 'false',"Field7": 54,"Field8": 3124,},
  {"Field1": 25,"Field2": 1,"Field3": 145,"Field4": 2,"Field5": 4365,"Field6": 'false',"Field7": "","Field8": 24,},
  {"Field1": "/23'[],", "Field2": 687,"Field3": 515,"Field4": 5213,"Field5": 45123,"Field6": 'false',"Field7": 54,"Field8": 324,},
  {"Field1": 25,"Field2": 1,"Field3": 869,"Field4": 2,"Field5": 5,"Field6": 'true',"Field7": 54,"Field8": 23,},
  {"Field1": 325,"Field2": 1,"Field3": 145,"Field4": 2,"Field5": 45,"Field6": 24,"Field7": 54,"Field8": 54567,},
  {"Field1": 4,"Field2": 687,"Field3": 515,"Field4": 5213,"Field5": 45123,"Field6": 1234,"Field7": 54,"Field8": 324,},
  {"Field1": 356,"Field2": 6,"Field3": 145,"Field4":86,"Field5": 6,"Field6": 44,"Field7": 54,"Field8": 896,},
  {"Field1": 125,"Field2": 65,"Field3": 145,"Field4": 2,"Field5": 26,"Field6": 1234,"Field7": 54,"Field8": 6,},
  {"Field1": 25,"Field2": 1,"Field3": 869,"Field4": 2,"Field5": 5,"Field6": 345,"Field7": 54,"Field8": 23,},
  {"Field1": 125,"Field2": 65,"Field3": 145,"Field4": 2,"Field5": 26,"Field6": 1234,"Field7": 54,"Field8": 6,},
  {"Field1": 125,"Field2": 65,"Field3": 145,"Field4": 2,"Field5": 26,"Field6": 1234,"Field7": 54,"Field8": 6,},
  {"Field1": 65,"Field2": 1,"Field3": 32541,"Field4": 6458,"Field5": 67734,"Field6": 24,"Field7": 54,"Field8": 324,},
  {"Field1": 5,"Field2": 4578,"Field3": 145,"Field4": 2,"Field5": 833,"Field6": 6,"Field7": 54,"Field8": 3124,},
  {"Field1": 25,"Field2": 1,"Field3": 145,"Field4": 2,"Field5": 4365,"Field6": 1234,"Field7": 54,"Field8": 24,},
];