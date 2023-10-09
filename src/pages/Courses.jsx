import { useEffect, useState } from "react";
import Cards from "../components/Cards";

let isAdmin;

const token = localStorage.getItem("token");
const id = localStorage.getItem("_id");

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  //   console.log(courses);

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  useEffect(() => {
    isAdmin = localStorage.getItem("isAdmin");
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUserEmail(data.email));
  });

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
          if (res.status === 200) {
            alert("User enrolled successfully");
          } else if (res.status === 400) {
            alert("User is already enrolled in this course");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred");
        });
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <>
      <div className="d-flex gap-5 align=items-center justify-content-center m-5 pt-5">
        {courses.map((course, index) => (
          <Cards
            key={index}
            name={course.name}
            price={course.price}
            onEnrollCourse={() => handleEnrollCourse(course.name)}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </>
  );
}
