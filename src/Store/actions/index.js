import {
  CREATE_USER,
  UPDATE_USER_LIST,
  USER_JOINS_ROOM,
  USER_JOIN_SUCCESS,
  USER_LEFT_SUCCESS,
  USER_KICKED_SUCCESS,
  USER_BANNED_SUCCESS,
  //USER_PROMOTED_SUCCESS,
  USER_DISCONNECTED_SUCCESS,
  UPDATE_ROOM_INFO,
  UPDATE_CHAT,
} from '../constants';

import socketService from '../../services/socketService';

// BREAK: USER REDUCER

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

export const joinRoom = (roomName) => async () => {
  try {
    console.log('actions > joinRoom: ', roomName);
    const cb = await socketService.joinRoom(roomName);
    console.log('actions > joinRoom > cb', cb);
    return cb;
  } catch (err) {
    throw new Error(err);
  }
};

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
  room = '';
  return {
    type: USER_LEFT_SUCCESS,
    payload: {
      room,
      user,
    },
  };
};

export const userDisconnectSuccess = (room, user) => {
  console.log('actions > userLeftRoomSuccess: ', room, user);
  return {
    type: USER_DISCONNECTED_SUCCESS,
    payload: {
      room: '',
      user: '',
    },
  };
};

export const kickUser = (userName, roomName) => async () => {
  console.log('actions > kickUser: ', userName, roomName);
  try {
    const successfullyKickedUser = await socketService.kickUser(userName);
    if (successfullyKickedUser) {
      socketService.getUpdatedUserList();
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};
export const userKickedSuccess = (room, user) => {
  room = '';
  return {
    type: USER_KICKED_SUCCESS,
    payload: {
      room,
      user,
    },
  };
};

export const banUser = (userName, roomName) => async () => {
  console.log('actions > banUser: ', userName, roomName);
  try {
    const successfullyBannedUser = await socketService.banUser(userName);
    if (successfullyBannedUser) {
      socketService.getUpdatedUserList();
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};
export const userBannedSuccess = (room, user) => {
  room = '';
  return {
    type: USER_BANNED_SUCCESS,
    payload: {
      room,
      user,
    },
  };
};

export const promoteUserToOp = (userName, roomName) => async () => {
  console.log('actions > promoteUserToOp: ', userName, roomName);
  try {
    const cb = await socketService.promoteUserToOp(userName);
    if (cb) {
      socketService.getUpdatedUserList();
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

// export const userPromotedSuccess = (room, user) => {
//   room = '';
//   return {
//     type: USER_PROMOTED_SUCCESS,
//     payload: {
//       room,
//       user,
//     },
//   };
// };

// TODO: Remove user success

// BREAK: userList actions

export const updateUserList = (userList) => {
  console.log('actions > updateUserList: ', userList);
  return {
    type: UPDATE_USER_LIST,
    payload: userList,
  };
};

// BREAK: room actions

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
