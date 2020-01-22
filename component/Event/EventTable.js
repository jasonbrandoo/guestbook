/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import Axios from 'axios';
import { useTable, usePagination } from 'react-table';
import dayjs from 'dayjs';
import EventSearchBar from './EventSearchBar';
import EventTableList from './EventTableList';
import { EventModalEdit } from './EventModal';

const EventTable = () => {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [refetch, setRefetch] = useState(false);

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
        Cell: ({ row }) => {
          const {
            values: { start_date },
          } = row;
          return dayjs(start_date).format('YYYY-MM-DD');
        },
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => {
          const {
            values: { id, name, start_date },
          } = row;
          return (
            <>
              <EventModalEdit
                variant="success"
                size="sm"
                className="mr-2"
                modalValue={{ id, name, start_date }}
                editEvent={editEvent}
              >
                Edit {id}
              </EventModalEdit>
              <Button variant="danger" size="sm">
                Delete
              </Button>
            </>
          );
        },
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
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: list,
      initialState: { pageIndex: 0 },
    },
    usePagination,
  );
  /* react-table */

  return (
    <>
      <Table {...getTableProps()} striped bordered hover>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button
          onClick={() => gotoPage(0)}
          type="button"
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>{' '}
        <button
          onClick={() => previousPage()}
          type="button"
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>{' '}
        <button
          onClick={() => nextPage()}
          type="button"
          disabled={!canNextPage}
        >
          {'>'}
        </button>{' '}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          type="button"
          disabled={!canNextPage}
        >
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
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
