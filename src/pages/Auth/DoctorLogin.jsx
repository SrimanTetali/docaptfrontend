import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginBackground from "../../images/Home/loginBG.jpg";

const API_URL = "http://localhost:5000/api";

const DoctorLogin = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // State to handle navigation
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending data:", { email, password });

      const response = await fetch(`${API_URL}/doctor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      console.log("Raw response:", text);

      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ role: "doctor", data: data.doctor }));

        setUser({ token: data.token, role: "doctor", data: data.doctor });

        setUserLoggedIn(true); // Mark as logged in
        toast.success("Login successful!");
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Navigate to Doctor Dashboard after login success
  useEffect(() => {
    if (userLoggedIn) {
      navigate("/doctor-dashboard");
    }
  }, [userLoggedIn, navigate]);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Doctor Login
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please login to access the dashboard.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
