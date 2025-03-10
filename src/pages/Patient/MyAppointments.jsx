import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelingId, setCancelingId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/patient/bookings", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    if (!cancelReason.trim()) {
      toast.error("Cancellation reason is required");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/patient/cancel/${appointmentId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ reason: cancelReason }),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      console.log("data : ", data);
      toast.success("Appointment cancelled successfully");
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId
            ? { ...appt, status: "Cancelled", cancelledBy: "You", cancellationReason: cancelReason }
            : appt
        )
      );
      setCancelingId(null);
      setCancelReason("");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} className="border-b py-4 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={appointment.doctorId?.profilePhoto || "/default-profile.png"}
                  alt="Doctor Profile"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-lg">Dr. {appointment.doctorId?.name}</p>
                  <p className="text-gray-600">{appointment.doctorId?.specialization}</p>
                  <p><strong>Date:</strong> {new Date(appointment.date).toDateString()}</p>
                  <p><strong>Time:</strong> {appointment.timeSlot}</p>
                  <p className={`font-semibold ${
                    appointment.status === "Pending" ? "text-yellow-500" :
                    appointment.status === "Accepted" ? "text-green-500" :
                    "text-red-500"
                  }`}>
                    <strong>Status:</strong> {appointment.status}
                  </p>

                  {/* Display cancellation details if cancelled */}
                  {appointment.status === "Cancelled" && (
                    <div className="mt-2 text-red-500">
                      <p><strong>Cancelled By:</strong> {appointment.cancelledBy || "Unknown"}</p>
                      <p><strong>Reason:</strong> {appointment.cancellationReason || "No reason provided"}</p>
                    </div>
                  )}
                </div>
              </div>
              {appointment.status !== "Cancelled" && (
                <button
                  onClick={() => setCancelingId(appointment._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel Appointment
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}

      {cancelingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">Confirm Cancellation</h3>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Enter cancellation reason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleCancel(cancelingId)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
              >
                Confirm Cancel
              </button>
              <button
                onClick={() => setCancelingId(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
