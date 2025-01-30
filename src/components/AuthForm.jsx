import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";
import Footer from "./Footer";

import "../styles/AuthForm.css";
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
    <div className="auth-container">
      <div className="form-container">
        <div className="tab-header">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="active">

          {!isLogin && <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} required />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          }

          {!isLogin && <div className="form-group">
            <label htmlFor="phone">Phone</label><input type="tel" id="phone" name="phone" placeholder="Enter your phone number" maxLength="10" value={formData.phone} onChange={handleInputChange} required />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
          }

          <div className="form-group">
            <label htmlFor="email">Email</label><input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} required />
              <img src={showPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" className="toggle-password" onClick={() => setShowPassword(!showPassword)} />
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="buttons">
            <button type="submit" className="btn-primary">{isLogin ? "Login" : "Sign Up"}</button>
            <button type="reset" className="btn-secondary" onClick={() => setFormData({ email: "", password: "", name: "", phone: "" })}>Cancel</button>
          </div>

        </form>
      </div>
    </div>
    <Footer/></>
  );
}

export default AuthForm;
