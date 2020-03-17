import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PropTypes from 'prop-types';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  logInUser(userName) {
    console.log('User name is :', userName);
    console.log(socket);
    const { socket } = this.context;

    socket.emit('adduser', userName, function(data) {
      return data;
    });
    socket.emit('users');
    socket.on('userlist', function(cb) {
      console.log('usersListener cb', cb);
    });
  }

  logIn(e) {
    e.preventDefault();
    const { userName } = this.state;
    const callback = this.logInUser(userName);
    console.log('callback', callback);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let { userName } = this.state;
    {
      console.log(userName);
    }
    return (
      <>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Create a username</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={userName}
              placeholder="Username"
              onChange={e => this.onChange(e)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={e => this.logIn(e)}>
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

LogIn.propTypes = {
  userName: PropTypes.string,
};

export default LogIn;
