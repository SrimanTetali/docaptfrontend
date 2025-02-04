
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home";
import Doctors from "./components/Doctors";
import About from "./components/About";
import Contact from "./components/Contact";
import AuthForm from "./components/AuthForm";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}


export default App;











// // App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Admin from './Dashboards/Admin/Admin';
// import AdminDashboard from './Dashboards/Admin/AdminDashboard';
// import Appointments from './Dashboards/Admin/Appointments';
// import AddDoctor from './Dashboards/Admin/AddDoctor';
// import DoctorList from './Dashboards/Admin/DoctorList';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Admin />}>
//           <Route path="admindashboard" element={<AdminDashboard />} />
//           <Route path="appointments" element={<Appointments />} />
//           <Route path="add-doctor" element={<AddDoctor />} />
//           <Route path="doctor-list" element={<DoctorList />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;





// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Doctors from './Dashboards/Doctor/Doctor';
// import Dashboard from './Dashboards/Doctor/Dashboard';
// import Appointment from './Dashboards/Doctor/Appointment';
// import Profile from './Dashboards/Doctor/Profile';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Redirect "/" to "/dashboard" */}
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />

//         {/* Doctors layout as parent */}
//         <Route path="/" element={<Doctors />}>
//           <Route path="dashboard" element={<Dashboard />} />
          
//           <Route path="appointments" element={<Appointment />} />
//           <Route path="profile" element={<Profile />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PatientNavbar from "./Dashboards/Patient/PatientNavbar";
// import Home from "./components/Home";
// import Doctors from "./components/Doctors";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import MyAppointments from "./Dashboards/Patient/MyAppointments";
// import PatientProfile from "./Dashboards/Patient/Profile";
// function App() {
//   return (
//     <Router>
//       <PatientNavbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/my-appointment" element={<MyAppointments />} />
//         <Route path='/profile' element={<PatientProfile/>}/>
//       </Routes>
//     </Router>
//   );
// }

// export default App;







// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import Navbar from "./components/navbar/Navbar";
// import Home from "./components/Home";
// import Doctors from "./components/Doctors";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import AuthForm from "./components/AuthForm";
// import AdminDashboard from "./Dashboards/Admin/AdminDashboard";
// import Appointments from "./Dashboards/Admin/Appointments";
// import AddDoctor from "./Dashboards/Admin/AddDoctor";
// import DoctorList from "./Dashboards/Admin/DoctorList";
// import DoctorDashboard from "./Dashboards/Doctor/Dashboard";
// import DoctorAppointments from "./Dashboards/Doctor/Appointment";
// import Profile from "./Dashboards/Doctor/Profile";
// import PatientDashboard from "./Dashboards/Patient/PatientDashboard";
// import PatientAppointments from "./Dashboards/Patient/MyAppointments";

// const App = () => {
//   const [userRole, setUserRole] = useState(null);
//   const auth = getAuth();
//   const db = getFirestore();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         // Fetch user details from Firestore
//         const userDoc = await getDoc(doc(db, "userdetails", user.uid));
//         if (userDoc.exists()) {
//           setUserRole(userDoc.data().role); // Assuming "role" is stored as "admin", "doctor", or "patient"
//         }
//       } else {
//         setUserRole(null);
//       }
//     });
//     return () => unsubscribe();
//   }, [auth, db]);

//   if (userRole === null) return <p>Loading...</p>; // Show loading state until role is determined

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/auth" element={<AuthForm />} />

//         {/* Role-based Protected Routes */}
//         {userRole === "admin" && (
//           <>
//             <Route path="/admin/dashboard" element={<AdminDashboard />} />
//             <Route path="/admin/appointments" element={<Appointments />} />
//             <Route path="/admin/add-doctor" element={<AddDoctor />} />
//             <Route path="/admin/doctor-list" element={<DoctorList />} />
//           </>
//         )}

//         {userRole === "doctor" && (
//           <>
//             <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
//             <Route path="/doctor/appointments" element={<DoctorAppointments />} />
//             <Route path="/doctor/profile" element={<Profile />} />
//           </>
//         )}

//         {userRole === "patient" && (
//           <>
//             <Route path="/patient/dashboard" element={<PatientDashboard />} />
//             <Route path="/patient/appointments" element={<PatientAppointments />} />
//           </>
//         )}

//         {/* Redirect unknown routes to home */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
