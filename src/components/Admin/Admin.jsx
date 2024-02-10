import React from "react";
import { useSelector } from "react-redux";
import { useGetAllUserQuery } from "../../features/auth/registrationApiInj";
import AdminList from "./AdminList";

export default function Admin() {
  // let userRole = useSelector((state) => state?.roles?.userRole?.role);
  let content;
  const {
    data: userList,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllUserQuery();

  if (isLoading) {
    content = "Loding";
  }
  if (!isLoading && isError) {
    content = "Error";
  }
  if (!isLoading && !isError && userList.length < 0) {
    content = "no data";
  }
  if (!isLoading && !isError && userList.length > 0 && isSuccess) {
    content = (
      <div className="p-4">
        <AdminList users={userList} />
      </div>
    );
  }

  return content;
}
