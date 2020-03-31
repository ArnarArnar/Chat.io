import {
  GET_ROOM_LIST,
  USER_JOINS_ROOM,
  UPDATE_ROOM_INFO,
  UPDATE_CHAT,
} from '../constants';

const initialState = {
  lobby: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROOM_LIST:
      return {
        ...action.payload,
      };
    case USER_JOINS_ROOM:
      return {
        ...state,
        [action.payload.room]: {
          ...state[action.payload.room],
          users: {
            ...state[action.payload.room].users,
            [action.payload.user]: action.payload.user,
          },
        },
      };
    case UPDATE_ROOM_INFO:
      return {
        ...state,

        [action.payload.room]: {
          ...state[action.payload.room],
          users: action.payload.users,
          ops: action.payload.ops,
        },
      };
    case UPDATE_CHAT:
      return {
        ...state,
        [action.payload.room]: {
          ...state[action.payload.room],
          messageHistory: action.payload.messageHistory,
        },
      };
    default:
      return state;
  }
}
