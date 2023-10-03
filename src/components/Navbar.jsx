import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function SBNavbar() {
  return (
    <Navbar expand="lg" className='bg-secondary d-flex justify-content-between'>
     
        <Navbar.Brand href="#home" className='text-white px-3'>Simply Book</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto d-flex justify-content-between align-items-center ">
            <Nav.Link href="#home" className='text-white'>Home</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Courses</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Login</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    
    </Navbar>
  );
}

