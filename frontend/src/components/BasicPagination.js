import React from "react";

function BasicPagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default BasicPagination;
