import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand>ChatKuy</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav className="ml-auto">
        <a href="https://github.com/jasonbrandoo" className="nav-link">
          Github
        </a>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
