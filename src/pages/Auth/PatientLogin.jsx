import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginBackground from "../../images/Home/loginBG.jpg";

const PatientLogin = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // New state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/patient/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        localStorage.setItem("user", JSON.stringify({ role: "patient", data: data.patient }));

        setUser({ token: data.token, role: "patient", data: data.patient });

        setUserLoggedIn(true); // Mark login success
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Navigate after state updates
  useEffect(() => {
    if (userLoggedIn) {
      navigate("/patient-dashboard");
    }
  }, [userLoggedIn, navigate]);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Patient Login
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/patient-register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PatientLogin;
