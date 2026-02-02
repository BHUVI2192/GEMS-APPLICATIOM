import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Search, MapPin, CheckCircle2, ChevronRight, Eye, Smartphone, Calendar, User } from 'lucide-react';

interface StepCampusTourProps {
    userData: any;
}

const EVENTS = [
    { name: "Cyber Security Workshop", time: "10:00 AM", location: "Lab 3" },
    { name: "Hackathon Kickoff", time: "11:30 AM", location: "Auditorium" },
    { name: "Panel Discussion", time: "02:00 PM", location: "Hall B" },
    { name: "Networking Dinner", time: "07:00 PM", location: "Cafeteria" }
];

const StepCampusTour: React.FC<StepCampusTourProps> = ({ userData }) => {
    const [hasScanned, setHasScanned] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'events' | 'tour'>('events');

    const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setHasScanned(true);
        }, 1500);
    };

    const suggestions = ['Hostel', 'Canteen', 'Ground', 'Library', 'Main Block'];

    return (
        <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-6 overflow-y-auto animate-fade-in custom-scrollbar">

            {!hasScanned ? (
                // PRE-SCAN STATE: Minimalist Auth
                <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center space-y-8">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative w-72 h-72 bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden border border-zinc-100"
                    >
                        {isScanning ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50">
                                <div className="w-16 h-16 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mb-4" />
                                <p className="text-zinc-500 font-medium text-sm">Authenticating...</p>
                            </div>
                        ) : (
                            <QrCode size={120} className="text-zinc-900" strokeWidth={1} />
                        )}

                        {/* Scan Line */}
                        {isScanning && (
                            <motion.div
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-blue-500/50 shadow-sm"
                            />
                        )}
                    </motion.div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Campus Access Node</h2>
                        <p className="text-zinc-400 font-light text-sm mb-8 max-w-xs mx-auto">
                            Scan the physical QR code at the entrance to unlock your personalized dashboard.
                        </p>
                        <button
                            onClick={handleScan}
                            disabled={isScanning}
                            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 flex items-center gap-2 mx-auto disabled:opacity-70"
                        >
                            <Smartphone size={18} />
                            {isScanning ? 'Verifying...' : 'Scan QR Code'}
                        </button>
                    </div>
                </div>
            ) : (
                // POST-SCAN STATE: Dashboard
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase rounded-full border border-emerald-500/20">
                                    <CheckCircle2 size={10} /> Verified Participant
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                Campus Dashboard
                            </h2>
                            <p className="text-zinc-400 text-sm mt-1 flex items-center gap-2">
                                <User size={14} /> Welcome, {userData.name || 'Candidate'}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-xs text-zinc-500 uppercase tracking-wide">Current Status</p>
                                <p className="text-white font-medium">Inside Campus Perimeter</p>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Find locations, labs, or amenities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all shadow-sm"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            {suggestions.slice(0, 3).map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSearchQuery(tag)}
                                    className="px-2 py-1 bg-zinc-800 rounded text-[10px] text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors hidden sm:block"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats / Progress */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                            <p className="text-zinc-500 text-xs uppercase font-medium mb-1">Event Progress</p>
                            <h3 className="text-2xl font-bold text-white mb-2">25%</h3>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-[25%]" />
                            </div>
                        </div>
                        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                            <p className="text-zinc-500 text-xs uppercase font-medium mb-1">Next Session</p>
                            <h3 className="text-xl font-bold text-white truncate">Hackathon Kickoff</h3>
                            <p className="text-zinc-400 text-xs mt-1">Starts in 45m • Auditorium</p>
                        </div>
                        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 transition-colors">
                            <div>
                                <p className="text-zinc-500 text-xs uppercase font-medium mb-1">Wifi Access</p>
                                <h3 className="text-lg font-bold text-white">PESITM_GUEST</h3>
                            </div>
                            <QrCode size={24} className="text-zinc-600" />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div>
                        <div className="flex border-b border-zinc-800 mb-6">
                            <button
                                onClick={() => setActiveTab('events')}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'events' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                            >
                                Schedule
                            </button>
                            <button
                                onClick={() => setActiveTab('tour')}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'tour' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                            >
                                Campus Tour
                            </button>
                        </div>

                        <div className="min-h-[300px]">
                            {activeTab === 'events' ? (
                                <div className="space-y-3">
                                    {EVENTS.map((event, i) => (
                                        <div key={i} className="flex items-center p-4 bg-zinc-950 border border-zinc-900 rounded-lg hover:border-zinc-700 transition-all group">
                                            <div className="p-3 bg-zinc-900 rounded-md text-center min-w-[70px]">
                                                <span className="block text-zinc-500 text-xs uppercase font-bold">{event.time.split(' ')[1]}</span>
                                                <span className="block text-white font-bold">{event.time.split(' ')[0]}</span>
                                            </div>
                                            <div className="flex-1 px-6">
                                                <h4 className="text-white font-semibold text-lg">{event.name}</h4>
                                                <p className="text-sm text-zinc-500 flex items-center gap-1 mt-0.5">
                                                    <MapPin size={12} /> {event.location}
                                                </p>
                                            </div>
                                            <button className="px-4 py-2 bg-zinc-900 text-zinc-300 text-xs font-medium rounded hover:bg-white hover:text-black transition-colors">
                                                Details
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['Main Entrance', 'Innovation Center', 'Cyber Hub', 'Recreation Zone'].map((zone, i) => (
                                        <div key={i} className="aspect-video bg-zinc-900 border border-zinc-800 rounded-lg relative group overflow-hidden cursor-pointer hover:border-zinc-600 transition-colors">
                                            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 group-hover:text-white transition-colors">
                                                <Eye size={32} />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-zinc-950/80 p-4 backdrop-blur-sm border-t border-zinc-800">
                                                <h4 className="text-white font-medium text-sm">{zone}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </motion.div>
            )}
        </div>
    );
};

export default StepCampusTour;
