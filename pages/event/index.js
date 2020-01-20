import React from 'react';
import Layout from '../../component/Layout';
import EventTable from '../../component/Event/EventTable';

const Event = () => {
  return (
    <Layout title="Event">
      <h1 className="mt-1">Event Pages</h1>
      <p>List of all event</p>
      <EventTable />
    </Layout>
  );
};

export default Event;
