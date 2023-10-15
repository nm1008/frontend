import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import CardCourse from "../components/CardCourse";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    try {
      const id = localStorage.getItem("_id");

      fetch(`http://localhost:3000/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setMobileNumber(data.mobileNo);
          setEmail(data.email);

          const coursePromises = data.enrollments.map((course) => {
            return fetch(
              `http://localhost:3000/api/courses/${course.courseId}`
            ).then((res) => res.json());
          });

          Promise.all(coursePromises).then((courseData) => {
            setCourses(courseData);
          });

          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleEditProfile = () => {
    navigate("/EditProfile");
  };

  return (
    <>
      <Container className="mt-5 pt-5">
        <Row>
          <div className="col-12 col-md-7 col-sm-12 m-auto">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h5>Information</h5>
                <hr />
                {isLoading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <TailSpin
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <>
                    <Row>
                      <Col>
                        <h6>Name</h6>
                        <p>
                          {firstName} {lastName}
                        </p>
                      </Col>
                      <Col>
                        <h6>Phone Number</h6>
                        <p>{mobileNumber}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h6>Email Address</h6>
                        <p>{email}</p>
                      </Col>
                      <Col className="d-flex align-items-center">
                        {isAdmin === "false" && (
                          <button
                            className="btn btn-primary"
                            onClick={handleEditProfile}
                          >
                            Edit Profile
                          </button>
                        )}
                      </Col>
                    </Row>
                  </>
                )}
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <Container>
        <Row>
          {isAdmin === "false" && (
            <>
              <h2 className="text-center mt-5">Enrolled courses</h2>
              <div className="d-flex justify-content-center gap-3 col-12 col-md-6 col-sm-6 m-auto ">
                {courses.map((course, index) => (
                  <CardCourse key={index} name={course.name} />
                ))}
              </div>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}
