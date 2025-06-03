// src/components/layout/Layout.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect } from 'react'; // Added useState, useEffect
import HeaderWrapper from './Header/HeaderWrapper';
import Footer from './Footer';
import LoadingSpinner from '../common/LoadingSpinner';

const EnlargedPhoto = lazy(() => import('../sections/Portfolio/EnlargedPhoto'));

export default function Layout() {
  const location = useLocation();
  const background = location.state?.background;

  // State to determine if the current viewport is within the mobile range defined for the header
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  // Effect to check screen size and update isMobileLayout state
  useEffect(() => {
    const checkScreenSize = () => {
      // IMPORTANT: These breakpoints MUST match the logic in HeaderWrapper.jsx
      // and MobileHeader.jsx to ensure consistent header height and main padding.
      setIsMobileLayout(window.innerWidth >= 344 && window.innerWidth <= 882);
    };

    // Initial check on component mount
    checkScreenSize();
    // Add event listener for window resize to update state dynamically
    window.addEventListener('resize', checkScreenSize);

    // Cleanup: remove event listener when component unmounts
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Dynamically determine the padding-top for the <main> element
  // This pushes the content down below the fixed header, preventing overlap.
  // The value matches the height of the active header (64px for mobile, 88px for desktop).
  const mainPaddingTopClass = isMobileLayout ? "pt-[64px]" : "pt-[88px]";

  // Base classes for the <main> element:
  // flex-grow: Makes <main> take up all available vertical space between header and footer.
  // min-h-0: Crucial for flex containers. Ensures that children with h-full can correctly
  //          calculate their 100% height based on the available space.
  // dynamic pt class: Applies the correct top padding.
  let mainClassName = `flex-grow min-h-0 ${mainPaddingTopClass}`;

  return (
    // Outer div for the entire layout.
    // min-h-screen: Ensures it takes at least the full viewport height.
    // flex flex-col: Sets up a flex container that stacks children vertically,
    //                allowing flex-grow on <main> to work for sticky footer.
    <div className="min-h-screen flex flex-col">
      {/* Header component. HeaderWrapper now contains a placeholder div
          that occupies space in the normal document flow, matching the fixed header's height. */}
      <HeaderWrapper />

      {/* Main content area */}
      <main className={mainClassName}>
        {/* AnimatePresence for smooth route transitions (if using Framer Motion for pages) */}
        <AnimatePresence>
          <Outlet location={background || location} />
        </AnimatePresence>
        {/* ScrollRestoration helps maintain scroll position across routes */}
        <ScrollRestoration />
      </main>

      {/* Footer component */}
      <Footer className="bg-black text-white py-8" />

      {/* MODAL RENDERING: (Keep your modal logic as is) */}
      {/* Renders the EnlargedPhoto modal when background state is present in location */}
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
              {location.pathname.split('/').pop() && <EnlargedPhoto photoIdProp={location.pathname.split('/').pop()} />}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}