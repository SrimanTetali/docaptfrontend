// src/components/Footer.js
import React from 'react';
import FaceBook from '../images/Followus/Facebook.jpeg';
import Twitter from '../images/Followus/Twitter.png';
import Instagram from '../images/Followus/instagram.jpeg';
import LinkedIn from '../images/Followus/linkedin.png';
import '../styles/HomeFooter.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h4>Contact Us</h4>
          <p><strong>Working Hours:</strong> 9:00 AM - 8:00 PM</p>
          <p><strong>Phone:</strong> <a href="tel:01141183001">011-4118 3001</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/919818093267">+91 9898761234</a></p>
          <p><strong>Email:</strong> <a href="mailto:support@goldenlife.in">support@goldenlife.in</a></p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Blog</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div>
          <h4>Online Booking & Appointments</h4>
          <ul>
            <li><a href="#">Cardiology</a></li>
            <li><a href="#">Dermatology</a></li>
            <li><a href="#">Pediatrics</a></li>
            <li><a href="#">Neurology</a></li>
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><img src={FaceBook} alt="Facebook" /></a>
            <a href="#"><img src={Twitter} alt="Twitter" /></a>
            <a href="#"><img src={Instagram} alt="Instagram" /></a>
            <a href="#"><img src={LinkedIn} alt="LinkedIn" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 Online Doctor Appointment Booking System. All rights reserved.<br/>
        Designed with care for better healthcare.
      </div>
    </footer>
  );
};

export default Footer;
