import {
  //GET_ROOM_LIST,
  UPDATE_ROOM_INFO,
  UPDATE_CHAT,
  USER_JOINS_ROOM,
} from '../constants';

const initialState = {
  lobby: {},
};

// const getSingleVarName = (roomName) => {
//   return roomName;
// };

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_JOINS_ROOM:
      console.log('UPDATE_ROOM_INFO payload', action.payload);
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
// rooms
// {currentRoom: {…}, roomList: {…}, getRoomList: ƒ, joinRoom: ƒ}
//  currentRoom:
//      roomName:
//          room: "lobby"
//        __proto__: Object
//      __proto__: Object
//  roomList:
//      lobby:
//          users: {}
//          ops: {}
//          banned: {}
//          messageHistory: [{…}]
//          topic: "Welcome to the lobby!"
//          locked: false
//          password: ""
