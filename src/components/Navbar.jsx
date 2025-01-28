// src/components/Navbar.js
import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Golden Life</div>
      <div>
        <a href="">Home</a>
        <a href="">Doctors</a>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">Login/Register</a>
      </div>
    </div>
  );
};


export default Navbar;
