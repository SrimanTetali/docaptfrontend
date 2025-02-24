import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const AdminRegister = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/admin/register`, data);
      toast.success("Registration successful! Please log in.");
      navigate("/admin-login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input {...register("name")} type="text" placeholder="Full Name" className="w-full p-2 border rounded" required />
          <input {...register("email")} type="email" placeholder="Email" className="w-full p-2 border rounded" required />
          <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border rounded" required />
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-2">
          Already have an account? <a href="/admin-login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
