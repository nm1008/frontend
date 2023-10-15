import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";



const token = localStorage.getItem("token");
const id = localStorage.getItem("_id");


export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    
    fetch("http://localhost:3000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${id}`)
      .then((res) => res.json())
      .then((data) =>{
        setUserEmail(data.email)
        setIsAdmin(data.isAdmin)
      });
  }, []);

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
    <>
      <div className="text-center my-5">
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
      </div>
    </>
  );
}
