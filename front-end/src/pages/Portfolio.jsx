// src/pages/Portfolio.jsx
import { Link } from 'react-router-dom';
import PortfolioItem from '../components/sections/Portfolio/PortfolioItem';

export default function Portfolio() {
  // Mock data - replace with Strapi later
  const photos = [
    { id: '1', title: 'Wedding', slug: 'wedding-1' },
    { id: '2', title: 'Portrait', slug: 'portrait-2' }
  ];

  return (
    <div className="container mx-auto py-12 px-4 pt-20 md:pt-12">
      <h1 className="text-3xl font-display mb-8 p-2">Portfolio</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Link 
            key={photo.id} 
            to={`/portfolio/${photo.slug}-${photo.id}`} // SEO-friendly URL
            state={{ background: location }} // Preserves scroll position
          >
            <PortfolioItem photo={photo} />
          </Link>
        ))}
      </div>
    </div>
  );
}