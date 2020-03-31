import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';

import socketService from '../../../services/socketService';
import MessageForm from '../MessageForm/MessageForm';
import SpinnerLoading from '../../SpinnerLoading/SpinnerLoading';
import RenderMessages from '../RenderMessages/RenderMessages';
class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    //this.divRef = React.createRef();
  }

  // componentDidMount() {
  //   this.scrollToBottom();
  // }

  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }
  // scrollToBottom() {
  //   setInterval(() => {
  //     this.divRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }, 500);
  // }

  render() {
    const { room } = this.props.user;
    const { rooms } = this.props;
    return (
      <Row>
        <Col>
          <Container>
            <div
              className="list-group"
              variant="bottom"
              ref={this.divRef}
              style={{
                marginBottom: '60px',
                height: '50vh',
                overflowX: 'hidden',
              }}
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
