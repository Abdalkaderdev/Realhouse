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
import { renderHomePage, renderPropertiesPage, renderAboutPage, renderContactPage, renderPropertyDetailPage, renderPrivacyPage, renderTermsPage, renderFAQPage, render404Page, renderComparisonPage, renderFavoritesPage, savePropertiesScrollPosition, getPropertiesScrollPosition, parseFiltersFromURL } from './pages';
import { renderProjectsPage, renderProjectDetailPage } from './pages/projects';
import { getPropertyById } from './data/properties';
import { initComparisonBar, updateComparisonBar } from './comparison';
import { initFavoritesUI } from './utils/favorites';
import {
  setupPropertyPageSEO,
  setupPropertiesPageSEO,
  setupContactPageSEO,
  setupAboutPageSEO,
  setupFAQPageSEO,
  setupHomePageSEO,
  clearDynamicSchemas
} from './seo/schema';

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

    // Initialize favorites UI (badge count)
    initFavoritesUI();

    // Load initial page
    await this.navigate(window.location.pathname, false);

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      const path = window.location.pathname + window.location.search;
      const isReturningToProperties = window.location.pathname === '/properties';
      this.navigate(path, false, isReturningToProperties);
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

  async navigate(path: string, animate: boolean, restoreScroll: boolean = false): Promise<void> {
    // Clean path (preserve query string for properties page)
    const cleanPath = path.split('?')[0].split('#')[0] || '/';

    // Save scroll position when leaving properties page
    if (this.currentPage === '/properties' && cleanPath !== '/properties') {
      savePropertiesScrollPosition();
    }

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

    // Handle scroll position
    if (restoreScroll && cleanPath === '/properties') {
      // Restore saved scroll position when returning to properties page
      const savedScroll = getPropertiesScrollPosition();
      if (savedScroll > 0) {
        setTimeout(() => {
          window.scrollTo(0, savedScroll);
        }, 100);
      }
    } else {
      // Scroll to top for other pages
      scrollToTop({ immediate: true });
    }
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
    } else if (path === '/projects') {
      return renderProjectsPage();
    } else if (path.startsWith('/projects/')) {
      const projectId = path.replace('/projects/', '');
      return renderProjectDetailPage(projectId);
    } else if (path === '/compare') {
      return renderComparisonPage();
    } else if (path === '/favorites') {
      return renderFavoritesPage();
    }
    // 404 for unknown routes
    return render404Page();
  }

  private getPageTitle(path: string): string {
    const titles: Record<string, string> = {
      '/': 'Real House — Luxury Real Estate',
      '/properties': 'Properties — Real House',
      '/about': 'About — Real House',
      '/contact': 'Contact — Real House',
      '/privacy': 'Privacy Policy — Real House',
      '/terms': 'Terms of Service — Real House',
      '/faq': 'FAQ — Real House',
      '/projects': 'Development Projects — Real House',
      '/favorites': 'My Favorites — Real House',
      '/compare': 'Compare Properties — Real House'
    };
    if (path.startsWith('/properties/')) {
      return 'Property Details — Real House';
    }
    if (path.startsWith('/projects/')) {
      return 'Project Details — Real House';
    }
    // Return 404 title for unknown routes
    return titles[path] || 'Page Not Found — Real House';
  }

  private getPageDescription(path: string): string {
    const descriptions: Record<string, string> = {
      '/': 'Real House — Premium luxury real estate. Curated properties for the discerning buyer.',
      '/properties': 'Browse our exclusive collection of luxury properties including villas, penthouses, and estates worldwide.',
      '/about': 'Learn about Real House, our mission, values, and the team behind the premier luxury real estate experience.',
      '/contact': 'Get in touch with Real House. Contact our team for personalized assistance with your luxury property search.',
      '/privacy': 'Real House Privacy Policy. Learn how we protect and handle your personal information.',
      '/terms': 'Real House Terms of Service. Read our terms and conditions for using our services.',
      '/faq': 'Frequently asked questions about Real House services, the buying process, financing, and more.',
      '/projects': 'Explore premier real estate development projects in Erbil including Empire World, Dream City, Italian Village, and more.',
      '/favorites': 'View your saved favorite properties. Manage your wishlist and compare your top picks.',
      '/compare': 'Compare properties side by side. Analyze features, prices, and specifications.'
    };
    if (path.startsWith('/properties/')) {
      return 'Explore this exceptional luxury property with detailed specifications, features, and virtual tour options.';
    }
    if (path.startsWith('/projects/')) {
      return 'Discover this exceptional development project with amenities, unit availability, and investment opportunities.';
    }
    return descriptions[path] || descriptions['/'];
  }

  private updateMetaTags(path: string): void {
    // Handle property detail pages with dynamic SEO
    if (path.startsWith('/properties/')) {
      const propertyId = path.replace('/properties/', '');
      const property = getPropertyById(propertyId);

      if (property) {
        // Use enhanced SEO for property pages
        setupPropertyPageSEO(property);
        return;
      }
    }

    // Setup page-specific SEO schemas
    if (path === '/') {
      setupHomePageSEO();
    } else if (path === '/properties') {
      setupPropertiesPageSEO();
    } else if (path === '/contact') {
      setupContactPageSEO();
    } else if (path === '/about') {
      setupAboutPageSEO();
    } else if (path === '/faq') {
      setupFAQPageSEO();
    } else {
      // Clear dynamic schemas for other pages
      clearDynamicSchemas();
    }

    // Standard meta tag updates for non-property pages
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

    // Reset og:image to default for non-property pages
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', 'https://realhouseiq.com/favicon.svg');
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

    // Reset twitter:image to default for non-property pages
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', 'https://realhouseiq.com/favicon.svg');
    }
  }

  private async initPageAnimations(path: string): Promise<void> {
    // Wait a frame for DOM to be ready
    await new Promise(resolve => requestAnimationFrame(resolve));

    // Initialize comparison bar for pages with property cards
    if (path === '/' || path === '/properties' || path === '/compare' || path === '/favorites') {
      initComparisonBar();
      updateComparisonBar();
    }

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
    } else if (path === '/projects') {
      scrollReveal('.projects-page__header', { y: 40 });
      scrollReveal('.project-card', { y: 60, stagger: 0.1, trigger: '.projects-page__grid' });
    } else if (path.startsWith('/projects/')) {
      scrollReveal('.project-gallery', { y: 40 });
      scrollReveal('.project-detail__header', { y: 30 });
      scrollReveal('.project-detail__stats', { y: 30 });
      scrollReveal('.project-detail__description', { y: 30 });
      scrollReveal('.project-detail__amenities', { y: 30 });
      scrollReveal('.project-detail__contact-card', { y: 40 });
      scrollReveal('.project-detail__location-card', { y: 40 });
    } else if (path === '/favorites') {
      scrollReveal('.favorites-page__header', { y: 40 });
      scrollReveal('.property-card', { y: 60, stagger: 0.1, trigger: '.favorites-page__grid' });
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
