import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

import PropTypes from 'prop-types';

class RenderUserListInRoom extends React.Component {
  componentDidMount() {}

  userListItems(currentRoom) {
    return Object.keys(currentRoom.users).map((u) => {
      if (Object.keys(currentRoom.ops).find((o) => o == u)) {
        return <ListGroup.Item key={u}> {u} Operator</ListGroup.Item>;
      }
      return <ListGroup.Item key={u}>{u}</ListGroup.Item>;
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
  rooms: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
    rooms: reduxStoreState.rooms,
  };
};

export default connect(mapStateToProps)(RenderUserListInRoom);
