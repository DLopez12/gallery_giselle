// src/components/common/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-display mb-4">404 - Page Not Found</h1>
      <p className="mb-6">The photography page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Back to Gallery
      </Link>
    </div>
  );
}