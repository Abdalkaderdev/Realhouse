# Fix Image Galleries & Hero Slider Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix hero slider auto-rotation, add image carousel to property cards, and add touch/swipe support across all galleries.

**Architecture:** Four independent fixes: (1) Fix CSS animation conflict breaking hero text transitions, (2) Add image dot indicators + carousel to property cards, (3) Add touch/swipe handlers as a shared utility used by all galleries, (4) Add manual navigation dots to hero slider.

**Tech Stack:** TypeScript, SCSS, vanilla DOM (no frameworks). Uses GSAP for some animations. Vite bundler.

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/styles/main.scss` | Modify (lines 1283-1298, 6182-6243) | Fix animate-reveal conflict, add hero dots styles |
| `src/pages.ts` | Modify (lines 502-525, 704-798) | Add property card carousel, add hero dots/controls |
| `src/utils/touch-swipe.ts` | Create | Shared touch/swipe utility for all galleries |
| `src/pages/property-detail.ts` | Modify (lines 1098-1138) | Add touch/swipe to property detail gallery |
| `src/pages/project-detail.ts` | Modify (lines 558-673) | Add touch/swipe to project detail lightbox |
| `src/pages/gallery.ts` | Modify (lines 111-290) | Add touch/swipe to gallery lightbox |
| `src/styles/_property-card-carousel.scss` | Create | Styles for property card image dots and carousel |

---

### Task 1: Fix Hero Slider Text Animation Conflict

**Root cause:** `@extend .animate-reveal` applies `animation: revealUp 0.8s both` to headline/subline. CSS `fill-mode: both` overrides inline `style.opacity` set by JS during slide transitions.

**Files:**
- Modify: `src/styles/main.scss:1283-1298`
- Modify: `src/pages.ts:745-778`

- [ ] **Step 1: Remove `@extend .animate-reveal` from hero headline/subline and use JS-driven initial animation instead**

In `src/styles/main.scss`, replace lines 1283-1298:

```scss
  &__headline {
    margin-bottom: var(--space-6);
    @extend .text-gold-gradient;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s var(--ease-luxury), transform 0.8s var(--ease-luxury);
  }

  &__subline {
    font-size: var(--text-lg);
    color: var(--c-text-2);
    margin-bottom: var(--space-8);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s var(--ease-luxury), transform 0.8s var(--ease-luxury);
    transition-delay: 0.2s;
  }
```

This replaces the CSS animation (which overrides inline styles) with CSS transitions (which DON'T override inline styles). The initial state is `opacity: 0; translateY(30px)`. The JS at line 780-786 already sets `opacity: 1` after 100ms, which will now trigger the transition.

- [ ] **Step 2: Update the slide rotation JS to use transitions properly**

In `src/pages.ts`, the existing code at lines 752-776 sets inline opacity/transform. Since we now use CSS transitions instead of animations, the inline styles will work correctly. No JS changes needed for this step - verify the existing logic is compatible.

- [ ] **Step 3: Rebuild and verify**

Run: `cd C:/Users/max/realhouse && npx vite build`
Expected: Build succeeds. Hero text fades out/in during slide transitions.

- [ ] **Step 4: Commit**

```bash
git add src/styles/main.scss
git commit -m "fix(hero): replace animate-reveal with transitions so slide text fades work"
```

---

### Task 2: Add Manual Navigation Dots to Hero Slider

**Files:**
- Modify: `src/pages.ts:704-798`
- Modify: `src/styles/main.scss:6182-6243`

- [ ] **Step 1: Add dot indicators to hero section**

In `src/pages.ts`, after line 798 (after `heroContent.appendChild(cta);`), before `hero.appendChild(heroContent);` (line 800), add:

```typescript
  // Slide indicator dots
  const dotsContainer = createElement('div', 'hero__dots');
  dotsContainer.setAttribute('role', 'tablist');
  dotsContainer.setAttribute('aria-label', 'Slide navigation');

  heroImages.forEach((_, index) => {
    const dot = createElement('button', `hero__dot${index === 0 ? ' hero__dot--active' : ''}`);
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.setAttribute('data-slide', index.toString());
    dotsContainer.appendChild(dot);
  });

  heroContent.appendChild(dotsContainer);
```

- [ ] **Step 2: Update setInterval to also update dots, and add dot click handlers**

In `src/pages.ts`, update the setInterval block (lines 745-778). After the `slides[currentSlideIndex].classList.add('hero__slide--active');` line (766), add dot update logic:

```typescript
      // Update dots
      const dots = document.querySelectorAll('.hero__dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('hero__dot--active', i === currentSlideIndex);
        dot.setAttribute('aria-selected', i === currentSlideIndex ? 'true' : 'false');
      });
```

After the setInterval block (after line 778), add dot click handlers:

```typescript
  // Dot click handlers
  document.querySelectorAll('.hero__dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-slide') || '0', 10);
      if (targetIndex === currentSlideIndex) return;

      // Fade out text
      headline.style.opacity = '0';
      subline.style.opacity = '0';
      headline.style.transform = 'translateY(10px)';
      subline.style.transform = 'translateY(10px)';

      setTimeout(() => {
        slides[currentSlideIndex].classList.remove('hero__slide--active');
        currentSlideIndex = targetIndex;
        slides[currentSlideIndex].classList.add('hero__slide--active');

        // Update dots
        document.querySelectorAll('.hero__dot').forEach((d, i) => {
          d.classList.toggle('hero__dot--active', i === currentSlideIndex);
          d.setAttribute('aria-selected', i === currentSlideIndex ? 'true' : 'false');
        });

        headline.textContent = heroImages[currentSlideIndex].title;
        subline.textContent = heroImages[currentSlideIndex].subtitle;
        headline.style.opacity = '1';
        subline.style.opacity = '1';
        headline.style.transform = 'translateY(0)';
        subline.style.transform = 'translateY(0)';
      }, 400);
    });
  });
```

- [ ] **Step 3: Add hero dots CSS**

In `src/styles/main.scss`, inside the `.hero` block at line 6182, after `&__slide` block (after line 6207), add:

```scss
  &__dots {
    display: flex;
    gap: var(--space-2);
    justify-content: center;
    margin-top: var(--space-8);
  }

  &__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.4);
    background: transparent;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--c-gold);
    }

    &--active {
      background: var(--c-gold);
      border-color: var(--c-gold);
      transform: scale(1.2);
    }
  }
```

- [ ] **Step 4: Rebuild and verify**

Run: `cd C:/Users/max/realhouse && npx vite build`
Expected: Hero shows dots at bottom. Clicking a dot changes the slide. Auto-rotation updates active dot.

- [ ] **Step 5: Commit**

```bash
git add src/pages.ts src/styles/main.scss
git commit -m "feat(hero): add navigation dots for manual slide control"
```

---

### Task 3: Create Shared Touch/Swipe Utility

**Files:**
- Create: `src/utils/touch-swipe.ts`

- [ ] **Step 1: Create the touch/swipe utility**

Create `src/utils/touch-swipe.ts`:

```typescript
interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function addSwipeSupport(element: HTMLElement, callbacks: SwipeCallbacks): () => void {
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  const SWIPE_THRESHOLD = 50;
  const SWIPE_MAX_Y = 100; // Ignore if vertical scroll exceeds this

  const onTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = Math.abs(endY - startY);

    // Only trigger if horizontal swipe is dominant
    if (Math.abs(diffX) > SWIPE_THRESHOLD && diffY < SWIPE_MAX_Y) {
      if (diffX < 0) {
        callbacks.onSwipeLeft?.();
      } else {
        callbacks.onSwipeRight?.();
      }
    }
  };

  element.addEventListener('touchstart', onTouchStart, { passive: true });
  element.addEventListener('touchend', onTouchEnd, { passive: true });

  // Return cleanup function
  return () => {
    element.removeEventListener('touchstart', onTouchStart);
    element.removeEventListener('touchend', onTouchEnd);
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/touch-swipe.ts
git commit -m "feat: add shared touch/swipe utility for mobile gallery navigation"
```

---

### Task 4: Add Touch/Swipe to Property Detail Gallery

**Files:**
- Modify: `src/pages/property-detail.ts:1098-1138`

- [ ] **Step 1: Import swipe utility and add touch handlers**

At the top of `src/pages/property-detail.ts`, add import:
```typescript
import { addSwipeSupport } from '../utils/touch-swipe';
```

In `initializeGallery()` function (after the keyboard handler at line 1133), add:

```typescript
  // Touch/swipe support for mobile
  const galleryMain = document.querySelector('.property-detail__gallery-main') as HTMLElement;
  if (galleryMain) {
    addSwipeSupport(galleryMain, {
      onSwipeLeft: () => updateMainImage(currentIndex + 1),
      onSwipeRight: () => updateMainImage(currentIndex - 1),
    });
  }
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/property-detail.ts
git commit -m "feat(property-detail): add touch/swipe support to image gallery"
```

---

### Task 5: Add Touch/Swipe to Project Detail Lightbox

**Files:**
- Modify: `src/pages/project-detail.ts:558-673`

- [ ] **Step 1: Import swipe utility and add touch handlers**

At the top of `src/pages/project-detail.ts`, add import:
```typescript
import { addSwipeSupport } from '../utils/touch-swipe';
```

In `createLightbox()` function, after the keyboard handler setup (around line 653), add:

```typescript
  // Touch/swipe support for mobile
  addSwipeSupport(imageContainer, {
    onSwipeLeft: () => navigate(1),
    onSwipeRight: () => navigate(-1),
  });
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/project-detail.ts
git commit -m "feat(project-detail): add touch/swipe support to lightbox"
```

---

### Task 6: Add Touch/Swipe to Gallery Lightbox

**Files:**
- Modify: `src/pages/gallery.ts:111-290`

- [ ] **Step 1: Import swipe utility and add touch handlers**

At the top of `src/pages/gallery.ts`, add import:
```typescript
import { addSwipeSupport } from '../utils/touch-swipe';
```

In `openLightbox()`, after the lightbox content is created and event listeners are set up, add:

```typescript
  // Touch/swipe support for mobile
  const imageWrapper = content.querySelector('.gallery-lightbox__image-wrapper') as HTMLElement;
  if (imageWrapper) {
    addSwipeSupport(imageWrapper, {
      onSwipeLeft: () => navigateLightbox(1),
      onSwipeRight: () => navigateLightbox(-1),
    });
  }
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/gallery.ts
git commit -m "feat(gallery): add touch/swipe support to lightbox"
```

---

### Task 7: Add Touch/Swipe to Hero Slider

**Files:**
- Modify: `src/pages.ts:704-798`

- [ ] **Step 1: Import and add touch handlers to hero**

At the top of `src/pages.ts`, add import:
```typescript
import { addSwipeSupport } from './utils/touch-swipe';
```

In `renderHomePage()`, after the dot click handlers (added in Task 2), add:

```typescript
  // Touch/swipe support for hero
  addSwipeSupport(hero, {
    onSwipeLeft: () => {
      const dot = document.querySelector(`.hero__dot[data-slide="${(currentSlideIndex + 1) % slides.length}"]`) as HTMLElement;
      dot?.click();
    },
    onSwipeRight: () => {
      const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      const dot = document.querySelector(`.hero__dot[data-slide="${prevIndex}"]`) as HTMLElement;
      dot?.click();
    },
  });
```

- [ ] **Step 2: Commit**

```bash
git add src/pages.ts
git commit -m "feat(hero): add touch/swipe support for mobile slide navigation"
```

---

### Task 8: Add Image Carousel Dots to Property Cards

**Files:**
- Modify: `src/pages.ts:502-525` (createPropertyCard function)
- Create: `src/styles/_property-card-carousel.scss`
- Modify: `src/styles/main.scss` (import the new partial)

- [ ] **Step 1: Create property card carousel SCSS**

Create `src/styles/_property-card-carousel.scss`:

```scss
// Property Card Image Carousel
.property-card__carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.property-card__carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.property-card__carousel-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.property-card__dots {
  position: absolute;
  bottom: var(--space-3);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 3;
  pointer-events: none;
}

.property-card__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 0;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.2s ease;

  &--active {
    background: var(--c-gold);
    transform: scale(1.3);
  }
}

// Arrow buttons on card hover
.property-card__carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: auto;
  font-size: 14px;

  .property-card:hover & {
    opacity: 1;
  }

  &--prev {
    left: var(--space-2);
  }

  &--next {
    right: var(--space-2);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
}
```

- [ ] **Step 2: Import the new partial in main.scss**

In `src/styles/main.scss`, add import near the top with other imports:
```scss
@use 'property-card-carousel';
```

- [ ] **Step 3: Update createPropertyCard to render multiple images**

In `src/pages.ts`, replace lines 510-525 (the media/image creation section) with:

```typescript
  // Media section with figure element for semantic markup
  const media = createElement('figure', 'property-card__media');

  if (property.images.length > 1) {
    // Carousel for multiple images
    const carousel = createElement('div', 'property-card__carousel');
    const track = createElement('div', 'property-card__carousel-track');

    const maxSlides = Math.min(property.images.length, 5); // Cap at 5 images
    property.images.slice(0, maxSlides).forEach((imgSrc, index) => {
      const slide = createElement('div', 'property-card__carousel-slide');
      const slideImg = createSEOImage({
        src: imgSrc,
        alt: generatePropertyAltText(property, index, 'card'),
        title: index === 0 ? generatePropertyTitle(property) : '',
        className: 'property-card__image',
        loading: 'lazy',
        width: IMAGE_DIMENSIONS.card.width,
        height: IMAGE_DIMENSIONS.card.height,
        srcset: generateSrcSet(imgSrc, [400, 600, 800]),
        sizes: generateSizes('card'),
      });
      slide.appendChild(slideImg);
      track.appendChild(slide);
    });

    carousel.appendChild(track);

    // Dots
    const dots = createElement('div', 'property-card__dots');
    for (let i = 0; i < maxSlides; i++) {
      const dot = createElement('span', `property-card__dot${i === 0 ? ' property-card__dot--active' : ''}`);
      dots.appendChild(dot);
    }
    carousel.appendChild(dots);

    // Prev/Next buttons
    const prevBtn = createElement('button', 'property-card__carousel-btn property-card__carousel-btn--prev');
    prevBtn.innerHTML = '&#8249;';
    prevBtn.setAttribute('aria-label', 'Previous image');
    carousel.appendChild(prevBtn);

    const nextBtn = createElement('button', 'property-card__carousel-btn property-card__carousel-btn--next');
    nextBtn.innerHTML = '&#8250;';
    nextBtn.setAttribute('aria-label', 'Next image');
    carousel.appendChild(nextBtn);

    // Carousel logic
    let currentSlide = 0;
    const updateSlide = (index: number) => {
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.querySelectorAll('.property-card__dot').forEach((d, i) => {
        d.classList.toggle('property-card__dot--active', i === currentSlide);
      });
    };

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      updateSlide(currentSlide === 0 ? maxSlides - 1 : currentSlide - 1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      updateSlide(currentSlide === maxSlides - 1 ? 0 : currentSlide + 1);
    });

    // Touch/swipe on card
    addSwipeSupport(carousel, {
      onSwipeLeft: () => updateSlide(currentSlide === maxSlides - 1 ? 0 : currentSlide + 1),
      onSwipeRight: () => updateSlide(currentSlide === 0 ? maxSlides - 1 : currentSlide - 1),
    });

    media.appendChild(carousel);
  } else {
    // Single image fallback
    const img = createSEOImage({
      src: property.images[0],
      alt: generatePropertyAltText(property, 0, 'card'),
      title: generatePropertyTitle(property),
      className: 'property-card__image',
      loading: 'lazy',
      width: IMAGE_DIMENSIONS.card.width,
      height: IMAGE_DIMENSIONS.card.height,
      srcset: generateSrcSet(property.images[0], [400, 600, 800]),
      sizes: generateSizes('card'),
    });
    media.appendChild(img);
  }
```

- [ ] **Step 4: Rebuild and verify**

Run: `cd C:/Users/max/realhouse && npx vite build`
Expected: Property cards show dot indicators. Hovering shows prev/next arrows. Clicking arrows or swiping changes the image.

- [ ] **Step 5: Commit**

```bash
git add src/pages.ts src/styles/_property-card-carousel.scss src/styles/main.scss
git commit -m "feat(property-cards): add image carousel with dots, arrows, and swipe"
```

---

### Task 9: Add Touch/Swipe to Fullscreen Gallery (Property Detail)

**Files:**
- Modify: `src/pages/property-detail.ts:1142-1206`

- [ ] **Step 1: Add swipe to fullscreen overlay**

In the `openFullscreenGallery()` function, after the keyboard handler (around line 1193), add:

```typescript
  // Touch/swipe support for fullscreen gallery
  addSwipeSupport(imageContainer, {
    onSwipeLeft: () => updateImage(currentIndex + 1),
    onSwipeRight: () => updateImage(currentIndex - 1),
  });
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/property-detail.ts
git commit -m "feat(property-detail): add touch/swipe to fullscreen gallery"
```

---

### Task 10: Final Build & Verification

- [ ] **Step 1: Full rebuild**

Run: `cd C:/Users/max/realhouse && npx vite build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Verify all fixes**

Checklist:
- Hero slider: text fades out/in during auto-rotation
- Hero slider: dots show and update with active slide
- Hero slider: clicking a dot changes the slide
- Hero slider: swiping left/right changes the slide
- Property cards: show dots when multiple images
- Property cards: hover shows prev/next arrows
- Property cards: clicking arrows/dots changes image
- Property cards: swiping changes image
- Property detail gallery: swiping main image navigates
- Property detail fullscreen: swiping navigates
- Project detail lightbox: swiping navigates
- Gallery lightbox: swiping navigates

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "build: rebuild dist with gallery and hero slider fixes"
```
