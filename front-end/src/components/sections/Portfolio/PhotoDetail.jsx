// src/components/sections/Portfolio/PhotoDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';

export default function PhotoDetail() {
  const { photoId } = useParams();
  const navigate = useNavigate();

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={() => navigate('/portfolio')} // Close on click
    >
      <div className="relative max-w-6xl w-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/portfolio');
          }}
          className="absolute -top-12 right-0 text-white text-2xl"
        >
          ✕
        </button>
        {/* Temporary placeholder - replace with Strapi data later */}
        <img
          src={`/placeholder-${photoId}.jpg`}
          className="max-h-[90vh] mx-auto object-contain"
          alt="Enlarged portfolio photo"
        />
      </div>
    </div>
  );
}