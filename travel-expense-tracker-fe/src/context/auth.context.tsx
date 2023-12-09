import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

interface User {}

interface AuthContextProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderWrapperProps {
  children: ReactNode;
}

function AuthProviderWrapper(props: AuthProviderWrapperProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Add your authentication logic here
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
