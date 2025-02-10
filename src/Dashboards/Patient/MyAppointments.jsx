
import React from "react";
import doctorImage from '../../images/doctors/Doc1Rechard.jpg';

const MyAppointments = () => {
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Richard James",
      specialty: "General Physician",
      address: "24 Main Street, 10 Clause Road",
      dateTime: "8 Feb 2025 | 12:00 PM",
      image: doctorImage,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Appointments</h2>
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md border mb-4"
          >
            <div className="flex items-center space-x-6">
              <img
                src={appointment.image}
                alt={appointment.doctorName}
                className="w-24 h-24 rounded-full border border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {appointment.doctorName}
                </h3>
                <p className="text-gray-600">{appointment.specialty}</p>
                <p className="text-gray-700 font-medium">Address:</p>
                <p className="text-gray-600">{appointment.address}</p>
                <p className="text-gray-700 font-medium mt-2">Date & Time:</p>
                <p className="text-gray-600">{appointment.dateTime}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                Pay Online
              </button>
              <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
