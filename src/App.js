import React from 'react';
//import { socket } from './services/socketService';
import 'bootstrap/dist/css/bootstrap.css';
import LogIn from './components/LogIn/LogIn/LogIn.js';
//import ChatWindow from './components/ChatWindow/ChatWindow.js';
import SocketContext from './context/SocketContext';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <br />
        <LogIn />
      </div>
    );
  }
}

App.contextType = SocketContext;

export default App;
