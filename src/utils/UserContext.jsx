import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const login = (token, username) => {
    console.log("Storing token and username:", token, username); // Debugging context values
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setAuthState({ token, username, isAuthenticated: true });
  }; 
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuthState({ token: null, username: null, isAuthenticated: false });
    navigate("/login");
  };
  
  // Initial state
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
    isAuthenticated: !!localStorage.getItem("token"),
  });

  useEffect(() => {
    // Validate token on app load (optional)
    const token = localStorage.getItem("token");
    if (!token) {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
