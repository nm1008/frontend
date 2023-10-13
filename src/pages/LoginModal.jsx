import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please input your email and/or password.");
    } else {
      fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("token", data.accessToken);

            fetch("http://localhost:3000/api/users/details", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: email,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem("isAdmin", data.isAdmin);
                localStorage.setItem("_id", data._id);
                handleClose()
                navigate("/courses");
              })
              .catch((error) => {
                alert("Error fetching user details: " + error.message);
              });
          } else {
            alert("Login Failed. Something went wrong");
          }
        })
        .catch(() => {
          alert("Incorrect details");
        });
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="text-center">
              <Button
                className="ms-auto"
                variant="primary"
                onClick={(e) => handleLogin(e, email, password)}
              >
                Login
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
