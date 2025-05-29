import { heroData } from '../../../mocks/hero';

const MobileHero  = ({ data = heroData.data }) => {
    const { title, subtitle, image } = data.attributes;

    return (
      <div className="relative h-[80vh]">
        <img 
            src={image.data.attributes.formats.small.url}
            alt={image.data.attributes.alternativeText || 'Hero Image'}
            className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <h1 className="text-4xl text-white font-display">{title}</h1>
            <p className="text-white mt-2">{subtitle}</p>
        </div>
      </div>
    );
};


MobileHero.defaultProps = {
  data: heroData.data
};

export default MobileHero;