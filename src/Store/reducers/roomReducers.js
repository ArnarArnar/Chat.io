import { GET_ROOM_LIST, UPDATE_ROOM_INFO, UPDATE_CHAT } from '../constants';

const initialState = {
  lobby: {},
};

// const getSingleVarName = (roomName) => {
//   return roomName;
// };

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROOM_LIST:
      return { ...state, ...action.payload };
    case UPDATE_ROOM_INFO:
      // eslint-disable-next-line no-case-declarations
      //const test = console.log('action.payload.room', action.payload.room);
      // eslint-disable-next-line no-case-declarations
      const list = { ...state[action.payload.room] };
      console.log('RoomReducer, list', list);
      return {
        ...state,
        [action.payload.room]: {
          ...state[action.payload.room],
          users: action.payload.users,
          ops: action.payload.ops,
        },
      };
    // case UPDATE_ROOM_INFO:
    //   return {
    //     ...state,
    //     ...state.rooms,
    //     //...state.rooms[action.payload.room],
    //     [action.payload.room]: {
    //       // /...state.rooms[action.payload.room],
    //       users: action.payload.users,
    //       ops: action.payload.ops,
    //     },
    //   };
    case UPDATE_CHAT:
      return {
        ...action.payload,
        // ...state,
        // [action.payload.room]: {
        //   ...state[action.payload.room],
        //   messageHistory: action.payload.messageHistory,
        // },
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
