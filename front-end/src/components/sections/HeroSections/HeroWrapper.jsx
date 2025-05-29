// HeroWrapper.jsx
import MobileHero from './MobileHero';
import DesktopHero from './DesktopHero';

import { heroData } from '../../../mocks/hero';

const HeroWrapper = ({ isMobile = false, data }) => {
  return isMobile ? (
    <MobileHero data={data} />
  ) : (
    <DesktopHero data={data} />
  );
};

// Connect mock data by default
HeroWrapper.defaultProps = {
  data: heroData.data
};

export default HeroWrapper;