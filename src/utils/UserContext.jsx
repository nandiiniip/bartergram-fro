import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const login = (token, username, id) => {
    console.log("Storing token, username, and id:", token, username, id); // Debugging context values
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("user_id", id); // Store user_id as well
    setAuthState({ token, username, user_id: id, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    setAuthState({ token: null, username: null, user_id: null, isAuthenticated: false });
    navigate("/login");
  };

  // Initial state
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
    user_id: localStorage.getItem("user_id") || null,
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
