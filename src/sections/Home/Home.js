// File: src/sections/Home/Home.js
import React, { useState } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';

const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  return (
    <section 
      id="home" 
      className="relative overflow-hidden h-screen flex flex-col items-center justify-center text-center text-white w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://stsci-opo.org/STScI-01GFNN3PWJMY4RQXKZ585BC4QH.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        animation: 'fadeIn 1s ease-in'
      }}
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
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 via-white to-cosmic-purple-200 animate-fade-in-up">
            Anmol Khandekar
          </h1>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400 mx-auto mb-6 sm:mb-8 rounded-full"></div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-light text-gray-300 animate-fade-in-up px-4" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Software Engineer · Explorer of the Digital Unknown
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            Inventing new realities through curiosity, code, and cosmic inspiration.
          </p>
        </div>
      </div>
      {showOverlay && (
        <ImageInfoOverlay
          title="Pillars of Creation"
          description="Captured by the James Webb Space Telescope in infrared, these iconic dust and gas columns within the Eagle Nebula are stellar nurseries hosting newborn stars. The tallest pillar spans about 4 light‑years"
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Home;