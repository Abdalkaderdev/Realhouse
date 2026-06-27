// ═══════════════════════════════════════════════════════════════════════════
// Careers Page - Real House Job Opportunities
// Join our team and build your career in real estate
// ═══════════════════════════════════════════════════════════════════════════

import {
  jobListings,
  companyBenefits,
  cultureValues,
  getJobBySlug,
  getActiveJobs,
  getAllDepartments,
  getAllJobTypes,
  formatSalaryRange,
  formatPostedDate,
  isDeadlineSoon,
  generateJobPostingSchema,
  type JobListing,
  type Department,
  type JobType
} from '../data/careers';
import { injectSchema } from '../seo/schema';
import { t } from '../i18n';

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

// ─── Filter State ────────────────────────────────────────────────────────────

let selectedDepartment: Department | 'All' = 'All';
let selectedType: JobType | 'All' = 'All';
let searchQuery = '';

// ─── Careers Page ────────────────────────────────────────────────────────────

export function renderCareersPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('div', 'careers-page');

  // Reset filters
  selectedDepartment = 'All';
  selectedType = 'All';
  searchQuery = '';

  // Inject Organization Employer Schema
  injectSchema(generateEmployerSchema(), 'schema-careers-employer');

  // ═══ Hero Section ═══
  page.appendChild(createHeroSection());

  // ═══ Why Work With Us ═══
  page.appendChild(createWhyWorkSection());

  // ═══ Stats Band ═══
  page.appendChild(createStatsBand());

  // ═══ Current Openings ═══
  page.appendChild(createOpeningsSection());

  // ═══ Company Culture & Photo Grid ═══
  page.appendChild(createCultureSection());

  // ═══ Employee Testimonials ═══
  page.appendChild(createTestimonialsSection());

  // ═══ Internship & Training Programs ═══
  page.appendChild(createProgramsSection());

  // ═══ FAQ Section ═══
  page.appendChild(createFAQSection());

  // ═══ Application CTA (for no openings) ═══
  page.appendChild(createGeneralApplicationSection());

  fragment.appendChild(page);
  return fragment;
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function createHeroSection(): HTMLElement {
  const hero = createElement('section', 'careers-hero');

  // Decorative backdrop layers (cinematic feel)
  const backdrop = createElement('div', 'careers-hero__backdrop');
  const backdropImg = createElement('img', 'careers-hero__backdrop-img');
  backdropImg.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=70&fm=webp';
  backdropImg.alt = '';
  backdropImg.setAttribute('aria-hidden', 'true');
  backdropImg.loading = 'eager';
  backdrop.appendChild(backdropImg);
  hero.appendChild(backdrop);

  const grain = createElement('div', 'careers-hero__grain');
  grain.setAttribute('aria-hidden', 'true');
  hero.appendChild(grain);

  const container = createElement('div', 'container');

  const content = createElement('div', 'careers-hero__content');

  const eyebrow = createElement('div', 'careers-hero__eyebrow');
  const eyebrowLine = createElement('span', 'careers-hero__eyebrow-line');
  eyebrow.appendChild(eyebrowLine);
  const badge = createElement('span', 'careers-hero__badge', t('careersPage.heroBadge'));
  eyebrow.appendChild(badge);
  content.appendChild(eyebrow);

  const title = createElement('h1', 'careers-hero__title');
  const titleLine1 = createElement('span', 'careers-hero__title-line');
  titleLine1.textContent = t('careersPage.heroTitleLine1');
  title.appendChild(titleLine1);
  const titleLine2 = createElement('span', 'careers-hero__title-line');
  const em = createElement('em', undefined, t('careersPage.heroTitleEmphasis'));
  titleLine2.appendChild(em);
  titleLine2.appendChild(document.createTextNode(t('careersPage.heroTitleLine2Suffix')));
  title.appendChild(titleLine2);
  const titleLine3 = createElement('span', 'careers-hero__title-line', t('careersPage.heroTitleLine3'));
  title.appendChild(titleLine3);
  content.appendChild(title);

  const subtitle = createElement('p', 'careers-hero__subtitle',
    t('careersPage.heroSubtitle')
  );
  content.appendChild(subtitle);

  const stats = createElement('div', 'careers-hero__stats');
  const statsData = [
    { value: '25+', label: t('careersPage.heroStatTeamMembers') },
    { value: '+38%', label: t('careersPage.heroStatYoYGrowth') },
    { value: '94%', label: t('careersPage.heroStatSatisfaction') },
    { value: '23', label: t('careersPage.heroStatYearsStrong') }
  ];

  statsData.forEach(stat => {
    const statEl = createElement('div', 'careers-hero__stat');
    const value = createElement('span', 'careers-hero__stat-value', stat.value);
    const label = createElement('span', 'careers-hero__stat-label', stat.label);
    statEl.appendChild(value);
    statEl.appendChild(label);
    stats.appendChild(statEl);
  });

  content.appendChild(stats);

  const cta = createElement('div', 'careers-hero__cta');
  const viewJobsBtn = createElement('a', 'btn btn--primary btn--lg', t('careersPage.viewOpenPositions'));
  viewJobsBtn.href = '#openings';
  cta.appendChild(viewJobsBtn);

  const learnMoreBtn = createElement('a', 'btn btn--outline btn--lg', t('careersPage.learnAboutUs'));
  learnMoreBtn.href = '/about';
  learnMoreBtn.setAttribute('data-route', '');
  cta.appendChild(learnMoreBtn);

  content.appendChild(cta);

  // Scroll indicator
  const scroller = createElement('div', 'careers-hero__scroller');
  scroller.setAttribute('aria-hidden', 'true');
  const scrollerLabel = createElement('span', 'careers-hero__scroller-label', t('careersPage.scrollLabel'));
  scroller.appendChild(scrollerLabel);
  const scrollerLine = createElement('span', 'careers-hero__scroller-line');
  scroller.appendChild(scrollerLine);
  content.appendChild(scroller);

  container.appendChild(content);
  hero.appendChild(container);

  // Marquee strip with departments / values
  const marquee = createElement('div', 'careers-hero__marquee');
  marquee.setAttribute('aria-hidden', 'true');
  const marqueeTrack = createElement('div', 'careers-hero__marquee-track');
  const items = [
    t('careersPage.marqueeSales'), '●',
    t('careersPage.marqueeMarketing'), '●',
    t('careersPage.marqueeOperations'), '●',
    t('careersPage.marqueeItProduct'), '●',
    t('careersPage.marqueeInternship'), '●',
    t('careersPage.marqueeLeadership'), '●'
  ];
  // Duplicate for seamless loop
  [...items, ...items, ...items].forEach(item => {
    const span = createElement('span', 'careers-hero__marquee-item', item);
    marqueeTrack.appendChild(span);
  });
  marquee.appendChild(marqueeTrack);
  hero.appendChild(marquee);

  return hero;
}

// ─── Why Work Section ────────────────────────────────────────────────────────

function createWhyWorkSection(): HTMLElement {
  const section = createElement('section', 'careers-benefits');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = t('careersPage.whyWorkTitlePrefix');
  const em = createElement('em', undefined, t('careersPage.whyWorkTitleEmphasis'));
  headerTitle.appendChild(em);
  headerTitle.appendChild(document.createTextNode(t('careersPage.whyWorkTitleSuffix')));
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', t('careersPage.whyWorkSubtitle'));
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'careers-benefits__grid');

  companyBenefits.forEach(benefit => {
    const card = createElement('div', 'careers-benefits__card');

    const iconWrap = createElement('div', 'careers-benefits__icon');
    iconWrap.appendChild(createSVGUse(benefit.icon));
    card.appendChild(iconWrap);

    const title = createElement('h3', 'careers-benefits__title', benefit.title);
    card.appendChild(title);

    const desc = createElement('p', 'careers-benefits__desc', benefit.description);
    card.appendChild(desc);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// ─── Culture Section ─────────────────────────────────────────────────────────

function createCultureSection(): HTMLElement {
  const section = createElement('section', 'careers-culture');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Our ';
  const em = createElement('em', undefined, 'Culture');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'The values that guide everything we do');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'careers-culture__grid');

  cultureValues.forEach((value, index) => {
    const card = createElement('div', 'careers-culture__card');

    const number = createElement('span', 'careers-culture__number', String(index + 1).padStart(2, '0'));
    card.appendChild(number);

    const title = createElement('h3', 'careers-culture__title', value.title);
    card.appendChild(title);

    const desc = createElement('p', 'careers-culture__desc', value.description);
    card.appendChild(desc);

    grid.appendChild(card);
  });

  container.appendChild(grid);

  // Photo mosaic
  const mosaic = createElement('div', 'careers-culture__mosaic');
  const photos = [
    { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=75&fm=webp', alt: 'Team brainstorm at Real House office', cls: 'careers-culture__photo--lg' },
    { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&q=75&fm=webp', alt: 'Real House client meeting', cls: 'careers-culture__photo--md' },
    { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=75&fm=webp', alt: 'Team strategy session', cls: 'careers-culture__photo--md' },
    { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=75&fm=webp', alt: 'Real House team celebrating', cls: 'careers-culture__photo--sm' },
    { src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=700&q=75&fm=webp', alt: 'Team workshop', cls: 'careers-culture__photo--sm' }
  ];
  photos.forEach(p => {
    const figure = createElement('figure', `careers-culture__photo ${p.cls}`);
    const im = createElement('img');
    im.src = p.src;
    im.alt = p.alt;
    im.loading = 'lazy';
    figure.appendChild(im);
    mosaic.appendChild(figure);
  });
  container.appendChild(mosaic);

  // Team philosophy block
  const teamSection = createElement('div', 'careers-culture__team');
  const teamContent = createElement('div', 'careers-culture__team-content');
  const teamEyebrow = createElement('span', 'careers-culture__team-eyebrow', 'The team');
  teamContent.appendChild(teamEyebrow);
  const teamTitle = createElement('h3', undefined, 'A winning team, not a winner-takes-all one.');
  teamContent.appendChild(teamTitle);
  const teamDesc = createElement('p', undefined,
    'At Real House, we genuinely believe in a collaborative, inclusive workplace where every team member can thrive. Our people come from real estate, marketing, technology, and customer service — and we win when they all win.'
  );
  teamContent.appendChild(teamDesc);
  teamSection.appendChild(teamContent);
  container.appendChild(teamSection);

  section.appendChild(container);

  return section;
}

// ─── Openings Section ────────────────────────────────────────────────────────

function createOpeningsSection(): HTMLElement {
  const section = createElement('section', 'careers-openings');
  section.id = 'openings';
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Current ';
  const em = createElement('em', undefined, 'Openings');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Find your perfect role at Real House');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  // Filters
  const filters = createElement('div', 'careers-openings__filters');

  // Search filter
  const searchFilter = createElement('div', 'careers-openings__filter careers-openings__filter--search');
  const searchLabel = createElement('label', 'careers-openings__filter-label', 'Search');
  searchLabel.setAttribute('for', 'filter-search');
  searchFilter.appendChild(searchLabel);
  const searchInput = createElement('input', 'careers-openings__filter-input');
  searchInput.id = 'filter-search';
  searchInput.type = 'search';
  searchInput.placeholder = 'Search role, keyword...';
  searchFilter.appendChild(searchInput);
  filters.appendChild(searchFilter);

  // Department filter
  const deptFilter = createElement('div', 'careers-openings__filter');
  const deptLabel = createElement('label', 'careers-openings__filter-label', 'Department');
  deptLabel.setAttribute('for', 'filter-department');
  deptFilter.appendChild(deptLabel);

  const deptSelect = createElement('select', 'careers-openings__filter-select');
  deptSelect.id = 'filter-department';
  const deptAllOption = createElement('option');
  deptAllOption.value = 'All';
  deptAllOption.textContent = 'All Departments';
  deptSelect.appendChild(deptAllOption);
  getAllDepartments().forEach(dept => {
    const option = createElement('option');
    option.value = dept;
    option.textContent = dept;
    deptSelect.appendChild(option);
  });
  deptFilter.appendChild(deptSelect);
  filters.appendChild(deptFilter);

  // Type filter
  const typeFilter = createElement('div', 'careers-openings__filter');
  const typeLabel = createElement('label', 'careers-openings__filter-label', 'Job Type');
  typeLabel.setAttribute('for', 'filter-type');
  typeFilter.appendChild(typeLabel);

  const typeSelect = createElement('select', 'careers-openings__filter-select');
  typeSelect.id = 'filter-type';
  const typeAllOption = createElement('option');
  typeAllOption.value = 'All';
  typeAllOption.textContent = 'All Types';
  typeSelect.appendChild(typeAllOption);
  getAllJobTypes().forEach(type => {
    const option = createElement('option');
    option.value = type;
    option.textContent = type;
    typeSelect.appendChild(option);
  });
  typeFilter.appendChild(typeSelect);
  filters.appendChild(typeFilter);

  container.appendChild(filters);

  // Jobs grid
  const jobsGrid = createElement('div', 'careers-openings__grid');
  jobsGrid.id = 'jobs-grid';
  renderJobCards(jobsGrid, getActiveJobs());
  container.appendChild(jobsGrid);

  // No results message
  const noResults = createElement('div', 'careers-openings__no-results');
  noResults.id = 'no-results';
  noResults.style.display = 'none';

  const noResultsIcon = createElement('div', 'careers-openings__no-results-icon');
  const searchSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchSvg.setAttribute('viewBox', '0 0 24 24');
  searchSvg.setAttribute('fill', 'none');
  searchSvg.setAttribute('stroke', 'currentColor');
  searchSvg.setAttribute('stroke-width', '2');
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '11');
  circle.setAttribute('cy', '11');
  circle.setAttribute('r', '8');
  searchSvg.appendChild(circle);
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  line.setAttribute('d', 'M21 21l-4.35-4.35');
  searchSvg.appendChild(line);
  noResultsIcon.appendChild(searchSvg);
  noResults.appendChild(noResultsIcon);

  const noResultsTitle = createElement('h3', undefined, 'No matching positions found');
  noResults.appendChild(noResultsTitle);
  const noResultsDesc = createElement('p', undefined, 'Try adjusting your filters or submit your CV for future opportunities.');
  noResults.appendChild(noResultsDesc);

  container.appendChild(noResults);
  section.appendChild(container);

  // Add filter event listeners after DOM is appended
  setTimeout(() => {
    const deptSelectEl = document.getElementById('filter-department') as HTMLSelectElement;
    const typeSelectEl = document.getElementById('filter-type') as HTMLSelectElement;
    const searchInputEl = document.getElementById('filter-search') as HTMLInputElement;

    if (deptSelectEl) {
      deptSelectEl.addEventListener('change', () => {
        selectedDepartment = deptSelectEl.value as Department | 'All';
        updateJobsDisplay();
      });
    }

    if (typeSelectEl) {
      typeSelectEl.addEventListener('change', () => {
        selectedType = typeSelectEl.value as JobType | 'All';
        updateJobsDisplay();
      });
    }

    if (searchInputEl) {
      searchInputEl.addEventListener('input', () => {
        searchQuery = searchInputEl.value.toLowerCase().trim();
        updateJobsDisplay();
      });
    }
  }, 100);

  return section;
}

function renderJobCards(container: HTMLElement, jobs: JobListing[]): void {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  jobs.forEach(job => {
    const card = createJobCard(job);
    container.appendChild(card);

    // Inject job schema
    injectSchema(generateJobPostingSchema(job), `schema-job-${job.id}`);
  });
}

function createJobCard(job: JobListing): HTMLElement {
  const card = createElement('article', 'job-card');
  card.setAttribute('itemscope', '');
  card.setAttribute('itemtype', 'https://schema.org/JobPosting');

  // Header
  const header = createElement('div', 'job-card__header');

  const titleWrap = createElement('div', 'job-card__title-wrap');
  const title = createElement('h3', 'job-card__title');
  title.setAttribute('itemprop', 'title');
  const titleLink = createElement('a', undefined, job.title);
  titleLink.href = `/careers/${job.slug}`;
  titleLink.setAttribute('data-route', '');
  title.appendChild(titleLink);
  titleWrap.appendChild(title);

  const department = createElement('span', 'job-card__department', job.department);
  department.setAttribute('itemprop', 'occupationalCategory');
  titleWrap.appendChild(department);
  header.appendChild(titleWrap);

  if (isDeadlineSoon(job.applicationDeadline)) {
    const urgentBadge = createElement('span', 'job-card__badge job-card__badge--urgent', 'Closing Soon');
    header.appendChild(urgentBadge);
  }

  card.appendChild(header);

  // Meta
  const meta = createElement('div', 'job-card__meta');

  const location = createElement('span', 'job-card__meta-item');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(job.location));
  meta.appendChild(location);

  const type = createElement('span', 'job-card__meta-item');
  type.appendChild(createSVGUse('icon-clock'));
  type.appendChild(document.createTextNode(job.type));
  meta.appendChild(type);

  const level = createElement('span', 'job-card__meta-item');
  level.appendChild(createSVGUse('icon-chart'));
  level.appendChild(document.createTextNode(`${job.experienceLevel} Level`));
  meta.appendChild(level);

  card.appendChild(meta);

  // Description
  const description = createElement('p', 'job-card__description', job.description.substring(0, 150) + '...');
  description.setAttribute('itemprop', 'description');
  card.appendChild(description);

  // Footer
  const footer = createElement('div', 'job-card__footer');

  const salary = createElement('span', 'job-card__salary', formatSalaryRange(job));
  salary.setAttribute('itemprop', 'baseSalary');
  footer.appendChild(salary);

  const postedDate = createElement('span', 'job-card__posted', `Posted ${formatPostedDate(job.postedDate)}`);
  footer.appendChild(postedDate);

  card.appendChild(footer);

  // Action
  const action = createElement('div', 'job-card__action');
  const viewBtn = createElement('a', 'btn btn--primary btn--sm', 'View Details');
  viewBtn.href = `/careers/${job.slug}`;
  viewBtn.setAttribute('data-route', '');
  action.appendChild(viewBtn);
  card.appendChild(action);

  // Hover reveal: Apply Now CTA
  const reveal = createElement('a', 'job-card__reveal');
  reveal.href = `/careers/${job.slug}#apply`;
  reveal.setAttribute('data-route', '');
  reveal.setAttribute('aria-label', `Apply for ${job.title}`);
  const revealText = createElement('span', 'job-card__reveal-text', 'Apply Now');
  reveal.appendChild(revealText);
  const revealArrow = createElement('span', 'job-card__reveal-arrow', '→');
  reveal.appendChild(revealArrow);
  card.appendChild(reveal);

  return card;
}

function updateJobsDisplay(): void {
  const jobsGrid = document.getElementById('jobs-grid');
  const noResults = document.getElementById('no-results');

  if (!jobsGrid || !noResults) return;

  let filteredJobs = getActiveJobs();

  if (selectedDepartment !== 'All') {
    filteredJobs = filteredJobs.filter(job => job.department === selectedDepartment);
  }

  if (selectedType !== 'All') {
    filteredJobs = filteredJobs.filter(job => job.type === selectedType);
  }

  if (searchQuery) {
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery) ||
      job.department.toLowerCase().includes(searchQuery) ||
      job.description.toLowerCase().includes(searchQuery) ||
      job.location.toLowerCase().includes(searchQuery)
    );
  }

  if (filteredJobs.length === 0) {
    jobsGrid.style.display = 'none';
    noResults.style.display = 'block';
  } else {
    jobsGrid.style.display = '';
    noResults.style.display = 'none';
    renderJobCards(jobsGrid, filteredJobs);
  }
}

// ─── Stats Band ──────────────────────────────────────────────────────────────

function createStatsBand(): HTMLElement {
  const section = createElement('section', 'careers-stats');
  const container = createElement('div', 'container');

  const grid = createElement('div', 'careers-stats__grid');
  const items = [
    { value: '25+', label: 'Team Members', sub: 'Across 4 departments' },
    { value: '23', label: 'Years in Business', sub: 'Since 2002' },
    { value: '92%', label: 'Retention Rate', sub: '3-year average' },
    { value: '180+', label: 'Hours of Training', sub: 'Per employee / year' }
  ];

  items.forEach((item, i) => {
    const stat = createElement('div', 'careers-stats__item');
    const num = createElement('span', 'careers-stats__index', String(i + 1).padStart(2, '0'));
    stat.appendChild(num);
    const value = createElement('span', 'careers-stats__value', item.value);
    stat.appendChild(value);
    const label = createElement('span', 'careers-stats__label', item.label);
    stat.appendChild(label);
    const sub = createElement('span', 'careers-stats__sub', item.sub);
    stat.appendChild(sub);
    grid.appendChild(stat);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── Testimonials Section ────────────────────────────────────────────────────

function createTestimonialsSection(): HTMLElement {
  const section = createElement('section', 'careers-testimonials');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Voices from ';
  const em = createElement('em', undefined, 'Our Team');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'What working at Real House actually feels like');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'careers-testimonials__grid');

  const testimonials = [
    {
      quote: 'I joined as a junior agent. Three years later I am leading our luxury portfolio. Real House actually invests in your growth — it is not just a line in the job ad.',
      name: 'Lana Hassan',
      role: 'Senior Real Estate Agent',
      tenure: '3 years',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80&fm=webp'
    },
    {
      quote: 'The commission structure is genuinely competitive, but what kept me here is the team. Everyone shares leads, advice, contacts. It is rare to find that in this industry.',
      name: 'Karwan Ahmad',
      role: 'Marketing Lead',
      tenure: '5 years',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fm=webp'
    },
    {
      quote: 'Flexible hours, real ownership over projects, and leadership that listens. I came from a corporate giant and never looked back.',
      name: 'Sarya Mohammed',
      role: 'Operations Manager',
      tenure: '4 years',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80&fm=webp'
    },
    {
      quote: 'Built our entire property platform from scratch with autonomy you do not get anywhere else in Erbil. The tech stack and the trust to use it — both rare.',
      name: 'Diyar Othman',
      role: 'Lead Developer',
      tenure: '2 years',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&fm=webp'
    }
  ];

  testimonials.forEach(t => {
    const card = createElement('article', 'careers-testimonials__card');

    const quoteMark = createElement('span', 'careers-testimonials__mark', '“');
    card.appendChild(quoteMark);

    const quote = createElement('p', 'careers-testimonials__quote', t.quote);
    card.appendChild(quote);

    const author = createElement('div', 'careers-testimonials__author');
    const photoWrap = createElement('div', 'careers-testimonials__photo');
    const img = createElement('img');
    img.src = t.photo;
    img.alt = t.name;
    img.loading = 'lazy';
    photoWrap.appendChild(img);
    author.appendChild(photoWrap);

    const meta = createElement('div', 'careers-testimonials__meta');
    const name = createElement('span', 'careers-testimonials__name', t.name);
    meta.appendChild(name);
    const role = createElement('span', 'careers-testimonials__role', t.role);
    meta.appendChild(role);
    const tenure = createElement('span', 'careers-testimonials__tenure', `${t.tenure} at Real House`);
    meta.appendChild(tenure);
    author.appendChild(meta);

    card.appendChild(author);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── Programs Section (Internship & Training) ────────────────────────────────

function createProgramsSection(): HTMLElement {
  const section = createElement('section', 'careers-programs');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Programs & ';
  const em = createElement('em', undefined, 'Pathways');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Whether you are starting out or scaling up, there is a path for you');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const grid = createElement('div', 'careers-programs__grid');

  const programs = [
    {
      tag: 'Internship',
      title: 'Summer Real Estate Intern',
      duration: '12 weeks · Paid',
      desc: 'Shadow senior agents, learn the Erbil market end-to-end, contribute to real client deals. Ideal for university students in business, marketing, or finance.',
      perks: ['Stipend + transport', 'Mentor per intern', 'Conversion to full-time'],
      cta: 'Apply for 2026 cohort'
    },
    {
      tag: 'Graduate Program',
      title: 'Agent Academy',
      duration: '6 months · Full-time',
      desc: 'Our flagship training program. Licensing prep, negotiation labs, CRM mastery, portfolio shadowing. Graduate ready to close your first deal.',
      perks: ['Certified curriculum', 'Salary + commission', 'Guaranteed placement'],
      cta: 'Join next intake'
    },
    {
      tag: 'Leadership Track',
      title: 'Future Leaders Lab',
      duration: '9 months · Hybrid',
      desc: 'For mid-career professionals ready to lead. Strategic operations, P&L ownership, team management — culminating in a leadership rotation.',
      perks: ['Executive coaching', 'Cross-dept rotation', 'Promotion pipeline'],
      cta: 'Request brief'
    }
  ];

  programs.forEach(p => {
    const card = createElement('article', 'careers-programs__card');

    const tag = createElement('span', 'careers-programs__tag', p.tag);
    card.appendChild(tag);

    const title = createElement('h3', 'careers-programs__title', p.title);
    card.appendChild(title);

    const duration = createElement('span', 'careers-programs__duration', p.duration);
    card.appendChild(duration);

    const desc = createElement('p', 'careers-programs__desc', p.desc);
    card.appendChild(desc);

    const perksList = createElement('ul', 'careers-programs__perks');
    p.perks.forEach(perk => {
      const li = createElement('li', 'careers-programs__perk');
      const dot = createElement('span', 'careers-programs__perk-dot');
      li.appendChild(dot);
      li.appendChild(document.createTextNode(perk));
      perksList.appendChild(li);
    });
    card.appendChild(perksList);

    const cta = createElement('a', 'careers-programs__cta');
    cta.href = '#openings';
    cta.textContent = p.cta;
    const arrow = createElement('span', 'careers-programs__cta-arrow', '→');
    cta.appendChild(arrow);
    card.appendChild(cta);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

function createFAQSection(): HTMLElement {
  const section = createElement('section', 'careers-faq');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Frequently ';
  const em = createElement('em', undefined, 'Asked');
  headerTitle.appendChild(em);
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'Everything you wanted to know before applying');
  header.appendChild(headerSubtitle);
  container.appendChild(header);

  const list = createElement('div', 'careers-faq__list');

  const faqs = [
    {
      q: 'What does the interview process look like?',
      a: 'Three stages: a 30-minute introductory call with HR, a role-specific case study or portfolio review with the hiring manager, and a final culture conversation with two team members. Most candidates hear back within 5 business days at each stage.'
    },
    {
      q: 'What benefits do you offer beyond salary?',
      a: 'Full health insurance (you + dependents), performance bonuses, commission on closed deals for client-facing roles, paid annual leave, transportation allowance, professional certifications fully sponsored, and a flexible-hours policy for eligible roles.'
    },
    {
      q: 'Do you sponsor visas or hire remotely?',
      a: 'Most roles are on-site in our Queen Tower office in Erbil. We sponsor relocation for select senior positions and offer hybrid arrangements for IT and back-office roles after probation.'
    },
    {
      q: 'What languages do I need?',
      a: 'Kurdish and English are required for most client-facing roles. Arabic is strongly preferred. For technical and back-office roles, strong English alone is usually sufficient.'
    },
    {
      q: 'I am a recent graduate — am I eligible?',
      a: 'Absolutely. Our Agent Academy graduate program and Summer Intern program are designed specifically for early-career candidates. No prior real estate experience required — just curiosity and commitment.'
    },
    {
      q: 'How long does the hiring process take?',
      a: 'From application to offer: typically 2 to 3 weeks. Urgent roles can move faster. We will give you a clear timeline at the introductory call.'
    }
  ];

  faqs.forEach((faq, i) => {
    const item = createElement('details', 'careers-faq__item');
    if (i === 0) item.setAttribute('open', '');

    const summary = createElement('summary', 'careers-faq__summary');
    const num = createElement('span', 'careers-faq__num', String(i + 1).padStart(2, '0'));
    summary.appendChild(num);
    const q = createElement('span', 'careers-faq__q', faq.q);
    summary.appendChild(q);
    const icon = createElement('span', 'careers-faq__icon');
    icon.setAttribute('aria-hidden', 'true');
    summary.appendChild(icon);
    item.appendChild(summary);

    const answer = createElement('div', 'careers-faq__answer');
    const ap = createElement('p', undefined, faq.a);
    answer.appendChild(ap);
    item.appendChild(answer);

    list.appendChild(item);
  });

  container.appendChild(list);
  section.appendChild(container);
  return section;
}

// ─── General Application Section ─────────────────────────────────────────────

function createGeneralApplicationSection(): HTMLElement {
  const section = createElement('section', 'careers-general');
  const container = createElement('div', 'container');

  const card = createElement('div', 'careers-general__card');

  const eyebrow = createElement('span', 'careers-general__eyebrow', 'Open Application');
  card.appendChild(eyebrow);

  const title = createElement('h2', 'careers-general__title');
  title.textContent = 'Don\'t see your role? ';
  const em = createElement('em', undefined, 'Send us your CV.');
  title.appendChild(em);
  card.appendChild(title);

  const desc = createElement('p', 'careers-general__desc',
    'We are always scouting for sharp, kind, ambitious people. Send your CV and a short note about what you want to build — we read every one and we will get back to you when the right role opens.'
  );
  card.appendChild(desc);

  const cta = createElement('div', 'careers-general__cta');
  const primary = createElement('a', 'btn btn--primary btn--lg', 'Submit Your CV');
  primary.href = '/contact';
  primary.setAttribute('data-route', '');
  cta.appendChild(primary);

  const secondary = createElement('a', 'careers-general__email');
  secondary.href = 'mailto:careers@realhouseiq.com';
  secondary.textContent = 'or email careers@realhouseiq.com';
  cta.appendChild(secondary);

  card.appendChild(cta);
  container.appendChild(card);
  section.appendChild(container);

  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// JOB DETAIL PAGE
// ═══════════════════════════════════════════════════════════════════════════

export function renderJobDetailPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const job = getJobBySlug(slug);

  if (!job) {
    // Job not found - render a simple message
    const page = createElement('div', 'careers-page');
    const container = createElement('div', 'container');
    const notFound = createElement('div', 'careers-not-found');

    const notFoundTitle = createElement('h1', undefined, 'Job Not Found');
    notFound.appendChild(notFoundTitle);

    const notFoundDesc = createElement('p', undefined, 'The position you\'re looking for is no longer available or has been filled.');
    notFound.appendChild(notFoundDesc);

    const notFoundBtn = createElement('a', 'btn btn--primary', 'View All Openings');
    notFoundBtn.href = '/careers';
    notFoundBtn.setAttribute('data-route', '');
    notFound.appendChild(notFoundBtn);

    container.appendChild(notFound);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  // Inject job schema
  injectSchema(generateJobPostingSchema(job), `schema-job-detail-${job.id}`);

  const page = createElement('div', 'careers-page job-detail-page');

  // Breadcrumb
  const breadcrumb = createElement('nav', 'job-detail__breadcrumb');
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');
  const breadcrumbContainer = createElement('div', 'container');
  const breadcrumbList = createElement('ol', 'job-detail__breadcrumb-list');

  const homeItem = createElement('li');
  const homeLink = createElement('a', undefined, 'Home');
  homeLink.href = '/';
  homeLink.setAttribute('data-route', '');
  homeItem.appendChild(homeLink);
  breadcrumbList.appendChild(homeItem);

  const careersItem = createElement('li');
  const careersLink = createElement('a', undefined, 'Careers');
  careersLink.href = '/careers';
  careersLink.setAttribute('data-route', '');
  careersItem.appendChild(careersLink);
  breadcrumbList.appendChild(careersItem);

  const currentItem = createElement('li');
  currentItem.setAttribute('aria-current', 'page');
  currentItem.textContent = job.title;
  breadcrumbList.appendChild(currentItem);

  breadcrumbContainer.appendChild(breadcrumbList);
  breadcrumb.appendChild(breadcrumbContainer);
  page.appendChild(breadcrumb);

  // Hero
  const hero = createElement('section', 'job-detail__hero');
  const heroContainer = createElement('div', 'container');

  const heroContent = createElement('div', 'job-detail__hero-content');

  const department = createElement('span', 'job-detail__department', job.department);
  heroContent.appendChild(department);

  const title = createElement('h1', 'job-detail__title', job.title);
  heroContent.appendChild(title);

  const meta = createElement('div', 'job-detail__meta');

  const locationMeta = createElement('span', 'job-detail__meta-item');
  locationMeta.appendChild(createSVGUse('icon-location'));
  locationMeta.appendChild(document.createTextNode(job.location));
  meta.appendChild(locationMeta);

  const typeMeta = createElement('span', 'job-detail__meta-item');
  typeMeta.appendChild(createSVGUse('icon-clock'));
  typeMeta.appendChild(document.createTextNode(job.type));
  meta.appendChild(typeMeta);

  const levelMeta = createElement('span', 'job-detail__meta-item');
  levelMeta.appendChild(createSVGUse('icon-chart'));
  levelMeta.appendChild(document.createTextNode(`${job.experienceLevel} Level`));
  meta.appendChild(levelMeta);

  const postedMeta = createElement('span', 'job-detail__meta-item');
  postedMeta.appendChild(createSVGUse('icon-calendar'));
  postedMeta.appendChild(document.createTextNode(`Posted ${formatPostedDate(job.postedDate)}`));
  meta.appendChild(postedMeta);

  heroContent.appendChild(meta);

  const salary = createElement('div', 'job-detail__salary', formatSalaryRange(job));
  heroContent.appendChild(salary);

  if (job.applicationDeadline) {
    const deadline = createElement('div', isDeadlineSoon(job.applicationDeadline) ? 'job-detail__deadline job-detail__deadline--urgent' : 'job-detail__deadline');
    deadline.textContent = `Application Deadline: ${new Date(job.applicationDeadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    heroContent.appendChild(deadline);
  }

  heroContainer.appendChild(heroContent);
  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // Content
  const content = createElement('section', 'job-detail__content');
  const contentContainer = createElement('div', 'container');
  const contentGrid = createElement('div', 'job-detail__grid');

  // Main content
  const main = createElement('div', 'job-detail__main');

  // Description
  const descSection = createElement('div', 'job-detail__section');
  const descTitle = createElement('h2', 'job-detail__section-title', 'About This Role');
  descSection.appendChild(descTitle);
  const descText = createElement('p', 'job-detail__description', job.description);
  descSection.appendChild(descText);
  main.appendChild(descSection);

  // Responsibilities
  const respSection = createElement('div', 'job-detail__section');
  const respTitle = createElement('h2', 'job-detail__section-title', 'Key Responsibilities');
  respSection.appendChild(respTitle);
  const respList = createElement('ul', 'job-detail__list');
  job.responsibilities.forEach(resp => {
    const li = createElement('li', undefined, resp);
    respList.appendChild(li);
  });
  respSection.appendChild(respList);
  main.appendChild(respSection);

  // Requirements
  const reqSection = createElement('div', 'job-detail__section');
  const reqTitle = createElement('h2', 'job-detail__section-title', 'Requirements');
  reqSection.appendChild(reqTitle);
  const reqList = createElement('ul', 'job-detail__list');
  job.requirements.forEach(req => {
    const li = createElement('li', undefined, req);
    reqList.appendChild(li);
  });
  reqSection.appendChild(reqList);
  main.appendChild(reqSection);

  // Benefits
  const benefitsSection = createElement('div', 'job-detail__section');
  const benefitsTitle = createElement('h2', 'job-detail__section-title', 'What We Offer');
  benefitsSection.appendChild(benefitsTitle);
  const benefitsList = createElement('ul', 'job-detail__benefits-list');
  job.benefits.forEach(benefit => {
    const li = createElement('li');
    li.appendChild(createSVGUse('icon-check'));
    li.appendChild(document.createTextNode(benefit));
    benefitsList.appendChild(li);
  });
  benefitsSection.appendChild(benefitsList);
  main.appendChild(benefitsSection);

  contentGrid.appendChild(main);

  // Sidebar with application form
  const sidebar = createElement('aside', 'job-detail__sidebar');
  sidebar.id = 'apply';
  sidebar.appendChild(createApplicationForm(job));
  contentGrid.appendChild(sidebar);

  contentContainer.appendChild(contentGrid);
  content.appendChild(contentContainer);
  page.appendChild(content);

  // Back link
  const backSection = createElement('section', 'job-detail__back');
  const backContainer = createElement('div', 'container');
  const backLink = createElement('a', 'job-detail__back-link', 'Back to All Openings');
  backLink.href = '/careers';
  backLink.setAttribute('data-route', '');
  const backIcon = createSVGUse('icon-arrow-left');
  backLink.insertBefore(backIcon, backLink.firstChild);
  backContainer.appendChild(backLink);
  backSection.appendChild(backContainer);
  page.appendChild(backSection);

  fragment.appendChild(page);
  return fragment;
}

// ─── Application Form (Multi-step) ───────────────────────────────────────────

interface StepFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select' | 'file';
  required?: boolean;
  placeholder?: string;
  autocomplete?: string;
  options?: string[];
  accept?: string;
  rows?: number;
}

function createApplicationForm(job: JobListing): HTMLElement {
  const form = createElement('div', 'application-form');

  // Header with eyebrow + title
  const eyebrow = createElement('span', 'application-form__eyebrow', 'Begin your application');
  form.appendChild(eyebrow);

  const title = createElement('h3', 'application-form__title', 'Apply for This Position');
  form.appendChild(title);

  // ─── Progress / Stepper ────────────────────────────────────────────────────
  const stepsConfig = [
    {
      label: 'Personal',
      description: 'Tell us who you are',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'e.g. Lana Hassan', autocomplete: 'name' },
        { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your.email@example.com', autocomplete: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+964 750 XXX XXXX', autocomplete: 'tel' },
        { name: 'location', label: 'Current Location', type: 'text', required: true, placeholder: 'City, Country', autocomplete: 'address-level2' }
      ] as StepFieldConfig[]
    },
    {
      label: 'Experience',
      description: 'Your background',
      fields: [
        { name: 'experienceYears', label: 'Years of Relevant Experience', type: 'select', required: true, options: ['Less than 1 year', '1 - 2 years', '3 - 5 years', '6 - 10 years', '10+ years'] },
        { name: 'currentRole', label: 'Current / Most Recent Role', type: 'text', required: true, placeholder: 'e.g. Real Estate Agent at ...' },
        { name: 'linkedin', label: 'LinkedIn Profile (Optional)', type: 'url', placeholder: 'https://linkedin.com/in/yourprofile' },
        { name: 'resume', label: 'Resume / CV', type: 'file', required: true, accept: '.pdf,.doc,.docx' }
      ] as StepFieldConfig[]
    },
    {
      label: 'Why You',
      description: 'Show us your spark',
      fields: [
        { name: 'coverLetter', label: 'Why Real House?', type: 'textarea', required: true, rows: 6, placeholder: 'In a few sentences, tell us what draws you to this role and why you would thrive on our team...' },
        { name: 'availability', label: 'Earliest Start Date', type: 'select', required: true, options: ['Immediately', 'Within 2 weeks', 'Within 1 month', 'Within 3 months', 'Flexible'] },
        { name: 'referral', label: 'How did you hear about us? (Optional)', type: 'text', placeholder: 'LinkedIn, friend, our website...' }
      ] as StepFieldConfig[]
    }
  ];

  const stepper = createElement('ol', 'application-form__stepper');
  stepper.setAttribute('aria-label', 'Application progress');
  stepsConfig.forEach((s, i) => {
    const stepLi = createElement('li', 'application-form__step' + (i === 0 ? ' is-active' : ''));
    stepLi.setAttribute('data-step', String(i + 1));
    const num = createElement('span', 'application-form__step-num', String(i + 1).padStart(2, '0'));
    stepLi.appendChild(num);
    const txt = createElement('span', 'application-form__step-text');
    const lbl = createElement('span', 'application-form__step-label', s.label);
    txt.appendChild(lbl);
    const desc = createElement('span', 'application-form__step-desc', s.description);
    txt.appendChild(desc);
    stepLi.appendChild(txt);
    stepper.appendChild(stepLi);
  });
  form.appendChild(stepper);

  // Progress bar
  const progress = createElement('div', 'application-form__progress');
  progress.setAttribute('aria-hidden', 'true');
  const progressBar = createElement('div', 'application-form__progress-bar');
  progressBar.style.width = `${100 / stepsConfig.length}%`;
  progress.appendChild(progressBar);
  form.appendChild(progress);

  // ─── Form ─────────────────────────────────────────────────────────────────
  const formEl = createElement('form', 'application-form__form');
  formEl.setAttribute('action', '#');
  formEl.setAttribute('method', 'POST');
  formEl.setAttribute('novalidate', '');
  formEl.id = 'job-application-form';

  // Hidden job field
  const hiddenJob = createElement('input');
  hiddenJob.type = 'hidden';
  hiddenJob.name = 'position';
  hiddenJob.value = job.title;
  formEl.appendChild(hiddenJob);

  const fileRefs: { input: HTMLInputElement; name: HTMLSpanElement } = { input: null!, name: null! };

  // Build each step panel
  const panels: HTMLElement[] = [];
  stepsConfig.forEach((step, idx) => {
    const panel = createElement('fieldset', 'application-form__panel' + (idx === 0 ? ' is-active' : ''));
    panel.setAttribute('data-panel', String(idx + 1));
    if (idx !== 0) panel.setAttribute('hidden', '');

    const legend = createElement('legend', 'application-form__legend');
    const legendNum = createElement('span', 'application-form__legend-num', `Step ${idx + 1} of ${stepsConfig.length}`);
    legend.appendChild(legendNum);
    const legendLabel = createElement('span', 'application-form__legend-label', step.label);
    legend.appendChild(legendLabel);
    panel.appendChild(legend);

    step.fields.forEach(field => {
      const group = createElement('div', 'application-form__group');
      const fieldId = `field-${field.name}-${job.id}`;
      const label = createElement('label', 'application-form__label');
      label.setAttribute('for', fieldId);
      label.textContent = field.label;
      if (field.required) {
        const star = createElement('span', 'application-form__required', ' *');
        label.appendChild(star);
      }
      group.appendChild(label);

      if (field.type === 'textarea') {
        const ta = createElement('textarea', 'application-form__textarea');
        ta.id = fieldId;
        ta.name = field.name;
        ta.rows = field.rows || 5;
        if (field.placeholder) ta.placeholder = field.placeholder;
        if (field.required) ta.required = true;
        group.appendChild(ta);
      } else if (field.type === 'select') {
        const wrap = createElement('div', 'application-form__select-wrap');
        const sel = createElement('select', 'application-form__select');
        sel.id = fieldId;
        sel.name = field.name;
        if (field.required) sel.required = true;
        const placeholderOpt = createElement('option');
        placeholderOpt.value = '';
        placeholderOpt.textContent = 'Select an option…';
        placeholderOpt.disabled = true;
        placeholderOpt.selected = true;
        sel.appendChild(placeholderOpt);
        (field.options || []).forEach(opt => {
          const o = createElement('option');
          o.value = opt;
          o.textContent = opt;
          sel.appendChild(o);
        });
        wrap.appendChild(sel);
        group.appendChild(wrap);
      } else if (field.type === 'file') {
        const upload = createElement('div', 'application-form__upload');
        const fi = createElement('input', 'application-form__file-input');
        fi.type = 'file';
        fi.id = fieldId;
        fi.name = field.name;
        if (field.accept) fi.accept = field.accept;
        if (field.required) fi.required = true;
        upload.appendChild(fi);

        const ul = createElement('label', 'application-form__upload-label');
        ul.setAttribute('for', fieldId);

        const ulInner = createElement('div', 'application-form__upload-inner');

        const ulSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        ulSvg.setAttribute('viewBox', '0 0 24 24');
        ulSvg.setAttribute('fill', 'none');
        ulSvg.setAttribute('stroke', 'currentColor');
        ulSvg.setAttribute('stroke-width', '1.5');
        ulSvg.setAttribute('class', 'application-form__upload-icon');
        const ulP1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        ulP1.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
        ulSvg.appendChild(ulP1);
        const ulPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        ulPoly.setAttribute('points', '17 8 12 3 7 8');
        ulSvg.appendChild(ulPoly);
        const ulLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        ulLine.setAttribute('x1', '12');
        ulLine.setAttribute('y1', '3');
        ulLine.setAttribute('x2', '12');
        ulLine.setAttribute('y2', '15');
        ulSvg.appendChild(ulLine);
        ulInner.appendChild(ulSvg);

        const ulHead = createElement('span', 'application-form__upload-head', 'Drop your CV here');
        ulInner.appendChild(ulHead);
        const ulSub = createElement('span', 'application-form__upload-sub', 'or click to browse · PDF, DOC, DOCX · Max 5 MB');
        ulInner.appendChild(ulSub);

        ul.appendChild(ulInner);
        upload.appendChild(ul);

        const fn = createElement('span', 'application-form__file-name');
        upload.appendChild(fn);

        group.appendChild(upload);

        fileRefs.input = fi;
        fileRefs.name = fn;
      } else {
        const inp = createElement('input', 'application-form__input');
        inp.type = field.type;
        inp.id = fieldId;
        inp.name = field.name;
        if (field.placeholder) inp.placeholder = field.placeholder;
        if (field.required) inp.required = true;
        if (field.autocomplete) inp.autocomplete = field.autocomplete as AutoFill;
        group.appendChild(inp);
      }

      const err = createElement('span', 'application-form__error');
      err.setAttribute('aria-live', 'polite');
      group.appendChild(err);

      panel.appendChild(group);
    });

    formEl.appendChild(panel);
    panels.push(panel);
  });

  // ─── Navigation Buttons ───────────────────────────────────────────────────
  const nav = createElement('div', 'application-form__nav');

  const backBtn = createElement('button', 'application-form__btn application-form__btn--ghost', 'Back');
  backBtn.type = 'button';
  backBtn.disabled = true;
  nav.appendChild(backBtn);

  const navMeta = createElement('span', 'application-form__nav-meta');
  navMeta.textContent = `Step 1 of ${stepsConfig.length}`;
  nav.appendChild(navMeta);

  const nextBtn = createElement('button', 'application-form__btn application-form__btn--primary', 'Continue');
  nextBtn.type = 'button';
  const nextArrow = createElement('span', 'application-form__btn-arrow', '→');
  nextBtn.appendChild(nextArrow);
  nav.appendChild(nextBtn);

  const submitBtn = createElement('button', 'application-form__btn application-form__btn--primary application-form__btn--submit', 'Submit Application');
  submitBtn.type = 'submit';
  submitBtn.style.display = 'none';
  nav.appendChild(submitBtn);

  formEl.appendChild(nav);

  // Privacy note
  const privacy = createElement('p', 'application-form__privacy',
    'By submitting, you agree to our Privacy Policy and consent to Real House processing your data for recruitment.'
  );
  formEl.appendChild(privacy);

  form.appendChild(formEl);

  // ─── Step Logic ───────────────────────────────────────────────────────────
  let currentStep = 0;
  const stepEls = Array.from(stepper.children) as HTMLElement[];

  const updateUI = () => {
    panels.forEach((p, i) => {
      const active = i === currentStep;
      p.classList.toggle('is-active', active);
      if (active) p.removeAttribute('hidden');
      else p.setAttribute('hidden', '');
    });
    stepEls.forEach((s, i) => {
      s.classList.toggle('is-active', i === currentStep);
      s.classList.toggle('is-complete', i < currentStep);
    });
    progressBar.style.width = `${((currentStep + 1) / stepsConfig.length) * 100}%`;
    backBtn.disabled = currentStep === 0;
    const isLast = currentStep === stepsConfig.length - 1;
    nextBtn.style.display = isLast ? 'none' : '';
    submitBtn.style.display = isLast ? '' : 'none';
    navMeta.textContent = `Step ${currentStep + 1} of ${stepsConfig.length}`;
    // focus first input in panel
    const firstInput = panels[currentStep].querySelector('input, select, textarea') as HTMLElement | null;
    if (firstInput) (firstInput as HTMLInputElement).focus({ preventScroll: true });
  };

  const validateStep = (idx: number): boolean => {
    const panel = panels[idx];
    const required = panel.querySelectorAll('[required]') as NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    let valid = true;
    required.forEach(el => {
      const group = el.closest('.application-form__group');
      const err = group?.querySelector('.application-form__error') as HTMLElement | null;
      if (!el.checkValidity() || !el.value.trim()) {
        valid = false;
        group?.classList.add('has-error');
        if (err) err.textContent = el.validationMessage || 'This field is required';
      } else {
        group?.classList.remove('has-error');
        if (err) err.textContent = '';
      }
    });
    return valid;
  };

  nextBtn.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < stepsConfig.length - 1) {
      currentStep++;
      updateUI();
    }
  });

  backBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateUI();
    }
  });

  // Clear error on input
  formEl.addEventListener('input', (e) => {
    const target = e.target as HTMLElement;
    const group = target.closest('.application-form__group');
    if (group?.classList.contains('has-error')) {
      group.classList.remove('has-error');
      const err = group.querySelector('.application-form__error') as HTMLElement | null;
      if (err) err.textContent = '';
    }
  });

  // File handling
  const MAX_RESUME_BYTES = 5 * 1024 * 1024;
  if (fileRefs.input && fileRefs.name) {
    fileRefs.input.addEventListener('change', () => {
      if (fileRefs.input.files && fileRefs.input.files[0]) {
        const file = fileRefs.input.files[0];
        if (file.size > MAX_RESUME_BYTES) {
          fileRefs.input.value = '';
          fileRefs.name.textContent = 'File too large. Maximum size is 5 MB.';
          fileRefs.name.classList.add('is-error');
          return;
        }
        fileRefs.name.classList.remove('is-error');
        fileRefs.name.classList.add('is-set');
        fileRefs.name.textContent = `${file.name} · ${(file.size / 1024).toFixed(0)} KB`;
      }
    });
  }

  // Submit
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    while (formEl.firstChild) {
      formEl.removeChild(formEl.firstChild);
    }

    const successMessage = createElement('div', 'application-form__success');
    successMessage.setAttribute('role', 'status');
    successMessage.setAttribute('aria-live', 'polite');

    const successSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    successSvg.setAttribute('viewBox', '0 0 24 24');
    successSvg.setAttribute('fill', 'none');
    successSvg.setAttribute('stroke', 'currentColor');
    successSvg.setAttribute('stroke-width', '1.5');
    const successPath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    successPath1.setAttribute('d', 'M22 11.08V12a10 10 0 1 1-5.93-9.14');
    successSvg.appendChild(successPath1);
    const successPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    successPath2.setAttribute('points', '22 4 12 14.01 9 11.01');
    successSvg.appendChild(successPath2);
    successMessage.appendChild(successSvg);

    const successTitle = createElement('h4', undefined, 'Application Submitted');
    successMessage.appendChild(successTitle);

    const successDesc = createElement('p', undefined, 'Thank you for applying. We will review your application and get back to you within 5 to 7 business days.');
    successMessage.appendChild(successDesc);

    formEl.appendChild(successMessage);

    // Hide the stepper and progress bar in success state
    stepper.style.display = 'none';
    progress.style.display = 'none';
  });

  return form;
}

// ─── SEO Setup ───────────────────────────────────────────────────────────────

export function setupCareersPageSEO(): void {
  // Update meta tags
  document.title = 'Careers at Real House | Join Our Team | Erbil Real Estate Jobs';

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content',
      'Join Real House, Kurdistan\'s leading real estate agency. Explore career opportunities in sales, marketing, operations, and IT. Competitive benefits and growth opportunities. Apply now!'
    );
  }

  // Inject employer schema
  injectSchema(generateEmployerSchema(), 'schema-careers-employer');
}

export function setupJobDetailPageSEO(job: JobListing): void {
  document.title = `${job.title} - Careers at Real House | Erbil`;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content',
      `${job.title} position at Real House in ${job.location}. ${job.type}, ${job.experienceLevel} level. ${formatSalaryRange(job)}. Apply now!`
    );
  }

  // Inject job posting schema
  injectSchema(generateJobPostingSchema(job), `schema-job-detail-${job.id}`);
}

// ─── Schema Generation ───────────────────────────────────────────────────────

function generateEmployerSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Real House',
    'url': 'https://realhouseiq.com',
    'logo': 'https://realhouseiq.com/logo.png',
    'description': 'Kurdistan\'s leading real estate agency with 23+ years of excellence in property sales, rentals, and investments.',
    'numberOfEmployees': {
      '@type': 'QuantitativeValue',
      'minValue': 20,
      'maxValue': 50
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Queen Tower, Erbil',
      'addressLocality': 'Erbil',
      'addressRegion': 'Kurdistan Region',
      'postalCode': '44001',
      'addressCountry': 'IQ'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+964 750 792 2138',
      'contactType': 'Human Resources',
      'email': 'careers@realhouseiq.com'
    }
  };
}

export { getJobBySlug, getActiveJobs, getAllJobSlugs } from '../data/careers';
