import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addUser } from '../../Store/actions';
//import socketService from '../../services/socketService';
import ViewAllRooms from '../ViewAllRooms/ViewAllRooms';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userNameError: null,
      isLoggedIn: false,
      isLoggedInError: null,
    };
  }
  async componentDidMount() {}

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
    if (e.target.name === 'userName') {
      const userName = e.target.value;
      if (userName.indexOf(' ') > 0) {
        this.setState({ userNameError: 'Username cannot spaces' }, () => {
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

  signOut() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    let { userName } = this.state;

    return (
      <React.Fragment>
        <Row
          className="justify-content-center align-items-center"
          style={{
            minHeight: '100%',
          }}
        >
          <Col>
            {this.state.isLoggedIn !== true ? (
              <>
                <Form>
                  <Form.Group controlId="form-user-name">
                    <Form.Label as="h5">Create a username</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="userName"
                      value={userName}
                      placeholder="Choose a username"
                      onChange={e => this.onChange(e)}
                    />
                    {this.state.userNameError !== null && (
                      <Form.Control.Feedback
                        style={{ display: 'block' }}
                        type="invalid"
                      >
                        {this.state.userNameError}
                      </Form.Control.Feedback>
                    )}
                    {this.state.isLoggedIn !== null && (
                      <Form.Control.Feedback
                        style={{ display: 'block' }}
                        type="invalid"
                      >
                        {this.state.isLoggedInError}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Button
                    className="btn-block"
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
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand>Chat.io</Navbar.Brand>
                  <Navbar.Text>Logged in as: {this.props.userName}</Navbar.Text>
                  <Navbar.Collapse className="justify-content-end">
                    <Button
                      className="justify-content-end"
                      variant="outline-light"
                      type="submit"
                      onClick={e => this.signOut(e)}
                    >
                      Sign Out
                    </Button>{' '}
                  </Navbar.Collapse>
                </Navbar>
                <br />
                <ViewAllRooms />
              </>
            )}
          </Col>
        </Row>
      </React.Fragment>
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
