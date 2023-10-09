import { useEffect, useState } from "react";
import Cards from "../components/Cards";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  //   console.log(courses);

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <>
      <div className="d-flex gap-5 align=items-center justify-content-center m-5 pt-5">
        {courses.map((course, index) => (
          <Cards key={index} name={course.name} price={course.price} />
        ))}
      </div>
    </>
  );
}
