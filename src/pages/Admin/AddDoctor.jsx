import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import Modal from "react-modal";
import { Tooltip } from "react-tooltip";

const API_URL = "http://localhost:5000/api";

// Set the app element for react-modal
Modal.setAppElement("#root");

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    specialization: "",
    education: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!formData.education.trim()) newErrors.education = "Education is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Admin token not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/admin/register-doctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Doctor registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          gender: "",
          specialization: "",
          education: "",
          experience: "",
        });
        setIsModalOpen(true);
      } else {
        toast.error(data.message || "Doctor registration failed!");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmation = () => {
    setIsModalOpen(false);
    navigate("/admin-dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Register Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" data-tip data-for="nameTooltip">
                Name
              </label>
              <Tooltip id="nameTooltip" place="top" effect="solid">
                Enter the doctor's full name
              </Tooltip>
              <input
                type="text"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" data-tip data-for="emailTooltip">
                Email
              </label>
              <Tooltip id="emailTooltip" place="top" effect="solid">
                Enter the doctor's email address
              </Tooltip>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" data-tip data-for="passwordTooltip">
                Password
              </label>
              <Tooltip id="passwordTooltip" place="top" effect="solid">
                Enter a secure password
              </Tooltip>
              <input
                type="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" data-tip data-for="phoneTooltip">
                Phone
              </label>
              <Tooltip id="phoneTooltip" place="top" effect="solid">
                Enter the doctor's phone number
              </Tooltip>
              <InputMask
                mask="9999999999"
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" data-tip data-for="genderTooltip">
                Gender
              </label>
              <Tooltip id="genderTooltip" place="top" effect="solid">
                Select the doctor's gender
              </Tooltip>
              <select
                name="gender"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" data-tip data-for="specializationTooltip">
                Specialization
              </label>
              <Tooltip id="specializationTooltip" place="top" effect="solid">
                Enter the doctor's specialization
              </Tooltip>
              <input
                type="text"
                name="specialization"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
              {errors.specialization && <span className="text-red-500 text-sm">{errors.specialization}</span>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" data-tip data-for="educationTooltip">
                Education
              </label>
              <Tooltip id="educationTooltip" place="top" effect="solid">
                Enter the doctor's educational qualifications
              </Tooltip>
              <input
                type="text"
                name="education"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter education"
                value={formData.education}
                onChange={handleChange}
                required
              />
              {errors.education && <span className="text-red-500 text-sm">{errors.education}</span>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" data-tip data-for="experienceTooltip">
                Experience (in years)
              </label>
              <Tooltip id="experienceTooltip" place="top" effect="solid">
                Enter the doctor's experience in years
              </Tooltip>
              <input
                type="number"
                name="experience"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
              {errors.experience && <span className="text-red-500 text-sm">{errors.experience}</span>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Register Doctor"
            )}
          </button>
        </form>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Registration Successful"
        className="modal bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto mt-20"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Registration Successful!</h2>
        <p className="text-gray-700 mb-6">The doctor has been registered successfully.</p>
        <button
          onClick={handleConfirmation}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go to Dashboard
        </button>
      </Modal>
    </div>
  );
};

export default AddDoctor;