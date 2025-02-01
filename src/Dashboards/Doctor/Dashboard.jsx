import React, { useState } from 'react';
import Earnings from '../../images/Admin/Earnings.png';
import AppointmentIcon from '../../images/Admin/Appointment.png';
import PatientIcon from '../../images/Admin/PatientIcon.png';
import Doctor from '../../images/doctors/Doc1Rechard.jpg';

const Dashboard = () => {
  const [bookings, setBookings] = useState([
    { id: 1, name: 'Avinash Kr', date: '5 Oct 2024', status: '' },
    { id: 2, name: 'GreciStack', date: '26 Sep 2024', status: '' },
    { id: 3, name: 'GreciStack', date: '25 Sep 2024', status: '' },
    { id: 4, name: 'GreciStack', date: '23 Sep 2024', status: '' },
  ]);

  const handleStatusChange = (id, status) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white flex items-center p-5 rounded-lg shadow-md">
          <img src={Earnings} alt="Earnings" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-3xl font-bold">$80</p>
            <p className="text-gray-600">Earnings</p>
          </div>
        </div>
        <div className="bg-white flex items-center p-5 rounded-lg shadow-md">
          <img src={AppointmentIcon} alt="Appointments" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-3xl font-bold">4</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>
        <div className="bg-white flex items-center p-5 rounded-lg shadow-md">
          <img src={PatientIcon} alt="Patients" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-3xl font-bold">2</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="mr-2">📋</span> Latest Bookings
        </h3>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center">
                <img src={Doctor} alt="Doctor" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-semibold">{booking.name}</p>
                  {booking.date && <p className="text-gray-500 text-sm">Booking on {booking.date}</p>}
                </div>
              </div>
              {booking.status ? (
                <p className={`text-sm font-semibold ${booking.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}`}>
                  {booking.status}
                </p>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(booking.id, 'Cancelled')}
                    className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 rounded-full hover:bg-red-200"
                  >
                    ❌
                  </button>
                  <button
                    onClick={() => handleStatusChange(booking.id, 'Completed')}
                    className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-500 rounded-full hover:bg-green-200"
                  >
                    ✔️
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;