import Immutable, { Map, List, fromJS } from 'immutable';

import { 
  UPLOAD_FILE, UPLOAD_FILE_PROGRESS, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILED,
  HEADER_BEGIN_DRAG, HEADER_END_DRAG,HEADER_ATTEMPT_MAP, HEADER_ATTEMPT_MAP_FINISH,
  HEADER_ATTEMPT_MAP_SUCCESS, HEADER_ATTEMPT_MAP_FAILURE,
  CELL_VALIDATE_BEGIN, CELL_VALIDATE_PASS, CELL_VALIDATE_FAIL, CELL_UPDATE_VALUE
} from '../actions/uploader';

const initialState = Map({
  tableData: List(),
  headerData: List(),
  fileLoading: false,
  fileLoaded: false,
  fileLoadError: false,
  fileUploadProgress: 0,
  fileErrorMessage: '',
  reporting: Map({
    totalHeadersCount: 0,
    mappedHeadersCount: 0,
    nonValidHeaderMappings: 0,
    validHeaderMappings: 0,
    nonValidCellsToCorrect: 0,
    messageLog: List()
  })
});

const cell = (state, action) => {
  switch (action.type) {
  case CELL_VALIDATE_BEGIN:
    return state.withMutations(state => {
        state
          .set('rulesFailed', List())
          .set('rulesPassed', List())
      });
  case CELL_VALIDATE_PASS:
    return state
            .set('rulesPassed', state.get('rulesPassed').push(action.rule))
  case CELL_VALIDATE_FAIL:
    return state
            .set('rulesFailed', state.get('rulesFailed').push(action.rule))
  case CELL_UPDATE_VALUE:
    return state
            .set('value', action.newVal)
  default:
    return state; 
  }
}

const rowReducer = (state, action) => {
  switch (action.type) {
  case CELL_VALIDATE_BEGIN:
  case CELL_VALIDATE_PASS:
  case CELL_VALIDATE_FAIL:
  case CELL_UPDATE_VALUE:
    return state
            .set(action.cell.get('columnIndex'), cell(state.get(action.cell.get('columnIndex')), action));
  default:
    return state; 
  }
}

const tableReducer = (state, action) => {
  switch (action.type) {
  case CELL_VALIDATE_BEGIN: 
  case CELL_VALIDATE_PASS:
  case CELL_VALIDATE_FAIL:
  case CELL_UPDATE_VALUE: 
    return state
            .set(action.cell.get('row'), rowReducer(state.get(action.cell.get('row')), action));
  default:
    return state;
    
  }
}

const header = (state, action) => {
  switch (action.type) {
  case HEADER_BEGIN_DRAG:
    return state
              .set('headerDragging', true);
  case HEADER_END_DRAG:
    return state
              .set('headerDragging', false);
  case HEADER_ATTEMPT_MAP:
    return state.withMutations(state => {
        state
          .set('validated', false)
          .set('validating', true)
          .set('validatePass', false)
          .set('validateFail', false)
          .set('validateMessage', '')
          .set('rowsPassedCount', 0)
          .set('rowsPassedFailed', 0)
          .set('headerMapped', true)
          .set('headerMap', action.dropTarget)
    });
  case HEADER_ATTEMPT_MAP_FINISH:
    return state.withMutations(state => {
        state
          .set('validated', true)
          .set('validating', false)
    });
  case CELL_VALIDATE_PASS: 
    return state.withMutations(state => {
        state
            .set('rowsPassedCount', state.get('rowsPassedCount') + 1)
    });
  case CELL_VALIDATE_FAIL: 
    return state.withMutations(state => {
        state
            .set('rowsPassedFailed', state.get('rowsPassedFailed') + 1)
            .set('allRulesFailed', state.get('allRulesFailed').push({
              "rule":action.rule,
              "cell":action.cell.toJS()['id']
            }))
    });
  default:
    return state;
  }
};

const headerReducer = (state, action) => {
  switch (action.type) {
  case CELL_VALIDATE_PASS: 
  case CELL_VALIDATE_FAIL: 
  case HEADER_BEGIN_DRAG:
  case HEADER_END_DRAG:
  case HEADER_ATTEMPT_MAP:
  case HEADER_ATTEMPT_MAP_FINISH:
    return state
            .set(action.headerCell.get('rowIndex'), header(state.get(action.headerCell.get('rowIndex')), action));
  default:
    return state;
  }
}

const reportingReducer = (state, action) => {
  switch (action.type) {
  case UPLOAD_FILE_SUCCESS:
    return state.withMutations(state => {
        state
          .set('totalHeadersCount', action.headerData.length)
          .set('mappedHeadersCount', 0);
    });
  case HEADER_ATTEMPT_MAP_FINISH:
    return state
              .set('mappedHeadersCount', state.get('mappedHeadersCount') + 1 );
  case HEADER_ATTEMPT_MAP_SUCCESS:
  case HEADER_ATTEMPT_MAP_FAILURE:
    return state
              .set('messageLog', state.get('messageLog').push(action.messageBody))
  case CELL_VALIDATE_FAIL:
    return state
              .set('nonValidCellsToCorrect', state.get('nonValidCellsToCorrect') + 1 );
  default:
    return state;
  }
}

export default function uploader(state = initialState, action) {
  switch (action.type) {
  case UPLOAD_FILE:
    return state.withMutations(state => {
        state
          .set('fileLoading', true)
          .set('fileLoaded', false)
          .set('fileErrorMessage', '')
    });
  case UPLOAD_FILE_SUCCESS:
    return state.withMutations(state => {
        state
          .set('fileLoading', false)
          .set('fileLoaded', true)
          .set('fileLoadError', false)
          .set('fileErrorMessage', '')
          .set('tableData', fromJS(action.tableData))
          .set('headerData', fromJS(action.headerData))
          .set('reporting', reportingReducer(state.get('reporting'), action))
    });
  case UPLOAD_FILE_PROGRESS:
    return state
              .set('fileUploadProgress', action.progress)
  case UPLOAD_FILE_FAILED:
    return state.withMutations(state => {
        state
          .set('fileLoading', false)
          .set('fileLoaded', false)
          .set('fileLoadError', true)
          .set('fileErrorMessage', action.errorMessage)
    });
  case HEADER_BEGIN_DRAG:
  case HEADER_END_DRAG:
  case HEADER_ATTEMPT_MAP:
  case HEADER_ATTEMPT_MAP_FINISH:
  case HEADER_ATTEMPT_MAP_SUCCESS:
  case HEADER_ATTEMPT_MAP_FAILURE:
    return state.withMutations(state => {
        state
          .set('headerData', headerReducer(state.get('headerData'), action))
          .set('reporting', reportingReducer(state.get('reporting'), action))
    });
  case CELL_VALIDATE_PASS: 
  case CELL_VALIDATE_FAIL: 
  case CELL_UPDATE_VALUE: 
  case CELL_VALIDATE_BEGIN: 
    return state.withMutations(state => {
        state
          .set('tableData', tableReducer(state.get('tableData'), action))
          .set('headerData', headerReducer(state.get('headerData'), action))
          .set('reporting', reportingReducer(state.get('reporting'), action))
    });
            
  default:
    return state;
  }
}