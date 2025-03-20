import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelingId, setCancelingId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("patient_token");
      if (!token) {
        toast.error("Please log in to view appointments");
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/patient/bookings", {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json" 
          },
        });
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        toast.error("Error loading appointments");
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    if (!cancelReason.trim()) {
      toast.error("Please provide a cancellation reason");
      return;
    }
    const token = localStorage.getItem("patient_token");
    try {
      setCancelingId(null);
      const res = await fetch(`http://localhost:5000/api/patient/cancel/${appointmentId}`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ reason: cancelReason }),
      });
      if (!res.ok) throw new Error("Cancellation failed");
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId
            ? { ...appt, status: "Cancelled", cancelledBy: "You", cancellationReason: cancelReason }
            : appt
        )
      );
      setCancelReason("");
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel appointment");
      console.error(error);
    }
  };

  const openGoogleMaps = (hospitalName, hospitalAddress) => {
    const query = `${hospitalName}, ${hospitalAddress}`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, "_blank");
  };

  const statusColors = {
    Pending: "bg-amber-100 text-amber-800",
    Accepted: "bg-emerald-100 text-emerald-800",
    Completed: "bg-indigo-100 text-indigo-800",
    Cancelled: "bg-rose-100 text-rose-800",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-8 lg:px-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
          My Appointments
        </h2>

        {appointments.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-gray-600 text-center bg-white p-8 rounded-xl shadow-sm"
          >
            No appointments scheduled yet.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appointments.map((appointment) => (
              <motion.div
                key={appointment._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-6 mb-6">
                  <img
                    src={appointment.doctorId?.profilePhoto || "/default-profile.png"}
                    alt="Doctor"
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-200"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Dr. {appointment.doctorId?.name || "N/A"}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {appointment.doctorId?.specialization || "Specialist"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {appointment.timeSlot}
                  </p>
                  <p>
                    <span className="font-medium">Hospital:</span>{" "}
                    {appointment.doctorId?.hospitalName || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Address:</span>{" "}
                    {appointment.doctorId?.hospitalAddress || "N/A"}
                  </p>
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-base font-medium ${
                      statusColors[appointment.status]
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="mt-6 flex gap-4">
                  {(appointment.status === "Pending" || appointment.status === "Accepted") && (
                    <button
                      onClick={() =>
                        openGoogleMaps(
                          appointment.doctorId?.hospitalName,
                          appointment.doctorId?.hospitalAddress
                        )
                      }
                      className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 text-base"
                    >
                      View Map
                    </button>
                  )}
                  {appointment.status !== "Cancelled" && 
                   appointment.status !== "Completed" && (
                    <button
                      onClick={() => setCancelingId(appointment._id)}
                      className="flex-1 bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-all duration-200 text-base"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>

                {appointment.status === "Cancelled" && (
                  <div className="mt-6 text-base bg-rose-50 p-4 rounded-lg text-rose-700">
                    <p>Cancelled By: {appointment.cancelledBy}</p>
                    <p>Reason: {appointment.cancellationReason}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Cancellation Modal */}
        {cancelingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Cancel Appointment
              </h3>
              <textarea
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-lg"
                placeholder="Why are you cancelling this appointment?"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows="5"
              />
              <div className="mt-6 flex gap-4 justify-end">
                <button
                  onClick={() => setCancelingId(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-lg"
                >
                  Cancel Appointment
                </button>
                <button
                  onClick={() => handleCancel(cancelingId)}
                  className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all text-lg"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyAppointments;