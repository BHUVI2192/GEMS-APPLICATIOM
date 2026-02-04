/**
 * NEXUS Studio - 3D Immersive Tablet Animation
 * Camera flies into tablet with white screen and space-like text reveal
 */

class ImmersiveTablet {
    constructor() {
        this.container = document.getElementById('immersive');
        this.canvas = document.getElementById('immersiveCanvas');

        if (!this.container || !this.canvas) return;

        this.progress = 0;
        this.isVisible = false;
        this.isMobile = window.innerWidth < 768;
        this.textSprites = [];

        this.init();
    }

    init() {
        if (!this.setupScene()) return;

        this.createTablet();
        this.createInnerWorld();
        this.createSpaceText();
        this.createStars();
        this.setupScrollTrigger();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    setupScene() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff); // White background

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            60,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 10);

        // Renderer
        try {
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: !this.isMobile,
                alpha: false,
                powerPreference: 'high-performance'
            });
        } catch (e) {
            console.warn('High-perf WebGL failed in ImmersiveTablet, trying default settings');
            try {
                this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
            } catch (e2) {
                console.warn('3D features disabled: WebGL not supported in ImmersiveTablet');
                this.canvas.style.display = 'none';
                return false;
            }
        }
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1, 50);
        spotLight.position.set(0, 5, 10);
        this.scene.add(spotLight);

        this.clock = new THREE.Clock();
        return true;
    }

    createTablet() {
        this.tabletGroup = new THREE.Group();

        // Tablet frame (dark outer shell) - Keep dark for contrast on white
        const frameGeometry = new THREE.BoxGeometry(5, 3.5, 0.2);
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.9,
            roughness: 0.2
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        this.tabletGroup.add(frame);
        this.tabletFrame = frame;

        // Screen bezel (black border)
        const bezelGeometry = new THREE.BoxGeometry(4.6, 3.1, 0.05);
        const bezelMaterial = new THREE.MeshStandardMaterial({
            color: 0x000000,
            metalness: 0.5,
            roughness: 0.8
        });
        const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
        bezel.position.z = 0.1;
        this.tabletGroup.add(bezel);
        this.tabletBezel = bezel;

        // WHITE SCREEN - Clean interface
        const screenGeometry = new THREE.PlaneGeometry(4.4, 2.9);
        const screenMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        });
        this.screen = new THREE.Mesh(screenGeometry, screenMaterial);
        this.screen.position.z = 0.11;
        this.tabletGroup.add(this.screen);

        // Subtle screen glow (Darker shadow for white bg?)
        // Let's use a subtle shadow instead or keep it minimal
        const glowGeometry = new THREE.PlaneGeometry(4.6, 3.1);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000, // Dark glow/shadow
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.z = 0.09;
        this.tabletGroup.add(glow);
        this.screenGlow = glow;

        this.scene.add(this.tabletGroup);
    }

    createInnerWorld() {
        // Create the world inside the tablet
        this.innerWorld = new THREE.Group();
        this.innerWorld.position.z = -5;
        this.innerWorld.visible = false;

        // Grid floor - Darker grid for white bg
        const gridSize = 100;
        const gridHelper = new THREE.GridHelper(gridSize, 50, 0x00d9ff, 0xcccccc);
        gridHelper.position.y = -10;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.3;
        this.innerWorld.add(gridHelper);

        // Floating geometric shapes
        const shapes = [];
        const geometries = [
            new THREE.IcosahedronGeometry(0.5),
            new THREE.OctahedronGeometry(0.6),
            new THREE.TetrahedronGeometry(0.5),
            new THREE.TorusGeometry(0.4, 0.15, 8, 16)
        ];

        for (let i = 0; i < 20; i++) {
            const geo = geometries[i % geometries.length];
            const mat = new THREE.MeshStandardMaterial({
                color: i % 2 === 0 ? 0x00d9ff : 0x0066ff,
                metalness: 0.7,
                roughness: 0.3,
                emissive: i % 2 === 0 ? 0x00d9ff : 0x0066ff,
                emissiveIntensity: 0.3
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 20,
                -10 - Math.random() * 80
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            mesh.userData.rotSpeed = (Math.random() - 0.5) * 0.02;
            shapes.push(mesh);
            this.innerWorld.add(mesh);
        }
        this.innerShapes = shapes;

        this.scene.add(this.innerWorld);
    }

    createSpaceText() {
        // Create text that appears inside the tablet
        this.textGroup = new THREE.Group();
        this.textGroup.visible = false;
        this.textGroup.position.z = -8;

        // Create text using canvas textures
        const lines = [
            { text: 'WELCOME TO', size: 0.8, y: 2 },
            { text: 'THE FUTURE', size: 1.5, y: 0 },
            { text: 'OF DESIGN', size: 1.2, y: -2 }
        ];

        lines.forEach((line, index) => {
            const sprite = this.createTextSprite(line.text, line.size);
            sprite.position.set(0, line.y, -index * 5);
            sprite.userData.baseZ = -index * 5;
            sprite.userData.delay = index * 0.1;
            this.textGroup.add(sprite);
            this.textSprites.push(sprite);
        });

        this.scene.add(this.textGroup);
    }

    createTextSprite(text, scale) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1024;
        canvas.height = 256;

        // Clear with transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw text - BLACK for white background
        ctx.font = 'bold 120px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000'; // Black text
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0
        });

        const sprite = new THREE.Sprite(material);
        sprite.scale.set(scale * 8, scale * 2, 1);

        // Store initial scale for animation
        sprite.userData.initialScale = new THREE.Vector3(scale * 8, scale * 2, 1);

        return sprite;
    }

    createStars() {
        // Create particles for environment (previously stars)
        // On white bg, let's make them dark grey particles
        const starCount = this.isMobile ? 300 : 800;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            const angle = Math.random() * Math.PI * 2;
            const radius = 5 + Math.random() * 20;

            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = Math.sin(angle) * radius;
            positions[i3 + 2] = -Math.random() * 150;

            sizes[i] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            color: 0x000000, // Black/Dark particles
            size: 0.1,
            transparent: true,
            opacity: 0,
            sizeAttenuation: true
        });

        this.stars = new THREE.Points(geometry, material);
        this.scene.add(this.stars);
    }

    setupScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: this.container,
            start: 'top top',
            end: 'bottom bottom',
            pin: '.immersive-canvas-wrapper',
            scrub: 1.5,
            onUpdate: (self) => {
                this.progress = self.progress;
                this.isVisible = true;
                this.updateScene();
            },
            onLeave: () => {
                this.isVisible = false;
            },
            onEnterBack: () => {
                this.isVisible = true;
            }
        });
    }

    updateScene() {
        const p = this.progress;

        // Stage 1: 0-20% - Tablet visible, approaching
        if (p < 0.2) {
            const t = p / 0.2;

            this.tabletGroup.visible = true;
            this.innerWorld.visible = false;
            this.textGroup.visible = false;
            this.stars.material.opacity = 0;

            // Background is White
            this.scene.background = new THREE.Color(0xffffff);

            this.camera.position.z = 10 - t * 3;
            this.tabletGroup.scale.setScalar(0.7 + t * 0.3);
            this.tabletGroup.rotation.y = Math.sin(t * Math.PI * 0.5) * 0.05;

            this.resetTabletOpacity(1);
        }
        // Stage 2: 20-40% - Tablet fills screen
        else if (p < 0.4) {
            const t = (p - 0.2) / 0.2;

            this.camera.position.z = 7 - t * 4;
            this.tabletGroup.scale.setScalar(1 + t * 1.5);
            this.tabletGroup.rotation.y = 0;
            this.screenGlow.material.opacity = 0.1 + t * 0.2;
        }
        // Stage 3: 40-60% - Entering
        else if (p < 0.6) {
            const t = (p - 0.4) / 0.2;

            this.camera.position.z = 3 - t * 15;
            this.tabletGroup.scale.setScalar(2.5 + t * 5);
            this.fadeTablet(1 - t);

            // Stay White (No flash needed as we are already white)
            this.scene.background = new THREE.Color(0xffffff);

            if (t > 0.3) {
                this.innerWorld.visible = true;
                this.textGroup.visible = true;
                this.stars.material.opacity = (t - 0.3) * 1.0; // Fade in particles
            }
        }
        // Stage 4: 60-80% - Text Reveal
        else if (p < 0.8) {
            const t = (p - 0.6) / 0.2;

            this.tabletGroup.visible = false;
            this.innerWorld.visible = true;
            this.textGroup.visible = true;
            this.scene.background = new THREE.Color(0xffffff);

            this.camera.position.z = -12 - t * 20;
            this.stars.material.opacity = 0.6; // Dark particles visible

            this.textSprites.forEach((sprite, i) => {
                const delay = sprite.userData.delay;
                const localT = Math.max(0, Math.min(1, (t - delay) / 0.7));

                const startZ = sprite.userData.baseZ - 20;
                const endZ = sprite.userData.baseZ;

                sprite.position.z = startZ + localT * (endZ - startZ + 30 * t);
                sprite.material.opacity = t < 0.1 ? t * 10 : 1;

                const scaleBase = 1 + localT * 0.2;
                sprite.scale.set(
                    sprite.userData.initialScale.x * scaleBase,
                    sprite.userData.initialScale.y * scaleBase,
                    1
                );
            });
        }
        // Stage 5: 80-100% - Fly past
        else {
            const t = (p - 0.8) / 0.2;

            this.camera.position.z = -32 - t * 40;

            this.textSprites.forEach((sprite) => {
                sprite.material.opacity = Math.max(0, 1 - t * 2);
                sprite.position.z += t * 0.5;
            });

            this.stars.rotation.z = t * 0.5;
        }
    }

    fadeTablet(opacity) {
        [this.tabletFrame, this.tabletBezel, this.screen, this.screenGlow].forEach(mesh => {
            if (mesh && mesh.material) {
                mesh.material.transparent = true;
                mesh.material.opacity = opacity;
            }
        });
    }

    resetTabletOpacity(opacity) {
        [this.tabletFrame, this.tabletBezel, this.screen, this.screenGlow].forEach(mesh => {
            if (mesh && mesh.material) {
                mesh.material.transparent = opacity < 1;
                mesh.material.opacity = opacity;
            }
        });
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
        if (!this.isVisible && this.progress === 0) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        const elapsedTime = this.clock.getElapsedTime();

        // Animate stars moving towards camera
        if (this.stars && this.stars.material.opacity > 0) {
            const positions = this.stars.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 2] += 0.3; // Move towards camera
                if (positions[i + 2] > 10) {
                    positions[i + 2] = -150;
                }
            }
            this.stars.geometry.attributes.position.needsUpdate = true;
        }

        // Animate inner shapes
        if (this.innerShapes && this.innerWorld.visible) {
            this.innerShapes.forEach(shape => {
                shape.rotation.y += shape.userData.rotSpeed;
                shape.position.z += 0.05;
                if (shape.position.z > 10) {
                    shape.position.z = -100;
                }
            });
        }

        // Subtle tablet float
        if (this.tabletGroup && this.tabletGroup.visible) {
            this.tabletGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.08;
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }
}

// Export for global access
window.ImmersiveTablet = ImmersiveTablet;
