import React from 'react';
import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Link href="/">
      <a>
        <Navbar.Brand>GuestApp v.1</Navbar.Brand>
      </a>
    </Link>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
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
