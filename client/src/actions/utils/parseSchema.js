import _ from 'lodash';

export default class ParseSchema {
  constructor(data) {
    this.initialRead = data; 
    this.parsedData = {
      availableSchemas: []
    };
  }

  /**
   * 
   **/
  _parseDataFromSchemas() {
    let self = this;

    // use the first object to determine the headers
    self.parsedData.availableSchemas = self.initialRead.data
      .reduce( (newList,schema) => {
          newList = newList || [];
          schema = schema.table;
          newList.push({
            name: schema.table_name,
            properties: _.map(schema.table_properties, (prop) => {
              return Object.assign({}, prop, {
                fieldMapped: false,
                fieldMap: {},
                validating: false,
                validateFail: false,
                validatePass: false,
                validated: false,
                belongsTo: schema.table_name
              });
            }) 
          });
          return newList;
      }, [])
  }

  shapeSchemasAndRetrieve(){
    this._parseDataFromSchemas();

    return this.parsedData;
  }

} 