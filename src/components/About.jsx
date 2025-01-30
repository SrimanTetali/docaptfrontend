// // src/pages/About.jsx
// import React from "react";


// const About = () => {
//   return (
//     <>
//       <h2>About Page</h2>
//       <Footer />
//     </>
//   );
// };

// export default About;


import React from "react";
import Footer from "./Footer";
import ContinuousImprovementIcon from '../images/Home/About/continuosimprovement.png';
import CoustomerFocuesIcon from '../images/Home/About/customerfocus.png';
import CostomerServiceIcon from '../images/Home/About/customerservice.png';
import '../styles/About.css';

const About = () => {
  return (
    <>
      <div className="about-us-container">
        <div className="vision-mission-values">
          <div className="section">
            <h2>Our Vision</h2>
            <p>
              To empower healthcare professionals and enhance patient care
              worldwide through the adoption of technology.
            </p>
          </div>
          <div className="section">
            <h2>Our Mission</h2>
            <p>
              To provide an affordable and secure healthcare platform for
              clinics and hospitals, and to promote optional virtual visits.
            </p>
          </div>
          <div className="section">
            <h2>Values</h2>
            <p>
              Our core values reflect our commitment to delivering quality
              services and building strong relationships with our customers and
              partners.
            </p>
            <div className="values">
              <div className="value">
                <img
                  src={CoustomerFocuesIcon}
                  alt="Customer Focus"
                />
                <h3>Customer Focus</h3>
                <p>
                  We understand that our customers are the heart of our
                  business. We are committed to providing exceptional customer
                  service and support.
                </p>
              </div>
              <div className="value">
                <img
                  src={ContinuousImprovementIcon}
                  alt="Continuous Improvement"
                  width="70%"
                  height="50%"
                />
                <h3>Continuous Improvement</h3>
                <p>
                  We believe in continuous improvement and are always looking
                  for ways to enhance our services and meet the evolving needs
                  of our customers.
                </p>
              </div>
              <div className="value">
                <img
                  src={CostomerServiceIcon}
                  alt="Customer Service"
                  width="70%"
                  height="50%"
                />
                <h3>Customer Service</h3>
                <p>
                  Our dedicated customer service team is available to assist you
                  with any questions or concerns you may have.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;



