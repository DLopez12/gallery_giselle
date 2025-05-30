// HomePage.jsx
import { useState } from 'react';
import NavBar from '../components/layout/NavBar';
import HeroWrapper from '../components/sections/HeroSections/HeroWrapper';

const HomePage = () => {
  // For now, manually toggle for testing
  const [isMobileView, setIsMobileView] = useState(true);
  
  return (
    <div>
      <NavBar />
      {/* <button onClick={() => setIsMobileView(!isMobileView)} className="fixed top-4 right-4 z-50 bg-black text-white p-2">
        Toggle View: {isMobileView ? 'Mobile' : 'Desktop'}
      </button> */}
      
      <HeroWrapper isMobile={isMobileView} />
    </div>
  );
};

export default HomePage;