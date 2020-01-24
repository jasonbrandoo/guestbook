import React from 'react';
import Layout from '../component/Layout';
import useAuth from '../hooks/useAuth';
import AuthLogin from '../component/Auth/AuthLogin';

const HomePage = () => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <AuthLogin />;
  }
  return (
    <Layout title="Home">
      <h1>Home</h1>
    </Layout>
  );
};

export default HomePage;
