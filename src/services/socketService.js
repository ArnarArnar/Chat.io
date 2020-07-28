import connectToSocketIOServer from 'socket.io-client';
import { store } from '../index';
import {
  updateUserList,
  updateRoomInfo,
  userJoinsRoom,
  updateChat,
  getRoomListSuccess,
  userJoinRoomSuccess,
  userLeftRoomSuccess,
  userKickedSuccess,
  userBannedSuccess,
  userDisconnectSuccess,
  privateMessageRecvSuccess,
  privateMessageSentSuccess,
} from '../Store/actions';

const socketService = () => {
  const socket = connectToSocketIOServer('http://localhost:8080');

  // User reducer actions

  const addUser = (userName) => {
    return new Promise((resolve) => {
      socket.emit('adduser', userName, function (cb) {
        if (cb) getRoomList();
        resolve(cb);
      });
    });
  };

  socket.on('servermessage', (event, room, user) => {
    if (event === 'join') {
      store.dispatch(userJoinsRoom(room, user));
      // Instead of having a local state for current room the user has an current room store state that is only controlled by emits from the server.
      // If the current user is the one allowed to join the server then update the user state
      if (user === store.getState().user.user) {
        store.dispatch(userJoinRoomSuccess(room, user));
      }
    } else if (event === 'part') {
      if (user === store.getState().user.user) {
        store.dispatch(userLeftRoomSuccess(room, user));
      }
    } else if (event === 'quit') {
      if (user === store.getState().user.user) {
        store.dispatch(userDisconnectSuccess(user));
      }
    } else throw new Error('Unprocessed update from server');
  });

  const kickUser = (kickObject) => {
    return new Promise((resolve) => {
      socket.emit('kick', kickObject, function (success, reason) {
        resolve(success, reason);
      });
    });
  };

  socket.on('kicked', (room, user, ops) => {
    if (user === store.getState().user.user) {
      store.dispatch(userKickedSuccess(room, user, ops));
    }
  });

  const banUser = (banObject) => {
    return new Promise((resolve) => {
      socket.emit('ban', banObject, function (success, reason) {
        resolve(success, reason);
      });
    });
  };

  socket.on('banned', (room, user, ops) => {
    if (user === store.getState().user.user) {
      store.dispatch(userBannedSuccess(room, user, ops));
    }
  });

  const promoteUserToOp = (promoteObject) => {
    return new Promise((resolve) => {
      socket.emit('op', promoteObject, function (success, reason) {
        resolve(success, reason);
      });
    });
  };

  const leaveRoom = (roomName) => {
    socket.emit('partroom', roomName);
  };

  const signOut = () => {
    socket.emit('manualdisconnect');
  };

  const sendPrivateMessage = (messageObject) => {
    return new Promise((resolve) => {
      socket.emit('privatemsg', messageObject, function (cb) {
        if (cb) {
          store.dispatch(
            privateMessageSentSuccess(
              store.getState().user.user,
              messageObject.nick,
              messageObject.message
            )
          );
        }
        resolve(cb);
      });
    });
  };

  socket.on('recv_privatemsg', (fromUser, message) => {
    store.dispatch(privateMessageRecvSuccess(fromUser, message));
  });

  // Room actions

  const joinRoom = (roomName) => {
    return new Promise((resolve) => {
      socket.emit('joinroom', roomName, function (success, reason) {
        resolve({ success, reason });
      });
    });
  };

  socket.on('updateusers', (room, users, ops) => {
    store.dispatch(updateRoomInfo(room, users, ops));
  });

  socket.on('updatechat', (room, messageHistory) => {
    store.dispatch(updateChat(room, messageHistory));
  });

  const getRoomList = () => {
    socket.emit('rooms');
    socket.on('roomlist', (data) => {
      store.dispatch(getRoomListSuccess(data));
    });
  };

  // Users online actions

  const getUpdatedUserList = () => {
    socket.emit('users');
    socket.on('userlist', (userList) => {
      store.dispatch(updateUserList(userList));
    });
  };

  return {
    socket,
    addUser,
    getRoomList,
    joinRoom,
    kickUser,
    banUser,
    promoteUserToOp,
    leaveRoom,
    signOut,
    sendPrivateMessage,
    updateChat,
    getUpdatedUserList,
  };
};

export default socketService();
