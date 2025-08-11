// File: src/sections/About/About.js
import React, { useState, useEffect, useRef } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import { getSectionData, getPersonalInfo } from '../../data/usePortfolioData';

const About = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const aboutData = getSectionData('about');
  const personalInfo = getPersonalInfo();
  
  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate parallax effect only when section is visible
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
          // Calculate the scroll progress through this section
          const scrollProgress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
          setScrollY(scrollProgress * 100); // Adjust multiplier for effect intensity
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen flex justify-center items-start text-white p-2 sm:p-4 md:p-6 lg:p-8 xl:p-16 text-center w-full overflow-hidden py-8 sm:py-12 md:py-16"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${aboutData.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed' // This makes the background stay relatively fixed
      }}
    >
      <button 
        className="info-button absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300" 
        onClick={handleInfoClick}
        style={{
          transform: `translateY(${scrollY * 0.3}px)` // Subtle movement for button
        }}
      >
        <img src="https://img.icons8.com/ios-filled/50/ffffff/telescope.png" alt="info" className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <div 
        className="flex flex-col items-center justify-center text-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 bg-black bg-opacity-60 rounded-xl shadow-2xl my-2 sm:my-4 md:my-6 max-h-[90vh] overflow-y-auto"
        style={{
          transform: `translateY(${scrollY * 0.5}px)` // Content moves faster than background
        }}
      >
        <img
          src={personalInfo.profileImage}
          alt={personalInfo.name}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover rounded-full border-2 sm:border-3 md:border-4 border-white mb-2 sm:mb-3 md:mb-4 flex-shrink-0"
          style={{
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(138, 43, 226, 0.2)'
          }}
        />
        <div className="w-full flex-1 min-h-0">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2 md:mb-3" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'}}>{aboutData.title}</h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-2 sm:mb-3 md:mb-4 lg:mb-6" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'}}>
            {aboutData.description}
          </p>
          <h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-1 sm:mb-2 md:mb-3 uppercase tracking-wide font-semibold text-space-blue-200" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'}}>Skills</h2>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 md:gap-2 p-0 sm:p-1 md:p-2 max-h-32 sm:max-h-40 md:max-h-48 overflow-y-auto">
            {aboutData.skills?.map((skill) => (
              <div
                key={skill}
                className="bg-white bg-opacity-10 border border-white border-opacity-20 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 rounded-full text-white text-xs transition-all duration-300 hover:bg-opacity-20 shadow-lg"
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