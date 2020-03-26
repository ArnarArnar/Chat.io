import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { addUser } from '../../Store/actions';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userNameError: null,
      isLoggedIn: false,
      isLoggedInError: null,
    };
  }

  async logIn(e) {
    e.preventDefault();
    const { userName } = this.state;
    const isLoggedIn = await this.props.addUser(userName);
    // console.log('addUserSuccess', isLoggedIn);
    if (!isLoggedIn) {
      {
        this.setState(
          { isLoggedInError: 'Unable to log in, username taken' },
          () => {
            console.log(this.state.isLoggedInError);
          }
        );
      }
    } else {
      this.setState({
        userName: '',
        isLoggedIn: true,
        isLoggedInError: null,
      });
    }
  }

  onChange(e) {
    //let { userName } = this.state;
    if (e.target.name === 'userName') {
      const userName = e.target.value;
      if (userName.indexOf(' ') > 0) {
        this.setState({ userNameError: 'Username cannot use spaces' }, () => {
          console.log(this.state.userNameError);
        });
      } else if (!userName.replace(/\s/g, '').length) {
        this.setState(
          { userNameError: 'Username cannot only contain whitespace' },
          () => {
            console.log(this.state.userNameError);
          }
        );
      } else {
        this.setState({ userNameError: null });
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { userName } = this.state;
    return (
      <Form>
        <Form.Group controlId="form-user-name">
          <Form.Label as="h5">Create a username</Form.Label>
          <Form.Control
            required
            type="text"
            name="userName"
            value={userName}
            placeholder="Choose a username"
            onChange={(e) => this.onChange(e)}
          />
          {this.state.userNameError !== null && (
            <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
              {this.state.userNameError}
            </Form.Control.Feedback>
          )}
          {this.state.isLoggedIn !== null && (
            <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
              {this.state.isLoggedInError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button
          className="btn-block"
          variant="primary"
          type="submit"
          onClick={(e) => this.logIn(e)}
        >
          Submit
        </Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  addUser: PropTypes.func,
  userName: PropTypes.string,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    rooms: reduxStoreState.rooms,
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps, { addUser })(LoginForm);
