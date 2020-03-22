import connectToSocketIOServer from 'socket.io-client';

const socketService = () => {
  const socket = connectToSocketIOServer('http://localhost:8080');

  const addUser = userName => {
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
    socket.emit('joinroom', roomName, function(data) {
      return data;
    });
  };

  return {
    socket,
    addUser,
    getUserList,
    getRoomList,
    joinRoom,
  };
};

export default socketService();
