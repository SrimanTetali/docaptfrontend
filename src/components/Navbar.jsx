import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-5 bg-gray-800 text-white w-full top-0 left-0 z-50 shadow-lg">
      <div className="text-xl font-bold">Golden Life</div>
      <div className="flex gap-5 pr-14">
        <NavLink to="/" className="text-white font-bold hover:text-blue-500">Home</NavLink>
        <NavLink to="/doctors" className="text-white font-bold hover:text-blue-500">Doctors</NavLink>
        <NavLink to="/about" className="text-white font-bold hover:text-blue-500">About</NavLink>
        <NavLink to="/contact" className="text-white font-bold hover:text-blue-500">Contact</NavLink>
        <NavLink to="/auth" className="text-white font-bold hover:text-blue-500">Login/Register</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
