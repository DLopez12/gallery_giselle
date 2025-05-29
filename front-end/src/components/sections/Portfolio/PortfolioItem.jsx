// src/components/sections/Portfolio/PortfolioItem.jsx
export default function PortfolioItem({ photo }) {
  return (
    <div className="group relative aspect-square overflow-hidden">
      {/* Temporary placeholder */}
      <img
        src={`/placeholder-${photo.id}.jpg`}
        alt={photo.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-4">
        <h3 className="text-white font-medium">{photo.title}</h3>
      </div>
    </div>
  );
}