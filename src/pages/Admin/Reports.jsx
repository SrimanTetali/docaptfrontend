import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [filter, setFilter] = useState("week");
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const [doctorsRes, patientsRes, bookingsRes, contactsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/doctorsdata", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:5000/api/patientsdata", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:5000/api/bookingsdata", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:5000/api/contact", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setDoctors(doctorsRes.data);
      setPatients(patientsRes.data);
      setBookings(bookingsRes.data);
      setContacts(contactsRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const filterDataByTime = (data, timeField, period) => {
    const now = moment();
    if (period === "today") return data.filter(item => moment(item[timeField]).isSame(now, "day"));
    if (period === "week") return data.filter(item => moment(item[timeField]).isAfter(now.clone().subtract(7, "days")));
    if (period === "month") return data.filter(item => moment(item[timeField]).isAfter(now.clone().subtract(30, "days")));
    return data; // "all"
  };

  const getAppointmentTrends = () => {
    const filteredBookings = filterDataByTime(bookings, "date", filter);
    const days = filter === "today" ? 1 : filter === "week" ? 7 : 30;
    const labels = Array.from({ length: days }, (_, i) =>
      moment().subtract(days - 1 - i, "days").format("MMM D")
    );
    const data = labels.map(label =>
      filteredBookings.filter(b => moment(b.date).format("MMM D") === label).length
    );

    return {
      labels,
      datasets: [
        {
          label: "Appointments",
          data,
          borderColor: "#4F46E5",
          backgroundColor: "rgba(79, 70, 229, 0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const getBookingStatus = () => {
    const filteredBookings = filterDataByTime(bookings, "date", filter);
    const statusCount = filteredBookings.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(statusCount),
      datasets: [
        {
          data: Object.values(statusCount),
          backgroundColor: ["#10B981", "#3B82F6", "#EF4444", "#6B7280"],
        },
      ],
    };
  };

  const getDoctorPerformance = () => {
    const filteredBookings = filterDataByTime(bookings, "date", filter);
    const doctorCount = filteredBookings.reduce((acc, booking) => {
      const doctor = doctors.find(d => d._id === booking.doctorId);
      const name = doctor ? doctor.name : "Unknown";
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(doctorCount),
      datasets: [
        {
          label: "Appointments",
          data: Object.values(doctorCount),
          backgroundColor: "#8B5CF6",
        },
      ],
    };
  };

  const getPatientActivity = () => {
    const filteredPatients = filterDataByTime(patients, "createdAt", filter);
    const newPatients = filteredPatients.length;
    const returningPatients = filterDataByTime(bookings, "date", filter).filter(b => {
      const patient = patients.find(p => p._id === b.patientId);
      return patient && moment(patient.createdAt).isBefore(moment(b.date).subtract(1, "days"));
    }).length;

    return {
      labels: ["New Patients", "Returning Patients"],
      datasets: [
        {
          data: [newPatients, returningPatients],
          backgroundColor: ["#F59E0B", "#10B981"],
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { backgroundColor: "#1F2937", titleColor: "#fff", bodyColor: "#fff" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 p-8 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Reports & Analytics
          </h1>
          <select
            className="w-full sm:w-auto p-3 rounded-xl bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Appointment Trends */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointment Trends</h2>
            <div className="h-64">
              <Line data={getAppointmentTrends()} options={chartOptions} />
            </div>
          </div>

          {/* Booking Status */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Status</h2>
            <div className="h-64 flex justify-center">
              <Pie data={getBookingStatus()} options={{ ...chartOptions, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Doctor Performance */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointments per Doctor</h2>
            <div className="h-64">
              <Bar data={getDoctorPerformance()} options={chartOptions} />
            </div>
          </div>

          {/* Patient Activity */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">New vs. Returning Patients</h2>
            <div className="h-64 flex justify-center">
              <Pie data={getPatientActivity()} options={{ ...chartOptions, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;