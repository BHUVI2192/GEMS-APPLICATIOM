import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Map, Navigation, ArrowRight, Lock, Trophy } from 'lucide-react';

interface StepHomeProps {
    finalistName: string;
    eventName: string;
    onStartRSVP: () => void;
}

const StepHome: React.FC<StepHomeProps> = ({ finalistName, eventName, onStartRSVP }) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-full p-6 max-w-4xl mx-auto animate-fade-in">

            {/* Hero Card */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-8 md:p-12 mb-8 text-center relative overflow-hidden shadow-2xl shadow-black/50"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-zinc-800/50 rounded-full border border-zinc-700">
                        <Trophy size={32} className="text-yellow-500" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                    Congratulations!
                </h1>
                <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                    You have been selected as a finalist for <strong className="text-white font-medium">{eventName}</strong>.
                </p>

                <div className="inline-flex items-center gap-6 px-6 py-3 bg-zinc-900 rounded-lg border border-zinc-800 text-sm md:text-base">
                    <div className="text-zinc-400 font-medium">Bengaluru</div>
                    <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                    <div className="text-zinc-400 font-medium">Oct 24, 2024</div>
                </div>
            </motion.div>

            {/* Actions Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Primary Action: RSVP */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-2 lg:col-span-4 bg-white rounded-xl p-1 flex items-center justify-between shadow-lg shadow-zinc-900/50 group cursor-pointer hover:bg-zinc-200 transition-colors"
                >
                    <button
                        onClick={onStartRSVP}
                        className="w-full h-full flex items-center justify-between px-6 py-4"
                    >
                        <div className="text-left">
                            <h3 className="text-lg font-bold text-black flex items-center gap-2">
                                Confirm Your Spot <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                            </h3>
                            <p className="text-zinc-600 text-sm">Action Required: Complete RSVP to access features.</p>
                        </div>
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <ArrowRight size={20} />
                        </div>
                    </button>
                </motion.div>

                {/* Locked Features */}
                {[
                    { icon: Calendar, label: "Schedule" },
                    { icon: Navigation, label: "Travel Plan" },
                    { icon: Map, label: "Campus Map" }
                ].map((item, i) => (
                    <div key={i} className="md:col-span-1 lg:col-span-1 bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden opacity-60">
                        <div className="absolute top-3 right-3">
                            <Lock size={14} className="text-zinc-600" />
                        </div>
                        <div className="p-3 bg-zinc-900 rounded-full text-zinc-500">
                            <item.icon size={20} />
                        </div>
                        <span className="font-medium text-sm text-zinc-500">{item.label}</span>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default StepHome;
