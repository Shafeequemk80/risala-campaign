import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onSubscribe, onReject }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Your Choice
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to proceed with this action?
        </p>
        <div className="flex justify-center gap-10">
          <button
            onClick={onSubscribe}
            className="px-4 py-2 bg-green-600 w-32 text-white rounded-lg shadow hover:bg-green-700"
          >
            Subscribe
          </button>
          <button
            onClick={onReject}
            className="px-4 py-2 bg-red-600 w-32 text-white rounded-lg shadow hover:bg-red-700"
          >
            Reject
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
      </div>
    </div>
  );
};
export default Modal