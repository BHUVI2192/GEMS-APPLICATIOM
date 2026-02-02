
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';


interface NavbarProps {
  onOpenPortal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenPortal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-green-500/20 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-transparent py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-green-500 flex items-center justify-center font-black text-black group-hover:bg-white transition-colors">
            A
          </div>
          <span className="text-2xl font-black tracking-tighter text-white group-hover:text-green-500 transition-colors font-display uppercase">
            Alakhya
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-bold uppercase tracking-widest text-green-500/70 hover:text-green-500 transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-green-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <button
            onClick={onOpenPortal}
            className="px-4 py-2 bg-green-500/10 border border-green-500/50 text-green-400 text-xs font-bold uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all hover:shadow-[0_0_15px_#00FF41]"
          >
            For Finalists
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-green-500 p-2 border border-green-500/20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-green-500 p-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-lg font-bold uppercase tracking-widest text-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              onOpenPortal();
              setIsMenuOpen(false);
            }}
            className="text-lg font-bold uppercase tracking-widest text-emerald-400 text-left"
          >
            For Finalists
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
