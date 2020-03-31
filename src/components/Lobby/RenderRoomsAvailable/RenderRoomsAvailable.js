import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

import { joinRoom } from '../../../Store/actions';

const RenderRoomsAvailable = (props) => {
  const joinRoom = async (e) => {
    e.preventDefault(e);
    const cb = await props.joinRoom({
      room: e.target.innerText,
    });
    if (!cb.success) {
      alert(`Unable to join room: ${cb.reason}`);
    }
  };

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
  joinRoom: PropTypes.func,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    rooms: reduxStoreState.rooms,
  };
};

export default connect(mapStateToProps, { joinRoom })(RenderRoomsAvailable);
