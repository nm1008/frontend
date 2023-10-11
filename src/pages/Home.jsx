import { useEffect, useState } from "react";
import CardHome from "../components/CardHome";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(courses);
  useEffect(() => {
    try {
      setIsLoading(false)
      fetch("http://localhost:3000/api/courses")
        .then((res) => res.json())
        .then((data) => {
          setCourses(data);
        });
     
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="text-center m-5 pt-5">
        <h1 className="p-3">Course Booking System</h1>
        <p>Booking for everyone, everywhere</p>
        <button className="bg-primary text-white p-2 rounded border-0">
          <a>Book Now</a>
        </button>
      </div>
      <div className="d-flex gap-5 align=items-center justify-content-center m-5 pt-5">
        {isLoading ? (
          <p>Fetching courses...</p>
        ) : courses.length === 0 ? (
          <h1>No Courses</h1>
        ) : (
          courses.map((course, index) => (
            <CardHome
              key={index}
              name={course.name}
              price={course.price}
              description={course.description}
            />
          ))
        )}
      </div>
    </>
  );
}
