// src/components/layout/Layout.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeaderWrapper from './Header/HeaderWrapper';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();

  const [currentHeaderHeight, setCurrentHeaderHeight] = useState(96);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth >= 344 && window.innerWidth <= 882;
      setCurrentHeaderHeight(isMobile ? 64 : 96);
    };

    if (typeof window !== 'undefined') {
      checkScreenSize(); // Initial measurement on component mount
      window.addEventListener('resize', checkScreenSize); // Update on window resize
    }

    return () => {
      // Clean up the event listener when the component unmounts
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkScreenSize);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />
      <main 
        className="flex-grow min-h-0 flex flex-col"
        style={{ paddingTop: `${currentHeaderHeight}px` }}
      >
        <AnimatePresence mode="wait">
          <Outlet context={{ currentHeaderHeight }} location={location} />
        </AnimatePresence>
      </main>
      <Footer className="bg-black text-white py-8" />
       
    </div>
  );
}