// ═══════════════════════════════════════════════════════════════════════════
// Agents Directory Page - Editorial Premium Redesign
// /agents - Hero showcase for our property consultants
// ═══════════════════════════════════════════════════════════════════════════

import {
  agents,
  getAgentStats,
  formatSalesVolume,
  type Agent
} from '../data/agents';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema
} from '../components/internal-linking';
import { t } from '../i18n';

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

// ─── Breadcrumb Helpers ─────────────────────────────────────────────────────
function getAgentsBreadcrumbs() {
  return [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('agentsPage.breadcrumbAgents'), url: '/agents' }
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// Agent Hero Card - Editorial layout, large + cinematic
// ═══════════════════════════════════════════════════════════════════════════

function createAgentHeroCard(agent: Agent, index: number): HTMLElement {
  const card = createElement('article', 'agent-hero-card');
  card.setAttribute('data-id', agent.id);
  card.setAttribute('data-index', String(index + 1).padStart(2, '0'));
  card.style.setProperty('--card-delay', `${index * 120}ms`);

  // ── Portrait Column ──
  const portrait = createElement('div', 'agent-hero-card__portrait');

  const portraitFrame = createElement('div', 'agent-hero-card__portrait-frame');
  const portraitImage = createElement('img', 'agent-hero-card__image') as HTMLImageElement;
  portraitImage.src = agent.image;
  portraitImage.alt = `${agent.name}, ${agent.role} at Real House`;
  portraitImage.width = 600;
  portraitImage.height = 800;
  portraitImage.loading = index === 0 ? 'eager' : 'lazy';
  portraitFrame.appendChild(portraitImage);

  const portraitOverlay = createElement('div', 'agent-hero-card__portrait-overlay');
  portraitFrame.appendChild(portraitOverlay);

  // Index numeral (editorial accent)
  const indexNum = createElement('span', 'agent-hero-card__index');
  indexNum.textContent = String(index + 1).padStart(2, '0');
  portraitFrame.appendChild(indexNum);

  portrait.appendChild(portraitFrame);
  card.appendChild(portrait);

  // ── Body Column ──
  const body = createElement('div', 'agent-hero-card__body');

  const eyebrow = createElement('span', 'agent-hero-card__eyebrow', agent.role);
  body.appendChild(eyebrow);

  const name = createElement('h3', 'agent-hero-card__name', agent.name);
  body.appendChild(name);

  const tagline = createElement('p', 'agent-hero-card__tagline', agent.bio);
  body.appendChild(tagline);

  // Specializations as gold pills
  const specs = createElement('div', 'agent-hero-card__specs');
  agent.specializations.slice(0, 4).forEach(spec => {
    const pill = createElement('span', 'agent-hero-card__spec-pill', spec);
    specs.appendChild(pill);
  });
  body.appendChild(specs);

  // Stats row - large editorial numerals
  const stats = createElement('div', 'agent-hero-card__stats');
  const statItems = [
    { value: agent.propertiesSold.toString(), label: t('agentsPage.propertiesSold') },
    { value: `${agent.yearsExperience}+`, label: t('agentsPage.yearsExp') },
    { value: agent.languages.length.toString(), label: t('agentsPage.languages') }
  ];
  statItems.forEach(stat => {
    const item = createElement('div', 'agent-hero-card__stat');
    const value = createElement('span', 'agent-hero-card__stat-value', stat.value);
    const label = createElement('span', 'agent-hero-card__stat-label', stat.label);
    item.appendChild(value);
    item.appendChild(label);
    stats.appendChild(item);
  });
  body.appendChild(stats);

  // Languages row
  const langs = createElement('div', 'agent-hero-card__langs');
  const langLabel = createElement('span', 'agent-hero-card__langs-label', 'Speaks');
  langs.appendChild(langLabel);
  agent.languages.forEach(lang => {
    const tag = createElement('span', 'agent-hero-card__lang', lang);
    langs.appendChild(tag);
  });
  body.appendChild(langs);

  // Actions row
  const actions = createElement('div', 'agent-hero-card__actions');

  const profileBtn = createElement('a', 'agent-hero-card__action agent-hero-card__action--primary');
  profileBtn.href = `/agents/${agent.slug}`;
  profileBtn.setAttribute('data-route', '');
  profileBtn.appendChild(document.createTextNode(t('agentsPage.viewProfile')));
  profileBtn.appendChild(createSVGUse('icon-arrow-right'));
  actions.appendChild(profileBtn);

  const whatsappBtn = createElement('a', 'agent-hero-card__action agent-hero-card__action--whatsapp');
  whatsappBtn.href = `https://wa.me/${agent.whatsapp}`;
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.appendChild(createSVGUse('icon-whatsapp'));
  whatsappBtn.appendChild(document.createTextNode('WhatsApp'));
  actions.appendChild(whatsappBtn);

  const callBtn = createElement('a', 'agent-hero-card__action agent-hero-card__action--call');
  callBtn.href = `tel:${agent.phone.replace(/\s/g, '')}`;
  callBtn.appendChild(createSVGUse('icon-phone'));
  callBtn.appendChild(document.createTextNode('Call'));
  actions.appendChild(callBtn);

  body.appendChild(actions);

  card.appendChild(body);

  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// Combined Testimonials From All Agents
// ═══════════════════════════════════════════════════════════════════════════

function buildClientTestimonials(): HTMLElement {
  const section = createElement('section', 'agents-page__voices');

  const header = createElement('div', 'agents-page__voices-header');
  const eyebrow = createElement('span', 'agents-page__voices-eyebrow', 'Client Voices');
  header.appendChild(eyebrow);
  const title = createElement('h2', 'agents-page__voices-title', 'What Our Clients Say');
  header.appendChild(title);
  const sub = createElement('p', 'agents-page__voices-sub', 'Real stories from the people who trusted us to find their next home or investment.');
  header.appendChild(sub);
  section.appendChild(header);

  // Pull 1 testimonial per agent (max 4)
  const grid = createElement('div', 'agents-page__voices-grid');

  agents.forEach((agent, agentIndex) => {
    agent.testimonials.slice(0, 2).forEach((testimonial, tIndex) => {
      const card = createElement('figure', 'voice-card');
      card.style.setProperty('--voice-delay', `${(agentIndex * 2 + tIndex) * 100}ms`);

      const quoteMark = createElement('span', 'voice-card__quote-mark', '“');
      card.appendChild(quoteMark);

      const stars = createElement('div', 'voice-card__stars');
      for (let i = 0; i < testimonial.rating; i++) {
        const star = createElement('span', 'voice-card__star', '★');
        stars.appendChild(star);
      }
      card.appendChild(stars);

      const text = createElement('blockquote', 'voice-card__text', testimonial.text);
      card.appendChild(text);

      const footer = createElement('figcaption', 'voice-card__footer');
      const clientInfo = createElement('div', 'voice-card__client');
      const clientName = createElement('span', 'voice-card__name', testimonial.clientName);
      const clientLoc = createElement('span', 'voice-card__loc', testimonial.clientLocation);
      clientInfo.appendChild(clientName);
      clientInfo.appendChild(clientLoc);
      footer.appendChild(clientInfo);

      const agentTag = createElement('a', 'voice-card__agent');
      agentTag.href = `/agents/${agent.slug}`;
      agentTag.setAttribute('data-route', '');
      const agentTagLabel = createElement('span', 'voice-card__agent-label', 'via');
      const agentTagName = createElement('span', 'voice-card__agent-name', agent.name);
      agentTag.appendChild(agentTagLabel);
      agentTag.appendChild(agentTagName);
      footer.appendChild(agentTag);

      card.appendChild(footer);
      grid.appendChild(card);
    });
  });

  section.appendChild(grid);
  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// Agents Listing Page
// ═══════════════════════════════════════════════════════════════════════════

export function renderAgentsPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getAgentsBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'agents-page');

  // ── Cinematic Hero ──
  const hero = createElement('section', 'agents-page__hero');
  const heroContainer = createElement('div', 'container');
  heroContainer.appendChild(createBreadcrumbs(breadcrumbs));

  const heroInner = createElement('div', 'agents-page__hero-inner');

  const heroEyebrow = createElement('div', 'agents-page__hero-eyebrow');
  const heroEyebrowLine = createElement('span', 'agents-page__hero-eyebrow-line');
  const heroEyebrowText = createElement('span', 'agents-page__hero-eyebrow-text', 'Our People');
  heroEyebrow.appendChild(heroEyebrowLine);
  heroEyebrow.appendChild(heroEyebrowText);
  heroInner.appendChild(heroEyebrow);

  const heroTitle = createElement('h1', 'agents-page__hero-title');
  const heroTitleLine1 = createElement('span', 'agents-page__hero-title-line', 'Meet Our');
  const heroTitleLine2 = createElement('span', 'agents-page__hero-title-line agents-page__hero-title-line--accent', 'Property Experts');
  heroTitle.appendChild(heroTitleLine1);
  heroTitle.appendChild(heroTitleLine2);
  heroInner.appendChild(heroTitle);

  const heroSubtitle = createElement('p', 'agents-page__hero-subtitle',
    "A small, deliberately curated team. Two senior consultants. A combined fifteen years inside Kurdistan's luxury and investment property market. Personally accountable to every client they take on.");
  heroInner.appendChild(heroSubtitle);

  // Hero stats inline (trust signal)
  const stats = getAgentStats();
  const heroStats = createElement('div', 'agents-page__hero-stats');
  const heroStatsItems = [
    { value: `${stats.totalSales}+`, label: 'Properties Closed' },
    { value: formatSalesVolume(stats.totalVolume), label: 'In Total Sales' },
    { value: `${stats.avgExperience}+`, label: 'Years Avg Experience' },
    { value: '4.9', label: 'Client Rating' }
  ];
  heroStatsItems.forEach((stat, i) => {
    const item = createElement('div', 'agents-page__hero-stat');
    item.style.setProperty('--stat-delay', `${i * 80}ms`);
    const value = createElement('span', 'agents-page__hero-stat-value', stat.value);
    const label = createElement('span', 'agents-page__hero-stat-label', stat.label);
    item.appendChild(value);
    item.appendChild(label);
    heroStats.appendChild(item);
  });
  heroInner.appendChild(heroStats);

  heroContainer.appendChild(heroInner);
  hero.appendChild(heroContainer);

  // Atmospheric background flourishes
  const heroAtmos = createElement('div', 'agents-page__hero-atmos');
  heroAtmos.setAttribute('aria-hidden', 'true');
  hero.appendChild(heroAtmos);

  page.appendChild(hero);

  // ── Hero Agent Cards Section ──
  const consultants = createElement('section', 'agents-page__consultants');
  const consultantsContainer = createElement('div', 'container');

  const consultantsHeader = createElement('div', 'agents-page__consultants-header');
  const consultantsEyebrow = createElement('span', 'agents-page__consultants-eyebrow', 'The Team');
  consultantsHeader.appendChild(consultantsEyebrow);
  const consultantsTitle = createElement('h2', 'agents-page__consultants-title', 'Senior Consultants');
  consultantsHeader.appendChild(consultantsTitle);
  consultantsContainer.appendChild(consultantsHeader);

  const cardsGrid = createElement('div', 'agents-page__cards-grid');
  cardsGrid.id = 'agents-grid';

  agents.forEach((agent, i) => {
    cardsGrid.appendChild(createAgentHeroCard(agent, i));
  });

  consultantsContainer.appendChild(cardsGrid);
  consultants.appendChild(consultantsContainer);
  page.appendChild(consultants);

  // ── Client Voices Section ──
  const voicesContainer = createElement('div', 'container');
  voicesContainer.appendChild(buildClientTestimonials());
  const voicesSection = createElement('section', 'agents-page__voices-wrap');
  voicesSection.appendChild(voicesContainer);
  page.appendChild(voicesSection);

  // ── Trust Stats Row ──
  const trust = createElement('section', 'agents-page__trust');
  const trustContainer = createElement('div', 'container');
  const trustInner = createElement('div', 'agents-page__trust-inner');

  const trustItems = [
    { icon: 'icon-shield', value: '100%', label: 'Licensed & Verified' },
    { icon: 'icon-award', value: '12+', label: 'Industry Awards' },
    { icon: 'icon-users', value: '325+', label: 'Happy Clients' },
    { icon: 'icon-clock', value: '< 2hr', label: 'Avg Response Time' }
  ];
  trustItems.forEach(item => {
    const trustCard = createElement('div', 'agents-page__trust-card');
    const trustIcon = createElement('div', 'agents-page__trust-icon');
    trustIcon.appendChild(createSVGUse(item.icon));
    trustCard.appendChild(trustIcon);
    const trustValue = createElement('span', 'agents-page__trust-value', item.value);
    const trustLabel = createElement('span', 'agents-page__trust-label', item.label);
    trustCard.appendChild(trustValue);
    trustCard.appendChild(trustLabel);
    trustInner.appendChild(trustCard);
  });

  trustContainer.appendChild(trustInner);
  trust.appendChild(trustContainer);
  page.appendChild(trust);

  // ── Join the Team CTA ──
  const cta = createElement('section', 'agents-page__join');
  const ctaContainer = createElement('div', 'container');
  const ctaCard = createElement('div', 'agents-page__join-card');

  const ctaBadge = createElement('span', 'agents-page__join-badge', 'We’re Hiring');
  ctaCard.appendChild(ctaBadge);

  const ctaTitle = createElement('h2', 'agents-page__join-title', 'Want to join the team?');
  ctaCard.appendChild(ctaTitle);

  const ctaText = createElement('p', 'agents-page__join-text',
    'We’re looking for one or two experienced consultants who care about doing this work well. Kurdistan property knowledge, fluency in Kurdish or Arabic, and a track record of closing deals will get our attention.');
  ctaCard.appendChild(ctaText);

  const ctaActions = createElement('div', 'agents-page__join-actions');
  const careersBtn = createElement('a', 'agents-page__join-btn agents-page__join-btn--primary');
  careersBtn.href = '/careers';
  careersBtn.setAttribute('data-route', '');
  careersBtn.appendChild(document.createTextNode('View Open Roles'));
  careersBtn.appendChild(createSVGUse('icon-arrow-right'));
  ctaActions.appendChild(careersBtn);

  const contactBtn = createElement('a', 'agents-page__join-btn agents-page__join-btn--ghost');
  contactBtn.href = '/contact';
  contactBtn.setAttribute('data-route', '');
  contactBtn.textContent = 'Get In Touch';
  ctaActions.appendChild(contactBtn);

  ctaCard.appendChild(ctaActions);
  ctaContainer.appendChild(ctaCard);
  cta.appendChild(ctaContainer);
  page.appendChild(cta);

  fragment.appendChild(page);
  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// SEO Setup
// ═══════════════════════════════════════════════════════════════════════════

export function setupAgentsPageSEO(): void {
  document.title = 'Real Estate Agents Erbil | Expert Property Consultants | Real House';

  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', 'Meet our expert real estate agents in Erbil, Kurdistan. Licensed professionals specializing in luxury villas, apartments, commercial properties, and investment. Contact us today!');
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Real House Real Estate Agents',
    'description': 'Expert real estate agents in Erbil, Kurdistan',
    'numberOfItems': agents.length,
    'itemListElement': agents.map((agent, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Person',
        '@id': `https://realhouseiq.com/agents/${agent.slug}`,
        'name': agent.name,
        'jobTitle': agent.title,
        'image': agent.image,
        'telephone': agent.phone,
        'email': agent.email
      }
    }))
  };

  let script = document.querySelector('script[data-schema="agents-list"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', 'agents-list');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

export { getAgentsBreadcrumbs };
