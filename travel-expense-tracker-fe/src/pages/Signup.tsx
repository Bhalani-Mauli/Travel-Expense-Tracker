import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const API_URL = "http://localhost:8080";

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [passwordHash, setPasswordHash] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordHash(e.target.value);
  const handleName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = { email, passwordHash, username };

    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    try {
      await axios.post(`${API_URL}/api/auth/signup`, requestBody, {
        headers: headers,
      });
      navigate("/login");
    } catch (error: any) {
      const axiosError = error as AxiosError<any>;

      const errorDescription: string =
        (axiosError.response?.data?.message as string) || "An error occurred";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <Form onSubmit={handleSignupSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={handleName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmail}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={passwordHash}
            onChange={handlePassword}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Signup;
