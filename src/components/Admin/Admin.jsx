import React from "react";
import { useGetAllUserQuery } from "../../features/auth/registrationApiInj";
import UserTable from "./UserTable";

const Admin = () => {
  const {
    data: userList,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllUserQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorMessage />;
  }
  if (!userList || !userList.length) {
    return <NoDataMessage />;
  }
  if (isSuccess) {
    return (
      <div className="px-5">
        <UserTable data={userList} />
      </div>
    );
  }
};

const Loader = () => <div>Loading...</div>;

const ErrorMessage = () => (
  <div>Error fetching data. Please try again later.</div>
);

const NoDataMessage = () => <div>No data available.</div>;

export default Admin;
