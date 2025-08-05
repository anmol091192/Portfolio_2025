// File: src/sections/About/About.js
import React, { useState } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';

const About = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex justify-center items-center text-white p-16 text-center w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://stsci-opo.org/STScI-01GKMKRHSSCD5RKJYSB4DFH8D8.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <button className="info-button absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300" onClick={handleInfoClick}>
        <img src="https://img.icons8.com/ios-filled/50/ffffff/telescope.png" alt="info" className="w-6 h-6" />
      </button>
      <div className="flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto p-10 bg-black bg-opacity-60 rounded-xl shadow-2xl">
        <img
          src="https://avatars.githubusercontent.com/u/20846156?v=4"
          alt="Anmol Khandekar"
          className="w-40 h-40 md:w-32 md:h-32 object-cover rounded-full border-4 border-white mb-6"
          style={{
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(138, 43, 226, 0.2)'
          }}
        />
        <div className="w-full">
          <h1 className="text-4xl md:text-3xl font-bold mb-4" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'}}>About Me</h1>
          <p className="text-lg md:text-base leading-relaxed mb-8" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'}}>
            Frontend-oriented Full-Stack Software Engineer with 6+ years of experience delivering
            scalable, user-centric web applications in startup and enterprise settings. Skilled in
            building dynamic, accessible UIs with React, TypeScript, and modern component
            libraries. On the backend, experienced in designing RESTful APIs, managing data flows
            with event-driven architectures (SNS/SQS), and implementing scalable storage
            solutions with AWS services like DynamoDB, S3, and Lambda. Currently pursuing a
            Generative AI Specialization at Purdue University.
          </p>
          <h2 className="text-2xl md:text-xl mb-4 uppercase tracking-wide font-semibold text-space-blue-200" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'}}>Skills</h2>
          <div className="flex flex-wrap justify-center gap-3 p-4">
            {['React', 'TypeScript', 'Node.js', 'AWS (DynamoDB, Lambda, S3)', 'LangChain & RAG'].map((skill) => (
              <div
                key={skill}
                className="bg-white bg-opacity-10 border border-white border-opacity-20 px-4 py-2 rounded-full text-white text-sm md:text-xs transition-all duration-300 hover:bg-opacity-20 shadow-lg"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showOverlay && (
        <ImageInfoOverlay
          title="Cosmic Cliffs – Carina Nebula"
          description="This star-forming region, nicknamed the Cosmic Cliffs, reveals incredible details of newborn stars in the Carina Nebula. Captured by JWST in infrared, it showcases stellar birth in action."
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default About;