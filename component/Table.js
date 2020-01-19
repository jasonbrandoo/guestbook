/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Table as Tables, Form } from 'react-bootstrap';
import Modal from './Modal';

const listEvent = [
  {
    id: 1,
    name: 'Event 1',
    start_date: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    name: 'Event 2',
    start_date: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    name: 'Anjing',
    start_date: new Date().toLocaleDateString(),
  },
];

const Table = () => {
  const [list, setList] = useState(listEvent);
  const [filtered, setFiltered] = useState([]);

  const addEvent = (event, input) => {
    event.preventDefault();
    setList(prevState => {
      return [...prevState, { id: Math.random(), ...input }];
    });
  };

  const editEvent = (event, edit) => {
    event.preventDefault();
    setList(prevState => {
      const edited = prevState.map(value => {
        if (value.id === edit.id) {
          return { ...value, ...edit };
        }
        return { ...value };
      });
      return edited;
    });
  };

  const handleSearch = event => {
    const { value } = event.target;
    setFiltered(list);
    if (value !== '') {
      setList(prevState => {
        const result = prevState.filter(val =>
          val.name.toLowerCase().includes(value.toLowerCase()),
        );
        return result;
      });
    } else {
      setList(filtered);
    }
  };

  const deleteEvent = id => {
    const deleted = list.filter(value => value.id !== id);
    setList(deleted);
  };

  return (
    <>
      <div className="w-100 mb-3 d-flex justify-content-between">
        <Form>
          <Form.Control
            type="text"
            name="search"
            onChange={handleSearch}
            placeholder="Search..."
          />
        </Form>
        <Modal addEvent={addEvent} modalType="add" />
      </div>
      <Tables striped bordered hover>
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
                <Link
                  href="/event/[name]/[id]"
                  as={`/event/${value.id}/${value.name}`}
                >
                  <a>{value.name}</a>
                </Link>
              </td>
              <td>{value.start_date}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  className="mr-3"
                  onClick={() => deleteEvent(value.id)}
                >
                  Delete
                </Button>
                <Modal
                  editEvent={editEvent}
                  modalType="edit"
                  modalValue={{
                    id: value.id,
                    name: value.name,
                    start_date: value.start_date,
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Tables>
    </>
  );
};

export default Table;
