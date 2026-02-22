// =============================================================================
// MOBILE-SPECIFIC STRUCTURED DATA
// Mobile-First Indexing Optimizations for Google
// =============================================================================

import { testimonials } from '../data/testimonials';

const BASE_URL = 'https://realhouseiq.com';

/**
 * Inject schema graph into the document
 */
function injectSchemaGraph(schemas: object[], id: string): void {
  // Remove existing schema with same id
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas
  });
  document.head.appendChild(script);
}

/**
 * Generate MobileApplication schema for PWA
 * Enhances Google's understanding of the mobile app experience
 */
export function generateMobileApplicationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    '@id': `${BASE_URL}/#pwa`,
    'name': 'Real House - Luxury Real Estate Erbil',
    'alternateName': ['Real House App', 'Real House PWA'],
    'description': 'Browse luxury real estate in Erbil, Kurdistan on your mobile device. Find villas, apartments, penthouses, and investment properties. Save favorites, schedule viewings, and contact agents instantly.',
    'applicationCategory': 'BusinessApplication',
    'applicationSubCategory': 'Real Estate',
    'operatingSystem': 'iOS, Android, Web Browser',
    'browserRequirements': 'Requires JavaScript. Works best in modern browsers (Chrome, Safari, Firefox, Edge)',
    'softwareVersion': '2.0.0',
    'datePublished': '2024-01-01',
    'dateModified': new Date().toISOString().split('T')[0],
    'inLanguage': ['en', 'ar', 'ku'],
    'isAccessibleForFree': true,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': testimonials.length.toString(),
      'bestRating': '5',
      'worstRating': '1'
    },
    'screenshot': [
      {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/screenshots/home-mobile.png`,
        'caption': 'Real House mobile home screen'
      },
      {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/screenshots/properties-mobile.png`,
        'caption': 'Property listings on mobile'
      }
    ],
    'featureList': [
      'Browse luxury properties on-the-go',
      'Save favorite properties offline',
      'Click-to-call real estate agents',
      'Schedule property viewings',
      'Receive push notifications for new listings',
      'Virtual property tours',
      'Compare multiple properties',
      'Share listings via social media',
      'Offline access to saved properties',
      'Dark mode support'
    ],
    'permissions': 'Notifications (optional), Offline Storage',
    'installUrl': `${BASE_URL}/?source=pwa_install`,
    'downloadUrl': `${BASE_URL}`,
    'memoryRequirements': 'Minimal - Progressive Web App',
    'processorRequirements': 'Any modern device',
    'contentRating': 'Everyone',
    'creator': {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`
    }
  };
}

/**
 * Generate SpeakableSpecification for voice search optimization
 * Critical for mobile voice assistants (Siri, Google Assistant, Alexa)
 */
export function generateSpeakableSchema(page: 'home' | 'properties' | 'about' | 'contact' | 'property'): object {
  const speakableContent: Record<string, { summary: string; cssSelector: string[] }> = {
    home: {
      summary: 'Real House is the leading luxury real estate agency in Erbil, Kurdistan. We specialize in premium villas, apartments, penthouses, and commercial properties. Contact us at +964 750 792 2138.',
      cssSelector: ['.hero__headline', '.hero__subline', '.stats__item']
    },
    properties: {
      summary: 'Browse our extensive collection of luxury properties in Erbil. Filter by type, price, location, and features to find your perfect home in Kurdistan.',
      cssSelector: ['.properties-page__title', '.property-card__title', '.property-card__price']
    },
    about: {
      summary: 'Real House was founded with a mission to provide exceptional real estate services in Erbil, Kurdistan. Our team of expert agents has helped hundreds of families find their dream homes.',
      cssSelector: ['.about-page__story', '.about-page__mission']
    },
    contact: {
      summary: 'Contact Real House at +964 750 792 2138 or email info@realhouseiq.com. Visit us at Dream City, Erbil, Kurdistan. We are open Saturday through Thursday, 10 AM to 6 PM.',
      cssSelector: ['.contact-page__info', '.contact-page__address']
    },
    property: {
      summary: 'View property details including price, bedrooms, bathrooms, area, and amenities. Schedule a viewing or contact an agent for more information.',
      cssSelector: ['.property-detail__title', '.property-detail__price', '.property-detail__description']
    }
  };

  const content = speakableContent[page] || speakableContent.home;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/#${page}-speakable`,
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': content.cssSelector,
      'xpath': content.cssSelector.map(sel => `//*[contains(@class, '${sel.replace('.', '')}')]`)
    },
    'description': content.summary
  };
}

/**
 * Generate enhanced WebPage schema with mobile-specific properties
 */
export function generateMobileWebPageSchema(options: {
  title: string;
  description: string;
  url: string;
  type?: string;
  datePublished?: string;
  dateModified?: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': options.type || 'WebPage',
    '@id': `${options.url}#webpage`,
    'name': options.title,
    'description': options.description,
    'url': options.url,
    'inLanguage': 'en',
    'isPartOf': {
      '@id': `${BASE_URL}/#website`
    },
    'publisher': {
      '@id': `${BASE_URL}/#organization`
    },
    'potentialAction': [
      {
        '@type': 'ReadAction',
        'target': [options.url]
      },
      {
        '@type': 'CommunicateAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'tel:+9647507922138',
          'actionPlatform': [
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform'
          ]
        },
        'name': 'Call Real House'
      },
      {
        '@type': 'CommunicateAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://wa.me/9647507922138',
          'actionPlatform': [
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform'
          ]
        },
        'name': 'WhatsApp Real House'
      }
    ],
    'datePublished': options.datePublished || '2024-01-01',
    'dateModified': options.dateModified || new Date().toISOString().split('T')[0],
    'accessMode': ['textual', 'visual'],
    'accessModeSufficient': [
      { '@type': 'ItemList', 'itemListElement': ['textual'] },
      { '@type': 'ItemList', 'itemListElement': ['visual'] }
    ],
    'accessibilityFeature': [
      'alternativeText',
      'readingOrder',
      'structuralNavigation',
      'tableOfContents',
      'highContrastDisplay',
      'largePrint'
    ],
    'accessibilityHazard': 'none'
  };
}

/**
 * Generate click-to-call action schema for mobile
 */
export function generateClickToCallSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#click-to-call`,
    'name': 'Real House',
    'potentialAction': [
      {
        '@type': 'CommunicateAction',
        'name': 'Call Sales',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'tel:+9647507922138',
          'inLanguage': 'en',
          'actionPlatform': [
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform'
          ]
        }
      },
      {
        '@type': 'CommunicateAction',
        'name': 'WhatsApp Chat',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://wa.me/9647507922138?text=Hello, I am interested in your properties',
          'inLanguage': 'en',
          'actionPlatform': [
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform'
          ]
        }
      },
      {
        '@type': 'CommunicateAction',
        'name': 'Send Email',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'mailto:info@realhouseiq.com?subject=Property Inquiry',
          'inLanguage': 'en',
          'actionPlatform': [
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform',
            'http://schema.org/DesktopWebPlatform'
          ]
        }
      }
    ]
  };
}

/**
 * Generate touch-friendly action targets schema
 */
export function generateTouchActionSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#mobile-actions`,
    'name': 'Real House Mobile Actions',
    'potentialAction': [
      {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/properties?search={search_term_string}`,
          'actionPlatform': [
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform'
          ]
        },
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'ViewAction',
        'name': 'Browse Properties',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/properties`,
          'actionPlatform': [
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform'
          ]
        }
      },
      {
        '@type': 'ViewAction',
        'name': 'View Favorites',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/favorites`,
          'actionPlatform': [
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform'
          ]
        }
      }
    ]
  };
}

/**
 * Setup mobile-specific schemas for the current page
 */
export function setupMobileSchemas(page: 'home' | 'properties' | 'about' | 'contact' | 'property'): void {
  const schemas = [
    generateMobileApplicationSchema(),
    generateSpeakableSchema(page),
    generateClickToCallSchema(),
    generateTouchActionSchema()
  ];

  injectSchemaGraph(schemas, 'schema-mobile-specific');
}

/**
 * Initialize mobile schemas on page load
 */
export function initMobileSchemas(): void {
  // Detect current page
  const path = window.location.pathname;
  let page: 'home' | 'properties' | 'about' | 'contact' | 'property' = 'home';

  if (path.startsWith('/properties/')) {
    page = 'property';
  } else if (path === '/properties') {
    page = 'properties';
  } else if (path === '/about') {
    page = 'about';
  } else if (path === '/contact') {
    page = 'contact';
  }

  setupMobileSchemas(page);
}
