import React, { useState, useEffect } from "react";
import { db } from "../firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollectionRef = collection(db, "doctors");
        const querySnapshot = await getDocs(doctorsCollectionRef);
        const doctorsList = querySnapshot.docs.map((doc) => doc.data());
        setDoctors(doctorsList);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors =
    selectedSpecialty === "All"
      ? doctors
      : doctors.filter((doctor) => doctor.speciality === selectedSpecialty);

  return (
    <div className="flex flex-col md:flex-row p-8 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="md:w-1/5 bg-gray-200 p-6 rounded-lg mb-6 md:mb-0 md:mr-6">
        <h2 className="text-xl font-bold text-center mb-4">Specialists</h2>
        <ul className="space-y-2">
          <li
            className={`p-3 rounded-lg cursor-pointer transition ${
              selectedSpecialty === "All" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
            }`}
            onClick={() => setSelectedSpecialty("All")}
          >
            All Specialists
          </li>
          {[...new Set(doctors.map((doctor) => doctor.speciality))].map(
            (specialty, index) => (
              <li
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition ${
                  selectedSpecialty === specialty ? "bg-blue-500 text-white" : "hover:bg-blue-100"
                }`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Doctors List */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Specialists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
                <img
                  src={doctor.image}
                  alt={`${doctor.name}'s photo`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-bold text-gray-900">{doctor.name}</h2>
                <p className="text-blue-600 font-semibold">{doctor.speciality}</p>
                <p className="text-gray-600">{doctor.experience} years of experience</p>
                <p className="text-green-600 font-bold">Consultation Fee: ${doctor.fees}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No doctors available in this specialty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
