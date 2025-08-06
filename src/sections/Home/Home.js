// File: src/sections/Home/Home.js
import React, { useState } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import { getSectionData } from '../../data/usePortfolioData';

const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const homeData = getSectionData('home');
  
  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${homeData.backgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-12 w-full" 
      style={sectionStyle}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>
      
      {/* Info Button */}
      <button 
        className="absolute top-6 right-6 z-20 p-3 bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 backdrop-blur-sm rounded-full hover:from-space-blue-500/40 hover:to-cosmic-purple-500/40 transition-all duration-300 border border-white/20 hover:border-white/40 group" 
        onClick={handleInfoClick}
      >
        <img 
          src="https://img.icons8.com/ios-filled/50/ffffff/telescope.png" 
          alt="info" 
          className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" 
        />
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 via-white to-cosmic-purple-200">
          {homeData.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-center text-gray-300 max-w-4xl leading-relaxed">
          {homeData.subtitle}
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