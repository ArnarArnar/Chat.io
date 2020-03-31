import React from 'react';
import { connect } from 'react-redux';
import SpinnerLoading from '../../SpinnerLoading/SpinnerLoading';
import { kickUser, banUser, promoteUserToOp } from '../../../Store/actions';
import RenderUserListItem from '../RenderUserListItem/RenderUserListItem';

import PropTypes from 'prop-types';

class RenderUserListInRoom extends React.Component {
  constructor(props) {
    super(props);
    this.kick = this.kick.bind(this);
    this.ban = this.ban.bind(this);
    this.op = this.op.bind(this);
  }
  kick(e, user) {
    e.preventDefault(e);
    const { room } = this.props.user;
    this.props.kickUser({ user: Object.values(user).toString(), room: room });
  }
  ban(e, user) {
    e.preventDefault(e);
    const { room } = this.props.user;
    this.props.banUser({ user: Object.values(user).toString(), room: room });
  }
  op(e, user) {
    e.preventDefault(e);
    const { room } = this.props.user;
    this.props.promoteUserToOp({
      user: Object.values(user).toString(),
      room: room,
    });
  }

  render() {
    const { rooms } = this.props;
    const { room, user } = this.props.user;

    if (room) {
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
          <RenderUserListItem
            opsInRoom={opsInRoom}
            nonOpsInRoom={nonOpsInRoom}
            isCurrentUserOp={isCurrentUserOp}
            kick={this.kick}
            ban={this.ban}
            op={this.op}
          />
        </>
      );
    }
    return (
      <>
        <SpinnerLoading />
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
