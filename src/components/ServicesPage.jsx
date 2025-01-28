// import React from "react";
// import '../styles/services.css';
// const Services = () => {
//   const toggleDropdown = (e) => {
//     const content = e.target.nextElementSibling;

//     // Close all other dropdowns
//     document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
//       if (dropdown !== content) {
//         dropdown.style.display = "none";
//       }
//     });

//     // Toggle the current dropdown
//     content.style.display =
//       content.style.display === "block" ? "none" : "block";
//   };

//   const servicesData = [
//     {
//       category: "General Physicians",
//       diseases: [
//         { name: "Common Cold & Flu", symptoms: "Runny nose, sore throat, cough, fever, body aches, fatigue" },
//         { name: "Fever", symptoms: "High body temperature, chills, sweating, headache, muscle aches" },
//         { name: "Stomach Aches", symptoms: "Abdominal pain, nausea, bloating, indigestion" },
//         { name: "Allergies", symptoms: "Sneezing, itchy eyes, runny nose, skin rashes, breathing difficulties" },
//         { name: "Food Poisoning", symptoms: "Vomiting, diarrhea, stomach cramps, fever, dehydration" },
//       ],
//     },
//     {
//       category: "Cardiology",
//       diseases: [
//         { name: "Heart Disease", symptoms: "Chest pain, shortness of breath, irregular heartbeat, fatigue" },
//         { name: "High Blood Pressure", symptoms: "Headaches, shortness of breath, nosebleeds, anxiety" },
//         { name: "Heart Attack", symptoms: "Severe chest pain, arm/jaw pain, sweating, nausea, dizziness" },
//         { name: "Heart Failure", symptoms: "Shortness of breath, fatigue, swelling in legs, rapid heartbeat" },
//         { name: "Arrhythmia", symptoms: "Palpitations, dizziness, fainting, chest discomfort, shortness of breath" },
//       ],
//     },
//     {
//       category: "Dermatology",
//       diseases: [
//         { name: "Acne", symptoms: "Pimples, blackheads, whiteheads, skin inflammation" },
//         { name: "Eczema", symptoms: "Dry skin, itching, red rashes, inflammation, skin thickening" },
//         { name: "Psoriasis", symptoms: "Red patches, silver scales, dry skin, itching, burning" },
//         { name: "Skin Cancer", symptoms: "Unusual moles, skin growths, changes in skin appearance, non-healing sores" },
//         { name: "Rosacea", symptoms: "Facial redness, visible blood vessels, bumps, skin sensitivity" },
//       ],
//     },
//     {
//       category: "Pediatrics",
//       diseases: [
//         { name: " Childhood Infections", symptoms: "Fever, cough, runny nose, decreased appetite, irritability" },
//         { name: "Respiratory Issues", symptoms: "Wheezing, difficulty breathing, coughing, chest congestion" },
//         { name: "Digestive Problems", symptoms: "Stomach pain, diarrhea, vomiting, poor feeding" },
//         { name: "Childhood Asthma", symptoms: "Wheezing, coughing at night, chest tightness, shortness of breath" },
//         { name: "Growth Issues", symptoms: "Delayed growth, weight concerns, developmental delays" },
//       ],
//     },
//     {
//       category: "Neurology",
//       diseases: [
//         { name: "Migraines", symptoms: "Severe headache, sensitivity to light/sound, nausea, visual disturbances" },
//         { name: "Epilepsy", symptoms: "Seizures, temporary confusion, staring spells, loss of consciousness" },
//         { name: "Parkinson's Disease", symptoms: "Tremors, slow movement, stiffness, balance problems" },
//         { name: "Multiple Sclerosis", symptoms: "Vision problems, numbness, tingling, muscle weakness, coordination problems" },
//         { name: " Stroke", symptoms: "Sudden numbness, confusion, difficulty speaking, vision problems, severe headache" },
//       ],
//     },
//     {
//       category: "Orthopedics",
//       diseases: [
//         { name: " Joint Pain", symptoms: "Pain, stiffness, swelling, limited mobility" },
//         { name: "Osteoporosis", symptoms: "Weak bones, fractures, back pain, loss of height" },
//         { name: "Sports Injuries", symptoms: "Pain, swelling, bruising, limited mobility" },
//         { name: "Arthritis", symptoms: "Joint pain, stiffness, swelling, reduced range of motion, warmth in joints" },
//         { name: "Spinal Problems", symptoms: "Back pain, neck pain, numbness, tingling, muscle weakness" },
//       ],
//     },
//     {
//       category: "Ophthalmology",
//       diseases: [
//         { name: "Cataracts", symptoms: "Blurry vision, double vision, sensitivity to light, eye pain" },
//         { name: "Glaucoma", symptoms: "Eye pain, blurred vision, redness, sensitivity to light" },
//         { name: "Macular Degeneration", symptoms: "Blurry vision, blind spots, distorted vision, eye pain" },
//         { name: "Dry Eye Syndrome", symptoms: "Eye irritation, burning sensation, excessive tearing, light sensitivity" },
//         { name: "Diabetic Retinopathy", symptoms: "Blurred vision, floaters, dark spots, vision loss" },
//       ],
//     }, {
//       category: "Gastroenterology",
//       diseases: [
//         { name: "Acid Reflux", symptoms: "Heartburn, regurgitation, difficulty swallowing, chest pain" },
//         { name: "IBS", symptoms: "Abdominal pain, bloating, gas, diarrhea, constipation" },
//         { name: "Stomach Ulcers", symptoms: "Abdominal pain, nausea, vomiting, bloating, weight loss" },
//         { name: "Crohn's Disease", symptoms: "Abdominal pain, diarrhea, fatigue, weight loss, reduced appetite" },
//         { name: "Celiac Disease", symptoms: "Digestive problems, bloating, fatigue, skin rash, anemia" },
//       ],
//     }, {
//       category: "Dental Problems",
//       diseases: [
//         { name: "Tooth Decay", symptoms: "Toothache, sensitivity, pain when eating, visible holes" },
//         { name: "Gum Disease", symptoms: "Bleeding gums, swollen gums, bad breath, loose teeth" },
//         { name: "Tooth Loss", symptoms: "Missing teeth, difficulty eating, speaking, or smiling" },
//         { name: "TMJ Disorders", symptoms: "Jaw pain, difficulty chewing, clicking sound, locked jaw" },
//         { name: "Tooth Abscess", symptoms: "Severe toothache, fever, facial swelling, sensitivity to hot and cold" },
//       ],
//     }
//   ];

//   return (
//     <div className="content">
//       <h1>Our Medical Services</h1>
//       <p className="description">
//         This page helps people identify what problems the specialists treat. For
//         example, a cardiologist treats heart-related issues and performs
//         surgeries. Click on any dropdown below to view the problems and
//         treatments handled by specialists in each field.
//       </p>

//       <div className="dropdown-container">
//         {servicesData.map((service, index) => (
//           <div className="dropdown" key={index}>
//             <div
//               className="dropdown-summary"
//               onClick={toggleDropdown}
//             >
//               {service.category}
//             </div>
//             <div className="dropdown-content">
//               {service.diseases.map((disease, idx) => (
//                 <div className="disease-list" key={idx}>
//                   {idx + 1}. {disease.name}:
//                   <div className="symptoms">Symptoms: {disease.symptoms}</div>
//                 </div>
//               ))}
//               <div className="doc-btn">
//                 <button className="find-doctor-btn" onClick={() => (window.location.href = "appointment.html")}>Find Doctor</button>
//               </div>
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Services;


import React, { useState } from "react";
import '../styles/services.css';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("General Physicians");

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const servicesData = [
    {
      category: "General Physicians",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Common Cold & Flu", symptoms: "Runny nose, sore throat, cough, fever, body aches, fatigue" },
        { name: "Fever", symptoms: "High body temperature, chills, sweating, headache, muscle aches" },
        { name: "Stomach Aches", symptoms: "Abdominal pain, nausea, bloating, indigestion" },
      ],
    },
    {
      category: "Cardiology",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Heart Disease", symptoms: "Chest pain, shortness of breath, irregular heartbeat, fatigue" },
        { name: "High Blood Pressure", symptoms: "Headaches, shortness of breath, nosebleeds, anxiety" },
        { name: "Heart Attack", symptoms: "Severe chest pain, arm/jaw pain, sweating, nausea, dizziness" },
      ],
    },
    {
      category: "Dermatology",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Acne", symptoms: "Pimples, blackheads, whiteheads, skin inflammation" },
        { name: "Eczema", symptoms: "Dry skin, itching, red rashes, inflammation, skin thickening" },
        { name: "Psoriasis", symptoms: "Red patches, silver scales, dry skin, itching, burning" },
      ],
    },
    {
      category: "Pediatrics",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Childhood Infections", symptoms: "Fever, cough, runny nose, decreased appetite, irritability" },
        { name: "Respiratory Issues", symptoms: "Wheezing, difficulty breathing, coughing, chest congestion" },
        { name: "Digestive Problems", symptoms: "Stomach pain, diarrhea, vomiting, poor feeding" },
      ],
    },
    {
      category: "Neurology",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Migraines", symptoms: "Severe headache, sensitivity to light/sound, nausea, visual disturbances" },
        { name: "Epilepsy", symptoms: "Seizures, temporary confusion, staring spells, loss of consciousness" },
        { name: "Stroke", symptoms: "Sudden numbness, confusion, difficulty speaking, vision problems, severe headache" },
      ],
    },
    {
      category: "Orthopedics",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Joint Pain", symptoms: "Pain, stiffness, swelling, limited mobility" },
        { name: "Osteoporosis", symptoms: "Weak bones, fractures, back pain, loss of height" },
        { name: "Sports Injuries", symptoms: "Pain, swelling, bruising, limited mobility" },
      ],
    },
    {
      category: "Ophthalmology",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Cataracts", symptoms: "Blurry vision, double vision, sensitivity to light, eye pain" },
        { name: "Glaucoma", symptoms: "Eye pain, blurred vision, redness, sensitivity to light" },
        { name: "Dry Eye Syndrome", symptoms: "Eye irritation, burning sensation, excessive tearing, light sensitivity" },
      ],
    },
    {
      category: "Gastroenterology",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Acid Reflux", symptoms: "Heartburn, regurgitation, difficulty swallowing, chest pain" },
        { name: "IBS", symptoms: "Abdominal pain, bloating, gas, diarrhea, constipation" },
        { name: "Stomach Ulcers", symptoms: "Abdominal pain, nausea, vomiting, bloating, weight loss" },
      ],
    },
    {
      category: "Dental Problems",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Tooth Decay", symptoms: "Toothache, sensitivity, pain when eating, visible holes" },
        { name: "Gum Disease", symptoms: "Bleeding gums, swollen gums, bad breath, loose teeth" },
        { name: "Tooth Abscess", symptoms: "Severe toothache, fever, facial swelling, sensitivity to hot and cold" },
      ],
    },
    {
      category: "Psychiatry",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Depression", symptoms: "Persistent sadness, loss of interest, fatigue, changes in sleep and appetite" },
        { name: "Anxiety Disorders", symptoms: "Excessive worry, restlessness, difficulty concentrating, irritability" },
        { name: "PTSD", symptoms: "Flashbacks, nightmares, severe anxiety, avoidance of triggering events" },
      ],
    },
    {
      category: "Oncology",
      image: "https://via.placeholder.com/150",
      diseases: [
        { name: "Breast Cancer", symptoms: "Lump in breast, changes in breast size, nipple discharge" },
        { name: "Lung Cancer", symptoms: "Chronic cough, chest pain, shortness of breath, weight loss" },
        { name: "Leukemia", symptoms: "Fatigue, frequent infections, unexplained weight loss, easy bruising" },
      ],
    }
  ];

  return (
    <div className="services-page">
      <h1 className="services-title">Our Medical Services</h1>
      <div className="services-layout">
        <aside className="categories-menu">
          <ul>
            {servicesData.map((service, index) => (
              <li
                key={index}
                className={activeCategory === service.category ? "active" : ""}
                onClick={() => toggleCategory(service.category)}
              >
                {service.category}
              </li>
            ))}
          </ul>
        </aside>

        <main className="category-content">
          {servicesData.map((service, index) => (
            activeCategory === service.category && (
              <div key={index} className="category-details">
                <h2>{service.category}</h2>
                <img src={service.image} alt={service.category} className="category-image" />
                <div className="disease-list">
                  {service.diseases.map((disease, idx) => (
                    <div className="disease-item" key={idx}>
                      <h3>{disease.name}</h3>
                      <p>Symptoms: {disease.symptoms}</p>
                      <button
                        className="find-doctor-btn"
                        onClick={() => (window.location.href = "appointment.html")}
                      >
                        Find Doctor
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </main>
      </div>
    </div>
  );
};

export default Services;
