import {
  CREATE_USER,
  USER_JOIN_SUCCESS,
  USER_LEFT_SUCCESS,
  USER_KICKED_SUCCESS,
  USER_BANNED_SUCCESS,
  USER_DISCONNECTED_SUCCESS,
} from '../constants';

const initialState = {
  user: '',
  room: '',
};

export default function (state = initialState, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_JOIN_SUCCESS:
      return {
        user: action.payload.user,
        room: action.payload.room,
      };
    case USER_LEFT_SUCCESS:
      return {
        user: action.payload.user,
        room: action.payload.room,
      };
    case USER_KICKED_SUCCESS:
      return {
        user: action.payload.user,
        room: '',
      };
    case USER_BANNED_SUCCESS:
      return {
        user: action.payload.user,
        room: '',
      };
    case USER_DISCONNECTED_SUCCESS:
      return {
        user: '',
        room: '',
      };
    default:
      return state;
  }
}
