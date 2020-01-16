import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import Layout from '../component/Layout';

const HomePage = () => {
  const [validated, setValidated] = useState(false);
  const handleLogin = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Layout>
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
              onSubmit={handleLogin}
            >
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
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default HomePage;
