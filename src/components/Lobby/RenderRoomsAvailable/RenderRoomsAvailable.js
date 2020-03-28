import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import { joinRoom } from '../../../Store/actions';

const RenderRoomsAvailable = (props) => {
  // TODO: Move this to parent component
  const joinRoom = async (e) => {
    e.preventDefault(e);
    const success = await props.joinRoom({
      room: e.target.innerText,
    });
    // TODO: test to see if it works
    if (success !== undefined) {
      console.log('Join room no successful: ', success);
      return <Alert color="primary">{success.reason}</Alert>;
    }
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
  joinRoom: PropTypes.func,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    rooms: reduxStoreState.rooms,
  };
};

export default connect(mapStateToProps, { joinRoom })(RenderRoomsAvailable);
