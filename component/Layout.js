import React from 'react';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import NavigationBar from './Navbar';
import SideNav from './SideNav';

const Layout = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <NavigationBar />
    <Container fluid>
      <Row>
        <Col md={2}>
          <SideNav />
        </Col>
        <Col md={8}>{children}</Col>
      </Row>
    </Container>
  </>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
