import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Card, Button } from 'react-bootstrap';

const RenderUserListItem = ({
  nonOpsInRoom,
  opsInRoom,
  isCurrentUserOp,
  kick,
  ban,
  op,
}) => {
  return (
    <Card
      id="message-window"
      className="list-group d-flex pb-3"
      variant="bottom"
      style={renderListStyle}
    >
      <Card.Header as="h5">Users in room</Card.Header>
      <ListGroup>
        {opsInRoom.map((u) => {
          return <ListGroup.Item key={u}> {u} - Admin</ListGroup.Item>;
        })}
      </ListGroup>
      <ListGroup>
        {nonOpsInRoom.map((u) => {
          return (
            <ListGroup.Item key={u} className="d-flex justify-content-between">
              {u}
              {isCurrentUserOp ? (
                <span>
                  <Button
                    size="sm"
                    variant="warning"
                    id="kick"
                    onClick={(e) => kick(e, { u })}
                  >
                    Kick
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    id="ban"
                    onClick={(e) => ban(e, { u })}
                  >
                    Ban
                  </Button>
                  <Button
                    size="sm"
                    variant="info"
                    id="op"
                    onClick={(e) => op(e, { u })}
                  >
                    Op
                  </Button>
                </span>
              ) : (
                <></>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
};

const renderListStyle = {
  height: '70vh',
  overflowX: 'hidden',
};

RenderUserListItem.propTypes = {
  opsInRoom: PropTypes.array,
  nonOpsInRoom: PropTypes.array,
  isCurrentUserOp: PropTypes.string,
  kick: PropTypes.func,
  ban: PropTypes.func,
  op: PropTypes.func,
};

export default RenderUserListItem;
