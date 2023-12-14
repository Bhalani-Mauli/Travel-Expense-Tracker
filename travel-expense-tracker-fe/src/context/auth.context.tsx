import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios, { AxiosResponse } from "axios";
import { authVerify } from "../apis/apis";

const API_URL = import.meta.env.VITE_API_URL;
export interface User {
  username: string;
  email: string;
}
export interface AuthContextProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  user?: User;
  storeToken: (token: string) => void;
  authenticateUser: () => void;
  logOutUser: () => void;
  getToken: () => string;
}

const defaultAuthContent: AuthContextProps = {
  isLoggedIn: false,
  isLoading: true,
  storeToken: (_token: string) => {},
  authenticateUser: () => {},
  logOutUser: () => {},
  getToken: () => "",
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContent);

interface AuthProviderWrapperProps {
  children: ReactNode;
}

function AuthProviderWrapper(props: AuthProviderWrapperProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authVerify()
        .then((response: AxiosResponse<User>) => {
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(response.data);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(undefined);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(undefined);
    }
  };

  const getToken = () => {
    return localStorage.getItem("authToken") ?? "";
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    setIsLoggedIn(false);
    setIsLoading(false);
    setUser(undefined);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        getToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Create a custom hook for using the AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProviderWrapper, useAuth, AuthContext };
