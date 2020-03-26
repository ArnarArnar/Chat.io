import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { getRoomList, joinRoom } from '../../Store/actions';
import socketService from '../../services/socketService';

import ListGroup from 'react-bootstrap/ListGroup';
//import Form from 'react-bootstrap/Form';
//import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
//import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import PropTypes from 'prop-types';
import CreateRoomFrom from '../Forms/CreateRoomFrom';

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

  // ## this is a comment

  async joinRoom(e) {
    e.preventDefault(e);
    //console.log('ViewAllRooms > joinRoom > e', e.target.innerText);
    this.props.joinRoom({
      room: e.target.innerText,
    });
  }

  leaveRoom(e) {
    e.preventDefault();
    console.log('leave room', this.props.currentRoom.roomName.room);
    socketService.leaveRoom(this.props.currentRoom.roomName.room);
  }
  RoomsAvailable() {
    const { rooms } = this.props;
    //console.log('Rooms available ', rooms);
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
    return (
      <Card>
        {room !== undefined ? (
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
          </Card.Header>
        ) : (
          <>
            <>{this.RoomsAvailable()}</>
            {
              <>
                <CreateRoomFrom />
                <br />
                <br />
              </>
            }
          </>
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
