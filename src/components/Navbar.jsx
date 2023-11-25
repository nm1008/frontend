import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBars,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "./auth";

export default function Heading({ theme, handleThemeSwitch }) {
  const [open, setOpen] = useState(false);
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

  const handleMenu = () => {
    setOpen((status) => !status);
  };

  const navlinkStyle =
    "text-black transition-all duration-500 hover:bg-gray-600 hover:text-white hover:text-white px-3 py-2 rounded text-md font-medium dark:text-white";

  const navlinkMobile =
    "text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium dark:text-white";

  return (
    <>
      <nav className="">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 ">
              <img src={logo} alt="logo" className="w-12" />
              <a
                href="#"
                className="text-black font-semibold dark:text-white dark:font-bolder"
              >
                Simply Book
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <div className="flex gap-3">
                  {auth.token ? (
                    <ul className="flex">
                      <li className={navlinkStyle}>
                        <Link to="/">Home</Link>
                      </li>
                      <li className={navlinkStyle}>
                        <Link to="/courses">Courses</Link>
                      </li>
                      <li className={navlinkStyle}>
                        <Link to="/ProfilePage">Profile</Link>
                      </li>
                      <li className={navlinkStyle}>
                        <Link to="/" onClick={handleLogout}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <ul className="flex">
                      <li className={navlinkStyle}>
                        <Link to="/">Home</Link>
                      </li>
                      <li className={navlinkStyle}>
                        <Link to="/courses">Courses</Link>
                      </li>
                      <li className={navlinkStyle}>
                        <Link to="/ProfilePage">Profile</Link>
                      </li>
                      <li className={navlinkStyle}>
                        <Link to="/Login">Login</Link>
                      </li>
                    </ul>
                  )}

                  <div className={navlinkStyle}>
                    {theme === "dark" ? (
                      <FontAwesomeIcon
                        icon={faSun}
                        size="lg"
                        onClick={handleThemeSwitch}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faMoon}
                        size="lg"
                        onClick={handleThemeSwitch}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* HAMBURGER MENU */}

            <div className="mr-2 flex items-center gap-5 md:hidden">
              {theme === "dark" ? (
                <FontAwesomeIcon
                  icon={faSun}
                  size="lg"
                  onClick={handleThemeSwitch}
                  className="text-white"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faMoon}
                  size="lg"
                  onClick={handleThemeSwitch}
                  className="text-black"
                />
              )}
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                onClick={handleMenu}
              >
                {open ? (
                  <FontAwesomeIcon icon={faTimes} />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* mobile menu */}
        {open ? (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
              {auth.token ? (
                <ul className="flex flex-col items-center">
                  <li className={navlinkStyle}>
                    <Link to="/">Home</Link>
                  </li>
                  <li className={navlinkStyle}>
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li className={navlinkStyle}>
                    <Link to="/ProfilePage">Profile</Link>
                  </li>
                  <li className={navlinkStyle}>
                    <Link to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="flex flex-col items-center">
                  <li className={navlinkStyle}>
                    <Link to="/">Home</Link>
                  </li>
                  <li className={navlinkStyle}>
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li className={navlinkStyle}>
                    <Link to="/ProfilePage">Profile</Link>
                  </li>
                  <li className={navlinkStyle}>
                    <Link to="/Login">Login</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
}

{
  /* <Navbar expand="lg" className="bg-primary">
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
    </Navbar> */
}
