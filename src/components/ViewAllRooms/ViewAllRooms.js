import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { getRoomList, joinRoom } from '../../Store/actions';
import socketService from '../../services/socketService';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
//import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import PropTypes from 'prop-types';

class ViewAllRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasJoinedRoom: false,
      roomName: '',
      roomNameError: null,
    };
  }

  async componentDidMount() {
    await this.props.getRoomList();
  }

  async joinRoom(e) {
    e.preventDefault(e);
    //console.log('ViewAllRooms > joinRoom > e', e.target.innerText);
    this.props.joinRoom({
      room: e.target.innerText,
    });
  }

  async createRoom(e) {
    e.preventDefault();
    const { roomName } = this.state;
    this.props.joinRoom({
      room: roomName,
    });

    this.props.getRoomList();
  }

  updateRooms(e) {
    e.preventDefault();
    this.props.getRoomList();
  }

  leaveRoom(e) {
    e.preventDefault();
    console.log('leave room', this.props.currentRoom.roomName.room);
    socketService.leaveRoom(this.props.currentRoom.roomName.room);
  }
  RoomsAvailable(roomList) {
    console.log(this.props);
    return (
      <Card>
        <Card.Header as="h5">Available Rooms</Card.Header>
        <ListGroup>
          {Object.entries(roomList).map((l) => {
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

  onChange(e) {
    console.log('this.props', this.props.roomList);
    if (e.target.name === 'roomName') {
      const roomName = e.target.value;
      if (roomName.indexOf(' ') > 0) {
        this.setState({ roomNameError: 'Room name cannot spaces' }, () => {
          console.log(this.state.roomNameError);
        });
      } else if (!roomName.replace(/\s/g, '').length) {
        this.setState(
          { userNameError: 'The room name cannot only contain whitespace' },
          () => {
            console.log(this.state.roomNameError);
          }
        );
      } else if (
        Object.prototype.hasOwnProperty.call(this.props.roomList, roomName)
      ) {
        this.setState(
          {
            roomNameError:
              'A room already has this name, please select another one',
          },
          () => {
            console.log(this.state.roomNameError);
          }
        );
      } else {
        this.setState({ roomNameError: null });
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const rooms = this.props;
    const roomList = this.props.roomList;
    const roomName = this.state.roomName;
    console.log('rooms', rooms);
    console.log('viewAllRooms, this.props.roomList', rooms.currentRoom);
    return (
      <Card>
        {rooms.currentRoom.roomName.room !== '' ? (
          <Card.Header as="h5">
            <Row>
              <Col>Current room is {rooms.currentRoom.roomName.room}</Col>
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
            {Object.keys(roomList).length > 0 ? (
              <>{this.RoomsAvailable(roomList)}</>
            ) : (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Please wait...
              </>
            )}
            {
              <>
                <br />
                <br />
                <Form>
                  <Form.Group controlId="form-room-name">
                    <Form.Label>Create new room</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="roomName"
                      value={roomName}
                      placeholder="Enter a name for a new chat room"
                      onChange={(e) => this.onChange(e)}
                    />
                    {this.state.roomNameError !== null && (
                      <Form.Control.Feedback
                        style={{ display: 'block' }}
                        type="invalid"
                      >
                        {this.state.roomNameError}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => this.createRoom(e)}
                  >
                    Create room
                  </Button>
                  <Button
                    className="float-right"
                    variant="secondary"
                    type="submit"
                    onClick={(e) => this.updateRooms(e)}
                  >
                    Update rooms
                  </Button>
                </Form>
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
  roomList: PropTypes.object,
  key: PropTypes.any,
  lobby: PropTypes.any,
  allRooms: PropTypes.any,
  currentRoom: PropTypes.object,
  rooms: PropTypes.any,
  leaveRoom: PropTypes.func,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    currentRoom: reduxStoreState.rooms.currentRoom,
    roomList: reduxStoreState.rooms.roomList,
  };
};

export default connect(mapStateToProps, { getRoomList, joinRoom })(
  ViewAllRooms
);
