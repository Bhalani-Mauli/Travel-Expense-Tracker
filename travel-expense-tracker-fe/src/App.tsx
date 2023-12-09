// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Container from "react-bootstrap/Container";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<LandingPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
