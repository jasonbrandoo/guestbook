import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const propTypes = {
  socket: PropTypes.object.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

const Login = ({ socket, setLoggedIn }) => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');

  const handleChange = e => {
    setUsername(e.target.value);
  };

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      socket.emit('sign in', username);
      setLoggedIn(true);
    }
    setValidated(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Card className="mt-5 w-50">
        <Card.Header className="text-center">
          <h3 className="m-0">Guest Book v1</h3>
        </Card.Header>
        <Card.Body>
          <Form
            className="w-75 mx-auto"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={username}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

Login.propTypes = propTypes;

export default Login;
