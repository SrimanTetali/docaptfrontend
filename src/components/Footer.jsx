import React from 'react';
import FaceBook from '../images/Followus/facebook.png';
import Twitter from '../images/Followus/Twitter.png';
import Instagram from '../images/Followus/instagram.jpeg';
import LinkedIn from '../images/Followus/linkedin.png';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-links">
                <a href="about.html">About Us</a>
                <a href="contact.html">Contact</a>
                <a href="faq.html">FAQs</a>
                <a href="terms.html">Terms & Conditions</a>
            </div>
            <div className="social-icons">
                <a href="#"><img src={FaceBook} alt="Facebook" /></a>
                <a href="#"><img src={Twitter} alt="Twitter" /></a>
                <a href="#"><img src={Instagram} alt="Instagram" /></a>
                <a href="#"><img src={LinkedIn} alt="LinkedIn" /></a>
            </div>
            &copy; 2025 Online Doctor Appointment System. All rights reserved.
        </footer>
    );
}

export default Footer;
