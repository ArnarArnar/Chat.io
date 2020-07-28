import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

const RenderUsersOnline = ({
  currentUser,
  userList,
  changeSelectedUser,
  selectedUser,
}) => {
  return (
    <>
      <Card
        id="message-window"
        className="list-group d-flex"
        variant="bottom"
        style={{
          height: '70vh',
          overflowX: 'hidden',
        }}
      >
        <Card.Header as="h5">Users online</Card.Header>
        <ListGroup>
          {userList.map((user) => {
            return user === currentUser ? (
              <React.Fragment key={user}></React.Fragment>
            ) : (
              <ListGroup.Item
                key={user}
                active={user == selectedUser ? true : false}
                onClick={(e) => changeSelectedUser(e, { user })}
              >
                {user}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    </>
  );
};

RenderUsersOnline.propTypes = {
  currentUser: PropTypes.string,
  userList: PropTypes.array,
  changeSelectedUser: PropTypes.func,
  selectedUser: PropTypes.string,
};

export default RenderUsersOnline;
