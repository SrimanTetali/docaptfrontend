// const Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const toggleForm = () => setIsSignUp(!isSignUp);

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;
//     const isAdmin = adminDetails.find(
//       (admin) => admin.email === email && admin.password === password
//     );

//     const isDoctor = doctorDetails.find(
//       (doctor) => doctor.email === email && doctor.password === password
//     );

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const userCollection = collection(database, "userdetails");
//       const q = query(userCollection, where("email", "==", email));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const userDoc = querySnapshot.docs[0];
//         const userName = userDoc.data().name;

//         if (isAdmin) {
//           alert(`Login successful and welcome admin, ${userName}!`);
//         } else if (isDoctor) {
//           alert(`Login successful and welcome Doctor, ${userName}!`);
//         } else {
//           alert(`Login successful and welcome patient, ${userName}!`);
//         }
//       } else {
//         alert("User details not found in the database.");
//       }
//     } catch (error) {
//       if (error.code === "auth/user-not-found") {
//         alert("No user found with this email.");
//       } else if (error.code === "auth/wrong-password") {
//         alert("Incorrect password. Please try again.");
//       } else {
//         alert("Error signing in: " + error.message);
//       }
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const { name, email, phone, password } = formData;
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       await addDoc(collection(database, "userdetails"), {
//         uid: user.uid,
//         name,
//         email,
//         phone,
//         password,
//         createdAt: new Date(),
//       });
//       alert("Registration Successful!");
//     } catch (error) {
//       if (error.code === "auth/email-already-in-use") {
//         alert("Email is already in use. Please use a different email.");
//       } else if (error.code === "auth/invalid-email") {
//         alert("Invalid email address.");
//       } else if (error.code === "auth/weak-password") {
//         alert("Weak password. Password must be at least 6 characters.");
//       } else {
//         alert("An error occurred: " + error.message);
//       }
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="form-container">
//         {isSignUp ? (
//           <form onSubmit={handleSignUp}>
//             <h2 className="form-title">Sign Up</h2>
//             <div className="input-container">
//               <img src={person} alt="person icon" />
//               <input type="text" id="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
//             </div>
//             <div className="input-container">
//               <img src={emailicon} alt="email icon" />
//               <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
//             </div>
//             <div className="input-container">
//               <img src={phoneicon} alt="phone icon" />
//               <input type="tel" id="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
//             </div>
//             <div className="input-container">
//               <img src={passwordicon} alt="password icon" />
//               <input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
//             </div>
//             <div className="buttons">
//               <button type="submit">Sign Up</button>
//               <button type="reset">Clear</button>
//             </div>
//             <div className="form-toggle">
//               <p>Already have an account? </p>
//               <button type="button" onClick={toggleForm} className="toggle-btn">Login</button>
//             </div>
//           </form>
//         ) : (
//           <form onSubmit={handleSignIn}>
//             <h2 className="form-title">Login</h2>
//             <div className="input-container">
//               <img src={emailicon} alt="email icon" />
//               <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
//             </div>
//             <div className="input-container">
//               <img src={passwordicon} alt="password icon" />
//               <input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
//             </div>
//             <div className="buttons">
//               <button type="submit">Login</button>
//               <button type="reset">Clear</button>
//             </div>
//             <div className="form-toggle">
//               <p>Don't have an account? </p>
//               <button type="button" onClick={toggleForm} className="toggle-btn">Sign Up</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;














// Accessing Doctors data from collection and print it.
import React, { useState, useEffect } from 'react';
import { db } from './firebaseconfig'; // Import your Firebase config to access Firestore
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

const Demo = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors data when the component mounts
  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const doctorsCollectionRef = collection(db, 'doctors'); // Reference to the 'doctors' collection
        const querySnapshot = await getDocs(doctorsCollectionRef); // Get all documents from the collection

        const doctorsList = querySnapshot.docs
          .map(doc => doc.data()) // Map the data from each document
          .sort((a, b) => a._id.localeCompare(b._id)); // Sort the data based on the _id field

        setDoctors(doctorsList); // Set the fetched data to the state
      } catch (error) {
        console.error('Error fetching doctors data:', error);
      }
    };

    fetchDoctorsData();
  }, []);

  if (doctors.length === 0) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div>
      <h2>Doctors Information</h2>
      {doctors.map((doctor, index) => (
        <div key={index}>
          <h3>{doctor.name}</h3>
          <p><strong>Doctor ID: </strong> {doctor._id}</p>
          <p><strong>Speciality:</strong> {doctor.speciality}</p>
          <p><strong>Degree:</strong> {doctor.degree}</p>
          <p><strong>Experience:</strong> {doctor.experience}</p>
          <p><strong>About:</strong> {doctor.about}</p>
          <p><strong>Fees:</strong> ${doctor.fees}</p>
          <p><strong>Email:</strong> {doctor.email}</p>

          <h4>Address</h4>
          <p><strong>City:</strong> {doctor.address.city}</p>
          <p><strong>Street:</strong> {doctor.address.street}</p>

          {/* If the image URL is stored correctly, display the image */}
          {doctor.image && <img src={doctor.image} alt={doctor.name} style={{ width: '200px' }} />}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Demo;







// Doctors to the doctors collection


// import React, { useEffect } from "react";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "./firebaseconfig"; // Ensure you import the correct path to firebaseconfig
// import { doctors } from "./images/assets"; // Importing the doctors array from assets.js

// const Demo = () => {
//   useEffect(() => {
//     const addDoctorsToFirebase = async () => {
//       try {
//         const doctorsCollectionRef = collection(db, "doctors"); // Reference to the 'doctors' collection

//         // Loop through each doctor in the doctors array
//         for (const doctor of doctors) {
//           await addDoc(doctorsCollectionRef, doctor); // Add each doctor as a document
//           console.log(`Doctor ${doctor.name} added successfully!`);
//         }

//         alert("All doctors have been added successfully!");
//       } catch (error) {
//         console.error("Error adding doctors to Firebase:", error);
//       }
//     };

//     addDoctorsToFirebase(); // Trigger the function to add doctors
//   }, []); // Empty dependency array ensures it runs once

//   return (
//     <div>
//       <h1>Adding Doctors to Firebase...</h1>
//     </div>
//   );
// };

// export default Demo;














// Remove Duplicates from the Doctors Collection


// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { db } from "./firebaseconfig"; // Import your Firebase config

// const removeDuplicates = async () => {
//   try {
//     const collectionRef = collection(db, "doctors"); // Replace "doctors" with your collection name
//     const snapshot = await getDocs(collectionRef);

//     const docsArray = [];
//     const duplicates = [];

//     snapshot.forEach((docSnap) => {
//       const docData = docSnap.data();
//       const id = docSnap.id;

//       // Create a stringified version of the document for comparison
//       const docKey = JSON.stringify({
//         name: docData.name,
//         email: docData.email,
//         speciality: docData.speciality,
//       });

//       if (docsArray.includes(docKey)) {
//         duplicates.push(id); // Mark as duplicate
//       } else {
//         docsArray.push(docKey); // Keep track of unique docs
//       }
//     });

//     // Delete all duplicates
//     for (const duplicateId of duplicates) {
//       await deleteDoc(doc(collectionRef, duplicateId));
//       console.log(`Deleted duplicate document with ID: ${duplicateId}`);
//     }

//     console.log("Duplicate removal complete.");
//   } catch (error) {
//     console.error("Error removing duplicates:", error);
//   }
// };

// removeDuplicates();
// export default removeDuplicates;
