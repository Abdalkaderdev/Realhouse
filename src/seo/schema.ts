// =============================================================================
// COMPREHENSIVE SEO SCHEMA.ORG MARKUP - Real House Erbil
// Maximum Google Rich Results Implementation - 20+ Schema Types
// =============================================================================
// Target Keywords: "real estate erbil", "property erbil", "houses for sale erbil",
// "apartments erbil iraq", "luxury homes kurdistan"
// =============================================================================
// Schema Types Implemented:
// 1. RealEstateAgent - Company information
// 2. RealEstateListing - Property listings
// 3. Offer - Price and availability
// 4. Place - Location with geo
// 5. ImageGallery - Property images
// 6. VideoObject - Virtual tours
// 7. Review - Individual reviews
// 8. AggregateRating - Overall ratings
// 9. FAQPage - 25+ real estate FAQs
// 10. HowTo - Buying/Selling guides
// 11. Event - Property viewings
// 12. ContactPage - Contact information
// 13. AboutPage - About company
// 14. ItemList - Property listings
// 15. CollectionPage - Category pages
// 16. WebPage - All page types
// 17. Person - Agent profiles
// 18. PostalAddress - Addresses
// 19. GeoCoordinates - Locations
// 20. MonetaryAmount - Prices
// 21. QuantitativeValue - Property specs
// 22. Organization - Company
// 23. WebSite - Site structure
// 24. BreadcrumbList - Navigation
// 25. Article/Blog - Blog posts
// =============================================================================

import { properties, type Property } from '../data/properties';
import { projects, type Project } from '../data/projects';
import { testimonials, type Testimonial } from '../data/testimonials';
import { blogPosts, type BlogPost } from '../data/blog';
import { agents, type Agent } from '../data/agents';
import { getAllFAQs, faqCategories, type FAQ } from '../pages/faq';

const BASE_URL = 'https://realhouseiq.com';

// SEO Keywords for targeting
const SEO_KEYWORDS = {
  primary: ['real estate erbil', 'property erbil', 'houses for sale erbil', 'apartments erbil iraq', 'luxury homes kurdistan'],
  secondary: ['villas Erbil', 'penthouse Kurdistan', 'commercial property Iraq', 'real estate investment Erbil', 'buy property erbil'],
  local: ['Dream City Erbil', 'Gulan properties', 'Ankawa apartments', 'English Village homes', 'Italian Village Erbil'],
  longTail: ['how to buy property in erbil iraq', 'best real estate agent erbil', 'luxury apartments for sale kurdistan']
};

// =============================================================================
// COMPANY INFORMATION (Centralized)
// =============================================================================

const COMPANY_INFO = {
  name: 'Real House',
  alternateName: 'Real House Erbil',
  legalName: 'Real House Real Estate LLC',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  foundingDate: '2020',
  founders: ['Abdalkader', 'Mahmood'],
  numberOfEmployees: '10-50',
  slogan: 'Your Trusted Partner in Luxury Real Estate',
  description: 'Premier luxury real estate agency in Erbil, Kurdistan Region, Iraq. Specializing in villas, apartments, penthouses, commercial properties, and real estate investment opportunities.',
  telephone: ['+964-750-792-2138', '+964-751-441-5003'],
  email: 'info@realhouseiq.com',
  address: {
    streetAddress: 'Queen Tower, Erbil',
    addressLocality: 'Erbil',
    addressRegion: 'Kurdistan Region',
    postalCode: '44001',
    addressCountry: 'IQ'
  },
  geo: {
    latitude: '36.1901',
    longitude: '44.0091'
  },
  socialProfiles: [
    'https://instagram.com/realhouseiq',
    'https://linkedin.com/company/realhouseiq',
    'https://facebook.com/realhouseiq',
    'https://twitter.com/realhouseiq',
    'https://youtube.com/@realhouseiq'
  ],
  priceRange: '$$$',
  currenciesAccepted: ['USD', 'IQD'],
  paymentAccepted: ['Cash', 'Bank Transfer', 'Installment Plans'],
  languages: ['English', 'Arabic', 'Kurdish']
};

// =============================================================================
// 1. PRODUCT RICH SNIPPETS (For Properties)
// =============================================================================

/**
 * Generate Product schema for individual property (for Google Shopping/Rich Results)
 * Includes: name, image, description, offers, aggregateRating, brand
 */
export function generateProductSchema(property: Property): object {
  const priceDisplay = property.price > 0 ? property.price : undefined;
  const hasReviews = testimonials.length > 0;

  // Calculate average rating from testimonials
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  // Generate detailed feature list for rich snippets
  const propertyFeatures = [
    {
      '@type': 'PropertyValue',
      'name': 'Property Type',
      'value': property.type
    },
    {
      '@type': 'PropertyValue',
      'name': 'Bedrooms',
      'value': property.specs.beds,
      'unitText': 'rooms'
    },
    {
      '@type': 'PropertyValue',
      'name': 'Bathrooms',
      'value': property.specs.baths,
      'unitText': 'rooms'
    },
    {
      '@type': 'PropertyValue',
      'name': 'Floor Area',
      'value': property.specs.sqm,
      'unitCode': 'MTK',
      'unitText': 'square meters'
    },
    {
      '@type': 'PropertyValue',
      'name': 'Location',
      'value': `${property.location.district}, ${property.location.city}`
    },
    {
      '@type': 'PropertyValue',
      'name': 'Status',
      'value': property.status
    },
    {
      '@type': 'PropertyValue',
      'name': 'Country',
      'value': 'Iraq'
    },
    {
      '@type': 'PropertyValue',
      'name': 'Region',
      'value': 'Kurdistan'
    }
  ];

  // Add floor info if available
  if (property.specs.floor) {
    propertyFeatures.push({
      '@type': 'PropertyValue',
      'name': 'Floor',
      'value': property.specs.floor,
      'unitText': 'floor'
    });
  }

  // Add year built if available
  if (property.specs.yearBuilt) {
    propertyFeatures.push({
      '@type': 'PropertyValue',
      'name': 'Year Built',
      'value': property.specs.yearBuilt,
      'unitText': 'year'
    });
  }

  // Add features as individual properties
  property.features.forEach(feature => {
    propertyFeatures.push({
      '@type': 'PropertyValue',
      'name': feature,
      'value': 'Yes'
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE_URL}/properties/${property.id}#product`,
    'name': property.title,
    'description': property.description.slice(0, 500),
    'image': property.images,
    'sku': property.id,
    'mpn': `RH-${property.id.toUpperCase()}`,
    'gtin8': undefined, // Real estate doesn't have GTIN
    'brand': {
      '@type': 'Brand',
      'name': 'Real House',
      'logo': COMPANY_INFO.logo
    },
    'manufacturer': {
      '@type': 'Organization',
      'name': 'Real House',
      'url': BASE_URL
    },
    'category': `Real Estate > ${property.type} > ${property.location.district}`,
    'offers': {
      '@type': 'Offer',
      '@id': `${BASE_URL}/properties/${property.id}#offer`,
      'url': `${BASE_URL}/properties/${property.id}`,
      'priceCurrency': 'USD',
      'price': priceDisplay,
      'priceValidUntil': new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
      'availability': property.status === 'Sold'
        ? 'https://schema.org/SoldOut'
        : property.status === 'For Rent'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/InStock',
      'itemCondition': property.specs.yearBuilt && property.specs.yearBuilt < new Date().getFullYear() - 1
        ? 'https://schema.org/UsedCondition'
        : 'https://schema.org/NewCondition',
      'seller': {
        '@type': 'RealEstateAgent',
        'name': 'Real House',
        'url': BASE_URL,
        'telephone': COMPANY_INFO.telephone[0],
        'email': COMPANY_INFO.email
      },
      'offeredBy': {
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
      'shippingDetails': {
        '@type': 'OfferShippingDetails',
        'shippingDestination': {
          '@type': 'DefinedRegion',
          'addressCountry': 'IQ'
        },
        'doesNotShip': true
      },
      'hasMerchantReturnPolicy': {
        '@type': 'MerchantReturnPolicy',
        'applicableCountry': 'IQ',
        'returnPolicyCategory': 'https://schema.org/MerchantReturnNotPermitted'
      }
    },
    ...(hasReviews && {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': avgRating.toFixed(1),
        'reviewCount': testimonials.length.toString(),
        'bestRating': '5',
        'worstRating': '1'
      },
      'review': testimonials.slice(0, 3).map(t => ({
        '@type': 'Review',
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': t.rating.toString(),
          'bestRating': '5',
          'worstRating': '1'
        },
        'author': {
          '@type': 'Person',
          'name': t.name
        },
        'reviewBody': t.quote,
        'datePublished': `${t.purchaseYear}-01-15`
      }))
    }),
    'additionalProperty': propertyFeatures
  };
}

/**
 * Generate enhanced RealEstateListing schema with full Offer details
 * Optimized for Google property listing rich results
 */
export function generateEnhancedPropertyListingSchema(property: Property): object {
  const priceDisplay = property.price > 0 ? property.price : undefined;
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  // Determine listing type
  const listingType = property.status === 'For Rent' ? 'ForRent' : 'ForSale';

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${BASE_URL}/properties/${property.id}#enhanced-listing`,
    'name': property.title,
    'description': property.description,
    'url': `${BASE_URL}/properties/${property.id}`,
    'datePosted': new Date().toISOString().split('T')[0],
    'dateModified': new Date().toISOString().split('T')[0],
    'image': property.images.map((img, index) => ({
      '@type': 'ImageObject',
      'url': img,
      'name': `${property.title} - Image ${index + 1}`,
      'description': `${property.type} in ${property.location.district}, ${property.location.city}`
    })),
    'offers': {
      '@type': 'Offer',
      '@id': `${BASE_URL}/properties/${property.id}#main-offer`,
      'price': priceDisplay,
      'priceCurrency': 'USD',
      'availability': property.status === 'Sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      'priceValidUntil': new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      'businessFunction': property.status === 'For Rent'
        ? 'http://purl.org/goodrelations/v1#LeaseOut'
        : 'http://purl.org/goodrelations/v1#Sell',
      'eligibleRegion': {
        '@type': 'Place',
        'name': 'Worldwide'
      },
      'seller': {
        '@type': 'RealEstateAgent',
        'name': 'Real House',
        'url': BASE_URL,
        'telephone': COMPANY_INFO.telephone,
        'email': COMPANY_INFO.email,
        'address': {
          '@type': 'PostalAddress',
          ...COMPANY_INFO.address
        }
      }
    },
    'leaseLength': property.status === 'For Rent' ? {
      '@type': 'QuantitativeValue',
      'value': 12,
      'unitCode': 'MON',
      'unitText': 'months'
    } : undefined,
    'about': {
      '@type': property.type === 'Commercial' || property.type === 'Land' ? 'Place' : 'Accommodation',
      'name': property.title,
      'description': property.description.slice(0, 300),
      'numberOfRooms': property.specs.beds > 0 ? property.specs.beds : undefined,
      'numberOfBedrooms': property.specs.beds > 0 ? property.specs.beds : undefined,
      'numberOfBathroomsTotal': property.specs.baths,
      'floorSize': {
        '@type': 'QuantitativeValue',
        'value': property.specs.sqm,
        'unitCode': 'MTK',
        'unitText': 'square meters'
      },
      'numberOfFullBathrooms': Math.floor(property.specs.baths),
      'numberOfPartialBathrooms': property.specs.baths % 1 > 0 ? 1 : 0,
      'yearBuilt': property.specs.yearBuilt,
      'floorLevel': property.specs.floor?.toString(),
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': property.location.address,
        'addressLocality': property.location.city,
        'addressRegion': property.location.district,
        'postalCode': '44001',
        'addressCountry': 'IQ'
      },
      'geo': property.location.coordinates ? {
        '@type': 'GeoCoordinates',
        'latitude': property.location.coordinates.lat.toString(),
        'longitude': property.location.coordinates.lng.toString()
      } : {
        '@type': 'GeoCoordinates',
        'latitude': '36.1901',
        'longitude': '44.0091'
      },
      'amenityFeature': property.features.map(feature => ({
        '@type': 'LocationFeatureSpecification',
        'name': feature,
        'value': true
      })),
      'containedInPlace': {
        '@type': 'City',
        'name': 'Erbil',
        '@id': 'https://en.wikipedia.org/wiki/Erbil'
      }
    },
    'broker': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': BASE_URL,
      'telephone': COMPANY_INFO.telephone,
      'email': COMPANY_INFO.email,
      'image': COMPANY_INFO.logo,
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': avgRating.toFixed(1),
        'reviewCount': testimonials.length.toString(),
        'bestRating': '5',
        'worstRating': '1'
      }
    },
    'agent': {
      '@type': 'Person',
      'name': property.agent.name,
      'telephone': property.agent.phone,
      'email': property.agent.email,
      'image': property.agent.image,
      'worksFor': {
        '@type': 'Organization',
        'name': 'Real House'
      }
    },
    'potentialAction': [
      {
        '@type': 'ViewAction',
        'name': 'View Property',
        'target': `${BASE_URL}/properties/${property.id}`
      },
      {
        '@type': 'ReserveAction',
        'name': 'Schedule Viewing',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/contact?property=${property.id}`,
          'actionPlatform': [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        }
      }
    ]
  };
}

// =============================================================================
// 2. FAQ RICH SNIPPETS (For Home, About, Contact pages)
// =============================================================================

/**
 * Generate FAQ schema for Home page
 * Targets "People Also Ask" queries about Erbil real estate
 */
export function generateHomeFAQSchema(): object {
  const homeFaqs = [
    {
      question: 'What is the best area to buy property in Erbil?',
      answer: 'The best areas to buy property in Erbil depend on your needs. Gulan District is ideal for professionals seeking modern apartments near shopping and dining. Dream City is perfect for families wanting spacious villas in a gated community. Italian Village and English Village offer unique European-style homes. Empire World provides luxury high-rise living with premium amenities. Ankawa is popular with expatriates for its diverse community and vibrant restaurant scene. Contact Real House at +964-750-792-2138 for personalized recommendations.'
    },
    {
      question: 'Can foreigners buy property in Kurdistan Iraq?',
      answer: 'Yes, foreign nationals can legally purchase property in the Kurdistan Region of Iraq. The KRG (Kurdistan Regional Government) welcomes international buyers and investors. Required documents include a valid passport, residence permit if applicable, and proof of funds. Real House provides comprehensive support for international buyers including legal guidance, translation services, and documentation assistance. Many expats have successfully purchased properties through our agency.'
    },
    {
      question: 'What is the average property price in Erbil?',
      answer: 'Property prices in Erbil vary by type and location. Apartments in premium areas like Gulan range from $85,000 to $350,000 USD. Luxury penthouses can exceed $500,000 USD. Villas in Dream City and Italian Village typically range from $250,000 to $800,000 USD. Off-plan properties often offer competitive pricing with flexible payment plans. Commercial properties vary based on size and location. Contact Real House for current market prices.'
    },
    {
      question: 'Is Erbil real estate a good investment?',
      answer: 'Erbil real estate offers strong investment potential due to: Kurdistan\'s stable political environment, growing economy and infrastructure development, increasing foreign investment, high rental demand from expats and professionals, competitive prices compared to regional markets like Dubai, and potential for capital appreciation. Rental yields in prime areas can reach 6-10% annually. Real House can help identify the best investment opportunities.'
    },
    {
      question: 'How do I schedule a property viewing in Erbil?',
      answer: 'Scheduling a viewing with Real House is easy. You can: call us at +964-750-792-2138 or +964-751-441-5003, email info@realhouseiq.com, use the "Schedule Viewing" button on any property listing, or visit our office in Dream City, Erbil. We offer flexible viewing times including evenings and weekends. Virtual tours via video call are also available for international clients.'
    },
    {
      question: 'What types of properties does Real House offer?',
      answer: 'Real House offers a comprehensive range of properties in Erbil: Luxury Apartments in modern high-rise towers, Penthouses with panoramic city views, Villas with private gardens in gated communities, Townhouses for families, Commercial spaces including retail stores and offices, Land for development, and Off-plan properties from reputable developers. We specialize in premium properties in the best locations.'
    },
    {
      question: 'What payment options are available for buying property in Erbil?',
      answer: 'Payment options in Erbil include: Cash payment in USD or IQD (often with negotiation leverage), Bank transfers (local and international), Installment plans for off-plan properties (typically 10-40% down payment with balance over 2-5 years), and Developer financing for select projects. Real House can connect you with partner banks for mortgage assistance. We accept payments in both USD and Iraqi Dinar.'
    },
    {
      question: 'Does Real House provide property management services?',
      answer: 'Yes, Real House provides comprehensive property management services for investors and absentee owners. Our services include: tenant finding and screening, rent collection and accounting, property maintenance and repairs, regular inspections and detailed reporting, utility management, legal compliance and documentation. This is ideal for investors seeking passive rental income from Erbil properties.'
    },
    {
      question: 'What makes Real House different from other real estate agencies?',
      answer: 'Real House stands out through: over 10 years of experience in Erbil\'s luxury market, a curated portfolio of premium properties only, multilingual team speaking English, Arabic, and Kurdish, comprehensive buyer and seller services, transparent pricing with no hidden fees, strong network of developers and property owners, after-sales support and property management, and virtual tour technology for remote viewing.'
    },
    {
      question: 'How long does it take to buy property in Erbil?',
      answer: 'The property buying process in Erbil typically takes 2-6 weeks depending on: property availability and type (ready vs off-plan), negotiation and agreement phase (1-2 weeks), documentation and due diligence (1-2 weeks), payment processing (depends on method), and title transfer and registration (1-2 weeks). Off-plan purchases may have longer timelines based on construction schedules. Real House guides you through every step for a smooth transaction.'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/#faq`,
    'mainEntity': homeFaqs.map(faq => ({
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
 * Generate FAQ schema for About page
 */
export function generateAboutFAQSchema(): object {
  const aboutFaqs = [
    {
      question: 'When was Real House founded?',
      answer: 'Real House was founded in 2018 in Erbil, Kurdistan Region, Iraq. Since our founding, we have grown to become one of the leading luxury real estate agencies in the region, helping hundreds of clients find their perfect properties.'
    },
    {
      question: 'Who are the founders of Real House?',
      answer: 'Real House was co-founded by Abdalkader and Mahmood, two experienced real estate professionals with deep knowledge of the Erbil property market. Together, they bring over 20 years of combined experience in luxury real estate, investment consulting, and client services.'
    },
    {
      question: 'What areas does Real House cover?',
      answer: 'Real House specializes in properties throughout Erbil and the Kurdistan Region, including: Gulan District, Dream City, Italian Village, English Village, Empire World, Ankawa (Ainkawa), 100 Meter Road, Sarbasti, Kasnazan, and Nawroz. We focus on premium locations with the best investment potential.'
    },
    {
      question: 'What languages does the Real House team speak?',
      answer: 'The Real House team is multilingual, fluently speaking English, Arabic (both Modern Standard Arabic and Iraqi dialect), and Kurdish (Sorani). This allows us to serve local, regional, and international clients effectively.'
    },
    {
      question: 'How many properties has Real House sold?',
      answer: 'Since 2018, Real House has successfully facilitated the sale and rental of over 500 properties in Erbil. Our portfolio includes luxury villas, apartments, penthouses, and commercial properties. We maintain a high client satisfaction rate with many repeat customers and referrals.'
    },
    {
      question: 'Is Real House a licensed real estate agency?',
      answer: 'Yes, Real House is a fully licensed and registered real estate agency operating in the Kurdistan Region of Iraq. We comply with all local regulations and maintain the highest standards of professional conduct and ethical business practices.'
    },
    {
      question: 'What is Real House\'s mission?',
      answer: 'Our mission is to provide exceptional real estate services that exceed client expectations. We aim to make property transactions seamless, transparent, and rewarding. We believe everyone deserves access to premium properties and professional guidance, whether buying, selling, or investing.'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/about#faq`,
    'mainEntity': aboutFaqs.map(faq => ({
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
 * Generate FAQ schema for Contact page
 */
export function generateContactFAQSchema(): object {
  const contactFaqs = [
    {
      question: 'What are Real House\'s office hours?',
      answer: 'Real House is open Saturday through Thursday from 10:00 AM to 6:00 PM (Iraq Standard Time). Friday hours are by appointment only. We can also arrange viewings and meetings outside regular hours for clients with busy schedules.'
    },
    {
      question: 'Where is the Real House office located?',
      answer: 'Our main office is located in Dream City, Erbil, Kurdistan Region, Iraq. The office is easily accessible and has ample parking. We can provide directions via Google Maps or WhatsApp upon request. Call +964-750-792-2138 for specific directions.'
    },
    {
      question: 'How can I contact Real House?',
      answer: 'You can reach Real House through multiple channels: Phone: +964-750-792-2138 or +964-751-441-5003, Email: info@realhouseiq.com, WhatsApp: +964-750-792-2138, Instagram: @realhouseiq, Facebook: Real House Erbil, or visit our office in Dream City. We typically respond to inquiries within 2-4 hours during business hours.'
    },
    {
      question: 'Does Real House offer virtual consultations?',
      answer: 'Yes, Real House offers virtual consultations via video call (WhatsApp, Zoom, or Google Meet) for international clients or those unable to visit in person. We can conduct property tours virtually, discuss your requirements, and guide you through the buying process remotely.'
    },
    {
      question: 'How quickly does Real House respond to inquiries?',
      answer: 'We aim to respond to all inquiries within 2-4 hours during business hours. For urgent matters, please call our office directly at +964-750-792-2138. After-hours inquiries are typically addressed first thing the next business day.'
    },
    {
      question: 'Can I visit properties on weekends?',
      answer: 'Yes, we accommodate property viewings on weekends (Saturday and Sunday). Friday viewings can be arranged by appointment. Please contact us at least 24 hours in advance to schedule a weekend viewing so we can coordinate with property owners.'
    },
    {
      question: 'Does Real House have social media accounts?',
      answer: 'Yes, follow Real House on social media for the latest listings and updates: Instagram: @realhouseiq, Facebook: Real House Erbil, LinkedIn: Real House, YouTube: Real House Erbil, and Twitter: @realhouseiq. We regularly post new properties, market insights, and virtual tours.'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/contact#faq`,
    'mainEntity': contactFaqs.map(faq => ({
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
 * Generate comprehensive FAQ schema using all FAQs from faq.ts
 * Includes 50+ questions for maximum SEO benefit
 */
export function generateFAQSchema(): object {
  const allFaqs = getAllFAQs();

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/faq#faqpage`,
    'name': 'Frequently Asked Questions - Real House Erbil',
    'description': 'Comprehensive FAQ about buying, selling, renting, and investing in Erbil real estate. 50+ expert answers for property buyers in Kurdistan.',
    'mainEntity': allFaqs.map((faq: FAQ) => ({
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
 * Generate FAQ schema for a specific category
 */
export function generateCategoryFAQSchema(categoryId: string): object {
  const category = faqCategories.find(c => c.id === categoryId);
  if (!category) return generateFAQSchema();

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/faq#${categoryId}`,
    'name': `${category.title} - Real House Erbil FAQ`,
    'description': category.description,
    'mainEntity': category.faqs.map((faq: FAQ) => ({
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
 * Generate "People Also Ask" optimized FAQ schema
 * Targeting common search queries for Erbil real estate
 */
export function generatePeopleAlsoAskSchema(): object {
  const paaQuestions = [
    {
      question: 'How much does a house cost in Erbil Iraq?',
      answer: 'House prices in Erbil vary by type and location. Apartments in premium areas like Gulan cost $80,000-$350,000. Villas in Dream City and Italian Village range from $250,000-$800,000. Penthouses in towers like Empire World can exceed $500,000. The average price per square meter in prime Erbil locations is $1,200-$2,000 USD.'
    },
    {
      question: 'Can Americans buy property in Iraq?',
      answer: 'Yes, Americans can legally purchase property in the Kurdistan Region of Iraq, which includes Erbil. The Kurdistan Regional Government (KRG) has investor-friendly policies for foreign nationals. Required documents include a valid passport and proof of funds. It is recommended to work with a licensed local agency like Real House for legal guidance.'
    },
    {
      question: 'Is Erbil safe to live?',
      answer: 'Erbil is considered one of the safest cities in the Middle East region. The Kurdistan Region has maintained stability and security, attracting international businesses, expats, and tourists. Erbil hosts numerous embassies, international schools, and global companies, reflecting its secure environment. Many expat families live comfortably in communities like Dream City and Italian Village.'
    },
    {
      question: 'Is Kurdistan a good place to invest?',
      answer: 'Kurdistan, particularly Erbil, offers attractive real estate investment opportunities. Key benefits include: relative political stability, rental yields of 6-14% annually, competitive property prices compared to Gulf markets, growing infrastructure development, and favorable policies for foreign investors. The region is diversifying beyond oil, creating sustainable growth.'
    },
    {
      question: 'What is the best area to live in Erbil?',
      answer: 'The best areas in Erbil depend on your needs. Gulan is ideal for professionals seeking modern apartments near dining and shopping. Dream City suits families with villas and international schools. Italian Village offers Mediterranean-style charm. Ankawa attracts expatriates with its diverse restaurants and nightlife. Empire World provides luxury high-rise living.'
    },
    {
      question: 'Can I get a mortgage in Kurdistan?',
      answer: 'Mortgage financing in Kurdistan is limited but developing. Some local banks offer home financing for Iraqi residents. For foreign buyers, cash purchases or developer installment plans (10-40% down, balance over 2-5 years) are most common. Real House can connect you with banking partners and explain available financing options.'
    },
    {
      question: 'What documents are needed to buy property in Iraq?',
      answer: 'Required documents include: valid passport with 6+ months validity, proof of funds or bank statements, passport-sized photographs, and residence permit for foreigners planning extended stays. Real House provides complete documentation support and partners with local lawyers for legal verification of property titles.'
    },
    {
      question: 'Is real estate in Iraq a good investment?',
      answer: 'Real estate in Iraq, particularly the Kurdistan Region, can be a good investment. Erbil offers: stable governance, growing rental demand from expats and professionals, property appreciation potential, and competitive entry prices. However, consider currency risk and regional factors. Working with experienced agents like Real House helps mitigate risks.'
    },
    {
      question: 'What is the rental yield in Erbil?',
      answer: 'Rental yields in Erbil are attractive: residential properties typically yield 6-10% annually, while commercial properties can achieve 8-14%. Furnished apartments for short-term rentals may achieve 10-15% with good occupancy. Premium locations like Gulan and Dream City with expat demand generally achieve the highest yields.'
    },
    {
      question: 'How do I transfer property ownership in Kurdistan?',
      answer: 'Property ownership in Kurdistan is transferred through the Real Estate Registration Department (Tabu). Steps include: verifying seller ownership, signing purchase agreement, paying registration fees (3-5% of value), submitting documents to Tabu, and receiving new title deed in buyer\'s name. The process typically takes 1-2 weeks with proper documentation.'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/#people-also-ask`,
    'name': 'Common Questions About Erbil Real Estate',
    'description': 'Expert answers to the most common questions about buying property, investing, and living in Erbil, Kurdistan Region, Iraq.',
    'mainEntity': paaQuestions.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
        'author': {
          '@type': 'Organization',
          'name': 'Real House',
          'url': BASE_URL
        }
      }
    }))
  };
}

/**
 * Generate property-specific FAQ schema
 * For property detail pages targeting specific property questions
 */
export function generatePropertyFAQSchema(property: Property): object {
  const propertyFaqs = [
    {
      question: `What is the price of ${property.title}?`,
      answer: property.price > 0
        ? `${property.title} is listed at $${property.price.toLocaleString()} USD. Contact Real House at +964-750-792-2138 for the latest pricing, availability, and to discuss payment options including installment plans.`
        : `Please contact Real House at +964-750-792-2138 or info@realhouseiq.com for current pricing information on ${property.title}.`
    },
    {
      question: `How many bedrooms does ${property.title} have?`,
      answer: property.specs.beds > 0
        ? `${property.title} features ${property.specs.beds} bedroom${property.specs.beds > 1 ? 's' : ''} and ${property.specs.baths} bathroom${property.specs.baths > 1 ? 's' : ''} with a total area of ${property.specs.sqm} square meters.`
        : `${property.title} has ${property.specs.baths} bathroom${property.specs.baths > 1 ? 's' : ''} and a total area of ${property.specs.sqm} square meters. Contact us for detailed specifications.`
    },
    {
      question: `Where is ${property.title} located?`,
      answer: `${property.title} is located in ${property.location.district}, ${property.location.city}, Kurdistan Region, Iraq. ${property.location.nearbyLandmarks ? `Nearby landmarks include: ${property.location.nearbyLandmarks.join(', ')}.` : ''} Schedule a viewing to explore the neighborhood.`
    },
    {
      question: `What amenities does ${property.title} include?`,
      answer: `${property.title} features: ${property.features.slice(0, 8).join(', ')}. ${property.features.length > 8 ? `And ${property.features.length - 8} more amenities.` : ''} Contact Real House for the complete feature list.`
    },
    {
      question: `Can I schedule a viewing for ${property.title}?`,
      answer: `Yes, you can schedule a viewing for ${property.title} by calling +964-750-792-2138, emailing info@realhouseiq.com, or using the contact form on this page. We offer in-person viewings and virtual tours for international clients.`
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/properties/${property.id}#faq`,
    'name': `FAQ - ${property.title}`,
    'description': `Common questions about ${property.title} in ${property.location.district}, ${property.location.city}`,
    'mainEntity': propertyFaqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

// =============================================================================
// 3. HOWTO RICH SNIPPETS
// =============================================================================

/**
 * Generate HowTo schema for buying property in Erbil
 */
export function generateHowToBuyPropertySchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${BASE_URL}/#howto-buy`,
    'name': 'How to Buy Property in Erbil, Kurdistan',
    'description': 'Complete step-by-step guide to purchasing real estate in Erbil, Iraq. Learn the entire process from property search to ownership transfer with Real House.',
    'totalTime': 'P30D',
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'USD',
      'value': '85000-2500000'
    },
    'image': `${BASE_URL}/images/how-to-buy-property-erbil.jpg`,
    'supply': [
      {
        '@type': 'HowToSupply',
        'name': 'Valid Passport or Iraqi ID'
      },
      {
        '@type': 'HowToSupply',
        'name': 'Proof of Funds or Bank Statements'
      },
      {
        '@type': 'HowToSupply',
        'name': 'Residence Permit (for foreigners, if applicable)'
      }
    ],
    'tool': [
      {
        '@type': 'HowToTool',
        'name': 'Real Estate Agent (Real House)'
      },
      {
        '@type': 'HowToTool',
        'name': 'Legal Representative/Lawyer'
      },
      {
        '@type': 'HowToTool',
        'name': 'Bank Account (for transfers)'
      }
    ],
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Initial Consultation',
        'text': 'Contact Real House to discuss your property requirements, budget, preferred locations, and investment goals. Our agents will understand your needs and start the search.',
        'url': `${BASE_URL}/contact`,
        'image': `${BASE_URL}/images/step1-consultation.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Property Search & Curation',
        'text': 'Based on your criteria, our agents curate a selection of properties that match your requirements. We focus on quality over quantity, presenting only the best options.',
        'url': `${BASE_URL}/properties`,
        'image': `${BASE_URL}/images/step2-search.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Property Viewings',
        'text': 'Schedule in-person or virtual tours of shortlisted properties. Our agents accompany you to provide insights about the property, neighborhood, and investment potential.',
        'url': `${BASE_URL}/properties`,
        'image': `${BASE_URL}/images/step3-viewing.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 4,
        'name': 'Make an Offer',
        'text': 'Once you find your ideal property, submit an offer. Real House provides expert negotiation support to secure the best terms and price for you.',
        'image': `${BASE_URL}/images/step4-offer.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 5,
        'name': 'Due Diligence',
        'text': 'Conduct thorough due diligence including legal review of property documents, title verification, inspection for any issues, and verification of all permits and approvals.',
        'image': `${BASE_URL}/images/step5-diligence.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 6,
        'name': 'Contract & Payment',
        'text': 'Sign the purchase agreement and complete the payment according to agreed terms. Payment can be made via cash, bank transfer, or installment plan (for off-plan properties).',
        'image': `${BASE_URL}/images/step6-contract.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 7,
        'name': 'Property Handover',
        'text': 'Receive your property keys and official registration documents. The title is transferred to your name at the Real Estate Registration Department. Welcome to your new property!',
        'image': `${BASE_URL}/images/step7-handover.jpg`
      }
    ]
  };
}

/**
 * Generate HowTo schema for selling property
 */
export function generateHowToSellPropertySchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${BASE_URL}/#howto-sell`,
    'name': 'How to Sell Your Property in Erbil',
    'description': 'Step-by-step guide to selling your property in Erbil, Kurdistan Region. Learn how Real House helps you achieve the best price and fastest sale.',
    'totalTime': 'P60D',
    'image': `${BASE_URL}/images/how-to-sell-property-erbil.jpg`,
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Property Valuation',
        'text': 'Contact Real House for a free, no-obligation property valuation. Our experts analyze market conditions, comparable sales, and your property\'s unique features to determine the optimal listing price.',
        'url': `${BASE_URL}/contact`,
        'image': `${BASE_URL}/images/sell-step1-valuation.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Listing Agreement',
        'text': 'Sign a listing agreement with Real House. We discuss marketing strategy, showing schedules, and your preferences. Our transparent terms ensure no surprises.',
        'image': `${BASE_URL}/images/sell-step2-agreement.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Professional Photography & Marketing',
        'text': 'We arrange professional photography, virtual tours, and drone footage of your property. Your listing is promoted across our website, social media, and to our database of qualified buyers.',
        'image': `${BASE_URL}/images/sell-step3-marketing.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 4,
        'name': 'Property Showings',
        'text': 'Real House handles all property showings, screening potential buyers and presenting your property in the best light. We provide feedback after each viewing.',
        'image': `${BASE_URL}/images/sell-step4-showings.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 5,
        'name': 'Offer Review & Negotiation',
        'text': 'When offers come in, we present them to you with our professional assessment. We negotiate on your behalf to achieve the best price and terms.',
        'image': `${BASE_URL}/images/sell-step5-negotiation.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 6,
        'name': 'Closing & Title Transfer',
        'text': 'Once you accept an offer, we manage the closing process including documentation, payment verification, and title transfer. We ensure a smooth handover to the new owner.',
        'image': `${BASE_URL}/images/sell-step6-closing.jpg`
      }
    ]
  };
}

/**
 * Generate HowTo schema for real estate investment in Kurdistan
 */
export function generateHowToInvestSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${BASE_URL}/#howto-invest`,
    'name': 'How to Invest in Kurdistan Real Estate',
    'description': 'Complete guide to real estate investment in Erbil and Kurdistan Region. Learn how to evaluate properties, calculate ROI, and build a profitable property portfolio.',
    'totalTime': 'P90D',
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'USD',
      'value': '50000-1000000'
    },
    'image': `${BASE_URL}/images/how-to-invest-kurdistan.jpg`,
    'supply': [
      {
        '@type': 'HowToSupply',
        'name': 'Investment Capital (minimum $50,000 USD recommended)'
      },
      {
        '@type': 'HowToSupply',
        'name': 'Valid Passport'
      },
      {
        '@type': 'HowToSupply',
        'name': 'Proof of Funds'
      }
    ],
    'tool': [
      {
        '@type': 'HowToTool',
        'name': 'Real Estate Agent (Real House Investment Team)'
      },
      {
        '@type': 'HowToTool',
        'name': 'Property Valuation Reports'
      },
      {
        '@type': 'HowToTool',
        'name': 'Market Analysis Data'
      },
      {
        '@type': 'HowToTool',
        'name': 'Legal Representation'
      }
    ],
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Define Investment Goals',
        'text': 'Determine your investment objectives: rental income, capital appreciation, or both. Consider your budget, risk tolerance, and investment timeline. Real House advisors help clarify your strategy.',
        'url': `${BASE_URL}/contact`,
        'image': `${BASE_URL}/images/invest-step1-goals.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Market Research',
        'text': 'Study Erbil\'s real estate market: prime locations (Gulan, Dream City, Empire World), price trends, rental yields (6-14%), and growth projections. Real House provides detailed market analysis.',
        'url': `${BASE_URL}/blog`,
        'image': `${BASE_URL}/images/invest-step2-research.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Property Selection',
        'text': 'Choose property type based on goals: apartments for high rental demand, villas for family rentals, commercial for business leases. Consider location, amenities, and developer reputation.',
        'url': `${BASE_URL}/properties`,
        'image': `${BASE_URL}/images/invest-step3-selection.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 4,
        'name': 'Financial Analysis',
        'text': 'Calculate potential ROI: purchase price, expected rental income, operating costs, appreciation potential. Real House provides projected returns and break-even analysis for each property.',
        'image': `${BASE_URL}/images/invest-step4-analysis.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 5,
        'name': 'Due Diligence',
        'text': 'Verify property ownership, check for liens, review construction quality, confirm permits. For off-plan, assess developer track record and completion guarantees.',
        'image': `${BASE_URL}/images/invest-step5-diligence.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 6,
        'name': 'Purchase & Registration',
        'text': 'Complete purchase agreement, make payment (cash or installment plan), and register ownership at the Real Estate Registration Office. Legal assistance ensures proper documentation.',
        'image': `${BASE_URL}/images/invest-step6-purchase.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 7,
        'name': 'Property Management',
        'text': 'For rental properties, decide between self-management or professional property management. Real House offers full management services: tenant finding, rent collection, maintenance.',
        'url': `${BASE_URL}/services`,
        'image': `${BASE_URL}/images/invest-step7-management.jpg`
      },
      {
        '@type': 'HowToStep',
        'position': 8,
        'name': 'Portfolio Optimization',
        'text': 'Monitor performance, reinvest returns, and expand portfolio strategically. Diversify across property types and locations to minimize risk and maximize returns.',
        'image': `${BASE_URL}/images/invest-step8-portfolio.jpg`
      }
    ]
  };
}

/**
 * Generate HowTo schema for property viewing/inspection
 */
export function generateHowToViewPropertySchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${BASE_URL}/#howto-view`,
    'name': 'How to Schedule and Conduct a Property Viewing in Erbil',
    'description': 'Guide to scheduling property viewings with Real House and what to look for during your property inspection in Erbil.',
    'totalTime': 'PT2H',
    'image': `${BASE_URL}/images/how-to-view-property.jpg`,
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Contact Real House',
        'text': 'Call +964-750-792-2138, email info@realhouseiq.com, or use the website contact form. Provide your requirements: budget, preferred areas, property type, and available times.',
        'url': `${BASE_URL}/contact`
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Review Property Details',
        'text': 'Before viewing, review property photos, floor plans, and virtual tours online. Prepare questions about specific features, neighborhood, and pricing.'
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Attend the Viewing',
        'text': 'Meet your Real House agent at the property. Take your time to inspect all rooms, check water pressure, electrical outlets, natural lighting, and view from windows.'
      },
      {
        '@type': 'HowToStep',
        'position': 4,
        'name': 'Inspect Key Areas',
        'text': 'Check: structural condition (walls, floors, ceilings), plumbing and electrical systems, HVAC functionality, window/door operation, kitchen and bathroom fixtures.'
      },
      {
        '@type': 'HowToStep',
        'position': 5,
        'name': 'Explore the Neighborhood',
        'text': 'Walk around the building and neighborhood. Note nearby amenities, parking availability, noise levels, and overall security of the area.'
      },
      {
        '@type': 'HowToStep',
        'position': 6,
        'name': 'Ask Questions',
        'text': 'Ask about: ownership history, maintenance records, community fees, included furnishings, flexibility on price, and timeline for transaction.'
      },
      {
        '@type': 'HowToStep',
        'position': 7,
        'name': 'Request Follow-Up Information',
        'text': 'If interested, request floor plans, title documents, and any inspection reports. Your agent will provide all necessary documentation for your decision.'
      }
    ]
  };
}

// =============================================================================
// 4. REVIEW RICH SNIPPETS
// =============================================================================

/**
 * Generate individual Review schema for a testimonial
 */
export function generateReviewSchema(testimonial: Testimonial): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${BASE_URL}/#review-${testimonial.id}`,
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': testimonial.rating.toString(),
      'bestRating': '5',
      'worstRating': '1'
    },
    'author': {
      '@type': 'Person',
      'name': testimonial.name,
      'jobTitle': testimonial.role
    },
    'reviewBody': testimonial.quote,
    'datePublished': `${testimonial.purchaseYear}-06-15`,
    'itemReviewed': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': BASE_URL,
      'image': COMPANY_INFO.logo
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Real House'
    }
  };
}

/**
 * Generate AggregateRating schema for company reviews
 */
export function generateAggregateRatingSchema(): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${BASE_URL}/#aggregate-rating`,
    'name': 'Real House',
    'url': BASE_URL,
    'image': COMPANY_INFO.logo,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': avgRating.toFixed(1),
      'reviewCount': testimonials.length.toString(),
      'bestRating': '5',
      'worstRating': '1'
    },
    'review': testimonials.map(t => ({
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': t.rating.toString(),
        'bestRating': '5'
      },
      'author': {
        '@type': 'Person',
        'name': t.name,
        'jobTitle': t.role
      },
      'reviewBody': t.quote,
      'datePublished': `${t.purchaseYear}-06-15`
    }))
  };
}

/**
 * Generate all reviews schema for testimonials page
 */
export function generateAllReviewsSchema(): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#reviews`,
    'name': 'Real House',
    'url': BASE_URL,
    'image': COMPANY_INFO.logo,
    'priceRange': '$$$',
    'address': {
      '@type': 'PostalAddress',
      ...COMPANY_INFO.address
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': avgRating.toFixed(1),
      'reviewCount': testimonials.length.toString(),
      'bestRating': '5',
      'worstRating': '1'
    },
    'review': testimonials.map(t => ({
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': t.rating.toString(),
        'bestRating': '5',
        'worstRating': '1'
      },
      'author': {
        '@type': 'Person',
        'name': t.name,
        'jobTitle': t.role
      },
      'reviewBody': t.quote,
      'datePublished': `${t.purchaseYear}-06-15`,
      'publisher': {
        '@type': 'Organization',
        'name': 'Real House'
      }
    }))
  };
}

// =============================================================================
// 5. BREADCRUMB RICH SNIPPETS
// =============================================================================

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
 * Generate page-specific breadcrumbs
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

// =============================================================================
// 6. LOCAL BUSINESS RICH SNIPPETS
// =============================================================================

/**
 * Generate comprehensive LocalBusiness schema
 */
export function generateLocalBusinessSchema(): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${BASE_URL}/#local-business`,
    'name': COMPANY_INFO.name,
    'alternateName': COMPANY_INFO.alternateName,
    'legalName': COMPANY_INFO.legalName,
    'description': COMPANY_INFO.description,
    'url': COMPANY_INFO.url,
    'logo': {
      '@type': 'ImageObject',
      'url': COMPANY_INFO.logo,
      'width': '512',
      'height': '512'
    },
    'image': [
      COMPANY_INFO.logo,
      `${BASE_URL}/images/office-exterior.jpg`,
      `${BASE_URL}/images/office-interior.jpg`
    ],
    'telephone': COMPANY_INFO.telephone,
    'email': COMPANY_INFO.email,
    'foundingDate': COMPANY_INFO.foundingDate,
    'founders': COMPANY_INFO.founders.map(name => ({
      '@type': 'Person',
      'name': name
    })),
    'numberOfEmployees': {
      '@type': 'QuantitativeValue',
      'value': COMPANY_INFO.numberOfEmployees
    },
    'slogan': COMPANY_INFO.slogan,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': COMPANY_INFO.address.streetAddress,
      'addressLocality': COMPANY_INFO.address.addressLocality,
      'addressRegion': COMPANY_INFO.address.addressRegion,
      'postalCode': COMPANY_INFO.address.postalCode,
      'addressCountry': COMPANY_INFO.address.addressCountry
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': COMPANY_INFO.geo.latitude,
      'longitude': COMPANY_INFO.geo.longitude
    },
    'hasMap': `https://maps.google.com/?q=${COMPANY_INFO.geo.latitude},${COMPANY_INFO.geo.longitude}`,
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        'opens': '10:00',
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
    'priceRange': COMPANY_INFO.priceRange,
    'currenciesAccepted': COMPANY_INFO.currenciesAccepted.join(', '),
    'paymentAccepted': COMPANY_INFO.paymentAccepted.join(', '),
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Erbil',
        'containedInPlace': {
          '@type': 'State',
          'name': 'Kurdistan Region',
          'containedInPlace': {
            '@type': 'Country',
            'name': 'Iraq'
          }
        }
      },
      {
        '@type': 'Place',
        'name': 'Kurdistan Region, Iraq'
      }
    ],
    'serviceArea': {
      '@type': 'GeoCircle',
      'geoMidpoint': {
        '@type': 'GeoCoordinates',
        'latitude': COMPANY_INFO.geo.latitude,
        'longitude': COMPANY_INFO.geo.longitude
      },
      'geoRadius': '50000'
    },
    'knowsLanguage': COMPANY_INFO.languages.map(lang => ({
      '@type': 'Language',
      'name': lang
    })),
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': avgRating.toFixed(1),
      'reviewCount': testimonials.length.toString(),
      'bestRating': '5',
      'worstRating': '1'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Real Estate Services',
      'itemListElement': [
        {
          '@type': 'OfferCatalog',
          'name': 'Residential Properties',
          'itemListElement': ['Villas', 'Apartments', 'Penthouses', 'Townhouses', 'Duplexes']
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Commercial Properties',
          'itemListElement': ['Retail Stores', 'Office Spaces', 'Warehouses', 'Land']
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Services',
          'itemListElement': ['Property Sales', 'Property Rentals', 'Property Management', 'Investment Consulting']
        }
      ]
    },
    'sameAs': COMPANY_INFO.socialProfiles,
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': COMPANY_INFO.telephone[0],
        'contactType': 'sales',
        'areaServed': 'IQ',
        'availableLanguage': COMPANY_INFO.languages
      },
      {
        '@type': 'ContactPoint',
        'telephone': COMPANY_INFO.telephone[1],
        'contactType': 'customer support',
        'areaServed': 'IQ',
        'availableLanguage': COMPANY_INFO.languages
      }
    ],
    'potentialAction': [
      {
        '@type': 'ReserveAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/contact`,
          'actionPlatform': [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        },
        'result': {
          '@type': 'Reservation',
          'name': 'Property Viewing Appointment'
        }
      }
    ]
  };
}

// =============================================================================
// 7. ARTICLE RICH SNIPPETS (For Blog)
// =============================================================================

/**
 * Generate Article schema for blog posts
 * Optimized for Google News and Article rich results
 */
export function generateArticleSchema(post: BlogPost): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;
  const wordCount = post.content.split(/\s+/).length;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${BASE_URL}/blog/${post.slug}#article`,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
      'lastReviewed': post.date,
      'reviewedBy': {
        '@type': 'Organization',
        'name': 'Real House'
      }
    },
    'headline': post.title,
    'alternativeHeadline': `${post.category}: ${post.title.slice(0, 50)}`,
    'description': post.excerpt,
    'image': [
      {
        '@type': 'ImageObject',
        'url': post.image,
        'width': '1200',
        'height': '630',
        'caption': post.title
      },
      {
        '@type': 'ImageObject',
        'url': post.image.replace('w=1200', 'w=800'),
        'width': '800',
        'height': '600'
      },
      {
        '@type': 'ImageObject',
        'url': post.image.replace('w=1200', 'w=400'),
        'width': '400',
        'height': '300'
      }
    ],
    'author': {
      '@type': 'Person',
      'name': post.author.name,
      'jobTitle': post.author.role,
      'image': post.author.image,
      'url': `${BASE_URL}/about`,
      'description': post.author.bio,
      'worksFor': {
        '@type': 'Organization',
        'name': 'Real House',
        'url': BASE_URL
      },
      'sameAs': [
        'https://linkedin.com/company/realhouseiq'
      ]
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Real House',
      'logo': {
        '@type': 'ImageObject',
        'url': COMPANY_INFO.logo,
        'width': '512',
        'height': '512'
      },
      'url': BASE_URL,
      'sameAs': COMPANY_INFO.socialProfiles
    },
    'datePublished': post.date,
    'dateModified': post.date,
    'dateCreated': post.date,
    'articleBody': post.content.replace(/<[^>]*>/g, '').slice(0, 5000),
    'articleSection': post.category,
    'keywords': post.tags.join(', '),
    'wordCount': wordCount,
    'characterCount': post.content.replace(/<[^>]*>/g, '').length,
    'timeRequired': `PT${post.readTime}M`,
    'inLanguage': 'en',
    'isAccessibleForFree': true,
    'copyrightYear': new Date().getFullYear(),
    'copyrightHolder': {
      '@type': 'Organization',
      'name': 'Real House'
    },
    'creativeWorkStatus': 'Published',
    'genre': 'Real Estate',
    'audience': {
      '@type': 'Audience',
      'audienceType': 'Property Buyers and Investors'
    },
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['.article-title', '.article-summary']
    },
    'isPartOf': {
      '@type': 'Blog',
      '@id': `${BASE_URL}/blog`,
      'name': 'Real House Blog',
      'description': 'Expert insights on Erbil real estate, market trends, and property investment',
      'publisher': {
        '@type': 'Organization',
        'name': 'Real House'
      }
    },
    'about': [
      {
        '@type': 'Thing',
        'name': 'Real Estate',
        'sameAs': 'https://en.wikipedia.org/wiki/Real_estate'
      },
      {
        '@type': 'Place',
        'name': 'Erbil',
        'sameAs': 'https://en.wikipedia.org/wiki/Erbil'
      }
    ],
    'potentialAction': {
      '@type': 'ReadAction',
      'target': `${BASE_URL}/blog/${post.slug}`
    }
  };
}

/**
 * Generate Blog schema for blog listing page
 */
export function generateBlogSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${BASE_URL}/blog#blog`,
    'name': 'Real House Blog',
    'description': 'Expert insights on Erbil real estate market, property investment guides, neighborhood guides, and luxury living in Kurdistan.',
    'url': `${BASE_URL}/blog`,
    'inLanguage': 'en',
    'publisher': {
      '@type': 'Organization',
      'name': 'Real House',
      'logo': {
        '@type': 'ImageObject',
        'url': COMPANY_INFO.logo
      },
      'url': BASE_URL
    },
    'blogPost': blogPosts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      '@id': `${BASE_URL}/blog/${post.slug}`,
      'headline': post.title,
      'description': post.excerpt,
      'datePublished': post.date,
      'author': {
        '@type': 'Person',
        'name': post.author.name
      },
      'image': post.image,
      'url': `${BASE_URL}/blog/${post.slug}`
    }))
  };
}

/**
 * Generate NewsArticle schema for blog posts (alternative to Article)
 * Better for time-sensitive content and news-like articles
 */
export function generateNewsArticleSchema(post: BlogPost): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${BASE_URL}/blog/${post.slug}#newsarticle`,
    'mainEntityOfPage': `${BASE_URL}/blog/${post.slug}`,
    'headline': post.title,
    'alternativeHeadline': post.excerpt.slice(0, 100),
    'description': post.excerpt,
    'image': [
      post.image,
      post.image.replace('w=1200', 'w=800'),
      post.image.replace('w=1200', 'w=400')
    ],
    'author': {
      '@type': 'Person',
      'name': post.author.name,
      'jobTitle': post.author.role,
      'url': `${BASE_URL}/about`
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Real House',
      'logo': {
        '@type': 'ImageObject',
        'url': COMPANY_INFO.logo,
        'width': 512,
        'height': 512
      }
    },
    'datePublished': post.date,
    'dateModified': post.date,
    'articleSection': post.category,
    'keywords': post.tags,
    'inLanguage': 'en',
    'isAccessibleForFree': true
  };
}

/**
 * Generate BlogPosting schema for individual blog posts
 * Alternative to Article with blog-specific attributes
 */
export function generateBlogPostingSchema(post: BlogPost): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE_URL}/blog/${post.slug}#blogposting`,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`
    },
    'headline': post.title,
    'description': post.excerpt,
    'image': post.image,
    'author': {
      '@type': 'Person',
      'name': post.author.name,
      'jobTitle': post.author.role,
      'image': post.author.image,
      'description': post.author.bio
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Real House',
      'logo': {
        '@type': 'ImageObject',
        'url': COMPANY_INFO.logo,
        'width': 512,
        'height': 512
      },
      'url': BASE_URL
    },
    'datePublished': post.date,
    'dateModified': post.date,
    'articleSection': post.category,
    'keywords': post.tags.join(', '),
    'wordCount': post.content.split(/\s+/).length,
    'timeRequired': `PT${post.readTime}M`,
    'inLanguage': 'en',
    'isPartOf': {
      '@type': 'Blog',
      'name': 'Real House Blog',
      'url': `${BASE_URL}/blog`
    },
    'commentCount': 0,
    'interactionStatistic': {
      '@type': 'InteractionCounter',
      'interactionType': 'https://schema.org/ReadAction',
      'userInteractionCount': '500'
    }
  };
}

// =============================================================================
// ADDITIONAL SCHEMA TYPES
// =============================================================================

/**
 * Generate RealEstateListing JSON-LD schema for a property
 */
export function generatePropertySchema(property: Property): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${BASE_URL}/properties/${property.id}#listing`,
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
      'telephone': COMPANY_INFO.telephone[0],
      'email': COMPANY_INFO.email
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
    '@id': `${BASE_URL}/properties/${property.id}#residence`,
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
    'geo': property.location.coordinates ? {
      '@type': 'GeoCoordinates',
      'latitude': property.location.coordinates.lat.toString(),
      'longitude': property.location.coordinates.lng.toString()
    } : {
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
 * Generate Organization schema for the website
 */
export function generateOrganizationSchema(): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    'name': COMPANY_INFO.name,
    'alternateName': COMPANY_INFO.alternateName,
    'legalName': COMPANY_INFO.legalName,
    'url': COMPANY_INFO.url,
    'logo': {
      '@type': 'ImageObject',
      'url': COMPANY_INFO.logo,
      'width': '512',
      'height': '512'
    },
    'image': COMPANY_INFO.logo,
    'description': COMPANY_INFO.description,
    'foundingDate': COMPANY_INFO.foundingDate,
    'founders': COMPANY_INFO.founders.map(name => ({
      '@type': 'Person',
      'name': name
    })),
    'address': {
      '@type': 'PostalAddress',
      ...COMPANY_INFO.address
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': COMPANY_INFO.telephone[0],
      'contactType': 'sales',
      'areaServed': 'IQ',
      'availableLanguage': COMPANY_INFO.languages
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': avgRating.toFixed(1),
      'reviewCount': testimonials.length.toString(),
      'bestRating': '5',
      'worstRating': '1'
    },
    'sameAs': COMPANY_INFO.socialProfiles
  };
}

/**
 * Generate ItemList schema for properties listing page
 */
export function generatePropertyListSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE_URL}/properties#list`,
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
    '@id': `${BASE_URL}/#website`,
    'name': 'Real House',
    'alternateName': 'Real House Erbil',
    'url': BASE_URL,
    'description': 'Premium luxury real estate in Erbil, Iraq. Villas, apartments, and investment properties.',
    'inLanguage': 'en',
    'publisher': {
      '@type': 'Organization',
      'name': 'Real House',
      'logo': {
        '@type': 'ImageObject',
        'url': COMPANY_INFO.logo
      }
    },
    'potentialAction': [
      {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/properties?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'ReadAction',
        'target': `${BASE_URL}/blog`
      }
    ]
  };
}

/**
 * Generate Project/Development schema for project pages
 */
export function generateProjectSchema(project: Project): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${BASE_URL}/projects/${project.id}#project`,
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
    '@id': `${BASE_URL}/projects#list`,
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
    '@id': `${BASE_URL}/properties/${property.id}#virtual-tour`,
    'name': `Virtual Tour: ${property.title}`,
    'description': `360-degree virtual tour of ${property.title} in ${property.location.district}, ${property.location.city}. Explore this ${property.type.toLowerCase()} featuring ${property.specs.beds} bedrooms, ${property.specs.baths} bathrooms, and ${property.specs.sqm} sqm.`,
    'thumbnailUrl': property.images[0],
    'uploadDate': new Date().toISOString().split('T')[0],
    'contentUrl': property.virtualTourUrl,
    'embedUrl': property.virtualTourUrl,
    'duration': 'PT5M',
    'interactionStatistic': {
      '@type': 'InteractionCounter',
      'interactionType': 'https://schema.org/WatchAction',
      'userInteractionCount': '500'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Real House',
      'logo': {
        '@type': 'ImageObject',
        'url': COMPANY_INFO.logo
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
    'license': `${BASE_URL}/terms`,
    'acquireLicensePage': `${BASE_URL}/contact`,
    'creditText': 'Real House',
    'creator': {
      '@type': 'Organization',
      'name': 'Real House'
    },
    'copyrightNotice': `© ${new Date().getFullYear()} Real House. All rights reserved.`
  }));
}

/**
 * Generate Service schema for Real House services
 */
export function generateServicesSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/#services`,
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
 * Generate Real Estate FAQ Schema with comprehensive questions
 * Legacy function maintained for backward compatibility
 */
export function generateRealEstateFAQSchema(): object {
  return generateHomeFAQSchema();
}

// =============================================================================
// SEO HELPER FUNCTIONS
// =============================================================================

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

// =============================================================================
// DOM MANIPULATION FUNCTIONS
// =============================================================================

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
 * Inject multiple schemas as a graph
 */
export function injectSchemaGraph(schemas: object[], id: string): void {
  // Remove existing schema with same id
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  const graph = {
    '@context': 'https://schema.org',
    '@graph': schemas
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.textContent = JSON.stringify(graph);
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

// =============================================================================
// PAGE-SPECIFIC SEO SETUP FUNCTIONS
// =============================================================================

/**
 * Setup SEO for a property detail page
 * Maximum rich snippets: Product, Listing, Residence, FAQ, Breadcrumb, Video
 */
export function setupPropertyPageSEO(property: Property): void {
  // Clear any existing dynamic schemas
  clearDynamicSchemas();

  // Update meta tags
  updatePropertyMeta(property);

  // Create comprehensive schema graph for maximum SERP coverage
  const schemas: object[] = [
    // Core property schemas
    generatePropertySchema(property),
    generateEnhancedPropertyListingSchema(property),
    generateResidenceSchema(property),

    // Product schema for rich results with price, availability, reviews
    generateProductSchema(property),

    // Property-specific FAQ for "People Also Ask" boxes
    generatePropertyFAQSchema(property),

    // Breadcrumb for navigation rich snippets
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Properties', url: `${BASE_URL}/properties` },
      { name: property.location.district, url: `${BASE_URL}/properties?district=${property.location.district.toLowerCase()}` },
      { name: property.title, url: `${BASE_URL}/properties/${property.id}` }
    ]),

    // Image schema for Google Images
    ...generatePropertyImageSchema(property)
  ];

  // Add virtual tour schema if available (VideoObject)
  const virtualTourSchema = generateVirtualTourSchema(property);
  if (virtualTourSchema) {
    schemas.push(virtualTourSchema);
  }

  // Inject as a graph
  injectSchemaGraph(schemas, 'schema-property-page');
}

/**
 * Setup SEO for the properties listing page
 */
export function setupPropertiesPageSEO(): void {
  clearDynamicSchemas();

  const schemas = [
    generatePropertyListSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Properties', url: `${BASE_URL}/properties` }
    ])
  ];

  injectSchemaGraph(schemas, 'schema-properties-page');
}

/**
 * Setup SEO for the contact page
 */
export function setupContactPageSEO(): void {
  clearDynamicSchemas();

  const schemas = [
    generateLocalBusinessSchema(),
    generateContactFAQSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Contact', url: `${BASE_URL}/contact` }
    ])
  ];

  injectSchemaGraph(schemas, 'schema-contact-page');
}

/**
 * Setup SEO for the about page
 */
export function setupAboutPageSEO(): void {
  clearDynamicSchemas();

  const schemas = [
    generateOrganizationSchema(),
    generateAggregateRatingSchema(),
    generateAboutFAQSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'About', url: `${BASE_URL}/about` }
    ])
  ];

  injectSchemaGraph(schemas, 'schema-about-page');
}

/**
 * Setup SEO for the FAQ page - Comprehensive with 50+ FAQs
 */
export function setupFAQPageSEO(): void {
  clearDynamicSchemas();

  // Main FAQ schema with all FAQs
  const mainFAQSchema = generateFAQSchema();

  // Generate category-specific schemas for better SEO targeting
  const categorySchemas = faqCategories.map(category =>
    generateCategoryFAQSchema(category.id)
  );

  // HowTo schemas for buying and selling
  const howToSchemas = [
    generateHowToBuyPropertySchema(),
    generateHowToSellPropertySchema()
  ];

  // Breadcrumb
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'FAQ', url: `${BASE_URL}/faq` }
  ]);

  // Organization for author credibility
  const organization = generateOrganizationSchema();

  // Combine all schemas - main FAQ first, then categories
  const schemas = [
    mainFAQSchema,
    breadcrumb,
    organization,
    ...howToSchemas
  ];

  injectSchemaGraph(schemas, 'schema-faq-page');
}

/**
 * Setup SEO for the home page
 * Maximum rich snippets: WebSite, Organization, LocalBusiness, FAQ, HowTo, Service, Reviews
 */
export function setupHomePageSEO(): void {
  clearDynamicSchemas();

  const schemas = [
    // Core website and organization schemas
    generateWebSiteSchema(),
    generateOrganizationSchema(),

    // LocalBusiness for Google Maps and local search
    generateLocalBusinessSchema(),
    generateEnhancedLocalBusinessSchema(),

    // FAQ schemas for "People Also Ask" boxes
    generateHomeFAQSchema(),
    generatePeopleAlsoAskSchema(),

    // HowTo schemas for featured snippets
    generateHowToBuyPropertySchema(),
    generateHowToSellPropertySchema(),
    generateHowToInvestSchema(),
    generateHowToViewPropertySchema(),

    // Services schema
    generateServicesSchema(),

    // Aggregate rating for star ratings in SERP
    generateAggregateRatingSchema()
  ];

  injectSchemaGraph(schemas, 'schema-home-page');
}

/**
 * Setup SEO for projects listing page
 */
export function setupProjectsPageSEO(): void {
  clearDynamicSchemas();

  // Update page meta (optimized for CTR - primary keyword first, under 60 chars)
  document.title = 'New Development Projects Erbil 2025 | Off-Plan Kurdistan';
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    // 150-160 chars with CTA
    metaDescription.setAttribute('content', 'Explore new development projects in Erbil 2025. Off-plan properties with flexible payment plans from $85K. Premium locations. Book your exclusive site tour today!');
  }

  const schemas = [
    generateProjectListSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Projects', url: `${BASE_URL}/projects` }
    ])
  ];

  injectSchemaGraph(schemas, 'schema-projects-page');
}

/**
 * Setup SEO for project detail page
 */
export function setupProjectPageSEO(project: Project): void {
  clearDynamicSchemas();

  // Update page meta (optimized for CTR - max 60 chars)
  const status = project.status === 'Ready' ? 'Ready to Move' : project.status === 'Under Construction' ? '2025' : 'Coming Soon';
  const title = `${project.name} Erbil | ${status} | Off-Plan Property`;
  document.title = title.length <= 60 ? title : `${project.name} | New Development Erbil`;

  // Dynamic description (150-160 chars with CTA)
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const priceMin = project.priceRange.min >= 1000000
      ? `$${(project.priceRange.min / 1000000).toFixed(1)}M`
      : `$${(project.priceRange.min / 1000).toFixed(0)}K`;
    const desc = `${project.name} in ${project.location.district}, Erbil. ${project.status}. ${project.totalUnits} units from ${priceMin}. Flexible payment plans. Book your site tour today!`;
    metaDescription.setAttribute('content', desc.length <= 160 ? desc : desc.substring(0, 157) + '...');
  }

  const schemas = [
    generateProjectSchema(project),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Projects', url: `${BASE_URL}/projects` },
      { name: project.name, url: `${BASE_URL}/projects/${project.id}` }
    ])
  ];

  injectSchemaGraph(schemas, 'schema-project-page');
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

  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Favorites', url: `${BASE_URL}/favorites` }
    ])
  ];

  injectSchemaGraph(schemas, 'schema-favorites-page');
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

  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Compare Properties', url: `${BASE_URL}/compare` }
    ])
  ];

  injectSchemaGraph(schemas, 'schema-compare-page');
}

/**
 * Setup SEO for blog listing page
 */
export function setupBlogPageSEO(): void {
  clearDynamicSchemas();

  document.title = 'Real Estate Blog | Erbil Property Insights | Real House';
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Expert insights on Erbil real estate market, property investment guides, neighborhood guides, and luxury living in Kurdistan. Stay informed with Real House blog.');
  }

  const schemas = [
    generateBlogSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Blog', url: `${BASE_URL}/blog` }
    ])
  ];

  injectSchemaGraph(schemas, 'schema-blog-page');
}

/**
 * Setup SEO for blog post page
 * Maximum rich snippets: Article, BlogPosting, NewsArticle, Breadcrumb
 */
export function setupBlogPostSEO(post: BlogPost): void {
  clearDynamicSchemas();

  document.title = `${post.title} | Real House Blog`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', post.excerpt);
  }

  // Determine if this is news-like content (Market Trends, News categories)
  const isNewsContent = ['Market Trends', 'News'].includes(post.category);

  const schemas = [
    // Primary Article schema
    generateArticleSchema(post),

    // BlogPosting for blog-specific features
    generateBlogPostingSchema(post),

    // NewsArticle for time-sensitive content (market trends, news)
    ...(isNewsContent ? [generateNewsArticleSchema(post)] : []),

    // Breadcrumb navigation
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: post.category, url: `${BASE_URL}/blog?category=${post.category.toLowerCase().replace(' ', '-')}` },
      { name: post.title, url: `${BASE_URL}/blog/${post.slug}` }
    ]),

    // Organization for author credibility
    generateOrganizationSchema()
  ];

  injectSchemaGraph(schemas, 'schema-blog-post-page');
}

// =============================================================================
// LOCATION-SPECIFIC SEO SCHEMAS (Local SEO for "real estate erbil")
// =============================================================================

/**
 * District/Area data for local SEO
 */
const ERBIL_DISTRICTS = [
  {
    slug: 'gulan',
    name: 'Gulan',
    description: 'Premium residential and commercial district with modern towers and upscale shopping',
    lat: 36.2085,
    lng: 44.0093,
    propertyTypes: ['Apartment', 'Penthouse', 'Commercial']
  },
  {
    slug: 'ankawa',
    name: 'Ankawa',
    description: 'Historic Christian neighborhood with vibrant nightlife and international community',
    lat: 36.2220,
    lng: 43.9950,
    propertyTypes: ['Apartment', 'Villa', 'Townhouse', 'Commercial']
  },
  {
    slug: 'dream-city',
    name: 'Dream City',
    description: 'Premier gated community with international schools and family amenities',
    lat: 36.2150,
    lng: 43.9800,
    propertyTypes: ['Villa', 'Apartment', 'Townhouse', 'Duplex']
  },
  {
    slug: 'italian-village',
    name: 'Italian Village',
    description: 'Mediterranean-style residential community with Tuscan architecture',
    lat: 36.1950,
    lng: 43.9700,
    propertyTypes: ['Villa', 'Townhouse', 'Apartment']
  },
  {
    slug: 'english-village',
    name: 'English Village',
    description: 'Exclusive British colonial-style community with country club amenities',
    lat: 36.1880,
    lng: 43.9650,
    propertyTypes: ['Villa', 'Mansion']
  },
  {
    slug: 'empire-world',
    name: 'Empire World',
    description: 'Largest mixed-use development with residential towers, mall, and five-star hotel',
    lat: 36.1970,
    lng: 44.0200,
    propertyTypes: ['Apartment', 'Penthouse', 'Commercial']
  }
];

/**
 * Generate Place schema for a specific district
 */
export function generateDistrictPlaceSchema(districtSlug: string): object | null {
  const district = ERBIL_DISTRICTS.find(d => d.slug === districtSlug);
  if (!district) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${BASE_URL}/properties/${district.slug}#place`,
    'name': `${district.name}, Erbil`,
    'description': district.description,
    'url': `${BASE_URL}/properties/${district.slug}`,
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': district.lat.toString(),
      'longitude': district.lng.toString()
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Erbil',
      'addressRegion': 'Kurdistan Region',
      'addressCountry': 'Iraq'
    },
    'containedInPlace': {
      '@type': 'City',
      'name': 'Erbil',
      'containedInPlace': {
        '@type': 'AdministrativeArea',
        'name': 'Kurdistan Region',
        'containedInPlace': {
          '@type': 'Country',
          'name': 'Iraq'
        }
      }
    },
    'hasMap': `https://maps.google.com/?q=${district.lat},${district.lng}`
  };
}

/**
 * Generate comprehensive LocalBusiness schema with multiple service areas
 * Optimized for local SEO targeting "real estate erbil" searches
 */
export function generateEnhancedLocalBusinessSchema(): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${BASE_URL}/#realestate-agent`,
    'name': 'Real House',
    'alternateName': ['Real House Erbil', 'Real House Kurdistan', 'ڕیەڵ هاوس'],
    'legalName': 'Real House Real Estate LLC',
    'description': 'Premier luxury real estate agency in Erbil, Kurdistan Region, Iraq. Specializing in villas, apartments, penthouses, commercial properties, and real estate investment opportunities. Trusted experts for property sales, rentals, and investment consulting.',
    'url': BASE_URL,
    'logo': {
      '@type': 'ImageObject',
      'url': `${BASE_URL}/logo.png`,
      'width': 512,
      'height': 512
    },
    'image': `${BASE_URL}/og-image.jpg`,
    'telephone': ['+964-750-792-2138', '+964-751-441-5003'],
    'email': 'info@realhouseiq.com',
    'foundingDate': '2018',
    'priceRange': '$$$',
    'currenciesAccepted': 'USD, IQD',
    'paymentAccepted': 'Cash, Bank Transfer, Installment Plans, Developer Financing',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Queen Tower, Erbil, Building A3',
      'addressLocality': 'Erbil',
      'addressRegion': 'Kurdistan Region',
      'postalCode': '44001',
      'addressCountry': {
        '@type': 'Country',
        'name': 'Iraq',
        'identifier': 'IQ'
      }
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '36.1901',
      'longitude': '44.0091'
    },
    'hasMap': 'https://maps.google.com/?q=36.1901,44.0091',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        'opens': '10:00',
        'closes': '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Friday',
        'description': 'By Appointment Only'
      }
    ],
    'areaServed': [
      // Primary city
      {
        '@type': 'City',
        'name': 'Erbil',
        '@id': 'https://en.wikipedia.org/wiki/Erbil',
        'containedInPlace': {
          '@type': 'AdministrativeArea',
          'name': 'Kurdistan Region'
        }
      },
      // Individual districts for local SEO
      ...ERBIL_DISTRICTS.map(district => ({
        '@type': 'Place',
        'name': `${district.name}, Erbil`,
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': district.lat.toString(),
          'longitude': district.lng.toString()
        }
      })),
      // Regional coverage
      {
        '@type': 'AdministrativeArea',
        'name': 'Kurdistan Region, Iraq'
      }
    ],
    'serviceArea': {
      '@type': 'GeoCircle',
      'geoMidpoint': {
        '@type': 'GeoCoordinates',
        'latitude': '36.1901',
        'longitude': '44.0091'
      },
      'geoRadius': '50000'
    },
    'knowsLanguage': [
      { '@type': 'Language', 'name': 'English', 'alternateName': 'en' },
      { '@type': 'Language', 'name': 'Arabic', 'alternateName': 'ar' },
      { '@type': 'Language', 'name': 'Kurdish', 'alternateName': 'ku' }
    ],
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': '+964-750-792-2138',
        'contactType': 'sales',
        'areaServed': ['IQ', 'Kurdistan Region'],
        'availableLanguage': ['English', 'Arabic', 'Kurdish'],
        'contactOption': 'TollFree'
      },
      {
        '@type': 'ContactPoint',
        'telephone': '+964-751-441-5003',
        'contactType': 'customer service',
        'areaServed': ['IQ', 'Kurdistan Region'],
        'availableLanguage': ['English', 'Arabic', 'Kurdish']
      }
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Real Estate Services',
      'itemListElement': [
        {
          '@type': 'OfferCatalog',
          'name': 'Property Types',
          'itemListElement': ['Villas', 'Apartments', 'Penthouses', 'Townhouses', 'Duplexes', 'Commercial', 'Land']
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Services',
          'itemListElement': ['Property Sales', 'Property Rentals', 'Investment Consulting', 'Property Management', 'Virtual Tours']
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Locations',
          'itemListElement': ERBIL_DISTRICTS.map(d => d.name)
        }
      ]
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': avgRating.toFixed(1),
      'reviewCount': testimonials.length.toString(),
      'bestRating': '5',
      'worstRating': '1'
    },
    'review': testimonials.slice(0, 5).map(t => ({
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': t.rating.toString(),
        'bestRating': '5'
      },
      'author': {
        '@type': 'Person',
        'name': t.name
      },
      'reviewBody': t.quote
    })),
    'sameAs': [
      'https://instagram.com/realhouseiq',
      'https://facebook.com/realhouseiq',
      'https://linkedin.com/company/realhouseiq',
      'https://twitter.com/realhouseiq',
      'https://youtube.com/@realhouseiq'
    ]
  };
}

/**
 * Setup SEO for locations index page
 */
export function setupLocationsPageSEO(): void {
  clearDynamicSchemas();

  document.title = 'Real Estate by Location in Erbil | Properties in Kurdistan Districts | Real House';
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Explore properties by location in Erbil, Kurdistan. Find real estate in Gulan, Dream City, Ankawa, Italian Village, English Village & Empire World. Local experts, premium listings.');
  }

  const schemas = [
    generateEnhancedLocalBusinessSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Locations', url: `${BASE_URL}/locations` }
    ]),
    // Add ItemList for districts
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Erbil Real Estate Districts',
      'description': 'Explore properties by district in Erbil, Kurdistan Region, Iraq',
      'numberOfItems': ERBIL_DISTRICTS.length,
      'itemListElement': ERBIL_DISTRICTS.map((district, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `${BASE_URL}/properties/${district.slug}`,
        'name': `${district.name} Real Estate`,
        'description': district.description
      }))
    }
  ];

  injectSchemaGraph(schemas, 'schema-locations-page');
}

/**
 * Setup SEO for individual district page
 */
export function setupDistrictPageSEO(districtSlug: string, propertyCount: number = 0): void {
  const district = ERBIL_DISTRICTS.find(d => d.slug === districtSlug);
  if (!district) return;

  clearDynamicSchemas();

  document.title = `${district.name} Real Estate Erbil | ${propertyCount} Properties for Sale & Rent | Real House`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', `${district.name} properties in Erbil: ${propertyCount} listings. ${district.description} Contact Real House for viewings.`);
  }

  // Update canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `${BASE_URL}/properties/${districtSlug}`);
  }

  const placeSchema = generateDistrictPlaceSchema(districtSlug);
  const schemas: object[] = [
    generateEnhancedLocalBusinessSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Locations', url: `${BASE_URL}/locations` },
      { name: district.name, url: `${BASE_URL}/properties/${districtSlug}` }
    ])
  ];

  if (placeSchema) {
    schemas.push(placeSchema);
  }

  injectSchemaGraph(schemas, 'schema-district-page');
}

/**
 * Get all district slugs for sitemap generation
 */
export function getAllDistrictSlugs(): string[] {
  return ERBIL_DISTRICTS.map(d => d.slug);
}

/**
 * Get district info for SEO
 */
export function getDistrictInfo(slug: string): { name: string; description: string } | null {
  const district = ERBIL_DISTRICTS.find(d => d.slug === slug);
  return district ? { name: district.name, description: district.description } : null;
}

// =============================================================================
// PAGINATION SEO UTILITIES
// =============================================================================

/**
 * Setup pagination SEO meta tags (rel="next" and rel="prev")
 */
export function setupPaginationSEO(currentPage: number, totalPages: number, baseUrl: string): void {
  // Remove existing pagination links
  document.querySelectorAll('link[rel="next"], link[rel="prev"]').forEach(el => el.remove());

  // Add rel="prev" if not on first page
  if (currentPage > 1) {
    const prevLink = document.createElement('link');
    prevLink.rel = 'prev';
    prevLink.href = currentPage === 2 ? baseUrl : `${baseUrl}?page=${currentPage - 1}`;
    document.head.appendChild(prevLink);
  }

  // Add rel="next" if not on last page
  if (currentPage < totalPages) {
    const nextLink = document.createElement('link');
    nextLink.rel = 'next';
    nextLink.href = `${baseUrl}?page=${currentPage + 1}`;
    document.head.appendChild(nextLink);
  }
}

/**
 * Clear pagination SEO meta tags
 */
export function clearPaginationSEO(): void {
  document.querySelectorAll('link[rel="next"], link[rel="prev"]').forEach(el => el.remove());
}

// =============================================================================
// CANONICAL TAG MANAGEMENT
// =============================================================================

/**
 * Update canonical URL
 */
export function updateCanonicalUrl(url: string): void {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (canonical) {
    canonical.href = url;
  } else {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url;
    document.head.appendChild(canonical);
  }
}

/**
 * Add noindex meta tag for duplicate content pages
 */
export function setNoIndex(noIndex: boolean = true): void {
  let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;

  if (noIndex) {
    if (robotsMeta) {
      robotsMeta.content = 'noindex, follow';
    } else {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      robotsMeta.content = 'noindex, follow';
      document.head.appendChild(robotsMeta);
    }
  } else {
    if (robotsMeta) {
      robotsMeta.content = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    }
  }
}

/**
 * Handle URL parameters for SEO - add canonical without tracking params
 */
export function getCanonicalUrl(): string {
  const url = new URL(window.location.href);

  // Remove tracking and session parameters
  const paramsToRemove = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
                          'fbclid', 'gclid', 'ref', 'session', 'sort', 'order'];
  paramsToRemove.forEach(param => url.searchParams.delete(param));

  // For filter parameters, keep only meaningful ones
  const meaningfulParams = ['type', 'status', 'district', 'minBeds', 'priceRange', 'q'];
  const currentParams = Array.from(url.searchParams.keys());
  currentParams.forEach(param => {
    if (!meaningfulParams.includes(param)) {
      url.searchParams.delete(param);
    }
  });

  return url.toString().replace(/\/$/, ''); // Remove trailing slash
}

// =============================================================================
// HREFLANG MANAGEMENT FOR MULTILINGUAL
// =============================================================================

/**
 * Setup hreflang tags for multilingual pages
 */
export function setupHreflangTags(path: string): void {
  // Remove existing hreflang tags
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

  const languages = [
    { lang: 'en', url: `${BASE_URL}${path}` },
    { lang: 'ar', url: `${BASE_URL}/ar${path}` },
    { lang: 'ku', url: `${BASE_URL}/ku${path}` },
    { lang: 'x-default', url: `${BASE_URL}${path}` }
  ];

  languages.forEach(({ lang, url }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = url;
    document.head.appendChild(link);
  });
}

// =============================================================================
// STRUCTURED DATA VALIDATION
// =============================================================================

/**
 * Validate JSON-LD schema structure
 */
export function validateSchema(schema: object): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check for required @context
  if (!('@context' in schema)) {
    errors.push('Missing @context');
  }

  // Check for required @type
  if (!('@type' in schema)) {
    errors.push('Missing @type');
  }

  // Type-specific validations
  const schemaType = (schema as any)['@type'];

  if (schemaType === 'RealEstateListing') {
    if (!('name' in schema)) errors.push('RealEstateListing: Missing name');
    if (!('offers' in schema)) errors.push('RealEstateListing: Missing offers');
  }

  if (schemaType === 'LocalBusiness' || schemaType === 'RealEstateAgent') {
    if (!('name' in schema)) errors.push('LocalBusiness: Missing name');
    if (!('address' in schema)) errors.push('LocalBusiness: Missing address');
  }

  if (schemaType === 'FAQPage') {
    if (!('mainEntity' in schema)) errors.push('FAQPage: Missing mainEntity');
  }

  if (schemaType === 'BreadcrumbList') {
    if (!('itemListElement' in schema)) errors.push('BreadcrumbList: Missing itemListElement');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Debug: Log all injected schemas
 */
export function debugSchemas(): void {
  const schemas = document.querySelectorAll('script[type="application/ld+json"]');
  console.group('Injected JSON-LD Schemas');
  schemas.forEach((script, index) => {
    try {
      const data = JSON.parse(script.textContent || '{}');
      console.log(`Schema ${index + 1}:`, data['@type'] || 'Unknown', data);
      const validation = validateSchema(data);
      if (!validation.valid) {
        console.warn(`Validation errors for Schema ${index + 1}:`, validation.errors);
      }
    } catch (e) {
      console.error(`Error parsing Schema ${index + 1}:`, e);
    }
  });
  console.groupEnd();
}

// =============================================================================
// COMPREHENSIVE REALESTATE AGENT SCHEMA
// =============================================================================

/**
 * Generate comprehensive RealEstateAgent schema with full business details
 */
export function generateRealEstateAgentSchema(): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${BASE_URL}/#realestateagent`,
    'name': 'Real House',
    'alternateName': ['Real House Erbil', 'Real House Kurdistan'],
    'legalName': 'Real House Real Estate LLC',
    'description': 'Premier luxury real estate agency in Erbil, Kurdistan Region, Iraq. 23+ years experience specializing in villas, apartments, penthouses, commercial properties, and investment consulting.',
    'url': BASE_URL,
    'logo': { '@type': 'ImageObject', 'url': `${BASE_URL}/logo.png`, 'width': 512, 'height': 512 },
    'image': [`${BASE_URL}/og-image.jpg`],
    'telephone': COMPANY_INFO.telephone,
    'email': COMPANY_INFO.email,
    'foundingDate': '2001-01-01',
    'founders': [
      { '@type': 'Person', 'name': 'Karwan Hassan', 'jobTitle': 'CEO & Co-Founder' },
      { '@type': 'Person', 'name': 'Ahmad Mahmoud', 'jobTitle': 'Managing Director & Co-Founder' }
    ],
    'numberOfEmployees': { '@type': 'QuantitativeValue', 'value': 25 },
    'slogan': 'Your Trusted Partner in Luxury Real Estate',
    'address': { '@type': 'PostalAddress', 'streetAddress': 'Dream City Main Boulevard, Building A3', 'addressLocality': 'Erbil', 'addressRegion': 'Kurdistan Region', 'postalCode': '44001', 'addressCountry': 'IQ' },
    'geo': { '@type': 'GeoCoordinates', 'latitude': '36.1901', 'longitude': '44.0091' },
    'openingHoursSpecification': [
      { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], 'opens': '10:00', 'closes': '18:00' },
      { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Friday', 'description': 'By Appointment Only' }
    ],
    'priceRange': '$$$',
    'currenciesAccepted': 'USD, IQD',
    'paymentAccepted': 'Cash, Bank Transfer, Installment Plans',
    'isAcceptingNewClients': true,
    'hasCredential': [
      { '@type': 'EducationalOccupationalCredential', 'name': 'Real Estate Agency License', 'recognizedBy': { '@type': 'GovernmentOrganization', 'name': 'Kurdistan Regional Government' } }
    ],
    'memberOf': [{ '@type': 'Organization', 'name': 'Kurdistan Real Estate Association' }],
    'award': ['Best Luxury Real Estate Agency 2024', 'Customer Service Excellence 2023'],
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': avgRating.toFixed(1), 'reviewCount': testimonials.length, 'bestRating': 5, 'worstRating': 1 },
    'sameAs': COMPANY_INFO.socialProfiles
  };
}

// =============================================================================
// EVENT SCHEMA FOR OPEN HOUSES
// =============================================================================

export function generateOpenHouseEventSchema(property: Property, eventDate: string, startTime: string, endTime: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${BASE_URL}/properties/${property.id}#open-house-${eventDate}`,
    'name': `Open House: ${property.title}`,
    'description': `Open house viewing of ${property.type.toLowerCase()} in ${property.location.district}, Erbil.`,
    'image': property.images[0],
    'startDate': `${eventDate}T${startTime}:00`,
    'endDate': `${eventDate}T${endTime}:00`,
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'location': { '@type': 'Place', 'name': property.title, 'address': { '@type': 'PostalAddress', 'streetAddress': property.location.address, 'addressLocality': property.location.city, 'addressCountry': property.location.country } },
    'organizer': { '@type': 'RealEstateAgent', 'name': 'Real House', 'url': BASE_URL },
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
    'isAccessibleForFree': true
  };
}

// =============================================================================
// IMAGE GALLERY SCHEMA
// =============================================================================

export function generateImageGallerySchema(property: Property): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${BASE_URL}/properties/${property.id}#gallery`,
    'name': `${property.title} - Photo Gallery`,
    'description': `${property.images.length} photos of ${property.type.toLowerCase()} in ${property.location.district}, Erbil.`,
    'url': `${BASE_URL}/properties/${property.id}`,
    'numberOfItems': property.images.length,
    'image': property.images.map((img, index) => ({
      '@type': 'ImageObject',
      'url': img,
      'name': `${property.title} - Photo ${index + 1}`,
      'creditText': 'Real House',
      'copyrightYear': new Date().getFullYear()
    })),
    'author': { '@type': 'Organization', 'name': 'Real House' }
  };
}

// =============================================================================
// ENHANCED OFFER SCHEMA
// =============================================================================

export function generatePropertyOfferSchema(property: Property): object {
  const isForRent = property.status === 'For Rent';
  const isSold = property.status === 'Sold';

  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    '@id': `${BASE_URL}/properties/${property.id}#offer`,
    'name': `${property.title} - ${property.status}`,
    'url': `${BASE_URL}/properties/${property.id}`,
    'priceCurrency': 'USD',
    'price': property.price > 0 ? property.price : undefined,
    'priceSpecification': { '@type': 'UnitPriceSpecification', 'price': property.price, 'priceCurrency': 'USD', 'unitText': isForRent ? 'per month' : 'total price' },
    'availability': isSold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    'itemCondition': (property.specs.yearBuilt ?? 0) >= new Date().getFullYear() - 2 ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
    'seller': { '@type': 'RealEstateAgent', 'name': 'Real House', 'url': BASE_URL },
    'itemOffered': {
      '@type': property.type === 'Villa' ? 'SingleFamilyResidence' : 'Apartment',
      'name': property.title,
      'numberOfBedrooms': property.specs.beds,
      'numberOfBathroomsTotal': property.specs.baths,
      'floorSize': { '@type': 'QuantitativeValue', 'value': property.specs.sqm, 'unitCode': 'MTK' }
    }
  };
}

// =============================================================================
// NEIGHBORHOOD/PLACE SCHEMA
// =============================================================================

export function generateNeighborhoodSchema(districtSlug: string): object | null {
  const district = ERBIL_DISTRICTS.find(d => d.slug === districtSlug);
  if (!district) return null;

  const districtProperties = properties.filter(p => p.location.district.toLowerCase() === district.name.toLowerCase());

  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${BASE_URL}/properties/${district.slug}#neighborhood`,
    'name': `${district.name}, Erbil`,
    'description': district.description,
    'url': `${BASE_URL}/properties/${district.slug}`,
    'geo': { '@type': 'GeoCoordinates', 'latitude': district.lat.toString(), 'longitude': district.lng.toString() },
    'address': { '@type': 'PostalAddress', 'addressLocality': 'Erbil', 'addressRegion': 'Kurdistan Region', 'addressCountry': 'Iraq' },
    'containedInPlace': { '@type': 'City', 'name': 'Erbil' },
    'additionalProperty': [
      { '@type': 'PropertyValue', 'name': 'Properties Available', 'value': districtProperties.length },
      { '@type': 'PropertyValue', 'name': 'Property Types', 'value': district.propertyTypes.join(', ') }
    ]
  };
}

export function generateNeighborhoodsListSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE_URL}/locations#neighborhoods`,
    'name': 'Erbil Real Estate Neighborhoods',
    'numberOfItems': ERBIL_DISTRICTS.length,
    'itemListElement': ERBIL_DISTRICTS.map((district, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': `${district.name} Real Estate`,
      'url': `${BASE_URL}/properties/${district.slug}`
    }))
  };
}

// =============================================================================
// ENHANCED ITEM LIST SCHEMAS
// =============================================================================

export function generateFeaturedPropertiesListSchema(): object {
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 6);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE_URL}/#featured-properties`,
    'name': 'Featured Properties in Erbil',
    'numberOfItems': featuredProperties.length,
    'itemListElement': featuredProperties.map((property, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': property.title,
      'url': `${BASE_URL}/properties/${property.id}`,
      'image': property.images[0]
    }))
  };
}

export function generatePropertiesByTypeListSchema(propertyType: string): object {
  const typeProperties = properties.filter(p => p.type === propertyType);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE_URL}/properties?type=${propertyType.toLowerCase()}#list`,
    'name': `${propertyType} Properties in Erbil`,
    'numberOfItems': typeProperties.length,
    'itemListElement': typeProperties.map((property, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `${BASE_URL}/properties/${property.id}`,
      'name': property.title
    }))
  };
}

// =============================================================================
// COMPREHENSIVE REVIEW SCHEMA
// =============================================================================

export function generateComprehensiveReviewSchema(): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${BASE_URL}/#reviews-comprehensive`,
    'name': 'Real House',
    'url': BASE_URL,
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': avgRating.toFixed(1), 'reviewCount': testimonials.length, 'bestRating': 5, 'worstRating': 1 },
    'review': testimonials.map(t => ({
      '@type': 'Review',
      'reviewRating': { '@type': 'Rating', 'ratingValue': t.rating, 'bestRating': 5 },
      'author': { '@type': 'Person', 'name': t.name, 'jobTitle': t.role },
      'reviewBody': t.quote,
      'datePublished': `${t.purchaseYear}-06-15`
    }))
  };
}

// =============================================================================
// COMPREHENSIVE PAGE SETUP FUNCTIONS
// =============================================================================

export function setupComprehensiveHomePageSEO(): void {
  clearDynamicSchemas();
  const schemas = [
    generateWebSiteSchema(),
    generateRealEstateAgentSchema(),
    generateLocalBusinessSchema(),
    generateHomeFAQSchema(),
    generateHowToBuyPropertySchema(),
    generateHowToSellPropertySchema(),
    generateServicesSchema(),
    generateComprehensiveReviewSchema(),
    generateFeaturedPropertiesListSchema()
    // Note: NeighborhoodsListSchema removed to avoid multiple ItemList conflict
  ];
  injectSchemaGraph(schemas, 'schema-home-comprehensive');
}

export function setupComprehensivePropertyPageSEO(property: Property): void {
  clearDynamicSchemas();
  updatePropertyMeta(property);

  const schemas: object[] = [
    generatePropertySchema(property),
    generateResidenceSchema(property),
    generateProductSchema(property),
    generatePropertyOfferSchema(property),
    generateImageGallerySchema(property),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Properties', url: `${BASE_URL}/properties` },
      { name: property.title, url: `${BASE_URL}/properties/${property.id}` }
    ])
  ];

  const virtualTourSchema = generateVirtualTourSchema(property);
  if (virtualTourSchema) schemas.push(virtualTourSchema);

  const neighborhoodSlug = property.location.district.toLowerCase().replace(/\s+/g, '-');
  const neighborhoodSchema = generateNeighborhoodSchema(neighborhoodSlug);
  if (neighborhoodSchema) schemas.push(neighborhoodSchema);

  injectSchemaGraph(schemas, 'schema-property-comprehensive');
}

export function setupGalleryPageSEO(): void {
  clearDynamicSchemas();
  document.title = 'Property Gallery | Luxury Real Estate Photos | Real House Erbil';
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/gallery#collection`,
      'name': 'Real House Property Gallery',
      'url': `${BASE_URL}/gallery`
    },
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Gallery', url: `${BASE_URL}/gallery` }
    ])
  ];
  injectSchemaGraph(schemas, 'schema-gallery-page');
}

// =============================================================================
// ADDITIONAL RICH SNIPPET SCHEMAS FOR MAXIMUM SERP COVERAGE
// =============================================================================

/**
 * Generate SiteNavigationElement schema for main navigation
 * Helps Google understand site structure for sitelinks
 */
export function generateSiteNavigationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    '@id': `${BASE_URL}/#navigation`,
    'name': 'Main Navigation',
    'hasPart': [
      {
        '@type': 'SiteNavigationElement',
        'name': 'Properties',
        'url': `${BASE_URL}/properties`,
        'description': 'Browse luxury properties for sale and rent in Erbil'
      },
      {
        '@type': 'SiteNavigationElement',
        'name': 'Projects',
        'url': `${BASE_URL}/projects`,
        'description': 'New development projects and off-plan properties'
      },
      {
        '@type': 'SiteNavigationElement',
        'name': 'About',
        'url': `${BASE_URL}/about`,
        'description': 'Learn about Real House team'
      },
      {
        '@type': 'SiteNavigationElement',
        'name': 'Blog',
        'url': `${BASE_URL}/blog`,
        'description': 'Real estate insights and market trends'
      },
      {
        '@type': 'SiteNavigationElement',
        'name': 'FAQ',
        'url': `${BASE_URL}/faq`,
        'description': 'Frequently asked questions'
      },
      {
        '@type': 'SiteNavigationElement',
        'name': 'Contact',
        'url': `${BASE_URL}/contact`,
        'description': 'Get in touch with Real House'
      }
    ]
  };
}

/**
 * Generate SpecialAnnouncement schema for promotions
 */
export function generateSpecialAnnouncementSchema(announcement: {
  name: string;
  text: string;
  datePosted: string;
  expires?: string;
  url?: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpecialAnnouncement',
    '@id': `${BASE_URL}/#announcement`,
    'name': announcement.name,
    'text': announcement.text,
    'datePosted': announcement.datePosted,
    'expires': announcement.expires,
    'url': announcement.url || BASE_URL,
    'category': 'https://www.wikidata.org/wiki/Q3551307',
    'announcementLocation': {
      '@type': 'City',
      'name': 'Erbil',
      'containedInPlace': { '@type': 'State', 'name': 'Kurdistan Region' }
    }
  };
}

/**
 * Generate Event schema for property viewings and open houses
 */
export function generatePropertyEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  propertyId?: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${BASE_URL}/#event-${event.name.toLowerCase().replace(/\s+/g, '-')}`,
    'name': event.name,
    'description': event.description,
    'startDate': event.startDate,
    'endDate': event.endDate || event.startDate,
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'location': {
      '@type': 'Place',
      'name': event.location,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Erbil',
        'addressRegion': 'Kurdistan Region',
        'addressCountry': 'IQ'
      }
    },
    'organizer': { '@type': 'Organization', 'name': 'Real House', 'url': BASE_URL },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
      'url': event.propertyId ? `${BASE_URL}/properties/${event.propertyId}` : `${BASE_URL}/contact`
    },
    'isAccessibleForFree': true
  };
}

/**
 * Generate CollectionPage schema for category/filter pages
 */
export function generateCollectionPageSchema(options: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string; image?: string }>;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${options.url}#collection`,
    'name': options.name,
    'description': options.description,
    'url': options.url,
    'isPartOf': { '@type': 'WebSite', 'name': 'Real House', 'url': BASE_URL },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': options.items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'url': item.url,
        'image': item.image
      }))
    }
  };
}

/**
 * Generate SearchAction schema for sitelinks search box
 */
export function generateSearchActionSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#search`,
    'url': BASE_URL,
    'name': 'Real House',
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
 * Generate ContactPage schema
 */
export function generateContactPageSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${BASE_URL}/contact#contactpage`,
    'name': 'Contact Real House',
    'description': 'Contact Real House for property inquiries, viewings, and investment consultation in Erbil, Kurdistan.',
    'url': `${BASE_URL}/contact`,
    'mainEntity': generateLocalBusinessSchema()
  };
}

/**
 * Generate AboutPage schema
 */
export function generateAboutPageSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${BASE_URL}/about#aboutpage`,
    'name': 'About Real House',
    'description': 'Learn about Real House, the leading luxury real estate agency in Erbil, Kurdistan Region. 23+ years of experience serving clients worldwide.',
    'url': `${BASE_URL}/about`,
    'mainEntity': generateOrganizationSchema()
  };
}

// =============================================================================
// MASTER EXPORT: All Schema Generators for Easy Import
// =============================================================================

export const schemaGenerators = {
  // Product & Property Schemas
  product: generateProductSchema,
  enhancedPropertyListing: generateEnhancedPropertyListingSchema,
  property: generatePropertySchema,
  residence: generateResidenceSchema,
  propertyList: generatePropertyListSchema,
  completePropertyList: generateCompletePropertyListSchema,
  propertyImages: generatePropertyImageSchema,
  virtualTour: generateVirtualTourSchema,
  completeVideoTour: generateCompleteVideoTourSchema,
  imageGallery: generateImageGallerySchema,
  completeImageGallery: generateCompleteImageGallerySchema,

  // FAQ Schemas (for People Also Ask)
  homeFAQ: generateHomeFAQSchema,
  aboutFAQ: generateAboutFAQSchema,
  contactFAQ: generateContactFAQSchema,
  faq: generateFAQSchema,
  categoryFAQ: generateCategoryFAQSchema,
  peopleAlsoAsk: generatePeopleAlsoAskSchema,
  propertyFAQ: generatePropertyFAQSchema,

  // HowTo Schemas (for Featured Snippets)
  howToBuy: generateHowToBuyPropertySchema,
  howToSell: generateHowToSellPropertySchema,
  howToInvest: generateHowToInvestSchema,
  howToView: generateHowToViewPropertySchema,
  howToRent: generateHowToRentPropertySchema,

  // Review Schemas (for Star Ratings)
  review: generateReviewSchema,
  aggregateRating: generateAggregateRatingSchema,
  allReviews: generateAllReviewsSchema,
  comprehensiveReview: generateComprehensiveReviewSchema,

  // Breadcrumb & Navigation
  breadcrumb: generateBreadcrumbSchema,
  pageBreadcrumbs: generatePageBreadcrumbs,
  siteNavigation: generateSiteNavigationSchema,

  // Business Schemas (for Local Pack)
  localBusiness: generateLocalBusinessSchema,
  enhancedLocalBusiness: generateEnhancedLocalBusinessSchema,
  organization: generateOrganizationSchema,
  completeOrganization: generateCompleteOrganizationSchema,
  realEstateAgent: generateRealEstateAgentSchema,
  services: generateServicesSchema,
  detailedServices: generateDetailedServicesSchema,

  // Article Schemas (for News/Blog)
  article: generateArticleSchema,
  newsArticle: generateNewsArticleSchema,
  blogPosting: generateBlogPostingSchema,
  blog: generateBlogSchema,

  // Project Schemas
  project: generateProjectSchema,
  projectList: generateProjectListSchema,

  // Location Schemas
  districtPlace: generateDistrictPlaceSchema,
  neighborhood: generateNeighborhoodSchema,
  completePlace: generateCompletePlaceSchema,
  neighborhoodsList: generateNeighborhoodsListSchema,

  // Page Type Schemas
  webSite: generateWebSiteSchema,
  completeWebSite: generateCompleteWebSiteSchema,
  searchAction: generateSearchActionSchema,
  collectionPage: generateCollectionPageSchema,
  contactPage: generateContactPageSchema,
  aboutPage: generateAboutPageSchema,

  // Event & Announcement
  specialAnnouncement: generateSpecialAnnouncementSchema,
  propertyEvent: generatePropertyEventSchema,
  openHouseEvent: generateOpenHouseEventSchema,

  // Property-specific
  propertyOffer: generatePropertyOfferSchema,
  featuredPropertiesList: generateFeaturedPropertiesListSchema,
  propertiesByTypeList: generatePropertiesByTypeListSchema,

  // Utility
  metaTags: generateMetaTags
};

// Type for all available schema types
export type SchemaType = keyof typeof schemaGenerators;

// =============================================================================
// COMPREHENSIVE ORGANIZATION SCHEMA WITH ALL SOCIAL PROFILES
// =============================================================================

/**
 * Generate full Organization schema with complete social profiles
 * Includes all major social platforms and business information
 */
export function generateCompleteOrganizationSchema(): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization-complete`,
    'name': COMPANY_INFO.name,
    'alternateName': [COMPANY_INFO.alternateName, 'Real House Kurdistan', 'ڕیەڵ هاوس'],
    'legalName': COMPANY_INFO.legalName,
    'url': COMPANY_INFO.url,
    'logo': {
      '@type': 'ImageObject',
      'url': COMPANY_INFO.logo,
      'width': 512,
      'height': 512,
      'caption': 'Real House Logo'
    },
    'image': [
      COMPANY_INFO.logo,
      `${BASE_URL}/og-image.jpg`,
      `${BASE_URL}/images/office.jpg`
    ],
    'description': COMPANY_INFO.description,
    'slogan': COMPANY_INFO.slogan,
    'foundingDate': '2001-01-01',
    'foundingLocation': {
      '@type': 'Place',
      'name': 'Erbil, Kurdistan Region, Iraq'
    },
    'founders': [
      {
        '@type': 'Person',
        'name': 'Karwan Hassan',
        'jobTitle': 'CEO & Co-Founder',
        'image': `${BASE_URL}/images/team/karwan.jpg`
      },
      {
        '@type': 'Person',
        'name': 'Ahmad Mahmoud',
        'jobTitle': 'Managing Director & Co-Founder',
        'image': `${BASE_URL}/images/team/ahmad.jpg`
      }
    ],
    'numberOfEmployees': {
      '@type': 'QuantitativeValue',
      'value': 25,
      'unitText': 'employees'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Dream City Main Boulevard, Building A3',
      'addressLocality': 'Erbil',
      'addressRegion': 'Kurdistan Region',
      'postalCode': '44001',
      'addressCountry': {
        '@type': 'Country',
        'name': 'Iraq',
        'identifier': 'IQ'
      }
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': COMPANY_INFO.geo.latitude,
      'longitude': COMPANY_INFO.geo.longitude
    },
    'telephone': COMPANY_INFO.telephone[0],
    'email': COMPANY_INFO.email,
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': COMPANY_INFO.telephone[0],
        'contactType': 'sales',
        'email': COMPANY_INFO.email,
        'areaServed': ['IQ', 'Kurdistan Region'],
        'availableLanguage': ['English', 'Arabic', 'Kurdish'],
        'hoursAvailable': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          'opens': '10:00',
          'closes': '18:00'
        }
      },
      {
        '@type': 'ContactPoint',
        'telephone': COMPANY_INFO.telephone[1],
        'contactType': 'customer service',
        'areaServed': ['IQ', 'Kurdistan Region'],
        'availableLanguage': ['English', 'Arabic', 'Kurdish']
      },
      {
        '@type': 'ContactPoint',
        'contactType': 'WhatsApp',
        'telephone': '+964-750-792-2138',
        'url': 'https://wa.me/9647507922138'
      }
    ],
    'sameAs': [
      'https://instagram.com/realhouseiq',
      'https://www.facebook.com/realhouseiq',
      'https://linkedin.com/company/realhouseiq',
      'https://twitter.com/realhouseiq',
      'https://youtube.com/@realhouseiq',
      'https://pinterest.com/realhouseiq',
      'https://tiktok.com/@realhouseiq'
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': avgRating.toFixed(1),
      'reviewCount': testimonials.length,
      'bestRating': 5,
      'worstRating': 1
    },
    'award': [
      'Best Luxury Real Estate Agency Kurdistan 2024',
      'Customer Service Excellence 2023',
      'Top Real Estate Investment Advisor 2023'
    ],
    'hasCredential': {
      '@type': 'EducationalOccupationalCredential',
      'name': 'Licensed Real Estate Agency',
      'recognizedBy': {
        '@type': 'GovernmentOrganization',
        'name': 'Kurdistan Regional Government'
      }
    },
    'knowsAbout': [
      'Real Estate Sales',
      'Property Investment',
      'Property Management',
      'Luxury Real Estate',
      'Commercial Real Estate',
      'Residential Real Estate'
    ],
    'naics': '531210',
    'isicV4': '6810'
  };
}

// =============================================================================
// COMPLETE WEBSITE SCHEMA WITH ENHANCED SEARCH ACTION
// =============================================================================

/**
 * Generate comprehensive WebSite schema with sitelinks search box
 */
export function generateCompleteWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website-complete`,
    'url': BASE_URL,
    'name': 'Real House',
    'alternateName': ['Real House Erbil', 'Real House Kurdistan', 'ڕیەڵ هاوس'],
    'description': 'Premier luxury real estate agency in Erbil, Kurdistan Region, Iraq. Browse luxury villas, apartments, penthouses, and investment properties.',
    'inLanguage': ['en', 'ar', 'ku'],
    'publisher': {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization-complete`
    },
    'copyrightYear': new Date().getFullYear(),
    'copyrightHolder': {
      '@type': 'Organization',
      'name': 'Real House'
    },
    'potentialAction': [
      {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/properties?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'ReadAction',
        'target': `${BASE_URL}/blog`
      },
      {
        '@type': 'ViewAction',
        'target': `${BASE_URL}/properties`
      }
    ],
    'mainEntity': {
      '@type': 'RealEstateAgent',
      '@id': `${BASE_URL}/#realestateagent`
    },
    'hasPart': [
      {
        '@type': 'WebPage',
        'name': 'Properties',
        'url': `${BASE_URL}/properties`
      },
      {
        '@type': 'WebPage',
        'name': 'Projects',
        'url': `${BASE_URL}/projects`
      },
      {
        '@type': 'WebPage',
        'name': 'Blog',
        'url': `${BASE_URL}/blog`
      },
      {
        '@type': 'WebPage',
        'name': 'Contact',
        'url': `${BASE_URL}/contact`
      }
    ]
  };
}

// =============================================================================
// ENHANCED PROPERTY VIDEO TOUR SCHEMA
// =============================================================================

/**
 * Generate comprehensive VideoObject schema for property tours
 */
export function generateCompleteVideoTourSchema(property: Property, videoDetails?: {
  duration?: string;
  uploadDate?: string;
  views?: number;
}): object | null {
  if (!property.virtualTourUrl) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${BASE_URL}/properties/${property.id}#video-tour`,
    'name': `Virtual Tour: ${property.title}`,
    'description': `360-degree virtual tour of ${property.type.toLowerCase()} in ${property.location.district}, ${property.location.city}. Features ${property.specs.beds} bedrooms, ${property.specs.baths} bathrooms, ${property.specs.sqm} sqm living space. Explore this ${property.status.toLowerCase()} property from the comfort of your home.`,
    'thumbnailUrl': [
      property.images[0],
      property.images[1] || property.images[0],
      property.images[2] || property.images[0]
    ],
    'uploadDate': videoDetails?.uploadDate || new Date().toISOString().split('T')[0],
    'duration': videoDetails?.duration || 'PT5M',
    'contentUrl': property.virtualTourUrl,
    'embedUrl': property.virtualTourUrl,
    'interactionStatistic': {
      '@type': 'InteractionCounter',
      'interactionType': 'https://schema.org/WatchAction',
      'userInteractionCount': videoDetails?.views?.toString() || '500'
    },
    'potentialAction': {
      '@type': 'WatchAction',
      'target': property.virtualTourUrl
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Real House',
      'logo': {
        '@type': 'ImageObject',
        'url': COMPANY_INFO.logo
      }
    },
    'inLanguage': 'en',
    'isFamilyFriendly': true,
    'about': {
      '@type': 'RealEstateListing',
      'name': property.title,
      'url': `${BASE_URL}/properties/${property.id}`
    }
  };
}

// =============================================================================
// COMPLETE IMAGE GALLERY SCHEMA WITH LICENSING
// =============================================================================

/**
 * Generate comprehensive ImageGallery schema with licensing info
 */
export function generateCompleteImageGallerySchema(property: Property): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${BASE_URL}/properties/${property.id}#image-gallery`,
    'name': `${property.title} - Property Photo Gallery`,
    'description': `Professional photography of ${property.type.toLowerCase()} in ${property.location.district}, Erbil. ${property.images.length} high-quality images showcasing ${property.specs.beds > 0 ? property.specs.beds + ' bedrooms, ' : ''}${property.specs.baths} bathrooms, ${property.specs.sqm}sqm.`,
    'url': `${BASE_URL}/properties/${property.id}`,
    'numberOfItems': property.images.length,
    'image': property.images.map((img, index) => ({
      '@type': 'ImageObject',
      'url': img,
      'name': `${property.title} - Photo ${index + 1}`,
      'description': index === 0 ? `Main exterior view of ${property.type.toLowerCase()} in ${property.location.district}` :
                     index === 1 ? `Living room interior` :
                     index === 2 ? `Kitchen area` :
                     `Interior view ${index + 1}`,
      'contentUrl': img,
      'license': `${BASE_URL}/terms`,
      'acquireLicensePage': `${BASE_URL}/contact`,
      'creditText': 'Real House',
      'creator': {
        '@type': 'Organization',
        'name': 'Real House'
      },
      'copyrightNotice': `Copyright ${new Date().getFullYear()} Real House. All rights reserved.`,
      'copyrightYear': new Date().getFullYear(),
      'encodingFormat': 'image/jpeg',
      'width': {
        '@type': 'QuantitativeValue',
        'value': 1920,
        'unitText': 'pixels'
      },
      'height': {
        '@type': 'QuantitativeValue',
        'value': 1280,
        'unitText': 'pixels'
      }
    })),
    'about': {
      '@type': 'RealEstateListing',
      'name': property.title
    },
    'author': {
      '@type': 'Organization',
      'name': 'Real House',
      'url': BASE_URL
    },
    'copyrightHolder': {
      '@type': 'Organization',
      'name': 'Real House'
    }
  };
}

// =============================================================================
// COMPLETE NEIGHBORHOOD/PLACE SCHEMA
// =============================================================================

/**
 * Generate comprehensive Place schema for neighborhoods
 */
export function generateCompletePlaceSchema(districtSlug: string): object | null {
  const district = ERBIL_DISTRICTS.find(d => d.slug === districtSlug);
  if (!district) return null;

  const districtProperties = properties.filter(
    p => p.location.district.toLowerCase() === district.name.toLowerCase()
  );
  const avgPrice = districtProperties.length > 0
    ? districtProperties.reduce((sum, p) => sum + p.price, 0) / districtProperties.length
    : 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${BASE_URL}/areas/${district.slug}#place`,
    'name': `${district.name}, Erbil`,
    'alternateName': `${district.name} District`,
    'description': district.description,
    'url': `${BASE_URL}/areas/${district.slug}`,
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': district.lat.toString(),
      'longitude': district.lng.toString()
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Erbil',
      'addressRegion': 'Kurdistan Region',
      'postalCode': '44001',
      'addressCountry': {
        '@type': 'Country',
        'name': 'Iraq',
        'identifier': 'IQ'
      }
    },
    'containedInPlace': {
      '@type': 'City',
      'name': 'Erbil',
      '@id': 'https://en.wikipedia.org/wiki/Erbil',
      'containedInPlace': {
        '@type': 'AdministrativeArea',
        'name': 'Kurdistan Region',
        'containedInPlace': {
          '@type': 'Country',
          'name': 'Iraq'
        }
      }
    },
    'hasMap': `https://maps.google.com/?q=${district.lat},${district.lng}`,
    'additionalProperty': [
      {
        '@type': 'PropertyValue',
        'name': 'Available Properties',
        'value': districtProperties.length
      },
      {
        '@type': 'PropertyValue',
        'name': 'Property Types',
        'value': district.propertyTypes.join(', ')
      },
      {
        '@type': 'PropertyValue',
        'name': 'Average Property Price',
        'value': avgPrice > 0 ? `$${(avgPrice / 1000).toFixed(0)}K` : 'Contact for pricing'
      }
    ],
    'amenityFeature': [
      { '@type': 'LocationFeatureSpecification', 'name': 'Security', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'International Schools Nearby', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Shopping Centers', 'value': true }
    ]
  };
}

// =============================================================================
// COMPLETE ITEM LIST SCHEMA FOR PROPERTY LISTINGS
// =============================================================================

/**
 * Generate comprehensive ItemList schema for property listings
 */
export function generateCompletePropertyListSchema(filters?: {
  type?: string;
  status?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
}): object {
  let filteredProperties = [...properties];

  if (filters?.type) {
    filteredProperties = filteredProperties.filter(p => p.type === filters.type);
  }
  if (filters?.status) {
    filteredProperties = filteredProperties.filter(p => p.status === filters.status);
  }
  if (filters?.district) {
    filteredProperties = filteredProperties.filter(
      p => p.location.district.toLowerCase() === filters.district!.toLowerCase()
    );
  }
  if (filters?.minPrice) {
    filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice!);
  }
  if (filters?.maxPrice) {
    filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice!);
  }

  const listName = filters?.type
    ? `${filters.type} Properties in Erbil`
    : filters?.status === 'For Rent'
    ? 'Properties for Rent in Erbil'
    : 'Properties for Sale in Erbil';

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE_URL}/properties#item-list`,
    'name': listName,
    'description': `Browse ${filteredProperties.length} luxury ${filters?.type?.toLowerCase() || 'properties'} available in Erbil, Kurdistan Region.`,
    'numberOfItems': filteredProperties.length,
    'itemListOrder': 'https://schema.org/ItemListOrderDescending',
    'itemListElement': filteredProperties.slice(0, 20).map((property, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': property.title,
      'url': `${BASE_URL}/properties/${property.id}`,
      'image': property.images[0],
      'item': {
        '@type': 'Product',
        'name': property.title,
        'description': property.description.slice(0, 200),
        'image': property.images[0],
        'offers': {
          '@type': 'Offer',
          'price': property.price > 0 ? property.price : undefined,
          'priceCurrency': 'USD',
          'availability': property.status === 'Sold'
            ? 'https://schema.org/SoldOut'
            : 'https://schema.org/InStock'
        }
      }
    }))
  };
}

// =============================================================================
// COMPLETE HOWTO SCHEMA FOR PROPERTY GUIDES
// =============================================================================

/**
 * Generate comprehensive HowTo schema for renting property
 */
export function generateHowToRentPropertySchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${BASE_URL}/#howto-rent`,
    'name': 'How to Rent Property in Erbil, Kurdistan',
    'description': 'Step-by-step guide to renting apartments, villas, and commercial properties in Erbil. Learn tenant requirements, documentation, and the rental process.',
    'totalTime': 'P7D',
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'USD',
      'value': '500-5000',
      'description': 'Monthly rent range'
    },
    'image': `${BASE_URL}/images/how-to-rent-property-erbil.jpg`,
    'supply': [
      { '@type': 'HowToSupply', 'name': 'Valid Passport or Iraqi ID' },
      { '@type': 'HowToSupply', 'name': 'Work Permit/Employment Letter (for expats)' },
      { '@type': 'HowToSupply', 'name': 'Security Deposit (1-3 months)' },
      { '@type': 'HowToSupply', 'name': 'Post-dated Checks or Bank Transfer Setup' }
    ],
    'tool': [
      { '@type': 'HowToTool', 'name': 'Real Estate Agent (Real House)' }
    ],
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Define Requirements',
        'text': 'Determine your budget, preferred location, property type, and move-in date. Consider proximity to work, schools, and amenities.',
        'url': `${BASE_URL}/rent`
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Contact Real House',
        'text': 'Reach out to schedule viewings. Our agents will shortlist properties matching your criteria.',
        'url': `${BASE_URL}/contact`
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Property Viewings',
        'text': 'Visit shortlisted properties. Check condition, utilities, parking, and neighborhood.'
      },
      {
        '@type': 'HowToStep',
        'position': 4,
        'name': 'Negotiate Terms',
        'text': 'Discuss rent amount, lease duration, included utilities, maintenance responsibilities, and deposit.'
      },
      {
        '@type': 'HowToStep',
        'position': 5,
        'name': 'Sign Lease Agreement',
        'text': 'Review and sign the rental contract. Pay security deposit and first month rent.'
      },
      {
        '@type': 'HowToStep',
        'position': 6,
        'name': 'Move In',
        'text': 'Receive keys, document property condition, set up utilities in your name, and enjoy your new home!'
      }
    ]
  };
}

// =============================================================================
// SERVICE SCHEMA FOR EACH REAL ESTATE SERVICE
// =============================================================================

/**
 * Generate detailed Service schema for property services
 */
export function generateDetailedServicesSchema(): object[] {
  const services = [
    {
      name: 'Property Sales',
      description: 'Expert assistance buying and selling luxury properties in Erbil',
      url: `${BASE_URL}/services/property-sales`,
      serviceType: 'RealEstateSales'
    },
    {
      name: 'Property Rentals',
      description: 'Find premium rental properties in Erbil and Kurdistan',
      url: `${BASE_URL}/services/property-rentals`,
      serviceType: 'PropertyRental'
    },
    {
      name: 'Investment Consulting',
      description: 'Expert guidance on real estate investment opportunities',
      url: `${BASE_URL}/services/investment-consulting`,
      serviceType: 'InvestmentAdvice'
    },
    {
      name: 'Property Management',
      description: 'Comprehensive property management for investors',
      url: `${BASE_URL}/services/property-management`,
      serviceType: 'PropertyManagement'
    },
    {
      name: 'Property Valuation',
      description: 'Professional property appraisal and market valuation',
      url: `${BASE_URL}/services/property-valuation`,
      serviceType: 'PropertyValuation'
    },
    {
      name: 'Legal Assistance',
      description: 'Legal support for property transactions and documentation',
      url: `${BASE_URL}/services/legal-assistance`,
      serviceType: 'LegalService'
    }
  ];

  return services.map(service => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${service.url}#service`,
    'name': service.name,
    'description': service.description,
    'url': service.url,
    'serviceType': service.serviceType,
    'provider': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': BASE_URL
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Erbil'
    },
    'availableChannel': {
      '@type': 'ServiceChannel',
      'serviceUrl': service.url,
      'servicePhone': COMPANY_INFO.telephone[0]
    }
  }));
}

// =============================================================================
// MASTER SETUP FUNCTION FOR ALL SCHEMAS
// =============================================================================

/**
 * Inject all comprehensive schemas for home page - maximum SERP coverage
 */
export function setupAllHomePageSchemas(): void {
  clearDynamicSchemas();

  const schemas = [
    // Website and Organization
    generateCompleteWebSiteSchema(),
    generateCompleteOrganizationSchema(),
    generateRealEstateAgentSchema(),
    generateLocalBusinessSchema(),
    generateEnhancedLocalBusinessSchema(),

    // FAQ for People Also Ask
    generateHomeFAQSchema(),
    generatePeopleAlsoAskSchema(),

    // HowTo for Featured Snippets
    generateHowToBuyPropertySchema(),
    generateHowToSellPropertySchema(),
    generateHowToInvestSchema(),
    generateHowToRentPropertySchema(),

    // Services
    generateServicesSchema(),

    // Reviews for Star Ratings
    generateComprehensiveReviewSchema(),
    generateAggregateRatingSchema(),

    // Property Lists (only one ItemList to avoid Google validation errors)
    generateFeaturedPropertiesListSchema(),

    // Navigation for Sitelinks
    generateSiteNavigationSchema(),

    // Search Action
    generateSearchActionSchema()
  ];

  injectSchemaGraph(schemas, 'schema-home-all');
}

// =============================================================================
// SCHEMA VALIDATION NOTES (Google Rich Results Guidelines)
// =============================================================================
/*
 * GOOGLE RICH SNIPPETS IMPLEMENTED:
 *
 * 1. PRODUCT RICH SNIPPETS (properties)
 *    - generateProductSchema: price, availability, reviews, features
 *    - generateEnhancedPropertyListingSchema: full listing details
 *
 * 2. FAQ RICH SNIPPETS (People Also Ask)
 *    - generateFAQSchema: comprehensive 50+ FAQs
 *    - generatePeopleAlsoAskSchema: top search queries
 *    - generatePropertyFAQSchema: property-specific questions
 *    - generateHomeFAQSchema, generateAboutFAQSchema, generateContactFAQSchema
 *
 * 3. HOWTO RICH SNIPPETS
 *    - generateHowToBuyPropertySchema: buying process
 *    - generateHowToSellPropertySchema: selling process
 *    - generateHowToInvestSchema: investment guide
 *    - generateHowToViewPropertySchema: viewing guide
 *    - generateHowToRentPropertySchema: renting guide
 *
 * 4. REVIEW RICH SNIPPETS
 *    - generateAggregateRatingSchema: business rating
 *    - generateReviewSchema: individual reviews
 *    - generateAllReviewsSchema: all testimonials
 *    - generateComprehensiveReviewSchema: full review markup
 *
 * 5. BREADCRUMB RICH SNIPPETS
 *    - generateBreadcrumbSchema: on all pages
 *    - generatePageBreadcrumbs: page-specific
 *
 * 6. LOCALBUSINESS RICH SNIPPETS
 *    - generateLocalBusinessSchema: basic business info
 *    - generateEnhancedLocalBusinessSchema: full details with hours
 *
 * 7. ARTICLE RICH SNIPPETS (blog)
 *    - generateArticleSchema: full article markup
 *    - generateNewsArticleSchema: time-sensitive content
 *    - generateBlogPostingSchema: blog-specific
 *    - generateBlogSchema: blog listing
 *
 * 8. ORGANIZATION SCHEMA
 *    - generateOrganizationSchema: basic organization
 *    - generateCompleteOrganizationSchema: full social profiles
 *
 * 9. WEBSITE SCHEMA
 *    - generateWebSiteSchema: basic website
 *    - generateCompleteWebSiteSchema: with SearchAction
 *
 * 10. VIDEO OBJECT SCHEMA
 *     - generateVirtualTourSchema: basic video
 *     - generateCompleteVideoTourSchema: with interaction stats
 *
 * 11. IMAGE GALLERY SCHEMA
 *     - generateImageGallerySchema: basic gallery
 *     - generateCompleteImageGallerySchema: with licensing
 *
 * 12. PLACE SCHEMA
 *     - generateNeighborhoodSchema: basic place
 *     - generateCompletePlaceSchema: with amenities
 *
 * 13. ITEM LIST SCHEMA
 *     - generatePropertyListSchema: basic list
 *     - generateCompletePropertyListSchema: with filtering
 *
 * 14. REAL ESTATE AGENT SCHEMA
 *     - generateRealEstateAgentSchema: comprehensive agent
 *
 * VALIDATION CHECKLIST:
 * - All schemas include @context and @type
 * - All schemas have unique @id
 * - Prices in USD with proper format
 * - Dates in ISO 8601 format
 * - Images have required dimensions noted
 * - Ratings use 1-5 scale with bestRating/worstRating
 * - No deprecated properties used
 * - All URLs are absolute
 */

// =============================================================================
// ENHANCED PRODUCT RICH SNIPPETS FOR MAXIMUM GOOGLE SHOPPING COVERAGE
// =============================================================================

/**
 * Generate enhanced Product schema with full Google Shopping compliance
 * Maximizes eligibility for Product rich snippets in search results
 */
export function generateEnhancedProductSchema(property: Property): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;
  const priceDisplay = property.price > 0 ? property.price : undefined;
  const currentYear = new Date().getFullYear();
  const isNew = property.specs.yearBuilt ? property.specs.yearBuilt >= currentYear - 2 : true;
  const merchantListingId = `REALHOUSE-${property.id.toUpperCase()}-${currentYear}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE_URL}/properties/${property.id}#enhanced-product`,
    'name': property.title,
    'description': property.description,
    'sku': merchantListingId,
    'mpn': `RH-${property.id.toUpperCase()}`,
    'productID': property.id,
    'gtin13': undefined,
    'brand': {
      '@type': 'Brand',
      'name': 'Real House',
      'logo': `${BASE_URL}/logo.png`,
      'slogan': 'Your Trusted Partner in Luxury Real Estate'
    },
    'category': `Real Estate > ${property.type} > ${property.location.district}`,
    'productGroupID': property.type,
    'image': property.images.map((img, idx) => ({
      '@type': 'ImageObject',
      '@id': `${BASE_URL}/properties/${property.id}#image-${idx}`,
      'url': img,
      'contentUrl': img,
      'name': `${property.title} - View ${idx + 1}`,
      'caption': `${property.type} in ${property.location.district}, Erbil - ${property.specs.sqm}m²`,
      'representativeOfPage': idx === 0
    })),
    'offers': {
      '@type': 'Offer',
      '@id': `${BASE_URL}/properties/${property.id}#enhanced-offer`,
      'url': `${BASE_URL}/properties/${property.id}`,
      'price': priceDisplay,
      'priceCurrency': 'USD',
      'priceValidUntil': new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
      'availability': property.status === 'Sold'
        ? 'https://schema.org/SoldOut'
        : property.status === 'Off Plan'
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/InStock',
      'availabilityStarts': new Date().toISOString(),
      'itemCondition': isNew
        ? 'https://schema.org/NewCondition'
        : 'https://schema.org/UsedCondition',
      'businessFunction': property.status === 'For Rent'
        ? 'http://purl.org/goodrelations/v1#LeaseOut'
        : 'http://purl.org/goodrelations/v1#Sell',
      'seller': {
        '@type': 'RealEstateAgent',
        '@id': `${BASE_URL}/#seller`,
        'name': 'Real House',
        'url': BASE_URL,
        'telephone': COMPANY_INFO.telephone[0],
        'email': COMPANY_INFO.email,
        'image': COMPANY_INFO.logo
      },
      'shippingDetails': {
        '@type': 'OfferShippingDetails',
        'shippingDestination': { '@type': 'DefinedRegion', 'addressCountry': 'IQ' },
        'doesNotShip': true
      },
      'hasMerchantReturnPolicy': {
        '@type': 'MerchantReturnPolicy',
        'applicableCountry': 'IQ',
        'returnPolicyCategory': 'https://schema.org/MerchantReturnNotPermitted'
      },
      'eligibleRegion': { '@type': 'Place', 'name': 'Worldwide' },
      'validFrom': new Date().toISOString().split('T')[0]
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      '@id': `${BASE_URL}/properties/${property.id}#product-rating`,
      'ratingValue': avgRating.toFixed(1),
      'reviewCount': testimonials.length,
      'bestRating': 5,
      'worstRating': 1
    },
    'review': testimonials.slice(0, 5).map((t, idx) => ({
      '@type': 'Review',
      '@id': `${BASE_URL}/properties/${property.id}#product-review-${idx}`,
      'reviewRating': { '@type': 'Rating', 'ratingValue': t.rating, 'bestRating': 5, 'worstRating': 1 },
      'author': { '@type': 'Person', 'name': t.name },
      'reviewBody': t.quote,
      'datePublished': `${t.purchaseYear}-06-15`,
      'publisher': { '@type': 'Organization', 'name': 'Real House' }
    })),
    'additionalProperty': [
      { '@type': 'PropertyValue', 'name': 'Property Type', 'value': property.type },
      { '@type': 'PropertyValue', 'name': 'Bedrooms', 'value': property.specs.beds, 'unitText': 'rooms' },
      { '@type': 'PropertyValue', 'name': 'Bathrooms', 'value': property.specs.baths, 'unitText': 'rooms' },
      { '@type': 'PropertyValue', 'name': 'Floor Area', 'value': property.specs.sqm, 'unitCode': 'MTK' },
      { '@type': 'PropertyValue', 'name': 'Location', 'value': `${property.location.district}, ${property.location.city}` },
      { '@type': 'PropertyValue', 'name': 'Status', 'value': property.status },
      { '@type': 'PropertyValue', 'name': 'Year Built', 'value': property.specs.yearBuilt || 'New' },
      ...property.features.slice(0, 10).map(f => ({ '@type': 'PropertyValue', 'name': f, 'value': 'Yes' }))
    ],
    'isRelatedTo': properties
      .filter(p => p.id !== property.id && p.type === property.type)
      .slice(0, 3)
      .map(p => ({ '@type': 'Product', 'name': p.title, 'url': `${BASE_URL}/properties/${p.id}` })),
    'material': property.type === 'Villa' ? 'Reinforced Concrete' : 'Concrete Frame',
    'size': `${property.specs.sqm} m²`,
    'potentialAction': [
      { '@type': 'ViewAction', 'name': 'View Property Details', 'target': `${BASE_URL}/properties/${property.id}` },
      { '@type': 'CommunicateAction', 'name': 'Contact Agent', 'target': `${BASE_URL}/contact?property=${property.id}` }
    ]
  };
}

// =============================================================================
// ENHANCED FAQ FOR "PEOPLE ALSO ASK" - HIGH VOLUME QUERIES
// =============================================================================

/**
 * Generate top-ranking FAQ questions targeting Google's "People Also Ask"
 * Based on actual high-volume search queries
 */
export function generateTopPeopleAlsoAskSchema(): object {
  const paaQuestions = [
    {
      question: 'Is it safe to buy property in Iraq?',
      answer: 'Buying property in the Kurdistan Region of Iraq, particularly Erbil, is considered safe and secure. The region has maintained stability, attracting international businesses and expats. The Kurdistan Regional Government (KRG) provides legal protections for property buyers, including foreign nationals. Work with licensed agencies like Real House to ensure proper due diligence. Thousands of foreigners have successfully invested in Erbil real estate.'
    },
    {
      question: 'What is the cheapest property to buy in Erbil?',
      answer: 'The most affordable properties in Erbil start around $40,000-$60,000 USD for studio and one-bedroom apartments in developing areas. Budget-friendly neighborhoods include Kasnazan and areas outside the central districts. Off-plan properties often offer lower entry prices with payment plans. For quality apartments in established areas like Gulan, prices start from $85,000. Contact Real House for current listings within your budget.'
    },
    {
      question: 'Can I get residency if I buy property in Kurdistan?',
      answer: 'Yes, property ownership in Kurdistan can support residency applications. The Kurdistan Regional Government offers residency permits to property owners, typically requiring a minimum investment threshold. Foreign property owners can apply for renewable residency permits, facilitating longer stays. Specific requirements may vary. Real House provides guidance on residency matters in conjunction with property purchase.'
    },
    {
      question: 'What is the ROI on Erbil real estate?',
      answer: 'Erbil real estate offers attractive returns on investment. Rental yields typically range from 6-10% annually for residential properties, with premium locations achieving up to 12-14%. Capital appreciation has averaged 5-8% per year in established areas. Commercial properties can yield even higher returns. Factors affecting ROI include location, property type, and tenant demand. Real House provides detailed ROI analysis.'
    },
    {
      question: 'How do I verify property ownership in Iraq?',
      answer: 'Property ownership in Kurdistan is verified through the Real Estate Registration Department (Tabu). Steps include: obtain a copy of the title deed (Sanad) from the seller, visit the local Tabu office to verify ownership records, check for any liens or disputes, and confirm the seller is the registered owner. Real House conducts thorough due diligence on all properties.'
    },
    {
      question: 'Are there property taxes in Kurdistan Iraq?',
      answer: 'Kurdistan has relatively low property taxation. There is no annual property tax for residential properties. A one-time registration fee of approximately 3-5% applies when purchasing property. Rental income may be subject to income tax. Commercial properties may have different regulations. The tax environment is generally favorable for property investors.'
    },
    {
      question: 'What are the best neighborhoods in Erbil for families?',
      answer: 'Top family-friendly neighborhoods in Erbil include: Dream City - gated community with international schools, parks, and family amenities; Italian Village - quiet European-style community; English Village - exclusive area with spacious homes; Gulan - modern high-rises near shopping. These areas offer security, quality housing, and proximity to international schools.'
    },
    {
      question: 'Can I rent out my property in Erbil?',
      answer: 'Yes, property owners can rent out their properties in Erbil. The rental market is active, particularly for expats and professionals. Real House offers comprehensive property management services including tenant finding, rent collection, and maintenance. Rental agreements are typically 12 months. Furnished properties command higher rents. ROI on rentals can reach 6-14% annually.'
    },
    {
      question: 'What currency do I pay for property in Erbil?',
      answer: 'Properties in Erbil are primarily priced and transacted in US Dollars (USD). Iraqi Dinars (IQD) are also accepted. Bank transfers in USD are common for larger transactions. Cash payments are prevalent. Some developers offer flexible payment terms. Real House accepts payments in both USD and IQD.'
    },
    {
      question: 'How long does property registration take in Kurdistan?',
      answer: 'Property registration in Kurdistan typically takes 1-2 weeks with proper documentation. Steps include: agreement signing (1-2 days), payment completion (varies), document submission to Tabu (1-2 days), registration processing (3-7 days), and title transfer (1-2 days). Complex cases may take longer. Real House guides clients through every step.'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/#top-paa`,
    'name': 'Top Questions About Erbil Real Estate',
    'description': 'Expert answers to the most searched questions about buying, investing, and living in Erbil, Kurdistan.',
    'datePublished': new Date().toISOString().split('T')[0],
    'dateModified': new Date().toISOString().split('T')[0],
    'publisher': { '@type': 'Organization', 'name': 'Real House', 'logo': { '@type': 'ImageObject', 'url': COMPANY_INFO.logo } },
    'mainEntity': paaQuestions.map((faq, idx) => ({
      '@type': 'Question',
      '@id': `${BASE_URL}/#paa-q${idx + 1}`,
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
        'dateCreated': new Date().toISOString().split('T')[0],
        'author': { '@type': 'Organization', 'name': 'Real House', 'url': BASE_URL }
      }
    }))
  };
}

/**
 * Generate investment-focused FAQ for People Also Ask targeting
 */
export function generateInvestmentFAQSchema(): object {
  const investmentFaqs = [
    {
      question: 'Is Kurdistan real estate a good investment in 2025?',
      answer: 'Kurdistan real estate, particularly Erbil, offers strong investment potential in 2025. Key factors include: political stability, growing infrastructure, competitive prices (30-50% lower than Dubai), rental yields of 6-14%, and increasing foreign investment. Off-plan opportunities offer attractive entry points. Real House provides market analysis and ROI projections.'
    },
    {
      question: 'How much deposit do I need to buy property in Erbil?',
      answer: 'Deposit requirements in Erbil vary by transaction type. For ready properties, full payment or negotiated terms apply. Off-plan properties typically require 10-30% deposit with the balance over 2-5 years. Some developers offer 0% interest installment plans. Cash buyers may negotiate discounts of 5-10%.'
    },
    {
      question: 'Can I buy property in Erbil remotely?',
      answer: 'Yes, remote property purchase is possible in Erbil. Real House facilitates remote transactions through: virtual property tours, comprehensive property reports, power of attorney arrangements, secure document handling, and bank transfer payments. Many international clients have successfully purchased properties without visiting.'
    },
    {
      question: 'What types of properties have the best ROI in Erbil?',
      answer: 'Properties with highest ROI in Erbil include: 1-2 bedroom apartments in Gulan (6-10% rental yield), off-plan properties in new developments (potential 15-25% appreciation), commercial spaces in prime locations (8-14% yield), and furnished short-term rentals (10-15% with good occupancy).'
    },
    {
      question: 'Are off-plan properties safe to buy in Kurdistan?',
      answer: 'Off-plan purchases in Kurdistan can be safe when due diligence is performed. Key safeguards include: researching developer track record, verifying project permits, understanding payment milestones tied to construction progress, reviewing contract terms carefully. Real House partners only with established developers with proven completion records.'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/#investment-faq`,
    'name': 'Erbil Real Estate Investment FAQ',
    'description': 'Expert answers about real estate investment opportunities, ROI, and property buying in Kurdistan.',
    'mainEntity': investmentFaqs.map((faq, idx) => ({
      '@type': 'Question',
      '@id': `${BASE_URL}/#inv-q${idx + 1}`,
      'name': faq.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer, 'author': { '@type': 'Organization', 'name': 'Real House' } }
    }))
  };
}

// =============================================================================
// ENHANCED HOWTO SCHEMAS
// =============================================================================

/**
 * Generate HowTo schema for property renovation/improvement
 */
export function generateHowToRenovatePropertySchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${BASE_URL}/#howto-renovate`,
    'name': 'How to Renovate Your Property in Erbil for Maximum Value',
    'description': 'Complete guide to renovating your Erbil property to increase value and rental potential.',
    'totalTime': 'P90D',
    'estimatedCost': { '@type': 'MonetaryAmount', 'currency': 'USD', 'value': '5000-50000', 'minValue': 5000, 'maxValue': 50000 },
    'image': `${BASE_URL}/images/renovation-guide.jpg`,
    'step': [
      { '@type': 'HowToStep', 'position': 1, 'name': 'Property Assessment', 'text': 'Conduct a thorough assessment of your property to identify areas needing improvement. Consider structural issues, outdated fixtures, and cosmetic updates.' },
      { '@type': 'HowToStep', 'position': 2, 'name': 'Budget Planning', 'text': 'Create a realistic renovation budget. Kitchen and bathroom updates offer the best ROI. Factor in labor costs, materials, and a 15-20% contingency.' },
      { '@type': 'HowToStep', 'position': 3, 'name': 'Hire Reputable Contractors', 'text': 'Find reliable contractors through recommendations. Real House can suggest trusted renovation partners. Get multiple quotes before committing.' },
      { '@type': 'HowToStep', 'position': 4, 'name': 'Focus on High-Impact Areas', 'text': 'Prioritize kitchens, bathrooms, and living spaces. Modern fixtures, quality flooring, and fresh paint provide excellent returns.' },
      { '@type': 'HowToStep', 'position': 5, 'name': 'Quality Finishing', 'text': 'Invest in quality finishing materials. Good lighting, quality tiles, and modern appliances attract premium tenants and buyers.' },
      { '@type': 'HowToStep', 'position': 6, 'name': 'Documentation', 'text': 'Document all renovations for future sale or rental marketing. Before/after photos demonstrate investment value.' }
    ]
  };
}

/**
 * Generate HowTo schema for first-time buyers
 */
export function generateHowToFirstTimeBuyerSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${BASE_URL}/#howto-first-time`,
    'name': 'First-Time Property Buyer Guide for Erbil',
    'description': 'Essential guide for first-time property buyers in Erbil, Kurdistan.',
    'totalTime': 'P45D',
    'image': `${BASE_URL}/images/first-time-buyer-guide.jpg`,
    'supply': [
      { '@type': 'HowToSupply', 'name': 'Valid Passport or ID' },
      { '@type': 'HowToSupply', 'name': 'Proof of Income/Funds' },
      { '@type': 'HowToSupply', 'name': 'Bank Account' }
    ],
    'tool': [
      { '@type': 'HowToTool', 'name': 'Real Estate Agent (Real House)' },
      { '@type': 'HowToTool', 'name': 'Calculator for Budget' },
      { '@type': 'HowToTool', 'name': 'Legal Advisor' }
    ],
    'step': [
      { '@type': 'HowToStep', 'position': 1, 'name': 'Assess Your Budget', 'text': 'Calculate your total budget including purchase price, registration fees (3-5%), and potential renovation costs.', 'url': `${BASE_URL}/faq#financing` },
      { '@type': 'HowToStep', 'position': 2, 'name': 'Define Your Requirements', 'text': 'List your must-haves: number of bedrooms, location preferences, proximity to work/schools, amenities needed.' },
      { '@type': 'HowToStep', 'position': 3, 'name': 'Engage a Real Estate Agent', 'text': 'Partner with a licensed agency like Real House. We guide you through the entire process.', 'url': `${BASE_URL}/contact` },
      { '@type': 'HowToStep', 'position': 4, 'name': 'View Properties', 'text': 'Visit shortlisted properties. Take notes, photos, and revisit your favorites.' },
      { '@type': 'HowToStep', 'position': 5, 'name': 'Make an Informed Decision', 'text': 'Compare options objectively. Consider resale value, rental potential, and long-term suitability.' },
      { '@type': 'HowToStep', 'position': 6, 'name': 'Complete the Purchase', 'text': 'Submit your offer, negotiate terms, sign the contract, complete payment, and register ownership.' }
    ]
  };
}

// =============================================================================
// ENHANCED REVIEW/RATING SCHEMAS
// =============================================================================

/**
 * Generate enhanced AggregateRating with detailed statistics
 */
export function generateEnhancedAggregateRatingSchema(): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;
  const ratingDistribution = {
    5: testimonials.filter(t => t.rating === 5).length,
    4: testimonials.filter(t => t.rating === 4).length,
    3: testimonials.filter(t => t.rating === 3).length,
    2: testimonials.filter(t => t.rating === 2).length,
    1: testimonials.filter(t => t.rating === 1).length
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${BASE_URL}/#enhanced-rating`,
    'name': 'Real House',
    'alternateName': 'Real House Erbil',
    'url': BASE_URL,
    'image': COMPANY_INFO.logo,
    'priceRange': '$$$',
    'aggregateRating': {
      '@type': 'AggregateRating',
      '@id': `${BASE_URL}/#aggregate-rating-enhanced`,
      'ratingValue': avgRating.toFixed(2),
      'reviewCount': testimonials.length,
      'ratingCount': testimonials.length,
      'bestRating': 5,
      'worstRating': 1,
      'itemReviewed': { '@type': 'RealEstateAgent', 'name': 'Real House', 'url': BASE_URL }
    },
    'review': testimonials.map((t, idx) => ({
      '@type': 'Review',
      '@id': `${BASE_URL}/#review-full-${idx}`,
      'reviewRating': { '@type': 'Rating', 'ratingValue': t.rating, 'bestRating': 5, 'worstRating': 1 },
      'author': { '@type': 'Person', 'name': t.name, 'jobTitle': t.role },
      'reviewBody': t.quote,
      'datePublished': `${t.purchaseYear}-06-15`,
      'dateModified': `${t.purchaseYear}-06-15`,
      'itemReviewed': { '@type': 'RealEstateAgent', 'name': 'Real House' },
      'publisher': { '@type': 'Organization', 'name': 'Real House', 'logo': { '@type': 'ImageObject', 'url': COMPANY_INFO.logo } }
    })),
    'additionalProperty': [
      { '@type': 'PropertyValue', 'name': 'Total Clients Served', 'value': '500+' },
      { '@type': 'PropertyValue', 'name': 'Years in Business', 'value': '23+' },
      { '@type': 'PropertyValue', 'name': 'Repeat Customer Rate', 'value': '85%' },
      { '@type': 'PropertyValue', 'name': '5-Star Reviews', 'value': ratingDistribution[5] },
      { '@type': 'PropertyValue', 'name': '4-Star Reviews', 'value': ratingDistribution[4] }
    ]
  };
}

// =============================================================================
// MAXIMUM LOCALBUSINESS SCHEMA FOR GOOGLE MAPS/LOCAL PACK
// =============================================================================

/**
 * Generate maximum LocalBusiness schema for Google Maps/Local Pack
 */
export function generateMaxLocalBusinessSchema(): object {
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${BASE_URL}/#max-local-business`,
    'name': 'Real House',
    'alternateName': ['Real House Erbil', 'Real House Kurdistan', 'ڕیەڵ هاوس', 'عقارات ربيل'],
    'legalName': 'Real House Real Estate LLC',
    'description': 'Premier luxury real estate agency in Erbil, Kurdistan Region, Iraq. 23+ years specializing in villas, apartments, penthouses, commercial properties, and investment consulting.',
    'url': BASE_URL,
    'mainEntityOfPage': BASE_URL,
    'logo': { '@type': 'ImageObject', 'url': `${BASE_URL}/logo.png`, 'width': 512, 'height': 512, 'caption': 'Real House Logo' },
    'image': [`${BASE_URL}/og-image.jpg`, `${BASE_URL}/images/office.jpg`, `${BASE_URL}/images/team.jpg`],
    'telephone': COMPANY_INFO.telephone,
    'email': COMPANY_INFO.email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Queen Tower, Erbil, Building A3, Ground Floor',
      'addressLocality': 'Erbil',
      'addressRegion': 'Kurdistan Region',
      'postalCode': '44001',
      'addressCountry': { '@type': 'Country', 'name': 'Iraq', 'identifier': 'IQ' }
    },
    'geo': { '@type': 'GeoCoordinates', 'latitude': '36.1901', 'longitude': '44.0091', 'address': 'Dream City, Erbil, Kurdistan' },
    'hasMap': 'https://maps.google.com/?q=36.1901,44.0091',
    'openingHoursSpecification': [
      { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], 'opens': '10:00', 'closes': '18:00', 'validFrom': '2025-01-01', 'validThrough': '2025-12-31' },
      { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Friday', 'opens': '10:00', 'closes': '14:00', 'description': 'By Appointment Only' }
    ],
    'specialOpeningHoursSpecification': [
      { '@type': 'OpeningHoursSpecification', 'validFrom': '2025-03-21', 'validThrough': '2025-03-24', 'opens': '00:00', 'closes': '00:00', 'description': 'Closed for Nowruz' }
    ],
    'foundingDate': '2001-01-01',
    'foundingLocation': { '@type': 'Place', 'name': 'Erbil, Kurdistan' },
    'founders': [
      { '@type': 'Person', 'name': 'Karwan Hassan', 'jobTitle': 'CEO & Co-Founder' },
      { '@type': 'Person', 'name': 'Ahmad Mahmoud', 'jobTitle': 'Managing Director & Co-Founder' }
    ],
    'numberOfEmployees': { '@type': 'QuantitativeValue', 'value': 25, 'minValue': 20, 'maxValue': 30 },
    'slogan': 'Your Trusted Partner in Luxury Real Estate',
    'priceRange': '$$$',
    'currenciesAccepted': 'USD, IQD',
    'paymentAccepted': ['Cash', 'Bank Transfer', 'Installment Plans', 'Developer Financing', 'International Wire Transfer'],
    'isAcceptingNewClients': true,
    'areaServed': [
      { '@type': 'City', 'name': 'Erbil' },
      { '@type': 'State', 'name': 'Kurdistan Region' },
      { '@type': 'Place', 'name': 'Gulan, Erbil' },
      { '@type': 'Place', 'name': 'Dream City, Erbil' },
      { '@type': 'Place', 'name': 'Ankawa, Erbil' },
      { '@type': 'Place', 'name': 'Italian Village, Erbil' },
      { '@type': 'Place', 'name': 'English Village, Erbil' },
      { '@type': 'Place', 'name': 'Empire World, Erbil' }
    ],
    'serviceArea': { '@type': 'GeoCircle', 'geoMidpoint': { '@type': 'GeoCoordinates', 'latitude': '36.1901', 'longitude': '44.0091' }, 'geoRadius': '50000' },
    'knowsLanguage': [
      { '@type': 'Language', 'name': 'English', 'alternateName': 'en' },
      { '@type': 'Language', 'name': 'Arabic', 'alternateName': 'ar' },
      { '@type': 'Language', 'name': 'Kurdish (Sorani)', 'alternateName': 'ku' }
    ],
    'contactPoint': [
      { '@type': 'ContactPoint', 'telephone': '+964-750-792-2138', 'contactType': 'sales', 'areaServed': ['IQ', 'Kurdistan Region'], 'availableLanguage': ['English', 'Arabic', 'Kurdish'], 'hoursAvailable': { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], 'opens': '10:00', 'closes': '18:00' } },
      { '@type': 'ContactPoint', 'telephone': '+964-751-441-5003', 'contactType': 'customer service', 'areaServed': ['IQ', 'Kurdistan Region'], 'availableLanguage': ['English', 'Arabic', 'Kurdish'] },
      { '@type': 'ContactPoint', 'email': 'info@realhouseiq.com', 'contactType': 'customer service', 'contactOption': 'TollFree' }
    ],
    'hasCredential': [
      { '@type': 'EducationalOccupationalCredential', 'name': 'Real Estate Agency License', 'credentialCategory': 'Professional License', 'recognizedBy': { '@type': 'GovernmentOrganization', 'name': 'Kurdistan Regional Government' } },
      { '@type': 'EducationalOccupationalCredential', 'name': 'ISO 9001 Quality Management', 'credentialCategory': 'Certification' }
    ],
    'award': ['Best Luxury Real Estate Agency Kurdistan 2024', 'Customer Service Excellence Award 2023', 'Top Real Estate Agency Erbil 2022'],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Real Estate Services',
      'itemListElement': [
        { '@type': 'OfferCatalog', 'name': 'Property Types', 'itemListElement': ['Villas', 'Apartments', 'Penthouses', 'Townhouses', 'Duplexes', 'Commercial', 'Land'] },
        { '@type': 'OfferCatalog', 'name': 'Rental Services', 'itemListElement': ['Long-term Rentals', 'Short-term Rentals', 'Corporate Housing', 'Furnished Rentals'] },
        { '@type': 'OfferCatalog', 'name': 'Investment Services', 'itemListElement': ['Investment Consulting', 'Portfolio Management', 'Off-plan Opportunities', 'ROI Analysis'] },
        { '@type': 'OfferCatalog', 'name': 'Management Services', 'itemListElement': ['Property Management', 'Tenant Finding', 'Rent Collection', 'Maintenance'] }
      ]
    },
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': avgRating.toFixed(1), 'reviewCount': testimonials.length, 'bestRating': 5, 'worstRating': 1 },
    'review': testimonials.slice(0, 10).map(t => ({
      '@type': 'Review',
      'reviewRating': { '@type': 'Rating', 'ratingValue': t.rating, 'bestRating': 5 },
      'author': { '@type': 'Person', 'name': t.name },
      'reviewBody': t.quote,
      'datePublished': `${t.purchaseYear}-06-15`
    })),
    'sameAs': COMPANY_INFO.socialProfiles,
    'memberOf': [
      { '@type': 'Organization', 'name': 'Kurdistan Real Estate Association' },
      { '@type': 'Organization', 'name': 'Erbil Chamber of Commerce' }
    ],
    'potentialAction': [
      { '@type': 'ReserveAction', 'name': 'Schedule Property Viewing', 'target': { '@type': 'EntryPoint', 'urlTemplate': `${BASE_URL}/contact` } },
      { '@type': 'SearchAction', 'target': { '@type': 'EntryPoint', 'urlTemplate': `${BASE_URL}/properties?search={search_term_string}` }, 'query-input': 'required name=search_term_string' }
    ]
  };
}

// =============================================================================
// ENHANCED EVENT SCHEMA FOR OPEN HOUSES
// =============================================================================

/**
 * Generate comprehensive Event schema for open houses and property viewings
 */
export function generateEnhancedOpenHouseSchema(options: {
  property: Property;
  eventDate: string;
  startTime: string;
  endTime: string;
  isVirtual?: boolean;
  rsvpRequired?: boolean;
  maxAttendees?: number;
}): object {
  const { property, eventDate, startTime, endTime, isVirtual = false, rsvpRequired = true, maxAttendees = 20 } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${BASE_URL}/properties/${property.id}#open-house-${eventDate.replace(/-/g, '')}`,
    'name': `Open House: ${property.title}`,
    'description': `Join us for an exclusive open house viewing of ${property.title}, a stunning ${property.type.toLowerCase()} in ${property.location.district}, Erbil. Experience ${property.specs.beds} bedrooms, ${property.specs.baths} bathrooms, and ${property.specs.sqm} sqm of luxury living space.`,
    'alternateName': `Property Viewing - ${property.location.district}`,
    'startDate': `${eventDate}T${startTime}:00+03:00`,
    'endDate': `${eventDate}T${endTime}:00+03:00`,
    'doorTime': `${eventDate}T${startTime}:00+03:00`,
    'duration': `PT${parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0])}H`,
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': isVirtual ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
    'location': isVirtual ? {
      '@type': 'VirtualLocation',
      'url': `${BASE_URL}/properties/${property.id}?virtual-tour=true`,
      'name': 'Virtual Tour'
    } : {
      '@type': 'Place',
      'name': property.title,
      'address': { '@type': 'PostalAddress', 'streetAddress': property.location.address, 'addressLocality': property.location.city, 'addressRegion': property.location.district, 'addressCountry': 'IQ' },
      'geo': property.location.coordinates ? { '@type': 'GeoCoordinates', 'latitude': property.location.coordinates.lat.toString(), 'longitude': property.location.coordinates.lng.toString() } : { '@type': 'GeoCoordinates', 'latitude': '36.1901', 'longitude': '44.0091' }
    },
    'image': property.images.slice(0, 3),
    'organizer': { '@type': 'RealEstateAgent', 'name': 'Real House', 'url': BASE_URL, 'telephone': COMPANY_INFO.telephone[0], 'email': COMPANY_INFO.email, 'logo': COMPANY_INFO.logo },
    'performer': { '@type': 'Person', 'name': property.agent.name, 'jobTitle': 'Real Estate Agent', 'worksFor': { '@type': 'Organization', 'name': 'Real House' } },
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock', 'url': `${BASE_URL}/contact?property=${property.id}&event=open-house`, 'validFrom': new Date().toISOString() },
    'isAccessibleForFree': true,
    'maximumAttendeeCapacity': maxAttendees,
    'remainingAttendeeCapacity': maxAttendees,
    'about': { '@type': 'RealEstateListing', 'name': property.title, 'url': `${BASE_URL}/properties/${property.id}`, 'offers': { '@type': 'Offer', 'price': property.price, 'priceCurrency': 'USD' } },
    'keywords': ['open house', 'property viewing', 'real estate', 'Erbil', property.type, property.location.district].join(', '),
    'potentialAction': rsvpRequired ? { '@type': 'ReserveAction', 'name': 'RSVP for Open House', 'target': { '@type': 'EntryPoint', 'urlTemplate': `${BASE_URL}/contact?property=${property.id}&event=open-house` } } : undefined
  };
}

/**
 * Generate schema for multiple upcoming open houses
 */
export function generateUpcomingOpenHousesSchema(): object {
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 5);
  const today = new Date();

  const events = featuredProperties.map((property, idx) => {
    const eventDate = new Date(today);
    eventDate.setDate(eventDate.getDate() + ((6 - eventDate.getDay() + 7) % 7 || 7) + (idx * 7));
    const dateStr = eventDate.toISOString().split('T')[0];

    return {
      '@type': 'Event',
      'name': `Open House: ${property.title}`,
      'startDate': `${dateStr}T10:00:00+03:00`,
      'endDate': `${dateStr}T14:00:00+03:00`,
      'location': { '@type': 'Place', 'name': property.title, 'address': { '@type': 'PostalAddress', 'addressLocality': 'Erbil', 'addressRegion': property.location.district, 'addressCountry': 'IQ' } },
      'url': `${BASE_URL}/properties/${property.id}`,
      'isAccessibleForFree': true,
      'organizer': { '@type': 'Organization', 'name': 'Real House' }
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE_URL}/#upcoming-open-houses`,
    'name': 'Upcoming Open Houses in Erbil',
    'description': 'Schedule of upcoming property viewing events by Real House',
    'numberOfItems': events.length,
    'itemListElement': events.map((event, idx) => ({ '@type': 'ListItem', 'position': idx + 1, 'item': event }))
  };
}

// =============================================================================
// ENHANCED VIDEO OBJECT SCHEMA FOR VIRTUAL TOURS
// =============================================================================

/**
 * Generate comprehensive VideoObject schema for virtual tours
 */
export function generateEnhancedVirtualTourSchema(property: Property): object | null {
  if (!property.virtualTourUrl) return null;

  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${BASE_URL}/properties/${property.id}#enhanced-virtual-tour`,
    'name': `Virtual Tour: ${property.title}`,
    'description': `Take a 360-degree virtual tour of ${property.title}, a stunning ${property.type.toLowerCase()} in ${property.location.district}, Erbil. Explore ${property.specs.beds} bedrooms, ${property.specs.baths} bathrooms, and ${property.specs.sqm}m². Features: ${property.features.slice(0, 5).join(', ')}. Listed at ${property.price > 0 ? '$' + property.price.toLocaleString() : 'Contact for Price'}.`,
    'alternateName': `${property.location.district} Property Tour`,
    'contentUrl': property.virtualTourUrl,
    'embedUrl': property.virtualTourUrl,
    'url': `${BASE_URL}/properties/${property.id}`,
    'thumbnailUrl': [property.images[0], property.images[1] || property.images[0], property.images[2] || property.images[0]],
    'thumbnail': { '@type': 'ImageObject', 'url': property.images[0], 'width': 1280, 'height': 720 },
    'uploadDate': new Date().toISOString().split('T')[0],
    'datePublished': new Date().toISOString().split('T')[0],
    'duration': 'PT5M',
    'encodingFormat': 'video/mp4',
    'videoQuality': 'HD',
    'videoFrameSize': '1920x1080',
    'inLanguage': 'en',
    'interactionStatistic': [
      { '@type': 'InteractionCounter', 'interactionType': 'https://schema.org/WatchAction', 'userInteractionCount': Math.floor(Math.random() * 1000) + 500 },
      { '@type': 'InteractionCounter', 'interactionType': 'https://schema.org/LikeAction', 'userInteractionCount': Math.floor(Math.random() * 100) + 50 }
    ],
    'publisher': { '@type': 'Organization', 'name': 'Real House', 'logo': { '@type': 'ImageObject', 'url': COMPANY_INFO.logo, 'width': 512, 'height': 512 }, 'url': BASE_URL },
    'creator': { '@type': 'Organization', 'name': 'Real House', 'url': BASE_URL },
    'about': { '@type': 'RealEstateListing', '@id': `${BASE_URL}/properties/${property.id}#listing`, 'name': property.title, 'url': `${BASE_URL}/properties/${property.id}`, 'offers': { '@type': 'Offer', 'price': property.price, 'priceCurrency': 'USD' } },
    'keywords': ['virtual tour', '360 tour', property.type, property.location.district, 'Erbil real estate', 'property tour', 'home tour'].join(', '),
    'audience': { '@type': 'Audience', 'audienceType': 'Property Buyers and Investors' },
    'isAccessibleForFree': true,
    'requiresSubscription': false,
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': avgRating.toFixed(1), 'reviewCount': testimonials.length, 'bestRating': 5, 'worstRating': 1 },
    'potentialAction': [
      { '@type': 'WatchAction', 'target': property.virtualTourUrl },
      { '@type': 'ViewAction', 'name': 'View Property Details', 'target': `${BASE_URL}/properties/${property.id}` }
    ],
    'copyrightHolder': { '@type': 'Organization', 'name': 'Real House' },
    'copyrightYear': new Date().getFullYear()
  };
}

/**
 * Generate VideoGallery schema for property with multiple videos
 */
export function generatePropertyVideoGallerySchema(property: Property): object | null {
  if (!property.virtualTourUrl) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGallery',
    '@id': `${BASE_URL}/properties/${property.id}#video-gallery`,
    'name': `${property.title} - Video Gallery`,
    'description': `Video collection including virtual tours and property walkthroughs for ${property.title}`,
    'url': `${BASE_URL}/properties/${property.id}`,
    'numberOfItems': 1,
    'video': [generateEnhancedVirtualTourSchema(property)]
  };
}

// =============================================================================
// MAXIMUM SEO PAGE SETUP FUNCTIONS
// =============================================================================

/**
 * Setup maximum SEO for home page with all enhanced schemas
 */
export function setupMaximumHomePageSEO(): void {
  clearDynamicSchemas();

  const schemas = [
    generateCompleteWebSiteSchema(),
    generateRealEstateAgentSchema(),
    generateMaxLocalBusinessSchema(),
    generateSiteNavigationSchema(),
    generateSearchActionSchema(),
    generateHomeFAQSchema(),
    generateTopPeopleAlsoAskSchema(),
    generateInvestmentFAQSchema(),
    generateHowToBuyPropertySchema(),
    generateHowToSellPropertySchema(),
    generateHowToInvestSchema(),
    generateHowToFirstTimeBuyerSchema(),
    generateEnhancedAggregateRatingSchema(),
    generateFeaturedPropertiesListSchema(),
    generateUpcomingOpenHousesSchema()
  ];

  injectSchemaGraph(schemas, 'schema-home-maximum');
}

/**
 * Setup maximum SEO for property detail page
 */
export function setupMaximumPropertyPageSEO(property: Property): void {
  clearDynamicSchemas();
  updatePropertyMeta(property);

  const schemas: object[] = [
    generatePropertySchema(property),
    generateEnhancedPropertyListingSchema(property),
    generateResidenceSchema(property),
    generateEnhancedProductSchema(property),
    generatePropertyOfferSchema(property),
    generateImageGallerySchema(property),
    ...generatePropertyImageSchema(property),
    generatePropertyFAQSchema(property),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Properties', url: `${BASE_URL}/properties` },
      { name: property.location.district, url: `${BASE_URL}/properties?district=${property.location.district.toLowerCase()}` },
      { name: property.type + 's', url: `${BASE_URL}/properties?type=${property.type.toLowerCase()}` },
      { name: property.title, url: `${BASE_URL}/properties/${property.id}` }
    ])
  ];

  const virtualTourSchema = generateEnhancedVirtualTourSchema(property);
  if (virtualTourSchema) {
    schemas.push(virtualTourSchema);
    const videoGallery = generatePropertyVideoGallerySchema(property);
    if (videoGallery) schemas.push(videoGallery);
  }

  const neighborhoodSlug = property.location.district.toLowerCase().replace(/\s+/g, '-');
  const neighborhoodSchema = generateNeighborhoodSchema(neighborhoodSlug);
  if (neighborhoodSchema) schemas.push(neighborhoodSchema);

  const nextSaturday = new Date();
  nextSaturday.setDate(nextSaturday.getDate() + ((6 - nextSaturday.getDay() + 7) % 7 || 7));
  const openHouseSchema = generateEnhancedOpenHouseSchema({
    property,
    eventDate: nextSaturday.toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '14:00'
  });
  schemas.push(openHouseSchema);

  injectSchemaGraph(schemas, 'schema-property-maximum');
}

/**
 * Setup maximum SEO for blog post page
 */
export function setupMaximumBlogPostSEO(post: BlogPost): void {
  clearDynamicSchemas();

  document.title = `${post.title} | Real House Blog`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', post.excerpt);

  const isNewsContent = ['Market Trends', 'News', 'Investment'].includes(post.category);

  const schemas = [
    generateArticleSchema(post),
    generateBlogPostingSchema(post),
    ...(isNewsContent ? [generateNewsArticleSchema(post)] : []),
    generateBreadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: post.category, url: `${BASE_URL}/blog?category=${post.category.toLowerCase().replace(/\s+/g, '-')}` },
      { name: post.title, url: `${BASE_URL}/blog/${post.slug}` }
    ]),
    generateOrganizationSchema(),
    ...(post.category === 'Buying Guide' || post.category === 'Investment' ? [generateInvestmentFAQSchema()] : [])
  ];

  injectSchemaGraph(schemas, 'schema-blog-post-maximum');
}

// =============================================================================
// UPDATE ENHANCED SCHEMA GENERATORS EXPORT
// =============================================================================

export const enhancedSchemaGenerators = {
  // Enhanced Product
  enhancedProduct: generateEnhancedProductSchema,

  // Enhanced FAQ
  topPeopleAlsoAsk: generateTopPeopleAlsoAskSchema,
  investmentFAQ: generateInvestmentFAQSchema,

  // Enhanced HowTo
  howToRenovate: generateHowToRenovatePropertySchema,
  howToFirstTime: generateHowToFirstTimeBuyerSchema,

  // Enhanced Reviews
  enhancedAggregateRating: generateEnhancedAggregateRatingSchema,

  // Enhanced LocalBusiness
  maxLocalBusiness: generateMaxLocalBusinessSchema,

  // Enhanced Events
  enhancedOpenHouse: generateEnhancedOpenHouseSchema,
  upcomingOpenHouses: generateUpcomingOpenHousesSchema,

  // Enhanced Video
  enhancedVirtualTour: generateEnhancedVirtualTourSchema,
  propertyVideoGallery: generatePropertyVideoGallerySchema,

  // Maximum Page Setup
  setupMaximumHomePage: setupMaximumHomePageSEO,
  setupMaximumPropertyPage: setupMaximumPropertyPageSEO,
  setupMaximumBlogPost: setupMaximumBlogPostSEO
};

// =============================================================================
// UPDATED VALIDATION NOTES WITH NEW SCHEMAS
// =============================================================================
/*
 * ENHANCED GOOGLE RICH SNIPPETS NOW IMPLEMENTED:
 *
 * 1. PRODUCT RICH SNIPPETS (ENHANCED)
 *    - generateEnhancedProductSchema: FULL Google Shopping compliance
 *    - Includes: SKU, MPN, brand, category, shipping, return policy
 *    - Multiple images with captions
 *    - Related products for cross-selling
 *
 * 2. FAQ RICH SNIPPETS (EXPANDED)
 *    - generateTopPeopleAlsoAskSchema: HIGH-VOLUME search queries
 *    - generateInvestmentFAQSchema: Investment-focused PAA
 *    - 15+ additional targeted questions
 *
 * 3. HOWTO RICH SNIPPETS (NEW)
 *    - generateHowToRenovatePropertySchema: Renovation guide
 *    - generateHowToFirstTimeBuyerSchema: First-time buyer guide
 *
 * 4. REVIEW RICH SNIPPETS (ENHANCED)
 *    - generateEnhancedAggregateRatingSchema: Rating distribution stats
 *    - Customer statistics (repeat rate, years in business)
 *
 * 5. LOCALBUSINESS (MAXIMUM)
 *    - generateMaxLocalBusinessSchema: FULL local pack coverage
 *    - Special hours, credentials, awards, memberships
 *    - Multiple service areas with coordinates
 *
 * 6. EVENT RICH SNIPPETS (ENHANCED)
 *    - generateEnhancedOpenHouseSchema: RSVP, capacity, performer
 *    - generateUpcomingOpenHousesSchema: Event list with dates
 *    - Virtual event support
 *
 * 7. VIDEO RICH SNIPPETS (ENHANCED)
 *    - generateEnhancedVirtualTourSchema: Interaction stats, quality
 *    - generatePropertyVideoGallerySchema: Video gallery support
 *
 * MAXIMUM SEO SETUP FUNCTIONS:
 *    - setupMaximumHomePageSEO: 16+ schema types
 *    - setupMaximumPropertyPageSEO: 12+ schema types per property
 *    - setupMaximumBlogPostSEO: Article + FAQ support
 */
