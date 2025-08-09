import React, { useState, useEffect, useRef } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import { getSectionData } from '../../data/usePortfolioData';

const Experience = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  // Get experience data from centralized JSON
  const experienceData = getSectionData('experience');

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

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${experienceData.backgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed' // This makes the background stay relatively fixed
  };

  // Get experiences from centralized data
  const experiences = experienceData.experiences || [];

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="experience-section relative min-h-screen flex flex-col justify-center items-center text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-12 w-full" 
      style={sectionStyle}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>
      
      {/* Info Button */}
      <button 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 sm:p-3 bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 backdrop-blur-sm rounded-full hover:from-space-blue-500/40 hover:to-cosmic-purple-500/40 transition-all duration-300 border border-white/20 hover:border-white/40 group" 
        onClick={handleInfoClick}
        style={{
          transform: `translateY(${scrollY * 0.3}px)` // Subtle movement for button
        }}
      >
        <img 
          src="https://img.icons8.com/ios-filled/50/ffffff/telescope.png" 
          alt="info" 
          className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" 
        />
      </button>
      
      {/* Content Container */}
      <div 
        className="relative z-10 max-w-7xl mx-auto w-full"
        style={{
          transform: `translateY(${scrollY * 0.5}px)` // Content moves faster than background
        }}
      >
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mx-auto mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 via-white to-cosmic-purple-200">
            {experienceData.title}
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400 mx-auto mb-6 sm:mb-8 rounded-full"></div>
        </div>
        
        {/* Experience Cards Grid - Column Layout with Equal Heights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 auto-rows-fr">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="animate-fade-in-up h-full"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both'
              }}
            >
              <ExperienceCard 
                company={exp.company}
                position={exp.position}
                duration={exp.duration}
                achievements={exp.achievements}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Overlay Component */}
      {showOverlay && (
        <ImageInfoOverlay
          title={experienceData.overlayTitle}
          description={experienceData.overlayDescription}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Experience;