// src/components/sections/Portfolio/EnlargedPhoto.jsx
import { useNavigate, useLocation } from 'react-router-dom'; // Make sure useLocation is imported!
import { useState, useEffect, useCallback } from 'react';
import { fetchPortfolio } from '../../../api/fetchPortfolio';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

export default function EnlargedPhoto({ photoIdProp }) {
  const photoId = photoIdProp;
  const navigate = useNavigate();
  const location = useLocation(); // Make sure this is present!

  const [allPortfolioItems, setAllPortfolioItems] = useState([]);
  const [portfolioItem, setPortfolioItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch all portfolio data (only once)
  useEffect(() => {
    const loadAllData = async () => {
      try {
        console.log('--- EnlargedPhoto: Fetching ALL portfolio items for navigation ---');
        const items = await fetchPortfolio(); // This uses your now-working fetchPortfolio
        setAllPortfolioItems(items);
        console.log('--- EnlargedPhoto: All portfolio items loaded:', items); // Check this log carefully
      } catch (err) {
        console.error('--- EnlargedPhoto: Error loading all portfolio items:', err);
        setError("Failed to load all portfolio items.");
      }
    };
    loadAllData();
  }, []);

  // Effect to find and set the current portfolio item based on photoId
  useEffect(() => {
    console.log('--- EnlargedPhoto: useEffect for photoId and allPortfolioItems triggered ---');
    console.log('--- EnlargedPhoto: current photoIdProp:', photoIdProp);
    console.log('--- EnlargedPhoto: allPortfolioItems length:', allPortfolioItems.length);

    if (!photoIdProp || allPortfolioItems.length === 0) {
      setLoading(true);
      return;
    }

    setLoading(true);
    setError(null);

    // Extract numerical ID: "testimage1-2" -> "2"
    // The photoIdProp is "testimage3-6" based on your JSON snippet.
    const numericalId = photoIdProp.split('-').pop();
    console.log('--- EnlargedPhoto: Extracted Numerical ID:', numericalId);

    // Find the item
    const foundItem = allPortfolioItems.find(item => String(item.id) === numericalId);

    console.log('--- EnlargedPhoto: Found current item:', foundItem); // CRITICAL: Check if this is null/undefined

    if (foundItem && foundItem.images && foundItem.images.length > 0) {
      setPortfolioItem(foundItem);
      console.log('--- EnlargedPhoto: Successfully set portfolioItem:', foundItem);
    } else {
      setError("Enlarged portfolio item or its images not found for this ID.");
      setPortfolioItem(null); // Explicitly set to null if not found
      console.warn('--- EnlargedPhoto: Item not found or no images for ID:', photoIdProp, foundItem);
    }
    setLoading(false);
  }, [photoIdProp, allPortfolioItems]); // Re-run if photoId changes or allPortfolioItems are loaded

  // Memoized function for navigation (ensure 'location' is in dependencies)
  const navigateToPhoto = useCallback((direction) => {
    if (allPortfolioItems.length === 0 || !portfolioItem) return;

    const currentIndex = allPortfolioItems.findIndex(item => item.id === portfolioItem.id);
    let newIndex = currentIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % allPortfolioItems.length;
    } else if (direction === 'prev') {
      newIndex = (currentIndex - 1 + allPortfolioItems.length) % allPortfolioItems.length;
    }

    const nextPhoto = allPortfolioItems[newIndex];
    if (nextPhoto) {
      // Ensure the background state is correctly passed
      navigate(`/portfolio/${nextPhoto.slug}-${nextPhoto.id}`, {
        replace: true,
        state: { background: location.state?.background || location }
      });
    }
  }, [allPortfolioItems, portfolioItem, navigate, location]); // location is a dependency

  // The close button also needs to consider the 'background' location
  const handleCloseModal = useCallback(() => {
    if (location.state?.background) {
      navigate(location.state.background, { replace: true });
    } else {
      navigate('/portfolio', { replace: true });
    }
  }, [navigate, location]); // Added location to dependency array

  // Render logic
  if (loading) return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 text-white">
      Loading photo...
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 text-white">
      <div className="text-center">
        <p>Error: {error}</p>
        <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Close</button>
      </div>
    </div>
  );

  if (!portfolioItem) return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 text-white">
      <div className="text-center">
        <p>Enlarged portfolio item not found.</p>
        <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">Close</button>
      </div>
    </div>
  );

  const mainImage = portfolioItem.images?.[0]; // Use optional chaining for safety
  const enlargedImageUrl = mainImage?.url; // Directly use mainImage.url from your new structure
  const enlargedAltText = mainImage?.alternativeText || mainImage?.name || portfolioItem.title || "Enlarged portfolio photo";

  console.log('--- EnlargedPhoto: Final Image URL to display: ---', enlargedImageUrl);
  console.log('--- EnlargedPhoto: Alt Text:', enlargedAltText);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={handleCloseModal}
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        <button
          onClick={(e) => { e.stopPropagation(); navigateToPhoto('prev'); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white text-4xl hover:bg-gray-700/50 rounded-full z-10"
          aria-label="Previous photo"
        >
          <MdOutlineArrowBackIosNew />
        </button>

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCloseModal();
          }}
          className="absolute -top-12 right-0 text-white text-2xl"
          aria-label="Close enlarged photo"
        >
          ✕
        </button>

        {/* Image */}
        {enlargedImageUrl ? (
          <img
            src={enlargedImageUrl}
            alt={enlargedAltText}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-700 text-white rounded-lg">
            No enlarged image URL found for this item.
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={(e) => { e.stopPropagation(); navigateToPhoto('next'); }}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white text-4xl hover:bg-gray-700/50 rounded-full z-10"
          aria-label="Next photo"
        >
          <MdOutlineArrowForwardIos />
        </button>

        {/* Optional: Add title/description overlay if needed */}
        {portfolioItem.title && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-center px-4 py-2 rounded-lg text-sm">
            {portfolioItem.title}
          </div>
        )}
      </div>
    </div>
  );
}