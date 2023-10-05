import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Heading() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(); // Remove the token from localStorage
    setToken(null); // Set token state to null
    navigate("/");
  };

  useEffect(() => {
    // Check if there is a token in localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [token]); // Empty dependency array to run the effect only once

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand href="/" className="text-white">
          Simply Book
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-center">
            <Nav.Link as={Link} to="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className="text-white">
              Courses
            </Nav.Link>
            {token ? (
              <Nav.Link onClick={handleLogout} className="text-white">
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-white">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
