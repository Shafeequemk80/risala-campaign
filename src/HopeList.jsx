import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";


const HopeList = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL
  
  const [name, setName] = useState("");
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { unitName } = useParams();

  const rowsLimit = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const load = toast.loading("Loading..");
        const response = await axios.get(`${apiUrl}/${unitName}/gethoplist`);
        if (response.data.data) {
          toast.dismiss(load);
          setData(response.data.data);
          setCount(response.data.length);
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

  const handleAdding = async (index, id) => {
      try {
        console.log("Total Pages:", index,id);
    
        // Optimistically remove the item from the data
        const updatedData = data.filter((_, i) => i !== index);
    
        // Send the request to the server
        const response = await axios.get(`${apiUrl}/${unitName}/addtotodaylist/${id}`);
        
        // Log the server's response for debugging
        console.log("Server Response:", response.message);
        setData(updatedData);
    
        // Update the state with the filtered data
    
      } catch (error) {
        // Handle errors gracefully
        console.error("Error adding to hope list:", error.message || error);
    
        // Optional: Notify the user about the error
        alert("Failed to add to the today list. Please try again.");
      }
    };
    

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const load = toast.loading("Loading..");
      const response = await axios.post(`${apiUrl}/${unitName}/addtohopelist`, {
        name,
        type,
      });
      
      console.log("Data sent successfully:", response.data);
      setData((prev) => [response.data.data, ...prev]);
      setCount((prev) => prev + 1);
      toast.dismiss(load);
      toast.success("Data added successfully!");

      // setData((prev) => [response.data.data, ...prev]);


      const newTotalPages = Math.ceil((data.length + 1) / rowsLimit);
      setCurrentPage(newTotalPages - 1);

      setName("");
      setType("");
    } catch (error) {
      console.error("Error sending data:", error);
      toast.dismiss();
      toast.error("Error sending data");
    }
  };



  return (
    <div className="bg-gray-100">
      <div className="container mx-auto  justify-center  ">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-red-700 mt-24 mb-7">Hope List</h1>
        </div>
        <div className="flex justify-center px-6">
          <form
            id="nameForm"
            className="w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="nameInput"
                className="block text-sm font-medium mb-1"
              >
                Enter name:
              </label>
              <input
                type="text"
                className="form-input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="nameInput"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="myDropdown"
                className="block text-sm font-medium mb-1"
              >
                Select Type:
              </label>
              <select
                id="myDropdown"
                className="form-select w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value=""selected disabled>
                  Type
                </option>
                <option value="Politics">Politics</option>
                <option value="Sunni leader">Sunni leader</option>
                <option value="Authes">Authes</option>
                <option value="Government officer">Government officer</option>
                <option value="Businessman">Businessman</option>

              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mb-10 shadow-sm hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          <ToastContainer />
        </div>
        <Table
          data={data}
          loading={loading}
          handleAdding={handleAdding}
          error={error}
          setData={setData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

      </div>
    </div>

  );
};

export default HopeList;
