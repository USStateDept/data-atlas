import _ from 'lodash';

export default class ParseCSV {
  constructor(data) {
    this.initialRead = data;
    this.parsedData = {
      tableData: [],
      headerData: []
    };
  }

  /**
   * 
   **/
  _parseDataFromLoadedCsv() {
    let self = this;
    let rowIndex = 0;

    // use the first object to determine the headers
    _.forIn(self.initialRead[0], (value,column) => {
      // create a header object
      self.parsedData.headerData[self.parsedData.headerData.length] = {
        id: column,
        rowIndex: rowIndex++,
        validated: false,
        validating: false,
        validatePass: false,
        validateFail: false,
        validateMessage: '',
        rowsPassedCount: 0,
        rowsPassedFailed: 0,
        valueDefinedType: '',
        headerDragging: false,
        headerMapped: false,
        allRulesFailed: [],
        headerMap: {},
      };
    });

    
    // restructure each table cell
    _.each(self.initialRead, (row,i) => {
      let columnIndex = 0;
      // init row map
      self.parsedData.tableData[self.parsedData.tableData.length] = [];
      // add cells to row
      _.forIn(row, (value, column) => {
        self.parsedData.tableData[i][self.parsedData.tableData[i].length] = {
          id: `c:${column}-r:${i}`,
          column: column,
          columnIndex: columnIndex++,
          row: i,
          rowIndex: i,
          value: value,
          validated: false,
          validating: false,
          validateFail: false,
          validatePass: false,
          validateMessage: '',
          contentEditing: false,
          rulesPassed: [],
          rulesFailed: []
        }
      });

      return self.parsedData.tableData;
    });
    
  }

  shapeCsvAndRetrieve(){
    this._parseDataFromLoadedCsv();

    return this.parsedData;
  }

} 