// File: src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import preloadImages from './utils/preloadImages';

import Contact from './sections/Contact/Contact';
import Certificates from './sections/Certificates/Certificates';
import Projects from './sections/Projects/Projects';
import Experience from './sections/Experience/Experience';
import About from './sections/About/About';
import Home from './sections/Home/Home';
import ScrollSpyNav from './components/ScrollSpyNav/ScrollSpyNav';

function App() {
  const [isScrolling, setIsScrolling] = useState(false); // Add scrolling state to prevent rapid clicks

  useEffect(() => {
    // Preload background images for better performance
    preloadImages()
      .then(() => {
        // Images preloaded successfully - silent in production
      })
      .catch((error) => {
        // Log preload errors only in development
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Some background images failed to preload:', error);
        }
      });

    // Wait for all sections to render and then scroll to home
    const scrollToHome = () => {
      // Force a reflow to ensure all sections are rendered
      // eslint-disable-next-line no-unused-expressions
      document.body.offsetHeight; // Force reflow
      
      const home = document.getElementById('home');
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Always scroll to home section, regardless of page scrollability
      if (home) {
        home.scrollIntoView({ behavior: 'instant', block: 'start' });
        
        // Initialize the section index to home (5 in the new order) for non-scrollable pages
        sessionStorage.setItem('currentSectionIndex', '5');
        
        setTimeout(() => {
          if (docHeight > windowHeight) {
            // Page is scrollable - no state management needed for production
          } else {
            // Page fits in viewport - we're starting at home
          }
          
          // Force a scroll event to ensure proper section detection
          window.dispatchEvent(new Event('scroll'));
        }, 100);
      }
    };

    // Try multiple times to ensure DOM is ready
    setTimeout(scrollToHome, 300);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Update current section in sessionStorage based on visible section
      const sections = [...document.querySelectorAll("section")];
      const sectionOrder = ['home', 'about', 'experience', 'projects', 'certificates', 'contact'];

      if (docHeight <= windowHeight) {
        // For non-scrollable pages, find which section is most visible
        let maxVisibleArea = 0;
        let currentSectionIndex = 5; // Default to home (index 5 in new order)
        
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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollBetweenSections = (event) => {
    console.log('🚀 Rocket clicked! Event:', event?.type || 'unknown');
    
    // Don't try to preventDefault on passive events - just let them through
    // React's click events work fine on mobile with touchAction: 'manipulation'
    
    // Prevent rapid clicks - wait for current scroll to finish
    if (isScrolling) {
      console.log('⏳ Already scrolling, ignoring click');
      return;
    }
    
    console.log('✅ Starting scroll sequence');
    setIsScrolling(true);
    
    // Safety timeout to prevent isScrolling from getting stuck
    // eslint-disable-next-line no-unused-vars
    const safetyTimeout = setTimeout(() => {
      console.log('🆘 Safety timeout triggered - resetting scroll state');
      setIsScrolling(false);
    }, 2000); // Simple 2 second timeout
    
    const sections = [...document.querySelectorAll("section")];
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    console.log('📊 Page metrics:', {
      currentScroll,
      windowHeight,
      docHeight,
      sectionsFound: sections.length,
      isScrolling,
      bodyScrollHeight: document.body.scrollHeight,
      htmlScrollHeight: document.documentElement.scrollHeight,
      windowInnerHeight: window.innerHeight,
      documentElementClientHeight: document.documentElement.clientHeight
    });
    
    // Enhanced mobile detection
    const isMobileWidth = window.innerWidth <= 768;
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = isMobileWidth || isMobileDevice || isTouchDevice;
    
    // Enhanced smooth scrolling function for mobile compatibility
    const smoothScrollToSection = (targetSection) => {
      console.log('🎯 smoothScrollToSection called with:', targetSection?.id || 'null');
      
      if (!targetSection) {
        console.error('❌ No target section provided');
        setIsScrolling(false);
        return;
      }
      
      // Add fallback for edge cases
      const fallbackScroll = () => {
        console.log('🆘 Using fallback scroll');
        clearTimeout(safetyTimeout);
        targetSection.scrollIntoView({ 
          behavior: isMobile ? 'auto' : 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
        setTimeout(() => setIsScrolling(false), isMobile ? 300 : 1000);
      };
      
      if (isMobile) {
        console.log('📱 Using mobile scroll logic');
        // For mobile: Use a more gentle approach with custom easing
        const startY = window.scrollY;
        const targetY = targetSection.offsetTop;
        const distance = targetY - startY;
        const duration = Math.min(1200, Math.max(600, Math.abs(distance) / 1.5)); // Faster duration for better UX
        const startTime = performance.now();
        
        console.log('📱 Mobile scroll params:', {
          startY,
          targetY,
          distance,
          duration
        });
        
        // Temporarily disable CSS smooth scrolling to prevent conflicts
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.scrollBehavior = 'auto';
        
        // Custom easing function for smoother mobile experience
        const easeInOutCubic = (t) => {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const scroll = (currentTime) => {
          try {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            const currentY = startY + (distance * easedProgress);
            
            window.scrollTo(0, currentY);
            
            if (progress < 1) {
              requestAnimationFrame(scroll);
            } else {
              // Re-enable CSS smooth scrolling and reset state
              clearTimeout(safetyTimeout);
              setTimeout(() => {
                document.documentElement.style.scrollBehavior = '';
                document.body.style.scrollBehavior = '';
                setIsScrolling(false);
              }, 100);
            }
          } catch (error) {
            fallbackScroll();
          }
        };
        
        try {
          requestAnimationFrame(scroll);
        } catch (error) {
          console.error('❌ Error in mobile scroll animation:', error);
          fallbackScroll();
        }
      } else {
        console.log('🖥️ Using desktop scroll logic');
        // For desktop: Use native smooth scrolling with fallback
        try {
          targetSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          
          console.log('🖥️ Desktop scroll initiated, resetting state in 1000ms');
          // Reset scrolling state after a reasonable delay for desktop
          clearTimeout(safetyTimeout);
          setTimeout(() => setIsScrolling(false), 1000);
        } catch (error) {
          console.error('❌ Error in desktop scroll:', error);
          fallbackScroll();
        }
      }
    };

    // If page is not scrollable (fits in viewport), cycle through sections by index
    // On mobile, sometimes the height calculation is off due to browser UI, so let's also check for very small differences
    const heightDifference = docHeight - windowHeight;
    const isEffectivelyNonScrollable = heightDifference <= 50; // Allow for small browser UI differences
    
    console.log('📏 Scrollability check:', {
      heightDifference,
      isEffectivelyNonScrollable,
      condition1: docHeight <= windowHeight,
      condition2: isEffectivelyNonScrollable
    });
    
    if (docHeight <= windowHeight || isEffectivelyNonScrollable) {
      console.log('🔄 Using section cycling mode (non-scrollable page)');
      
      // Use a simple counter to cycle through sections
      // IMPORTANT: Use same order as navbar for consistency
      const sectionOrder = ['home', 'about', 'experience', 'projects', 'certificates', 'contact'];
      
      // Get or initialize current section index from sessionStorage
      let currentIndex = parseInt(sessionStorage.getItem('currentSectionIndex') || '5'); // Default to home
      
      console.log('🎯 Current section state:', {
        currentIndexFromStorage: sessionStorage.getItem('currentSectionIndex'),
        parsedCurrentIndex: currentIndex,
        sectionOrder
      });
      
      // Validate currentIndex to ensure it's within bounds
      if (currentIndex < 0 || currentIndex >= sectionOrder.length) {
        console.log('⚠️ Invalid currentIndex, resetting to home');
        currentIndex = 5; // Reset to home if invalid
      }
      
      // Move to next section
      const oldIndex = currentIndex;
      currentIndex = (currentIndex + 1) % sectionOrder.length;
      sessionStorage.setItem('currentSectionIndex', currentIndex.toString());
      
      console.log('➡️ Section transition:', {
        from: `${oldIndex} (${sectionOrder[oldIndex]})`,
        to: `${currentIndex} (${sectionOrder[currentIndex]})`
      });
      
      const targetSection = document.getElementById(sectionOrder[currentIndex]);
      
      if (targetSection) {
        console.log('✅ Target section found:', {
          id: targetSection.id,
          offsetTop: targetSection.offsetTop,
          offsetHeight: targetSection.offsetHeight
        });
        
        // Simple mobile scroll - just use scrollIntoView
        clearTimeout(safetyTimeout);
        
        try {
          targetSection.scrollIntoView({ 
            behavior: 'auto',
            block: 'start',
            inline: 'nearest'
          });
          
          console.log('🎯 Scroll completed, resetting state in 300ms');
          setTimeout(() => setIsScrolling(false), 300);
          
        } catch (error) {
          console.error('❌ Error during scrollIntoView:', error);
          setIsScrolling(false);
        }
      } else {
        console.error('❌ Target section not found:', sectionOrder[currentIndex]);
        clearTimeout(safetyTimeout);
        setIsScrolling(false);
      }
      return;
    }
    
    // Original logic for scrollable pages
    console.log('📜 Using scrollable page mode');
    const sectionOrder = ['home', 'about', 'experience', 'projects', 'certificates', 'contact'];
    
    const orderedSections = sectionOrder.map(id => 
      sections.find(section => section.id === id)
    ).filter(Boolean);
    
    let currentSectionIndex = -1;
    let maxVisibleArea = 0;
    
    console.log('🔍 Detecting current section...');
    
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
      
      console.log(`📍 Section ${section.id}:`, {
        index: i,
        sectionTop,
        sectionBottom,
        visibleArea,
        isCurrentlyMostVisible: visibleArea > maxVisibleArea
      });
      
      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        currentSectionIndex = i;
      }
    }

    // If no section was detected or we're at the very start, default to home section
    if (currentSectionIndex === -1 || maxVisibleArea === 0) {
      console.log('⚠️ No section detected, defaulting to home');
      currentSectionIndex = 0; // Start from home (first in ordered sections)
    }

    console.log('🎯 Current section detected:', {
      currentSectionIndex,
      currentSection: orderedSections[currentSectionIndex]?.id,
      maxVisibleArea
    });

    let nextSectionIndex;
    
    if (currentSectionIndex === orderedSections.length - 1) {
      nextSectionIndex = 0;
    } else if (currentSectionIndex === -1) {
      nextSectionIndex = 1;
    } else {
      nextSectionIndex = currentSectionIndex + 1;
    }
    
    const nextSection = orderedSections[nextSectionIndex];
    
    console.log('➡️ Next section:', {
      nextSectionIndex,
      nextSectionId: nextSection?.id,
      nextSectionExists: !!nextSection
    });
    
    smoothScrollToSection(nextSection);
  };

  return (
    <>
      <ScrollSpyNav />

      <div className="rocket-wrapper">
        <img
          src="https://img.icons8.com/?size=100&id=64347&format=png&color=000000"
          alt="rocket scroll"
          className={`rocket ${isScrolling ? 'scrolling' : ''}`}
          onClick={scrollBetweenSections}
          style={{ 
            opacity: isScrolling ? 0.6 : 1,
            cursor: isScrolling ? 'wait' : 'pointer',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none',
            touchAction: 'manipulation' // Prevent touch delays and enable click on mobile
          }}
        />
        <div className="scroll-indicator">
          {isScrolling ? '🚀 Traveling...' : '🚀 Explore the Universe'}
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