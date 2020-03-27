import React from 'react';
import { connect } from 'react-redux';
//import Form from 'react-bootstrap/Form';

//import socketService from '../../services/socketService';
import ViewAllRooms from '../../Lobby/Lobby/Lobby';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LogInForm from '../LogInForm/LogInForm';
import Header from '../../Header/header';

class LogIn extends React.Component {
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
                <br />
                <br />
                <LogInForm />
              </>
            ) : (
              <>
                <Header />
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
