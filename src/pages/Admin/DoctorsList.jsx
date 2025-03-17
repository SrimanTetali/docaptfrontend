import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

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

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get('http://localhost:5000/api/admin/doctors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(response.data);
      setFilteredDoctors(response.data);
      const uniqueSpecializations = ["All Specializations", ...new Set(response.data.map(doctor => doctor.specialization))];
      setSpecializations(uniqueSpecializations);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const filterDoctors = (specialization) => {
    setSelectedSpecialization(specialization);
    setFilteredDoctors(specialization === "All Specializations" ? doctors : doctors.filter(doctor => doctor.specialization === specialization));
  };

  const handleViewDetails = async (doctorId) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(`http://localhost:5000/api/admin/doctor-bookings/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
      setNoBookings(false);
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
    setConfirmDelete(doctorId);
  };

  const confirmDeleteDoctor = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      await axios.delete(`http://localhost:5000/api/admin/delete-doctor/${confirmDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(doctors.filter(doctor => doctor._id !== confirmDelete));
      setFilteredDoctors(filteredDoctors.filter(doctor => doctor._id !== confirmDelete));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDoctor(null);
    setBookings([]);
    setNoBookings(false);
  };

  return (
    <div className="flex p-8 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 pr-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Doctor Specializations</h3>
        <ul>
          {specializations.map((specialization, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 rounded-lg text-center md:text-left ${
                selectedSpecialization === specialization ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => filterDoctors(specialization)}
            >
              {specialization}
            </li>
          ))}
        </ul>
      </aside>

      {/* Doctors Grid */}
      <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <div
            key={doctor._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 h-96 flex flex-col"
          >
            <img
              src={doctor.profilePhoto}
              alt={doctor.name}
              className="w-32 h-32 rounded-full mx-auto mt-6 object-cover"
            />
            <div className="p-6 text-center flex-grow">
              <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{doctor.specialization}</p>
            </div>
            <div className="mt-auto mb-6 flex justify-center space-x-4">
              <button
                onClick={() => handleViewDetails(doctor._id)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                View Details
              </button>
              <button
                onClick={() => handleDeleteDoctor(doctor._id)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Details Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedDoctor && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mx-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedDoctor.name}</h2>
            <div className="space-y-4">
              <p className="text-gray-700"><span className="font-semibold">Email:</span> {selectedDoctor.email}</p>
              <p className="text-gray-700"><span className="font-semibold">Phone:</span> {selectedDoctor.phone}</p>
              <p className="text-gray-700"><span className="font-semibold">Specialization:</span> {selectedDoctor.specialization}</p>
              <p className="text-gray-700"><span className="font-semibold">About:</span> {selectedDoctor.about}</p>
              <p className="text-gray-700"><span className="font-semibold">Experience:</span> {selectedDoctor.experience}</p>
              <p className="text-gray-700"><span className="font-semibold">Education:</span> {selectedDoctor.education}</p>
              <p className="text-gray-700"><span className="font-semibold">Time Slots:</span> {selectedDoctor.timeSlots.join(', ')}</p>
              <p className="text-gray-700"><span className="font-semibold">Consulting Fee:</span> {selectedDoctor.consultingFee}</p>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-4">Bookings</h3>
            {noBookings ? (
              <p className="text-gray-600">No bookings available for this doctor.</p>
            ) : (
              <ul className="space-y-4">
                {bookings.map(booking => (
                  <li key={booking._id} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700"><span className="font-semibold">Patient Name:</span> {booking.patientId.name}</p>
                    <p className="text-gray-700"><span className="font-semibold">Time Slot:</span> {booking.timeSlot}</p>
                    <p className="text-gray-700"><span className="font-semibold">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                    <p className="text-gray-700"><span className="font-semibold">Status:</span> {booking.status}</p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-gray-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this doctor?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDeleteDoctor}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
