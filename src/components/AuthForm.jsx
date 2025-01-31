import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";
import Footer from "./Footer";

import eyeIcon from "../images/icons/eye.png";
import eyeSlashIcon from "../images/icons/eye-slash.png";

const adminDetails = [
  { email: "tetalisriman@gmail.com", password: "sri12345" },
  { email: "ramesh123@gmail.com", password: "ramesh123" },
];

const doctorDetails = [
  { email: "vamsisatyavarapu3@gmail.com", password: "vamsi@2004" },
];

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    let errorMessages = { ...errors };

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) errorMessages.email = "Please enter a valid email address.";
    else if (name === "password" && value.length < 6) errorMessages.password = "Password must be at least 6 characters.";
    else if (name === "phone" && (!/^\d{10}$/.test(value) || value.length !== 10)) errorMessages.phone = "Phone number must be 10 digits.";
    else if (name === "name" && value.trim() === "") errorMessages.name = "Name cannot be empty.";
    else delete errorMessages[name];

    setErrors(errorMessages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!isLogin && formData.phone.length !== 10) newErrors.phone = "Phone number must be 10 digits.";
    if (!isLogin && formData.name.trim() === "") newErrors.name = "Name cannot be empty.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { email, password, name, phone } = formData;
    if (isLogin) {
      const isAdmin = adminDetails.find((admin) => admin.email === email && admin.password === password);
      const isDoctor = doctorDetails.find((doctor) => doctor.email === email && doctor.password === password);

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userCollection = collection(db, "userdetails");
        const q = query(userCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userName = userDoc.data().name;
          if (isAdmin) {
            alert(`Login successful and welcome admin, ${userName}!`);
          } else if (isDoctor) {
            alert(`Login successful and welcome Doctor, ${userName}!`);
          } else {
            alert(`Login successful and welcome patient, ${userName}!`);
          }
        } else alert("User details not found in the database.");
      } catch (error) {
        if (error.code === "auth/user-not-found") alert("No user found with this email.");
        else if (error.code === "auth/wrong-password") alert("Incorrect password. Please try again.");
        else alert("Error signing in: " + error.message);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addDoc(collection(db, "userdetails"), {
          uid: user.uid,
          name,
          email,
          phone,
          password,
          createdAt: new Date(),
        });
        alert("Registration successful!");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") alert("Email is already in use. Please use a different email.");
        else if (error.code === "auth/invalid-email") alert("Invalid email address.");
        else if (error.code === "auth/weak-password") alert("Weak password. Password must be at least 6 characters.");
        else alert("An error occurred: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[85vh] bg-cover bg-center bg-no-repeat p-5 sticky" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/08/15/58/65/360_F_815586595_PJGF1V6kQBaUcNHgsx1dbnG7dAwIE2xY.jpg')" }}>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"> {/* Slightly larger container */}
          <div className="flex justify-around mb-6"> {/* Slightly larger margin */}
            <button
              className={`text-lg font-bold ${isLogin ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"}`} // Slightly larger font size
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`text-lg font-bold ${!isLogin ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"}`} // Slightly larger font size
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="block">
            {!isLogin && (
              <div className="mb-5"> {/* Slightly larger margin */}
                <label htmlFor="name" className="block text-base font-bold mb-2 text-gray-700">Full Name</label> {/* Slightly larger font size */}
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md text-base" // Slightly larger padding and font size
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            {!isLogin && (
              <div className="mb-5"> {/* Slightly larger margin */}
                <label htmlFor="phone" className="block text-base font-bold mb-2 text-gray-700">Phone</label> {/* Slightly larger font size */}
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md text-base" // Slightly larger padding and font size
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            )}

            <div className="mb-5"> {/* Slightly larger margin */}
              <label htmlFor="email" className="block text-base font-bold mb-2 text-gray-700">Email</label> {/* Slightly larger font size */}
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md text-base" // Slightly larger padding and font size
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-5 relative"> {/* Slightly larger margin */}
              <label htmlFor="password" className="block text-base font-bold mb-2 text-gray-700">Password</label> {/* Slightly larger font size */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md text-base pr-10" // Slightly larger padding and font size
                  required
                />
                <img
                  src={showPassword ? eyeSlashIcon : eyeIcon}
                  alt="Toggle Password Visibility"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex justify-between gap-3">
              <button type="submit" className="w-full bg-blue-500 text-white p-2.5 rounded-md hover:bg-blue-600 transition duration-300 text-base"> {/* Slightly larger padding and font size */}
                {isLogin ? "Login" : "Sign Up"}
              </button>
              <button
                type="reset"
                className="w-full bg-red-500 text-white p-2.5 rounded-md hover:bg-red-600 transition duration-300 text-base" // Slightly larger padding and font size
                onClick={() => setFormData({ email: "", password: "", name: "", phone: "" })}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AuthForm;