import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Swal from "sweetalert2";
import axios from 'axios'

export default function EditProfile() {
  
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");
  const id = localStorage.getItem("_id")
  console.log(id)

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/users/${id}`)
    .then((res) => {
      setFirstName(res.data.firstName)
      setLastName(res.data.lastName)
      setMobileNumber(res.data.mobileNo)
    })

  }, [])

  const handleEditUser = (e) => {
    e.preventDefault();
   
    try {
      if (token) {
        fetch(`http://localhost:3000/api/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            mobileNo: mobileNumber,
          }),
        }).then((res) => {
          if (res.ok) {
            Swal.fire({
              title: "Good job!",
              text: "You have successfully edited your profile",
              icon: "success",
            });
            setFirstName("");
            setLastName("");
            setMobileNumber("");
            navigate("/ProfilePage");
          }
        });
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isAdmin === "true" ? (
        <h1>This feature is not available</h1>
      ) : (
        <section className="container mx-auto ">
          <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <a
              href="#"
              className="text-black flex items-center mb-6 text-2xl font-semibold dark:text-white"
            >
              Edit Profile
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form action="" onSubmit={handleEditUser}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      className="mb-5 bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      maxLength={30}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                     Mobile Number
                    </label>
                    <input
                      type="number"
                      className="bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-5 justify-center ">
                    <Button>Submit</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// {isAdmin === "true" ? (
//
// ) : (
//   <Container className="my-5 py-5">
//     <Row>
//       <div className="col-12 col-md-7 col-sm-12 m-auto">
//         <div className="card border-0 shadow">
//           <div className="card-body">
//             <h1 className="text-center">EditProfile</h1>
//             <hr />
//             <Form className="d-flex gap-3 flex-column" onSubmit={handleEditUser}>
//               <Row>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>First name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter your first name"
//                       onChange={(e) => setFirstName(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Last name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter your last name"
//                       onChange={(e) => setLastName(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Form.Group>
//                 <Form.Label>Mobile number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your mobile number"
//                   maxLength={11}
//                   minLength={11}
//                   onChange={(e) => setMobileNumber(e.target.value)}
//                 />
//               </Form.Group>
//               <button className="btn btn-primary">Save Changes</button>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </Row>
//   </Container>
// )}
