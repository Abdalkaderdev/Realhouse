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
import { renderHomePage, renderPropertiesPage, renderAboutPage, renderContactPage, renderPrivacyPage, renderTermsPage, renderFAQPage, renderComparisonPage, renderFavoritesPage, savePropertiesScrollPosition, getPropertiesScrollPosition, parseFiltersFromURL, render404Page } from './pages';
import { renderPropertyDetailPage, setupPropertyDetailSEO } from './pages/property-detail';
import { renderEnhanced404Page, initGlobalErrorHandler, setup404PageSEO, logError } from './pages/404';
import { renderProjectsPage, renderProjectDetailPage } from './pages/projects';
import { renderComprehensiveProjectDetailPage } from './pages/project-detail';
import { renderProjectComparePage, setupProjectComparePageSEO } from './pages/compare-projects';
import { initProjectComparisonBar, updateProjectComparisonBar } from './components/project-compare';
import { renderBlogPage, renderBlogPostPage, setupBlogPageSEO, setupBlogPostSEO } from './pages/blog';
import { renderServicesPage, renderServiceDetailPage, setupServicesPageSEO, setupServiceDetailPageSEO } from './pages/services';
import { renderServicesDirectoryPage, renderServiceCategoryPage, setupServicesDirectoryPageSEO, setupServiceCategoryPageSEO, getCategoryBySlug } from './pages/services-directory';
import { renderLocationsPage, renderDistrictPage } from './pages/locations';
import { renderAreaPage, getAllAreaSlugs, setupAreaPageSEO } from './pages/areas';
import { renderBuyPage, renderRentPage, renderInvestPage, renderLuxuryPage, setupBuyPageSEO, setupRentPageSEO, setupInvestPageSEO, setupLuxuryPageSEO } from './pages/hub-pages';
import { renderSitemapPage, setupSitemapPageSEO } from './pages/sitemap-page';
import { renderGalleryPage, setupGalleryPageSEO } from './pages/gallery';
import { renderNeighborhoodsPage, renderNeighborhoodDetailPage, getAllNeighborhoodSlugs, getNeighborhoodBySlug, setupNeighborhoodsPageSEO, setupNeighborhoodDetailPageSEO } from './pages/neighborhood-guide';
import { renderGuidePage, setupGuidePageSEO } from './pages/guides';
import { renderMarketReportPage, setupMarketReportPageSEO } from './pages/market-report';
import { renderDevelopersPage, renderDeveloperDetailPage, setupDevelopersPageSEO, setupDeveloperDetailPageSEO, getAllDeveloperSlugs } from './pages/developers';
import { renderListPropertyPage, setupListPropertyPageSEO } from './pages/list-property';
import { getGuideBySlug, getMarketReportBySlug } from './data/guides';
import { getDeveloperBySlug } from './data/developers';
import { getDistrictBySlug, getPropertyCountByDistrict, getAllDistrictSlugs } from './data/locations';
import { getPropertyById, getPropertyBySlug, generatePropertySlug } from './data/properties';
import { getServiceBySlug } from './data/services';
import { getBlogPostBySlug } from './data/blog';
import { getProjectById } from './data/projects';
import { initComparisonBar, updateComparisonBar } from './comparison';
import { initFavoritesUI } from './utils/favorites';
import {
  setupPropertyPageSEO,
  setupPropertiesPageSEO,
  setupContactPageSEO,
  setupAboutPageSEO,
  setupFAQPageSEO,
  setupHomePageSEO,
  setupLocationsPageSEO,
  setupDistrictPageSEO,
  clearDynamicSchemas,
  setupHreflangTags,
  // Comprehensive schema functions for rich results
  setupComprehensiveHomePageSEO,
  setupComprehensivePropertyPageSEO,
  setupAllHomePageSchemas,
  generateRealEstateAgentSchema,
  generateOpenHouseEventSchema,
  generateImageGallerySchema,
  generateCompleteImageGallerySchema,
  generatePropertyOfferSchema,
  generateNeighborhoodSchema,
  generateNeighborhoodsListSchema,
  generateFeaturedPropertiesListSchema,
  generatePropertiesByTypeListSchema,
  generateComprehensiveReviewSchema,
  generateCompleteOrganizationSchema,
  generateCompleteWebSiteSchema,
  generateCompleteVideoTourSchema,
  generateCompletePlaceSchema,
  generateCompletePropertyListSchema,
  generateHowToRentPropertySchema,
  generateDetailedServicesSchema
} from './seo/schema';
import {
  normalizeUrl,
  getRedirectUrl,
  generateCanonicalUrl,
  generateBreadcrumbSchema
} from './utils/seo-urls';
import {
  applyPropertySocialMeta,
  applyProjectSocialMeta,
  applyBlogSocialMeta,
  applyPageSocialMeta
} from './seo/social';

export class App {
  private cursor: CustomCursor | null = null;
  private cursorTrail: CursorTrail | null = null;
  private currentPage: string = '/';

  async init(): Promise<void> {
    // Initialize global error handler for error logging
    initGlobalErrorHandler();

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

    // Handle mobile menu dropdown toggles
    mobileMenu.querySelectorAll('.mobile-menu__link--dropdown').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = (btn as HTMLElement).closest('.mobile-menu__dropdown');
        if (dropdown) {
          dropdown.classList.toggle('active');
          const expanded = dropdown.classList.contains('active');
          btn.setAttribute('aria-expanded', String(expanded));
          const submenu = dropdown.querySelector('.mobile-menu__submenu');
          if (submenu) {
            submenu.setAttribute('aria-hidden', String(!expanded));
          }
        }
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
    // Normalize URL for SEO (lowercase, no trailing slash, hyphens instead of underscores)
    const normalizedPath = normalizeUrl(path);

    // Check for redirects (301 redirect patterns)
    const redirectUrl = getRedirectUrl(normalizedPath);
    if (redirectUrl && redirectUrl !== normalizedPath) {
      // Replace current URL with the correct one (client-side redirect)
      history.replaceState({}, '', redirectUrl);
      // Navigate to the correct URL
      return this.navigate(redirectUrl, animate, restoreScroll);
    }

    // Clean path (preserve query string for properties page)
    const queryString = path.includes('?') ? path.split('?')[1] : '';
    const cleanPath = normalizedPath.split('?')[0].split('#')[0] || '/';

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

    // Update canonical URL dynamically
    this.updateCanonicalUrl(cleanPath, queryString);

    // Update breadcrumb schema
    this.updateBreadcrumbSchema(cleanPath);

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

  private updateCanonicalUrl(path: string, queryString: string): void {
    // Generate clean canonical URL (without query params for indexing)
    const canonicalUrl = generateCanonicalUrl(path);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }
  }

  private updateBreadcrumbSchema(path: string): void {
    // Generate breadcrumb schema for structured data
    const breadcrumbs = generateBreadcrumbSchema(path);

    // Find or create breadcrumb schema script
    let breadcrumbScript = document.querySelector('script[data-schema="breadcrumb"]');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.setAttribute('type', 'application/ld+json');
      breadcrumbScript.setAttribute('data-schema', 'breadcrumb');
      document.head.appendChild(breadcrumbScript);
    }

    // Update breadcrumb schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
    };

    breadcrumbScript.textContent = JSON.stringify(schema);
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
    } else if (path === '/locations') {
      return renderLocationsPage();
    } else if (path.startsWith('/areas/')) {
      const slug = path.replace('/areas/', '');
      const areaSlugs = getAllAreaSlugs();
      if (areaSlugs.includes(slug)) {
        return renderAreaPage(slug);
      }
      return renderEnhanced404Page();
    } else if (path.startsWith('/properties/')) {
      const idOrSlug = path.replace('/properties/', '');
      // Check if it's a district slug (area-specific landing page)
      const districtSlugs = getAllDistrictSlugs();
      if (districtSlugs.includes(idOrSlug)) {
        return renderDistrictPage(idOrSlug);
      }
      // Otherwise it's a property ID
      return renderPropertyDetailPage(idOrSlug);
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
    } else if (path === '/projects/compare') {
      return renderProjectComparePage();
    } else if (path.startsWith('/projects/')) {
      const projectId = path.replace('/projects/', '');
      // Use the comprehensive project detail page with all sections
      return renderComprehensiveProjectDetailPage(projectId);
    } else if (path === '/compare') {
      return renderComparisonPage();
    } else if (path === '/favorites') {
      return renderFavoritesPage();
    } else if (path === '/blog') {
      return renderBlogPage();
    } else if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return renderBlogPostPage(slug);
    } else if (path === '/buy') {
      return renderBuyPage();
    } else if (path === '/rent') {
      return renderRentPage();
    } else if (path === '/invest') {
      return renderInvestPage();
    } else if (path === '/luxury') {
      return renderLuxuryPage();
    } else if (path === '/sitemap') {
      return renderSitemapPage();
    } else if (path === '/services') {
      return renderServicesPage();
    } else if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      return renderServiceDetailPage(slug);
    } else if (path === '/services-directory') {
      return renderServicesDirectoryPage();
    } else if (path.startsWith('/services-directory/')) {
      const slug = path.replace('/services-directory/', '');
      return renderServiceCategoryPage(slug);
    } else if (path === '/gallery') {
      return renderGalleryPage();
    } else if (path === '/neighborhoods') {
      return renderNeighborhoodsPage();
    } else if (path.startsWith('/neighborhoods/')) {
      const slug = path.replace('/neighborhoods/', '');
      const neighborhoodSlugs = getAllNeighborhoodSlugs();
      if (neighborhoodSlugs.includes(slug)) {
        return renderNeighborhoodDetailPage(slug);
      }
      return renderEnhanced404Page();
    } else if (path.startsWith('/guides/')) {
      const slug = path.replace('/guides/', '');
      return renderGuidePage(slug);
    } else if (path.startsWith('/market-report/')) {
      const slug = path.replace('/market-report/', '');
      return renderMarketReportPage(slug);
    } else if (path === '/developers') {
      return renderDevelopersPage();
    } else if (path.startsWith('/developers/')) {
      const slug = path.replace('/developers/', '');
      const developerSlugs = getAllDeveloperSlugs();
      if (developerSlugs.includes(slug)) {
        return renderDeveloperDetailPage(slug);
      }
      return renderEnhanced404Page();
    } else if (path === '/list-property') {
      return renderListPropertyPage();
    }
    // 404 for unknown routes - use enhanced version with error logging
    return renderEnhanced404Page();
  }

  private getPageTitle(path: string): string {
    // SEO-optimized titles (max 60 chars for best CTR)
    // Power words: Luxury, Premium, Trusted, #1, Expert, Exclusive
    const titles: Record<string, string> = {
      '/': 'Luxury Real Estate Erbil | #1 Property Agency Kurdistan',
      '/properties': 'Properties for Sale Erbil | Villas, Apartments, Penthouses',
      '/locations': 'Erbil Property Locations | Premium Districts Kurdistan',
      '/about': 'About Real House | 23 Years Trusted Real Estate Kurdistan',
      '/contact': 'Contact Real House Erbil | Schedule Property Viewing Today',
      '/privacy': 'Privacy Policy | Real House Erbil Kurdistan',
      '/terms': 'Terms of Service | Real House Erbil Kurdistan',
      '/faq': 'FAQ | Erbil Property Questions Answered | Real House',
      '/projects': 'New Development Projects Erbil 2025 | Off-Plan Kurdistan',
      '/projects/compare': 'Compare Development Projects Erbil | Side-by-Side',
      '/favorites': 'Saved Properties | Real House Erbil Kurdistan',
      '/compare': 'Compare Properties Erbil | Side-by-Side Analysis',
      '/blog': 'Erbil Real Estate Blog | Market Insights, Buying Guides',
      '/services': 'Premium Real Estate Services Erbil | Expert Agents',
      '/services-directory': 'Home Services Directory Erbil | Find Trusted Providers',
      '/services/property-sales': 'Sell Property Erbil | Get Top Value for Your Home',
      '/services/property-buying': 'Buy Property Erbil | Expert Real Estate Agents Kurdistan',
      '/services/property-management': 'Property Management Erbil | Trusted Rental Services',
      '/services/property-valuation': 'Free Property Valuation Erbil | Accurate Home Appraisal',
      '/services/investment-consulting': 'Investment Property Erbil | Expert ROI Advice',
      '/services/legal-assistance': 'Property Legal Services Erbil | Expert Guidance',
      '/buy': 'Buy Property Erbil | Luxury Homes for Sale Kurdistan',
      '/rent': 'Rent Property Erbil | Premium Apartments & Villas',
      '/invest': 'Investment Properties Erbil | High ROI Opportunities',
      '/luxury': 'Luxury Properties Erbil | Exclusive Villas & Penthouses',
      '/sitemap': 'Site Map | Real House Erbil | All Properties & Pages',
      '/neighborhoods': 'Erbil Neighborhood Guides | Find Your Perfect Area | Real House',
      '/developers': 'Real Estate Developers Erbil | Kurdistan Property Companies',
      '/list-property': 'List Your Property | Sell or Rent Property Erbil | Real House'
    };
    if (path.startsWith('/neighborhoods/')) {
      const slug = path.replace('/neighborhoods/', '');
      const neighborhood = getNeighborhoodBySlug(slug);
      if (neighborhood) {
        return neighborhood.metaTitle;
      }
      return 'Erbil Neighborhood Guide | Real House';
    }
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      const service = getServiceBySlug(slug);
      if (service) {
        return service.metaTitle;
      }
      return 'Premium Real Estate Service | Real House Erbil';
    }
    if (path.startsWith('/services-directory/')) {
      const slug = path.replace('/services-directory/', '');
      const category = getCategoryBySlug(slug);
      if (category) {
        return category.metaTitle;
      }
      return 'Home Services Directory | Real House Erbil';
    }
    if (path.startsWith('/areas/')) {
      const slug = path.replace('/areas/', '');
      const district = getDistrictBySlug(slug);
      if (district) {
        const count = getPropertyCountByDistrict(district.name);
        return `${district.name} Properties Erbil | ${count}+ Homes for Sale | Real House`;
      }
      return 'Erbil Neighborhood Guide | Real House';
    }
    if (path.startsWith('/properties/')) {
      const idOrSlug = path.replace('/properties/', '');
      // Check if it's a district page (area-specific landing)
      const district = getDistrictBySlug(idOrSlug);
      if (district) {
        const count = getPropertyCountByDistrict(district.name);
        return `${district.name} Properties Erbil | ${count}+ Listings | Real House`;
      }
      // Otherwise it's a property detail page - support both ID and slug lookup
      const property = getPropertyBySlug(idOrSlug) || getPropertyById(idOrSlug);
      if (property) {
        // Dynamic title: Property Type + Location + Price (max 60 chars)
        // Use power words and location for CTR
        const price = property.price > 0 ? `$${(property.price / 1000).toFixed(0)}K` : 'Price on Request';
        const typeLabel = property.type === 'Villa' ? 'Luxury Villa' : property.type === 'Penthouse' ? 'Premium Penthouse' : property.type;
        const title = `${typeLabel} ${property.location.district} Erbil | ${price}`;
        return title.length <= 60 ? title : `${property.type} for ${property.status} ${property.location.district} | Real House`;
      }
      return 'Exclusive Property | Real House Erbil Kurdistan';
    }
    if (path.startsWith('/projects/')) {
      const projectId = path.replace('/projects/', '');
      const project = getProjectById(projectId);
      if (project) {
        // Dynamic title with project name, status, and location
        const status = project.status === 'Ready' ? 'Ready to Move' : project.status === 'Under Construction' ? '2025' : 'Coming Soon';
        const title = `${project.name} Erbil | ${status} | Off-Plan Property`;
        return title.length <= 60 ? title : `${project.name} | New Development Erbil`;
      }
      return 'Off-Plan Development | Real House Erbil Kurdistan';
    }
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const post = getBlogPostBySlug(slug);
      if (post) {
        // Dynamic title from blog post with brand (max 60 chars)
        const title = `${post.title} | Real House Erbil`;
        return title.length <= 60 ? title : post.title.substring(0, 47) + '... | Real House';
      }
      return 'Erbil Real Estate Insights | Real House Blog';
    }
    if (path.startsWith('/guides/')) {
      const slug = path.replace('/guides/', '');
      const guide = getGuideBySlug(slug);
      if (guide) {
        return guide.metaTitle;
      }
      return 'Property Guide | Real House Erbil Kurdistan';
    }
    if (path.startsWith('/market-report/')) {
      const slug = path.replace('/market-report/', '');
      const report = getMarketReportBySlug(slug);
      if (report) {
        return report.metaTitle;
      }
      return 'Market Report | Real House Erbil Kurdistan';
    }
    if (path.startsWith('/developers/')) {
      const slug = path.replace('/developers/', '');
      const developer = getDeveloperBySlug(slug);
      if (developer) {
        return developer.metaTitle;
      }
      return 'Developer Profile | Real House Erbil Kurdistan';
    }
    // Return 404 title for unknown routes
    return titles[path] || 'Page Not Found | Real House Erbil Kurdistan';
  }

  private getPageDescription(path: string): string {
    // SEO-optimized descriptions (150-160 chars with CTA for best CTR)
    // Include: Location, Power words, Numbers, CTA
    const descriptions: Record<string, string> = {
      '/': 'Discover luxury villas, apartments & penthouses in Erbil, Kurdistan. #1 trusted agency with 23+ years experience. Browse 100+ exclusive properties. Book free viewing today!',
      '/properties': 'Browse 100+ properties for sale in Erbil: luxury villas, modern apartments, penthouses & land. Filter by price & location. Schedule your free viewing today!',
      '/about': 'Real House: Kurdistan\'s trusted real estate agency for 23 years. 500+ happy families, $50M+ in sales. Meet our expert licensed agents. Contact us today!',
      '/contact': 'Schedule your free property viewing with Real House Erbil. Call +964 750 792 2138 or WhatsApp us. Expert agents respond within 1 hour. Visit our office today!',
      '/privacy': 'Real House privacy policy. Learn how we protect your personal data and ensure secure property transactions in Erbil, Kurdistan. GDPR compliant.',
      '/terms': 'Real House terms of service for property listings, viewings, and transactions in Erbil, Kurdistan. Updated 2025. Read before using our services.',
      '/faq': 'Get answers to common Erbil property questions: foreign ownership, payment plans, legal requirements. Expert advice from Real House agents. Ask us anything!',
      '/projects': 'Explore new development projects in Erbil 2025. Off-plan properties with flexible payment plans from $85K. Book your exclusive site tour today!',
      '/projects/compare': 'Compare Erbil development projects side-by-side: pricing, amenities, completion dates & availability. Make informed investment decisions. Free tool!',
      '/favorites': 'Your saved properties at Real House Erbil. Compare villas, apartments & land side-by-side. Share your shortlist or schedule viewings with one click.',
      '/compare': 'Compare Erbil properties side-by-side: prices, sizes, features & locations. Make confident decisions with Real House comparison tool. Try it free!',
      '/blog': 'Expert Erbil real estate insights: 2025 market trends, buying guides, investment tips & neighborhood reviews. Stay informed with Real House professionals.',
      '/services': 'Premium real estate services in Erbil: buying, selling, renting & property management. Expert agents, proven results. Get your free consultation today!',
      '/services-directory': 'Find trusted home service providers in Erbil: interior design, cleaning, electrical, plumbing, landscaping, moving, security & more. Get free quotes today!',
      '/buy': 'Find your dream property in Erbil. Luxury villas, modern apartments & penthouses for sale in Kurdistan. Expert buying guidance. Schedule free viewing now!',
      '/rent': 'Rent premium apartments & villas in Erbil. Furnished & unfurnished options in top Kurdistan locations. Trusted by 500+ tenants. Inquire today!',
      '/invest': 'High ROI investment properties in Erbil. Off-plan developments & rental income opportunities in Kurdistan. Expert advice for smart investors. Learn more!',
      '/luxury': 'Exclusive luxury properties in Erbil. Premium villas, penthouses & apartments in Kurdistan\'s finest locations. Experience elite living. Book private viewing!',
      '/sitemap': 'Navigate Real House Erbil website. Find all properties, projects, services & blog articles. Your complete guide to Kurdistan real estate.',
      '/neighborhoods': 'Explore Erbil\'s premier neighborhoods. Comprehensive guides to Empire World, Dream City, Ankawa, Gulan & more. Find your perfect area with Real House experts.',
      '/developers': 'Discover leading real estate developers in Erbil, Kurdistan. From Empire World (DAMAC) to local pioneers. Compare developers, projects, and find your ideal property partner.',
      '/list-property': 'List your property for free on Real House Erbil. Sell or rent apartments, villas, land in Kurdistan. Reach thousands of buyers. Submit your listing today!'
    };
    if (path.startsWith('/neighborhoods/')) {
      const slug = path.replace('/neighborhoods/', '');
      const neighborhood = getNeighborhoodBySlug(slug);
      if (neighborhood) {
        return neighborhood.metaDescription;
      }
      return 'Comprehensive neighborhood guide for Erbil, Kurdistan. Property prices, amenities, lifestyle & featured listings. Expert local knowledge from Real House.';
    }
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      const service = getServiceBySlug(slug);
      if (service) {
        return service.metaDescription;
      }
      return 'Premium real estate services in Erbil from Real House. Expert guidance for buyers, sellers & investors in Kurdistan. Get your free consultation today!';
    }
    if (path.startsWith('/services-directory/')) {
      const slug = path.replace('/services-directory/', '');
      const category = getCategoryBySlug(slug);
      if (category) {
        return category.metaDescription;
      }
      return 'Find trusted home service providers in Erbil. Quality professionals for your property needs in Kurdistan. Get free quotes today!';
    }
    if (path.startsWith('/properties/')) {
      const idOrSlug = path.replace('/properties/', '');
      // Check for district pages
      const district = getDistrictBySlug(idOrSlug);
      if (district) {
        const count = getPropertyCountByDistrict(district.name);
        return `Discover ${count}+ properties in ${district.name}, Erbil. Luxury villas, apartments & penthouses. Trusted by 500+ buyers. Schedule your free viewing today!`;
      }
      // Support both ID and slug lookup
      const property = getPropertyBySlug(idOrSlug) || getPropertyById(idOrSlug);
      if (property) {
        // Dynamic description with price, location, bedrooms, size (150-160 chars with CTA)
        const price = property.price > 0 ? `$${property.price.toLocaleString()}` : 'Price on request';
        const beds = property.specs.beds > 0 ? `${property.specs.beds} bed` : '';
        const baths = `${property.specs.baths} bath`;
        const size = `${property.specs.sqm}m²`;
        const location = `${property.location.district}, Erbil`;
        const desc = `${property.type} for ${property.status.toLowerCase()} in ${location}. ${price}. ${beds ? beds + ', ' : ''}${baths}, ${size}. Virtual tour available. Book viewing today!`;
        return desc.length <= 160 ? desc : desc.substring(0, 157) + '...';
      }
      return 'Exclusive property in Erbil with photos, specs & virtual tour. Schedule your free viewing with Real House. Trusted agents since 2002!';
    }
    if (path.startsWith('/projects/')) {
      const projectId = path.replace('/projects/', '');
      const project = getProjectById(projectId);
      if (project) {
        // Dynamic description with project details and CTA (150-160 chars)
        const status = project.status === 'Ready' ? 'Ready to move' : project.status;
        const priceMin = project.priceRange.min >= 1000000
          ? `$${(project.priceRange.min / 1000000).toFixed(1)}M`
          : `$${(project.priceRange.min / 1000).toFixed(0)}K`;
        const desc = `${project.name} in ${project.location.district}, Erbil. ${status}. ${project.availableUnits} units from ${priceMin}. Flexible payment plans. Book your site tour today!`;
        return desc.length <= 160 ? desc : desc.substring(0, 157) + '...';
      }
      return 'Off-plan development in Erbil with flexible payment plans. Premium amenities & prime location. Book your exclusive site tour with Real House today!';
    }
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const post = getBlogPostBySlug(slug);
      if (post) {
        // Use excerpt as description with CTA if space allows (150-160 chars)
        const excerpt = post.excerpt.length <= 140
          ? `${post.excerpt} Read more on Real House Blog!`
          : post.excerpt;
        return excerpt.length <= 160 ? excerpt : excerpt.substring(0, 157) + '...';
      }
      return 'Expert Erbil real estate insights from Real House professionals. Market trends, buying guides & investment tips. Stay informed!';
    }
    if (path.startsWith('/guides/')) {
      const slug = path.replace('/guides/', '');
      const guide = getGuideBySlug(slug);
      if (guide) {
        return guide.metaDescription;
      }
      return 'Comprehensive property guides for Erbil, Kurdistan. Expert advice for buyers, investors & renters from Real House.';
    }
    if (path.startsWith('/market-report/')) {
      const slug = path.replace('/market-report/', '');
      const report = getMarketReportBySlug(slug);
      if (report) {
        return report.metaDescription;
      }
      return 'Erbil real estate market analysis and reports from Real House. Data-driven insights for property investors.';
    }
    if (path.startsWith('/developers/')) {
      const slug = path.replace('/developers/', '');
      const developer = getDeveloperBySlug(slug);
      if (developer) {
        return developer.metaDescription;
      }
      return 'Discover real estate developers in Erbil, Kurdistan. Company profiles, project portfolios, and contact information. Partner with Real House for expert guidance.';
    }
    return descriptions[path] || descriptions['/'];
  }

  private updateMetaTags(path: string): void {
    // Handle property detail pages with comprehensive SEO for maximum rich results
    // Includes: RealEstateListing, Residence, Product, Offer, ImageGallery, VideoObject, Place schemas
    if (path.startsWith('/properties/')) {
      const idOrSlug = path.replace('/properties/', '');
      // Support both ID and slug lookup
      const property = getPropertyBySlug(idOrSlug) || getPropertyById(idOrSlug);

      if (property) {
        // Use comprehensive SEO with all schema types
        setupComprehensivePropertyPageSEO(property);
        // Apply social media meta tags (OG, Twitter, Pinterest, LinkedIn)
        applyPropertySocialMeta(property);
        // Add additional meta tags
        this.updatePropertyMeta(property);
        // Setup property detail specific SEO
        setupPropertyDetailSEO(idOrSlug);
        return;
      }
    }

    // Handle project detail pages with dynamic SEO
    if (path.startsWith('/projects/')) {
      const projectId = path.replace('/projects/', '');
      const project = getProjectById(projectId);

      if (project) {
        // Apply social media meta tags (OG, Twitter, Pinterest, LinkedIn)
        applyProjectSocialMeta(project);
        this.updateProjectMeta(project);
        return;
      }
    }

    // Handle blog post pages with dynamic SEO
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const post = getBlogPostBySlug(slug);

      if (post) {
        setupBlogPostSEO(post);
        // Apply social media meta tags (OG, Twitter, Pinterest, LinkedIn)
        applyBlogSocialMeta(post);
        this.updateBlogMeta(post);
        return;
      }
    }

    // Handle service detail pages with dynamic SEO
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      const service = getServiceBySlug(slug);

      if (service) {
        setupServiceDetailPageSEO(service);
        return;
      }
    }

    // Setup page-specific SEO schemas and social meta
    // Use comprehensive schemas for maximum Google rich results
    if (path === '/') {
      // Comprehensive home page SEO with all schema types:
      // WebSite, RealEstateAgent, LocalBusiness, FAQPage, HowTo, Service, AggregateRating, ItemList
      setupComprehensiveHomePageSEO();
      applyPageSocialMeta('home');
    } else if (path === '/properties') {
      setupPropertiesPageSEO();
      applyPageSocialMeta('properties');
    } else if (path === '/locations') {
      setupLocationsPageSEO();
    } else if (path.startsWith('/areas/')) {
      // Handle area pages with comprehensive local SEO
      const slug = path.replace('/areas/', '');
      const district = getDistrictBySlug(slug);
      if (district) {
        setupAreaPageSEO(district);
        return;
      }
    } else if (path.startsWith('/properties/')) {
      // Handle district pages with SEO
      const idOrSlug = path.replace('/properties/', '');
      const district = getDistrictBySlug(idOrSlug);
      if (district) {
        const count = getPropertyCountByDistrict(district.name);
        setupDistrictPageSEO(idOrSlug, count);
        return;
      }
    } else if (path === '/contact') {
      setupContactPageSEO();
      applyPageSocialMeta('contact');
    } else if (path === '/about') {
      setupAboutPageSEO();
      applyPageSocialMeta('about');
    } else if (path === '/faq') {
      setupFAQPageSEO();
    } else if (path === '/blog') {
      setupBlogPageSEO();
      applyPageSocialMeta('blog');
    } else if (path === '/services') {
      setupServicesPageSEO();
    } else if (path === '/services-directory') {
      setupServicesDirectoryPageSEO();
    } else if (path.startsWith('/services-directory/')) {
      const slug = path.replace('/services-directory/', '');
      const category = getCategoryBySlug(slug);
      if (category) {
        setupServiceCategoryPageSEO(category);
        return;
      }
    } else if (path === '/projects') {
      applyPageSocialMeta('projects');
    } else if (path === '/favorites') {
      applyPageSocialMeta('favorites');
    } else if (path === '/gallery') {
      // Gallery page with ImageGallery and CollectionPage schemas
      setupGalleryPageSEO();
    } else if (path === '/neighborhoods') {
      setupNeighborhoodsPageSEO();
    } else if (path.startsWith('/neighborhoods/')) {
      const slug = path.replace('/neighborhoods/', '');
      const neighborhood = getNeighborhoodBySlug(slug);
      if (neighborhood) {
        setupNeighborhoodDetailPageSEO(neighborhood);
        return;
      }
    } else if (path.startsWith('/guides/')) {
      // Guide pages with Article and FAQ schemas
      const slug = path.replace('/guides/', '');
      const guide = getGuideBySlug(slug);
      if (guide) {
        setupGuidePageSEO(guide);
        return;
      }
    } else if (path.startsWith('/market-report/')) {
      // Market report pages with Report schema
      const slug = path.replace('/market-report/', '');
      const report = getMarketReportBySlug(slug);
      if (report) {
        setupMarketReportPageSEO(report);
        return;
      }
    } else if (path === '/developers') {
      setupDevelopersPageSEO();
    } else if (path.startsWith('/developers/')) {
      const slug = path.replace('/developers/', '');
      const developer = getDeveloperBySlug(slug);
      if (developer) {
        setupDeveloperDetailPageSEO(developer);
        return;
      }
    } else if (path === '/list-property') {
      setupListPropertyPageSEO();
    } else {
      // Clear dynamic schemas for other pages
      clearDynamicSchemas();
    }

    // Standard meta tag updates
    const title = this.getPageTitle(path);
    const description = this.getPageDescription(path);
    const url = `https://realhouseiq.com${path === '/' ? '' : path}`;

    // Update document title
    document.title = title;

    // Update meta description
    this.updateOrCreateMeta('name', 'description', description);

    // Update canonical URL (prevents duplicate content)
    this.updateOrCreateLink('canonical', url);

    // Update meta robots directive
    const robotsContent = this.getRobotsDirective(path);
    this.updateOrCreateMeta('name', 'robots', robotsContent);

    // Update keywords meta tag
    const keywords = this.getPageKeywords(path);
    this.updateOrCreateMeta('name', 'keywords', keywords);

    // Handle pagination meta tags for listing pages
    this.updatePaginationMeta(path);

    // Update Open Graph tags
    this.updateOrCreateMeta('property', 'og:title', title);
    this.updateOrCreateMeta('property', 'og:description', description);
    this.updateOrCreateMeta('property', 'og:url', url);
    this.updateOrCreateMeta('property', 'og:image', 'https://realhouseiq.com/og-image.jpg');

    // Update Twitter Card tags
    this.updateOrCreateMeta('name', 'twitter:title', title);
    this.updateOrCreateMeta('name', 'twitter:description', description);
    this.updateOrCreateMeta('name', 'twitter:image', 'https://realhouseiq.com/twitter-card.jpg');

    // Update hreflang tags for multilingual support
    setupHreflangTags(path);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO Helper Methods
  // ═══════════════════════════════════════════════════════════════════════════

  private updateOrCreateMeta(attrType: 'name' | 'property', attrValue: string, content: string): void {
    const selector = `meta[${attrType}="${attrValue}"]`;
    let tag = document.querySelector(selector);
    if (tag) {
      tag.setAttribute('content', content);
    } else {
      tag = document.createElement('meta');
      tag.setAttribute(attrType, attrValue);
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    }
  }

  private updateOrCreateLink(rel: string, href: string): void {
    const selector = `link[rel="${rel}"]`;
    let link = document.querySelector(selector);
    if (link) {
      link.setAttribute('href', href);
    } else {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      link.setAttribute('href', href);
      document.head.appendChild(link);
    }
  }

  private getRobotsDirective(path: string): string {
    // Noindex user-specific/utility pages
    const noindexPaths = ['/favorites', '/compare'];
    if (noindexPaths.includes(path)) {
      return 'noindex, follow';
    }
    // Full indexing with rich snippets for all other pages
    return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  }

  private getPageKeywords(path: string): string {
    const keywordsMap: Record<string, string> = {
      '/': 'luxury real estate Erbil, properties for sale Kurdistan, apartments Erbil Iraq, villas Erbil, real estate investment Iraq, commercial property Erbil, Dream City, Gulan properties, Kurdistan homes',
      '/properties': 'properties for sale Erbil, villas Kurdistan, apartments Erbil, penthouse Iraq, land for sale Erbil, commercial property Kurdistan, off-plan properties, real estate listings',
      '/projects': 'new development projects Erbil 2025, off-plan properties Kurdistan, Empire World, Dream City, Pavilion Erbil, Italian Village, under construction Erbil, investment opportunities',
      '/blog': 'Erbil real estate blog, property market Kurdistan, buying guide Iraq, investment tips Erbil, neighborhood reviews, market trends 2025, property news',
      '/contact': 'contact Real House Erbil, property viewing booking, real estate agent Kurdistan, property consultation Iraq, WhatsApp real estate',
      '/about': 'Real House company, real estate agency Erbil, trusted property agent Kurdistan, about Real House team, 23 years experience',
      '/faq': 'property FAQ Erbil, buying property Kurdistan, foreign buyer Iraq, payment options real estate, legal requirements, property questions'
    };
    return keywordsMap[path] || keywordsMap['/'];
  }

  private updatePaginationMeta(path: string): void {
    // Remove existing pagination links
    const existingPrev = document.querySelector('link[rel="prev"]');
    const existingNext = document.querySelector('link[rel="next"]');
    if (existingPrev) existingPrev.remove();
    if (existingNext) existingNext.remove();

    // Add pagination for listing pages (properties, projects, blog)
    const listingPages = ['/properties', '/projects', '/blog'];
    if (listingPages.includes(path)) {
      const urlParams = new URLSearchParams(window.location.search);
      const currentPage = parseInt(urlParams.get('page') || '1', 10);
      const baseUrl = `https://realhouseiq.com${path}`;

      // Add prev link if not on first page
      if (currentPage > 1) {
        const prevLink = document.createElement('link');
        prevLink.setAttribute('rel', 'prev');
        prevLink.setAttribute('href', currentPage === 2 ? baseUrl : `${baseUrl}?page=${currentPage - 1}`);
        document.head.appendChild(prevLink);
      }

      // Add next link (in production, check against total pages)
      const nextLink = document.createElement('link');
      nextLink.setAttribute('rel', 'next');
      nextLink.setAttribute('href', `${baseUrl}?page=${currentPage + 1}`);
      document.head.appendChild(nextLink);
    }
  }

  private updatePropertyMeta(property: import('./data/properties').Property): void {
    // Property-specific keywords
    const keywords = [
      `${property.type} for ${property.status.toLowerCase()} Erbil`,
      `${property.location.district} property`,
      property.specs.beds > 0 ? `${property.specs.beds} bedroom ${property.type.toLowerCase()}` : '',
      `${property.specs.sqm}sqm property Erbil`,
      'Real House Erbil',
      'Kurdistan real estate',
      property.projectName || ''
    ].filter(k => k).join(', ');
    this.updateOrCreateMeta('name', 'keywords', keywords);

    // Robots directive
    this.updateOrCreateMeta('name', 'robots', 'index, follow, max-image-preview:large');

    // Canonical URL using slug for SEO-friendly URLs
    const slug = generatePropertySlug(property);
    const canonicalUrl = `https://realhouseiq.com/properties/${slug}`;
    this.updateOrCreateLink('canonical', canonicalUrl);
  }

  private updateProjectMeta(project: import('./data/projects').Project): void {
    // Dynamic title for project (max 60 chars)
    const status = project.status === 'Ready' ? 'Ready' : project.status === 'Under Construction' ? 'Under Construction' : 'Coming Soon';
    const title = `${project.name} | ${status} | Real House Erbil`;
    document.title = title.length <= 60 ? title : `${project.name} | ${status} | Real House`;

    // Dynamic description with status, units, completion (max 160 chars)
    const priceMin = project.priceRange.min >= 1000000
      ? `$${(project.priceRange.min / 1000000).toFixed(1)}M`
      : `$${(project.priceRange.min / 1000).toFixed(0)}K`;
    const desc = `${project.name} in ${project.location.district}, Erbil. ${status}. ${project.availableUnits}/${project.totalUnits} units from ${priceMin}. Completion: ${project.completionDate}. Contact Real House.`;
    this.updateOrCreateMeta('name', 'description', desc.length <= 160 ? desc : desc.substring(0, 157) + '...');

    // Project-specific keywords
    const keywords = [
      `${project.name} Erbil`,
      `${project.location.district} development`,
      'off-plan properties Erbil',
      `new projects Kurdistan ${project.completionDate}`,
      project.status.toLowerCase(),
      'Real House',
      ...project.amenities.slice(0, 3)
    ].join(', ');
    this.updateOrCreateMeta('name', 'keywords', keywords);

    // Canonical URL
    const canonicalUrl = `https://realhouseiq.com/projects/${project.id}`;
    this.updateOrCreateLink('canonical', canonicalUrl);

    // Robots directive
    this.updateOrCreateMeta('name', 'robots', 'index, follow, max-image-preview:large');

    // Open Graph
    this.updateOrCreateMeta('property', 'og:title', title);
    this.updateOrCreateMeta('property', 'og:description', desc.substring(0, 160));
    this.updateOrCreateMeta('property', 'og:url', canonicalUrl);
    this.updateOrCreateMeta('property', 'og:image', project.images[0] || 'https://realhouseiq.com/og-image.jpg');

    // Twitter
    this.updateOrCreateMeta('name', 'twitter:title', title);
    this.updateOrCreateMeta('name', 'twitter:description', desc.substring(0, 160));
    this.updateOrCreateMeta('name', 'twitter:image', project.images[0] || 'https://realhouseiq.com/twitter-card.jpg');
  }

  private updateBlogMeta(post: import('./data/blog').BlogPost): void {
    // Blog-specific keywords from tags
    const keywords = [...post.tags, 'Erbil real estate', 'Kurdistan property', 'Real House blog'].join(', ');
    this.updateOrCreateMeta('name', 'keywords', keywords);

    // Robots directive
    this.updateOrCreateMeta('name', 'robots', 'index, follow, max-image-preview:large');

    // Canonical URL
    const canonicalUrl = `https://realhouseiq.com/blog/${post.slug}`;
    this.updateOrCreateLink('canonical', canonicalUrl);

    // Article-specific meta tags
    this.updateOrCreateMeta('property', 'article:published_time', post.date);
    this.updateOrCreateMeta('property', 'article:author', post.author.name);
    this.updateOrCreateMeta('property', 'article:section', post.category);
  }

  private async initPageAnimations(path: string): Promise<void> {
    // Wait a frame for DOM to be ready
    await new Promise(resolve => requestAnimationFrame(resolve));

    // Initialize comparison bar for pages with property cards
    if (path === '/' || path === '/properties' || path === '/compare' || path === '/favorites' || path.startsWith('/areas/')) {
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
      // Initialize project comparison bar
      initProjectComparisonBar();
      updateProjectComparisonBar();
    } else if (path === '/projects/compare') {
      scrollReveal('.project-compare-page__header', { y: 40 });
      scrollReveal('.project-compare-card', { y: 60, stagger: 0.1 });
      scrollReveal('.project-compare-section', { y: 40, stagger: 0.1 });
      scrollReveal('.project-compare-page__cta', { y: 40 });
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
    } else if (path === '/blog') {
      scrollReveal('.blog-page__header', { y: 40 });
      scrollReveal('.blog-page__featured', { y: 40 });
      scrollReveal('.blog-card', { y: 60, stagger: 0.1, trigger: '.blog-page__grid' });
      scrollReveal('.blog-page__cta', { y: 40 });
    } else if (path.startsWith('/blog/')) {
      scrollReveal('.blog-post-page__breadcrumb', { y: 20 });
      scrollReveal('.blog-post-page__article', { y: 40 });
      scrollReveal('.blog-post-page__sidebar', { y: 40 });
      scrollReveal('.blog-post-page__back', { y: 30 });
    } else if (path === '/services') {
      scrollReveal('.services-page__hero', { y: 40 });
      scrollReveal('.service-card', { y: 60, stagger: 0.1, trigger: '.services-page__grid' });
      scrollReveal('.services-page__stat', { y: 40, stagger: 0.1 });
      scrollReveal('.testimonial-card', { y: 40, stagger: 0.1 });
      scrollReveal('.services-page__cta', { y: 40 });
    } else if (path.startsWith('/services/')) {
      scrollReveal('.service-detail-page__hero-content', { y: 40 });
      scrollReveal('.service-detail-page__description', { y: 40 });
      scrollReveal('.service-detail-page__feature', { y: 40, stagger: 0.1 });
      scrollReveal('.service-detail-page__step', { y: 30, stagger: 0.1 });
      scrollReveal('.service-detail-page__benefit', { y: 20, stagger: 0.05 });
      scrollReveal('.service-detail-page__faq-item', { y: 30, stagger: 0.08 });
      scrollReveal('.service-detail-page__sidebar', { y: 40 });
      scrollReveal('.service-detail-page__testimonials', { y: 40 });
      scrollReveal('.service-detail-page__bottom-cta', { y: 40 });
    } else if (path.startsWith('/areas/')) {
      // Area page animations
      scrollReveal('.area-page__hero-content', { y: 40 });
      scrollReveal('.neighborhood-guide__header', { y: 40 });
      scrollReveal('.neighborhood-guide__overview', { y: 40 });
      scrollReveal('.neighborhood-guide__card', { y: 40, stagger: 0.1 });
      scrollReveal('.neighborhood-guide__highlight', { y: 20, stagger: 0.05 });
      scrollReveal('.area-page__map-section', { y: 40 });
      scrollReveal('.property-card', { y: 60, stagger: 0.1, trigger: '.area-page__properties-grid' });
      scrollReveal('.area-page__sidebar', { y: 40 });
      scrollReveal('.area-page__bottom-cta', { y: 40 });
    } else if (path === '/neighborhoods') {
      // Neighborhoods listing page animations
      scrollReveal('.neighborhoods-page__hero-content', { y: 40 });
      scrollReveal('.neighborhoods-page__intro', { y: 40 });
      scrollReveal('.neighborhood-card', { y: 60, stagger: 0.1, trigger: '.neighborhoods-page__grid' });
      scrollReveal('.neighborhoods-page__cta', { y: 40 });
    } else if (path.startsWith('/neighborhoods/')) {
      // Neighborhood detail page animations
      scrollReveal('.neighborhood-detail__hero-content', { y: 40 });
      scrollReveal('.neighborhood-detail__overview', { y: 40 });
      scrollReveal('.neighborhood-detail__highlights', { y: 40 });
      scrollReveal('.neighborhood-detail__price-card', { y: 40, stagger: 0.1 });
      scrollReveal('.neighborhood-detail__amenity-card', { y: 40, stagger: 0.1 });
      scrollReveal('.neighborhood-detail__transport-card', { y: 40, stagger: 0.1 });
      scrollReveal('.neighborhood-detail__lifestyle', { y: 40 });
      scrollReveal('.neighborhood-detail__map', { y: 40 });
      scrollReveal('.property-card--compact', { y: 60, stagger: 0.1 });
      scrollReveal('.project-card--compact', { y: 60, stagger: 0.1 });
      scrollReveal('.neighborhood-detail__sidebar', { y: 40 });
      scrollReveal('.neighborhood-detail__cta', { y: 40 });
      scrollReveal('.neighborhood-detail__other', { y: 40 });
    } else if (path.startsWith('/guides/')) {
      // Guide page animations
      scrollReveal('.guide-page__hero-content', { y: 40 });
      scrollReveal('.guide-page__intro', { y: 40 });
      scrollReveal('.guide-page__section', { y: 40, stagger: 0.1 });
      scrollReveal('.guide-page__faq', { y: 40 });
      scrollReveal('.guide-page__related', { y: 40 });
      scrollReveal('.guide-page__sidebar', { y: 40 });
      scrollReveal('.guide-page__bottom-cta', { y: 40 });
    } else if (path.startsWith('/market-report/')) {
      // Market report page animations
      scrollReveal('.market-report__hero-content', { y: 40 });
      scrollReveal('.market-report__intro', { y: 40 });
      scrollReveal('.market-report__section', { y: 40, stagger: 0.1 });
      scrollReveal('.market-report__key-findings', { y: 40 });
      scrollReveal('.market-report__outlook', { y: 40 });
      scrollReveal('.market-report__sidebar', { y: 40 });
      scrollReveal('.market-report__bottom-cta', { y: 40 });
    } else if (path === '/developers') {
      // Developers listing page animations
      scrollReveal('.developers-page__header', { y: 40 });
      scrollReveal('.developers-page__stats', { y: 40 });
      scrollReveal('.developer-card', { y: 60, stagger: 0.1, trigger: '.developers-page__grid' });
      scrollReveal('.developers-page__cta', { y: 40 });
    } else if (path.startsWith('/developers/')) {
      // Developer detail page animations
      scrollReveal('.developer-detail__hero-content', { y: 40 });
      scrollReveal('.developer-detail__section', { y: 40, stagger: 0.1 });
      scrollReveal('.developer-detail__achievement', { y: 30, stagger: 0.1 });
      scrollReveal('.developer-detail__project-card', { y: 40, stagger: 0.1 });
      scrollReveal('.developer-detail__sidebar', { y: 40 });
      scrollReveal('.developer-detail__back', { y: 30 });
    } else if (path === '/services-directory') {
      // Services directory page animations
      scrollReveal('.services-dir__hero-content', { y: 40 });
      scrollReveal('.services-dir__category-card', { y: 60, stagger: 0.1, trigger: '.services-dir__categories-grid' });
      scrollReveal('.services-dir__featured-providers', { y: 40 });
      scrollReveal('.services-dir__provider-card', { y: 40, stagger: 0.1 });
      scrollReveal('.services-dir__cta', { y: 40 });
    } else if (path.startsWith('/services-directory/')) {
      // Service category page animations
      scrollReveal('.services-dir__hero-content', { y: 40 });
      scrollReveal('.services-dir__why-need', { y: 40 });
      scrollReveal('.services-dir__benefits-list', { y: 40 });
      scrollReveal('.services-dir__provider-card', { y: 40, stagger: 0.1 });
      scrollReveal('.services-dir__faq-item', { y: 30, stagger: 0.08 });
      scrollReveal('.services-dir__quote-form', { y: 40 });
      scrollReveal('.services-dir__sidebar', { y: 40 });
      scrollReveal('.services-dir__related-services', { y: 40 });
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
