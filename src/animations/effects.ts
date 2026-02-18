// ═══════════════════════════════════════════════════════════════════════════
// Impressive Visual Effects for Real House
// ═══════════════════════════════════════════════════════════════════════════

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Magnetic Elements ────────────────────────────────────────────────────
export function initMagneticElements(): void {
  const elements = document.querySelectorAll('[data-magnetic]');

  elements.forEach((el) => {
    const element = el as HTMLElement;
    const strength = parseFloat(element.dataset.magneticStrength || '0.3');

    let bounds: DOMRect;

    element.addEventListener('mouseenter', () => {
      bounds = element.getBoundingClientRect();
    });

    element.addEventListener('mousemove', (e) => {
      if (!bounds) return;

      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        rotation: x * 0.02,
        duration: 0.4,
        ease: 'power2.out'
      });

      // Move inner content opposite direction for depth
      const inner = element.querySelector('[data-magnetic-inner]');
      if (inner) {
        gsap.to(inner, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      });

      const inner = element.querySelector('[data-magnetic-inner]');
      if (inner) {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    });
  });
}

// ─── Text Scramble Effect ─────────────────────────────────────────────────
export function textScramble(element: HTMLElement, newText?: string): gsap.core.Timeline {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
  const originalText = newText || element.textContent || '';
  const duration = 1.5;

  element.style.fontFamily = 'monospace';

  const tl = gsap.timeline();

  tl.to({}, {
    duration,
    onUpdate: function() {
      const progress = this.progress();
      let result = '';

      for (let i = 0; i < originalText.length; i++) {
        const charProgress = (progress * originalText.length - i) / 1;

        if (charProgress > 1) {
          result += originalText[i];
        } else if (charProgress > 0) {
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += originalText[i] === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = result;
    },
    onComplete: () => {
      element.textContent = originalText;
      element.style.fontFamily = '';
    }
  });

  return tl;
}

// ─── Reveal on Scroll with Clip Path ──────────────────────────────────────
export function clipReveal(element: Element | string, direction: 'up' | 'down' | 'left' | 'right' = 'up'): gsap.core.Tween {
  const clips: Record<string, { from: string; to: string }> = {
    up: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
    down: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
    left: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
    right: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' }
  };

  return gsap.fromTo(element,
    { clipPath: clips[direction].from },
    {
      clipPath: clips[direction].to,
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
}

// ─── Horizontal Scroll Section ────────────────────────────────────────────
export function initHorizontalScroll(container: string): void {
  const section = document.querySelector(container);
  if (!section) return;

  const wrapper = section.querySelector('.horizontal-wrapper');
  if (!wrapper) return;

  const panels = wrapper.querySelectorAll('.horizontal-panel');
  if (!panels.length) return;

  const totalWidth = (panels.length - 1) * 100;

  gsap.to(wrapper, {
    xPercent: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });

  // Animate each panel as it enters
  panels.forEach((panel, i) => {
    const content = panel.querySelector('.panel-content');
    if (!content) return;

    gsap.fromTo(content,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: gsap.getById('horizontal') as gsap.core.Tween,
          start: 'left center',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

// ─── Image Parallax Hover ─────────────────────────────────────────────────
export function initImageParallax(container: string | Element): void {
  const elements = typeof container === 'string'
    ? document.querySelectorAll(container)
    : [container];

  elements.forEach((el) => {
    const element = el as HTMLElement;
    const image = element.querySelector('img') as HTMLElement;
    if (!image) return;

    let bounds: DOMRect;

    // Set up for parallax
    gsap.set(image, { scale: 1.15 });

    element.addEventListener('mouseenter', () => {
      bounds = element.getBoundingClientRect();
      gsap.to(image, { scale: 1.25, duration: 0.8, ease: 'power2.out' });
    });

    element.addEventListener('mousemove', (e) => {
      if (!bounds) return;

      const x = (e.clientX - bounds.left) / bounds.width - 0.5;
      const y = (e.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(image, {
        x: x * 30,
        y: y * 30,
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(image, {
        scale: 1.15,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
      });
    });
  });
}

// ─── 3D Card Tilt ─────────────────────────────────────────────────────────
export function initCardTilt(selector: string): void {
  const cards = document.querySelectorAll(selector);

  cards.forEach((card) => {
    const el = card as HTMLElement;
    let bounds: DOMRect;

    el.style.transformStyle = 'preserve-3d';
    el.style.perspective = '1000px';

    el.addEventListener('mouseenter', () => {
      bounds = el.getBoundingClientRect();
    });

    el.addEventListener('mousemove', (e) => {
      if (!bounds) return;

      const x = (e.clientX - bounds.left) / bounds.width;
      const y = (e.clientY - bounds.top) / bounds.height;

      const rotateX = (0.5 - y) * 20;
      const rotateY = (x - 0.5) * 20;

      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out'
      });

      // Shine effect
      const shine = el.querySelector('.card-shine') as HTMLElement;
      if (shine) {
        gsap.to(shine, {
          x: (x - 0.5) * 100 + '%',
          y: (y - 0.5) * 100 + '%',
          opacity: 0.15,
          duration: 0.3
        });
      }
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)'
      });

      const shine = el.querySelector('.card-shine') as HTMLElement;
      if (shine) {
        gsap.to(shine, { opacity: 0, duration: 0.3 });
      }
    });
  });
}

// ─── Number Counter with Morphing ─────────────────────────────────────────
export function morphingCounter(element: HTMLElement, target: number, suffix = ''): void {
  const obj = { val: 0 };

  ScrollTrigger.create({
    trigger: element,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => {
          const current = Math.round(obj.val);
          element.textContent = current.toLocaleString() + suffix;
        }
      });
    }
  });
}

// ─── Staggered Grid Reveal ────────────────────────────────────────────────
export function staggeredGridReveal(container: string, items: string): void {
  const grid = document.querySelector(container);
  if (!grid) return;

  const elements = grid.querySelectorAll(items);

  gsap.set(elements, { opacity: 0, y: 80, scale: 0.9 });

  ScrollTrigger.create({
    trigger: container,
    start: 'top 75%',
    onEnter: () => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: {
          amount: 0.8,
          from: 'start',
          grid: 'auto',
          ease: 'power2.out'
        },
        ease: 'power3.out'
      });
    }
  });
}

// ─── Marquee Scroll ───────────────────────────────────────────────────────
export function initMarquee(selector: string, speed = 50): void {
  const marquees = document.querySelectorAll(selector);

  marquees.forEach((marquee) => {
    const content = marquee.querySelector('.marquee-content') as HTMLElement;
    if (!content) return;

    // Clone content for seamless loop
    const clone = content.cloneNode(true) as HTMLElement;
    marquee.appendChild(clone);

    const width = content.offsetWidth;

    gsap.to([content, clone], {
      x: -width,
      duration: width / speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % width)
      }
    });
  });
}

// ─── Split Lines Animation ────────────────────────────────────────────────
export function splitLinesReveal(element: HTMLElement): gsap.core.Timeline {
  const text = element.textContent || '';
  const lines = text.split('\n').filter(l => l.trim());

  // Clear and rebuild with line wrappers
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  lines.forEach((line) => {
    const lineWrapper = document.createElement('div');
    lineWrapper.className = 'line-wrapper';
    lineWrapper.style.overflow = 'hidden';

    const lineInner = document.createElement('div');
    lineInner.className = 'line-inner';
    lineInner.textContent = line;
    lineInner.style.display = 'block';

    lineWrapper.appendChild(lineInner);
    element.appendChild(lineWrapper);
  });

  const lineInners = element.querySelectorAll('.line-inner');

  const tl = gsap.timeline();

  tl.fromTo(lineInners,
    {
      y: '120%',
      rotateX: -80,
      opacity: 0
    },
    {
      y: '0%',
      rotateX: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out'
    }
  );

  return tl;
}

// ─── Scroll Progress Bar ──────────────────────────────────────────────────
export function initScrollProgress(selector: string): void {
  const bar = document.querySelector(selector) as HTMLElement;
  if (!bar) return;

  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

// ─── Elastic Button Press ─────────────────────────────────────────────────
export function initElasticButtons(selector: string): void {
  const buttons = document.querySelectorAll(selector);

  buttons.forEach((btn) => {
    btn.addEventListener('mousedown', () => {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.15,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseup', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// ─── Initialize All Effects ───────────────────────────────────────────────
export function initAllEffects(): void {
  initMagneticElements();
  initCardTilt('.property-card');
  initImageParallax('.property-card__media');
  initElasticButtons('.btn');

  // Stats counters
  document.querySelectorAll('.stats__number').forEach((el) => {
    const target = parseInt((el as HTMLElement).dataset.target || '0', 10);
    const suffix = (el as HTMLElement).dataset.suffix || '';
    morphingCounter(el as HTMLElement, target, suffix);
  });

  // Staggered reveals
  staggeredGridReveal('.featured__grid', '.property-card');
  staggeredGridReveal('.process__grid', '.process__step');
}
