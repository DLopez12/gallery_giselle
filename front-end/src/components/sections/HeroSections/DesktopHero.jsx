import { heroData } from '../../../mocks/hero';

const DesktopHero = ({ data }) => {
  const { title, subtitle, image } = data.attributes;

  return (
    <div className="relative h-screen flex items-center">
      <img 
        src={image.data.attributes.url} 
        alt={image.data.attributes.alternativeText}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="container mx-auto relative z-10 px-8">
        <h1 className="text-6xl font-display text-white max-w-2xl">{title}</h1>
        <p className="text-white text-xl mt-4">{subtitle}</p>
      </div>
    </div>
  );
};

DesktopHero.defaultProps = {
  data: heroData.data
};

export default DesktopHero;