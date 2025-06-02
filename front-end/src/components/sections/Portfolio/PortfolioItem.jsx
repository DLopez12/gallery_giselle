// components/sections/Portfolio/PortfolioItem.jsx
import React from 'react'; // Ensure React is imported if you're using React.memo

// 'photo' prop is now an image object from the Strapi response (e.g., { id, url, alt, thumbnail, medium, large })
// 'title' prop is the portfolio item's title, passed for the overlay text
const PortfolioItem = ({ photo, title }) => {

  // Debugging console logs to trace the props and computed values
  console.log('--- PortfolioItem Render Debug ---');
  console.log('Received photo prop:', photo);
  console.log('Received title prop:', title);

  // Determine the URL of the image to load
  const imageUrl = photo?.formats?.thumbnail?.url ||
                   photo?.formats?.small?.url ||
                   photo?.formats?.medium?.url ||
                   photo?.url; // Fallback to the original URL if no formats are available
  console.log('Calculated imageUrl:', imageUrl);

  // --- CRITICAL CLS FIX: Get the width and height of the SPECIFIC format chosen for imageUrl ---
  let imageWidth, imageHeight;
  if (imageUrl === photo?.formats?.thumbnail?.url) {
      imageWidth = photo.formats.thumbnail.width;
      imageHeight = photo.formats.thumbnail.height;
  } else if (imageUrl === photo?.formats?.small?.url) {
      imageWidth = photo.formats.small.width;
      imageHeight = photo.formats.small.height;
  } else if (imageUrl === photo?.formats?.medium?.url) {
      imageWidth = photo.formats.medium.width;
      imageHeight = photo.formats.medium.height;
  } else {
      // Fallback to original dimensions if no specific format URL was used, or dimensions are missing
      // Provide a reasonable default for safety, but try to get actual dimensions from Strapi
      imageWidth = photo?.width || 232; // Default width
      imageHeight = photo?.height || 154; // Default height
  }

  // Fallback to defaults if dimensions are still not found (shouldn't happen with correct Strapi config)
  // imageWidth = imageWidth = selectedFormat?.width || photo?.width || 232;
  // imageHeight = imageHeight = selectedFormat?.height || photo?.height || 154;

  console.log('Calculated imageWidth:', imageWidth);
  console.log('Calculated imageHeight:', imageHeight);

  const altText = photo?.alternativeText || photo?.name || title || "Portfolio Image"; // Added default fallback for altText

  if (!photo || !imageUrl) { // Simplified check: if no photo data or URL, render placeholder
        console.warn('PortfolioItem: Missing photo object or image URL for photo ID:', photo?.id || 'unknown');
        return (
            <div
                className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center text-gray-500"
                // These inline styles help ensure the placeholder has an aspect ratio
                style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, aspectRatio: `<span class="math-inline">\{imageWidth\}/</span>{imageHeight}` }}
            >
                No Image
                {title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white text-sm truncate">
                        {title}
                    </div>
                )}
            </div>
        );
    }

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg group">
      <img
        src={imageUrl}
        alt={altText}
        width={imageWidth} // Set width for better CLS handling
        height={imageHeight} // Set height for better CLS handling
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 " 
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

export default React.memo(PortfolioItem); // Keep React.memo for optimization