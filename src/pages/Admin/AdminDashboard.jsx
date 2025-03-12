import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role === "admin") {
        setAdmin(userData);
      } else {
        navigate("/admin-login"); // Redirect if role mismatch
      }
    } else {
      navigate("/admin-login"); // Redirect if no session
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  if (!admin) {
    return (
      <div className="h-screen flex justify-center items-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <ul className="flex space-x-6">
          <li>
            <Link to="/admin-dashboard/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/add-doctor" className="hover:underline">
              Add Doctor
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/doctors-list" className="hover:underline">
              Doctors List
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/notifications" className="hover:underline">
              Notifications
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Nested Routes Render Here */}
        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
