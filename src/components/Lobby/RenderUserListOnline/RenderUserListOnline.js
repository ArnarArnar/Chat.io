import React from 'react';
import { connect } from 'react-redux';
//import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { getUserList } from '../../../Store/actions';

import PropTypes from 'prop-types';

class RenderUsersOnline extends React.Component {
  // componentDidMount() {
  //   this.props.getUserList();
  // }
  userListItems(userList) {
    return userList.map((userList) => <li key={userList}>{userList}</li>);
  }
  render() {
    const { userList } = this.props;
    return (
      <>
        <Card>
          <Card.Header as="h5">Users online</Card.Header>
          <ListGroup>
            {userList.map((userList) => {
              return <ListGroup.Item key={userList}>{userList}</ListGroup.Item>;
            })}
          </ListGroup>
        </Card>
      </>
    );
  }
}

RenderUsersOnline.propTypes = {
  getUserList: PropTypes.func,
  userList: PropTypes.any,
  key: PropTypes.any,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    userList: reduxStoreState.userList,
  };
};

export default connect(mapStateToProps, { getUserList })(RenderUsersOnline);
