
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="society" className="bg-black border-t border-green-500/20 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-3xl font-black text-white font-display mb-2 uppercase tracking-tighter">
            Alakhya <span className="text-green-500">2024</span>
          </div>
          <p className="text-green-500/60 font-mono text-sm max-w-xs mb-6">
            Engineering excellence through digital subversion.
          </p>
          <div className="flex gap-4">
            {['IG', 'TW', 'LN', 'YT'].map((s) => (
              <a key={s} href="#" className="w-10 h-10 flex items-center justify-center border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-black transition-all">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <div className="text-[10px] uppercase tracking-[0.4em] font-black text-green-500/50 mb-4">
            Established.By
          </div>
          <div className="text-3xl font-black text-white font-display tracking-widest uppercase italic group cursor-default">
            THE <span className="text-green-500 group-hover:text-white transition-colors">404</span> SOCIETY
          </div>
          <div className="mt-8 text-[10px] font-mono text-green-500/30">
            &copy; 2024 SECE_CORP. ALL RIGHTS RESERVED. <br />
            UNAUTHORIZED ACCESS IS PROHIBITED.
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-[10px] font-mono text-green-900">
        BUILD_VER: 2.0.24-STABLE | KERNEL: REACT_18.X | AUTH: SECURE_SOCKET
      </div>
    </footer>
  );
};

export default Footer;
