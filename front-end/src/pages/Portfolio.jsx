// pages/Portfolio.jsx

import { useState, useEffect } from 'react'; // State management
import { Link, useLocation } from 'react-router-dom'; // Routing
import PortfolioItem from '../components/sections/Portfolio/PortfolioItem'; // UI Component
import { fetchPortfolio } from '../api/fetchPortfolio'; // Data fetching

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
        const portfolioData = await fetchPortfolio();
        
        // Only update if we got valid data (not empty array from error)
        if (portfolioData.length > 0) {
          setPhotos(portfolioData);
        } else {
          setError("No portfolio items found"); // Custom error message
        }
      } catch (err) {
        setError("Failed to load portfolio"); // API error message
      } finally {
        setLoading(false); // Always disable loading
      }
    };
    
    loadData();
  }, []); // Empty dependency array = runs once on mount

  // Loading state UI
  if (loading) return (
    <div className="flex justify-center py-20">
      {/* Accessibility-friendly spinner */}
      <div 
        className="animate-spin h-10 w-10 border-4 border-brand-primary rounded-full border-t-transparent" 
        aria-label="Loading portfolio..."
      />
    </div>
  );

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
        {photos.map((photo) => (
          <Link 
            key={photo.id}
            to={`/portfolio/${photo.slug}-${photo.id}`}
            state={{ background: location }} // Preserves scroll position
            aria-label={`View ${photo.title}`} // Screen reader context
          >
            <PortfolioItem 
              photo={{
                ...photo, // Spread all photo data
                imageUrl: photo.images[0]?.url, // Primary image
                altText: photo.images[0]?.alt || photo.title // Fallback alt
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}