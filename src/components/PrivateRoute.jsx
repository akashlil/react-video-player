// PrivateRoute.js

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, roles }) => {
  // Get the current location
  const location = useLocation();

  // Retrieve authentication and role information from Redux store
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const userRole = useSelector(
    (state) => state.roles.userRole?.role ?? localStorage.getItem("role")
  );

  // Check if the user is authenticated and authorized
  const isAuthorized = isAuthenticated && (!roles || roles.includes(userRole));

  // Render the children if authenticated and authorized, otherwise redirect to login
  return isAuthorized ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
