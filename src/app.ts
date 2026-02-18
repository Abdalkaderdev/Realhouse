// ═══════════════════════════════════════════════════════════════════════════
// Real House - Application Controller
// ═══════════════════════════════════════════════════════════════════════════

import { SceneManager } from './three/scene';
import { CustomCursor } from './animations/cursor';
import { initSmoothScroll, destroySmoothScroll, scrollToTop } from './animations/smooth-scroll';
import {
  animateLoader,
  hideLoader,
  pageTransitionOut,
  pageTransitionIn,
  animateHero,
  animateStats,
  animateFeatured,
  animateProcess,
  initPropertyCardHover,
  initNavScroll,
  initMagneticButtons,
  killAllAnimations,
  scrollReveal
} from './animations/gsap';
import { initAllEffects, initCardTilt, initImageParallax } from './animations/effects';
import { initTextEffects, cinematicReveal } from './animations/text-effects';
import { initHorizontalScroll, initVelocitySkew } from './animations/horizontal-scroll';
import { initAllMarquees } from './animations/marquee';
import { initImageDistortion, destroyImageDistortion } from './animations/image-distortion';
import { CursorTrail, initMagneticGlow, initRippleEffect } from './animations/cursor-trail';
import { renderHomePage, renderPropertiesPage, renderAboutPage, renderContactPage, renderPropertyDetailPage } from './pages';

export class App {
  private sceneManager: SceneManager | null = null;
  private cursor: CustomCursor | null = null;
  private cursorTrail: CursorTrail | null = null;
  private currentPage: string = '/';

  async init(): Promise<void> {
    // Set initial theme
    this.initTheme();

    // Initialize Three.js scene
    this.sceneManager = new SceneManager();
    this.sceneManager.start();

    // Initialize custom cursor
    this.cursor = new CustomCursor();
    this.cursor.init();

    // Initialize cursor particle trail
    this.cursorTrail = new CursorTrail();
    this.cursorTrail.start();

    // Run loader animation
    await animateLoader();

    // Camera intro animation
    await this.sceneManager.cinematicIntro();

    // Hide loader
    await hideLoader();

    // Initialize smooth scroll (Lenis)
    initSmoothScroll();

    // Initialize scroll progress bar
    this.initScrollProgress();

    // Initialize velocity-based skew on images
    initVelocitySkew('.property-card__image');

    // Initialize navigation
    this.initNavigation();
    initNavScroll();

    // Initialize mobile menu
    this.initMobileMenu();

    // Initialize theme toggle
    this.initThemeToggle();

    // Load initial page
    await this.navigate(window.location.pathname, false);

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname, false);
    });
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('rh-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  private initScrollProgress(): void {
    const bar = document.querySelector('.scroll-progress__bar') as HTMLElement;
    if (!bar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  private initThemeToggle(): void {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('rh-theme', next);
    });
  }

  private initNavigation(): void {
    document.addEventListener('click', (e) => {
      const anchor = (e.target as Element).closest('a[data-route]');
      if (!anchor) return;

      e.preventDefault();
      const href = anchor.getAttribute('href') || '/';

      if (href !== this.currentPage) {
        history.pushState({}, '', href);
        this.navigate(href, true);
      }
    });
  }

  private initMobileMenu(): void {
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  async navigate(path: string, animate: boolean): Promise<void> {
    // Clean path
    const cleanPath = path.split('?')[0].split('#')[0] || '/';

    // Update active nav link
    this.updateActiveNavLink(cleanPath);

    if (animate) {
      await pageTransitionOut();
    }

    // Kill existing animations
    killAllAnimations();

    // Render page content
    const app = document.getElementById('app');
    if (!app) return;

    // Clear existing content safely
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }

    // Render new content using DOM
    const content = this.getPageContent(cleanPath);
    app.appendChild(content);

    this.currentPage = cleanPath;

    // Update page title
    document.title = this.getPageTitle(cleanPath);

    // Initialize page-specific animations
    await this.initPageAnimations(cleanPath);

    if (animate) {
      await pageTransitionIn();
    }

    // Scroll to top
    scrollToTop({ immediate: true });
  }

  private updateActiveNavLink(path: string): void {
    document.querySelectorAll('.nav__link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === path || (path === '/' && href === '/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  private getPageContent(path: string): DocumentFragment {
    if (path === '/') {
      return renderHomePage();
    } else if (path === '/properties') {
      return renderPropertiesPage();
    } else if (path.startsWith('/properties/')) {
      const propertyId = path.replace('/properties/', '');
      return renderPropertyDetailPage(propertyId);
    } else if (path === '/about') {
      return renderAboutPage();
    } else if (path === '/contact') {
      return renderContactPage();
    }
    return renderHomePage();
  }

  private getPageTitle(path: string): string {
    const titles: Record<string, string> = {
      '/': 'Real House — Luxury Real Estate',
      '/properties': 'Properties — Real House',
      '/about': 'About — Real House',
      '/contact': 'Contact — Real House'
    };
    if (path.startsWith('/properties/')) {
      return 'Property Details — Real House';
    }
    return titles[path] || 'Real House — Luxury Real Estate';
  }

  private async initPageAnimations(path: string): Promise<void> {
    // Wait a frame for DOM to be ready
    await new Promise(resolve => requestAnimationFrame(resolve));

    // Initialize magnetic buttons
    initMagneticButtons();

    // Initialize magnetic glow on buttons
    initMagneticGlow('.btn');

    // Initialize ripple effect on buttons
    initRippleEffect('.btn');

    // Initialize all visual effects
    initAllEffects();

    // Initialize text effects
    initTextEffects();

    // Initialize marquees
    initAllMarquees();

    // Initialize property card hover effects with 3D tilt
    document.querySelectorAll('.property-card').forEach(card => {
      initPropertyCardHover(card as HTMLElement);
    });
    initCardTilt('.property-card');
    initImageParallax('.property-card__media');

    // Initialize image distortion on property images
    initImageDistortion('.property-card__media', 0.8);

    // Page-specific animations
    if (path === '/') {
      animateHero();
      animateStats();
      animateFeatured();

      // Initialize horizontal scroll showcase
      initHorizontalScroll({
        container: '.showcase',
        wrapper: '.showcase__wrapper',
        panels: '.showcase-panel',
        parallaxImages: '.showcase-panel__bg img',
        progressBar: '.showcase__progress-bar'
      });

      // Animate hero headline with cinematic reveal
      const heroHeadline = document.querySelector('.hero__headline') as HTMLElement;
      if (heroHeadline) {
        cinematicReveal(heroHeadline, { delay: 0.5 });
      }

      animateProcess();
    } else if (path === '/properties') {
      scrollReveal('.properties-page__header', { y: 40 });
      scrollReveal('.property-card', { y: 60, stagger: 0.1, trigger: '.properties-page__grid' });
    } else if (path === '/about') {
      scrollReveal('.about-page__title', { y: 40 });
      scrollReveal('.about-page__subtitle', { y: 30 });
      scrollReveal('.about-page__story-content', { y: 40 });
      scrollReveal('.about-page__value', { y: 40, stagger: 0.15 });
      scrollReveal('.about-page__member', { y: 40, stagger: 0.1 });
    } else if (path === '/contact') {
      scrollReveal('.contact-page__header', { y: 40 });
      scrollReveal('.contact-page__form', { y: 40 });
      scrollReveal('.contact-page__info-item', { y: 30, stagger: 0.1 });
    } else if (path.startsWith('/properties/')) {
      scrollReveal('.property-gallery', { y: 40 });
      scrollReveal('.property-detail__header', { y: 30 });
      scrollReveal('.property-detail__price-section', { y: 30 });
      scrollReveal('.property-detail__specs', { y: 30 });
      scrollReveal('.property-detail__description', { y: 30 });
      scrollReveal('.property-detail__features', { y: 30 });
      scrollReveal('.property-detail__agent-card', { y: 40 });
      scrollReveal('.property-detail__location-card', { y: 40 });
    }
  }

  destroy(): void {
    this.sceneManager?.dispose();
    this.cursor?.destroy();
    this.cursorTrail?.destroy();
    destroySmoothScroll();
    destroyImageDistortion();
    killAllAnimations();
  }
}
