import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./UserContext";

const PrivateRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
