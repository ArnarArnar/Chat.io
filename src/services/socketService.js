import connectToSocketIOServer from 'socket.io-client';

const socketService = () => {
  const socket = connectToSocketIOServer('http://localhost:8080');

  // const listenForChanges = async () => {
  //   console.log('::::Update users::::wwww:');
  //   return new Promise(resolve => {
  //     socket.on('updateusers', (room, users, ops) => {
  //       console.log('::::Update users:::::');
  //       console.log('room', room);
  //       console.log('users', users);
  //       console.log('ops', ops);
  //       resolve(room, users, ops);
  //     });
  //   });
  // };

  const addUser = userName => {
    console.log('====================socket', socket);
    console.log('socketService > addUser', userName);
    return new Promise(resolve => {
      socket.emit('adduser', userName, function(data) {
        console.log('Callback from addUser socket service', data);
        resolve(data);
      });
    });
  };

  const getUserList = async () => {
    console.log('socketService > getUserList');
    socket.emit('users');
    return new Promise(resolve => {
      socket.on('userlist', function(data) {
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
    console.log('socketService > getRoomList');
    socket.emit('rooms');
    return new Promise(resolve => {
      socket.on('roomlist', function(data) {
        console.log('socketService > getRoomList', data);
        resolve(data);
      });
    });
  };

  const joinRoom = roomName => {
    console.log('socketService > getUserList');
    return new Promise(resolve => {
      socket.emit('joinroom', roomName, function(data) {
        console.log('joinroom', data);
        resolve(data);
      });
    });
  };

  return {
    socket,
    addUser,
    getUserList,
    //disconnect,
    getRoomList,
    joinRoom,
    //listenForChanges,
  };
};

export default socketService();
