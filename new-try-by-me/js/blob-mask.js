/**
 * NEXUS Studio - Blob Mask Animation
 * Lusion-style organic shape morphing with video content
 */

class BlobMaskAnimation {
    constructor() {
        this.container = document.getElementById('blobMask');
        this.canvas = document.getElementById('blobCanvas');
        this.video = document.getElementById('maskVideo');

        if (!this.container || !this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.progress = 0;
        this.isVisible = false;
        this.isMobile = window.innerWidth < 768;

        // Initialize Simplex noise for organic movement
        this.noise = typeof SimplexNoise !== 'undefined' ? new SimplexNoise() : null;
        this.time = 0;

        // Shape keyframes - normalized bezier paths (will be scaled)
        this.shapes = {
            // Small tablet (initial)
            tablet: this.createTabletPath(0.3, 0.4),
            // Organic blob 1
            blob1: this.createBlobPath(0.5, 0.5, 0.15),
            // Larger blob 2 with rotation
            blob2: this.createBlobPath(0.7, 0.6, 0.2),
            // Full rectangle
            rectangle: this.createRectPath(0.9, 0.85)
        };

        this.init();
    }

    init() {
        this.resize();
        this.setupScrollTrigger();
        this.setupVideo();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const dpr = Math.min(window.devicePixelRatio, 2);
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }

    setupVideo() {
        if (this.video) {
            this.video.play().catch(() => {
                // Autoplay blocked, will play on interaction
                document.addEventListener('click', () => {
                    this.video.play();
                }, { once: true });
            });
        }
    }

    createTabletPath(widthRatio, heightRatio) {
        return (ctx, cx, cy, w, h) => {
            const tw = w * widthRatio;
            const th = h * heightRatio;
            const radius = 20;

            ctx.beginPath();
            ctx.moveTo(cx - tw / 2 + radius, cy - th / 2);
            ctx.lineTo(cx + tw / 2 - radius, cy - th / 2);
            ctx.quadraticCurveTo(cx + tw / 2, cy - th / 2, cx + tw / 2, cy - th / 2 + radius);
            ctx.lineTo(cx + tw / 2, cy + th / 2 - radius);
            ctx.quadraticCurveTo(cx + tw / 2, cy + th / 2, cx + tw / 2 - radius, cy + th / 2);
            ctx.lineTo(cx - tw / 2 + radius, cy + th / 2);
            ctx.quadraticCurveTo(cx - tw / 2, cy + th / 2, cx - tw / 2, cy + th / 2 - radius);
            ctx.lineTo(cx - tw / 2, cy - th / 2 + radius);
            ctx.quadraticCurveTo(cx - tw / 2, cy - th / 2, cx - tw / 2 + radius, cy - th / 2);
            ctx.closePath();
        };
    }

    createBlobPath(widthRatio, heightRatio, wobble) {
        const self = this;
        return (ctx, cx, cy, w, h, time = 0) => {
            const tw = w * widthRatio;
            const th = h * heightRatio;
            const points = 12; // More points for smoother blob

            ctx.beginPath();
            for (let i = 0; i <= points; i++) {
                const angle = (i / points) * Math.PI * 2;

                // Use Perlin noise for organic wobble if available
                let wobbleAmount;
                if (self.noise) {
                    const noiseVal = self.noise.noise3D(
                        Math.cos(angle) * 2,
                        Math.sin(angle) * 2,
                        time * 0.5
                    );
                    wobbleAmount = noiseVal * wobble * 1.5;
                } else {
                    wobbleAmount = Math.sin(angle * 3 + time * 2) * wobble;
                }

                const rx = (tw / 2) * (1 + wobbleAmount);
                const ry = (th / 2) * (1 + wobbleAmount * 0.8);
                const x = cx + Math.cos(angle) * rx;
                const y = cy + Math.sin(angle) * ry;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    // Use bezier curves for smoothness
                    const prevAngle = ((i - 1) / points) * Math.PI * 2;
                    let prevWobble;
                    if (self.noise) {
                        prevWobble = self.noise.noise3D(
                            Math.cos(prevAngle) * 2,
                            Math.sin(prevAngle) * 2,
                            time * 0.5
                        ) * wobble * 1.5;
                    } else {
                        prevWobble = Math.sin(prevAngle * 3 + time * 2) * wobble;
                    }
                    const prevRx = (tw / 2) * (1 + prevWobble);
                    const prevRy = (th / 2) * (1 + prevWobble * 0.8);

                    const cp1x = cx + Math.cos(prevAngle + 0.15) * prevRx * 1.08;
                    const cp1y = cy + Math.sin(prevAngle + 0.15) * prevRy * 1.08;
                    const cp2x = cx + Math.cos(angle - 0.15) * rx * 1.08;
                    const cp2y = cy + Math.sin(angle - 0.15) * ry * 1.08;

                    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                }
            }
            ctx.closePath();
        };
    }

    createRectPath(widthRatio, heightRatio) {
        return (ctx, cx, cy, w, h) => {
            const tw = w * widthRatio;
            const th = h * heightRatio;
            const radius = 30;

            ctx.beginPath();
            ctx.moveTo(cx - tw / 2 + radius, cy - th / 2);
            ctx.lineTo(cx + tw / 2 - radius, cy - th / 2);
            ctx.quadraticCurveTo(cx + tw / 2, cy - th / 2, cx + tw / 2, cy - th / 2 + radius);
            ctx.lineTo(cx + tw / 2, cy + th / 2 - radius);
            ctx.quadraticCurveTo(cx + tw / 2, cy + th / 2, cx + tw / 2 - radius, cy + th / 2);
            ctx.lineTo(cx - tw / 2 + radius, cy + th / 2);
            ctx.quadraticCurveTo(cx - tw / 2, cy + th / 2, cx - tw / 2, cy + th / 2 - radius);
            ctx.lineTo(cx - tw / 2, cy - th / 2 + radius);
            ctx.quadraticCurveTo(cx - tw / 2, cy - th / 2, cx - tw / 2 + radius, cy - th / 2);
            ctx.closePath();
        };
    }

    setupScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: this.container,
            start: 'top top',
            end: 'bottom bottom',
            pin: '.blob-canvas-wrapper',
            scrub: 1,
            onUpdate: (self) => {
                this.progress = self.progress;
                this.isVisible = true;
            },
            onLeave: () => {
                this.isVisible = false;
            },
            onEnterBack: () => {
                this.isVisible = true;
            }
        });

        // Animate flowing curves
        gsap.to('.flowing-curve', {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: this.container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        });
    }

    drawFrame(time) {
        const ctx = this.ctx;
        const progress = this.progress;

        // Clear canvas
        ctx.clearRect(0, 0, this.width, this.height);

        // Determine which shape transition we're in
        let currentShape;
        const t = time * 0.001;

        if (progress < 0.25) {
            // Tablet to blob1
            const p = progress / 0.25;
            this.drawMorphedShape(ctx, this.shapes.tablet, this.shapes.blob1, p, t);
        } else if (progress < 0.5) {
            // Blob1 to blob2
            const p = (progress - 0.25) / 0.25;
            this.drawMorphedShape(ctx, this.shapes.blob1, this.shapes.blob2, p, t);
        } else if (progress < 0.75) {
            // Blob2 to rectangle
            const p = (progress - 0.5) / 0.25;
            this.drawMorphedShape(ctx, this.shapes.blob2, this.shapes.rectangle, p, t);
        } else {
            // Full rectangle
            this.drawShape(ctx, this.shapes.rectangle, t);
        }
    }

    drawShape(ctx, shapeFn, time) {
        ctx.save();

        // Draw shape as clip path
        shapeFn(ctx, this.centerX, this.centerY, this.width, this.height, time);
        ctx.clip();

        // Draw video or gradient inside
        if (this.video && this.video.readyState >= 2) {
            // Calculate cover sizing
            const videoRatio = this.video.videoWidth / this.video.videoHeight;
            const canvasRatio = this.width / this.height;
            let drawWidth, drawHeight, drawX, drawY;

            if (canvasRatio > videoRatio) {
                drawWidth = this.width;
                drawHeight = this.width / videoRatio;
                drawX = 0;
                drawY = (this.height - drawHeight) / 2;
            } else {
                drawHeight = this.height;
                drawWidth = this.height * videoRatio;
                drawY = 0;
                drawX = (this.width - drawWidth) / 2;
            }

            ctx.drawImage(this.video, drawX, drawY, drawWidth, drawHeight);
        } else {
            // Fallback gradient
            const gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
            gradient.addColorStop(0, '#0066FF');
            gradient.addColorStop(0.5, '#00D9FF');
            gradient.addColorStop(1, '#1A1D29');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width, this.height);
        }

        ctx.restore();

        // Draw border glow
        ctx.save();
        shapeFn(ctx, this.centerX, this.centerY, this.width, this.height, time);
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.4)';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#00D9FF';
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.restore();
    }

    drawMorphedShape(ctx, shape1, shape2, progress, time) {
        // Use eased progress for smoother morphing
        const easedProgress = this.easeInOutCubic(progress);

        // Since we can't easily interpolate path functions,
        // we'll crossfade opacity between shapes
        ctx.save();
        ctx.globalAlpha = 1 - easedProgress;
        this.drawShape(ctx, shape1, time);
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = easedProgress;
        this.drawShape(ctx, shape2, time);
        ctx.restore();
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    animate() {
        const time = performance.now();

        if (this.isVisible || this.progress > 0) {
            this.drawFrame(time);
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Flowing curves animation controller
class FlowingCurves {
    constructor() {
        this.curves = document.querySelectorAll('.flowing-curve');
        if (this.curves.length === 0) return;

        this.init();
    }

    init() {
        this.curves.forEach((curve, i) => {
            const length = curve.getTotalLength();
            curve.style.strokeDasharray = length;
            curve.style.strokeDashoffset = length;

            gsap.to(curve, {
                strokeDashoffset: 0,
                duration: 2,
                delay: i * 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#blobMask',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
}

// Export for global access
window.BlobMaskAnimation = BlobMaskAnimation;
window.FlowingCurves = FlowingCurves;
