import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Authentication Components
import PatientRegister from "./pages/Auth/PatientRegister";
import PatientLogin from "./pages/Auth/PatientLogin";
import DoctorRegister from "./pages/Auth/DoctorRegister";
import DoctorLogin from "./pages/Auth/DoctorLogin";
import AdminRegister from "./pages/Auth/AdminRegister";
import AdminLogin from "./pages/Auth/AdminLogin";

// Patient Components
import PatientDashboard from "./pages/Patient/PatientDashboard";
import PatientProfile from "./pages/Patient/PatientProfile";
import MyAppointments from "./pages/Patient/MyAppointments";
import AllDoctors from "./pages/Patient/AllDoctors";
import PHome from "./pages/Patient/PHome";
import PContact from "./pages/Patient/PContact";

// Doctor Components
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DashboardDoctor from "./pages/Doctor/Dashboard";

// Admin Components
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import AdminDashboardHome from "./pages/Admin/AdminDashboardHome";
import Notifications from "./pages/Admin/Notifications";
import Reports from "./pages/Admin/Reports"; // Import Reports

// Home Dashboard Components
import HomeDashboard from "./pages/Home/HomeDashboard";
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import Contact from "./pages/Home/Contact";

// Function to get stored user based on role
const getStoredUser = () => {
  const patientToken = localStorage.getItem("patient_token");
  const patientUser = localStorage.getItem("patient_user");

  if (patientToken && patientUser) {
    try {
      const decodedToken = jwtDecode(patientToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        return { ...JSON.parse(patientUser), role: "patient" };
      }
    } catch (error) {
      console.error("Error decoding patient token:", error);
    }
  }

  // Separate logic for doctor authentication
  const doctorToken = localStorage.getItem("doctor_token");
  const doctorUser = localStorage.getItem("doctor_user");

  if (doctorToken && doctorUser) {
    try {
      const decodedToken = jwtDecode(doctorToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        return { ...JSON.parse(doctorUser), role: "doctor" };
      }
    } catch (error) {
      console.error("Error decoding doctor token:", error);
    }
  }

  // Separate logic for admin authentication
  const adminToken = localStorage.getItem("admin_token");
  const adminUser = localStorage.getItem("admin_user");

  if (adminToken && adminUser) {
    try {
      const decodedToken = jwtDecode(adminToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        return { ...JSON.parse(adminUser), role: "admin" };
      }
    } catch (error) {
      console.error("Error decoding admin token:", error);
    }
  }

  return null;
};

const App = () => {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = (userData, role) => {
    if (role === "doctor") {
      localStorage.setItem("doctor_token", userData.token);
      localStorage.setItem("doctor_user", JSON.stringify(userData));
    } else if (role === "patient") {
      localStorage.setItem("patient_token", userData.token);
      localStorage.setItem("patient_user", JSON.stringify(userData));
    } else if (role === "admin") {
      localStorage.setItem("admin_token", userData.token);
      localStorage.setItem("admin_user", JSON.stringify(userData));
    }

    setUser({ ...userData, role });
  };

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem(`${user.role}_token`);
      localStorage.removeItem(`${user.role}_user`);
    }
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Router>
      {loading && <h2>Loading...</h2>}
      <Routes>
        <Route path="/" element={<HomeDashboard />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="patient-register" element={<PatientRegister />} />
          <Route path="patient-login" element={<PatientLogin setUser={(data) => handleLogin(data, "patient")} />} />
          <Route path="doctor-login" element={<DoctorLogin setUser={(data) => handleLogin(data, "doctor")} />} />
          <Route path="admin-login" element={<AdminLogin setUser={(data) => handleLogin(data, "admin")} />} />
        </Route>

        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/admin-register" element={<AdminRegister />} />

        {/* Patient Routes */}
        {user?.role === "patient" ? (
          <Route path="/patient-dashboard/*" element={<PatientDashboard user={user} />}>
            <Route index element={<PHome />} />
            <Route path="phome" element={<PHome />} />
            <Route path="profile" element={<PatientProfile user={user} />} />
            <Route path="appointments" element={<MyAppointments user={user} />} />
            <Route path="doctors" element={<AllDoctors user={user} />} />
            <Route path="pcontact" element={<PContact />} />
          </Route>
        ) : !loading ? (
          <Route path="/patient-dashboard/*" element={<Navigate to="/patient-login" replace />} />
        ) : null}

        {/* Doctor Routes */}
        {user?.role === "doctor" ? (
          <Route path="/doctor-dashboard/*" element={<DoctorDashboard user={user} />}>
            <Route index element={<DashboardDoctor />} />
            <Route path="dashboard" element={<DashboardDoctor />} />
            <Route path="profile" element={<DoctorProfile user={user} />} />
            <Route path="appointments" element={<DoctorAppointments />} />
          </Route>
        ) : !loading ? (
          <Route path="/doctor-dashboard/*" element={<Navigate to="/doctor-login" replace />} />
        ) : null}

        {/* Admin Routes */}
        {user?.role === "admin" ? (
          <Route path="/admin-dashboard/*" element={<AdminDashboard user={user} />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="dashboard" element={<AdminDashboardHome />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="doctors-list" element={<DoctorsList />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reports" element={<Reports />} /> {/* Added Reports */}
          </Route>
        ) : !loading ? (
          <Route path="/admin-dashboard/*" element={<Navigate to="/admin-login" replace />} />
        ) : null}

        {/* Redirect users to their respective dashboards after login */}
        <Route path="*" element={
          user?.role === "patient" ? <Navigate to="/patient-dashboard/phome" replace />
          : user?.role === "doctor" ? <Navigate to="/doctor-dashboard/dashboard" replace />
          : user?.role === "admin" ? <Navigate to="/admin-dashboard/dashboard" replace />
          : <Navigate to="/" replace />
        } />
      </Routes>
    </Router>
  );
};

export default App;