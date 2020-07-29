import {
  CREATE_USER,
  USER_JOIN_SUCCESS,
  USER_LEFT_SUCCESS,
  USER_KICKED_SUCCESS,
  USER_BANNED_SUCCESS,
  USER_DISCONNECTED_SUCCESS,
  USER_PRIVATE_MSG_RECV_SUCCESS,
  USER_PRIVATE_MSG_SENT_SUCCESS,
  GET_ROOM_LIST,
  USER_JOINS_ROOM,
  UPDATE_ROOM_INFO,
  UPDATE_CHAT,
  UPDATE_USER_LIST,
} from '../constants';

import socketService from '../../services/socketService';

// USER REDUCER

export const addUser = (userName) => async (dispatchEvent) => {
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
  return {
    type: CREATE_USER,
    payload: userName,
  };
};

export const joinRoom = (roomName) => async () => {
  try {
    const cb = await socketService.joinRoom(roomName);
    return cb;
  } catch (err) {
    throw new Error(err);
  }
};

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
  room = '';
  return {
    type: USER_LEFT_SUCCESS,
    payload: {
      room: '',
      user,
    },
  };
};

export const kickUser = (userName) => async () => {
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

export const banUser = (userName) => async () => {
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
  return {
    type: USER_BANNED_SUCCESS,
    payload: {
      room,
      user,
    },
  };
};

export const promoteUserToOp = (userName) => async () => {
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

export const userDisconnectSuccess = () => {
  return {
    type: USER_DISCONNECTED_SUCCESS,
    payload: {
      room: '',
      user: '',
    },
  };
};

export const privateMessageRecvSuccess = (user, message) => {
  return {
    type: USER_PRIVATE_MSG_RECV_SUCCESS,
    payload: {
      user,
      message,
    },
  };
};

export const privateMessageSentSuccess = (fromUser, toUser, message) => {
  return {
    type: USER_PRIVATE_MSG_SENT_SUCCESS,
    payload: {
      fromUser,
      toUser,
      message,
    },
  };
};

// room actions

export const getRoomListSuccess = (roomList) => {
  return {
    type: GET_ROOM_LIST,
    payload: roomList,
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

export const updateChat = (room, messageHistory) => {
  return {
    type: UPDATE_CHAT,
    payload: {
      room,
      messageHistory,
    },
  };
};

// UsersOnline actions

export const updateUserList = (userList) => {
  return {
    type: UPDATE_USER_LIST,
    payload: userList,
  };
};
