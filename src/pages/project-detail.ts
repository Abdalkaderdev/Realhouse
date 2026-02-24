// ═══════════════════════════════════════════════════════════════════════════
// Comprehensive Project Detail Page for Real House
// Features: Hero, Overview, Amenities, Gallery, Floor Plans, Location,
// Payment Plans, Similar Projects, Contact/Inquiry
// ═══════════════════════════════════════════════════════════════════════════

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, getProjectById, formatPriceRange, getProjectProgress, getProjectMilestones, getProgressColorClass, type Project, type ConstructionMilestone } from '../data/projects';
import { createProjectShareButtons } from '../components/share-buttons';
import {
  generateProjectAltText,
  generateProjectTitle,
  createSEOImage,
  generateSrcSet,
  generateSizes,
  updateImageMetaTags,
  IMAGE_DIMENSIONS
} from '../utils/image-seo';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  getProjectDetailBreadcrumbs,
  getRelatedProjects,
  createInternalCTA
} from '../components/internal-linking';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

interface FloorPlan {
  name: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  priceFrom: number;
}

interface PaymentPlan {
  name: string;
  downPayment: number;
  monthlyPayment?: number;
  duration: string;
  description: string;
}

interface AmenityCategory {
  name: string;
  icon: string;
  items: string[];
}

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

function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

// Create a safe close button with X character
function createCloseButton(className: string): HTMLButtonElement {
  const btn = createElement('button', className);
  btn.textContent = '\u00D7'; // Unicode multiplication sign (×) - safe alternative to &times;
  return btn;
}

// Create a question mark icon SVG safely
function createQuestionMarkIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'project-detail-page__not-found-svg');

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', '50');
  text.setAttribute('y', '60');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('font-size', '60');
  text.setAttribute('fill', 'var(--c-gold)');
  text.textContent = '?';

  svg.appendChild(text);
  return svg;
}

// ─── Amenity Icon Mapping ────────────────────────────────────────────────────

function getAmenityIcon(amenity: string): string {
  const lowerAmenity = amenity.toLowerCase();

  if (lowerAmenity.includes('pool') || lowerAmenity.includes('swimming')) return 'icon-check';
  if (lowerAmenity.includes('gym') || lowerAmenity.includes('fitness')) return 'icon-check';
  if (lowerAmenity.includes('spa') || lowerAmenity.includes('wellness') || lowerAmenity.includes('sauna')) return 'icon-check';
  if (lowerAmenity.includes('security')) return 'icon-check';
  if (lowerAmenity.includes('parking') || lowerAmenity.includes('garage')) return 'icon-check';
  if (lowerAmenity.includes('garden') || lowerAmenity.includes('landscap')) return 'icon-check';
  if (lowerAmenity.includes('school') || lowerAmenity.includes('education') || lowerAmenity.includes('nursery')) return 'icon-check';
  if (lowerAmenity.includes('medical') || lowerAmenity.includes('clinic') || lowerAmenity.includes('healthcare') || lowerAmenity.includes('hospital')) return 'icon-check';
  if (lowerAmenity.includes('shop') || lowerAmenity.includes('retail') || lowerAmenity.includes('mall')) return 'icon-check';
  if (lowerAmenity.includes('restaurant') || lowerAmenity.includes('dining') || lowerAmenity.includes('cafe')) return 'icon-check';
  if (lowerAmenity.includes('business') || lowerAmenity.includes('office')) return 'icon-check';
  if (lowerAmenity.includes('concierge')) return 'icon-check';
  if (lowerAmenity.includes('elevator') || lowerAmenity.includes('lift')) return 'icon-check';
  if (lowerAmenity.includes('smart') || lowerAmenity.includes('technology')) return 'icon-check';
  if (lowerAmenity.includes('rooftop')) return 'icon-check';
  if (lowerAmenity.includes('view')) return 'icon-check';
  if (lowerAmenity.includes('play') || lowerAmenity.includes('children') || lowerAmenity.includes('kid')) return 'icon-check';
  if (lowerAmenity.includes('sport') || lowerAmenity.includes('court') || lowerAmenity.includes('basketball') || lowerAmenity.includes('tennis') || lowerAmenity.includes('football')) return 'icon-check';
  if (lowerAmenity.includes('community') || lowerAmenity.includes('club')) return 'icon-check';
  if (lowerAmenity.includes('mosque')) return 'icon-check';
  if (lowerAmenity.includes('church')) return 'icon-check';
  if (lowerAmenity.includes('cinema') || lowerAmenity.includes('theater')) return 'icon-check';
  if (lowerAmenity.includes('lounge')) return 'icon-check';
  if (lowerAmenity.includes('hotel')) return 'icon-check';
  if (lowerAmenity.includes('luxury') || lowerAmenity.includes('premium')) return 'icon-check';
  if (lowerAmenity.includes('tower')) return 'icon-check';
  if (lowerAmenity.includes('park') || lowerAmenity.includes('green')) return 'icon-check';

  return 'icon-check';
}

function categorizeAmenities(amenities: string[]): AmenityCategory[] {
  const categories: Record<string, string[]> = {
    'Recreation & Wellness': [],
    'Security & Services': [],
    'Shopping & Dining': [],
    'Education & Healthcare': [],
    'Outdoor & Lifestyle': [],
    'Technology & Utilities': [],
    'Premium Features': []
  };

  amenities.forEach(amenity => {
    const lower = amenity.toLowerCase();

    if (lower.includes('pool') || lower.includes('gym') || lower.includes('fitness') ||
        lower.includes('spa') || lower.includes('sport') || lower.includes('tennis') ||
        lower.includes('basketball') || lower.includes('football') || lower.includes('golf') ||
        lower.includes('jogging') || lower.includes('play') || lower.includes('cinema') ||
        lower.includes('lounge') || lower.includes('wellness') || lower.includes('sauna')) {
      categories['Recreation & Wellness'].push(amenity);
    } else if (lower.includes('security') || lower.includes('concierge') || lower.includes('valet') ||
               lower.includes('butler') || lower.includes('housekeeping') || lower.includes('maintenance') ||
               lower.includes('service') || lower.includes('gate') || lower.includes('24/7') ||
               lower.includes('parking') || lower.includes('garage')) {
      categories['Security & Services'].push(amenity);
    } else if (lower.includes('shop') || lower.includes('retail') || lower.includes('mall') ||
               lower.includes('restaurant') || lower.includes('dining') || lower.includes('cafe') ||
               lower.includes('bar') || lower.includes('supermarket') || lower.includes('market')) {
      categories['Shopping & Dining'].push(amenity);
    } else if (lower.includes('school') || lower.includes('education') || lower.includes('nursery') ||
               lower.includes('medical') || lower.includes('clinic') || lower.includes('healthcare') ||
               lower.includes('hospital') || lower.includes('kindergarten')) {
      categories['Education & Healthcare'].push(amenity);
    } else if (lower.includes('garden') || lower.includes('park') || lower.includes('green') ||
               lower.includes('landscap') || lower.includes('outdoor') || lower.includes('terrace') ||
               lower.includes('rooftop') || lower.includes('view') || lower.includes('beach') ||
               lower.includes('lagoon') || lower.includes('marina') || lower.includes('mountain') ||
               lower.includes('bbq') || lower.includes('walkway') || lower.includes('boulevard')) {
      categories['Outdoor & Lifestyle'].push(amenity);
    } else if (lower.includes('smart') || lower.includes('technology') || lower.includes('internet') ||
               lower.includes('wifi') || lower.includes('electric') || lower.includes('power') ||
               lower.includes('water') || lower.includes('elevator') || lower.includes('ac') ||
               lower.includes('air condition')) {
      categories['Technology & Utilities'].push(amenity);
    } else {
      categories['Premium Features'].push(amenity);
    }
  });

  const result: AmenityCategory[] = [];
  const iconMap: Record<string, string> = {
    'Recreation & Wellness': 'icon-check',
    'Security & Services': 'icon-check',
    'Shopping & Dining': 'icon-check',
    'Education & Healthcare': 'icon-check',
    'Outdoor & Lifestyle': 'icon-check',
    'Technology & Utilities': 'icon-check',
    'Premium Features': 'icon-check'
  };

  Object.entries(categories).forEach(([name, items]) => {
    if (items.length > 0) {
      result.push({
        name,
        icon: iconMap[name] || 'icon-check',
        items
      });
    }
  });

  return result;
}

// ─── Construction Progress Section ────────────────────────────────────────────

function createConstructionProgressSection(project: Project): HTMLElement {
  const progress = getProjectProgress(project);
  const milestones = getProjectMilestones(project);
  const colorClass = getProgressColorClass(progress);

  const section = createElement('div', 'project-overview__progress');

  // Header with title
  const header = createElement('div', 'project-overview__progress-header');
  const title = createElement('h4', 'project-overview__progress-title', 'Construction Progress');
  header.appendChild(title);
  section.appendChild(header);

  // Progress indicator with circular ring
  const progressWrapper = createElement('div', 'project-overview__progress-wrapper');

  // Circular progress ring
  const circleContainer = createElement('div', `project-overview__progress-circle project-overview__progress-circle--${colorClass}`);

  // SVG circular progress
  const svgSize = 120;
  const strokeWidth = 8;
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'project-overview__progress-svg');
  svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);

  // Background circle
  const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  bgCircle.setAttribute('class', 'project-overview__progress-bg');
  bgCircle.setAttribute('cx', (svgSize / 2).toString());
  bgCircle.setAttribute('cy', (svgSize / 2).toString());
  bgCircle.setAttribute('r', radius.toString());
  bgCircle.setAttribute('fill', 'none');
  bgCircle.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
  bgCircle.setAttribute('stroke-width', strokeWidth.toString());
  svg.appendChild(bgCircle);

  // Progress circle
  const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  progressCircle.setAttribute('class', 'project-overview__progress-ring');
  progressCircle.setAttribute('cx', (svgSize / 2).toString());
  progressCircle.setAttribute('cy', (svgSize / 2).toString());
  progressCircle.setAttribute('r', radius.toString());
  progressCircle.setAttribute('fill', 'none');
  progressCircle.setAttribute('stroke-width', strokeWidth.toString());
  progressCircle.setAttribute('stroke-linecap', 'round');
  progressCircle.setAttribute('stroke-dasharray', circumference.toString());
  progressCircle.setAttribute('stroke-dashoffset', strokeDashoffset.toString());
  progressCircle.setAttribute('transform', `rotate(-90 ${svgSize / 2} ${svgSize / 2})`);
  svg.appendChild(progressCircle);

  circleContainer.appendChild(svg);

  // Percentage text in center
  const percentageText = createElement('div', 'project-overview__progress-percentage');
  const percentageValue = createElement('span', 'project-overview__progress-value', progress.toString());
  const percentageSymbol = createElement('span', 'project-overview__progress-symbol', '%');
  percentageText.appendChild(percentageValue);
  percentageText.appendChild(percentageSymbol);
  circleContainer.appendChild(percentageText);

  progressWrapper.appendChild(circleContainer);

  // Status text
  const statusText = createElement('div', 'project-overview__progress-status');
  let statusLabel = 'In Progress';
  if (progress >= 100) statusLabel = 'Completed';
  else if (progress >= 75) statusLabel = 'Near Completion';
  else if (progress >= 50) statusLabel = 'Halfway There';
  else if (progress >= 25) statusLabel = 'Progressing';
  else if (progress > 0) statusLabel = 'Early Stage';
  else statusLabel = 'Coming Soon';

  statusText.textContent = statusLabel;
  progressWrapper.appendChild(statusText);

  section.appendChild(progressWrapper);

  // Milestones timeline (only show if there are milestones)
  if (milestones.length > 0) {
    const milestonesWrapper = createElement('div', 'project-overview__milestones');
    const milestonesTitle = createElement('h5', 'project-overview__milestones-title', 'Key Milestones');
    milestonesWrapper.appendChild(milestonesTitle);

    const timeline = createElement('ul', 'project-overview__milestones-list');

    milestones.slice(0, 4).forEach(milestone => {
      const item = createElement('li', `project-overview__milestone ${milestone.completed ? 'project-overview__milestone--completed' : ''}`);

      const marker = createElement('span', 'project-overview__milestone-marker');
      if (milestone.completed) {
        marker.appendChild(createSVGUse('icon-check'));
      }
      item.appendChild(marker);

      const content = createElement('div', 'project-overview__milestone-content');
      const date = createElement('span', 'project-overview__milestone-date', milestone.date);
      const titleEl = createElement('span', 'project-overview__milestone-name', milestone.title);
      content.appendChild(date);
      content.appendChild(titleEl);
      item.appendChild(content);

      timeline.appendChild(item);
    });

    milestonesWrapper.appendChild(timeline);
    section.appendChild(milestonesWrapper);
  }

  return section;
}

// ─── Generate Floor Plans from Project Data ──────────────────────────────────

function generateFloorPlans(project: Project): FloorPlan[] {
  const plans: FloorPlan[] = [];
  const basePrice = project.priceRange.min;
  const maxPrice = project.priceRange.max;

  if (maxPrice - basePrice < 100000) {
    plans.push({
      name: 'Standard Unit',
      bedrooms: 2,
      bathrooms: 2,
      size: '120-150 m²',
      priceFrom: basePrice
    });
  } else {
    const priceDiff = maxPrice - basePrice;

    if (basePrice < 150000) {
      plans.push({
        name: 'Studio Apartment',
        bedrooms: 0,
        bathrooms: 1,
        size: '45-65 m²',
        priceFrom: basePrice
      });
    }

    plans.push({
      name: '1 Bedroom Apartment',
      bedrooms: 1,
      bathrooms: 1,
      size: '65-85 m²',
      priceFrom: basePrice + priceDiff * 0.1
    });

    plans.push({
      name: '2 Bedroom Apartment',
      bedrooms: 2,
      bathrooms: 2,
      size: '100-140 m²',
      priceFrom: basePrice + priceDiff * 0.25
    });

    plans.push({
      name: '3 Bedroom Apartment',
      bedrooms: 3,
      bathrooms: 2,
      size: '150-200 m²',
      priceFrom: basePrice + priceDiff * 0.5
    });

    if (maxPrice > 500000) {
      plans.push({
        name: 'Penthouse Suite',
        bedrooms: 4,
        bathrooms: 4,
        size: '250-400 m²',
        priceFrom: basePrice + priceDiff * 0.8
      });
    }

    if (maxPrice > 400000 && project.amenities.some(a =>
      a.toLowerCase().includes('duplex') || a.toLowerCase().includes('villa'))) {
      plans.push({
        name: 'Duplex Villa',
        bedrooms: 5,
        bathrooms: 5,
        size: '350-500 m²',
        priceFrom: maxPrice * 0.7
      });
    }
  }

  return plans.sort((a, b) => a.priceFrom - b.priceFrom);
}

// ─── Generate Payment Plans ─────────────────────────────────────────────────

function generatePaymentPlans(project: Project): PaymentPlan[] {
  const plans: PaymentPlan[] = [];

  if (project.status === 'Ready') {
    plans.push({
      name: 'Cash Payment',
      downPayment: 100,
      duration: 'Immediate',
      description: 'Full payment with immediate ownership transfer and potential discount'
    });

    plans.push({
      name: 'Bank Financing',
      downPayment: 20,
      duration: 'Up to 15 years',
      description: 'Partner bank financing available with competitive interest rates'
    });

    plans.push({
      name: 'Developer Installment',
      downPayment: 50,
      duration: '12 months',
      description: '50% down payment with remaining balance over 12 monthly installments'
    });
  } else if (project.status === 'Under Construction') {
    plans.push({
      name: 'Construction Payment Plan',
      downPayment: 30,
      duration: 'Until completion',
      description: '30% down payment, 40% during construction, 30% on handover'
    });

    plans.push({
      name: 'Extended Payment Plan',
      downPayment: 20,
      duration: '3-5 years',
      description: '20% down payment with quarterly installments until 2 years post-handover'
    });

    plans.push({
      name: 'Investor Package',
      downPayment: 40,
      duration: '24 months',
      description: 'Special pricing for investors with 40% down and accelerated payment'
    });
  } else {
    plans.push({
      name: 'Early Bird Reservation',
      downPayment: 10,
      duration: 'Flexible',
      description: 'Reserve your unit with 10% deposit. Full payment plan to be announced'
    });

    plans.push({
      name: 'VIP Pre-Launch',
      downPayment: 15,
      duration: 'Priority selection',
      description: '15% reservation fee with priority unit selection and best pricing'
    });
  }

  return plans;
}

// ─── SEO Schema Generation ───────────────────────────────────────────────────

function generateProjectSchema(project: Project): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `https://realhouseiq.com/projects/${project.id}`,
    'name': project.name,
    'description': project.description.slice(0, 500),
    'url': `https://realhouseiq.com/projects/${project.id}`,
    'image': project.images,
    'datePosted': new Date().toISOString(),
    'numberOfRooms': project.totalUnits,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': project.location.address,
      'addressLocality': project.location.city,
      'addressRegion': project.location.district,
      'addressCountry': project.location.country
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '36.1901',
      'longitude': '44.0091'
    },
    'offers': {
      '@type': 'AggregateOffer',
      'lowPrice': project.priceRange.min,
      'highPrice': project.priceRange.max,
      'priceCurrency': project.priceRange.currency,
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'RealEstateAgent',
        'name': 'Real House',
        'url': 'https://realhouseiq.com',
        'telephone': '+964-750-792-2138'
      }
    },
    'amenityFeature': project.amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      'name': amenity,
      'value': true
    })),
    'yearBuilt': project.completionDate,
    'provider': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': 'https://realhouseiq.com',
      'logo': 'https://realhouseiq.com/logo.png',
      'telephone': '+964-750-792-2138',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Dream City',
        'addressLocality': 'Erbil',
        'addressRegion': 'Kurdistan Region',
        'addressCountry': 'IQ'
      }
    }
  };

  return JSON.stringify(schema);
}

function injectProjectSchema(project: Project): void {
  const existing = document.querySelector('script[data-schema="project-detail"]');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'project-detail');
  script.textContent = generateProjectSchema(project);
  document.head.appendChild(script);
}

// ─── Lightbox Component ──────────────────────────────────────────────────────

function createLightbox(images: string[], startIndex: number = 0): HTMLElement {
  const lightbox = createElement('div', 'project-lightbox');
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image gallery lightbox');

  let currentIndex = startIndex;

  const overlay = createElement('div', 'project-lightbox__overlay');
  overlay.addEventListener('click', () => closeLightbox());
  lightbox.appendChild(overlay);

  const content = createElement('div', 'project-lightbox__content');

  const closeBtn = createCloseButton('project-lightbox__close');
  closeBtn.setAttribute('aria-label', 'Close gallery');
  closeBtn.addEventListener('click', () => closeLightbox());
  content.appendChild(closeBtn);

  const imageContainer = createElement('div', 'project-lightbox__image-container');
  const img = createElement('img', 'project-lightbox__image');
  img.src = images[currentIndex];
  img.alt = `Gallery image ${currentIndex + 1} of ${images.length}`;
  imageContainer.appendChild(img);
  content.appendChild(imageContainer);

  const prevBtn = createElement('button', 'project-lightbox__nav project-lightbox__nav--prev');
  prevBtn.setAttribute('aria-label', 'Previous image');
  prevBtn.appendChild(createSVGUse('icon-arrow-left'));
  prevBtn.addEventListener('click', () => navigate(-1));
  content.appendChild(prevBtn);

  const nextBtn = createElement('button', 'project-lightbox__nav project-lightbox__nav--next');
  nextBtn.setAttribute('aria-label', 'Next image');
  nextBtn.appendChild(createSVGUse('icon-arrow-right'));
  nextBtn.addEventListener('click', () => navigate(1));
  content.appendChild(nextBtn);

  const counter = createElement('div', 'project-lightbox__counter');
  counter.textContent = `${currentIndex + 1} / ${images.length}`;
  content.appendChild(counter);

  const thumbnails = createElement('div', 'project-lightbox__thumbnails');
  images.forEach((imgSrc, index) => {
    const thumb = createElement('button', `project-lightbox__thumb${index === currentIndex ? ' active' : ''}`);
    thumb.setAttribute('aria-label', `View image ${index + 1}`);
    const thumbImg = createElement('img');
    thumbImg.src = imgSrc;
    thumbImg.alt = '';
    thumb.appendChild(thumbImg);
    thumb.addEventListener('click', () => goToImage(index));
    thumbnails.appendChild(thumb);
  });
  content.appendChild(thumbnails);

  lightbox.appendChild(content);

  function navigate(direction: number) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateImage();
  }

  function goToImage(index: number) {
    currentIndex = index;
    updateImage();
  }

  function updateImage() {
    img.src = images[currentIndex];
    img.alt = `Gallery image ${currentIndex + 1} of ${images.length}`;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;

    thumbnails.querySelectorAll('.project-lightbox__thumb').forEach((thumb, index) => {
      thumb.classList.toggle('active', index === currentIndex);
    });

    gsap.fromTo(img,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
    );
  }

  function closeLightbox() {
    gsap.to(lightbox, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => lightbox.remove()
    });
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  }
  document.addEventListener('keydown', handleKeydown);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node === lightbox) {
          document.removeEventListener('keydown', handleKeydown);
          observer.disconnect();
        }
      });
    });
  });
  observer.observe(document.body, { childList: true });

  gsap.fromTo(lightbox,
    { opacity: 0 },
    { opacity: 1, duration: 0.3 }
  );

  return lightbox;
}

// ─── Similar Projects Card ───────────────────────────────────────────────────

function createSimilarProjectCard(project: Project): HTMLElement {
  const card = createElement('a', 'similar-project-card');
  card.href = `/projects/${project.id}`;
  card.setAttribute('data-route', '');

  const imageWrapper = createElement('div', 'similar-project-card__image-wrapper');
  const img = createElement('img', 'similar-project-card__image');
  img.src = project.images[0];
  img.alt = `${project.name} - ${project.status}`;
  img.loading = 'lazy';
  imageWrapper.appendChild(img);

  const statusClass = project.status === 'Ready' ? 'similar-project-card__badge--ready' :
                      project.status === 'Coming Soon' ? 'similar-project-card__badge--coming' :
                      'similar-project-card__badge--construction';
  const badge = createElement('span', `similar-project-card__badge ${statusClass}`, project.status);
  imageWrapper.appendChild(badge);

  card.appendChild(imageWrapper);

  const content = createElement('div', 'similar-project-card__content');

  const title = createElement('h3', 'similar-project-card__title', project.name);
  content.appendChild(title);

  const location = createElement('p', 'similar-project-card__location');
  location.appendChild(createSVGUse('icon-location'));
  location.appendChild(document.createTextNode(`${project.location.district}, ${project.location.city}`));
  content.appendChild(location);

  const price = createElement('p', 'similar-project-card__price', `From ${formatCurrency(project.priceRange.min)}`);
  content.appendChild(price);

  const stats = createElement('div', 'similar-project-card__stats');
  stats.textContent = `${project.totalUnits} total units`;
  content.appendChild(stats);

  card.appendChild(content);

  return card;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN RENDER FUNCTION - Comprehensive Project Detail Page
// ═══════════════════════════════════════════════════════════════════════════

export function renderComprehensiveProjectDetailPage(projectId: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const project = getProjectById(projectId);

  if (!project) {
    const page = createElement('div', 'project-detail-page project-detail-page--not-found');
    const container = createElement('div', 'container');

    const content = createElement('div', 'project-detail-page__not-found');
    const icon = createElement('div', 'project-detail-page__not-found-icon');
    icon.appendChild(createQuestionMarkIcon());
    content.appendChild(icon);

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

  const page = createElement('div', 'project-detail-page project-detail-page--comprehensive');

  injectProjectSchema(project);
  updateImageMetaTags(project.images[0], generateProjectAltText(project, 0, 'detail'), 'project');

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1: HERO SECTION
  // ═══════════════════════════════════════════════════════════════════════════

  const heroSection = createElement('section', 'project-hero');

  const heroBg = createElement('div', 'project-hero__bg');
  const heroBgImg = createElement('img', 'project-hero__bg-image');
  heroBgImg.src = project.images[0];
  heroBgImg.alt = '';
  heroBgImg.setAttribute('aria-hidden', 'true');
  heroBg.appendChild(heroBgImg);
  heroSection.appendChild(heroBg);

  const heroOverlay = createElement('div', 'project-hero__overlay');
  heroSection.appendChild(heroOverlay);

  const heroContent = createElement('div', 'project-hero__content');
  const heroContainer = createElement('div', 'container');

  const breadcrumbItems = getProjectDetailBreadcrumbs(project);
  heroContainer.appendChild(createBreadcrumbs(breadcrumbItems));
  injectBreadcrumbSchema(breadcrumbItems);

  const heroInfo = createElement('div', 'project-hero__info');

  const statusBadge = createElement('span', 'project-hero__status');
  const statusClass = project.status === 'Ready' ? 'project-hero__status--ready' :
                      project.status === 'Coming Soon' ? 'project-hero__status--coming' :
                      'project-hero__status--construction';
  statusBadge.className = `project-hero__status ${statusClass}`;
  statusBadge.textContent = project.status;
  heroInfo.appendChild(statusBadge);

  const heroTitle = createElement('h1', 'project-hero__title', project.name);
  heroInfo.appendChild(heroTitle);

  const heroLocation = createElement('p', 'project-hero__location');
  heroLocation.appendChild(createSVGUse('icon-location'));
  heroLocation.appendChild(document.createTextNode(`${project.location.address}, ${project.location.district}, ${project.location.city}`));
  heroInfo.appendChild(heroLocation);

  const heroStats = createElement('div', 'project-hero__stats');

  const statsData = [
    { label: 'Total Units', value: project.totalUnits.toLocaleString(), icon: 'icon-building' },
    { label: 'Price From', value: formatCurrency(project.priceRange.min), icon: 'icon-price' },
    { label: 'Completion', value: project.completionDate, icon: 'icon-calendar' }
  ];

  statsData.forEach(stat => {
    const statItem = createElement('div', 'project-hero__stat');
    statItem.appendChild(createSVGUse(stat.icon));
    const statContent = createElement('div', 'project-hero__stat-content');
    const statValue = createElement('span', 'project-hero__stat-value', stat.value);
    const statLabel = createElement('span', 'project-hero__stat-label', stat.label);
    statContent.appendChild(statValue);
    statContent.appendChild(statLabel);
    statItem.appendChild(statContent);
    heroStats.appendChild(statItem);
  });

  heroInfo.appendChild(heroStats);

  const heroCta = createElement('div', 'project-hero__cta');

  const inquiryBtn = createElement('a', 'btn btn--primary btn--lg', 'Request Information');
  inquiryBtn.href = '/contact';
  inquiryBtn.setAttribute('data-route', '');
  heroCta.appendChild(inquiryBtn);

  const scheduleBtn = createElement('a', 'btn btn--ghost btn--lg', 'Schedule Site Visit');
  scheduleBtn.href = '/contact';
  scheduleBtn.setAttribute('data-route', '');
  heroCta.appendChild(scheduleBtn);

  heroInfo.appendChild(heroCta);
  heroContainer.appendChild(heroInfo);
  heroContent.appendChild(heroContainer);
  heroSection.appendChild(heroContent);

  const scrollIndicator = createElement('div', 'project-hero__scroll-indicator');
  const scrollText = createElement('span', undefined, 'Scroll to explore');
  scrollIndicator.appendChild(scrollText);
  scrollIndicator.appendChild(createSVGUse('icon-chevron-down'));
  heroSection.appendChild(scrollIndicator);

  page.appendChild(heroSection);

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: OVERVIEW
  // ═══════════════════════════════════════════════════════════════════════════

  const overviewSection = createElement('section', 'project-overview');
  const overviewContainer = createElement('div', 'container');

  const overviewGrid = createElement('div', 'project-overview__grid');

  const overviewMain = createElement('div', 'project-overview__main');
  const overviewTitle = createElement('h2', 'project-section-title', 'Project Overview');
  overviewMain.appendChild(overviewTitle);

  const descParagraphs = project.description.split('\n\n');
  descParagraphs.forEach(para => {
    if (para.trim()) {
      const p = createElement('p', 'project-overview__text', para.trim());
      overviewMain.appendChild(p);
    }
  });

  overviewGrid.appendChild(overviewMain);

  const overviewSidebar = createElement('div', 'project-overview__sidebar');
  const factsCard = createElement('div', 'project-overview__facts-card');
  const factsTitle = createElement('h3', 'project-overview__facts-title', 'Quick Facts');
  factsCard.appendChild(factsTitle);

  const factsList = createElement('ul', 'project-overview__facts-list');
  const facts = [
    { label: 'Project Name', value: project.name },
    { label: 'Location', value: `${project.location.district}, ${project.location.city}` },
    { label: 'Status', value: project.status },
    { label: 'Total Units', value: project.totalUnits.toLocaleString() },
    { label: 'Price Range', value: formatPriceRange(project) },
    { label: 'Completion', value: project.completionDate }
  ];

  facts.forEach(fact => {
    const li = createElement('li', 'project-overview__fact');
    const label = createElement('span', 'project-overview__fact-label', fact.label);
    const value = createElement('span', 'project-overview__fact-value', fact.value);
    li.appendChild(label);
    li.appendChild(value);
    factsList.appendChild(li);
  });

  factsCard.appendChild(factsList);
  overviewSidebar.appendChild(factsCard);

  // Add construction progress section for non-ready projects
  if (project.status !== 'Ready') {
    const progressSection = createConstructionProgressSection(project);
    overviewSidebar.appendChild(progressSection);
  }

  const shareSection = createElement('div', 'project-overview__share');
  const shareTitle = createElement('h4', 'project-overview__share-title', 'Share This Project');
  shareSection.appendChild(shareTitle);
  shareSection.appendChild(createProjectShareButtons(project));
  overviewSidebar.appendChild(shareSection);

  overviewGrid.appendChild(overviewSidebar);
  overviewContainer.appendChild(overviewGrid);
  overviewSection.appendChild(overviewContainer);
  page.appendChild(overviewSection);

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: AMENITIES
  // ═══════════════════════════════════════════════════════════════════════════

  const amenitiesSection = createElement('section', 'project-amenities');
  const amenitiesContainer = createElement('div', 'container');

  const amenitiesHeader = createElement('div', 'project-amenities__header');
  const amenitiesTitle = createElement('h2', 'project-section-title', 'Amenities & Features');
  const amenitiesSubtitle = createElement('p', 'project-section-subtitle',
    `${project.name} offers world-class amenities designed for modern living`);
  amenitiesHeader.appendChild(amenitiesTitle);
  amenitiesHeader.appendChild(amenitiesSubtitle);
  amenitiesContainer.appendChild(amenitiesHeader);

  const categories = categorizeAmenities(project.amenities);
  const amenitiesGrid = createElement('div', 'project-amenities__categories');

  categories.forEach(category => {
    const categoryCard = createElement('div', 'project-amenities__category');

    const categoryHeader = createElement('div', 'project-amenities__category-header');
    categoryHeader.appendChild(createSVGUse(category.icon));
    const categoryName = createElement('h3', 'project-amenities__category-name', category.name);
    categoryHeader.appendChild(categoryName);
    categoryCard.appendChild(categoryHeader);

    const itemsList = createElement('ul', 'project-amenities__items');
    category.items.forEach(item => {
      const li = createElement('li', 'project-amenities__item');
      li.appendChild(createSVGUse(getAmenityIcon(item)));
      li.appendChild(document.createTextNode(item));
      itemsList.appendChild(li);
    });
    categoryCard.appendChild(itemsList);

    amenitiesGrid.appendChild(categoryCard);
  });

  amenitiesContainer.appendChild(amenitiesGrid);
  amenitiesSection.appendChild(amenitiesContainer);
  page.appendChild(amenitiesSection);

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4: GALLERY
  // ═══════════════════════════════════════════════════════════════════════════

  const gallerySection = createElement('section', 'project-gallery-section');
  const galleryContainer = createElement('div', 'container');

  const galleryHeader = createElement('div', 'project-gallery-section__header');
  const galleryTitle = createElement('h2', 'project-section-title', 'Project Gallery');
  const galleryCount = createElement('span', 'project-gallery-section__count', `${project.images.length} Images`);
  galleryHeader.appendChild(galleryTitle);
  galleryHeader.appendChild(galleryCount);
  galleryContainer.appendChild(galleryHeader);

  const galleryGrid = createElement('div', 'project-gallery-section__grid');

  project.images.forEach((imgSrc, index) => {
    const galleryItem = createElement('div', `project-gallery-section__item ${index === 0 ? 'project-gallery-section__item--large' : ''}`);
    const img = createElement('img', 'project-gallery-section__image');
    img.src = imgSrc;
    img.alt = generateProjectAltText(project, index, 'gallery');
    img.loading = index < 2 ? 'eager' : 'lazy';
    galleryItem.appendChild(img);

    const overlay = createElement('div', 'project-gallery-section__item-overlay');
    const expandIcon = createSVGUse('icon-expand');
    overlay.appendChild(expandIcon);
    galleryItem.appendChild(overlay);

    galleryItem.addEventListener('click', () => {
      const lightbox = createLightbox(project.images, index);
      document.body.appendChild(lightbox);
    });

    galleryGrid.appendChild(galleryItem);
  });

  galleryContainer.appendChild(galleryGrid);
  gallerySection.appendChild(galleryContainer);
  page.appendChild(gallerySection);

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5: FLOOR PLANS
  // ═══════════════════════════════════════════════════════════════════════════

  const floorPlansSection = createElement('section', 'project-floor-plans');
  const floorPlansContainer = createElement('div', 'container');

  const floorPlansHeader = createElement('div', 'project-floor-plans__header');
  const floorPlansTitle = createElement('h2', 'project-section-title', 'Available Unit Types');
  const floorPlansSubtitle = createElement('p', 'project-section-subtitle',
    'Choose from a variety of layouts designed for different lifestyles');
  floorPlansHeader.appendChild(floorPlansTitle);
  floorPlansHeader.appendChild(floorPlansSubtitle);
  floorPlansContainer.appendChild(floorPlansHeader);

  const floorPlans = generateFloorPlans(project);
  const floorPlansGrid = createElement('div', 'project-floor-plans__grid');

  floorPlans.forEach(plan => {
    const planCard = createElement('div', 'project-floor-plans__card');

    const planHeader = createElement('div', 'project-floor-plans__card-header');
    const planIcon = createElement('div', 'project-floor-plans__icon');
    planIcon.appendChild(createSVGUse('icon-floor-plan'));
    planHeader.appendChild(planIcon);
    const planName = createElement('h3', 'project-floor-plans__name', plan.name);
    planHeader.appendChild(planName);
    planCard.appendChild(planHeader);

    const planSpecs = createElement('div', 'project-floor-plans__specs');

    const bedsSpec = createElement('div', 'project-floor-plans__spec');
    bedsSpec.appendChild(createSVGUse('icon-bed'));
    bedsSpec.appendChild(document.createTextNode(plan.bedrooms === 0 ? 'Studio' : `${plan.bedrooms} Beds`));
    planSpecs.appendChild(bedsSpec);

    const bathsSpec = createElement('div', 'project-floor-plans__spec');
    bathsSpec.appendChild(createSVGUse('icon-bath'));
    bathsSpec.appendChild(document.createTextNode(`${plan.bathrooms} Baths`));
    planSpecs.appendChild(bathsSpec);

    const sizeSpec = createElement('div', 'project-floor-plans__spec');
    sizeSpec.appendChild(createSVGUse('icon-area'));
    sizeSpec.appendChild(document.createTextNode(plan.size));
    planSpecs.appendChild(sizeSpec);

    planCard.appendChild(planSpecs);

    const planPricing = createElement('div', 'project-floor-plans__pricing');
    const priceLabel = createElement('span', 'project-floor-plans__price-label', 'Starting from');
    const priceValue = createElement('span', 'project-floor-plans__price-value', formatCurrency(plan.priceFrom));
    planPricing.appendChild(priceLabel);
    planPricing.appendChild(priceValue);
    planCard.appendChild(planPricing);

    const planCta = createElement('a', 'btn btn--ghost btn--sm btn--full', 'Request Floor Plan');
    planCta.href = '/contact';
    planCta.setAttribute('data-route', '');
    planCard.appendChild(planCta);

    floorPlansGrid.appendChild(planCard);
  });

  floorPlansContainer.appendChild(floorPlansGrid);
  floorPlansSection.appendChild(floorPlansContainer);
  page.appendChild(floorPlansSection);

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 6: LOCATION
  // ═══════════════════════════════════════════════════════════════════════════

  const locationSection = createElement('section', 'project-location');
  const locationContainer = createElement('div', 'container');

  const locationGrid = createElement('div', 'project-location__grid');

  const locationInfo = createElement('div', 'project-location__info');
  const locationTitle = createElement('h2', 'project-section-title', 'Prime Location');
  locationInfo.appendChild(locationTitle);

  const locationAddress = createElement('div', 'project-location__address');
  const addressIcon = createSVGUse('icon-location');
  locationAddress.appendChild(addressIcon);
  const addressText = createElement('div', 'project-location__address-text');
  const addressLine1 = createElement('p', 'project-location__address-line1', project.location.address);
  const addressLine2 = createElement('p', 'project-location__address-line2',
    `${project.location.district}, ${project.location.city}`);
  const addressLine3 = createElement('p', 'project-location__address-line3', project.location.country);
  addressText.appendChild(addressLine1);
  addressText.appendChild(addressLine2);
  addressText.appendChild(addressLine3);
  locationAddress.appendChild(addressText);
  locationInfo.appendChild(locationAddress);

  const nearbyTitle = createElement('h3', 'project-location__nearby-title', 'What\'s Nearby');
  locationInfo.appendChild(nearbyTitle);

  const nearbyList = createElement('ul', 'project-location__nearby-list');
  const nearbyPlaces = [
    { name: 'Erbil International Airport', distance: '10-15 min' },
    { name: 'City Center', distance: '5-10 min' },
    { name: 'Shopping Centers', distance: '5 min' },
    { name: 'International Schools', distance: '5-10 min' },
    { name: 'Hospitals & Clinics', distance: '10 min' }
  ];

  nearbyPlaces.forEach(place => {
    const li = createElement('li', 'project-location__nearby-item');
    const placeName = createElement('span', 'project-location__nearby-name', place.name);
    const placeDistance = createElement('span', 'project-location__nearby-distance', place.distance);
    li.appendChild(placeName);
    li.appendChild(placeDistance);
    nearbyList.appendChild(li);
  });
  locationInfo.appendChild(nearbyList);

  locationGrid.appendChild(locationInfo);

  const locationMap = createElement('div', 'project-location__map');
  const mapPlaceholder = createElement('div', 'project-location__map-placeholder');
  const mapIcon = createSVGUse('icon-map');
  mapPlaceholder.appendChild(mapIcon);
  const mapText = createElement('p', 'project-location__map-text',
    `${project.name} is located in ${project.location.district}, ${project.location.city}`);
  mapPlaceholder.appendChild(mapText);
  const mapBtn = createElement('a', 'btn btn--ghost', 'View on Google Maps');
  mapBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${project.name} ${project.location.city} ${project.location.country}`)}`;
  mapBtn.target = '_blank';
  mapBtn.rel = 'noopener noreferrer';
  mapPlaceholder.appendChild(mapBtn);
  locationMap.appendChild(mapPlaceholder);

  locationGrid.appendChild(locationMap);

  locationContainer.appendChild(locationGrid);
  locationSection.appendChild(locationContainer);
  page.appendChild(locationSection);

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 7: PAYMENT PLANS
  // ═══════════════════════════════════════════════════════════════════════════

  const paymentSection = createElement('section', 'project-payment');
  const paymentContainer = createElement('div', 'container');

  const paymentHeader = createElement('div', 'project-payment__header');
  const paymentTitle = createElement('h2', 'project-section-title', 'Flexible Payment Plans');
  const paymentSubtitle = createElement('p', 'project-section-subtitle',
    'We offer various payment options to suit your investment strategy');
  paymentHeader.appendChild(paymentTitle);
  paymentHeader.appendChild(paymentSubtitle);
  paymentContainer.appendChild(paymentHeader);

  const paymentPlans = generatePaymentPlans(project);
  const paymentGrid = createElement('div', 'project-payment__grid');

  paymentPlans.forEach((plan, index) => {
    const planCard = createElement('div', `project-payment__card ${index === 0 ? 'project-payment__card--featured' : ''}`);

    if (index === 0) {
      const featuredBadge = createElement('span', 'project-payment__featured-badge', 'Most Popular');
      planCard.appendChild(featuredBadge);
    }

    const planName = createElement('h3', 'project-payment__plan-name', plan.name);
    planCard.appendChild(planName);

    const planDetails = createElement('div', 'project-payment__details');

    const downPaymentRow = createElement('div', 'project-payment__detail-row');
    const downPaymentLabel = createElement('span', 'project-payment__detail-label', 'Down Payment');
    const downPaymentValue = createElement('span', 'project-payment__detail-value', `${plan.downPayment}%`);
    downPaymentRow.appendChild(downPaymentLabel);
    downPaymentRow.appendChild(downPaymentValue);
    planDetails.appendChild(downPaymentRow);

    const durationRow = createElement('div', 'project-payment__detail-row');
    const durationLabel = createElement('span', 'project-payment__detail-label', 'Duration');
    const durationValue = createElement('span', 'project-payment__detail-value', plan.duration);
    durationRow.appendChild(durationLabel);
    durationRow.appendChild(durationValue);
    planDetails.appendChild(durationRow);

    planCard.appendChild(planDetails);

    const planDescription = createElement('p', 'project-payment__description', plan.description);
    planCard.appendChild(planDescription);

    const planCta = createElement('a', 'btn btn--primary btn--full', 'Get Payment Details');
    planCta.href = '/contact';
    planCta.setAttribute('data-route', '');
    planCard.appendChild(planCta);

    paymentGrid.appendChild(planCard);
  });

  paymentContainer.appendChild(paymentGrid);

  const disclaimer = createElement('p', 'project-payment__disclaimer',
    '* Payment plans are subject to terms and conditions. Contact us for detailed payment schedules and eligibility criteria.');
  paymentContainer.appendChild(disclaimer);

  paymentSection.appendChild(paymentContainer);
  page.appendChild(paymentSection);

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 8: SIMILAR PROJECTS
  // ═══════════════════════════════════════════════════════════════════════════

  const similarProjects = getRelatedProjects(project, 4);

  if (similarProjects.length > 0) {
    const similarSection = createElement('section', 'project-similar');
    const similarContainer = createElement('div', 'container');

    const similarHeader = createElement('div', 'project-similar__header');
    const similarTitle = createElement('h2', 'project-section-title', 'Similar Projects');
    similarHeader.appendChild(similarTitle);

    const viewAllLink = createElement('a', 'project-similar__view-all', 'View All Projects');
    viewAllLink.href = '/projects';
    viewAllLink.setAttribute('data-route', '');
    viewAllLink.appendChild(createSVGUse('icon-arrow-right'));
    similarHeader.appendChild(viewAllLink);

    similarContainer.appendChild(similarHeader);

    const similarGrid = createElement('div', 'project-similar__grid');

    similarProjects.forEach(proj => {
      similarGrid.appendChild(createSimilarProjectCard(proj));
    });

    similarContainer.appendChild(similarGrid);
    similarSection.appendChild(similarContainer);
    page.appendChild(similarSection);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 9: CONTACT/INQUIRY
  // ═══════════════════════════════════════════════════════════════════════════

  const contactSection = createElement('section', 'project-contact');
  const contactContainer = createElement('div', 'container');

  const contactGrid = createElement('div', 'project-contact__grid');

  const contactForm = createElement('div', 'project-contact__form-card');
  const formTitle = createElement('h2', 'project-contact__title', 'Interested in This Project?');
  const formSubtitle = createElement('p', 'project-contact__subtitle',
    `Get more information about ${project.name} and schedule a site visit`);
  contactForm.appendChild(formTitle);
  contactForm.appendChild(formSubtitle);

  const form = createElement('form', 'project-contact__form');
  form.setAttribute('action', '/contact');
  form.setAttribute('method', 'GET');

  const nameGroup = createElement('div', 'project-contact__form-group');
  const nameLabel = createElement('label', 'project-contact__label', 'Full Name');
  nameLabel.setAttribute('for', 'inquiry-name');
  const nameInput = createElement('input', 'project-contact__input');
  nameInput.id = 'inquiry-name';
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.placeholder = 'Enter your full name';
  nameInput.required = true;
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  form.appendChild(nameGroup);

  const phoneGroup = createElement('div', 'project-contact__form-group');
  const phoneLabel = createElement('label', 'project-contact__label', 'Phone Number');
  phoneLabel.setAttribute('for', 'inquiry-phone');
  const phoneInput = createElement('input', 'project-contact__input');
  phoneInput.id = 'inquiry-phone';
  phoneInput.type = 'tel';
  phoneInput.name = 'phone';
  phoneInput.placeholder = '+964 XXX XXX XXXX';
  phoneInput.required = true;
  phoneGroup.appendChild(phoneLabel);
  phoneGroup.appendChild(phoneInput);
  form.appendChild(phoneGroup);

  const emailGroup = createElement('div', 'project-contact__form-group');
  const emailLabel = createElement('label', 'project-contact__label', 'Email Address');
  emailLabel.setAttribute('for', 'inquiry-email');
  const emailInput = createElement('input', 'project-contact__input');
  emailInput.id = 'inquiry-email';
  emailInput.type = 'email';
  emailInput.name = 'email';
  emailInput.placeholder = 'your@email.com';
  emailInput.required = true;
  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);
  form.appendChild(emailGroup);

  const messageGroup = createElement('div', 'project-contact__form-group');
  const messageLabel = createElement('label', 'project-contact__label', 'Message');
  messageLabel.setAttribute('for', 'inquiry-message');
  const messageTextarea = createElement('textarea', 'project-contact__textarea');
  messageTextarea.id = 'inquiry-message';
  messageTextarea.name = 'message';
  messageTextarea.placeholder = `I'm interested in ${project.name}. Please send me more information about available units and payment plans.`;
  messageTextarea.rows = 4;
  messageGroup.appendChild(messageLabel);
  messageGroup.appendChild(messageTextarea);
  form.appendChild(messageGroup);

  const hiddenProject = createElement('input');
  hiddenProject.type = 'hidden';
  hiddenProject.name = 'project';
  hiddenProject.value = project.name;
  form.appendChild(hiddenProject);

  const submitBtn = createElement('button', 'btn btn--primary btn--lg btn--full', 'Send Inquiry');
  submitBtn.type = 'submit';
  form.appendChild(submitBtn);

  contactForm.appendChild(form);
  contactGrid.appendChild(contactForm);

  const contactInfo = createElement('div', 'project-contact__info-card');

  const infoTitle = createElement('h3', 'project-contact__info-title', 'Contact Us Directly');
  contactInfo.appendChild(infoTitle);

  const contactMethods = createElement('div', 'project-contact__methods');

  const phoneMethod = createElement('a', 'project-contact__method');
  phoneMethod.href = 'tel:+9647507922138';
  phoneMethod.appendChild(createSVGUse('icon-phone'));
  const phoneContent = createElement('div', 'project-contact__method-content');
  const phoneMethodTitle = createElement('span', 'project-contact__method-title', 'Call Us');
  const phoneValue = createElement('span', 'project-contact__method-value', '+964 750 792 2138');
  phoneContent.appendChild(phoneMethodTitle);
  phoneContent.appendChild(phoneValue);
  phoneMethod.appendChild(phoneContent);
  contactMethods.appendChild(phoneMethod);

  const whatsappMethod = createElement('a', 'project-contact__method');
  whatsappMethod.href = `https://wa.me/9647507922138?text=${encodeURIComponent(`Hi, I'm interested in ${project.name}. Please send me more information.`)}`;
  whatsappMethod.target = '_blank';
  whatsappMethod.rel = 'noopener noreferrer';
  whatsappMethod.appendChild(createSVGUse('icon-whatsapp'));
  const whatsappContent = createElement('div', 'project-contact__method-content');
  const whatsappTitle = createElement('span', 'project-contact__method-title', 'WhatsApp');
  const whatsappValue = createElement('span', 'project-contact__method-value', 'Chat with us');
  whatsappContent.appendChild(whatsappTitle);
  whatsappContent.appendChild(whatsappValue);
  whatsappMethod.appendChild(whatsappContent);
  contactMethods.appendChild(whatsappMethod);

  const emailMethod = createElement('a', 'project-contact__method');
  emailMethod.href = `mailto:info@realhouseiq.com?subject=Inquiry about ${project.name}`;
  emailMethod.appendChild(createSVGUse('icon-email'));
  const emailMethodContent = createElement('div', 'project-contact__method-content');
  const emailMethodTitle = createElement('span', 'project-contact__method-title', 'Email');
  const emailMethodValue = createElement('span', 'project-contact__method-value', 'info@realhouseiq.com');
  emailMethodContent.appendChild(emailMethodTitle);
  emailMethodContent.appendChild(emailMethodValue);
  emailMethod.appendChild(emailMethodContent);
  contactMethods.appendChild(emailMethod);

  contactInfo.appendChild(contactMethods);

  const officeHours = createElement('div', 'project-contact__hours');
  const hoursTitle = createElement('h4', 'project-contact__hours-title', 'Office Hours');
  officeHours.appendChild(hoursTitle);
  const hoursList = createElement('ul', 'project-contact__hours-list');
  const hours = [
    { day: 'Saturday - Thursday', time: '10:00 AM - 6:00 PM' },
    { day: 'Friday', time: 'Closed' }
  ];
  hours.forEach(h => {
    const li = createElement('li', 'project-contact__hours-item');
    const day = createElement('span', 'project-contact__hours-day', h.day);
    const time = createElement('span', 'project-contact__hours-time', h.time);
    li.appendChild(day);
    li.appendChild(time);
    hoursList.appendChild(li);
  });
  officeHours.appendChild(hoursList);
  contactInfo.appendChild(officeHours);

  contactGrid.appendChild(contactInfo);
  contactContainer.appendChild(contactGrid);
  contactSection.appendChild(contactContainer);
  page.appendChild(contactSection);

  // ═══════════════════════════════════════════════════════════════════════════
  // INTERNAL CTA
  // ═══════════════════════════════════════════════════════════════════════════

  const ctaSection = createInternalCTA(
    'Looking for More Options?',
    'Explore our complete collection of properties and development projects in Erbil, Kurdistan.',
    { text: 'View All Properties', url: '/properties' },
    { text: 'Browse Projects', url: '/projects' }
  );
  page.appendChild(ctaSection);

  // ═══════════════════════════════════════════════════════════════════════════
  // BACK LINK
  // ═══════════════════════════════════════════════════════════════════════════

  const backSection = createElement('section', 'project-detail__back');
  const backContainer = createElement('div', 'container');
  const backLink = createElement('a', 'project-detail__back-link');
  backLink.href = '/projects';
  backLink.setAttribute('data-route', '');
  backLink.appendChild(createSVGUse('icon-arrow-left'));
  backLink.appendChild(document.createTextNode('Back to All Projects'));
  backContainer.appendChild(backLink);
  backSection.appendChild(backContainer);
  page.appendChild(backSection);

  fragment.appendChild(page);

  // ═══════════════════════════════════════════════════════════════════════════
  // GSAP ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  setTimeout(() => {
    initProjectDetailAnimations();
  }, 100);

  return fragment;
}

// ─── Initialize GSAP Animations ──────────────────────────────────────────────

function initProjectDetailAnimations(): void {
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTimeline
    .from('.project-hero__status', { opacity: 0, y: 20, duration: 0.6 })
    .from('.project-hero__title', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
    .from('.project-hero__location', { opacity: 0, y: 20, duration: 0.6 }, '-=0.5')
    .from('.project-hero__stat', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.3')
    .from('.project-hero__cta', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
    .from('.project-hero__scroll-indicator', { opacity: 0, y: 10, duration: 0.4 }, '-=0.1');

  const sections = [
    '.project-overview',
    '.project-amenities',
    '.project-gallery-section',
    '.project-floor-plans',
    '.project-location',
    '.project-payment',
    '.project-similar',
    '.project-contact'
  ];

  sections.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  });

  gsap.from('.project-amenities__category', {
    scrollTrigger: {
      trigger: '.project-amenities__categories',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.project-floor-plans__card', {
    scrollTrigger: {
      trigger: '.project-floor-plans__grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.project-payment__card', {
    scrollTrigger: {
      trigger: '.project-payment__grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.similar-project-card', {
    scrollTrigger: {
      trigger: '.project-similar__grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.project-gallery-section__item', {
    scrollTrigger: {
      trigger: '.project-gallery-section__grid',
      start: 'top 80%'
    },
    opacity: 0,
    scale: 0.95,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.to('.project-hero__bg-image', {
    scrollTrigger: {
      trigger: '.project-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 100,
    scale: 1.1,
    ease: 'none'
  });

  gsap.to('.project-hero__scroll-indicator', {
    y: 10,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: 'power1.inOut'
  });
}

export { renderComprehensiveProjectDetailPage as renderProjectDetail };
