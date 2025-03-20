// src/components/PatientFooter.jsx
import React from 'react';
import FaceBook from '../../images/Followus/facebook.png';
import Twitter from '../../images/Followus/Twitter.png';
import Instagram from '../../images/Followus/instagram.jpeg';
import LinkedIn from '../../images/Followus/linkedin.png';

const HomeFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 p-6 md:p-8 w-full">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Us Section */}
        <div className="space-y-3">
          <h4 className="text-amber-400 text-xl font-semibold mb-4 tracking-tight">Contact Us</h4>
          <p className="text-sm">
            <span className="font-medium">Working Hours:</span> 9:00 AM - 8:00 PM
          </p>
          <p className="text-sm">
            <span className="font-medium">Phone:</span>{' '}
            <a href="tel:01141183001" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">
              011-4118 3001
            </a>
          </p>
          <p className="text-sm">
            <span className="font-medium">WhatsApp:</span>{' '}
            <a href="https://wa.me/919818093267" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">
              +91 9898761234
            </a>
          </p>
          <p className="text-sm">
            <span className="font-medium">Email:</span>{' '}
            <a href="mailto:support@goldenlife.in" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">
              support@goldenlife.in
            </a>
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-3">
          <h4 className="text-amber-400 text-xl font-semibold mb-4 tracking-tight">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">Our Blog</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">FAQs</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Online Booking & Appointments Section */}
        <div className="space-y-3">
          <h4 className="text-amber-400 text-xl font-semibold mb-4 tracking-tight">Online Booking</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">Cardiology</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">Dermatology</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">Pediatrics</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">Neurology</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">Orthopedics</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">Gynecology</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">Ophthalmology</a></li>
            <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors duration-200">General Physician</a></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="space-y-3">
          <h4 className="text-amber-400 text-xl font-semibold mb-4 tracking-tight">Follow Us</h4>
          <div className="flex space-x-4 justify-start">
            <a href="#" className="hover:scale-110 transition-transform duration-200">
              <img src={FaceBook} alt="Facebook" className="w-8 h-8 rounded-full object-cover" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-200">
              <img src={Twitter} alt="Twitter" className="w-8 h-8 rounded-full object-cover" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-200">
              <img src={Instagram} alt="Instagram" className="w-8 h-8 rounded-full object-cover" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-200">
              <img src={LinkedIn} alt="LinkedIn" className="w-8 h-8 rounded-full object-cover" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-xs">
        <p>© 2025 Golden Life Healthcare. All rights reserved.</p>
        <p className="mt-1">Designed with care for better healthcare.</p>
      </div>
    </footer>
  );
};

export default HomeFooter;