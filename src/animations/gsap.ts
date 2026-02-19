// ═══════════════════════════════════════════════════════════════════════════
// GSAP Animation System for Real House
// ═══════════════════════════════════════════════════════════════════════════

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Configure GSAP for reduced motion
if (prefersReducedMotion) {
  gsap.defaults({ duration: 0.01 });
  ScrollTrigger.defaults({ markers: false });
}

// Custom easing curves
const EASES = {
  luxury: 'power3.out',
  reveal: 'power4.out',
  slide: 'power2.inOut',
  bounce: 'back.out(1.2)'
};

// ─── Loader Animations ────────────────────────────────────────────────────
export function animateLoader(): Promise<void> {
  return new Promise((resolve) => {
    const loader = document.getElementById('loader');
    const progressBar = loader?.querySelector('.loader__progress-bar');
    const counter = loader?.querySelector('.loader__counter');
    const logoLines = loader?.querySelectorAll('.loader__logo-line');

    if (!loader || !progressBar || !counter) {
      resolve();
      return;
    }

    const tl = gsap.timeline({
      onComplete: resolve
    });

    // Animate logo SVG lines (draw effect)
    if (logoLines && logoLines.length > 0) {
      tl.to(logoLines, {
        strokeDashoffset: 0,
        duration: 1,
        stagger: 0.15,
        ease: EASES.luxury
      });
    }

    // Animate progress bar and counter
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counterObj.value);
        if (counter) counter.textContent = `${v}%`;
        gsap.set(progressBar, { scaleX: v / 100 });
      }
    }, '-=0.5');
  });
}

export function hideLoader(): Promise<void> {
  return new Promise((resolve) => {
    const loader = document.getElementById('loader');
    if (!loader) {
      resolve();
      return;
    }

    const content = loader.querySelector('.loader__content');

    gsap.timeline({ onComplete: resolve })
      .to(content, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: EASES.luxury
      })
      .to(loader, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1,
        ease: 'power4.inOut'
      })
      .set(loader, { display: 'none' });
  });
}

// ─── Page Transitions ─────────────────────────────────────────────────────
export function pageTransitionOut(): Promise<void> {
  return new Promise((resolve) => {
    const transition = document.getElementById('page-transition');
    if (!transition) {
      resolve();
      return;
    }

    const label = transition.querySelector('.page-transition__label');

    gsap.timeline({ onComplete: resolve })
      .set(transition, { display: 'flex', clipPath: 'inset(100% 0% 0% 0%)' })
      .to(transition, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.7,
        ease: 'power4.inOut'
      })
      .fromTo(label,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 },
        '-=0.2'
      );
  });
}

export function pageTransitionIn(): Promise<void> {
  return new Promise((resolve) => {
    const transition = document.getElementById('page-transition');
    if (!transition) {
      resolve();
      return;
    }

    const label = transition.querySelector('.page-transition__label');

    gsap.timeline({ onComplete: resolve })
      .to(label, {
        opacity: 0,
        y: -20,
        duration: 0.2
      })
      .to(transition, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.7,
        ease: 'power4.inOut'
      })
      .set(transition, { display: 'none' });
  });
}

// ─── Text Reveal Animation (Safe DOM manipulation) ────────────────────────
export function splitTextReveal(
  element: HTMLElement,
  options: {
    delay?: number;
    stagger?: number;
    trigger?: Element | string;
  } = {}
): gsap.core.Timeline {
  const text = element.textContent || '';
  const words = text.split(' ');

  // Clear the element safely
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  // Build DOM structure safely
  words.forEach((word, index) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.style.display = 'inline-block';
    wordSpan.style.overflow = 'hidden';
    wordSpan.style.verticalAlign = 'top';

    const innerSpan = document.createElement('span');
    innerSpan.className = 'word-inner';
    innerSpan.style.display = 'inline-block';
    innerSpan.textContent = word;

    wordSpan.appendChild(innerSpan);
    element.appendChild(wordSpan);

    // Add space between words
    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
  });

  const wordInners = element.querySelectorAll('.word-inner');

  const tl = gsap.timeline({
    scrollTrigger: options.trigger ? {
      trigger: options.trigger,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    } : undefined
  });

  tl.set(element, { opacity: 1 })
    .fromTo(wordInners,
      {
        y: '110%',
        rotateX: -45,
        opacity: 0
      },
      {
        y: '0%',
        rotateX: 0,
        opacity: 1,
        duration: 0.9,
        stagger: options.stagger ?? 0.04,
        delay: options.delay ?? 0,
        ease: EASES.reveal
      }
    );

  return tl;
}

// ─── Scroll Reveal Animation ──────────────────────────────────────────────
export function scrollReveal(
  elements: string | Element | Element[],
  options: {
    y?: number;
    opacity?: number;
    stagger?: number;
    delay?: number;
    trigger?: string | Element;
  } = {}
): gsap.core.Tween {
  const {
    y = 60,
    opacity = 0,
    stagger = 0.15,
    delay = 0,
    trigger
  } = options;

  return gsap.fromTo(
    elements,
    { y, opacity },
    {
      y: 0,
      opacity: 1,
      stagger,
      delay,
      duration: 0.9,
      ease: EASES.luxury,
      scrollTrigger: {
        trigger: trigger ?? (typeof elements === 'string' ? elements : undefined),
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
}

// ─── Counter Animation ────────────────────────────────────────────────────
export function animateCounter(
  element: HTMLElement,
  target: number,
  options: {
    duration?: number;
    prefix?: string;
    suffix?: string;
  } = {}
): gsap.core.Tween {
  const { duration = 2, prefix = '', suffix = '' } = options;

  const obj = { value: 0 };

  return gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    onUpdate: () => {
      const formatted = target >= 1000
        ? (obj.value / 1000).toFixed(1) + 'K'
        : Math.round(obj.value).toString();
      element.textContent = prefix + formatted + suffix;
    }
  });
}

// ─── Parallax Effect ──────────────────────────────────────────────────────
export function parallax(
  element: string | Element,
  options: {
    yPercent?: number;
    trigger?: string | Element;
  } = {}
): gsap.core.Tween {
  const { yPercent = -30, trigger } = options;

  return gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger ?? element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
}

// ─── Hero Animations ──────────────────────────────────────────────────────
export function animateHero(): gsap.core.Timeline {
  const tl = gsap.timeline({ delay: 0.5 });

  // Eyebrow
  tl.fromTo('.hero__eyebrow',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: EASES.luxury }
  );

  // Headline
  const headline = document.querySelector('.hero__headline') as HTMLElement;
  if (headline) {
    tl.add(splitTextReveal(headline), '-=0.4');
  }

  // Subline
  tl.to('.hero__subline', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: EASES.luxury
  }, '-=0.6');

  // CTA buttons
  tl.to('.hero__cta', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: EASES.luxury
  }, '-=0.4');

  // Scroll indicator
  tl.fromTo('.hero__scroll',
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.6, ease: EASES.luxury },
    '-=0.2'
  );

  // Continuous scroll indicator animation
  gsap.to('.hero__scroll-line', {
    scaleY: 0,
    transformOrigin: 'top',
    repeat: -1,
    yoyo: true,
    duration: 1.2,
    ease: 'sine.inOut'
  });

  return tl;
}

// ─── Stats Section Animation ──────────────────────────────────────────────
export function animateStats(): void {
  const items = document.querySelectorAll('.stats__item');

  items.forEach((item) => {
    const number = item.querySelector('.stats__number') as HTMLElement;
    const target = parseInt(number?.dataset.target || '0', 10);
    const suffix = number?.dataset.suffix || '';

    // Reveal animation
    scrollReveal(item as Element, {
      y: 40,
      trigger: item
    });

    // Counter animation
    if (number && target) {
      animateCounter(number, target, { suffix });
    }
  });
}

// ─── Featured Section Animation ───────────────────────────────────────────
export function animateFeatured(): void {
  // Header
  scrollReveal('.featured__header', { y: 30 });

  // Property cards with stagger
  scrollReveal('.property-card', {
    y: 60,
    stagger: 0.15,
    trigger: '.featured__grid'
  });
}

// ─── Process Section Animation ────────────────────────────────────────────
export function animateProcess(): void {
  // Header
  const title = document.querySelector('.process__title') as HTMLElement;
  if (title) {
    gsap.set(title, { opacity: 0 });
    ScrollTrigger.create({
      trigger: title,
      start: 'top 80%',
      onEnter: () => splitTextReveal(title)
    });
  }

  // Steps
  scrollReveal('.process__step', {
    y: 60,
    stagger: 0.2,
    trigger: '.process__grid'
  });
}

// ─── Property Card Hover Effects ──────────────────────────────────────────
// Elegant, subtle hover effect - no aggressive tilting
export function initPropertyCardHover(card: HTMLElement): void {
  const image = card.querySelector('.property-card__image');
  const overlay = card.querySelector('.property-card__overlay');

  card.addEventListener('mouseenter', () => {
    // Subtle lift with golden glow
    gsap.to(card, {
      y: -4,
      boxShadow: '0 12px 40px rgba(201, 168, 76, 0.15)',
      duration: 0.4,
      ease: EASES.luxury
    });
    gsap.to(image, { scale: 1.03, duration: 0.5, ease: EASES.luxury });
    gsap.to(overlay, { opacity: 0.5, duration: 0.4 });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      duration: 0.4,
      ease: EASES.luxury
    });
    gsap.to(image, { scale: 1, duration: 0.4 });
    gsap.to(overlay, { opacity: 0.6, duration: 0.4 });
  });

  // No mousemove tilt - keep it elegant and stable
}

// ─── Navigation Scroll Effect ─────────────────────────────────────────────
export function initNavScroll(): void {
  const nav = document.getElementById('nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 100,
    onUpdate: (self) => {
      if (self.scroll() > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });
}

// ─── Magnetic Button Effect ──────────────────────────────────────────────
export function initMagneticButtons(): void {
  const buttons = document.querySelectorAll('.btn--primary, .btn--ghost');

  buttons.forEach((button) => {
    const btn = button as HTMLElement;
    let bounds: DOMRect;

    btn.addEventListener('mouseenter', () => {
      bounds = btn.getBoundingClientRect();
    });

    btn.addEventListener('mousemove', (e) => {
      if (!bounds) return;
      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: EASES.bounce
      });
    });
  });
}

// ─── Cleanup ──────────────────────────────────────────────────────────────
export function killAllAnimations(): void {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf('*');
}
