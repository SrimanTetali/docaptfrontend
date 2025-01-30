import React, { useState } from "react";
import "./AddDoctor.css";
import ProfileImg from "../../images/icons/Profile.jpg";
import { db } from "../../firebaseconfig"; // Firebase configuration
import { collection, addDoc } from "firebase/firestore"; // Firestore functions
import { Cloudinary } from "cloudinary-core"; // Cloudinary client-side SDK

const AddDoctor = () => {
  const [imagePreview, setImagePreview] = useState(ProfileImg);
  const [imageFile, setImageFile] = useState(null); // Store selected image file
  const [formData, setFormData] = useState({
    name: "",
    speciality: "General Physician",
    email: "",
    degree: "",
    password: "",
    address1: "",
    address2: "",
    experience: "1 Year",
    fees: "",
    about: "",
  });

  const cl = new Cloudinary({ cloud_name: "your-cloud-name" }); // Replace with your Cloudinary cloud name

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Set selected file for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Show image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`; // Replace with your cloud name
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your-upload-preset"); // Replace with your upload preset

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Return the Cloudinary URL of the uploaded image
  };

  const handleSubmit = async () => {
    try {
      if (!imageFile) {
        alert("Please upload an image!");
        return;
      }

      // Upload the image to Cloudinary
      const imageUrl = await uploadToCloudinary(imageFile);

      // Add the doctor data to Firestore
      const doctorData = {
        ...formData,
        image: imageUrl, // Store the Cloudinary image URL
        createdAt: new Date(),
      };

      await addDoc(collection(db, "doctors"), doctorData);

      alert("Doctor added successfully!");
      setFormData({
        name: "",
        speciality: "General Physician",
        email: "",
        degree: "",
        password: "",
        address1: "",
        address2: "",
        experience: "1 Year",
        fees: "",
        about: "",
      });
      setImagePreview(ProfileImg); // Reset image preview
      setImageFile(null); // Reset image file
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("An error occurred while adding the doctor. Please try again.");
    }
  };

  return (
    <div className="add-doctor">
      <h2>Add Doctor</h2>
      <div className="add-doctor-form">
        <div className="image-upload">
          <div className="image-preview">
            <img src={imagePreview} alt="Doctor Preview" />
          </div>
          <input
            type="file"
            id="upload-image"
            accept="image/*"
            onChange={handleImageUpload}
            className="upload-input"
          />
          <button
            onClick={() => document.getElementById("upload-image").click()}
            className="upload-btn"
          >
            Upload Image
          </button>
        </div>

        <div className="form-group">
          <label>Your name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Speciality</label>
          <select
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
          >
            <option>General Physician</option>
            <option>Cardiologist</option>
            <option>Dermatologist</option>
            <option>Orthopedic</option>
            <option>Pediatrician</option>
            <option>Psychiatrist</option>
            <option>Neurologist</option>
            <option>ENT Specialist</option>
          </select>
        </div>

        <div className="form-group">
          <label>Doctor Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Degree</label>
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={formData.degree}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Set Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address1"
            placeholder="Address 1"
            value={formData.address1}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address2"
            placeholder="Address 2"
            value={formData.address2}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Experience</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option>1 Year</option>
            <option>2 Years</option>
            <option>3 Years</option>
            <option>5+ Years</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fees</label>
          <input
            type="number"
            name="fees"
            placeholder="Doctor fees"
            value={formData.fees}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>About Doctor</label>
          <textarea
            name="about"
            placeholder="Write about doctor"
            value={formData.about}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="add-doctor-btn" onClick={handleSubmit}>
          Add Doctor
        </button>
      </div>
    </div>
  );
};

export default AddDoctor;


// // AddDoctor.jsx
// const AddDoctor = () => {
//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-5">Add Doctor</h2>
//       <div className="bg-white p-5 rounded shadow">
//         <form className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Specialization"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Hospital"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Contact"
//             className="w-full p-2 border rounded"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Add Doctor
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDoctor;