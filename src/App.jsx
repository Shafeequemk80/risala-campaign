import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';
import Home from './Home';
import PossibilityList from './PossibilityList';
import ShowTable from './ShowTable';
import TodayList from './TodayList';
import NotFound from './NotFound'; // Optional: Add a 404 page for invalid routes

const allowedUnits = import.meta.env.VITE_UNIT_NAME; // Add all your units here

// Helper function to check if the unit is valid
function isValidUnit(unitName) {
  return allowedUnits.includes(unitName);
}

// A route wrapper component to check the unit name
function ProtectedRoute({ element }) {
  const { unitName } = useParams();

  if (!isValidUnit(unitName)) {
    return <Navigate to="/404" />;
  }
  return element;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Base route */}
        <Route path="/" element={<Home />} />

        {/* Dynamic unit routes */}
        <Route 
          path="/:unitName/" 
          element={<ProtectedRoute element={<Home />} />} 
        />
        <Route 
          path="/:unitName/possibility-list" 
          element={<ProtectedRoute element={<PossibilityList />} />} 
        />
        <Route 
          path="/:unitName/today-list" 
          element={<ProtectedRoute element={<TodayList />} />} 
        />
        <Route 
          path="/:unitName/subscribed" 
          element={<ProtectedRoute element={<ShowTable />} />} 
        />
        <Route 
          path="/:unitName/rejected" 
          element={<ProtectedRoute element={<ShowTable />} />} 
        />

        {/* Optional: 404 route */}
        <Route path="/404" element={<NotFound />} />

        {/* Catch-all route for any invalid URL */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
