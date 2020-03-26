import connectToSocketIOServer from 'socket.io-client';
import { store } from '../index';
import { updateRoomInfo, userJoinsRoom } from '../Store/actions';

const socketService = () => {
  const socket = connectToSocketIOServer('http://localhost:8080');

  socket.on('updateusers', (room, users, ops) => {
    console.log('::::Update users:::::');
    console.log('updateusers > room', room);
    console.log('updateusers > users', users);
    console.log('updateusers > ops', ops);
    store.dispatch(updateRoomInfo(room, users, ops));
  });

  // eslint-disable-next-line no-unused-vars
  socket.emit('updatechat', (room, messageHistory) => {
    // console.log('::::Update users:::::');
    // console.log('room', room);
    // console.log('messageHistory', messageHistory);
  });

  socket.on('servermessage', (event, room, user) => {
    // console.log('::::servermessage:::::');

    // console.log('Event', event);
    // console.log('room', room);
    // console.log('users', user);
    if (event === 'join') {
      store.dispatch(userJoinsRoom(room, user));
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

  const getUserList = async () => {
    //console.log('socketService > getUserList');
    socket.emit('users');
    return new Promise((resolve) => {
      socket.on('userlist', function (data) {
        console.log(data);
        resolve(data);
      });
    });
  };

  // const disconnect = () => {
  //   console.log('socketService > disconnect');
  //   socket.emit('disconnect', 'arnara17');
  //   socket.on('updateusers', (room, users, ops) => {
  //     console.log('::::Update users:::::');
  //     console.log('room', room);
  //     console.log('users', users);
  //     console.log('ops', ops);
  //   });
  // };

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
      socket.emit('joinroom', roomName, function (data) {
        //console.log('joinroom', data);
        resolve(data);
      });
    });
  };

  const leaveRoom = (roomName) => {
    //console.log('socketService > leaveRoom');
    socket.emit('partroom', roomName);
  };

  // // Help function to make sure the Redux store is the single
  // // source of truth
  // const currentRoom = (userName, roomList) => {
  //   // go through all rooms, check what room he is in,
  //   // return that room name

  //}

  return {
    socket,
    addUser,
    getUserList,
    //disconnect,
    getRoomList,
    joinRoom,
    //listenForChanges,
    leaveRoom,
  };
};

export default socketService();
