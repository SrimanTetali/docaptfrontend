import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const filterPatients = () => {
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  useEffect(() => {
    filterPatients();
  }, [searchQuery, patients]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patientsdata');
      setPatients(response.data);
      setFilteredPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchBookings = async (patientId) => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookingsdata');
      const patientBookings = response.data.filter(booking => booking.patientId === patientId);
      setBookings(patientBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleViewDetails = async (patientId) => {
    const patient = patients.find(p => p._id === patientId);
    setSelectedPatient(patient);
    await fetchBookings(patientId);
    setModalIsOpen(true);
  };

  const handleDeletePatient = (patientId) => {
    setConfirmDelete(patientId);
  };

  const confirmDeletePatient = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      await axios.delete(`http://localhost:5000/api/admin/delete-patient/${confirmDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(patients.filter(patient => patient._id !== confirmDelete));
      setFilteredPatients(filteredPatients.filter(patient => patient._id !== confirmDelete));
      setConfirmDelete(null);
      toast.success("Patient deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { background: "#10B981" },
        style: { background: "#D1FAE5", color: "#065F46" },
      });
    } catch (error) {
      console.error('Error deleting patient:', error);
      setConfirmDelete(null);
      toast.error("Failed to delete the patient!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { background: "#EF4444" },
        style: { background: "#FEE2E2", color: "#991B1B" },
      });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPatient(null);
    setBookings([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Patients Directory
      </h1>

      <p className="text-center text-gray-600 mb-6 text-lg">Search for patients by name</p>

      <div className="w-full max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for a patient by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map(patient => (
          <div
            key={patient._id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <img
              src={patient.profilePhoto || 'https://via.placeholder.com/128'}
              alt={patient.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-100"
            />
            <div className="text-center flex-grow">
              <h2 className="text-xl font-bold text-gray-800">{patient.name}</h2>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => handleViewDetails(patient._id)}
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-sm"
              >
                View Details
              </button>
              <button
                onClick={() => handleDeletePatient(patient._id)}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto transform scale-100 animate-fadeIn"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center"
      >
        {selectedPatient && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {selectedPatient.name}
            </h2>
            <div className="space-y-4 text-gray-700">
              <img
                src={selectedPatient.profilePhoto || 'https://via.placeholder.com/128'}
                alt={selectedPatient.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-100"
              />
              <p><span className="font-semibold text-indigo-600">Email:</span> {selectedPatient.email}</p>
              <p><span className="font-semibold text-indigo-600">Phone:</span> {selectedPatient.phone}</p>
              <p><span className="font-semibold text-indigo-600">Age:</span> {selectedPatient.age}</p>
              <p><span className="font-semibold text-indigo-600">DOB:</span> {new Date(selectedPatient.dob).toLocaleDateString()}</p>
              <p><span className="font-semibold text-indigo-600">Gender:</span> {selectedPatient.gender}</p>
              <p><span className="font-semibold text-indigo-600">Blood Group:</span> {selectedPatient.bloodGroup}</p>
              <p><span className="font-semibold text-indigo-600">Address:</span> {selectedPatient.address}</p>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Booking Details</h3>
            {bookings.length === 0 ? (
              <p className="text-gray-600 italic">No bookings found for this patient.</p>
            ) : (
              <ul className="space-y-4">
                {bookings.map(booking => (
                  <li key={booking._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p><span className="font-semibold text-indigo-600">Doctor ID:</span> {booking.doctorId}</p>
                    <p><span className="font-semibold text-indigo-600">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                    <p><span className="font-semibold text-indigo-600">Time:</span> {booking.timeSlot}</p>
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

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <p className="text-xl font-semibold text-gray-800 mb-6">Are you sure you want to delete this patient?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDeletePatient}
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

export default PatientsList;