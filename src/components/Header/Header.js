import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import signOut from '../LogIn/LogIn/LogIn';
import PropTypes from 'prop-types';

const Header = ({ userName }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Chat.io</Navbar.Brand>
      <Navbar.Text>Logged in as: {userName}</Navbar.Text>
      <Navbar.Collapse className="justify-content-end">
        <Button
          className="justify-content-end"
          variant="outline-light"
          type="submit"
          onClick={(e) => signOut(e)}
        >
          Sign Out
        </Button>{' '}
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  userName: PropTypes.string,
};

export default Header;
