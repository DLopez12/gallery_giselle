// components/Portfolio/PortfolioItem.jsx

import PropTypes from 'prop-types'; // Type checking

/**
 * Individual portfolio card component
 * - Handles image display
 * - Implements hover effects
 * - Manages accessibility
 */
const PortfolioItem = ({ photo }) => {
  // Don't render if no image URL
  if (!photo.imageUrl) return null;

  return (
    <div className="group relative overflow-hidden rounded-lg aspect-square">
      {/* Lazy-loaded image with dimensions */}
      <img
        src={`${import.meta.env.VITE_API_URL}${photo.imageUrl}`} // Full URL
        alt={photo.altText} // Required for accessibility
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy" // Defer offscreen images
        width={photo.width} // Prevent layout shifts
        height={photo.height}
      />
      
      {/* Hover overlay animation */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"
        aria-hidden="true" // Decorative element
      />
      
      {/* Title slide-up animation */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
        aria-hidden="true" // Text duplicated in link label
      >
        <h3 className="text-white font-medium truncate">{photo.title}</h3>
      </div>
    </div>
  );
};

// Type validation - catches missing props in development
PortfolioItem.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    altText: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired
};

export default PortfolioItem;