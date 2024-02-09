import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="pages-min-height">
        <Outlet />
      </div>
    </>
  );
}
