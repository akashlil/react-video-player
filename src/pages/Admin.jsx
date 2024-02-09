import React from "react";
import { useSelector } from "react-redux";

export default function Admin() {
  let userRole = useSelector((state) => state?.roles?.userRole?.role);

  return <div>{userRole}</div>;
}
