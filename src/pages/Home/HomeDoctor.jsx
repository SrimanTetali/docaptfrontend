import React, { useState, useEffect } from "react";
import axios from "axios";

const HomeDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctorsdata");
        const doctorsList = response.data;

        // Select only one doctor per specialty
        const specialtyMap = {};
        doctorsList.forEach((doctor) => {
          if (!specialtyMap[doctor.specialization]) {
            specialtyMap[doctor.specialization] = doctor;
          }
        });

        setDoctors(Object.values(specialtyMap));
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="py-12 bg-white text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Top Doctors</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
        Meet our top doctors, carefully selected from various specialties to
        provide the best healthcare services. Each doctor is experienced and
        dedicated to your well-being.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {doctors.map((doctor, index) => (
          <div
            className="bg-gray-100 border border-gray-300 rounded-lg w-80 p-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition"
            key={doctor._id || index}
          >
            <img
              src={doctor.profilePhoto}
              alt={`${doctor.name}'s photo`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-medium text-gray-800">{doctor.name}</h3>
            <p className="text-blue-600 font-semibold mt-2">{doctor.specialization}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDoctor;
