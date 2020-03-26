import createUserReducer from './createUserReducer';
import getUserListReducer from './getUserListReducer';
import getRoomListReducer from './roomReducers';
import messageReducers from './messageReducers';

import { combineReducers } from 'redux';

export default combineReducers({
  user: createUserReducer,
  userList: getUserListReducer,
  rooms: getRoomListReducer,
  messages: messageReducers,
});
