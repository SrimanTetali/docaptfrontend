import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = sessionStorage.getItem("doctorToken");
        if (!token) {
          navigate("/doctor-login");
          return;
        }
        const res = await axios.get("http://localhost:5000/api/doctor/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(res.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfile();
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>
      {doctor ? (
        <div>
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Experience:</strong> {doctor.experience} years</p>
          <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={() => {
            sessionStorage.removeItem("doctorToken");
            navigate("/doctor-login");
          }}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
