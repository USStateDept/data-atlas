import ParseSchema from './utils/parseSchema';

export const GET_SCHEMAS = 'GET_SCHEMAS';
export const GET_SCHEMAS_SUCCESS = 'GET_SCHEMAS_SUCCESS';
export const GET_SCHEMAS_FAILED = 'GET_SCHEMAS_FAILED';

function dispatchGetSchemas() {
  return {
    type: GET_SCHEMAS
  };
}

function dispatchGetSchemasSuccess(schemaData) {
  return {
    type: GET_SCHEMAS_SUCCESS,
    schemaData: schemaData
  };
}

function dispatchGetSchemasFailed(message) {
  return {
    type: GET_SCHEMAS_FAILED,
    errorMessage: message
  };
}

export const OPEN_SCHEMA = 'OPEN_SCHEMA';
export const CLOSE_SCHEMA = 'CLOSE_SCHEMA';

export function dispatchOpenSchema(key) {
  return {
    type: OPEN_SCHEMA,
    key: key
  };
}

export function dispatchCloseSchema(key) {
  return {
    type: CLOSE_SCHEMA
  };
}


// Sample tests
import {schemaSamples} from '../tests/App.samples.js';

export function getSchemaData() {
  return dispatch => {
    dispatch(dispatchGetSchemas());
    // TODO
    try {
      let psch = new ParseSchema(schemaSamples);
      dispatch(dispatchGetSchemasSuccess(psch.shapeSchemasAndRetrieve()));
    } catch(e) {
      dispatch(dispatchGetSchemasFailed(e));
    }
    
  };
}


export const FIELD_ATTEMPT_MAP = 'FIELD_ATTEMPT_MAP';
export const FIELD_ATTEMPT_MAP_SUCCESS = 'FIELD_ATTEMPT_MAP_SUCCESS';
export const FIELD_ATTEMPT_MAP_FAILURE = 'FIELD_ATTEMPT_MAP_FAILURE';

function dispatchAttemptMapping(dropTarget, headerCell) {
  return {
    type: FIELD_ATTEMPT_MAP,
    headerCell: headerCell,
    dropTarget: dropTarget
  }
}

export function dispatchAttemptFieldMappingFinish(dropTarget, success) {
  if(success) {
    return {
      type: FIELD_ATTEMPT_MAP_SUCCESS,
      dropTarget: dropTarget
    }
  }
  return {
      type: FIELD_ATTEMPT_MAP_FAILURE,
      dropTarget: dropTarget
  }
}

export function dropTargetRecieveHeader(dropTarget, header) {
  return dispatch => {
    dispatch(dispatchAttemptMapping(dropTarget,header));
  }
}