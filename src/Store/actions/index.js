import {
  CREATE_USER,
  UPDATE_USER_LIST,
  USER_JOINS_ROOM,
  USER_JOIN_SUCCESS,
  USER_LEFT_SUCCESS,
  UPDATE_ROOM_INFO,
  UPDATE_CHAT,
} from '../constants';

import socketService from '../../services/socketService';

export const addUser = (userName) => async (dispatchEvent) => {
  console.log('actions > addUser: ', userName);
  try {
    const successfullyAddedUser = await socketService.addUser(userName);
    if (successfullyAddedUser) {
      dispatchEvent(addUserSuccess(userName));
      socketService.getUpdatedUserList();
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

const addUserSuccess = (userName) => {
  console.log('actions > addUserSuccess: ', userName);
  return {
    type: CREATE_USER,
    payload: userName,
  };
};

export const updateUserList = (userList) => {
  console.log('actions > updateUserList: ', userList);
  return {
    type: UPDATE_USER_LIST,
    payload: userList,
  };
};

export const updateRoomInfo = (room, users, ops) => {
  console.log('actions > updateRoomInfo: ', room, users, ops);
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
  console.log('actions > userJoinsRoom: ', room, user);
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
  console.log('actions > userJoinRoomSuccess: ', room, user);
  return {
    type: USER_JOIN_SUCCESS,
    payload: {
      room,
      user,
    },
  };
};

export const userLeftRoomSuccess = (room, user) => {
  console.log('actions > userLeftRoomSuccess: ', room, user);
  return {
    type: USER_LEFT_SUCCESS,
    payload: {
      room,
      user,
    },
  };
};

export const updateChat = (room, messageHistory) => {
  console.log('actions > updateChat: ', room, messageHistory);
  return {
    type: UPDATE_CHAT,
    payload: {
      room,
      messageHistory,
    },
  };
};

export const joinRoom = (roomName) => async () => {
  try {
    console.log('actions > joinRoom: ', roomName);
    const joinedRoomSuccess = await socketService.joinRoom(roomName);
    //console.log('actions > joinRoom > !joinedRoomSuccess', joinedRoomSuccess);
    if (!joinedRoomSuccess) {
      console.log(
        //'2actions > joinRoom > !joinedRoomSuccess',
        joinedRoomSuccess
      );
      return joinedRoomSuccess.reason;
    }
  } catch (err) {
    throw new Error(err);
  }
};
