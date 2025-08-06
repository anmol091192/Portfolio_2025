import portfolioData from './portfolioContent.json';

/**
 * Custom hook to get portfolio content data
 * @returns {Object} Portfolio content data
 */
export const usePortfolioData = () => {
  return portfolioData;
};

/**
 * Get specific section data
 * @param {string} section - Section name (home, about, experience, etc.)
 * @returns {Object} Section data
 */
export const getSectionData = (section) => {
  return portfolioData[section] || {};
};

/**
 * Get personal information
 * @returns {Object} Personal information
 */
export const getPersonalInfo = () => {
  return portfolioData.personal || {};
};

/**
 * Get navigation data
 * @returns {Object} Navigation configuration
 */
export const getNavigationData = () => {
  return portfolioData.navigation || {};
};

/**
 * Get UI text and labels
 * @returns {Object} UI text configuration
 */
export const getUIText = () => {
  return portfolioData.ui || {};
};

/**
 * Calculate certificate statistics
 * @returns {Object} Certificate statistics
 */
export const getCertificateStats = () => {
  const certifications = portfolioData.certificates?.certifications || [];
  
  return {
    total: certifications.length,
    active: certifications.filter(cert => 
      !cert.expiryDate || new Date(cert.expiryDate) > new Date()
    ).length,
    recentlyEarned: certifications.filter(cert => {
      const issueDate = new Date(cert.issueDate);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return issueDate > oneYearAgo;
    }).length
  };
};

export default portfolioData;
