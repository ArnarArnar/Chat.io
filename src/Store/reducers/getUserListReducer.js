import { UPDATE_USER_LIST } from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_USER_LIST:
      console.log('Reducer: UPDATE_USER_LIST', action.payload);
      return action.payload;
    default:
      return state;
  }
}
