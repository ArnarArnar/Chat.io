import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import LogInForm from '../LogInForm/LogInForm';

class LogIn extends React.Component {
  render() {
    const { user } = this.props.user;
    if (user) {
      return <Redirect to="/lobby" />;
    }
    return (
      <Jumbotron>
        <LogInForm />
      </Jumbotron>
    );
  }
}

LogIn.propTypes = {
  user: PropTypes.string,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps)(LogIn);
