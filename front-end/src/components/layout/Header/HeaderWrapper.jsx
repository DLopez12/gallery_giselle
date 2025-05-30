import MobileHeader from './MobileHeader';
import NavBar from '../NavBar';


const HeaderWrapper = () => {
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <MobileHeader />
      </div>
      
      {/* Desktop */}
      <div className="hidden md:block">
        <NavBar />
      </div>
    </>
  );
};

export default HeaderWrapper;