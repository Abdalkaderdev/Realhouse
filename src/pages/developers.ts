// ═══════════════════════════════════════════════════════════════════════════
// Developers Directory Pages
// /developers - All developers listing
// /developers/:slug - Individual developer detail page
// ═══════════════════════════════════════════════════════════════════════════

import {
  developers,
  getDeveloperBySlug,
  getDeveloperStats,
  formatDeveloperYearsInBusiness,
  generateDeveloperSchema,
  type Developer
} from '../data/developers';
import { getProjectById, type Project } from '../data/projects';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema
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

function createSVGUse(iconId: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

// ─── Breadcrumb Helpers ─────────────────────────────────────────────────────
function getDevelopersBreadcrumbs() {
  return [
    { name: 'Home', url: '/' },
    { name: 'Developers', url: '/developers' }
  ];
}

function getDeveloperDetailBreadcrumbs(developer: Developer) {
  return [
    { name: 'Home', url: '/' },
    { name: 'Developers', url: '/developers' },
    { name: developer.name, url: `/developers/${developer.slug}` }
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// Developer Card Component
// ═══════════════════════════════════════════════════════════════════════════

function createDeveloperCard(developer: Developer): HTMLElement {
  const card = createElement('article', 'developer-card');
  card.setAttribute('data-id', developer.id);

  // Logo/Header Section
  const header = createElement('div', 'developer-card__header');

  const logoWrapper = createElement('div', 'developer-card__logo-wrapper');
  const logo = createElement('div', 'developer-card__logo');
  logo.textContent = developer.shortName || developer.name.substring(0, 2).toUpperCase();
  logoWrapper.appendChild(logo);
  header.appendChild(logoWrapper);

  const titleSection = createElement('div', 'developer-card__title-section');
  const name = createElement('h3', 'developer-card__name', developer.name);
  titleSection.appendChild(name);

  const tagline = createElement('p', 'developer-card__tagline', developer.tagline);
  titleSection.appendChild(tagline);
  header.appendChild(titleSection);

  card.appendChild(header);

  // Stats Grid
  const stats = createElement('div', 'developer-card__stats');

  const yearsInBusiness = formatDeveloperYearsInBusiness(developer.foundedYear);

  const statItems = [
    { label: 'Years Active', value: `${yearsInBusiness}+` },
    { label: 'Projects', value: developer.totalProjects.toString() },
    { label: 'Units Delivered', value: developer.totalUnitsDelivered.toLocaleString() }
  ];

  statItems.forEach(stat => {
    const statItem = createElement('div', 'developer-card__stat');
    const statValue = createElement('span', 'developer-card__stat-value', stat.value);
    const statLabel = createElement('span', 'developer-card__stat-label', stat.label);
    statItem.appendChild(statValue);
    statItem.appendChild(statLabel);
    stats.appendChild(statItem);
  });

  card.appendChild(stats);

  // Specializations
  const specs = createElement('div', 'developer-card__specializations');
  developer.specializations.slice(0, 3).forEach(spec => {
    const tag = createElement('span', 'developer-card__spec-tag', spec);
    specs.appendChild(tag);
  });
  if (developer.specializations.length > 3) {
    const more = createElement('span', 'developer-card__spec-more', `+${developer.specializations.length - 3}`);
    specs.appendChild(more);
  }
  card.appendChild(specs);

  // Footer with CTA
  const footer = createElement('div', 'developer-card__footer');

  const viewBtn = createElement('a', 'btn btn--primary btn--full', 'View Developer');
  viewBtn.href = `/developers/${developer.slug}`;
  viewBtn.setAttribute('data-route', '');
  footer.appendChild(viewBtn);

  card.appendChild(footer);

  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// Developers Listing Page
// ═══════════════════════════════════════════════════════════════════════════

export function renderDevelopersPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getDevelopersBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'developers-page');
  const container = createElement('div', 'container');

  // Breadcrumbs
  container.appendChild(createBreadcrumbs(breadcrumbs));

  // Header Section
  const header = createElement('header', 'developers-page__header');
  const title = createElement('h1', 'developers-page__title', 'Real Estate Developers in Erbil');
  header.appendChild(title);

  const subtitle = createElement('p', 'developers-page__subtitle',
    'Discover the leading real estate developers shaping Kurdistan\'s skyline. From international partnerships to local pioneers, explore the companies building Erbil\'s future.'
  );
  header.appendChild(subtitle);
  container.appendChild(header);

  // Stats Section
  const stats = getDeveloperStats();
  const statsSection = createElement('div', 'developers-page__stats');

  const statsData = [
    { value: stats.totalDevelopers.toString(), label: 'Leading Developers' },
    { value: stats.totalProjects.toString(), label: 'Total Projects' },
    { value: stats.totalUnitsDelivered.toLocaleString(), label: 'Units Delivered' },
    { value: stats.totalUnitsUnderConstruction.toLocaleString(), label: 'Under Construction' }
  ];

  statsData.forEach(stat => {
    const statCard = createElement('div', 'developers-page__stat-card');
    const statValue = createElement('span', 'developers-page__stat-value', stat.value);
    const statLabel = createElement('span', 'developers-page__stat-label', stat.label);
    statCard.appendChild(statValue);
    statCard.appendChild(statLabel);
    statsSection.appendChild(statCard);
  });

  container.appendChild(statsSection);

  // Developers Grid
  const grid = createElement('div', 'developers-page__grid');
  developers.forEach(developer => {
    grid.appendChild(createDeveloperCard(developer));
  });
  container.appendChild(grid);

  // CTA Section
  const cta = createElement('section', 'developers-page__cta');
  const ctaContent = createElement('div', 'developers-page__cta-content');

  const ctaTitle = createElement('h2', 'developers-page__cta-title', 'Looking for a Specific Development?');
  ctaContent.appendChild(ctaTitle);

  const ctaText = createElement('p', 'developers-page__cta-text',
    'Our experts can help you find the perfect property from any developer. Contact us for personalized guidance.'
  );
  ctaContent.appendChild(ctaText);

  const ctaActions = createElement('div', 'developers-page__cta-actions');

  const contactBtn = createElement('a', 'btn btn--primary', 'Contact Us');
  contactBtn.href = '/contact';
  contactBtn.setAttribute('data-route', '');
  ctaActions.appendChild(contactBtn);

  const projectsBtn = createElement('a', 'btn btn--ghost', 'Browse All Projects');
  projectsBtn.href = '/projects';
  projectsBtn.setAttribute('data-route', '');
  ctaActions.appendChild(projectsBtn);

  ctaContent.appendChild(ctaActions);
  cta.appendChild(ctaContent);
  container.appendChild(cta);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// Developer Detail Page
// ═══════════════════════════════════════════════════════════════════════════

export function renderDeveloperDetailPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const developer = getDeveloperBySlug(slug);

  if (!developer) {
    // 404 - Developer not found
    const page = createElement('div', 'developer-detail-page developer-detail-page--not-found');
    const container = createElement('div', 'container');

    const content = createElement('div', 'developer-detail-page__not-found');
    const title = createElement('h1', undefined, 'Developer Not Found');
    const message = createElement('p', undefined, 'The developer you are looking for does not exist or has been removed.');
    const backLink = createElement('a', 'btn btn--primary', 'View All Developers');
    backLink.href = '/developers';
    backLink.setAttribute('data-route', '');

    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(backLink);
    container.appendChild(content);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  const page = createElement('div', 'developer-detail-page');

  // Breadcrumbs Section
  const breadcrumbSection = createElement('section', 'developer-detail__breadcrumbs');
  const breadcrumbContainer = createElement('div', 'container');
  const breadcrumbItems = getDeveloperDetailBreadcrumbs(developer);
  breadcrumbContainer.appendChild(createBreadcrumbs(breadcrumbItems));
  breadcrumbSection.appendChild(breadcrumbContainer);
  page.appendChild(breadcrumbSection);
  injectBreadcrumbSchema(breadcrumbItems);

  // Hero Section
  const hero = createElement('section', 'developer-detail__hero');
  const heroContainer = createElement('div', 'container');

  const heroContent = createElement('div', 'developer-detail__hero-content');

  // Logo
  const heroLogo = createElement('div', 'developer-detail__logo');
  heroLogo.textContent = developer.shortName || developer.name.substring(0, 2).toUpperCase();
  heroContent.appendChild(heroLogo);

  // Title & Tagline
  const heroText = createElement('div', 'developer-detail__hero-text');
  const heroTitle = createElement('h1', 'developer-detail__title', developer.name);
  heroText.appendChild(heroTitle);

  const heroTagline = createElement('p', 'developer-detail__tagline', developer.tagline);
  heroText.appendChild(heroTagline);

  // Quick Stats
  const yearsInBusiness = formatDeveloperYearsInBusiness(developer.foundedYear);
  const quickStats = createElement('div', 'developer-detail__quick-stats');

  const quickStatsData = [
    { label: 'Founded', value: developer.foundedYear.toString() },
    { label: 'Years Active', value: `${yearsInBusiness}+` },
    { label: 'Projects', value: developer.totalProjects.toString() },
    { label: 'Units Delivered', value: developer.totalUnitsDelivered.toLocaleString() }
  ];

  quickStatsData.forEach(stat => {
    const statItem = createElement('div', 'developer-detail__quick-stat');
    const statValue = createElement('span', 'developer-detail__quick-stat-value', stat.value);
    const statLabel = createElement('span', 'developer-detail__quick-stat-label', stat.label);
    statItem.appendChild(statValue);
    statItem.appendChild(statLabel);
    quickStats.appendChild(statItem);
  });

  heroText.appendChild(quickStats);
  heroContent.appendChild(heroText);
  heroContainer.appendChild(heroContent);
  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // Main Content
  const content = createElement('section', 'developer-detail__content');
  const contentContainer = createElement('div', 'container');
  const contentGrid = createElement('div', 'developer-detail__grid');

  // ─── Main Column ─────────────────────────────────────────────────────────
  const mainCol = createElement('div', 'developer-detail__main');

  // About Section
  const aboutSection = createElement('div', 'developer-detail__section');
  const aboutTitle = createElement('h2', 'developer-detail__section-title', 'About ' + developer.name);
  aboutSection.appendChild(aboutTitle);

  const aboutDesc = createElement('div', 'developer-detail__description');
  developer.description.split('\n\n').forEach(para => {
    if (para.trim()) {
      const p = createElement('p', undefined, para.trim());
      aboutDesc.appendChild(p);
    }
  });
  aboutSection.appendChild(aboutDesc);
  mainCol.appendChild(aboutSection);

  // History Section
  const historySection = createElement('div', 'developer-detail__section');
  const historyTitle = createElement('h2', 'developer-detail__section-title', 'Company History');
  historySection.appendChild(historyTitle);

  const historyDesc = createElement('div', 'developer-detail__description');
  developer.history.split('\n\n').forEach(para => {
    if (para.trim()) {
      const p = createElement('p', undefined, para.trim());
      historyDesc.appendChild(p);
    }
  });
  historySection.appendChild(historyDesc);
  mainCol.appendChild(historySection);

  // Specializations Section
  const specSection = createElement('div', 'developer-detail__section');
  const specTitle = createElement('h2', 'developer-detail__section-title', 'Specializations');
  specSection.appendChild(specTitle);

  const specList = createElement('ul', 'developer-detail__spec-list');
  developer.specializations.forEach(spec => {
    const specItem = createElement('li', 'developer-detail__spec-item');
    specItem.appendChild(createSVGUse('icon-check'));
    specItem.appendChild(document.createTextNode(spec));
    specList.appendChild(specItem);
  });
  specSection.appendChild(specList);
  mainCol.appendChild(specSection);

  // Projects Section (if any)
  if (developer.projectIds.length > 0) {
    const projectsSection = createElement('div', 'developer-detail__section');
    const projectsTitle = createElement('h2', 'developer-detail__section-title', 'Projects by ' + developer.name);
    projectsSection.appendChild(projectsTitle);

    const projectsGrid = createElement('div', 'developer-detail__projects-grid');

    developer.projectIds.forEach(projectId => {
      const project = getProjectById(projectId);
      if (project) {
        const projectCard = createProjectMiniCard(project);
        projectsGrid.appendChild(projectCard);
      }
    });

    projectsSection.appendChild(projectsGrid);
    mainCol.appendChild(projectsSection);
  }

  // Achievements Section
  if (developer.achievements.length > 0) {
    const achieveSection = createElement('div', 'developer-detail__section');
    const achieveTitle = createElement('h2', 'developer-detail__section-title', 'Achievements & Milestones');
    achieveSection.appendChild(achieveTitle);

    const achieveList = createElement('div', 'developer-detail__achievements');
    developer.achievements.forEach(achievement => {
      const item = createElement('div', 'developer-detail__achievement');
      const year = createElement('span', 'developer-detail__achievement-year', achievement.year.toString());
      item.appendChild(year);
      const achieveContent = createElement('div', 'developer-detail__achievement-content');
      const achieveItemTitle = createElement('h4', 'developer-detail__achievement-title', achievement.title);
      const achieveItemDesc = createElement('p', 'developer-detail__achievement-desc', achievement.description);
      achieveContent.appendChild(achieveItemTitle);
      achieveContent.appendChild(achieveItemDesc);
      item.appendChild(achieveContent);
      achieveList.appendChild(item);
    });
    achieveSection.appendChild(achieveList);
    mainCol.appendChild(achieveSection);
  }

  contentGrid.appendChild(mainCol);

  // ─── Sidebar ─────────────────────────────────────────────────────────────
  const sidebar = createElement('div', 'developer-detail__sidebar');

  // Contact Card
  const contactCard = createElement('div', 'developer-detail__contact-card');
  const contactTitle = createElement('h3', 'developer-detail__card-title', 'Contact ' + developer.name);
  contactCard.appendChild(contactTitle);

  const contactInfo = createElement('div', 'developer-detail__contact-info');

  const phoneItem = createElement('div', 'developer-detail__contact-item');
  phoneItem.appendChild(createSVGUse('icon-phone'));
  const phoneLink = createElement('a', undefined, developer.contact.phone);
  phoneLink.href = `tel:${developer.contact.phone.replace(/\s/g, '')}`;
  phoneItem.appendChild(phoneLink);
  contactInfo.appendChild(phoneItem);

  const emailItem = createElement('div', 'developer-detail__contact-item');
  emailItem.appendChild(createSVGUse('icon-email'));
  const emailLink = createElement('a', undefined, developer.contact.email);
  emailLink.href = `mailto:${developer.contact.email}`;
  emailItem.appendChild(emailLink);
  contactInfo.appendChild(emailItem);

  if (developer.website) {
    const webItem = createElement('div', 'developer-detail__contact-item');
    webItem.appendChild(createSVGUse('icon-arrow-right'));
    const webLink = createElement('a', undefined, 'Visit Website');
    webLink.href = developer.website;
    webLink.target = '_blank';
    webLink.rel = 'noopener noreferrer';
    webItem.appendChild(webLink);
    contactInfo.appendChild(webItem);
  }

  contactCard.appendChild(contactInfo);

  // WhatsApp Button
  if (developer.contact.whatsapp) {
    const whatsappBtn = createElement('a', 'btn btn--whatsapp btn--sm');
    whatsappBtn.href = `https://wa.me/${developer.contact.whatsapp.replace(/[^0-9]/g, '')}`;
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.appendChild(createSVGUse('icon-whatsapp'));
    whatsappBtn.appendChild(document.createTextNode(' WhatsApp'));
    contactCard.appendChild(whatsappBtn);
  }

  sidebar.appendChild(contactCard);

  // Office Locations
  if (developer.offices.length > 0) {
    const officesCard = createElement('div', 'developer-detail__offices-card');
    const officesTitle = createElement('h3', 'developer-detail__card-title', 'Office Locations');
    officesCard.appendChild(officesTitle);

    developer.offices.forEach(office => {
      const officeItem = createElement('div', 'developer-detail__office');
      const officeName = createElement('h4', 'developer-detail__office-name', office.name);
      if (office.isHeadquarters) {
        const hqBadge = createElement('span', 'developer-detail__hq-badge', 'HQ');
        officeName.appendChild(hqBadge);
      }
      officeItem.appendChild(officeName);

      const officeAddress = createElement('p', 'developer-detail__office-address', `${office.address}, ${office.city}`);
      officeItem.appendChild(officeAddress);

      const officePhone = createElement('a', 'developer-detail__office-phone', office.phone);
      officePhone.href = `tel:${office.phone.replace(/\s/g, '')}`;
      officeItem.appendChild(officePhone);

      officesCard.appendChild(officeItem);
    });

    sidebar.appendChild(officesCard);
  }

  // Social Media
  if (developer.socialMedia) {
    const socialCard = createElement('div', 'developer-detail__social-card');
    const socialTitle = createElement('h3', 'developer-detail__card-title', 'Follow ' + developer.shortName || developer.name);
    socialCard.appendChild(socialTitle);

    const socialLinks = createElement('div', 'developer-detail__social-links');

    if (developer.socialMedia.instagram) {
      const instaLink = createElement('a', 'developer-detail__social-link', 'Instagram');
      instaLink.href = developer.socialMedia.instagram;
      instaLink.target = '_blank';
      instaLink.rel = 'noopener noreferrer';
      socialLinks.appendChild(instaLink);
    }
    if (developer.socialMedia.facebook) {
      const fbLink = createElement('a', 'developer-detail__social-link', 'Facebook');
      fbLink.href = developer.socialMedia.facebook;
      fbLink.target = '_blank';
      fbLink.rel = 'noopener noreferrer';
      socialLinks.appendChild(fbLink);
    }
    if (developer.socialMedia.linkedin) {
      const liLink = createElement('a', 'developer-detail__social-link', 'LinkedIn');
      liLink.href = developer.socialMedia.linkedin;
      liLink.target = '_blank';
      liLink.rel = 'noopener noreferrer';
      socialLinks.appendChild(liLink);
    }
    if (developer.socialMedia.youtube) {
      const ytLink = createElement('a', 'developer-detail__social-link', 'YouTube');
      ytLink.href = developer.socialMedia.youtube;
      ytLink.target = '_blank';
      ytLink.rel = 'noopener noreferrer';
      socialLinks.appendChild(ytLink);
    }

    socialCard.appendChild(socialLinks);
    sidebar.appendChild(socialCard);
  }

  // Certifications
  if (developer.certifications && developer.certifications.length > 0) {
    const certsCard = createElement('div', 'developer-detail__certs-card');
    const certsTitle = createElement('h3', 'developer-detail__card-title', 'Certifications');
    certsCard.appendChild(certsTitle);

    const certsList = createElement('ul', 'developer-detail__certs-list');
    developer.certifications.forEach(cert => {
      const certItem = createElement('li', 'developer-detail__cert-item');
      certItem.appendChild(createSVGUse('icon-shield'));
      certItem.appendChild(document.createTextNode(cert));
      certsList.appendChild(certItem);
    });
    certsCard.appendChild(certsList);
    sidebar.appendChild(certsCard);
  }

  // Inquiry CTA
  const inquiryCta = createElement('div', 'developer-detail__inquiry-cta');
  const inquiryTitle = createElement('h3', 'developer-detail__card-title', 'Interested in ' + developer.name + ' Projects?');
  inquiryCta.appendChild(inquiryTitle);

  const inquiryText = createElement('p', 'developer-detail__inquiry-text',
    'Real House can help you find available units and negotiate the best terms with this developer.'
  );
  inquiryCta.appendChild(inquiryText);

  const inquiryBtn = createElement('a', 'btn btn--primary btn--full', 'Contact Real House');
  inquiryBtn.href = '/contact';
  inquiryBtn.setAttribute('data-route', '');
  inquiryCta.appendChild(inquiryBtn);

  sidebar.appendChild(inquiryCta);

  contentGrid.appendChild(sidebar);
  contentContainer.appendChild(contentGrid);
  content.appendChild(contentContainer);
  page.appendChild(content);

  // Back Link
  const backSection = createElement('section', 'developer-detail__back');
  const backContainer = createElement('div', 'container');
  const backLink = createElement('a', 'developer-detail__back-link', 'Back to All Developers');
  backLink.href = '/developers';
  backLink.setAttribute('data-route', '');
  backLink.insertBefore(createSVGUse('icon-arrow-left'), backLink.firstChild);
  backContainer.appendChild(backLink);
  backSection.appendChild(backContainer);
  page.appendChild(backSection);

  fragment.appendChild(page);
  return fragment;
}

// ─── Mini Project Card for Developer Page ─────────────────────────────────
function createProjectMiniCard(project: Project): HTMLElement {
  const card = createElement('a', 'developer-detail__project-card');
  card.href = `/projects/${project.id}`;
  card.setAttribute('data-route', '');

  const image = createElement('div', 'developer-detail__project-image');
  image.style.backgroundImage = `url(${project.images[0]})`;
  card.appendChild(image);

  const info = createElement('div', 'developer-detail__project-info');

  const name = createElement('h4', 'developer-detail__project-name', project.name);
  info.appendChild(name);

  const location = createElement('p', 'developer-detail__project-location',
    `${project.location.district}, ${project.location.city}`
  );
  info.appendChild(location);

  const status = createElement('span', 'developer-detail__project-status');
  status.className = `developer-detail__project-status developer-detail__project-status--${project.status.toLowerCase().replace(/\s/g, '-')}`;
  status.textContent = project.status;
  info.appendChild(status);

  card.appendChild(info);
  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// SEO Setup Functions
// ═══════════════════════════════════════════════════════════════════════════

export function setupDevelopersPageSEO(): void {
  document.title = 'Real Estate Developers Erbil | Kurdistan Property Companies | Real House';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Discover leading real estate developers in Erbil, Kurdistan. From Empire World (DAMAC) to local pioneers. Compare developers, projects, and find your ideal property partner.');
  }

  // Add developers list schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Real Estate Developers in Erbil, Kurdistan',
    description: 'Leading property development companies operating in Erbil',
    numberOfItems: developers.length,
    itemListElement: developers.map((dev, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: dev.name,
      url: `https://realhouseiq.com/developers/${dev.slug}`
    }))
  };

  let schemaScript = document.querySelector('script[data-schema="developers-list"]');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.setAttribute('type', 'application/ld+json');
    schemaScript.setAttribute('data-schema', 'developers-list');
    document.head.appendChild(schemaScript);
  }
  schemaScript.textContent = JSON.stringify(schema);
}

export function setupDeveloperDetailPageSEO(developer: Developer): void {
  document.title = developer.metaTitle;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', developer.metaDescription);
  }

  // Add Organization schema
  const schema = generateDeveloperSchema(developer);

  let schemaScript = document.querySelector('script[data-schema="developer-org"]');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.setAttribute('type', 'application/ld+json');
    schemaScript.setAttribute('data-schema', 'developer-org');
    document.head.appendChild(schemaScript);
  }
  schemaScript.textContent = JSON.stringify(schema);
}

// Export all developer slugs for routing
export function getAllDeveloperSlugs(): string[] {
  return developers.map(d => d.slug);
}
