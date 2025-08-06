import React, { useState } from 'react';

const CertificationCard = ({ 
  name, 
  issuer, 
  issueDate, 
  expiryDate,
  credentialId,
  credentialUrl,
  skills,
  description,
  logoUrl,
  verified = true
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const isActive = () => {
    if (!expiryDate) return true;
    return new Date(expiryDate) > new Date();
  };

  return (
    <div className="group bg-gradient-to-br from-space-blue-900/30 to-cosmic-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-space-blue-500/20 hover:scale-105">
      {/* Header with Logo and Verification Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Certification Logo */}
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
            {!imageError && logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${issuer} logo`}
                className="w-10 h-10 object-contain"
                onError={handleImageError}
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-space-blue-400 to-cosmic-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {issuer.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          {/* Verification Badge */}
          {verified && (
            <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-400/30">
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-400 text-xs font-medium">Verified</span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isActive() 
            ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
            : 'bg-red-500/20 text-red-400 border border-red-400/30'
        }`}>
          {isActive() ? 'Active' : 'Expired'}
        </div>
      </div>

      {/* Certification Name and Issuer */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 to-cosmic-purple-200 mb-1 group-hover:from-white group-hover:to-white transition-all duration-300">
          {name}
        </h3>
        <p className="text-space-blue-300 text-sm font-medium">
          {issuer}
        </p>
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {description}
        </p>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-space-blue-200 mb-2 uppercase tracking-wider">Skills Demonstrated</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 text-xs text-white rounded-full border border-white/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dates and Credential Info */}
      <div className="space-y-2 mb-4 text-xs text-gray-400">
        <div className="flex justify-between">
          <span>Issued:</span>
          <span className="text-white">{formatDate(issueDate)}</span>
        </div>
        {expiryDate && (
          <div className="flex justify-between">
            <span>Expires:</span>
            <span className="text-white">{formatDate(expiryDate)}</span>
          </div>
        )}
        {credentialId && (
          <div className="flex justify-between">
            <span>Credential ID:</span>
            <span className="text-white font-mono text-xs">{credentialId}</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      {credentialUrl && (
        <div className="mt-auto">
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-space-blue-600 to-cosmic-purple-600 text-white text-sm font-medium rounded-lg hover:from-space-blue-500 hover:to-cosmic-purple-500 transition-all duration-300 group-hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Credential
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificationCard;
