import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { EventModalAdd } from './EventModal';

const EventSearchBar = ({ handleSearch, addEvent }) => {
  return (
    <div className="w-100 mb-3 d-flex justify-content-between">
      <Form>
        <Form.Control
          type="text"
          name="search"
          onChange={handleSearch}
          placeholder="Search..."
        />
      </Form>
      <EventModalAdd addEvent={addEvent} modalType="add" />
    </div>
  );
};

EventSearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
};

export default EventSearchBar;
