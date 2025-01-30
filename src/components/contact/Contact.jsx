// src/pages/Contact.jsx
import React from "react";
import Footer from "../Footer";
import './Contact.css';
import EmailIcon from '../../images/Home/contact/email.jpeg';
import WhatsappIcon from '../../images/Home/contact/whatsapp.jpeg';
import PhoneIcon from '../../images/Home/contact/phone.jpeg';
const Contact = () => {
    return (
        <>
            <section id="contact-us">
                <h1>How can We Help You?</h1>

                <p>If you are a Patient/Doctor or want to Partner with us. Contact our customer support team for your queries</p>
                
                <div className="contact-container">
                    {/* Email Section */}
                    <div className="contact-item">
                        <img src={EmailIcon} alt="Email" className="contact-icon" />
                        <div className="contact-details">
                            <p>Email us at</p>
                            <a href="mailto:support@goldenlife.in" className="contact-link">support@goldenlife.in</a>
                        </div>
                    </div>
                    <hr />
                
                    {/* WhatsApp Section */}
                    <div className="contact-item">
                        <img src={WhatsappIcon} alt="WhatsApp" className="contact-icon" />
                        <div className="contact-details">
                            <p>or WhatsApp us at</p>
                            <a href="https://wa.me/919898761234" className="contact-link">+91 9898761234</a>
                            <p className="note">(Team will be available between 9am to 8pm, Monday to Sunday)</p>
                        </div>
                    </div>
                    <hr />
                
                    {/* Call Us Section */}
                    <div className="contact-item">
                        <img src={PhoneIcon} alt="Phone" className="contact-icon" />
                        <div className="contact-details">
                            <p>or Call us between 9am to 8pm, Mon to Sun at</p>
                            <a href="tel:(011)-4118 3001" className="contact-link">(011)-4118 3001</a>
                        </div>
                    </div>
                </div>
                

                <form className="contact-form">
                    <p>We are here to assist you. Please fill out the form below:</p>

                    {/* Row 1: First Name and Last Name */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" id="firstname" name="firstname" placeholder="Enter your first name" style={{ marginRight: '10px' }} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" id="lastname" name="lastname" placeholder="Enter your last name" />
                        </div>
                    </div>

                    {/* Row 2: Mobile Number and Email */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="phone">Mobile Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email address" required />
                        </div>
                    </div>

                    {/* Row 3: Textarea */}
                    <div className="form-group">
                        <label htmlFor="message">How can we Help you?</label>
                        <textarea id="message" name="message" placeholder="Ask Your Question" rows="5" required></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit">Submit</button>
                </form>
            </section>
            <Footer/>
        </>
    );
};

export default Contact;