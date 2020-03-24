import { GET_ROOM_LIST, JOIN_ROOM } from '../constants';

const initialState = {
  currentRoom: { roomName: { room: '' } },
  roomList: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROOM_LIST:
      return { ...state, roomList: { ...action.payload } };
    case JOIN_ROOM:
      return { ...state, currentRoom: { ...action.payload } };
    default:
      return state;
  }
}
