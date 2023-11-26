import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Swal from "sweetalert2";

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
    localStorage.setItem("courseId", courseId._id);
  };

  const handleDeleteCourse = (course) => {
    let userConfirmed = confirm("Do you want to delete this course?");

    if (userConfirmed) {
      fetch(`http://localhost:3000/api/courses/${course._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            Swal.fire({
              title: "Good job!",
              text: "Course was deleted",
              icon: "success",
            });
            setTimeout(() => {
              window.location.reload(false);
            }, 1500);
          } else {
            alert("something went wrong");
          }
        });
    } else {
      return;
    }
  };

  return (
    <section className=" h-full mx-3 my-5 md:h-screen lg:h-screen">
      <div className="text-center ">
        {isAdmin === true && (
          <button
            className="m-2 px-12 py-2 bg-blue-500 rounded-md text-white font-bold w-34"
            onClick={handleAddCourse}
          >
            Add Course
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        {courses.map((data, i) => (
          <>
            <div key={data._id || i} className="mx-5 my-5 lg:mt-12">
              <div className="h-62 mb-5 block  mx-5 p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700  text-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data.name}
                </h5>
                <p className="font-normal text-gray-700  dark:text-gray-400">
                  {data.description}
                </p>
                {isAdmin === false && (
                  <p className="font-normal text-gray-700  dark:text-gray-400">
                    $ {data.price}
                  </p>
                )}
                <div className="text-center flex flex-wrap items-center justify-center ">
                  {isAdmin === true ? (
                    <>
                      <button
                        className="m-2 px-12 py-2 bg-green-500 rounded-md text-white font-bold w-full"
                        onClick={() => editCoursePage(data)}
                      >
                        Edit Course
                      </button>
                      <button
                        className="m-2 px-12 py-2 bg-red-500 rounded-md text-white font-bold w-full"
                        onClick={() => handleDeleteCourse(data)}
                      >
                        Delete Course
                      </button>
                    </>
                  ) : (
                    <Button onClick={() => handleEnrollCourse(data.name)}>Enroll</Button>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}
