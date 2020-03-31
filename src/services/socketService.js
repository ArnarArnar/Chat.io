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
} from '../Store/actions';

const socketService = () => {
  const socket = connectToSocketIOServer('http://localhost:8080');

  // BREAK: user reducer actions

  const addUser = (userName) => {
    console.log('socketService > addUser');
    return new Promise((resolve) => {
      socket.emit('adduser', userName, function (cb) {
        if (cb) getRoomList();
        resolve(cb);
      });
    });
  };

  socket.on('servermessage', (event, room, user) => {
    console.log('::::servermessage:::::' + ' event: ' + event);
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
    console.log('socketService > kickUser');
    return new Promise((resolve) => {
      socket.emit('kick', kickObject, function (success, reason) {
        resolve(success, reason);
      });
    });
  };

  socket.on('kicked', (room, user, ops) => {
    console.log('::::User kicked users:::::');
    if (user === store.getState().user.user) {
      console.log('This user has been kicked');
      store.dispatch(userKickedSuccess(room, user, ops));
    }
  });

  const banUser = (banObject) => {
    console.log('socketService > banUser');
    return new Promise((resolve) => {
      socket.emit('ban', banObject, function (success, reason) {
        resolve(success, reason);
      });
    });
  };

  socket.on('banned', (room, user, ops) => {
    console.log('::::banned:::::');
    if (user === store.getState().user.user) {
      store.dispatch(userBannedSuccess(room, user, ops));
    }
  });

  const promoteUserToOp = (promoteObject) => {
    console.log('socketService > promoteUserToOp');
    return new Promise((resolve) => {
      socket.emit('op', promoteObject, function (success, reason) {
        resolve(success, reason);
      });
    });
  };

  socket.on('opped', (room, promotedUser, promotingUser) => {
    console.log('::::opped:::::');
    console.log('banned > room ', room);
    console.log('banned > users', promotedUser);
    console.log('banned > ops  ', promotingUser);
    if (promotedUser === store.getState().user.user) {
      console.log('This user has been promoted');
    }
  });

  const leaveRoom = (roomName) => {
    console.log('socketService > leaveRoom', roomName);
    socket.emit('partroom', roomName);
  };

  const signOut = () => {
    console.log('socketService > signOut');
    socket.emit('manualdisconnect');
  };

  // BREAK: Room actions

  const joinRoom = (roomName) => {
    console.log('socketService > joinRoom');
    return new Promise((resolve) => {
      socket.emit('joinroom', roomName, function (success, reason) {
        console.log('joinroom', success, reason);
        resolve({ success, reason });
      });
    });
  };

  socket.on('updateusers', (room, users, ops) => {
    console.log('::::updateusers::::');
    store.dispatch(updateRoomInfo(room, users, ops));
  });

  socket.on('updatechat', (room, messageHistory) => {
    console.log('::::updatechat:::::');
    store.dispatch(updateChat(room, messageHistory));
  });

  // eslint-disable-next-line no-unused-vars
  socket.on('updatetopic', (room, topic, user) => {
    // console.log('::::Update topic:::::');
    // console.log('Event', event);
    // console.log('room', room);
    // console.log('users', user);
  });

  const getRoomList = () => {
    console.log('socketService > getRoomList');
    socket.emit('rooms');
    socket.on('roomlist', (data) => {
      console.log('::::roomlist::::');
      store.dispatch(getRoomListSuccess(data));
    });
  };

  // BREAK: Users online actions

  const getUpdatedUserList = () => {
    console.log('socketService > getUpdatedUserList');
    socket.emit('users');
    socket.on('userlist', (userList) => {
      console.log('::::userlist::::');
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
    updateChat,
    getUpdatedUserList,
  };
};

export default socketService();
