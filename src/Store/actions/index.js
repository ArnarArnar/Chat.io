import {
  CREATE_USER,
  GET_USER_LIST,
  GET_ROOM_LIST,
  //JOIN_ROOM,
  USER_JOINS_ROOM,
  USER_JOIN_SUCCESS,
  USER_LEFT_SUCCESS,
  CREATE_ROOM,
  UPDATE_ROOM_INFO,
  UPDATE_CHAT,
  SET_MESSAGES,
} from '../constants';

import socketService from '../../services/socketService';

export const addUser = (userName) => async (dispatchEvent) => {
  try {
    const successfullyAddedUser = await socketService.addUser(userName);
    if (successfullyAddedUser) {
      dispatchEvent(addUserSuccess(userName));
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

const addUserSuccess = (userName) => {
  return {
    type: CREATE_USER,
    payload: userName,
  };
};

export const getUserList = () => async (dispatchEvent) => {
  try {
    //console.log('actions > getUserList: before');
    const allUsers = await socketService.getUserList();
    //console.log('actions > getUserList: after', allUsers);
    dispatchEvent(getUserListSuccess(allUsers));
  } catch (err) {
    throw new Error(err);
  }
};

const getUserListSuccess = (userList) => ({
  type: GET_USER_LIST,
  payload: userList,
});

export const updateRoomInfo = (room, users, ops) => {
  return {
    type: UPDATE_ROOM_INFO,
    payload: {
      room,
      users,
      ops,
    },
  };
};

export const userJoinsRoom = (room, user) => {
  return {
    type: USER_JOINS_ROOM,
    payload: {
      room,
      user,
    },
  };
};

// Update current users room
export const userJoinRoomSuccess = (room, user) => {
  return {
    type: USER_JOIN_SUCCESS,
    payload: {
      room,
      user,
    },
  };
};

export const userLeftRoomSuccess = (room, user) => {
  return {
    type: USER_LEFT_SUCCESS,
    payload: {
      room,
      user,
    },
  };
};

export const updateChat = (room, messageHistory) => {
  return {
    type: UPDATE_CHAT,
    payload: {
      room,
      messageHistory,
    },
  };
};

export const getRoomList = () => async (dispatchEvent) => {
  try {
    //console.log('actions > getRoomList');
    const allRooms = await socketService.getRoomList();
    // console.log('actions > getRoomList: ', allRooms);
    dispatchEvent(getRoomListSuccess(allRooms));
  } catch (err) {
    throw new Error(err);
  }
};

const getRoomListSuccess = (roomList) => ({
  type: GET_ROOM_LIST,
  payload: roomList,
});

// TODO
export const createRoom = (roomName) => async (dispatchEvent) => {
  try {
    //console.log('actions > createRoom: ', roomName);
    const roomCreatedSuccess = socketService.createRoom(roomName);
    if (roomCreatedSuccess) {
      dispatchEvent(createRoomSuccess({ roomName }));
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

const createRoomSuccess = (roomName) => {
  return {
    type: CREATE_ROOM,
    payload: roomName,
  };
};

export const joinRoom = (roomName) => async () => {
  try {
    console.log('actions > joinRoom: ', roomName);
    const joinedRoomSuccess = await socketService.joinRoom(roomName);
    console.log('actions > joinRoom > !joinedRoomSuccess', joinedRoomSuccess);
    if (!joinedRoomSuccess) {
      console.log(
        '2actions > joinRoom > !joinedRoomSuccess',
        joinedRoomSuccess
      );
      return joinedRoomSuccess.reason;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const setMessages = (data) => {
  return {
    type: SET_MESSAGES,
    payload: data,
  };
};
