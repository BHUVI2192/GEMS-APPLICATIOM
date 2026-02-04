/**
 * NEXUS Studio - Custom Cursor
 * Interactive cursor with hover effects and magnetic buttons
 */

class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        if (!this.cursor || this.isTouchDevice()) return;

        this.cursorDot = this.cursor.querySelector('.cursor-dot');
        this.cursorCircle = this.cursor.querySelector('.cursor-circle');

        this.mousePos = { x: 0, y: 0 };
        this.cursorPos = { x: 0, y: 0 };
        this.circlePos = { x: 0, y: 0 };

        this.init();
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    init() {
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });

        // Handle hover states
        this.setupHoverEffects();

        // Handle click states
        document.addEventListener('mousedown', () => this.cursor.classList.add('click'));
        document.addEventListener('mouseup', () => this.cursor.classList.remove('click'));

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });

        // Start animation loop
        this.animate();
    }

    setupHoverEffects() {
        // Elements that trigger hover state
        const hoverElements = document.querySelectorAll('a, button, .project-card, .play-button');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });

        // Magnetic effect on buttons
        const magneticElements = document.querySelectorAll('.btn, .play-button, .sound-toggle, .menu-toggle');

        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => this.handleMagnetic(e, el));
            el.addEventListener('mouseleave', () => this.resetMagnetic(el));
        });
    }

    handleMagnetic(e, el) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        const magnetStrength = 0.3;

        el.style.transform = `translate(${distanceX * magnetStrength}px, ${distanceY * magnetStrength}px) scale(1.02)`;
    }

    resetMagnetic(el) {
        el.style.transform = '';
    }

    animate() {
        // Smooth follow for dot (faster)
        this.cursorPos.x += (this.mousePos.x - this.cursorPos.x) * 0.2;
        this.cursorPos.y += (this.mousePos.y - this.cursorPos.y) * 0.2;

        // Smooth follow for circle (slower for trail effect)
        this.circlePos.x += (this.mousePos.x - this.circlePos.x) * 0.1;
        this.circlePos.y += (this.mousePos.y - this.circlePos.y) * 0.1;

        // Apply positions
        if (this.cursorDot) {
            this.cursorDot.style.left = `${this.cursorPos.x}px`;
            this.cursorDot.style.top = `${this.cursorPos.y}px`;
        }

        if (this.cursorCircle) {
            this.cursorCircle.style.left = `${this.circlePos.x}px`;
            this.cursorCircle.style.top = `${this.circlePos.y}px`;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Export for global access
window.CustomCursor = CustomCursor;
