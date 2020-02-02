/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Layout from '../component/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const dev = process.env.NODE_ENV !== 'production';

const socket = io(
  dev ? 'http://localhost:3001' : 'https://guestbook-nu.now.sh',
);

const propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

const PageApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>ChatKuy</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} socket={socket} />
      </Layout>
    </>
  );
};

PageApp.propTypes = propTypes;

export default PageApp;
