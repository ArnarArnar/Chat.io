import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Col, Row, Button } from 'react-bootstrap';

import socketService from '../../../services/socketService';
import ChatWindow from '../../Room/ChatWindow/ChatWindow';
import RenderUserListInRoom from '../../Room/RenderUserListInRoom/RenderUserListInRoom';

class Room extends React.Component {
  leaveRoom(e) {
    e.preventDefault();
    const { room } = this.props.user;
    socketService.leaveRoom(room);
  }

  render() {
    const { room } = this.props.user;
    if (room === '') {
      return <Redirect to={{ pathname: `/lobby` }} />;
    }
    return (
      <Card>
        <Card.Header as="h5" className="mb-3">
          <Row>
            <Col>Current room is {room}</Col>
            <Col sm={4}>
              <Button
                className="float-right btn-sm btn-block"
                variant="secondary"
                type="submit"
                onClick={(e) => this.leaveRoom(e)}
              >
                Back to lobby
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Row className="mr-1">
          <Col sm={8}>
            <ChatWindow />
          </Col>
          <Col sm={4}>
            <RenderUserListInRoom />
          </Col>
        </Row>
      </Card>
    );
  }
}

Room.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps)(Room);
