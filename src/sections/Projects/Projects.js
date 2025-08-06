import React, { useState } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { getSectionData } from '../../data/usePortfolioData';

const Projects = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  // Get projects data from centralized JSON
  const projectsData = getSectionData('projects');

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${projectsData.backgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  // Get projects from centralized data
  const projects = projectsData.projects || [];

  return (
    <section 
      id="projects" 
      className="relative min-h-screen flex flex-col justify-center items-center text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-12 w-full"
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
            {projectsData.title}
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400 mx-auto mb-6 sm:mb-8 rounded-full"></div>
        </div>
        
        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 auto-rows-fr">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="animate-fade-in-up h-full"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both'
              }}
            >
              <ProjectCard 
                name={project.name}
                description={project.description}
                features={project.features}
                techStack={project.techStack}
                githubUrl={project.githubUrl}
                deploymentUrl={project.deploymentUrl}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Overlay Component */}
      {showOverlay && (
        <ImageInfoOverlay
          title={projectsData.overlayTitle}
          description={projectsData.overlayDescription}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Projects;