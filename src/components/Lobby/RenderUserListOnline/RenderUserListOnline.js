import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

const RenderUsersOnline = (props) => {
  return (
    <>
      <Card
        id="message-window"
        className="list-group d-flex"
        variant="bottom"
        style={renderListStyle}
      >
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

const renderListStyle = {
  height: '70vh',
  overflowX: 'hidden',
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
