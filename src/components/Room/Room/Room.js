import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import PropTypes from 'prop-types';
import socketService from '../../../services/socketService';
import ChatWindow from '../../Room/ChatWindow/ChatWindow';

import RenderUserListInRoom from '../../Room/RenderUserListInRoom/RenderUserListInRoom';

class Room extends React.Component {
  leaveRoom(e) {
    e.preventDefault();
    const { room } = this.props.user;
    console.log('Lobby > leave room', room);
    socketService.leaveRoom(room);
  }

  //Object.keys(rooms).find((r) => r === room) ? (

  render() {
    const { room } = this.props.user;
    const { rooms } = this.props;
    console.log('ROOMS', rooms);
    console.log('rooms', Object.keys(rooms), 'room', room);
    return (
      <Card>
        <Card.Header as="h5">
          <Row>
            <Col>Current room is {room}</Col>
            <Col>
              <Button
                className="float-right"
                variant="secondary"
                type="submit"
                onClick={(e) => this.leaveRoom(e)}
              >
                Back to lobby
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <ChatWindow />
            </Col>
            <Col sm={4}>
              <RenderUserListInRoom />
            </Col>
          </Row>
        </Card.Header>
      </Card>
    );
  }
}

Room.propTypes = {
  leaveRoom: PropTypes.func,
  currentRoom: PropTypes.object,
  rooms: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    userList: reduxStoreState.userList,
    rooms: reduxStoreState.rooms,
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps)(Room);
