import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    const token = localStorage.getItem("admin_token");

    if (storedUser && token) {
      setAdmin(JSON.parse(storedUser));
    } else {
      navigate("/admin-login"); // Redirect if no session
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_token");
    navigate("/admin-login");
  };

  if (!admin) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-900">
        <div className="text-xl font-medium text-gray-300 bg-gray-800 p-6 rounded-lg shadow-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-800 text-gray-200 p-4 flex justify-between items-center shadow-md sticky top-0 z-10 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
        <ul className="flex space-x-6">
          {[
            { to: "/admin-dashboard/dashboard", label: "Dashboard" },
            { to: "/admin-dashboard/add-doctor", label: "Add Doctor" },
            { to: "/admin-dashboard/doctors-list", label: "Doctors List" },
            { to: "/admin-dashboard/notifications", label: "Notifications" },
            { to: "/admin-dashboard/reports", label: "Reports" }, // Added Reports
          ].map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="text-sm font-medium px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-all duration-200 shadow-sm"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Nested Routes Render Here */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;