//Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import CardCourse from "../components/CardCourse";
import Button from "../components/Button";

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

  useEffect(() => {}, []);

  useEffect(() => {
    try {
      // Get the user's ID from localStorage
      const id = localStorage.getItem("_id");
      console.log(id)

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
            return fetch(
              `http://localhost:3000/api/courses/${course.courseId}`
            ).then((res) => res.json());
          });

          // Use Promise.all to handle multiple course data fetches
          Promise.all(coursePromises).then((courseData) => { 
            console.log(courseData)
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
      <section className="container mx-auto">
        <div className="h-screen flex flex-col items-center mt-20 px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="w-full h-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 dark:text-white">
              <div className="flex gap-3 justify-center items-center text-md lg:text-lg ">
                <h1 className=" font-bold">Name: </h1>
                <h1>{firstName}</h1>
                <h1>{lastName}</h1>
              </div>
              <div className="flex gap-3 justify-center items-center text-md mt-5 lg:text-lg">
                <h1 className=" font-bold">Email: </h1>
                <h1>{email}</h1>
              </div>

              <div className="flex gap-3 justify-center items-center text-md mt-5 lg:text-lg">
                <h1 className=" font-bold">Phone number: </h1>
                <h1>{mobileNumber}</h1>
              </div>
              {isAdmin === "false" && (
                <div className="flex justify-around gap-2 mb-5 w-full">
                  <Button onClick={handleEditProfile}>Edit Profile</Button>
                </div>
              )}
            </div>
          </div>
          {/* Display user enrolled courses */}
          {isAdmin === "true" && (
          console.log(courses)
          )}
         
        </div>
      </section>
    </>
  );
}
// {isAdmin === "false" && (
//   // Display enrolled courses for non-admin users
//   <>
//     <h2 className="text-center mt-5">Enrolled courses</h2>
//     <div className="d-flex justify-content-center gap-3 col-12 col-md-6 col-sm-6 m-auto ">
//       {/* Map the user's enrolled courses and render CardCourse components */
// }
// //         {courses.map((course, index) => (
// //           <CardCourse key={index} name={course.name} />
// //         ))}
// //       </div>
// //     </>

{
  /* <Container className="mt-5 pt-5">
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

//   )}
// </Row>
// </Container> */}
