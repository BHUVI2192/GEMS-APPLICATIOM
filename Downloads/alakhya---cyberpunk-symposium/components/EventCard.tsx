
import React from 'react';
import { EventData } from '../types';

interface Props {
  event: EventData;
}

const EventCard: React.FC<Props> = ({ event }) => {
  return (
    <div className="group relative bg-[#0D0D0D] border border-green-500/20 overflow-hidden hover:border-green-500 transition-all duration-500 h-full flex flex-col">
      {/* Card Glow */}
      <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-colors duration-500 pointer-events-none"></div>
      
      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className="bg-black/80 text-green-500 text-[10px] font-black uppercase px-2 py-1 border border-green-500/30">
          {event.category}
        </span>
      </div>

      <div className="h-48 overflow-hidden relative">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent"></div>
      </div>

      <div className="p-6 relative flex-grow flex flex-col">
        <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight font-display group-hover:text-green-500 transition-colors">
          {event.title}
        </h3>
        <p className="text-green-400/60 text-sm mb-6 flex-grow leading-relaxed">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-6 text-[10px] font-bold uppercase tracking-widest text-green-500/80">
          <div className="flex justify-between items-center border-b border-green-500/10 pb-1">
            <span>Date.Ref</span>
            <span className="text-white">{event.date}</span>
          </div>
          <div className="flex justify-between items-center border-b border-green-500/10 pb-1">
            <span>Time.Exec</span>
            <span className="text-white">{event.time}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Venue.Node</span>
            <span className="text-white">{event.venue}</span>
          </div>
        </div>

        <button className="w-full py-3 border border-green-500 text-green-500 font-black text-xs uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all">
          Execute.Register()
        </button>
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
        <div className="absolute bottom-0 right-0 border-r-2 border-b-2 border-green-500 w-3 h-3"></div>
      </div>
    </div>
  );
};

export default EventCard;
