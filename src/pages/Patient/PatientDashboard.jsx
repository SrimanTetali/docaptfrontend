import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role === "patient") {
        setPatient(userData);
      } else {
        navigate("/patient-login"); // Redirect if role mismatch
      }
    } else {
      navigate("/patient-login"); // Redirect if no session
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/patient-login");
  };

  if (!patient) {
    return (
      <div className="h-screen flex justify-center items-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-gray-800 text-white w-full top-0 left-0 z-50 shadow-lg">
        <div className="text-xl font-bold">Golden Life</div>
        <div className="flex gap-5 pr-14">
          <Link
            to="/patient-dashboard/phome" // New Home link
            className="text-white font-bold hover:text-blue-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/patient-dashboard/profile"
            className="text-white font-bold hover:text-blue-400 transition duration-300"
          >
            Profile
          </Link>
          <Link
            to="/patient-dashboard/doctors"
            className="text-white font-bold hover:text-blue-400 transition duration-300"
          >
            Doctors
          </Link>
          <Link
            to="/patient-dashboard/appointments"
            className="text-white font-bold hover:text-blue-400 transition duration-300"
          >
            My Appointments
          </Link>
          <Link
            to="/patient-dashboard/pcontact" // New Contact link
            className="text-white font-bold hover:text-blue-400 transition duration-300"
          >
            Contact
          </Link>
          <button
            onClick={handleLogout}
            className="text-white font-bold hover:text-blue-400 transition duration-300"
          >
            Logout
          </button>
        </div>
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

export default PatientDashboard;