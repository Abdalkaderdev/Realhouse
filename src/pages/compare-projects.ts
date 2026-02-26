// ═══════════════════════════════════════════════════════════════════════════
// Project Comparison Page
// Full-page comparison view for development projects
// ═══════════════════════════════════════════════════════════════════════════

import {
  getCompareProjects,
  getCompareProjectIds,
  clearProjectCompare,
  loadComparisonFromUrl,
  renderProjectComparisonContent,
  renderEmptyComparisonState,
  createShareComparisonSection
} from '../components/project-compare';
import { t } from '../i18n';

// ─── Helper Functions ─────────────────────────────────────────────────────────
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

// ─── SEO Setup ────────────────────────────────────────────────────────────────
export function setupProjectComparePageSEO(): void {
  // Clear any existing dynamic schemas
  const existingSchemas = document.querySelectorAll('script[data-schema="project-compare"]');
  existingSchemas.forEach(s => s.remove());

  const projects = getCompareProjects();

  if (projects.length === 0) return;

  // Create ItemList schema for comparison
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Project Comparison - Real House Erbil',
    description: 'Compare development projects in Erbil side by side',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'RealEstateListing',
        name: project.name,
        description: project.description.substring(0, 200),
        url: `https://realhouseiq.com/projects/${project.id}`,
        image: project.images[0],
        address: {
          '@type': 'PostalAddress',
          addressLocality: project.location.city,
          addressRegion: project.location.district,
          addressCountry: project.location.country
        },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: project.priceRange.min,
          highPrice: project.priceRange.max,
          priceCurrency: project.priceRange.currency,
          offerCount: project.totalUnits
        }
      }
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'project-compare');
  script.textContent = JSON.stringify(itemListSchema);
  document.head.appendChild(script);
}

// ─── Render Comparison Page ───────────────────────────────────────────────────
export function renderProjectComparePage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Load comparison from URL if present
  loadComparisonFromUrl();

  const page = createElement('div', 'project-compare-page');

  const container = createElement('div', 'container');

  // ─── Breadcrumbs ────────────────────────────────────────────────────────────
  const breadcrumbs = createElement('nav', 'project-compare-page__breadcrumbs');
  breadcrumbs.setAttribute('aria-label', 'Breadcrumb');

  const breadcrumbList = createElement('ol', 'breadcrumb');

  const homeItem = createElement('li', 'breadcrumb__item');
  const homeLink = createElement('a', 'breadcrumb__link', t('compareProjects.home'));
  homeLink.href = '/';
  homeLink.setAttribute('data-route', '');
  homeItem.appendChild(homeLink);
  breadcrumbList.appendChild(homeItem);

  const projectsItem = createElement('li', 'breadcrumb__item');
  const projectsLink = createElement('a', 'breadcrumb__link', t('compareProjects.projects'));
  projectsLink.href = '/projects';
  projectsLink.setAttribute('data-route', '');
  projectsItem.appendChild(projectsLink);
  breadcrumbList.appendChild(projectsItem);

  const currentItem = createElement('li', 'breadcrumb__item breadcrumb__item--current');
  const currentSpan = createElement('span', 'breadcrumb__text', t('compareProjects.compareProjects'));
  currentSpan.setAttribute('aria-current', 'page');
  currentItem.appendChild(currentSpan);
  breadcrumbList.appendChild(currentItem);

  breadcrumbs.appendChild(breadcrumbList);
  container.appendChild(breadcrumbs);

  // ─── Header ─────────────────────────────────────────────────────────────────
  const header = createElement('div', 'project-compare-page__header');

  const title = createElement('h1', 'project-compare-page__title', t('compareProjects.compareDevelopmentProjects'));
  header.appendChild(title);

  const projects = getCompareProjects();

  const subtitle = createElement('p', 'project-compare-page__subtitle');
  if (projects.length > 0) {
    subtitle.textContent = t('compareProjects.comparingProjects', { count: projects.length, plural: projects.length !== 1 ? 's' : '' });
  } else {
    subtitle.textContent = t('compareProjects.compareUpTo3');
  }
  header.appendChild(subtitle);

  // Clear all button (only show if there are projects)
  if (projects.length > 0) {
    const clearBtn = createElement('button', 'btn btn--ghost project-compare-page__clear-btn', t('compareProjects.clearAll'));
    clearBtn.addEventListener('click', () => {
      clearProjectCompare();
      // Re-render page
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      const newPage = renderProjectComparePage();
      const app = document.getElementById('app');
      if (app) {
        while (app.firstChild) {
          app.removeChild(app.firstChild);
        }
        app.appendChild(newPage);
      }
    });
    header.appendChild(clearBtn);
  }

  container.appendChild(header);

  // ─── Comparison Content ─────────────────────────────────────────────────────
  const compareSection = createElement('section', 'project-compare');

  if (projects.length === 0) {
    compareSection.appendChild(renderEmptyComparisonState());
  } else {
    compareSection.appendChild(renderProjectComparisonContent(projects));

    // Add share section
    compareSection.appendChild(createShareComparisonSection());
  }

  container.appendChild(compareSection);

  // ─── CTA Section ────────────────────────────────────────────────────────────
  const ctaSection = createElement('section', 'project-compare-page__cta');

  const ctaContent = createElement('div', 'project-compare-page__cta-content');

  const ctaTitle = createElement('h3', 'project-compare-page__cta-title', t('compareProjects.needHelpDeciding'));
  ctaContent.appendChild(ctaTitle);

  const ctaText = createElement('p', 'project-compare-page__cta-text');
  ctaText.textContent = t('compareProjects.expertHelpText');
  ctaContent.appendChild(ctaText);

  const ctaActions = createElement('div', 'project-compare-page__cta-actions');

  const contactBtn = createElement('a', 'btn btn--primary');
  contactBtn.href = '/contact';
  contactBtn.setAttribute('data-route', '');
  contactBtn.textContent = t('compareProjects.contactOurTeam');
  ctaActions.appendChild(contactBtn);

  const browseBtn = createElement('a', 'btn btn--ghost');
  browseBtn.href = '/projects';
  browseBtn.setAttribute('data-route', '');
  browseBtn.textContent = t('compareProjects.browseMoreProjects');
  ctaActions.appendChild(browseBtn);

  ctaContent.appendChild(ctaActions);
  ctaSection.appendChild(ctaContent);
  container.appendChild(ctaSection);

  // ─── Back Link ──────────────────────────────────────────────────────────────
  const backSection = createElement('div', 'project-compare-page__back');

  const backLink = createElement('a', 'project-compare-page__back-link');
  backLink.href = '/projects';
  backLink.setAttribute('data-route', '');

  // Create arrow icon
  const arrowIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arrowIcon.setAttribute('class', 'icon');
  arrowIcon.setAttribute('viewBox', '0 0 24 24');
  arrowIcon.setAttribute('fill', 'none');
  arrowIcon.setAttribute('stroke', 'currentColor');
  arrowIcon.setAttribute('stroke-width', '2');

  const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arrowPath.setAttribute('d', 'M19 12H5M12 19l-7-7 7-7');
  arrowIcon.appendChild(arrowPath);

  backLink.appendChild(arrowIcon);
  backLink.appendChild(document.createTextNode(t('compareProjects.backToProjects')));

  backSection.appendChild(backLink);
  container.appendChild(backSection);

  page.appendChild(container);
  fragment.appendChild(page);

  // Setup SEO
  setupProjectComparePageSEO();

  return fragment;
}
