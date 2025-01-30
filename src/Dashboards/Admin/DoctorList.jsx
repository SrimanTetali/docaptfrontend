// // DoctorList.jsx
// const DoctorList = () => {
//     return (
//       <div className="p-5">
//         <h2 className="text-2xl font-bold mb-5">Doctors List</h2>
//         <div className="bg-white p-5 rounded shadow">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="text-left">Name</th>
//                 <th className="text-left">Specialization</th>
//                 <th className="text-left">Hospital</th>
//                 <th className="text-left">Contact</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Dr. Smith</td>
//                 <td>Cardiologist</td>
//                 <td>City Hospital</td>
//                 <td>+1234567890</td>
//               </tr>
//               {/* Add more rows as needed */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };
  
//   export default DoctorList;

import React, { useState, useEffect } from "react";
import { db } from "../../firebaseconfig"; // Import Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors data from Firestore
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollectionRef = collection(db, "doctors"); // Reference to 'doctors' collection
        const querySnapshot = await getDocs(doctorsCollectionRef); // Fetch all documents
        const doctorsList = querySnapshot.docs.map((doc) => doc.data()); // Map to doctor objects
        setDoctors(doctorsList); // Store all doctors in state
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">All Doctors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={doctor._id || index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={doctor.image}
              alt={`${doctor.name}'s photo`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-sm text-gray-600">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;