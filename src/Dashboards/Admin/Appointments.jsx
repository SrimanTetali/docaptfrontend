// // AllAppointments.jsx
// const Appointments = () => {
//     return (
//       <div className="p-5">
//         <h2 className="text-2xl font-bold mb-5">All Appointments</h2>
//         <div className="bg-white p-5 rounded shadow">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="text-left">Patient Name</th>
//                 <th className="text-left">Doctor Name</th>
//                 <th className="text-left">Date</th>
//                 <th className="text-left">Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>John Doe</td>
//                 <td>Dr. Smith</td>
//                 <td>2023-10-15</td>
//                 <td>10:00 AM</td>
//               </tr>
//               {/* Add more rows as needed */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };
  
//   export default Appointments;




import React from "react";
import "./Appointments.css";
import Doctor from '../../images/doctors/Doc1Rechard.jpg';

const appointments = [
  { id: 1, patient: "Avinash Kr", age: 31, date: "5 Oct 2024, 12:00 PM", doctor: "Dr. Richard James", fees: "$50", action: "❌" },
  { id: 2, patient: "GreatStack", age: 24, date: "26 Sep 2024, 11:00 AM", doctor: "Dr. Richard James", fees: "$40", action: "Cancelled" },
  { id: 3, patient: "GreatStack", age: 24, date: "23 Sep 2024, 01:00 PM", doctor: "Dr. Christopher Davis", fees: "$50", action: "❌" },
  { id: 4, patient: "GreatStack", age: 24, date: "25 Sep 2024, 02:00 PM", doctor: "Dr. Richard James", fees: "$40", action: "Completed" },
  { id: 5, patient: "GreatStack", age: 24, date: "23 Sep 2024, 11:00 AM", doctor: "Dr. Richard James", fees: "$40", action: "Completed" },
  { id: 6, patient: "GreatStack", age: 24, date: "22 Sep 2024, 06:00 PM", doctor: "Dr. Emily Larson", fees: "$60", action: "Completed" },
];

const Appointments = () => {
  return (
    <div className="appointments-container">
      <h2>All Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Age</th>
            <th>Date & Time</th>
            <th>Doctor</th>
            <th>Fees</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>
                <div className="patient-info">
                  <img
                    src={Doctor}
                    alt="Patient"
                    className="patient-avatar"
                  />
                  {appointment.patient}
                </div>
              </td>
              <td>{appointment.age}</td>
              <td>{appointment.date}</td>
              <td>
                <div className="doctor-info">
                  <img
                    src={Doctor}
                    alt="Doctor"
                    className="doctor-avatar"
                  />
                  {appointment.doctor}
                </div>
              </td>
              <td>{appointment.fees}</td>
              <td className={appointment.action.toLowerCase()}>
                {appointment.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
