import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import EmailIcon from "../../images/Home/contact/email.jpeg";
import WhatsappIcon from "../../images/Home/contact/whatsapp.jpeg";
import PhoneIcon from "../../images/Home/contact/phone.jpeg";
import Footer from "../Home/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    problem: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, phonenumber, email, problem } = formData;
    if (!firstname || !lastname || !phonenumber || !email || !problem) {
      toast.error("Please fill out all required fields!", { autoClose: 3000 });
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      toast.success(response.data.message, { autoClose: 3000 });
      setFormData({ firstname: "", lastname: "", phonenumber: "", email: "", problem: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", { autoClose: 3000 });
    }
  };

  const contactMethods = [
    {
      icon: EmailIcon,
      label: "Email Us",
      value: "support@goldenlife.in",
      href: "mailto:support@goldenlife.in",
      color: "text-teal-600",
    },
    {
      icon: WhatsappIcon,
      label: "WhatsApp Us",
      value: "+91 9898761234",
      href: "https://wa.me/919898761234",
      note: "Available 9am - 8pm, Mon - Sun",
      color: "text-green-600",
    },
    {
      icon: PhoneIcon,
      label: "Call Us",
      value: "(011)-4118 3001",
      href: "tel:(011)-4118 3001",
      color: "text-blue-600",
    },
  ];

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12"
          >
            Contact Us Anytime – We’ve Got You Covered!
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Information Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Contact Us Directly
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Reach out to our team for any inquiries or support. We're here to assist you!
              </p>
              <div className="space-y-6">
                {contactMethods.map((method) => (
                  <div key={method.value} className="flex items-start gap-4">
                    <img
                      src={method.icon}
                      alt={method.label}
                      className="w-12 h-12 object-contain rounded-full border border-gray-200 p-1"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {method.label}
                      </p>
                      <a
                        href={method.href}
                        className={`${method.color} text-xl font-bold hover:underline`}
                      >
                        {method.value}
                      </a>
                      {method.note && (
                        <p className="text-sm text-gray-500 mt-1">{method.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-lg text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-lg text-black"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-lg text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-lg text-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-lg text-black resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition-all duration-200 text-lg shadow-md"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Contact;