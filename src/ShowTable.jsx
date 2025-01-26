import React, { useMemo, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";



const ShowTable = () => {
  const { unitName } = useParams();
  const [rowsLimit, setRowsLimit] = useState(20); // Dynamic rows limit
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);
    const [data, setData] = useState([]);


    const location =useLocation()
    const{type}= location.state
    useEffect(() => {
      const fetchData = async () => {
        try {
          const load = toast.loading("Loading..");
          const response = await axios.get(`http://localhost:5000/${unitName}/${type}`);
          if (response.data.data) {
            toast.dismiss(load);
            setData(response.data.data);
            // setCount(response.data.length);
          } else {
            console.error("Received data is not an array:", response.data);
            setError("Unexpected data format");
          }
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
          toast.dismiss();
          toast.error("Error loading data");
        }
      };
  
      fetchData();
    }, []);

  // Calculate total pages based on the data length
  const totalPage = useMemo(() => Math.ceil(data.length / rowsLimit), [data.length, rowsLimit]);

 useEffect(() => {
  const newTotalPages = Math.ceil((data.length + 1) / rowsLimit);
  setCurrentPage(newTotalPages - 1);
 
   
 }, [data])
 

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

  const handleAdding = (index) => {
    console.log(totalPage)
    const updatedData = data.filter((_, i) => i !== index);
    console.log("Updated Data:", updatedData);
    // Perform additional actions as needed
    setData(updatedData)
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner />
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
    <div className="container mx-auto  justify-center  ">
    <div className="flex justify-center">
        <h1 className="text-4xl font-bold text-red-700 mt-24 mb-7">{type=="gettosubscribe"?"Suscribed List":"Rejected List"}</h1>
      </div>
    
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
            <thead className="bg-[#222E3A]/[6%] text-leftsrc/Table.jsx text-base text-white font-semibold">
              <tr>
                <th className="py-3 px-3 text-[#212B36] font-bold">No</th>
                <th className="py-3 px-3 text-[#212B36] font-bold">Name</th>
                <th className="py-3 px-3 text-[#212B36] font-bold">Type</th>
             
              </tr>
            </thead>
            <tbody>
              {rowsToShow.map((item, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                  }`}
                  key={`${item.name}-${index}`}
                >
                  <td className="py-2 px-3 border-t whitespace-nowrap">
                    {currentPage * rowsLimit + index + 1}
                  </td>
                  <td className="py-2 px-3 border-t whitespace-nowrap">{item.name}</td>
                  <td className="py-2 px-3 border-t whitespace-nowrap">{item.type}</td>
                 
                </tr>
              ))}
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
                className={`flex items-center justify-center w-9 h-9 border rounded ${
                  currentPage === 0
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
                  className={`flex items-center justify-center w-9 h-9 border rounded cursor-pointer ${
                    currentPage === index
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
                className={`flex items-center justify-center w-9 h-9 border rounded ${
                  currentPage === totalPage - 1
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
    </div>
  );
};

export default ShowTable;
