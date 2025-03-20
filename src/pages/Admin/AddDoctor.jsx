import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import InputMask from "react-input-mask";
import { Tooltip } from "react-tooltip";
import "react-toastify/dist/ReactToastify.css"; // Import the default styles

const API_URL = "http://localhost:5000/api/admin";

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
    hospitalName: "",
    hospitalAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (!formData.hospitalName.trim()) newErrors.hospitalName = "Hospital Name is required";
    if (!formData.hospitalAddress.trim()) newErrors.hospitalAddress = "Hospital Address is required";
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

    try {
      const response = await fetch(`${API_URL}/register-doctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Doctor registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressStyle: { background: "#10B981" }, // Green progress bar
          style: { background: "#D1FAE5", color: "#065F46" }, // Light green background, dark green text
        });
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          gender: "",
          specialization: "",
          education: "",
          experience: "",
          hospitalName: "",
          hospitalAddress: "",
        });
      } else {
        toast.error(data.message || "Something went wrong. Doctor registration failed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressStyle: { background: "#EF4444" }, // Red progress bar
          style: { background: "#FEE2E2", color: "#991B1B" }, // Light red background, dark red text
        });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Something went wrong. Doctor registration failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { background: "#EF4444" },
        style: { background: "#FEE2E2", color: "#991B1B" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-100 p-10">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-4xl transform hover:shadow-2xl transition-all duration-300">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Register New Doctor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Dr. John Doe", tooltip: "Enter the doctor's full name" },
              { label: "Email Address", name: "email", type: "email", placeholder: "doctor@example.com", tooltip: "Enter the doctor's email address" },
              { label: "Password", name: "password", type: "password", placeholder: "••••••••", tooltip: "Enter a secure password" },
              { label: "Phone Number", name: "phone", type: "tel", placeholder: "123-456-7890", tooltip: "Enter the doctor's phone number", mask: "9999999999" },
              { label: "Gender", name: "gender", type: "select", tooltip: "Select the doctor's gender" },
              { label: "Specialization", name: "specialization", type: "text", placeholder: "Cardiology", tooltip: "Enter the doctor's specialization" },
              { label: "Education", name: "education", type: "text", placeholder: "MBBS, MD", tooltip: "Enter the doctor's educational qualifications" },
              { label: "Experience (Years)", name: "experience", type: "number", placeholder: "10", tooltip: "Enter the doctor's experience in years" },
              { label: "Hospital Name", name: "hospitalName", type: "text", placeholder: "City Hospital", tooltip: "Enter the name of the hospital" },
              { label: "Hospital Address", name: "hospitalAddress", type: "text", placeholder: "123 Main St", tooltip: "Enter the address of the hospital" },
            ].map((field) => (
              <div key={field.name} className="relative">
                <label
                  className="block text-gray-800 font-medium mb-2 text-sm uppercase tracking-wide"
                  data-tip
                  data-for={`${field.name}Tooltip`}
                >
                  {field.label}
                </label>
                <Tooltip id={`${field.name}Tooltip`} place="top" effect="solid" className="bg-gray-800 text-white rounded-md p-2 text-sm">
                  {field.tooltip}
                </Tooltip>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    className="w-full p-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : field.mask ? (
                  <InputMask
                    mask={field.mask}
                    name={field.name}
                    className="w-full p-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    className="w-full p-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                )}
                {errors[field.name] && (
                  <span className="absolute -bottom-5 left-0 text-red-500 text-xs font-medium">{errors[field.name]}</span>
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 flex items-center justify-center transform hover:scale-105 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin w-6 h-6 border-4 border-t-transparent border-white rounded-full" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Register Doctor"
            )}
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddDoctor;