// src/utils/preloadImages.js
export const preloadPortfolioImages = (imageUrls) => {
  imageUrls.forEach(url => {
    new Image().src = url;
  });
};