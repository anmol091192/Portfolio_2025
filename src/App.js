// File: src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';

import Contact from './sections/Contact/Contact';
import Certificates from './sections/Certificates/Certificates';
import Projects from './sections/Projects/Projects';
import Experience from './sections/Experience/Experience';
import About from './sections/About/About';
import Home from './sections/Home/Home';
import ScrollSpyNav from './components/ScrollSpyNav/ScrollSpyNav';

function App() {
  const [atTop, setAtTop] = useState(false); // Start as false since we start at home (bottom)
  const [atBottom, setAtBottom] = useState(true); // Start as true since home is at bottom

  useEffect(() => {
    // Wait for all sections to render and then scroll to home
    const scrollToHome = () => {
      // Force a reflow to ensure all sections are rendered
      // eslint-disable-next-line no-unused-expressions
      document.body.offsetHeight; // Force reflow
      
      const home = document.getElementById('home');
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Page dimensions for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('Page dimensions:', { 
          scrollHeight: document.documentElement.scrollHeight,
          clientHeight: document.documentElement.clientHeight,
          scrollY: window.scrollY
        });
      }
      
      // Always scroll to home section, regardless of page scrollability
      if (home) {
        home.scrollIntoView({ behavior: 'instant', block: 'start' });
        
        // Initialize the section index to home (0) for non-scrollable pages
        sessionStorage.setItem('currentSectionIndex', '0');
        
        setTimeout(() => {
          const scrollY = window.scrollY;
          if (process.env.NODE_ENV === 'development') {
            console.log('After scrollIntoView - scrollY:', scrollY);
          }
          
          if (docHeight > windowHeight) {
            // Page is scrollable
            setAtTop(scrollY <= 10);
            setAtBottom(scrollY + windowHeight >= docHeight - 10);
          } else {
            // Page fits in viewport - we're starting at home, so we're at bottom
            if (process.env.NODE_ENV === 'development') {
              console.log('Page fits in viewport - starting at home (bottom)');
            }
            setAtTop(false);
            setAtBottom(true);
          }
        }, 100);
      }
    };

    // Try multiple times to ensure DOM is ready
    setTimeout(scrollToHome, 300);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // More precise thresholds for better detection
      const isAtTop = scrollY <= 10;
      const isAtBottom = scrollY + windowHeight >= docHeight - 10;
      
      // Update current section in sessionStorage based on visible section
      const sections = [...document.querySelectorAll("section")];
      const sectionOrder = ['home', 'about', 'experience', 'projects', 'certificates', 'contact'];
      
      if (docHeight <= windowHeight) {
        // For non-scrollable pages, find which section is most visible
        let maxVisibleArea = 0;
        let currentSectionIndex = 0;
        
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          const viewportTop = scrollY;
          const viewportBottom = scrollY + windowHeight;
          
          const visibleTop = Math.max(sectionTop, viewportTop);
          const visibleBottom = Math.min(sectionBottom, viewportBottom);
          const visibleArea = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            const sectionId = section.id;
            const sectionIndex = sectionOrder.indexOf(sectionId);
            if (sectionIndex !== -1) {
              currentSectionIndex = sectionIndex;
            }
          }
        }
        
        // Update sessionStorage with current section
        sessionStorage.setItem('currentSectionIndex', currentSectionIndex.toString());
      }
      
      // Debug scroll state changes
      if (isAtTop !== atTop || isAtBottom !== atBottom) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Scroll state change:', { 
            scrollY: window.scrollY,
            atTop,
            atBottom
          });
        }
      }
      
      setAtTop(isAtTop);
      setAtBottom(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollBetweenSections = () => {
    const sections = [...document.querySelectorAll("section")];
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Rocket clicked - Page info:', { 
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
        scrollY: window.scrollY,
        isScrollable: document.documentElement.scrollHeight > document.documentElement.clientHeight
      });
    }    // If page is not scrollable (fits in viewport), cycle through sections by index
    if (docHeight <= windowHeight) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Page not scrollable - using section cycling');
      }
      
      // Use a simple counter to cycle through sections
      const sectionOrder = ['home', 'about', 'experience', 'projects', 'certificates', 'contact'];
      
      // Get or initialize current section index from sessionStorage
      let currentIndex = parseInt(sessionStorage.getItem('currentSectionIndex') || '0');
      
      // Move to next section
      currentIndex = (currentIndex + 1) % sectionOrder.length;
      sessionStorage.setItem('currentSectionIndex', currentIndex.toString());
      
      const targetSection = document.getElementById(sectionOrder[currentIndex]);
      if (process.env.NODE_ENV === 'development') {
        console.log('Cycling to section:', sectionOrder[currentIndex]);
      }
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    
    // Original logic for scrollable pages
    const sectionOrder = ['home', 'about', 'experience', 'projects', 'certificates', 'contact'];
    
    const orderedSections = sectionOrder.map(id => 
      sections.find(section => section.id === id)
    ).filter(Boolean);
    
    let currentSectionIndex = -1;
    let maxVisibleArea = 0;
    
    // Find the section with the most visible area in the viewport
    for (let i = 0; i < orderedSections.length; i++) {
      const section = orderedSections[i];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const viewportTop = currentScroll;
      const viewportBottom = currentScroll + windowHeight;
      
      const visibleTop = Math.max(sectionTop, viewportTop);
      const visibleBottom = Math.min(sectionBottom, viewportBottom);
      const visibleArea = Math.max(0, visibleBottom - visibleTop);
      
      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        currentSectionIndex = i;
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Current section:', orderedSections[currentSectionIndex]?.id);
      console.log('Position states - atTop:', atTop, 'atBottom:', atBottom);
    }

    let nextSectionIndex;
    
    if (currentSectionIndex === orderedSections.length - 1) {
      nextSectionIndex = 0;
    } else if (currentSectionIndex === -1) {
      nextSectionIndex = 1;
    } else {
      nextSectionIndex = currentSectionIndex + 1;
    }
    
    const nextSection = orderedSections[nextSectionIndex];
    if (process.env.NODE_ENV === 'development') {
      console.log('Scrolling to:', nextSection?.id);
    }
    
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ScrollSpyNav />

      <div className="rocket-wrapper">
        <img
          src="https://img.icons8.com/?size=100&id=64347&format=png&color=000000"
          alt="rocket scroll"
          className="rocket"
          onClick={scrollBetweenSections}
        />
        <div className="scroll-indicator">
          🚀 Explore the Universe
        </div>
      </div>

      <section id="contact"><Contact /></section>
      <section id="certificates"><Certificates /></section>
      <section id="projects"><Projects /></section>
      <section id="experience"><Experience /></section>
      <section id="about"><About /></section>
      <section id="home"><Home /></section>
    </>
  );
}

export default App;