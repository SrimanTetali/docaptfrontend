// firebaseconfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiFKW9gvlQSRP6ZVCPMq02NQLnkV69Iag",
  authDomain: "doctorappointment-8f969.firebaseapp.com",
  projectId: "doctorappointment-8f969",
  storageBucket: "doctorappointment-8f969.appspot.com",
  messagingSenderId: "999415391434",
  appId: "1:999415391434:web:3a38456740cb1ca5d08033",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
