import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const PatientNavbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-5 bg-gray-800 text-white w-full top-0 left-0 z-50 shadow-lg">
      <div className="text-xl font-bold">Golden Life</div>
      <div className="flex gap-5 pr-14">
        <NavLink
          to="/"
          className="text-white font-bold transition-colors duration-300 hover:text-blue-500 hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded"
        >
          Home
        </NavLink>
        <NavLink
          to="/doctors"
          className="text-white font-bold transition-colors duration-300 hover:text-blue-500 hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded"
        >
          Doctors
        </NavLink>
        <NavLink
          to="/about"
          className="text-white font-bold transition-colors duration-300 hover:text-blue-500 hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="text-white font-bold transition-colors duration-300 hover:text-blue-500 hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded"
        >
          Contact
        </NavLink>
        <NavLink
          to="/my-appointment"
          className="text-white font-bold transition-colors duration-300 hover:text-blue-500 hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded"
        >
          My Appointment
        </NavLink>
        <NavLink
          to="/profile"
          className="text-white font-bold transition-colors duration-300 hover:text-blue-500 hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded"
        >
          Profile
        </NavLink>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold px-3 py-1 rounded transition-colors duration-300 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PatientNavbar;
