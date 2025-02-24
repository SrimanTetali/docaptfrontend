import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = sessionStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin-login");
          return;
        }

        // Fetch all doctors
        const doctorsRes = await axios.get("http://localhost:5000/api/admin/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Doctors Data:", doctorsRes.data);
        setDoctors(doctorsRes.data);

        // Fetch all patients
        const patientsRes = await axios.get("http://localhost:5000/api/admin/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Patients Data:", patientsRes.data);
        setPatients(patientsRes.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdminData();
  }, [navigate]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Doctors Section */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">All Doctors</h3>
        {doctors.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Specialization</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="text-center">
                  <td className="border p-2">{doctor.name}</td>
                  <td className="border p-2">{doctor.email}</td>
                  <td className="border p-2">{doctor.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No doctors found.</p>
        )}
      </div>

      {/* Patients Section */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">All Patients</h3>
        {patients.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id} className="text-center">
                  <td className="border p-2">{patient.name}</td>
                  <td className="border p-2">{patient.email}</td>
                  <td className="border p-2">{patient.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No patients found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
