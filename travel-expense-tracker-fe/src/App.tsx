// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar1 from "./components/Navbar1";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Navbar1 />
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
