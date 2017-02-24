import validator from 'validator';

const NUMBER  = 'number',
      BOOLEAN = 'boolean',
      DATE    = 'date',
      STRING  = 'string',
      OBJECT  = 'object',
      _NUMBER_    = () => { return {"type": NUMBER};},
      _BOOLEAN_   = () => { return {"type": BOOLEAN};},
      _DATE_      = () => { return {"type": DATE};},
      _TIMESTAMP_ = () => { return {"type": DATE};},
      _OBJECT_    = () => { return {"type": OBJECT};},
      _STRING_    = (limit) => { return {"type": STRING, "max": limit.max};};

function _determineRequired(field, schemaType) {
  switch(schemaType) {
    case "pg": 
      return field.nullable === "False" ? true : false;
    case "mysql": 
      return false;
    default:
      console.log("default switch executed, required check");
      return field.nullable === "True" ? true : false;
  }
}

function _matchPgType(type) {
  switch(type) {
    case "INTEGER":
      return _NUMBER_();
    case "VARCHAR(255)":
      return _STRING_({max:255});
    case "TEXT":
      return _STRING_({max:10000});
    case "BOOLEAN":
      return _BOOLEAN_();
    case "DATE":
      return _DATE_();
      // TODO VALIDATION
    case "JSON":
      return _OBJECT_();
    default:
      return null;
  }
}

function _determineTypeMatch(field, schemaType) {
  switch(schemaType) {
    case "pg": 
      return _matchPgType(field.type);
    case "mysql": 
      return "null";
    default:
      console.log("default switch executed, required check");
      return _matchPgType(field.type);
  }
}

function getGeneratedRules(field, schemaType) {
  let rules = [];
  schemaType = schemaType ? schemaType : "pg";
  // take field and generate some rules

  // required field
  if(_determineRequired(field, schemaType)) {
    rules.push({"check": 'required'});
  }

  // determine type required
  rules.push({"check": 'dataType', "dataType": _determineTypeMatch(field, schemaType)}); 
  
  return rules;
}

function _validateOrConvertDataType(cell, dataType) {
  
  // TODO
  function validateString(value) {
    return {"valid":true};
  }

  function validateNumber(val) {
    let value = validator
                  .escape(validator
                  .trim(val))
    
    if(!validator.isInt(value) && !validator.isFloat(value)) {

      return {"valid":false, "message": `Field ${cell.get('column')} is not in a proper number format`}
    } else {
      return {"valid":true};
    }
  }

  function validateBoolean(val) {
    let value = validator
                  .escape(validator
                  .trim(val))

    if(!validator.isBoolean(value)) {
      return {"valid":false, "message": `Field ${cell.get('column')} is not in a proper boolean`}
    } else {
      return {"valid":true};
    }
  }

  let value = '' + cell.get('value');

  switch(dataType.type) {
    case NUMBER:
      return validateNumber(value);
    case STRING: 
      return validateString(value);
    case BOOLEAN:
      return validateBoolean(value);
    default:
      return {"valid":true};
  }
}

function _validateRequired(cell) {
  if(!cell.get('value') || typeof(cell.get('value')) === undefined || cell.get('value') === null || validator.isEmpty('' + cell.get('value'))) {
    return {"valid": false, "message": `Field ${cell.column} is required, please insert a value`};
  } else {
    return {"valid": true}
  }
}

function checkPassRule(cell, rule) {
  switch(rule.check) {
    case 'required':
      return _validateRequired(cell);
    case 'dataType':
      return _validateOrConvertDataType(cell, rule.dataType);
    default:
      console.log("default switch executed, check pass rule");
      return null;
  }
}


export default {
 getGeneratedRules,
 checkPassRule
};