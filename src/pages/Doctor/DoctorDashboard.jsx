import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role === "doctor") {
        setDoctor(userData);
      } else {
        navigate("/doctor-login"); // Redirect if role mismatch
      }
    } else {
      navigate("/doctor-login"); // Redirect if no session
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/doctor-login");
  };

  if (!doctor) {
    return (
      <div className="h-screen flex justify-center items-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
        <h2 className="text-xl font-bold">Doctor Dashboard</h2>
        <ul className="flex space-x-6">
          <li>
            <Link to="/doctor-dashboard/Dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/doctor-dashboard/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/doctor-dashboard/appointments" className="hover:underline">
              Appointments
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Nested Routes Render Here */}
        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
