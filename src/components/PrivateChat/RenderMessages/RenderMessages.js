import React from 'react';
import PropTypes from 'prop-types';

const RenderMessages = ({ selectedUser, messages }) => {
  function messageExchange() {
    for (const key in messages) {
      if (Object.prototype.hasOwnProperty.call(messages, key)) {
        if (key == selectedUser) {
          return messages[key];
        }
      }
    }
  }
  const messagesInChat = messageExchange();
  if (messagesInChat) {
    return (
      <>
        {Object.values(
          messagesInChat.map((m) => (
            <li className="list-group-item" key={m.message}>
              <strong>{m.user}</strong>
              <p>{m.message}</p>{' '}
            </li>
          ))
        )}
      </>
    );
  }
  return (
    <>
      <br></br>
      <p className="text-center">this is the start of the convention...</p>
    </>
  );
};

RenderMessages.propTypes = {
  room: PropTypes.string,
  rooms: PropTypes.object,
  selectedUser: PropTypes.string,
  messages: PropTypes.object,
};

export default RenderMessages;
