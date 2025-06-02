// src/components/sections/Portfolio/EnlargedPhoto.jsx
import React from 'react'; // Import React if you're using JSX
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

// This component now receives the full photo object and an onClose handler
export default function EnlargedPhoto({ photo, onClose, onNavigate }) { // Added onNavigate prop

  // --- Console logs for debugging ---
  console.log('--- EnlargedPhoto: Component Render ---');
  console.log('--- EnlargedPhoto: Received photo prop:', photo);
  console.log('--- EnlargedPhoto: Received onClose prop:', onClose);
  console.log('--- EnlargedPhoto: Received onNavigate prop:', onNavigate); // New prop
  console.log('--- EnglargedPhoto: Portfolio Title:', photo?.itemTitle);

  // No more internal data fetching or state for all portfolio items
  // No more useParams, useLocation, useNavigate here.

  // Determine the image URL for the enlarged view
  // Prioritize 'large' format, then fallback to original 'url'
  const enlargedImageUrl = photo?.formats?.large?.url || photo?.url;
  const enlargedAltText = photo?.alternativeText || photo?.name || "Enlarged Portfolio Photo";
  const portfolioTitle = photo?.itemTitle || "Untitled Portfolio Item"; // Use title from the portfolio item

  console.log('--- EnlargedPhoto: Derived Image URL:', enlargedImageUrl);
  console.log('--- EnlargedPhoto: Derived Alt Text:', enlargedAltText);

  // Basic validation before rendering the image
  if (!photo || !enlargedImageUrl) {
    console.error('--- EnlargedPhoto: Missing photo object or image URL ---');
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 text-white">
        <div className="text-center">
          <p>Error: Could not load enlarged photo. Missing image data.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose} // Clicking overlay closes modal
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content inside modal
      >
        {/* Close Button */}
        <button
          onClick={onClose} // Uses the onClose prop directly
          className="absolute -top-12 right-0 text-white text-2xl" // Adjust position as needed
          aria-label="Close enlarged photo"
        >
          ✕
        </button>

        {/* Previous Button (Only if onNavigate is provided) */}
        {onNavigate && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white text-4xl hover:bg-gray-700/50 rounded-full z-10"
            aria-label="Previous photo"
          >
            <MdOutlineArrowBackIosNew />
          </button>
        )}

        {/* Image Display */}
        <img
          src={enlargedImageUrl}
          alt={enlargedAltText}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
          // Optional: Add onError for broken images, but you should rarely see this with good data
          onError={(e) => {
            console.error('EnlargedPhoto: Failed to load image:', enlargedImageUrl);
            e.target.src = '/path/to/placeholder-image.png'; // Fallback image
          }}
        />

        {/* Next Button (Only if onNavigate is provided) */}
        {onNavigate && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white text-4xl hover:bg-gray-700/50 rounded-full z-10"
            aria-label="Next photo"
          >
            <MdOutlineArrowForwardIos />
          </button>
        )}

        {/* Title/Description Overlay */}
        {portfolioTitle && portfolioTitle !== "Untitled Portfolio Item" && ( // Display the title from the portfolio item
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-center px-4 py-2 rounded-lg text-sm">
            {portfolioTitle}
          </div>
        )}
      </div>
    </div>
  );
}