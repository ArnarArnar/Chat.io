import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

const RenderUsersOnline = (props) => {
  return (
    <>
      <Card>
        <Card.Header as="h5">Users online</Card.Header>
        <ListGroup>
          {props.userList.map((userList) => {
            return <ListGroup.Item key={userList}>{userList}</ListGroup.Item>;
          })}
        </ListGroup>
      </Card>
    </>
  );
};

RenderUsersOnline.propTypes = {
  userList: PropTypes.array,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    userList: reduxStoreState.userList,
  };
};

export default connect(mapStateToProps)(RenderUsersOnline);
