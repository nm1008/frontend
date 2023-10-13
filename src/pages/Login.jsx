import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please input your email and/or password.");
    } else {
      fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("token", data.accessToken);

            fetch("http://localhost:3000/api/users/details", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: email,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem("isAdmin", data.isAdmin);
                localStorage.setItem("_id", data._id);

                navigate("/courses");
              })
              .catch((error) => {
                alert("Error fetching user details: " + error.message);
              });
          } else {
            alert("Login Failed. Something went wrong");
          }
        })
        .catch(() => {
          alert("Incorrect details");
        });
    }
  };

  // const handleCallbackResponse = (res) => {
  //   console.log(res.credential)
  // };
  
  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       "719036231141-14ag8po3as4r28g1cpi2lcr0phjr1t0h.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });
  
  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);
  

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12 col-sm-7 col-md-6 m-auto">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h1 className="text-center">Login</h1>
              <form action="" id="myForm">
                <input
                  type="text"
                  className="form-control my-4 py-2"
                  placeholder="Username"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control my-4 py-2"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-center">
                  <a href="/register">Not yet registered?</a>
                </div>

                <div className="text-center mt-3">
                  <button
                    onClick={handleLogin}
                    className="btn btn-primary col-7"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div id="signInDiv" className="my-5 col-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
