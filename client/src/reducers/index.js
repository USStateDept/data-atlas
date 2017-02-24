import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import uploader from './uploader';
import schemas from './schemas';
import reporter  from './reporter';

export default combineReducers({
  uploader : undoable(uploader), // actions in the uploader table can be undone/redone
  schemas : schemas,
  reporter : reporter
});