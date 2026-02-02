import React from 'react';

interface StepLandingProps {
  onNext: () => void;
  onLogin: () => void;
}

const StepLanding: React.FC<StepLandingProps> = ({ onNext, onLogin }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">

      <div className="text-center z-10 max-w-3xl animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-zinc-400 text-xs font-mono font-medium">Finalist Portal Access</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
          Welcome to the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Symposium Finale</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Manage your travel logistics, confirm your attendance, and finalize your schedule for the upcoming event.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onNext}
            className="px-8 py-3 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors shadow-lg shadow-zinc-900/20"
          >
            Access Portal
          </button>
          <button
            onClick={onLogin}
            className="px-8 py-3 text-zinc-400 text-sm font-medium hover:text-white transition-colors"
          >
            Exhibitor Login &rarr;
          </button>
        </div>
      </div>

    </section>
  );
};

export default StepLanding;
