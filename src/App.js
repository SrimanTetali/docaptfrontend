
// export default App;
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
// import Dashboard from './Dashboards/Admin/Dashboard';
// import Appointments from './Dashboards/Admin/Appointments';
// import AddDoctor from './Dashboards/Admin/AddDoctor';
// import DoctorList from './Dashboards/Admin/DoctorList';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Admin />}>
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="appointments" element={<Appointments />} />
//           <Route path="add-doctor" element={<AddDoctor />} />
//           <Route path="doctor-list" element={<DoctorList />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;