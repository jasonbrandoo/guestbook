/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const PageApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

PageApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default PageApp;
