// ═══════════════════════════════════════════════════════════════════════════
// SEO Schema Generation Functions for Real House
// JSON-LD Structured Data for Search Engine Optimization
// ═══════════════════════════════════════════════════════════════════════════

import { properties, type Property } from '../data/properties';

const BASE_URL = 'https://realhouseiq.com';

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
}
