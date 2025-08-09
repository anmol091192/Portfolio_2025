import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import { getSectionData } from '../../data/usePortfolioData';
// import { emailjsConfig } from '../../config/emailjs';

const Contact = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Get contact data from centralized JSON
  const contactData = getSectionData('contact');

  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate parallax effect only when section is visible
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
          // Calculate the scroll progress through this section
          const scrollProgress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
          setScrollY(scrollProgress * 100); // Adjust multiplier for effect intensity
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    try {
      // Show loading state
      const submitButton = e.target.querySelector('button[type="submit"]');
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // EmailJS Configuration
      const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'anmolk0992@gmail.com',
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email
      };
      
      // Send email using EmailJS
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      // Success
      alert(contactData.sections.form.successMessage);
      
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Fallback: mailto link for direct email
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}`
      );
      const mailtoLink = `mailto:anmolk0992@gmail.com?subject=${subject}&body=${body}`;
      
      if (window.confirm('Unable to send email automatically. Would you like to open your email client instead?')) {
        window.location.href = mailtoLink;
      } else {
        alert('Please try again later or contact me directly at anmolk0992@gmail.com');
      }
      
    } finally {
      // Reset button state
      const submitButton = e.target.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
      }
    }
  };

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${contactData.backgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed' // This makes the background stay relatively fixed
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative h-screen flex flex-col justify-center items-center text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-12 w-full overflow-hidden"
      style={sectionStyle}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>
      
      {/* Info Button */}
      <button 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 sm:p-3 bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 backdrop-blur-sm rounded-full hover:from-space-blue-500/40 hover:to-cosmic-purple-500/40 transition-all duration-300 border border-white/20 hover:border-white/40 group" 
        onClick={handleInfoClick}
        style={{
          transform: `translateY(${scrollY * 0.3}px)` // Subtle movement for button
        }}
      >
        <img 
          src="https://img.icons8.com/ios-filled/50/ffffff/telescope.png" 
          alt="info" 
          className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" 
        />
      </button>

      {/* Content Container */}
      <div 
        className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col"
        style={{
          transform: `translateY(${scrollY * 0.5}px)` // Content moves faster than background
        }}
      >
        {/* Section Header */}
        <div className="text-center mx-auto mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 via-white to-cosmic-purple-200">
            {contactData.title}
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400 mx-auto mb-3 sm:mb-4 rounded-full"></div>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            {contactData.subtitle}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 flex-1 items-start">
          {/* Left Column - Contact Info & Social */}
          <div className="lg:col-span-1 space-y-4">
            {/* Direct Contact */}
            <div className="bg-gradient-to-br from-space-blue-900/30 to-cosmic-purple-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-space-blue-500 to-cosmic-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
              </div>
              <a href="mailto:anmolk0992@gmail.com" className="text-space-blue-300 hover:text-white transition-colors text-sm break-all">
                anmolk0992@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-space-blue-900/30 to-cosmic-purple-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Connect</h3>
              </div>
              <div className="flex space-x-3">
                <a href={contactData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-2 px-3 rounded-lg transition-all duration-300 text-center text-sm">
                  LinkedIn
                </a>
                <a href={contactData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-2 px-3 rounded-lg transition-all duration-300 text-center text-sm">
                  GitHub
                </a>
              </div>
            </div>

            {/* Resume Download */}
            <div className="bg-gradient-to-br from-space-blue-900/30 to-cosmic-purple-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Resume</h3>
              </div>
              <button 
                onClick={() => {
                  // Create a download link for the resume
                  const link = document.createElement('a');
                  link.href = '/assets/resume/Anmol_Khandekar_Resume.pdf';
                  link.download = 'Anmol_Khandekar_Resume.pdf';
                  link.click();
                }}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-2 px-3 rounded-lg transition-all duration-300 text-center text-sm font-medium flex items-center justify-center space-x-2 group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Middle Column - Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleContactSubmit} className="bg-gradient-to-br from-space-blue-900/30 to-cosmic-purple-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 h-full flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-4 text-center lg:text-left">{contactData.sections.form.title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-space-blue-400 focus:ring-1 focus:ring-space-blue-400 transition-all text-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-space-blue-400 focus:ring-1 focus:ring-space-blue-400 transition-all text-sm"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-space-blue-400 focus:ring-1 focus:ring-space-blue-400 transition-all text-sm"
                />
              </div>
              
              <div className="flex-1 mb-4">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full h-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-space-blue-400 focus:ring-1 focus:ring-space-blue-400 transition-all text-sm resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-space-blue-600 to-cosmic-purple-600 hover:from-space-blue-500 hover:to-cosmic-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base flex items-center justify-center space-x-2 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Overlay Component */}
      {showOverlay && (
        <ImageInfoOverlay
          title={contactData.imageOverlay.title}
          description={contactData.imageOverlay.description}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Contact;