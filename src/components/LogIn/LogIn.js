import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PropTypes from 'prop-types';

class LogIn extends React.Component {
  render() {
    let { userName } = this.props;
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
