// ═══════════════════════════════════════════════════════════════════════════
// Custom Cursor for Real House
// ═══════════════════════════════════════════════════════════════════════════

import { gsap } from 'gsap';

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export class CustomCursor {
  private cursor: HTMLElement;
  private cursorDot: HTMLElement;
  private mouse = { x: 0, y: 0 };
  private pos = { x: 0, y: 0 };
  private dotPos = { x: 0, y: 0 };
  private isRunning = false;
  private rafId: number = 0;

  constructor() {
    this.cursor = document.getElementById('cursor')!;
    this.cursorDot = document.getElementById('cursor-dot')!;
  }

  init(): void {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) {
      return;
    }

    this.bindEvents();
    this.start();
  }

  private bindEvents(): void {
    // Track mouse position
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      gsap.to([this.cursor, this.cursorDot], {
        opacity: 0,
        duration: 0.3
      });
    });

    document.addEventListener('mouseenter', () => {
      gsap.to([this.cursor, this.cursorDot], {
        opacity: 1,
        duration: 0.3
      });
    });

    // Hover states
    this.bindHoverEvents();
  }

  private bindHoverEvents(): void {
    // Links
    document.addEventListener('mouseover', (e) => {
      const target = e.target as Element;

      if (target.closest('a, button, [data-cursor="link"]')) {
        this.setState('link');
      } else if (target.closest('.property-card, [data-cursor="card"]')) {
        this.setState('card');
      } else if (target.closest('.btn, [data-cursor="button"]')) {
        this.setState('button');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target as Element;

      if (target.closest('a, button, .property-card, .btn, [data-cursor]')) {
        this.setState('default');
      }
    });

    // Mouse down/up
    document.addEventListener('mousedown', () => {
      gsap.to(this.cursor, {
        scale: 0.8,
        duration: 0.15
      });
    });

    document.addEventListener('mouseup', () => {
      gsap.to(this.cursor, {
        scale: 1,
        duration: 0.15
      });
    });
  }

  private setState(state: string): void {
    this.cursor.setAttribute('data-state', state);

    switch (state) {
      case 'link':
        gsap.to(this.cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
      case 'card':
        gsap.to(this.cursor, {
          scale: 2,
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
      case 'button':
        gsap.to(this.cursor, {
          scale: 1.8,
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
      default:
        gsap.to(this.cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
    }
  }

  private start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  private animate = (): void => {
    if (!this.isRunning) return;

    // Smooth follow for main cursor
    this.pos.x = lerp(this.pos.x, this.mouse.x, 0.12);
    this.pos.y = lerp(this.pos.y, this.mouse.y, 0.12);

    // Faster follow for dot
    this.dotPos.x = lerp(this.dotPos.x, this.mouse.x, 0.5);
    this.dotPos.y = lerp(this.dotPos.y, this.mouse.y, 0.5);

    // Apply transforms
    gsap.set(this.cursor, {
      x: this.pos.x - 20,
      y: this.pos.y - 20
    });

    gsap.set(this.cursorDot, {
      x: this.dotPos.x - 4,
      y: this.dotPos.y - 4
    });

    this.rafId = requestAnimationFrame(this.animate);
  };

  stop(): void {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  destroy(): void {
    this.stop();
  }
}
