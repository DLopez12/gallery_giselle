// src/components/layout/Layout.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeaderWrapper from './Header/HeaderWrapper';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();

  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [currentHeaderHeight, setCurrentHeaderHeight] = useState(88);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth >= 344 && window.innerWidth <= 882;
      setIsMobileLayout(isMobile);
      setCurrentHeaderHeight(isMobile ? 64 : 88);
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
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />
      <div style={{ height: `${currentHeaderHeight}px` }} className="w-full"></div>
      <main className="flex-grow min-h-0 flex flex-col">
        <AnimatePresence mode="wait">
          <Outlet location={location} />
        </AnimatePresence>
      </main>
      <Footer className="bg-black text-white py-8" />
       
    </div>
  );
}