/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { EventModalEdit } from './EventModal';

const EventTableList = ({ list, deleteEvent, editEvent }) => {
  return list.map((value, index) => (
    <tr key={value.id}>
      <td>{index + 1}</td>
      <td>
        <Link href="/event/[name]/[id]" as={`/event/${value.id}/${value.name}`}>
          <a>{value.name}</a>
        </Link>
      </td>
      <td>{dayjs(value.start_date).format('YYYY-MM-DD')}</td>
      <td>
        <Button
          variant="danger"
          size="sm"
          className="mr-3"
          onClick={() => deleteEvent(value.id)}
        >
          Delete
        </Button>
        <EventModalEdit
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
  ));
};

EventTableList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteEvent: PropTypes.func.isRequired,
  editEvent: PropTypes.func.isRequired,
};

export default EventTableList;
