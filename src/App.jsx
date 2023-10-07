import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {} from 'react-bootstrap'

import Heading from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditProfile from "./pages/editProfile";
import Footer from "./components/Footer"

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app h-100">
      <Heading />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/EditProfile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
