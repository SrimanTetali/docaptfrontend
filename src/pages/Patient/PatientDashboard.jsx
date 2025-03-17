import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("patient_user");
    const token = localStorage.getItem("patient_token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setPatient(parsedUser);
    } else {
      navigate("/patient-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("patient_user");
    localStorage.removeItem("patient_token");
    navigate("/");
  };

  if (!patient) {
    return (
      <div className="h-screen flex justify-center items-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <nav className="flex justify-between items-center p-5 bg-gray-800 text-white w-full shadow-lg">
        <div className="text-xl font-bold">Golden Life</div>
        <div className="flex gap-5 pr-14">
          <Link to="/patient-dashboard/phome" className="text-white font-bold hover:text-blue-400">Home</Link>
          <Link to="/patient-dashboard/profile" className="text-white font-bold hover:text-blue-400">Profile</Link>
          <Link to="/patient-dashboard/doctors" className="text-white font-bold hover:text-blue-400">Doctors</Link>
          <Link to="/patient-dashboard/appointments" className="text-white font-bold hover:text-blue-400">My Appointments</Link>
          <Link to="/patient-dashboard/pcontact" className="text-white font-bold hover:text-blue-400">Contact</Link>
          <button onClick={handleLogout} className="text-white font-bold hover:text-blue-400">Logout</button>
        </div>
      </nav>

      <div className="flex-1 p-0 bg-gray-100">
        <div className="mt-0 bg-white p-0 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
