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
  }, [navigate]); // Include navigate in the dependency array

  const handleLogout = () => {
    localStorage.removeItem("doctor_token");
    localStorage.removeItem("doctor_user");
    setDoctor(null);
    navigate("/", { replace: true });
  };

  if (doctor === null) {
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
            <Link to="/doctor-dashboard/dashboard" className="hover:underline">
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
      <div className="flex-1 p-0 bg-gray-100">
        {/* Nested Routes Render Here */}
        <div className="mt-0 bg-white p-0 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
