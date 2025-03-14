import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken"); // Check if user is logged in

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
