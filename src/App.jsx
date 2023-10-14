import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {} from "react-bootstrap";

import Heading from "./components/Navbar";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditProfile from "./pages/EditProfile";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="app h-100">
      <AuthProvider>
        <Heading />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/EditProfile"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/ProfilePage"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="/AddCourse" element={<AddCourse />} />
          <Route path="/EditCourse" element={<EditCourse />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
