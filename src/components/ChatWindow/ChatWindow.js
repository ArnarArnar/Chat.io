import React from 'react';
import PropTypes from 'prop-types';
import socketService from '../../services/socketService';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

class ChatWindow extends React.Component {
  componentDidMount() {
    //console.log("ChatWindow > componentDidMount");
    socketService.socket.on('updatechat', (roomName, data) => {
      console.log('ChatWindow > updatechat. data.roomName', roomName, data);
      //const { messages } = this.state;
      this.setState({ messages: [data] });
    });
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
    // const testCurrentRoom = 'test';
    // console.log('Send mess, this props ', this.props);
    const testCurrentRoom = this.props.thisRoom.roomName.room;
    console.log('testCurrentRoom ', testCurrentRoom);
    const { message } = this.state;
    console.log(
      'ChatWindow > sendMessage',
      message,
      'current room ',
      testCurrentRoom
    );
    if (message === '') {
      return false;
    }
    socketService.socket.emit('sendmsg', {
      msg: message,
      roomName: testCurrentRoom,
    });
    this.setState({ message: '' });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  logout(e) {
    console.log('logout', e);
  }

  render() {
    return (
      <div
        className="bg-light page"
        style={{ height: '100vh', overflowX: 'hidden' }}
      >
        <Row>
          <Col>
            <Container>
              <ul className="list-group" style={{ marginBottom: '60px' }}>
                {this.state.messages.length > 0 ? (
                  this.state.messages.map(msg =>
                    msg.map(m => (
                      <li className="list-group-item" key={m.timestamp}>
                        <strong>{m.nick}</strong>
                        <p>{m.timestamp}</p>
                        <p>{m.message}</p>{' '}
                      </li>
                    ))
                  )
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
                onSubmit={e => this.sendMessage(e)}
              >
                <Form.Group style={{ flex: 1 }}>
                  <Form.Control
                    required
                    type="text"
                    name="message"
                    value={this.state.message}
                    style={{ width: '100%' }}
                    placeholder="Type Message here..."
                    onChange={e => this.onChange(e)}
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
  getRoomList: PropTypes.func,
  joinRoom: PropTypes.func,
  roomList: PropTypes.object,
  key: PropTypes.any,
  lobby: PropTypes.any,
  allRooms: PropTypes.any,
  currentRoom: PropTypes.object,
  room: PropTypes.any,
  thisRoom: PropTypes.object,
};

const mapStateToProps = reduxStoreState => {
  return {
    thisRoom: reduxStoreState.rooms.currentRoom,
  };
};

export default connect(mapStateToProps, { socketService })(ChatWindow);

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
