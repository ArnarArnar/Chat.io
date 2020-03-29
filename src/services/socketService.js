import connectToSocketIOServer from 'socket.io-client';
import { store } from '../index';
import {
  updateUserList,
  updateRoomInfo,
  userJoinsRoom,
  updateChat,
  userJoinRoomSuccess,
  userLeftRoomSuccess,
  userKickedSuccess,
  userBannedSuccess,
  userDisconnectSuccess,
  // userPromotedSuccess,
} from '../Store/actions';

const socketService = () => {
  const socket = connectToSocketIOServer('http://localhost:8080');

  socket.on('updateusers', (room, users, ops) => {
    console.log(
      '::::updateusers:::::' +
        'room: ' +
        room +
        'users: ' +
        users +
        'ops: ' +
        ops
    );
    store.dispatch(updateRoomInfo(room, users, ops));
  });

  // eslint-disable-next-line no-unused-vars
  socket.on('updatechat', (room, messageHistory) => {
    console.log(
      '::::updatechat:::::' + 'room' + room + 'messageHistory' + messageHistory
    );
    store.dispatch(updateChat(room, messageHistory));
  });

  socket.on('servermessage', (event, room, user) => {
    console.log(
      '::::servermessage:::::' +
        ' event: ' +
        event +
        ' room: ' +
        room +
        ' user: ' +
        user
    );
    if (event === 'join') {
      console.log('servermessage > join');
      store.dispatch(userJoinsRoom(room, user));
      // Instead of having a local state for current room the user has an current room store state that is only controlled by emits from the server.
      // If the current user is the one allowed to join the server then update the user state
      if (user === store.getState().user.user) {
        console.log('servermessage > userJoinRoomSuccess');
        store.dispatch(userJoinRoomSuccess(room, user));
      }
    } else if (event === 'part') {
      console.log('servermessage > part');
      if (user === store.getState().user.user) {
        console.log('userLeftRoomSuccess > userLeftRoomSuccess', user);
        store.dispatch(userLeftRoomSuccess(room, user));
      }
    } else if (event === 'quit') {
      console.log('servermessage > quit');
      if (user === store.getState().user.user) {
        console.log('userLeftRoomSuccess > userLeftRoomSuccess', user);
        store.dispatch(userDisconnectSuccess(user));
      }
    } else throw new Error('Unprocessed update from server');
  });

  const kickUser = (kickObject) => {
    console.log('socketService > kickUser');
    return new Promise((resolve) => {
      socket.emit('kick', kickObject, function (success, reason) {
        console.log('kick', success, reason);
        resolve(success, reason);
      });
    });
  };

  socket.on('kicked', (room, user, ops) => {
    console.log('::::User kicked users:::::');
    console.log('kicked > room ', room);
    console.log('kicked > users', user);
    console.log('kicked > ops  ', ops);
    if (user === store.getState().user.user) {
      console.log('This user has been kicked');
      store.dispatch(userKickedSuccess(room, user, ops));
    }
  });

  const banUser = (banObject) => {
    console.log('socketService > banUser', banObject);
    return new Promise((resolve) => {
      socket.emit('ban', banObject, function (success, reason) {
        console.log('ban', success, reason);
        resolve(success, reason);
      });
    });
  };

  socket.on('banned', (room, user, ops) => {
    console.log('::::User banned users:::::');
    console.log('banned > room ', room);
    console.log('banned > users', user);
    console.log('banned > ops  ', ops);
    if (user === store.getState().user.user) {
      console.log('This user has been kickbanneded');
      store.dispatch(userBannedSuccess(room, user, ops));
    }
  });

  const promoteUserToOp = (promoteObject) => {
    console.log('socketService > promoteUserToOp', promoteObject);
    return new Promise((resolve) => {
      socket.emit('op', promoteObject, function (success, reason) {
        console.log('socketService > promoteUserToOp > cb', success, reason);
        resolve(success, reason);
      });
    });
  };

  socket.on('opped', (room, promotedUser, promotingUser) => {
    console.log('::::User banned users:::::');
    console.log('banned > room ', room);
    console.log('banned > users', promotedUser);
    console.log('banned > ops  ', promotingUser);
    if (promotedUser === store.getState().user.user) {
      console.log('This user has been promoted');
      // store.dispatch(userPromotedSuccess(room, promotedUser, promotingUser));
    }
  });

  // eslint-disable-next-line no-unused-vars
  socket.on('updatetopic', (room, topic, user) => {
    // console.log('::::Update topic:::::');
    // console.log('Event', event);
    // console.log('room', room);
    // console.log('users', user);
  });

  const addUser = (userName) => {
    //console.log('====================socket', socket);
    //console.log('socketService > addUser', userName);

    return new Promise((resolve) => {
      socket.emit('adduser', userName, function (data) {
        console.log('Callback from addUser socket service', data);
        resolve(data);
      });
    });
  };

  const getUpdatedUserList = () => {
    console.log('socketService > getUpdatedUserList');
    socket.emit('users');
    socket.on('userlist', (userList) => {
      console.log('::::Update usersList:::::');
      console.log('updateUserList > userList', userList);
      store.dispatch(updateUserList(userList));
    });
  };

  const getRoomList = async () => {
    //console.log('socketService > getRoomList');
    socket.emit('rooms');
    return new Promise((resolve) => {
      socket.on('roomlist', function (data) {
        //console.log('socketService > getRoomList', data);
        resolve(data);
      });
    });
  };

  const joinRoom = (roomName) => {
    //console.log('socketService > getUserList');
    return new Promise((resolve) => {
      socket.emit('joinroom', roomName, function (success, reason) {
        console.log('joinroom', success, reason);
        //{response: { success: success, reason: reason}
        resolve({ success, reason });
      });
    });
  };

  const leaveRoom = (roomName) => {
    console.log('socketService > leaveRoom', roomName);
    socket.emit('partroom', roomName);
  };

  const signOut = () => {
    console.log('socketService > signOut');
    socket.emit('manualdisconnect');
  };

  return {
    socket,
    addUser,
    getUpdatedUserList,
    getRoomList,
    joinRoom,
    kickUser,
    banUser,
    promoteUserToOp,
    leaveRoom,
    signOut,
    updateChat,
  };
};

export default socketService();
