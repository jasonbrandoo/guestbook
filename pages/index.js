import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Login from '../component/Login';
import ChatScreen from '../component/ChatScreen';

const propTypes = {
  socket: PropTypes.object.isRequired,
};

const HomePage = ({ socket }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return !loggedIn ? (
    <Login setLoggedIn={setLoggedIn} socket={socket} />
  ) : (
    <ChatScreen socket={socket} />
  );
};

HomePage.propTypes = propTypes;

export default HomePage;
