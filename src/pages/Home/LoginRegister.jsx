import React, { useState } from "react";
import PatientLogin from "../Auth/PatientLogin";
import PatientRegister from "../Auth/PatientRegister";
import DoctorLogin from "../Auth/DoctorLogin";
import LoginBackground from "../../images/Home/loginBG.jpg";

const LoginRegister = () => {
  const [activeComponent, setActiveComponent] = useState("login");

  const renderComponent = () => {
    switch (activeComponent) {
      case "patientLogin":
        return <PatientLogin setUser={() => {}} />;
      case "patientRegister":
        return <PatientRegister />;
      case "doctorLogin":
        return <DoctorLogin setUser={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Welcome to HealthCare
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please choose an option below to continue.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveComponent("patientLogin")}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Patient Login
          </button>
          <button
            onClick={() => setActiveComponent("patientRegister")}
            className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition"
          >
            Patient Register
          </button>
          <button
            onClick={() => setActiveComponent("doctorLogin")}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Doctor Login
          </button>
        </div>
        <div className="mt-8">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;