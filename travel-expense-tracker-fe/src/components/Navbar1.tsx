import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function Navbar1() {
  // const { isLoggedIn } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext) || { isLoggedIn: false };
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
          Travel expence tracker
        </Navbar.Brand>
        {!isLoggedIn && (
          <NavLink to="/signup">
            <Button>Sign Up</Button>
          </NavLink>
        )}
      </Container>
    </Navbar>
  );
}
