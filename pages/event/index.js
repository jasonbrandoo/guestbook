import React, { useState } from 'react';
import Link from 'next/link';
import { Table, Button, Form, Col } from 'react-bootstrap';
import Layout from '../../component/Layout';
import Modals from '../../component/Modal';

const listEvent = [
  {
    id: 1,
    name: 'Event 1',
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    name: 'Event 2',
    date: new Date().toLocaleDateString(),
  },
];

const Event = () => {
  const [show, setShow] = useState(false);
  const [list, setList] = useState(listEvent);
  const [input, setInput] = useState({ name: '', date: '' });
  const [search, setSearch] = useState('');

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

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const findSearch = () => {
    const result = list.filter(value => value.name === search);
    setList(result);
  };

  const addEvent = event => {
    event.preventDefault();
    setList(prevState => {
      return [...prevState, { id: Math.random(), ...input }];
    });
  };

  const deleteEvent = id => {
    const deleted = list.filter(value => value.id !== id);
    setList(deleted);
  };

  return (
    <Layout>
      <h3 className="mt-5">Event Pages</h3>
      <p>List of all event</p>
      <div className="w-100 d-flex justify-content-between">
        <Form>
          <Form.Row>
            <Col>
              <Form.Control type="text" name="search" onChange={handleSearch} />
            </Col>
            <Col>
              <Button variant="info" type="button" onClick={findSearch}>
                Search
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Button type="button" className="mb-3" onClick={handleShow}>
          Add Event
        </Button>
      </div>
      <Modals
        show={show}
        onHide={handleClose}
        addEvent={addEvent}
        handleInput={handleInput}
        input={input}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((value, index) => (
            <tr key={value.id}>
              <td>{index + 1}</td>
              <td>
                <Link href="/event/[id]" as={`/event/${value.id}`}>
                  <a>{value.name}</a>
                </Link>
              </td>
              <td>{value.date}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  className="mr-3"
                  onClick={() => deleteEvent(value.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => deleteEvent(value.id)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Event;
