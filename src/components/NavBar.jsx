import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homenav.css";

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <nav className="cs-navbar">
      <div className="container-xxl">
        <div className="cs-navbar-container">
          <div className="cs-navbar-logo">
            <Link className="logo text-white" to={"/"}>
              React Video Player
            </Link>
          </div>

          <div className={`cs-navbar-links ${isNavOpen ? "active" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          <div className="cs-navbar-toggle" onClick={toggleNav}>
            <span className={`cs-bar ${isNavOpen ? "open" : ""}`}></span>
            <span className={`cs-bar ${isNavOpen ? "open" : ""}`}></span>
            <span className={`cs-bar ${isNavOpen ? "open" : ""}`}></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
