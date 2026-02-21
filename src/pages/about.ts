// ═══════════════════════════════════════════════════════════════════════════
// About Page - E-E-A-T Enhanced Content
// Experience, Expertise, Authoritativeness, Trustworthiness
// ═══════════════════════════════════════════════════════════════════════════

import {
  companyHistory,
  milestones,
  awards,
  mediaMentions,
  affiliations,
  certifications,
  companyStats,
  getRecentAwards,
  getRecentMediaMentions,
  formatCurrency
} from '../data/company';
import {
  teamMembers,
  getLeadershipTeam,
  getSalesTeam,
  getInvestmentTeam,
  generateAuthorSchema
} from '../data/team';
import { testimonials } from '../data/testimonials';
import {
  caseStudies,
  getFeaturedResources
} from '../data/resources';
import {
  contactMethods,
  socialLinks,
  responseCommitments,
  getMainOffice
} from '../data/contact';
import { injectSchema } from '../seo/schema';

// ─── Helper Functions ────────────────────────────────────────────────────────

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

// ─── About Page Render ───────────────────────────────────────────────────────

export function renderAboutPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('div', 'about-page about-page--enhanced');

  // Inject Organization Schema with enhanced data
  injectSchema(generateOrganizationSchema(), 'schema-organization-about');

  // ═══ Hero Section ═══
  page.appendChild(createHeroSection());

  // ═══ Company Overview / Stats ═══
  page.appendChild(createStatsSection());

  // ═══ Our Story Section ═══
  page.appendChild(createStorySection());

  // ═══ Timeline / Milestones ═══
  page.appendChild(createTimelineSection());

  // ═══ Core Values ═══
  page.appendChild(createValuesSection());

  // ═══ Leadership Team ═══
  page.appendChild(createLeadershipSection());

  // ═══ Sales & Investment Team ═══
  page.appendChild(createTeamSection());

  // ═══ Awards & Recognition ═══
  page.appendChild(createAwardsSection());

  // ═══ Media Mentions ═══
  page.appendChild(createMediaSection());

  // ═══ Professional Affiliations ═══
  page.appendChild(createAffiliationsSection());

  // ═══ Certifications & Licenses ═══
  page.appendChild(createCertificationsSection());

  // ═══ Client Testimonials ═══
  page.appendChild(createTestimonialsSection());

  // ═══ Case Studies ═══
  page.appendChild(createCaseStudiesSection());

  // ═══ Resource Center Preview ═══
  page.appendChild(createResourcesSection());

  // ═══ Contact Transparency ═══
  page.appendChild(createContactSection());

  // ═══ CTA Section ═══
  page.appendChild(createCTASection());

  fragment.appendChild(page);
  return fragment;
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function createHeroSection(): HTMLElement {
  const hero = createElement('section', 'about-hero');
  const container = createElement('div', 'container');

  const content = createElement('div', 'about-hero__content');

  const badge = createElement('span', 'about-hero__badge', `Est. ${companyHistory.foundedYear} - ${companyHistory.yearsInBusiness} Years of Excellence`);
  content.appendChild(badge);

  const title = createElement('h1', 'about-hero__title');
  title.textContent = 'Redefining ';
  const em = createElement('em', undefined, 'Luxury');
  title.appendChild(em);
  title.appendChild(document.createTextNode(' Real Estate in Kurdistan'));
  content.appendChild(title);

  const subtitle = createElement('p', 'about-hero__subtitle', companyHistory.mission);
  content.appendChild(subtitle);

  // Quick stats
  const quickStats = createElement('div', 'about-hero__quick-stats');
  const statsData = [
    { value: `${companyStats.totalTransactions}+`, label: 'Transactions' },
    { value: formatCurrency(companyStats.totalSalesVolume), label: 'Sales Volume' },
    { value: `${companyStats.clientSatisfactionRate}%`, label: 'Satisfaction' },
    { value: `${companyStats.yearsInBusiness}`, label: 'Years' }
  ];

  statsData.forEach(stat => {
    const statEl = createElement('div', 'about-hero__stat');
    const value = createElement('span', 'about-hero__stat-value', stat.value);
    const label = createElement('span', 'about-hero__stat-label', stat.label);
    statEl.appendChild(value);
    statEl.appendChild(label);
    quickStats.appendChild(statEl);
  });

  content.appendChild(quickStats);
  container.appendChild(content);
  hero.appendChild(container);

  return hero;
}

// ─── Stats Section ───────────────────────────────────────────────────────────

function createStatsSection(): HTMLElement {
  const section = createElement('section', 'about-stats');
  const container = createElement('div', 'container');

  const grid = createElement('div', 'about-stats__grid');

  const statsItems = [
    { icon: 'icon-home', value: companyStats.totalTransactions.toLocaleString(), label: 'Properties Sold', desc: 'Successful transactions completed' },
    { icon: 'icon-users', value: `${companyStats.localClients + companyStats.internationalClients}+`, label: 'Happy Clients', desc: 'Families and investors served' },
    { icon: 'icon-globe', value: companyStats.internationalClients.toLocaleString(), label: 'International Clients', desc: 'From 20+ countries worldwide' },
    { icon: 'icon-chart', value: formatCurrency(companyStats.totalSalesVolume), label: 'Transaction Volume', desc: 'Total value of properties sold' },
    { icon: 'icon-star', value: `${companyStats.clientSatisfactionRate}%`, label: 'Client Satisfaction', desc: 'Based on post-sale surveys' },
    { icon: 'icon-refresh', value: `${companyStats.repeatClientRate}%`, label: 'Repeat Clients', desc: 'Clients who return for more' }
  ];

  statsItems.forEach(item => {
    const card = createElement('div', 'about-stats__card');

    const iconWrap = createElement('div', 'about-stats__icon');
    iconWrap.appendChild(createSVGUse(item.icon));
    card.appendChild(iconWrap);

    const value = createElement('span', 'about-stats__value', item.value);
    card.appendChild(value);

    const label = createElement('span', 'about-stats__label', item.label);
    card.appendChild(label);

    const desc = createElement('span', 'about-stats__desc', item.desc);
    card.appendChild(desc);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Story Section ───────────────────────────────────────────────────────────

function createStorySection(): HTMLElement {
  const section = createElement('section', 'about-story');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Our ';
  const em = createElement('em', undefined, 'Story');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', `${companyHistory.yearsInBusiness} years of trusted service in Kurdistan`);
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-story__grid');

  const content = createElement('div', 'about-story__content');
  const paragraphs = companyHistory.foundingStory.split('\n\n');
  paragraphs.forEach(p => {
    if (p.trim()) {
      const para = createElement('p', undefined, p.trim());
      content.appendChild(para);
    }
  });
  grid.appendChild(content);

  const imageWrapper = createElement('div', 'about-story__image');
  const img = createElement('img');
  img.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp';
  img.alt = 'Real House office in Erbil';
  img.loading = 'lazy';
  imageWrapper.appendChild(img);
  grid.appendChild(imageWrapper);

  container.appendChild(grid);

  // Vision and Mission
  const visionMission = createElement('div', 'about-story__vision-mission');

  const missionCard = createElement('div', 'about-story__card');
  const missionTitle = createElement('h3', undefined, 'Our Mission');
  missionCard.appendChild(missionTitle);
  const missionText = createElement('p', undefined, companyHistory.mission);
  missionCard.appendChild(missionText);
  visionMission.appendChild(missionCard);

  const visionCard = createElement('div', 'about-story__card');
  const visionTitle = createElement('h3', undefined, 'Our Vision');
  visionCard.appendChild(visionTitle);
  const visionText = createElement('p', undefined, companyHistory.vision);
  visionCard.appendChild(visionText);
  visionMission.appendChild(visionCard);

  container.appendChild(visionMission);
  section.appendChild(container);

  return section;
}

// ─── Timeline Section ────────────────────────────────────────────────────────

function createTimelineSection(): HTMLElement {
  const section = createElement('section', 'about-timeline');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Our ';
  const em = createElement('em', undefined, 'Journey');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Key milestones in our 23-year history');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const timeline = createElement('div', 'about-timeline__list');

  milestones.forEach((milestone, index) => {
    const item = createElement('div', `about-timeline__item ${index % 2 === 0 ? 'about-timeline__item--left' : 'about-timeline__item--right'}`);

    const yearBadge = createElement('div', 'about-timeline__year', milestone.year.toString());
    item.appendChild(yearBadge);

    const content = createElement('div', 'about-timeline__content');
    const title = createElement('h3', 'about-timeline__title', milestone.title);
    content.appendChild(title);
    const desc = createElement('p', 'about-timeline__desc', milestone.description);
    content.appendChild(desc);
    item.appendChild(content);

    timeline.appendChild(item);
  });

  container.appendChild(timeline);
  section.appendChild(container);

  return section;
}

// ─── Values Section ──────────────────────────────────────────────────────────

function createValuesSection(): HTMLElement {
  const section = createElement('section', 'about-values');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Our ';
  const em = createElement('em', undefined, 'Values');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'The principles that guide everything we do');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-values__grid');

  companyHistory.coreValues.forEach(value => {
    const card = createElement('div', 'about-values__card');

    const iconWrap = createElement('div', 'about-values__icon');
    iconWrap.appendChild(createSVGUse(value.icon));
    card.appendChild(iconWrap);

    const title = createElement('h3', 'about-values__title', value.title);
    card.appendChild(title);

    const desc = createElement('p', 'about-values__desc', value.description);
    card.appendChild(desc);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Leadership Section ──────────────────────────────────────────────────────

function createLeadershipSection(): HTMLElement {
  const section = createElement('section', 'about-leadership');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Our ';
  const em = createElement('em', undefined, 'Leadership');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Meet the experienced team guiding Real House');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-leadership__grid');

  getLeadershipTeam().forEach(member => {
    const card = createTeamMemberCard(member, true);
    grid.appendChild(card);

    // Inject author schema for each leader
    injectSchema(generateAuthorSchema(member), `schema-author-${member.id}`);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Team Section ────────────────────────────────────────────────────────────

function createTeamSection(): HTMLElement {
  const section = createElement('section', 'about-team');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Our ';
  const em = createElement('em', undefined, 'Expert');
  headerTitle.appendChild(em);
  headerTitle.appendChild(document.createTextNode(' Consultants'));
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Dedicated professionals committed to finding your perfect property');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-team__grid');

  const salesTeam = getSalesTeam();
  const investmentTeam = getInvestmentTeam();
  const allTeam = [...salesTeam, ...investmentTeam].filter(m => !m.isLeadership);

  allTeam.forEach(member => {
    const card = createTeamMemberCard(member, false);
    grid.appendChild(card);

    // Inject author schema
    injectSchema(generateAuthorSchema(member), `schema-author-${member.id}`);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Team Member Card Component ──────────────────────────────────────────────

function createTeamMemberCard(member: typeof teamMembers[0], isLeadership: boolean): HTMLElement {
  const card = createElement('article', `team-card ${isLeadership ? 'team-card--leadership' : ''}`);
  card.setAttribute('itemscope', '');
  card.setAttribute('itemtype', 'https://schema.org/Person');

  // Image
  const imageWrap = createElement('div', 'team-card__image');
  const img = createElement('img');
  img.src = member.image;
  img.alt = member.name;
  img.loading = 'lazy';
  img.setAttribute('itemprop', 'image');
  imageWrap.appendChild(img);

  if (member.isFounder) {
    const founderBadge = createElement('span', 'team-card__badge', 'Co-Founder');
    imageWrap.appendChild(founderBadge);
  }

  card.appendChild(imageWrap);

  // Content
  const content = createElement('div', 'team-card__content');

  const name = createElement('h3', 'team-card__name');
  name.setAttribute('itemprop', 'name');
  name.textContent = member.name;
  content.appendChild(name);

  const role = createElement('p', 'team-card__role');
  role.setAttribute('itemprop', 'jobTitle');
  role.textContent = member.role;
  content.appendChild(role);

  // Stats
  const stats = createElement('div', 'team-card__stats');

  const expStat = createElement('div', 'team-card__stat');
  const expValue = createElement('span', 'team-card__stat-value', `${member.yearsExperience}+`);
  expStat.appendChild(expValue);
  const expLabel = createElement('span', 'team-card__stat-label', 'Years Exp.');
  expStat.appendChild(expLabel);
  stats.appendChild(expStat);

  if (member.transactionCount > 0) {
    const transStat = createElement('div', 'team-card__stat');
    const transValue = createElement('span', 'team-card__stat-value', member.transactionCount.toString());
    transStat.appendChild(transValue);
    const transLabel = createElement('span', 'team-card__stat-label', 'Sales');
    transStat.appendChild(transLabel);
    stats.appendChild(transStat);
  }

  content.appendChild(stats);

  // Languages
  const languages = createElement('div', 'team-card__languages');
  const langLabel = createElement('span', 'team-card__lang-label', 'Languages: ');
  languages.appendChild(langLabel);
  const langList = createElement('span', 'team-card__lang-list', member.languages.join(', '));
  languages.appendChild(langList);
  content.appendChild(languages);

  // Specializations
  const specs = createElement('div', 'team-card__specs');
  member.specializations.slice(0, 3).forEach(spec => {
    const tag = createElement('span', 'team-card__spec-tag', spec);
    specs.appendChild(tag);
  });
  content.appendChild(specs);

  // Bio
  const bio = createElement('p', 'team-card__bio', member.bio);
  bio.setAttribute('itemprop', 'description');
  content.appendChild(bio);

  // Credentials (for leadership)
  if (isLeadership && member.credentials.length > 0) {
    const credentials = createElement('div', 'team-card__credentials');
    const credTitle = createElement('span', 'team-card__cred-title', 'Credentials:');
    credentials.appendChild(credTitle);
    member.credentials.slice(0, 2).forEach(cred => {
      const credItem = createElement('span', 'team-card__cred-item', cred.title);
      credentials.appendChild(credItem);
    });
    content.appendChild(credentials);
  }

  // Contact
  const contact = createElement('div', 'team-card__contact');

  const phoneLink = createElement('a', 'team-card__link');
  phoneLink.href = `tel:${member.phone.replace(/\s/g, '')}`;
  phoneLink.setAttribute('itemprop', 'telephone');
  phoneLink.appendChild(createSVGUse('icon-phone'));
  phoneLink.appendChild(document.createTextNode(' Call'));
  contact.appendChild(phoneLink);

  const emailLink = createElement('a', 'team-card__link');
  emailLink.href = `mailto:${member.email}`;
  emailLink.setAttribute('itemprop', 'email');
  emailLink.appendChild(createSVGUse('icon-email'));
  emailLink.appendChild(document.createTextNode(' Email'));
  contact.appendChild(emailLink);

  if (member.socialLinks.linkedin) {
    const linkedinLink = createElement('a', 'team-card__link');
    linkedinLink.href = member.socialLinks.linkedin;
    linkedinLink.target = '_blank';
    linkedinLink.rel = 'noopener noreferrer';
    linkedinLink.appendChild(createSVGUse('icon-linkedin'));
    linkedinLink.appendChild(document.createTextNode(' LinkedIn'));
    contact.appendChild(linkedinLink);
  }

  content.appendChild(contact);
  card.appendChild(content);

  return card;
}

// ─── Awards Section ──────────────────────────────────────────────────────────

function createAwardsSection(): HTMLElement {
  const section = createElement('section', 'about-awards');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Awards & ';
  const em = createElement('em', undefined, 'Recognition');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Industry recognition for our commitment to excellence');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-awards__grid');

  getRecentAwards(6).forEach(award => {
    const card = createElement('div', 'about-awards__card');

    const year = createElement('span', 'about-awards__year', award.year.toString());
    card.appendChild(year);

    const iconWrap = createElement('div', 'about-awards__icon');
    iconWrap.appendChild(createSVGUse('icon-award'));
    card.appendChild(iconWrap);

    const title = createElement('h3', 'about-awards__title', award.title);
    card.appendChild(title);

    const org = createElement('p', 'about-awards__org', award.organization);
    card.appendChild(org);

    const desc = createElement('p', 'about-awards__desc', award.description);
    card.appendChild(desc);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Media Section ───────────────────────────────────────────────────────────

function createMediaSection(): HTMLElement {
  const section = createElement('section', 'about-media');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'In The ';
  const em = createElement('em', undefined, 'Media');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Real House featured in leading publications');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-media__grid');

  getRecentMediaMentions(6).forEach(mention => {
    const card = createElement('article', 'about-media__card');

    const logo = createElement('div', 'about-media__logo');
    const logoText = createElement('span', undefined, mention.outletLogo);
    logo.appendChild(logoText);
    card.appendChild(logo);

    const content = createElement('div', 'about-media__content');

    const type = createElement('span', 'about-media__type', mention.type.charAt(0).toUpperCase() + mention.type.slice(1));
    content.appendChild(type);

    const title = createElement('h3', 'about-media__title', mention.title);
    content.appendChild(title);

    const excerpt = createElement('p', 'about-media__excerpt', mention.excerpt);
    content.appendChild(excerpt);

    const meta = createElement('div', 'about-media__meta');
    const outlet = createElement('span', undefined, mention.outlet);
    meta.appendChild(outlet);
    const date = createElement('span', undefined, new Date(mention.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }));
    meta.appendChild(date);
    content.appendChild(meta);

    card.appendChild(content);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Affiliations Section ────────────────────────────────────────────────────

function createAffiliationsSection(): HTMLElement {
  const section = createElement('section', 'about-affiliations');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Professional ';
  const em = createElement('em', undefined, 'Affiliations');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Member of leading real estate organizations');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-affiliations__grid');

  affiliations.forEach(aff => {
    const card = createElement('div', 'about-affiliations__card');

    const abbrev = createElement('span', 'about-affiliations__abbrev', aff.abbreviation);
    card.appendChild(abbrev);

    const name = createElement('h3', 'about-affiliations__name', aff.name);
    card.appendChild(name);

    const type = createElement('span', 'about-affiliations__type', aff.type.charAt(0).toUpperCase() + aff.type.slice(1));
    card.appendChild(type);

    const since = createElement('span', 'about-affiliations__since', `Member since ${aff.since}`);
    card.appendChild(since);

    const desc = createElement('p', 'about-affiliations__desc', aff.description);
    card.appendChild(desc);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Certifications Section ──────────────────────────────────────────────────

function createCertificationsSection(): HTMLElement {
  const section = createElement('section', 'about-certifications');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Licenses & ';
  const em = createElement('em', undefined, 'Certifications');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Fully licensed and certified real estate agency');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-certifications__grid');

  certifications.forEach(cert => {
    const card = createElement('div', 'about-certifications__card');

    const iconWrap = createElement('div', 'about-certifications__icon');
    iconWrap.appendChild(createSVGUse('icon-shield'));
    card.appendChild(iconWrap);

    const name = createElement('h3', 'about-certifications__name', cert.name);
    card.appendChild(name);

    const issuer = createElement('p', 'about-certifications__issuer', cert.issuedBy);
    card.appendChild(issuer);

    const number = createElement('span', 'about-certifications__number', `License: ${cert.number}`);
    card.appendChild(number);

    const valid = createElement('span', 'about-certifications__valid', `Valid until: ${new Date(cert.validUntil).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`);
    card.appendChild(valid);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Testimonials Section ────────────────────────────────────────────────────

function createTestimonialsSection(): HTMLElement {
  const section = createElement('section', 'about-testimonials');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Client ';
  const em = createElement('em', undefined, 'Testimonials');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', `Trusted by ${companyStats.localClients + companyStats.internationalClients}+ clients`);
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-testimonials__grid');

  testimonials.slice(0, 6).forEach(testimonial => {
    const card = createElement('article', 'testimonial-card');
    card.setAttribute('itemscope', '');
    card.setAttribute('itemtype', 'https://schema.org/Review');

    // Rating
    const rating = createElement('div', 'testimonial-card__rating');
    rating.setAttribute('itemprop', 'reviewRating');
    rating.setAttribute('itemscope', '');
    rating.setAttribute('itemtype', 'https://schema.org/Rating');
    const ratingValue = createElement('meta');
    ratingValue.setAttribute('itemprop', 'ratingValue');
    ratingValue.setAttribute('content', testimonial.rating.toString());
    rating.appendChild(ratingValue);
    for (let i = 0; i < 5; i++) {
      const star = createElement('span', i < testimonial.rating ? 'testimonial-card__star testimonial-card__star--filled' : 'testimonial-card__star', '\u2605');
      rating.appendChild(star);
    }
    card.appendChild(rating);

    // Verified badge
    if (testimonial.isVerifiedBuyer) {
      const verified = createElement('div', 'testimonial-card__verified');
      verified.appendChild(createSVGUse('icon-check'));
      const verifiedText = createElement('span', undefined, 'Verified Buyer');
      verified.appendChild(verifiedText);
      card.appendChild(verified);
    }

    // Quote
    const quote = createElement('blockquote', 'testimonial-card__quote');
    quote.setAttribute('itemprop', 'reviewBody');
    quote.textContent = `"${testimonial.quote}"`;
    card.appendChild(quote);

    // Property info
    const propertyInfo = createElement('div', 'testimonial-card__property');
    propertyInfo.textContent = `${testimonial.propertyType} Purchase (${testimonial.purchaseYear})`;
    card.appendChild(propertyInfo);

    // Author
    const author = createElement('div', 'testimonial-card__author');
    author.setAttribute('itemprop', 'author');
    author.setAttribute('itemscope', '');
    author.setAttribute('itemtype', 'https://schema.org/Person');

    const avatar = createElement('img', 'testimonial-card__avatar');
    avatar.src = testimonial.image;
    avatar.alt = testimonial.name;
    avatar.loading = 'lazy';
    avatar.setAttribute('itemprop', 'image');
    author.appendChild(avatar);

    const authorInfo = createElement('div', 'testimonial-card__author-info');
    const name = createElement('span', 'testimonial-card__name');
    name.setAttribute('itemprop', 'name');
    name.textContent = testimonial.name;
    authorInfo.appendChild(name);
    const role = createElement('span', 'testimonial-card__role', testimonial.role);
    authorInfo.appendChild(role);
    const location = createElement('span', 'testimonial-card__location', testimonial.location);
    authorInfo.appendChild(location);
    author.appendChild(authorInfo);

    card.appendChild(author);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Case Studies Section ────────────────────────────────────────────────────

function createCaseStudiesSection(): HTMLElement {
  const section = createElement('section', 'about-case-studies');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Success ';
  const em = createElement('em', undefined, 'Stories');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Real results for real clients');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-case-studies__grid');

  caseStudies.slice(0, 3).forEach(cs => {
    const card = createElement('article', 'case-study-card');

    const imageWrap = createElement('div', 'case-study-card__image');
    const img = createElement('img');
    img.src = cs.image;
    img.alt = cs.title;
    img.loading = 'lazy';
    imageWrap.appendChild(img);
    card.appendChild(imageWrap);

    const content = createElement('div', 'case-study-card__content');

    const type = createElement('span', 'case-study-card__type', cs.clientType);
    content.appendChild(type);

    const title = createElement('h3', 'case-study-card__title', cs.title);
    content.appendChild(title);

    const challenge = createElement('div', 'case-study-card__section');
    const challengeLabel = createElement('span', 'case-study-card__label', 'Challenge:');
    challenge.appendChild(challengeLabel);
    const challengeText = createElement('p', undefined, cs.challenge);
    challenge.appendChild(challengeText);
    content.appendChild(challenge);

    const outcome = createElement('div', 'case-study-card__section');
    const outcomeLabel = createElement('span', 'case-study-card__label', 'Outcome:');
    outcome.appendChild(outcomeLabel);
    const outcomeText = createElement('p', undefined, cs.outcome);
    outcome.appendChild(outcomeText);
    content.appendChild(outcome);

    // Metrics
    const metrics = createElement('div', 'case-study-card__metrics');
    cs.metrics.forEach(metric => {
      const metricEl = createElement('div', 'case-study-card__metric');
      const metricValue = createElement('span', 'case-study-card__metric-value', metric.value);
      metricEl.appendChild(metricValue);
      const metricLabel = createElement('span', 'case-study-card__metric-label', metric.label);
      metricEl.appendChild(metricLabel);
      metrics.appendChild(metricEl);
    });
    content.appendChild(metrics);

    // Quote
    const quote = createElement('blockquote', 'case-study-card__quote');
    quote.textContent = `"${cs.testimonialQuote}"`;
    content.appendChild(quote);

    const clientName = createElement('cite', 'case-study-card__client', `- ${cs.clientName}${cs.clientRole ? ', ' + cs.clientRole : ''}`);
    content.appendChild(clientName);

    card.appendChild(content);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Resources Section ───────────────────────────────────────────────────────

function createResourcesSection(): HTMLElement {
  const section = createElement('section', 'about-resources');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Resource ';
  const em = createElement('em', undefined, 'Center');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Free guides, reports, and tools for buyers and investors');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-resources__grid');

  getFeaturedResources().slice(0, 4).forEach(resource => {
    const card = createElement('article', 'resource-card');

    const imageWrap = createElement('div', 'resource-card__image');
    const img = createElement('img');
    img.src = resource.coverImage;
    img.alt = resource.title;
    img.loading = 'lazy';
    imageWrap.appendChild(img);

    const typeBadge = createElement('span', 'resource-card__type', resource.type.toUpperCase());
    imageWrap.appendChild(typeBadge);
    card.appendChild(imageWrap);

    const content = createElement('div', 'resource-card__content');

    const title = createElement('h3', 'resource-card__title', resource.title);
    content.appendChild(title);

    const desc = createElement('p', 'resource-card__desc', resource.description);
    content.appendChild(desc);

    const meta = createElement('div', 'resource-card__meta');
    const pages = createElement('span', undefined, `${resource.pageCount} pages`);
    meta.appendChild(pages);
    const updated = createElement('span', undefined, `Updated ${new Date(resource.lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`);
    meta.appendChild(updated);
    content.appendChild(meta);

    const downloadBtn = createElement('a', 'btn btn--primary btn--sm resource-card__download', 'Download Free');
    downloadBtn.href = resource.downloadUrl;
    downloadBtn.setAttribute('download', '');
    content.appendChild(downloadBtn);

    card.appendChild(content);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Contact Section ─────────────────────────────────────────────────────────

function createContactSection(): HTMLElement {
  const section = createElement('section', 'about-contact');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Contact ';
  const em = createElement('em', undefined, 'Us');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'We are here to help - reach us through your preferred channel');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'about-contact__grid');

  // Office Info
  const officeCard = createElement('div', 'about-contact__office');
  const office = getMainOffice();

  const officeTitle = createElement('h3', undefined, office.name);
  officeCard.appendChild(officeTitle);

  const address = createElement('address', 'about-contact__address');
  const addressLine1 = createElement('span', undefined, office.address.street);
  address.appendChild(addressLine1);
  address.appendChild(createElement('br'));
  const addressLine2 = createElement('span', undefined, `${office.address.district}, ${office.address.city}`);
  address.appendChild(addressLine2);
  address.appendChild(createElement('br'));
  const addressLine3 = createElement('span', undefined, `${office.address.region}, ${office.address.country}`);
  address.appendChild(addressLine3);
  officeCard.appendChild(address);

  // Map placeholder
  const mapWrap = createElement('div', 'about-contact__map');
  const mapLink = createElement('a', 'about-contact__map-link');
  mapLink.href = office.googleMapsUrl;
  mapLink.target = '_blank';
  mapLink.rel = 'noopener noreferrer';
  const mapPlaceholder = createElement('div', 'about-contact__map-placeholder');
  mapPlaceholder.appendChild(createSVGUse('icon-location'));
  const mapText = createElement('span', undefined, 'View on Google Maps');
  mapPlaceholder.appendChild(mapText);
  mapLink.appendChild(mapPlaceholder);
  mapWrap.appendChild(mapLink);
  officeCard.appendChild(mapWrap);

  // Office hours
  const hours = createElement('div', 'about-contact__hours');
  const hoursTitle = createElement('h4', undefined, 'Office Hours');
  hours.appendChild(hoursTitle);
  const hoursList = createElement('ul');
  const satThu = createElement('li');
  const satThuLabel = createElement('strong', undefined, 'Sat - Thu: ');
  satThu.appendChild(satThuLabel);
  satThu.appendChild(document.createTextNode(office.hours.saturday));
  hoursList.appendChild(satThu);
  const fri = createElement('li');
  const friLabel = createElement('strong', undefined, 'Friday: ');
  fri.appendChild(friLabel);
  fri.appendChild(document.createTextNode(office.hours.friday));
  hoursList.appendChild(fri);
  hours.appendChild(hoursList);
  officeCard.appendChild(hours);

  grid.appendChild(officeCard);

  // Contact Methods
  const methodsCard = createElement('div', 'about-contact__methods');

  const methodsTitle = createElement('h3', undefined, 'Get in Touch');
  methodsCard.appendChild(methodsTitle);

  const methodsList = createElement('div', 'about-contact__methods-list');

  contactMethods.slice(0, 5).forEach(method => {
    const methodEl = createElement('a', 'about-contact__method');
    if (method.type === 'phone') {
      methodEl.href = `tel:${method.value.replace(/\s/g, '')}`;
    } else if (method.type === 'email') {
      methodEl.href = `mailto:${method.value}`;
    } else if (method.type === 'whatsapp') {
      methodEl.href = `https://wa.me/${method.value.replace(/\s/g, '').replace('+', '')}`;
      methodEl.target = '_blank';
    }

    const iconWrap = createElement('div', 'about-contact__method-icon');
    iconWrap.appendChild(createSVGUse(method.icon));
    methodEl.appendChild(iconWrap);

    const methodInfo = createElement('div', 'about-contact__method-info');
    const methodLabel = createElement('span', 'about-contact__method-label', method.label);
    methodInfo.appendChild(methodLabel);
    const methodValue = createElement('span', 'about-contact__method-value', method.value);
    methodInfo.appendChild(methodValue);
    if (method.responseTime) {
      const response = createElement('span', 'about-contact__method-response', `Response: ${method.responseTime}`);
      methodInfo.appendChild(response);
    }
    methodEl.appendChild(methodInfo);

    methodsList.appendChild(methodEl);
  });

  methodsCard.appendChild(methodsList);

  // Social links
  const socialCard = createElement('div', 'about-contact__social');
  const socialTitle = createElement('h4', undefined, 'Follow Us');
  socialCard.appendChild(socialTitle);

  const socialList = createElement('div', 'about-contact__social-list');
  socialLinks.forEach(social => {
    const link = createElement('a', 'about-contact__social-link');
    link.href = social.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.title = social.platform;
    link.appendChild(createSVGUse(social.icon));
    socialList.appendChild(link);
  });
  socialCard.appendChild(socialList);
  methodsCard.appendChild(socialCard);

  grid.appendChild(methodsCard);

  // Response Commitments
  const responseCard = createElement('div', 'about-contact__response');
  const responseTitle = createElement('h3', undefined, 'Our Response Commitment');
  responseCard.appendChild(responseTitle);

  const responseList = createElement('div', 'about-contact__response-list');
  responseCommitments.slice(0, 4).forEach(commitment => {
    const item = createElement('div', 'about-contact__response-item');

    const iconWrap = createElement('div', 'about-contact__response-icon');
    iconWrap.appendChild(createSVGUse(commitment.icon));
    item.appendChild(iconWrap);

    const info = createElement('div', 'about-contact__response-info');
    const channel = createElement('span', 'about-contact__response-channel', commitment.channel);
    info.appendChild(channel);
    const time = createElement('span', 'about-contact__response-time', commitment.responseTime);
    info.appendChild(time);
    item.appendChild(info);

    responseList.appendChild(item);
  });
  responseCard.appendChild(responseList);

  grid.appendChild(responseCard);

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function createCTASection(): HTMLElement {
  const section = createElement('section', 'about-cta');
  const container = createElement('div', 'container');

  const content = createElement('div', 'about-cta__content');

  const title = createElement('h2', 'about-cta__title');
  title.textContent = 'Ready to Find Your ';
  const em = createElement('em', undefined, 'Dream Property');
  title.appendChild(em);
  title.appendChild(document.createTextNode('?'));
  content.appendChild(title);

  const subtitle = createElement('p', 'about-cta__subtitle', 'Let our expert team guide you through your real estate journey in Kurdistan');
  content.appendChild(subtitle);

  const buttons = createElement('div', 'about-cta__buttons');

  const primaryBtn = createElement('a', 'btn btn--primary btn--lg', 'Browse Properties');
  primaryBtn.href = '/properties';
  primaryBtn.setAttribute('data-route', '');
  buttons.appendChild(primaryBtn);

  const secondaryBtn = createElement('a', 'btn btn--outline btn--lg', 'Our Services');
  secondaryBtn.href = '/services';
  secondaryBtn.setAttribute('data-route', '');
  buttons.appendChild(secondaryBtn);

  content.appendChild(buttons);

  // Internal Links Section for SEO
  const internalLinks = createElement('div', 'about-cta__services');
  const servicesTitle = createElement('p', 'about-cta__services-label', 'Our Professional Services:');
  internalLinks.appendChild(servicesTitle);

  const servicesLinks = createElement('div', 'about-cta__services-links');
  const servicePages = [
    { href: '/services/property-sales', text: 'Sell Property' },
    { href: '/services/property-buying', text: 'Buy Property' },
    { href: '/services/property-valuation', text: 'Free Valuation' },
    { href: '/services/property-management', text: 'Property Management' },
    { href: '/services/investment-consulting', text: 'Investment Consulting' },
    { href: '/services/legal-assistance', text: 'Legal Assistance' }
  ];

  servicePages.forEach(({ href, text }) => {
    const link = createElement('a', 'about-cta__service-link', text);
    link.href = href;
    link.setAttribute('data-route', '');
    servicesLinks.appendChild(link);
  });

  internalLinks.appendChild(servicesLinks);
  content.appendChild(internalLinks);
  container.appendChild(content);
  section.appendChild(container);

  return section;
}

// ─── Schema Generation ───────────────────────────────────────────────────────

function generateOrganizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Real House',
    'alternateName': 'Real House Erbil',
    'foundingDate': companyHistory.foundedYear.toString(),
    'description': companyHistory.mission,
    'url': 'https://realhouseiq.com',
    'logo': 'https://realhouseiq.com/logo.svg',
    'image': 'https://realhouseiq.com/office.jpg',
    'telephone': ['+964 750 792 2138', '+964 751 441 5003'],
    'email': 'info@realhouseiq.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Dream City Main Boulevard, Building A3',
      'addressLocality': 'Erbil',
      'addressRegion': 'Kurdistan Region',
      'postalCode': '44001',
      'addressCountry': 'IQ'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '36.1901',
      'longitude': '44.0091'
    },
    'numberOfEmployees': companyStats.teamMembers,
    'slogan': 'Redefining Luxury Real Estate in Kurdistan',
    'award': awards.map(a => a.title),
    'knowsLanguage': companyStats.languages,
    'memberOf': affiliations.map(aff => ({
      '@type': 'Organization',
      'name': aff.name
    })),
    'founder': teamMembers.filter(m => m.isFounder).map(founder => ({
      '@type': 'Person',
      'name': founder.name,
      'jobTitle': founder.title,
      'image': founder.image
    })),
    'employee': teamMembers.map(member => ({
      '@type': 'Person',
      'name': member.name,
      'jobTitle': member.title
    })),
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': companyStats.totalTransactions.toString(),
      'bestRating': '5',
      'worstRating': '1'
    },
    'sameAs': socialLinks.map(s => s.url)
  };
}
