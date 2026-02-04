/**
 * NEXUS Studio - Particle System
 * Optimized floating particles with object pooling
 */

class ParticleSystem {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.noise = new SimplexNoise();

        this.options = {
            particleCount: window.innerWidth < 768 ? 50 : 100,
            colors: ['#ffffff', '#0066ff', '#00d9ff', '#ff6b35'],
            minSize: 1,
            maxSize: 4,
            speedFactor: 0.3,
            noiseScale: 0.002,
            noiseSpeed: 0.0005,
            fadeEdge: 100,
            ...options
        };

        this.particles = [];
        this.pool = [];
        this.isRunning = false;
        this.time = 0;
        this.lastTime = 0;

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.setupVisibilityObserver();
        window.addEventListener('resize', () => this.resize());
        this.start();
    }

    resize() {
        const dpr = Math.min(window.devicePixelRatio, 2);
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
    }

    createParticle() {
        // Reuse from pool if available
        if (this.pool.length > 0) {
            return this.pool.pop();
        }

        return {
            x: 0,
            y: 0,
            z: 0,
            size: 0,
            baseSize: 0,
            color: '',
            alpha: 0,
            vx: 0,
            vy: 0,
            noiseOffsetX: 0,
            noiseOffsetY: 0
        };
    }

    initParticle(p) {
        const { colors, minSize, maxSize } = this.options;

        p.x = Math.random() * this.width;
        p.y = Math.random() * this.height;
        p.z = Math.random(); // Depth (0-1)
        p.baseSize = minSize + Math.random() * (maxSize - minSize);
        p.size = p.baseSize * (0.5 + p.z * 0.5);
        p.color = colors[Math.floor(Math.random() * colors.length)];
        p.alpha = 0.3 + p.z * 0.7;
        p.vx = (Math.random() - 0.5) * 0.5;
        p.vy = (Math.random() - 0.5) * 0.5;
        p.noiseOffsetX = Math.random() * 1000;
        p.noiseOffsetY = Math.random() * 1000;

        return p;
    }

    createParticles() {
        const count = this.options.particleCount;
        this.particles = [];

        for (let i = 0; i < count; i++) {
            const p = this.createParticle();
            this.initParticle(p);
            this.particles.push(p);
        }
    }

    setupVisibilityObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.start();
                } else {
                    this.stop();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this.canvas);
    }

    update(deltaTime) {
        const { noiseScale, noiseSpeed, speedFactor, fadeEdge } = this.options;
        this.time += deltaTime * noiseSpeed;

        for (const p of this.particles) {
            // Perlin noise driven movement
            const nx = this.noise.noise3D(
                p.x * noiseScale + p.noiseOffsetX,
                p.y * noiseScale + p.noiseOffsetY,
                this.time
            );
            const ny = this.noise.noise3D(
                p.x * noiseScale + p.noiseOffsetX + 100,
                p.y * noiseScale + p.noiseOffsetY + 100,
                this.time
            );

            // Apply noise and base velocity
            p.x += (nx * 2 + p.vx) * speedFactor * (0.5 + p.z);
            p.y += (ny * 2 + p.vy) * speedFactor * (0.5 + p.z);

            // Wrap around edges
            if (p.x < -10) p.x = this.width + 10;
            if (p.x > this.width + 10) p.x = -10;
            if (p.y < -10) p.y = this.height + 10;
            if (p.y > this.height + 10) p.y = -10;

            // Fade near edges
            let edgeAlpha = 1;
            if (p.x < fadeEdge) edgeAlpha = Math.min(edgeAlpha, p.x / fadeEdge);
            if (p.x > this.width - fadeEdge) edgeAlpha = Math.min(edgeAlpha, (this.width - p.x) / fadeEdge);
            if (p.y < fadeEdge) edgeAlpha = Math.min(edgeAlpha, p.y / fadeEdge);
            if (p.y > this.height - fadeEdge) edgeAlpha = Math.min(edgeAlpha, (this.height - p.y) / fadeEdge);

            p.alpha = (0.3 + p.z * 0.7) * edgeAlpha;

            // Pulsing size
            p.size = p.baseSize * (0.5 + p.z * 0.5) * (0.8 + Math.sin(this.time * 1000 + p.noiseOffsetX) * 0.2);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Sort by z for depth effect
        this.particles.sort((a, b) => a.z - b.z);

        for (const p of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fill();
        }

        this.ctx.globalAlpha = 1;
    }

    animate(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame((t) => this.animate(t));
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.animate(t));
    }

    stop() {
        this.isRunning = false;
    }

    destroy() {
        this.stop();
        // Return all particles to pool
        while (this.particles.length > 0) {
            this.pool.push(this.particles.pop());
        }
    }
}

// Export for global access
window.ParticleSystem = ParticleSystem;
