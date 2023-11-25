import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const token = localStorage.getItem("token");
const id = localStorage.getItem("_id");

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserEmail(data.email);
        setIsAdmin(data.isAdmin);
      });
  }, [isAdmin]);

  const handleEnrollCourse = (courseName) => {
    try {
      fetch(`http://localhost:3000/api/users/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: userEmail,
          name: courseName,
        }),
      })
        .then((res) => {
          if (res.status === 201) {
            alert("User enrolled successfully");
          } else if (res.status === 400) {
            alert("User is already enrolled in this course");
          } else {
            return;
          }
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred");
        });
    } catch (err) {
      console.error(`this is the err ${err}`);
    }
  };

  //ADMIN FEATURES
  const handleAddCourse = () => {
    navigate("/addCourse");
  };

  const editCoursePage = (courseId) => {
    navigate("/EditCourse");
    localStorage.setItem("courseId", courseId);
  };

  const handleDeleteCourse = (course) => {
    fetch(`http://localhost:3000/api/courses/${course._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert(`${course.name} was deleted`);
          window.location.reload(false);
        } else {
          alert("something went wrong");
        }
      });
  };

  return (
    <section className="container mx-auto ">
      <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
      {isAdmin === true &&   <Button>Add Course</Button>}
      </div>
    </section>
  );
}

{
  /* <div className="text-center my-5">
{isAdmin === "true" ? (
  <>
    <h1 className="mb-5">Courses Page</h1>
    <button className="btn btn-primary" onClick={handleAddCourse}>
      Add Course
    </button>
  </>
) : (
  <h1>Courses Page</h1>
)}
</div>
<div className="d-flex gap-5 align=items-center justify-content-center m-5 pt-5">
{courses.map((course, index) => (
  <Cards
    key={index}
    name={course.name}
    price={course.price}
    onEnrollCourse={() => handleEnrollCourse(course.name)}
    editCoursePage={() => editCoursePage(course._id)}
    onDeleteCourse={() => handleDeleteCourse(course)}
  />
))}
</div> */
}

{
  /* <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Sign in to your account
          </h1>
          
            <button
              type="submit"
              className="w-full mt-5 text-white bg-primary-600 bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-800 dark:text-gray-400 text-center mt-5">
                    Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
         
        </div>
      </div> */
}
