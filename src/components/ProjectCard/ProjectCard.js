import React, { useState } from 'react';

const ProjectCard = ({ 
  name, 
  description, 
  features, 
  techStack,
  githubUrl, 
  deploymentUrl 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderFeatures = () => {
    if (!features || features.length === 0) return null;

    const displayFeatures = isExpanded ? features : features.slice(0, 3);

    return (
      <div className="mb-3 sm:mb-4">
        <h4 className="text-xs sm:text-sm font-semibold text-space-blue-200 mb-2">Key Features:</h4>
        <ul className="space-y-1 text-xs sm:text-sm text-gray-200 text-left">
          {displayFeatures.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-cosmic-purple-400 mr-2 mt-1">•</span>
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>
        {features.length > 3 && (
          <button
            onClick={toggleExpanded}
            className="mt-2 text-xs text-space-blue-300 hover:text-space-blue-200 transition-colors duration-200"
          >
            {isExpanded ? 'Show Less' : `+${features.length - 3} more features`}
          </button>
        )}
      </div>
    );
  };

  const renderTechStack = () => {
    if (!techStack || techStack.length === 0) return null;

    return (
      <div className="mb-3 sm:mb-4">
        <h4 className="text-xs sm:text-sm font-semibold text-space-blue-200 mb-2">Tech Stack:</h4>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 text-xs text-white rounded-full border border-white/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-gradient-to-br from-space-blue-900/30 to-cosmic-purple-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-space-blue-500/20 flex flex-col">
      {/* Project Header */}
      <div className="mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 to-cosmic-purple-200 mb-2 leading-tight">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Features */}
      {renderFeatures()}

      {/* Tech Stack */}
      {renderTechStack()}

      {/* Action Buttons */}
      <div className="mt-auto pt-3 sm:pt-4 flex gap-2 sm:gap-3">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 text-center flex items-center justify-center gap-1 sm:gap-2"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            <span className="hidden xs:inline">GitHub</span>
            <span className="xs:hidden">Code</span>
          </a>
        )}
        
        {deploymentUrl && (
          <a
            href={deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-space-blue-600 to-cosmic-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-space-blue-500 hover:to-cosmic-purple-500 transition-all duration-300 text-center flex items-center justify-center gap-1 sm:gap-2"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="hidden xs:inline">Live Demo</span>
            <span className="xs:hidden">Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
