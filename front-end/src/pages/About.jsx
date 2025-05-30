const About = () => {
    return (
      <div>
        <h1>About</h1>
          <div className="fixed bottom-4 left-4 bg-black text-white p-2 text-xs">
          <div className="block mobile:hidden">XS (375px)</div>
          <div className="hidden mobile:block md:hidden">MOBILE (375-768px)</div>
          <div className="hidden md:block">DESKTOP (768px)</div>
        </div>
        
      </div>
      );
}

export default About;