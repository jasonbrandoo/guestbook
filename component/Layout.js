import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from './Navbar';

const Layout = ({ children }) => (
  <>
    <NavigationBar />
    <Container>{children}</Container>
  </>
);

export default Layout;
