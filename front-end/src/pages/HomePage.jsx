// Importing necessary libraries and components
import React from "react";
import { useOutletContext } from "react-router-dom";
import Carousel from "../components/sections/Carousel";
import HeroWrapper from "../components/sections/HeroSections/HeroWrapper";

const HomePage = () => {
  // Access the context provided by Layout.jsx. This gives you the current header height
  const { currentHeaderHeight } = useOutletContext();
  return (
    <>
      <Carousel headerHeight={currentHeaderHeight}>
        {({ carouselItems}) => (
          <HeroWrapper carouselItems={carouselItems} />
        )}
      </Carousel>
    </>
  );
};

export default HomePage;