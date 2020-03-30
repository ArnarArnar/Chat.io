import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import RenderUsersOnline from '../RenderUserListOnline/RenderUserListOnline';
import CreateRoomFrom from '../LobbyForm/LobbyForm';
import RenderRoomsAvailable from '../RenderRoomsAvailable/RenderRoomsAvailable';

class Lobby extends React.Component {
  render() {
    console.log('LOBBY');
    console.log('this.props.user.room', this.props.user.room);
    if (this.props.user.room !== '') {
      console.log('Lobby > this.props.user.room is undefined');
      return <Redirect to={{ pathname: `/room/${this.props.user.room}` }} />;
    } else if (this.props.user.user === '') {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <Card>
        <Row>
          <Col sm={8}>
            <RenderRoomsAvailable />
            <CreateRoomFrom />
          </Col>
          <Col sm={4}>
            <RenderUsersOnline />
          </Col>
        </Row>
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
