import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand>GuestApp v.1</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>
        <Link href="/event">
          <a className="nav-link">Event</a>
        </Link>
        <Link href="/about">
          <a className="nav-link">About</a>
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
