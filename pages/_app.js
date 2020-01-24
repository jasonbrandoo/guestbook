import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import { UserProvider } from '../utils/userContext';

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
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
};

export default PageApp;
