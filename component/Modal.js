import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Modals = ({ show, onHide, addEvent, handleInput, input }) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Add new event
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={addEvent}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Event Name"
            onChange={handleInput}
            value={input.name}
            required
          />
        </Form.Group>
        <Form.Group controlId="Date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            onChange={handleInput}
            value={input.date}
            name="date"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

Modals.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
};

export default Modals;
