import React from 'react';
import Cardiology from '../../images/Home/specialities/cardiology.jpg';
import Dermatology from '../../images/Home/specialities/Dermatology.jpeg';
import Pediatrics from '../../images/Home/specialities/pediatrics.jpg';
import Neurology from '../../images/Home/specialities/Neurology.jpeg';
import Orthopedics from '../../images/Home/specialities/orthopedics.jpeg';
import Ophthalmology from '../../images/Home/specialities/Ophthalmology.jpeg';
// import Gastroenterology from '../../images/Home/specialities/Gastroenterology.jpeg';
import Gynacology from '../../images/Home/specialities/Gynacologist.jpg';
import GeneralPhysician  from '../../images/Home/specialities/GeneralPhysician1.jpg';  
import Endocrinologist from '../../images/Home/specialities/Endocrinology.jpg';

const specialtiesData = [
  { img: Cardiology, title: 'Cardiology' },
  { img: Dermatology, title: 'Dermatology' },
  { img: Pediatrics, title: 'Pediatrics' },
  { img: Neurology, title: 'Neurology' },
  { img: Orthopedics, title: 'Orthopedics' },
  { img: Ophthalmology, title: 'Ophthalmology' },
  { img: Endocrinologist, title: 'Endocrinology' },
  { img: Gynacology, title: 'Gynacology' },
  { img: GeneralPhysician, title: 'General Physician' },
];

const PSpecialities = () => {
  return (
    <div id="specialties" className="py-12 bg-white text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Specialties</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {specialtiesData.map((specialty, index) => (
          <div 
            key={index} 
            className="bg-gray-100 border border-gray-300 rounded-lg w-80 p-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition"
          >
            <img 
              src={specialty.img} 
              alt={specialty.title} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-medium text-gray-800">{specialty.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PSpecialities;
