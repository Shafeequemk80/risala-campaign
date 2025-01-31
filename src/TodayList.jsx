import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";




const TodayList = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL
  const { unitName } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [arg, setArg] = useState({index:'', id:""});
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [spinner, setSpin] = useState(false);
  const rowsLimit = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSpin( true)
        const response = await axios.get(`${apiUrl}/${unitName}/gettodaylist`);
        if (response.data.data) {
     
          setData(response.data.data);
          setCount(response.data.length);
        } else {
          console.error("Received data is not an array:", response.data);
          setError("Unexpected data format");
        }
       
      } catch (err) {
        setError(err.message);
      
        toast.dismiss();
        toast.error("Error loading data");
      }finally{
        setSpin(false)

      }
    };

    fetchData();
  }, []);

  const handleAdding = async (index, id) => {
    setShowModal(true)
    setArg({index,id})
    };
    


    const handleSubscribe = async () => {
      try {
        // Optimistically remove the item from the data
        const updatedData = data.filter((_, i) => i !== arg.index);
        
        // Send the request to the server
        const response = await axios.get(`${apiUrl}/${unitName}/addtosubscribe/${arg.id}`);
        setData(updatedData);
        
        // Log the server's response
        console.log("Server Response:", response.data);
    
        
      } catch (error) {
        // Rollback the optimistic update
        setData((prevData) => [...prevData, data[arg.index]]);
    
        // Handle errors gracefully
        console.error("Error adding to the subcribe list:", error.message || error);
    
        alert("Failed to add to the today list. Please try again.");
      }
      setArg({index:'', id:""})
      setShowModal(false);
    };
    
    const handleReject = async () => {
      try {
        // Optimistically remove the item from the data
        const updatedData = data.filter((_, i) => i !== arg.index);
        setData(updatedData);
    
        // Send the request to the server (different endpoint for reject if needed)
        const response = await axios.get(`${apiUrl}/${unitName}/addtoRejected/${arg.id}`);
        
        // Log the server's response
        console.log("Server Response:", response.data);
    
        alert("Successfully rejected the item!");
      } catch (error) {
        // Rollback the optimistic update
        setData((prevData) => [...prevData, data[arg.index]]);
    
        // Handle errors gracefully
        console.error("Error rejecting the item:", error.message || error);
    
      
      }
      setArg({index:'', id:""})
      setShowModal(false);
    };
    



  return spinner ? (
    <div className="flex justify-center items-center h-screen">
    <BeatLoader color="#059227" />
  </div>
  ): (
    <div className="bg-gray-100">
     
      <div className="container mx-auto  justify-center  ">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-blue-500 mt-24 mb-7">Today List</h1>
        </div>
    <Modal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    onSubscribe={handleSubscribe}
    onReject={handleReject}/>
      
        <Table
          data={data}
          loading={loading}
          handleAdding={handleAdding}
          error={error}
          setData={setData}
          type={'t'}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

      </div>
    </div>

  );
};

export default TodayList;
