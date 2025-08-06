// File: src/sections/About/About.js
import React, { useState } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import { getSectionData, getPersonalInfo } from '../../data/usePortfolioData';

const About = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const aboutData = getSectionData('about');
  const personalInfo = getPersonalInfo();
  
  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex justify-center items-center text-white p-4 sm:p-8 lg:p-16 text-center w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${aboutData.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <button className="info-button absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300" onClick={handleInfoClick}>
        <img src="https://img.icons8.com/ios-filled/50/ffffff/telescope.png" alt="info" className="w-6 h-6" />
      </button>
      <div className="flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto p-6 sm:p-8 lg:p-10 bg-black bg-opacity-60 rounded-xl shadow-2xl">
        <img
          src={personalInfo.profileImage}
          alt={personalInfo.name}
          className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-full border-4 border-white mb-4 sm:mb-6"
          style={{
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(138, 43, 226, 0.2)'
          }}
        />
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'}}>{aboutData.title}</h1>
          <p className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'}}>
            {aboutData.description}
          </p>
          <h2 className="text-xl sm:text-2xl mb-4 uppercase tracking-wide font-semibold text-space-blue-200" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'}}>Skills</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-2 sm:p-4">
            {aboutData.skills?.map((skill) => (
              <div
                key={skill}
                className="bg-white bg-opacity-10 border border-white border-opacity-20 px-3 py-2 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-sm transition-all duration-300 hover:bg-opacity-20 shadow-lg"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showOverlay && (
        <ImageInfoOverlay
          title={aboutData.imageOverlay?.title}
          description={aboutData.imageOverlay?.description}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default About;