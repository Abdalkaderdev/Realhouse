// ═══════════════════════════════════════════════════════════════════════════
// Real House - Application Controller
// ═══════════════════════════════════════════════════════════════════════════

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
import { renderHomePage, renderPropertiesPage, renderAboutPage, renderContactPage, renderPropertyDetailPage, renderPrivacyPage, renderTermsPage, renderFAQPage } from './pages';

export class App {
  private cursor: CustomCursor | null = null;
  private cursorTrail: CursorTrail | null = null;
  private currentPage: string = '/';

  async init(): Promise<void> {
    // Set initial theme
    this.initTheme();



    // Run loader animation
    await animateLoader();


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

    const closeMenu = () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
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

    // Update page title and meta tags for SEO
    this.updateMetaTags(cleanPath);

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
    } else if (path === '/privacy') {
      return renderPrivacyPage();
    } else if (path === '/terms') {
      return renderTermsPage();
    } else if (path === '/faq') {
      return renderFAQPage();
    }
    return renderHomePage();
  }

  private getPageTitle(path: string): string {
    const titles: Record<string, string> = {
      '/': 'Real House — Luxury Real Estate',
      '/properties': 'Properties — Real House',
      '/about': 'About — Real House',
      '/contact': 'Contact — Real House',
      '/privacy': 'Privacy Policy — Real House',
      '/terms': 'Terms of Service — Real House',
      '/faq': 'FAQ — Real House'
    };
    if (path.startsWith('/properties/')) {
      return 'Property Details — Real House';
    }
    return titles[path] || 'Real House — Luxury Real Estate';
  }

  private getPageDescription(path: string): string {
    const descriptions: Record<string, string> = {
      '/': 'Real House — Premium luxury real estate. Curated properties for the discerning buyer.',
      '/properties': 'Browse our exclusive collection of luxury properties including villas, penthouses, and estates worldwide.',
      '/about': 'Learn about Real House, our mission, values, and the team behind the premier luxury real estate experience.',
      '/contact': 'Get in touch with Real House. Contact our team for personalized assistance with your luxury property search.',
      '/privacy': 'Real House Privacy Policy. Learn how we protect and handle your personal information.',
      '/terms': 'Real House Terms of Service. Read our terms and conditions for using our services.',
      '/faq': 'Frequently asked questions about Real House services, the buying process, financing, and more.'
    };
    if (path.startsWith('/properties/')) {
      return 'Explore this exceptional luxury property with detailed specifications, features, and virtual tour options.';
    }
    return descriptions[path] || descriptions['/'];
  }

  private updateMetaTags(path: string): void {
    const title = this.getPageTitle(path);
    const description = this.getPageDescription(path);
    const url = `https://realhouseiq.com${path === '/' ? '' : path}`;

    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', url);
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
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

      // Initialize horizontal scroll showcase only on desktop (> 768px)
      // Skip on mobile devices to allow vertical stacking
      if (window.innerWidth > 768) {
        initHorizontalScroll({
          container: '.showcase',
          wrapper: '.showcase__wrapper',
          panels: '.showcase-panel',
          parallaxImages: '.showcase-panel__bg img',
          progressBar: '.showcase__progress-bar'
        });
      }

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
    } else if (path === '/privacy') {
      scrollReveal('.privacy-page__header', { y: 40 });
      scrollReveal('.privacy-page__section', { y: 30, stagger: 0.1 });
    } else if (path === '/terms') {
      scrollReveal('.terms-page__header', { y: 40 });
      scrollReveal('.terms-page__section', { y: 30, stagger: 0.1 });
    } else if (path === '/faq') {
      scrollReveal('.faq-page__header', { y: 40 });
      scrollReveal('.faq-page__item', { y: 30, stagger: 0.08 });
      scrollReveal('.faq-page__cta', { y: 40 });
    }
  }

  destroy(): void {
    this.cursor?.destroy();
    this.cursorTrail?.destroy();
    destroySmoothScroll();
    destroyImageDistortion();
    killAllAnimations();
  }
}
