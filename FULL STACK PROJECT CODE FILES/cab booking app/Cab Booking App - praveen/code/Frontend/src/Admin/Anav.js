// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link } from "react-router-dom"

const Anav = () => {
  const get=localStorage.getItem('user')
  return (
    <Navbar bg="" variant="dark" expand="lg" style={{backgroundColor:"black"}}>
      <Container>
        <Navbar.Brand href="/">Cab Booking App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" >
            {/* <Link to="/" style={{padding:"10px"}}>Home</Link> */}
            <Link to="/ahome" style={{padding:"10px"}}>Home</Link>
            <Link to="/users" style={{padding:"10px"}}>Users</Link>
            <Link to="/bookings" style={{padding:"10px"}}>Bookings</Link>
            <Link to="/acabs" style={{padding:"10px"}}>Cabs</Link>
            <Link to="/addcab" style={{padding:"10px"}}>AddCab</Link>
            <Link to="/" style={{paddingLeft:"10px",paddingTop:"10px"}}>(Logout)</Link>            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Anav;
