import { useEffect, useState } from "react";
import CardHome from "../components/CardHome";
import { TailSpin } from "react-loader-spinner";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(courses);
  useEffect(() => {
    try {
      setIsLoading(false);
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
  HOME
    </>
  );
}
