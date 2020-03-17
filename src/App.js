import React from 'react';
//import { socket } from './services/socketService';
import 'bootstrap/dist/css/bootstrap.css';
import LogIn from './components/LogIn/LogIn.js';
import ChatWindow from './components/ChatWindow/ChatWindow.js';
import SocketContext from './context/SocketContext';
import RoomList from './components/RoomList/RoomList.js';

class App extends React.Component {
  componentDidMount() {}

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      users: {},
    };
  }
  render() {
    const { userName } = this.state;
    const { users } = this.state;
    {
      console.log(userName);
    }
    return (
      <div className="container">
        <LogIn />
        <RoomList />
        <ChatWindow users={users} />
      </div>
    );
  }
}

App.contextType = SocketContext;

export default App;
