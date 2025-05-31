// src/components/layout/Layout.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import HeaderWrapper from './Header/HeaderWrapper';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky header optimized for gallery navigation */}
      <HeaderWrapper className="sticky top-0 z-50 bg-white shadow-sm" />
      
      {/* Main content area with scroll restoration */}
      <main className="flex-grow container mx-auto px-4">
        <AnimatePresence mode="wait">
            <Outlet /> {/* This renders the matched route component */}
        </AnimatePresence>
        <ScrollRestoration />
      </main>

      {/* Photography-style footer */}
      <Footer className="bg-black text-white py-8" />
    </div>
  );
}

// Optional error boundary (for custom error handling)
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