import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboardHome = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [activeBookingStatus, setActiveBookingStatus] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [patientsRes, doctorsRes, bookingsRes, contactsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/patientsdata'),
        axios.get('http://localhost:5000/api/doctorsdata'),
        axios.get('http://localhost:5000/api/bookingsdata'),
        axios.get('http://localhost:5000/api/contact'),
      ]);
      setPatients(patientsRes.data);
      setDoctors(doctorsRes.data);
      setBookings(bookingsRes.data);
      // Reverse the order of contacts and take the latest 5
      setNotifications(contactsRes.data.slice(-5).reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const currentDate = new Date('2025-03-19');
  const futureBookings = bookings.filter(booking => 
    new Date(booking.date) >= currentDate
  );

  const renderPatientsTable = () => (
    <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow-lg p-6">
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <tr>
            {['Name', 'Phone', 'Age', 'Blood Group', 'Total Bookings', 'Accepted', 'Pending', 'Completed', 'Cancelled', 'Rejected'].map(header => (
              <th key={header} className="py-3 px-4 text-left font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => {
            const patientBookings = bookings.filter(b => b.patientId === patient._id);
            return (
              <tr key={patient._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                <td className="py-3 px-4">{patient.name}</td>
                <td className="py-3 px-4">{patient.phone}</td>
                <td className="py-3 px-4">{patient.age}</td>
                <td className="py-3 px-4">{patient.bloodGroup}</td>
                <td className="py-3 px-4">{patientBookings.length}</td>
                <td className="py-3 px-4">{patientBookings.filter(b => b.status === 'Accepted').length}</td>
                <td className="py-3 px-4">{patientBookings.filter(b => b.status === 'Pending').length}</td>
                <td className="py-3 px-4">{patientBookings.filter(b => b.status === 'Completed').length}</td>
                <td className="py-3 px-4">{patientBookings.filter(b => b.status === 'Cancelled').length}</td>
                <td className="py-3 px-4">{patientBookings.filter(b => b.status === 'Rejected').length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDoctorsTable = () => (
    <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow-lg p-6">
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
          <tr>
            {['Name', 'Specialization', 'Hospital', 'Total Bookings', 'Accepted', 'Pending', 'Rejected', 'Cancelled'].map(header => (
              <th key={header} className="py-3 px-4 text-left font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => {
            const doctorBookings = futureBookings.filter(b => b.doctorId === doctor._id);
            return (
              <tr key={doctor._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-green-50 transition-colors`}>
                <td className="py-3 px-4">{doctor.name}</td>
                <td className="py-3 px-4">{doctor.specialization}</td>
                <td className="py-3 px-4">{doctor.hospitalName}</td>
                <td className="py-3 px-4">{doctorBookings.length}</td>
                <td className="py-3 px-4">{doctorBookings.filter(b => b.status === 'Accepted').length}</td>
                <td className="py-3 px-4">{doctorBookings.filter(b => b.status === 'Pending').length}</td>
                <td className="py-3 px-4">{doctorBookings.filter(b => b.status === 'Rejected').length}</td>
                <td className="py-3 px-4">{doctorBookings.filter(b => b.status === 'Cancelled').length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAppointmentsTable = () => {
    const filteredBookings = futureBookings.filter(b => b.status === activeBookingStatus);
    return (
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap gap-3 mb-6">
          {['Accepted', 'Pending', 'Rejected', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setActiveBookingStatus(status)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                activeBookingStatus === status 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'
              }`}
            >
              {status} ({futureBookings.filter(b => b.status === status).length})
            </button>
          ))}
        </div>
        {activeBookingStatus && (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                <tr>
                  {['Patient Name', 'Booking Date', 'Time Slot', 'Doctor Name', 'Specialization', 'Urgency', activeBookingStatus === 'Cancelled' ? 'Cancellation Reason' : 'Reason'].map(header => (
                    <th key={header} className="py-3 px-4 text-left font-semibold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => {
                  const patient = patients.find(p => p._id === booking.patientId);
                  const doctor = doctors.find(d => d._id === booking.doctorId);
                  return (
                    <tr key={booking._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition-colors`}>
                      <td className="py-3 px-4">{patient?.name}</td>
                      <td className="py-3 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{booking.timeSlot}</td>
                      <td className="py-3 px-4">{doctor?.name}</td>
                      <td className="py-3 px-4">{doctor?.specialization}</td>
                      <td className="py-3 px-4">{booking.urgency}</td>
                      <td className="py-3 px-4">{activeBookingStatus === 'Cancelled' ? booking.cancellationReason : booking.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          onClick={() => setActiveSection(activeSection === 'patients' ? null : 'patients')}
          className="bg-white p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
        >
          <h2 className="text-lg font-semibold">Total Patients</h2>
          <p className="text-4xl font-bold mt-2">{patients.length}</p>
        </div>
        <div
          onClick={() => setActiveSection(activeSection === 'doctors' ? null : 'doctors')}
          className="bg-white p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-green-500 to-teal-600 text-white"
        >
          <h2 className="text-lg font-semibold">Total Doctors</h2>
          <p className="text-4xl font-bold mt-2">{doctors.length}</p>
        </div>
        <div
          onClick={() => setActiveSection(activeSection === 'appointments' ? null : 'appointments')}
          className="bg-white p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-purple-500 to-pink-600 text-white"
        >
          <h2 className="text-lg font-semibold">Total Appointments</h2>
          <p className="text-4xl font-bold mt-2">{futureBookings.length}</p>
        </div>
      </div>

      {/* Dynamic Section (Tables) */}
      {activeSection === 'patients' && renderPatientsTable()}
      {activeSection === 'doctors' && renderDoctorsTable()}
      {activeSection === 'appointments' && renderAppointmentsTable()}

      {/* Notifications */}
      <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Notifications</h2>
        <ul className="space-y-4">
          {notifications.map(notification => (
            <li key={notification._id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-sm"><strong className="text-indigo-600">Name:</strong> {notification.firstname} {notification.lastname}</p>
              <p className="text-sm"><strong className="text-indigo-600">Email:</strong> {notification.email}</p>
              <p className="text-sm"><strong className="text-indigo-600">Phone:</strong> {notification.phonenumber}</p>
              <p className="text-sm"><strong className="text-indigo-600">Message:</strong> {notification.problem}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardHome;