import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';

import LogInForm from '../LogInForm/LogInForm';

class LogIn extends React.Component {
  render() {
    const { user } = this.props;
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
    user: reduxStoreState.user.user,
  };
};

export default connect(mapStateToProps)(LogIn);
