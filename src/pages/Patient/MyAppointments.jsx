import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelingId, setCancelingId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("patient_token");
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
    const token = localStorage.getItem("patient_token");
    try {
      const res = await fetch(`http://localhost:5000/api/patient/cancel/${appointmentId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ reason: cancelReason }),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      console.log(data)
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

  const openGoogleMaps = (hospitalName, hospitalAddress) => {
    const query = `${hospitalName}, ${hospitalAddress}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(mapsUrl, "_blank");
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
                  <p><strong>Hospital Name:</strong> {appointment.doctorId?.hospitalName || "N/A"}</p>
                  <p><strong>Hospital Address:</strong> {appointment.doctorId?.hospitalAddress || "N/A"}</p>
                  
                  <p className={`font-semibold ${
                    appointment.status === "Pending" ? "text-yellow-500" :
                    appointment.status === "Accepted" ? "text-green-500" :
                    appointment.status === "Completed" ? "text-blue-500" :
                    "text-red-500"
                  }`}>
                    <strong>Status:</strong> {appointment.status}
                  </p>

                  {/* Show "View with Maps" button only for Pending or Accepted appointments */}
                  {(appointment.status === "Pending" || appointment.status === "Accepted") && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Click below to view the hospital location on maps.
                      </p>
                      <button
                        onClick={() =>
                          openGoogleMaps(
                            appointment.doctorId?.hospitalName || "",
                            appointment.doctorId?.hospitalAddress || ""
                          )
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-1 hover:bg-blue-700"
                      >
                        View with Maps
                      </button>
                    </div>
                  )}

                  {/* Display cancellation details if cancelled */}
                  {appointment.status === "Cancelled" && (
                    <div className="mt-2 text-red-500">
                      <p><strong>Cancelled By:</strong> {appointment.cancelledBy || "Unknown"}</p>
                      <p><strong>Reason:</strong> {appointment.cancellationReason || "No reason provided"}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cancel Button aligned to the right */}
              {appointment.status !== "Cancelled" && appointment.status !== "Completed" && (
                <div className="ml-auto">
                  <button
                    onClick={() => setCancelingId(appointment._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Cancel Appointment
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}

      {/* Cancel Confirmation Popup */}
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
