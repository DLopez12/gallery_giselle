const PortfolioItem = ({ photo }) => {
  // Use medium format if available, otherwise fallback to original
  const imageUrl = photo.medium || photo.url;
  
  if (!imageUrl) {
    console.warn('Missing image URL for photo:', photo.id);
    return null; // Don't render if no image
  }

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg">
      <img
        src={imageUrl}
        alt={photo.alt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          console.error('Failed to load image:', imageUrl);
          e.target.style.display = 'none';
        }}
      />
      {photo.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
          {photo.title}
        </div>
      )}
    </div>
  );
};


export default PortfolioItem;