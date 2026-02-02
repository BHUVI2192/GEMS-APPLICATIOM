import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Music, Mic, Camera, Code, Cpu, Palette, PenTool, CheckCircle2 } from 'lucide-react';

interface StepEventSelectionProps {
    onBack: () => void;
    onNext: (event: string) => void;
    selectedEvent: string;
}

const EVENTS = [
    { id: 'Hackathon', icon: Code, label: 'Hackathon', desc: 'Software development & prototyping' },
    { id: 'Dance', icon: Music, label: 'Dance', desc: 'Group & Solo performance' },
    { id: 'Music', icon: Mic, label: 'Music', desc: 'Vocal & Instrumental' },
    { id: 'Photography', icon: Camera, label: 'Photography', desc: 'Digital imaging showcase' },
    { id: 'Robotics', icon: Cpu, label: 'Robotics', desc: 'Bot construction & battle' },
    { id: 'Design', icon: Palette, label: 'Design', desc: 'UI/UX & Graphic design' },
    { id: 'Debate', icon: PenTool, label: 'Debate', desc: 'Formal argumentation' },
];

const StepEventSelection: React.FC<StepEventSelectionProps> = ({ onBack, onNext, selectedEvent: initialEvent }) => {
    const [selected, setSelected] = useState(initialEvent);

    return (
        <div className="flex flex-col h-full min-h-[80vh] w-full max-w-5xl mx-auto p-6 animate-fade-in">

            <div className="mb-10 text-center md:text-left">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wide mb-2 block">Step 2 of 3</span>
                <h2 className="text-3xl font-bold text-white mb-2">Select Primary Event</h2>
                <p className="text-zinc-400 font-light">Choose the main event category you are participating in.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
                {EVENTS.map((event) => {
                    const isSelected = selected === event.id;
                    return (
                        <button
                            key={event.id}
                            onClick={() => setSelected(event.id)}
                            className={`
                                relative p-5 rounded-lg border text-left transition-all duration-200 group
                                ${isSelected
                                    ? 'bg-zinc-50 border-zinc-200 text-black shadow-lg shadow-white/5'
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/50'
                                }
                            `}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 rounded-md ${isSelected ? 'bg-zinc-200 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                                    <event.icon size={20} />
                                </div>
                                {isSelected && <CheckCircle2 size={18} className="text-black" />}
                            </div>

                            <h3 className={`font-semibold text-sm mb-1 ${isSelected ? 'text-black' : 'text-zinc-200'}`}>
                                {event.label}
                            </h3>
                            <p className={`text-xs ${isSelected ? 'text-zinc-600' : 'text-zinc-500'}`}>
                                {event.desc}
                            </p>
                        </button>
                    );
                })}
            </div>

            {/* Sticky/Fixed Footer Action */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-900 z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="text-sm font-medium text-zinc-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-zinc-900 transition-colors"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>

                    <button
                        onClick={() => selected && onNext(selected)}
                        disabled={!selected}
                        className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-lg shadow-white/10"
                    >
                        Continue <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepEventSelection;
