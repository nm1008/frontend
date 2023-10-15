import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth";

import {} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

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
            auth.login(data.accessToken)

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
    <Container className="mt-5 pt-5">
      <Row>
        <div className="col-12 col-md-7 col-sm-12 m-auto">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h2 className="text-center">Login</h2>
              <Form
                className="d-flex flex-column gap-4 m-5"
                onSubmit={handleLogin}
              >
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <button className="btn btn-primary">Login</button>
              </Form>
              <div className="d-flex justify-content-center">
                <a href="/register">Not yet registered?</a>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

// const handleCallbackResponse = (res) => {
//   console.log(res.credential)
// };

// useEffect(() => {
//   /* global google */
//   google.accounts.id.initialize({
//     client_id:
//       "719036231141-14ag8po3as4r28g1cpi2lcr0phjr1t0h.apps.googleusercontent.com",
//     callback: handleCallbackResponse,
//   });

//   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
//     theme: "outline",
//     size: "large",
//   });
// }, []);
