// src/components/layout/Header/HeaderWrapper.jsx
import { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import NavBar from '../NavBar';

const HeaderWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobileBreakpoint = window.innerWidth >= 344 && window.innerWidth <= 882;
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
          <MobileHeader />
      ) : (
        <NavBar />
      )}
    </>
  );
};

export default HeaderWrapper;