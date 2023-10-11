import { useState } from "react";
import { useNavigate } from "react-router-dom";

const isAdmin = localStorage.getItem("isAdmin");
const token = localStorage.getItem("token");

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate()

  const handleAddCourse = (e) => {
    e.preventDefault();
    try {
      fetch(`http://localhost:3000/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: courseName,
          price: price,
          description: description,
        }),
      })
      .then((res) => {
        if(res.ok){
          alert('success')
          navigate('/courses')
        }else{
          alert('failed')
        }
      })
     
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isAdmin === "true" ? (
        <div className="container my-5">
          <h2 className="text-center my-5">Add Course</h2>
          <form action="" onSubmit={handleAddCourse}>
            <div className="d-flex flex-column align-items-center gap-3">
              <div className="form-group col-md-6">
                <label>Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Price</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6 h">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control input-md"
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
        <h1>Not available</h1>
      )}
    </>
  );
}
