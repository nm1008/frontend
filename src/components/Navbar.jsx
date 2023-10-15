import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useAuth } from "./auth";

export default function Heading() {
  // const [token, setToken] = useState();

  const auth = useAuth();

  // useEffect(() => {
  //   const timeout = setInterval(() => {
  //    setToken(localStorage.getItem("token"))
  //   }, 500)
  //   return () => {
  //    clearInterval(timeout)
  //   }
  //  },[]);

  const navigate = useNavigate();

  const handleLogout = () => {

    // setToken(null);
    auth.logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container className="">
       {auth.token ? (
         <Navbar.Brand href="/courses" className="text-white">
         Simply Book
       </Navbar.Brand>
       ) : (
        <Navbar.Brand href="/" className="text-white">
        Simply Book
      </Navbar.Brand>
       )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mx-5">
            {auth.token ? (
              <Nav.Link as={Link} to="/courses" className="text-white">
                Home
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/" className="text-white">
                Home
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="#" className="text-white">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className="text-white">
              Courses
            </Nav.Link>
            {auth.token && (
              <div className="d-flex gap-3">
                <Nav.Link as={Link} to="/ProfilePage" className="text-white">
                  Profile
                </Nav.Link>
                <Nav className="ms-auto ">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </Nav>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
