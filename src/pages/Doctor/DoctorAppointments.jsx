import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDateRange, setFilterDateRange] = useState("");
  const [loading, setLoading] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [cancelData, setCancelData] = useState({ bookingId: "", reason: "" });
  const [completeData, setCompleteData] = useState({ bookingId: "" });

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [appointments, filterStatus, filterDateRange]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctor/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("doctor_token")}` },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const applyFilters = () => {
    let filtered = [...appointments];

    if (filterStatus) {
      filtered = filtered.filter((appt) => appt.status === filterStatus);
    }

    if (filterDateRange) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (filterDateRange === "Today") {
        filtered = filtered.filter((appt) => new Date(appt.date).toDateString() === today.toDateString());
      } else if (filterDateRange === "Tomorrow") {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        filtered = filtered.filter((appt) => new Date(appt.date).toDateString() === tomorrow.toDateString());
      } else if (filterDateRange === "Next Week") {
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        filtered = filtered.filter((appt) => new Date(appt.date) <= nextWeek && new Date(appt.date) >= today);
      } else if (filterDateRange === "Next Month") {
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        filtered = filtered.filter((appt) => new Date(appt.date) <= nextMonth && new Date(appt.date) >= today);
      } else if (filterDateRange === "Last Week") {
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        filtered = filtered.filter((appt) => new Date(appt.date) >= lastWeek && new Date(appt.date) < today);
      } else if (filterDateRange === "Last Month") {
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        filtered = filtered.filter((appt) => new Date(appt.date) >= lastMonth && new Date(appt.date) < today);
      }
    }

    setFilteredAppointments(filtered);
  };

  const updateStatus = async (bookingId, status) => {
    setLoading(bookingId);
    try {
      await axios.put(
        "http://localhost:5000/api/doctor/booking-status",
        { bookingId, status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("doctor_token")}` } }
      );
      toast.success(`Appointment ${status}`, {
        position: "top-right",
        autoClose: 3000,
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading("");
    }
  };

  const handleCancel = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/doctor/cancel-appointment/${cancelData.bookingId}`,
        { reason: cancelData.reason },
        { headers: { Authorization: `Bearer ${localStorage.getItem("doctor_token")}` } }
      );
      toast.success("Appointment cancelled successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      setShowCancelModal(false);
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleComplete = async () => {
    try {
      await updateStatus(completeData.bookingId, "Completed");
      setShowCompleteModal(false);
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error("Failed to complete appointment", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="w-full p-0 min-h-screen bg-gray-100">
      <div className="p-8 w-full">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-teal-700">Appointments</h2>
          <p className="text-lg text-gray-600 mt-2">Manage your scheduled appointments efficiently</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-teal-600 mb-4">Filters</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={filterDateRange}
                  onChange={(e) => setFilterDateRange(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Dates</option>
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Next Week">Next Week</option>
                  <option value="Next Month">Next Month</option>
                  <option value="Last Week">Last Week</option>
                  <option value="Last Month">Last Month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="lg:w-3/4 space-y-6">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-2">
                      <p className="text-lg text-gray-800">
                        <strong>Patient:</strong> {appointment.patientId?.name || "Unknown"}
                      </p>
                      <p className="text-lg text-gray-800">
                        <strong>Date:</strong> {new Date(appointment.date).toDateString()}
                      </p>
                      <p className="text-lg text-gray-800">
                        <strong>Time:</strong> {appointment.timeSlot}
                      </p>
                      <p className="text-lg text-gray-800">
                        <strong>Urgency:</strong> {appointment.urgency}
                      </p>
                      <p className="text-lg text-gray-800">
                        <strong>Reason:</strong> {appointment.reason}
                      </p>
                      <span
                        className={`text-white px-3 py-1 rounded-full text-base font-medium inline-block ${
                          appointment.status === "Pending"
                            ? "bg-amber-400"
                            : appointment.status === "Accepted"
                            ? "bg-green-400"
                            : appointment.status === "Rejected"
                            ? "bg-gray-400"
                            : appointment.status === "Cancelled"
                            ? "bg-red-400"
                            : appointment.status === "Completed"
                            ? "bg-teal-400"
                            : "bg-gray-400"
                        }`}
                      >
                        {appointment.status}
                      </span>
                      {appointment.status === "Cancelled" && (
                        <div className="mt-2 text-red-500">
                          <p className="text-base">
                            <strong>Cancelled By:</strong> {appointment.cancelledBy || "Unknown"}
                          </p>
                          <p className="text-base">
                            <strong>Reason:</strong> {appointment.cancellationReason || "No reason provided"}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 flex-col sm:flex-row">
                      {appointment.status === "Pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(appointment._id, "Accepted")}
                            className="bg-green-500 text-white px-5 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
                            disabled={loading === appointment._id}
                          >
                            {loading === appointment._id ? "Processing..." : "Accept"}
                          </button>
                          <button
                            onClick={() => updateStatus(appointment._id, "Rejected")}
                            className="bg-gray-500 text-white px-5 py-2 rounded-md text-base font-medium hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                            disabled={loading === appointment._id}
                          >
                            {loading === appointment._id ? "Processing..." : "Reject"}
                          </button>
                        </>
                      )}
                      {appointment.status === "Accepted" && (
                        <>
                          <button
                            onClick={() => {
                              setShowCompleteModal(true);
                              setCompleteData({ bookingId: appointment._id });
                            }}
                            className="bg-teal-500 text-white px-5 py-2 rounded-md text-base font-medium hover:bg-teal-600 transition-colors duration-200"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => {
                              setShowCancelModal(true);
                              setCancelData({ bookingId: appointment._id, reason: "" });
                            }}
                            className="bg-red-500 text-white px-5 py-2 rounded-md text-base font-medium hover:bg-red-600 transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-lg text-gray-500">No appointments found for the selected filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-60">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-semibold text-teal-700 mb-4">Cancel Appointment</h2>
              <textarea
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter cancellation reason..."
                value={cancelData.reason}
                onChange={(e) => setCancelData({ ...cancelData, reason: e.target.value })}
                rows="4"
              />
              <div className="mt-6 flex gap-4 justify-end">
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-5 py-2 rounded-md text-base font-medium hover:bg-red-600 transition-colors duration-200"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md text-base font-medium hover:bg-gray-300 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Complete Modal */}
        {showCompleteModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-60">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-semibold text-teal-700 mb-4">Complete Appointment</h2>
              <p className="text-lg text-gray-700 mb-6">Are you sure you want to mark this appointment as completed?</p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleComplete}
                  className="bg-teal-500 text-white px-5 py-2 rounded-md text-base font-medium hover:bg-teal-600 transition-colors duration-200"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowCompleteModal(false)}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md text-base font-medium hover:bg-gray-300 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;