// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import PatientNavbar from "./Dashboards/Patient/PatientNavbar";
// import Home from "./components/Home";
// import Doctors from "./components/Doctors";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import AuthForm from "./components/AuthForm";
// import MyAppointments from "./Dashboards/Patient/MyAppointments";
// import PatientProfile from "./Dashboards/Patient/Profile";

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // ✅ Added loading state

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/auth/current-user", {
//       withCredentials: true, 
//     })
//     .then((res) => setUser(res.data.user))
//     .catch(() => setUser(null))
//     .finally(() => setLoading(false)); // ✅ Prevents flickering
//   }, []);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   return (
//     <Router>
//       {user ? <PatientNavbar user={user} setUser={setUser} /> : <Navbar />}

//       <Routes>
//         {/* Default Home Page for Logged-in Users */}
//         <Route path="/" element={<Home />} />
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/auth" element={<AuthForm setUser={setUser} />} />

//         {/* Protected Routes */}
//         {user && (
//           <>
//             <Route path="/my-appointment" element={<MyAppointments />} />
//             <Route path="/profile" element={<PatientProfile />} />
//           </>
//         )}

//         {/* Redirect unauthenticated users */}
//         <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientRegister from "./pages/Auth/PatientRegister";
import PatientLogin from "./pages/Auth/PatientLogin";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import DoctorRegister from "./pages/Auth/DoctorRegister";
import DoctorLogin from "./pages/Auth/DoctorLogin";
import AdminRegister from "./pages/Auth/AdminRegister";
import AdminLogin from "./pages/Auth/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Patient Routes */}
        <Route path="/patient-register" element={<PatientRegister />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />

        {/* Doctor Routes */}
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

