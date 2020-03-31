import React from 'react';
import PropTypes from 'prop-types';

const RenderMessages = ({ rooms, room }) => {
  if (room) {
    const messagesInRoom = rooms[room].messageHistory;
    return (
      <>
        {messagesInRoom.map((message) => (
          <li className="list-group-item" key={message.timestamp}>
            <strong>{message.nick}</strong>
            <p>{message.timestamp}</p>
            <p>{message.message}</p>{' '}
          </li>
        ))}
      </>
    );
  }
  return <strong>No messages...</strong>;
};

RenderMessages.propTypes = {
  room: PropTypes.string,
  rooms: PropTypes.object,
};

export default RenderMessages;
