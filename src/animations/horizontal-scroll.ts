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

// ─── Vertical to Horizontal Transition ────────────────────────────────────
export function initVerticalToHorizontal(options: {
  verticalSection: string;
  horizontalSection: string;
  transitionDuration?: number;
}): void {
  const vertical = document.querySelector(options.verticalSection);
  const horizontal = document.querySelector(options.horizontalSection);

  if (!vertical || !horizontal) return;

  // Fade out vertical section as it exits
  gsap.to(vertical, {
    opacity: 0,
    scale: 0.95,
    scrollTrigger: {
      trigger: vertical,
      start: 'bottom 80%',
      end: 'bottom 20%',
      scrub: true
    }
  });

  // Fade in horizontal section
  gsap.fromTo(horizontal,
    { opacity: 0 },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: horizontal,
        start: 'top bottom',
        end: 'top top',
        scrub: true
      }
    }
  );
}

// ─── Infinite Horizontal Loop ─────────────────────────────────────────────
export function initInfiniteLoop(options: {
  container: string;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}): gsap.core.Tween {
  const container = document.querySelector(options.container) as HTMLElement;
  if (!container) return gsap.to({}, {});

  const content = container.firstElementChild as HTMLElement;
  if (!content) return gsap.to({}, {});

  const { speed = 50, direction = 'left', pauseOnHover = true } = options;

  // Clone content for seamless loop
  const clone = content.cloneNode(true) as HTMLElement;
  container.appendChild(clone);

  const width = content.offsetWidth;
  const duration = width / speed;

  // Set initial positions
  gsap.set([content, clone], {
    x: (i: number) => i * width * (direction === 'left' ? 1 : -1)
  });

  const tween = gsap.to([content, clone], {
    x: direction === 'left' ? -width : width,
    duration,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => {
        const val = parseFloat(x);
        if (direction === 'left') {
          return val < -width ? val + width * 2 : val;
        } else {
          return val > width ? val - width * 2 : val;
        }
      })
    }
  });

  if (pauseOnHover) {
    container.addEventListener('mouseenter', () => tween.pause());
    container.addEventListener('mouseleave', () => tween.play());
  }

  return tween;
}

// ─── Snap Scroll Sections ─────────────────────────────────────────────────
export function initSnapScroll(selector: string): void {
  const sections = document.querySelectorAll(selector);

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      snap: {
        snapTo: 1,
        duration: { min: 0.2, max: 0.5 },
        ease: 'power2.inOut'
      }
    });
  });
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
