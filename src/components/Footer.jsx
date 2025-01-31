import React from "react";
import FaceBook from "../images/Followus/facebook.png";
import Twitter from "../images/Followus/Twitter.png";
import Instagram from "../images/Followus/instagram.jpeg";
import LinkedIn from "../images/Followus/linkedin.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 shadow-md w-full">
      {/* Footer Links */}
      <div className="mb-4">
        <a href="about.html" className="mx-4 text-sm hover:text-blue-400 transition duration-300">
          About Us
        </a>
        <a href="contact.html" className="mx-4 text-sm hover:text-blue-400 transition duration-300">
          Contact
        </a>
        <a href="faq.html" className="mx-4 text-sm hover:text-blue-400 transition duration-300">
          FAQs
        </a>
        <a href="terms.html" className="mx-4 text-sm hover:text-blue-400 transition duration-300">
          Terms & Conditions
        </a>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center items-center space-x-4 mb-4">
        <a href="#">
          <img src={FaceBook} alt="Facebook" className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-300" />
        </a>
        <a href="#">
          <img src={Twitter} alt="Twitter" className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-300" />
        </a>
        <a href="#">
          <img src={Instagram} alt="Instagram" className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-300" />
        </a>
        <a href="#">
          <img src={LinkedIn} alt="LinkedIn" className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-300" />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-sm">&copy; 2025 Online Doctor Appointment System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
