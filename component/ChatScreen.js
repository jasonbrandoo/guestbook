import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatInput from './ChatInput';

const propTypes = {
  socket: PropTypes.object.isRequired,
};

const ChatScreen = ({ socket }) => {
  const [chat, setChat] = useState([]);
  const [joined, setJoined] = useState('');
  const [totalUser, setTotalUser] = useState(0);
  const [typingUser, setTypingUser] = useState('');

  useEffect(() => {
    socket.on('signed in', data => {
      setTotalUser(data.total);
    });

    socket.on('user joined', data => {
      setJoined(data.username);
      setTotalUser(data.total);
    });

    socket.on('recieve message', data => {
      setChat(prevState => [
        ...prevState,
        { name: data.name, message: data.message },
      ]);
    });

    socket.on('typing user', data => {
      setTypingUser(data.typing);
    });

    socket.on('user stop typing', stop => {
      if (stop) setTypingUser('');
    });

    socket.on('user left', data => {
      setTotalUser(data.total);
      setJoined(`${data.name} left the club`);
    });
    return () => {
      socket.close();
    };
  }, [socket]);

  return (
    <>
      <h1>Online user {totalUser}</h1>
      <h2>{joined !== '' ? joined : null}</h2>
      <p>{typingUser}</p>
      {chat.map(value => (
        <div key={value.message}>
          <h4>{value.name}</h4>
          <div style={{ border: '5px solid black' }} />
          <p>{value.message}</p>
        </div>
      ))}
      <ChatInput socket={socket} />
    </>
  );
};

ChatScreen.propTypes = propTypes;

export default ChatScreen;
