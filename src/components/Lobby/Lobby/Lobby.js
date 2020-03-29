import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import PropTypes from 'prop-types';

import socketService from '../../../services/socketService';
import RenderUsersOnline from '../RenderUserListOnline/RenderUserListOnline';
import ChatWindow from '../../Chat/ChatWindow/ChatWindow';
import CreateRoomFrom from '../LobbyForm/LobbyForm';
import RenderUserListInRoom from '../../Chat/RenderUserListInRoom/RenderUserListInRoom';
import RenderRoomsAvailable from '../RenderRoomsAvailable/RenderRoomsAvailable';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // hasJoinedRoom: false,
    };
  }

  leaveRoom(e) {
    e.preventDefault();
    const { room } = this.props.user;
    console.log('Lobby > leave room', room);
    socketService.leaveRoom(room);
  }

  render() {
    const { room } = this.props.user;
    const { rooms } = this.props;
    console.log('ROOMS', rooms);
    console.log('rooms', Object.keys(rooms), 'room', room);
    return (
      <Card>
        {Object.keys(rooms).find((r) => r === room) ? (
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
        ) : (
          <Row>
            <Col sm={8}>
              <RenderRoomsAvailable />
              <CreateRoomFrom />
            </Col>
            <Col sm={4}>
              <RenderUsersOnline />
            </Col>
          </Row>
        )}
      </Card>
    );
  }
}

Lobby.propTypes = {
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

export default connect(mapStateToProps)(Lobby);
