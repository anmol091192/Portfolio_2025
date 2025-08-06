import React, { useState } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import herbigHaro211 from '../../assets/images/jwst/herbig-haro211.jpg';

const Experience = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${herbigHaro211})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  // Experience data structure for better maintainability
  const experiences = [
    {
      company: "Amazon Web Services (AWS)",
      position: "Software Development Engineer II",
      duration: "May 2024 – Mar 2025",
      achievements: [
        "Designed and deployed an allow-listing and throttling feature via API Gateway across multiple stages and regions, ensuring contract compliance.",
        "Built scalable storage infrastructure using DynamoDB and S3 with SNS/SQS for syncing changes to Elasticsearch, improving data consistency and access latency.",
        "Implemented DynamoDB transactional batch writes to remove stale data and maintain atomicity across catalog records.",
        "Developed event-driven notification services using SES, EventBridge, SNS, and SQS to keep customers informed in real-time.",
        "Automated stack policy updates via AWS CDK, cutting deployment time from 1.5 days to 5 minutes."
      ]
    },
    {
      company: "Linqia",
      position: "Software Engineer",
      duration: "Aug 2021 – Apr 2024",
      achievements: [
        "Led migration of influencer analytics dashboards from Chart.js to D3.js, reducing load time by 60% and improving visualization accuracy.",
        "Refactored REST API responses and optimized frontend components in Vue.js and React, improving rendering time and data integrity.",
        "Introduced prefetching and infinite scroll in React, improving page engagement and Lighthouse performance scores."
      ]
    },
    {
      company: "Egen Solutions",
      position: "Software Engineer",
      duration: "May 2019 – Jul 2021",
      achievements: [
        "Developed full-stack solutions for healthcare and logistics clients using React, Node.js, and MongoDB.",
        "Built reusable React components and maintained design consistency across products.",
        "Collaborated with cross-functional teams to deliver cloud-native applications using Docker and AWS."
      ]
    }
  ];

  return (
    <section 
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
      >
        <img 
          src="https://img.icons8.com/ios-filled/50/ffffff/telescope.png" 
          alt="info" 
          className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" 
        />
      </button>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mx-auto mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 via-white to-cosmic-purple-200">
            Experience
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
          title="Herbig–Haro 211 – Protostellar Jet"
          description="A tightly focused jet of gas blasts from a newborn star, traveling at supersonic speed. Captured by JWST in near-infrared, this image reveals the early dynamics of stellar formation."
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Experience;