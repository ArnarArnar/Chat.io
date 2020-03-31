import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../../Store/actions';
import PropTypes from 'prop-types';

import { Col, Row, Button, Form } from 'react-bootstrap';

class LogInForm extends React.Component {
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
    console.log('isLoggedIn', isLoggedIn);
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
        <Row>
          <Col xs={12} md={8}>
            <Form.Group controlId="form-user-name" className="align-self-end">
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
          </Col>
          <Col xs={6} md={4} className="align-self-end" style={buttonStyle}>
            <Button
              className="btn-block"
              variant="primary"
              type="submit"
              onClick={(e) => this.logIn(e)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const buttonStyle = {
  paddingBottom: '16px',
};

LogInForm.propTypes = {
  addUser: PropTypes.func,
  userName: PropTypes.string,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    rooms: reduxStoreState.rooms,
  };
};

export default connect(mapStateToProps, { addUser })(LogInForm);
