import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { kickUser, banUser, promoteUserToOp } from '../../../Store/actions';

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

class RenderUserListInRoom extends React.Component {
  kick(e, user) {
    e.preventDefault(e);
    console.log('Kick > user', user);
    const { room } = this.props.user;
    this.props.kickUser({ user: Object.values(user).toString(), room: room });
  }
  ban(e, user) {
    e.preventDefault(e);
    console.log('ban > user', user);
    const { room } = this.props.user;
    this.props.banUser({ user: Object.values(user).toString(), room: room });
  }
  op(e, user) {
    e.preventDefault(e);
    console.log('op > user', user);
    const { room } = this.props.user;
    this.props.promoteUserToOp({
      user: Object.values(user).toString(),
      room: room,
    });
  }

  render() {
    const { rooms } = this.props;
    const { room, user } = this.props.user;
    console.log('RenderUserListInRoom > rooms', rooms);
    console.log('RenderUserListInRoom > room', room);

    let users = Object.values(rooms[room].users).map((m) => m);
    let ops = Object.values(rooms[room].ops).map((m) => m);

    let opsInRoom = users.filter((u) => {
      return ops.includes(u);
    });

    let nonOpsInRoom = users.filter((u) => {
      return !opsInRoom.includes(u);
    });

    let isCurrentUserOp = ops.find((o) => o === user);

    return (
      <>
        <Card>
          <Card.Header as="h5">Users in room</Card.Header>
          <ListGroup>
            {opsInRoom.map((u) => {
              return <ListGroup.Item key={u}> {u} Op</ListGroup.Item>;
            })}
          </ListGroup>
          <ListGroup>
            {nonOpsInRoom.map((u) => {
              return (
                <ListGroup.Item key={u}>
                  {u}
                  {isCurrentUserOp ? (
                    <>
                      <Button
                        size="sm"
                        variant="warning"
                        id="kick"
                        onClick={(e) => this.kick(e, { u })}
                      >
                        Kick
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        id="ban"
                        onClick={(e) => this.ban(e, { u })}
                      >
                        Ban
                      </Button>
                      <Button
                        size="sm"
                        variant="info"
                        id="op"
                        onClick={(e) => this.op(e, { u })}
                      >
                        Op
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </>
    );
  }
}

RenderUserListInRoom.propTypes = {
  kickUser: PropTypes.func,
  banUser: PropTypes.func,
  promoteUserToOp: PropTypes.func,
  rooms: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user,
    rooms: reduxStoreState.rooms,
  };
};

export default connect(mapStateToProps, { kickUser, banUser, promoteUserToOp })(
  RenderUserListInRoom
);
