import React, { useState, useEffect } from "react";
import { db } from "../../firebaseconfig"; // Import Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import "./HomeDoctor.css"; // Import the CSS file


const HomeDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors data from Firestore
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollectionRef = collection(db, "doctors"); // Reference to 'doctors' collection
        const querySnapshot = await getDocs(doctorsCollectionRef); // Fetch all documents
        const doctorsList = querySnapshot.docs.map((doc) => doc.data()); // Map to doctor objects

        // Select only one doctor per specialty
        const specialtyMap = {};
        doctorsList.forEach((doctor) => {
          if (!specialtyMap[doctor.speciality]) {
            specialtyMap[doctor.speciality] = doctor;
          }
        });

        setDoctors(Object.values(specialtyMap)); // Store unique doctors in state
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="home-doctor">
      <h2 className="home-doctor-title">Our Top Doctors</h2>
      <p className="home-doctor-description">
        Meet our top doctors, carefully selected from various specialties to
        provide the best healthcare services. Each doctor is experienced and
        dedicated to your well-being.
      </p>
      <div className="doctor-grid">
        {doctors.map((doctor, index) => (
          <div className="doctor-card" key={doctor._id || index}>
            <img
              src={doctor.image}
              alt={`${doctor.name}'s photo`}
              className="doctor-image"
            />
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialty">{doctor.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDoctor;
