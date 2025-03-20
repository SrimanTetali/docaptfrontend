import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: uploadFormData,
      });
      const data = await response.json();
      setFormData((prev) => ({ ...prev, profilePhoto: data.secure_url }));
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("doctor_token");
      const updatedFormData = {
        ...formData,
        timeSlots: Array.isArray(formData.timeSlots)
          ? formData.timeSlots
          : formData.timeSlots.split(",").map((slot) => slot.trim()),
      };

      await axios.put("http://localhost:5000/api/doctor/profile", updatedFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDoctor(updatedFormData);
      setIsEditing(false);
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile details", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl font-medium text-gray-500 animate-pulse">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );

  return (
    <div className="w-full p-4 bg-gray-50">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-6">
            <img
              src={formData.profilePhoto || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold text-indigo-700">{formData.name}</h2>
              <p className="text-xl text-gray-600 mt-1">{formData.specialization}</p>
            </div>
          </div>
          <div>
            {isEditing ? (
              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-md text-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800">{doctor.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                  <p className="text-lg text-gray-800 bg-gray-100 p-3 rounded-md">{doctor.email}</p>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800">{doctor.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Gender</label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-lg text-gray-800">{doctor.gender}</p>
                  )}
                </div>
                {isEditing && (
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Profile Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-base text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-base file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    />
                    {uploading && <p className="text-base text-gray-500 mt-2 animate-pulse">Uploading...</p>}
                  </div>
                )}
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">About Me</h3>
              {isEditing ? (
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="6"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-lg text-gray-800 leading-relaxed">{doctor.about}</p>
              )}
            </div>
          </div>

          {/* Right Section - Professional Info */}
          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">Professional Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Specialization</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800">{doctor.specialization}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Education</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800">{doctor.education}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Experience (Years)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800">{doctor.experience} years</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Consulting Fee (₹)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="consultingFee"
                      value={formData.consultingFee}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800">₹{doctor.consultingFee}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">Practice Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Hospital Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter hospital name"
                    />
                  ) : (
                    <p className="text-lg text-gray-800">{doctor.hospitalName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Hospital Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="hospitalAddress"
                      value={formData.hospitalAddress}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter hospital address"
                    />
                  ) : (
                    <p className="text-lg text-gray-800">{doctor.hospitalAddress}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Time Slots</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="timeSlots"
                      value={formData.timeSlots}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., 9:00 AM, 10:00 AM"
                    />
                  ) : (
                    <p className="text-lg text-gray-800">{doctor.timeSlots?.join(", ")}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;