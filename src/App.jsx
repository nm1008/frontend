import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import { Login } from "./pages/Login";
import { SBNavbar } from "./components/Navbar"

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <SBNavbar />
     
      <Login />
    </div>
  );
}


export default App;
