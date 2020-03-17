import createUserReducer from './createUserReducer';
import getUserListReducer from './getUserListReducer';

import { combineReducers } from 'redux';

export default combineReducers({
  user: createUserReducer,
  userList: getUserListReducer,
});
