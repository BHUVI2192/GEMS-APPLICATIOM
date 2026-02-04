/**
 * NEXUS Studio - Flower Bloom Animation
 * Recreating a "bloom" flower effect for the web using SVG.
 * Features: Dark background, Cyan core, Neon blue petals, Light trails.
 */

class FlowerBloom {
    constructor() {
        this.container = document.getElementById('blobMask');
        if (!this.container) return;

        this.petalCount = 20; // 16-24 petals
        this.progress = 0;

        this.init();
    }

    init() {
        this.createFlowerSVG();
        this.setupScrollTrigger();
        this.animate();
    }

    createFlowerSVG() {
        // Clear existing canvas if any
        const canvasWrapper = this.container.querySelector('.blob-canvas-wrapper');
        if (!canvasWrapper) return;

        // Ensure background is black
        canvasWrapper.style.backgroundColor = '#000000';

        // Create SVG container
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('class', 'flower-bloom-svg');
        // High resolution viewbox for crispness
        this.svg.setAttribute('viewBox', '-1000 -1000 2000 2000');
        this.svg.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%; /* Centered */
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            z-index: 10;
            pointer-events: none;
            overflow: visible;
        `;

        // Create Definitions (Gradients, Filters)
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        // 1. Core Radial Gradient (Center #38f8ff -> Edges #00bcd4)
        const coreGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        coreGradient.setAttribute('id', 'coreGradient');
        coreGradient.innerHTML = `
            <stop offset="0%" stop-color="#38f8ff" />
            <stop offset="100%" stop-color="#00bcd4" />
        `;
        defs.appendChild(coreGradient);

        // 2. Petal Linear Gradient (Base #00c3ff -> Tip #0074ff)
        const petalGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        petalGradient.setAttribute('id', 'petalGradient');
        petalGradient.setAttribute('x1', '0%');
        petalGradient.setAttribute('y1', '100%');
        petalGradient.setAttribute('x2', '0%');
        petalGradient.setAttribute('y2', '0%');
        petalGradient.innerHTML = `
            <stop offset="0%" stop-color="#00c3ff" />
            <stop offset="100%" stop-color="#0074ff" />
        `;
        defs.appendChild(petalGradient);

        // 3. Drop Shadow / Glow Filter for Core
        const coreGlow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        coreGlow.setAttribute('id', 'coreGlow');
        coreGlow.setAttribute('x', '-50%');
        coreGlow.setAttribute('y', '-50%');
        coreGlow.setAttribute('width', '200%');
        coreGlow.setAttribute('height', '200%');
        coreGlow.innerHTML = `
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 0.6 0" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        `;
        defs.appendChild(coreGlow);

        // 4. Glow Filter for Petals/Trails
        const bloomGlow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        bloomGlow.setAttribute('id', 'bloomGlow');
        bloomGlow.setAttribute('x', '-50%');
        bloomGlow.setAttribute('y', '-50%');
        bloomGlow.setAttribute('width', '200%');
        bloomGlow.setAttribute('height', '200%');
        bloomGlow.innerHTML = `
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
             <feColorMatrix in="blur" type="matrix" values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 0.8 0" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        `;
        defs.appendChild(bloomGlow);

        this.svg.appendChild(defs);

        // Group for content to apply rotations/scale cleanly
        this.mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.svg.appendChild(this.mainGroup);

        // --- Background Trails (S-curves) ---
        this.createTrails();

        // --- Petals ---
        this.petalsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.mainGroup.appendChild(this.petalsGroup);

        this.petals = [];
        const radius = 300;

        for (let i = 0; i < this.petalCount; i++) {
            const angle = (i / this.petalCount) * 360;
            const petal = this.createPetal(angle, radius);
            // Set initial state for scrub animation (hidden/scaled down)
            gsap.set(petal, { scale: 0, opacity: 0 });
            this.petalsGroup.appendChild(petal);
            this.petals.push(petal);
        }

        // --- Core Circle ---
        this.core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.core.setAttribute('cx', '0');
        this.core.setAttribute('cy', '0');
        this.core.setAttribute('r', '140'); // ~280px diameter
        this.core.setAttribute('fill', 'url(#coreGradient)');
        this.core.setAttribute('filter', 'url(#coreGlow)');
        // Set initial state for core
        gsap.set(this.core, { scale: 0, opacity: 0 });
        this.mainGroup.appendChild(this.core);

        // Insert into DOM
        canvasWrapper.insertBefore(this.svg, canvasWrapper.firstChild);
    }

    createTrails() {
        const trailsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        trailsGroup.setAttribute('class', 'trails');
        trailsGroup.style.opacity = '0.4'; // Subtle

        const trailColor = '#00bcd4';

        // S-curve 1
        const trail1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        trail1.setAttribute('d', 'M -1500 -400 Q -500 600 500 -400 T 1500 200');
        trail1.setAttribute('fill', 'none');
        trail1.setAttribute('stroke', trailColor);
        trail1.setAttribute('stroke-width', '60');
        trail1.setAttribute('filter', 'url(#bloomGlow)');
        trail1.setAttribute('opacity', '0.2');
        trailsGroup.appendChild(trail1);

        // S-curve 2
        const trail2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        trail2.setAttribute('d', 'M -1500 200 Q -500 -600 500 400 T 1500 -200');
        trail2.setAttribute('fill', 'none');
        trail2.setAttribute('stroke', trailColor);
        trail2.setAttribute('stroke-width', '40');
        trail2.setAttribute('filter', 'url(#bloomGlow)');
        trail2.setAttribute('opacity', '0.15');
        trailsGroup.appendChild(trail2);

        // S-curve 3
        const trail3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        trail3.setAttribute('d', 'M -1500 50 Q -200 100 800 -100 T 1500 50');
        trail3.setAttribute('fill', 'none');
        trail3.setAttribute('stroke', trailColor);
        trail3.setAttribute('stroke-width', '80');
        trail3.setAttribute('filter', 'url(#bloomGlow)');
        trail3.setAttribute('opacity', '0.1');
        trailsGroup.appendChild(trail3);

        this.mainGroup.appendChild(trailsGroup);
    }

    createPetal(angle, radius) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        // Rotate the group to position the petal
        group.setAttribute('transform', `rotate(${angle}) translate(0, -${radius * 0.2})`);

        const petal = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        // Teardrop shape / Pointed petal
        // Width ~120, Length ~400
        const w = 60;
        const h = 400;

        // Path: Start bottom center -> Curve out -> Tip -> Curve in -> End
        // Drawing relative to (0,0) as base
        const d = `
            M 0 0 
            C ${w} ${h * 0.3} ${w * 0.8} ${h * 0.7} 0 ${h} 
            C -${w * 0.8} ${h * 0.7} -${w} ${h * 0.3} 0 0 
        `;

        petal.setAttribute('d', d);
        petal.setAttribute('fill', 'url(#petalGradient)');
        petal.setAttribute('filter', 'url(#bloomGlow)'); // Intense glow

        group.setAttribute('transform', `rotate(${angle}) translate(0, -140)`); // Start at edge of core

        // Fix petal direction: SVG Y is down. To point OUT from center (which is up in local coords after translate -Y),
        // we need to draw towards -Y.
        const d_up = `
            M 0 0 
            C ${w} -${h * 0.3} ${w * 0.8} -${h * 0.7} 0 -${h} 
            C -${w * 0.8} -${h * 0.7} -${w} -${h * 0.3} 0 0 
        `;
        petal.setAttribute('d', d_up);

        // Add size variation for organic feel
        const scale = 0.9 + Math.random() * 0.3; // 0.9 to 1.2
        petal.setAttribute('transform', `scale(${scale})`);

        // Add subtle opacity variation
        petal.style.opacity = 0.8 + Math.random() * 0.2;

        // Store for animation
        petal.dataset.baseScale = scale;

        group.appendChild(petal);
        return group;
    }

    setupScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger);

        // Create a Timeline that scrubs with scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.container,
                start: "top top",  // Start as soon as section hits top
                end: "bottom bottom", // End when section is done
                scrub: 1, // Smooth key scrubbing
                pin: false // The canvas is already sticky via CSS
            }
        });

        // 1. Core Blooms
        tl.to(this.core, {
            scale: 1,
            opacity: 1,
            duration: 0.1,
            ease: "power2.out"
        }, 0);

        // 2. Petals Bloom (Staggered)
        // We want them to bloom over the course of the scroll
        tl.to(this.petals, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: {
                each: 0.01,
                from: "center" // Bloom from random or center? Let's try center for symmetry
            },
            ease: "back.out(1.2)"
        }, 0.05);

        // 3. Rotation while scrolling
        tl.to(this.mainGroup, {
            rotation: 180,
            duration: 1,
            ease: "none"
        }, 0);
    }

    animate() {
        // Pulse animation for the "living" feel
        const time = Date.now() * 0.001;

        // Gentle pulse of the core
        const scale = 1 + Math.sin(time * 2) * 0.05;
        this.core.setAttribute('transform', `scale(${scale})`);

        // Subtle wave of petals
        // We can't easily animate SVG path d-strings efficiently in RAF loop without overhead.
        // Instead, let's subtle rotate/scale the whole group or layers if we had them.

        requestAnimationFrame(() => this.animate());
    }
}

window.FlowerBloom = FlowerBloom;
