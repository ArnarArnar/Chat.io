import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import socketService from '../../../services/socketService';
import PropTypes from 'prop-types';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  sendMessage(e) {
    e.preventDefault();
    const { room } = this.props.user;
    console.log('testCurrentRoom ', room);
    const { message } = this.state;
    console.log('ChatWindow > sendMessage', message, 'current room ', room);
    if (message === '') {
      return false;
    }
    socketService.socket.emit('sendmsg', {
      msg: message,
      roomName: room,
    });
    this.setState({ message: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { message } = this.state;
    return (
      <Form inline variant="bottom" onSubmit={(e) => this.sendMessage(e)}>
        <Form.Group style={{ flex: 1 }}>
          <Form.Control
            required
            type="text"
            name="message"
            value={message}
            style={{ width: '100%' }}
            placeholder="Type Message here..."
            onChange={(e) => this.onChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    );
  }
}

MessageForm.propTypes = {
  room: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    rooms: reduxStoreState.rooms,
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps, { socketService })(MessageForm);
