import React from "react";
import { Link } from "react-router-dom";
import "./DashBoardSidebar.module.css";

const DashBoardSidebar = ({
  sideBarList,
  userRole,
  toggleSidebar,
  activateLink,
  activeLinkRef,
  sidebarRef,
}) => {
  return (
    <div className="sidebar" id="sidebar" ref={sidebarRef}>
      {/* Close button section */}
      <div className="close-btn-section">
        <span className="close-btn" onClick={toggleSidebar}>
          &#9776;
        </span>
        <Link to="overview">
          <span className="text-white d-none d-md-block">Dashboard Home</span>
        </Link>
      </div>
      <div className="mb-5"></div>
      {/* Sidebar navigation */}
      {sideBarList.map((data, index) => (
        <ul className="all-ul-contect" key={index}>
          {data.roles.includes(userRole) && (
            <li className="bd-links-group py-2">
              <strong className="bd-links-heading d-flex w-100 fs-5 align-items-center text-light fw-semibold">
                {data.title}
              </strong>
              <ul className="list-unstyled fw-normal pb-2 fs-6 text-white">
                {data.Children.map((ele, index) => (
                  <li key={index}>
                    <Link
                      ref={activeLinkRef}
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
  );
};

export default DashBoardSidebar;
