import React from 'react';
import '../styles/ServicesSection.css';
import Cold from '../images/Home/services/cold.jpg';
import BPHeart from '../images/Home/services/BP_Heart.jpg';
import SkinProb from '../images/Home/services/skinprob.jpg';
import ChildNotWell from '../images/Home/services/childnotfeelingwell.jpg';
import Headache from '../images/Home/services/Headache.jpeg';
import BoneJoint from '../images/Home/services/bon.jpeg';
import EyeProblem from '../images/Home/services/eyeproblem.jpg';
import GastroDiseases from '../images/Home/services/Gastrointestinal-Diseases.jpg';
import DentalProblem from '../images/Home/services/dentalproblem.jpeg';

const servicesData = [
  { img: Cold, title: 'Cold, Cough and Fever' },
  { img: BPHeart, title: 'BP and Heart Problems' },
  { img: SkinProb, title: 'Acne, Pimples and Skin Allergy Issue' },
  { img: ChildNotWell, title: 'Child Not Feeling Well' },
  { img: Headache, title: 'Headache, Sleeping and Nerves Problems' },
  { img: BoneJoint, title: 'Bone and Joint Problems' },
  { img: EyeProblem, title: 'Eye Problems' },
  { img: GastroDiseases, title: 'Obesity, Gas and Digestion Problems' },
  { img: DentalProblem, title: 'Dental Problems' },
];

const Services = () => {
  return (
    <div id="services" className="section">
      <h2>Our Services</h2>
      <div className="container">
        {servicesData.map((service, index) => (
          <div className="card" key={index}>
            <img src={service.img} alt={service.title} />
            <h3>{service.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
