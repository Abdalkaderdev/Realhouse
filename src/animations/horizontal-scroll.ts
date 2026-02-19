// ═══════════════════════════════════════════════════════════════════════════
// Horizontal Scroll Showcase
// Award-winning horizontal scroll with parallax effects
// ═══════════════════════════════════════════════════════════════════════════

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollOptions {
  container: string;
  wrapper: string;
  panels: string;
  parallaxImages?: string;
  progressBar?: string;
}

export function initHorizontalScroll(options: HorizontalScrollOptions): ScrollTrigger | null {
  const container = document.querySelector(options.container) as HTMLElement;
  const wrapper = document.querySelector(options.wrapper) as HTMLElement;
  const panels = document.querySelectorAll(options.panels);

  if (!container || !wrapper || !panels.length) return null;

  // Calculate total scroll distance
  const totalWidth = wrapper.scrollWidth;
  const viewportWidth = window.innerWidth;
  const scrollDistance = totalWidth - viewportWidth;

  // Main horizontal scroll
  const scrollTween = gsap.to(wrapper, {
    x: -scrollDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${scrollDistance}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // Parallax effect on images inside panels
  if (options.parallaxImages) {
    const parallaxSelector = options.parallaxImages;
    panels.forEach((panel) => {
      const img = panel.querySelector(parallaxSelector) as HTMLElement;
      if (!img) return;

      gsap.fromTo(img,
        { x: -100 },
        {
          x: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true
          }
        }
      );
    });
  }

  // Panel reveal animations
  panels.forEach((panel) => {
    const content = panel.querySelector('.showcase-panel__content');
    const title = panel.querySelector('.showcase-panel__title');
    const subtitle = panel.querySelector('.showcase-panel__subtitle');
    const cta = panel.querySelector('.showcase-panel__cta');

    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left 80%',
            end: 'left 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Staggered content reveal
    const elements = [title, subtitle, cta].filter(Boolean);
    if (elements.length) {
      gsap.fromTo(elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  });

  // Progress bar
  if (options.progressBar) {
    const bar = document.querySelector(options.progressBar) as HTMLElement;
    if (bar) {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 0.3
        }
      });
    }
  }

  return scrollTween.scrollTrigger || null;
}

// ─── Velocity-based Skew ──────────────────────────────────────────────────
export function initVelocitySkew(selector: string): void {
  const elements = document.querySelectorAll(selector);
  let currentSkew = 0;
  let targetSkew = 0;

  const updateSkew = () => {
    currentSkew += (targetSkew - currentSkew) * 0.1;

    elements.forEach((el) => {
      (el as HTMLElement).style.transform = `skewY(${currentSkew}deg)`;
    });

    requestAnimationFrame(updateSkew);
  };

  updateSkew();

  let lastScroll = window.scrollY;

  window.addEventListener('scroll', () => {
    const velocity = window.scrollY - lastScroll;
    targetSkew = Math.max(-5, Math.min(5, velocity * 0.1));
    lastScroll = window.scrollY;
  });

  // Reset skew when scroll stops
  let scrollTimeout: number;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(() => {
      targetSkew = 0;
    }, 150);
  });
}
