import {
  CREATE_USER,
  USER_JOIN_SUCCESS,
  USER_LEFT_SUCCESS,
  USER_KICKED_SUCCESS,
  USER_BANNED_SUCCESS,
  USER_DISCONNECTED_SUCCESS,
  USER_PRIVATE_MSG_RECV_SUCCESS,
  USER_PRIVATE_MSG_SENT_SUCCESS,
} from '../constants';

const initialState = {
  user: '',
  room: '',
  messages: {},
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
        ...state,
        user: action.payload.user,
        room: action.payload.room,
      };
    case USER_LEFT_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        room: action.payload.room,
      };
    case USER_KICKED_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        room: '',
      };
    case USER_BANNED_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        room: '',
      };
    case USER_DISCONNECTED_SUCCESS:
      return {
        ...state,
        user: '',
        room: '',
      };
    case USER_PRIVATE_MSG_RECV_SUCCESS:
      var messagesForUser = state.messages[action.payload.user] || [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.user]: [...messagesForUser, action.payload],
        },
      };
    case USER_PRIVATE_MSG_SENT_SUCCESS:
      var messagesToUser = state.messages[action.payload.toUser] || [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.toUser]: [
            ...messagesToUser,
            {
              user: action.payload.fromUser,
              message: action.payload.message,
            },
          ],
        },
      };
    default:
      return state;
  }
}
