// src/components/layout/Layout.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'; // Removed Routes, Route
import { Suspense, lazy } from 'react';
import HeaderWrapper from './Header/HeaderWrapper';
import Footer from './Footer';
import LoadingSpinner from '../common/LoadingSpinner';

const EnlargedPhoto = lazy(() => import('../sections/Portfolio/EnlargedPhoto')); // Adjust path if necessary

export default function Layout() {
  const location = useLocation();
  const background = location.state?.background;

  // Extract photoId directly from the current location's pathname
  // This will get the last segment of the path, e.g., "testimage1-2" from "/portfolio/testimage1-2"
  const currentPhotoId = location.pathname.split('/').pop();

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper className="sticky top-0 z-50 bg-white shadow-sm" />

      <main className="flex-grow container mx-auto px-4">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
        <ScrollRestoration />
      </main>

      <Footer className="bg-black text-white py-8" />

      {background && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
          >
            <Suspense fallback={<LoadingSpinner />}>
              {/* Pass the extracted photoId directly as a prop to EnlargedPhoto */}
              {/* Ensure currentPhotoId is present before rendering EnlargedPhoto */}
              {currentPhotoId && <EnlargedPhoto photoIdProp={currentPhotoId} />}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// Optional error boundary (for custom error handling)
import { useRouteError } from 'react-router-dom'; // Import useRouteError
export function LayoutErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />
      <main className="flex-grow grid place-items-center">
        <h2 className="text-2xl">Oops! Something went wrong.</h2>
      </main>
      <Footer />
    </div>
  );
}