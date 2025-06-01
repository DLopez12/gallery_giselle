// components/sections/Portfolio/PortfolioItem.jsx

// 'photo' prop is now an image object from the Strapi response (e.g., { id, url, alt, thumbnail, medium, large })
// 'title' prop is the portfolio item's title, passed for the overlay text
const PortfolioItem = ({ photo, title }) => {
  
  // Debugging console logs to trace the props and computed values
  // --- ADD THESE CONSOLE.LOGS ---
  console.log('--- PortfolioItem Render Debug ---');
  console.log('Received photo prop:', photo);
  console.log('Received title prop:', title);

  const imageUrl = photo.medium?.url || photo.url;
  console.log('Calculated imageUrl:', imageUrl);

  const altText = photo.alternativeText || photo.name || title;
  console.log('Calculated altText:', altText);
  // --- END OF CONSOLE.LOGS ---

  if (!imageUrl) {
    console.warn('Missing image URL for photo ID:', photo.id || 'unknown');
    return null; // Don't render if no image URL is available
  }

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg group">
      <img
        src={imageUrl}
        alt={altText}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          console.error('Failed to load image:', imageUrl);
          e.target.style.display = 'none'; // Hide the broken image icon
          // Optional: You can set a fallback image here:
          // e.target.src = '/path/to/placeholder-image.png';
          // e.target.style.display = 'block';
        }}
      />
      {title && ( // Display the title in an overlay if available
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
          {title}
        </div>
      )}
    </div>
  );
};

export default PortfolioItem;