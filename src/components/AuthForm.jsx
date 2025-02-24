import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "patient",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/current-user", { withCredentials: true })
      .then((res) => navigate("/")) // ✅ Redirect to home if logged in
      .catch(() => {}); 
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = formType === "login" ? "/login" : "/register";
      const response = await axios.post(`http://localhost:5000/api/auth${url}`, formData, {
        withCredentials: true,
      });

      alert(response.data.message);
      setUser(response.data.user); // ✅ Update user state
      navigate("/"); // ✅ Redirect to home after login
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  const toggleFormType = () => {
    setFormType(formType === "login" ? "register" : "login");
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "patient",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{formType === "login" ? "Login" : "Register"}</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {formType === "register" && (
            <>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
            </>
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />

          {formType === "register" && (
            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          )}

          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
            {formType === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          {formType === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleFormType} className="text-blue-600 hover:underline">
            {formType === "login" ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
