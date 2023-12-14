import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../context/auth.context";

export default function AppNavbar() {
  const { isLoggedIn, logOutUser } = useAuth();

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/img/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Travel expense tracker
        </Navbar.Brand>
        <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/CreateGroup">Create Group</Nav.Link>
        <Nav.Link href="/Group">Group</Nav.Link>
        <Nav.Link href="/home">Home</Nav.Link>

        {!isLoggedIn ? (
          <div>
            <NavLink to="/signup">
              <Button>Sign Up</Button>
            </NavLink>
            <NavLink to="/login">
              <Button>Login</Button>
            </NavLink>
          </div>
        ) : (
          <Button onClick={logOutUser}>Logout</Button>
        )}
      </Container>
    </Navbar>
  );
}
