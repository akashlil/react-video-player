import React, { useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeUserRole } from "../features/auth/roleSlice";
import CreateAdmin from "../components/Admin/CreateAdmin";
import Admin from "../components/Admin/Admin";
import AddVideo from "../components/Videos/AddVideo";
import Video from "../components/Videos/Video";
import DashBoardSidebar from "../components/Dashboard/DashBoardSidebar";
import Overview from "../components/Dashboard/Overview";
import UpdatedFrom from "../components/Videos/UpdatedFrom";
import "../dashboard.css";

const Dashboard = () => {
  const activeLinkRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  let userRole = useSelector((state) => state.roles.userRole.role);

  function toggleSidebar() {
    sidebarRef.current.classList.toggle("collapsed");
    contentRef.current.classList.toggle("collapsed");
  }

  function activateLink(e) {
    if (activeLinkRef.current) {
      activeLinkRef.current.classList.remove("active");
    }
    e.target.classList.add("active");
    activeLinkRef.current = e.target;
  }

  const logOut = () => {
    dispatch(logout());
    dispatch(removeUserRole());
  };
  return (
    <div className="">
      <div className="dashboard-content">
        <DashBoardSidebar
          userRole={userRole}
          toggleSidebar={toggleSidebar}
          activateLink={activateLink}
          activeLinkRef={activeLinkRef}
          sidebarRef={sidebarRef}
        />
        <div className="content" id="content" ref={contentRef}>
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
              <Route path="add_videos" element={<AddVideo />} />
              <Route path="video_list" element={<Video />} />
              <Route path="video_list/update/:id" element={<UpdatedFrom />} />

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
