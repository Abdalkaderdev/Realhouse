// ═══════════════════════════════════════════════════════════════════════════
// Marquee Text Banner
// Smooth infinite scrolling text with luxury feel
// ═══════════════════════════════════════════════════════════════════════════

import { gsap } from 'gsap';

interface MarqueeOptions {
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  separator?: string;
  repeat?: number;
}

export function createMarquee(
  container: HTMLElement,
  text: string | string[],
  options: MarqueeOptions = {}
): { play: () => void; pause: () => void; destroy: () => void } {
  const {
    speed = 80,
    direction = 'left',
    pauseOnHover = true,
    separator = '  •  ',
    repeat = 4
  } = options;

  // Clear container
  container.style.overflow = 'hidden';
  container.style.whiteSpace = 'nowrap';

  // Create track
  const track = document.createElement('div');
  track.className = 'marquee-track';
  track.style.display = 'inline-flex';
  track.style.willChange = 'transform';

  // Build content
  const texts = Array.isArray(text) ? text : [text];
  const fullText = texts.join(separator) + separator;

  // Create repeated content for seamless loop
  for (let i = 0; i < repeat; i++) {
    const span = document.createElement('span');
    span.className = 'marquee-content';
    span.textContent = fullText;
    span.style.paddingRight = '0';
    track.appendChild(span);
  }

  container.appendChild(track);

  // Calculate animation
  const contentWidth = track.firstElementChild?.getBoundingClientRect().width || 0;
  const duration = contentWidth / speed;

  // Animate
  const tween = gsap.to(track, {
    x: direction === 'left' ? -contentWidth : contentWidth,
    duration,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => {
        const val = parseFloat(x);
        if (direction === 'left') {
          return val % contentWidth;
        } else {
          return val % contentWidth;
        }
      })
    }
  });

  // Hover behavior
  if (pauseOnHover) {
    container.addEventListener('mouseenter', () => {
      gsap.to(tween, { timeScale: 0.3, duration: 0.5 });
    });

    container.addEventListener('mouseleave', () => {
      gsap.to(tween, { timeScale: 1, duration: 0.5 });
    });
  }

  return {
    play: () => tween.play(),
    pause: () => tween.pause(),
    destroy: () => {
      tween.kill();
      container.removeChild(track);
    }
  };
}

// ─── Scroll-linked Marquee (speed based on scroll velocity) ───────────────
export function createScrollMarquee(
  container: HTMLElement,
  text: string | string[],
  options: MarqueeOptions & { velocityMultiplier?: number } = {}
): { destroy: () => void } {
  const {
    direction = 'left',
    separator = '  •  ',
    repeat = 4,
    velocityMultiplier = 0.5
  } = options;

  container.style.overflow = 'hidden';
  container.style.whiteSpace = 'nowrap';

  const track = document.createElement('div');
  track.className = 'marquee-track';
  track.style.display = 'inline-flex';
  track.style.willChange = 'transform';

  const texts = Array.isArray(text) ? text : [text];
  const fullText = texts.join(separator) + separator;

  for (let i = 0; i < repeat; i++) {
    const span = document.createElement('span');
    span.className = 'marquee-content';
    span.textContent = fullText;
    track.appendChild(span);
  }

  container.appendChild(track);

  const contentWidth = track.firstElementChild?.getBoundingClientRect().width || 0;

  let currentX = 0;
  let targetVelocity = 1;
  let currentVelocity = 1;
  let lastScroll = window.scrollY;
  let rafId: number;

  const animate = () => {
    currentVelocity += (targetVelocity - currentVelocity) * 0.1;

    const speed = 0.5 + Math.abs(currentVelocity) * velocityMultiplier;
    currentX -= speed * (direction === 'left' ? 1 : -1);

    if (Math.abs(currentX) >= contentWidth) {
      currentX = currentX % contentWidth;
    }

    track.style.transform = `translateX(${currentX}px)`;
    rafId = requestAnimationFrame(animate);
  };

  animate();

  const onScroll = () => {
    const velocity = window.scrollY - lastScroll;
    targetVelocity = Math.max(0.5, Math.min(5, 1 + Math.abs(velocity) * 0.05));
    lastScroll = window.scrollY;
  };

  window.addEventListener('scroll', onScroll);

  let scrollTimeout: number;
  const resetVelocity = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(() => {
      targetVelocity = 1;
    }, 150);
  };

  window.addEventListener('scroll', resetVelocity);

  return {
    destroy: () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', resetVelocity);
      container.removeChild(track);
    }
  };
}

// ─── Initialize Marquees on Page ──────────────────────────────────────────
export function initAllMarquees(): void {
  // Text marquees
  document.querySelectorAll('[data-marquee]').forEach((el) => {
    const container = el as HTMLElement;
    const text = container.dataset.marqueeText || container.textContent || '';
    const speed = parseFloat(container.dataset.marqueeSpeed || '80');
    const direction = (container.dataset.marqueeDirection || 'left') as 'left' | 'right';

    container.textContent = '';

    createMarquee(container, text, { speed, direction });
  });

  // Scroll-linked marquees
  document.querySelectorAll('[data-scroll-marquee]').forEach((el) => {
    const container = el as HTMLElement;
    const text = container.dataset.marqueeText || container.textContent || '';
    const direction = (container.dataset.marqueeDirection || 'left') as 'left' | 'right';

    container.textContent = '';

    createScrollMarquee(container, text, { direction });
  });
}
