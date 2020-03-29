import currentUserReducer from './currentUserReducer';
import usersOnlineReducer from './usersOnlineReducer';
import roomReducers from './roomReducers';

import { combineReducers } from 'redux';

export default combineReducers({
  user: currentUserReducer,
  userList: usersOnlineReducer,
  rooms: roomReducers,
});
