// src/components/IsAnon.jsx

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};
const IsAnon: React.FC<Props> = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (isLoggedIn) {
    // If the user is logged in, navigate to the home page
    return <Navigate to="/dashboard" />;
  } else {
    // If the user is not logged in, allow to see the page
    return children;
  }
};

export default IsAnon;
