// File: src/components/ScrollSpyNav.jsx
import React, { useEffect, useState } from 'react';

const sections = ["contact", "blog", "projects", "experience", "about", "home"];
const ScrollSpyNav = () => {
  const [active, setActive] = useState("home");

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
    const sectionOrder = ['home', 'about', 'experience', 'projects', 'blog', 'contact'];
    const sectionIndex = sectionOrder.indexOf(sectionId);
    
    if (sectionIndex !== -1) {
      sessionStorage.setItem('currentSectionIndex', sectionIndex.toString());
      console.log('Nav clicked - updated currentSectionIndex to:', sectionIndex, 'for section:', sectionId);
    }
    
    // Navigate to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-1/2 left-6 transform -translate-y-1/2 z-50 flex flex-col space-y-3">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`
            px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
            bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20
            hover:bg-opacity-20 hover:scale-105
            ${active === id 
              ? "bg-space-blue-500 bg-opacity-30 text-white border-space-blue-400" 
              : "text-gray-300 hover:text-white"
            }
          `}
          onClick={(e) => handleNavClick(id, e)}
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </a>
      ))}
    </div>
  );
};

export default ScrollSpyNav;