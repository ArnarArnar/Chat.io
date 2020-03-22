import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { getRoomList, joinRoom } from '../../Store/actions';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

import PropTypes from 'prop-types';

class ViewAllRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
    };
  }
  async componentDidMount() {
    await this.props.getRoomList();
  }

  componentDidUpdate() {}

  joinRoom(e) {
    e.preventDefault(e);
    console.log('joinRoom>e', e.target.innerText);
    this.props.joinRoom({ room: e.target.innerText + 'X' });
    this.props.getRoomList();
  }

  createRoom(e) {
    e.preventDefault();
    const { roomName } = this.state;
    console.log('===========create room > roomName', roomName);
    this.props.joinRoom({ room: roomName });
    this.props.getRoomList();
  }

  updateRooms(e) {
    e.preventDefault();
    this.props.getRoomList();
  }

  RoomsAvailable(roomList) {
    // console.log('ViewAllRooms > updateRooms', roomList);
    // console.log('aaa', Object.entries(roomList));
    // console.log('is array?', Array.isArray(roomList));
    // console.log('is typeOf?', typeof roomList);
    return (
      <ListGroup>
        {Object.entries(roomList).map(l => {
          return (
            <ListGroup.Item action onClick={e => this.joinRoom(e)} key={l[0]}>
              {l[0]}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const roomList = this.props.roomList;
    let { room } = this.props;
    return (
      <div>
        {Object.keys(roomList).length > 0 ? (
          <>{this.RoomsAvailable(roomList)}</>
        ) : (
          <>Loading roomList</>
        )}
        {
          <Form>
            <Form.Group controlId="formRoomName">
              <Form.Label>Create new room</Form.Label>
              <Form.Control
                type="text"
                name="roomName"
                value={room}
                placeholder="Room name"
                onChange={e => this.onChange(e)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={e => this.createRoom(e)}
            >
              Create room
            </Button>
          </Form>
        }
      </div>
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
  currentRoom: PropTypes.string,
  room: PropTypes.any,
};

const mapStateToProps = reduxStoreState => {
  const { roomList, currentRoom } = reduxStoreState.rooms;
  return {
    currentRoom: currentRoom,
    roomList: roomList,
  };
};

export default connect(mapStateToProps, { getRoomList, joinRoom })(
  ViewAllRooms
);
