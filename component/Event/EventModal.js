import React, { useState, useEffect } from 'react';
import { Modal as Modals, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const EventModalAdd = ({ addEvent }) => {
  const [validated, setValidated] = useState(false);
  const [input, setInput] = useState({ name: '', start_date: '' });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleInput = event => {
    const { name } = event.target;
    const { value } = event.target;
    setInput(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      addEvent(input);
      handleClose();
      setInput({ name: '', start_date: '' });
    }
    setValidated(true);
  };

  return (
    <>
      <Button type="button" size="sm" onClick={handleShow}>
        Add Event
      </Button>
      <Modals
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modals.Header closeButton>
          <Modals.Title id="contained-modal-title-vcenter">
            Add new event
          </Modals.Title>
        </Modals.Header>
        <Modals.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                name="start_date"
                required
              />
            </Form.Group>
            <Button type="submit">Add</Button>
          </Form>
        </Modals.Body>
      </Modals>
    </>
  );
};

const EventModalEdit = ({ editEvent, modalValue }) => {
  const [validated, setValidated] = useState(false);
  const [edit, setEdit] = useState({
    id: modalValue.id,
    name: modalValue.name,
    start_date: modalValue.start_date,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleEdit = event => {
    const { name } = event.target;
    const { value } = event.target;
    setEdit(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      editEvent(edit);
      handleClose();
    }
    setValidated(true);
  };

  return (
    <>
      <Button type="button" size="sm" variant="success" onClick={handleShow}>
        Edit
      </Button>
      <Modals
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modals.Header closeButton>
          <Modals.Title id="contained-modal-title-vcenter">
            Edit Event {edit.id}
          </Modals.Title>
        </Modals.Header>
        <Modals.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Event Name"
                onChange={handleEdit}
                value={edit.name}
                required
              />
            </Form.Group>
            <Form.Group controlId="Date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                onChange={handleEdit}
                value={dayjs(edit.start_date).format('YYYY-MM-DD')}
                name="start_date"
                required
              />
            </Form.Group>
            <Button type="submit">Edit</Button>
          </Form>
        </Modals.Body>
      </Modals>
    </>
  );
};

EventModalAdd.propTypes = {
  addEvent: PropTypes.func.isRequired,
};

EventModalEdit.propTypes = {
  editEvent: PropTypes.func.isRequired,
  modalValue: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    start_date: PropTypes.string,
  }).isRequired,
};

export { EventModalAdd, EventModalEdit };
