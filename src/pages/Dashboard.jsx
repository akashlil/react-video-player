import React, { Children, useEffect, useRef } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import User from "./User";
import PrivateRoute from "../components/PrivateRoute";
import Overview from "../components/Overview";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeUserRole } from "../features/auth/roleSlice";
import CreateAdmin from "../components/Admin/CreateAdmin";
import Admin from "../components/Admin/Admin";

const Dashboard = () => {
  const listContext = useRef();
  const dispatch = useDispatch();

  let userRole = useSelector((state) => state.roles.userRole.role);

  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");

    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
  }

  function activateLink(e) {
    var links = document.querySelectorAll(".list-unstyled .bd-links-link");
    links.forEach(function (item) {
      item.classList.remove("active");
    });

    // Add 'active' class to the clicked link
    e.target.classList.add("active");
  }

  const logOut = () => {
    dispatch(logout());
    dispatch(removeUserRole());
  };
  const sideBarList = [
    {
      title: "Admin",
      roles: ["admin"],
      Children: [
        { title: "Admin View", to: "admin-info" },
        { title: "Admin Add", to: "create-admin" },
      ],
    },
    {
      title: "user",
      roles: ["user", "admin"],
      Children: [{ title: "user", to: "user" }],
    },
  ];
  return (
    <div className="">
      <div className="dashboard-content">
        <div className="sidebar" id="sidebar">
          <div className="close-btn-section">
            <span className="close-btn" onClick={toggleSidebar}>
              &#9776;
            </span>
            <Link to="overview">
              <span className="text-white d-none d-md-block">
                Dashboard Home
              </span>
            </Link>
          </div>
          <div className="mb-5"></div>

          {sideBarList.map((data, index) => (
            <ul className="all-ul-contect" key={index}>
              {data.roles.includes(userRole) && (
                <li className="bd-links-group py-2">
                  <strong className="bd-links-heading d-flex w-100 fs-5 align-items-center text-light fw-semibold">
                    {data.title}
                  </strong>

                  <ul
                    className="list-unstyled fw-normal pb-2 fs-6 text-white"
                    ref={listContext}
                  >
                    {data.Children.map((ele, index) => (
                      <li key={index}>
                        <Link
                          to={ele.to}
                          onClick={activateLink}
                          className="bd-links-link d-block link-hover-sidebar"
                        >
                          {ele.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          ))}
        </div>
        <div className="content" id="content">
          <div className="dashbord-navbar">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span
                  className="close-btn-mobile text-bg-danger d-md-none"
                  onClick={toggleSidebar}
                >
                  &#9776;
                </span>
              </div>
              <div>
                <p onClick={logOut} className="m-0 log-out">
                  Log Out
                </p>
              </div>
            </div>
          </div>
          <div className="all-dashborad-content">
            <Routes>
              <Route path="/" element={<Navigate to="overview" />} />
              <Route path="overview" element={<Overview />} />
              <Route path="user" element={<User />} />
              {/* <Route path="profile" element={<Profile />} /> */}

              <Route
                path="admin-info"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <Admin />
                  </PrivateRoute>
                }
              />

              <Route
                path="create-admin"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <CreateAdmin />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
