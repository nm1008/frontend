import {} from "react-bootstrap";
import { useState } from "react";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      try {
        fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            mobileNo: mobileNumber,
            email: email,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12 col-md-6 col-sm-7 m-auto">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h1 className="text-center">Register Page</h1>
              <form onSubmit={handleRegister}className="d-flex flex-column align-items-center gap-3">
                <div>
                  <label htmlFor="" className="fw-bold">
                    Firstname:{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="" className="fw-bold">
                    Lastname
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="" className="fw-bold">
                    Email Address
                  </label>
                  <br />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="" className="fw-bold">
                    Password
                  </label>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="" className="fw-bold">
                    Confirm Password
                  </label>
                  <br />
                  <input
                    type="password"
                    placeholder="Confirm your Password"
                    minLength={8}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="" className="fw-bold">
                    Mobile number
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter your mobile number"
                    minLength="11"
                    maxLength="11"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
