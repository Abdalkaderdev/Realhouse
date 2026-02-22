// =============================================================================
// Market Report Page Renderer for Real House
// SEO-Optimized Market Analysis Content
// =============================================================================

import {
  type MarketReport,
  type MarketReportSection,
  getMarketReportBySlug,
  marketReport2025
} from '../data/guides';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  type BreadcrumbItem
} from '../components/internal-linking';

// --- Helper Functions ---
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

// --- Parse HTML Content Safely ---
function parseReportContent(htmlContent: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  const allowedTags = ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br'];

  function processNode(node: Node, parent: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.appendChild(document.createTextNode(node.textContent || ''));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (allowedTags.includes(tagName)) {
        const newElement = document.createElement(tagName);

        if (tagName === 'a') {
          const href = element.getAttribute('href');
          if (href && (href.startsWith('/') || href.startsWith('https://') || href.startsWith('http://'))) {
            newElement.setAttribute('href', href);
            if (href.startsWith('http')) {
              newElement.setAttribute('target', '_blank');
              newElement.setAttribute('rel', 'noopener noreferrer');
            } else {
              newElement.setAttribute('data-route', '');
            }
          }
        }

        node.childNodes.forEach(child => processNode(child, newElement));
        parent.appendChild(newElement);
      } else {
        node.childNodes.forEach(child => processNode(child, parent));
      }
    }
  }

  doc.body.childNodes.forEach(child => processNode(child, fragment));
  return fragment;
}

// --- Breadcrumb Helpers ---
function getMarketReportBreadcrumbs(report: MarketReport): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Market Reports', url: '/market-report' },
    { name: report.title, url: `/market-report/${report.slug}` }
  ];
}

// --- Stats Card Component ---
function createStatsGrid(stats: { label: string; value: string; change?: string }[]): HTMLElement {
  const grid = createElement('div', 'market-report__stats-grid');

  stats.forEach(stat => {
    const card = createElement('div', 'market-report__stat-card');

    const value = createElement('span', 'market-report__stat-value', stat.value);
    card.appendChild(value);

    const label = createElement('span', 'market-report__stat-label', stat.label);
    card.appendChild(label);

    if (stat.change) {
      const change = createElement('span', 'market-report__stat-change');
      const isPositive = stat.change.startsWith('+') || stat.change === 'Stable';
      change.classList.add(isPositive ? 'market-report__stat-change--positive' : 'market-report__stat-change--negative');
      change.textContent = stat.change;
      card.appendChild(change);
    }

    grid.appendChild(card);
  });

  return grid;
}

// --- Price Chart Component (Simple Bar Chart) ---
function createPriceChart(data: { area: string; avgPrice: number; priceChange: number }[]): HTMLElement {
  const chartWrapper = createElement('div', 'market-report__chart');

  const chartTitle = createElement('h4', 'market-report__chart-title', 'Average Price per sqm (USD)');
  chartWrapper.appendChild(chartTitle);

  const maxPrice = Math.max(...data.map(d => d.avgPrice));

  const chart = createElement('div', 'market-report__chart-bars');

  data.forEach(item => {
    const bar = createElement('div', 'market-report__chart-bar');

    const barLabel = createElement('span', 'market-report__chart-label', item.area);
    bar.appendChild(barLabel);

    const barTrack = createElement('div', 'market-report__chart-track');
    const barFill = createElement('div', 'market-report__chart-fill');
    const widthPercent = (item.avgPrice / maxPrice) * 100;
    barFill.style.width = `${widthPercent}%`;
    barTrack.appendChild(barFill);
    bar.appendChild(barTrack);

    const barValue = createElement('span', 'market-report__chart-value');
    barValue.textContent = `$${item.avgPrice.toLocaleString()}`;
    if (item.priceChange !== 0) {
      const changeSpan = createElement('span', item.priceChange > 0 ? 'market-report__chart-change--up' : 'market-report__chart-change--down');
      changeSpan.textContent = ` (${item.priceChange > 0 ? '+' : ''}${item.priceChange}%)`;
      barValue.appendChild(changeSpan);
    }
    bar.appendChild(barValue);

    chart.appendChild(bar);
  });

  chartWrapper.appendChild(chart);
  return chartWrapper;
}

// --- Report Section Component ---
function createReportSection(section: MarketReportSection): HTMLElement {
  const sectionEl = createElement('section', 'market-report__section');
  sectionEl.id = section.id;

  const sectionTitle = createElement('h2', 'market-report__section-title', section.title);
  sectionEl.appendChild(sectionTitle);

  const sectionContent = createElement('div', 'market-report__section-content');
  sectionContent.appendChild(parseReportContent(section.content));
  sectionEl.appendChild(sectionContent);

  // Stats Grid
  if (section.stats && section.stats.length > 0) {
    sectionEl.appendChild(createStatsGrid(section.stats));
  }

  // Price Chart
  if (section.chartData && section.chartData.length > 0) {
    sectionEl.appendChild(createPriceChart(section.chartData));
  }

  return sectionEl;
}

// --- Key Findings Component ---
function createKeyFindings(findings: string[]): HTMLElement {
  const section = createElement('section', 'market-report__key-findings');

  const title = createElement('h2', 'market-report__key-findings-title', 'Key Findings');
  section.appendChild(title);

  const list = createElement('ul', 'market-report__key-findings-list');
  findings.forEach(finding => {
    const item = createElement('li', 'market-report__key-finding');
    const icon = createSVGUse('icon-check');
    item.appendChild(icon);
    item.appendChild(document.createTextNode(finding));
    list.appendChild(item);
  });
  section.appendChild(list);

  return section;
}

// --- Table of Contents ---
function createReportTOC(sections: MarketReportSection[]): HTMLElement {
  const toc = createElement('nav', 'market-report__toc');
  toc.setAttribute('aria-label', 'Report Sections');

  const tocTitle = createElement('h2', 'market-report__toc-title', 'Report Contents');
  toc.appendChild(tocTitle);

  const tocList = createElement('ul', 'market-report__toc-list');

  sections.forEach((section, index) => {
    const item = createElement('li', 'market-report__toc-item');
    const link = createElement('a', 'market-report__toc-link');
    link.href = `#${section.id}`;
    link.textContent = `${index + 1}. ${section.title}`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(section.id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    item.appendChild(link);
    tocList.appendChild(item);
  });

  // Add Key Findings and Outlook
  const extraItems = ['Key Findings', 'Market Outlook'];
  extraItems.forEach(name => {
    const item = createElement('li', 'market-report__toc-item');
    const link = createElement('a', 'market-report__toc-link');
    link.href = `#${name.toLowerCase().replace(' ', '-')}`;
    link.textContent = name;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(name.toLowerCase().replace(' ', '-'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    item.appendChild(link);
    tocList.appendChild(item);
  });

  toc.appendChild(tocList);
  return toc;
}

// =============================================================================
// MAIN MARKET REPORT PAGE RENDERER
// =============================================================================
export function renderMarketReportPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const report = getMarketReportBySlug(slug);

  if (!report) {
    // 404 for report not found
    const page = createElement('div', 'market-report market-report--not-found');
    const container = createElement('div', 'container');

    const errorContent = createElement('div', 'market-report__error');
    const errorTitle = createElement('h1', undefined, 'Report Not Found');
    errorContent.appendChild(errorTitle);
    const errorText = createElement('p', undefined, 'The market report you are looking for does not exist or has been moved.');
    errorContent.appendChild(errorText);
    const backLink = createElement('a', 'btn btn--primary', 'View Properties');
    backLink.href = '/properties';
    backLink.setAttribute('data-route', '');
    errorContent.appendChild(backLink);

    container.appendChild(errorContent);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  // Main page
  const page = createElement('article', 'market-report');
  page.setAttribute('itemscope', '');
  page.setAttribute('itemtype', 'https://schema.org/Report');

  // Hero section
  const hero = createElement('div', 'market-report__hero');
  const heroOverlay = createElement('div', 'market-report__hero-overlay');
  hero.appendChild(heroOverlay);

  const heroContent = createElement('div', 'market-report__hero-content container');

  // Breadcrumbs
  const breadcrumbs = getMarketReportBreadcrumbs(report);
  heroContent.appendChild(createBreadcrumbs(breadcrumbs));
  injectBreadcrumbSchema(breadcrumbs);

  const heroBadge = createElement('span', 'market-report__hero-badge', `${report.year} Market Report`);
  heroContent.appendChild(heroBadge);

  const heroTitle = createElement('h1', 'market-report__hero-title', report.title);
  heroTitle.setAttribute('itemprop', 'name');
  heroContent.appendChild(heroTitle);

  const heroMeta = createElement('div', 'market-report__hero-meta');
  const metaDate = createElement('span', 'market-report__hero-meta-item');
  metaDate.appendChild(createSVGUse('icon-calendar'));
  metaDate.appendChild(document.createTextNode(`Last Updated: ${report.lastUpdated}`));
  metaDate.setAttribute('itemprop', 'dateModified');
  heroMeta.appendChild(metaDate);
  heroContent.appendChild(heroMeta);

  hero.appendChild(heroContent);
  page.appendChild(hero);

  // Main content
  const container = createElement('div', 'container');
  const wrapper = createElement('div', 'market-report__wrapper');

  // Main article
  const article = createElement('div', 'market-report__article');

  // Introduction
  const intro = createElement('div', 'market-report__intro');
  const introText = createElement('p', 'market-report__intro-text', report.introduction);
  introText.setAttribute('itemprop', 'description');
  intro.appendChild(introText);
  article.appendChild(intro);

  // Table of Contents (mobile)
  const tocMobile = createReportTOC(report.sections);
  tocMobile.classList.add('market-report__toc--mobile');
  article.appendChild(tocMobile);

  // Sections
  const sectionsWrapper = createElement('div', 'market-report__sections');
  report.sections.forEach(section => {
    sectionsWrapper.appendChild(createReportSection(section));
  });
  article.appendChild(sectionsWrapper);

  // Key Findings
  const keyFindingsSection = createKeyFindings(report.keyFindings);
  keyFindingsSection.id = 'key-findings';
  article.appendChild(keyFindingsSection);

  // Market Outlook
  const outlookSection = createElement('section', 'market-report__outlook');
  outlookSection.id = 'market-outlook';
  const outlookTitle = createElement('h2', 'market-report__outlook-title', 'Market Outlook');
  outlookSection.appendChild(outlookTitle);
  const outlookContent = createElement('div', 'market-report__outlook-content');
  outlookContent.appendChild(parseReportContent(report.outlook));
  outlookSection.appendChild(outlookContent);
  article.appendChild(outlookSection);

  // Methodology
  const methodologySection = createElement('section', 'market-report__methodology');
  const methodologyTitle = createElement('h3', 'market-report__methodology-title', 'Methodology');
  methodologySection.appendChild(methodologyTitle);
  const methodologyText = createElement('p', 'market-report__methodology-text', report.methodology);
  methodologySection.appendChild(methodologyText);
  article.appendChild(methodologySection);

  wrapper.appendChild(article);

  // Sidebar
  const sidebar = createElement('aside', 'market-report__sidebar');

  // Table of Contents (desktop)
  const tocDesktop = createReportTOC(report.sections);
  tocDesktop.classList.add('market-report__toc--desktop');
  sidebar.appendChild(tocDesktop);

  // Download CTA
  const downloadCard = createElement('div', 'market-report__download-card');
  const downloadTitle = createElement('h3', 'market-report__download-title', 'Get the Full Report');
  downloadCard.appendChild(downloadTitle);
  const downloadText = createElement('p', 'market-report__download-text', 'Contact us to receive the complete market report with additional data and analysis.');
  downloadCard.appendChild(downloadText);
  const downloadBtn = createElement('a', 'btn btn--primary btn--block', 'Request Full Report');
  downloadBtn.href = '/contact';
  downloadBtn.setAttribute('data-route', '');
  downloadCard.appendChild(downloadBtn);
  sidebar.appendChild(downloadCard);

  // CTA Card
  const ctaCard = createElement('div', 'market-report__cta-card');
  const ctaTitle = createElement('h3', 'market-report__cta-title', 'Investment Consultation');
  ctaCard.appendChild(ctaTitle);
  const ctaText = createElement('p', 'market-report__cta-text', 'Get personalized investment advice based on current market conditions.');
  ctaCard.appendChild(ctaText);
  const ctaBtn = createElement('a', 'btn btn--outline btn--block', 'Schedule Consultation');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  ctaCard.appendChild(ctaBtn);
  const ctaPhone = createElement('a', 'market-report__cta-phone', '+964 750 792 2138');
  ctaPhone.href = 'tel:+9647507922138';
  ctaCard.appendChild(ctaPhone);
  sidebar.appendChild(ctaCard);

  // Related Links
  const relatedLinks = createElement('div', 'market-report__related-links');
  const relatedTitle = createElement('h3', 'market-report__related-title', 'Explore More');
  relatedLinks.appendChild(relatedTitle);
  const linksList = createElement('ul', 'market-report__related-list');
  const links = [
    { text: 'Buyer\'s Guide', url: '/guides/buying-property-erbil' },
    { text: 'Investor\'s Guide', url: '/guides/real-estate-investment-erbil' },
    { text: 'Browse Properties', url: '/properties' },
    { text: 'View Projects', url: '/projects' }
  ];
  links.forEach(link => {
    const item = createElement('li');
    const a = createElement('a', undefined, link.text);
    a.href = link.url;
    a.setAttribute('data-route', '');
    item.appendChild(a);
    linksList.appendChild(item);
  });
  relatedLinks.appendChild(linksList);
  sidebar.appendChild(relatedLinks);

  wrapper.appendChild(sidebar);
  container.appendChild(wrapper);

  // Bottom CTA
  const bottomCta = createElement('section', 'market-report__bottom-cta');
  const bottomCtaContent = createElement('div', 'market-report__bottom-cta-content');
  const bottomCtaTitle = createElement('h2', 'market-report__bottom-cta-title', 'Make Informed Investment Decisions');
  bottomCtaContent.appendChild(bottomCtaTitle);
  const bottomCtaText = createElement('p', 'market-report__bottom-cta-text', 'Our expert team combines market data with local expertise to help you find the best property opportunities in Erbil.');
  bottomCtaContent.appendChild(bottomCtaText);
  const bottomCtaActions = createElement('div', 'market-report__bottom-cta-actions');
  const btnProperties = createElement('a', 'btn btn--primary', 'View Available Properties');
  btnProperties.href = '/properties';
  btnProperties.setAttribute('data-route', '');
  bottomCtaActions.appendChild(btnProperties);
  const btnInvest = createElement('a', 'btn btn--outline', 'Investment Consultation');
  btnInvest.href = '/contact';
  btnInvest.setAttribute('data-route', '');
  bottomCtaActions.appendChild(btnInvest);
  bottomCtaContent.appendChild(bottomCtaActions);
  bottomCta.appendChild(bottomCtaContent);
  container.appendChild(bottomCta);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// =============================================================================
// SEO SETUP FOR MARKET REPORT PAGES
// =============================================================================
export function setupMarketReportPageSEO(report: MarketReport): void {
  // Update title
  document.title = report.metaTitle;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', report.metaDescription);
  }

  // Update canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://realhouseiq.com/market-report/${report.slug}`);
  }

  // Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', report.metaTitle);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', report.metaDescription);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `https://realhouseiq.com/market-report/${report.slug}`);

  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) ogType.setAttribute('content', 'article');

  // Report Schema
  const existingSchema = document.querySelector('script[data-schema="market-report"]');
  if (existingSchema) existingSchema.remove();

  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.setAttribute('data-schema', 'market-report');
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: report.title,
    description: report.metaDescription,
    datePublished: report.lastUpdated,
    dateModified: report.lastUpdated,
    author: {
      '@type': 'Organization',
      name: 'Real House',
      url: 'https://realhouseiq.com'
    },
    publisher: {
      '@type': 'RealEstateAgent',
      name: 'Real House',
      url: 'https://realhouseiq.com'
    },
    about: {
      '@type': 'Place',
      name: 'Erbil, Kurdistan, Iraq'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://realhouseiq.com/market-report/${report.slug}`
    },
    inLanguage: 'en',
    isAccessibleForFree: true
  });
  document.head.appendChild(schema);
}
