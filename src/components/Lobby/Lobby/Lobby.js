import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';

import RenderUsersOnline from '../RenderUserListOnline/RenderUserListOnline';
import CreateRoomFrom from '../LobbyForm/LobbyForm';
import RenderRoomsAvailable from '../RenderRoomsAvailable/RenderRoomsAvailable';

class Lobby extends React.Component {
  render() {
    const { room, user } = this.props.user;
    if (room !== '') {
      return <Redirect to={{ pathname: `/room/${room}` }} />;
    } else if (user === '') {
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
  room: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps)(Lobby);
