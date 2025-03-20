import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoginBackground from "../../images/Home/loginBG.jpg";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api";

const PatientRegister = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.age = Number(data.age); // Ensure age is sent as a Number
      console.log("Patient register data:", data);
      const response = await axios.post(`${API_URL}/patient/register`, data);
      toast.success(response.data.message);
      reset();
      navigate("/patient-login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-90 rounded-3xl shadow-2xl w-full max-w-2xl p-8 sm:p-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Welcome to Easy Booking
          </h1>
          <p className="text-lg text-gray-500">
            Join us to schedule your next visit
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full-width Name Field */}
          <div className="space-y-1">
            <label className="text-base font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Two-column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-base font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-base font-medium text-gray-700">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-base font-medium text-gray-700">
                Phone Number
              </label>
              <input
                {...register("phone")}
                type="text"
                placeholder="+91 9876543210"
                className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-base font-medium text-gray-700">
                Address
              </label>
              <input
                {...register("address")}
                type="text"
                placeholder="123 Main St"
                className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-base font-medium text-gray-700">
                Gender
              </label>
              <select
                {...register("gender")}
                className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-base font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                {...register("dob")}
                type="date"
                className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-base font-medium text-gray-700">
                Age
              </label>
              <input
                {...register("age")}
                type="number"
                placeholder="25"
                className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                required
                min="0"
              />
            </div>
            <div className="space-y-1">
              <label className="text-base font-medium text-gray-700">
                Blood Group
              </label>
              <select
                {...register("bloodGroup")}
                className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                  />
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-base">
          Already have an account?{" "}
          <Link
            to="/patient-login"
            className="text-blue-500 font-medium hover:underline text-base"
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default PatientRegister;