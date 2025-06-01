// src/components/sections/Portfolio/EnlargedPhoto.jsx
// Removed useParams import, now accept photoIdProp
import { useNavigate, useLocation } from 'react-router-dom'; // <--- ADD useLocation HERE
import { useState, useEffect, useCallback } from 'react';
import { fetchPortfolio } from '../../../api/fetchPortfolio';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

// Accept photoIdProp instead of using useParams
export default function EnlargedPhoto({ photoIdProp }) {
  // Use photoIdProp directly instead of getting from useParams
  const photoId = photoIdProp;
  const navigate = useNavigate();
  const location = useLocation(); // <--- Initialize useLocation here

  const [allPortfolioItems, setAllPortfolioItems] = useState([]);
  const [portfolioItem, setPortfolioItem] = useState(null);
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
      }
    };
    loadAllData();
  }, []);

  // Effect to find and set the current portfolio item based on photoId
  useEffect(() => {
    if (!photoId || allPortfolioItems.length === 0) {
      // If photoId is not yet available or all items haven't loaded, do nothing
      setLoading(true); // Keep loading true until photoId and data are ready
      return;
    }

    setLoading(true);
    setError(null);

    const numericalId = photoId.split('-').pop();
    console.log('--- EnlargedPhoto: Current URL parameter photoId:', photoId, 'Extracted Numerical ID:', numericalId);

    const foundItem = allPortfolioItems.find(item => String(item.id) === numericalId);

    console.log('--- EnlargedPhoto: Found current item:', foundItem);

    if (foundItem && foundItem.images && foundItem.images.length > 0) {
      setPortfolioItem(foundItem);
    } else {
      setError("Enlarged portfolio item or its images not found for this ID.");
      setPortfolioItem(null);
    }
    setLoading(false);
  }, [photoId, allPortfolioItems]); // Re-run if photoId changes or allPortfolioItems are loaded

  // Memoized function for navigation
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
      navigate(`/portfolio/${nextPhoto.slug}-${nextPhoto.id}`, {
        replace: true,
        // When navigating to the next/prev photo within the modal,
        // the background should remain the original portfolio page.
        // So we use the 'background' from the current location state.
        state: { background: location.state?.background || location } // Use background from state if available, else current location
      });
    }
  }, [allPortfolioItems, portfolioItem, navigate, location]); // location is a dependency

  // The close button also needs to consider the 'background' location
  const handleCloseModal = useCallback(() => {
    // If there's a background state, navigate back to it.
    // Otherwise, navigate to the base portfolio page.
    if (location.state?.background) {
      navigate(location.state.background, { replace: true });
    } else {
      navigate('/portfolio', { replace: true });
    }
  }, [navigate, location]); // Added location to dependency array

  // --- Render logic for EnlargedPhoto (remains mostly the same as before) ---
  // ... (loading, error, no item states)

  const mainImage = portfolioItem?.images?.[0]; // Use optional chaining for safety
  const enlargedImageUrl = mainImage?.formats?.large?.url || mainImage?.formats?.medium?.url || mainImage?.url;
  const enlargedAltText = mainImage?.alternativeText || mainImage?.name || portfolioItem?.title || "Enlarged portfolio photo";

  console.log('--- EnlargedPhoto: Final Image URL to display: ---', enlargedImageUrl);
  console.log('--- EnlargedPhoto: Alt Text:', enlargedAltText);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={handleCloseModal} // Use the new handler
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        <button
          onClick={(e) => { e.stopPropagation(); navigateToPhoto('prev'); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white text-4xl hover:bg-gray-700/50 rounded-full z-10 block"
          aria-label="Previous photo"
        >
          <MdOutlineArrowBackIosNew />
        </button>

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCloseModal(); // Use the new handler
          }}
          className="absolute -top-12 right-0 text-white text-2xl"
          aria-label="Close enlarged photo"
        >
          ✕
        </button>

        {/* ... (Image and Next Button remain the same) ... */}

      </div>
    </div>
  );
}