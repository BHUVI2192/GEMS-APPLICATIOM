
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="text-center z-10 max-w-5xl">
        <div className="inline-block mb-4 px-4 py-1 border border-green-500/50 bg-green-500/10 text-green-500 text-xs font-black tracking-[0.3em] uppercase animate-bounce">
          System Initialization Complete
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black text-white leading-none mb-4 tracking-tighter uppercase font-display">
          AL<span className="text-green-500 text-neon">AK</span>HYA
        </h1>
        
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="h-[2px] w-12 bg-green-500"></div>
          <span className="text-green-500 font-black tracking-widest uppercase md:text-xl">
            Oct 24 - 25 // 2024
          </span>
          <div className="h-[2px] w-12 bg-green-500"></div>
        </div>
        
        <p className="text-green-400/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
          The nexus of engineering innovation and digital rebellion. Join thousands of cyber-architects in the most advanced symposium of the decade.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="#events" className="px-10 py-4 bg-green-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 border-neon glitch-hover">
            Browse Missions
          </a>
          <a href="#register" className="px-10 py-4 border-2 border-green-500 text-green-500 font-black uppercase tracking-widest hover:bg-green-500/10 transition-all transform hover:scale-105">
            Join the Network
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-500/50">
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Scroll to Synchronize</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-green-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
