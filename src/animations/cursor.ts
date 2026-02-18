// ═══════════════════════════════════════════════════════════════════════════
// Premium Custom Cursor for Real House
// Award-winning cursor with morphing, blend modes, and smooth physics
// ═══════════════════════════════════════════════════════════════════════════

import { gsap } from 'gsap';

interface CursorState {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
  mixBlendMode: string;
  opacity: number;
}

export class CustomCursor {
  private cursor: HTMLElement;
  private cursorInner: HTMLElement;
  private cursorText: HTMLElement;

  private pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  private mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  private velocity = { x: 0, y: 0 };
  private lastMouse = { x: 0, y: 0 };

  private isRunning = false;
  private rafId = 0;
  private isVisible = true;
  private currentState: string = 'default';

  private states: Record<string, Partial<CursorState>> = {
    default: {
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: 'rgba(201, 168, 76, 0.8)',
      mixBlendMode: 'difference',
      opacity: 1
    },
    link: {
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: 'rgba(201, 168, 76, 0.15)',
      mixBlendMode: 'normal',
      opacity: 1
    },
    button: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(201, 168, 76, 0.1)',
      mixBlendMode: 'normal',
      opacity: 1
    },
    card: {
      width: 120,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(201, 168, 76, 0.9)',
      mixBlendMode: 'normal',
      opacity: 1
    },
    text: {
      width: 4,
      height: 30,
      borderRadius: 2,
      backgroundColor: 'rgba(201, 168, 76, 1)',
      mixBlendMode: 'normal',
      opacity: 1
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: 'transparent',
      mixBlendMode: 'normal',
      opacity: 1
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0
    }
  };

  constructor() {
    // Create cursor elements
    this.cursor = document.createElement('div');
    this.cursor.id = 'cursor-premium';
    this.cursor.className = 'cursor-premium';

    this.cursorInner = document.createElement('div');
    this.cursorInner.className = 'cursor-premium__inner';

    this.cursorText = document.createElement('span');
    this.cursorText.className = 'cursor-premium__text';

    this.cursorInner.appendChild(this.cursorText);
    this.cursor.appendChild(this.cursorInner);

    // Add styles
    this.injectStyles();
  }

  private injectStyles(): void {
    if (document.getElementById('cursor-premium-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'cursor-premium-styles';
    styles.textContent = `
      .cursor-premium {
        position: fixed;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 99999;
        mix-blend-mode: difference;
        will-change: transform, width, height, border-radius;
        transform: translate(-50%, -50%);
      }

      .cursor-premium__inner {
        width: 100%;
        height: 100%;
        background: rgba(201, 168, 76, 0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s, border-radius 0.3s;
        position: relative;
        overflow: hidden;
      }

      .cursor-premium__inner::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg,
          rgba(255, 255, 255, 0.3) 0%,
          transparent 50%,
          rgba(0, 0, 0, 0.2) 100%
        );
        border-radius: inherit;
      }

      .cursor-premium__text {
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #0a0a0f;
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.2s, transform 0.2s;
        white-space: nowrap;
      }

      .cursor-premium.has-text .cursor-premium__text {
        opacity: 1;
        transform: scale(1);
      }

      .cursor-premium__ring {
        position: absolute;
        inset: -10px;
        border: 1px solid rgba(201, 168, 76, 0.3);
        border-radius: 50%;
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.3s, transform 0.3s;
      }

      .cursor-premium:hover .cursor-premium__ring {
        opacity: 1;
        transform: scale(1);
      }

      /* Hide on mobile */
      @media (hover: none), (pointer: coarse) {
        .cursor-premium { display: none; }
        * { cursor: auto !important; }
      }

      /* Hide default cursor */
      @media (hover: hover) {
        html.has-custom-cursor,
        html.has-custom-cursor * {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  init(): void {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    document.body.appendChild(this.cursor);
    document.documentElement.classList.add('has-custom-cursor');

    this.bindEvents();
    this.start();
  }

  private bindEvents(): void {
    // Mouse move
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      if (!this.isVisible) {
        this.isVisible = true;
        gsap.to(this.cursor, { opacity: 1, duration: 0.3 });
      }
    });

    // Mouse leave/enter window
    document.addEventListener('mouseleave', () => {
      this.isVisible = false;
      gsap.to(this.cursor, { opacity: 0, duration: 0.3 });
    });

    document.addEventListener('mouseenter', () => {
      this.isVisible = true;
      gsap.to(this.cursor, { opacity: 1, duration: 0.3 });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
      gsap.to(this.cursor, {
        scale: 0.85,
        duration: 0.15,
        ease: 'power2.out'
      });
    });

    document.addEventListener('mouseup', () => {
      gsap.to(this.cursor, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)'
      });
    });

    // Element interactions
    this.bindInteractions();
  }

  private bindInteractions(): void {
    // Use event delegation for better performance
    document.addEventListener('mouseover', (e) => {
      const target = e.target as Element;

      // Check various cursor states
      if (target.closest('[data-cursor="hidden"]')) {
        this.setState('hidden');
      } else if (target.closest('a, [data-cursor="link"]')) {
        this.setState('link');
        this.setText('');
      } else if (target.closest('.btn, button, [data-cursor="button"]')) {
        this.setState('button');
        this.setText('');
      } else if (target.closest('.property-card, [data-cursor="card"]')) {
        this.setState('card');
        this.setText('View');
      } else if (target.closest('input, textarea, [data-cursor="text"]')) {
        this.setState('text');
      } else if (target.closest('img, video, [data-cursor="image"]')) {
        this.setState('image');
        this.setText('');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target as Element;

      if (target.closest('[data-cursor], a, button, .btn, .property-card, input, textarea, img, video')) {
        this.setState('default');
        this.setText('');
      }
    });
  }

  private setState(state: string): void {
    if (this.currentState === state) return;
    this.currentState = state;

    const config = this.states[state] || this.states.default;

    gsap.to(this.cursor, {
      width: config.width,
      height: config.height,
      opacity: config.opacity ?? 1,
      duration: 0.4,
      ease: 'power3.out'
    });

    gsap.to(this.cursorInner, {
      borderRadius: config.borderRadius,
      backgroundColor: config.backgroundColor,
      duration: 0.4,
      ease: 'power3.out'
    });

    this.cursor.style.mixBlendMode = config.mixBlendMode || 'difference';
  }

  private setText(text: string): void {
    if (text) {
      this.cursorText.textContent = text;
      this.cursor.classList.add('has-text');
    } else {
      this.cursor.classList.remove('has-text');
      setTimeout(() => {
        if (!this.cursor.classList.contains('has-text')) {
          this.cursorText.textContent = '';
        }
      }, 200);
    }
  }

  private start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  private animate = (): void => {
    if (!this.isRunning) return;

    // Calculate velocity
    this.velocity.x = this.mouse.x - this.lastMouse.x;
    this.velocity.y = this.mouse.y - this.lastMouse.y;
    this.lastMouse.x = this.mouse.x;
    this.lastMouse.y = this.mouse.y;

    // Smooth follow with spring physics
    const dx = this.mouse.x - this.pos.x;
    const dy = this.mouse.y - this.pos.y;

    this.pos.x += dx * 0.15;
    this.pos.y += dy * 0.15;

    // Calculate stretch based on velocity
    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    const stretch = Math.min(speed * 0.05, 0.5);
    const angle = Math.atan2(this.velocity.y, this.velocity.x) * (180 / Math.PI);

    // Apply transform with stretch effect
    if (this.currentState === 'default' && speed > 2) {
      gsap.set(this.cursor, {
        x: this.pos.x,
        y: this.pos.y,
        scaleX: 1 + stretch,
        scaleY: 1 - stretch * 0.3,
        rotation: angle
      });
    } else {
      gsap.set(this.cursor, {
        x: this.pos.x,
        y: this.pos.y,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
      });
    }

    this.rafId = requestAnimationFrame(this.animate);
  };

  stop(): void {
    this.isRunning = false;
    cancelAnimationFrame(this.rafId);
  }

  destroy(): void {
    this.stop();
    this.cursor.remove();
    document.documentElement.classList.remove('has-custom-cursor');
  }
}
