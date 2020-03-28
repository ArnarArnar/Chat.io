import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

import { getRoomList, joinRoom } from '../../../Store/actions';
import socketService from '../../../services/socketService';
import ViewUsersOnline from '../../ViewUsersOnline/ViewUsersOnline';
import ChatWindow from '../../Chat/ChatWindow/ChatWindow';
import CreateRoomFrom from '../../Lobby/LobbyForm/LobbyForm';
import RenderUserListInRoom from '../../Chat/RenderUserListInRoom/RenderUserListOnline';

class ViewAllRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasJoinedRoom: false,
    };
  }

  async componentDidMount() {
    await this.props.getRoomList();
  }

  async joinRoom(e) {
    e.preventDefault(e);
    const success = await this.props.joinRoom({
      room: e.target.innerText,
    });
    // TODO: test to see if it works
    if (success !== undefined) {
      console.log('Join room no successful: ', success);
      return <Alert color="primary">{success.reason}</Alert>;
    }
  }

  leaveRoom(e) {
    e.preventDefault();
    const { room } = this.props.user;
    console.log('leave room', room);
    socketService.leaveRoom(room);
  }

  RoomsAvailable() {
    const { rooms } = this.props;
    return (
      <Card>
        <Card.Header as="h5">Available Rooms</Card.Header>
        <ListGroup>
          {Object.entries(rooms).map((l) => {
            return (
              <ListGroup.Item
                action
                onClick={(e) => this.joinRoom(e)}
                key={l[0]}
              >
                {l[0]}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    );
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
              {this.RoomsAvailable()}
              <CreateRoomFrom />
            </Col>
            <Col sm={4}>
              <ViewUsersOnline />
            </Col>
          </Row>
        )}
      </Card>
    );
  }
}

ViewAllRooms.propTypes = {
  getRoomList: PropTypes.func,
  joinRoom: PropTypes.func,
  leaveRoom: PropTypes.func,
  currentRoom: PropTypes.object,
  rooms: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    rooms: reduxStoreState.rooms,
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps, { getRoomList, joinRoom })(
  ViewAllRooms
);
