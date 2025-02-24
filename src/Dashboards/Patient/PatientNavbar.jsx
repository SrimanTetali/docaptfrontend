import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const PatientNavbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setUser(null); // Clear user state
      navigate("/auth"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-5 bg-gray-800 text-white w-full top-0 left-0 z-50 shadow-lg">
      <div className="text-xl font-bold">Golden Life</div>
      <div className="flex gap-5 pr-14">
        <NavLink to="/" className="text-white font-bold hover:text-blue-500">Home</NavLink>
        <NavLink to="/doctors" className="text-white font-bold hover:text-blue-500">Doctors</NavLink>
        <NavLink to="/my-appointment" className="text-white font-bold hover:text-blue-500">My Appointment</NavLink>
        <NavLink to="/about" className="text-white font-bold hover:text-blue-500">About</NavLink>
        <NavLink to="/contact" className="text-white font-bold hover:text-blue-500">Contact</NavLink>
        <NavLink to="/profile" className="text-white font-bold hover:text-blue-500">Profile</NavLink>
        <button onClick={handleLogout} className="text-red-500 font-bold hover:text-red-700">Logout</button>
      </div>
    </div>
  );
};

export default PatientNavbar;
