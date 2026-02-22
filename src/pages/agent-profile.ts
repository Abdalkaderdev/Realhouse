// ═══════════════════════════════════════════════════════════════════════════
// Agent Profile Page
// /agents/:slug - Individual agent detail page
// ═══════════════════════════════════════════════════════════════════════════

import {
  getAgentBySlug,
  generateAgentSchema,
  formatSalesVolume,
  type Agent
} from '../data/agents';
import { properties, type Property } from '../data/properties';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema
} from '../components/internal-linking';

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
function getAgentDetailBreadcrumbs(agent: Agent) {
  return [
    { name: 'Home', url: '/' },
    { name: 'Our Agents', url: '/agents' },
    { name: agent.name, url: `/agents/${agent.slug}` }
  ];
}

// ─── Get Agent Properties ───────────────────────────────────────────────────
function getAgentProperties(agent: Agent): Property[] {
  // Return properties from agent's featured areas (simulated assignment)
  return properties
    .filter(p => agent.featuredAreas.some(area =>
      p.location.district.toLowerCase().includes(area.toLowerCase()) ||
      area.toLowerCase().includes(p.location.district.toLowerCase())
    ))
    .slice(0, 6);
}

// ─── Create Star Rating ─────────────────────────────────────────────────────
function createStarRating(rating: number): HTMLElement {
  const stars = createElement('div', 'agent-profile__stars');
  for (let i = 1; i <= 5; i++) {
    const star = createElement('span', i <= rating ? 'agent-profile__star agent-profile__star--filled' : 'agent-profile__star');
    star.textContent = '\u2605'; // Unicode star
    stars.appendChild(star);
  }
  return stars;
}

// ─── Create Testimonial Card ────────────────────────────────────────────────
function createTestimonialCard(testimonial: Agent['testimonials'][0]): HTMLElement {
  const card = createElement('div', 'agent-profile__testimonial');

  const header = createElement('div', 'agent-profile__testimonial-header');
  header.appendChild(createStarRating(testimonial.rating));

  if (testimonial.propertyType) {
    const badge = createElement('span', 'agent-profile__testimonial-badge', testimonial.propertyType);
    header.appendChild(badge);
  }

  card.appendChild(header);

  const text = createElement('p', 'agent-profile__testimonial-text', `"${testimonial.text}"`);
  card.appendChild(text);

  const footer = createElement('div', 'agent-profile__testimonial-footer');
  const clientName = createElement('span', 'agent-profile__testimonial-client', testimonial.clientName);
  footer.appendChild(clientName);
  const clientLocation = createElement('span', 'agent-profile__testimonial-location', testimonial.clientLocation);
  footer.appendChild(clientLocation);
  card.appendChild(footer);

  const date = createElement('span', 'agent-profile__testimonial-date', testimonial.date);
  card.appendChild(date);

  return card;
}

// ─── Create Property Card (Compact) ─────────────────────────────────────────
function createCompactPropertyCard(property: Property): HTMLElement {
  const card = createElement('a', 'agent-profile__property-card');
  card.href = `/properties/${property.id}`;
  card.setAttribute('data-route', '');

  const image = createElement('div', 'agent-profile__property-image');
  image.style.backgroundImage = `url(${property.images[0]})`;

  const badge = createElement('span', `agent-profile__property-badge agent-profile__property-badge--${property.status.toLowerCase().replace(' ', '-')}`);
  badge.textContent = property.status;
  image.appendChild(badge);

  card.appendChild(image);

  const content = createElement('div', 'agent-profile__property-content');

  const title = createElement('h4', 'agent-profile__property-title', property.title);
  content.appendChild(title);

  const location = createElement('p', 'agent-profile__property-location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${property.location.district}, ${property.location.city}`));
  content.appendChild(location);

  const price = createElement('p', 'agent-profile__property-price');
  price.textContent = property.price > 0 ? `$${property.price.toLocaleString()}` : 'Price on Request';
  content.appendChild(price);

  const specs = createElement('div', 'agent-profile__property-specs');
  if (property.specs.beds > 0) {
    const beds = createElement('span', undefined, `${property.specs.beds} Beds`);
    specs.appendChild(beds);
  }
  const baths = createElement('span', undefined, `${property.specs.baths} Baths`);
  specs.appendChild(baths);
  const sqm = createElement('span', undefined, `${property.specs.sqm} m\u00B2`);
  specs.appendChild(sqm);
  content.appendChild(specs);

  card.appendChild(content);

  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// Agent Profile Page Renderer
// ═══════════════════════════════════════════════════════════════════════════

export function renderAgentProfilePage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const agent = getAgentBySlug(slug);

  if (!agent) {
    // 404 state
    const page = createElement('div', 'agent-profile-page agent-profile-page--not-found');
    const container = createElement('div', 'container');

    const notFound = createElement('div', 'agent-profile-page__not-found');
    const title = createElement('h1', undefined, 'Agent Not Found');
    notFound.appendChild(title);

    const text = createElement('p', undefined, 'The agent you are looking for does not exist or has been removed.');
    notFound.appendChild(text);

    const backLink = createElement('a', 'btn btn--primary', 'View All Agents');
    backLink.href = '/agents';
    backLink.setAttribute('data-route', '');
    notFound.appendChild(backLink);

    container.appendChild(notFound);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  const breadcrumbs = getAgentDetailBreadcrumbs(agent);
  injectBreadcrumbSchema(breadcrumbs);

  const page = createElement('div', 'agent-profile-page');

  // Hero Section
  const hero = createElement('section', 'agent-profile__hero');
  const heroContainer = createElement('div', 'container');

  heroContainer.appendChild(createBreadcrumbs(breadcrumbs));

  const heroContent = createElement('div', 'agent-profile__hero-content');

  // Agent Image
  const imageWrapper = createElement('div', 'agent-profile__image-wrapper');
  const image = createElement('img', 'agent-profile__image');
  image.src = agent.image;
  image.alt = `${agent.name} - ${agent.role} at Real House`;
  imageWrapper.appendChild(image);

  if (agent.isLeadership) {
    const badge = createElement('span', 'agent-profile__leadership-badge', 'Leadership');
    imageWrapper.appendChild(badge);
  }

  heroContent.appendChild(imageWrapper);

  // Agent Info
  const heroInfo = createElement('div', 'agent-profile__hero-info');

  const name = createElement('h1', 'agent-profile__name', agent.name);
  heroInfo.appendChild(name);

  const role = createElement('p', 'agent-profile__role', agent.title);
  heroInfo.appendChild(role);

  const specialization = createElement('p', 'agent-profile__specialization', agent.specialization);
  heroInfo.appendChild(specialization);

  // Quick Stats
  const quickStats = createElement('div', 'agent-profile__quick-stats');

  const statsData = [
    { value: `${agent.yearsExperience}+`, label: 'Years Experience' },
    { value: agent.propertiesSold.toString(), label: 'Properties Sold' },
    { value: formatSalesVolume(agent.totalSalesVolume), label: 'Total Sales' },
    { value: agent.activeListings.toString(), label: 'Active Listings' }
  ];

  statsData.forEach(stat => {
    const statItem = createElement('div', 'agent-profile__quick-stat');
    const statValue = createElement('span', 'agent-profile__quick-stat-value', stat.value);
    const statLabel = createElement('span', 'agent-profile__quick-stat-label', stat.label);
    statItem.appendChild(statValue);
    statItem.appendChild(statLabel);
    quickStats.appendChild(statItem);
  });

  heroInfo.appendChild(quickStats);

  // Languages
  const languages = createElement('div', 'agent-profile__languages');
  const langLabel = createElement('span', 'agent-profile__languages-label', 'Languages: ');
  languages.appendChild(langLabel);
  agent.languages.forEach((lang, i) => {
    const langTag = createElement('span', 'agent-profile__lang-tag', lang);
    languages.appendChild(langTag);
    if (i < agent.languages.length - 1) {
      languages.appendChild(document.createTextNode(' '));
    }
  });
  heroInfo.appendChild(languages);

  // CTA Buttons
  const heroCta = createElement('div', 'agent-profile__hero-cta');

  const callBtn = createElement('a', 'btn btn--primary btn--lg');
  callBtn.href = `tel:${agent.phone.replace(/\s/g, '')}`;
  callBtn.appendChild(createSVGUse('icon-phone'));
  callBtn.appendChild(document.createTextNode(' Call Now'));
  heroCta.appendChild(callBtn);

  const whatsappBtn = createElement('a', 'btn btn--whatsapp btn--lg');
  whatsappBtn.href = `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(`Hi ${agent.name}, I'm interested in property assistance.`)}`;
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.appendChild(createSVGUse('icon-whatsapp'));
  whatsappBtn.appendChild(document.createTextNode(' WhatsApp'));
  heroCta.appendChild(whatsappBtn);

  const emailBtn = createElement('a', 'btn btn--ghost btn--lg');
  emailBtn.href = `mailto:${agent.email}`;
  emailBtn.appendChild(createSVGUse('icon-email'));
  emailBtn.appendChild(document.createTextNode(' Email'));
  heroCta.appendChild(emailBtn);

  heroInfo.appendChild(heroCta);

  heroContent.appendChild(heroInfo);
  heroContainer.appendChild(heroContent);
  hero.appendChild(heroContainer);
  page.appendChild(hero);

  // Main Content
  const mainContent = createElement('section', 'agent-profile__content');
  const mainContainer = createElement('div', 'container');
  const grid = createElement('div', 'agent-profile__grid');

  // Left Column - Main Content
  const main = createElement('div', 'agent-profile__main');

  // About Section
  const aboutSection = createElement('div', 'agent-profile__section');
  const aboutTitle = createElement('h2', 'agent-profile__section-title', `About ${agent.name}`);
  aboutSection.appendChild(aboutTitle);

  const bioParagraphs = agent.fullBio.split('\n\n');
  bioParagraphs.forEach(para => {
    if (para.trim()) {
      const p = createElement('p', 'agent-profile__bio-text', para.trim());
      aboutSection.appendChild(p);
    }
  });

  main.appendChild(aboutSection);

  // Specializations Section
  const specSection = createElement('div', 'agent-profile__section');
  const specTitle = createElement('h2', 'agent-profile__section-title', 'Specializations');
  specSection.appendChild(specTitle);

  const specList = createElement('ul', 'agent-profile__spec-list');
  agent.specializations.forEach(spec => {
    const li = createElement('li', 'agent-profile__spec-item');
    li.appendChild(createSVGUse('icon-check'));
    li.appendChild(document.createTextNode(spec));
    specList.appendChild(li);
  });
  specSection.appendChild(specList);

  main.appendChild(specSection);

  // Featured Areas Section
  const areasSection = createElement('div', 'agent-profile__section');
  const areasTitle = createElement('h2', 'agent-profile__section-title', 'Featured Areas');
  areasSection.appendChild(areasTitle);

  const areasTags = createElement('div', 'agent-profile__areas-tags');
  agent.featuredAreas.forEach(area => {
    const tag = createElement('span', 'agent-profile__area-tag', area);
    areasTags.appendChild(tag);
  });
  areasSection.appendChild(areasTags);

  main.appendChild(areasSection);

  // Certifications & Awards Section
  if (agent.certifications.length > 0 || agent.awards.length > 0) {
    const credSection = createElement('div', 'agent-profile__section');
    const credTitle = createElement('h2', 'agent-profile__section-title', 'Certifications & Awards');
    credSection.appendChild(credTitle);

    const credGrid = createElement('div', 'agent-profile__cred-grid');

    if (agent.certifications.length > 0) {
      const certCol = createElement('div', 'agent-profile__cred-col');
      const certTitle = createElement('h3', 'agent-profile__cred-heading', 'Certifications');
      certCol.appendChild(certTitle);

      const certList = createElement('ul', 'agent-profile__cred-list');
      agent.certifications.forEach(cert => {
        const li = createElement('li', 'agent-profile__cred-item');
        li.appendChild(createSVGUse('icon-award'));
        li.appendChild(document.createTextNode(cert));
        certList.appendChild(li);
      });
      certCol.appendChild(certList);
      credGrid.appendChild(certCol);
    }

    if (agent.awards.length > 0) {
      const awardsCol = createElement('div', 'agent-profile__cred-col');
      const awardsTitle = createElement('h3', 'agent-profile__cred-heading', 'Awards');
      awardsCol.appendChild(awardsTitle);

      const awardsList = createElement('ul', 'agent-profile__cred-list');
      agent.awards.forEach(award => {
        const li = createElement('li', 'agent-profile__cred-item');
        li.appendChild(createSVGUse('icon-award'));
        li.appendChild(document.createTextNode(award));
        awardsList.appendChild(li);
      });
      awardsCol.appendChild(awardsList);
      credGrid.appendChild(awardsCol);
    }

    credSection.appendChild(credGrid);
    main.appendChild(credSection);
  }

  // Testimonials Section
  if (agent.testimonials.length > 0) {
    const testimonialsSection = createElement('div', 'agent-profile__section');
    const testimonialsTitle = createElement('h2', 'agent-profile__section-title', 'Client Reviews');
    testimonialsSection.appendChild(testimonialsTitle);

    const avgRating = agent.testimonials.reduce((sum, t) => sum + t.rating, 0) / agent.testimonials.length;
    const ratingRow = createElement('div', 'agent-profile__rating-row');
    ratingRow.appendChild(createStarRating(Math.round(avgRating)));
    const ratingText = createElement('span', 'agent-profile__rating-text', `${avgRating.toFixed(1)} out of 5 (${agent.testimonials.length} reviews)`);
    ratingRow.appendChild(ratingText);
    testimonialsSection.appendChild(ratingRow);

    const testimonialsGrid = createElement('div', 'agent-profile__testimonials-grid');
    agent.testimonials.forEach(testimonial => {
      testimonialsGrid.appendChild(createTestimonialCard(testimonial));
    });
    testimonialsSection.appendChild(testimonialsGrid);

    main.appendChild(testimonialsSection);
  }

  // Properties Section
  const agentProperties = getAgentProperties(agent);
  if (agentProperties.length > 0) {
    const propertiesSection = createElement('div', 'agent-profile__section');
    const propertiesHeader = createElement('div', 'agent-profile__section-header');
    const propertiesTitle = createElement('h2', 'agent-profile__section-title', `${agent.name}'s Listings`);
    propertiesHeader.appendChild(propertiesTitle);

    const viewAllLink = createElement('a', 'agent-profile__view-all', 'View All Properties');
    viewAllLink.href = '/properties';
    viewAllLink.setAttribute('data-route', '');
    viewAllLink.appendChild(createSVGUse('icon-arrow-right'));
    propertiesHeader.appendChild(viewAllLink);

    propertiesSection.appendChild(propertiesHeader);

    const propertiesGrid = createElement('div', 'agent-profile__properties-grid');
    agentProperties.forEach(property => {
      propertiesGrid.appendChild(createCompactPropertyCard(property));
    });
    propertiesSection.appendChild(propertiesGrid);

    main.appendChild(propertiesSection);
  }

  grid.appendChild(main);

  // Right Column - Sidebar
  const sidebar = createElement('aside', 'agent-profile__sidebar');

  // Contact Card
  const contactCard = createElement('div', 'agent-profile__contact-card');
  const contactTitle = createElement('h3', 'agent-profile__card-title', 'Contact Information');
  contactCard.appendChild(contactTitle);

  const contactInfo = createElement('div', 'agent-profile__contact-info');

  const phoneItem = createElement('a', 'agent-profile__contact-item');
  phoneItem.href = `tel:${agent.phone.replace(/\s/g, '')}`;
  phoneItem.appendChild(createSVGUse('icon-phone'));
  phoneItem.appendChild(document.createTextNode(agent.phone));
  contactInfo.appendChild(phoneItem);

  const emailItem = createElement('a', 'agent-profile__contact-item');
  emailItem.href = `mailto:${agent.email}`;
  emailItem.appendChild(createSVGUse('icon-email'));
  emailItem.appendChild(document.createTextNode(agent.email));
  contactInfo.appendChild(emailItem);

  const whatsappItem = createElement('a', 'agent-profile__contact-item');
  whatsappItem.href = `https://wa.me/${agent.whatsapp}`;
  whatsappItem.target = '_blank';
  whatsappItem.rel = 'noopener noreferrer';
  whatsappItem.appendChild(createSVGUse('icon-whatsapp'));
  whatsappItem.appendChild(document.createTextNode('WhatsApp'));
  contactInfo.appendChild(whatsappItem);

  contactCard.appendChild(contactInfo);

  // Social Links
  if (Object.values(agent.socialLinks).some(Boolean)) {
    const socialLinks = createElement('div', 'agent-profile__social-links');
    const socialTitle = createElement('p', 'agent-profile__social-title', 'Connect on Social Media');
    socialLinks.appendChild(socialTitle);

    const socialButtons = createElement('div', 'agent-profile__social-buttons');

    if (agent.socialLinks.linkedin) {
      const linkedinBtn = createElement('a', 'agent-profile__social-btn');
      linkedinBtn.href = agent.socialLinks.linkedin;
      linkedinBtn.target = '_blank';
      linkedinBtn.rel = 'noopener noreferrer';
      linkedinBtn.textContent = 'LinkedIn';
      socialButtons.appendChild(linkedinBtn);
    }

    if (agent.socialLinks.instagram) {
      const instaBtn = createElement('a', 'agent-profile__social-btn');
      instaBtn.href = agent.socialLinks.instagram;
      instaBtn.target = '_blank';
      instaBtn.rel = 'noopener noreferrer';
      instaBtn.textContent = 'Instagram';
      socialButtons.appendChild(instaBtn);
    }

    if (agent.socialLinks.facebook) {
      const fbBtn = createElement('a', 'agent-profile__social-btn');
      fbBtn.href = agent.socialLinks.facebook;
      fbBtn.target = '_blank';
      fbBtn.rel = 'noopener noreferrer';
      fbBtn.textContent = 'Facebook';
      socialButtons.appendChild(fbBtn);
    }

    socialLinks.appendChild(socialButtons);
    contactCard.appendChild(socialLinks);
  }

  sidebar.appendChild(contactCard);

  // Inquiry Form Card
  const inquiryCard = createElement('div', 'agent-profile__inquiry-card');
  const inquiryTitle = createElement('h3', 'agent-profile__card-title', `Message ${agent.name}`);
  inquiryCard.appendChild(inquiryTitle);

  const form = createElement('form', 'agent-profile__inquiry-form');
  form.setAttribute('action', '/contact');
  form.setAttribute('method', 'GET');

  const nameGroup = createElement('div', 'agent-profile__form-group');
  const nameLabel = createElement('label', 'agent-profile__form-label', 'Your Name');
  nameLabel.setAttribute('for', 'inquiry-name');
  const nameInput = createElement('input', 'agent-profile__form-input');
  nameInput.type = 'text';
  nameInput.id = 'inquiry-name';
  nameInput.name = 'name';
  nameInput.placeholder = 'Enter your full name';
  nameInput.required = true;
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  form.appendChild(nameGroup);

  const phoneGroup = createElement('div', 'agent-profile__form-group');
  const phoneLabel = createElement('label', 'agent-profile__form-label', 'Phone Number');
  phoneLabel.setAttribute('for', 'inquiry-phone');
  const phoneInput = createElement('input', 'agent-profile__form-input');
  phoneInput.type = 'tel';
  phoneInput.id = 'inquiry-phone';
  phoneInput.name = 'phone';
  phoneInput.placeholder = '+964 XXX XXX XXXX';
  phoneInput.required = true;
  phoneGroup.appendChild(phoneLabel);
  phoneGroup.appendChild(phoneInput);
  form.appendChild(phoneGroup);

  const emailGroup = createElement('div', 'agent-profile__form-group');
  const emailLabel = createElement('label', 'agent-profile__form-label', 'Email');
  emailLabel.setAttribute('for', 'inquiry-email');
  const emailInput = createElement('input', 'agent-profile__form-input');
  emailInput.type = 'email';
  emailInput.id = 'inquiry-email';
  emailInput.name = 'email';
  emailInput.placeholder = 'your@email.com';
  emailInput.required = true;
  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);
  form.appendChild(emailGroup);

  const messageGroup = createElement('div', 'agent-profile__form-group');
  const messageLabel = createElement('label', 'agent-profile__form-label', 'Message');
  messageLabel.setAttribute('for', 'inquiry-message');
  const messageTextarea = createElement('textarea', 'agent-profile__form-textarea');
  messageTextarea.id = 'inquiry-message';
  messageTextarea.name = 'message';
  messageTextarea.rows = 4;
  messageTextarea.placeholder = `Hi ${agent.name}, I'm interested in...`;
  messageGroup.appendChild(messageLabel);
  messageGroup.appendChild(messageTextarea);
  form.appendChild(messageGroup);

  const hiddenAgent = createElement('input');
  hiddenAgent.type = 'hidden';
  hiddenAgent.name = 'agent';
  hiddenAgent.value = agent.name;
  form.appendChild(hiddenAgent);

  const submitBtn = createElement('button', 'btn btn--primary btn--full', 'Send Message');
  submitBtn.type = 'submit';
  form.appendChild(submitBtn);

  inquiryCard.appendChild(form);
  sidebar.appendChild(inquiryCard);

  // Quick Stats Card
  const statsCard = createElement('div', 'agent-profile__stats-card');
  const statsTitle = createElement('h3', 'agent-profile__card-title', 'Performance Stats');
  statsCard.appendChild(statsTitle);

  const statsList = createElement('div', 'agent-profile__stats-list');

  const statsItems = [
    { label: 'Years of Experience', value: `${agent.yearsExperience}+` },
    { label: 'Years with Real House', value: `${agent.yearsWithCompany}+` },
    { label: 'Properties Sold', value: agent.propertiesSold.toString() },
    { label: 'Total Sales Volume', value: formatSalesVolume(agent.totalSalesVolume) },
    { label: 'Active Listings', value: agent.activeListings.toString() },
    { label: 'Languages Spoken', value: agent.languages.length.toString() }
  ];

  statsItems.forEach(item => {
    const statRow = createElement('div', 'agent-profile__stat-row');
    const statLabel = createElement('span', 'agent-profile__stat-label', item.label);
    const statValue = createElement('span', 'agent-profile__stat-value', item.value);
    statRow.appendChild(statLabel);
    statRow.appendChild(statValue);
    statsList.appendChild(statRow);
  });

  statsCard.appendChild(statsList);
  sidebar.appendChild(statsCard);

  grid.appendChild(sidebar);
  mainContainer.appendChild(grid);
  mainContent.appendChild(mainContainer);
  page.appendChild(mainContent);

  // Back to Agents Link
  const backSection = createElement('section', 'agent-profile__back');
  const backContainer = createElement('div', 'container');
  const backLink = createElement('a', 'agent-profile__back-link');
  backLink.href = '/agents';
  backLink.setAttribute('data-route', '');
  backLink.appendChild(createSVGUse('icon-arrow-left'));
  backLink.appendChild(document.createTextNode('Back to All Agents'));
  backContainer.appendChild(backLink);
  backSection.appendChild(backContainer);
  page.appendChild(backSection);

  fragment.appendChild(page);

  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// SEO Setup
// ═══════════════════════════════════════════════════════════════════════════

export function setupAgentProfilePageSEO(agent: Agent): void {
  // Dynamic title
  document.title = `${agent.name} - ${agent.role} | Real House Erbil`;

  // Dynamic description
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', `${agent.name} is a ${agent.role} at Real House with ${agent.yearsExperience}+ years experience. Specializing in ${agent.specialization}. ${agent.propertiesSold} properties sold. Contact today!`);
  }

  // Inject Person schema
  const schema = generateAgentSchema(agent);

  let script = document.querySelector('script[data-schema="agent-profile"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', 'agent-profile');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);

  // Update canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://realhouseiq.com/agents/${agent.slug}`);
  }

  // Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${agent.name} - ${agent.role} | Real House`);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', agent.bio);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', agent.image);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `https://realhouseiq.com/agents/${agent.slug}`);
}

export { getAgentDetailBreadcrumbs };
