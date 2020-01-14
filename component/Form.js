import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Forms = () => (
  <Form className="w-75 mx-auto">
    <Form.Group controlId="username">
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="Username" required />
    </Form.Group>
    <Form.Group controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" required />
    </Form.Group>
    <Button variant="primary" type="submit" className="w-100">
      Login
    </Button>
  </Form>
);

export default Forms;
