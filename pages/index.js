import React from 'react';
import Layout from '../component/Layout';
import useAuth from '../hooks/useAuth';
import AuthLogin from '../component/Auth/AuthLogin';

const HomePage = () => {
  const { isLogin, loading } = useAuth();

  if (loading) {
    return (
      <Layout title="Home">
        <h1>Home</h1>
      </Layout>
    );
  }

  if (!isLogin) {
    return <AuthLogin />;
  }
  return <h1>loading...</h1>;
};

export default HomePage;
