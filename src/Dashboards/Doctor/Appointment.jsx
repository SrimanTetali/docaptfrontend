import React, { useState } from 'react';
import Doctor from '../../images/doctors/Doc1Rechard.jpg';

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    { id: 0, patient: 'Avinash Kr', payment: 'CASH', age: 31, dateTime: '5 Oct 2024, 12:00 PM', fees: '$50', status: '' },
    { id: 1, patient: 'GreetStack', payment: 'CASH', age: 24, dateTime: '26 Sep 2024, 11:00 AM', fees: '$40', status: '' },
    { id: 2, patient: 'GreetStack', payment: 'CASH', age: 24, dateTime: '25 Sep 2024, 02:00 PM', fees: '$40', status: '' },
    { id: 3, patient: 'GreetStack', payment: 'CASH', age: 24, dateTime: '23 Sep 2024, 11:00 AM', fees: '$40', status: '' },
  ]);

  const handleStatusChange = (id, status) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status } : appointment
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">All Appointments</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">Patient</th>
              <th className="py-3 px-4 border-b text-left">Payment</th>
              <th className="py-3 px-4 border-b text-left">Age</th>
              <th className="py-3 px-4 border-b text-left">Date & Time</th>
              <th className="py-3 px-4 border-b text-left">Fees</th>
              <th className="py-3 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{appointment.id}</td>
                <td className="py-3 px-4 border-b flex items-center">
                  <img src={Doctor} alt="Doctor" className="w-8 h-8 rounded-full mr-2" />
                  {appointment.patient}
                </td>
                <td className="py-3 px-4 border-b">{appointment.payment}</td>
                <td className="py-3 px-4 border-b">{appointment.age}</td>
                <td className="py-3 px-4 border-b">{appointment.dateTime}</td>
                <td className="py-3 px-4 border-b">{appointment.fees}</td>
                <td className="py-3 px-4 border-b">
                  {appointment.status ? (
                    <p className={`text-sm font-semibold ${appointment.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}`}>
                      {appointment.status}
                    </p>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                        className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 rounded-full hover:bg-red-200"
                      >
                        ❌
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'Completed')}
                        className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-500 rounded-full hover:bg-green-200"
                      >
                        ✔️
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;