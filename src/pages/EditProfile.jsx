import {} from "react-bootstrap";
import { useState } from "react";

export default function EditProfile() {

let id = localStorage.getItem("_id")
let token = localStorage.getItem("token")

const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [mobileNumber, setMobileNumber] = useState("")

const handleEditUser = (e) => {
  e.preventDefault()

  try{
    fetch(`http://localhost:3000/api/users/${id}`, {
      method:"PUT",
      headers: {
        'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        mobileNo: mobileNumber
      })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
  }catch(err){
    console.log(err)
  }
}



  return (
    <div className="container my-5">
      <h2 className="text-center my-5">Edit Profile</h2>
      <form action="" onSubmit={handleEditUser}>
        <div className="d-flex flex-column align-items-center gap-3">
          <div className="form-group col-md-6">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Mobile number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your mobile number"
              maxLength={11}
              minLength={11}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <button className="col-md-6 col-sm-5 col-8 btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
