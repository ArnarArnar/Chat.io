import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import socketService from '../../../services/socketService';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  async sendMessage(e) {
    e.preventDefault();
    const { message } = this.state;
    if (message === '') {
      return false;
    }
    const messageObject = {
      nick: this.props.selectedUser,
      message: message,
    };
    await socketService.sendPrivateMessage(messageObject);

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
            placeholder="Type private message here..."
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
  selectedUser: PropTypes.string,
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
