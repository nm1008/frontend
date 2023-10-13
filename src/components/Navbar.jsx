import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import LoginModal from "../pages/LoginModal";

export default function Heading() {
  const [token, setToken] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container className="">
        <Navbar.Brand href="/" className="text-white">
          Simply Book
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className="text-white">
              Courses
            </Nav.Link>
            {token ? (
              <>
                <Nav.Link as={Link} to="/ProfilePage" className="text-white">
                  Profile
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register" className="text-white">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
          {token ? (
            <Nav className="ms-auto">
             <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <LoginModal />
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
