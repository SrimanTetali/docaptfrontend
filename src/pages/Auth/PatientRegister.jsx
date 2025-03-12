import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoginBackground from "../../images/Home/loginBG.jpg";

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
      navigate("/patient-login"); // Redirect to login page
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Patient Register
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please register to access the dashboard.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full-width Name Field */}
          <input
            {...register("name")}
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            required
          />

          {/* Two-column Layout */}
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />

            <input
              {...register("phone")}
              type="text"
              placeholder="Phone"
              className="w-full p-2 border rounded"
              required
            />
            <input
              {...register("address")}
              type="text"
              placeholder="Address"
              className="w-full p-2 border rounded"
              required
            />

            <select
              {...register("gender")}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              {...register("dob")}
              type="date"
              className="w-full p-2 border rounded"
              required
            />

            <input
              {...register("age")}
              type="number"
              placeholder="Age"
              className="w-full p-2 border rounded"
              required
              min="0"
            />
            <select
              {...register("bloodGroup")}
              className="w-full p-2 border rounded"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? {" "}
          <Link to="/patient-login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PatientRegister;
