import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminDashboardHome = () => {
  const [analytics, setAnalytics] = useState({ patientCount: 0, doctorCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Debugging: Log the token

        const response = await fetch("http://localhost:5000/api/admin/analytics", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response:", response); // Debugging: Log the response

        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }

        const data = await response.json();
        console.log("Analytics Data:", data); // Debugging: Log the data
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        toast.error("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  console.log("Loading:", loading); // Debugging: Log the loading state

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Admin Dashboard!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patients Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Patients</h2>
          <p className="text-3xl font-bold text-blue-600">{analytics.patientCount}</p>
        </div>

        {/* Doctors Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Doctors</h2>
          <p className="text-3xl font-bold text-green-600">{analytics.doctorCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;