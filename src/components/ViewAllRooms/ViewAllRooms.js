import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { getRoomList, joinRoom } from '../../Store/actions';
import socketService from '../../services/socketService';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
//import Spinner from 'react-bootstrap/Spinner';
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

  // ## this is a comment

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
    this.setState({ roomName: '' });

    // this.props.getRoomList();
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

  onChange(e) {
    const { rooms } = this.props;
    //console.log('onChange > this.props', rooms);
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
      } else if (Object.prototype.hasOwnProperty.call(rooms, roomName)) {
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
    //const rooms = this.props.rooms;
    const { room } = this.props.user;
    const roomName = this.state.user;
    //console.log('ViewAllRooms > this.props.rooms', rooms);
    //console.log('ViewAllRooms > this.state.roomName ', roomName);
    return (
      <Card>
        {room !== undefined ? (
          <Card.Header as="h5">
            <Row>
              <Col>Current room is {roomName}</Col>
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
