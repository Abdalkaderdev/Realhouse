// ═══════════════════════════════════════════════════════════════════════════
// Particle Trail Cursor Effect
// Creates an elegant trailing particle effect following the cursor
// ═══════════════════════════════════════════════════════════════════════════

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export class CursorTrail {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0, prevX: 0, prevY: 0 };
  private isRunning = false;
  private rafId = 0;
  private lastEmit = 0;

  private colors = ['#C9A84C', '#E8C97A', '#9A7A2E', '#D4B85A'];

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'cursor-trail';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
    `;

    this.ctx = this.canvas.getContext('2d')!;
    document.body.appendChild(this.canvas);

    this.resize();
    this.bindEvents();
  }

  private resize(): void {
    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = window.innerHeight * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  private bindEvents(): void {
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  start(): void {
    if (this.isRunning) return;

    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    this.isRunning = true;
    this.animate();
  }

  stop(): void {
    this.isRunning = false;
    cancelAnimationFrame(this.rafId);
  }

  private emit(): void {
    const now = Date.now();
    if (now - this.lastEmit < 16) return; // ~60fps
    this.lastEmit = now;

    const dx = this.mouse.x - this.mouse.prevX;
    const dy = this.mouse.y - this.mouse.prevY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // Only emit when moving
    if (speed < 2) return;

    // Emit more particles when moving fast
    const count = Math.min(Math.floor(speed / 5), 5);

    for (let i = 0; i < count; i++) {
      const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.5;
      const velocity = speed * 0.1 + Math.random() * 2;

      this.particles.push({
        x: this.mouse.x + (Math.random() - 0.5) * 10,
        y: this.mouse.y + (Math.random() - 0.5) * 10,
        vx: -Math.cos(angle) * velocity + (Math.random() - 0.5) * 2,
        vy: -Math.sin(angle) * velocity + (Math.random() - 0.5) * 2,
        size: 2 + Math.random() * 4,
        alpha: 0.6 + Math.random() * 0.4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        life: 1,
        maxLife: 0.5 + Math.random() * 0.5
      });
    }

    // Limit particles
    if (this.particles.length > 100) {
      this.particles = this.particles.slice(-100);
    }
  }

  private update(): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Apply friction
      p.vx *= 0.96;
      p.vy *= 0.96;

      // Add subtle gravity
      p.vy += 0.05;

      // Decrease life
      p.life -= 0.016 / p.maxLife;

      // Remove dead particles
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      const alpha = p.alpha * p.life;
      const size = p.size * (0.5 + p.life * 0.5);

      // Draw glow
      const gradient = this.ctx.createRadialGradient(
        p.x, p.y, 0,
        p.x, p.y, size * 2
      );
      gradient.addColorStop(0, this.hexToRgba(p.color, alpha));
      gradient.addColorStop(1, this.hexToRgba(p.color, 0));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Draw core
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
      this.ctx.fillStyle = this.hexToRgba(p.color, alpha);
      this.ctx.fill();
    }
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private animate = (): void => {
    if (!this.isRunning) return;

    this.emit();
    this.update();
    this.draw();

    this.rafId = requestAnimationFrame(this.animate);
  };

  destroy(): void {
    this.stop();
    this.canvas.remove();
  }
}

// ─── Magnetic Glow Effect for Buttons ─────────────────────────────────────
export function initMagneticGlow(selector: string): void {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const element = el as HTMLElement;

    // Create glow element
    const glow = document.createElement('div');
    glow.className = 'magnetic-glow';
    glow.style.cssText = `
      position: absolute;
      inset: -2px;
      background: radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%),
        rgba(201, 168, 76, 0.4) 0%,
        transparent 70%);
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
      z-index: -1;
    `;

    element.style.position = 'relative';
    element.appendChild(glow);

    element.addEventListener('mouseenter', () => {
      glow.style.opacity = '1';
    });

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      element.style.setProperty('--glow-x', `${x}%`);
      element.style.setProperty('--glow-y', `${y}%`);
    });

    element.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  });
}

// ─── Ripple Click Effect ──────────────────────────────────────────────────
export function initRippleEffect(selector: string): void {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const element = el as HTMLElement;
    element.style.position = 'relative';
    element.style.overflow = 'hidden';

    element.addEventListener('click', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        background: rgba(201, 168, 76, 0.4);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: ripple 0.6s ease-out forwards;
      `;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      element.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation if not exists
  if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          width: 400px;
          height: 400px;
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
