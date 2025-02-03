// import React, { useState } from "react";
// import Doctor from '../../images/doctors/Doc1Rechard.jpg';

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "Dr. Richard James",
//     education: "MBBS",
//     specialization: "General Physician",
//     experience: "4",
//     email: "richard.james@example.com",
//     phone: "123-456-7890",
//     hospital: "XYZ Hospital",
//     consultationHours: "9 AM - 5 PM",
//     about: "Dr. Richard James is committed to providing comprehensive medical care with a focus on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fee: "$50",
//     address: ["24 Main Street", "10 Clause Road"],
//     availability: true,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleCheckboxChange = () => {
//     setProfile({ ...profile, availability: !profile.availability });
//   };

//   const handleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
//       <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
//         <div className="flex flex-col items-center">
//           <img
//             src={Doctor}
//             alt={profile.name}
//             className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-sm"
//           />
//           {isEditing ? (
//             <input
//               type="text"
//               name="name"
//               value={profile.name}
//               onChange={handleChange}
//               className="mt-4 text-2xl font-bold text-gray-800 border-b border-gray-300 text-center"
//             />
//           ) : (
//             <h1 className="mt-4 text-2xl font-bold text-gray-800">{profile.name}</h1>
//           )}
//           {isEditing ? (
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 name="education"
//                 value={profile.education}
//                 onChange={handleChange}
//                 className="text-gray-500 text-lg border-b border-gray-300"
//               />
//               <input
//                 type="text"
//                 name="specialization"
//                 value={profile.specialization}
//                 onChange={handleChange}
//                 className="text-gray-500 text-lg border-b border-gray-300"
//               />
//             </div>
//           ) : (
//             <p className="text-gray-500 text-lg">{profile.education} - {profile.specialization}</p>
//           )}
//           <p className="text-gray-500 text-lg">
//             Experience: {isEditing ? (
//               <input
//                 type="text"
//                 name="experience"
//                 value={profile.experience}
//                 onChange={handleChange}
//                 className="border-b border-gray-300 w-12 text-center"
//               />
//             ) : (
//               profile.experience
//             )} Years
//           </p>
//         </div>

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
//           <p className="text-gray-600 mt-2">
//             <span className="font-semibold">Email:</span> {isEditing ? (
//               <input type="text" name="email" value={profile.email} onChange={handleChange} className="border-b border-gray-300" />
//             ) : (
//               profile.email
//             )}
//           </p>
//           <p className="text-gray-600 mt-2">
//             <span className="font-semibold">Phone:</span> {isEditing ? (
//               <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="border-b border-gray-300" />
//             ) : (
//               profile.phone
//             )}
//           </p>
//         </div>

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold text-gray-800">Hospital Details</h2>
//           <p className="text-gray-600 mt-2">
//             <span className="font-semibold">Hospital Name:</span> {profile.hospital}
//           </p>
//           <p className="text-gray-600 mt-2">
//             <span className="font-semibold">Consultation Hours:</span> {isEditing ? (
//               <input type="text" name="consultationHours" value={profile.consultationHours} onChange={handleChange} className="border-b border-gray-300" />
//             ) : (
//               profile.consultationHours
//             )}
//           </p>
//         </div>

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold text-gray-800">About</h2>
//           {isEditing ? (
//             <textarea
//               name="about"
//               value={profile.about}
//               onChange={handleChange}
//               className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
//             />
//           ) : (
//             <p className="text-gray-600 mt-2">{profile.about}</p>
//           )}
//         </div>

//         <div className="mt-6 flex items-center space-x-2">
//           <input
//             type="checkbox"
//             id="availability"
//             className="w-5 h-5 text-blue-500"
//             checked={profile.availability}
//             onChange={handleCheckboxChange}
//           />
//           <label htmlFor="availability" className="text-gray-600">Available for Appointments</label>
//         </div>

//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={handleEdit}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
//           >
//             {isEditing ? "Save" : "Edit Profile"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


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
