import React from 'react';
import { connect } from 'react-redux';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
//import Modal from 'react-bootstrap/Modal';
import { joinRoom } from '../../../Store/actions';

const RenderRoomsAvailable = (props) => {
  const joinRoom = async (e) => {
    const { room } = props.user;
    e.preventDefault(e);

    console.log('joinRoom > PROPS.joinRoom', props.joinRoom);
    const cb = await props.joinRoom({
      room: e.target.innerText,
    });
    console.log('RenderRoomsAvailable > joinRoom > cb', cb);
    if (!cb.success) {
      alert(cb.reason);
    }
    console.log('`/room/${room}`', `/room/${room}`);
    //return <Redirect to={{ pathname: `/room/${room}` }} />;
  };

  console.log('RoomsAvailable', props.rooms);
  return (
    <Card>
      <Card.Header as="h5">Available Rooms</Card.Header>
      <ListGroup>
        {Object.keys(props.rooms).map((l) => {
          return (
            <ListGroup.Item action onClick={(e) => joinRoom(e)} key={l}>
              {l}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
};

RenderRoomsAvailable.propTypes = {
  rooms: PropTypes.object,
  user: PropTypes.object,
  joinRoom: PropTypes.func,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    rooms: reduxStoreState.rooms,
    user: reduxStoreState.user,
  };
};

export default connect(mapStateToProps, { joinRoom })(RenderRoomsAvailable);
