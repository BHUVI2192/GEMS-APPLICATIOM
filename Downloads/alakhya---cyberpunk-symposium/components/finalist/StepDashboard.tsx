
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Train, MapPin, Navigation, Coffee, Hotel, ArrowRight, Share2, Clock, CheckCircle2, Utensils } from 'lucide-react';

interface FinalistData {
    name: string;
    event: string;
}

interface StepDashboardProps {
    userData: FinalistData;
}

// Mock Data
const SCHEDULE = [
    { time: '08:00 AM', label: 'Reporting Time', location: 'Main Gate' },
    { time: '09:00 AM', label: 'Registration', location: 'Block A' },
    { time: '10:30 AM', label: 'Event Start', location: 'Main Auditorium' },
    { time: '01:00 PM', label: 'Lunch Break', location: 'Cafeteria' },
];

const TRIP_PLAN = [
    { day: 'Day -2', date: 'Mar 13', action: 'Start Journey', mode: 'Train', time: '10:00 PM', status: 'Recommended' },
    { day: 'Day -1', date: 'Mar 14', action: 'Reach City', mode: 'Rest', time: '06:00 AM', status: 'On-Time' },
    { day: 'Day 0', date: 'Mar 15', action: 'Reach Campus', mode: 'Cab', time: '07:30 AM', status: 'Final Leg' },
];

const PLACES = [
    { name: 'Udupi Upahar', type: 'Food', veg: true, dist: '0.5 km' },
    { name: 'Empire Hotel', type: 'Food', veg: false, dist: '1.2 km' },
    { name: 'Hotel Langford', type: 'Stay', price: '₹2000', dist: '2.0 km' },
];

const StepDashboard: React.FC<StepDashboardProps> = ({ userData }) => {
    const [activeTab, setActiveTab] = useState<'Food' | 'Stay'>('Food');

    return (
        <div className="flex flex-col h-full max-w-6xl mx-auto p-4 md:p-8 space-y-8 custom-scrollbar">

            {/* Header */}
            <header className="flex justify-between items-end pb-6 border-b border-green-500/30">
                <div>
                    <h1 className="text-3xl font-black font-display text-white uppercase tracking-tighter">
                        WELCOME, <span className="text-green-500">{userData.name.split(' ')[0]}</span>
                    </h1>
                    <p className="text-green-500/60 font-mono text-sm mb-2 uppercase tracking-widest">Event: <span className="text-white font-bold">{userData.event}</span></p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-green-500/10 border border-green-500/50 text-green-500 text-xs font-mono font-bold uppercase tracking-wider">
                        <CheckCircle2 size={12} />
                        RSVP Confirmed
                    </div>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xs text-green-500/40 uppercase tracking-widest mb-1 font-mono">Time Remaining</p>
                    <p className="text-2xl font-mono font-bold text-white tracking-widest">05:12:44</p>
                </div>
            </header>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* 1. Schedule (Width: 8) */}
                <div className="md:col-span-8 bg-black border border-green-500/30 rounded-sm p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-50">
                        <Clock className="text-green-500/20" size={100} />
                    </div>

                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2 uppercase tracking-wide">
                            <Clock className="text-green-500" size={20} />
                            Schedule
                        </h2>
                        <button className="text-xs text-green-500 hover:text-white font-mono uppercase tracking-wider transition-colors">[Expand]</button>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {SCHEDULE.map((item, i) => (
                            <div key={i} className={`flex items-center gap-4 p-4 rounded-sm border transition-all ${i === 1 ? 'bg-green-500/10 border-green-500 border-l-4' : 'bg-black border-green-500/20 hover:bg-green-500/5'}`}>
                                <div className={`px-3 py-1 rounded-sm text-xs font-mono font-bold ${i === 1 ? 'bg-green-500 text-black' : 'bg-green-500/10 text-green-500'}`}>
                                    {item.time}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-mono font-bold uppercase ${i === 1 ? 'text-white' : 'text-green-500/70'}`}>{item.label}</h3>
                                    <p className="text-xs text-green-500/40 font-mono uppercase">{item.location}</p>
                                </div>
                                {i === 1 && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Campus Directions (Width: 4) */}
                <div className="md:col-span-4 bg-black border border-green-500/30 rounded-sm p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
                    {/* Map Background Effect */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/50 to-black" />
                        <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                            {Array.from({ length: 36 }).map((_, i) => (
                                <div key={i} className="border-[0.5px] border-green-500/20" />
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-xl font-bold font-mono text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                            <MapPin className="text-green-500" size={20} />
                            Campus Map
                        </h2>
                        <p className="text-sm font-mono text-green-500/60 uppercase">Distance: 3.2km from Drop Zone</p>
                    </div>

                    <div className="relative z-10 mt-8 space-y-3">
                        <button className="w-full py-3 bg-green-500 text-black font-black uppercase tracking-widest rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)] clip-path-polygon">
                            <Navigation size={18} />
                            Navigate
                        </button>
                        <button className="w-full py-3 bg-transparent border border-green-500/50 text-green-500 font-bold uppercase tracking-widest rounded-sm hover:bg-green-500/10 transition-colors flex items-center justify-center gap-2 font-mono">
                            <Share2 size={18} />
                            Share Location
                        </button>
                    </div>
                </div>

                {/* 3. AI Trip Plan (Width: 6) */}
                <div className="md:col-span-6 bg-black border border-green-500/30 rounded-sm p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2 uppercase tracking-wide">
                            <Train className="text-green-500" size={20} />
                            Travel Plan
                        </h2>
                        <span className="px-2 py-1 rounded-sm bg-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-widest border border-green-500/20">Recommended</span>
                    </div>

                    <div className="space-y-6 relative ml-2">
                        {/* Connecting Line */}
                        <div className="absolute top-4 bottom-4 left-[7px] w-[2px] bg-green-500/20" />

                        {TRIP_PLAN.map((step, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                key={i}
                                className="relative flex gap-4"
                            >
                                <div className={`w-4 h-4 rounded-full mt-1 z-10 border-2 ${i === 0 ? 'bg-green-500 border-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-black border-green-500/40'}`} />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-white font-bold font-mono uppercase tracking-wide">{step.action}</h4>
                                        <span className="text-xs text-green-500/40 font-mono uppercase">{step.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-green-500/60 font-mono">
                                        <span className="px-2 py-0.5 rounded-sm bg-green-500/10 border border-green-500/20 text-xs uppercase">{step.mode}</span>
                                        <span>{step.time}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 4. Essentials (Width: 6) */}
                <div className="md:col-span-6 bg-black border border-green-500/30 rounded-sm p-6 md:p-8 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2 uppercase tracking-wide">
                            <Coffee className="text-green-500" size={20} />
                            Essentials
                        </h2>
                        <div className="flex p-1 bg-green-500/10 rounded-sm border border-green-500/20">
                            {['Food', 'Stay'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-3 py-1 rounded-sm text-xs font-bold font-mono uppercase tracking-wider transition-all ${activeTab === tab
                                        ? 'bg-green-500 text-black shadow-sm'
                                        : 'text-green-500/40 hover:text-green-500'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        {PLACES.filter(p => activeTab === 'Food' ? p.type === 'Food' : p.type === 'Stay').map((place, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-sm bg-black border border-green-500/20 hover:bg-green-500/5 hover:border-green-500/50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-sm bg-green-500/10 flex items-center justify-center text-green-500">
                                        {place.type === 'Food' ? <Utensils size={16} /> : <Hotel size={16} />}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold font-mono text-sm uppercase group-hover:text-green-400 transition-colors">{place.name}</h4>
                                        <p className="text-xs text-green-500/40 font-mono uppercase">{place.dist} • {place.veg ? 'Pure Veg' : place.price || 'Multi-Cuisine'}</p>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-sm bg-green-500/5 flex items-center justify-center text-green-500/40 group-hover:bg-green-500 group-hover:text-black transition-all">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StepDashboard;
