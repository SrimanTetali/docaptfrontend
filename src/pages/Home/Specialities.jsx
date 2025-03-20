import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cardiology from '../../images/Home/specialities/cardiology.jpg';
import Dermatology from '../../images/Home/specialities/Dermatology.jpeg';
import Pediatrics from '../../images/Home/specialities/pediatrics.jpg';
import Neurology from '../../images/Home/specialities/Neurology.jpeg';
import Orthopedics from '../../images/Home/specialities/orthopedics.jpeg';
import Ophthalmology from '../../images/Home/specialities/Ophthalmology.jpeg';
import Endocrinologist from '../../images/Home/specialities/Endocrinology.jpg';
import Gynacology from '../../images/Home/specialities/Gynacologist.jpg';
import GeneralPhysician from '../../images/Home/specialities/GeneralPhysician1.jpg';

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

const specialtyMapping = {
  Cardiology: 'Cardiologist',
  Dermatology: 'Dermatologist',
  Pediatrics: 'Pediatrician',
  Neurology: 'Neurologist',
  Orthopedics: 'Orthopedist',
  Ophthalmology: 'Ophthalmologist',
  Endocrinology: 'Endocrinologist',
  Gynacology: 'Gynecologist',
  'General Physician': 'General Physician',
};

const Specialities = () => {
  const navigate = useNavigate();

  const handleSpecialtyClick = (specialty) => {
    const mappedSpecialty = specialtyMapping[specialty];
    navigate(`/patient-dashboard/doctors?specialty=${mappedSpecialty}`);
  };

  return (
    <div id="specialties" className="py-12 bg-gray-200 text-center">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">Our Specialties</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {specialtiesData.map((specialty, index) => (
          <div
            key={index}
            className="bg-white border border-indigo-200 rounded-lg w-80 p-6 shadow-md hover:shadow-lg hover:border-indigo-600 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={() => handleSpecialtyClick(specialty.title)}
          >
            <img
              src={specialty.img}
              alt={specialty.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-medium text-gray-900 hover:text-lime-500 transition-colors duration-300">
              {specialty.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specialities;