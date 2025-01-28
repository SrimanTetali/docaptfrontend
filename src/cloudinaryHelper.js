import { v2 as cloudinary } from "cloudinary";

// Set your Cloudinary configuration
cloudinary.config({
  cloud_name: "dagj68nid", // Replace with your Cloud Name
  api_key: "892782581836647", // Replace with your API Key
  api_secret: "ZLVIVBj4sjfy00jrCdOvFYm59qQ", // Replace with your API Secret
});

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "doctor-images"); // You'll create this in the next step

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dagj68nid/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url; // This is the uploaded image URL
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
