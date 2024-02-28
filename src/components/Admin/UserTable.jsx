import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { useDeleteRegisterUserMutation } from "../../features/auth/registrationApiInj";

const UserTable = ({ data }) => {
  const navigator = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [deleteRegisterUser] = useDeleteRegisterUserMutation();

  useEffect(() => {
    const filterData = () => {
      const filteredResult = data.filter((item) =>
        item.username?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setFilteredData(filteredResult);
    };

    filterData();
  }, [data, searchTerm]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await deleteRegisterUser(id);
        if (response?.data?.deletedCount > 0) {
          const updatedData = filteredData.filter((item) => item._id !== id);
          setFilteredData(updatedData);
          alert("Video deleted successfully");
        } else {
          alert("Failed to delete video");
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        alert("An error occurred while deleting video");
      }
    },
    [deleteRegisterUser, filteredData]
  );

  const columns = [
    { name: "id", selector: (row) => row._id, style: { maxWidth: "150px" } },
    {
      name: "User Name",
      selector: (row) => row.username,
      style: { maxWidth: "250px" },
    },
    {
      name: "Video URL",
      selector: (row) => row.email,
      style: { maxWidth: "250px" },
    },
    {
      name: "Video Details",
      selector: (row) => row.role,
      style: { maxWidth: "250px" },
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-sm btn-info ms-2"
            onClick={() => handleUpdate(row._id)}
          >
            Update
          </button>
        </>
      ),
      style: { maxWidth: "auto" },
    },
  ];

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#ccc",
      },
    },
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdate = (id) => {
    navigator(`update/${id}`);
  };

  console.log(filteredData);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "align"}>
      <DataTable
        customStyles={tableHeaderStyle}
        columns={columns}
        data={filteredData}
        pagination
        // selectableRows
        // fixedHeader
        // selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            className="w-25 form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        }
        subHeaderAlign="right"
        paginationPerPage={6}
      />
    </StyleSheetManager>
  );
};

export default UserTable;
