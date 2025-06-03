// src/components/layout/Header/HeaderWrapper.jsx
import { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader'; // Relative path to MobileHeader.jsx
import NavBar from './NavBar';             // Relative path to NavBar.jsx

const HeaderWrapper = () => {
  // State to track if the current viewport is within the defined mobile range
  const [isMobile, setIsMobile] = useState(false);

  // Effect to check screen size and update isMobile state
  useEffect(() => {
    const checkScreenSize = () => {
      // IMPORTANT: These breakpoints MUST match the logic in MobileHeader.jsx
      // and Layout.jsx to ensure consistent header display and main padding.
      setIsMobile(window.innerWidth >= 344 && window.innerWidth <= 882);
    };

    // Initial check on component mount
    checkScreenSize();
    // Add event listener for window resize to update state dynamically
    window.addEventListener('resize', checkScreenSize);

    // Cleanup: remove event listener when component unmounts
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Determine the Tailwind CSS height class for the placeholder div.
  // This height must match the actual computed height of the fixed header (NavBar or MobileHeader).
  // NavBar's height (including its p-4 padding) is effectively 88px.
  // MobileHeader's height (h-16) is 64px.
  const placeholderHeightClass = isMobile ? 'h-[64px]' : 'h-[88px]';

  return (
    // This div serves as a non-fixed placeholder in the normal document flow.
    // It occupies the exact vertical space that the fixed header *would* have occupied
    // if it were in the flow. This prevents the content below it from sliding up
    // underneath the fixed header.
    <div className={`${placeholderHeightClass} w-full`}>
      {/* Conditionally render either MobileHeader or NavBar based on screen size */}
      {isMobile ? (
        <MobileHeader />
      ) : (
        <NavBar />
      )}
    </div>
  );
};

export default HeaderWrapper;