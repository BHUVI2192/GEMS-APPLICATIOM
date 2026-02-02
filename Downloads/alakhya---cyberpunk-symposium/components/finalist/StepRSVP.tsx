import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Bed, Utensils, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

interface RSVPData {
    attending: boolean;
    accommodation: boolean;
    foodPref: string;
    travelFlexibility: string;
    emergencyContact: string;
    notes: string;
}

interface StepRSVPProps {
    onBack: () => void;
    onSubmit: (data: RSVPData) => void;
}

const StepRSVP: React.FC<StepRSVPProps> = ({ onBack, onSubmit }) => {
    const [data, setData] = useState<RSVPData>({
        attending: true,
        accommodation: false,
        foodPref: 'Veg',
        travelFlexibility: 'Standard',
        emergencyContact: '',
        notes: ''
    });

    const handleSubmit = () => {
        if (data.attending && !data.emergencyContact) return; // Basic validation
        onSubmit(data);
    };

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto p-6 animate-fade-in">
            {/* Header */}
            <div className="mb-8 text-center md:text-left">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wide mb-2 block">Registration</span>
                <h2 className="text-3xl font-bold text-white mb-2">Final Confirmation</h2>
                <p className="text-zinc-400 font-light">Please confirm your attendance logistics.</p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pb-32">

                {/* 1. Attending Toggle */}
                <div className={`p-6 rounded-lg border transition-all ${data.attending
                    ? 'bg-emerald-950/20 border-emerald-900/50'
                    : 'bg-zinc-900 border-zinc-800'
                    }`}>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-lg font-semibold text-white">Are you attending?</label>
                        <button
                            onClick={() => setData({ ...data, attending: !data.attending })}
                            className={`w-14 h-8 rounded-full p-1 transition-colors relative ${data.attending ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${data.attending ? 'translate-x-[24px]' : 'translate-x-0'}`} />
                        </button>
                    </div>
                    <p className={`text-sm flex items-center gap-2 ${data.attending ? 'text-emerald-400' : 'text-zinc-500'}`}>
                        {data.attending ? <Check size={16} /> : <X size={16} />}
                        {data.attending ? "Yes, I will be participating." : "No, I cannot attend."}
                    </p>
                </div>

                <AnimatePresence>
                    {data.attending && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-8 overflow-hidden"
                        >
                            {/* 2. Accommodation */}
                            <div>
                                <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                                    <Bed size={16} className="text-zinc-500" /> Accommodation Required?
                                </h3>
                                <div className="flex gap-4">
                                    {['Yes', 'No'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setData({ ...data, accommodation: opt === 'Yes' })}
                                            className={`flex-1 py-3 rounded-md text-sm font-medium border transition-all ${(data.accommodation === (opt === 'Yes'))
                                                ? 'bg-white text-black border-white'
                                                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-900'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Food Preference */}
                            <div>
                                <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                                    <Utensils size={16} className="text-zinc-500" /> Dietary Preference
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {['Veg', 'Non-Veg', 'Both', 'None'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setData({ ...data, foodPref: opt })}
                                            className={`py-2 px-3 rounded-md text-sm border transition-all ${data.foodPref === opt
                                                ? 'bg-zinc-800 border-zinc-600 text-white'
                                                : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-700'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 4. Contact */}
                            <div>
                                <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                                    <AlertCircle size={16} className="text-zinc-500" /> Emergency Contact
                                </h3>
                                <input
                                    type="tel"
                                    placeholder="Parent/Guardian Phone Number"
                                    value={data.emergencyContact}
                                    onChange={(e) => setData({ ...data, emergencyContact: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Action */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-900 z-50">
                <div className="max-w-2xl mx-auto flex gap-4">
                    <button
                        onClick={onBack}
                        className="p-4 rounded-md bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={data.attending && !data.emergencyContact}
                        className="flex-1 py-4 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                    >
                        Complete Registration <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepRSVP;
