import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
//import signOut from '../LogIn/LogIn/LogIn';
import PropTypes from 'prop-types';
import socketService from '../../services/socketService';

const Header = ({ userName }) => {
  const signUserOut = (e) => {
    e.preventDefault(e);
    socketService.signOut(e);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Chat.io</Navbar.Brand>
      <Navbar.Text>Logged in as: {userName}</Navbar.Text>
      <Navbar.Collapse className="justify-content-end">
        <Button
          className="justify-content-end"
          variant="outline-light"
          type="submit"
          onClick={(e) => signUserOut(e)}
        >
          Sign Out
        </Button>{' '}
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  signOut: PropTypes.func,
  userName: PropTypes.string,
};

//export default Header;
export default Header;
