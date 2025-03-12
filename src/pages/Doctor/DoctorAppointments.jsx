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
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
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
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoading("");
    }
  };

  const handleCancel = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/doctor/cancel-appointment/${cancelData.bookingId}`,
        { reason: cancelData.reason },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Appointment cancelled successfully");
      setShowCancelModal(false);
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const handleComplete = async () => {
    try {
      await updateStatus(completeData.bookingId, "Completed");
      setShowCompleteModal(false);
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error("Failed to complete appointment");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Doctor Appointments</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border p-2 rounded">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>

        <select value={filterDateRange} onChange={(e) => setFilterDateRange(e.target.value)} className="border p-2 rounded">
          <option value="">All Dates</option>
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
          <option value="Next Week">Next Week</option>
          <option value="Next Month">Next Month</option>
          <option value="Last Week">Last Week</option>
          <option value="Last Month">Last Month</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <div key={appointment._id} className="p-4 border rounded-lg shadow-md">
            <p><strong>Patient:</strong> {appointment.patientId?.name || "Unknown"}</p>
            <p><strong>Date:</strong> {new Date(appointment.date).toDateString()}</p>
            <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
            <p><strong>Urgency:</strong> {appointment.urgency}</p>
            <p><strong>Reason:</strong> {appointment.reason}</p>
            <p className={`text-white px-2 py-1 inline-block rounded ${
              appointment.status === "Pending" ? "bg-yellow-500" :
              appointment.status === "Accepted" ? "bg-green-500" :
              appointment.status === "Rejected" ? "bg-gray-500" :
              appointment.status === "Cancelled" ? "bg-red-500" :
              appointment.status === "Completed" ? "bg-blue-500" :
              "bg-gray-500"
            }`}>
              {appointment.status}
            </p>

            {/* Display cancelled by and reason if appointment is cancelled */}
            {appointment.status === "Cancelled" && (
              <div className="mt-2 text-red-500">
                <p><strong>Cancelled By:</strong> {appointment.cancelledBy || "Unknown"}</p>
                <p><strong>Reason:</strong> {appointment.cancellationReason || "No reason provided"}</p>
              </div>
            )}

            {appointment.status === "Pending" && (
              <div className="mt-2 flex gap-2">
                <button onClick={() => updateStatus(appointment._id, "Accepted")} className="bg-green-500 text-white px-3 py-1 rounded">
                  Accept
                </button>
                <button onClick={() => updateStatus(appointment._id, "Rejected")} className="bg-gray-500 text-white px-3 py-1 rounded">
                  Reject
                </button>
              </div>
            )}

            {appointment.status === "Accepted" && (
              <div className="mt-2 flex gap-2">
                <button onClick={() => setShowCompleteModal(true) || setCompleteData({ bookingId: appointment._id })} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Complete
                </button>
                <button onClick={() => setShowCancelModal(true) || setCancelData({ bookingId: appointment._id, reason: "" })} className="bg-red-500 text-white px-3 py-1 rounded">
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Cancel Appointment</h2>
            <textarea
              className="border p-2 w-full rounded"
              placeholder="Enter cancellation reason..."
              value={cancelData.reason}
              onChange={(e) => setCancelData({ ...cancelData, reason: e.target.value })}
            />
            <div className="mt-4 flex gap-2">
              <button onClick={handleCancel} className="bg-red-500 text-white px-3 py-1 rounded">Confirm</button>
              <button onClick={() => setShowCancelModal(false)} className="bg-gray-300 px-3 py-1 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {showCompleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Complete Appointment</h2>
            <p>Are you sure you want to mark this appointment as completed?</p>
            <div className="mt-4 flex gap-2">
              <button onClick={handleComplete} className="bg-blue-500 text-white px-3 py-1 rounded">Confirm</button>
              <button onClick={() => setShowCompleteModal(false)} className="bg-gray-300 px-3 py-1 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;