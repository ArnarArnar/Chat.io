import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import './header.css';

import socketService from '../../services/socketService';

const Header = (props) => {
  const signUserOut = (e) => {
    e.preventDefault(e);
    socketService.signOut(e);
  };

  return (
    <Navbar bg="dark" variant="dark">
      {props.user.user ? (
        <>
          <Navbar.Brand>
            <Link className="text-link" to="/lobby">
              Chat.io
            </Link>
          </Navbar.Brand>
          <Navbar.Text>Logged in as: {props.user.user}</Navbar.Text>
          <Navbar.Collapse className="justify-content-end">
            {props.user.room ? (
              <></>
            ) : (
              <Link className="text-link" to="/private">
                <Button
                  className="justify-content-end"
                  variant="outline-light"
                  type="submit"
                >
                  Private messages
                </Button>
              </Link>
            )}
            <Button
              className="justify-content-end ml-3"
              variant="outline-light"
              type="submit"
              onClick={(e) => signUserOut(e)}
            >
              Sign Out
            </Button>{' '}
          </Navbar.Collapse>
        </>
      ) : (
        <>
          {' '}
          <Navbar.Brand>Chat.io</Navbar.Brand>
        </>
      )}
    </Navbar>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  userName: PropTypes.string,
  leaveRoom: PropTypes.func,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps, { socketService })(Header);
