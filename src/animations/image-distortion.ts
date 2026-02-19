// ═══════════════════════════════════════════════════════════════════════════
// WebGL Image Distortion Effects
// Hover effects that make images feel alive
// ═══════════════════════════════════════════════════════════════════════════

interface DistortionEffect {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  texture: WebGLTexture;
  uniforms: Record<string, WebGLUniformLocation>;
  mouse: { x: number; y: number; targetX: number; targetY: number };
  isHovering: boolean;
  raf: number;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  uniform sampler2D u_image;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_hover;
  uniform float u_intensity;

  varying vec2 v_texCoord;

  void main() {
    vec2 uv = v_texCoord;

    // Distance from mouse
    float dist = distance(uv, u_mouse);

    // Ripple effect
    float ripple = sin(dist * 30.0 - u_time * 3.0) * 0.02;
    ripple *= smoothstep(0.5, 0.0, dist) * u_hover * u_intensity;

    // Bulge effect near mouse
    vec2 toMouse = uv - u_mouse;
    float bulge = smoothstep(0.4, 0.0, dist) * u_hover * 0.1 * u_intensity;

    // Chromatic aberration
    float aberration = u_hover * 0.008 * u_intensity * smoothstep(0.5, 0.0, dist);

    // Apply distortion
    vec2 distortedUV = uv + toMouse * bulge + ripple;

    // Sample with chromatic aberration
    float r = texture2D(u_image, distortedUV + vec2(aberration, 0.0)).r;
    float g = texture2D(u_image, distortedUV).g;
    float b = texture2D(u_image, distortedUV - vec2(aberration, 0.0)).b;

    // Slight brightness boost on hover
    float brightness = 1.0 + u_hover * 0.1 * smoothstep(0.5, 0.0, dist);

    gl_FragColor = vec4(vec3(r, g, b) * brightness, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function loadTexture(gl: WebGLRenderingContext, image: HTMLImageElement): WebGLTexture | null {
  const texture = gl.createTexture();
  if (!texture) return null;

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  return texture;
}

const effects: Map<HTMLElement, DistortionEffect> = new Map();

export function initImageDistortion(selector: string, intensity = 1.0): void {
  // Skip WebGL initialization on mobile devices to reduce resource usage
  if (window.innerWidth < 768) {
    return;
  }

  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const container = el as HTMLElement;
    const img = container.querySelector('img') as HTMLImageElement;
    if (!img || !img.complete) {
      img?.addEventListener('load', () => setupEffect(container, img, intensity));
      return;
    }
    setupEffect(container, img, intensity);
  });
}

function setupEffect(container: HTMLElement, img: HTMLImageElement, intensity: number): void {
  // Create canvas overlay
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
  `;

  const rect = container.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;

  container.style.position = 'relative';
  container.appendChild(canvas);

  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
  if (!gl) return;

  // Create shaders
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return;

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) return;

  // Set up geometry
  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
  const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

  const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  // Load texture
  const texture = loadTexture(gl, img);
  if (!texture) return;

  // Get uniform locations
  const uniforms: Record<string, WebGLUniformLocation> = {};
  ['u_image', 'u_mouse', 'u_time', 'u_hover', 'u_intensity'].forEach((name) => {
    const location = gl.getUniformLocation(program, name);
    if (location) uniforms[name] = location;
  });

  const effect: DistortionEffect = {
    canvas,
    gl,
    program,
    texture,
    uniforms,
    mouse: { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 },
    isHovering: false,
    raf: 0
  };

  effects.set(container, effect);

  // Event listeners
  container.addEventListener('mouseenter', () => {
    effect.isHovering = true;
    canvas.style.opacity = '1';
    img.style.opacity = '0';
    startAnimation(effect, intensity);
  });

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    effect.mouse.targetX = (e.clientX - rect.left) / rect.width;
    effect.mouse.targetY = 1 - (e.clientY - rect.top) / rect.height;
  });

  container.addEventListener('mouseleave', () => {
    effect.isHovering = false;
    canvas.style.opacity = '0';
    img.style.opacity = '1';
  });
}

function startAnimation(effect: DistortionEffect, intensity: number): void {
  const { gl, program, uniforms, mouse } = effect;
  const startTime = performance.now();
  let hover = 0;

  function animate(): void {
    if (!effect.isHovering && hover <= 0.01) {
      cancelAnimationFrame(effect.raf);
      return;
    }

    // Smooth mouse follow
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    // Smooth hover transition
    hover += (effect.isHovering ? 1 : 0 - hover) * 0.1;

    const time = (performance.now() - startTime) / 1000;

    gl.viewport(0, 0, effect.canvas.width, effect.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.bindTexture(gl.TEXTURE_2D, effect.texture);

    gl.uniform1i(uniforms.u_image, 0);
    gl.uniform2f(uniforms.u_mouse, mouse.x, mouse.y);
    gl.uniform1f(uniforms.u_time, time);
    gl.uniform1f(uniforms.u_hover, hover);
    gl.uniform1f(uniforms.u_intensity, intensity);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    effect.raf = requestAnimationFrame(animate);
  }

  animate();
}

export function destroyImageDistortion(): void {
  effects.forEach((effect) => {
    cancelAnimationFrame(effect.raf);
    effect.gl.deleteTexture(effect.texture);
    effect.gl.deleteProgram(effect.program);
    effect.canvas.remove();
  });
  effects.clear();
}
