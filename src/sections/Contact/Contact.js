import React, { useState } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import { getSectionData } from '../../data/usePortfolioData';

const Contact = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: 5,
    review: ''
  });

  // Get contact data from centralized JSON
  const contactData = getSectionData('contact');

  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can integrate with email service or backend here
    alert(contactData.sections.form.successMessage);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      rating: 5,
      review: ''
    });
  };

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${contactData.backgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <section 
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
      >
        <img 
          src="https://img.icons8.com/ios-filled/50/ffffff/telescope.png" 
          alt="info" 
          className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" 
        />
      </button>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 via-white to-cosmic-purple-200">
            {contactData.title}
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400 mx-auto mb-3 sm:mb-4 rounded-full"></div>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            {contactData.subtitle}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 flex-1 items-start">
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
              <a href="mailto:anmol09k@gmail.com" className="text-space-blue-300 hover:text-white transition-colors text-sm break-all">
                anmol09k@gmail.com
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
          </div>

          {/* Middle Column - Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-space-blue-900/30 to-cosmic-purple-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 h-full flex flex-col">
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
                className="w-full bg-gradient-to-r from-space-blue-600 to-cosmic-purple-600 hover:from-space-blue-500 hover:to-cosmic-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column - Quick Review/Rating */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-space-blue-900/30 to-cosmic-purple-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 h-full flex flex-col">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Quick Review</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm mb-2">Rate your experience</label>
                  <div className="flex space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className={`text-2xl transition-colors ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1 mb-4">
                  <textarea
                    name="review"
                    placeholder="Leave a quick review..."
                    value={formData.review}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full h-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                >
                  Submit Review
                </button>
              </form>
            </div>
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