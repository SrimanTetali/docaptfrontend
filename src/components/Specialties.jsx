import React from 'react';
import '../styles/SpecialtiesSection.css';
import Cardiology from '../images/Home/specialities/cardiology.jpg';
import Dermatology from '../images/Home/specialities/Dermatology.jpeg';
import Pediatrics from '../images/Home/specialities/pediatrics.jpg';
import Neurology from '../images/Home/specialities/Neurology.jpeg';
import Orthopedics from '../images/Home/specialities/orthopedics.jpeg';
import Ophthalmology from '../images/Home/specialities/Ophthalmology.jpeg';
import Gastroenterology from '../images/Home/specialities/Gastroenterology.jpeg';

const specialtiesData = [
  { img: Cardiology, title: 'Cardiology' },
  { img: Dermatology, title: 'Dermatology' },
  { img: Pediatrics, title: 'Pediatrics' },
  { img: Neurology, title: 'Neurology' },
  { img: Orthopedics, title: 'Orthopedics' },
  { img: Ophthalmology, title: 'Ophthalmology' },
  { img: Gastroenterology, title: 'Gastroenterology' },
];

const Specialties = () => {
  return (
    <div id="specialties" className="section">
      <h2>Our Specialties</h2>
      <div className="container">
        {specialtiesData.map((specialty, index) => (
          <div className="card" key={index}>
            <img src={specialty.img} alt={specialty.title} />
            <h3>{specialty.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specialties;
