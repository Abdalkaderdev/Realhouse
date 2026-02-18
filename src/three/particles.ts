// ═══════════════════════════════════════════════════════════════════════════
// GPU Particle System for Real House
// ═══════════════════════════════════════════════════════════════════════════

import * as THREE from 'three';

// Custom vertex shader for particles
const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uMouse;

  attribute float aScale;
  attribute vec3 aRandomness;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Organic floating motion
    float drift = sin(uTime * 0.3 + aRandomness.x * 6.28) * 0.5;
    float sway = cos(uTime * 0.2 + aRandomness.y * 6.28) * 0.3;
    float rise = sin(uTime * 0.15 + aRandomness.z * 6.28) * 0.2;

    pos.x += drift;
    pos.y += sway + rise;
    pos.z += cos(uTime * 0.1 + aRandomness.x * 3.14) * 0.2;

    // Mouse interaction - particles flow away
    vec2 mouseOffset = uMouse * 2.0;
    float mouseDistance = length(pos.xy - vec2(mouseOffset.x, mouseOffset.y));
    float mousePush = smoothstep(3.0, 0.0, mouseDistance) * 0.5;
    pos.xy += normalize(pos.xy - mouseOffset) * mousePush;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Size attenuation
    gl_PointSize = uSize * aScale * (400.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 100.0);

    gl_Position = projectionMatrix * mvPosition;

    // Color gradient from gold to platinum based on height
    float heightFactor = clamp((position.y + 8.0) / 16.0, 0.0, 1.0);
    vec3 goldColor = vec3(0.788, 0.659, 0.298);
    vec3 platinumColor = vec3(0.545, 0.608, 0.706);
    vColor = mix(goldColor, platinumColor, heightFactor);

    // Fade particles at edges
    float edgeFade = 1.0 - smoothstep(6.0, 10.0, length(pos.xz));
    vAlpha = edgeFade * (0.4 + aScale * 0.3);
  }
`;

// Custom fragment shader for soft particles
const FRAGMENT_SHADER = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft circle
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = 1.0 - smoothstep(0.35, 0.5, dist);

    if (alpha < 0.01) discard;

    // Glow effect
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    vec3 finalColor = vColor + vColor * glow * 0.3;

    gl_FragColor = vec4(finalColor, alpha * vAlpha);
  }
`;

export class ParticleField {
  public points: THREE.Points;
  private material: THREE.ShaderMaterial;
  private mouse: THREE.Vector2;

  constructor(count: number = 5000) {
    this.mouse = new THREE.Vector2(0, 0);

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute in a large volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 10;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 5;

      scales[i] = 0.3 + Math.random() * 0.7;

      randomness[i * 3] = Math.random();
      randomness[i * 3 + 1] = Math.random();
      randomness[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

    // Create shader material
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 4.0 },
        uMouse: { value: this.mouse }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.points = new THREE.Points(geometry, this.material);
  }

  update(time: number): void {
    this.material.uniforms.uTime.value = time;
  }

  setMouse(x: number, y: number): void {
    this.mouse.set(x, y);
  }

  dispose(): void {
    this.points.geometry.dispose();
    this.material.dispose();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Building Object (Procedural)
// ═══════════════════════════════════════════════════════════════════════════

export class BuildingMesh {
  public group: THREE.Group;
  private materials: THREE.Material[] = [];

  constructor() {
    this.group = new THREE.Group();
    this.createBuilding();
  }

  private createBuilding(): void {
    // Main tower
    const towerGeometry = new THREE.BoxGeometry(2, 4, 1.5);
    const towerMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.5
    });
    this.materials.push(towerMaterial);

    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.y = 2;
    tower.castShadow = true;
    this.group.add(tower);

    // Glass panels (windows)
    const glassGeometry = new THREE.BoxGeometry(1.8, 0.3, 0.1);
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      metalness: 1,
      roughness: 0.1,
      emissive: 0xc9a84c,
      emissiveIntensity: 0.2
    });
    this.materials.push(glassMaterial);

    // Add window rows
    for (let i = 0; i < 6; i++) {
      const windowRow = new THREE.Mesh(glassGeometry, glassMaterial);
      windowRow.position.set(0, 0.8 + i * 0.6, 0.76);
      this.group.add(windowRow);
    }

    // Side wings
    const wingGeometry = new THREE.BoxGeometry(0.8, 2.5, 1);
    const wingMaterial = new THREE.MeshStandardMaterial({
      color: 0x12121a,
      metalness: 0.8,
      roughness: 0.3
    });
    this.materials.push(wingMaterial);

    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-1.2, 1.25, 0);
    leftWing.castShadow = true;
    this.group.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(1.2, 1.25, 0);
    rightWing.castShadow = true;
    this.group.add(rightWing);

    // Roof accent
    const roofGeometry = new THREE.BoxGeometry(2.2, 0.2, 1.7);
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      metalness: 0.95,
      roughness: 0.1
    });
    this.materials.push(roofMaterial);

    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 4.1;
    this.group.add(roof);

    // Ground plane (reflective)
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      metalness: 0.9,
      roughness: 0.4
    });
    this.materials.push(groundMaterial);

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    this.group.add(ground);

    // Position the whole building
    this.group.position.set(0, -2, 0);
  }

  dispose(): void {
    this.group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }
    });
    this.materials.forEach(m => m.dispose());
  }
}
