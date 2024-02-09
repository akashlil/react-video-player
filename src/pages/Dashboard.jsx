import React, { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import User from "./User";
import PrivateRoute from "../components/PrivateRoute";
import Overview from "../components/Overview";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { removeUserRole } from "../features/auth/roleSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");

    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
  }
  const logOut = () => {
    dispatch(logout());
    dispatch(removeUserRole());
  };
  return (
    <div className="">
      <div className="d-flex">
        <div className="sidebar" id="sidebar">
          <div className="close-btn-section">
            <span className="close-btn" onClick={toggleSidebar}>
              &#9776;
            </span>
          </div>
          <ul className="position-absolute mt-5">
            <li>
              <Link to="overview">Home</Link>
            </li>
            <li>
              <Link to="admin">Admin</Link>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="content" id="content">
          <div className="position-relative">
            <div className="d-flex justify-content-between">
              <div>
                <span
                  className="close-btn-mobile text-bg-danger d-md-none"
                  onClick={toggleSidebar}
                >
                  &#9776;
                </span>
              </div>
              <div>
                <p onClick={logOut}>Log Out</p>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="overview" />} />
            <Route path="overview" element={<Overview />} />
            {/* <Route path="profile" element={<Profile />} /> */}
            <Route
              path="admin"
              element={
                <PrivateRoute roles={["admin"]}>
                  <Admin></Admin>
                </PrivateRoute>
              }
            />
            <Route
              path="user"
              element={
                <PrivateRoute roles={["user", "admin"]}>
                  <User></User>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
