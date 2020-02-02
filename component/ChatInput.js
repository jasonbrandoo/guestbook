import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const propTypes = {
  socket: PropTypes.object.isRequired,
};

const ChatInput = ({ socket }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleTypingMessage = () => {
    socket.emit('typing');
  };

  const handleStopTypingMessage = () => {
    setTimeout(() => {
      socket.emit('stop typing', true);
    }, 10000);
  };

  const handleInputMessage = e => {
    setMessage(e.target.value);
  };

  const handleSubmitMessage = e => {
    e.preventDefault();
    socket.emit('send message', message);
    socket.emit('stop typing', true);
    setMessage('');
  };

  return (
    <Form
      style={{ height: '3rem' }}
      className="d-flex"
      onSubmit={handleSubmitMessage}
    >
      <Form.Group controlId="Message" className="h-100 flex-grow-1">
        <Form.Control
          type="text"
          placeholder="Enter message..."
          required
          className="h-100 rounded-0 shadow-none"
          onChange={handleInputMessage}
          onKeyDown={handleTypingMessage}
          onKeyUp={handleStopTypingMessage}
          value={message}
          ref={inputRef}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="rounded-0">
        Send
      </Button>
    </Form>
  );
};

ChatInput.propTypes = propTypes;

export default ChatInput;
