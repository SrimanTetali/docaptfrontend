import React from "react";
import Specialties from "./Specialties";
import HomeFooter from "./HomeFooter";
import HomeDoctor from "./HomeDoctor";
import HomeBg from "../images/Home/HomeBg.png";

const Home = () => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-[85vh] text-center text-white bg-cover bg-center mt-[1px] px-5"
        style={{ backgroundImage: `url(${HomeBg})` }}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-lg">
            Your Health, No Waiting, No Hassles
          </h1>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            How is health today? Sounds like not good! Don't worry. Find your doctor online.
            Book as you wish with eDoc.
          </p>
          <button
            onClick={() => (window.location.href = "/Doctors")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md"
          >
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