// src/components/sections/Portfolio/EnlargedPhoto.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { fetchPortfolio } from '../../../api/fetchPortfolio'; // Adjust path if necessary
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'; // For the arrows

export default function EnlargedPhoto() {
  const { photoId } = useParams(); // This will be "testimage1-2", "testimage2-4", etc.
  const navigate = useNavigate();

  const [allPortfolioItems, setAllPortfolioItems] = useState([]); // Store all items
  const [portfolioItem, setPortfolioItem] = useState(null); // The currently displayed item
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch all portfolio data (only once)
  useEffect(() => {
    const loadAllData = async () => {
      try {
        console.log('--- EnlargedPhoto: Fetching ALL portfolio items for navigation ---');
        const items = await fetchPortfolio();
        setAllPortfolioItems(items);
        console.log('--- EnlargedPhoto: All portfolio items loaded:', items);
      } catch (err) {
        console.error('--- EnlargedPhoto: Error loading all portfolio items:', err);
        // Don't set a critical error here, as the current item might still load
      }
    };
    loadAllData();
  }, []); // Empty dependency array means this runs only once on mount

  // Effect to find and set the current portfolio item based on photoId
  useEffect(() => {
    if (allPortfolioItems.length === 0) {
      // If all items haven't loaded yet, do nothing for this effect
      return;
    }

    setLoading(true); // Indicate loading state for the current item
    setError(null); // Clear previous errors

    // Extract the numerical ID from the photoId parameter
    const numericalId = photoId.split('-').pop();
    console.log('--- EnlargedPhoto: Current URL parameter photoId:', photoId, 'Extracted Numerical ID:', numericalId);

    const foundItem = allPortfolioItems.find(item => String(item.id) === numericalId);

    console.log('--- EnlargedPhoto: Found current item:', foundItem);

    if (foundItem && foundItem.images && foundItem.images.length > 0) {
      setPortfolioItem(foundItem);
    } else {
      setError("Enlarged portfolio item or its images not found for this ID.");
      setPortfolioItem(null); // Ensure no stale item is displayed
    }
    setLoading(false);
  }, [photoId, allPortfolioItems]); // Re-run if photoId changes or allPortfolioItems are loaded

  // Memoized function for navigation
  const navigateToPhoto = useCallback((direction) => {
    if (allPortfolioItems.length === 0 || !portfolioItem) return;

    const currentIndex = allPortfolioItems.findIndex(item => item.id === portfolioItem.id);
    let newIndex = currentIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % allPortfolioItems.length; // Loop back to start
    } else if (direction === 'prev') {
      newIndex = (currentIndex - 1 + allPortfolioItems.length) % allPortfolioItems.length; // Loop back to end
    }

    const nextPhoto = allPortfolioItems[newIndex];
    if (nextPhoto) {
      navigate(`/portfolio/${nextPhoto.slug}-${nextPhoto.id}`, { replace: true }); // Use replace to avoid stacking history
    }
  }, [allPortfolioItems, portfolioItem, navigate]);

  // --- Render logic for EnlargedPhoto ---

  // Loading, error, and no item states
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 text-white">
        Loading enlarged photo...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 text-red-500 text-center">
        {error}
        <button onClick={() => navigate('/portfolio')} className="absolute top-4 right-4 text-white text-2xl">✕</button>
      </div>
    );
  }

  if (!portfolioItem || !portfolioItem.images || portfolioItem.images.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 text-white">
        No image data found for this portfolio item.
        <button onClick={() => navigate('/portfolio')} className="absolute top-4 right-4 text-white text-2xl">✕</button>
      </div>
    );
  }

  const mainImage = portfolioItem.images[0];
  const enlargedImageUrl = mainImage.formats?.large?.url || mainImage.formats?.medium?.url || mainImage.url;
  const enlargedAltText = mainImage.alternativeText || mainImage.name || portfolioItem.title || "Enlarged portfolio photo";

  console.log('--- EnlargedPhoto: Final Image URL to display: ---', enlargedImageUrl);
  console.log('--- EnlargedPhoto: Alt Text:', enlargedAltText);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={() => navigate('/portfolio')} // Close on click outside image area
    >
      <div className="relative max-w-6xl w-full h-[90vh] flex items-center justify-center"
           onClick={(e) => e.stopPropagation()}> {/* Prevent modal close when clicking inside this div */}

        {/* Previous Button */}
        <button
          onClick={(e) => { e.stopPropagation(); navigateToPhoto('prev'); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white text-4xl hover:bg-gray-700/50 rounded-full z-10" // Hide on small screens if desired
          aria-label="Previous photo"
        >
          <MdOutlineArrowBackIosNew />
        </button>

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent modal close from button click
            navigate('/portfolio');
          }}
          className="absolute -top-12 right-0 text-white text-2xl"
          aria-label="Close enlarged photo"
        >
          ✕
        </button>

        {/* The Image */}
        {enlargedImageUrl ? (
          <img
            src={enlargedImageUrl}
            className="max-h-[90vh] max-w-[90vw] mx-auto object-contain" // Constrain width too
            alt={enlargedAltText}
            onClick={(e) => e.stopPropagation()} // Prevent modal close from image click
            onError={(e) => {
              console.error('--- EnlargedPhoto: Failed to load image:', enlargedImageUrl, e);
              e.target.style.display = 'none';
              setError("Failed to load enlarged image.");
            }}
          />
        ) : (
          <div className="text-white text-center">No enlarged image URL found for this item.</div>
        )}

        {/* Next Button */}
        <button
          onClick={(e) => { e.stopPropagation(); navigateToPhoto('next'); }}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white text-4xl hover:bg-gray-700/50 rounded-full z-10 hidden md:block" // Hide on small screens if desired
          aria-label="Next photo"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>

      {/* Optional: Display title or alt text below image */}
      {enlargedAltText && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center p-2 bg-black/50 rounded z-20">
          {enlargedAltText}
        </p>
      )}
    </div>
  );
}