import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const token = sessionStorage.getItem("patientToken");
        if (!token) {
          navigate("/patient-login");
          return;
        }
        const res = await axios.get("http://localhost:5000/api/patient/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatient(res.data);
      } catch (error) {
        console.error("Error fetching patient profile:", error);
      }
    };

    fetchPatientProfile();
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>
      {patient ? (
        <div>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={() => {
            sessionStorage.removeItem("patientToken");
            navigate("/patient-login");
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

export default PatientDashboard;
