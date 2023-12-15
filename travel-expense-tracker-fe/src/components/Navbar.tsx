import { Link, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../context/auth.context";

export default function AppNavbar() {
  const { isLoggedIn, logOutUser, user } = useAuth();

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="d-flex gap-3">
          <img
            alt=""
            src="../../public/icons/expense-register-svgrepo-com.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Travel expense tracker
        </Navbar.Brand>
        <div className="d-flex gap-4">
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/createGroup">
            Create Group
          </Nav.Link>
        </div>
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
          <div className="d-flex gap-4">
            {user?.email} <Button onClick={logOutUser}>Logout</Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}
