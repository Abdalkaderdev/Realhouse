// ═══════════════════════════════════════════════════════════════════════════
// SEO Schema Generation Functions for Real House
// JSON-LD Structured Data for Search Engine Optimization
// Optimized for: luxury real estate Erbil, properties for sale Kurdistan,
// apartments Erbil Iraq, villas Kurdistan, real estate investment Iraq
// ═══════════════════════════════════════════════════════════════════════════

import { properties, type Property } from '../data/properties';
import { projects, type Project } from '../data/projects';

const BASE_URL = 'https://realhouseiq.com';

// SEO Keywords for targeting
const SEO_KEYWORDS = {
  primary: ['luxury real estate Erbil', 'properties for sale Kurdistan', 'apartments Erbil Iraq'],
  secondary: ['villas Erbil', 'penthouse Kurdistan', 'commercial property Iraq', 'real estate investment Erbil'],
  local: ['Dream City Erbil', 'Gulan properties', 'Ankawa apartments', 'English Village homes']
};

/**
 * Generate RealEstateListing JSON-LD schema for a property
 */
export function generatePropertySchema(property: Property): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    'name': property.title,
    'description': property.description,
    'url': `${BASE_URL}/properties/${property.id}`,
    'datePosted': new Date().toISOString().split('T')[0],
    'image': property.images,
    'offers': {
      '@type': 'Offer',
      'price': property.price > 0 ? property.price : undefined,
      'priceCurrency': 'USD',
      'availability': property.status === 'Sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      'businessFunction': property.status === 'For Rent' ? 'http://purl.org/goodrelations/v1#LeaseOut' : 'http://purl.org/goodrelations/v1#Sell'
    },
    'about': {
      '@type': property.type === 'Commercial' || property.type === 'Land' ? 'Place' : 'Residence',
      'numberOfRooms': property.specs.beds > 0 ? property.specs.beds : undefined,
      'numberOfBathroomsTotal': property.specs.baths,
      'floorSize': {
        '@type': 'QuantitativeValue',
        'value': property.specs.sqm,
        'unitCode': 'MTK'
      },
      'yearBuilt': property.specs.yearBuilt,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': property.location.address,
        'addressLocality': property.location.city,
        'addressRegion': property.location.district,
        'addressCountry': property.location.country
      },
      'amenityFeature': property.features.map(feature => ({
        '@type': 'LocationFeatureSpecification',
        'name': feature,
        'value': true
      }))
    },
    'broker': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': BASE_URL,
      'telephone': '+964-750-792-2138',
      'email': 'info@realhouseiq.com'
    },
    'agent': {
      '@type': 'Person',
      'name': property.agent.name,
      'telephone': property.agent.phone,
      'email': property.agent.email,
      'image': property.agent.image
    }
  };
}

/**
 * Generate Residence schema for property detail page
 */
export function generateResidenceSchema(property: Property): object {
  const getPropertyType = () => {
    switch (property.type) {
      case 'Commercial': return 'Store';
      case 'Land': return 'Place';
      case 'Apartment':
      case 'Penthouse': return 'Apartment';
      case 'Townhouse':
      case 'Duplex': return 'House';
      default: return 'SingleFamilyResidence';
    }
  };

  return {
    '@context': 'https://schema.org',
    '@type': getPropertyType(),
    'name': property.title,
    'description': property.description,
    'url': `${BASE_URL}/properties/${property.id}`,
    'image': property.images,
    'numberOfRooms': property.specs.beds > 0 ? property.specs.beds + property.specs.baths : property.specs.baths,
    'numberOfBedrooms': property.specs.beds > 0 ? property.specs.beds : undefined,
    'numberOfBathroomsTotal': property.specs.baths,
    'floorSize': {
      '@type': 'QuantitativeValue',
      'value': property.specs.sqm,
      'unitCode': 'MTK',
      'unitText': 'square meters'
    },
    'yearBuilt': property.specs.yearBuilt,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': property.location.address,
      'addressLocality': property.location.city,
      'addressRegion': property.location.district,
      'addressCountry': property.location.country
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '36.1901',
      'longitude': '44.0091'
    },
    'amenityFeature': property.features.map(feature => ({
      '@type': 'LocationFeatureSpecification',
      'name': feature,
      'value': true
    }))
  };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

/**
 * Generate LocalBusiness schema for contact page
 */
export function generateLocalBusinessSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Real House',
    'alternateName': 'Real House Erbil',
    'description': 'Premium luxury real estate agency in Erbil, Iraq. Specializing in villas, apartments, penthouses, and commercial properties.',
    'url': BASE_URL,
    'logo': `${BASE_URL}/favicon.svg`,
    'image': `${BASE_URL}/favicon.svg`,
    'telephone': ['+964-750-792-2138', '+964-751-441-5003'],
    'email': 'info@realhouseiq.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Dream City',
      'addressLocality': 'Erbil',
      'addressRegion': 'Kurdistan Region',
      'postalCode': '44001',
      'addressCountry': 'IQ'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '36.1901',
      'longitude': '44.0091'
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        'opens': '09:00',
        'closes': '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Friday',
        'opens': '00:00',
        'closes': '00:00',
        'description': 'By Appointment Only'
      }
    ],
    'priceRange': '$$$',
    'currenciesAccepted': 'USD, IQD',
    'paymentAccepted': 'Cash, Bank Transfer',
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
      'name': 'Real Estate Listings',
      'itemListElement': [
        {
          '@type': 'OfferCatalog',
          'name': 'Residential Properties',
          'itemListElement': ['Villas', 'Apartments', 'Penthouses', 'Townhouses', 'Duplexes']
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Commercial Properties',
          'itemListElement': ['Retail Stores', 'Office Spaces', 'Land']
        }
      ]
    },
    'sameAs': [
      'https://instagram.com/realhouseiq',
      'https://linkedin.com/company/realhouseiq',
      'https://facebook.com/realhouseiq'
    ],
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': '+964-750-792-2138',
        'contactType': 'sales',
        'contactOption': 'TollFree',
        'areaServed': 'IQ',
        'availableLanguage': ['English', 'Arabic', 'Kurdish']
      },
      {
        '@type': 'ContactPoint',
        'telephone': '+964-751-441-5003',
        'contactType': 'sales',
        'contactOption': 'TollFree',
        'areaServed': 'IQ',
        'availableLanguage': ['English', 'Arabic', 'Kurdish']
      }
    ]
  };
}

/**
 * Generate Organization schema for the website
 */
export function generateOrganizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Real House',
    'url': BASE_URL,
    'logo': `${BASE_URL}/favicon.svg`,
    'description': 'Premium luxury real estate in Erbil, Iraq',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+964-750-792-2138',
      'contactType': 'sales',
      'areaServed': 'IQ',
      'availableLanguage': ['English', 'Arabic', 'Kurdish']
    },
    'sameAs': [
      'https://instagram.com/realhouseiq',
      'https://linkedin.com/company/realhouseiq'
    ]
  };
}

/**
 * Generate ItemList schema for properties listing page
 */
export function generatePropertyListSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Real House Properties',
    'description': 'Exclusive collection of luxury properties in Erbil, Iraq',
    'numberOfItems': properties.length,
    'itemListElement': properties.map((property, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `${BASE_URL}/properties/${property.id}`,
      'name': property.title,
      'image': property.images[0]
    }))
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Real House',
    'alternateName': 'Real House Erbil',
    'url': BASE_URL,
    'description': 'Premium luxury real estate in Erbil, Iraq. Villas, apartments, and investment properties.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Real House',
      'logo': `${BASE_URL}/favicon.svg`
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${BASE_URL}/properties?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate FAQ schema for FAQ page
 */
export function generateFAQSchema(): object {
  const faqs = [
    {
      question: 'How do I schedule a viewing?',
      answer: 'Scheduling a viewing is easy. Simply navigate to any property listing and click the "Schedule Viewing" button, or contact us directly through our contact page. You can also call our office at +964 750 792 2138.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'Real House specializes in luxury properties in Erbil, Kurdistan Region, Iraq. We cover all major districts including Gulan, Dream City, Italian Village, English Village, and more.'
    },
    {
      question: 'How does the buying process work?',
      answer: 'Our buying process involves: 1) Initial consultation, 2) Property curation, 3) Private viewings, 4) Making an offer with expert negotiation, 5) Due diligence, 6) Closing with full transaction support.'
    },
    {
      question: 'Do you help with financing?',
      answer: 'Yes, we provide comprehensive financing assistance. We have relationships with premier banks and financial institutions specializing in real estate in Iraq.'
    },
    {
      question: 'Can you help me sell my property?',
      answer: 'Absolutely. We offer comprehensive selling services including professional photography, virtual tours, targeted marketing, and expert pricing strategy.'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

/**
 * Get SEO meta data for a property
 */
export function getPropertySEOMeta(property: Property): {
  title: string;
  description: string;
  image: string;
  price: string;
} {
  const priceDisplay = property.price > 0
    ? `$${property.price.toLocaleString()}`
    : 'Contact for Price';

  const title = `${property.title} - ${priceDisplay} | Real House Erbil`;

  const description = `${property.type} for ${property.status.toLowerCase()} in ${property.location.district}, ${property.location.city}. ` +
    `${property.specs.beds > 0 ? `${property.specs.beds} bedrooms, ` : ''}` +
    `${property.specs.baths} bathrooms, ${property.specs.sqm.toLocaleString()} m². ` +
    `Features: ${property.features.slice(0, 3).join(', ')}. Contact Real House for viewings.`;

  return {
    title,
    description: description.slice(0, 160),
    image: property.images[0],
    price: priceDisplay
  };
}

/**
 * Get all properties for sitemap generation
 */
export function getAllPropertyUrls(): Array<{ id: string; title: string; lastmod: string }> {
  return properties.map(property => ({
    id: property.id,
    title: property.title,
    lastmod: new Date().toISOString().split('T')[0]
  }));
}

/**
 * Inject JSON-LD schema into the document head
 */
export function injectSchema(schema: object, id?: string): void {
  // Remove existing schema with same id if exists
  if (id) {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  if (id) {
    script.id = id;
  }
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Remove all dynamic schema scripts
 */
export function clearDynamicSchemas(): void {
  const schemas = document.querySelectorAll('script[type="application/ld+json"][id^="schema-"]');
  schemas.forEach(schema => schema.remove());
}

/**
 * Update meta tags for a property page
 */
export function updatePropertyMeta(property: Property): void {
  const seoMeta = getPropertySEOMeta(property);
  const url = `${BASE_URL}/properties/${property.id}`;

  // Update document title
  document.title = seoMeta.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', seoMeta.description);
  }

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', url);
  }

  // Update Open Graph tags
  updateMetaTag('meta[property="og:title"]', 'property', 'og:title', seoMeta.title);
  updateMetaTag('meta[property="og:description"]', 'property', 'og:description', seoMeta.description);
  updateMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
  updateMetaTag('meta[property="og:image"]', 'property', 'og:image', seoMeta.image);
  updateMetaTag('meta[property="og:type"]', 'property', 'og:type', 'product');

  // Add product-specific OG tags
  updateMetaTag('meta[property="product:price:amount"]', 'property', 'product:price:amount', property.price > 0 ? property.price.toString() : '');
  updateMetaTag('meta[property="product:price:currency"]', 'property', 'product:price:currency', 'USD');

  // Update Twitter Card tags
  updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seoMeta.title);
  updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', seoMeta.description);
  updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', seoMeta.image);
}

/**
 * Helper function to update or create meta tags
 */
function updateMetaTag(selector: string, attrType: 'name' | 'property', attrValue: string, content: string): void {
  let tag = document.querySelector(selector);
  if (tag) {
    tag.setAttribute('content', content);
  } else if (content) {
    tag = document.createElement('meta');
    tag.setAttribute(attrType, attrValue);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  }
}

/**
 * Setup SEO for a property detail page
 */
export function setupPropertyPageSEO(property: Property): void {
  // Clear any existing dynamic schemas
  clearDynamicSchemas();

  // Update meta tags
  updatePropertyMeta(property);

  // Inject property listing schema
  injectSchema(generatePropertySchema(property), 'schema-property-listing');

  // Inject residence schema
  injectSchema(generateResidenceSchema(property), 'schema-residence');

  // Inject breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'Properties', url: `${BASE_URL}/properties` },
    { name: property.title, url: `${BASE_URL}/properties/${property.id}` }
  ];
  injectSchema(generateBreadcrumbSchema(breadcrumbs), 'schema-breadcrumb');
}

/**
 * Setup SEO for the properties listing page
 */
export function setupPropertiesPageSEO(): void {
  clearDynamicSchemas();

  // Inject property list schema
  injectSchema(generatePropertyListSchema(), 'schema-property-list');

  // Inject breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'Properties', url: `${BASE_URL}/properties` }
  ];
  injectSchema(generateBreadcrumbSchema(breadcrumbs), 'schema-breadcrumb');
}

/**
 * Setup SEO for the contact page
 */
export function setupContactPageSEO(): void {
  clearDynamicSchemas();

  // Inject local business schema
  injectSchema(generateLocalBusinessSchema(), 'schema-local-business');

  // Inject breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'Contact', url: `${BASE_URL}/contact` }
  ];
  injectSchema(generateBreadcrumbSchema(breadcrumbs), 'schema-breadcrumb');
}

/**
 * Setup SEO for the about page
 */
export function setupAboutPageSEO(): void {
  clearDynamicSchemas();

  // Inject organization schema
  injectSchema(generateOrganizationSchema(), 'schema-organization');

  // Inject breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'About', url: `${BASE_URL}/about` }
  ];
  injectSchema(generateBreadcrumbSchema(breadcrumbs), 'schema-breadcrumb');
}

/**
 * Setup SEO for the FAQ page
 */
export function setupFAQPageSEO(): void {
  clearDynamicSchemas();

  // Inject FAQ schema
  injectSchema(generateFAQSchema(), 'schema-faq');

  // Inject breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'FAQ', url: `${BASE_URL}/faq` }
  ];
  injectSchema(generateBreadcrumbSchema(breadcrumbs), 'schema-breadcrumb');
}

/**
 * Setup SEO for the home page
 */
export function setupHomePageSEO(): void {
  clearDynamicSchemas();

  // Inject website schema
  injectSchema(generateWebSiteSchema(), 'schema-website');

  // Inject organization schema
  injectSchema(generateOrganizationSchema(), 'schema-organization');

  // Inject FAQ schema on home page for better SEO
  injectSchema(generateRealEstateFAQSchema(), 'schema-faq-home');
}

// ═══════════════════════════════════════════════════════════════════════════
// Enhanced SEO Schemas for Better Google Ranking
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate comprehensive BreadcrumbList schema for all page types
 */
export function generatePageBreadcrumbs(pageName: string, pageUrl: string, parent?: { name: string; url: string }): object {
  const items = [
    { name: 'Home', url: BASE_URL }
  ];

  if (parent) {
    items.push({ name: parent.name, url: parent.url });
  }

  items.push({ name: pageName, url: pageUrl });

  return generateBreadcrumbSchema(items);
}

/**
 * Generate Real Estate FAQ Schema with comprehensive questions
 * Targets keywords: luxury real estate Erbil, buying property Kurdistan, etc.
 */
export function generateRealEstateFAQSchema(): object {
  const realEstateFaqs = [
    {
      question: 'How do I buy property in Erbil, Iraq?',
      answer: 'Buying property in Erbil is straightforward with Real House. The process includes: 1) Initial consultation to understand your needs, 2) Property search and curation, 3) Property viewings with our expert agents, 4) Price negotiation and offer submission, 5) Due diligence and legal review, 6) Contract signing and payment, 7) Property registration and handover. Foreign nationals can purchase property in the Kurdistan Region with proper documentation. Contact Real House at +964 750 792 2138 for personalized guidance.'
    },
    {
      question: 'What are the best areas to buy property in Erbil?',
      answer: 'The top residential areas in Erbil include: Dream City - family-oriented gated community with international schools; Gulan - premium district with modern towers and shopping centers; Italian Village - charming Mediterranean-style homes; English Village - exclusive British colonial architecture; Ankawa - vibrant neighborhood with great amenities. Each area offers unique benefits depending on your lifestyle preferences and investment goals.'
    },
    {
      question: 'Can foreigners buy property in Kurdistan Region, Iraq?',
      answer: 'Yes, foreign nationals can purchase property in the Kurdistan Region of Iraq. The process requires valid identification, residence permit (if applicable), and legal documentation. Real House provides full support for international buyers, including legal guidance, translation services, and documentation assistance. Many expats and international investors have successfully purchased properties through our agency.'
    },
    {
      question: 'What is the average price of apartments in Erbil?',
      answer: 'Apartment prices in Erbil vary by location and quality. In premium areas like Gulan and Dream City, prices range from $85,000 to $350,000 USD. Luxury penthouses can exceed $500,000 USD. Off-plan properties often offer competitive pricing with flexible payment plans. Contact Real House for current market prices and investment opportunities tailored to your budget.'
    },
    {
      question: 'Is real estate a good investment in Erbil, Kurdistan?',
      answer: 'Erbil\'s real estate market offers strong investment potential. Key factors include: growing economy and infrastructure development, increasing foreign investment, high rental demand from expats and professionals, competitive property prices compared to regional markets, and stable political environment in Kurdistan Region. Real House can help identify properties with the best investment returns.'
    },
    {
      question: 'What types of properties are available in Erbil?',
      answer: 'Real House offers diverse property types in Erbil: Apartments (studios to 4+ bedrooms in modern towers), Villas (standalone luxury homes with gardens), Penthouses (premium top-floor residences with panoramic views), Townhouses (multi-story family homes), Commercial properties (retail stores, offices, warehouses), and Land for development. We also specialize in off-plan properties with attractive payment plans.'
    },
    {
      question: 'How do I schedule a property viewing in Erbil?',
      answer: 'Scheduling a viewing with Real House is easy. You can: 1) Call us directly at +964 750 792 2138 or +964 751 441 5003, 2) Send an email to info@realhouseiq.com, 3) Use the "Schedule Viewing" button on any property listing, or 4) Visit our office in Dream City, Erbil. We offer flexible viewing times including evenings and weekends to accommodate your schedule.'
    },
    {
      question: 'What are the payment options for buying property in Erbil?',
      answer: 'Payment options in Erbil include: Cash payment (often with negotiation leverage), Bank transfer (local and international), Installment plans (especially for off-plan properties - typically 10-40% down payment with remaining balance over 2-5 years), and Developer financing. Real House can connect you with partner banks for mortgage assistance. We accept payments in USD and Iraqi Dinar (IQD).'
    },
    {
      question: 'What documents do I need to buy property in Kurdistan?',
      answer: 'Required documents typically include: Valid passport or Iraqi ID card, Residence permit (for foreigners), Proof of funds or bank statements, Tax clearance certificate, Power of attorney (if buying through a representative). Real House handles all paperwork and coordinates with legal professionals to ensure a smooth transaction.'
    },
    {
      question: 'Does Real House offer property management services?',
      answer: 'Yes, Real House provides comprehensive property management services for investors and absentee owners. Our services include: tenant finding and screening, rent collection, property maintenance and repairs, regular inspections and reporting, utility management, and legal compliance. This is ideal for investors seeking passive rental income from their Erbil properties.'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': realEstateFaqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

/**
 * Generate Product schema for individual property (for Google Shopping/Rich Results)
 */
export function generateProductSchema(property: Property): object {
  const priceDisplay = property.price > 0 ? property.price : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': property.title,
    'description': property.description.slice(0, 500),
    'image': property.images,
    'brand': {
      '@type': 'Brand',
      'name': 'Real House'
    },
    'offers': {
      '@type': 'Offer',
      'url': `${BASE_URL}/properties/${property.id}`,
      'priceCurrency': 'USD',
      'price': priceDisplay,
      'priceValidUntil': new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      'availability': property.status === 'Sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Real House',
        'url': BASE_URL
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'reviewCount': '45',
      'bestRating': '5',
      'worstRating': '1'
    }
  };
}

/**
 * Generate Project/Development schema for project pages
 */
export function generateProjectSchema(project: Project): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    'name': project.name,
    'description': project.description,
    'url': `${BASE_URL}/projects/${project.id}`,
    'image': project.images,
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
    'amenityFeature': project.amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      'name': amenity,
      'value': true
    })),
    'containsPlace': {
      '@type': 'Accommodation',
      'numberOfRooms': project.totalUnits,
      'floorSize': {
        '@type': 'QuantitativeValue',
        'unitText': 'units'
      }
    }
  };
}

/**
 * Generate ItemList schema for projects page
 */
export function generateProjectListSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Real Estate Development Projects in Erbil',
    'description': 'Exclusive collection of residential and commercial development projects in Erbil, Kurdistan Region, Iraq',
    'numberOfItems': projects.length,
    'itemListElement': projects.map((project, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `${BASE_URL}/projects/${project.id}`,
      'name': project.name,
      'image': project.images[0]
    }))
  };
}

/**
 * Generate VideoObject schema for virtual tours
 */
export function generateVirtualTourSchema(property: Property): object | null {
  if (!property.virtualTourUrl) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': `Virtual Tour: ${property.title}`,
    'description': `360-degree virtual tour of ${property.title} in ${property.location.district}, ${property.location.city}`,
    'thumbnailUrl': property.images[0],
    'uploadDate': new Date().toISOString().split('T')[0],
    'contentUrl': property.virtualTourUrl,
    'embedUrl': property.virtualTourUrl,
    'duration': 'PT5M',
    'publisher': {
      '@type': 'Organization',
      'name': 'Real House',
      'logo': {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/logo.png`
      }
    }
  };
}

/**
 * Generate ImageObject schema for property images (helps with Google Images)
 */
export function generatePropertyImageSchema(property: Property): object[] {
  return property.images.map((image, index) => ({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    'url': image,
    'name': `${property.title} - Image ${index + 1}`,
    'description': `${property.type} ${property.status.toLowerCase()} in ${property.location.district}, ${property.location.city}. ${property.specs.beds} bedrooms, ${property.specs.baths} bathrooms, ${property.specs.sqm} sqm.`,
    'contentUrl': image,
    'license': 'https://realhouseiq.com/terms',
    'acquireLicensePage': 'https://realhouseiq.com/contact',
    'creditText': 'Real House',
    'creator': {
      '@type': 'Organization',
      'name': 'Real House'
    },
    'copyrightNotice': '© 2025 Real House. All rights reserved.'
  }));
}

/**
 * Generate Service schema for Real House services
 */
export function generateServicesSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Real Estate Services',
    'provider': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': BASE_URL
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
      'name': 'Real Estate Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Property Sales',
            'description': 'Professional assistance buying and selling luxury properties in Erbil'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Property Rentals',
            'description': 'Find premium rental properties in Erbil and Kurdistan'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Investment Consulting',
            'description': 'Expert guidance on real estate investment opportunities in Iraq'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Property Management',
            'description': 'Comprehensive property management services for investors'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Virtual Property Tours',
            'description': '360-degree virtual tours of properties for remote viewing'
          }
        }
      ]
    }
  };
}

/**
 * Generate Review schema for testimonials
 */
export function generateReviewSchema(reviews: Array<{ name: string; text: string; rating: number }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Real House',
    'review': reviews.map(review => ({
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': review.rating.toString(),
        'bestRating': '5'
      },
      'author': {
        '@type': 'Person',
        'name': review.name
      },
      'reviewBody': review.text
    }))
  };
}

/**
 * Generate HowTo schema for buying property process
 */
export function generateHowToBuyPropertySchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Buy Property in Erbil, Kurdistan',
    'description': 'Step-by-step guide to purchasing real estate in Erbil, Iraq with Real House',
    'totalTime': 'P30D',
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'USD',
      'value': '85000-2500000'
    },
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Initial Consultation',
        'text': 'Contact Real House to discuss your requirements, budget, and preferred locations',
        'url': `${BASE_URL}/contact`
      },
      {
        '@type': 'HowToStep',
        'name': 'Property Search',
        'text': 'Our agents curate a selection of properties matching your criteria',
        'url': `${BASE_URL}/properties`
      },
      {
        '@type': 'HowToStep',
        'name': 'Property Viewings',
        'text': 'Schedule in-person or virtual tours of shortlisted properties',
        'url': `${BASE_URL}/properties`
      },
      {
        '@type': 'HowToStep',
        'name': 'Make an Offer',
        'text': 'Submit your offer with expert negotiation support from Real House'
      },
      {
        '@type': 'HowToStep',
        'name': 'Due Diligence',
        'text': 'Legal review, property inspection, and documentation verification'
      },
      {
        '@type': 'HowToStep',
        'name': 'Contract & Payment',
        'text': 'Sign the purchase agreement and complete the payment'
      },
      {
        '@type': 'HowToStep',
        'name': 'Property Handover',
        'text': 'Receive your property keys and registration documents'
      }
    ]
  };
}

/**
 * Setup SEO for projects listing page
 */
export function setupProjectsPageSEO(): void {
  clearDynamicSchemas();

  // Update page meta
  document.title = 'Real Estate Projects in Erbil | New Developments Kurdistan | Real House';
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Explore premium real estate development projects in Erbil, Kurdistan. Off-plan properties, new apartments, villas in Dream City, Empire World, Italian Village & more.');
  }

  // Inject project list schema
  injectSchema(generateProjectListSchema(), 'schema-project-list');

  // Inject breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'Projects', url: `${BASE_URL}/projects` }
  ];
  injectSchema(generateBreadcrumbSchema(breadcrumbs), 'schema-breadcrumb');
}

/**
 * Setup SEO for project detail page
 */
export function setupProjectPageSEO(project: Project): void {
  clearDynamicSchemas();

  // Update page meta
  document.title = `${project.name} | ${project.status} | Real Estate Erbil | Real House`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', `${project.name} in ${project.location.district}, Erbil. ${project.totalUnits} units, prices from $${project.priceRange.min.toLocaleString()}. ${project.amenities.slice(0, 3).join(', ')}. Contact Real House.`);
  }

  // Inject project schema
  injectSchema(generateProjectSchema(project), 'schema-project');

  // Inject breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'Projects', url: `${BASE_URL}/projects` },
    { name: project.name, url: `${BASE_URL}/projects/${project.id}` }
  ];
  injectSchema(generateBreadcrumbSchema(breadcrumbs), 'schema-breadcrumb');
}

/**
 * Setup SEO for favorites page
 */
export function setupFavoritesPageSEO(): void {
  clearDynamicSchemas();

  document.title = 'My Favorite Properties | Saved Listings | Real House Erbil';
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'View your saved favorite properties from Real House. Compare and manage your shortlisted luxury properties in Erbil, Kurdistan.');
  }

  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'Favorites', url: `${BASE_URL}/favorites` }
  ];
  injectSchema(generateBreadcrumbSchema(breadcrumbs), 'schema-breadcrumb');
}

/**
 * Setup SEO for compare page
 */
export function setupComparePageSEO(): void {
  clearDynamicSchemas();

  document.title = 'Compare Properties | Side by Side Comparison | Real House Erbil';
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Compare luxury properties side by side. Analyze features, prices, and specifications of villas, apartments, and commercial properties in Erbil.');
  }

  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: 'Compare Properties', url: `${BASE_URL}/compare` }
  ];
  injectSchema(generateBreadcrumbSchema(breadcrumbs), 'schema-breadcrumb');
}

/**
 * Get all project URLs for sitemap
 */
export function getAllProjectUrls(): Array<{ id: string; title: string; lastmod: string }> {
  return projects.map(project => ({
    id: project.id,
    title: project.name,
    lastmod: new Date().toISOString().split('T')[0]
  }));
}

/**
 * Generate comprehensive meta tags object for dynamic pages
 */
export function generateMetaTags(options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
}): Record<string, string> {
  const defaultImage = `${BASE_URL}/og-image.jpg`;

  return {
    'title': options.title,
    'description': options.description,
    'keywords': options.keywords?.join(', ') || SEO_KEYWORDS.primary.join(', '),
    'robots': 'index, follow',
    'og:title': options.title,
    'og:description': options.description,
    'og:url': options.url,
    'og:image': options.image || defaultImage,
    'og:type': options.type || 'website',
    'twitter:title': options.title,
    'twitter:description': options.description,
    'twitter:image': options.image || defaultImage,
    'twitter:card': 'summary_large_image'
  };
}
