import React from 'react';
//import { socket } from './services/socketService';
import 'bootstrap/dist/css/bootstrap.css';
//import LogIn from './components/LogIn/LogIn.js';
import ChatWindow from './components/ChatWindow/ChatWindow.js';
import SocketContext from './context/SocketContext';
import RoomList from './components/RoomList/RoomList.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  componentDidMount() {}

  logInUser(userName) {
    console.log('User name is :', userName);
    console.log(socket);
    const { socket } = this.context;

    socket.emit('adduser', userName, function(data) {
      return data;
    });
    socket.emit('users');
    socket.on('userlist', function(cb) {
      console.log('usersListener cb', cb);
    });
  }

  logIn(e) {
    e.preventDefault();
    const { userName } = this.state;
    const callback = this.logInUser(userName);
    console.log('callback', callback);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

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
        <>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Create a username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={userName}
                placeholder="Username"
                onChange={e => this.onChange(e)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={e => this.logIn(e)}
            >
              Submit
            </Button>
          </Form>
        </>
        <RoomList />
        <ChatWindow users={users} />
      </div>
    );
  }
}

App.contextType = SocketContext;

export default App;
