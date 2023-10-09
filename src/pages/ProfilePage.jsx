import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const isAdmin = localStorage.getItem("isAdmin");
const id = localStorage.getItem("_id");

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
//   const [courseList, setCourseList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch(`http://localhost:3000/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setMobileNumber(data.mobileNo);
          setEmail(data.email);
        //   setCourseList(data.enrollments);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleEditProfile = () => {
    navigate("/EditProfile");
  };

  return (
    <>
      {isAdmin === true ? (
        <h4 className="text-center my-5">Not Available</h4>
      ) : (
        <div className="col-md-12">
          <section className="text-center my-5">
            <h2 className="my-2">
              {firstName} {lastName}
            </h2>
            <p>{mobileNumber}</p>
            <p>{email}</p>
            <a>
              <button onClick={handleEditProfile} className="btn btn-primary">
                Edit Profile
              </button>
            </a>
          </section>
        </div>

        //will add courseList later
      )}
    </>
  );
}
