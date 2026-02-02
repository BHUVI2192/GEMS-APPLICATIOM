
import React from 'react';
import SectionHeader from './SectionHeader';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader 
        title="CORE_INFO" 
        subtitle="Analyzing the symposium metadata..."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 text-green-400/80 text-lg leading-relaxed">
          <p>
            Alakhya isn't just a technical symposium; it's a digital manifestation of our engineering prowess. Born from the minds at SECE, this event serves as a battleground for the brightest minds to converge, compete, and conquer.
          </p>
          <p>
            In this edition, we've integrated advanced tracking, high-stakes challenges, and a total prize pool that exceeds all previous simulations. Whether you are a coder, an artist, or a strategist, there is a slot for you in the network.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 border border-green-500/20 bg-green-500/5">
              <div className="text-3xl font-black text-white font-display">25+</div>
              <div className="text-xs uppercase tracking-widest text-green-500 font-bold">Missions</div>
            </div>
            <div className="p-4 border border-green-500/20 bg-green-500/5">
              <div className="text-3xl font-black text-white font-display">2000+</div>
              <div className="text-xs uppercase tracking-widest text-green-500 font-bold">Agents</div>
            </div>
            <div className="p-4 border border-green-500/20 bg-green-500/5">
              <div className="text-3xl font-black text-white font-display">150K</div>
              <div className="text-xs uppercase tracking-widest text-green-500 font-bold">Prize Pool</div>
            </div>
            <div className="p-4 border border-green-500/20 bg-green-500/5">
              <div className="text-3xl font-black text-white font-display">10+</div>
              <div className="text-xs uppercase tracking-widest text-green-500 font-bold">Corporations</div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 border-2 border-green-500 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
          <img 
            src="https://picsum.photos/seed/cyberpunk/1000/1000" 
            alt="Cyberpunk Aesthetic" 
            className="relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
          />
          {/* Overlay scanner effect */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
             <div className="w-full h-[2px] bg-green-500/50 absolute top-0 animate-[scanline_4s_linear_infinite]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
