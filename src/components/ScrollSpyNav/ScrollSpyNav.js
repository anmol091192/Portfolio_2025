// File: src/components/ScrollSpyNav.jsx
import React, { useEffect, useState } from 'react';

const sections = ["contact", "certificates", "projects", "experience", "about", "home"];
const ScrollSpyNav = () => {
  const [active, setActive] = useState("home");
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    
    // Update sessionStorage with the correct section index for rocket navigation
    // IMPORTANT: Must match rocket navigation order
    const sectionOrder = ['contact', 'certificates', 'projects', 'experience', 'about', 'home'];
    const sectionIndex = sectionOrder.indexOf(sectionId);
    
    if (sectionIndex !== -1) {
      sessionStorage.setItem('currentSectionIndex', sectionIndex.toString());
      if (process.env.NODE_ENV === 'development') {
        console.log('Nav clicked - updated currentSectionIndex to:', sectionIndex, 'for section:', sectionId);
      }
    }
    
    // Navigate to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="fixed top-1/2 left-2 sm:left-6 transform -translate-y-1/2 z-50">
      {/* Toggle Button */}
      <button
        onClick={toggleNavVisibility}
        className={`
          mb-3 p-2 sm:p-3 rounded-full transition-all duration-500 ease-in-out
          bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 
          backdrop-blur-sm border border-white/20 hover:border-white/40
          hover:from-space-blue-500/40 hover:to-cosmic-purple-500/40
          hover:scale-110 group
          ${isNavVisible ? 'rotate-0' : 'rotate-180'}
        `}
        aria-label={isNavVisible ? 'Hide navigation' : 'Show navigation'}
      >
        <svg 
          className={`w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover:scale-110 ${
            isNavVisible ? 'rotate-0' : 'rotate-180'
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </button>

      {/* Navigation Menu */}
      <div 
        className={`
          flex flex-col space-y-2 sm:space-y-3 transition-all duration-500 ease-in-out transform origin-top
          ${isNavVisible 
            ? 'opacity-100 scale-y-100 translate-x-0' 
            : 'opacity-0 scale-y-0 -translate-x-full'
          }
        `}
      >
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`
              px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300
              bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20
              hover:bg-opacity-20 hover:scale-105
              ${active === id 
                ? "bg-space-blue-500 bg-opacity-30 text-white border-space-blue-400" 
                : "text-gray-300 hover:text-white"
              }
            `}
            onClick={(e) => handleNavClick(id, e)}
          >
            <span className="block sm:hidden">
              {id.charAt(0).toUpperCase()}
            </span>
            <span className="hidden sm:block">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ScrollSpyNav;