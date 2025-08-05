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
    <nav className="fixed top-1/2 left-10 transform -translate-y-1/2 flex flex-col gap-6 z-50 items-start font-mono tracking-wider hidden md:flex">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`
            text-white/80 no-underline text-sm transition-all duration-300 scale-95 text-left z-10
            hover:text-white hover:scale-110
            ${active === id 
              ? 'text-white font-semibold scale-120' 
              : ''
            }
          `}
          style={{
            textShadow: active === id 
              ? '0 0 8px rgba(255, 255, 255, 0.3)' 
              : '0 0 3px rgba(255, 255, 255, 0.15)'
          }}
          onClick={(e) => handleNavClick(id, e)}
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </a>
      ))}
    </nav>
  );
};

export default ScrollSpyNav;