// src/pages/Contact.jsx
import React from "react";
import Footer from "./Footer";
import EmailIcon from "../images/Home/contact/email.jpeg";
import WhatsappIcon from "../images/Home/contact/whatsapp.jpeg";
import PhoneIcon from "../images/Home/contact/phone.jpeg";
import ContactBG from '../images/Home/contact/Contact.png';

const Contact = () => {
    return (
        <>
            <section className="bg-cover bg-center flex justify-end pr-20" style={{ backgroundImage: `url(${ContactBG})` }}>
                <div className="max-w-3xl bg-white bg-opacity-90 p-8 rounded-lg shadow-lg my-12 mr-10">
                    <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">How can We Help You?</h1>
                    <p className="text-center text-gray-700 mb-6">
                        If you are a Patient/Doctor or want to Partner with us. Contact our customer support team for your queries.
                    </p>
                    
                    <div className="bg-blue-50 p-6 rounded-lg shadow">
                        {/* Email Section */}
                        <div className="flex items-center gap-4 my-4">
                            <img src={EmailIcon} alt="Email" className="w-10 h-10 object-contain" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">Email us at</p>
                                <a href="mailto:support@goldenlife.in" className="text-blue-600 font-bold">support@goldenlife.in</a>
                            </div>
                        </div>
                        <hr className="border-gray-300 my-4" />
                        
                        {/* WhatsApp Section */}
                        <div className="flex items-center gap-4 my-4">
                            <img src={WhatsappIcon} alt="WhatsApp" className="w-10 h-10 object-contain" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">or WhatsApp us at</p>
                                <a href="https://wa.me/919898761234" className="text-blue-600 font-bold">+91 9898761234</a>
                                <p className="text-xs text-gray-600">(Team will be available between 9am to 8pm, Monday to Sunday)</p>
                            </div>
                        </div>
                        <hr className="border-gray-300 my-4" />
                        
                        {/* Call Us Section */}
                        <div className="flex items-center gap-4 my-4">
                            <img src={PhoneIcon} alt="Phone" className="w-10 h-10 object-contain" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">or Call us between 9am to 8pm, Mon to Sun at</p>
                                <a href="tel:(011)-4118 3001" className="text-blue-600 font-bold">(011)-4118 3001</a>
                            </div>
                        </div>
                    </div>

                    <form className="flex flex-col gap-6 mt-6">
                        <p className="text-gray-800 text-center">We are here to assist you. Please fill out the form below:</p>
                        
                        {/* Row 1: First Name and Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstname" className="font-semibold text-gray-700">First Name</label>
                                <input type="text" id="firstname" name="firstname" placeholder="Enter your first name" required className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="font-semibold text-gray-700">Last Name</label>
                                <input type="text" id="lastname" name="lastname" placeholder="Enter your last name" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                        </div>

                        {/* Row 2: Mobile Number and Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone" className="font-semibold text-gray-700">Mobile Number</label>
                                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label htmlFor="email" className="font-semibold text-gray-700">Email Address</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email address" required className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                        </div>

                        {/* Row 3: Textarea */}
                        <div>
                            <label htmlFor="message" className="font-semibold text-gray-700">How can we Help you?</label>
                            <textarea id="message" name="message" placeholder="Ask Your Question" rows="5" required className="w-full p-2 border border-gray-300 rounded resize-none"></textarea>
                        </div>
                        
                        {/* Submit Button */}
                        <button type="submit" className="w-1/2 mx-auto bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">Submit</button>
                    </form>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Contact;
