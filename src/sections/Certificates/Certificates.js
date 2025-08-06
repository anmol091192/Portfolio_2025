import React, { useState } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import CertificationCard from '../../components/CertificationCard/CertificationCard';

const Certifications = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://stsci-opo.org/STScI-01HMBZMMFW050HSEVKPN5E6S5W.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  // Certifications data - Update with your actual certifications
  const certifications = [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      issueDate: "2024-01-15",
      expiryDate: "2027-01-15",
      credentialId: "AWS-ASA-123456789",
      credentialUrl: "https://aws.amazon.com/verification",
      skills: ["AWS Architecture", "Cloud Computing", "S3", "EC2", "VPC", "Lambda", "RDS"],
      description: "Validates expertise in designing distributed systems on AWS platform with best practices for security, reliability, and cost optimization.",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      verified: true
    },
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services (AWS)",
      issueDate: "2023-09-20",
      expiryDate: "2026-09-20",
      credentialId: "AWS-DEV-987654321",
      credentialUrl: "https://aws.amazon.com/verification",
      skills: ["AWS SDK", "DynamoDB", "Lambda", "API Gateway", "CloudFormation", "CodePipeline"],
      description: "Demonstrates proficiency in developing and maintaining applications on the AWS platform using various AWS services and best practices.",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      verified: true
    },
    {
      name: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      issueDate: "2023-06-10",
      expiryDate: "2025-06-10",
      credentialId: "GCP-PDE-456789123",
      credentialUrl: "https://cloud.google.com/certification",
      skills: ["BigQuery", "Dataflow", "Pub/Sub", "Machine Learning", "Data Pipeline", "Apache Beam"],
      description: "Validates ability to design, build, and manage data processing systems and machine learning models on Google Cloud Platform.",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
      verified: true
    },
    {
      name: "Microsoft Azure AI Engineer Associate",
      issuer: "Microsoft",
      issueDate: "2023-03-15",
      expiryDate: "2024-03-15",
      credentialId: "MS-AI-789123456",
      credentialUrl: "https://docs.microsoft.com/learn/certifications",
      skills: ["Azure Cognitive Services", "Machine Learning", "Bot Framework", "Computer Vision", "NLP"],
      description: "Demonstrates skills in designing and implementing AI solutions using Azure Cognitive Services and Azure Machine Learning.",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      verified: true
    },
    {
      name: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      issueDate: "2022-11-20",
      expiryDate: null,
      credentialId: "MONGO-DEV-321654987",
      credentialUrl: "https://university.mongodb.com/certification",
      skills: ["MongoDB", "NoSQL", "Aggregation Pipeline", "Indexing", "Replication", "Sharding"],
      description: "Validates expertise in MongoDB database design, development, and optimization for modern applications.",
      logoUrl: "https://upload.wikimedia.org/wikipedia/en/4/45/MongoDB-Logo.svg",
      verified: true
    },
  ];

  const stats = {
    total: certifications.length,
    active: certifications.filter(cert => !cert.expiryDate || new Date(cert.expiryDate) > new Date()).length,
    recentlyEarned: certifications.filter(cert => {
      const issueDate = new Date(cert.issueDate);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return issueDate > oneYearAgo;
    }).length
  };

  // Carousel functionality
  const getCardsPerSlide = () => {
    // Responsive: 1 card on mobile, 2 on tablet, 3 on desktop
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile (sm breakpoint)
      if (window.innerWidth < 1024) return 2; // Tablet (lg breakpoint)
    }
    return 3; // Desktop
  };

  const cardsPerSlide = getCardsPerSlide();
  const totalSlides = Math.ceil(certifications.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Handle window resize for responsive carousel
  React.useEffect(() => {
    const handleResize = () => {
      const newCardsPerSlide = getCardsPerSlide();
      const newTotalSlides = Math.ceil(certifications.length / newCardsPerSlide);
      if (currentSlide >= newTotalSlides) {
        setCurrentSlide(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide, certifications.length]);

  return (
    <section 
      id="certificates" 
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
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-2 sm:mb-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mx-auto mb-1 sm:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 via-white to-cosmic-purple-200">
            Certificates
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400 mx-auto mb-2 sm:mb-3 rounded-full"></div>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-2 sm:mb-3 px-4">
            Continuous learning and professional development through industry-recognized certifications
          </p>
          
          {/* Statistics */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-3 sm:mb-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400">
                {stats.total}
              </div>
              <div className="text-xs text-gray-400">Total Certs</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                {stats.active}
              </div>
              <div className="text-xs text-gray-400">Active</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {stats.recentlyEarned}
              </div>
              <div className="text-xs text-gray-400">Recent</div>
            </div>
          </div>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 backdrop-blur-sm rounded-full hover:from-space-blue-500/40 hover:to-cosmic-purple-500/40 transition-all duration-300 border border-white/20 hover:border-white/40 group"
                aria-label="Previous certificates"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 backdrop-blur-sm rounded-full hover:from-space-blue-500/40 hover:to-cosmic-purple-500/40 transition-all duration-300 border border-white/20 hover:border-white/40 group"
                aria-label="Next certificates"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Carousel Cards */}
          <div className="overflow-hidden rounded-xl max-h-96">
            <div 
              className={`flex transition-transform duration-500 ease-in-out gap-4 lg:gap-6 h-96`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className={`flex-none w-full grid gap-4 lg:gap-6 h-full ${
                    cardsPerSlide === 1 ? 'grid-cols-1' : 
                    cardsPerSlide === 2 ? 'grid-cols-1 sm:grid-cols-2' : 
                    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {certifications
                    .slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide)
                    .map((cert, cardIndex) => (
                      <div 
                        key={`${slideIndex}-${cardIndex}`}
                        className="animate-fade-in-up h-full"
                        style={{
                          animationDelay: `${cardIndex * 0.15}s`,
                          animationFillMode: 'both'
                        }}
                      >
                        <CertificationCard 
                          name={cert.name}
                          issuer={cert.issuer}
                          issueDate={cert.issueDate}
                          expiryDate={cert.expiryDate}
                          credentialId={cert.credentialId}
                          credentialUrl={cert.credentialUrl}
                          skills={cert.skills}
                          description={cert.description}
                          logoUrl={cert.logoUrl}
                          verified={cert.verified}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-2 space-x-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {totalSlides > 1 && (
          <div className="text-center mt-1">
            <span className="text-xs text-gray-400">
              {currentSlide + 1} of {totalSlides}
            </span>
          </div>
        )}


      </div>
      
      {/* Overlay Component */}
      {showOverlay && (
        <ImageInfoOverlay
          title="Face-on spiral galaxy, NGC 4254"
          description="This face-on spiral galaxy, NGC 4254, is revealed through a cosmic lens of contrast: one half glowing in infrared from the James Webb Space Telescope, the other captured in visible and ultraviolet by Hubble. Together, they expose an interplay of light and shadow — where dust obscures starlight in one view and radiates it in another."
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Certifications;