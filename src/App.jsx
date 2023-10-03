import "./App.css";
import { Login } from "./components/Login";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Login />
    </div>
  );
}

function Navbar() {
  return (
    <>
      <div>
        <h1>Nav 1</h1>
      </div>
      <div>
        <h1>Nav 2</h1>
      </div>
    </>
  );
}

export default App;
