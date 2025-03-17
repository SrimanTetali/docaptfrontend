import React, { useEffect, useState } from "react";
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dagj68nid/image/upload";
const UPLOAD_PRESET = "projectimages"; // Replace with your Cloudinary upload preset

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const token = localStorage.getItem("doctor_token");
        const response = await axios.get("http://localhost:5000/api/doctor/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(response.data);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorData();
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
      console.log("image url : ", data.secure_url);
      setFormData((prev) => ({ ...prev, profilePhoto: data.secure_url })); // Store image URL in formData
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("doctor_token");
      console.log("Token is : ", token);

      // Ensure timeSlots is properly formatted as an array
      const updatedFormData = {
        ...formData,
        timeSlots: Array.isArray(formData.timeSlots)
          ? formData.timeSlots // If it's already an array, use it as is
          : formData.timeSlots
              .split(",") // If it's a string, split it by commas
              .map((slot) => slot.trim()), // Trim any extra spaces around each time slot
      };

      console.log("updatedFormData = ", updatedFormData);

      // Send the updated data to the backend
      await axios.put("http://localhost:5000/api/doctor/profile", updatedFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the doctor state and exit edit mode
      setDoctor(updatedFormData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Doctor Profile</h2>

      {/* Profile Photo */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={formData.profilePhoto }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
        />
        {isEditing && (
          <div className="mt-2">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded" />
            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{doctor.name}</p>
            )}
          </div>

          {/* Email (Read-Only) */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">Email:</label>
            <p className="text-lg text-gray-800 bg-gray-100 p-2 rounded-lg">{doctor.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{doctor.phone}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">Gender:</label>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-lg text-gray-800">{doctor.gender}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Specialization */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">Specialization:</label>
            {isEditing ? (
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{doctor.specialization}</p>
            )}
          </div>

          {/* Education */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">Education:</label>
            {isEditing ? (
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{doctor.education}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">Experience (Years):</label>
            {isEditing ? (
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{doctor.experience} years</p>
            )}
          </div>

          {/* Consulting Fee */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">Consulting Fee (₹):</label>
            {isEditing ? (
              <input
                type="number"
                name="consultingFee"
                value={formData.consultingFee}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-800">₹{doctor.consultingFee}</p>
            )}
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div className="mt-6">
        <label className="block text-gray-600 font-semibold mb-1">Time Slots:</label>
        {isEditing ? (
          <input
            type="text"
            name="timeSlots"
            value={formData.timeSlots}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 9:00 AM, 10:00 AM"
          />
        ) : (
          <p className="text-lg text-gray-800">{doctor.timeSlots?.join(", ")}</p>
        )}
      </div>

      {/* About */}
      <div className="mt-6">
        <label className="block text-gray-600 font-semibold mb-1">About:</label>
        {isEditing ? (
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write something about yourself..."
          />
        ) : (
          <p className="text-lg text-gray-800">{doctor.about}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;