// pages/Portfolio.jsx
import { useState, useEffect, lazy, Suspense, useCallback } from 'react'; // Add lazy and Suspense
import { Link, useLocation } from 'react-router-dom'; // Keep Link if you need it elsewhere, but it's commented out for the modal
import PortfolioItem from '../components/sections/Portfolio/PortfolioItem.jsx';
import { fetchPortfolio } from '../api/fetchPortfolio';
import { AnimatePresence, motion } from 'framer-motion'; // Assuming you have framer-motion installed for motion.div and AnimatePresence

// Define a SkeletonItem component for placeholders
const SkeletonItem = () => (
  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-300 animate-pulse">
    {/* These inline styles provide the placeholder with dimensions to prevent CLS */}
    <div className="w-full h-full aspect-square flex items-center justify-center text-gray-500">
      {/* Optional: Add a simple loading icon or text */}
    </div>
  </div>
);

// Lazy load the Enlarged Photo component
// Corrected typo: "Englarged" -> "Enlarged"
const LazyEnlargedPhoto = lazy(() => import('../components/sections/Portfolio/EnlargedPhoto.jsx')); // Corrected path/component name

export default function Portfolio() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true); // Initial state should be true
  const [error, setError] = useState(null);
  const location = useLocation(); // Not strictly needed for modal, but might be for other routing context

  // State to control the modal's visibility and pass data to it
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // to pass the photo data to the modal

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true); // Ensure loading is true at the start of fetch
        console.log('--- Portfolio.jsx: Starting data fetch ---');
        const portfolioData = await fetchPortfolio();

        console.log('--- Portfolio.jsx: Raw data returned by fetchPortfolio: ---', portfolioData);

        if (portfolioData.length > 0) {
          console.log('--- Portfolio.jsx: Setting photos state with data: ---', portfolioData);
          setPhotos(portfolioData);
        } else {
          setError("No portfolio items found");
          console.warn("--- Portfolio.jsx: No portfolio items found after fetch ---");
        }
      } catch (err) {
        console.error('--- Portfolio.jsx: Error during loadData ---', err);
        setError("Failed to load portfolio");
      } finally {
        setLoading(false); // Set loading to false after fetch completes (success or error)
      }
    };

    loadData();
  }, []);

  // Handler to open the modal
  const handleOpenModal = (photoData, itemTitle) => { // Renamed param to photoData for clarity
    setSelectedPhoto({...photoData, imtemTitle: itemTitle });
    setIsModalOpen(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  // Handler for navigating to next/previous photos in modal
  const handleModalNavigation = useCallback((direction) => {
    if (!selectedPhoto || !photos.length) return;

    // Find the portfolio item that contains the current selectedPhoto
    // This is more robust as slectedPhoto is just ONE image, but photos array is holding all items
    const currentPortfolioItemIndex = photos.findIndex(item =>
      item.images.some(img => img.id === selectedPhoto.id)
    );

    if (currentPortfolioItemIndex === -1) return; // Should not happen

    let nextItemIndex = currentPortfolioItemIndex;
    if (direction === 'next') {
      nextItemIndex = (currentPortfolioItemIndex + 1) % photos.length; // Wrap around to first item
    } else if (direction === 'prev') {
      nextItemIndex = (currentPortfolioItemIndex - 1 + photos.length) % photos.length; // Wrap around to last item
    }

    const nextPortfolioItem = photos[nextItemIndex];
    if (nextPortfolioItem && nextPortfolioItem.images && nextPortfolioItem.images.length > 0) {
      handleOpenModal(nextPortfolioItem.images[0]); // open modal with the first image of the next/prev portfolio item
    }
  }, [selectedPhoto, photos]); // Dependencies: selectedPhoto and photos

  // --- ERROR HANDLING/ERROR STATE UI ---
  if (error) return (
    <div className="container mx-auto py-12 text-center">
      <h2 className="text-red-500">{error}</h2>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-brand-primary text-white rounded hover:bg-opacity-90 transition"
        aria-label="Retry loading portfolio"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="container mx-auto py-12 px-4 pt-20 md:pt-12">
      <h1 className="text-3xl font-display mb-8 p-2">Portfolio</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          // --- CONDITIONAL RENDERING FOR LOADING STATE ---
          // Render a number of skeleton items while data is loading
          // Removed extra closing parentheses `)))}`
          // Added the surrounding div for the skeleton grid if it wasn't already there
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ minHeight: '600px' /* Adjust this value if needed */ }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonItem key={index} />
            ))}
          </div>
        ) : (
          // --- RENDER ACTUAL PORTFOLIO ITEMS ONCE DATA IS LOADED ---
          <AnimatePresence>
            {photos.map((item) => (
              <motion.div
                key={item.id}
                layout // Smooth layout transitions (requires framer-motion)
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleOpenModal(item.images[0], item.title)} // pass the photo to open modal
                className="cursor-pointer" // add cursor pointer for better UX
              >
                {/* <Link
                    to={`/portfolio/${item.slug}-${item.id}`}
                    state={{ background: location }}
                    aria-label={`View ${item.title}`}
                  > */}
                {item.images && item.images.length > 0 ? (
                  <PortfolioItem
                    photo={item.images[0]}
                    title={item.title}
                  />
                ) : (
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                    {item.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
                        {item.title}
                      </div>
                    )}
                  </div>
                )}
                {/* </Link> */}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div> {/* End of grid div */}

      {/* --- MODAL FOR ENLARGED PHOTO (Conditionally Rendered) --- */}
      {isModalOpen && selectedPhoto && ( // Only render Suspense and LazyEnglargedPhoto if modal should be open
        <Suspense fallback={<div>Loading Modal...</div>}>
          <LazyEnlargedPhoto // Corrected typo here too
            photo={selectedPhoto}
            onClose={handleCloseModal}
            onNavigate={handleModalNavigation} // pass the navigation handler
          />
        </Suspense>
      )}
    </div>
  );
}