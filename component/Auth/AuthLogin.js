import React, { useState } from 'react';
import Axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

const AuthLogin = () => {
  const [validated, setValidated] = useState(false);
  const [input, setInput] = useState({ name: '', password: '' });

  const handleChange = event => {
    const { name, value } = event.target;
    setInput(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleLogin = async () => {
    try {
      const res = await Axios.post('http://localhost:3001/user/login', input, {
        withCredentials: true,
      });
      if (res.status === 200) {
        alert('login success');
      } else {
        alert('login error');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      handleLogin();
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
                value={input.name}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={input.password}
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

export default AuthLogin;
