
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
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
              });
          } else {
            alert("Login Failed. Something went wrong");
          }
        });
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form action="POST">
        <label htmlFor="">Email </label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label> Password </label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Sign in</button>
      </form>
    </>
  );
}
