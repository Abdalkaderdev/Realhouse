// ═══════════════════════════════════════════════════════════════════════════
// Dramatic Text Animation Effects
// Award-winning text reveals and animations
// ═══════════════════════════════════════════════════════════════════════════

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Character Split with Stagger ─────────────────────────────────────────
export function splitChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';
  element.style.display = 'inline-block';

  const chars: HTMLSpanElement[] = [];

  [...text].forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, opacity';
    element.appendChild(span);
    chars.push(span);
  });

  return chars;
}

// ─── Word Split ───────────────────────────────────────────────────────────
export function splitWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';

  const words: HTMLSpanElement[] = [];

  text.split(' ').forEach((word, i, arr) => {
    const wrapper = document.createElement('span');
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';
    wrapper.style.verticalAlign = 'top';

    const inner = document.createElement('span');
    inner.textContent = word;
    inner.style.display = 'inline-block';
    inner.style.willChange = 'transform';

    wrapper.appendChild(inner);
    element.appendChild(wrapper);

    if (i < arr.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }

    words.push(inner);
  });

  return words;
}

// ─── Line Split ───────────────────────────────────────────────────────────
export function splitLines(element: HTMLElement): HTMLDivElement[] {
  const text = element.textContent || '';
  element.textContent = '';

  // Temporarily add text to measure line breaks
  const temp = document.createElement('div');
  temp.style.cssText = window.getComputedStyle(element).cssText;
  temp.style.position = 'absolute';
  temp.style.visibility = 'hidden';
  temp.style.width = element.offsetWidth + 'px';
  document.body.appendChild(temp);

  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    temp.textContent = testLine;

    if (temp.offsetHeight > parseInt(getComputedStyle(temp).lineHeight) * 1.5 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) lines.push(currentLine);
  document.body.removeChild(temp);

  const lineElements: HTMLDivElement[] = [];

  lines.forEach((line) => {
    const wrapper = document.createElement('div');
    wrapper.style.overflow = 'hidden';

    const inner = document.createElement('div');
    inner.textContent = line;
    inner.style.willChange = 'transform';

    wrapper.appendChild(inner);
    element.appendChild(wrapper);
    lineElements.push(inner);
  });

  return lineElements;
}

// ─── Cinematic Hero Text Reveal ───────────────────────────────────────────
export function cinematicReveal(element: HTMLElement, options: {
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
  rotation?: number;
} = {}): gsap.core.Timeline {
  const {
    delay = 0,
    duration = 1.2,
    stagger = 0.03,
    y = 120,
    rotation = 8
  } = options;

  const chars = splitChars(element);

  gsap.set(element, { opacity: 1 });

  return gsap.timeline({ delay })
    .fromTo(chars,
      {
        y: y,
        rotateX: rotation,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        rotateX: 0,
        opacity: 1,
        scale: 1,
        duration,
        stagger: {
          each: stagger,
          from: 'start'
        },
        ease: 'power4.out'
      }
    );
}

// ─── Luxury Word Reveal (from bottom) ─────────────────────────────────────
export function luxuryWordReveal(element: HTMLElement, options: {
  trigger?: Element | string;
  delay?: number;
} = {}): gsap.core.Timeline {
  const words = splitWords(element);

  gsap.set(element, { opacity: 1 });

  const tl = gsap.timeline({
    delay: options.delay || 0,
    scrollTrigger: options.trigger ? {
      trigger: options.trigger,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    } : undefined
  });

  tl.fromTo(words,
    {
      y: '110%',
      rotateX: -80
    },
    {
      y: '0%',
      rotateX: 0,
      duration: 1.4,
      stagger: 0.08,
      ease: 'power4.out'
    }
  );

  return tl;
}

// ─── Morphing Counter ─────────────────────────────────────────────────────
export function morphCounter(element: HTMLElement, target: number, options: {
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
} = {}): gsap.core.Tween {
  const {
    duration = 2.5,
    suffix = '',
    prefix = '',
    decimals = 0
  } = options;

  const obj = { val: 0 };

  return gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      const formatted = decimals > 0
        ? obj.val.toFixed(decimals)
        : Math.round(obj.val).toLocaleString();
      element.textContent = prefix + formatted + suffix;
    }
  });
}

// ─── Magnetic Text (follows cursor slightly) ──────────────────────────────
export function magneticText(element: HTMLElement, strength = 0.3): void {
  let bounds: DOMRect;

  element.style.display = 'inline-block';
  element.style.transition = 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)';

  element.addEventListener('mouseenter', () => {
    bounds = element.getBoundingClientRect();
    element.style.transition = 'none';
  });

  element.addEventListener('mousemove', (e) => {
    if (!bounds) return;

    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });

  element.addEventListener('mouseleave', () => {
    element.style.transition = 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)';
    element.style.transform = 'translate(0, 0)';
  });
}

// ─── Scroll-linked Text Reveal ────────────────────────────────────────────
export function scrollLinkedReveal(element: HTMLElement): void {
  const words = splitWords(element);

  gsap.set(words, { opacity: 0.2 });

  words.forEach((word, i) => {
    gsap.to(word, {
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        start: `top ${80 - i * 5}%`,
        end: `top ${60 - i * 5}%`,
        scrub: 1
      }
    });
  });
}

// ─── Initialize All Text Effects on Page ──────────────────────────────────
export function initTextEffects(): void {
  // Skip text animations if user prefers reduced motion
  if (prefersReducedMotion) return;

  // Hero headlines
  document.querySelectorAll('[data-text-reveal="hero"]').forEach((el) => {
    gsap.set(el, { opacity: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => cinematicReveal(el as HTMLElement)
    });
  });

  // Section titles
  document.querySelectorAll('[data-text-reveal="luxury"]').forEach((el) => {
    gsap.set(el, { opacity: 0 });
    luxuryWordReveal(el as HTMLElement, { trigger: el });
  });

  // Magnetic headings
  document.querySelectorAll('[data-magnetic-text]').forEach((el) => {
    magneticText(el as HTMLElement, 0.2);
  });
}
