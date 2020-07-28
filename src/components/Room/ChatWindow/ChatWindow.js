import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';

import socketService from '../../../services/socketService';
import MessageForm from '../MessageForm/MessageForm';
import SpinnerLoading from '../../SpinnerLoading/SpinnerLoading';
import RenderMessages from '../RenderMessages/RenderMessages';
class ChatWindow extends React.Component {
  componentDidMount() {
    if (document.getElementById('message-window')) {
      document.getElementById('message-window').scrollTo(0, 10000);
    }
  }

  componentDidUpdate() {
    if (document.getElementById('message-window')) {
      document.getElementById('message-window').scrollTo(0, 10000);
    }
  }

  render() {
    const { room } = this.props.user;
    const { rooms } = this.props;
    return (
      <Row>
        <Col>
          <Container className="pb-3">
            <div
              id="message-window"
              className="list-group d-flex"
              variant="bottom"
              style={renderListStyle}
            >
              {room ? (
                <RenderMessages rooms={rooms} room={room} />
              ) : (
                <SpinnerLoading />
              )}
            </div>
            <MessageForm />
          </Container>
        </Col>
      </Row>
    );
  }
}

const renderListStyle = {
  height: '70vh',
  overflowX: 'hidden',
};

ChatWindow.propTypes = {
  user: PropTypes.object,
  rooms: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
    rooms: reduxStoreState.rooms,
  };
};

export default connect(mapStateToProps, { socketService })(ChatWindow);
