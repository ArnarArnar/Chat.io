import React from 'react';
import { connect } from 'react-redux';
//import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//import socketService from '../../services/socketService';
import ViewAllRooms from '../ViewAllRooms/ViewAllRooms';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

import LoginForm from '../Forms/LoginForm';

class LogIn extends React.Component {
  signOut() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <React.Fragment>
        <Row
          className="justify-content-center align-items-center"
          style={{
            minHeight: '100%',
          }}
        >
          <Col>
            {this.props.user.user === '' ? (
              <>
                <LoginForm />
              </>
            ) : (
              <>
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand>Chat.io</Navbar.Brand>
                  <Navbar.Text>
                    Logged in as: {this.props.user.user}
                  </Navbar.Text>
                  <Navbar.Collapse className="justify-content-end">
                    <Button
                      className="justify-content-end"
                      variant="outline-light"
                      type="submit"
                      onClick={(e) => this.signOut(e)}
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
  user: PropTypes.any,
};
const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps)(LogIn);
