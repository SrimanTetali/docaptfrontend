import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("patient_user");
    const token = localStorage.getItem("patient_token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setPatient(parsedUser);
    } else {
      navigate("/patient-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("patient_user");
    localStorage.removeItem("patient_token");
    navigate("/");
  };

  if (!patient) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-800">
        <div className="text-2xl font-medium text-gray-200 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-800 flex flex-col">
      {/* Top Navbar */}
      <nav className="w-full bg-gray-900 text-gray-200 p-6 shadow-xl">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-cyan-500 tracking-tight">Golden Life</h1>
            <span className="text-sm font-light text-gray-200">Patient Dashboard</span>
          </div>
          <div className="flex items-center gap-10">
            <Link
              to="/patient-dashboard/phome"
              className="text-lg font-semibold text-gray-200 hover:text-cyan-500 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/patient-dashboard/profile"
              className="text-lg font-semibold text-gray-200 hover:text-cyan-500 transition-colors duration-200"
            >
              Profile
            </Link>
            <Link
              to="/patient-dashboard/doctors"
              className="text-lg font-semibold text-gray-200 hover:text-cyan-500 transition-colors duration-200"
            >
              Doctors
            </Link>
            <Link
              to="/patient-dashboard/appointments"
              className="text-lg font-semibold text-gray-200 hover:text-cyan-500 transition-colors duration-200"
            >
              Appointments
            </Link>
            <Link
              to="/patient-dashboard/pcontact"
              className="text-lg font-semibold text-gray-200 hover:text-cyan-500 transition-colors duration-200"
            >
              Contact
            </Link>
            <button
              onClick={handleLogout}
              className="text-lg font-semibold bg-amber-400 text-gray-900 px-5 py-2 rounded-full hover:bg-amber-500 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-0">
        <div className="bg-gray-800 rounded-xl shadow-md p-0 w-full text-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;