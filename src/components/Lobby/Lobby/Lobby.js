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
    if (this.props.user.room !== undefined && this.props.user.room !== '') {
      return <Redirect to={{ pathname: `/room/${this.props.user.room}` }} />;
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
