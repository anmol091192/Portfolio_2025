// EmailJS Configuration
// Create this file to store your EmailJS credentials securely

export const emailjsConfig = {
  // Replace these with your actual EmailJS credentials
  SERVICE_ID: 'YOUR_SERVICE_ID',      // e.g., 'service_xyz123'
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',    // e.g., 'template_abc789'
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY'       // e.g., 'user_def456'
};

// For production, use environment variables:
// export const emailjsConfig = {
//   SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
//   TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
//   PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
// };
