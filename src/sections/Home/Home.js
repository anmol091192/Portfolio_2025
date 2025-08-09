// File: src/sections/Home/Home.js
import React, { useState, useEffect, useRef } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import { getSectionData } from '../../data/usePortfolioData';

const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const homeData = getSectionData('home');
  
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

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${homeData.backgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed' // This makes the background stay relatively fixed
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-12 w-full" 
      style={sectionStyle}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>
      
      {/* Info Button - moves with content */}
      <button 
        className="absolute top-6 right-6 z-20 p-3 bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 backdrop-blur-sm rounded-full hover:from-space-blue-500/40 hover:to-cosmic-purple-500/40 transition-all duration-300 border border-white/20 hover:border-white/40 group" 
        onClick={handleInfoClick}
        style={{
          transform: `translateY(${scrollY * 0.3}px)` // Subtle movement for button
        }}
      >
        <img 
          src="https://img.icons8.com/ios-filled/50/ffffff/telescope.png" 
          alt="info" 
          className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" 
        />
      </button>

      {/* Content - moves faster than background */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-12"
        style={{
          transform: `translateY(${scrollY * 0.5}px)` // Content moves faster than background
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 via-white to-cosmic-purple-200">
          {homeData.title}
        </h1>
        <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400 mx-auto mb-6 sm:mb-8 rounded-full"></div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-light text-gray-300 animate-fade-in-up px-4" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            {homeData.subtitle}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            {homeData.tagLine}
          </p>
      </div>

      {/* Overlay Component */}
      {showOverlay && (
        <ImageInfoOverlay
          title={homeData.imageOverlay?.title}
          description={homeData.imageOverlay?.description}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Home;