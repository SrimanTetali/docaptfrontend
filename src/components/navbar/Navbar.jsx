
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Golden Life</div>
      <div>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/doctors" className="nav-link">Doctors</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/contact" className="nav-link">Contact</NavLink>
        <NavLink to="/auth" className="nav-link">Login/Register</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
