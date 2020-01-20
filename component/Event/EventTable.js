/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import { useTable } from 'react-table';
import EventSearchBar from './EventSearchBar';
import EventTableList from './EventTableList';

const EventTable = () => {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [refetch, setRefetch] = useState(false);

  /* react-table */
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Start Date',
        accessor: 'start_date',
      },
      {
        Header: 'Action',
        accessor: 'action',
      },
    ],
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data: list,
  });
  console.log(page);
  /* react-table */

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Axios.get('http://localhost:3001/event');
        const { data } = res;
        setList(data.results);
      } catch (err) {
        console.log(err.message);
      }
    };
    if (!refetch) getData();
    return () => {
      setRefetch(false);
    };
  }, [refetch]);

  const addEvent = async input => {
    try {
      const res = await Axios.post('http://localhost:3001/event', input);
      const { status } = res;
      if (status === 200) {
        setRefetch(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const editEvent = async edit => {
    try {
      const res = await Axios.patch(
        `http://localhost:3001/event/${edit.id}`,
        edit,
      );
      const { data, status } = res;
      if (status === 204) {
        console.log('ok', { data, status });
        setRefetch(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteEvent = id => {
    const deleted = list.filter(value => value.id !== id);
    setList(deleted);
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

  return (
    <>
      <EventSearchBar handleSearch={handleSearch} addEvent={addEvent} />
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
          <EventTableList
            list={list}
            deleteEvent={deleteEvent}
            editEvent={editEvent}
          />
        </tbody>
      </Table>
    </>
  );
};

export default EventTable;
