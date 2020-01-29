import React from 'react';
import Layout from '../../component/Layout';
import EventTable from '../../component/Event/EventTable';
import ProtectedRoute from '../../component/ProtectedRoute';

const Event = () => {
  return (
    <ProtectedRoute>
      <Layout title="Event">
        <h1 className="mt-1">Event Pages</h1>
        <p>List of all event</p>
        <EventTable />
      </Layout>
    </ProtectedRoute>
  );
};

export default Event;
