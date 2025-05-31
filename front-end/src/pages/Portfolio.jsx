// pages/Portfolio.jsx

import { useState, useEffect } from 'react'; // State management
import { Link, useLocation } from 'react-router-dom'; // Routing
import PortfolioItem from '../components/sections/Portfolio/PortfolioItem.jsx'; // UI Component
import { fetchPortfolio } from '../api/fetchPortfolio'; // Data fetching

// Remove: const STRAPI_URL = import.meta.env.VITE_API_URL; // This is not needed here as fetchPortfolio handles it

export default function Portfolio() {
  // State management
  const [photos, setPhotos] = useState([]); // Stores formatted portfolio data
  const [loading, setLoading] = useState(true); // Loading state toggle
  const [error, setError] = useState(null); // Error state
  const location = useLocation(); // Used for modal routing state

  // Data fetching effect - runs once on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Fetching portfolio data...');
        // fetchPortfolio already returns data with absolute image URLs
        const portfolioData = await fetchPortfolio();

        console.log('API Response (after fetchPortfolio):', portfolioData);

        if (portfolioData.length > 0) {
          // No need for URL transformation here, fetchPortfolio already did it.
          setPhotos(portfolioData); // Directly set the data
          console.log('Processed Data (same as API Response from fetchPortfolio):', portfolioData);
        } else {
          setError("No portfolio items found");
        }
      } catch (err) {
        console.error('Error:', err);
        setError("Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Error state UI
  if (error) return (
    <div className="container mx-auto py-12 text-center">
      <h2 className="text-red-500">{error}</h2>
      <button
        onClick={() => window.location.reload()} // Simple retry
        className="mt-4 px-4 py-2 bg-brand-primary text-white rounded hover:bg-opacity-90 transition"
        aria-label="Retry loading portfolio"
      >
        Retry
      </button>
    </div>
  );

  // Main render - responsive grid layout
  return (
    <div className="container mx-auto py-12 px-4 pt-20 md:pt-12">
      <h1 className="text-3xl font-display mb-8 p-2">Portfolio</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((item) => ( // Renamed 'photo' to 'item' for clarity, as 'photo' in PortfolioItem is one image
          <Link
            key={item.id}
            to={`/portfolio/${item.slug}-${item.id}`}
            state={{ background: location }} // Preserves scroll position
            aria-label={`View ${item.title}`} // Screen reader context
          >
            {item.images && item.images.length > 0 ? ( // Check if there are images
              <PortfolioItem
                photo={item.images[0]} // Pass the first image object directly (it has url, medium, alt, etc.)
                title={item.title}    // Pass the portfolio item title for the overlay
              />
            ) : (
              // Fallback if no images are present for a portfolio item
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
                    {item.title}
                  </div>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}