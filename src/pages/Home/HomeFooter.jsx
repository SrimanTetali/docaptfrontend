// src/components/HomeFooter.jsx
import React from 'react';
import FaceBook from '../../images/Followus/facebook.png';
import Twitter from '../../images/Followus/Twitter.png';
import Instagram from '../../images/Followus/instagram.jpeg';
import LinkedIn from '../../images/Followus/linkedin.png';

const HomeFooter = () => {
  return (
    <footer className="bg-gray-900 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <h4 className="text-yellow-400 text-lg mb-3">Contact Us</h4>
          <p><strong>Working Hours:</strong> 9:00 AM - 8:00 PM</p>
          <p><strong>Phone:</strong> <a href="tel:01141183001" className="text-gray-400 hover:text-white">011-4118 3001</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/919818093267" className="text-gray-400 hover:text-white">+91 9898761234</a></p>
          <p><strong>Email:</strong> <a href="mailto:support@goldenlife.in" className="text-gray-400 hover:text-white">support@goldenlife.in</a></p>
        </div>
        <div>
          <h4 className="text-yellow-400 text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Our Blog</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-yellow-400 text-lg mb-3">Online Booking & Appointments</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Cardiology</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Dermatology</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Pediatrics</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Neurology</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Pediatrics</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Orthopedics</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Gynecology</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Gastroenterology</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-yellow-400 text-lg mb-3">Follow Us</h4>
          <div className="flex space-x-4 justify-center">
            <a href="#"><img src={FaceBook} alt="Facebook" className="w-8 h-8 rounded-full hover:scale-110 transition" /></a>
            <a href="#"><img src={Twitter} alt="Twitter" className="w-8 h-8 rounded-full hover:scale-110 transition" /></a>
            <a href="#"><img src={Instagram} alt="Instagram" className="w-8 h-8 rounded-full hover:scale-110 transition" /></a>
            <a href="#"><img src={LinkedIn} alt="LinkedIn" className="w-8 h-8 rounded-full hover:scale-110 transition" /></a>
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-700 text-center pt-4 text-gray-400 text-sm">
        &copy; 2025 Online Doctor Appointment Booking System. All rights reserved.<br/>
        Designed with care for better healthcare.
      </div>
    </footer>
  );
};

export default HomeFooter;
