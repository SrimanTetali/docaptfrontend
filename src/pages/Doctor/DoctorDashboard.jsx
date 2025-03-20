import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctor_user");
    const token = localStorage.getItem("doctor_token");

    if (storedDoctor && token) {
      setDoctor(JSON.parse(storedDoctor));
    } else {
      navigate("/doctor-login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("doctor_token");
    localStorage.removeItem("doctor_user");
    setDoctor(null);
    navigate("/", { replace: true });
  };

  if (doctor === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-medium text-gray-500 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 p-6 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <h2 className="text-3xl font-semibold text-gray-800">
          Doctor Dashboard
        </h2>
        <ul className="flex items-center space-x-8">
          <li>
            <Link
              to="/doctor-dashboard/dashboard"
              className="text-gray-600 hover:text-teal-600 font-medium text-lg px-4 py-3 rounded-md hover:bg-teal-50 transition-colors duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/doctor-dashboard/profile"
              className="text-gray-600 hover:text-teal-600 font-medium text-lg px-4 py-3 rounded-md hover:bg-teal-50 transition-colors duration-200"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/doctor-dashboard/appointments"
              className="text-gray-600 hover:text-teal-600 font-medium text-lg px-4 py-3 rounded-md hover:bg-teal-50 transition-colors duration-200"
            >
              Appointments
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-teal-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-50 w-full">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 w-full">
          {/* Nested Routes Render Here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;