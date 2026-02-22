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

// ─── Careers Page ────────────────────────────────────────────────────────────

export function renderCareersPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('div', 'careers-page');

  // Reset filters
  selectedDepartment = 'All';
  selectedType = 'All';

  // Inject Organization Employer Schema
  injectSchema(generateEmployerSchema(), 'schema-careers-employer');

  // ═══ Hero Section ═══
  page.appendChild(createHeroSection());

  // ═══ Why Work With Us ═══
  page.appendChild(createWhyWorkSection());

  // ═══ Company Culture ═══
  page.appendChild(createCultureSection());

  // ═══ Current Openings ═══
  page.appendChild(createOpeningsSection());

  // ═══ Application CTA (for no openings) ═══
  page.appendChild(createGeneralApplicationSection());

  fragment.appendChild(page);
  return fragment;
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function createHeroSection(): HTMLElement {
  const hero = createElement('section', 'careers-hero');
  const container = createElement('div', 'container');

  const content = createElement('div', 'careers-hero__content');

  const badge = createElement('span', 'careers-hero__badge', 'Join Our Team');
  content.appendChild(badge);

  const title = createElement('h1', 'careers-hero__title');
  title.textContent = 'Build Your Career with ';
  const em = createElement('em', undefined, 'Real House');
  title.appendChild(em);
  content.appendChild(title);

  const subtitle = createElement('p', 'careers-hero__subtitle',
    'Join Kurdistan\'s leading real estate agency and be part of a dynamic team shaping the future of property in Erbil. We offer exciting opportunities for growth, competitive benefits, and a supportive work environment.'
  );
  content.appendChild(subtitle);

  const stats = createElement('div', 'careers-hero__stats');
  const statsData = [
    { value: '23+', label: 'Years in Business' },
    { value: '25+', label: 'Team Members' },
    { value: '500+', label: 'Happy Clients' },
    { value: '4.9', label: 'Employee Rating' }
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
  const viewJobsBtn = createElement('a', 'btn btn--primary btn--lg', 'View Open Positions');
  viewJobsBtn.href = '#openings';
  cta.appendChild(viewJobsBtn);

  const learnMoreBtn = createElement('a', 'btn btn--outline btn--lg', 'Learn About Us');
  learnMoreBtn.href = '/about';
  learnMoreBtn.setAttribute('data-route', '');
  cta.appendChild(learnMoreBtn);

  content.appendChild(cta);
  container.appendChild(content);
  hero.appendChild(container);

  return hero;
}

// ─── Why Work Section ────────────────────────────────────────────────────────

function createWhyWorkSection(): HTMLElement {
  const section = createElement('section', 'careers-benefits');
  const container = createElement('div', 'container');

  const header = createElement('div', 'section-header');
  const headerTitle = createElement('h2', 'section-title');
  headerTitle.textContent = 'Why Work at ';
  const em = createElement('em', undefined, 'Real House');
  headerTitle.appendChild(em);
  headerTitle.appendChild(document.createTextNode('?'));
  header.appendChild(headerTitle);
  const headerSubtitle = createElement('p', 'section-subtitle', 'We invest in our people because great teams build great companies');
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

  // Team photo section
  const teamSection = createElement('div', 'careers-culture__team');
  const teamImage = createElement('div', 'careers-culture__team-image');
  const img = createElement('img');
  img.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&fm=webp';
  img.alt = 'Real House team at work';
  img.loading = 'lazy';
  teamImage.appendChild(img);
  teamSection.appendChild(teamImage);

  const teamContent = createElement('div', 'careers-culture__team-content');
  const teamTitle = createElement('h3', undefined, 'Join a Winning Team');
  teamContent.appendChild(teamTitle);
  const teamDesc = createElement('p', undefined,
    'At Real House, we believe in fostering a collaborative and inclusive work environment where every team member can thrive. Our diverse team brings together expertise from real estate, marketing, technology, and customer service to deliver exceptional experiences for our clients.'
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

  if (filteredJobs.length === 0) {
    jobsGrid.style.display = 'none';
    noResults.style.display = 'block';
  } else {
    jobsGrid.style.display = '';
    noResults.style.display = 'none';
    renderJobCards(jobsGrid, filteredJobs);
  }
}

// ─── General Application Section ─────────────────────────────────────────────

function createGeneralApplicationSection(): HTMLElement {
  const section = createElement('section', 'careers-general');
  const container = createElement('div', 'container');

  const content = createElement('div', 'careers-general__content');

  const title = createElement('h2', 'careers-general__title');
  title.textContent = 'Don\'t See Your Perfect Role?';
  content.appendChild(title);

  const desc = createElement('p', 'careers-general__desc',
    'We\'re always looking for talented individuals to join our team. Submit your CV and we\'ll keep you in mind for future opportunities that match your skills and experience.'
  );
  content.appendChild(desc);

  const btn = createElement('a', 'btn btn--primary btn--lg', 'Submit Your CV');
  btn.href = '/contact';
  btn.setAttribute('data-route', '');
  content.appendChild(btn);

  container.appendChild(content);
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

// ─── Application Form ────────────────────────────────────────────────────────

function createApplicationForm(job: JobListing): HTMLElement {
  const form = createElement('div', 'application-form');

  const title = createElement('h3', 'application-form__title', 'Apply for This Position');
  form.appendChild(title);

  const formEl = createElement('form', 'application-form__form');
  formEl.setAttribute('action', '#');
  formEl.setAttribute('method', 'POST');
  formEl.id = 'job-application-form';

  // Hidden job field
  const hiddenJob = createElement('input');
  hiddenJob.type = 'hidden';
  hiddenJob.name = 'position';
  hiddenJob.value = job.title;
  formEl.appendChild(hiddenJob);

  // Name
  const nameGroup = createElement('div', 'application-form__group');
  const nameLabel = createElement('label', 'application-form__label', 'Full Name *');
  nameLabel.setAttribute('for', 'applicant-name');
  nameGroup.appendChild(nameLabel);
  const nameInput = createElement('input', 'application-form__input');
  nameInput.type = 'text';
  nameInput.id = 'applicant-name';
  nameInput.name = 'name';
  nameInput.required = true;
  nameInput.placeholder = 'Enter your full name';
  nameGroup.appendChild(nameInput);
  formEl.appendChild(nameGroup);

  // Email
  const emailGroup = createElement('div', 'application-form__group');
  const emailLabel = createElement('label', 'application-form__label', 'Email Address *');
  emailLabel.setAttribute('for', 'applicant-email');
  emailGroup.appendChild(emailLabel);
  const emailInput = createElement('input', 'application-form__input');
  emailInput.type = 'email';
  emailInput.id = 'applicant-email';
  emailInput.name = 'email';
  emailInput.required = true;
  emailInput.placeholder = 'your.email@example.com';
  emailGroup.appendChild(emailInput);
  formEl.appendChild(emailGroup);

  // Phone
  const phoneGroup = createElement('div', 'application-form__group');
  const phoneLabel = createElement('label', 'application-form__label', 'Phone Number *');
  phoneLabel.setAttribute('for', 'applicant-phone');
  phoneGroup.appendChild(phoneLabel);
  const phoneInput = createElement('input', 'application-form__input');
  phoneInput.type = 'tel';
  phoneInput.id = 'applicant-phone';
  phoneInput.name = 'phone';
  phoneInput.required = true;
  phoneInput.placeholder = '+964 750 XXX XXXX';
  phoneGroup.appendChild(phoneInput);
  formEl.appendChild(phoneGroup);

  // Resume upload
  const resumeGroup = createElement('div', 'application-form__group');
  const resumeLabel = createElement('label', 'application-form__label', 'Resume / CV *');
  resumeLabel.setAttribute('for', 'applicant-resume');
  resumeGroup.appendChild(resumeLabel);

  const resumeUpload = createElement('div', 'application-form__upload');

  const fileInput = createElement('input', 'application-form__file-input');
  fileInput.type = 'file';
  fileInput.id = 'applicant-resume';
  fileInput.name = 'resume';
  fileInput.accept = '.pdf,.doc,.docx';
  fileInput.required = true;
  resumeUpload.appendChild(fileInput);

  const uploadLabel = createElement('label', 'application-form__upload-label');
  uploadLabel.setAttribute('for', 'applicant-resume');

  const uploadSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  uploadSvg.setAttribute('viewBox', '0 0 24 24');
  uploadSvg.setAttribute('fill', 'none');
  uploadSvg.setAttribute('stroke', 'currentColor');
  uploadSvg.setAttribute('stroke-width', '2');
  uploadSvg.setAttribute('class', 'application-form__upload-icon');
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
  uploadSvg.appendChild(path1);
  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '17 8 12 3 7 8');
  uploadSvg.appendChild(polyline);
  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttribute('x1', '12');
  line2.setAttribute('y1', '3');
  line2.setAttribute('x2', '12');
  line2.setAttribute('y2', '15');
  uploadSvg.appendChild(line2);
  uploadLabel.appendChild(uploadSvg);

  const uploadText = createElement('span', undefined, 'Upload your CV (PDF, DOC, DOCX - Max 5MB)');
  uploadLabel.appendChild(uploadText);
  resumeUpload.appendChild(uploadLabel);

  const fileName = createElement('span', 'application-form__file-name');
  fileName.id = 'resume-file-name';
  resumeUpload.appendChild(fileName);

  resumeGroup.appendChild(resumeUpload);
  formEl.appendChild(resumeGroup);

  // Cover Letter
  const coverGroup = createElement('div', 'application-form__group');
  const coverLabel = createElement('label', 'application-form__label', 'Cover Letter');
  coverLabel.setAttribute('for', 'applicant-cover');
  coverGroup.appendChild(coverLabel);
  const coverTextarea = createElement('textarea', 'application-form__textarea');
  coverTextarea.id = 'applicant-cover';
  coverTextarea.name = 'coverLetter';
  coverTextarea.rows = 5;
  coverTextarea.placeholder = 'Tell us why you\'re interested in this role and what makes you a great fit...';
  coverGroup.appendChild(coverTextarea);
  formEl.appendChild(coverGroup);

  // LinkedIn
  const linkedinGroup = createElement('div', 'application-form__group');
  const linkedinLabel = createElement('label', 'application-form__label', 'LinkedIn Profile (Optional)');
  linkedinLabel.setAttribute('for', 'applicant-linkedin');
  linkedinGroup.appendChild(linkedinLabel);
  const linkedinInput = createElement('input', 'application-form__input');
  linkedinInput.type = 'url';
  linkedinInput.id = 'applicant-linkedin';
  linkedinInput.name = 'linkedin';
  linkedinInput.placeholder = 'https://linkedin.com/in/yourprofile';
  linkedinGroup.appendChild(linkedinInput);
  formEl.appendChild(linkedinGroup);

  // Submit
  const submitGroup = createElement('div', 'application-form__group');
  const submitBtn = createElement('button', 'btn btn--primary btn--lg application-form__submit', 'Submit Application');
  submitBtn.type = 'submit';
  submitGroup.appendChild(submitBtn);
  formEl.appendChild(submitGroup);

  // Privacy note
  const privacy = createElement('p', 'application-form__privacy',
    'By submitting this application, you agree to our Privacy Policy and consent to Real House processing your data for recruitment purposes.'
  );
  formEl.appendChild(privacy);

  form.appendChild(formEl);

  // Add event listeners after DOM is ready
  setTimeout(() => {
    const formElement = document.getElementById('job-application-form') as HTMLFormElement;
    const resumeInput = document.getElementById('applicant-resume') as HTMLInputElement;
    const fileNameSpan = document.getElementById('resume-file-name');

    if (resumeInput && fileNameSpan) {
      resumeInput.addEventListener('change', () => {
        if (resumeInput.files && resumeInput.files[0]) {
          fileNameSpan.textContent = resumeInput.files[0].name;
        }
      });
    }

    if (formElement) {
      formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        // Show success message using DOM methods
        while (formElement.firstChild) {
          formElement.removeChild(formElement.firstChild);
        }

        const successMessage = createElement('div', 'application-form__success');

        const successSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        successSvg.setAttribute('viewBox', '0 0 24 24');
        successSvg.setAttribute('fill', 'none');
        successSvg.setAttribute('stroke', 'currentColor');
        successSvg.setAttribute('stroke-width', '2');
        const successPath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        successPath1.setAttribute('d', 'M22 11.08V12a10 10 0 1 1-5.93-9.14');
        successSvg.appendChild(successPath1);
        const successPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        successPath2.setAttribute('points', '22 4 12 14.01 9 11.01');
        successSvg.appendChild(successPath2);
        successMessage.appendChild(successSvg);

        const successTitle = createElement('h4', undefined, 'Application Submitted!');
        successMessage.appendChild(successTitle);

        const successDesc = createElement('p', undefined, 'Thank you for applying. We\'ll review your application and get back to you within 5-7 business days.');
        successMessage.appendChild(successDesc);

        formElement.appendChild(successMessage);
      });
    }
  }, 100);

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
      'streetAddress': 'Queen Tower',
      'addressLocality': 'Erbil',
      'addressRegion': 'Kurdistan Region',
      'postalCode': '44001',
      'addressCountry': 'IQ'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+964-750-792-2138',
      'contactType': 'Human Resources',
      'email': 'careers@realhouseiq.com'
    }
  };
}

export { getJobBySlug, getActiveJobs, getAllJobSlugs } from '../data/careers';
