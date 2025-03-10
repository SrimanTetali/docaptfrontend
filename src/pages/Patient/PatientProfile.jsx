import React, { useEffect, useState } from "react";
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dagj68nid/image/upload";
const UPLOAD_PRESET = "projectimages"; // Replace with your Cloudinary upload preset

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/patient/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPatient(response.data);
        setFormData(response.data); // Set initial form data
      } catch (err) {
        setError("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setFormData((prev) => ({ ...prev, profilePhoto: data.secure_url })); // Store image URL in formData
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/patient/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPatient(formData);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Patient Profile</h2>

        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={formData.profilePhoto || "https://res.cloudinary.com/dagj68nid/image/upload/v1740113082/profile_rbgnjk.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md hover:border-blue-200 transition-all duration-300"
          />

          {isEditing && (
            <div className="mt-4">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
                Upload Photo
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg text-gray-800 bg-gray-100 p-3 rounded-lg">{patient.name}</p>
            )}
          </div>

          {/* Email (Read-Only) */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Email:</label>
            <p className="text-lg text-gray-800 bg-gray-100 p-3 rounded-lg">{patient.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg text-gray-800 bg-gray-100 p-3 rounded-lg">{patient.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Address:</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg text-gray-800 bg-gray-100 p-3 rounded-lg">{patient.address}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Gender:</label>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-lg text-gray-800 bg-gray-100 p-3 rounded-lg">{patient.gender}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Date of Birth:</label>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg text-gray-800 bg-gray-100 p-3 rounded-lg">{patient.dob}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;