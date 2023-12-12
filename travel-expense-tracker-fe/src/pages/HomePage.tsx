import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Import Link from React Router

const HomePage = () => {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgb(208, 242, 255)" }}
    >
      <Row xs={1} md={2} className="mb-4">
        <Col>
          <div className="text-center">
            <h1>Travel Expense Tracker</h1>
            <p>
              Welcome to our expense tracking application. Log in or sign up to
              get started.
            </p>
            <NavLink to="/signup">
              <Button variant="primary">Sign Up</Button>
            </NavLink>
            <NavLink to="/login">
              <Button variant="primary">Login</Button>
            </NavLink>
          </div>
        </Col>
        <Col>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE4Pe_a5g4vB8wVOXD3XE7K_zispih6IoYQg&usqp=CAU"
            alt="Travel Image"
            fluid
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
