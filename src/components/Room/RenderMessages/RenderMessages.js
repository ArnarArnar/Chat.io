import React from 'react';
import PropTypes from 'prop-types';

const RenderMessages = ({ rooms, room }) => {
  const messagesInRoom = rooms[room].messageHistory;
  if (messagesInRoom.length >= 1) {
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
  return (
    <>
      <br></br>
      <p className="text-center">No messages in the room</p>
    </>
  );
};

RenderMessages.propTypes = {
  room: PropTypes.string,
  rooms: PropTypes.object,
};

export default RenderMessages;
