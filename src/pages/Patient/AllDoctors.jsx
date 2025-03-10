import React, { useEffect, useState } from "react";
import axios from "axios";
import { BriefcaseMedical, User, X } from "lucide-react";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Doctors");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    timeSlot: "",
    urgency: "Routine",
    reason: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient/doctors", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDoctors(response.data);
        setFilteredDoctors(response.data);

        const uniqueSpecialties = ["All Doctors", ...new Set(response.data.map((doc) => doc.specialization))];
        setSpecialties(uniqueSpecialties);
      } catch (error) {
        console.error("Error fetching doctors", error);
        setError("Failed to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filterDoctors = (specialty) => {
    setSelectedSpecialty(specialty);
    setFilteredDoctors(specialty === "All Doctors" ? doctors : doctors.filter((doc) => doc.specialization === specialty));
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor) return;

    const bookingData = {
      doctorId: selectedDoctor._id,
      date: appointmentDetails.date,
      timeSlot: selectedTimeSlot,
      urgency: appointmentDetails.urgency,
      reason: appointmentDetails.reason,
    };

    try {
      await axios.post("http://localhost:5000/api/patient/book-session", bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      alert("Appointment booked successfully!");
      setSelectedDoctor(null);
      setAppointmentDetails({ date: "", timeSlot: "", urgency: "Routine", reason: "" });
      setSelectedTimeSlot("");
    } catch (error) {
      console.error("Error booking appointment", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 p-6 bg-gray-200 rounded-lg shadow">
        <h2 className="text-xl font-bold text-center mb-6">Doctor Specialties</h2>
        <ul className="space-y-2">
          {specialties.map((specialty, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition ${
                selectedSpecialty === specialty
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => filterDoctors(specialty)}
            >
              {specialty}
            </li>
          ))}
        </ul>
      </aside>

      {/* Doctors List */}
      <div className="w-full md:w-3/4">
        {loading ? (
          <p className="text-center text-blue-500">Loading doctors...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-500">No doctors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="block p-4 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white cursor-pointer"
                onClick={() => setSelectedDoctor(doctor)}
              >
                <img src={doctor.profilePhoto} alt={doctor.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-blue-600">{doctor.name}</h3>
                <p className="flex items-center text-gray-600">
                  <BriefcaseMedical className="w-4 h-4 mr-2 text-green-500" />
                  {doctor.specialization}
                </p>
                <p className="text-gray-500 flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-500" />
                  Experience: {doctor.experience} years
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full relative" style={{ height: "auto", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Doctor Profile Details */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Doctor Image */}
              <div className="w-full md:w-1/3">
                <img
                  src={selectedDoctor.profilePhoto}
                  alt={selectedDoctor.name}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Doctor Information */}
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold text-blue-800 mb-2">{selectedDoctor.name}</h2>
                <p className="text-lg text-gray-700 font-semibold mb-1">{selectedDoctor.specialization}</p>
                <p className="text-gray-600 mb-2">Education: {selectedDoctor.education}</p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Experience:</span> {selectedDoctor.experience} years
                </p>
                <p className="text-gray-800 mb-6">{selectedDoctor.about}</p>
                <p className="text-xl font-semibold text-green-600">
                  Consulting Fee: ₹{selectedDoctor.consultingFee}
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6 border-t border-gray-200" />

            {/* Book Appointment Form */}
            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Book Appointment</h3>

              {/* Date Input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Date:</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={appointmentDetails.date}
                  onChange={(e) =>
                    setAppointmentDetails({ ...appointmentDetails, date: e.target.value })
                  }
                />
              </div>

              {/* Time Slot Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Time Slot:</label>
                <div className="grid grid-cols-4 gap-3">
                  {selectedDoctor.timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                        selectedTimeSlot === slot
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Urgency:</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={appointmentDetails.urgency}
                  onChange={(e) =>
                    setAppointmentDetails({ ...appointmentDetails, urgency: e.target.value })
                  }
                >
                  <option value="Routine">Routine</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              {/* Reason for Appointment */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Reason:</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  value={appointmentDetails.reason}
                  onChange={(e) =>
                    setAppointmentDetails({ ...appointmentDetails, reason: e.target.value })
                  }
                  placeholder="Describe your reason for the appointment..."
                />
              </div>

              {/* Book Appointment Button */}
              <button
                onClick={handleBookAppointment}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDoctors;