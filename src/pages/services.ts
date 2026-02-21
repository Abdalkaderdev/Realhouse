// ═══════════════════════════════════════════════════════════════════════════
// Services Pages Renderer for Real House
// SEO-Optimized Service Listing and Detail Pages
// Target Keywords: sell property erbil, property management erbil,
// real estate agent erbil, property valuation kurdistan, investment property erbil
// ═══════════════════════════════════════════════════════════════════════════

import {
  services,
  getServiceBySlug,
  getRelatedServices,
  type Service
} from '../data/services';
import { properties, featuredProperties } from '../data/properties';
import { testimonials, type Testimonial } from '../data/testimonials';

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

// ─── Service Card Component ───────────────────────────────────────────────
function createServiceCard(service: Service): HTMLElement {
  const card = createElement('article', 'service-card');
  card.setAttribute('data-id', service.id);

  // Icon
  const iconWrapper = createElement('div', 'service-card__icon');
  iconWrapper.appendChild(createSVGUse(service.icon));
  card.appendChild(iconWrapper);

  // Content
  const content = createElement('div', 'service-card__content');

  const title = createElement('h3', 'service-card__title');
  const titleLink = createElement('a', undefined, service.title);
  titleLink.href = `/services/${service.slug}`;
  titleLink.setAttribute('data-route', '');
  title.appendChild(titleLink);
  content.appendChild(title);

  const description = createElement('p', 'service-card__description', service.shortDescription);
  content.appendChild(description);

  // Features preview
  const features = createElement('ul', 'service-card__features');
  service.features.slice(0, 3).forEach(feature => {
    const li = createElement('li', undefined, feature.title);
    features.appendChild(li);
  });
  content.appendChild(features);

  // CTA
  const cta = createElement('a', 'service-card__cta', 'Learn More');
  cta.href = `/services/${service.slug}`;
  cta.setAttribute('data-route', '');
  cta.appendChild(createSVGUse('icon-arrow-right'));
  content.appendChild(cta);

  card.appendChild(content);
  return card;
}

// ─── Testimonial Card Component ───────────────────────────────────────────
function createTestimonialCard(testimonial: Testimonial): HTMLElement {
  const card = createElement('div', 'testimonial-card');

  // Quote
  const quote = createElement('blockquote', 'testimonial-card__quote');
  const quoteText = createElement('p', undefined, `"${testimonial.quote}"`);
  quote.appendChild(quoteText);
  card.appendChild(quote);

  // Author
  const author = createElement('div', 'testimonial-card__author');
  const authorImg = createElement('img', 'testimonial-card__avatar');
  authorImg.src = testimonial.image;
  authorImg.alt = testimonial.name;
  authorImg.loading = 'lazy';
  author.appendChild(authorImg);

  const authorInfo = createElement('div', 'testimonial-card__info');
  const authorName = createElement('span', 'testimonial-card__name', testimonial.name);
  authorInfo.appendChild(authorName);
  const authorRole = createElement('span', 'testimonial-card__role', `${testimonial.role} - ${testimonial.location}`);
  authorInfo.appendChild(authorRole);
  author.appendChild(authorInfo);

  card.appendChild(author);

  // Rating
  const rating = createElement('div', 'testimonial-card__rating');
  for (let i = 0; i < 5; i++) {
    rating.appendChild(createSVGUse(i < testimonial.rating ? 'icon-star' : 'icon-star-outline'));
  }
  card.appendChild(rating);

  return card;
}

// ─── Service Testimonial Card Component ───────────────────────────────────
function createServiceTestimonialCard(testimonial: { quote: string; name: string; role: string; image: string }): HTMLElement {
  const card = createElement('div', 'testimonial-card');

  // Quote
  const quote = createElement('blockquote', 'testimonial-card__quote');
  const quoteText = createElement('p', undefined, `"${testimonial.quote}"`);
  quote.appendChild(quoteText);
  card.appendChild(quote);

  // Author
  const author = createElement('div', 'testimonial-card__author');
  const authorImg = createElement('img', 'testimonial-card__avatar');
  authorImg.src = testimonial.image;
  authorImg.alt = testimonial.name;
  authorImg.loading = 'lazy';
  author.appendChild(authorImg);

  const authorInfo = createElement('div', 'testimonial-card__info');
  const authorName = createElement('span', 'testimonial-card__name', testimonial.name);
  authorInfo.appendChild(authorName);
  const authorRole = createElement('span', 'testimonial-card__role', testimonial.role);
  authorInfo.appendChild(authorRole);
  author.appendChild(authorInfo);

  card.appendChild(author);

  // 5-star rating (all filled for service testimonials)
  const rating = createElement('div', 'testimonial-card__rating');
  for (let i = 0; i < 5; i++) {
    rating.appendChild(createSVGUse('icon-star'));
  }
  card.appendChild(rating);

  return card;
}

// ─── Property Card Mini Component ─────────────────────────────────────────
function createPropertyCardMini(property: typeof properties[0]): HTMLElement {
  const card = createElement('a', 'property-card-mini');
  card.href = `/properties/${property.id}`;
  card.setAttribute('data-route', '');

  const img = createElement('img', 'property-card-mini__image');
  img.src = property.images[0];
  img.alt = property.title;
  img.loading = 'lazy';
  card.appendChild(img);

  const content = createElement('div', 'property-card-mini__content');
  const title = createElement('h4', 'property-card-mini__title', property.title);
  content.appendChild(title);

  const location = createElement('span', 'property-card-mini__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(property.location.district));
  content.appendChild(location);

  const price = createElement('span', 'property-card-mini__price');
  if (property.price > 0) {
    price.textContent = `$${property.price.toLocaleString()}`;
  } else {
    price.textContent = 'Contact for Price';
  }
  content.appendChild(price);

  card.appendChild(content);
  return card;
}

// ─── Services Overview Page ───────────────────────────────────────────────
export function renderServicesPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('div', 'services-page');

  // Hero Section
  const hero = createElement('section', 'services-page__hero');
  const heroContainer = createElement('div', 'container');

  const heroBadge = createElement('span', 'services-page__badge', 'Our Services');
  heroContainer.appendChild(heroBadge);

  const heroTitle = createElement('h1', 'services-page__title');
  heroTitle.textContent = 'Real Estate Erbil Services — ';
  const heroTitleEm = createElement('em', undefined, 'Best Real Estate Agent Erbil');
  heroTitle.appendChild(heroTitleEm);
  heroContainer.appendChild(heroTitle);

  const heroSubtitle = createElement('p', 'services-page__subtitle');
  heroSubtitle.textContent = 'Real House provides property Erbil services for houses for sale Erbil, apartments Erbil Iraq, villas Erbil Iraq, and luxury homes Kurdistan. Our best real estate agent Erbil team delivers professional guidance to buy house Erbil and navigate the Erbil property market.';
  heroContainer.appendChild(heroSubtitle);

  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // Services Grid Section
  const servicesSection = createElement('section', 'services-page__services');
  const servicesContainer = createElement('div', 'container');

  const servicesGrid = createElement('div', 'services-page__grid');
  services.forEach(service => {
    servicesGrid.appendChild(createServiceCard(service));
  });
  servicesContainer.appendChild(servicesGrid);
  servicesSection.appendChild(servicesContainer);
  page.appendChild(servicesSection);

  // Why Choose Us Section
  const whySection = createElement('section', 'services-page__why');
  const whyContainer = createElement('div', 'container');

  const whyHeader = createElement('div', 'services-page__section-header');
  const whyTitle = createElement('h2', 'services-page__section-title', 'Why Choose Real House for Property Erbil?');
  whyHeader.appendChild(whyTitle);
  const whySubtitle = createElement('p', 'services-page__section-subtitle');
  whySubtitle.textContent = 'Trusted by hundreds of clients for real estate Erbil - houses for sale Erbil and apartments Erbil Iraq services.';
  whyHeader.appendChild(whySubtitle);
  whyContainer.appendChild(whyHeader);

  const statsGrid = createElement('div', 'services-page__stats');

  const stats = [
    { value: '500+', label: 'Properties Listed' },
    { value: '200+', label: 'Happy Clients' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' }
  ];

  stats.forEach(stat => {
    const statCard = createElement('div', 'services-page__stat');
    const statValue = createElement('span', 'services-page__stat-value', stat.value);
    statCard.appendChild(statValue);
    const statLabel = createElement('span', 'services-page__stat-label', stat.label);
    statCard.appendChild(statLabel);
    statsGrid.appendChild(statCard);
  });

  whyContainer.appendChild(statsGrid);
  whySection.appendChild(whyContainer);
  page.appendChild(whySection);

  // Testimonials Section
  const testimonialsSection = createElement('section', 'services-page__testimonials');
  const testimonialsContainer = createElement('div', 'container');

  const testimonialsHeader = createElement('div', 'services-page__section-header');
  const testimonialsTitle = createElement('h2', 'services-page__section-title', 'Property Erbil Client Testimonials');
  testimonialsHeader.appendChild(testimonialsTitle);
  testimonialsContainer.appendChild(testimonialsHeader);

  const testimonialsGrid = createElement('div', 'services-page__testimonials-grid');
  testimonials.slice(0, 3).forEach(testimonial => {
    testimonialsGrid.appendChild(createTestimonialCard(testimonial));
  });
  testimonialsContainer.appendChild(testimonialsGrid);

  testimonialsSection.appendChild(testimonialsContainer);
  page.appendChild(testimonialsSection);

  // CTA Section
  const ctaSection = createElement('section', 'services-page__cta');
  const ctaContainer = createElement('div', 'container');
  const ctaContent = createElement('div', 'services-page__cta-content');

  const ctaTitle = createElement('h2', 'services-page__cta-title', 'Ready for Real Estate Erbil Services?');
  ctaContent.appendChild(ctaTitle);

  const ctaText = createElement('p', 'services-page__cta-text');
  ctaText.textContent = 'Contact our best real estate agent Erbil team for houses for sale Erbil, apartments Erbil Iraq, luxury homes Kurdistan, and property Erbil assistance.';
  ctaContent.appendChild(ctaText);

  const ctaBtns = createElement('div', 'services-page__cta-btns');

  const ctaBtn1 = createElement('a', 'btn btn--primary', 'Contact Us');
  ctaBtn1.href = '/contact';
  ctaBtn1.setAttribute('data-route', '');
  ctaBtns.appendChild(ctaBtn1);

  const ctaBtn2 = createElement('a', 'btn btn--ghost', 'View Properties');
  ctaBtn2.href = '/properties';
  ctaBtn2.setAttribute('data-route', '');
  ctaBtns.appendChild(ctaBtn2);

  ctaContent.appendChild(ctaBtns);
  ctaContainer.appendChild(ctaContent);
  ctaSection.appendChild(ctaContainer);
  page.appendChild(ctaSection);

  fragment.appendChild(page);
  return fragment;
}

// ─── Service Detail Page ──────────────────────────────────────────────────
export function renderServiceDetailPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const service = getServiceBySlug(slug);

  if (!service) {
    // 404 for service not found
    const page = createElement('div', 'service-detail-page service-detail-page--not-found');
    const container = createElement('div', 'container');

    const errorContent = createElement('div', 'service-detail-page__error');
    const errorTitle = createElement('h1', undefined, 'Service Not Found');
    errorContent.appendChild(errorTitle);
    const errorText = createElement('p', undefined, 'The service you\'re looking for doesn\'t exist or has been moved.');
    errorContent.appendChild(errorText);
    const backLink = createElement('a', 'btn btn--primary', 'View All Services');
    backLink.href = '/services';
    backLink.setAttribute('data-route', '');
    errorContent.appendChild(backLink);

    container.appendChild(errorContent);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  const page = createElement('div', 'service-detail-page');

  // Hero Section
  const hero = createElement('section', 'service-detail-page__hero');
  const heroImage = createElement('img', 'service-detail-page__hero-image');
  heroImage.src = service.heroImage;
  heroImage.alt = service.title;
  hero.appendChild(heroImage);
  const heroOverlay = createElement('div', 'service-detail-page__hero-overlay');
  hero.appendChild(heroOverlay);

  const heroContainer = createElement('div', 'container');

  // Breadcrumb
  const breadcrumb = createElement('nav', 'service-detail-page__breadcrumb');
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');
  const breadcrumbList = createElement('ol', 'breadcrumb');

  const homeCrumb = createElement('li', 'breadcrumb__item');
  const homeLink = createElement('a', undefined, 'Home');
  homeLink.href = '/';
  homeLink.setAttribute('data-route', '');
  homeCrumb.appendChild(homeLink);
  breadcrumbList.appendChild(homeCrumb);

  const servicesCrumb = createElement('li', 'breadcrumb__item');
  const servicesLink = createElement('a', undefined, 'Services');
  servicesLink.href = '/services';
  servicesLink.setAttribute('data-route', '');
  servicesCrumb.appendChild(servicesLink);
  breadcrumbList.appendChild(servicesCrumb);

  const currentCrumb = createElement('li', 'breadcrumb__item breadcrumb__item--current');
  currentCrumb.textContent = service.title;
  currentCrumb.setAttribute('aria-current', 'page');
  breadcrumbList.appendChild(currentCrumb);

  breadcrumb.appendChild(breadcrumbList);
  heroContainer.appendChild(breadcrumb);

  // Hero Content
  const heroContent = createElement('div', 'service-detail-page__hero-content');
  const heroIcon = createElement('div', 'service-detail-page__icon');
  heroIcon.appendChild(createSVGUse(service.icon));
  heroContent.appendChild(heroIcon);

  // Use SEO-optimized H1 title with target keyword
  const heroTitle = createElement('h1', 'service-detail-page__title', service.h1Title || service.title);
  heroContent.appendChild(heroTitle);

  const heroSubtitle = createElement('p', 'service-detail-page__subtitle', service.shortDescription);
  heroContent.appendChild(heroSubtitle);

  const heroCta = createElement('a', 'btn btn--primary btn--lg', 'Get Started');
  heroCta.href = '/contact';
  heroCta.setAttribute('data-route', '');
  heroContent.appendChild(heroCta);

  heroContainer.appendChild(heroContent);
  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // Main Content Section
  const mainSection = createElement('section', 'service-detail-page__main');
  const mainContainer = createElement('div', 'container');
  const mainWrapper = createElement('div', 'service-detail-page__wrapper');

  // Article Content
  const article = createElement('article', 'service-detail-page__article');

  // Service Description
  const descriptionSection = createElement('div', 'service-detail-page__description');
  descriptionSection.appendChild(parseServiceContent(service.fullDescription));
  article.appendChild(descriptionSection);

  // Features Section
  const featuresSection = createElement('div', 'service-detail-page__features');
  const featuresTitle = createElement('h2', 'service-detail-page__features-title', 'Service Features');
  featuresSection.appendChild(featuresTitle);

  const featuresGrid = createElement('div', 'service-detail-page__features-grid');
  service.features.forEach(feature => {
    const featureCard = createElement('div', 'service-detail-page__feature');
    const featureIcon = createElement('div', 'service-detail-page__feature-icon');
    featureIcon.appendChild(createSVGUse(feature.icon));
    featureCard.appendChild(featureIcon);
    const featureTitle = createElement('h3', 'service-detail-page__feature-title', feature.title);
    featureCard.appendChild(featureTitle);
    const featureDesc = createElement('p', 'service-detail-page__feature-desc', feature.description);
    featureCard.appendChild(featureDesc);
    featuresGrid.appendChild(featureCard);
  });
  featuresSection.appendChild(featuresGrid);
  article.appendChild(featuresSection);

  // Process Section
  const processSection = createElement('div', 'service-detail-page__process');
  const processTitle = createElement('h2', 'service-detail-page__process-title', 'How It Works');
  processSection.appendChild(processTitle);

  const processSteps = createElement('div', 'service-detail-page__process-steps');
  service.process.forEach(step => {
    const stepCard = createElement('div', 'service-detail-page__step');
    const stepNumber = createElement('span', 'service-detail-page__step-number', step.step.toString());
    stepCard.appendChild(stepNumber);
    const stepContent = createElement('div', 'service-detail-page__step-content');
    const stepTitle = createElement('h3', 'service-detail-page__step-title', step.title);
    stepContent.appendChild(stepTitle);
    const stepDesc = createElement('p', 'service-detail-page__step-desc', step.description);
    stepContent.appendChild(stepDesc);
    stepCard.appendChild(stepContent);
    processSteps.appendChild(stepCard);
  });
  processSection.appendChild(processSteps);
  article.appendChild(processSection);

  // Benefits Section
  const benefitsSection = createElement('div', 'service-detail-page__benefits');
  const benefitsTitle = createElement('h2', 'service-detail-page__benefits-title', 'Key Benefits');
  benefitsSection.appendChild(benefitsTitle);

  const benefitsList = createElement('ul', 'service-detail-page__benefits-list');
  service.benefits.forEach(benefit => {
    const benefitItem = createElement('li', 'service-detail-page__benefit');
    benefitItem.appendChild(createSVGUse('icon-check'));
    benefitItem.appendChild(document.createTextNode(benefit));
    benefitsList.appendChild(benefitItem);
  });
  benefitsSection.appendChild(benefitsList);
  article.appendChild(benefitsSection);

  // FAQs Section
  const faqSection = createElement('div', 'service-detail-page__faqs');
  const faqTitle = createElement('h2', 'service-detail-page__faqs-title', 'Frequently Asked Questions');
  faqSection.appendChild(faqTitle);

  const faqList = createElement('div', 'service-detail-page__faq-list');
  service.faqs.forEach((faq, index) => {
    const faqItem = createElement('div', 'service-detail-page__faq-item');
    faqItem.setAttribute('data-faq-index', index.toString());

    const faqQuestion = createElement('button', 'service-detail-page__faq-question');
    faqQuestion.setAttribute('type', 'button');
    faqQuestion.setAttribute('aria-expanded', 'false');
    const faqQuestionText = createElement('span', undefined, faq.question);
    faqQuestion.appendChild(faqQuestionText);
    const faqIcon = createElement('span', 'service-detail-page__faq-icon', '+');
    faqQuestion.appendChild(faqIcon);
    faqItem.appendChild(faqQuestion);

    const faqAnswer = createElement('div', 'service-detail-page__faq-answer');
    const faqAnswerText = createElement('p', undefined, faq.answer);
    faqAnswer.appendChild(faqAnswerText);
    faqItem.appendChild(faqAnswer);

    faqList.appendChild(faqItem);
  });
  faqSection.appendChild(faqList);
  article.appendChild(faqSection);

  mainWrapper.appendChild(article);

  // Sidebar
  const sidebar = createElement('aside', 'service-detail-page__sidebar');

  // Contact CTA Card
  const ctaCard = createElement('div', 'service-detail-page__cta-card');
  const ctaCardTitle = createElement('h3', 'service-detail-page__cta-card-title', service.ctaTitle);
  ctaCard.appendChild(ctaCardTitle);
  const ctaCardText = createElement('p', 'service-detail-page__cta-card-text', service.ctaDescription);
  ctaCard.appendChild(ctaCardText);
  const ctaCardBtn = createElement('a', 'btn btn--primary btn--block', 'Contact Us');
  ctaCardBtn.href = '/contact';
  ctaCardBtn.setAttribute('data-route', '');
  ctaCard.appendChild(ctaCardBtn);

  const ctaCardPhone = createElement('div', 'service-detail-page__cta-phone');
  ctaCardPhone.appendChild(createSVGUse('icon-phone'));
  const phoneLink = createElement('a', undefined, '+964 750 792 2138');
  phoneLink.href = 'tel:+9647507922138';
  ctaCardPhone.appendChild(phoneLink);
  ctaCard.appendChild(ctaCardPhone);

  sidebar.appendChild(ctaCard);

  // Related Services
  const relatedServices = getRelatedServices(service);
  if (relatedServices.length > 0) {
    const relatedSection = createElement('div', 'service-detail-page__related');
    const relatedTitle = createElement('h3', 'service-detail-page__related-title', 'Related Services');
    relatedSection.appendChild(relatedTitle);

    const relatedList = createElement('div', 'service-detail-page__related-list');
    relatedServices.forEach(relatedService => {
      const relatedItem = createElement('a', 'service-detail-page__related-item');
      relatedItem.href = `/services/${relatedService.slug}`;
      relatedItem.setAttribute('data-route', '');

      const relatedIcon = createElement('span', 'service-detail-page__related-icon');
      relatedIcon.appendChild(createSVGUse(relatedService.icon));
      relatedItem.appendChild(relatedIcon);

      const relatedInfo = createElement('div', 'service-detail-page__related-info');
      const relatedItemTitle = createElement('span', 'service-detail-page__related-name', relatedService.title);
      relatedInfo.appendChild(relatedItemTitle);
      relatedItem.appendChild(relatedInfo);

      relatedList.appendChild(relatedItem);
    });
    relatedSection.appendChild(relatedList);
    sidebar.appendChild(relatedSection);
  }

  // Featured Properties (for relevant services)
  if (['buy', 'sell', 'rent', 'investment-consulting'].includes(service.id)) {
    const propertiesSection = createElement('div', 'service-detail-page__properties');
    const propertiesTitle = createElement('h3', 'service-detail-page__properties-title', 'Featured Properties');
    propertiesSection.appendChild(propertiesTitle);

    const propertiesList = createElement('div', 'service-detail-page__properties-list');
    featuredProperties.slice(0, 3).forEach(property => {
      propertiesList.appendChild(createPropertyCardMini(property));
    });
    propertiesSection.appendChild(propertiesList);

    const viewAllLink = createElement('a', 'service-detail-page__view-all', 'View All Properties');
    viewAllLink.href = '/properties';
    viewAllLink.setAttribute('data-route', '');
    propertiesSection.appendChild(viewAllLink);

    sidebar.appendChild(propertiesSection);
  }

  mainWrapper.appendChild(sidebar);
  mainContainer.appendChild(mainWrapper);
  mainSection.appendChild(mainContainer);
  page.appendChild(mainSection);

  // Testimonials Section - Use service-specific testimonials if available
  const testimonialsSection = createElement('section', 'service-detail-page__testimonials');
  const testimonialsContainer = createElement('div', 'container');

  const testimonialsHeader = createElement('div', 'service-detail-page__testimonials-header');
  const testimonialsTitle = createElement('h2', undefined, 'What Our Clients Say');
  testimonialsHeader.appendChild(testimonialsTitle);
  testimonialsContainer.appendChild(testimonialsHeader);

  const testimonialsGrid = createElement('div', 'service-detail-page__testimonials-grid');

  // Use service-specific testimonials if available, otherwise fall back to general
  const serviceTestimonials = service.testimonials && service.testimonials.length > 0
    ? service.testimonials
    : testimonials.slice(0, 3);

  serviceTestimonials.forEach(testimonial => {
    testimonialsGrid.appendChild(createServiceTestimonialCard(testimonial));
  });
  testimonialsContainer.appendChild(testimonialsGrid);

  testimonialsSection.appendChild(testimonialsContainer);
  page.appendChild(testimonialsSection);

  // Bottom CTA Section
  const bottomCta = createElement('section', 'service-detail-page__bottom-cta');
  const bottomCtaContainer = createElement('div', 'container');
  const bottomCtaContent = createElement('div', 'service-detail-page__bottom-cta-content');

  const bottomCtaTitle = createElement('h2', undefined, 'Ready to Get Started?');
  bottomCtaContent.appendChild(bottomCtaTitle);
  const bottomCtaText = createElement('p', undefined, 'Contact our expert team today for personalized assistance.');
  bottomCtaContent.appendChild(bottomCtaText);

  const bottomCtaBtns = createElement('div', 'service-detail-page__bottom-cta-btns');
  const bottomCtaBtn1 = createElement('a', 'btn btn--primary btn--lg', 'Contact Us');
  bottomCtaBtn1.href = '/contact';
  bottomCtaBtn1.setAttribute('data-route', '');
  bottomCtaBtns.appendChild(bottomCtaBtn1);
  const bottomCtaBtn2 = createElement('a', 'btn btn--ghost btn--lg', 'View All Services');
  bottomCtaBtn2.href = '/services';
  bottomCtaBtn2.setAttribute('data-route', '');
  bottomCtaBtns.appendChild(bottomCtaBtn2);
  bottomCtaContent.appendChild(bottomCtaBtns);

  bottomCtaContainer.appendChild(bottomCtaContent);
  bottomCta.appendChild(bottomCtaContainer);
  page.appendChild(bottomCta);

  fragment.appendChild(page);

  // Add FAQ toggle functionality after DOM is ready
  setTimeout(() => {
    const faqItems = document.querySelectorAll('.service-detail-page__faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.service-detail-page__faq-question');
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
export function setupServicesPageSEO(): void {
  document.title = 'Real Estate Services Erbil | Property Services Kurdistan | Real House';

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Comprehensive real estate services in Erbil, Kurdistan. Property buying, selling, rental, management, investment consulting, and valuation services. Contact Real House today.');
  }

  // Update canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `${BASE_URL}/services`);
  }

  // Add Services schema
  const existingSchema = document.querySelector('script[data-schema="services"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const servicesSchema = document.createElement('script');
  servicesSchema.type = 'application/ld+json';
  servicesSchema.setAttribute('data-schema', 'services');
  servicesSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Real House Services',
    'description': 'Professional real estate services in Erbil, Kurdistan',
    'numberOfItems': services.length,
    'itemListElement': services.map((service, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Service',
        'name': service.title,
        'description': service.shortDescription,
        'url': `${BASE_URL}/services/${service.slug}`,
        'provider': {
          '@type': 'RealEstateAgent',
          'name': 'Real House',
          'url': BASE_URL
        }
      }
    }))
  });
  document.head.appendChild(servicesSchema);

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
        'name': 'Services',
        'item': `${BASE_URL}/services`
      }
    ]
  });
  document.head.appendChild(breadcrumbSchema);
}

export function setupServiceDetailPageSEO(service: Service): void {
  // Update title
  document.title = service.metaTitle;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', service.metaDescription);
  }

  // Update canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `${BASE_URL}/services/${service.slug}`);
  }

  // Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', service.metaTitle);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', service.metaDescription);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', `${BASE_URL}/services/${service.slug}`);
  }

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    ogImage.setAttribute('content', service.heroImage);
  }

  // Add ProfessionalService schema
  const existingSchema = document.querySelector('script[data-schema="service"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const serviceSchema = document.createElement('script');
  serviceSchema.type = 'application/ld+json';
  serviceSchema.setAttribute('data-schema', 'service');
  serviceSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': service.title,
    'description': service.metaDescription,
    'url': `${BASE_URL}/services/${service.slug}`,
    'image': service.heroImage,
    'provider': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': BASE_URL,
      'telephone': '+964-750-792-2138',
      'email': 'info@realhouseiq.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Queen Tower, Erbil',
        'addressLocality': 'Erbil',
        'addressRegion': 'Kurdistan Region',
        'postalCode': '44001',
        'addressCountry': 'IQ'
      }
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Erbil',
      'containedInPlace': {
        '@type': 'State',
        'name': 'Kurdistan Region'
      }
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': service.title,
      'itemListElement': service.features.map(feature => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': feature.title,
          'description': feature.description
        }
      }))
    },
    'priceRange': '$$$'
  });
  document.head.appendChild(serviceSchema);

  // Add HowTo schema for process steps
  const existingHowTo = document.querySelector('script[data-schema="howto"]');
  if (existingHowTo) {
    existingHowTo.remove();
  }

  const howToSchema = document.createElement('script');
  howToSchema.type = 'application/ld+json';
  howToSchema.setAttribute('data-schema', 'howto');
  howToSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How to ${service.title} in Erbil`,
    'description': service.shortDescription,
    'image': service.heroImage,
    'totalTime': 'P4W',
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'USD',
      'value': 'Contact for pricing'
    },
    'step': service.process.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.title,
      'text': step.description,
      'url': `${BASE_URL}/services/${service.slug}#step-${index + 1}`
    })),
    'tool': service.features.map(feature => ({
      '@type': 'HowToTool',
      'name': feature.title
    }))
  });
  document.head.appendChild(howToSchema);

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
    'mainEntity': service.faqs.map(faq => ({
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
        'name': 'Services',
        'item': `${BASE_URL}/services`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': service.title,
        'item': `${BASE_URL}/services/${service.slug}`
      }
    ]
  });
  document.head.appendChild(breadcrumbSchema);
}
