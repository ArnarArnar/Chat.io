import React from 'react';
import PropTypes from 'prop-types';
import { Button, Navbar } from 'react-bootstrap';

import socketService from '../../services/socketService';

const Header = ({ userName }) => {
  const signUserOut = (e) => {
    e.preventDefault(e);
    socketService.signOut(e);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Chat.io</Navbar.Brand>
      {userName ? (
        <>
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
        </>
      ) : (
        <></>
      )}
    </Navbar>
  );
};

Header.propTypes = {
  userName: PropTypes.string,
};

export default Header;
