import React, { useState, useEffect } from "react";
import { db } from "../firebaseconfig"; // Import Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import "../styles/Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  // Fetch doctors data from Firestore
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollectionRef = collection(db, "doctors"); // Reference to 'doctors' collection
        const querySnapshot = await getDocs(doctorsCollectionRef); // Fetch all documents
        const doctorsList = querySnapshot.docs.map((doc) => doc.data()); // Map to doctor objects
        setDoctors(doctorsList); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on selected specialty
  const filteredDoctors =
    selectedSpecialty === "All"
      ? doctors
      : doctors.filter((doctor) => doctor.speciality === selectedSpecialty);

  return (
    <div className="doctors-page">
      <div className="sidebar">
        <h2 className="sidebar-title">Specialties</h2>
        <ul className="specialty-list">
          <li
            className={`specialty-item ${
              selectedSpecialty === "All" ? "active" : ""
            }`}
            onClick={() => setSelectedSpecialty("All")}
          >
            All Specialists
          </li>
          {/* Dynamically generate specialties from doctors data */}
          {[...new Set(doctors.map((doctor) => doctor.speciality))].map(
            (specialty, index) => (
              <li
                key={index}
                className={`specialty-item ${
                  selectedSpecialty === specialty ? "active" : ""
                }`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="doctors-content">
        <h1 className="page-title">Our Specialists</h1>
        <div className="doctors-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div className="doctor-card" key={doctor._id}>
                <img
                  src={doctor.image}
                  alt={`${doctor.name}'s photo`}
                  className="doctor-image"
                />
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="doctor-specialty">{doctor.speciality}</p>
                <p className="doctor-experience">
                  {doctor.experience} of Experience
                </p>
                <p className="doctor-fees">
                  Consultation Fee: ${doctor.fees}
                </p>
              </div>
            ))
          ) : (
            <p>No doctors available in this specialty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
