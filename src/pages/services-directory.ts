// ═══════════════════════════════════════════════════════════════════════════
// Services Directory Pages Renderer for Real House IQ
// Home Services Directory for Property Owners
// Similar to Paya Real Estate Directory
// ═══════════════════════════════════════════════════════════════════════════

import {
  serviceCategories,
  serviceProviders,
  getCategoryBySlug,
  getProvidersByCategory,
  getFeaturedProviders,
  getRelatedCategories,
  type ServiceCategory,
  type ServiceProvider
} from '../data/services-directory';
import { t } from '../i18n';

const BASE_URL = 'https://realhouseiq.com';

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

// ─── Safe HTML Parser for Service Content ─────────────────────────────────
function parseServiceContent(htmlContent: string): DocumentFragment {
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

// ─── Category Card Component ──────────────────────────────────────────────
function createCategoryCard(category: ServiceCategory): HTMLElement {
  const card = createElement('article', 'services-dir__category-card');
  card.setAttribute('data-category', category.id);

  // Image
  const imageWrapper = createElement('div', 'services-dir__category-image');
  const img = createElement('img');
  img.src = category.heroImage;
  img.alt = category.title;
  img.loading = 'lazy';
  imageWrapper.appendChild(img);
  card.appendChild(imageWrapper);

  // Content
  const content = createElement('div', 'services-dir__category-content');

  const icon = createElement('div', 'services-dir__category-icon');
  icon.appendChild(createSVGUse(category.icon));
  content.appendChild(icon);

  const title = createElement('h3', 'services-dir__category-title');
  const titleLink = createElement('a', undefined, category.title);
  titleLink.href = `/services-directory/${category.slug}`;
  titleLink.setAttribute('data-route', '');
  title.appendChild(titleLink);
  content.appendChild(title);

  const description = createElement('p', 'services-dir__category-desc', category.description);
  content.appendChild(description);

  // Provider count
  const providers = getProvidersByCategory(category.id);
  const providerCount = createElement('span', 'services-dir__provider-count');
  providerCount.textContent = providers.length === 1
    ? t('servicesDirectory.providerCount', { count: providers.length })
    : t('servicesDirectory.providerCountPlural', { count: providers.length });
  content.appendChild(providerCount);

  // CTA
  const cta = createElement('a', 'services-dir__category-cta', t('servicesDirectory.viewProviders'));
  cta.href = `/services-directory/${category.slug}`;
  cta.setAttribute('data-route', '');
  cta.appendChild(createSVGUse('icon-arrow-right'));
  content.appendChild(cta);

  card.appendChild(content);
  return card;
}

// ─── Provider Card Component ──────────────────────────────────────────────
function createProviderCard(provider: ServiceProvider): HTMLElement {
  const card = createElement('article', 'services-dir__provider-card');
  if (provider.featured) {
    card.classList.add('services-dir__provider-card--featured');
  }
  card.setAttribute('data-provider', provider.id);

  // Header with image
  const header = createElement('div', 'services-dir__provider-header');
  const img = createElement('img', 'services-dir__provider-image');
  img.src = provider.image;
  img.alt = provider.name;
  img.loading = 'lazy';
  header.appendChild(img);

  if (provider.featured) {
    const badge = createElement('span', 'services-dir__featured-badge', t('servicesDirectory.featured'));
    header.appendChild(badge);
  }
  if (provider.verified) {
    const verified = createElement('span', 'services-dir__verified-badge');
    verified.appendChild(createSVGUse('icon-check'));
    verified.appendChild(document.createTextNode(t('servicesDirectory.verified')));
    header.appendChild(verified);
  }
  card.appendChild(header);

  // Content
  const content = createElement('div', 'services-dir__provider-content');

  const name = createElement('h3', 'services-dir__provider-name', provider.name);
  content.appendChild(name);

  // Rating
  const rating = createElement('div', 'services-dir__provider-rating');
  const stars = createElement('div', 'services-dir__stars');
  for (let i = 0; i < 5; i++) {
    const starIcon = i < Math.floor(provider.rating) ? 'icon-star' : 'icon-star-outline';
    stars.appendChild(createSVGUse(starIcon));
  }
  rating.appendChild(stars);
  const ratingText = createElement('span', undefined, t('servicesDirectory.reviewCount', { rating: provider.rating, count: provider.reviewCount }));
  rating.appendChild(ratingText);
  content.appendChild(rating);

  const desc = createElement('p', 'services-dir__provider-desc', provider.shortDescription);
  content.appendChild(desc);

  // Services
  const services = createElement('div', 'services-dir__provider-services');
  provider.services.slice(0, 3).forEach(service => {
    const tag = createElement('span', 'services-dir__service-tag', service);
    services.appendChild(tag);
  });
  if (provider.services.length > 3) {
    const more = createElement('span', 'services-dir__service-tag services-dir__service-tag--more');
    more.textContent = t('servicesDirectory.moreServices', { count: provider.services.length - 3 });
    services.appendChild(more);
  }
  content.appendChild(services);

  // Price range
  if (provider.priceRange) {
    const priceLabels = {
      budget: t('servicesDirectory.priceBudget'),
      'mid-range': t('servicesDirectory.priceMidRange'),
      premium: t('servicesDirectory.pricePremium')
    };
    const price = createElement('div', 'services-dir__provider-price');
    price.textContent = priceLabels[provider.priceRange];
    content.appendChild(price);
  }

  card.appendChild(content);

  // Contact buttons
  const actions = createElement('div', 'services-dir__provider-actions');

  const phoneBtn = createElement('a', 'btn btn--primary btn--sm', t('servicesDirectory.callNow'));
  phoneBtn.href = `tel:${provider.contact.phone.replace(/\s/g, '')}`;
  phoneBtn.appendChild(createSVGUse('icon-phone'));
  actions.appendChild(phoneBtn);

  if (provider.contact.whatsapp) {
    const whatsappBtn = createElement('a', 'btn btn--success btn--sm', t('servicesDirectory.whatsApp'));
    whatsappBtn.href = `https://wa.me/${provider.contact.whatsapp.replace(/[^0-9]/g, '')}`;
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    actions.appendChild(whatsappBtn);
  }

  card.appendChild(actions);
  return card;
}

// ─── Quote Success Message Component ──────────────────────────────────────
function createQuoteSuccessMessage(): HTMLElement {
  const successDiv = createElement('div', 'services-dir__quote-success');

  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  iconSvg.setAttribute('viewBox', '0 0 24 24');
  iconSvg.setAttribute('fill', 'none');
  iconSvg.setAttribute('stroke', 'currentColor');
  iconSvg.setAttribute('stroke-width', '2');
  iconSvg.setAttribute('class', 'icon icon--lg');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M22 11.08V12a10 10 0 1 1-5.93-9.14');
  iconSvg.appendChild(path1);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  path2.setAttribute('points', '22 4 12 14.01 9 11.01');
  iconSvg.appendChild(path2);

  successDiv.appendChild(iconSvg);

  const title = createElement('h3', undefined, t('servicesDirectory.requestSubmittedTitle'));
  successDiv.appendChild(title);

  const text = createElement('p', undefined, t('servicesDirectory.requestSubmittedText'));
  successDiv.appendChild(text);

  return successDiv;
}

// ─── Request Quote Form Component ─────────────────────────────────────────
function createQuoteForm(category: ServiceCategory): HTMLElement {
  const form = createElement('div', 'services-dir__quote-form');

  const title = createElement('h3', 'services-dir__quote-title', t('servicesDirectory.requestQuoteTitle'));
  form.appendChild(title);

  const description = createElement('p', 'services-dir__quote-desc');
  description.textContent = t('servicesDirectory.requestQuoteDesc', { category: category.title.toLowerCase() });
  form.appendChild(description);

  const formElement = createElement('form');
  formElement.setAttribute('id', 'quote-form');

  // Name field
  const nameGroup = createElement('div', 'form-group');
  const nameLabel = createElement('label', undefined, t('servicesDirectory.fullNameLabel'));
  nameLabel.setAttribute('for', 'quote-name');
  const nameInput = createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'quote-name';
  nameInput.name = 'name';
  nameInput.required = true;
  nameInput.placeholder = t('servicesDirectory.fullNamePlaceholder');
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  formElement.appendChild(nameGroup);

  // Phone field
  const phoneGroup = createElement('div', 'form-group');
  const phoneLabel = createElement('label', undefined, t('servicesDirectory.phoneLabel'));
  phoneLabel.setAttribute('for', 'quote-phone');
  const phoneInput = createElement('input');
  phoneInput.type = 'tel';
  phoneInput.id = 'quote-phone';
  phoneInput.name = 'phone';
  phoneInput.required = true;
  phoneInput.placeholder = t('servicesDirectory.phonePlaceholder');
  phoneGroup.appendChild(phoneLabel);
  phoneGroup.appendChild(phoneInput);
  formElement.appendChild(phoneGroup);

  // Email field
  const emailGroup = createElement('div', 'form-group');
  const emailLabel = createElement('label', undefined, t('servicesDirectory.emailLabel'));
  emailLabel.setAttribute('for', 'quote-email');
  const emailInput = createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'quote-email';
  emailInput.name = 'email';
  emailInput.placeholder = t('servicesDirectory.emailPlaceholder');
  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);
  formElement.appendChild(emailGroup);

  // Property type field
  const propertyGroup = createElement('div', 'form-group');
  const propertyLabel = createElement('label', undefined, t('servicesDirectory.propertyTypeLabel'));
  propertyLabel.setAttribute('for', 'quote-property');
  const propertySelect = createElement('select');
  propertySelect.id = 'quote-property';
  propertySelect.name = 'property_type';

  const propertyOptions = [
    { label: t('servicesDirectory.selectPropertyType'), value: '' },
    { label: t('servicesDirectory.propertyApartment'), value: 'apartment' },
    { label: t('servicesDirectory.propertyVilla'), value: 'villa' },
    { label: t('servicesDirectory.propertyTownhouse'), value: 'townhouse' },
    { label: t('servicesDirectory.propertyOffice'), value: 'office' },
    { label: t('servicesDirectory.propertyCommercial'), value: 'commercial' },
    { label: t('servicesDirectory.propertyOther'), value: 'other' }
  ];
  propertyOptions.forEach(opt => {
    const option = createElement('option', undefined, opt.label);
    option.value = opt.value;
    propertySelect.appendChild(option);
  });
  propertyGroup.appendChild(propertyLabel);
  propertyGroup.appendChild(propertySelect);
  formElement.appendChild(propertyGroup);

  // Message field
  const messageGroup = createElement('div', 'form-group');
  const messageLabel = createElement('label', undefined, t('servicesDirectory.projectDetailsLabel'));
  messageLabel.setAttribute('for', 'quote-message');
  const messageTextarea = createElement('textarea');
  messageTextarea.id = 'quote-message';
  messageTextarea.name = 'message';
  messageTextarea.rows = 4;
  messageTextarea.placeholder = t('servicesDirectory.projectDetailsPlaceholder');
  messageGroup.appendChild(messageLabel);
  messageGroup.appendChild(messageTextarea);
  formElement.appendChild(messageGroup);

  // Hidden category field
  const categoryInput = createElement('input');
  categoryInput.type = 'hidden';
  categoryInput.name = 'category';
  categoryInput.value = category.id;
  formElement.appendChild(categoryInput);

  // Submit button
  const submitBtn = createElement('button', 'btn btn--primary btn--block', t('servicesDirectory.submitRequest'));
  submitBtn.type = 'submit';
  formElement.appendChild(submitBtn);

  form.appendChild(formElement);

  // Add form submission handler
  setTimeout(() => {
    const formEl = document.getElementById('quote-form');
    if (formEl) {
      formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        // Show success message using DOM methods
        const formContainer = formEl.parentElement;
        if (formContainer) {
          // Clear the container
          while (formContainer.firstChild) {
            formContainer.removeChild(formContainer.firstChild);
          }
          // Add success message
          formContainer.appendChild(createQuoteSuccessMessage());
        }
      });
    }
  }, 0);

  return form;
}

// ─── Services Directory Main Page ─────────────────────────────────────────
export function renderServicesDirectoryPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('div', 'services-dir');

  // Hero Section
  const hero = createElement('section', 'services-dir__hero');
  const heroContainer = createElement('div', 'container');

  const heroBadge = createElement('span', 'services-dir__badge', t('servicesDirectory.badge'));
  heroContainer.appendChild(heroBadge);

  const heroTitle = createElement('h1', 'services-dir__title');
  heroTitle.textContent = t('servicesDirectory.heroTitle');
  const heroTitleEm = createElement('em', undefined, t('servicesDirectory.heroTitleLocation'));
  heroTitle.appendChild(heroTitleEm);
  heroContainer.appendChild(heroTitle);

  const heroSubtitle = createElement('p', 'services-dir__subtitle');
  heroSubtitle.textContent = t('servicesDirectory.heroSubtitle');
  heroContainer.appendChild(heroSubtitle);

  // Search bar placeholder
  const searchWrapper = createElement('div', 'services-dir__search');
  const searchInput = createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = t('servicesDirectory.searchPlaceholder');
  searchInput.className = 'services-dir__search-input';
  searchWrapper.appendChild(searchInput);
  const searchBtn = createElement('button', 'btn btn--primary', t('servicesDirectory.searchButton'));
  searchWrapper.appendChild(searchBtn);
  heroContainer.appendChild(searchWrapper);

  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // Categories Grid Section
  const categoriesSection = createElement('section', 'services-dir__categories');
  const categoriesContainer = createElement('div', 'container');

  const categoriesHeader = createElement('div', 'services-dir__section-header');
  const categoriesTitle = createElement('h2', 'services-dir__section-title', t('servicesDirectory.serviceCategoriesTitle'));
  categoriesHeader.appendChild(categoriesTitle);
  const categoriesSubtitle = createElement('p', 'services-dir__section-subtitle');
  categoriesSubtitle.textContent = t('servicesDirectory.serviceCategoriesSubtitle');
  categoriesHeader.appendChild(categoriesSubtitle);
  categoriesContainer.appendChild(categoriesHeader);

  const categoriesGrid = createElement('div', 'services-dir__categories-grid');
  serviceCategories.forEach(category => {
    categoriesGrid.appendChild(createCategoryCard(category));
  });
  categoriesContainer.appendChild(categoriesGrid);

  categoriesSection.appendChild(categoriesContainer);
  page.appendChild(categoriesSection);

  // Featured Providers Section
  const featuredProviders = getFeaturedProviders();
  if (featuredProviders.length > 0) {
    const featuredSection = createElement('section', 'services-dir__featured');
    const featuredContainer = createElement('div', 'container');

    const featuredHeader = createElement('div', 'services-dir__section-header');
    const featuredTitle = createElement('h2', 'services-dir__section-title', t('servicesDirectory.featuredProvidersTitle'));
    featuredHeader.appendChild(featuredTitle);
    const featuredSubtitle = createElement('p', 'services-dir__section-subtitle');
    featuredSubtitle.textContent = t('servicesDirectory.featuredProvidersSubtitle');
    featuredHeader.appendChild(featuredSubtitle);
    featuredContainer.appendChild(featuredHeader);

    const featuredGrid = createElement('div', 'services-dir__providers-grid');
    featuredProviders.slice(0, 6).forEach(provider => {
      featuredGrid.appendChild(createProviderCard(provider));
    });
    featuredContainer.appendChild(featuredGrid);

    featuredSection.appendChild(featuredContainer);
    page.appendChild(featuredSection);
  }

  // Why Use Directory Section
  const whySection = createElement('section', 'services-dir__why');
  const whyContainer = createElement('div', 'container');

  const whyHeader = createElement('div', 'services-dir__section-header');
  const whyTitle = createElement('h2', 'services-dir__section-title', t('servicesDirectory.whyUseTitle'));
  whyHeader.appendChild(whyTitle);
  whyContainer.appendChild(whyHeader);

  const whyGrid = createElement('div', 'services-dir__why-grid');

  const whyItems = [
    { icon: 'icon-shield', title: t('servicesDirectory.whyVerifiedTitle'), desc: t('servicesDirectory.whyVerifiedDesc') },
    { icon: 'icon-star', title: t('servicesDirectory.whyRatingsTitle'), desc: t('servicesDirectory.whyRatingsDesc') },
    { icon: 'icon-check', title: t('servicesDirectory.whyQuotesTitle'), desc: t('servicesDirectory.whyQuotesDesc') },
    { icon: 'icon-phone', title: t('servicesDirectory.whyContactTitle'), desc: t('servicesDirectory.whyContactDesc') }
  ];

  whyItems.forEach(item => {
    const whyCard = createElement('div', 'services-dir__why-card');
    const whyIcon = createElement('div', 'services-dir__why-icon');
    whyIcon.appendChild(createSVGUse(item.icon));
    whyCard.appendChild(whyIcon);
    const whyCardTitle = createElement('h3', undefined, item.title);
    whyCard.appendChild(whyCardTitle);
    const whyCardDesc = createElement('p', undefined, item.desc);
    whyCard.appendChild(whyCardDesc);
    whyGrid.appendChild(whyCard);
  });

  whyContainer.appendChild(whyGrid);
  whySection.appendChild(whyContainer);
  page.appendChild(whySection);

  // CTA Section
  const ctaSection = createElement('section', 'services-dir__cta');
  const ctaContainer = createElement('div', 'container');
  const ctaContent = createElement('div', 'services-dir__cta-content');

  const ctaTitle = createElement('h2', 'services-dir__cta-title', t('servicesDirectory.providerCtaTitle'));
  ctaContent.appendChild(ctaTitle);

  const ctaText = createElement('p', 'services-dir__cta-text');
  ctaText.textContent = t('servicesDirectory.providerCtaText');
  ctaContent.appendChild(ctaText);

  const ctaBtn = createElement('a', 'btn btn--primary btn--lg', t('servicesDirectory.listYourBusiness'));
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  ctaContent.appendChild(ctaBtn);

  ctaContainer.appendChild(ctaContent);
  ctaSection.appendChild(ctaContainer);
  page.appendChild(ctaSection);

  fragment.appendChild(page);
  return fragment;
}

// ─── Category Detail Page ─────────────────────────────────────────────────
export function renderServiceCategoryPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const category = getCategoryBySlug(slug);

  if (!category) {
    // 404 for category not found
    const page = createElement('div', 'services-dir services-dir--not-found');
    const container = createElement('div', 'container');

    const errorContent = createElement('div', 'services-dir__error');
    const errorTitle = createElement('h1', undefined, t('servicesDirectory.categoryNotFoundTitle'));
    errorContent.appendChild(errorTitle);
    const errorText = createElement('p', undefined, t('servicesDirectory.categoryNotFoundText'));
    errorContent.appendChild(errorText);
    const backLink = createElement('a', 'btn btn--primary', t('servicesDirectory.viewAllServices'));
    backLink.href = '/services-directory';
    backLink.setAttribute('data-route', '');
    errorContent.appendChild(backLink);

    container.appendChild(errorContent);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  const page = createElement('div', 'services-dir services-dir--category');

  // Hero Section
  const hero = createElement('section', 'services-dir__hero services-dir__hero--category');
  const heroImage = createElement('img', 'services-dir__hero-bg');
  heroImage.src = category.heroImage;
  heroImage.alt = category.title;
  hero.appendChild(heroImage);
  const heroOverlay = createElement('div', 'services-dir__hero-overlay');
  hero.appendChild(heroOverlay);

  const heroContainer = createElement('div', 'container');

  // Breadcrumb
  const breadcrumb = createElement('nav', 'services-dir__breadcrumb');
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');
  const breadcrumbList = createElement('ol', 'breadcrumb');

  const homeCrumb = createElement('li', 'breadcrumb__item');
  const homeLink = createElement('a', undefined, t('servicesDirectory.breadcrumbHome'));
  homeLink.href = '/';
  homeLink.setAttribute('data-route', '');
  homeCrumb.appendChild(homeLink);
  breadcrumbList.appendChild(homeCrumb);

  const directoryCrumb = createElement('li', 'breadcrumb__item');
  const directoryLink = createElement('a', undefined, t('servicesDirectory.breadcrumbServicesDirectory'));
  directoryLink.href = '/services-directory';
  directoryLink.setAttribute('data-route', '');
  directoryCrumb.appendChild(directoryLink);
  breadcrumbList.appendChild(directoryCrumb);

  const currentCrumb = createElement('li', 'breadcrumb__item breadcrumb__item--current');
  currentCrumb.textContent = category.title;
  currentCrumb.setAttribute('aria-current', 'page');
  breadcrumbList.appendChild(currentCrumb);

  breadcrumb.appendChild(breadcrumbList);
  heroContainer.appendChild(breadcrumb);

  // Hero Content
  const heroContent = createElement('div', 'services-dir__hero-content');
  const heroIcon = createElement('div', 'services-dir__hero-icon');
  heroIcon.appendChild(createSVGUse(category.icon));
  heroContent.appendChild(heroIcon);

  const heroTitle = createElement('h1', 'services-dir__hero-title', category.title);
  heroContent.appendChild(heroTitle);

  const heroDesc = createElement('p', 'services-dir__hero-desc', category.description);
  heroContent.appendChild(heroDesc);

  heroContainer.appendChild(heroContent);
  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // Main Content Section
  const mainSection = createElement('section', 'services-dir__main');
  const mainContainer = createElement('div', 'container');
  const mainWrapper = createElement('div', 'services-dir__wrapper');

  // Article Content
  const article = createElement('article', 'services-dir__article');

  // Service Description
  const descriptionSection = createElement('div', 'services-dir__description');
  descriptionSection.appendChild(parseServiceContent(category.longDescription));
  article.appendChild(descriptionSection);

  // Why You Need This Section
  const whyNeedSection = createElement('div', 'services-dir__why-need');
  const whyNeedTitle = createElement('h2', 'services-dir__section-title', t('servicesDirectory.whyYouNeedTitle', { category: category.title }));
  whyNeedSection.appendChild(whyNeedTitle);

  const whyNeedList = createElement('ul', 'services-dir__why-list');
  category.whyNeedThis.forEach(reason => {
    const li = createElement('li');
    li.appendChild(createSVGUse('icon-check'));
    li.appendChild(document.createTextNode(reason));
    whyNeedList.appendChild(li);
  });
  whyNeedSection.appendChild(whyNeedList);
  article.appendChild(whyNeedSection);

  // Benefits Section
  const benefitsSection = createElement('div', 'services-dir__benefits');
  const benefitsTitle = createElement('h2', 'services-dir__section-title', t('servicesDirectory.benefitsTitle'));
  benefitsSection.appendChild(benefitsTitle);

  const benefitsGrid = createElement('div', 'services-dir__benefits-grid');
  category.benefits.forEach(benefit => {
    const benefitCard = createElement('div', 'services-dir__benefit');
    benefitCard.appendChild(createSVGUse('icon-star'));
    benefitCard.appendChild(document.createTextNode(benefit));
    benefitsGrid.appendChild(benefitCard);
  });
  benefitsSection.appendChild(benefitsGrid);
  article.appendChild(benefitsSection);

  // Providers Section
  const providers = getProvidersByCategory(category.id);
  if (providers.length > 0) {
    const providersSection = createElement('div', 'services-dir__providers-section');
    const providersTitle = createElement('h2', 'services-dir__section-title', t('servicesDirectory.recommendedProvidersTitle', { category: category.title }));
    providersSection.appendChild(providersTitle);

    const providersGrid = createElement('div', 'services-dir__providers-grid');
    providers.forEach(provider => {
      providersGrid.appendChild(createProviderCard(provider));
    });
    providersSection.appendChild(providersGrid);
    article.appendChild(providersSection);
  } else {
    // Placeholder for no providers
    const noProviders = createElement('div', 'services-dir__no-providers');
    const noProvidersTitle = createElement('h2', 'services-dir__section-title', t('servicesDirectory.noProvidersTitle'));
    noProviders.appendChild(noProvidersTitle);
    const noProvidersText = createElement('p');
    noProvidersText.textContent = t('servicesDirectory.noProvidersText');
    noProviders.appendChild(noProvidersText);
    article.appendChild(noProviders);
  }

  // FAQs Section
  const faqSection = createElement('div', 'services-dir__faqs');
  const faqTitle = createElement('h2', 'services-dir__section-title', t('servicesDirectory.faqTitle'));
  faqSection.appendChild(faqTitle);

  const faqList = createElement('div', 'services-dir__faq-list');
  category.faqs.forEach((faq, index) => {
    const faqItem = createElement('div', 'services-dir__faq-item');
    faqItem.setAttribute('data-faq-index', index.toString());

    const faqQuestion = createElement('button', 'services-dir__faq-question');
    faqQuestion.setAttribute('type', 'button');
    faqQuestion.setAttribute('aria-expanded', 'false');
    const faqQuestionText = createElement('span', undefined, faq.question);
    faqQuestion.appendChild(faqQuestionText);
    const faqIcon = createElement('span', 'services-dir__faq-icon', '+');
    faqQuestion.appendChild(faqIcon);
    faqItem.appendChild(faqQuestion);

    const faqAnswer = createElement('div', 'services-dir__faq-answer');
    const faqAnswerText = createElement('p', undefined, faq.answer);
    faqAnswer.appendChild(faqAnswerText);
    faqItem.appendChild(faqAnswer);

    faqList.appendChild(faqItem);
  });
  faqSection.appendChild(faqList);
  article.appendChild(faqSection);

  mainWrapper.appendChild(article);

  // Sidebar
  const sidebar = createElement('aside', 'services-dir__sidebar');

  // Quote Form
  sidebar.appendChild(createQuoteForm(category));

  // Related Categories
  const relatedCategories = getRelatedCategories(category);
  if (relatedCategories.length > 0) {
    const relatedSection = createElement('div', 'services-dir__related');
    const relatedTitle = createElement('h3', 'services-dir__related-title', t('servicesDirectory.relatedServicesTitle'));
    relatedSection.appendChild(relatedTitle);

    const relatedList = createElement('div', 'services-dir__related-list');
    relatedCategories.forEach(related => {
      const relatedItem = createElement('a', 'services-dir__related-item');
      relatedItem.href = `/services-directory/${related.slug}`;
      relatedItem.setAttribute('data-route', '');

      const relatedIcon = createElement('span', 'services-dir__related-icon');
      relatedIcon.appendChild(createSVGUse(related.icon));
      relatedItem.appendChild(relatedIcon);

      const relatedInfo = createElement('div', 'services-dir__related-info');
      const relatedName = createElement('span', 'services-dir__related-name', related.title);
      relatedInfo.appendChild(relatedName);
      relatedItem.appendChild(relatedInfo);

      relatedList.appendChild(relatedItem);
    });
    relatedSection.appendChild(relatedList);
    sidebar.appendChild(relatedSection);
  }

  // Contact Card
  const contactCard = createElement('div', 'services-dir__contact-card');
  const contactTitle = createElement('h3', undefined, t('servicesDirectory.needHelpTitle'));
  contactCard.appendChild(contactTitle);
  const contactText = createElement('p', undefined, t('servicesDirectory.needHelpText'));
  contactCard.appendChild(contactText);
  const contactPhone = createElement('a', 'services-dir__contact-phone');
  contactPhone.href = 'tel:+9647507922138';
  contactPhone.appendChild(createSVGUse('icon-phone'));
  contactPhone.appendChild(document.createTextNode('+964 750 792 2138'));
  contactCard.appendChild(contactPhone);
  sidebar.appendChild(contactCard);

  mainWrapper.appendChild(sidebar);
  mainContainer.appendChild(mainWrapper);
  mainSection.appendChild(mainContainer);
  page.appendChild(mainSection);

  // Bottom CTA Section
  const bottomCta = createElement('section', 'services-dir__bottom-cta');
  const bottomCtaContainer = createElement('div', 'container');
  const bottomCtaContent = createElement('div', 'services-dir__bottom-cta-content');

  const bottomCtaTitle = createElement('h2', undefined, t('servicesDirectory.needCategoryServiceTitle', { category: category.title }));
  bottomCtaContent.appendChild(bottomCtaTitle);
  const bottomCtaText = createElement('p', undefined, t('servicesDirectory.getConnectedText'));
  bottomCtaContent.appendChild(bottomCtaText);

  const bottomCtaBtns = createElement('div', 'services-dir__bottom-cta-btns');
  const bottomCtaBtn1 = createElement('a', 'btn btn--primary btn--lg', t('servicesDirectory.requestFreeQuote'));
  bottomCtaBtn1.href = '#quote-form';
  bottomCtaBtns.appendChild(bottomCtaBtn1);
  const bottomCtaBtn2 = createElement('a', 'btn btn--ghost btn--lg', t('servicesDirectory.viewAllServices'));
  bottomCtaBtn2.href = '/services-directory';
  bottomCtaBtn2.setAttribute('data-route', '');
  bottomCtaBtns.appendChild(bottomCtaBtn2);
  bottomCtaContent.appendChild(bottomCtaBtns);

  bottomCtaContainer.appendChild(bottomCtaContent);
  bottomCta.appendChild(bottomCtaContainer);
  page.appendChild(bottomCta);

  fragment.appendChild(page);

  // Add FAQ toggle functionality after DOM is ready
  setTimeout(() => {
    const faqItems = document.querySelectorAll('.services-dir__faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.services-dir__faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const isExpanded = item.classList.contains('active');
          // Close all other FAQs
          faqItems.forEach(otherItem => otherItem.classList.remove('active'));
          // Toggle current
          if (!isExpanded) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
          } else {
            question.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  }, 0);

  return fragment;
}

// ─── SEO Helper Functions ─────────────────────────────────────────────────
export function setupServicesDirectoryPageSEO(): void {
  document.title = 'Home Services Directory Erbil | Find Service Providers Kurdistan | Real House IQ';

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Find trusted home service providers in Erbil, Kurdistan. Interior design, cleaning, electrical, plumbing, landscaping, AC repair, and more. Verified professionals for property owners.');
  }

  // Update canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `${BASE_URL}/services-directory`);
  }

  // Add ItemList schema for directory
  const existingSchema = document.querySelector('script[data-schema="services-directory"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const directorySchema = document.createElement('script');
  directorySchema.type = 'application/ld+json';
  directorySchema.setAttribute('data-schema', 'services-directory');
  directorySchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Home Services Directory Erbil',
    'description': 'Directory of home service providers for property owners in Erbil, Kurdistan',
    'numberOfItems': serviceCategories.length,
    'itemListElement': serviceCategories.map((category, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Service',
        'name': category.title,
        'description': category.description,
        'url': `${BASE_URL}/services-directory/${category.slug}`,
        'areaServed': {
          '@type': 'City',
          'name': 'Erbil',
          'containedInPlace': {
            '@type': 'State',
            'name': 'Kurdistan Region'
          }
        }
      }
    }))
  });
  document.head.appendChild(directorySchema);

  // Add breadcrumb schema
  const existingBreadcrumb = document.querySelector('script[data-schema="breadcrumb"]');
  if (existingBreadcrumb) {
    existingBreadcrumb.remove();
  }

  const breadcrumbSchema = document.createElement('script');
  breadcrumbSchema.type = 'application/ld+json';
  breadcrumbSchema.setAttribute('data-schema', 'breadcrumb');
  breadcrumbSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': BASE_URL
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Services Directory',
        'item': `${BASE_URL}/services-directory`
      }
    ]
  });
  document.head.appendChild(breadcrumbSchema);
}

export function setupServiceCategoryPageSEO(category: ServiceCategory): void {
  document.title = category.metaTitle;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', category.metaDescription);
  }

  // Update canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `${BASE_URL}/services-directory/${category.slug}`);
  }

  // Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', category.metaTitle);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', category.metaDescription);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', `${BASE_URL}/services-directory/${category.slug}`);
  }

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    ogImage.setAttribute('content', category.heroImage);
  }

  // Add Service schema
  const existingSchema = document.querySelector('script[data-schema="service-category"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const serviceSchema = document.createElement('script');
  serviceSchema.type = 'application/ld+json';
  serviceSchema.setAttribute('data-schema', 'service-category');
  serviceSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': category.title,
    'description': category.metaDescription,
    'url': `${BASE_URL}/services-directory/${category.slug}`,
    'image': category.heroImage,
    'serviceType': category.title,
    'areaServed': {
      '@type': 'City',
      'name': 'Erbil',
      'containedInPlace': {
        '@type': 'State',
        'name': 'Kurdistan Region'
      }
    },
    'provider': {
      '@type': 'Organization',
      'name': 'Real House IQ',
      'url': BASE_URL
    }
  });
  document.head.appendChild(serviceSchema);

  // Add FAQ schema
  const existingFaq = document.querySelector('script[data-schema="faq"]');
  if (existingFaq) {
    existingFaq.remove();
  }

  const faqSchema = document.createElement('script');
  faqSchema.type = 'application/ld+json';
  faqSchema.setAttribute('data-schema', 'faq');
  faqSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': category.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  });
  document.head.appendChild(faqSchema);

  // Add Breadcrumb schema
  const existingBreadcrumb = document.querySelector('script[data-schema="breadcrumb"]');
  if (existingBreadcrumb) {
    existingBreadcrumb.remove();
  }

  const breadcrumbSchema = document.createElement('script');
  breadcrumbSchema.type = 'application/ld+json';
  breadcrumbSchema.setAttribute('data-schema', 'breadcrumb');
  breadcrumbSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': BASE_URL
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Services Directory',
        'item': `${BASE_URL}/services-directory`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': category.title,
        'item': `${BASE_URL}/services-directory/${category.slug}`
      }
    ]
  });
  document.head.appendChild(breadcrumbSchema);
}

// Re-export helper functions from data file
export { getCategoryBySlug };
