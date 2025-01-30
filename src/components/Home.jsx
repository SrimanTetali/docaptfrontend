// src/components/Home.jsx
import React from "react";
import "../styles/HomeSection.css";
import Specialties from "./Specialties";
import HomeFooter from "./homefooter/HomeFooter";
import HomeDoctor from "./homedoctor/HomeDoctor";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="content">
          <h1>Your Health, No Waiting, No Hassles</h1>
          <p>
            How is health today? Sounds like not good! Don't worry. Find your doctor online. 
            Book as you wish with eDoc.
          </p>
          <button onClick={() => window.location.href = "/Doctors"}>
            Make Appointment
          </button>
        </div>
      </div>
      <Specialties />
      <HomeDoctor />
      <HomeFooter />
    </>
  );
};

export default Home;
