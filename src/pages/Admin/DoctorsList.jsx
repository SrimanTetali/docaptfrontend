import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [noBookings, setNoBookings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filterDoctors = useCallback((specialization) => {
    setSelectedSpecialization(specialization);
    const filtered = doctors.filter(doctor =>
      (specialization === "All Specializations" || doctor.specialization === specialization) &&
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [doctors, searchQuery]);

  useEffect(() => {
    filterDoctors(selectedSpecialization);
  }, [searchQuery, selectedSpecialization, filterDoctors]);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get('http://localhost:5000/api/admin/doctors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
      setFilteredDoctors(response.data);
      const uniqueSpecializations = ["All Specializations", ...new Set(response.data.map(doctor => doctor.specialization))];
      setSpecializations(uniqueSpecializations);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleViewDetails = async (doctorId) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(`http://localhost:5000/api/admin/doctor-bookings/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const today = new Date();
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 1);

      const filteredBookings = response.data.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === today.toDateString() || bookingDate.toDateString() === nextDay.toDateString();
      });

      setBookings(filteredBookings);
      setNoBookings(filteredBookings.length === 0);
      setSelectedDoctor(doctors.find(doctor => doctor._id === doctorId));
      setModalIsOpen(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setBookings([]);
        setNoBookings(true);
        setSelectedDoctor(doctors.find(doctor => doctor._id === doctorId));
        setModalIsOpen(true);
      } else {
        console.error('Error fetching bookings:', error);
      }
    }
  };

  const handleDeleteDoctor = (doctorId) => {
    setConfirmDelete(doctorId); // Open confirmation modal
  };

  const confirmDeleteDoctor = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      await axios.delete(`http://localhost:5000/api/admin/delete-doctor/${confirmDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(doctors.filter(doctor => doctor._id !== confirmDelete));
      setFilteredDoctors(filteredDoctors.filter(doctor => doctor._id !== confirmDelete));
      setConfirmDelete(null); // Close confirmation modal
      toast.success("Deleted doctor successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { background: "#10B981" }, // Green progress bar
        style: { background: "#D1FAE5", color: "#065F46" }, // Light green background, dark green text
      });
    } catch (error) {
      console.error('Error deleting doctor:', error);
      setConfirmDelete(null); // Close confirmation modal even on error
      toast.error("Failed to delete the doctor!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { background: "#EF4444" }, // Red progress bar
        style: { background: "#FEE2E2", color: "#991B1B" }, // Light red background, dark red text
      });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDoctor(null);
    setBookings([]);
    setNoBookings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 p-8">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Doctors Directory
      </h1>

      {/* Search Prompt */}
      <p className="text-center text-gray-600 mb-6 text-lg">Search for doctors by name or filter by specialization</p>

      {/* Search Bar */}
      <div className="w-full max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for a doctor by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-300"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/4">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Specializations</h3>
            <ul className="space-y-2">
              {specializations.map((specialization, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedSpecialization === specialization
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-600'
                  }`}
                  onClick={() => filterDoctors(specialization)}
                >
                  {specialization}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Doctors Grid */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={doctor.profilePhoto || 'https://via.placeholder.com/128'}
                alt={doctor.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-100"
              />
              <div className="text-center flex-grow">
                <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                <p className="text-indigo-600 text-sm mt-1">{doctor.specialization}</p>
                <p className="text-gray-600 text-sm mt-2">{doctor.hospitalName}</p>
                <p className="text-gray-500 text-xs mt-1 italic">{doctor.hospitalAddress}</p>
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={() => handleViewDetails(doctor._id)}
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteDoctor(doctor._id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Details Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto transform scale-100 animate-fadeIn"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center"
      >
        {selectedDoctor && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {selectedDoctor.name}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><span className="font-semibold text-indigo-600">Email:</span> {selectedDoctor.email}</p>
              <p><span className="font-semibold text-indigo-600">Phone:</span> {selectedDoctor.phone}</p>
              <p><span className="font-semibold text-indigo-600">Specialization:</span> {selectedDoctor.specialization}</p>
              <p><span className="font-semibold text-indigo-600">Hospital:</span> {selectedDoctor.hospitalName}</p>
              <p><span className="font-semibold text-indigo-600">Address:</span> {selectedDoctor.hospitalAddress}</p>
              <p><span className="font-semibold text-indigo-600">About:</span> {selectedDoctor.about || 'N/A'}</p>
              <p><span className="font-semibold text-indigo-600">Experience:</span> {selectedDoctor.experience} years</p>
              <p><span className="font-semibold text-indigo-600">Education:</span> {selectedDoctor.education}</p>
              <p><span className="font-semibold text-indigo-600">Time Slots:</span> {selectedDoctor.timeSlots?.join(', ') || 'N/A'}</p>
              <p><span className="font-semibold text-indigo-600">Consulting Fee:</span> ${selectedDoctor.consultingFee || 'N/A'}</p>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Today & Tomorrow’s Bookings</h3>
            {noBookings ? (
              <p className="text-gray-600 italic">No bookings scheduled for today or tomorrow.</p>
            ) : (
              <ul className="space-y-4">
                {bookings.map(booking => (
                  <li key={booking._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p><span className="font-semibold text-indigo-600">Patient:</span> {booking.patientId?.name || 'Unknown'}</p>
                    <p><span className="font-semibold text-indigo-600">Time:</span> {booking.timeSlot}</p>
                    <p><span className="font-semibold text-indigo-600">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                    <p><span className="font-semibold text-indigo-600">Status:</span> {booking.status}</p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white p-3 rounded-xl font-semibold shadow-md hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
            >
              Close
            </button>
          </>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <p className="text-xl font-semibold text-gray-800 mb-6">Are you sure you want to delete this doctor?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDeleteDoctor}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2 rounded-full font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default DoctorsList;