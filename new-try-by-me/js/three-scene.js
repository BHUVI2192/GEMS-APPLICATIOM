/**
 * NEXUS Studio - Three.js 3D Scene
 * WebGL canvas with animated geometric objects
 */

class ThreeScene {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.options = {
            backgroundColor: 0x0a0a0a,
            cameraFov: 75,
            cameraDistance: 5,
            noiseScale: 0.5,
            noiseSpeed: 0.3,
            ...options
        };

        this.objects = [];
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.clock = new THREE.Clock();
        this.isVisible = true;
        this.isMobile = window.innerWidth < 768;

        // Initialize Simplex noise for organic movement
        this.noise = typeof SimplexNoise !== 'undefined' ? new SimplexNoise() : null;

        if (this.init()) {
            this.createObjects();
            this.addEventListeners();
            this.animate();
        }
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            this.options.cameraFov,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = this.options.cameraDistance;

        // Renderer
        try {
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: !this.isMobile,
                alpha: true,
                powerPreference: 'high-performance'
            });
        } catch (e) {
            console.warn('High-perf WebGL failed in ThreeScene, trying default settings', e);
            try {
                this.renderer = new THREE.WebGLRenderer({
                    canvas: this.canvas,
                    antialias: false,
                    alpha: true
                });
            } catch (e2) {
                console.warn('3D features disabled: WebGL not supported in ThreeScene');
                this.canvas.style.display = 'none';
                return false;
            }
        }
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0x0066ff, 1, 10);
        pointLight1.position.set(-3, 2, 2);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00d9ff, 0.8, 10);
        pointLight2.position.set(3, -2, 2);
        this.scene.add(pointLight2);

        return true;
    }

    createObjects() {
        const objectCount = this.isMobile ? 4 : 8;
        const geometryTypes = [
            () => new THREE.CylinderGeometry(0.3, 0.3, 0.8, 32),
            () => new THREE.BoxGeometry(0.5, 0.5, 0.5),
            () => new THREE.OctahedronGeometry(0.4),
            () => new THREE.TorusGeometry(0.3, 0.1, 16, 50),
            () => new THREE.ConeGeometry(0.3, 0.6, 32),
            () => new THREE.SphereGeometry(0.3, 32, 32),
            () => new THREE.IcosahedronGeometry(0.35),
            () => new THREE.TetrahedronGeometry(0.4)
        ];

        const colors = [
            0x0066ff, // Electric blue
            0xcccccc, // Matte gray
            0x00d9ff, // Cyan
            0xb8b8b8, // Light gray
            0x1a1d29, // Deep blue
            0x0052cc  // Dark blue
        ];

        for (let i = 0; i < objectCount; i++) {
            const geometry = geometryTypes[i % geometryTypes.length]();
            const material = new THREE.MeshStandardMaterial({
                color: colors[i % colors.length],
                metalness: 0.3,
                roughness: 0.4,
                flatShading: i % 3 === 0
            });

            const mesh = new THREE.Mesh(geometry, material);

            // Random position in 3D space
            const angle = (i / objectCount) * Math.PI * 2;
            const radius = 1.5 + Math.random() * 1.5;
            mesh.position.x = Math.cos(angle) * radius;
            mesh.position.y = (Math.random() - 0.5) * 2;
            mesh.position.z = (Math.random() - 0.5) * 2 - 1;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            // Store animation properties
            mesh.userData = {
                initialPosition: mesh.position.clone(),
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.005
                },
                floatSpeed: 0.5 + Math.random() * 0.5,
                floatAmplitude: 0.1 + Math.random() * 0.2,
                phase: Math.random() * Math.PI * 2
            };

            this.objects.push(mesh);
            this.scene.add(mesh);
        }
    }

    addEventListeners() {
        // Mouse move
        window.addEventListener('mousemove', (e) => {
            this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
            this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // Resize
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth < 768;
            this.resize();
        });

        // Visibility observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });

        observer.observe(this.canvas);
    }

    resize() {
        if (!this.canvas) return;

        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    animate() {
        if (!this.isVisible) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        const elapsedTime = this.clock.getElapsedTime();
        const { noiseScale, noiseSpeed } = this.options;

        // Smooth mouse follow with cubic easing
        const ease = 0.08;
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * ease;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * ease;

        // Animate objects with Perlin noise
        this.objects.forEach((obj, index) => {
            const { rotationSpeed, floatAmplitude, phase, initialPosition } = obj.userData;
            const noiseTime = elapsedTime * noiseSpeed;

            // Continuous smooth rotation
            obj.rotation.x += rotationSpeed.x;
            obj.rotation.y += rotationSpeed.y;
            obj.rotation.z += rotationSpeed.z;

            // Perlin noise-driven organic floating
            if (this.noise) {
                const noiseX = this.noise.noise3D(index * 10, noiseTime, 0) * floatAmplitude * 1.5;
                const noiseY = this.noise.noise3D(index * 10, noiseTime + 100, 0) * floatAmplitude * 1.5;
                const noiseZ = this.noise.noise3D(index * 10, noiseTime + 200, 0) * floatAmplitude * 0.5;

                obj.position.x = initialPosition.x + noiseX;
                obj.position.y = initialPosition.y + noiseY;
                obj.position.z = initialPosition.z + noiseZ;
            } else {
                // Fallback to sine wave motion
                obj.position.y = initialPosition.y + Math.sin(elapsedTime * 0.5 + phase) * floatAmplitude;
                obj.position.x = initialPosition.x + Math.cos(elapsedTime * 0.3 + phase) * floatAmplitude * 0.5;
            }

            // Mouse parallax with smooth depth effect
            const depthFactor = 0.1 + (index / this.objects.length) * 0.1;
            obj.position.x += this.mouse.x * depthFactor * (index % 2 === 0 ? 1 : -1);
            obj.position.y += this.mouse.y * depthFactor * (index % 2 === 0 ? -1 : 1);

            // Subtle scale pulsing
            const scalePulse = 1 + Math.sin(elapsedTime * 0.8 + phase) * 0.05;
            obj.scale.setScalar(scalePulse);
        });

        // Camera subtle organic movement
        if (this.noise) {
            const camNoiseX = this.noise.noise2D(elapsedTime * 0.1, 0) * 0.1;
            const camNoiseY = this.noise.noise2D(elapsedTime * 0.1, 100) * 0.1;
            this.camera.position.x = this.mouse.x * 0.3 + camNoiseX;
            this.camera.position.y = this.mouse.y * 0.2 + camNoiseY;
        } else {
            this.camera.position.x = this.mouse.x * 0.3;
            this.camera.position.y = this.mouse.y * 0.2;
        }
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }

    // Scroll-based rotation
    updateScroll(scrollProgress) {
        this.objects.forEach((obj, index) => {
            obj.rotation.y += scrollProgress * 0.02 * (index % 2 === 0 ? 1 : -1);
        });
    }
}

// Secondary scene for About section (simpler)
class AboutScene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas || window.innerWidth < 768) return;

        if (this.init()) {
            this.createGeometry();
            this.animate();
        }
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.camera.position.z = 3;

        try {
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: true,
                alpha: true
            });
        } catch (e) {
            console.warn('3D features disabled: WebGL not supported in AboutScene');
            this.canvas.style.display = 'none';
            return false;
        }

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x0066ff, 1);
        directionalLight.position.set(2, 2, 2);
        this.scene.add(directionalLight);

        this.clock = new THREE.Clock();

        window.addEventListener('resize', () => this.resize());
        return true;
    }

    createGeometry() {
        // Create a morphing torus knot
        const geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0x0066ff,
            metalness: 0.5,
            roughness: 0.3,
            wireframe: false
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }

    resize() {
        if (!this.canvas) return;

        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        const elapsedTime = this.clock.getElapsedTime();

        if (this.mesh) {
            this.mesh.rotation.x = elapsedTime * 0.2;
            this.mesh.rotation.y = elapsedTime * 0.3;
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }
}

// Export for global access
window.ThreeScene = ThreeScene;
window.AboutScene = AboutScene;
