//Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import CardCourse from "../components/CardCourse";

//Styling
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function ProfilePage() {
  // States to store user information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState([]); // Stores the user's enrolled courses

  const [isLoading, setIsLoading] = useState(true); // Indicates if data is loading

  // Navigate function from react-router-dom
  const navigate = useNavigate();

  // Get the isAdmin value from localStorage (for admin privilege)
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    try {
      // Get the user's ID from localStorage
      const id = localStorage.getItem("_id");

      // Fetch user data by their ID
      fetch(`http://localhost:3000/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // Set user data to the state variables
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setMobileNumber(data.mobileNo);
          setEmail(data.email);

          // Fetch enrolled courses data by their IDs
          const coursePromises = data.enrollments.map((course) => {
            return fetch(`http://localhost:3000/api/courses/${course.courseId}`)
              .then((res) => res.json());
          });

          // Use Promise.all to handle multiple course data fetches
          Promise.all(coursePromises).then((courseData) => {
            setCourses(courseData); // Set the user's enrolled courses
          });

          // Set isLoading to false after fetching data
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Function to handle editing the user's profile
  const handleEditProfile = () => {
    navigate("/EditProfile"); // Redirect to the EditProfile page
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
                  // Display loading spinner while data is being fetched
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
                  // Display user information when data is loaded
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
                          // Display an "Edit Profile" button for non-admin users
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
            // Display enrolled courses for non-admin users
            <>
              <h2 className="text-center mt-5">Enrolled courses</h2>
              <div className="d-flex justify-content-center gap-3 col-12 col-md-6 col-sm-6 m-auto ">
                {/* Map the user's enrolled courses and render CardCourse components */}
                {courses.map((course, index) => (
                  <CardCourse key={index} name={course.name} />
                )}
              </div>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}
