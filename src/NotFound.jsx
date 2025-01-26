import React from 'react';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-red-500 text-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2">Oops!</h1>
        <p className="text-xl mb-4">The unit you are looking for is not available.</p>
        <p className="text-lg">Please check the unit name and try again.</p>
      </div>
      <div className="mt-8">
        <a href="/" className="text-blue-500 hover:text-blue-700">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
