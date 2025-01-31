import React, { useMemo, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";

const Table = ({ data, setData, loading, error, handleAdding, currentPage, setCurrentPage, type }) => {
  const [rowsLimit, setRowsLimit] = useState(20); // Dynamic rows limit
  

  // Calculate total pages based on the data length
  const totalPage = useMemo(() => Math.ceil(data.length / rowsLimit), [data.length, rowsLimit]);

  // Slice data to show only the rows for the current page
  const rowsToShow = useMemo(() => {
    const startIndex = currentPage * rowsLimit;
    return data.slice(startIndex, startIndex + rowsLimit);
  }, [data, currentPage, rowsLimit]);

  // Generate pagination items
  const paginationItems = useMemo(() => {
    return Array.from({ length: totalPage }, (_, index) => index);
  }, [totalPage]);

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < totalPage - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const changePage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">

      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-5">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white flex items-center justify-center px-2 pt-10 pb-20">
      <div className="w-full max-w-4xl px-2">
        {/* Rows per page dropdown */}
        <div className="flex justify-end mb-4">
          <select
            value={rowsLimit}
            onChange={(e) => setRowsLimit(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-[#222E3A]/[6%] text-left text-base text-white font-semibold">
              <tr>
                <th className="py-3 px-3 text-[#212B36] font-bold">No</th>
                <th className="py-3 px-3 text-[#212B36] font-bold">Name</th>
                <th className="py-3 px-3  hidden sm:table-cell text-[#212B36] font-bold">Type</th>
                <div className="text-center sm:w-full w-24 ">
                  <th className="py-3   flex justify- text-[#212B36] font-bold">
                    {type === "p" ? `Add to Today List` : "Add to Final List"}
                  </th>
                </div>
              </tr>
            </thead>
            <tbody>
              {rowsToShow.length > 0 ? (
                rowsToShow.map((item, index) => (
                  <tr
                    className={`${index % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                      }`}
                    key={`${item.name}-${index}`}
                  >
                    <td className="py-2 px-3 border-t whitespace-nowrap">
                      {currentPage * rowsLimit + index + 1}
                    </td>
                    <td className="py-2 px-3 border-t whitespace-nowrap">
                      {item.name}
                      {/* Show Type below Name in mobile view */}
                      <div className="sm:hidden text-sm text-gray-600">{item.type}</div>
                    </td>
                    {/* Hide Type column on mobile */}
                    <td className="py-2 px-3 border-t whitespace-nowrap hidden sm:table-cell">
                      {item.type}
                    </td>
                    <td className="py-2 px-3 flex justify-center border-t whitespace-nowrap">
                      <img
                        width={25}
                        onClick={() => handleAdding(index, item._id)}
                        src="/add.png"
                        alt="Add"
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>


        {/* Pagination */}
        <div className="w-full flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
          {/* Showing entries info */}
          <div className="text-lg">
            Showing {currentPage * rowsLimit + 1} to{" "}
            {currentPage === totalPage - 1
              ? data.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {data.length} entries
          </div>

          {/* Pagination controls */}
          <div className="flex">
            <ul
              className="flex justify-center items-center gap-x-2 z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={`flex items-center justify-center w-9 h-9 border rounded ${currentPage === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "cursor-pointer"
                  }`}
                onClick={previousPage}
                aria-label="Previous Page"
                title="Previous Page"
              >
                <img
                  src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg"
                  alt="Previous"
                />
              </li>
              {paginationItems.map((index) => (
                <li
                  className={`flex items-center justify-center w-9 h-9 border rounded cursor-pointer ${currentPage === index
                      ? "text-blue-600 border-sky-500"
                      : "border-gray-300"
                    }`}
                  onClick={() => changePage(index)}
                  key={index}
                  aria-label={`Page ${index + 1}`}
                  title={`Page ${index + 1}`}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center w-9 h-9 border rounded ${currentPage === totalPage - 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "cursor-pointer"
                  }`}
                onClick={nextPage}
                aria-label="Next Page"
                title="Next Page"
              >
                <img
                  src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg"
                  alt="Next"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
