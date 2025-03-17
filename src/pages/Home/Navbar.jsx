import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between items-center p-5 bg-gray-800 text-white w-full top-0 left-0 z-50 shadow-lg">
      <div className="text-xl font-bold">Golden Life</div>
      <div className="flex gap-5 pr-14 relative">
        <NavLink to="/" className="text-white font-bold hover:text-blue-400 transition duration-300">
          Home
        </NavLink>
        <NavLink to="/about" className="text-white font-bold hover:text-blue-400 transition duration-300">
          About
        </NavLink>
        <NavLink to="/contact" className="text-white font-bold hover:text-blue-400 transition duration-300">
          Contact
        </NavLink>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white font-bold hover:text-blue-400 transition duration-300 focus:outline-none"
          >
            Login/Register
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white border border-gray-700 rounded shadow-lg transition-opacity duration-300">
              <NavLink
                to="/patient-login"
                className="block px-4 py-2 hover:bg-gray-700 transition duration-300"
                onClick={() => setIsDropdownOpen(false)}
              >
                Patient Login
              </NavLink>
              <NavLink
                to="/patient-register"
                className="block px-4 py-2 hover:bg-gray-700 transition duration-300"
                onClick={() => setIsDropdownOpen(false)}
              >
                Patient Register
              </NavLink>
              <NavLink
                to="/doctor-login"
                className="block px-4 py-2 hover:bg-gray-700 transition duration-300"
                onClick={() => setIsDropdownOpen(false)}
              >
                Doctor Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
