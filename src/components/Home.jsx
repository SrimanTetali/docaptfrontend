// src/components/Home.js
import React from 'react';
import '../styles/HomeSection.css';

const Home = () => {
  return (
    <div className="home">
      <div className='content'><h1>Your Health, No Waiting, No Hassles</h1>
      <p>How is health today? Sounds like not good! Don't worry. Find your doctor online. Book as you wish with eDoc.</p>
      <button onClick={() => window.location.href = ''}>Make Appointment</button>
      </div>
    </div>
  );
};

export default Home;
