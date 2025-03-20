import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between items-center p-6 bg-gray-900 text-gray-200 w-full top-0 left-0 z-50 shadow-xl">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-extrabold text-cyan-500 tracking-tight">
          Golden Life
        </span>
      </div>
      <div className="flex gap-10 pr-10 relative">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg font-semibold ${
              isActive ? "text-cyan-500" : "text-gray-200"
            } hover:text-cyan-500 transition-colors duration-200`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-lg font-semibold ${
              isActive ? "text-cyan-500" : "text-gray-200"
            } hover:text-cyan-500 transition-colors duration-200`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-lg font-semibold ${
              isActive ? "text-cyan-500" : "text-gray-200"
            } hover:text-cyan-500 transition-colors duration-200`
          }
        >
          Contact
        </NavLink>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-lg font-semibold text-gray-200 hover:text-cyan-500 transition-colors duration-200 focus:outline-none"
          >
            Login/Register
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-lg transition-opacity duration-300 z-50">
              <NavLink
                to="/patient-login"
                className={({ isActive }) =>
                  `block px-5 py-3 text-gray-200 font-semibold ${
                    isActive ? "bg-gray-700 text-cyan-500" : "hover:bg-gray-700 hover:text-cyan-500"
                  } transition-colors duration-200`
                }
                onClick={() => setIsDropdownOpen(false)}
              >
                Patient Login
              </NavLink>
              <NavLink
                to="/patient-register"
                className={({ isActive }) =>
                  `block px-5 py-3 text-gray-200 font-semibold ${
                    isActive ? "bg-gray-700 text-cyan-500" : "hover:bg-gray-700 hover:text-cyan-500"
                  } transition-colors duration-200`
                }
                onClick={() => setIsDropdownOpen(false)}
              >
                Patient Register
              </NavLink>
              <NavLink
                to="/doctor-login"
                className={({ isActive }) =>
                  `block px-5 py-3 text-gray-200 font-semibold ${
                    isActive ? "bg-gray-700 text-cyan-500" : "hover:bg-gray-700 hover:text-cyan-500"
                  } transition-colors duration-200`
                }
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