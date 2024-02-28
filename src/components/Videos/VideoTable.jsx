import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDeleteVideosMutation } from "../../features/videos/videoApiInj";
import { useNavigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

const VideoTable = ({ data }) => {
  const navigator = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [deleteVideos] = useDeleteVideosMutation();

  useEffect(() => {
    const filterData = () => {
      const filteredResult = data.filter((item) =>
        item.video_title?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setFilteredData(filteredResult);
    };

    filterData();
  }, [data, searchTerm]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await deleteVideos(id);
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
    [deleteVideos, filteredData]
  );

  const columns = [
    { name: "id", selector: (row) => row._id, style: { maxWidth: "auto" } },
    {
      name: "Video Title",
      selector: (row) => row.video_title,
      style: { maxWidth: "250px" },
    },
    {
      name: "Video URL",
      selector: (row) => row.video_url,
      style: { maxWidth: "250px" },
    },
    {
      name: "Video Details",
      selector: (row) => row.video_details,
      style: { maxWidth: "250px" },
    },
    {
      name: "Video Thumbnail",
      selector: (row) => (
        <img height={70} width={80} src={row.video_thumbnail} alt="Thumbnail" />
      ),
      style: { maxWidth: "auto" },
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

export default VideoTable;
