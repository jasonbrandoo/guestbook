/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Link from 'next/link';

const SideNav = () => (
  <Navbar expand="md" className="border-right bg-light">
    <Navbar.Toggle className="ml-auto" />
    <Navbar.Collapse>
      <Nav className="flex-column" style={{height: 'calc(100vh - 56px)'}}>
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
export default SideNav;
