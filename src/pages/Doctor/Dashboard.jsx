import React, { useEffect, useState } from "react";
import axios from "axios";
 
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [summary, setSummary] = useState({
    totalActive: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [appointmentTrends, setAppointmentTrends] = useState([]);
  const [bookingStatusData, setBookingStatusData] = useState([]);
  const [timeRange, setTimeRange] = useState("7");
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

 

  useEffect(() => {
    fetchAppointments();
  }, []);


 

  useEffect(() => {
    if (appointments.length > 0) {
      setAppointmentTrends(calculateAppointmentTrends(appointments, timeRange));
      setBookingStatusData(calculateBookingStatus(appointments, timeRange));
      setUpcomingAppointments(getUpcomingAppointments(appointments));
      updateMonthlyStatistics(selectedYear, selectedMonth);
    }
  }, [appointments, timeRange, selectedYear, selectedMonth]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctor/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("doctor_token")}` },
      });
      const data = response.data;
      setAppointments(data);
      setSummary(getSummary(data));
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    }
  };

  const getSummary = (data) => {
    const today = new Date().toDateString();
    return {
      totalActive: data.filter((appt) => new Date(appt.date) >= new Date()).length,
      todayAppointments: data.filter((appt) => new Date(appt.date).toDateString() === today).length,
      pendingAppointments: data.filter((appt) => appt.status === "Pending").length,
    };
  };

  const calculateAppointmentTrends = (data, range) => {
    const trends = [];
    const today = new Date();
    const days = range === "7" ? 7 : 30;
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const count = data.filter(
        (appt) => new Date(appt.date).toDateString() === date.toDateString()
      ).length;
      trends.unshift({ date: date.toDateString(), appointments: count });
    }
    return trends;
  };

  const calculateBookingStatus = (data, range) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (range === "7" ? 7 : 30));
    const filteredData = data.filter((appt) => new Date(appt.date) >= startDate);
    const statusCounts = { Accepted: 0, Pending: 0, Completed: 0, Rejected: 0, Cancelled: 0 };
    filteredData.forEach((appt) => {
      if (statusCounts.hasOwnProperty(appt.status)) {
        statusCounts[appt.status]++;
      }
    });
    return Object.keys(statusCounts).map((status) => ({ name: status, value: statusCounts[status] }));
  };

  const getUpcomingAppointments = (data) => {
    return data
      .filter((appt) => new Date(appt.date) >= new Date() && !["Completed", "Cancelled"].includes(appt.status))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const updateMonthlyStatistics = (year, month) => {
    const filteredData = appointments.filter((appt) => {
      const apptDate = new Date(appt.date);
      return apptDate.getFullYear() === year && apptDate.getMonth() + 1 === month;
    });
    const statusCounts = { Accepted: 0, Pending: 0, Completed: 0, Rejected: 0, Cancelled: 0 };
    filteredData.forEach((appt) => {
      if (statusCounts.hasOwnProperty(appt.status)) {
        statusCounts[appt.status]++;
      }
    });
    setMonthlyData(Object.keys(statusCounts).map((status) => ({ name: status, count: statusCounts[status] })));
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await axios.put("http://localhost:5000/api/doctor/booking-status", { bookingId, status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("doctor_token")}` },
      });
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042", "#8884D8"];
  const years = Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => 2020 + i);
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));

  return (
    <div className="p-6">
 {/* 🟢 Top Section - Summary Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Total Appointments</h3>
            <p className="text-2xl font-bold">{summary.totalActive}</p>
          </div>
          <span className="text-4xl">🏥</span>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Today's Appointments</h3>
            <p className="text-2xl font-bold">{summary.todayAppointments}</p>
          </div>
          <span className="text-4xl">⏳</span>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Pending Appointments</h3>
            <p className="text-2xl font-bold">{summary.pendingAppointments}</p>
          </div>
          <span className="text-4xl">⚠️</span>
        </div>
      </div>

      {/* 🔵 Middle Section - Upcoming Appointments */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        <div className="grid gap-4">
          {upcomingAppointments.map((appt) => (
            <div key={appt._id} className="p-4 border rounded-lg shadow-md">
              <p><strong>Patient:</strong> {appt.patientId?.name || "Unknown"}</p>
              <p><strong>Date:</strong> {new Date(appt.date).toDateString()}</p>
              <p><strong>Time:</strong> {appt.timeSlot}</p>
              <p className={`text-white px-2 py-1 inline-block rounded ${
                appt.status === "Accepted" ? "bg-green-500" :
                appt.status === "Pending" ? "bg-yellow-500" :
                "bg-gray-500"
              }`}>
                {appt.status}
              </p>
              {appt.status === "Pending" && (
                <div className="mt-2 flex gap-2">
                  <button onClick={() => handleUpdateStatus(appt._id, "Accepted")} className="bg-green-500 text-white px-3 py-1 rounded">
                    ✔ Accept
                  </button>
                  <button onClick={() => handleUpdateStatus(appt._id, "Rejected")} className="bg-red-500 text-white px-3 py-1 rounded">
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🟠 Bottom Section - Booking Statistics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Booking Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 📊 A. Appointment Trends (Line Chart) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Appointment Trends</h3>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="appointments" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 B. Booking Status Breakdown (Pie Chart) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Booking Status Breakdown</h3>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🟣 Monthly Statistics Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Statistics</h2>
        <div className="flex gap-4 mb-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {monthlyData.some((item) => item.count > 0) ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No appointments found for the selected month and year.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
