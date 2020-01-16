import React, {useState} from 'react';
import {Modal as Modals, Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Modal = ({addEvent, editEvent, modalType, modalValue}) => {
  const [input, setInput] = useState({name: '', date: ''});
  const [edit, setEdit] = useState({
    id: modalValue ? modalValue.id : '',
    name: modalValue ? modalValue.name : '',
    date: modalValue ? modalValue.date : '',
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleInput = event => {
    const {name} = event.target;
    const {value} = event.target;
    setInput(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleEdit = event => {
    const {name} = event.target;
    const {value} = event.target;
    setEdit(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const render =
    modalType === 'add' ? (
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
            <Form onSubmit={e => addEvent(e, input)}>
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
              <Button
                variant="success"
                type="submit"
                onClick={handleClose}
                className="w-100"
              >
                Login
              </Button>
            </Form>
          </Modals.Body>
        </Modals>
      </>
    ) : (
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
              Edit Event
            </Modals.Title>
          </Modals.Header>
          <Modals.Body>
            <Form onSubmit={e => editEvent(e, edit)}>
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
                  name="date"
                  required
                />
              </Form.Group>
              <Button
                variant="success"
                type="submit"
                onClick={handleClose}
                className="w-100"
              >
                Login
              </Button>
            </Form>
          </Modals.Body>
        </Modals>
      </>
    );
  return render;
};

Modal.defaultProps = {
  addEvent: () => {},
  editEvent: () => {},
  modalValue: undefined,
};

Modal.propTypes = {
  addEvent: PropTypes.func,
  editEvent: PropTypes.func,
  modalType: PropTypes.string.isRequired,
  modalValue: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
  }),
};

export default Modal;
