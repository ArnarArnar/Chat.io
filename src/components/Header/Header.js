import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { store } from '../../index';
import signOut from '../LogIn/LogIn/LogIn';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Chat.io</Navbar.Brand>
      <Navbar.Text>Logged in as: {store.getState().user.user}</Navbar.Text>
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

export default Header;
