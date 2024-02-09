// PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, roles }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  let userRole = useSelector((state) => state?.roles?.userRole?.role);
  userRole = localStorage.getItem("role");

  if (isAuthenticated && (!roles || roles.includes(userRole))) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
