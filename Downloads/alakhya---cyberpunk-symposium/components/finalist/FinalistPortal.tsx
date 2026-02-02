import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepLanding from './StepLanding';
import StepSignup from './StepSignup';
import StepEventSelection from './StepEventSelection';
import StepLocation from './StepLocation';
import StepHome from './StepHome';
import StepRSVP from './StepRSVP';
import StepTripPlanner from './StepTripPlanner';
import StepCampusTour from './StepCampusTour';

interface FinalistPortalProps { }

const FinalistPortal: React.FC<FinalistPortalProps> = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        name: '', // Kept for legacy compatibility if needed
        teamName: '',
        leaderName: '',
        contactNumber: '',
        email: '',
        college: '',
        event: ''
    });
    const [rsvpData, setRsvpData] = useState<any>(null);
    const [tripData, setTripData] = useState({ city: '', mode: '' });

    const handleSignupNext = (data: any) => {
        setUserData({ ...userData, ...data });
        setStep(4); // Skip to Home, Event Selection is now part of Signup
    };

    const handleLocationAllow = (data: { city: string; mode: string }) => {
        setTripData(data);
        setStep(7);
    };

    return (
        <div className="fixed inset-0 z-[60] bg-black text-white font-inter overflow-hidden">
            {/* Dynamic Background */}
            {/* Professional Background */}
            <div className="absolute inset-0 z-0 bg-zinc-950">
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                }} />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full h-full overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="h-full"
                    >
                        {step === 1 && (
                            <StepLanding
                                onNext={() => setStep(2)}
                                onLogin={() => setStep(2)} // Quick entry for flow
                            />
                        )}

                        {step === 2 && (
                            <StepSignup
                                onBack={() => setStep(1)}
                                onNext={handleSignupNext}
                                userData={userData}
                            />
                        )}

                        {step === 3 && (
                            <StepEventSelection
                                onBack={() => setStep(2)}
                                onNext={handleEventSelect}
                                selectedEvent={userData.event}
                            />
                        )}


                        {step === 4 && (
                            <StepHome
                                finalistName={userData.name}
                                eventName={userData.event}
                                onStartRSVP={() => setStep(5)}
                            />
                        )}

                        {step === 5 && (
                            <StepRSVP
                                onBack={() => setStep(4)}
                                onSubmit={(data) => {
                                    setRsvpData(data);
                                    setStep(6);
                                }}
                            />
                        )}

                        {step === 6 && (
                            <StepLocation
                                onAllow={handleLocationAllow}
                                onSkip={() => setStep(7)}
                            />
                        )}

                        {step === 7 && (
                            <StepTripPlanner
                                data={tripData}
                                onNavigate={() => setStep(8)}
                            />
                        )}

                        {step === 8 && (
                            <StepCampusTour
                                userData={userData}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FinalistPortal;
