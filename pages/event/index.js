import React from 'react';
import Layout from '../../component/Layout';
import Table from '../../component/Table';

const Event = () => {
  return (
    <Layout>
      <h3 className="mt-1">Event Pages</h3>
      <p>List of all event</p>
      <Table />
    </Layout>
  );
};

export default Event;
