/**
 * NEXUS Studio - GSAP Animations
 * Enhanced scroll-triggered animations with performance optimizations
 */

class AnimationController {
    constructor() {
        // Check for reduced motion preference
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Animation duration constants
        this.DURATION = {
            fast: 0.4,
            normal: 0.6,
            slow: 0.8,
            xslow: 1.0
        };

        // Easing presets
        this.EASE = {
            smooth: 'power3.out',
            bounce: 'elastic.out(1, 0.5)',
            snap: 'back.out(1.7)',
            linear: 'none'
        };

        this.init();
    }

    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Skip animations if user prefers reduced motion
        if (this.prefersReducedMotion) {
            this.showAllContent();
            return;
        }

        // Initialize all animations
        this.heroAnimations();
        this.scrollIndicator();
        this.aboutAnimations();
        this.showreelAnimations();
        this.workAnimations();
        this.ctaAnimations();
        this.headerScroll();
        this.scrollProgress();
        this.projectCardHovers();
        this.ctaGradientAnimation();
    }

    // Show all content immediately for reduced motion
    showAllContent() {
        gsap.set('.hero-line, .hero-subtitle, .about-title .word, .about-text, .about .btn, .cta-word, .cta-subtitle, .cta .btn, .project-card, .work-title .title-line', {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1
        });
    }

    heroAnimations() {
        const heroLines = document.querySelectorAll('.hero-line');
        const heroSubtitle = document.querySelector('.hero-subtitle');

        // Timeline for hero entrance
        const heroTL = gsap.timeline({ delay: 1.8 });

        // Animate hero lines with stagger
        heroTL.fromTo(heroLines,
            {
                opacity: 0,
                y: 40,
                clipPath: 'inset(0 0 100% 0)'
            },
            {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: this.DURATION.slow,
                stagger: 0.12,
                ease: this.EASE.smooth
            }
        );

        // Animate hero subtitle with reveal
        if (heroSubtitle) {
            heroTL.fromTo(heroSubtitle,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: this.DURATION.slow,
                    ease: this.EASE.smooth
                },
                '-=0.3'
            );
        }
    }

    scrollIndicator() {
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (!scrollIndicator) return;

        // Fade out with parallax on scroll
        ScrollTrigger.create({
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            onUpdate: (self) => {
                const opacity = 1 - self.progress * 3;
                const translateY = self.progress * 30;
                scrollIndicator.style.opacity = Math.max(0, opacity);
                scrollIndicator.style.transform = `translateY(${translateY}px)`;
            }
        });
    }

    aboutAnimations() {
        // Animate title words with character reveal
        const aboutWords = document.querySelectorAll('.about-title .word');

        gsap.fromTo(aboutWords,
            {
                opacity: 0,
                y: 50,
                rotateX: -30
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: this.DURATION.slow,
                stagger: 0.08,
                ease: this.EASE.smooth,
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate about text and button with stagger
        gsap.fromTo('.about-text, .about .btn',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: this.DURATION.normal,
                stagger: 0.15,
                ease: this.EASE.smooth,
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Parallax on about visual
        gsap.to('.about-visual', {
            yPercent: -15,
            ease: this.EASE.linear,
            scrollTrigger: {
                trigger: '.about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }

    showreelAnimations() {
        const playText = document.querySelector('.play-text');
        const reelText = document.querySelector('.reel-text');
        const playButton = document.querySelector('.play-button');

        // Timeline for showreel entrance
        const reelTL = gsap.timeline({
            scrollTrigger: {
                trigger: '.showreel',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });

        // Character reveal for PLAY text
        if (playText) {
            reelTL.fromTo(playText,
                {
                    opacity: 0,
                    y: 30,
                    letterSpacing: '0.5em'
                },
                {
                    opacity: 1,
                    y: 0,
                    letterSpacing: '0.3em',
                    duration: this.DURATION.slow,
                    ease: this.EASE.smooth
                }
            );
        }

        // REEL text follows
        if (reelText) {
            reelTL.fromTo(reelText,
                {
                    opacity: 0,
                    y: 30,
                    letterSpacing: '0.5em'
                },
                {
                    opacity: 1,
                    y: 0,
                    letterSpacing: '0.3em',
                    duration: this.DURATION.slow,
                    ease: this.EASE.smooth
                },
                '-=0.5'
            );
        }

        // Play button scale and glow
        if (playButton) {
            reelTL.fromTo(playButton,
                {
                    scale: 0.8,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: this.DURATION.normal,
                    ease: this.EASE.snap
                },
                '-=0.3'
            );
        }
    }

    workAnimations() {
        // Animate section title with slide up
        const titleLines = document.querySelectorAll('.work-title .title-line');

        gsap.fromTo(titleLines,
            {
                opacity: 0,
                y: 60,
                clipPath: 'inset(100% 0 0 0)'
            },
            {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0% 0 0 0)',
                duration: this.DURATION.xslow,
                stagger: 0.15,
                ease: this.EASE.smooth,
                scrollTrigger: {
                    trigger: '.work-header',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate project cards with stagger from bottom
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: this.DURATION.slow,
                    delay: index * 0.1,
                    ease: this.EASE.smooth,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate badges within each card
            const badges = card.querySelectorAll('.project-tech span');
            if (badges.length) {
                gsap.fromTo(badges,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: this.DURATION.fast,
                        stagger: 0.05,
                        ease: this.EASE.smooth,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }
        });

        // Subtitle slide in from right
        gsap.fromTo('.work-subtitle',
            { opacity: 0, x: 40 },
            {
                opacity: 1,
                x: 0,
                duration: this.DURATION.slow,
                ease: this.EASE.smooth,
                scrollTrigger: {
                    trigger: '.work-header',
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    projectCardHovers() {
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.03,
                    y: -8,
                    boxShadow: '0 25px 50px rgba(0, 102, 255, 0.15)',
                    duration: this.DURATION.fast,
                    ease: this.EASE.smooth
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    duration: this.DURATION.fast,
                    ease: this.EASE.smooth
                });
            });
        });
    }

    ctaAnimations() {
        // Word-by-word reveal for CTA title
        const ctaWords = document.querySelectorAll('.cta-word');

        const ctaTL = gsap.timeline({
            scrollTrigger: {
                trigger: '.cta',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });

        ctaTL.fromTo(ctaWords,
            {
                opacity: 0,
                y: 40,
                rotateY: -20
            },
            {
                opacity: 1,
                y: 0,
                rotateY: 0,
                duration: this.DURATION.normal,
                stagger: 0.08,
                ease: this.EASE.smooth
            }
        );

        // Subtitle with bounce
        ctaTL.fromTo('.cta-subtitle',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: this.DURATION.slow,
                ease: this.EASE.bounce
            },
            '-=0.3'
        );

        // Button with scale pop
        ctaTL.fromTo('.cta .btn',
            { opacity: 0, scale: 0.85 },
            {
                opacity: 1,
                scale: 1,
                duration: this.DURATION.normal,
                ease: this.EASE.snap
            },
            '-=0.4'
        );
    }

    ctaGradientAnimation() {
        const ctaSection = document.querySelector('.cta');
        if (!ctaSection) return;

        // Create animated gradient background
        let gradientPos = 0;

        const animateGradient = () => {
            gradientPos += 0.5;
            ctaSection.style.backgroundPosition = `${gradientPos}% 50%`;
            requestAnimationFrame(animateGradient);
        };

        // Only animate when section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateGradient();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(ctaSection);
    }

    headerScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'max',
            onUpdate: (self) => {
                if (self.scroll() > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    }

    scrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;

        // Use GSAP for smoother progress updates
        ScrollTrigger.create({
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                gsap.to(progressBar, {
                    height: `${self.progress * 100}%`,
                    duration: 0.1,
                    ease: 'none'
                });
            }
        });
    }
}

// Export for global access
window.AnimationController = AnimationController;
