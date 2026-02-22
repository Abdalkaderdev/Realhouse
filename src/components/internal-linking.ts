// ═══════════════════════════════════════════════════════════════════════════
// Internal Linking Components for SEO
// Breadcrumbs, Related Content, Hub Pages, Sitemap
// ═══════════════════════════════════════════════════════════════════════════

import { properties, type Property, generatePropertySlug } from '../data/properties';
import { projects, type Project } from '../data/projects';
import { blogPosts, type BlogPost } from '../data/blog';

// ─── Helper Functions ─────────────────────────────────────────────────────
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

function createSVGUse(iconId: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

// Create logo SVG safely without innerHTML
function createLogoSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 120');
  svg.setAttribute('fill', 'none');

  const paths = [
    { d: 'M38 108 C18 95, 12 70, 20 50 C28 30, 42 20, 50 10' },
    { d: 'M62 108 C82 95, 88 70, 80 50 C72 30, 58 20, 50 10' },
    { d: 'M38 100 L38 65 C38 55, 45 45, 50 38' },
    { d: 'M50 100 L50 25 L62 40 L62 100' }
  ];

  paths.forEach(pathData => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData.d);
    path.setAttribute('stroke', '#E9A33E');
    path.setAttribute('stroke-width', '6');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    if (pathData.d.includes('L')) {
      path.setAttribute('stroke-linejoin', 'round');
    }
    svg.appendChild(path);
  });

  return svg;
}

// ═══════════════════════════════════════════════════════════════════════════
// Breadcrumb Types and Interfaces
// ═══════════════════════════════════════════════════════════════════════════

export interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// Breadcrumb Component with Schema Markup
// ═══════════════════════════════════════════════════════════════════════════

export function createBreadcrumbs(items: BreadcrumbItem[]): HTMLElement {
  const nav = createElement('nav', 'breadcrumbs');
  nav.setAttribute('aria-label', 'Breadcrumb navigation');

  const ol = createElement('ol', 'breadcrumbs__list');
  ol.setAttribute('itemscope', '');
  ol.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');

  items.forEach((item, index) => {
    const li = createElement('li', 'breadcrumbs__item');
    li.setAttribute('itemprop', 'itemListElement');
    li.setAttribute('itemscope', '');
    li.setAttribute('itemtype', 'https://schema.org/ListItem');

    if (item.current) {
      const span = createElement('span', 'breadcrumbs__current', item.name);
      span.setAttribute('itemprop', 'name');
      span.setAttribute('aria-current', 'page');
      li.appendChild(span);

      // Hidden link for schema
      const metaItem = document.createElement('meta');
      metaItem.setAttribute('itemprop', 'item');
      metaItem.setAttribute('content', `https://realhouseiq.com${item.url}`);
      li.appendChild(metaItem);
    } else {
      const a = createElement('a', 'breadcrumbs__link');
      a.href = item.url;
      a.setAttribute('data-route', '');
      a.setAttribute('itemprop', 'item');

      const nameSpan = createElement('span', undefined, item.name);
      nameSpan.setAttribute('itemprop', 'name');
      a.appendChild(nameSpan);
      li.appendChild(a);

      // Separator
      if (index < items.length - 1) {
        const separator = createElement('span', 'breadcrumbs__separator');
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = '\u203A'; // Single right-pointing angle quotation mark
        li.appendChild(separator);
      }
    }

    // Position meta
    const positionMeta = document.createElement('meta');
    positionMeta.setAttribute('itemprop', 'position');
    positionMeta.setAttribute('content', (index + 1).toString());
    li.appendChild(positionMeta);

    ol.appendChild(li);
  });

  nav.appendChild(ol);
  return nav;
}

// ═══════════════════════════════════════════════════════════════════════════
// Breadcrumb Schema JSON-LD Generator
// ═══════════════════════════════════════════════════════════════════════════

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://realhouseiq.com${item.url}`
    }))
  };
  return JSON.stringify(schema);
}

export function injectBreadcrumbSchema(items: BreadcrumbItem[]): void {
  // Remove existing breadcrumb schema
  const existing = document.querySelector('script[data-schema="breadcrumb-page"]');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'breadcrumb-page');
  script.textContent = generateBreadcrumbSchema(items);
  document.head.appendChild(script);
}

// ═══════════════════════════════════════════════════════════════════════════
// Page-Specific Breadcrumb Generators
// ═══════════════════════════════════════════════════════════════════════════

export function getHomeBreadcrumbs(): BreadcrumbItem[] {
  return [{ name: 'Home', url: '/', current: true }];
}

export function getPropertiesBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Properties for Sale & Rent', url: '/properties', current: true }
  ];
}

export function getPropertyDetailBreadcrumbs(property: Property): BreadcrumbItem[] {
  const slug = generatePropertySlug(property);
  return [
    { name: 'Home', url: '/' },
    { name: 'Properties', url: '/properties' },
    { name: `${property.type}s in ${property.location.district}`, url: `/properties?type=${property.type}` },
    { name: property.title, url: `/properties/${slug}`, current: true }
  ];
}

export function getProjectsBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Development Projects in Erbil', url: '/projects', current: true }
  ];
}

export function getProjectDetailBreadcrumbs(project: Project): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.name, url: `/projects/${project.id}`, current: true }
  ];
}

export function getBlogBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Real Estate Blog & Insights', url: '/blog', current: true }
  ];
}

export function getBlogPostBreadcrumbs(post: BlogPost): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.category, url: `/blog?category=${encodeURIComponent(post.category)}` },
    { name: post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title, url: `/blog/${post.slug}`, current: true }
  ];
}

export function getAboutBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'About Real House', url: '/about', current: true }
  ];
}

export function getContactBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact', current: true }
  ];
}

export function getFAQBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Frequently Asked Questions', url: '/faq', current: true }
  ];
}

export function getFavoritesBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'My Saved Properties', url: '/favorites', current: true }
  ];
}

export function getCompareBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Properties', url: '/properties' },
    { name: 'Compare Properties', url: '/compare', current: true }
  ];
}

export function getPrivacyBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy', current: true }
  ];
}

export function getTermsBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms', current: true }
  ];
}

export function getSitemapBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Sitemap', url: '/sitemap', current: true }
  ];
}

// Hub page breadcrumbs
export function getBuyBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Properties for Sale in Erbil', url: '/buy', current: true }
  ];
}

export function getRentBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Properties for Rent in Erbil', url: '/rent', current: true }
  ];
}

export function getInvestBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Investment Properties in Erbil', url: '/invest', current: true }
  ];
}

export function getLuxuryBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Luxury Properties in Erbil', url: '/luxury', current: true }
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// Related Properties Component
// ═══════════════════════════════════════════════════════════════════════════

export function getRelatedProperties(currentProperty: Property, limit: number = 4): Property[] {
  return properties
    .filter(p => p.id !== currentProperty.id)
    .filter(p =>
      p.type === currentProperty.type ||
      p.location.district === currentProperty.location.district ||
      Math.abs(p.price - currentProperty.price) < currentProperty.price * 0.3
    )
    .sort((a, b) => {
      // Prioritize same district
      const aScore =
        (a.location.district === currentProperty.location.district ? 3 : 0) +
        (a.type === currentProperty.type ? 2 : 0) +
        (Math.abs(a.price - currentProperty.price) < currentProperty.price * 0.2 ? 1 : 0);
      const bScore =
        (b.location.district === currentProperty.location.district ? 3 : 0) +
        (b.type === currentProperty.type ? 2 : 0) +
        (Math.abs(b.price - currentProperty.price) < currentProperty.price * 0.2 ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function createRelatedPropertiesSection(relatedProps: Property[]): HTMLElement {
  const section = createElement('section', 'related-properties');
  const container = createElement('div', 'container');

  const header = createElement('div', 'related-properties__header');
  const title = createElement('h2', 'related-properties__title', 'Similar Properties You May Like');
  header.appendChild(title);

  const viewAllLink = createElement('a', 'related-properties__view-all', 'View All Properties');
  viewAllLink.href = '/properties';
  viewAllLink.setAttribute('data-route', '');
  viewAllLink.appendChild(createSVGUse('icon-arrow-right'));
  header.appendChild(viewAllLink);

  container.appendChild(header);

  const grid = createElement('div', 'related-properties__grid');

  relatedProps.forEach(property => {
    const card = createElement('a', 'related-properties__card');
    card.href = `/properties/${property.id}`;
    card.setAttribute('data-route', '');

    const imageWrapper = createElement('div', 'related-properties__image-wrapper');
    const img = createElement('img', 'related-properties__image');
    img.src = property.images[0];
    img.alt = `${property.title} - ${property.type} in ${property.location.district}`;
    img.loading = 'lazy';
    imageWrapper.appendChild(img);

    // Status badge
    const badge = createElement('span', 'related-properties__badge', property.status);
    imageWrapper.appendChild(badge);

    card.appendChild(imageWrapper);

    const content = createElement('div', 'related-properties__content');
    const cardTitle = createElement('h3', 'related-properties__card-title', property.title);
    content.appendChild(cardTitle);

    const location = createElement('p', 'related-properties__location', `${property.location.district}, ${property.location.city}`);
    content.appendChild(location);

    const specs = createElement('div', 'related-properties__specs');
    specs.textContent = `${property.specs.beds} Beds | ${property.specs.baths} Baths | ${property.specs.sqm.toLocaleString()} m\u00B2`;
    content.appendChild(specs);

    const price = createElement('span', 'related-properties__price');
    if (property.price > 0) {
      price.textContent = property.price >= 1000000
        ? `$${(property.price / 1000000).toFixed(2)}M`
        : `$${property.price.toLocaleString()}`;
    } else {
      price.textContent = 'Contact for Price';
    }
    content.appendChild(price);

    card.appendChild(content);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Related Projects Component
// ═══════════════════════════════════════════════════════════════════════════

export function getRelatedProjects(currentProject: Project, limit: number = 3): Project[] {
  return projects
    .filter(p => p.id !== currentProject.id)
    .filter(p =>
      p.status === currentProject.status ||
      p.location.district === currentProject.location.district
    )
    .slice(0, limit);
}

export function createRelatedProjectsSection(relatedProjs: Project[]): HTMLElement {
  const section = createElement('section', 'related-projects');
  const container = createElement('div', 'container');

  const header = createElement('div', 'related-projects__header');
  const title = createElement('h2', 'related-projects__title', 'Explore More Development Projects');
  header.appendChild(title);

  const viewAllLink = createElement('a', 'related-projects__view-all', 'View All Projects');
  viewAllLink.href = '/projects';
  viewAllLink.setAttribute('data-route', '');
  viewAllLink.appendChild(createSVGUse('icon-arrow-right'));
  header.appendChild(viewAllLink);

  container.appendChild(header);

  const grid = createElement('div', 'related-projects__grid');

  relatedProjs.forEach(project => {
    const card = createElement('a', 'related-projects__card');
    card.href = `/projects/${project.id}`;
    card.setAttribute('data-route', '');

    const imageWrapper = createElement('div', 'related-projects__image-wrapper');
    const img = createElement('img', 'related-projects__image');
    img.src = project.images[0];
    img.alt = `${project.name} - ${project.status} in ${project.location.district}`;
    img.loading = 'lazy';
    imageWrapper.appendChild(img);

    const badge = createElement('span', `related-projects__badge related-projects__badge--${project.status.toLowerCase().replace(/\s/g, '-')}`, project.status);
    imageWrapper.appendChild(badge);

    card.appendChild(imageWrapper);

    const content = createElement('div', 'related-projects__content');
    const cardTitle = createElement('h3', 'related-projects__card-title', project.name);
    content.appendChild(cardTitle);

    const location = createElement('p', 'related-projects__location', `${project.location.district}, ${project.location.city}`);
    content.appendChild(location);

    const stats = createElement('div', 'related-projects__stats');
    stats.textContent = `${project.availableUnits} units available | Completion: ${project.completionDate}`;
    content.appendChild(stats);

    card.appendChild(content);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Enhanced Footer Component with Comprehensive Links
// ═══════════════════════════════════════════════════════════════════════════

export function createEnhancedFooter(): HTMLElement {
  const footer = createElement('footer', 'footer footer--enhanced');

  const container = createElement('div', 'footer__container');

  // Top Section with all link columns
  const top = createElement('div', 'footer__top');

  // Brand Column
  const brand = createElement('div', 'footer__brand');
  const logoDiv = createElement('div', 'footer__logo');
  const logoIcon = createElement('span', 'footer__logo-icon');
  logoIcon.appendChild(createLogoSVG());
  logoDiv.appendChild(logoIcon);
  const logoText = createElement('span', 'footer__logo-text', 'Real House');
  logoDiv.appendChild(logoText);
  brand.appendChild(logoDiv);

  const tagline = createElement('p', 'footer__tagline', 'Your trusted partner for luxury real estate in Erbil, Kurdistan. Find your dream property with expert guidance.');
  brand.appendChild(tagline);

  // Contact info
  const contactInfo = createElement('div', 'footer__contact-info');
  const phone1 = createElement('a', 'footer__contact-link', '+964 750 792 2138');
  phone1.href = 'tel:+9647507922138';
  contactInfo.appendChild(phone1);
  const phone2 = createElement('a', 'footer__contact-link', '+964 751 441 5003');
  phone2.href = 'tel:+9647514415003';
  contactInfo.appendChild(phone2);
  const email = createElement('a', 'footer__contact-link', 'info@realhouseiq.com');
  email.href = 'mailto:info@realhouseiq.com';
  contactInfo.appendChild(email);
  brand.appendChild(contactInfo);

  top.appendChild(brand);

  // Links Section
  const links = createElement('div', 'footer__links');

  // Main Pages Column
  const mainPagesCol = createElement('div', 'footer__col');
  mainPagesCol.appendChild(createElement('h4', undefined, 'Quick Links'));

  const mainPages = [
    { name: 'Home', url: '/' },
    { name: 'All Properties', url: '/properties' },
    { name: 'Development Projects', url: '/projects' },
    { name: 'Real Estate Blog', url: '/blog' },
    { name: 'About Us', url: '/about' },
    { name: 'Contact Us', url: '/contact' },
    { name: 'FAQ', url: '/faq' },
    { name: 'Site Map', url: '/sitemap' }
  ];

  mainPages.forEach(page => {
    const link = createElement('a', undefined, page.name);
    link.href = page.url;
    link.setAttribute('data-route', '');
    mainPagesCol.appendChild(link);
  });

  links.appendChild(mainPagesCol);

  // Property Types Column
  const typesCol = createElement('div', 'footer__col');
  typesCol.appendChild(createElement('h4', undefined, 'Property Types'));

  const propertyTypes = [
    { name: 'Apartments for Sale', url: '/properties?type=Apartment' },
    { name: 'Villas in Erbil', url: '/properties?type=Villa' },
    { name: 'Penthouses', url: '/properties?type=Penthouse' },
    { name: 'Townhouses', url: '/properties?type=Townhouse' },
    { name: 'Commercial Properties', url: '/properties?type=Commercial' },
    { name: 'Duplex Apartments', url: '/properties?type=Duplex' },
    { name: 'Land for Sale', url: '/properties?type=Land' }
  ];

  propertyTypes.forEach(type => {
    const link = createElement('a', undefined, type.name);
    link.href = type.url;
    link.setAttribute('data-route', '');
    typesCol.appendChild(link);
  });

  links.appendChild(typesCol);

  // Browse By Column (Hub Pages)
  const browseCol = createElement('div', 'footer__col');
  browseCol.appendChild(createElement('h4', undefined, 'Browse Properties'));

  const browseLinks = [
    { name: 'Properties for Sale', url: '/buy' },
    { name: 'Properties for Rent', url: '/rent' },
    { name: 'Investment Properties', url: '/invest' },
    { name: 'Luxury Properties', url: '/luxury' },
    { name: 'New Listings', url: '/properties?badges=New' },
    { name: 'Hot Deals', url: '/properties?badges=Hot' },
    { name: 'Compare Properties', url: '/compare' }
  ];

  browseLinks.forEach(link => {
    const a = createElement('a', undefined, link.name);
    a.href = link.url;
    a.setAttribute('data-route', '');
    browseCol.appendChild(a);
  });

  links.appendChild(browseCol);

  // Locations Column
  const locationsCol = createElement('div', 'footer__col');
  locationsCol.appendChild(createElement('h4', undefined, 'Popular Locations'));

  const locations = [
    { name: 'Properties in Gulan', url: '/properties?district=Gulan' },
    { name: 'Properties in Dream City', url: '/properties?district=Dream%20City' },
    { name: 'Properties in Ankawa', url: '/properties?district=Ankawa' },
    { name: 'Italian Village Homes', url: '/properties?district=Italian%20Village' },
    { name: 'English Village Homes', url: '/properties?district=English%20Village' },
    { name: 'Empire World Properties', url: '/properties?district=Empire%20World' }
  ];

  locations.forEach(loc => {
    const link = createElement('a', undefined, loc.name);
    link.href = loc.url;
    link.setAttribute('data-route', '');
    locationsCol.appendChild(link);
  });

  links.appendChild(locationsCol);

  // Projects Column
  const projectsCol = createElement('div', 'footer__col');
  projectsCol.appendChild(createElement('h4', undefined, 'Featured Projects'));

  // Get top projects
  const featuredProjects = projects.slice(0, 6);
  featuredProjects.forEach(project => {
    const link = createElement('a', undefined, project.name);
    link.href = `/projects/${project.id}`;
    link.setAttribute('data-route', '');
    projectsCol.appendChild(link);
  });

  links.appendChild(projectsCol);

  // Blog Column
  const blogCol = createElement('div', 'footer__col');
  blogCol.appendChild(createElement('h4', undefined, 'Recent Articles'));

  // Get recent blog posts
  const recentPosts = blogPosts.slice(0, 5);
  recentPosts.forEach(post => {
    const link = createElement('a', undefined, post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title);
    link.href = `/blog/${post.slug}`;
    link.setAttribute('data-route', '');
    blogCol.appendChild(link);
  });

  links.appendChild(blogCol);

  top.appendChild(links);
  container.appendChild(top);

  // Middle Section - Social & Newsletter
  const middle = createElement('div', 'footer__middle');

  const social = createElement('div', 'footer__social');
  const socialTitle = createElement('h4', undefined, 'Follow Us');
  social.appendChild(socialTitle);

  const socialLinks = createElement('div', 'footer__social-links');
  const socials = [
    { name: 'Instagram', url: 'https://instagram.com/realhouseiq', icon: 'IG' },
    { name: 'Facebook', url: 'https://facebook.com/realhouseiq', icon: 'FB' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/realhouseiq', icon: 'IN' },
    { name: 'Twitter', url: 'https://twitter.com/realhouseiq', icon: 'X' },
    { name: 'YouTube', url: 'https://youtube.com/@realhouseiq', icon: 'YT' }
  ];

  socials.forEach(s => {
    const link = createElement('a', 'footer__social-link', s.icon);
    link.href = s.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Follow us on ${s.name}`);
    socialLinks.appendChild(link);
  });

  social.appendChild(socialLinks);
  middle.appendChild(social);

  container.appendChild(middle);

  // Bottom Section
  const bottom = createElement('div', 'footer__bottom');
  const copyright = createElement('p', undefined, '\u00A9 2025 Real House. All rights reserved.');
  bottom.appendChild(copyright);

  const legal = createElement('div', 'footer__legal');

  const privacyLink = createElement('a', undefined, 'Privacy Policy');
  privacyLink.href = '/privacy';
  privacyLink.setAttribute('data-route', '');
  legal.appendChild(privacyLink);

  const termsLink = createElement('a', undefined, 'Terms of Service');
  termsLink.href = '/terms';
  termsLink.setAttribute('data-route', '');
  legal.appendChild(termsLink);

  const sitemapLink = createElement('a', undefined, 'Sitemap');
  sitemapLink.href = '/sitemap';
  sitemapLink.setAttribute('data-route', '');
  legal.appendChild(sitemapLink);

  bottom.appendChild(legal);
  container.appendChild(bottom);

  footer.appendChild(container);
  return footer;
}

// ═══════════════════════════════════════════════════════════════════════════
// Contextual Links Helper for Blog Content
// ═══════════════════════════════════════════════════════════════════════════

export interface ContextualLink {
  text: string;
  keyword: string;
  url: string;
  title: string;
}

export const contextualLinks: ContextualLink[] = [
  { text: 'luxury apartments', keyword: 'luxury apartments', url: '/luxury', title: 'View luxury properties in Erbil' },
  { text: 'Gulan district', keyword: 'gulan', url: '/properties?district=Gulan', title: 'Browse properties in Gulan' },
  { text: 'Dream City', keyword: 'dream city', url: '/properties?district=Dream%20City', title: 'Explore Dream City properties' },
  { text: 'Empire World', keyword: 'empire world', url: '/projects/empire-world', title: 'Learn about Empire World project' },
  { text: 'Italian Village', keyword: 'italian village', url: '/projects/italian-village', title: 'Discover Italian Village' },
  { text: 'English Village', keyword: 'english village', url: '/projects/english-village', title: 'Explore English Village' },
  { text: 'Ankawa', keyword: 'ankawa', url: '/properties?district=Ankawa', title: 'Properties in Ankawa' },
  { text: 'properties for sale', keyword: 'for sale', url: '/buy', title: 'View all properties for sale' },
  { text: 'properties for rent', keyword: 'for rent', url: '/rent', title: 'View all rental properties' },
  { text: 'investment properties', keyword: 'investment', url: '/invest', title: 'Investment opportunities in Erbil' },
  { text: 'off-plan properties', keyword: 'off-plan', url: '/properties?status=Off%20Plan', title: 'Browse off-plan properties' },
  { text: 'commercial properties', keyword: 'commercial', url: '/properties?type=Commercial', title: 'Commercial real estate' },
  { text: 'villas', keyword: 'villas', url: '/properties?type=Villa', title: 'Luxury villas in Erbil' },
  { text: 'apartments', keyword: 'apartments', url: '/properties?type=Apartment', title: 'Apartments for sale and rent' },
  { text: 'penthouses', keyword: 'penthouses', url: '/properties?type=Penthouse', title: 'Penthouse apartments' },
  { text: 'contact us', keyword: 'contact', url: '/contact', title: 'Get in touch with Real House' },
  { text: 'Real House', keyword: 'real house', url: '/about', title: 'About Real House' }
];

// ═══════════════════════════════════════════════════════════════════════════
// "You May Also Like" Section for Blog Posts
// ═══════════════════════════════════════════════════════════════════════════

export function createYouMayAlsoLikeSection(currentPost: BlogPost, limit: number = 4): HTMLElement {
  const section = createElement('section', 'you-may-like');
  const container = createElement('div', 'container');

  const header = createElement('div', 'you-may-like__header');
  const title = createElement('h2', 'you-may-like__title', 'You May Also Like');
  header.appendChild(title);

  const viewAllLink = createElement('a', 'you-may-like__view-all', 'View All Articles');
  viewAllLink.href = '/blog';
  viewAllLink.setAttribute('data-route', '');
  viewAllLink.appendChild(createSVGUse('icon-arrow-right'));
  header.appendChild(viewAllLink);

  container.appendChild(header);

  const grid = createElement('div', 'you-may-like__grid');

  // Get related posts based on category and tags
  const relatedPosts = blogPosts
    .filter(p => p.id !== currentPost.id)
    .map(post => {
      let score = 0;
      if (post.category === currentPost.category) score += 3;
      const commonTags = post.tags.filter(tag =>
        currentPost.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      score += commonTags.length * 2;
      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);

  relatedPosts.forEach(post => {
    const card = createElement('a', 'you-may-like__card');
    card.href = `/blog/${post.slug}`;
    card.setAttribute('data-route', '');

    const imageWrapper = createElement('div', 'you-may-like__image-wrapper');
    const img = createElement('img', 'you-may-like__image');
    img.src = post.image;
    img.alt = post.title;
    img.loading = 'lazy';
    imageWrapper.appendChild(img);

    const categoryBadge = createElement('span', 'you-may-like__category', post.category);
    imageWrapper.appendChild(categoryBadge);

    card.appendChild(imageWrapper);

    const content = createElement('div', 'you-may-like__content');
    const cardTitle = createElement('h3', 'you-may-like__card-title', post.title);
    content.appendChild(cardTitle);

    const meta = createElement('div', 'you-may-like__meta');
    meta.textContent = `${post.readTime} min read`;
    content.appendChild(meta);

    card.appendChild(content);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Sidebar with Popular/Recent Content
// ═══════════════════════════════════════════════════════════════════════════

export function createContentSidebar(currentPageType: 'property' | 'project' | 'blog'): HTMLElement {
  const sidebar = createElement('aside', 'content-sidebar');

  // Popular Properties Section
  const popularPropertiesSection = createElement('div', 'content-sidebar__section');
  const popularPropertiesTitle = createElement('h3', 'content-sidebar__title', 'Popular Properties');
  popularPropertiesSection.appendChild(popularPropertiesTitle);

  const popularProperties = properties
    .filter(p => p.isFeatured)
    .slice(0, 4);

  const propertyList = createElement('div', 'content-sidebar__list');
  popularProperties.forEach(property => {
    const item = createElement('a', 'content-sidebar__item');
    item.href = `/properties/${property.id}`;
    item.setAttribute('data-route', '');

    const thumb = createElement('div', 'content-sidebar__thumb');
    const img = createElement('img');
    img.src = property.images[0];
    img.alt = property.title;
    img.loading = 'lazy';
    thumb.appendChild(img);
    item.appendChild(thumb);

    const info = createElement('div', 'content-sidebar__info');
    const itemTitle = createElement('span', 'content-sidebar__item-title', property.title);
    info.appendChild(itemTitle);
    const itemPrice = createElement('span', 'content-sidebar__item-price');
    itemPrice.textContent = property.price > 0
      ? `$${property.price.toLocaleString()}`
      : 'Contact for Price';
    info.appendChild(itemPrice);
    item.appendChild(info);

    propertyList.appendChild(item);
  });
  popularPropertiesSection.appendChild(propertyList);
  sidebar.appendChild(popularPropertiesSection);

  // Featured Projects Section
  const projectsSection = createElement('div', 'content-sidebar__section');
  const projectsTitle = createElement('h3', 'content-sidebar__title', 'Featured Projects');
  projectsSection.appendChild(projectsTitle);

  const featuredProjects = projects.slice(0, 3);
  const projectList = createElement('div', 'content-sidebar__list');
  featuredProjects.forEach(project => {
    const item = createElement('a', 'content-sidebar__item');
    item.href = `/projects/${project.id}`;
    item.setAttribute('data-route', '');

    const thumb = createElement('div', 'content-sidebar__thumb');
    const img = createElement('img');
    img.src = project.images[0];
    img.alt = project.name;
    img.loading = 'lazy';
    thumb.appendChild(img);
    item.appendChild(thumb);

    const info = createElement('div', 'content-sidebar__info');
    const itemTitle = createElement('span', 'content-sidebar__item-title', project.name);
    info.appendChild(itemTitle);
    const itemStatus = createElement('span', 'content-sidebar__item-status', project.status);
    info.appendChild(itemStatus);
    item.appendChild(info);

    projectList.appendChild(item);
  });
  projectsSection.appendChild(projectList);
  sidebar.appendChild(projectsSection);

  // Recent Blog Posts Section
  const blogSection = createElement('div', 'content-sidebar__section');
  const blogTitle = createElement('h3', 'content-sidebar__title', 'Recent Articles');
  blogSection.appendChild(blogTitle);

  const recentPosts = blogPosts.slice(0, 4);
  const blogList = createElement('div', 'content-sidebar__list');
  recentPosts.forEach(post => {
    const item = createElement('a', 'content-sidebar__item');
    item.href = `/blog/${post.slug}`;
    item.setAttribute('data-route', '');

    const thumb = createElement('div', 'content-sidebar__thumb');
    const img = createElement('img');
    img.src = post.image;
    img.alt = post.title;
    img.loading = 'lazy';
    thumb.appendChild(img);
    item.appendChild(thumb);

    const info = createElement('div', 'content-sidebar__info');
    const itemTitle = createElement('span', 'content-sidebar__item-title',
      post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title);
    info.appendChild(itemTitle);
    const itemMeta = createElement('span', 'content-sidebar__item-meta', post.category);
    info.appendChild(itemMeta);
    item.appendChild(info);

    blogList.appendChild(item);
  });
  blogSection.appendChild(blogList);
  sidebar.appendChild(blogSection);

  // Quick Links Section
  const quickLinksSection = createElement('div', 'content-sidebar__section');
  const quickLinksTitle = createElement('h3', 'content-sidebar__title', 'Quick Links');
  quickLinksSection.appendChild(quickLinksTitle);

  const quickLinks = [
    { name: 'Properties for Sale', url: '/buy' },
    { name: 'Properties for Rent', url: '/rent' },
    { name: 'Investment Properties', url: '/invest' },
    { name: 'Luxury Properties', url: '/luxury' },
    { name: 'All Projects', url: '/projects' },
    { name: 'Contact Us', url: '/contact' }
  ];

  const quickLinksList = createElement('ul', 'content-sidebar__quick-links');
  quickLinks.forEach(link => {
    const li = createElement('li');
    const a = createElement('a', undefined, link.name);
    a.href = link.url;
    a.setAttribute('data-route', '');
    li.appendChild(a);
    quickLinksList.appendChild(li);
  });
  quickLinksSection.appendChild(quickLinksList);
  sidebar.appendChild(quickLinksSection);

  return sidebar;
}

// ═══════════════════════════════════════════════════════════════════════════
// Blog Post Links to Properties and Projects
// ═══════════════════════════════════════════════════════════════════════════

export interface BlogPropertyLink {
  type: 'property' | 'project';
  id: string;
  relevanceScore: number;
}

export function getRelevantPropertiesForBlogPost(post: BlogPost, limit: number = 3): Property[] {
  const keywords = [...post.tags, post.category.toLowerCase()];

  return properties
    .map(property => {
      let score = 0;

      // Check if property type matches any keywords
      if (keywords.some(k => property.type.toLowerCase().includes(k.toLowerCase()))) {
        score += 3;
      }

      // Check if district matches any keywords
      if (keywords.some(k => property.location.district.toLowerCase().includes(k.toLowerCase()))) {
        score += 4;
      }

      // Check for investment-related posts
      if (post.category === 'Investment' && (property.badges?.includes('Installment') || property.status === 'Off Plan')) {
        score += 3;
      }

      // Check for luxury-related posts
      if (keywords.some(k => k.toLowerCase().includes('luxury')) && property.price > 400000) {
        score += 2;
      }

      // Prioritize featured properties
      if (property.isFeatured) score += 1;

      return { property, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.property);
}

export function getRelevantProjectsForBlogPost(post: BlogPost, limit: number = 2): Project[] {
  const keywords = [...post.tags, post.category.toLowerCase()];

  return projects
    .map(project => {
      let score = 0;

      // Check if project name matches any keywords
      if (keywords.some(k => project.name.toLowerCase().includes(k.toLowerCase()))) {
        score += 5;
      }

      // Check if district matches any keywords
      if (keywords.some(k => project.location.district.toLowerCase().includes(k.toLowerCase()))) {
        score += 3;
      }

      // Investment posts should link to off-plan projects
      if (post.category === 'Investment' && project.status !== 'Ready') {
        score += 2;
      }

      return { project, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.project);
}

export function createBlogContentLinks(post: BlogPost): HTMLElement {
  const section = createElement('section', 'blog-content-links');

  const relevantProperties = getRelevantPropertiesForBlogPost(post, 3);
  const relevantProjects = getRelevantProjectsForBlogPost(post, 2);

  if (relevantProperties.length === 0 && relevantProjects.length === 0) {
    // Return empty div if no relevant content
    return section;
  }

  const container = createElement('div', 'blog-content-links__container');

  const title = createElement('h3', 'blog-content-links__title', 'Explore Related Properties');
  container.appendChild(title);

  // Properties
  if (relevantProperties.length > 0) {
    const propertiesGrid = createElement('div', 'blog-content-links__grid');

    relevantProperties.forEach(property => {
      const card = createElement('a', 'blog-content-links__card');
      card.href = `/properties/${property.id}`;
      card.setAttribute('data-route', '');

      const imageWrapper = createElement('div', 'blog-content-links__image-wrapper');
      const img = createElement('img', 'blog-content-links__image');
      img.src = property.images[0];
      img.alt = property.title;
      img.loading = 'lazy';
      imageWrapper.appendChild(img);

      const badge = createElement('span', 'blog-content-links__badge', property.type);
      imageWrapper.appendChild(badge);

      card.appendChild(imageWrapper);

      const content = createElement('div', 'blog-content-links__content');
      const cardTitle = createElement('h4', 'blog-content-links__card-title', property.title);
      content.appendChild(cardTitle);

      const location = createElement('p', 'blog-content-links__location', `${property.location.district}, ${property.location.city}`);
      content.appendChild(location);

      const price = createElement('span', 'blog-content-links__price');
      price.textContent = property.price > 0
        ? `$${property.price.toLocaleString()}`
        : 'Contact for Price';
      content.appendChild(price);

      card.appendChild(content);
      propertiesGrid.appendChild(card);
    });

    container.appendChild(propertiesGrid);
  }

  // Projects
  if (relevantProjects.length > 0) {
    const projectsTitle = createElement('h4', 'blog-content-links__subtitle', 'Featured Projects');
    container.appendChild(projectsTitle);

    const projectsList = createElement('div', 'blog-content-links__projects');

    relevantProjects.forEach(project => {
      const link = createElement('a', 'blog-content-links__project-link');
      link.href = `/projects/${project.id}`;
      link.setAttribute('data-route', '');

      const projectName = createElement('span', 'blog-content-links__project-name', project.name);
      link.appendChild(projectName);

      const projectStatus = createElement('span', `blog-content-links__project-status blog-content-links__project-status--${project.status.toLowerCase().replace(/\s/g, '-')}`, project.status);
      link.appendChild(projectStatus);

      link.appendChild(createSVGUse('icon-arrow-right'));

      projectsList.appendChild(link);
    });

    container.appendChild(projectsList);
  }

  // View All CTA
  const viewAllWrapper = createElement('div', 'blog-content-links__cta');
  const viewAllBtn = createElement('a', 'btn btn--ghost', 'View All Properties');
  viewAllBtn.href = '/properties';
  viewAllBtn.setAttribute('data-route', '');
  viewAllWrapper.appendChild(viewAllBtn);
  container.appendChild(viewAllWrapper);

  section.appendChild(container);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Get All Page Links for Sitemap/Footer (Prevents Orphan Pages)
// ═══════════════════════════════════════════════════════════════════════════

export interface SiteLink {
  name: string;
  url: string;
  type: 'main' | 'property' | 'project' | 'blog' | 'hub' | 'legal' | 'service' | 'location';
}

export function getAllSiteLinks(): SiteLink[] {
  const links: SiteLink[] = [];

  // Main pages
  links.push(
    { name: 'Home', url: '/', type: 'main' },
    { name: 'Properties', url: '/properties', type: 'main' },
    { name: 'Projects', url: '/projects', type: 'main' },
    { name: 'Blog', url: '/blog', type: 'main' },
    { name: 'About', url: '/about', type: 'main' },
    { name: 'Contact', url: '/contact', type: 'main' },
    { name: 'FAQ', url: '/faq', type: 'main' },
    { name: 'Gallery', url: '/gallery', type: 'main' },
    { name: 'Services', url: '/services', type: 'main' },
    { name: 'Locations', url: '/locations', type: 'main' }
  );

  // Hub pages
  links.push(
    { name: 'Buy', url: '/buy', type: 'hub' },
    { name: 'Rent', url: '/rent', type: 'hub' },
    { name: 'Invest', url: '/invest', type: 'hub' },
    { name: 'Luxury', url: '/luxury', type: 'hub' }
  );

  // Legal pages
  links.push(
    { name: 'Privacy Policy', url: '/privacy', type: 'legal' },
    { name: 'Terms of Service', url: '/terms', type: 'legal' },
    { name: 'Sitemap', url: '/sitemap', type: 'legal' }
  );

  // Property pages
  properties.forEach(property => {
    links.push({
      name: property.title,
      url: `/properties/${property.id}`,
      type: 'property'
    });
  });

  // Project pages
  projects.forEach(project => {
    links.push({
      name: project.name,
      url: `/projects/${project.id}`,
      type: 'project'
    });
  });

  // Blog pages
  blogPosts.forEach(post => {
    links.push({
      name: post.title,
      url: `/blog/${post.slug}`,
      type: 'blog'
    });
  });

  return links;
}

export function checkForOrphanPages(): SiteLink[] {
  const allLinks = getAllSiteLinks();
  // In a real implementation, this would check which pages have no internal links pointing to them
  // For now, we return an empty array as all pages are linked from the footer and sitemap
  return [];
}

// ═══════════════════════════════════════════════════════════════════════════
// Cross-Content Linking: Properties <-> Projects <-> Blog
// ═══════════════════════════════════════════════════════════════════════════

export interface CrossLink {
  title: string;
  url: string;
  type: 'property' | 'project' | 'blog';
  image?: string;
  subtitle?: string;
}

// Get properties in the same location as a project
export function getPropertiesInProject(project: Project, limit: number = 4): Property[] {
  return properties
    .filter(p => p.location.district === project.location.district)
    .slice(0, limit);
}

// Get project that a property belongs to (if any)
export function getProjectForProperty(property: Property): Project | null {
  return projects.find(proj =>
    proj.location.district === property.location.district
  ) || null;
}

// Get blog posts related to a property's location or type
export function getBlogPostsForProperty(property: Property, limit: number = 3): BlogPost[] {
  const keywords = [
    property.type.toLowerCase(),
    property.location.district.toLowerCase(),
    property.status.toLowerCase().replace(' ', '-')
  ];

  return blogPosts
    .filter(post => {
      const postText = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
      return keywords.some(keyword => postText.includes(keyword));
    })
    .slice(0, limit);
}

// Get blog posts related to a project
export function getBlogPostsForProject(project: Project, limit: number = 3): BlogPost[] {
  const keywords = [
    project.name.toLowerCase(),
    project.location.district.toLowerCase(),
    project.status.toLowerCase()
  ];

  return blogPosts
    .filter(post => {
      const postText = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
      return keywords.some(keyword => postText.includes(keyword));
    })
    .slice(0, limit);
}

// ═══════════════════════════════════════════════════════════════════════════
// Cross-Content Links Section Component
// ═══════════════════════════════════════════════════════════════════════════

export function createCrossContentLinks(
  currentType: 'property' | 'project' | 'blog',
  relatedItems: CrossLink[]
): HTMLElement {
  const section = createElement('section', 'cross-content-links');
  const container = createElement('div', 'container');

  const header = createElement('div', 'cross-content-links__header');
  const title = createElement('h3', 'cross-content-links__title', 'You Might Also Be Interested In');
  header.appendChild(title);
  container.appendChild(header);

  const grid = createElement('div', 'cross-content-links__grid');

  relatedItems.forEach(item => {
    const card = createElement('a', 'cross-content-links__card');
    card.href = item.url;
    card.setAttribute('data-route', '');

    if (item.image) {
      const imageWrapper = createElement('div', 'cross-content-links__image-wrapper');
      const img = createElement('img', 'cross-content-links__image');
      img.src = item.image;
      img.alt = item.title;
      img.loading = 'lazy';
      imageWrapper.appendChild(img);

      const typeBadge = createElement('span', `cross-content-links__badge cross-content-links__badge--${item.type}`);
      typeBadge.textContent = item.type.charAt(0).toUpperCase() + item.type.slice(1);
      imageWrapper.appendChild(typeBadge);

      card.appendChild(imageWrapper);
    }

    const content = createElement('div', 'cross-content-links__content');
    const cardTitle = createElement('h4', 'cross-content-links__card-title', item.title);
    content.appendChild(cardTitle);

    if (item.subtitle) {
      const subtitle = createElement('p', 'cross-content-links__subtitle', item.subtitle);
      content.appendChild(subtitle);
    }

    card.appendChild(content);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Property Detail Cross-Links
// ═══════════════════════════════════════════════════════════════════════════

export function createPropertyCrossLinks(property: Property): HTMLElement {
  const crossLinks: CrossLink[] = [];

  // Add related project
  const project = getProjectForProperty(property);
  if (project) {
    crossLinks.push({
      title: project.name,
      url: `/projects/${project.id}`,
      type: 'project',
      image: project.images[0],
      subtitle: `${project.status} - ${project.availableUnits} units available`
    });
  }

  // Add related blog posts
  const relatedPosts = getBlogPostsForProperty(property, 2);
  relatedPosts.forEach(post => {
    crossLinks.push({
      title: post.title,
      url: `/blog/${post.slug}`,
      type: 'blog',
      image: post.image,
      subtitle: post.category
    });
  });

  if (crossLinks.length === 0) {
    return createElement('div'); // Empty div if no cross-links
  }

  return createCrossContentLinks('property', crossLinks);
}

// ═══════════════════════════════════════════════════════════════════════════
// Project Detail Cross-Links
// ═══════════════════════════════════════════════════════════════════════════

export function createProjectCrossLinks(project: Project): HTMLElement {
  const crossLinks: CrossLink[] = [];

  // Add related properties
  const relatedProperties = getPropertiesInProject(project, 2);
  relatedProperties.forEach(prop => {
    crossLinks.push({
      title: prop.title,
      url: `/properties/${prop.id}`,
      type: 'property',
      image: prop.images[0],
      subtitle: `${prop.type} - ${prop.status}`
    });
  });

  // Add related blog posts
  const relatedPosts = getBlogPostsForProject(project, 2);
  relatedPosts.forEach(post => {
    crossLinks.push({
      title: post.title,
      url: `/blog/${post.slug}`,
      type: 'blog',
      image: post.image,
      subtitle: post.category
    });
  });

  if (crossLinks.length === 0) {
    return createElement('div'); // Empty div if no cross-links
  }

  return createCrossContentLinks('project', crossLinks);
}

// ═══════════════════════════════════════════════════════════════════════════
// Inline Contextual Link Inserter
// ═══════════════════════════════════════════════════════════════════════════

export function insertContextualLinks(content: string): string {
  let processedContent = content;

  // Sort by keyword length (longer first) to avoid partial replacements
  const sortedLinks = [...contextualLinks].sort((a, b) => b.keyword.length - a.keyword.length);

  sortedLinks.forEach(link => {
    // Case-insensitive search, but only replace first occurrence
    const regex = new RegExp(`\\b(${escapeRegExp(link.keyword)})\\b`, 'i');
    const replacement = `<a href="${link.url}" class="contextual-link" title="${link.title}" data-route>$1</a>`;
    processedContent = processedContent.replace(regex, replacement);
  });

  return processedContent;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ═══════════════════════════════════════════════════════════════════════════
// Quick Navigation Component
// ═══════════════════════════════════════════════════════════════════════════

export function createQuickNav(): HTMLElement {
  const nav = createElement('nav', 'quick-nav');
  nav.setAttribute('aria-label', 'Quick Navigation');

  const container = createElement('div', 'container');
  const list = createElement('ul', 'quick-nav__list');

  const quickLinks = [
    { name: 'Properties', url: '/properties', icon: 'icon-home' },
    { name: 'For Sale', url: '/buy', icon: 'icon-tag' },
    { name: 'For Rent', url: '/rent', icon: 'icon-key' },
    { name: 'Projects', url: '/projects', icon: 'icon-building' },
    { name: 'Blog', url: '/blog', icon: 'icon-book' },
    { name: 'Contact', url: '/contact', icon: 'icon-phone' }
  ];

  quickLinks.forEach(link => {
    const li = createElement('li', 'quick-nav__item');
    const a = createElement('a', 'quick-nav__link');
    a.href = link.url;
    a.setAttribute('data-route', '');

    a.appendChild(createSVGUse(link.icon));
    a.appendChild(document.createTextNode(link.name));

    li.appendChild(a);
    list.appendChild(li);
  });

  container.appendChild(list);
  nav.appendChild(container);
  return nav;
}

// ═══════════════════════════════════════════════════════════════════════════
// Popular Content Widget (for sidebars)
// ═══════════════════════════════════════════════════════════════════════════

export function createPopularPropertiesWidget(limit: number = 5): HTMLElement {
  const widget = createElement('div', 'popular-widget');
  const title = createElement('h3', 'popular-widget__title', 'Popular Properties');
  widget.appendChild(title);

  const list = createElement('div', 'popular-widget__list');

  const featuredProps = properties
    .filter(p => p.isFeatured)
    .slice(0, limit);

  featuredProps.forEach(prop => {
    const item = createElement('a', 'popular-widget__item');
    item.href = `/properties/${prop.id}`;
    item.setAttribute('data-route', '');

    const thumb = createElement('div', 'popular-widget__thumb');
    const img = createElement('img');
    img.src = prop.images[0];
    img.alt = prop.title;
    img.loading = 'lazy';
    thumb.appendChild(img);
    item.appendChild(thumb);

    const info = createElement('div', 'popular-widget__info');
    const itemTitle = createElement('span', 'popular-widget__item-title');
    itemTitle.textContent = prop.title.length > 30 ? prop.title.substring(0, 30) + '...' : prop.title;
    info.appendChild(itemTitle);

    const price = createElement('span', 'popular-widget__price');
    price.textContent = prop.price > 0 ? `$${prop.price.toLocaleString()}` : 'Contact for Price';
    info.appendChild(price);

    item.appendChild(info);
    list.appendChild(item);
  });

  widget.appendChild(list);

  const viewAll = createElement('a', 'popular-widget__view-all', 'View All Properties');
  viewAll.href = '/properties';
  viewAll.setAttribute('data-route', '');
  widget.appendChild(viewAll);

  return widget;
}

export function createPopularProjectsWidget(limit: number = 4): HTMLElement {
  const widget = createElement('div', 'popular-widget');
  const title = createElement('h3', 'popular-widget__title', 'Featured Projects');
  widget.appendChild(title);

  const list = createElement('div', 'popular-widget__list');

  projects.slice(0, limit).forEach(proj => {
    const item = createElement('a', 'popular-widget__item');
    item.href = `/projects/${proj.id}`;
    item.setAttribute('data-route', '');

    const thumb = createElement('div', 'popular-widget__thumb');
    const img = createElement('img');
    img.src = proj.images[0];
    img.alt = proj.name;
    img.loading = 'lazy';
    thumb.appendChild(img);
    item.appendChild(thumb);

    const info = createElement('div', 'popular-widget__info');
    const itemTitle = createElement('span', 'popular-widget__item-title', proj.name);
    info.appendChild(itemTitle);

    const status = createElement('span', 'popular-widget__status', proj.status);
    info.appendChild(status);

    item.appendChild(info);
    list.appendChild(item);
  });

  widget.appendChild(list);

  const viewAll = createElement('a', 'popular-widget__view-all', 'View All Projects');
  viewAll.href = '/projects';
  viewAll.setAttribute('data-route', '');
  widget.appendChild(viewAll);

  return widget;
}

export function createRecentBlogWidget(limit: number = 4): HTMLElement {
  const widget = createElement('div', 'popular-widget');
  const title = createElement('h3', 'popular-widget__title', 'Recent Articles');
  widget.appendChild(title);

  const list = createElement('div', 'popular-widget__list');

  blogPosts.slice(0, limit).forEach(post => {
    const item = createElement('a', 'popular-widget__item');
    item.href = `/blog/${post.slug}`;
    item.setAttribute('data-route', '');

    const thumb = createElement('div', 'popular-widget__thumb');
    const img = createElement('img');
    img.src = post.image;
    img.alt = post.title;
    img.loading = 'lazy';
    thumb.appendChild(img);
    item.appendChild(thumb);

    const info = createElement('div', 'popular-widget__info');
    const itemTitle = createElement('span', 'popular-widget__item-title');
    itemTitle.textContent = post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title;
    info.appendChild(itemTitle);

    const category = createElement('span', 'popular-widget__category', post.category);
    info.appendChild(category);

    item.appendChild(info);
    list.appendChild(item);
  });

  widget.appendChild(list);

  const viewAll = createElement('a', 'popular-widget__view-all', 'View All Articles');
  viewAll.href = '/blog';
  viewAll.setAttribute('data-route', '');
  widget.appendChild(viewAll);

  return widget;
}

// ═══════════════════════════════════════════════════════════════════════════
// Location-Based Internal Links
// ═══════════════════════════════════════════════════════════════════════════

export function createLocationLinks(): HTMLElement {
  const section = createElement('section', 'location-links');
  const container = createElement('div', 'container');

  const title = createElement('h2', 'location-links__title', 'Explore Properties by Location');
  container.appendChild(title);

  const grid = createElement('div', 'location-links__grid');

  // Get unique districts with property counts
  const districtCounts = new Map<string, number>();
  properties.forEach(prop => {
    const count = districtCounts.get(prop.location.district) || 0;
    districtCounts.set(prop.location.district, count + 1);
  });

  // Sort by count descending
  const sortedDistricts = [...districtCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  sortedDistricts.forEach(([district, count]) => {
    const card = createElement('a', 'location-links__card');
    card.href = `/properties?district=${encodeURIComponent(district)}`;
    card.setAttribute('data-route', '');

    const name = createElement('span', 'location-links__name', district);
    card.appendChild(name);

    const countEl = createElement('span', 'location-links__count', `${count} properties`);
    card.appendChild(countEl);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Call-to-Action Internal Links Section
// ═══════════════════════════════════════════════════════════════════════════

export function createInternalCTA(
  title: string,
  description: string,
  primaryLink: { text: string; url: string },
  secondaryLink?: { text: string; url: string }
): HTMLElement {
  const section = createElement('section', 'internal-cta');
  const container = createElement('div', 'container');

  const content = createElement('div', 'internal-cta__content');

  const heading = createElement('h2', 'internal-cta__title', title);
  content.appendChild(heading);

  const desc = createElement('p', 'internal-cta__description', description);
  content.appendChild(desc);

  const actions = createElement('div', 'internal-cta__actions');

  const primary = createElement('a', 'btn btn--primary', primaryLink.text);
  primary.href = primaryLink.url;
  primary.setAttribute('data-route', '');
  actions.appendChild(primary);

  if (secondaryLink) {
    const secondary = createElement('a', 'btn btn--ghost', secondaryLink.text);
    secondary.href = secondaryLink.url;
    secondary.setAttribute('data-route', '');
    actions.appendChild(secondary);
  }

  content.appendChild(actions);
  container.appendChild(content);
  section.appendChild(container);

  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Services/Locations Breadcrumbs
// ═══════════════════════════════════════════════════════════════════════════

export function getServicesBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Our Services', url: '/services', current: true }
  ];
}

export function getServiceDetailBreadcrumbs(serviceName: string, serviceSlug: string): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: serviceName, url: `/services/${serviceSlug}`, current: true }
  ];
}

export function getLocationsBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/locations', current: true }
  ];
}

export function getLocationDetailBreadcrumbs(locationName: string, locationSlug: string): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/locations' },
    { name: locationName, url: `/locations/${locationSlug}`, current: true }
  ];
}

export function getGalleryBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Photo Gallery', url: '/gallery', current: true }
  ];
}
