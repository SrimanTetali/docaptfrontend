import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortType, setSortType] = useState("");
  const [cancelData, setCancelData] = useState({ bookingId: "", reason: "" });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [appointments, filterStatus, filterDate, sortType]);

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

    if (filterDate) {
      filtered = filtered.filter((appt) => appt.date === filterDate);
    }

    if (sortType === "date") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === "urgency") {
      filtered.sort((a, b) => (a.urgency > b.urgency ? -1 : 1));
    } else if (sortType === "patientName") {
      filtered.sort((a, b) => (a.patientId?.name > b.patientId?.name ? 1 : -1));
    }

    setFilteredAppointments(filtered);
  };

  const updateStatus = async (bookingId, status) => {
    setLoading(bookingId); // Show loading state for this appointment
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
      setLoading(""); // Remove loading state
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Doctor Appointments</h2>

      {/* Filters & Sorting */}
      <div className="flex gap-4 mb-4">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border p-2 rounded">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="border p-2 rounded" />

        <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="border p-2 rounded">
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="urgency">Urgency</option>
          <option value="patientName">Patient Name</option>
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

            {/* Status Indicator */}
            <p className={`text-white px-2 py-1 inline-block rounded ${appointment.status === "Pending" ? "bg-yellow-500" 
              : appointment.status === "Accepted" ? "bg-green-500" 
              : appointment.status === "Cancelled" ? "bg-red-500" 
              : "bg-gray-500"}`}>
              {appointment.status}
            </p>

            {/* Display cancellation details if cancelled */}
            {appointment.status === "Cancelled" && (
              <div className="mt-2 text-red-500">
                <p><strong>Cancelled By:</strong> {appointment.cancelledBy || "Unknown"}</p>
                <p><strong>Reason:</strong> {appointment.cancellationReason || "No reason provided"}</p>
              </div>
            )}

            {/* Accept & Reject Buttons */}
            {appointment.status === "Pending" && (
              <div className="mt-2 flex gap-2">
                <button 
                  onClick={() => updateStatus(appointment._id, "Accepted")} 
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  disabled={loading === appointment._id}
                >
                  {loading === appointment._id ? "Processing..." : "Accept"}
                </button>
                <button 
                  onClick={() => updateStatus(appointment._id, "Rejected")} 
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  disabled={loading === appointment._id}
                >
                  {loading === appointment._id ? "Processing..." : "Reject"}
                </button>
              </div>
            )}

            {/* Cancel Button when Appointment is Accepted */}
            {appointment.status === "Accepted" && (
              <button 
                onClick={() => {
                  setCancelData({ bookingId: appointment._id, reason: "" });
                  setShowCancelModal(true);
                }} 
                className="bg-red-500 text-white px-3 py-1 rounded mt-2">
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Cancel Appointment Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Cancel Appointment</h3>
            <textarea 
              placeholder="Cancellation Reason" 
              value={cancelData.reason} 
              onChange={(e) => setCancelData({ ...cancelData, reason: e.target.value })} 
              className="block w-full border p-2 mt-2" 
            />
            <div className="flex gap-2 mt-4">
              <button onClick={handleCancel} className="bg-red-500 text-white px-3 py-1 rounded">Confirm</button>
              <button onClick={() => setShowCancelModal(false)} className="bg-gray-500 text-white px-3 py-1 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
