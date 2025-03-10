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

// Home Dashboard Components
import HomeDashboard from "./pages/Home/HomeDashboard";
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import Contact from "./pages/Home/Contact";
import PContact from "./pages/Patient/PContact";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log("Token expired, logging out...");
          handleLogout();
        } else {
          setUser({
            token: storedToken,
            role: localStorage.getItem("role"),
            data: JSON.parse(localStorage.getItem("user")),
          });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/"; // Redirect to home
  };

  return (
    <Router>
      <Routes>
        {/* Home Dashboard Routes */}
        <Route path="/" element={<HomeDashboard />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/patient-register" element={<PatientRegister />} />
          <Route path="/patient-login" element={<PatientLogin setUser={setUser} />} />
          <Route path="/doctor-login" element={<DoctorLogin setUser={setUser} />} />
        </Route>

        {/* Authentication Routes */}
        {/* <Route path="/patient-register" element={<PatientRegister />} /> */}
        {/* <Route path="/patient-login" element={<PatientLogin setUser={setUser} />} /> */}
        <Route path="/doctor-register" element={<DoctorRegister />} />
        {/* <Route path="/doctor-login" element={<DoctorLogin setUser={setUser} />} /> */}
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin setUser={setUser} />} />

        {/* Patient Routes */}
        {user?.role === "patient" && (
          <Route path="/patient-dashboard/*" element={<PatientDashboard user={user} />}>
            <Route index element={<PHome />} />
            <Route path="phome" element={<PHome/>}/>
            <Route path="profile" element={<PatientProfile user={user} />} />
            <Route path="appointments" element={<MyAppointments user={user} />} />
            <Route path="doctors" element={<AllDoctors user={user} />} />
            <Route path="pcontact" element={<PContact/>}/>
          </Route>
        )}

        {/* Doctor Routes */}
        {user?.role === "doctor" && (
          <Route path="/doctor-dashboard/*" element={<DoctorDashboard user={user} />}>
            <Route index element={<DoctorProfile user={user} />} />
            <Route path='Dashboard' element={<DashboardDoctor />} />
            <Route path="profile" element={<DoctorProfile user={user} />} />
            <Route path="appointments" element={<DoctorAppointments />} />
          </Route>
        )}

        {/* Admin Routes */}
        {user?.role === "admin" && (
          <Route path="/admin-dashboard/*" element={<AdminDashboard user={user} />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="dashboard" element={<AdminDashboardHome />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="doctors-list" element={<DoctorsList />} />
          </Route>
        )}

        {/* Redirect to Home if No Valid Session */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;