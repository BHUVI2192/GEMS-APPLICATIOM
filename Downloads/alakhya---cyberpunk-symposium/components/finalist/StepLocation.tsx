import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Train, Plane, Bus, Globe, Search, AlertCircle, Crosshair, ArrowRight } from 'lucide-react';

interface StepLocationProps {
    onAllow: (data: { city: string; mode: string }) => void;
    onSkip: () => void;
}

const TRAVEL_MODES = [
    { id: 'train', icon: Train, label: 'Train', desc: 'Recommended' },
    { id: 'flight', icon: Plane, label: 'Flight', desc: 'Fastest' },
    { id: 'bus', icon: Bus, label: 'Bus', desc: 'Economy' }
];

const StepLocation: React.FC<StepLocationProps> = ({ onAllow, onSkip }) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedMode, setSelectedMode] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLiveLocation = () => {
        setIsLocating(true);
        setErrorMsg('');

        if (!navigator.geolocation) {
            setErrorMsg("Geolocation not supported.");
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    const city = data.address.city || data.address.town || "Bengaluru"; // Fallback for demo
                    setSelectedCity(city);
                } catch (error) {
                    setSelectedCity(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
                } finally {
                    setIsLocating(false);
                }
            },
            () => {
                setErrorMsg("Location access denied.");
                setIsLocating(false);
            }
        );
    };

    return (
        <div className="flex flex-col justify-center min-h-full p-6 max-w-5xl mx-auto w-full animate-fade-in">

            <div className="mb-8 text-center md:text-left border-b border-zinc-900 pb-6">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wide mb-2 block">Step 3 of 3</span>
                <h2 className="text-3xl font-bold text-white mb-2">Travel Logistics</h2>
                <p className="text-zinc-400 font-light max-w-xl">Determine your origin point and preferred mode of transport to generate your personalized itinerary.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                {/* Left: Form */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-zinc-300 block">Origin City</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                placeholder="E.g. Mumbai, Delhi, Chennai..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-3 pl-4 pr-12 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="h-[1px] flex-1 bg-zinc-900" />
                            <span className="text-[10px] text-zinc-600 font-medium uppercase">Automatic Detection</span>
                            <div className="h-[1px] flex-1 bg-zinc-900" />
                        </div>

                        <button
                            onClick={handleLiveLocation}
                            disabled={isLocating}
                            className="w-full py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-medium rounded-md hover:text-white hover:border-zinc-700 transition-all flex items-center justify-center gap-2"
                        >
                            <Crosshair size={16} className={isLocating ? "animate-spin" : ""} />
                            {isLocating ? "Locating..." : "Use Current Location"}
                        </button>

                        {errorMsg && (
                            <p className="text-xs text-red-400 flex items-center gap-1 mt-2">
                                <AlertCircle size={12} /> {errorMsg}
                            </p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-medium text-zinc-300 block">Preferred Mode</label>
                        <div className="grid grid-cols-3 gap-3">
                            {TRAVEL_MODES.map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => setSelectedMode(mode.id)}
                                    className={`
                                        flex flex-col items-center justify-center p-4 gap-2 rounded-md border text-center transition-all
                                        ${selectedMode === mode.id
                                            ? 'bg-white border-white text-black'
                                            : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                                        }
                                    `}
                                >
                                    <mode.icon size={20} />
                                    <span className="text-xs font-medium">{mode.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={() => selectedCity && selectedMode && onAllow({ city: selectedCity, mode: selectedMode })}
                            disabled={!selectedCity || !selectedMode}
                            className="w-full py-3.5 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                        >
                            Generate Itinerary <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Right: Map Visual */}
                <div className="hidden md:flex items-center justify-center h-full min-h-[400px] bg-zinc-900/30 border border-zinc-800 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
                        backgroundSize: '20px 20px'
                    }} />

                    <div className="flex flex-col items-center text-zinc-600 gap-4">
                        <Globe size={64} strokeWidth={1} />
                        <p className="text-xs font-mono uppercase tracking-widest">Global Positioning System</p>
                    </div>

                    {selectedCity && (
                        <div className="absolute bottom-6 left-6 right-6 p-4 bg-zinc-950 border border-zinc-800 rounded-md flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase">Target</p>
                                    <p className="text-sm font-bold text-white">{selectedCity}</p>
                                </div>
                            </div>
                            <MapPin size={16} className="text-zinc-500" />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default StepLocation;
