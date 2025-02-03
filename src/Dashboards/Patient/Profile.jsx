
import React, { useState } from "react";
import PatientImage from '../../images/Admin/PatientIcon.png';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Patient1",
    age: "30",
    gender: "Male",
    email: "Patient1@gamil.com",
    phone: "987-654-3210",
    medicalHistory: "No major illnesses",
    allergies: "None",
    medications: "None",
    emergencyContact: "987-123-4567",
    address: "123 Greenway St, Springfield",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-16">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-12">
        <div className="flex items-center space-x-8">
          <img
            src={PatientImage}
            alt={profile.name}
            className="w-52 h-52 rounded-full border-4 border-green-500 shadow-md"
          />
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="text-4xl font-bold text-gray-800 border-b border-gray-300 w-full"
              />
            ) : (
              <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
            )}
            <p className="text-gray-500 text-2xl mt-2">{profile.gender}, Age: {isEditing ? (
              <input
                type="text"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="border-b border-gray-300 w-16 text-center text-xl"
              />
            ) : (
              profile.age
            )}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 text-xl">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
            <p className="text-gray-600 mt-3">Email: {isEditing ? (
              <input type="text" name="email" value={profile.email} onChange={handleChange} className="border-b border-gray-300 w-full" />
            ) : (
              profile.email
            )}</p>
            <p className="text-gray-600 mt-3">Phone: {isEditing ? (
              <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="border-b border-gray-300 w-full" />
            ) : (
              profile.phone
            )}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Emergency Contact</h2>
            <p className="text-gray-600 mt-3">{isEditing ? (
              <input type="text" name="emergencyContact" value={profile.emergencyContact} onChange={handleChange} className="border-b border-gray-300 w-full" />
            ) : (
              profile.emergencyContact
            )}</p>
          </div>
        </div>

        <div className="mt-8 text-xl">
          <h2 className="text-2xl font-semibold text-gray-800">Medical Details</h2>
          <p className="text-gray-600 mt-3">Medical History: {isEditing ? (
            <textarea name="medicalHistory" value={profile.medicalHistory} onChange={handleChange} className="border-b border-gray-300 w-full" />
          ) : (
            profile.medicalHistory
          )}</p>
          <p className="text-gray-600 mt-3">Allergies: {isEditing ? (
            <input type="text" name="allergies" value={profile.allergies} onChange={handleChange} className="border-b border-gray-300 w-full" />
          ) : (
            profile.allergies
          )}</p>
          <p className="text-gray-600 mt-3">Current Medications: {isEditing ? (
            <input type="text" name="medications" value={profile.medications} onChange={handleChange} className="border-b border-gray-300 w-full" />
          ) : (
            profile.medications
          )}</p>
        </div>

        <div className="mt-8 text-xl">
          <h2 className="text-2xl font-semibold text-gray-800">Address</h2>
          <p className="text-gray-600 mt-3">{isEditing ? (
            <input type="text" name="address" value={profile.address} onChange={handleChange} className="border-b border-gray-300 w-full" />
          ) : (
            profile.address
          )}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-8 py-3 rounded-lg text-2xl font-semibold hover:bg-green-600 transition"
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
