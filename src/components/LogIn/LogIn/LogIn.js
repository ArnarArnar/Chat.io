import React from 'react';
import { connect } from 'react-redux';

import Lobby from '../../Lobby/Lobby/Lobby';
import PropTypes from 'prop-types';

import Jumbotron from 'react-bootstrap/Jumbotron';
import LogInForm from '../LogInForm/LogInForm';
import Header from '../../Header/header';

class LogIn extends React.Component {
  render() {
    const { user } = this.props.user;
    return (
      <Jumbotron>
        {user === '' ? (
          <>
            <LogInForm />
          </>
        ) : (
          <>
            <Header userName={user} />
            <br />
            <Lobby />
          </>
        )}
      </Jumbotron>
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
