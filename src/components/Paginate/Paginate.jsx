import React, { useState } from "react";
const Paginate = (dataList) => {
  // Use destructuring to directly extract props
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Removed useState since it's a static value

  // Calculate pagination range
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Slice the videos array to get paginated subset
  const paginationList = dataList?.slice(indexOfFirstUser, indexOfLastUser);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons
  const pagination = (
    <nav>
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(dataList.length / usersPerPage) },
          (_, i) => (
            <li
              key={`page-${i + 1}`}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              {/* Use onClick to trigger pagination */}
              <button className="page-link" onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  );

  // Return pagination component and paginated videos
  return {
    pagination,
    paginationList,
  };
};

export default Paginate;
