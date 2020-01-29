import React from 'react';
import Layout from '../component/Layout';
import ProtectedRoute from '../component/ProtectedRoute';

const HomePage = props => {
  return (
    <ProtectedRoute>
      <Layout title="Home">
        <h1>Home</h1>
      </Layout>
    </ProtectedRoute>
  );
};

export default HomePage;
