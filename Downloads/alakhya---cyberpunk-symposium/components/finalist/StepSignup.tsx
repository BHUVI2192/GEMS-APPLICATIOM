import React, { useState } from 'react';
import { User, Phone, ArrowRight, Loader2, ArrowLeft, Users, ShieldCheck, AlertCircle } from 'lucide-react';

interface FinalistData {
    teamName: string;
    leaderName: string;
    contactNumber: string;
    event: string;
}

interface StepSignupProps {
    userData: any;
    setUserData: (data: any) => void;
    onNext: (data: any) => void;
    onBack: () => void;
}

// MOCK DATABASE
const VALID_TEAMS = [
    { team: "Team Alpha", event: "Hackathon", leader: "Arjun" },
    { team: "Mecha Warriors", event: "Robotics", leader: "Sarah" },
    { team: "Frag Fraggers", event: "Gaming", leader: "Rohan" },
    { team: "Pixel Perfect", event: "Design", leader: "Priya" },
    { team: "Code Ninjas", event: "Hackathon", leader: "Rahul" }
];

const EVENTS = ["Hackathon", "Robotics", "Gaming", "Design", "Paper Presentation", "Coding"];

const StepSignup: React.FC<StepSignupProps> = ({ userData, setUserData, onNext, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Local form state
    const [formData, setFormData] = useState({
        teamName: userData.teamName || '',
        leaderName: userData.leaderName || '',
        contactNumber: userData.contactNumber || '',
        event: userData.event || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.teamName || !formData.event || !formData.leaderName || !formData.contactNumber) {
            setError("All fields are required for verification.");
            return;
        }

        setLoading(true);

        // Simulate Database Query
        setTimeout(() => {
            const isValid = VALID_TEAMS.find(t =>
                t.team.toLowerCase() === formData.teamName.toLowerCase() &&
                t.event === formData.event &&
                t.leader.toLowerCase() === formData.leaderName.toLowerCase()
            );

            if (isValid) {
                setLoading(false);
                onNext(formData);
            } else {
                setLoading(false);
                setError("Access Denied: Team details not found in finalist database.");
            }
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto animate-fade-in p-6">
            <div className="mb-8 text-center md:text-left">
                <button onClick={onBack} className="text-xs font-medium text-zinc-500 hover:text-white flex items-center gap-1 transition-colors mb-4 md:mb-6">
                    <ArrowLeft size={14} /> Back
                </button>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wide mb-2 block">Step 2 of 3</span>
                <h2 className="text-2xl font-bold text-white mb-2">Team Verification</h2>
                <p className="text-zinc-400 text-sm"> Authenticate your team identity to proceed.</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">

                {/* Event Selection */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-400 uppercase">Registered Event</label>
                    <div className="relative group">
                        <select
                            name="event"
                            value={formData.event}
                            onChange={handleChange}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all appearance-none cursor-pointer"
                        >
                            <option value="">Select Event...</option>
                            {EVENTS.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ArrowRight size={14} className="text-zinc-500 rotate-90" />
                        </div>
                    </div>
                </div>

                {/* Team Name */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-400 uppercase">Team Name</label>
                    <div className="relative group">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" size={16} />
                        <input
                            type="text"
                            name="teamName"
                            value={formData.teamName}
                            onChange={handleChange}
                            placeholder="e.g. Team Alpha"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                        />
                    </div>
                </div>

                {/* Leader Name */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-400 uppercase">Team Leader</label>
                    <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" size={16} />
                        <input
                            type="text"
                            name="leaderName"
                            value={formData.leaderName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                        />
                    </div>
                </div>

                {/* Contact */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-400 uppercase">Leader Contact</label>
                    <div className="relative group">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" size={16} />
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            placeholder="+91 99999 99999"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2 text-xs text-red-500 animate-pulse">
                        <AlertCircle size={14} />
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-white text-black font-medium py-3 rounded-md hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Verifying Database...
                        </>
                    ) : (
                        <>
                            <ShieldCheck size={18} />
                            Verify & Proceed
                        </>
                    )}
                </button>
            </form>

            <p className="text-center text-xs text-zinc-500 mt-6">
                Only shortlisted finalists can access this portal.
            </p>
        </div>
    );
};

export default StepSignup;
