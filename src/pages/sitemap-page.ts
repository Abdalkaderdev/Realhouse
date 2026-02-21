// ═══════════════════════════════════════════════════════════════════════════
// Sitemap Page for SEO
// Human-readable sitemap with links to all pages
// ═══════════════════════════════════════════════════════════════════════════

import { properties } from '../data/properties';
import { projects } from '../data/projects';
import { blogPosts, blogCategories } from '../data/blog';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  getSitemapBreadcrumbs
} from '../components/internal-linking';

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

// ═══════════════════════════════════════════════════════════════════════════
// Sitemap Page Renderer
// ═══════════════════════════════════════════════════════════════════════════

export function renderSitemapPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getSitemapBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'sitemap-page');
  const container = createElement('div', 'container');

  // Breadcrumbs
  container.appendChild(createBreadcrumbs(breadcrumbs));

  // Header
  const header = createElement('header', 'sitemap-page__header');
  const title = createElement('h1', 'sitemap-page__title', 'Site Map');
  header.appendChild(title);
  const subtitle = createElement('p', 'sitemap-page__subtitle', 'Find everything on Real House. Browse our complete list of pages, properties, projects, and articles.');
  header.appendChild(subtitle);
  container.appendChild(header);

  // Main Content Grid
  const grid = createElement('div', 'sitemap-page__grid');

  // ─── Main Pages Section ─────────────────────────────────────────────────
  const mainSection = createElement('section', 'sitemap-page__section');
  const mainTitle = createElement('h2', 'sitemap-page__section-title', 'Main Pages');
  mainSection.appendChild(mainTitle);

  const mainList = createElement('ul', 'sitemap-page__list');
  const mainPages = [
    { name: 'Home', url: '/', desc: 'Welcome to Real House' },
    { name: 'All Properties', url: '/properties', desc: 'Browse all available properties' },
    { name: 'Properties for Sale', url: '/buy', desc: 'Find homes to buy in Erbil' },
    { name: 'Properties for Rent', url: '/rent', desc: 'Find rental properties' },
    { name: 'Investment Properties', url: '/invest', desc: 'Investment opportunities' },
    { name: 'Luxury Properties', url: '/luxury', desc: 'Premium luxury homes' },
    { name: 'Development Projects', url: '/projects', desc: 'New development projects' },
    { name: 'Blog & Insights', url: '/blog', desc: 'Real estate articles and tips' },
    { name: 'About Us', url: '/about', desc: 'Learn about Real House' },
    { name: 'Contact Us', url: '/contact', desc: 'Get in touch' },
    { name: 'FAQ', url: '/faq', desc: 'Frequently asked questions' },
    { name: 'My Favorites', url: '/favorites', desc: 'Your saved properties' },
    { name: 'Compare Properties', url: '/compare', desc: 'Compare selected properties' }
  ];

  mainPages.forEach(page => {
    const li = createElement('li', 'sitemap-page__item');
    const link = createElement('a', 'sitemap-page__link', page.name);
    link.href = page.url;
    link.setAttribute('data-route', '');
    li.appendChild(link);
    const desc = createElement('span', 'sitemap-page__desc', ` - ${page.desc}`);
    li.appendChild(desc);
    mainList.appendChild(li);
  });
  mainSection.appendChild(mainList);
  grid.appendChild(mainSection);

  // ─── Property Types Section ─────────────────────────────────────────────
  const typesSection = createElement('section', 'sitemap-page__section');
  const typesTitle = createElement('h2', 'sitemap-page__section-title', 'Browse by Property Type');
  typesSection.appendChild(typesTitle);

  const typesList = createElement('ul', 'sitemap-page__list');
  const types = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Duplex', 'Commercial', 'Land'];
  types.forEach(type => {
    const count = properties.filter(p => p.type === type).length;
    const li = createElement('li', 'sitemap-page__item');
    const link = createElement('a', 'sitemap-page__link', `${type}s`);
    link.href = `/properties?type=${type}`;
    link.setAttribute('data-route', '');
    li.appendChild(link);
    const desc = createElement('span', 'sitemap-page__desc', ` (${count} properties)`);
    li.appendChild(desc);
    typesList.appendChild(li);
  });
  typesSection.appendChild(typesList);
  grid.appendChild(typesSection);

  // ─── Locations Section ─────────────────────────────────────────────────
  const locSection = createElement('section', 'sitemap-page__section');
  const locTitle = createElement('h2', 'sitemap-page__section-title', 'Browse by Location');
  locSection.appendChild(locTitle);

  const locList = createElement('ul', 'sitemap-page__list');
  const districts = [...new Set(properties.map(p => p.location.district))].sort();
  districts.forEach(district => {
    const count = properties.filter(p => p.location.district === district).length;
    const li = createElement('li', 'sitemap-page__item');
    const link = createElement('a', 'sitemap-page__link', `Properties in ${district}`);
    link.href = `/properties?district=${encodeURIComponent(district)}`;
    link.setAttribute('data-route', '');
    li.appendChild(link);
    const desc = createElement('span', 'sitemap-page__desc', ` (${count} properties)`);
    li.appendChild(desc);
    locList.appendChild(li);
  });
  locSection.appendChild(locList);
  grid.appendChild(locSection);

  // ─── Development Projects Section ─────────────────────────────────────
  const projSection = createElement('section', 'sitemap-page__section');
  const projTitle = createElement('h2', 'sitemap-page__section-title', 'Development Projects');
  projSection.appendChild(projTitle);

  const projList = createElement('ul', 'sitemap-page__list');
  projects.forEach(project => {
    const li = createElement('li', 'sitemap-page__item');
    const link = createElement('a', 'sitemap-page__link', project.name);
    link.href = `/projects/${project.id}`;
    link.setAttribute('data-route', '');
    li.appendChild(link);
    const desc = createElement('span', 'sitemap-page__desc', ` - ${project.status}, ${project.location.district}`);
    li.appendChild(desc);
    projList.appendChild(li);
  });
  projSection.appendChild(projList);
  grid.appendChild(projSection);

  // ─── All Properties Section ─────────────────────────────────────────────
  const propsSection = createElement('section', 'sitemap-page__section sitemap-page__section--wide');
  const propsTitle = createElement('h2', 'sitemap-page__section-title', `All Properties (${properties.length})`);
  propsSection.appendChild(propsTitle);

  const propsList = createElement('ul', 'sitemap-page__list sitemap-page__list--multi-column');
  properties.forEach(property => {
    const li = createElement('li', 'sitemap-page__item');
    const link = createElement('a', 'sitemap-page__link', property.title);
    link.href = `/properties/${property.id}`;
    link.setAttribute('data-route', '');
    li.appendChild(link);
    const desc = createElement('span', 'sitemap-page__desc', ` - ${property.type} in ${property.location.district}`);
    li.appendChild(desc);
    propsList.appendChild(li);
  });
  propsSection.appendChild(propsList);
  grid.appendChild(propsSection);

  // ─── Blog Categories Section ─────────────────────────────────────────────
  const catSection = createElement('section', 'sitemap-page__section');
  const catTitle = createElement('h2', 'sitemap-page__section-title', 'Blog Categories');
  catSection.appendChild(catTitle);

  const catList = createElement('ul', 'sitemap-page__list');
  blogCategories.forEach(category => {
    const count = blogPosts.filter(p => p.category === category).length;
    const li = createElement('li', 'sitemap-page__item');
    const link = createElement('a', 'sitemap-page__link', category);
    link.href = `/blog?category=${encodeURIComponent(category)}`;
    link.setAttribute('data-route', '');
    li.appendChild(link);
    const desc = createElement('span', 'sitemap-page__desc', ` (${count} articles)`);
    li.appendChild(desc);
    catList.appendChild(li);
  });
  catSection.appendChild(catList);
  grid.appendChild(catSection);

  // ─── All Blog Posts Section ─────────────────────────────────────────────
  const blogSection = createElement('section', 'sitemap-page__section sitemap-page__section--wide');
  const blogTitle = createElement('h2', 'sitemap-page__section-title', `All Blog Posts (${blogPosts.length})`);
  blogSection.appendChild(blogTitle);

  const blogList = createElement('ul', 'sitemap-page__list sitemap-page__list--multi-column');
  blogPosts.forEach(post => {
    const li = createElement('li', 'sitemap-page__item');
    const link = createElement('a', 'sitemap-page__link', post.title);
    link.href = `/blog/${post.slug}`;
    link.setAttribute('data-route', '');
    li.appendChild(link);
    const desc = createElement('span', 'sitemap-page__desc', ` - ${post.category}`);
    li.appendChild(desc);
    blogList.appendChild(li);
  });
  blogSection.appendChild(blogList);
  grid.appendChild(blogSection);

  // ─── Legal Pages Section ─────────────────────────────────────────────────
  const legalSection = createElement('section', 'sitemap-page__section');
  const legalTitle = createElement('h2', 'sitemap-page__section-title', 'Legal & Policies');
  legalSection.appendChild(legalTitle);

  const legalList = createElement('ul', 'sitemap-page__list');
  const legalPages = [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' }
  ];

  legalPages.forEach(page => {
    const li = createElement('li', 'sitemap-page__item');
    const link = createElement('a', 'sitemap-page__link', page.name);
    link.href = page.url;
    link.setAttribute('data-route', '');
    li.appendChild(link);
    legalList.appendChild(li);
  });
  legalSection.appendChild(legalList);
  grid.appendChild(legalSection);

  container.appendChild(grid);

  // XML Sitemap Link
  const xmlSection = createElement('div', 'sitemap-page__xml');
  const xmlText = createElement('p', undefined, 'For search engines: ');
  const xmlLink = createElement('a', 'sitemap-page__xml-link', 'XML Sitemap');
  xmlLink.href = '/sitemap.xml';
  xmlText.appendChild(xmlLink);
  xmlSection.appendChild(xmlText);
  container.appendChild(xmlSection);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

export function setupSitemapPageSEO(): void {
  document.title = 'Site Map | Real House - All Pages & Properties';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Complete site map of Real House. Find all pages, properties, development projects, and blog articles in one place.');
  }
}
