import React, { useState } from 'react';

const ExperienceCard = ({ company, position, duration, achievements }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show only first 2 achievements initially
  const displayedAchievements = isExpanded ? achievements : achievements.slice(0, 2);
  const hasMoreContent = achievements.length > 2;

  return (
    <div className="experience-card group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 hover:from-white/20 hover:to-white/10 transition-all duration-500 border border-white/20 hover:border-space-blue-400/50 shadow-xl hover:shadow-2xl hover:shadow-space-blue-500/20 transform hover:-translate-y-2 h-full flex flex-col">
      <div className="experience-entry h-full flex flex-col">
        {/* Company Header */}
        <div className="text-center mb-6 border-b border-white/20 pb-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-space-blue-200 group-hover:text-white transition-colors duration-300">
            {company}
          </h2>
          <h4 className="text-base lg:text-lg text-cosmic-purple-300 font-medium leading-relaxed">
            {position}
          </h4>
          <p className="text-sm text-gray-400 mt-2 font-mono tracking-wide">
            {duration}
          </p>
        </div>
        
        {/* Achievements List */}
        <div className="flex-1 flex flex-col">
          <h5 className="text-lg font-semibold text-space-blue-300 mb-4 flex items-center">
            <span className="w-2 h-2 bg-cosmic-purple-400 rounded-full mr-3"></span>
            Key Achievements
          </h5>
          
          <ul className="space-y-4 flex-1">
            {displayedAchievements.map((achievement, index) => (
              <li key={index} className="flex items-start group/item">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400 flex items-center justify-center mr-4 mt-1 group-hover/item:scale-110 transition-transform duration-300">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-gray-300 leading-relaxed text-sm lg:text-base group-hover/item:text-white transition-colors duration-300">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
          
          {/* View More Button */}
          {hasMoreContent && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 hover:from-space-blue-500/40 hover:to-cosmic-purple-500/40 border border-white/20 hover:border-white/40 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                {isExpanded ? (
                  <>
                    <span>View Less</span>
                    <svg className="ml-2 w-4 h-4 transform rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>View More ({achievements.length - 2} more)</span>
                    <svg className="ml-2 w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
