import connectToSocketIOServer from 'socket.io-client';

const socketService = () => {
  const socket = connectToSocketIOServer('http://localhost:8080');

  const addUser = userName => {
    console.log('socketService > addUser', userName);
    socket.emit('adduser', userName, function(data) {
      return data;
    });
  };

  const getUserList = () => {
    socket.emit('users');
    socket.on('userlist', function(cb) {
      console.log('usersListener cb', cb);
    });
  };

  return {
    socket,
    addUser,
    getUserList,
  };
};

// export const socket = connectToSocketIOServer('http://localhost:8080');

export default socketService();
