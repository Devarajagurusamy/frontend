import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setToken, removeToken } from "../utils/auth"; // Utility functions for token management

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const history = useNavigate();

  // Load user from token when app starts
  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token });
    }
  }, []);

  // Login user and store token
  const loginUser = (response) => {
    setToken(response.token);
    setUser({ token: response.token });
    history.push("/users");
  };

  // Logout user and remove token
  const logoutUser = () => {
    removeToken();
    setUser(null);
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
