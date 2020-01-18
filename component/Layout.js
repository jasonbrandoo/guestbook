import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import NavigationBar from './Navbar';
import SideNav from './SideNav';

const Layout = ({children}) => (
  <>
    <NavigationBar />
    <Container fluid>
      <Row>
        <Col md={2} className="px-0">
          <SideNav />
        </Col>
        <Col md={8}>{children}</Col>
      </Row>
    </Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
