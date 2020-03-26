import React from 'react';
import { connect } from 'react-redux';
//import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { getUserList } from '../../Store/actions';

import PropTypes from 'prop-types';

class ViewAllUsers extends React.Component {
  componentDidMount() {
    this.props.getUserList();
  }

  getUsers(e) {
    e.preventDefault();
    //console.log('ViewAllUsers.js > getUserList ');
    this.props.getUserList();
  }

  userListItems(userList) {
    return userList.map((userList) => <li key={userList}>{userList}</li>);
  }

  render() {
    const { userList } = this.props;
    {
      console.log('Userlist', userList);
    }
    return (
      <>
        <Button variant="info" type="submit" onClick={(e) => this.getUsers(e)}>
          Get User List
        </Button>
        <Button
          variant="info"
          type="submit"
          onClick={(e) => this.checkProps(e)}
        >
          Check props
        </Button>
        <ol>{this.userListItems(userList)}</ol>
      </>
    );
  }
}

ViewAllUsers.propTypes = {
  getUserList: PropTypes.func,
  userList: PropTypes.any,
  key: PropTypes.any,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    userList: reduxStoreState.userList,
  };
};

export default connect(mapStateToProps, { getUserList })(ViewAllUsers);
