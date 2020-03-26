import React from 'react';
import PropTypes, { array } from 'prop-types';
import socketService from '../../services/socketService';
import { connect } from 'react-redux';
import { setMessages } from '../../Store/actions';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

class ChatWindow extends React.Component {
  componentDidMount() {
    console.log('ChatWindow > componentDidMount, this.props', this.props);
    console.log(
      'ChatWindow > componentDidMount, this.props.user',
      this.props.user
    );
    // socketService.socket.on('updatechat', (roomName, data) => {
    //   if (roomName == this.props.user.room) {
    //     this.props.setMessages(data);
    //   }
    //   console.log('ChatWindow > updatechat. data.roomName', roomName, data);
    //   this.setState({ messages: [data] });
    //   console.log('ChatWindow > updatechat', this.props.messages);
    // });
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: [] /* List of all messages within the public lobby */,
      message: '' /* Current message */,
    };
  }

  sendMessage(e) {
    e.preventDefault();
    const { room } = this.props.user;
    console.log('testCurrentRoom ', room);
    const { message } = this.state;
    console.log('ChatWindow > sendMessage', message, 'current room ', room);
    if (message === '') {
      return false;
    }
    socketService.socket.emit('sendmsg', {
      msg: message,
      roomName: room,
    });
    this.setState({ message: '' });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  logout(e) {
    console.log('logout', e);
  }

  messages() {
    const { rooms } = this.props;
    const currentRoomName = this.props.user.room;
    console.log(
      'ObjectKey ',
      Object.entries(rooms.find((key) => rooms[key] === currentRoomName))
    );
  }

  renderMessages() {
    const { rooms } = this.props;
    const { room } = this.props.user;
    console.log('rooms', rooms);
    console.log('room', room);

    const index = Object.entries(rooms).findIndex((key) => key[0] == room);
    console.log('index', index);

    console.log('Object.entries(rooms)', Object.entries(rooms));
    if (rooms[room].messageHistory) {
      console.log(
        'rooms[room].messageHistory',
        Object.entries(rooms[room].messageHistory)
      );

      return Object.keys(
        rooms[room].messageHistory.map((m) => {
          <li className="list-group-item" key={m.timestamp}>
            <strong>
              {m.nick}
              {console.log('m', m.nick)}
            </strong>
            <p>{m.timestamp}</p>
            <p>{m.message}</p>{' '}
          </li>;
        })
      );
    }
    return <strong>No messages...</strong>;
  }

  render() {
    //const { rooms } = this.props;
    const { room } = this.props.user;
    //console.log('rooms', rooms);
    //console.log('room', room);
    console.log('this.props.user', this.props.user);
    var test;

    console.log(test);
    return (
      <div
        className="bg-light page"
        style={{ height: '100vh', overflowX: 'hidden' }}
      >
        <Row>
          <Col>
            <Container>
              <ul className="list-group" style={{ marginBottom: '60px' }}>
                {room !== undefined ? (
                  this.renderMessages()
                ) : (
                  <div className="d-flex justify-content-center">
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading messages...
                  </div>
                )}
              </ul>
              <Form
                inline
                variant="bottom"
                className="w-100 d-flex justify-content-between align-items-center fixed-bottom"
                onSubmit={(e) => this.sendMessage(e)}
              >
                <Form.Group style={{ flex: 1 }}>
                  <Form.Control
                    required
                    type="text"
                    name="message"
                    value={this.state.message}
                    style={{ width: '100%' }}
                    placeholder="Type Message here..."
                    onChange={(e) => this.onChange(e)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </Form>
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}

//TODO taka til
ChatWindow.propTypes = {
  setMessages: PropTypes.func,
  user: PropTypes.object,
  rooms: PropTypes.object,
  messages: array,
  length: PropTypes.number,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
    rooms: reduxStoreState.rooms,
  };
};

export default connect(mapStateToProps, { socketService, setMessages })(
  ChatWindow
);

// ChatWindow.propTypes = {
//   users: PropTypes.object,
// };

// // import React from 'react';
// // import PropTypes from 'prop-types';
// // import { socket } from '../../services/socketService';

// // class ChatWindow extends React.Component {
// //   componentDidMount() {
// //     // console.log(socket);
// //     // socket.on('message', message => {
// //     //   const { messages } = this.state;
// //     //   this.setState({ messages: [...messages, message] });
// //     // });
// //   }
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       messages: [] /* List of all messages within the public lobby */,
// //       message: '' /* Current message */,
// //     };
// //   }
// //   sendMessage(message) {
// //     if (message === '') {
// //       return false;
// //     }
// //     socket.emit('message', message);
// //     this.setState({ message: '' });
// //   }
// //   render() {
// //     //const { users } = this.props;
// //     return (
// //       <div className="chat-window">
// //         {/* <ChatWindow.Users users={users} />
// //         <div className="input-container">
// //           <input
// //             type="text"
// //             onChange={e => this.setState({ message: e.target.value })}
// //             placeholder="Enter your message here..."
// //           />
// //           Send
// //         </div> */}
// //       </div>
// //     );
// //   }
// // }

// // ChatWindow.propTypes = {
// //   users: PropTypes.object,
// // };

// // export default ChatWindow;
