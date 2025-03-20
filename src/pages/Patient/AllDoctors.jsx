import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BriefcaseMedical, User, X } from "lucide-react";

const AllDoctors = ({ user }) => {
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
  const [bookedSlots, setBookedSlots] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient/doctors", {
          headers: { Authorization: `Bearer ${localStorage.getItem("patient_token")}` },
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const specialty = params.get("specialty");
    if (specialty) filterDoctors(specialty);
  }, [location.search, doctors]);

  useEffect(() => {
    if (selectedDoctor && appointmentDetails.date) fetchBookedSlots();
  }, [selectedDoctor, appointmentDetails.date]);

  const fetchBookedSlots = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/patient/doctors/${selectedDoctor._id}/bookings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("patient_token")}` },
      });
      const bookedSlotsOnDate = response.data
        .filter((booking) => new Date(booking.date).toISOString().split('T')[0] === appointmentDetails.date)
        .map((booking) => booking.timeSlot);
      setBookedSlots(bookedSlotsOnDate);
    } catch (error) {
      console.error("Error fetching booked slots", error);
    }
  };

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
          Authorization: `Bearer ${localStorage.getItem("patient_token")}`,
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
    <div className="min-h-screen bg-gray-700 p-6 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-amber-300 mb-6 text-center">Specialties</h2>
        <ul className="space-y-2">
          {specialties.map((specialty, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedSpecialty === specialty
                  ? "bg-cyan-400 text-gray-900 font-semibold"
                  : "text-gray-200 hover:bg-gray-600 hover:text-cyan-300"
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
          <p className="text-center text-cyan-400 animate-pulse">Loading doctors...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-400">No doctors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-gray-800 p-4 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border border-gray-600"
                onClick={() => setSelectedDoctor(doctor)}
              >
                <div className="relative w-full aspect-[11/12] mb-4 overflow-hidden rounded-lg">
                  <img
                    src={doctor.profilePhoto || "https://via.placeholder.com/300x375?text=No+Image"}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/300x375?text=No+Image")}
                  />
                </div>
                <h3 className="text-xl font-semibold text-cyan-400">{doctor.name}</h3>
                <p className="flex items-center text-gray-200 text-sm">
                  <BriefcaseMedical className="w-4 h-4 mr-2 text-amber-300" />
                  {doctor.specialization}
                </p>
                <p className="flex items-center text-gray-300 text-sm">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  {doctor.experience} years
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-600">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-400 transition-colors duration-200"
            >
              <X FontFace={24} />
            </button>

            {/* Doctor Profile Details */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Doctor Image */}
              <div className="w-full md:w-1/3">
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg shadow-md border border-gray-600">
                  <img
                    src={selectedDoctor.profilePhoto || "https://via.placeholder.com/300x375?text=No+Image"}
                    alt={selectedDoctor.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/300x375?text=No+Image")}
                  />
                </div>
              </div>

              {/* Doctor Information */}
              <div className="w-full md:w-2/3 text-gray-200">
                <h2 className="text-3xl font-semibold text-cyan-400 mb-2">{selectedDoctor.name}</h2>
                <p className="text-lg text-amber-300 font-medium mb-2">{selectedDoctor.specialization}</p>
                <p className="text-gray-300 mb-2">Education: {selectedDoctor.education}</p>
                <p className="text-gray-300 mb-2">Experience: {selectedDoctor.experience} years</p>
                <p className="text-gray-300 mb-2">Hospital: {selectedDoctor.hospitalName}</p>
                <p className="text-gray-300 mb-4">Address: {selectedDoctor.hospitalAddress}</p>
                <p className="text-gray-200 mb-4">{selectedDoctor.about}</p>
                <p className="text-xl font-medium text-green-400">
                  Fee: ₹{selectedDoctor.consultingFee}
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-600" />

            {/* Book Appointment Form */}
            <div className="text-gray-200">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Book Appointment</h3>

              {/* Date Input */}
              <div className="mb-4">
                <label className="block text-gray-200 font-medium mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={appointmentDetails.date}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })}
                />
              </div>

              {/* Time Slot Selection */}
              <div className="mb-4">
                <label className="block text-gray-200 font-medium mb-2">Time Slot</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {selectedDoctor.timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                        bookedSlots.includes(slot)
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : selectedTimeSlot === slot
                          ? "bg-cyan-400 text-gray-900"
                          : "bg-gray-600 text-gray-200 hover:bg-gray-500 hover:text-cyan-300"
                      }`}
                      disabled={bookedSlots.includes(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency Selection */}
              <div className="mb-4">
                <label className="block text-gray-200 font-medium mb-2">Urgency</label>
                <select
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={appointmentDetails.urgency}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, urgency: e.target.value })}
                >
                  <option value="Routine">Routine</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              {/* Reason for Appointment */}
              <div className="mb-6">
                <label className="block text-gray-200 font-medium mb-2">Reason</label>
                <textarea
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  rows="3"
                  value={appointmentDetails.reason}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, reason: e.target.value })}
                  placeholder="What’s the purpose of your visit?"
                />
              </div>

              {/* Book Appointment Button */}
              <button
                onClick={handleBookAppointment}
                className="w-full bg-amber-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-all duration-200"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDoctors;