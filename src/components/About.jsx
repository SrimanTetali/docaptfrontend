import React from "react";
import Footer from "./Footer";
import ContinuousImprovementIcon from '../images/Home/About/continuosimprovement.png';
import CoustomerFocuesIcon from '../images/Home/About/customerfocus.png';
import CostomerServiceIcon from '../images/Home/About/customerservice.png';

const About = () => {
  return (
    <>
      <div className="about-us-container bg-gradient-to-r from-blue-100 to-blue-300 py-16 px-8">
        <div className="vision-mission-values space-y-12">
          {/* Vision Section */}
          <div className="section bg-white p-10 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To empower healthcare professionals and enhance patient care
              worldwide through the adoption of technology.
            </p>
          </div>

          {/* Mission Section */}
          <div className="section bg-white p-10 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To provide an affordable and secure healthcare platform for
              clinics and hospitals, and to promote optional virtual visits.
            </p>
          </div>

          {/* Values Section */}
          <div className="section bg-white p-10 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Core Values</h2>
            <p className="text-lg text-gray-700 mb-8">
              Our core values reflect our commitment to delivering quality
              services and building strong relationships with our customers and
              partners.
            </p>
            <div className="values flex flex-wrap justify-center gap-10">
              {/* Customer Focus */}
              <div className="value w-72 p-6 bg-blue-50 rounded-xl text-center shadow-lg hover:bg-blue-100 transition-all duration-300">
                <img
                  src={CoustomerFocuesIcon}
                  alt="Customer Focus"
                  className="mx-auto w-24 h-24 mb-4"
                />
                <h3 className="font-semibold text-xl text-gray-800">Customer Focus</h3>
                <p className="text-gray-600">
                  We understand that our customers are the heart of our business. We are committed to providing exceptional customer service and support.
                </p>
              </div>

              {/* Continuous Improvement */}
              <div className="value w-72 p-6 bg-blue-50 rounded-xl text-center shadow-lg hover:bg-blue-100 transition-all duration-300">
                <img
                  src={ContinuousImprovementIcon}
                  alt="Continuous Improvement"
                  className="mx-auto w-24 h-24 mb-4"
                />
                <h3 className="font-semibold text-xl text-gray-800">Continuous Improvement</h3>
                <p className="text-gray-600">
                  We believe in continuous improvement and are always looking for ways to enhance our services and meet the evolving needs of our customers.
                </p>
              </div>

              {/* Customer Service */}
              <div className="value w-72 p-6 bg-blue-50 rounded-xl text-center shadow-lg hover:bg-blue-100 transition-all duration-300">
                <img
                  src={CostomerServiceIcon}
                  alt="Customer Service"
                  className="mx-auto w-24 h-24 mb-4"
                />
                <h3 className="font-semibold text-xl text-gray-800">Customer Service</h3>
                <p className="text-gray-600">
                  Our dedicated customer service team is available to assist you with any questions or concerns you may have.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
