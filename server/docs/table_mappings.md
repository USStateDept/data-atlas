# Table Mappings File

## Premise Behind Junction Mapping

As engineers we tackle all kinds of problems ranging from all types of industries and with that comes complex structures in our application and database layers.  With that in mind we are trying to hit on key features with our ingestion application as a whole. 

* We want to have the capability to configure and go
* With configuration setup we want to be able to allow for ingestion of simple data sets to map to a complex database structure
* Our main focus in the first release is to allow for junction tables and to ingest data into the backend to allow for multiple junction tables inserts
* The mapping structure we have lined out is not in it's final iteration 
    * We plan to build it out more efficiently in the future based on performance and efficiency
    
You can see an example table_mappings file [HERE](app/example_table_mappings.py) --> you must rename it to **_table_mappings.py_** and configure it to fit your schema.

## Future Iterations

* Having the capability for mapping of JOIN tables to a specific base (hooked) table for ingestion

## The Mapping Structure

```python
mapping = {
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
            'column_name',
        ],
        'not_required': [
            'column_name',
            'column_name',
        ],
        'selectors': {
            'column_name': 'select_table',
            'column_name': 'select_table',
            'column_name': 'select_table',
            'column_name': 'select_table',
        },
    },
}
```
---

* The `table_name` is the name of the table in the database that will "fire" so called junction inserts based on uploading data into it.

An example would be if an application has 'Books' and 'Authors'

When inserting a new 'Book' with it's information we want to map it to the 'Authors' that we already have in the database
        
---

* The `junction_tables` key is a specific **key** that is required for the upload process to parse correctly.
    * `junction_table_name` is the name of the **junction table** in the database.
          
An example would be an 'Authors-Books' junction table
 
This allows for foreign keys to map to both tables in a normalize fashion

---

* The `mapped_table` key is a specific **key** that is required for the upload process to parse correctly.
    * `table_name` is the name of the table in the database that is the side of the many-to-many relationship.
    
An example would be the 'Authors' table in the database for when we are ingesting data into 'Books'

---

* The `mapped_field` key is a specific **key** that is required for the upload process to parse correctly.
    * `column_name` is the name of the column in the `mapped_table` that we can uniquely `SELECT` data from.
    
An example would be from the 'Authors' table email so that we can uniquely identify the `id` for the row in the 'Authors' table

```sql
SELECT author_id FROM Authors WHERE email = 'some_email@datastructr.com'
```
---

* The `columns` key is a specific **key** that is required for the upload process to parse correctly.
    * `column_name` is the name of the column mapped in your `junction_table_name`.
        * `reference_table` is the name of the table in the database that the `column_name` is in.
        * `reference_column_name` is the name of the column in the `reference_table` you are referencing to for the _unique_ SELECT statement.

---

* The `required` key is a specific **key** that is required for the upload process to parse correctly.
    * `column_name` is the name of the columns you specify **MUST BE** required for a junction to be fired.
    
An example would be simply having the 'email' column required when ingesting 'Books' data.

We MUST have an Author to link to the Book, right?

---

* The `not_required` key is a specific **key** that is required for the upload process to parse correctly.
    * `column_name` is the name of the columns you specify **ARE NOT** required for a junction to be fired but can fire a junction insert.
    
An example would be mapping a 'Book' to a 'Language' that it was written in.

This information can be supplied but we do not necessarily NEED it when ingesting Book information.

---

* The `selectors` key is a specific **key** that is required for the upload process to parse correctly.
    * `column_name` is the name of the column in the `select_table` that must be **_unique_** to get a primary key back in the _SELECT_ statement.
    * `select_table` is the name of the table you are linking in your _many-to-many_ junction join.
    
An example of the column_name would be the 'email' column we had previously.

For the select_table we would have the 'Authors' table linked to our 'column_name'.
