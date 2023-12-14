// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Container from "react-bootstrap/Container";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import Group from "./pages/Group";
import AddExpense from "./pages/AddExpense";
import HomePage from "./pages/HomePage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import SettleExpense from "./pages/SettleExpense";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <Routes>
          <Route
            path="/signup"
            element={
              <IsAnon>
                <Signup />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <Login />
              </IsAnon>
            }
          />
          <Route
            path="/home"
            element={
              <IsPrivate>
                <HomePage />
              </IsPrivate>
            }
          />
          <Route
            path="/dashboard"
            element={
              <IsPrivate>
                <Dashboard />
              </IsPrivate>
            }
          />
          <Route
            path="/createGroup"
            element={
              <IsPrivate>
                <CreateGroup />
              </IsPrivate>
            }
          />
          <Route
            path="/group/:id"
            element={
              <IsPrivate>
                <Group />
              </IsPrivate>
            }
          />
          <Route
            path="/addExpense/:groupId"
            element={
              <IsPrivate>
                <AddExpense />
              </IsPrivate>
            }
          />
          <Route
            path="/settleExpense/:groupId"
            element={
              <IsPrivate>
                <SettleExpense />
              </IsPrivate>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
