import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addUser } from '../../Store/actions';
import ViewAllRooms from '../ViewAllRooms/ViewAllRooms';
import PropTypes from 'prop-types';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isLoggedIn: false,
    };
  }

  async addUser(username) {
    return await this.props.addUser(username);
  }

  async logIn(e) {
    e.preventDefault();
    const { userName } = this.state;
    const isLoggedIn = await this.addUser(userName);
    console.log('addUserSuccess', isLoggedIn);
    if (!isLoggedIn) {
      {
        console.log('Unable to log in, username taken');
      }
    } else {
      this.setState({
        userName: '',
        isLoggedIn: true,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signOut(e) {
    e.preventDefault();
    this.setState({ isLoggedIn: false });
  }

  render() {
    let { userName } = this.state;

    return (
      <div>
        {this.state.isLoggedIn !== true ? (
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
              <Button
                variant="primary"
                type="submit"
                onClick={e => this.logIn(e)}
              >
                Submit
              </Button>
            </Form>
          </>
        ) : (
          <>
            <div>Logged in as: {this.props.userName}</div>
            <Button
              variant="primary"
              type="submit"
              onClick={e => this.signOut(e)}
            >
              Sign Out
            </Button>{' '}
            <ViewAllRooms />
          </>
        )}
      </div>
    );
  }
}

LogIn.propTypes = {
  userName: PropTypes.string,
  addUser: PropTypes.func,
};
const mapStateToProps = reduxStoreState => {
  return {
    userName: reduxStoreState.user.userName,
  };
};

export default connect(mapStateToProps, { addUser })(LogIn);
