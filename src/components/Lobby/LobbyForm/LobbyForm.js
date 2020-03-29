import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { joinRoom } from '../../../Store/actions';
import PropTypes from 'prop-types';

class RoomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasJoinedRoom: false,
      roomName: '',
      roomNameError: null,
      isEnabled: false,
    };
  }

  onChange(e) {
    const { rooms } = this.props;
    if (e.target.name === 'roomName') {
      const roomName = e.target.value;
      if (roomName.indexOf(' ') > 0) {
        this.setState(
          {
            roomNameError: 'Room name cannot contain spaces',
            isEnabled: false,
          },
          () => {
            console.log(this.state.roomNameError);
          }
        );
      } else if (!roomName.replace(/\s/g, '').length) {
        this.setState(
          {
            userNameError: 'The room name cannot only contain whitespace',
            isEnabled: false,
          },
          () => {
            console.log(this.state.roomNameError);
          }
        );
      } else if (Object.prototype.hasOwnProperty.call(rooms, roomName)) {
        this.setState(
          {
            roomNameError:
              'A room already has this name, please select another one',
            isEnabled: false,
          },
          () => {
            console.log(this.state.roomNameError);
          }
        );
      } else {
        this.setState({ roomNameError: null, isEnabled: true });
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  async createRoom(e) {
    e.preventDefault();
    const { roomName } = this.state;
    this.props.joinRoom({
      room: roomName,
    });
    this.setState({ roomName: '' });
  }

  render() {
    const roomName = this.state.user;
    const { isEnabled } = this.state;
    return (
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
            <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
              {this.state.roomNameError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!isEnabled}
          onClick={(e) => this.createRoom(e)}
        >
          Create room
        </Button>
      </Form>
    );
  }
}

RoomForm.propTypes = {
  joinRoom: PropTypes.func,
  rooms: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    rooms: reduxStoreState.rooms,
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps, { joinRoom })(RoomForm);
