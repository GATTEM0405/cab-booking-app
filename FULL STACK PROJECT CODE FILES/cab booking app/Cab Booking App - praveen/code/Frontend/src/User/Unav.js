// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link } from "react-router-dom"

const Unav = () => {
  const get=localStorage.getItem('user')
  return (
    <Navbar bg="" variant="dark" expand="lg" style={{backgroundColor:"black"}}>
      <Container>
        <Navbar.Brand href="/">Ucab  App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" >
            {/* <Link to="/" style={{padding:"10px"}}>Home</Link> */}
            <Link to="/uhome" style={{padding:"10px"}}>Home</Link>
            <Link to="/ucabs" style={{padding:"10px"}}>BookCab</Link>
            <Link to="/mybookings" style={{padding:"10px"}}>My Booking</Link>
            <Link to="/" style={{paddingLeft:"10px",paddingTop:"10px"}}>Logout</Link>
            <h4 style={{color:"white",paddingTop:"0px"}}>({JSON.parse(get).name} )</h4>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unav;
