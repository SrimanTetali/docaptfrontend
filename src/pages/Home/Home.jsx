import React from "react";
import { useNavigate } from "react-router-dom";
import HomeBg from "../../images/Home/HomeBg.png"; // Ensure this image works with a dark overlay
import Specialities from "./Specialities";
import HomeDoctor from "./HomeDoctor";
import HomeFooter from "./HomeFooter";

const Home = () => {
  const navigate = useNavigate();

  const handleMakeAppointment = () => {
    navigate("/patient-dashboard/doctors");
  };

  return (
    <div className="w-full bg-gray-800 text-gray-200">
      {/* Hero Section */}
      <div
        className="w-full min-h-[85vh] flex flex-col items-center justify-center text-center bg-cover bg-center px-6 relative"
        style={{ backgroundImage: `url(${HomeBg})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight">
            Your Health, No Waiting, No Hassles
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 drop-shadow-md max-w-2xl">
            How’s your health today? Feeling off? Don’t worry—find your doctor online and book effortlessly with eDoc.
          </p>
          <button
            onClick={handleMakeAppointment}
            className="bg-cyan-500 text-gray-900 font-semibold text-lg py-4 px-8 rounded-full hover:bg-cyan-600 transition-colors duration-200 transform hover:scale-105 shadow-lg"
          >
            Make Appointment
          </button>
        </div>
      </div>

      {/* Subcomponents */}
      <div className="w-full px-6 py-12 bg-gray-800">
        <Specialities />
        <HomeDoctor />
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;