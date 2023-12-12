// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Container from "react-bootstrap/Container";
import LandingPage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import Group from "./pages/Group";
import AddExpense from "./pages/AddExpense";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/group" element={<Group />} />
          <Route path="/addExpense" element={<AddExpense />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
