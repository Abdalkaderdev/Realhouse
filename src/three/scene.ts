// ═══════════════════════════════════════════════════════════════════════════
// Cinematic Three.js Scene for Real House
// ═══════════════════════════════════════════════════════════════════════════

import * as THREE from 'three';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ─── Shader for Luxury Particles ──────────────────────────────────────────
const PARTICLE_VERTEX = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aVelocity;
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;

    // Flowing motion - luxury slow drift
    float flowX = sin(uTime * 0.2 + aPhase * 6.28) * 0.8;
    float flowY = cos(uTime * 0.15 + aPhase * 3.14) * 0.6;
    float flowZ = sin(uTime * 0.1 + aPhase * 4.71) * 0.4;

    pos += vec3(flowX, flowY, flowZ) * aVelocity;

    // Mouse repulsion - elegant push
    vec3 mousePos = vec3(uMouse.x * 8.0, uMouse.y * 5.0, 0.0);
    vec3 toMouse = pos - mousePos;
    float dist = length(toMouse);
    float repulsion = smoothstep(6.0, 0.0, dist) * uMouseStrength;
    pos += normalize(toMouse) * repulsion * 2.0;

    // Spiral upward motion
    float spiral = sin(uTime * 0.3 + length(pos.xz) * 0.5) * 0.3;
    pos.y += spiral;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (350.0 / -mvPos.z);
    gl_PointSize = clamp(gl_PointSize, 2.0, 80.0);
    gl_Position = projectionMatrix * mvPos;

    // Gold to platinum gradient based on height + movement
    float heightGrad = smoothstep(-10.0, 10.0, pos.y);
    vec3 gold = vec3(0.788, 0.659, 0.298);
    vec3 platinum = vec3(0.67, 0.73, 0.82);
    vec3 rose = vec3(0.82, 0.55, 0.55);
    vColor = mix(mix(gold, rose, sin(aPhase * 3.14)), platinum, heightGrad);

    // Fade based on distance from center
    vAlpha = smoothstep(20.0, 5.0, length(pos)) * (0.3 + aSize * 0.02);
  }
`;

const PARTICLE_FRAGMENT = `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.1, d) * vAlpha;

    // Soft glow core
    float glow = smoothstep(0.5, 0.0, d);
    vec3 color = vColor + vColor * glow * 0.5;

    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── Shader for Luxury Grid Floor ─────────────────────────────────────────
const FLOOR_VERTEX = `
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FLOOR_FRAGMENT = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vec2 grid = abs(fract(vWorldPos.xz * 0.5 - 0.5) - 0.5) / fwidth(vWorldPos.xz * 0.5);
    float line = min(grid.x, grid.y);
    float gridAlpha = 1.0 - min(line, 1.0);

    // Radial fade
    float dist = length(vWorldPos.xz);
    float fade = smoothstep(30.0, 5.0, dist);

    // Pulse effect
    float pulse = sin(uTime * 0.5 - dist * 0.3) * 0.5 + 0.5;

    vec3 color = uColor * (gridAlpha * 0.4 + 0.05);
    color += uColor * pulse * 0.1 * gridAlpha;

    float alpha = gridAlpha * fade * 0.6;
    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── Main Scene Manager ───────────────────────────────────────────────────
export class SceneManager {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock: THREE.Clock;

  private particles!: THREE.Points;
  private particleMaterial!: THREE.ShaderMaterial;
  private floor!: THREE.Mesh;
  private floorMaterial!: THREE.ShaderMaterial;
  private architectureGroup!: THREE.Group;

  private mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  private scroll = { current: 0, target: 0 };
  private isRunning = false;
  private rafId = 0;

  constructor() {
    this.canvas = document.getElementById('three-canvas') as HTMLCanvasElement;
    this.clock = new THREE.Clock();

    // High-quality renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    // Scene with atmospheric fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.025);

    // Cinematic camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 4, 18);
    this.camera.lookAt(0, 0, 0);

    this.createParticles();
    this.createFloor();
    this.createArchitecture();
    this.createLighting();
    this.bindEvents();
  }

  private createParticles(): void {
    const count = window.innerWidth < 768 ? 3000 : 8000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute in a dome-like volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.6;
      const r = 5 + Math.random() * 15;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = Math.random() * 20 - 5;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 8;

      sizes[i] = 3 + Math.random() * 8;
      phases[i] = Math.random();

      velocities[i * 3] = (Math.random() - 0.5) * 2;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 2;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));

    this.particleMaterial = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uMouseStrength: { value: 0 }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, this.particleMaterial);
    this.scene.add(this.particles);
  }

  private createFloor(): void {
    const geometry = new THREE.PlaneGeometry(80, 80, 1, 1);

    this.floorMaterial = new THREE.ShaderMaterial({
      vertexShader: FLOOR_VERTEX,
      fragmentShader: FLOOR_FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xc9a84c) }
      },
      transparent: true,
      side: THREE.DoubleSide
    });

    this.floor = new THREE.Mesh(geometry, this.floorMaterial);
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.y = -3;
    this.scene.add(this.floor);
  }

  private createArchitecture(): void {
    this.architectureGroup = new THREE.Group();

    // Central monolith - luxury tower
    const towerGeo = new THREE.BoxGeometry(3, 8, 2);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x0d0d15,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 2
    });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 1;
    this.architectureGroup.add(tower);

    // Gold accent bands
    const bandGeo = new THREE.BoxGeometry(3.1, 0.15, 2.1);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      metalness: 1,
      roughness: 0.2,
      emissive: 0xc9a84c,
      emissiveIntensity: 0.3
    });

    for (let i = 0; i < 8; i++) {
      const band = new THREE.Mesh(bandGeo, bandMat);
      band.position.y = -2 + i * 1;
      this.architectureGroup.add(band);
    }

    // Side wings
    const wingGeo = new THREE.BoxGeometry(1.2, 5, 1.5);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0x15151f,
      metalness: 0.9,
      roughness: 0.1
    });

    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(-2.5, 0, 0);
    this.architectureGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(2.5, 0, 0);
    this.architectureGroup.add(rightWing);

    // Floating platforms
    const platGeo = new THREE.BoxGeometry(1.5, 0.1, 1.5);
    const platMat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      metalness: 1,
      roughness: 0.1,
      emissive: 0xc9a84c,
      emissiveIntensity: 0.15
    });

    const positions = [
      [-4, 2, 2], [4, 3, 1], [-3, 5, -1], [3.5, 4.5, 2], [-5, 1, 3]
    ];

    positions.forEach(([x, y, z]) => {
      const plat = new THREE.Mesh(platGeo, platMat);
      plat.position.set(x, y, z);
      plat.userData.floatOffset = Math.random() * Math.PI * 2;
      this.architectureGroup.add(plat);
    });

    this.architectureGroup.position.set(0, -1, -5);
    this.scene.add(this.architectureGroup);
  }

  private createLighting(): void {
    // Ambient
    const ambient = new THREE.AmbientLight(0x404060, 0.3);
    this.scene.add(ambient);

    // Key light - warm gold
    const keyLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    keyLight.position.set(5, 10, 5);
    this.scene.add(keyLight);

    // Fill light - cool blue
    const fillLight = new THREE.DirectionalLight(0x8899cc, 0.5);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);

    // Gold accent spots
    const goldSpot1 = new THREE.PointLight(0xc9a84c, 2, 20);
    goldSpot1.position.set(-3, 2, 3);
    this.scene.add(goldSpot1);

    const goldSpot2 = new THREE.PointLight(0xc9a84c, 1.5, 15);
    goldSpot2.position.set(4, 4, 2);
    this.scene.add(goldSpot2);

    // Rim light
    const rimLight = new THREE.PointLight(0x6688aa, 1, 25);
    rimLight.position.set(0, 8, -8);
    this.scene.add(rimLight);
  }

  private bindEvents(): void {
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('scroll', () => {
      this.scroll.target = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    });

    window.addEventListener('resize', () => this.onResize());
  }

  private onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop(): void {
    this.isRunning = false;
    cancelAnimationFrame(this.rafId);
  }

  private animate = (): void => {
    if (!this.isRunning) return;
    this.rafId = requestAnimationFrame(this.animate);

    const time = this.clock.getElapsedTime();

    // Smooth mouse follow
    this.mouse.x = lerp(this.mouse.x, this.mouse.targetX, 0.05);
    this.mouse.y = lerp(this.mouse.y, this.mouse.targetY, 0.05);

    // Smooth scroll
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, 0.1);

    // Update particle uniforms
    this.particleMaterial.uniforms.uTime.value = time;
    this.particleMaterial.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);
    this.particleMaterial.uniforms.uMouseStrength.value = lerp(
      this.particleMaterial.uniforms.uMouseStrength.value,
      1,
      0.02
    );

    // Update floor
    this.floorMaterial.uniforms.uTime.value = time;

    // Rotate architecture based on mouse
    this.architectureGroup.rotation.y = this.mouse.x * 0.15;
    this.architectureGroup.rotation.x = -this.mouse.y * 0.08;

    // Float the platforms
    this.architectureGroup.children.forEach((child) => {
      if (child.userData.floatOffset !== undefined) {
        child.position.y += Math.sin(time * 0.8 + child.userData.floatOffset) * 0.003;
      }
    });

    // Breathe the whole group
    const breathe = Math.sin(time * 0.3) * 0.05 + 1;
    this.architectureGroup.scale.setScalar(breathe);

    // Camera responds to scroll
    this.camera.position.y = 4 + this.scroll.current * -2;
    this.camera.position.z = 18 - this.scroll.current * 5;

    // Subtle camera sway
    this.camera.position.x = this.mouse.x * 1.5;
    this.camera.lookAt(0, 0 - this.scroll.current * 3, 0);

    this.renderer.render(this.scene, this.camera);
  };

  async cinematicIntro(): Promise<void> {
    return new Promise((resolve) => {
      const startZ = 35;
      const endZ = 18;
      const startY = 12;
      const endY = 4;
      const duration = 2.8;
      const startTime = this.clock.getElapsedTime();

      const animate = (): void => {
        const elapsed = this.clock.getElapsedTime() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Luxury easing
        const eased = 1 - Math.pow(1 - progress, 4);

        this.camera.position.z = lerp(startZ, endZ, eased);
        this.camera.position.y = lerp(startY, endY, eased);
        this.camera.lookAt(0, 0, 0);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      animate();
    });
  }

  dispose(): void {
    this.stop();
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
    this.renderer.dispose();
  }
}
