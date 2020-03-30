import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ location }) => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h3>The resource at {location.pathname} was not found </h3>
    </div>
  );
};

NotFound.propTypes = {
  location: PropTypes.string,
  pathname: PropTypes.string,
};

export default NotFound;
