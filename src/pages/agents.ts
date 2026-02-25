// ═══════════════════════════════════════════════════════════════════════════
// Agents Directory Page
// /agents - All agents listing with filtering and sorting
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
// Agent Card Component
// ═══════════════════════════════════════════════════════════════════════════

function createAgentCard(agent: Agent): HTMLElement {
  const card = createElement('article', 'agent-card');
  card.setAttribute('data-id', agent.id);
  card.setAttribute('data-specialization', agent.specialization);
  card.setAttribute('data-experience', agent.yearsExperience.toString());
  card.setAttribute('data-sales', agent.propertiesSold.toString());

  // Image Section
  const imageWrapper = createElement('div', 'agent-card__image-wrapper');
  const image = createElement('img', 'agent-card__image');
  image.src = agent.image;
  image.alt = `${agent.name} - ${agent.role} at Real House`;
  image.loading = 'lazy';
  imageWrapper.appendChild(image);

  // Leadership badge
  if (agent.isLeadership) {
    const badge = createElement('span', 'agent-card__badge', t('agentsPage.leadership'));
    imageWrapper.appendChild(badge);
  }

  card.appendChild(imageWrapper);

  // Content Section
  const content = createElement('div', 'agent-card__content');

  const name = createElement('h3', 'agent-card__name', agent.name);
  content.appendChild(name);

  const role = createElement('p', 'agent-card__role', agent.role);
  content.appendChild(role);

  const specialization = createElement('p', 'agent-card__specialization');
  specialization.appendChild(createSVGUse('icon-check'));
  specialization.appendChild(document.createTextNode(agent.specialization));
  content.appendChild(specialization);

  // Stats Row
  const stats = createElement('div', 'agent-card__stats');

  const expStat = createElement('div', 'agent-card__stat');
  const expValue = createElement('span', 'agent-card__stat-value', `${agent.yearsExperience}+`);
  const expLabel = createElement('span', 'agent-card__stat-label', t('agentsPage.yearsExp'));
  expStat.appendChild(expValue);
  expStat.appendChild(expLabel);
  stats.appendChild(expStat);

  const salesStat = createElement('div', 'agent-card__stat');
  const salesValue = createElement('span', 'agent-card__stat-value', agent.propertiesSold.toString());
  const salesLabel = createElement('span', 'agent-card__stat-label', t('agentsPage.propertiesSold'));
  salesStat.appendChild(salesValue);
  salesStat.appendChild(salesLabel);
  stats.appendChild(salesStat);

  const langStat = createElement('div', 'agent-card__stat');
  const langValue = createElement('span', 'agent-card__stat-value', agent.languages.length.toString());
  const langLabel = createElement('span', 'agent-card__stat-label', t('agentsPage.languages'));
  langStat.appendChild(langValue);
  langStat.appendChild(langLabel);
  stats.appendChild(langStat);

  content.appendChild(stats);

  // Languages
  const languages = createElement('div', 'agent-card__languages');
  agent.languages.slice(0, 3).forEach(lang => {
    const tag = createElement('span', 'agent-card__lang-tag', lang);
    languages.appendChild(tag);
  });
  if (agent.languages.length > 3) {
    const more = createElement('span', 'agent-card__lang-more', `+${agent.languages.length - 3}`);
    languages.appendChild(more);
  }
  content.appendChild(languages);

  card.appendChild(content);

  // Footer with actions
  const footer = createElement('div', 'agent-card__footer');

  const viewBtn = createElement('a', 'btn btn--primary', t('agentsPage.viewProfile'));
  viewBtn.href = `/agents/${agent.slug}`;
  viewBtn.setAttribute('data-route', '');
  footer.appendChild(viewBtn);

  const contactBtn = createElement('a', 'btn btn--ghost agent-card__whatsapp');
  contactBtn.href = `https://wa.me/${agent.whatsapp}`;
  contactBtn.target = '_blank';
  contactBtn.rel = 'noopener noreferrer';
  contactBtn.appendChild(createSVGUse('icon-whatsapp'));
  footer.appendChild(contactBtn);

  card.appendChild(footer);

  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// Filter/Sort Controls
// ═══════════════════════════════════════════════════════════════════════════

function createFilterControls(): HTMLElement {
  const controls = createElement('div', 'agents-page__controls');

  // Specialization filter
  const filterGroup = createElement('div', 'agents-page__filter-group');

  const filterLabel = createElement('label', 'agents-page__filter-label', t('agentsPage.specialization'));
  filterLabel.setAttribute('for', 'agent-filter');
  filterGroup.appendChild(filterLabel);

  const filterSelect = createElement('select', 'agents-page__filter-select');
  filterSelect.id = 'agent-filter';

  const specializations = [
    { value: '', label: t('agentsPage.allSpecializations') },
    { value: 'luxury', label: t('agentsPage.luxuryVillas') },
    { value: 'investment', label: t('agentsPage.investment') },
    { value: 'commercial', label: t('agentsPage.commercial') },
    { value: 'penthouse', label: t('agentsPage.penthousesApartments') },
    { value: 'new-development', label: t('agentsPage.newDevelopments') }
  ];

  specializations.forEach(spec => {
    const option = createElement('option', undefined, spec.label);
    option.value = spec.value;
    filterSelect.appendChild(option);
  });

  filterGroup.appendChild(filterSelect);
  controls.appendChild(filterGroup);

  // Sort control
  const sortGroup = createElement('div', 'agents-page__filter-group');

  const sortLabel = createElement('label', 'agents-page__filter-label', t('agentsPage.sortBy'));
  sortLabel.setAttribute('for', 'agent-sort');
  sortGroup.appendChild(sortLabel);

  const sortSelect = createElement('select', 'agents-page__filter-select');
  sortSelect.id = 'agent-sort';

  const sortOptions = [
    { value: 'experience', label: t('agentsPage.experienceHighToLow') },
    { value: 'sales', label: t('agentsPage.propertiesSoldSort') },
    { value: 'name', label: t('agentsPage.nameAZ') }
  ];

  sortOptions.forEach(opt => {
    const option = createElement('option', undefined, opt.label);
    option.value = opt.value;
    sortSelect.appendChild(option);
  });

  sortGroup.appendChild(sortSelect);
  controls.appendChild(sortGroup);

  return controls;
}

// ═══════════════════════════════════════════════════════════════════════════
// Filter/Sort Logic
// ═══════════════════════════════════════════════════════════════════════════

function initFilterSort(grid: HTMLElement): void {
  const filterSelect = document.getElementById('agent-filter') as HTMLSelectElement;
  const sortSelect = document.getElementById('agent-sort') as HTMLSelectElement;

  if (!filterSelect || !sortSelect) return;

  const filterAndSort = () => {
    const filterValue = filterSelect.value.toLowerCase();
    const sortValue = sortSelect.value;
    const cards = Array.from(grid.querySelectorAll('.agent-card')) as HTMLElement[];

    // Filter
    cards.forEach(card => {
      const spec = (card.dataset.specialization || '').toLowerCase();
      if (!filterValue || spec.includes(filterValue)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    // Sort visible cards
    const visibleCards = cards.filter(c => c.style.display !== 'none');

    visibleCards.sort((a, b) => {
      if (sortValue === 'experience') {
        return parseInt(b.dataset.experience || '0') - parseInt(a.dataset.experience || '0');
      } else if (sortValue === 'sales') {
        return parseInt(b.dataset.sales || '0') - parseInt(a.dataset.sales || '0');
      } else {
        const nameA = a.querySelector('.agent-card__name')?.textContent || '';
        const nameB = b.querySelector('.agent-card__name')?.textContent || '';
        return nameA.localeCompare(nameB);
      }
    });

    // Re-append in sorted order
    visibleCards.forEach(card => grid.appendChild(card));
  };

  filterSelect.addEventListener('change', filterAndSort);
  sortSelect.addEventListener('change', filterAndSort);
}

// ═══════════════════════════════════════════════════════════════════════════
// Agents Listing Page
// ═══════════════════════════════════════════════════════════════════════════

export function renderAgentsPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const breadcrumbs = getAgentsBreadcrumbs();
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'agents-page');
  const container = createElement('div', 'container');

  // Breadcrumbs
  container.appendChild(createBreadcrumbs(breadcrumbs));

  // Header Section
  const header = createElement('header', 'agents-page__header');
  const title = createElement('h1', 'agents-page__title', t('agentsPage.title'));
  header.appendChild(title);

  const subtitle = createElement('p', 'agents-page__subtitle');
  subtitle.textContent = t('agentsPage.subtitle');
  header.appendChild(subtitle);

  container.appendChild(header);

  // Stats Section
  const stats = getAgentStats();
  const statsSection = createElement('div', 'agents-page__stats');

  const statItems = [
    { value: `${stats.totalAgents}`, label: t('agentsPage.expertAgents') },
    { value: `${stats.totalSales}+`, label: t('agentsPage.propertiesSold') },
    { value: formatSalesVolume(stats.totalVolume), label: t('agentsPage.totalSales') },
    { value: `${stats.avgExperience}+`, label: t('agentsPage.avgYearsExperience') }
  ];

  statItems.forEach(stat => {
    const statCard = createElement('div', 'agents-page__stat-card');
    const statValue = createElement('span', 'agents-page__stat-value', stat.value);
    const statLabel = createElement('span', 'agents-page__stat-label', stat.label);
    statCard.appendChild(statValue);
    statCard.appendChild(statLabel);
    statsSection.appendChild(statCard);
  });

  container.appendChild(statsSection);

  // Filter/Sort Controls
  container.appendChild(createFilterControls());

  // Leadership Team Section
  const leadershipAgents = agents.filter(a => a.isLeadership);
  if (leadershipAgents.length > 0) {
    const leadershipSection = createElement('section', 'agents-page__section');
    const leadershipTitle = createElement('h2', 'agents-page__section-title', t('agentsPage.leadershipTeam'));
    leadershipSection.appendChild(leadershipTitle);

    const leadershipGrid = createElement('div', 'agents-page__grid agents-page__grid--leadership');
    leadershipAgents.forEach(agent => {
      leadershipGrid.appendChild(createAgentCard(agent));
    });
    leadershipSection.appendChild(leadershipGrid);

    container.appendChild(leadershipSection);
  }

  // All Agents Grid
  const agentsSection = createElement('section', 'agents-page__section');
  const agentsTitle = createElement('h2', 'agents-page__section-title', t('agentsPage.propertyConsultants'));
  agentsSection.appendChild(agentsTitle);

  const grid = createElement('div', 'agents-page__grid');
  grid.id = 'agents-grid';

  const salesAgents = agents.filter(a => !a.isLeadership);
  salesAgents.forEach(agent => {
    grid.appendChild(createAgentCard(agent));
  });

  agentsSection.appendChild(grid);
  container.appendChild(agentsSection);

  // CTA Section
  const cta = createElement('section', 'agents-page__cta');
  const ctaContent = createElement('div', 'agents-page__cta-content');

  const ctaTitle = createElement('h2', 'agents-page__cta-title', t('agentsPage.ctaTitle'));
  ctaContent.appendChild(ctaTitle);

  const ctaText = createElement('p', 'agents-page__cta-text');
  ctaText.textContent = t('agentsPage.ctaText');
  ctaContent.appendChild(ctaText);

  const ctaActions = createElement('div', 'agents-page__cta-actions');

  const contactBtn = createElement('a', 'btn btn--primary btn--lg', t('common.contactUs'));
  contactBtn.href = '/contact';
  contactBtn.setAttribute('data-route', '');
  ctaActions.appendChild(contactBtn);

  const propertiesBtn = createElement('a', 'btn btn--ghost btn--lg', t('projectsPage.browseProperties'));
  propertiesBtn.href = '/properties';
  propertiesBtn.setAttribute('data-route', '');
  ctaActions.appendChild(propertiesBtn);

  ctaContent.appendChild(ctaActions);
  cta.appendChild(ctaContent);
  container.appendChild(cta);

  page.appendChild(container);
  fragment.appendChild(page);

  // Initialize filter/sort after DOM is ready
  setTimeout(() => {
    const gridEl = document.getElementById('agents-grid');
    if (gridEl) initFilterSort(gridEl);
  }, 100);

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

  // Inject agents list schema
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
