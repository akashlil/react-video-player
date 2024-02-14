import React from "react";
import { useGetAllUserQuery } from "../../features/auth/registrationApiInj";
import AdminList from "./AdminList";

const Admin = () => {
  const {
    data: userList,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllUserQuery();

  const content = () => {
    if (isLoading) {
      return <Loader />;
    } else if (isError) {
      return <ErrorMessage />;
    } else if (!userList || userList.length === 0) {
      return <NoDataMessage />;
    } else if (isSuccess) {
      return <AdminList users={userList} />;
    }
    return null;
  };

  return <div className="p-4">{content()}</div>;
};

const Loader = () => <div>Loading...</div>;

const ErrorMessage = () => (
  <div>Error fetching data. Please try again later.</div>
);

const NoDataMessage = () => <div>No data available.</div>;

export default Admin;
