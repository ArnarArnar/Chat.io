import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { kickUser } from '../../../Store/actions';

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

class RenderUserListInRoom extends React.Component {
  kick(e) {
    e.preventDefault(e);
    this.props.kickUser({
      room: e.target.innerText,
    });
  }

  userListItems(currentRoom) {
    return Object.keys(currentRoom.users).map((u) => {
      if (Object.keys(currentRoom.ops).find((o) => o == u)) {
        return <ListGroup.Item key={u}> {u} Op</ListGroup.Item>;
      }
      return (
        <ListGroup.Item key={u}>
          {u}
          <Button size="sm" variant="warning" onClick={(e) => this.kick(e)}>
            Kick
          </Button>
        </ListGroup.Item>
      );
    });
  }
  render() {
    const { rooms } = this.props;
    const { room } = this.props.user;
    console.log('rooms', rooms);
    console.log('room', room);
    const currentRoom = rooms[room];
    console.log('Users', currentRoom.users);
    console.log('Object.values(users)', Object.values(currentRoom));
    return (
      <>
        <Card>
          <Card.Header as="h5">Users in room</Card.Header>
          <ListGroup>{this.userListItems(currentRoom)}</ListGroup>
        </Card>
      </>
    );
  }
}

RenderUserListInRoom.propTypes = {
  kickUser: PropTypes.func,
  rooms: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
    rooms: reduxStoreState.rooms,
  };
};

export default connect(mapStateToProps, { kickUser })(RenderUserListInRoom);
