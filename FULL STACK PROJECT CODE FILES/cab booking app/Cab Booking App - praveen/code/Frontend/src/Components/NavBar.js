// // src/components/Navbar.js

// import React from 'react';
// import {  Nav, Container,Dropdown ,NavDropdown, Button} from "react-bootstrap";

// import {Link } from "react-router-dom"

// const Navbar = () => {
 
//   return (
//     <Navbar bg="" variant="dark" expand="lg" style={{backgroundColor:"black"}}>
//       <Container>
//         <Navbar.Brand href="/">Cab Booking App</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav"/>
//         <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//             <Link to="/" style={{padding:"10px"}}>Home</Link>
//             {/* <div style={{paddingTop:"3px"}}>
//             <NavDropdown title="Login" id="basic-nav-dropdown" >
//               <NavDropdown.Item href="/login">User</NavDropdown.Item>
//               <NavDropdown.Item href="/alogin">Admin</NavDropdown.Item>
//             </NavDropdown>
//             </div> */}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navbar;



import { useState, useEffect } from "react";
import { Navbar, Nav, Container,Dropdown ,NavDropdown, Button} from "react-bootstrap";
// import { HashLink } from 'react-router-hash-link';
import { Link,NavLink, useNavigate} from "react-router-dom";
// import Login from "./Login";

 const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

const navigate=useNavigate()

const login=()=>{
  navigate('/login')
}
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    // <Router>
        <section id="sec">
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
        <Navbar.Brand href="#home">Cab Booking App</Navbar.Brand>
          <Navbar.Brand href="/">
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" >

                      
            <div style={{paddingTop:"3px"}}>
            <NavDropdown title="Login" id="basic-nav-dropdown" >
              <NavDropdown.Item href="/">User</NavDropdown.Item>
            <NavDropdown.Item href="/alogin">Admin</NavDropdown.Item>
            </NavDropdown>
            </div>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </section>
     
    
  )
}
export default NavBar