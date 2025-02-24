import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/admin/login`, data);

      // Store token in session storage
      sessionStorage.setItem("adminToken", response.data.token);

      toast.success("Login successful!");
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input {...register("email")} type="email" placeholder="Email" className="w-full p-2 border rounded" required />
          <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border rounded" required />
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
