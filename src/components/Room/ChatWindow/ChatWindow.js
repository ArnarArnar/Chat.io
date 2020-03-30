import React from 'react';
import PropTypes from 'prop-types';
import socketService from '../../../services/socketService';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import MessageForm from '../MessageForm/MessageForm';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
  }

  // componentDidMount() {
  //   this.scrollToBottom();
  // }

  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }
  // scrollToBottom() {
  //   setInterval(() => {
  //     this.divRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }, 500);
  // }

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

    const messagesInRoom = rooms[room].messageHistory;

    if (messagesInRoom) {
      return (
        <>
          {messagesInRoom.map((message) => (
            <li className="list-group-item" key={message.timestamp}>
              <strong>{message.nick}</strong>
              <p>{message.timestamp}</p>
              <p>{message.message}</p>{' '}
            </li>
          ))}
          <div ref={this.divRef} />
        </>
      );
    }
    return <strong>No messages...</strong>;
  }

  render() {
    const { room } = this.props.user;
    console.log('this.props.user', this.props.user);
    return (
      <div>
        <Row>
          <Col>
            <Container>
              <div
                className="list-group"
                variant="bottom"
                ref={this.divRef}
                style={{
                  marginBottom: '60px',
                  height: '50vh',
                  overflowX: 'hidden',
                }}
              >
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
              </div>
              <MessageForm />
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}

//TODO taka til
ChatWindow.propTypes = {
  user: PropTypes.object,
  rooms: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
    rooms: reduxStoreState.rooms,
  };
};

export default connect(mapStateToProps, { socketService })(ChatWindow);
