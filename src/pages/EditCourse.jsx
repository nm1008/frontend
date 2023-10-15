import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");

export default function EditCourse() {
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const courseId = localStorage.getItem("courseId");

    fetch(`http://localhost:3000/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourseName(data.name);
        setPrice(data.price);
        setDescription(data.description);
      });
  }, []);

  const handleEditCourse = (e) => {
    e.preventDefault();
    const courseId = localStorage.getItem("courseId");

    fetch(`http://localhost:3000/api/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: courseName,
        price: price,
        description: description,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Successfully updated course information");
        setCourseName("");
        setPrice("");
        setDescription("");
        localStorage.removeItem("courseId");
        navigate("/courses");
      }
    });
  };

  return (
    <>
      {isAdmin === "true" ? (
        <div className="container my-5">
          <h2 className="text-center my-5">Edit Course</h2>
          <form action="" onSubmit={handleEditCourse}>
            <div className="d-flex flex-column align-items-center gap-3">
              <div className="form-group col-md-6">
                <label>Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6 h">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control input-md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button className="col-md-6 col-sm-5 col-8 btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>This is feature is not available</div>
      )}
    </>
  );
}
