import React from "react";
import ContinuousImprovementIcon from '../../images/Home/About/continuosimprovement.png';
import CustomerFocusIcon from '../../images/Home/About/customerfocus.png';
import CustomerServiceIcon from '../../images/Home/About/customerservice.png';
import Footer from "./Footer";
import { motion } from "framer-motion"; // Added for animations

const About = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              About Our Booking System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we’re transforming healthcare access with our online doctor appointment platform.
            </p>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 sm:p-10 rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl text-center">
              To revolutionize healthcare access by connecting patients and doctors seamlessly through a cutting-edge online appointment booking system.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 sm:p-10 rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl text-center">
              To simplify healthcare scheduling with a secure, user-friendly platform that empowers patients to book appointments effortlessly and enables doctors to manage their schedules efficiently.
            </p>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white p-8 sm:p-10 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Our Core Values</h2>
            <p className="text-lg text-gray-700 mb-10 text-center max-w-3xl mx-auto">
              We are driven by values that ensure a reliable, accessible, and patient-centric online booking experience for all.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Patient-Centric Care */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-blue-50 rounded-xl shadow-md hover:bg-blue-100 transition-all duration-300 ease-in-out flex flex-col items-center"
              >
                <img
                  src={CustomerFocusIcon}
                  alt="Patient-Centric Care"
                  className="w-16 h-16 mb-6"
                />
                <h3 className="font-semibold text-xl text-gray-800 mb-4">Patient-Centric Care</h3>
                <p className="text-gray-600 text-center">
                  We prioritize patients by offering a seamless booking process, ensuring healthcare is just a click away.
                </p>
              </motion.div>

              {/* Innovation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-blue-50 rounded-xl shadow-md hover:bg-blue-100 transition-all duration-300 ease-in-out flex flex-col items-center"
              >
                <img
                  src={ContinuousImprovementIcon}
                  alt="Innovation"
                  className="w-16 h-16 mb-6"
                />
                <h3 className="font-semibold text-xl text-gray-800 mb-4">Innovation</h3>
                <p className="text-gray-600 text-center">
                  We embrace technology to continuously improve our platform, making appointment booking faster and smarter.
                </p>
              </motion.div>

              {/* Support Excellence */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-blue-50 rounded-xl shadow-md hover:bg-blue-100 transition-all duration-300 ease-in-out flex flex-col items-center"
              >
                <img
                  src={CustomerServiceIcon}
                  alt="Support Excellence"
                  className="w-16 h-16 mb-6"
                />
                <h3 className="font-semibold text-xl text-gray-800 mb-4">Support Excellence</h3>
                <p className="text-gray-600 text-center">
                  Our dedicated team is here to assist patients and doctors, ensuring a smooth and reliable experience.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;