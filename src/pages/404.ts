// ═══════════════════════════════════════════════════════════════════════════
// Custom 404 Page - SEO Optimized Error Page
// Technical SEO: Proper error handling, internal linking, user recovery
// ═══════════════════════════════════════════════════════════════════════════

import { injectSchema } from '../seo/schema';

// ─── Helper Function to Create Elements ─────────────────────────────────────
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

// ─── Create SVG Element Helper ──────────────────────────────────────────────
function createSvgIcon(paths: string[], viewBox = '0 0 24 24', fill = 'none', stroke = 'currentColor'): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', fill);
  svg.setAttribute('stroke', stroke);
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('aria-hidden', 'true');

  paths.forEach(d => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  });

  return svg;
}

// ─── 404 Page SEO Schema ────────────────────────────────────────────────────
export function setup404PageSEO(): void {
  // Set proper meta tags for 404
  document.title = 'Page Not Found | Real House Erbil';

  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content',
      'The page you are looking for could not be found. Browse our luxury properties in Erbil, Kurdistan or contact Real House for assistance.');
  }

  // Robots: noindex 404 pages
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', 'noindex, follow');

  // Canonical URL (point to homepage for 404)
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', 'https://realhouseiq.com');
  }

  // Inject WebPage schema for 404
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://realhouseiq.com/404#webpage',
    name: 'Page Not Found - Real House',
    description: 'The requested page could not be found. Browse luxury real estate in Erbil or contact us.',
    url: 'https://realhouseiq.com/404',
    isPartOf: {
      '@id': 'https://realhouseiq.com/#website'
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://realhouseiq.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Page Not Found'
        }
      ]
    }
  };

  injectSchema(schema, 'error-page-schema');
}

// ─── Error Logging ──────────────────────────────────────────────────────────
interface ErrorLogEntry {
  timestamp: string;
  url: string;
  referrer: string;
  userAgent: string;
  type: '404' | '500' | 'js-error';
  message?: string;
}

export function logError(type: '404' | '500' | 'js-error', message?: string): void {
  const entry: ErrorLogEntry = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer || 'direct',
    userAgent: navigator.userAgent,
    type,
    message
  };

  // Store in localStorage for debugging
  const errorLog = JSON.parse(localStorage.getItem('rh-error-log') || '[]');
  errorLog.push(entry);

  // Keep only last 50 errors
  if (errorLog.length > 50) {
    errorLog.shift();
  }

  localStorage.setItem('rh-error-log', JSON.stringify(errorLog));

  // Log to console in development
  console.warn(`[${type.toUpperCase()}]`, entry);
}

// ─── Popular Links for Recovery ─────────────────────────────────────────────
const popularLinks = [
  { href: '/properties', label: 'All Properties', icon: 'home' },
  { href: '/properties?type=villa', label: 'Luxury Villas', icon: 'villa' },
  { href: '/properties?type=apartment', label: 'Apartments', icon: 'apartment' },
  { href: '/projects', label: 'New Projects', icon: 'project' },
  { href: '/blog', label: 'Real Estate Blog', icon: 'blog' },
  { href: '/contact', label: 'Contact Us', icon: 'contact' }
];

// ─── Search Suggestions ─────────────────────────────────────────────────────
const searchSuggestions = [
  'villa for sale',
  'apartment erbil',
  'dream city',
  'penthouse',
  'commercial property'
];

// ─── Icon Path Data ─────────────────────────────────────────────────────────
const iconPaths: Record<string, string[]> = {
  home: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
  villa: ['M21 19V10a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z'],
  apartment: ['M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z'],
  project: ['M12 2L2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
  blog: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'],
  contact: ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'],
  search: ['M21 21l-4.35-4.35', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z'],
  mail: ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6']
};

// ─── Enhanced 404 Page Renderer ─────────────────────────────────────────────
export function renderEnhanced404Page(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Log the 404 error
  logError('404');

  // Setup SEO for 404 page
  setup404PageSEO();

  // Main container
  const page = createElement('article', 'error-page error-page--404');
  page.setAttribute('role', 'alert');
  page.setAttribute('aria-live', 'polite');

  const container = createElement('div', 'container');

  // ─── Breadcrumb ─────────────────────────────────────────────────────────
  const breadcrumb = createElement('nav', 'error-page__breadcrumb');
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');

  const breadcrumbList = createElement('ol', 'error-page__breadcrumb-list');

  const breadcrumbHome = createElement('li');
  const breadcrumbHomeLink = createElement('a', '', 'Home');
  breadcrumbHomeLink.href = '/';
  breadcrumbHomeLink.setAttribute('data-route', '');
  breadcrumbHome.appendChild(breadcrumbHomeLink);
  breadcrumbList.appendChild(breadcrumbHome);

  const breadcrumbCurrent = createElement('li', '', 'Page Not Found');
  breadcrumbCurrent.setAttribute('aria-current', 'page');
  breadcrumbList.appendChild(breadcrumbCurrent);

  breadcrumb.appendChild(breadcrumbList);
  container.appendChild(breadcrumb);

  // ─── Hero Section ───────────────────────────────────────────────────────
  const hero = createElement('section', 'error-page__hero');

  // Visual 404 display
  const visual = createElement('div', 'error-page__visual');

  const errorCode = createElement('div', 'error-page__code');
  errorCode.setAttribute('aria-hidden', 'true');

  // Animated 404 numbers
  ['4', '0', '4'].forEach((num, index) => {
    const digit = createElement('span', 'error-page__digit', num);
    digit.style.animationDelay = `${index * 0.1}s`;
    errorCode.appendChild(digit);
  });
  visual.appendChild(errorCode);

  // Decorative line
  const line = createElement('div', 'error-page__line');
  visual.appendChild(line);

  hero.appendChild(visual);

  // Content
  const content = createElement('div', 'error-page__content');

  // Heading (single h1)
  const heading = createElement('h1', 'error-page__heading');

  const srText = createElement('span', 'visually-hidden', 'Error 404: ');
  heading.appendChild(srText);

  const title = createElement('span', 'error-page__title', 'Page Not Found');
  heading.appendChild(title);
  content.appendChild(heading);

  // Description
  const description = createElement('p', 'error-page__description');
  description.textContent = 'The page you\'re looking for doesn\'t exist or has been moved.';
  content.appendChild(description);

  // Show the URL that was not found
  const urlDisplay = createElement('span', 'error-page__url', window.location.pathname);
  content.appendChild(urlDisplay);

  // Primary Actions
  const actions = createElement('div', 'error-page__actions');

  const homeBtn = createElement('a', 'btn btn--primary btn--large');
  homeBtn.href = '/';
  homeBtn.setAttribute('data-route', '');
  homeBtn.appendChild(createSvgIcon(iconPaths.home));
  const homeBtnText = createElement('span', '', 'Return Home');
  homeBtn.appendChild(homeBtnText);
  actions.appendChild(homeBtn);

  const propertiesBtn = createElement('a', 'btn btn--outline btn--large');
  propertiesBtn.href = '/properties';
  propertiesBtn.setAttribute('data-route', '');
  propertiesBtn.appendChild(createSvgIcon(iconPaths.search));
  const propertiesBtnText = createElement('span', '', 'Browse Properties');
  propertiesBtn.appendChild(propertiesBtnText);
  actions.appendChild(propertiesBtn);

  content.appendChild(actions);
  hero.appendChild(content);
  container.appendChild(hero);

  // ─── Search Section ─────────────────────────────────────────────────────
  const searchSection = createElement('section', 'error-page__search');
  searchSection.setAttribute('aria-labelledby', 'search-title');

  const searchTitle = createElement('h2', 'error-page__section-title', 'Search Our Site');
  searchTitle.id = 'search-title';
  searchSection.appendChild(searchTitle);

  const searchForm = createElement('form', 'error-page__search-form');
  searchForm.setAttribute('role', 'search');
  searchForm.setAttribute('action', '/properties');
  searchForm.setAttribute('method', 'GET');

  const searchInput = createElement('input', 'error-page__search-input');
  searchInput.type = 'search';
  searchInput.name = 'q';
  searchInput.placeholder = 'Search properties, projects, blog...';
  searchInput.setAttribute('aria-label', 'Search the website');
  searchForm.appendChild(searchInput);

  const searchBtn = createElement('button', 'btn btn--primary');
  searchBtn.type = 'submit';
  searchBtn.appendChild(createSvgIcon(iconPaths.search));
  const searchBtnText = createElement('span', '', 'Search');
  searchBtn.appendChild(searchBtnText);
  searchForm.appendChild(searchBtn);

  searchSection.appendChild(searchForm);

  // Search suggestions
  const suggestions = createElement('div', 'error-page__suggestions');
  const suggestLabel = createElement('span', 'error-page__suggest-label', 'Popular searches: ');
  suggestions.appendChild(suggestLabel);

  searchSuggestions.forEach(term => {
    const link = createElement('a', 'error-page__suggest-link', term);
    link.href = `/properties?q=${encodeURIComponent(term)}`;
    link.setAttribute('data-route', '');
    suggestions.appendChild(link);
  });

  searchSection.appendChild(suggestions);
  container.appendChild(searchSection);

  // ─── Popular Links Section ──────────────────────────────────────────────
  const linksSection = createElement('section', 'error-page__links');
  linksSection.setAttribute('aria-labelledby', 'links-title');

  const linksTitle = createElement('h2', 'error-page__section-title', 'Popular Pages');
  linksTitle.id = 'links-title';
  linksSection.appendChild(linksTitle);

  const linksGrid = createElement('div', 'error-page__links-grid');

  popularLinks.forEach(link => {
    const linkCard = createElement('a', 'error-page__link-card');
    linkCard.href = link.href;
    linkCard.setAttribute('data-route', '');

    const iconSpan = createElement('span', 'error-page__link-icon');
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.appendChild(createSvgIcon(iconPaths[link.icon] || iconPaths.home));
    linkCard.appendChild(iconSpan);

    const labelSpan = createElement('span', 'error-page__link-label', link.label);
    linkCard.appendChild(labelSpan);

    linksGrid.appendChild(linkCard);
  });

  linksSection.appendChild(linksGrid);
  container.appendChild(linksSection);

  // ─── Contact Section ────────────────────────────────────────────────────
  const contactSection = createElement('section', 'error-page__contact');
  contactSection.setAttribute('aria-labelledby', 'contact-title');

  const contactTitle = createElement('h2', 'error-page__section-title', 'Need Help?');
  contactTitle.id = 'contact-title';
  contactSection.appendChild(contactTitle);

  const contactText = createElement('p', 'error-page__contact-text',
    'Our team is here to assist you. Contact us and we\'ll help you find what you\'re looking for.');
  contactSection.appendChild(contactText);

  const contactActions = createElement('div', 'error-page__contact-actions');

  // Phone link
  const phoneLink = createElement('a', 'error-page__contact-link');
  phoneLink.href = 'tel:+9647507922138';
  phoneLink.appendChild(createSvgIcon(iconPaths.phone));
  const phoneLinkText = createElement('span', '', 'Call Us');
  phoneLink.appendChild(phoneLinkText);
  contactActions.appendChild(phoneLink);

  // WhatsApp link
  const whatsappLink = createElement('a', 'error-page__contact-link');
  whatsappLink.href = 'https://wa.me/9647507922138';
  whatsappLink.target = '_blank';
  whatsappLink.rel = 'noopener noreferrer';

  const whatsappSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  whatsappSvg.setAttribute('viewBox', '0 0 24 24');
  whatsappSvg.setAttribute('fill', 'currentColor');
  whatsappSvg.setAttribute('aria-hidden', 'true');
  const whatsappPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  whatsappPath.setAttribute('d', 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z');
  whatsappSvg.appendChild(whatsappPath);
  whatsappLink.appendChild(whatsappSvg);
  const whatsappLinkText = createElement('span', '', 'WhatsApp');
  whatsappLink.appendChild(whatsappLinkText);
  contactActions.appendChild(whatsappLink);

  // Email/Contact form link
  const emailLink = createElement('a', 'error-page__contact-link');
  emailLink.href = '/contact';
  emailLink.setAttribute('data-route', '');
  emailLink.appendChild(createSvgIcon(iconPaths.mail));
  const emailLinkText = createElement('span', '', 'Contact Form');
  emailLink.appendChild(emailLinkText);
  contactActions.appendChild(emailLink);

  contactSection.appendChild(contactActions);
  container.appendChild(contactSection);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ─── Global Error Handler ───────────────────────────────────────────────────
export function initGlobalErrorHandler(): void {
  // Catch unhandled JavaScript errors
  window.addEventListener('error', (event) => {
    logError('js-error', `${event.message} at ${event.filename}:${event.lineno}`);
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logError('js-error', `Unhandled promise rejection: ${event.reason}`);
  });
}

// ─── Get Error Log (for debugging) ──────────────────────────────────────────
export function getErrorLog(): ErrorLogEntry[] {
  return JSON.parse(localStorage.getItem('rh-error-log') || '[]');
}

// ─── Clear Error Log ────────────────────────────────────────────────────────
export function clearErrorLog(): void {
  localStorage.removeItem('rh-error-log');
}

// Export the render function with alias for backward compatibility
export { renderEnhanced404Page as render404Page };
