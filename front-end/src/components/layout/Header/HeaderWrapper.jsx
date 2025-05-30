// src/components/layout/Header/HeaderWrapper.jsx
import { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import NavBar from '../NavBar';

const HeaderWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobileBreakpoint = window.innerWidth >= 344 && window.innerWidth <= 882;
      console.log(`[DEBUG] Width: ${window.innerWidth}px | Mobile: ${mobileBreakpoint}`);
      setIsMobile(mobileBreakpoint);
    };

    // Initial check
    checkScreenSize();

    // Event listener for resizing
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="bg-red-500 p-2 text-white">
          <MobileHeader />
        </div>
      ) : (
        <NavBar />
      )}
    </>
  );
};

export default HeaderWrapper;