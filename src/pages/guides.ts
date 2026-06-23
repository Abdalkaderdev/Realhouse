// =============================================================================
// Guide Pages Renderer for Real House
// SEO-Optimized Informational Content Pages
// =============================================================================

import {
  type Guide,
  type GuideSection,
  getGuideBySlug,
  allGuides
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

function createSVG(paths: string[], viewBox: string = '0 0 24 24'): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  paths.forEach(d => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  });

  return svg;
}

// --- Parse HTML Content Safely ---
function parseGuideContent(htmlContent: string): DocumentFragment {
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
function getGuideBreadcrumbs(guide: Guide): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: guide.title, url: `/guides/${guide.slug}` }
  ];
}

// --- Table of Contents Component ---
function createTableOfContents(sections: GuideSection[]): HTMLElement {
  const toc = createElement('nav', 'guide-page__toc');
  toc.setAttribute('aria-label', 'Table of Contents');

  const tocTitle = createElement('h2', 'guide-page__toc-title', 'In This Guide');
  toc.appendChild(tocTitle);

  const tocList = createElement('ul', 'guide-page__toc-list');

  sections.forEach((section, index) => {
    const item = createElement('li', 'guide-page__toc-item');
    const link = createElement('a', 'guide-page__toc-link');
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

  toc.appendChild(tocList);
  return toc;
}

// --- Styled Callout Box (Tip / Warning / Note / Pro Tip) ---
type CalloutVariant = 'tip' | 'warning' | 'note' | 'pro-tip';

function createCalloutBox(variant: CalloutVariant, title: string, items: string[]): HTMLElement {
  const box = createElement('aside', `guide-callout guide-callout--${variant}`);
  box.setAttribute('role', 'note');

  const head = createElement('div', 'guide-callout__head');

  const iconWrap = createElement('span', 'guide-callout__icon');
  const iconMap: Record<CalloutVariant, string> = {
    'tip': 'icon-check',
    'warning': 'icon-warning',
    'note': 'icon-info',
    'pro-tip': 'icon-check'
  };
  iconWrap.appendChild(createSVGUse(iconMap[variant]));
  head.appendChild(iconWrap);

  const titleEl = createElement('h4', 'guide-callout__title', title);
  head.appendChild(titleEl);

  box.appendChild(head);

  const list = createElement('ul', 'guide-callout__list');
  items.forEach(text => {
    const li = createElement('li', 'guide-callout__item', text);
    list.appendChild(li);
  });
  box.appendChild(list);
  return box;
}

// --- Guide Section Component ---
function createGuideSection(section: GuideSection, index: number): HTMLElement {
  const sectionEl = createElement('section', 'guide-page__section');
  sectionEl.id = section.id;

  const sectionNumber = createElement('span', 'guide-page__section-number', `${index + 1}`);
  sectionEl.appendChild(sectionNumber);

  const sectionTitle = createElement('h2', 'guide-page__section-title', section.title);
  sectionEl.appendChild(sectionTitle);

  const sectionContent = createElement('div', 'guide-page__section-content');
  sectionContent.appendChild(parseGuideContent(section.content));
  sectionEl.appendChild(sectionContent);

  // Tips -> Pro Tip styled callout
  if (section.tips && section.tips.length > 0) {
    sectionEl.appendChild(createCalloutBox('pro-tip', 'Pro Tip', section.tips));
  }

  // Warnings -> Warning callout
  if (section.warnings && section.warnings.length > 0) {
    sectionEl.appendChild(createCalloutBox('warning', 'Important', section.warnings));
  }

  return sectionEl;
}

// --- Helpful Feedback Widget ---
function createFeedbackWidget(guideSlug: string): HTMLElement {
  const widget = createElement('section', 'guide-feedback');
  widget.setAttribute('aria-label', 'Was this guide helpful?');

  const title = createElement('h3', 'guide-feedback__title', 'Was this guide helpful?');
  widget.appendChild(title);

  const actions = createElement('div', 'guide-feedback__actions');

  const yesBtn = createElement('button', 'guide-feedback__btn guide-feedback__btn--yes');
  yesBtn.type = 'button';
  yesBtn.setAttribute('aria-label', 'Yes, this guide was helpful');
  yesBtn.appendChild(createSVG(['M7 10v12', 'M15 5.88L14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H7V10l5-9 1 1 .88 3.88z']));
  yesBtn.appendChild(document.createTextNode(' Yes'));

  const noBtn = createElement('button', 'guide-feedback__btn guide-feedback__btn--no');
  noBtn.type = 'button';
  noBtn.setAttribute('aria-label', 'No, this guide was not helpful');
  noBtn.appendChild(createSVG(['M17 14V2', 'M9 18.12L10 14H4.17a2 2 0 01-1.92-2.56l2.33-8A2 2 0 016.5 2H17v12l-5 9-1-1-1-3.88z']));
  noBtn.appendChild(document.createTextNode(' No'));

  const thanksMsg = createElement('p', 'guide-feedback__thanks', 'Thanks for your feedback!');
  thanksMsg.hidden = true;

  const followUp = createElement('div', 'guide-feedback__followup');
  followUp.hidden = true;
  const followLabel = createElement('label', 'guide-feedback__label', 'How can we improve?');
  followLabel.htmlFor = `guide-feedback-text-${guideSlug}`;
  const textarea = createElement('textarea', 'guide-feedback__textarea');
  textarea.id = `guide-feedback-text-${guideSlug}`;
  textarea.placeholder = 'Tell us what we missed...';
  textarea.rows = 3;
  const submitBtn = createElement('button', 'btn btn--primary btn--sm guide-feedback__submit', 'Send feedback');
  submitBtn.type = 'button';
  followUp.appendChild(followLabel);
  followUp.appendChild(textarea);
  followUp.appendChild(submitBtn);

  yesBtn.addEventListener('click', () => {
    actions.hidden = true;
    thanksMsg.hidden = false;
  });
  noBtn.addEventListener('click', () => {
    actions.hidden = true;
    followUp.hidden = false;
  });
  submitBtn.addEventListener('click', () => {
    followUp.hidden = true;
    thanksMsg.hidden = false;
  });

  actions.appendChild(yesBtn);
  actions.appendChild(noBtn);
  widget.appendChild(actions);
  widget.appendChild(followUp);
  widget.appendChild(thanksMsg);
  return widget;
}

// --- Download PDF Button (uses window.print as a PDF approximation) ---
function createDownloadPdfButton(guide: Guide): HTMLElement {
  const btn = createElement('button', 'guide-page__download-pdf btn btn--outline');
  btn.type = 'button';
  btn.setAttribute('aria-label', `Download ${guide.title} as PDF`);
  btn.appendChild(createSVG(['M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3']));
  btn.appendChild(document.createTextNode(' Download PDF'));
  btn.addEventListener('click', () => {
    window.print();
  });
  return btn;
}

// --- FAQ Accordion for Guide ---
function createGuideFAQ(faqs: { question: string; answer: string }[]): HTMLElement {
  const faqSection = createElement('section', 'guide-page__faq');

  const faqTitle = createElement('h2', 'guide-page__faq-title', 'Frequently Asked Questions');
  faqSection.appendChild(faqTitle);

  const accordion = createElement('div', 'guide-page__faq-accordion');
  accordion.setAttribute('itemscope', '');
  accordion.setAttribute('itemtype', 'https://schema.org/FAQPage');

  faqs.forEach((faq, index) => {
    const item = createElement('div', 'guide-page__faq-item');
    item.setAttribute('itemscope', '');
    item.setAttribute('itemprop', 'mainEntity');
    item.setAttribute('itemtype', 'https://schema.org/Question');

    const question = createElement('button', 'guide-page__faq-question');
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('aria-controls', `guide-faq-answer-${index}`);

    const questionText = createElement('span', 'guide-page__faq-question-text', faq.question);
    questionText.setAttribute('itemprop', 'name');
    question.appendChild(questionText);

    const icon = createElement('span', 'guide-page__faq-icon');
    icon.appendChild(createSVG(['M12 5v14', 'M5 12h14']));
    question.appendChild(icon);

    const answer = createElement('div', 'guide-page__faq-answer');
    answer.id = `guide-faq-answer-${index}`;
    answer.setAttribute('itemscope', '');
    answer.setAttribute('itemprop', 'acceptedAnswer');
    answer.setAttribute('itemtype', 'https://schema.org/Answer');

    const answerContent = createElement('p', undefined, faq.answer);
    answerContent.setAttribute('itemprop', 'text');
    answer.appendChild(answerContent);

    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      // Close all others
      accordion.querySelectorAll('.guide-page__faq-item').forEach(otherItem => {
        const otherQuestion = otherItem.querySelector('.guide-page__faq-question');
        const otherAnswer = otherItem.querySelector('.guide-page__faq-answer') as HTMLElement;
        if (otherQuestion && otherAnswer && otherQuestion !== question) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherAnswer.style.maxHeight = '0';
          otherItem.classList.remove('active');
        }
      });

      if (!isExpanded) {
        question.setAttribute('aria-expanded', 'true');
        (answer as HTMLElement).style.maxHeight = answer.scrollHeight + 'px';
        item.classList.add('active');
      } else {
        question.setAttribute('aria-expanded', 'false');
        (answer as HTMLElement).style.maxHeight = '0';
        item.classList.remove('active');
      }
    });

    item.appendChild(question);
    item.appendChild(answer);
    accordion.appendChild(item);
  });

  faqSection.appendChild(accordion);
  return faqSection;
}

// --- Related Guides Component ---
function createRelatedGuides(currentSlug: string, relatedSlugs: string[]): HTMLElement {
  const section = createElement('section', 'guide-page__related');

  const title = createElement('h2', 'guide-page__related-title', 'Related Guides');
  section.appendChild(title);

  const grid = createElement('div', 'guide-page__related-grid');

  relatedSlugs.forEach(slug => {
    const guide = getGuideBySlug(slug);
    if (guide && guide.slug !== currentSlug) {
      const card = createElement('a', 'guide-page__related-card');
      card.href = `/guides/${guide.slug}`;
      card.setAttribute('data-route', '');

      const cardTitle = createElement('h3', 'guide-page__related-card-title', guide.title);
      card.appendChild(cardTitle);

      const cardMeta = createElement('span', 'guide-page__related-card-meta', `${guide.readTime} min read`);
      card.appendChild(cardMeta);

      grid.appendChild(card);
    }
  });

  section.appendChild(grid);
  return section;
}

// =============================================================================
// MAIN GUIDE PAGE RENDERER
// =============================================================================
export function renderGuidePage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const guide = getGuideBySlug(slug);

  if (!guide) {
    // 404 for guide not found
    const page = createElement('div', 'guide-page guide-page--not-found');
    const container = createElement('div', 'container');

    const errorContent = createElement('div', 'guide-page__error');
    const errorTitle = createElement('h1', undefined, 'Guide Not Found');
    errorContent.appendChild(errorTitle);
    const errorText = createElement('p', undefined, 'The guide you are looking for does not exist or has been moved.');
    errorContent.appendChild(errorText);
    const backLink = createElement('a', 'btn btn--primary', 'View All Guides');
    backLink.href = '/blog';
    backLink.setAttribute('data-route', '');
    errorContent.appendChild(backLink);

    container.appendChild(errorContent);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  // Main page
  const page = createElement('article', 'guide-page');
  page.setAttribute('itemscope', '');
  page.setAttribute('itemtype', 'https://schema.org/Article');

  // Hero section
  const hero = createElement('div', 'guide-page__hero');
  const heroOverlay = createElement('div', 'guide-page__hero-overlay');
  hero.appendChild(heroOverlay);

  const heroContent = createElement('div', 'guide-page__hero-content container');

  // Breadcrumbs
  const breadcrumbs = getGuideBreadcrumbs(guide);
  heroContent.appendChild(createBreadcrumbs(breadcrumbs));
  injectBreadcrumbSchema(breadcrumbs);

  const heroTitle = createElement('h1', 'guide-page__hero-title', guide.title);
  heroTitle.setAttribute('itemprop', 'headline');
  heroContent.appendChild(heroTitle);

  const heroMeta = createElement('div', 'guide-page__hero-meta');
  const metaDate = createElement('span', 'guide-page__hero-meta-item');
  metaDate.appendChild(createSVGUse('icon-calendar'));
  metaDate.appendChild(document.createTextNode(`Updated ${guide.lastUpdated}`));
  heroMeta.appendChild(metaDate);
  const metaTime = createElement('span', 'guide-page__hero-meta-item');
  metaTime.appendChild(createSVGUse('icon-clock'));
  metaTime.appendChild(document.createTextNode(`${guide.readTime} min read`));
  heroMeta.appendChild(metaTime);
  heroContent.appendChild(heroMeta);

  hero.appendChild(heroContent);
  page.appendChild(hero);

  // Main content
  const container = createElement('div', 'container');
  const wrapper = createElement('div', 'guide-page__wrapper');

  // Main article
  const article = createElement('div', 'guide-page__article');

  // Introduction
  const intro = createElement('div', 'guide-page__intro');
  const introText = createElement('p', 'guide-page__intro-text', guide.introduction);
  introText.setAttribute('itemprop', 'description');
  intro.appendChild(introText);
  article.appendChild(intro);

  // Table of Contents (mobile)
  const tocMobile = createTableOfContents(guide.sections);
  tocMobile.classList.add('guide-page__toc--mobile');
  article.appendChild(tocMobile);

  // Sections
  const sectionsWrapper = createElement('div', 'guide-page__sections');
  guide.sections.forEach((section, index) => {
    sectionsWrapper.appendChild(createGuideSection(section, index));
  });
  article.appendChild(sectionsWrapper);

  // FAQs (inline accordion)
  if (guide.faqs.length > 0) {
    article.appendChild(createGuideFAQ(guide.faqs));
  }

  // Helpful Feedback Widget
  article.appendChild(createFeedbackWidget(guide.slug));

  // Related Guides
  if (guide.relatedGuides.length > 0) {
    article.appendChild(createRelatedGuides(guide.slug, guide.relatedGuides));
  }

  wrapper.appendChild(article);

  // Sidebar
  const sidebar = createElement('aside', 'guide-page__sidebar');

  // Table of Contents (desktop, sticky)
  const tocDesktop = createTableOfContents(guide.sections);
  tocDesktop.classList.add('guide-page__toc--desktop');
  tocDesktop.classList.add('guide-page__toc--sticky');
  sidebar.appendChild(tocDesktop);

  // Download PDF card
  const pdfCard = createElement('div', 'guide-page__pdf-card');
  const pdfTitle = createElement('h3', 'guide-page__pdf-title', 'Take it offline');
  pdfCard.appendChild(pdfTitle);
  const pdfText = createElement('p', 'guide-page__pdf-text', 'Download the full guide as a printable PDF.');
  pdfCard.appendChild(pdfText);
  pdfCard.appendChild(createDownloadPdfButton(guide));
  sidebar.appendChild(pdfCard);

  // CTA Card
  const ctaCard = createElement('div', 'guide-page__cta-card');
  const ctaTitle = createElement('h3', 'guide-page__cta-title', guide.ctaTitle);
  ctaCard.appendChild(ctaTitle);
  const ctaText = createElement('p', 'guide-page__cta-text', guide.ctaText);
  ctaCard.appendChild(ctaText);
  const ctaBtn = createElement('a', 'btn btn--primary btn--block', 'Contact Us');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  ctaCard.appendChild(ctaBtn);
  const ctaPhone = createElement('a', 'guide-page__cta-phone', '+964 750 792 2138');
  ctaPhone.href = 'tel:+9647507922138';
  ctaCard.appendChild(ctaPhone);
  sidebar.appendChild(ctaCard);

  // Quick Links
  const quickLinks = createElement('div', 'guide-page__quick-links');
  const quickLinksTitle = createElement('h3', 'guide-page__quick-links-title', 'Quick Links');
  quickLinks.appendChild(quickLinksTitle);
  const quickLinksList = createElement('ul', 'guide-page__quick-links-list');
  const links = [
    { text: 'Browse Properties', url: '/properties' },
    { text: 'View Projects', url: '/projects' },
    { text: 'Read Blog', url: '/blog' },
    { text: 'FAQ', url: '/faq' }
  ];
  links.forEach(link => {
    const item = createElement('li');
    const a = createElement('a', undefined, link.text);
    a.href = link.url;
    a.setAttribute('data-route', '');
    item.appendChild(a);
    quickLinksList.appendChild(item);
  });
  quickLinks.appendChild(quickLinksList);
  sidebar.appendChild(quickLinks);

  wrapper.appendChild(sidebar);
  container.appendChild(wrapper);

  // Bottom CTA
  const bottomCta = createElement('section', 'guide-page__bottom-cta');
  const bottomCtaContent = createElement('div', 'guide-page__bottom-cta-content');
  const bottomCtaTitle = createElement('h2', 'guide-page__bottom-cta-title', 'Ready to Take the Next Step?');
  bottomCtaContent.appendChild(bottomCtaTitle);
  const bottomCtaText = createElement('p', 'guide-page__bottom-cta-text', 'Our expert team is here to help you navigate the Erbil property market with confidence.');
  bottomCtaContent.appendChild(bottomCtaText);
  const bottomCtaActions = createElement('div', 'guide-page__bottom-cta-actions');
  const btnContact = createElement('a', 'btn btn--primary', 'Schedule Consultation');
  btnContact.href = '/contact';
  btnContact.setAttribute('data-route', '');
  bottomCtaActions.appendChild(btnContact);
  const btnProperties = createElement('a', 'btn btn--outline', 'Browse Properties');
  btnProperties.href = '/properties';
  btnProperties.setAttribute('data-route', '');
  bottomCtaActions.appendChild(btnProperties);
  bottomCtaContent.appendChild(bottomCtaActions);
  bottomCta.appendChild(bottomCtaContent);
  container.appendChild(bottomCta);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// =============================================================================
// SEO SETUP FOR GUIDE PAGES
// =============================================================================
export function setupGuidePageSEO(guide: Guide): void {
  // Update title
  document.title = guide.metaTitle;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', guide.metaDescription);
  }

  // Update canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://realhouseiq.com/guides/${guide.slug}`);
  }

  // Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', guide.metaTitle);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', guide.metaDescription);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `https://realhouseiq.com/guides/${guide.slug}`);

  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) ogType.setAttribute('content', 'article');

  // Article Schema
  const existingSchema = document.querySelector('script[data-schema="guide-article"]');
  if (existingSchema) existingSchema.remove();

  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.setAttribute('data-schema', 'guide-article');
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Real House',
      url: 'https://realhouseiq.com'
    },
    publisher: {
      '@type': 'RealEstateAgent',
      name: 'Real House',
      url: 'https://realhouseiq.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://realhouseiq.com/favicon.svg'
      }
    },
    datePublished: guide.lastUpdated,
    dateModified: guide.lastUpdated,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://realhouseiq.com/guides/${guide.slug}`
    },
    keywords: guide.keywords.join(', '),
    inLanguage: 'en',
    isAccessibleForFree: true
  });
  document.head.appendChild(schema);

  // FAQ Schema (embedded in page via itemscope/itemprop)
  if (guide.faqs.length > 0) {
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.setAttribute('data-schema', 'guide-faq');
    faqSchema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'datePublished': '2025-01-01',
      'dateModified': '2026-03-28',
      mainEntity: guide.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
    document.head.appendChild(faqSchema);
  }
}

// =============================================================================
// GUIDES LISTING PAGE (INDEX)
// =============================================================================

// Derive a category label and icon id from a guide slug
type GuideCategory = 'Buying' | 'Investing' | 'Renting' | 'Resources';
function getGuideCategory(guide: Guide): GuideCategory {
  if (guide.slug.includes('buying') || guide.slug.includes('buyer')) return 'Buying';
  if (guide.slug.includes('invest')) return 'Investing';
  if (guide.slug.includes('rent')) return 'Renting';
  return 'Resources';
}
function getGuideCategoryIcon(category: GuideCategory): SVGSVGElement {
  switch (category) {
    case 'Buying':
      return createSVG(['M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6']);
    case 'Investing':
      return createSVG(['M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z']);
    case 'Renting':
      return createSVG(['M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V9.5z']);
    default:
      return createSVG(['M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z']);
  }
}
function getGuideDifficulty(guide: Guide): 'Beginner' | 'Intermediate' | 'Advanced' {
  if (guide.readTime <= 7) return 'Beginner';
  if (guide.readTime <= 12) return 'Intermediate';
  return 'Advanced';
}
function getGuideViews(guide: Guide): number {
  // deterministic pseudo-views based on slug length
  let h = 0;
  for (const ch of guide.slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return 1200 + (h % 8800);
}
function formatViews(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();
}

function buildGuideCard(guide: Guide, opts: { featured?: boolean } = {}): HTMLElement {
  const card = createElement('a', `guides-listing__card${opts.featured ? ' guides-listing__card--featured' : ''}`);
  card.href = `/guides/${guide.slug}`;
  card.setAttribute('data-route', '');

  const category = getGuideCategory(guide);
  card.setAttribute('data-category', category);

  // Icon
  const cardIcon = createElement('div', 'guides-listing__card-icon');
  cardIcon.appendChild(getGuideCategoryIcon(category));
  card.appendChild(cardIcon);

  // Content
  const cardContent = createElement('div', 'guides-listing__card-content');

  // Top row: category chip
  const chipRow = createElement('div', 'guides-listing__card-chips');
  const catChip = createElement('span', 'guides-listing__card-chip guides-listing__card-chip--category', category);
  chipRow.appendChild(catChip);
  const diff = getGuideDifficulty(guide);
  const diffChip = createElement('span', `guides-listing__card-chip guides-listing__card-chip--difficulty guides-listing__card-chip--${diff.toLowerCase()}`, diff);
  chipRow.appendChild(diffChip);
  cardContent.appendChild(chipRow);

  const cardTitle = createElement('h2', 'guides-listing__card-title', guide.title);
  cardContent.appendChild(cardTitle);

  const cardDescription = createElement('p', 'guides-listing__card-description', guide.introduction.substring(0, 150) + '...');
  cardContent.appendChild(cardDescription);

  const cardMeta = createElement('div', 'guides-listing__card-meta');
  const metaTime = createElement('span', 'guides-listing__card-meta-item');
  metaTime.appendChild(createSVGUse('icon-clock'));
  metaTime.appendChild(document.createTextNode(`${guide.readTime} min read`));
  cardMeta.appendChild(metaTime);

  const metaViews = createElement('span', 'guides-listing__card-meta-item');
  metaViews.appendChild(createSVG(['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M12 15a3 3 0 100-6 3 3 0 000 6z']));
  metaViews.appendChild(document.createTextNode(`${formatViews(getGuideViews(guide))} views`));
  cardMeta.appendChild(metaViews);

  cardContent.appendChild(cardMeta);

  const readMore = createElement('span', 'guides-listing__card-link');
  readMore.textContent = opts.featured ? 'Read Featured Guide' : 'Read Guide';
  readMore.appendChild(createSVGUse('icon-arrow-right'));
  cardContent.appendChild(readMore);

  card.appendChild(cardContent);
  return card;
}

export function renderGuidesListingPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'guides-listing-page');

  // Hero Section with search bar
  const hero = createElement('section', 'guides-listing__hero guides-listing__hero--cinematic');
  const heroOverlay = createElement('div', 'guides-listing__hero-overlay');
  hero.appendChild(heroOverlay);

  const heroContainer = createElement('div', 'container');
  const heroContent = createElement('div', 'guides-listing__hero-content');

  // Breadcrumbs
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' }
  ];
  heroContent.appendChild(createBreadcrumbs(breadcrumbItems));
  injectBreadcrumbSchema(breadcrumbItems);

  const heroTitle = createElement('h1', 'guides-listing__hero-title', 'Property Guides & Resources');
  heroContent.appendChild(heroTitle);

  const heroSubtitle = createElement('p', 'guides-listing__hero-subtitle', 'Expert advice for buying, investing, and renting property in Erbil, Kurdistan. Comprehensive guides to help you make informed decisions.');
  heroContent.appendChild(heroSubtitle);

  // Search bar
  const searchForm = createElement('form', 'guides-listing__search');
  searchForm.setAttribute('role', 'search');
  const searchInput = createElement('input', 'guides-listing__search-input');
  searchInput.type = 'search';
  searchInput.placeholder = 'Search guides... e.g. "first-time buyer"';
  searchInput.setAttribute('aria-label', 'Search guides');
  searchInput.id = 'guides-search-input';
  const searchIcon = createElement('span', 'guides-listing__search-icon');
  searchIcon.appendChild(createSVG(['M21 21l-4.35-4.35', 'M11 19a8 8 0 100-16 8 8 0 000 16z']));
  searchForm.appendChild(searchIcon);
  searchForm.appendChild(searchInput);
  searchForm.addEventListener('submit', e => e.preventDefault());
  heroContent.appendChild(searchForm);

  heroContainer.appendChild(heroContent);
  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // Featured Guide highlighted
  const featuredGuide = allGuides[0];
  if (featuredGuide) {
    const featuredSection = createElement('section', 'guides-listing__featured');
    const featuredContainer = createElement('div', 'container');
    const featuredLabel = createElement('span', 'guides-listing__featured-eyebrow', 'Featured Guide');
    featuredContainer.appendChild(featuredLabel);
    featuredContainer.appendChild(buildGuideCard(featuredGuide, { featured: true }));
    featuredSection.appendChild(featuredContainer);
    page.appendChild(featuredSection);
  }

  // Guides Grid Section
  const guidesSection = createElement('section', 'guides-listing__section');
  const guidesContainer = createElement('div', 'container');

  // Category Filters
  const categories: GuideCategory[] = ['Buying', 'Investing', 'Renting', 'Resources'];
  const filtersBar = createElement('div', 'guides-listing__filters');
  const allBtn = createElement('button', 'guides-listing__filter guides-listing__filter--active');
  allBtn.type = 'button';
  allBtn.textContent = 'All Guides';
  allBtn.setAttribute('data-filter', 'All');
  filtersBar.appendChild(allBtn);
  categories.forEach(cat => {
    const btn = createElement('button', 'guides-listing__filter');
    btn.type = 'button';
    btn.textContent = cat;
    btn.setAttribute('data-filter', cat);
    filtersBar.appendChild(btn);
  });
  guidesContainer.appendChild(filtersBar);

  const guidesGrid = createElement('div', 'guides-listing__grid');
  guidesGrid.id = 'guides-grid';

  const otherGuides = allGuides.slice(1); // exclude featured from the main grid
  otherGuides.forEach(guide => {
    guidesGrid.appendChild(buildGuideCard(guide));
  });

  guidesContainer.appendChild(guidesGrid);

  // No results message
  const noResults = createElement('div', 'guides-listing__no-results');
  noResults.id = 'guides-no-results';
  noResults.hidden = true;
  const noResultsTitle = createElement('h3', undefined, 'No guides match your search');
  const noResultsText = createElement('p', undefined, 'Try a different keyword or clear the category filter.');
  noResults.appendChild(noResultsTitle);
  noResults.appendChild(noResultsText);
  guidesContainer.appendChild(noResults);

  guidesSection.appendChild(guidesContainer);
  page.appendChild(guidesSection);

  // Wire up filter + search
  setTimeout(() => {
    const filterBtns = document.querySelectorAll<HTMLButtonElement>('.guides-listing__filter');
    const cards = document.querySelectorAll<HTMLElement>('#guides-grid .guides-listing__card');
    const searchInputEl = document.getElementById('guides-search-input') as HTMLInputElement | null;
    const noResultsEl = document.getElementById('guides-no-results');
    let activeFilter = 'All';

    const applyFilters = () => {
      const query = (searchInputEl?.value || '').trim().toLowerCase();
      let visibleCount = 0;
      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        const text = card.textContent?.toLowerCase() || '';
        const matchesCat = activeFilter === 'All' || cat === activeFilter;
        const matchesQuery = !query || text.includes(query);
        const show = matchesCat && matchesQuery;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      if (noResultsEl) noResultsEl.hidden = visibleCount > 0;
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('guides-listing__filter--active'));
        btn.classList.add('guides-listing__filter--active');
        activeFilter = btn.getAttribute('data-filter') || 'All';
        applyFilters();
      });
    });

    if (searchInputEl) {
      searchInputEl.addEventListener('input', applyFilters);
    }
  }, 0);

  // Additional Resources Section
  const resourcesSection = createElement('section', 'guides-listing__resources');
  const resourcesContainer = createElement('div', 'container');

  const resourcesHeader = createElement('div', 'guides-listing__resources-header');
  const resourcesTitle = createElement('h2', 'guides-listing__resources-title', 'Additional Resources');
  resourcesHeader.appendChild(resourcesTitle);
  resourcesContainer.appendChild(resourcesHeader);

  const resourcesGrid = createElement('div', 'guides-listing__resources-grid');

  const resources = [
    { title: 'Market Report 2025', description: 'Latest market trends and property prices in Erbil', url: '/market-report/erbil-2025', icon: 'icon-chart' },
    { title: 'Mortgage Calculator', description: 'Calculate your monthly payments and affordability', url: '/mortgage-calculator', icon: 'icon-building' },
    { title: 'FAQ', description: 'Answers to common questions about property in Erbil', url: '/faq', icon: 'icon-info' },
    { title: 'Contact Us', description: 'Speak with our expert agents today', url: '/contact', icon: 'icon-phone' }
  ];

  resources.forEach(resource => {
    const resourceCard = createElement('a', 'guides-listing__resource-card');
    resourceCard.href = resource.url;
    resourceCard.setAttribute('data-route', '');

    const resourceIcon = createElement('div', 'guides-listing__resource-icon');
    resourceIcon.appendChild(createSVGUse(resource.icon));
    resourceCard.appendChild(resourceIcon);

    const resourceContent = createElement('div', 'guides-listing__resource-content');
    const resourceTitle = createElement('h3', 'guides-listing__resource-title', resource.title);
    resourceContent.appendChild(resourceTitle);
    const resourceDesc = createElement('p', 'guides-listing__resource-description', resource.description);
    resourceContent.appendChild(resourceDesc);
    resourceCard.appendChild(resourceContent);

    resourcesGrid.appendChild(resourceCard);
  });

  resourcesContainer.appendChild(resourcesGrid);
  resourcesSection.appendChild(resourcesContainer);
  page.appendChild(resourcesSection);

  // CTA Section
  const ctaSection = createElement('section', 'guides-listing__cta');
  const ctaContainer = createElement('div', 'container');
  const ctaContent = createElement('div', 'guides-listing__cta-content');

  const ctaTitle = createElement('h2', 'guides-listing__cta-title', 'Need Personalized Advice?');
  ctaContent.appendChild(ctaTitle);

  const ctaText = createElement('p', 'guides-listing__cta-text', 'Our expert team is here to help you navigate the Erbil property market with confidence. Get personalized guidance for your unique situation.');
  ctaContent.appendChild(ctaText);

  const ctaActions = createElement('div', 'guides-listing__cta-actions');
  const ctaBtn = createElement('a', 'btn btn--primary btn--lg', 'Schedule Free Consultation');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  ctaActions.appendChild(ctaBtn);

  const ctaPhone = createElement('a', 'guides-listing__cta-phone', '+964 750 792 2138');
  ctaPhone.href = 'tel:+9647507922138';
  ctaActions.appendChild(ctaPhone);

  ctaContent.appendChild(ctaActions);
  ctaContainer.appendChild(ctaContent);
  ctaSection.appendChild(ctaContainer);
  page.appendChild(ctaSection);

  fragment.appendChild(page);
  return fragment;
}

// SEO Setup for Guides Listing Page
export function setupGuidesListingPageSEO(): void {
  document.title = 'Property Guides Erbil | Buying, Investing & Renting | Real House';

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Comprehensive property guides for Erbil, Kurdistan. Expert advice for buying, investing, and renting property. Step-by-step guides from Real House professionals.');
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', 'https://realhouseiq.com/guides');
  }
}
