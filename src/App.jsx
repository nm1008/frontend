import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from "./pages/Home"
import { Cards} from "./components/Cards"
import { Login } from "./pages/Login";
import { SBNavbar } from "./components/Navbar"

// import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <SBNavbar />
      <Home />
      <Cards />
     
      {/* <Login /> */}
    </div>
  );
}


export default App;
