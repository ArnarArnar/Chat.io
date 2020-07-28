import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import RenderUserListOnline from '../RenderUserListOnline/RenderUserListOnline';
import SpinnerLoading from '../../SpinnerLoading/SpinnerLoading';
import MessageForm from '../MessageForm/MessageForm';
import RenderMessages from '../RenderMessages/RenderMessages';

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: '',
    };
    this.changeSelectedUser = this.changeSelectedUser.bind(this);
  }

  componentDidMount() {
    const { userList } = this.props;
    if (userList[0] !== this.props.user && userList[0] !== undefined) {
      this.setState({ selectedUser: userList[0] });
    } else if (userList[0] !== this.props.user && userList[0] !== undefined) {
      this.setState({ selectedUser: userList[0] });
    }
    if (document.getElementById('message-window')) {
      document.getElementById('message-window').scrollTo(0, 10000);
    }
  }

  componentDidUpdate() {
    if (document.getElementById('message-window')) {
      document.getElementById('message-window').scrollTo(0, 10000);
    }
  }

  changeSelectedUser(e, user) {
    e.preventDefault(e);
    this.setState({ selectedUser: Object.values(user).toString() });
  }

  render() {
    const { room, user, messages } = this.props.user;
    const { selectedUser } = this.state;
    if (room !== '') {
      return <Redirect to={{ pathname: `/room/${room}` }} />;
    } else if (user === '') {
      return <Redirect to={{ pathname: '/' }} />;
    }
    const { userList } = this.props;
    return (
      <Card className="pb-3">
        <Card.Header as="h5" className="mb-3">
          <Row>
            <Col>
              {selectedUser
                ? `Private Chat with ${selectedUser}`
                : 'Select a user to chat with'}
            </Col>
            <Col sm={4}>
              <Link to="/lobby">
                <Button
                  className="float-right btn-sm btn-block"
                  variant="secondary"
                  type="submit"
                >
                  Back to lobby
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Header>
        <Row className="mr-1">
          <Col sm={8}>
            <Container>
              <div
                id="message-window"
                className="list-group d-flex"
                variant="bottom"
                style={renderListStyle}
              >
                {selectedUser ? (
                  <RenderMessages
                    selectedUser={selectedUser}
                    messages={messages}
                  />
                ) : (
                  <>
                    <br></br>
                    <p className="text-center">No users online</p>
                  </>
                )}
              </div>
              <MessageForm selectedUser={selectedUser} />
            </Container>
          </Col>
          <Col sm={4}>
            {userList ? (
              <RenderUserListOnline
                currentUser={user}
                userList={userList}
                changeSelectedUser={this.changeSelectedUser}
                selectedUser={selectedUser}
              />
            ) : (
              <SpinnerLoading />
            )}
          </Col>
        </Row>
      </Card>
    );
  }
}

const renderListStyle = {
  height: '70vh',
  overflowX: 'hidden',
};

PrivateChat.propTypes = {
  userList: PropTypes.array,
  user: PropTypes.object,
  messages: PropTypes.array,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
    userList: reduxStoreState.userList,
    rooms: reduxStoreState.rooms,
  };
};

export default connect(mapStateToProps, {})(PrivateChat);
