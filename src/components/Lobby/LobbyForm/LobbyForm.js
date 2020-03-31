import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

import { joinRoom } from '../../../Store/actions';
class RoomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.setState({
          roomNameError: 'Room name cannot contain spaces',
          isEnabled: false,
        });
      } else if (!roomName.replace(/\s/g, '').length) {
        this.setState({
          userNameError: 'The room name cannot only contain whitespace',
          isEnabled: false,
        });
      } else if (Object.prototype.hasOwnProperty.call(rooms, roomName)) {
        this.setState({
          roomNameError:
            'A room already has this name, please select another one',
          isEnabled: false,
        });
      } else if (roomName.length > 10) {
        this.setState({
          roomNameError: 'The room name cannot be longer then 10 letters',
          isEnabled: false,
        });
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
  };
};

export default connect(mapStateToProps, { joinRoom })(RoomForm);
