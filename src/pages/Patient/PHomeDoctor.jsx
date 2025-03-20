import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PHomeDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const detailsRef = useRef(null); // Ref for the doctor details section

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

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(selectedDoctor && selectedDoctor._id === doctor._id ? null : doctor);

    // Scroll to the doctor details section after a short delay
    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({
          behavior: "smooth", // Smooth scrolling
          block: "center",   // Center the element vertically
        });
      }
    }, 100); // Small delay to allow state update
  };

  return (
    <div className="py-12 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Top Doctors</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
        Meet our top doctors, carefully selected from various specialties to
        provide the best healthcare services. Each doctor is experienced and
        dedicated to your well-being.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {doctors.map((doctor, index) => (
          <div
            className={`bg-white border rounded-lg w-80 p-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
              selectedDoctor && selectedDoctor._id === doctor._id
                ? "border-indigo-600"
                : "border-indigo-200"
            }`}
            key={doctor._id || index}
            onClick={() => handleDoctorClick(doctor)}
          >
            <img
              src={doctor.profilePhoto}
              alt={`${doctor.name}'s photo`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-medium text-gray-900">{doctor.name}</h3>
            <p className="text-lime-500 font-semibold mt-2">{doctor.specialization}</p>
          </div>
        ))}
      </div>

      {/* Full-Width Doctor Details Section */}
      {selectedDoctor && (
        <div
          ref={detailsRef} // Attach the ref to this section
          className="mt-12 w-full bg-white py-12 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Doctor Photo */}
              <div className="flex-shrink-0 w-full lg:w-1/3">
                <img
                  src={selectedDoctor.profilePhoto}
                  alt={`${selectedDoctor.name}'s photo`}
                  className="w-full h-96 object-cover rounded-lg shadow-xl"
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="text-4xl font-bold text-gray-900">{selectedDoctor.name}</h3>
                  <p className="text-2xl text-lime-500 font-semibold mt-2">
                    {selectedDoctor.specialization}
                  </p>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">Experience:</span>{" "}
                      <span className="text-indigo-600">{selectedDoctor.experience} years</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">Consulting Fee:</span>{" "}
                      <span className="text-indigo-600">₹{selectedDoctor.consultingFee}</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">Education:</span>{" "}
                      {selectedDoctor.education}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">Hospital:</span>{" "}
                      {selectedDoctor.hospitalName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">Address:</span>{" "}
                      {selectedDoctor.hospitalAddress}
                    </p>
                  </div>
                </div>

                {/* About Section */}
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">About</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedDoctor.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PHomeDoctor;