import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
        const response = await axios.get("http://localhost:5000/api/patient/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("patient_token")}` },
        });
        setPatient(response.data);
        setFormData(response.data);
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
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:5000/api/patient/profile", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("patient_token")}` },
      });
      setPatient(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setError("Failed to update profile.");
      toast.error("Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center text-cyan-400 animate-pulse text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-400 text-lg">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-700 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg border border-gray-600 overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar: Profile Photo & Buttons */}
        <div className="w-full md:w-1/3 bg-gray-900 p-6 flex flex-col items-center justify-between">
          <div className="text-center">
            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-cyan-500 shadow-lg transition-all duration-300 hover:border-cyan-400">
              <img
                src={formData.profilePhoto || "https://res.cloudinary.com/dagj68nid/image/upload/v1740113082/profile_rbgnjk.png"}
                alt="Profile"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">{patient.name}</h3>
            {isEditing && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="inline-block bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-cyan-500 transition-all duration-200 cursor-pointer text-sm font-medium"
                >
                  {uploading ? "Uploading..." : "Update Photo"}
                </label>
              </>
            )}
          </div>
          <div className="mt-6 w-full">
            {isEditing ? (
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleSave}
                  className="w-full bg-amber-300 text-gray-900 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-all duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full bg-gray-600 text-gray-200 py-2 rounded-lg hover:bg-gray-500 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-cyan-400 text-gray-900 py-2 rounded-lg font-semibold hover:bg-cyan-500 transition-all duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Main Content: Profile Details */}
        <div className="w-full md:w-2/3 p-6">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Profile Details</h2>

          {/* Personal Info */}
          <div className="space-y-4 mb-6">
            <h4 className="text-amber-300 text-lg font-medium">Personal Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-200 bg-gray-700 p-2 rounded-lg">{patient.name}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Gender</label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-200 bg-gray-700 p-2 rounded-lg">{patient.gender}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-200 bg-gray-700 p-2 rounded-lg">
                    {new Date(patient.dob).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-200 bg-gray-700 p-2 rounded-lg">{patient.age}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 mb-6">
            <h4 className="text-amber-300 text-lg font-medium">Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Email</label>
                <p className="text-gray-200 bg-gray-700 p-2 rounded-lg">{patient.email}</p>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-200 bg-gray-700 p-2 rounded-lg">{patient.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Medical & Address */}
          <div className="space-y-4">
            <h4 className="text-amber-300 text-lg font-medium">Additional Details</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Blood Group</label>
                {isEditing ? (
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                ) : (
                  <p className="text-gray-200 bg-gray-700 p-2 rounded-lg">{patient.bloodGroup}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-200 bg-gray-700 p-2 rounded-lg">{patient.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;