// ═══════════════════════════════════════════════════════════════════════════
// Projects Page Renderer for Real House
// ═══════════════════════════════════════════════════════════════════════════

import {
  projects,
  getProjectById,
  formatPriceRange,
  type Project,
  getProjectProgress,
  getProjectMilestones,
  getProgressColorClass,
  type ConstructionMilestone
} from '../data/projects';
import { createProjectShareButtons } from '../components/share-buttons';
import {
  createProjectCompareButton,
  initProjectComparisonBar,
  updateProjectComparisonBar
} from '../components/project-compare';
import {
  generateProjectAltText,
  generateProjectTitle,
  createSEOImage,
  generateSrcSet,
  generateSizes,
  updateImageMetaTags,
  generateProjectImageSchema,
  addProjectImageSchemaToPage,
  IMAGE_DIMENSIONS
} from '../utils/image-seo';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  getProjectsBreadcrumbs,
  getProjectDetailBreadcrumbs,
  getRelatedProjects,
  createRelatedProjectsSection,
  createProjectCrossLinks,
  createInternalCTA,
  createLocationLinks
} from '../components/internal-linking';
import { createInquiryButton } from '../components/project-inquiry-form';

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

// ─── Construction Progress Component ──────────────────────────────────────
function createProgressIndicator(project: Project): HTMLElement | null {
  const progress = getProjectProgress(project);

  // Don't show for ready projects (already 100%)
  if (project.status === 'Ready') {
    return null;
  }

  const milestones = getProjectMilestones(project);
  const colorClass = getProgressColorClass(progress);

  // Calculate SVG circle values
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Find current milestone
  const currentMilestone = milestones.find(m => !m.completed) || milestones[milestones.length - 1];

  const container = createElement('div', 'construction-progress');
  container.setAttribute('data-progress', progress.toString());

  // Circular progress ring
  const ring = createElement('div', 'construction-progress__ring');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'construction-progress__svg');
  svg.setAttribute('viewBox', '0 0 48 48');

  // Background track
  const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  track.setAttribute('class', 'construction-progress__track');
  track.setAttribute('cx', '24');
  track.setAttribute('cy', '24');
  track.setAttribute('r', radius.toString());
  svg.appendChild(track);

  // Progress arc
  const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  progressCircle.setAttribute('class', `construction-progress__progress construction-progress__progress${colorClass.replace('progress', '')}`);
  progressCircle.setAttribute('cx', '24');
  progressCircle.setAttribute('cy', '24');
  progressCircle.setAttribute('r', radius.toString());
  progressCircle.setAttribute('stroke-dasharray', circumference.toString());
  progressCircle.setAttribute('stroke-dashoffset', offset.toString());
  svg.appendChild(progressCircle);

  ring.appendChild(svg);

  // Percentage text
  const percentage = createElement('span', 'construction-progress__percentage', `${progress}%`);
  ring.appendChild(percentage);

  container.appendChild(ring);

  // Info section
  const info = createElement('div', 'construction-progress__info');
  const label = createElement('span', 'construction-progress__label', 'Construction');
  info.appendChild(label);

  const milestoneText = createElement('span', 'construction-progress__milestone', currentMilestone.title);
  info.appendChild(milestoneText);

  container.appendChild(info);

  // Tooltip with milestones
  const tooltip = createElement('div', 'construction-progress__tooltip');
  const tooltipTitle = createElement('div', 'construction-progress__tooltip-title', 'Construction Milestones');
  tooltip.appendChild(tooltipTitle);

  const milestonesContainer = createElement('div', 'construction-progress__milestones');
  milestones.forEach(milestone => {
    const item = createElement('div', `construction-progress__milestone-item${milestone.completed ? ' construction-progress__milestone-item--completed' : ''}`);

    const icon = createElement('div', 'construction-progress__milestone-icon');
    if (milestone.completed) {
      const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkSvg.setAttribute('viewBox', '0 0 24 24');
      checkSvg.setAttribute('fill', 'none');
      checkSvg.setAttribute('stroke', 'currentColor');
      checkSvg.setAttribute('stroke-width', '3');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M5 13l4 4L19 7');
      checkSvg.appendChild(path);
      icon.appendChild(checkSvg);
    }
    item.appendChild(icon);

    const content = createElement('div', 'construction-progress__milestone-content');
    const date = createElement('div', 'construction-progress__milestone-date', milestone.date);
    const title = createElement('div', 'construction-progress__milestone-title', milestone.title);
    content.appendChild(date);
    content.appendChild(title);
    item.appendChild(content);

    milestonesContainer.appendChild(item);
  });

  tooltip.appendChild(milestonesContainer);
  container.appendChild(tooltip);

  return container;
}

// ─── Linear Progress Bar Component ─────────────────────────────────────────
function createProgressBar(project: Project): HTMLElement | null {
  const progress = getProjectProgress(project);

  // Don't show for ready projects
  if (project.status === 'Ready') {
    return null;
  }

  const colorClass = getProgressColorClass(progress);

  const container = createElement('div', 'progress-bar');
  container.setAttribute('data-progress', progress.toString());

  const fill = createElement('div', `progress-bar__fill progress-bar__fill${colorClass.replace('progress', '')}`);
  fill.style.width = `${progress}%`;
  container.appendChild(fill);

  const label = createElement('span', 'progress-bar__label', `${progress}%`);
  container.appendChild(label);

  return container;
}

// ─── Detail Page Progress Section ──────────────────────────────────────────
function createDetailProgressSection(project: Project): HTMLElement {
  const progress = getProjectProgress(project);
  const milestones = getProjectMilestones(project);
  const colorClass = getProgressColorClass(progress);

  const container = createElement('div', 'progress-detail');

  // Large circular progress
  const progressCircleContainer = createElement('div', 'progress-detail__circle');

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'progress-detail__svg');
  svg.setAttribute('viewBox', '0 0 140 140');

  // Background track
  const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  track.setAttribute('class', 'progress-detail__track');
  track.setAttribute('cx', '70');
  track.setAttribute('cy', '70');
  track.setAttribute('r', radius.toString());
  track.setAttribute('fill', 'none');
  track.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
  track.setAttribute('stroke-width', '8');
  svg.appendChild(track);

  // Progress arc
  const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  progressCircle.setAttribute('class', `progress-detail__progress progress-detail__progress${colorClass.replace('progress', '')}`);
  progressCircle.setAttribute('cx', '70');
  progressCircle.setAttribute('cy', '70');
  progressCircle.setAttribute('r', radius.toString());
  progressCircle.setAttribute('fill', 'none');
  progressCircle.setAttribute('stroke-width', '8');
  progressCircle.setAttribute('stroke-linecap', 'round');
  progressCircle.setAttribute('stroke-dasharray', circumference.toString());
  progressCircle.setAttribute('stroke-dashoffset', offset.toString());
  progressCircle.style.transform = 'rotate(-90deg)';
  progressCircle.style.transformOrigin = 'center';
  svg.appendChild(progressCircle);

  progressCircleContainer.appendChild(svg);

  // Percentage in center
  const percentageContainer = createElement('div', 'progress-detail__percentage-container');
  const percentageValue = createElement('span', 'progress-detail__percentage', `${progress}`);
  const percentageSymbol = createElement('span', 'progress-detail__percentage-symbol', '%');
  const percentageLabel = createElement('span', 'progress-detail__percentage-label', 'Complete');
  percentageContainer.appendChild(percentageValue);
  percentageContainer.appendChild(percentageSymbol);
  percentageContainer.appendChild(percentageLabel);
  progressCircleContainer.appendChild(percentageContainer);

  container.appendChild(progressCircleContainer);

  // Milestones timeline
  const timeline = createElement('div', 'progress-detail__timeline');

  milestones.forEach((milestone, index) => {
    const item = createElement('div', `progress-detail__milestone${milestone.completed ? ' progress-detail__milestone--completed' : ''}`);

    const connector = createElement('div', 'progress-detail__connector');
    if (index < milestones.length - 1) {
      const line = createElement('div', `progress-detail__connector-line${milestone.completed ? ' progress-detail__connector-line--completed' : ''}`);
      connector.appendChild(line);
    }

    const dot = createElement('div', 'progress-detail__dot');
    if (milestone.completed) {
      const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkSvg.setAttribute('viewBox', '0 0 24 24');
      checkSvg.setAttribute('fill', 'none');
      checkSvg.setAttribute('stroke', 'currentColor');
      checkSvg.setAttribute('stroke-width', '3');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M5 13l4 4L19 7');
      checkSvg.appendChild(path);
      dot.appendChild(checkSvg);
    }
    connector.appendChild(dot);
    item.appendChild(connector);

    const content = createElement('div', 'progress-detail__content');
    const date = createElement('div', 'progress-detail__date', milestone.date);
    const title = createElement('div', 'progress-detail__title', milestone.title);
    const description = createElement('div', 'progress-detail__description', milestone.description);
    content.appendChild(date);
    content.appendChild(title);
    content.appendChild(description);
    item.appendChild(content);

    timeline.appendChild(item);
  });

  container.appendChild(timeline);

  return container;
}

// ─── Project Filter State ─────────────────────────────────────────────────
interface ProjectFilterState {
  status: string;
}

let currentProjectFilterState: ProjectFilterState = {
  status: 'All'
};

// ─── Project Card Component ───────────────────────────────────────────────
function createProjectCard(project: Project): HTMLElement {
  const card = createElement('article', 'project-card');
  card.setAttribute('data-id', project.id);

  // Media section
  const media = createElement('div', 'project-card__media');

  // SEO-Optimized project image
  const img = createSEOImage({
    src: project.images[0],
    alt: generateProjectAltText(project, 0, 'card'),
    title: generateProjectTitle(project),
    className: 'project-card__image',
    loading: 'lazy',
    width: IMAGE_DIMENSIONS.card.width,
    height: IMAGE_DIMENSIONS.card.height,
    srcset: generateSrcSet(project.images[0], [400, 600, 800]),
    sizes: generateSizes('card'),
  });
  media.appendChild(img);

  const overlay = createElement('div', 'project-card__overlay');
  media.appendChild(overlay);

  // Status badge
  const statusBadge = createElement('div', 'project-card__status');
  const statusClass = project.status === 'Ready' ? 'project-card__status--ready' :
                      project.status === 'Coming Soon' ? 'project-card__status--coming' :
                      'project-card__status--construction';
  statusBadge.className = `project-card__status ${statusClass}`;
  statusBadge.textContent = project.status;
  media.appendChild(statusBadge);

  // Compare button
  const compareBtn = createProjectCompareButton(project.id);
  media.appendChild(compareBtn);

  // Add construction progress indicator for non-ready projects
  const progressIndicator = createProgressIndicator(project);
  if (progressIndicator) {
    // Position the progress indicator at bottom of media section
    progressIndicator.style.position = 'absolute';
    progressIndicator.style.bottom = 'var(--space-3)';
    progressIndicator.style.left = 'var(--space-3)';
    progressIndicator.style.right = 'var(--space-3)';
    progressIndicator.style.zIndex = '5';
    media.appendChild(progressIndicator);
  }

  card.appendChild(media);

  // Content section
  const content = createElement('div', 'project-card__content');

  const title = createElement('h3', 'project-card__title', project.name);
  content.appendChild(title);

  const location = createElement('p', 'project-card__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${project.location.district}, ${project.location.city}`));
  content.appendChild(location);

  // Stats
  const stats = createElement('div', 'project-card__stats');

  const unitsInfo = createElement('div', 'project-card__stat');
  const unitsLabel = createElement('span', 'project-card__stat-label', 'Available Units');
  const unitsValue = createElement('span', 'project-card__stat-value', `${project.availableUnits.toLocaleString()} / ${project.totalUnits.toLocaleString()}`);
  unitsInfo.appendChild(unitsLabel);
  unitsInfo.appendChild(unitsValue);
  stats.appendChild(unitsInfo);

  const priceInfo = createElement('div', 'project-card__stat');
  const priceLabel = createElement('span', 'project-card__stat-label', 'Price Range');
  const priceValue = createElement('span', 'project-card__stat-value', formatPriceRange(project));
  priceInfo.appendChild(priceLabel);
  priceInfo.appendChild(priceValue);
  stats.appendChild(priceInfo);

  content.appendChild(stats);

  // Footer
  const footer = createElement('div', 'project-card__footer');

  const completion = createElement('span', 'project-card__completion');
  completion.appendChild(createSVGUse('icon-calendar'));
  completion.appendChild(document.createTextNode(`Completion: ${project.completionDate}`));
  footer.appendChild(completion);

  // Action buttons container
  const footerActions = createElement('div', 'project-card__actions');

  // Inquiry button
  const inquiryBtn = createInquiryButton(project, 'sm');
  footerActions.appendChild(inquiryBtn);

  // View Project button
  const viewBtn = createElement('a', 'btn btn--ghost btn--sm', 'View Project');
  viewBtn.href = `/projects/${project.id}`;
  viewBtn.setAttribute('data-route', '');
  footerActions.appendChild(viewBtn);

  footer.appendChild(footerActions);

  content.appendChild(footer);
  card.appendChild(content);

  return card;
}

// ─── Projects Listing Page ────────────────────────────────────────────────
export function renderProjectsPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Reset filter state when page loads
  currentProjectFilterState = {
    status: 'All'
  };

  const page = createElement('div', 'projects-page');
  const container = createElement('div', 'container');

  // Breadcrumbs
  const breadcrumbItems = getProjectsBreadcrumbs();
  container.appendChild(createBreadcrumbs(breadcrumbItems));
  injectBreadcrumbSchema(breadcrumbItems);

  // Header
  const header = createElement('div', 'projects-page__header');
  const title = createElement('h1', 'projects-page__title');
  title.textContent = 'Real Estate Erbil Development — Houses for Sale Erbil & Apartments Erbil Iraq ';
  const em = createElement('em', undefined, 'Projects');
  title.appendChild(em);
  header.appendChild(title);
  const subtitle = createElement('p', 'projects-page__subtitle', 'Explore premier property Erbil developments including houses for sale Erbil, apartments Erbil Iraq, penthouse Erbil, and luxury homes Kurdistan. Best real estate agent Erbil for property investment Kurdistan Iraq opportunities. Browse villas Erbil Iraq and real estate Kurdistan in the growing Erbil property market.');
  header.appendChild(subtitle);
  container.appendChild(header);

  // Status Filter
  const filterGroup = createElement('div', 'projects-page__filter-group');
  const filterLabel = createElement('span', 'projects-page__filter-label', 'Status:');
  filterGroup.appendChild(filterLabel);
  const statuses = ['All', 'Ready', 'Under Construction', 'Coming Soon'];
  statuses.forEach((status, index) => {
    const btn = createElement('button', `projects-page__filter${index === 0 ? ' active' : ''}`, status);
    btn.setAttribute('data-filter-status', status);
    filterGroup.appendChild(btn);
  });
  container.appendChild(filterGroup);

  // Grid
  const grid = createElement('div', 'projects-page__grid');
  grid.id = 'projects-grid';
  projects.forEach(project => {
    grid.appendChild(createProjectCard(project));
  });
  container.appendChild(grid);

  page.appendChild(container);

  // ─── Location Links Section ─────────────────────────────────────────────
  const locationLinks = createLocationLinks();
  page.appendChild(locationLinks);

  // ─── Internal CTA for Projects Page ─────────────────────────────────────
  const listingCta = createInternalCTA(
    'Need Help Finding the Right Project?',
    'Our property experts can guide you to the perfect investment opportunity based on your goals and budget.',
    { text: 'Contact Our Team', url: '/contact' },
    { text: 'Browse Properties', url: '/properties' }
  );
  page.appendChild(listingCta);

  fragment.appendChild(page);

  // Function to re-render the grid
  function renderGrid() {
    const gridEl = document.getElementById('projects-grid');
    if (!gridEl) return;

    // Clear the grid safely
    while (gridEl.firstChild) {
      gridEl.removeChild(gridEl.firstChild);
    }

    // Filter projects
    const filteredProjects = projects.filter(project => {
      if (currentProjectFilterState.status !== 'All' && project.status !== currentProjectFilterState.status) {
        return false;
      }
      return true;
    });

    if (filteredProjects.length === 0) {
      const noResults = createElement('div', 'projects-page__no-results');
      const noResultsTitle = createElement('h3', undefined, 'No projects found');
      const noResultsText = createElement('p', undefined, 'Try selecting a different status filter.');
      noResults.appendChild(noResultsTitle);
      noResults.appendChild(noResultsText);
      gridEl.appendChild(noResults);
    } else {
      filteredProjects.forEach(project => {
        gridEl.appendChild(createProjectCard(project));
      });
    }
  }

  // Add event listeners after the fragment is appended to DOM
  setTimeout(() => {
    const filterButtons = document.querySelectorAll('.projects-page__filter');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const status = btn.getAttribute('data-filter-status');
        if (!status) return;

        // Update active state
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update filter state
        currentProjectFilterState.status = status;

        // Re-render the grid
        renderGrid();

        // Update comparison bar after re-render
        updateProjectComparisonBar();
      });
    });

    // Initialize project comparison bar
    initProjectComparisonBar();
    updateProjectComparisonBar();
  }, 0);

  return fragment;
}

// ─── Project Detail Page ──────────────────────────────────────────────────
export function renderProjectDetailPage(projectId: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const project = getProjectById(projectId);

  if (!project) {
    // 404 - Project not found
    const page = createElement('div', 'project-detail-page project-detail-page--not-found');
    const container = createElement('div', 'container');

    const content = createElement('div', 'project-detail-page__not-found');
    const title = createElement('h1', undefined, 'Project Not Found');
    const message = createElement('p', undefined, 'The project you are looking for does not exist or has been removed.');
    const backLink = createElement('a', 'btn btn--primary', 'Browse All Projects');
    backLink.href = '/projects';
    backLink.setAttribute('data-route', '');

    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(backLink);
    container.appendChild(content);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  const page = createElement('div', 'project-detail-page');

  // ─── Breadcrumbs Section ────────────────────────────────────────────────
  const breadcrumbSection = createElement('section', 'project-detail__breadcrumbs');
  const breadcrumbContainer = createElement('div', 'container');
  const breadcrumbItems = getProjectDetailBreadcrumbs(project);
  breadcrumbContainer.appendChild(createBreadcrumbs(breadcrumbItems));
  breadcrumbSection.appendChild(breadcrumbContainer);
  page.appendChild(breadcrumbSection);

  // Inject breadcrumb schema for SEO
  injectBreadcrumbSchema(breadcrumbItems);

  // ─── Gallery Section ─────────────────────────────────────────────────────
  const gallery = createElement('section', 'project-gallery');
  const galleryContainer = createElement('div', 'container');

  // Main image with SEO-optimized attributes
  const mainImageWrapper = createElement('div', 'project-gallery__main');
  const mainImage = createSEOImage({
    src: project.images[0],
    alt: generateProjectAltText(project, 0, 'detail'),
    title: generateProjectTitle(project),
    className: 'project-gallery__main-image',
    loading: 'eager',
    width: IMAGE_DIMENSIONS.detail.width,
    height: IMAGE_DIMENSIONS.detail.height,
    srcset: generateSrcSet(project.images[0], [600, 800, 1200]),
    sizes: generateSizes('detail'),
    fetchPriority: 'high',
  });
  mainImage.id = 'project-main-image';
  mainImageWrapper.appendChild(mainImage);
  galleryContainer.appendChild(mainImageWrapper);

  // Update meta tags for social sharing
  updateImageMetaTags(project.images[0], generateProjectAltText(project, 0, 'detail'), 'project');

  // Add structured data for project images (ImageObject schema)
  addProjectImageSchemaToPage(project);

  // Thumbnails with SEO-optimized images
  if (project.images.length > 1) {
    const thumbnails = createElement('div', 'project-gallery__thumbnails');
    thumbnails.setAttribute('role', 'group');
    thumbnails.setAttribute('aria-label', 'Project image gallery');
    project.images.forEach((imageSrc, index) => {
      const thumb = createElement('button', `project-gallery__thumb${index === 0 ? ' active' : ''}`);
      thumb.setAttribute('data-index', index.toString());
      thumb.setAttribute('aria-label', `View image ${index + 1} of ${project.images.length}`);
      thumb.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      // SEO-optimized thumbnail
      const thumbImg = createSEOImage({
        src: imageSrc,
        alt: '', // Decorative, button has aria-label
        loading: 'lazy',
        width: IMAGE_DIMENSIONS.thumbnail.width,
        height: IMAGE_DIMENSIONS.thumbnail.height,
      });
      thumbImg.setAttribute('aria-hidden', 'true');
      thumb.appendChild(thumbImg);

      thumb.addEventListener('click', () => {
        const mainImg = document.getElementById('project-main-image') as HTMLImageElement;
        if (mainImg) {
          mainImg.src = imageSrc;
          mainImg.alt = generateProjectAltText(project, index, 'gallery');
          mainImg.title = `${project.name} - Image ${index + 1} of ${project.images.length}`;
        }
        thumbnails.querySelectorAll('.project-gallery__thumb').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-pressed', 'false');
        });
        thumb.classList.add('active');
        thumb.setAttribute('aria-pressed', 'true');
      });

      thumbnails.appendChild(thumb);
    });
    galleryContainer.appendChild(thumbnails);
  }

  gallery.appendChild(galleryContainer);
  page.appendChild(gallery);

  // ─── Content Section ─────────────────────────────────────────────────────
  const content = createElement('section', 'project-detail');
  const contentContainer = createElement('div', 'container');
  const contentGrid = createElement('div', 'project-detail__grid');

  // ─── Left Column - Main Info ─────────────────────────────────────────────
  const mainInfo = createElement('div', 'project-detail__main');

  // Header
  const header = createElement('div', 'project-detail__header');

  const statusTag = createElement('span', 'project-detail__status');
  const statusClass = project.status === 'Ready' ? 'project-detail__status--ready' :
                      project.status === 'Coming Soon' ? 'project-detail__status--coming' :
                      'project-detail__status--construction';
  statusTag.className = `project-detail__status ${statusClass}`;
  statusTag.textContent = project.status;
  header.appendChild(statusTag);

  const projectTitle = createElement('h1', 'project-detail__title', project.name);
  header.appendChild(projectTitle);

  const location = createElement('p', 'project-detail__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${project.location.address}, ${project.location.district}, ${project.location.city}`));
  header.appendChild(location);

  mainInfo.appendChild(header);

  // Key Stats
  const statsSection = createElement('div', 'project-detail__stats');
  const statsTitle = createElement('h3', 'project-detail__section-title', 'Project Overview');
  statsSection.appendChild(statsTitle);

  const statsGrid = createElement('div', 'project-detail__stats-grid');

  const statsData = [
    { label: 'Total Units', value: project.totalUnits.toLocaleString() },
    { label: 'Available Units', value: project.availableUnits.toLocaleString() },
    { label: 'Price Range', value: formatPriceRange(project) },
    { label: 'Completion', value: project.completionDate }
  ];

  statsData.forEach(stat => {
    const statItem = createElement('div', 'project-detail__stat-item');
    const statValue = createElement('span', 'project-detail__stat-value', stat.value);
    const statLabel = createElement('span', 'project-detail__stat-label', stat.label);
    statItem.appendChild(statValue);
    statItem.appendChild(statLabel);
    statsGrid.appendChild(statItem);
  });

  statsSection.appendChild(statsGrid);

  // Add construction progress section for non-ready projects
  if (project.status !== 'Ready') {
    const progressSection = createElement('div', 'project-detail__progress-section');
    const progressTitle = createElement('h4', 'project-detail__progress-title', 'Construction Progress');
    progressSection.appendChild(progressTitle);

    // Create detailed progress component
    const detailProgressIndicator = createDetailProgressSection(project);
    progressSection.appendChild(detailProgressIndicator);

    statsSection.appendChild(progressSection);
  }

  mainInfo.appendChild(statsSection);

  // Description
  const descSection = createElement('div', 'project-detail__description');
  const descTitle = createElement('h3', 'project-detail__section-title', 'About This Project');
  descSection.appendChild(descTitle);

  const descParagraphs = project.description.split('\n\n');
  descParagraphs.forEach(para => {
    if (para.trim()) {
      const p = createElement('p', 'project-detail__description-text', para.trim());
      descSection.appendChild(p);
    }
  });
  mainInfo.appendChild(descSection);

  // Amenities
  const amenitiesSection = createElement('div', 'project-detail__amenities');
  const amenitiesTitle = createElement('h3', 'project-detail__section-title', 'Amenities & Features');
  amenitiesSection.appendChild(amenitiesTitle);

  const amenitiesList = createElement('ul', 'project-detail__amenities-list');
  project.amenities.forEach(amenity => {
    const amenityItem = createElement('li', 'project-detail__amenity');
    amenityItem.appendChild(createSVGUse('icon-check'));
    amenityItem.appendChild(document.createTextNode(amenity));
    amenitiesList.appendChild(amenityItem);
  });
  amenitiesSection.appendChild(amenitiesList);
  mainInfo.appendChild(amenitiesSection);

  contentGrid.appendChild(mainInfo);

  // ─── Right Column - Sidebar ──────────────────────────────────────────────
  const sidebar = createElement('div', 'project-detail__sidebar');

  // Contact Card
  const contactCard = createElement('div', 'project-detail__contact-card');
  const contactTitle = createElement('h3', 'project-detail__contact-title', 'Interested in This Property Erbil Project?');
  contactCard.appendChild(contactTitle);

  const contactText = createElement('p', 'project-detail__contact-text', 'Contact our best real estate agent Erbil team for available units, luxury villa Erbil price details, and payment plans. We help you buy house in Erbil Iraq with flexible property investment Kurdistan Iraq options.');
  contactCard.appendChild(contactText);

  const contactActions = createElement('div', 'project-detail__contact-actions');

  // Quick Inquiry Button (opens modal)
  const quickInquiryBtn = createInquiryButton(project, 'primary');
  quickInquiryBtn.classList.add('btn--full');
  const inquiryBtnText = quickInquiryBtn.querySelector('.inquiry-btn__text');
  if (inquiryBtnText) inquiryBtnText.textContent = 'Quick Inquiry';
  contactActions.appendChild(quickInquiryBtn);

  const callBtn = createElement('a', 'btn btn--ghost btn--full', 'Call +964 750 792 2138');
  callBtn.href = 'tel:+9647507922138';
  contactActions.appendChild(callBtn);

  // WhatsApp Quick Contact
  const whatsappBtn = createElement('a', 'btn btn--whatsapp btn--full');
  whatsappBtn.href = `https://wa.me/9647507922138?text=${encodeURIComponent(`Hi, I'm interested in ${project.name}`)}`;
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  const whatsappIcon = createSVGUse('icon-whatsapp');
  whatsappBtn.appendChild(whatsappIcon);
  whatsappBtn.appendChild(document.createTextNode(' WhatsApp Us'));
  contactActions.appendChild(whatsappBtn);

  contactCard.appendChild(contactActions);
  sidebar.appendChild(contactCard);

  // Location Info Card
  const locationCard = createElement('div', 'project-detail__location-card');
  const locationCardTitle = createElement('h3', 'project-detail__location-title', 'Location');
  locationCard.appendChild(locationCardTitle);

  const addressInfo = createElement('div', 'project-detail__address-info');

  const addressLine = createElement('p', 'project-detail__address-line');
  addressLine.appendChild(createSVGUse('icon-location'));
  addressLine.appendChild(document.createTextNode(project.location.address));
  addressInfo.appendChild(addressLine);

  const cityLine = createElement('p', 'project-detail__city-line', `${project.location.district}, ${project.location.city}`);
  addressInfo.appendChild(cityLine);

  const countryLine = createElement('p', 'project-detail__country-line', project.location.country);
  addressInfo.appendChild(countryLine);

  locationCard.appendChild(addressInfo);
  sidebar.appendChild(locationCard);

  // ─── Social Share Section ─────────────────────────────────────────────────
  const shareSection = createElement('div', 'project-share');
  const shareTitle = createElement('h4', 'project-share__title', 'Share This Project');
  shareSection.appendChild(shareTitle);
  const shareButtons = createProjectShareButtons(project);
  shareSection.appendChild(shareButtons);
  sidebar.appendChild(shareSection);

  contentGrid.appendChild(sidebar);
  contentContainer.appendChild(contentGrid);
  content.appendChild(contentContainer);
  page.appendChild(content);

  // ─── Related Projects Section ───────────────────────────────────────────
  const relatedProjects = getRelatedProjects(project, 3);
  if (relatedProjects.length > 0) {
    const relatedSection = createRelatedProjectsSection(relatedProjects);
    page.appendChild(relatedSection);
  }

  // ─── Cross-Content Links (Properties & Blog) ─────────────────────────────
  const crossLinks = createProjectCrossLinks(project);
  if (crossLinks.children.length > 0) {
    page.appendChild(crossLinks);
  }

  // ─── Internal CTA ─────────────────────────────────────────────────────────
  const ctaSection = createInternalCTA(
    'Looking for Similar Properties?',
    'Browse our complete collection of luxury properties in Erbil, or contact our experts for personalized recommendations.',
    { text: 'View All Properties', url: '/properties' },
    { text: 'Contact Us', url: '/contact' }
  );
  page.appendChild(ctaSection);

  // ─── Back Link ───────────────────────────────────────────────────────────
  const backSection = createElement('section', 'project-detail__back');
  const backContainer = createElement('div', 'container');
  const backLink = createElement('a', 'project-detail__back-link', 'Back to Projects');
  backLink.href = '/projects';
  backLink.setAttribute('data-route', '');
  const backIcon = createSVGUse('icon-arrow-left');
  backLink.insertBefore(backIcon, backLink.firstChild);
  backContainer.appendChild(backLink);
  backSection.appendChild(backContainer);
  page.appendChild(backSection);

  fragment.appendChild(page);
  return fragment;
}
