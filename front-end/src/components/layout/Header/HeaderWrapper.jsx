// src/components/layout/Header/HeaderWrapper.jsx
import { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import NavBar from '../NavBar';

const HeaderWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth >= 344 && window.innerWidth <= 882);
    };

    if (typeof window !== 'undefined') {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkScreenSize);
      }
    };
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