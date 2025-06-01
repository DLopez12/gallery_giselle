// src/components/sections/Portfolio/EnlargedPhoto.jsx
// ... (imports remain the same)

export default function EnlargedPhoto() {
  const { photoId } = useParams();
  const navigate = useNavigate();

  const [allPortfolioItems, setAllPortfolioItems] = useState([]);
  const [portfolioItem, setPortfolioItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... (useEffect for allPortfolioItems and portfolioItem remain the same)
  // ... (navigateToPhoto useCallback remains the same)
  // ... (loading, error, no item state handling remains the same)

  const mainImage = portfolioItem?.images?.[0]; // Use optional chaining for safety
  const enlargedImageUrl = mainImage?.formats?.large?.url || mainImage?.formats?.medium?.url || mainImage?.url;
  const enlargedAltText = mainImage?.alternativeText || mainImage?.name || portfolioItem?.title || "Enlarged portfolio photo";

  console.log('--- EnlargedPhoto: Final Image URL to display: ---', enlargedImageUrl);
  console.log('--- EnlargedPhoto: Alt Text:', enlargedAltText);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={() => navigate('/portfolio')} // This will be the main close trigger
    >
      {/* This inner div now acts as the modal's *content container*.
          Clicks within it (but not on specific elements that stop propagation)
          will NOT close the modal. */}
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center" // Added max-h-[90vh] to this div
        onClick={(e) => e.stopPropagation()} // Stop propagation here to prevent immediate close
      >

        {/* Previous Button */}
        <button
          onClick={(e) => { e.stopPropagation(); navigateToPhoto('prev'); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white text-4xl hover:bg-gray-700/50 rounded-full z-10 block" // Removed hidden md:block
          aria-label="Previous photo"
        >
          <MdOutlineArrowBackIosNew />
        </button>

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/portfolio');
          }}
          className="absolute -top-12 right-0 text-white text-2xl"
          aria-label="Close enlarged photo"
        >
          ✕
        </button>

        {/* The Image (adjust size to fit within its parent content container) */}
        {enlargedImageUrl ? (
          <img
            src={enlargedImageUrl}
            className="max-h-full max-w-full object-contain" // Use max-h-full and max-w-full to fit parent
            alt={enlargedAltText}
            onClick={(e) => e.stopPropagation()} // Stop propagation on the image itself
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
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white text-4xl hover:bg-gray-700/50 rounded-full z-10 block" // Removed hidden md:block
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