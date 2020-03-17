import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addUser } from '../../Store/actions';

import PropTypes from 'prop-types';

class LogIn extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userName: '',
  //   };
  // }
  componentDidMount() {
    this.props.addUser('TestDidMount');
  }

  logInUser(userName) {
    console.log('LogIn.js > LogInUser > User name is :', userName);
    this.props.addUser(userName);
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
    let { userName } = this.props;
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
  addUser: PropTypes.func,
};
const mapStateToProps = reduxStoreState => {
  return {
    userName: reduxStoreState.userName,
  };
};

export default connect(mapStateToProps, { addUser })(LogIn);
