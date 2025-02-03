
import React, { useState } from "react";
import doctorImage from "../../images/doctors/Doc1Rechard.jpg";

const DoctorBooking = () => {
  const today = new Date();
  
  // Generate the next 7 days dynamically
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(today.getDate() + index);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      date: date.getDate(),
    };
  });

  // Time slots (30 min intervals)
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Doctor Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <img src={doctorImage} alt="Doctor" className="w-80 h-80 rounded-xl object-cover mx-auto" />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
              Dr. Richard James <span className="text-blue-500 ml-2">✔</span>
            </h2>
            <p className="text-lg text-gray-600">MBBS - General Physician</p>
            <p className="text-gray-700 font-medium mt-2">
              <span className="font-semibold">About:</span> Dr. James is committed to providing
              top-quality medical care, focusing on preventive medicine, early diagnosis, and
              effective treatment strategies.
            </p>
            <p className="text-gray-800 font-semibold mt-4">Appointment Fee: <span className="text-green-600">$50</span></p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Booking Slots</h3>

          {/* Date Selection */}
          <div className="flex justify-center gap-4 overflow-x-auto pb-2">
            {dates.map((d, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(d)}
                className={`px-4 py-2 rounded-lg border transition ${
                  selectedDate.date === d.date
                    ? "bg-blue-500 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {d.day} {d.date}
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded-lg border transition ${
                  selectedTime === time
                    ? "bg-green-500 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Book Appointment Button */}
        <div className="mt-6 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorBooking;
