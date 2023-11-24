import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      try {
        fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            mobileNo: mobileNumber,
            email: email,
            password: password,
          }),
        }).then((res) => {
          if (res.ok) {
            alert("successfully registered");
            navigate("/");
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <Row>
        <div className="col-12 col-md-7 col-sm-12 m-auto">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h2 className="text-center">Reigster</h2>
              <Form
                className="d-flex flex-column gap-4 m-5"
                onSubmit={handleRegister}
              >
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        autoFocus
                      />
                    </Col>
                    <Col>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your mobile number"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Row>
                  <button className="btn btn-primary">Sign up</button>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}
