/**
 * NEXUS Studio - Main Application
 * Initialize all components and handle global functionality
 */

class App {
    constructor() {
        this.init();
    }

    async init() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Simulate loading
        this.handleLoader();

        // Initialize components after loader
        setTimeout(() => {
            this.initThreeScenes();
            // this.initBlobMaskAnimation(); // Replaced by FlowerBloom
            this.initFlowerBloom();
            this.initImmersiveTablet();
            this.initFlowingCurves();
            this.initCursor();
            this.initAnimations();
            this.initMobileMenu();
            this.initSoundToggle();
            this.initShowreel();
            this.initNewsletter();
            this.initSmoothScroll();
            this.initBlobContentAnimations();
            this.initImmersiveContentAnimations();
        }, 500);
    }

    handleLoader() {
        const loader = document.getElementById('loader');
        const loaderBar = document.querySelector('.loader-bar');
        const loaderPercent = document.querySelector('.loader-percent');

        if (!loader) return;

        let progress = 0;
        const duration = 1500;
        const startTime = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / duration * 100, 100);

            if (loaderBar) loaderBar.style.width = `${progress}%`;
            if (loaderPercent) loaderPercent.textContent = `${Math.round(progress)}%`;

            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                // Complete loading
                setTimeout(() => {
                    loader.classList.add('loaded');
                    document.body.style.overflow = '';
                }, 200);
            }
        };

        // Prevent scroll during loading
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(updateProgress);
    }

    initThreeScenes() {
        // Only init 3D on desktop/tablet
        if (window.innerWidth >= 768) {
            try {
                window.heroScene = new ThreeScene('heroCanvas');
                window.aboutScene = new AboutScene('aboutCanvas');
            } catch (e) {
                console.warn('WebGL not supported:', e);
            }
        }
    }

    initCursor() {
        window.cursor = new CustomCursor();
    }

    initAnimations() {
        window.animations = new AnimationController();
    }

    initBlobMaskAnimation() {
        try {
            if (typeof BlobMaskAnimation !== 'undefined') {
                window.blobMask = new BlobMaskAnimation();
            }
        } catch (e) {
            console.warn('Blob mask animation not available:', e);
        }
    }

    initImmersiveTablet() {
        // Only init 3D on desktop/tablet
        if (window.innerWidth >= 768) {
            try {
                if (typeof ImmersiveTablet !== 'undefined') {
                    window.immersiveTablet = new ImmersiveTablet();
                }
            } catch (e) {
                console.warn('Immersive tablet not available:', e);
            }
        }
    }

    initFlowingCurves() {
        try {
            if (typeof FlowingCurves !== 'undefined') {
                window.flowingCurves = new FlowingCurves();
            }
        } catch (e) {
            console.warn('Flowing curves not available:', e);
        }
    }

    initFlowerBloom() {
        try {
            if (typeof FlowerBloom !== 'undefined') {
                window.flowerBloom = new FlowerBloom();
            }
        } catch (e) {
            console.warn('Flower bloom not available:', e);
        }
    }

    initBlobContentAnimations() {
        // Animate blob section content
        const blobWords = document.querySelectorAll('.blob-word');
        const playReelText = document.querySelector('.play-reel-text');

        if (blobWords.length > 0) {
            gsap.fromTo(blobWords,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '#blobMask',
                        start: 'top 60%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        if (playReelText) {
            gsap.fromTo(playReelText,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '#blobMask',
                        start: 'top 40%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    }

    initImmersiveContentAnimations() {
        // Animate immersive section content
        const immersiveLines = document.querySelectorAll('.immersive-line');
        const immersiveSubtitle = document.querySelector('.immersive-subtitle');

        if (immersiveLines.length > 0) {
            gsap.fromTo(immersiveLines,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '#immersive',
                        start: 'top 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        if (immersiveSubtitle) {
            gsap.fromTo(immersiveSubtitle,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '#immersive',
                        start: 'top 40%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    }

    initMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');

        if (!menuToggle || !mobileMenu) return;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    initSoundToggle() {
        const soundToggle = document.getElementById('soundToggle');
        if (!soundToggle) return;

        let isMuted = true;

        soundToggle.addEventListener('click', () => {
            isMuted = !isMuted;
            soundToggle.classList.toggle('muted', isMuted);

            // Rotate animation
            soundToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                soundToggle.style.transform = '';
            }, 500);
        });
    }

    initShowreel() {
        const playButton = document.getElementById('playButton');
        const showreelVideo = document.getElementById('reelVideo');
        const showreelContainer = document.getElementById('showreelVideo');

        if (!playButton || !showreelContainer) return;

        // Create a placeholder video instead since we don't have actual video
        // The video element will just show the gradient background

        let isPlaying = false;

        playButton.addEventListener('click', () => {
            if (showreelVideo) {
                if (isPlaying) {
                    showreelVideo.pause();
                    showreelContainer.classList.remove('playing');
                } else {
                    showreelVideo.play().catch(() => {
                        // Video playback failed, probably no source
                        console.log('Video playback not available');
                    });
                    showreelContainer.classList.add('playing');
                }
                isPlaying = !isPlaying;
            }
        });
    }

    initNewsletter() {
        const form = document.getElementById('newsletter');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('.newsletter-input');
            const submitBtn = form.querySelector('.newsletter-submit');

            if (input && input.value) {
                // Simulate submission
                submitBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"/>
                    </svg>
                `;
                submitBtn.style.color = '#4CAF50';
                input.value = '';
                input.placeholder = 'Thank you!';

                setTimeout(() => {
                    submitBtn.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    `;
                    submitBtn.style.color = '';
                    input.placeholder = 'Your email';
                }, 3000);
            }
        });
    }

    initSmoothScroll() {
        // Handle anchor links for smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Parallax scroll effect for 3D scene
        let lastScrollY = 0;
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const delta = scrollY - lastScrollY;
            lastScrollY = scrollY;

            if (window.heroScene) {
                window.heroScene.updateScroll(delta * 0.001);
            }
        }, { passive: true });
    }
}

// Initialize app when DOM is ready
window.addEventListener('load', () => {
    window.app = new App();
});
