// src/components/layout/Layout.jsx
import { motion, AnimatePresence } from 'framer-motion';
// Import `useResolvedPath` and `matchPath` for a more explicit check, though not strictly needed here
import { Outlet, ScrollRestoration, useLocation, useMatches } from 'react-router-dom'; // Added useMatches for debugging
import { Suspense, lazy } from 'react';
import HeaderWrapper from './Header/HeaderWrapper';
import Footer from './Footer';
import LoadingSpinner from '../common/LoadingSpinner';

const EnlargedPhoto = lazy(() => import('../sections/Portfolio/EnlargedPhoto'));

export default function Layout() {
  const location = useLocation();
  const background = location.state?.background; // The location *before* the modal was opened

  // Extract photoId directly from the current location's pathname
  const photoIdFromUrl = location.pathname.split('/').pop();

  // Debugging: Log location and background state
  console.log("Layout: Current Location", location);
  console.log("Layout: Background Location from state", background);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper className="sticky top-0 z-50 bg-white shadow-sm" />

      <main className="flex-grow min-h-[600px]">
        <AnimatePresence>
          {/*
            CRITICAL FIX FOR 404 BACKGROUND:
            Render the Outlet using the `background` location if it exists.
            This tells the primary router to treat the background as the active page
            for the main content, even though the URL is for the modal.
          */}
          <Outlet location={background || location} /> {/* <-- IMPORTANT CHANGE */}
        </AnimatePresence>
        <ScrollRestoration />
      </main>

      <Footer className="bg-black text-white py-8" />

      {/* MODAL RENDERING: Only render the modal overlay if there's a background location */}
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
              {photoIdFromUrl && <EnlargedPhoto photoIdProp={photoIdFromUrl} />}
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