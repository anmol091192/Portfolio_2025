// Preload background images for better performance
const backgroundImages = [
  '/assets/images/background/pillars-of-creation.png',
  '/assets/images/background/cosmic-cliffs-carina-nebula.png',
  '/assets/images/background/herbig-haro-211.jpg',
  '/assets/images/background/cats-paw-nebula.jpg',
  '/assets/images/background/spiral-galaxy-ngc-4254.png',
  '/assets/images/background/ring-nebula.png'
];

// Preload function
const preloadImages = () => {
  return Promise.all(
    backgroundImages.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    })
  );
};

// Export for use in React components
export default preloadImages;
