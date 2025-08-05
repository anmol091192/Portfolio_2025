import React from 'react';

const ImageInfoOverlay = ({ title, description, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 w-full h-full text-white p-8 z-50 flex flex-col items-center justify-center">
      <button 
        className="fixed top-5 right-8 text-2xl text-white bg-white bg-opacity-10 backdrop-blur border-none cursor-pointer z-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-300" 
        onClick={onClose}
      >
        ✕
      </button>
      <div className="text-center max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg md:text-xl leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ImageInfoOverlay;