import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/auth.context";

export default function AppNavbar() {
  const { isLoggedIn, user, logOutUser } = useContext<AuthContextProps>(
    AuthContext
  ) || {
    isLoggedIn: false,
    logOutUser: () => {}, // Provide a default empty function for logOutUser
  };

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
