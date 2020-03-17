import { GET_USER_LIST } from '../constants';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_LIST:
      return action.payload;
    default:
      return state;
  }
}
