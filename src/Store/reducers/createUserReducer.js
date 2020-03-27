import { CREATE_USER, USER_JOIN_SUCCESS } from '../constants';

const initialState = {
  user: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        user: action.payload,
      };
    case USER_JOIN_SUCCESS:
      return {
        user: action.payload.user,
        room: action.payload.room,
      };
    default:
      return state;
  }
}
