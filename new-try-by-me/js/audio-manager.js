/**
 * NEXUS Studio - Audio Manager
 * Handles procedural audio synthesis for ambience and UI effects using Web Audio API.
 * No external files required.
 */

class AudioManager {
    constructor() {
        this.ctx = null;
        this.isMuted = true; // Start muted by default for UX
        this.masterGain = null;
        this.ambienceNodes = [];
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0; // Start at 0 for fade in
            this.masterGain.connect(this.ctx.destination);

            this.initialized = true;
            console.log('Audio System Initialized');
        } catch (e) {
            console.warn('Web Audio API not supported', e);
        }
    }

    async toggleMute(state) {
        if (!this.initialized) this.init();

        // Resume context if suspended (browser autoplay policy)
        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

        this.isMuted = state;

        if (!this.isMuted) {
            // Unmuting
            this.startAmbience();
            // Fade in
            gsap.to(this.masterGain.gain, {
                value: 0.5,
                duration: 1,
                ease: 'power2.out'
            });
        } else {
            // Muting
            gsap.to(this.masterGain.gain, {
                value: 0,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => this.stopAmbience()
            });
        }
    }

    playHoverSound() {
        if (this.isMuted || !this.ctx) return;
        this.synthesizeSound('hover');
    }

    playClickSound() {
        if (this.isMuted || !this.ctx) return;
        this.synthesizeSound('click');
    }

    playRevealSound() {
        if (this.isMuted || !this.ctx) return;
        this.synthesizeSound('reveal');
    }

    startAmbience() {
        if (this.ambienceNodes.length > 0) return; // Already playing

        // Create a deep space drone using multiple oscillators
        this.createDrone(55, 'sine', 0.1); // Low root
        this.createDrone(110, 'triangle', 0.05); // Octave up
        this.createDrone(55.5, 'sine', 0.1); // Detuned root for binaural beat feel
    }

    stopAmbience() {
        this.ambienceNodes.forEach(node => {
            try {
                node.osc.stop();
                node.gain.disconnect();
            } catch (e) { }
        });
        this.ambienceNodes = [];
    }

    createDrone(freq, type, vol) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = type;
        osc.frequency.value = freq;

        // Lowpass filter to make it "underwater/spacey"
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.Q.value = 1;

        // Slow LFO for movement
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.1 + Math.random() * 0.1;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 50; // Filter modulation amount
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        gain.gain.value = vol;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();

        this.ambienceNodes.push({ osc, gain, lfo, lfoGain });
    }

    synthesizeSound(type) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        const now = this.ctx.currentTime;

        if (type === 'hover') {
            // High tech blip
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);

            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.start(now);
            osc.stop(now + 0.05);
        }
        else if (type === 'click') {
            // Low thud/click
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1000, now);
            filter.frequency.exponentialRampToValueAtTime(100, now + 0.1);

            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

            osc.start(now);
            osc.stop(now + 0.15);
        }
    }
}

window.AudioManager = AudioManager;
