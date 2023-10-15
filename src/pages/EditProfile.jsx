import {} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function EditProfile() {
  const id = localStorage.getItem("_id");
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const navigate = useNavigate();

  const handleEditUser = (e) => {
    e.preventDefault();

    try {
      if (token) {
        fetch(`http://localhost:3000/api/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            mobileNo: mobileNumber,
          }),
        }).then((res) => {
          if (res.ok) {
            alert("Successfully updated information");
            setFirstName("");
            setLastName("");
            setMobileNumber("");
            navigate("/ProfilePage");
          }
        });
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isAdmin === "true" ? (
        <h1>This feature is not available</h1>
      ) : (
        <Container className="my-5 py-5">
          <Row>
            <div className="col-12 col-md-7 col-sm-12 m-auto">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h1 className="text-center">EditProfile</h1>
                  <hr />
                  <Form className="d-flex gap-3 flex-column" onSubmit={handleEditUser}>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>First name</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Enter your first name"
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Last name</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Enter your last name"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group>
                      <Form.Label>Mobile number</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="Enter your mobile number"
                        maxLength={11}
                        minLength={11}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </Form.Group>
                    <button className="btn btn-primary">Save Changes</button>
                  </Form>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      )}
    </>
  );
}