import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const HomeDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeDashboard;
