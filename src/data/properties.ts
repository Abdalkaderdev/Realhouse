// ═══════════════════════════════════════════════════════════════════════════
// Property Data - Erbil, Iraq
// ═══════════════════════════════════════════════════════════════════════════

export interface Agent {
  name: string;
  phone: string;
  email: string;
  image: string;
}

export interface Neighborhood {
  name: string;
  walkScore?: number;
  description?: string;
}

export type PropertyStatus = 'For Sale' | 'For Rent' | 'Daily Rent' | 'Off Plan' | 'Ready' | 'Sold';
export type PropertyBadge = 'Hot' | 'New' | 'Discount' | 'Installment' | 'Exclusive' | 'Coming Soon';
export type FurnishingStatus = 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
export type ViewType = 'City View' | 'Garden View' | 'Pool View' | 'Street View' | 'Mountain View' | 'Park View';

// Property features that can be filtered
export const PROPERTY_FEATURES = [
  'Central AC',
  'Balcony',
  'Parking',
  'Security',
  'Pool',
  'Gym',
  'Garden',
  'Elevator',
  'Smart Home',
  "Maid's Room",
  'Storage',
  'Pet Friendly'
] as const;

export type PropertyFeature = typeof PROPERTY_FEATURES[number];

export interface Property {
  id: string;
  title: string;
  titleKu?: string; // Kurdish title
  titleAr?: string; // Arabic title
  type: 'Villa' | 'Apartment' | 'Penthouse' | 'Townhouse' | 'Land' | 'Commercial' | 'Duplex' | 'Hotel';
  price: number; // Price in USD
  priceIQD?: number; // Price in Iraqi Dinar
  rentPrice?: number; // Monthly rent in USD
  dailyRentPrice?: number; // Daily rent in USD (for daily rentals)
  location: {
    address: string;
    city: string;
    district: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    nearbyLandmarks?: string[];
  };
  specs: {
    beds: number;
    baths: number;
    sqm: number; // Square meters (Iraq uses metric)
    yearBuilt?: number;
    floor?: number;
    totalFloors?: number;
    numberOfFloors?: number; // For villas/buildings - how many floors the property has
  };
  images: string[];
  description: string;
  features: string[];
  propertyFeatures?: PropertyFeature[]; // Structured features for filtering
  furnishing?: FurnishingStatus;
  viewType?: ViewType;
  isFeatured: boolean;
  isNew: boolean;
  status: PropertyStatus;
  badges: PropertyBadge[];
  virtualTourUrl?: string;
  videoTourUrl?: string; // YouTube video tour URL
  floorPlanUrl?: string;
  lotSize?: number;
  neighborhood?: Neighborhood;
  agent: Agent;
  agents?: Agent[]; // Multiple agents for commercial properties
  projectName?: string; // For off-plan properties
  completionDate?: string; // For off-plan properties
  paymentPlan?: string; // For installment properties
}

// ═══════════════════════════════════════════════════════════════════════════
// Agents - Erbil Team
// ═══════════════════════════════════════════════════════════════════════════

export const agents: Agent[] = [
  {
    name: 'Abdalkader',
    phone: '+964 750 792 2138',
    email: 'info@realhouseiq.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fm=webp'
  },
  {
    name: 'Mahmood',
    phone: '+964 751 441 5003',
    email: 'info@realhouseiq.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fm=webp'
  },
  {
    name: 'Tareq',
    phone: '+964 750 445 5822',
    email: 'info@realhouseiq.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fm=webp'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Properties - Erbil Real Estate
// ═══════════════════════════════════════════════════════════════════════════

export const properties: Property[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Newly Added Properties
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'hotel-sky-hamilton',
    title: 'Hotel Sky Hamilton',
    titleKu: 'هۆتێل سکای هامیڵتۆن',
    titleAr: 'فندق سكاي هاميلتون',
    type: 'Hotel',
    price: 0,
    status: 'For Sale',
    badges: ['Exclusive', 'New'],
    location: {
      address: 'Baharka Road',
      city: 'Erbil',
      district: 'Baharka',
      country: 'Iraq',
      coordinates: { lat: 36.216315, lng: 43.9961608 },
      nearbyLandmarks: ['Baharka Main Road']
    },
    specs: {
      beds: 50, // Represents total rooms
      baths: 50, // Matching en-suite bathrooms
      sqm: 1200,
      numberOfFloors: 6,
      totalFloors: 6
    },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fm=webp'
    ],
    description: `Premium hotel property for sale on Baharka Road, Erbil. Hotel Sky Hamilton features 50 fully furnished rooms spread across 6 floors. A fantastic commercial investment opportunity in a rapidly growing area of the city. Features a modern lobby, elevator access, and dedicated parking. Price available upon request.`,
    features: [
      'Prime Location',
      'Fully Furnished',
      'Elevator',
      'Parking',
      '24/7 Security'
    ],
    furnishing: 'Fully Furnished',
    isFeatured: true,
    isNew: true,
    neighborhood: {
      name: 'Baharka',
      walkScore: 75,
      description: 'Strategic commercial and residential district in Erbil with excellent connectivity.'
    },
    agent: agents[0]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Real House - Exclusive Listings
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── KARK LAND PLOTS & COMMERCIAL ──────────────────────────────────────────
  {
    id: 'kark-huge-commercial-land',
    title: 'Huge Commercial Land in Kark',
    titleKu: 'زەوی بازرگانی گەورە لە کارک',
    titleAr: 'أرض تجارية ضخمة في كارك',
    type: 'Commercial',
    price: 0, // Contact for price
    status: 'For Sale',
    badges: ['Exclusive', 'Hot'],
    location: {
      address: 'Main Commercial Zone, Kark',
      city: 'Erbil',
      district: 'Kark',
      country: 'Iraq',
      coordinates: { lat: 36.264000, lng: 44.023000 },
      nearbyLandmarks: ['Kark Main Highway']
    },
    specs: {
      beds: 0,
      baths: 0,
      sqm: 10000, // 10,000 sqm huge commercial land
    },
    images: [
      '/images/lands/kark/photo-01.jpeg',
      '/images/lands/kark/photo-02.jpeg',
      '/images/lands/kark/photo-03.jpeg',
      '/images/lands/kark/photo-04.jpeg',
      '/images/lands/kark/aerial-04.jpeg',
      '/images/lands/kark/aerial-05.jpeg'
    ],
    description: 'A massive 10,000 square meter commercial land plot located in the heart of Kark, Erbil. Perfect for large-scale development, shopping malls, or warehousing. Exceptional highway access.',
    features: ['Highway Access', 'Commercial Zoning', 'Investment Opportunity'],
    isFeatured: true,
    isNew: true,
    neighborhood: {
      name: 'Kark'
    },
    agent: agents[0]
  },
  {
    id: 'kark-residential-plot-blocks',
    title: 'Residential Plot Blocks in Kark',
    titleKu: 'بلۆکی زەوی نیشتەجێبوون لە کارک',
    titleAr: 'بلوكات أراضي سكنية في كارك',
    type: 'Land',
    price: 0,
    status: 'For Sale',
    badges: ['New'],
    location: {
      address: 'Residential Sector, Kark',
      city: 'Erbil',
      district: 'Kark',
      country: 'Iraq',
      coordinates: { lat: 36.262500, lng: 44.021000 }
    },
    specs: {
      beds: 0,
      baths: 0,
      sqm: 250, // Typical plot size
    },
    images: [
      '/images/lands/kark/photo-01.jpeg',
      '/images/lands/kark/photo-02.jpeg',
      '/images/lands/kark/photo-03.jpeg',
      '/images/lands/kark/photo-04.jpeg',
      '/images/lands/kark/aerial-02.jpeg',
      '/images/lands/kark/aerial-03.jpeg'
    ],
    description: 'Premium residential land blocks available in Kark. Subdivided plots starting from 250 sqm up to 1000 sqm. Ideal for building your dream villa or multiple townhouses.',
    features: ['Residential Zoning', 'Infrastructure Ready', 'Quiet Neighborhood'],
    isFeatured: false,
    isNew: true,
    neighborhood: {
      name: 'Kark'
    },
    agent: agents[1]
  },
  {
    id: 'kark-land-plot',
    title: 'Land Plot in Kark',
    titleKu: 'زەوی لە کارک',
    titleAr: 'أرض في كارك',
    type: 'Land',
    price: 0, // Contact for price
    status: 'For Sale',
    badges: ['Hot', 'Exclusive'],
    location: {
      address: 'Kark',
      city: 'Erbil',
      district: 'Kark',
      country: 'Iraq',
      coordinates: { lat: 36.263632, lng: 44.022134 }
    },
    specs: {
      beds: 0,
      baths: 0,
      sqm: 300
    },
    images: [
      '/images/lands/kark/photo-01.jpeg',
      '/images/lands/kark/photo-02.jpeg',
      '/images/lands/kark/photo-03.jpeg',
      '/images/lands/kark/photo-04.jpeg',
      '/images/lands/kark/aerial-01.jpeg',
      '/images/lands/kark/aerial-02.jpeg',
      '/images/lands/kark/aerial-03.jpeg',
      '/images/lands/kark/aerial-04.jpeg',
      '/images/lands/kark/aerial-05.jpeg',
      '/images/lands/kark/aerial-06.jpeg',
      '/images/lands/kark/aerial-07.jpeg'
    ],
    description: 'Premium land plots available in Kark, Erbil. Contact us for pricing and availability.',
    features: [],
    isFeatured: true,
    isNew: true,
    neighborhood: {
      name: 'Kark'
    },
    agent: agents[0]
  },

  // The Boulevard - One Bedroom Apartments
  {
    id: 'boulevard-apt-floor-13',
    title: 'The Boulevard - 1BR Apartment (Floor 13)',
    titleKu: 'بولیڤارد - شوقە ١ ژوور (نهۆمی ١٣)',
    titleAr: 'البوليفارد - شقة غرفة واحدة (الطابق 13)',
    type: 'Apartment',
    price: 100000,
    priceIQD: 147000000,
    status: 'For Sale',
    badges: ['New', 'Exclusive'],
    location: {
      address: 'The Boulevard Tower, Floor 13',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq',
      coordinates: { lat: 36.2085, lng: 44.0093 },
      nearbyLandmarks: ['Family Mall', 'Gulan Park', 'Erbil Citadel', 'Majidi Mall']
    },
    specs: {
      beds: 1,
      baths: 1,
      sqm: 92.5,
      floor: 13
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp'
    ],
    description: `Modern one-bedroom apartment in the prestigious Boulevard Tower, Erbil's premier residential address. This stylish unit on the 13th floor offers spectacular city views and contemporary living.

Features include an open-plan living area with quality finishes, a modern kitchen with built-in appliances, and a spacious bedroom with en-suite bathroom. Floor-to-ceiling windows fill the space with natural light.

Building amenities include 24/7 security, concierge service, fitness center, and underground parking. Perfect for young professionals or as an investment property.

Available for sale at $100,000 or for rent - contact us for rental pricing.`,
    features: [
      'City Views',
      'Modern Kitchen',
      'Built-in Appliances',
      '24/7 Security',
      'Concierge Service',
      'Fitness Center',
      'Underground Parking',
      'Available for Rent'
    ],
    isFeatured: true,
    isNew: true,
    virtualTourUrl: 'https://my.matterport.com/show/?m=SxQL3iGyvAk',
    // videoTourUrl: '', // TODO: Add actual property video tour
    floorPlanUrl: 'https://images.unsplash.com/photo-1580219015423-3e2b6a92f9c5?w=1200&q=80&fm=webp',
    neighborhood: {
      name: 'Gulan',
      walkScore: 85,
      description: 'Premium residential and commercial district with modern towers, shopping centers, and restaurants.'
    },
    agent: agents[0]
  },
  {
    id: 'boulevard-apt-floor-14',
    title: 'The Boulevard - 1BR Apartment (Floor 14)',
    titleKu: 'بولیڤارد - شوقە ١ ژوور (نهۆمی ١٤)',
    titleAr: 'البوليفارد - شقة غرفة واحدة (الطابق 14)',
    type: 'Apartment',
    price: 100000,
    priceIQD: 147000000,
    status: 'For Sale',
    badges: ['New', 'Exclusive'],
    location: {
      address: 'The Boulevard Tower, Floor 14',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq',
      coordinates: { lat: 36.2085, lng: 44.0093 },
      nearbyLandmarks: ['Family Mall', 'Gulan Park', 'Erbil Citadel', 'Majidi Mall']
    },
    specs: {
      beds: 1,
      baths: 1,
      sqm: 92.5,
      floor: 14
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp'
    ],
    description: `Modern one-bedroom apartment in the prestigious Boulevard Tower. This unit on the 14th floor offers enhanced city views and contemporary living at its finest.

Features include an open-plan living area with premium finishes, a modern kitchen with built-in appliances, and a spacious bedroom with en-suite bathroom. Higher floor means better views and more privacy.

Building amenities include 24/7 security, concierge service, fitness center, and underground parking. Ideal for professionals seeking quality urban living.

Available for sale at $100,000 or for rent - contact us for rental pricing.`,
    features: [
      'Enhanced City Views',
      'Modern Kitchen',
      'Built-in Appliances',
      '24/7 Security',
      'Concierge Service',
      'Fitness Center',
      'Underground Parking',
      'Available for Rent'
    ],
    isFeatured: true,
    isNew: true,
    virtualTourUrl: 'https://my.matterport.com/show/?m=SxQL3iGyvAk',
    videoTourUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    floorPlanUrl: 'https://images.unsplash.com/photo-1580219015423-3e2b6a92f9c5?w=1200&q=80&fm=webp',
    neighborhood: {
      name: 'Gulan',
      walkScore: 85,
      description: 'Premium residential and commercial district with modern towers, shopping centers, and restaurants.'
    },
    agent: agents[0]
  },
  {
    id: 'boulevard-apt-floor-17',
    title: 'The Boulevard - 1BR Apartment (Floor 17)',
    titleKu: 'بولیڤارد - شوقە ١ ژوور (نهۆمی ١٧)',
    titleAr: 'البوليفارد - شقة غرفة واحدة (الطابق 17)',
    type: 'Apartment',
    price: 100000,
    priceIQD: 147000000,
    status: 'For Sale',
    badges: ['Hot', 'New', 'Exclusive'],
    location: {
      address: 'The Boulevard Tower, Floor 17',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq',
      coordinates: { lat: 36.2085, lng: 44.0093 },
      nearbyLandmarks: ['Family Mall', 'Gulan Park', 'Erbil Citadel', 'Majidi Mall']
    },
    specs: {
      beds: 1,
      baths: 1,
      sqm: 92.5,
      floor: 17
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp'
    ],
    description: `Premium one-bedroom apartment on the 17th floor of the prestigious Boulevard Tower - the highest available floor offering panoramic city views.

This corner unit features an open-plan living area with floor-to-ceiling windows, a designer kitchen with premium appliances, and a luxurious master bedroom with spa-like bathroom. Enjoy stunning sunsets and city lights from this elevated position.

Building amenities include 24/7 security, concierge service, fitness center, and underground parking. The ultimate urban living experience.

Available for sale at $100,000 or for rent - contact us for rental pricing.`,
    features: [
      'Panoramic Views',
      'Corner Unit',
      'Designer Kitchen',
      'Premium Appliances',
      '24/7 Security',
      'Concierge Service',
      'Fitness Center',
      'Underground Parking',
      'Available for Rent'
    ],
    isFeatured: true,
    isNew: true,
    virtualTourUrl: 'https://my.matterport.com/show/?m=SxQL3iGyvAk',
    videoTourUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    floorPlanUrl: 'https://images.unsplash.com/photo-1580219015423-3e2b6a92f9c5?w=1200&q=80&fm=webp',
    neighborhood: {
      name: 'Gulan',
      walkScore: 85,
      description: 'Premium residential and commercial district with modern towers, shopping centers, and restaurants.'
    },
    agent: agents[0]
  },

  // Queen Towers - Commercial Stores
  {
    id: 'queen-towers-store-1',
    title: 'Queen Towers - Commercial Store (128 sqm)',
    titleKu: 'کوین تاوەرز - دوکان (١٢٨ م٢)',
    titleAr: 'كوين تاورز - محل تجاري (128 م٢)',
    type: 'Commercial',
    price: 0,
    status: 'For Rent',
    badges: ['Hot', 'Exclusive'],
    location: {
      address: 'Queen Towers, Ground Floor',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq',
      coordinates: { lat: 36.2120, lng: 44.0150 },
      nearbyLandmarks: ['Erbil International Hotel', 'Sami Abdulrahman Park', '100 Meter Road', 'Ankawa']
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 128,
      floor: 0
    },
    images: [
      '/images/properties/queen-towers-store/1.jpg',
      '/images/properties/queen-towers-store/2.jpg'
    ],
    description: `Prime commercial space available for rent in Queen Towers, one of Erbil's most prestigious mixed-use developments. This 128 sqm store offers excellent visibility and foot traffic.

Features include high ceilings, large display windows, modern electrical and plumbing infrastructure, and flexible layout suitable for retail, restaurant, or office use. The location benefits from the tower's residential and office tenants as built-in customers.

Contact us for rental pricing and available lease terms.`,
    features: [
      'Prime Location',
      'High Foot Traffic',
      'Large Display Windows',
      'High Ceilings',
      'Flexible Layout',
      'Modern Infrastructure',
      '24/7 Security',
      'Ample Parking'
    ],
    isFeatured: true,
    isNew: true,
    neighborhood: {
      name: 'Gulan',
      walkScore: 90,
      description: 'High-traffic commercial area with excellent visibility and access.'
    },
    agent: agents[2],
    agents: [agents[0], agents[1], agents[2]]
  },
  {
    id: 'queen-towers-store-2',
    title: 'Queen Towers - Commercial Store (81 sqm)',
    titleKu: 'کوین تاوەرز - دوکان (٨١ م٢)',
    titleAr: 'كوين تاورز - محل تجاري (81 م٢)',
    type: 'Commercial',
    price: 0,
    status: 'For Rent',
    badges: ['New'],
    location: {
      address: 'Queen Towers, Ground Floor',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq',
      coordinates: { lat: 36.2118, lng: 44.0155 },
      nearbyLandmarks: ['Erbil International Hotel', 'Sami Abdulrahman Park', '100 Meter Road', 'Ankawa']
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 81,
      floor: 0
    },
    images: [
      '/images/properties/queen-towers-store/3.jpg'
    ],
    description: `Compact commercial space in Queen Towers, perfect for boutique retail, café, or professional services. This 81 sqm unit offers efficient use of space with excellent location benefits.

Features include display windows, modern finishes, and access to the building's shared facilities. Ideal for startups or established businesses looking to expand.

Contact us for rental pricing and available lease terms.`,
    features: [
      'Boutique Size',
      'Display Windows',
      'Modern Finishes',
      'Prime Location',
      '24/7 Security',
      'Shared Facilities',
      'Flexible Terms'
    ],
    isFeatured: false,
    isNew: true,
    neighborhood: {
      name: 'Gulan',
      walkScore: 90,
      description: 'High-traffic commercial area with excellent visibility and access.'
    },
    agent: agents[2],
    agents: [agents[0], agents[1], agents[2]]
  },
  {
    id: 'queen-towers-store-3',
    title: 'Queen Towers - Commercial Store (182 sqm)',
    titleKu: 'کوین تاوەرز - دوکان (١٨٢ م٢)',
    titleAr: 'كوين تاورز - محل تجاري (182 م٢)',
    type: 'Commercial',
    price: 0,
    status: 'For Rent',
    badges: ['Hot', 'Exclusive'],
    location: {
      address: 'Queen Towers, Ground Floor',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq',
      coordinates: { lat: 36.2122, lng: 44.0148 },
      nearbyLandmarks: ['Erbil International Hotel', 'Sami Abdulrahman Park', '100 Meter Road', 'Ankawa']
    },
    specs: {
      beds: 0,
      baths: 2,
      sqm: 182,
      floor: 0
    },
    images: [
      '/images/properties/queen-towers-store/4.jpg',
      '/images/properties/queen-towers-store/5.jpg',
      '/images/properties/queen-towers-store/6.jpg'
    ],
    description: `Large premium commercial space in Queen Towers - the largest available unit at 182 sqm. Ideal for flagship stores, restaurants, or showrooms requiring maximum visibility and space.

Features include corner position with dual frontage, extra-high ceilings, heavy-duty electrical capacity, and dedicated restrooms. The generous floor area allows for creative interior design and customer flow optimization.

Contact us for rental pricing and available lease terms.`,
    features: [
      'Largest Unit',
      'Corner Position',
      'Dual Frontage',
      'Extra-High Ceilings',
      'Heavy-Duty Electric',
      'Dedicated Restrooms',
      'Prime Location',
      '24/7 Security'
    ],
    isFeatured: true,
    isNew: true,
    neighborhood: {
      name: 'Gulan',
      walkScore: 90,
      description: 'High-traffic commercial area with excellent visibility and access.'
    },
    agent: agents[2],
    agents: [agents[0], agents[1], agents[2]]
  },
  {
    id: 'queen-towers-store-4',
    title: 'Queen Towers - Commercial Store (63 sqm)',
    titleKu: 'کوین تاوەرز - دوکان (٦٣ م٢)',
    titleAr: 'كوين تاورز - محل تجاري (63 م٢)',
    type: 'Commercial',
    price: 0,
    status: 'For Rent',
    badges: ['New'],
    location: {
      address: 'Queen Towers, Ground Floor',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq',
      coordinates: { lat: 36.2116, lng: 44.0152 },
      nearbyLandmarks: ['Erbil International Hotel', 'Sami Abdulrahman Park', '100 Meter Road', 'Ankawa']
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 63,
      floor: 0
    },
    images: [
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80&fm=webp'
    ],
    description: `Efficient commercial space in Queen Towers at 63 sqm - perfect for kiosks, small retail, phone shops, or service businesses. Affordable entry point into Erbil's premium commercial market.

Features include street-facing display window, modern infrastructure, and access to building amenities. Great starter space for new businesses or satellite location for established brands.

Contact us for rental pricing and available lease terms.`,
    features: [
      'Affordable Size',
      'Display Window',
      'Modern Infrastructure',
      'Prime Location',
      '24/7 Security',
      'Starter Space',
      'Flexible Terms'
    ],
    isFeatured: false,
    isNew: true,
    neighborhood: {
      name: 'Gulan',
      walkScore: 90,
      description: 'High-traffic commercial area with excellent visibility and access.'
    },
    agent: agents[2],
    agents: [agents[0], agents[1], agents[2]]
  },

  // Queen Towers - Studio Apartments (NazNaz)
  {
    id: 'queen-towers-studio-floor-25-rent',
    title: 'Queen Towers - Studio Apartment (Floor 25)',
    titleKu: 'کوین تاوەرز - ستودیۆ (نهۆمی ٢٥)',
    titleAr: 'كوين تاورز - استوديو (الطابق 25)',
    type: 'Apartment',
    price: 0,
    rentPrice: 450,
    status: 'For Rent',
    badges: ['New'],
    location: {
      address: 'Queen Towers, Floor 25, NazNaz',
      city: 'Erbil',
      district: 'NazNaz',
      country: 'Iraq',
      coordinates: { lat: 36.2120, lng: 44.0150 },
      nearbyLandmarks: ['The Boulevard', 'NazNaz Area']
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 63,
      floor: 25
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp'
    ],
    description: `Fully furnished studio apartment on the 25th floor of Queen Towers, located in NazNaz directly in front of The Boulevard. This compact yet stylish unit offers excellent city views from an elevated position.

Features include modern furnishings, a functional kitchenette, and a well-appointed bathroom. The open-plan layout maximizes the 63 sqm space efficiently.

Building amenities include 24/7 security, elevator access, and parking. Perfect for singles or couples seeking a modern urban lifestyle.`,
    features: [
      'Fully Furnished',
      'City Views',
      'Modern Kitchen',
      '24/7 Security',
      'Elevator',
      'Parking',
      'Near The Boulevard'
    ],
    furnishing: 'Fully Furnished',
    isFeatured: false,
    isNew: true,
    neighborhood: {
      name: 'NazNaz',
      walkScore: 85,
      description: 'Vibrant area in front of The Boulevard with easy access to shopping and entertainment.'
    },
    agent: agents[0]
  },
  {
    id: 'queen-towers-studio-floor-25-sale',
    title: 'Queen Towers - Studio Apartment (Floor 25)',
    titleKu: 'کوین تاوەرز - ستودیۆ (نهۆمی ٢٥)',
    titleAr: 'كوين تاورز - استوديو (الطابق 25)',
    type: 'Apartment',
    price: 63000,
    status: 'For Sale',
    badges: ['New'],
    location: {
      address: 'Queen Towers, Floor 25, NazNaz',
      city: 'Erbil',
      district: 'NazNaz',
      country: 'Iraq',
      coordinates: { lat: 36.2120, lng: 44.0150 },
      nearbyLandmarks: ['The Boulevard', 'NazNaz Area']
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 63,
      floor: 25
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp'
    ],
    description: `Fully furnished studio apartment for sale on the 25th floor of Queen Towers, located in NazNaz directly in front of The Boulevard. This compact yet stylish unit offers excellent city views from an elevated position.

Features include modern furnishings, a functional kitchenette, and a well-appointed bathroom. The open-plan layout maximizes the 63 sqm space efficiently.

Building amenities include 24/7 security, elevator access, and parking. Excellent investment opportunity or ideal for owner-occupiers seeking modern urban living.`,
    features: [
      'Fully Furnished',
      'City Views',
      'Modern Kitchen',
      '24/7 Security',
      'Elevator',
      'Parking',
      'Near The Boulevard'
    ],
    furnishing: 'Fully Furnished',
    isFeatured: false,
    isNew: true,
    neighborhood: {
      name: 'NazNaz',
      walkScore: 85,
      description: 'Vibrant area in front of The Boulevard with easy access to shopping and entertainment.'
    },
    agent: agents[0]
  },
  {
    id: 'queen-towers-studio-floor-29-rent',
    title: 'Queen Towers - Studio Apartment (Floor 29)',
    titleKu: 'کوین تاوەرز - ستودیۆ (نهۆمی ٢٩)',
    titleAr: 'كوين تاورز - استوديو (الطابق 29)',
    type: 'Apartment',
    price: 0,
    rentPrice: 450,
    status: 'For Rent',
    badges: ['New'],
    location: {
      address: 'Queen Towers, Floor 29, NazNaz',
      city: 'Erbil',
      district: 'NazNaz',
      country: 'Iraq',
      coordinates: { lat: 36.2120, lng: 44.0150 },
      nearbyLandmarks: ['The Boulevard', 'NazNaz Area']
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 63,
      floor: 29
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp'
    ],
    description: `Fully furnished studio apartment on the 29th floor of Queen Towers, located in NazNaz directly in front of The Boulevard. This higher floor unit offers superior city views and more privacy.

Features include modern furnishings, a functional kitchenette, and a well-appointed bathroom. The open-plan layout maximizes the 63 sqm space efficiently.

Building amenities include 24/7 security, elevator access, and parking. Perfect for singles or couples seeking a modern urban lifestyle with stunning views.`,
    features: [
      'Fully Furnished',
      'Superior City Views',
      'Modern Kitchen',
      '24/7 Security',
      'Elevator',
      'Parking',
      'Near The Boulevard',
      'Higher Floor'
    ],
    furnishing: 'Fully Furnished',
    isFeatured: false,
    isNew: true,
    neighborhood: {
      name: 'NazNaz',
      walkScore: 85,
      description: 'Vibrant area in front of The Boulevard with easy access to shopping and entertainment.'
    },
    agent: agents[0]
  },
  {
    id: 'queen-towers-studio-floor-29-sale',
    title: 'Queen Towers - Studio Apartment (Floor 29)',
    titleKu: 'کوین تاوەرز - ستودیۆ (نهۆمی ٢٩)',
    titleAr: 'كوين تاورز - استوديو (الطابق 29)',
    type: 'Apartment',
    price: 63000,
    status: 'For Sale',
    badges: ['New'],
    location: {
      address: 'Queen Towers, Floor 29, NazNaz',
      city: 'Erbil',
      district: 'NazNaz',
      country: 'Iraq',
      coordinates: { lat: 36.2120, lng: 44.0150 },
      nearbyLandmarks: ['The Boulevard', 'NazNaz Area']
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 63,
      floor: 29
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp'
    ],
    description: `Fully furnished studio apartment for sale on the 29th floor of Queen Towers, located in NazNaz directly in front of The Boulevard. This higher floor unit offers superior city views and more privacy.

Features include modern furnishings, a functional kitchenette, and a well-appointed bathroom. The open-plan layout maximizes the 63 sqm space efficiently.

Building amenities include 24/7 security, elevator access, and parking. Excellent investment opportunity or ideal for owner-occupiers seeking modern urban living with stunning views.`,
    features: [
      'Fully Furnished',
      'Superior City Views',
      'Modern Kitchen',
      '24/7 Security',
      'Elevator',
      'Parking',
      'Near The Boulevard',
      'Higher Floor'
    ],
    furnishing: 'Fully Furnished',
    isFeatured: false,
    isNew: true,
    neighborhood: {
      name: 'NazNaz',
      walkScore: 85,
      description: 'Vibrant area in front of The Boulevard with easy access to shopping and entertainment.'
    },
    agent: agents[0]
  },

  // Hotels - Coming Soon (Placeholder)
  {
    id: 'hotel-coming-soon-1',
    title: 'Hotel for Sale - Coming Soon',
    titleKu: 'هوتێل بۆ فرۆشتن - بەم زوانە',
    titleAr: 'فندق للبيع - قريباً',
    type: 'Hotel',
    price: 0,
    status: 'For Sale',
    badges: ['Coming Soon'],
    location: {
      address: 'Erbil',
      city: 'Erbil',
      district: 'Erbil',
      country: 'Iraq'
    },
    specs: {
      beds: 0,
      baths: 0,
      sqm: 0
    },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fm=webp'
    ],
    description: 'Hotel for sale - details coming soon. Contact us for more information.',
    features: ['Coming Soon'],
    isFeatured: false,
    isNew: true,
    agent: agents[0]
  },
  {
    id: 'hotel-coming-soon-2',
    title: 'Hotel for Sale - Coming Soon',
    titleKu: 'هوتێل بۆ فرۆشتن - بەم زوانە',
    titleAr: 'فندق للبيع - قريباً',
    type: 'Hotel',
    price: 0,
    status: 'For Sale',
    badges: ['Coming Soon'],
    location: {
      address: 'Erbil',
      city: 'Erbil',
      district: 'Erbil',
      country: 'Iraq'
    },
    specs: {
      beds: 0,
      baths: 0,
      sqm: 0
    },
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80&fm=webp'
    ],
    description: 'Hotel for sale - details coming soon. Contact us for more information.',
    features: ['Coming Soon'],
    isFeatured: false,
    isNew: true,
    agent: agents[0]
  },
  {
    id: 'hotel-coming-soon-3',
    title: 'Hotel for Sale - Coming Soon',
    titleKu: 'هوتێل بۆ فرۆشتن - بەم زوانە',
    titleAr: 'فندق للبيع - قريباً',
    type: 'Hotel',
    price: 0,
    status: 'For Sale',
    badges: ['Coming Soon'],
    location: {
      address: 'Erbil',
      city: 'Erbil',
      district: 'Erbil',
      country: 'Iraq'
    },
    specs: {
      beds: 0,
      baths: 0,
      sqm: 0
    },
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80&fm=webp'
    ],
    description: 'Hotel for sale - details coming soon. Contact us for more information.',
    features: ['Coming Soon'],
    isFeatured: false,
    isNew: true,
    agent: agents[0]
  },

  // ─── Ruby Towers - Commercial Offices & Stores ──────────────────────────────
  {
    id: 'ruby-towers-office-1',
    title: 'Ruby Towers - Premium Office Space (120 sqm)',
    titleKu: 'ڕووبی تاوەرز - ئۆفیس (١٢٠ م٢)',
    titleAr: 'روبي تاورز - مكتب (120 م٢)',
    type: 'Commercial',
    price: 0,
    status: 'For Rent',
    badges: ['Hot', 'Exclusive'],
    location: {
      address: 'Ruby Towers, Tower A, Floor 8',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq',
      coordinates: { lat: 36.2135, lng: 44.0165 },
      nearbyLandmarks: ['100 Meter Road', 'Family Mall', 'Empire World', 'Sami Abdulrahman Park']
    },
    specs: { beds: 0, baths: 2, sqm: 120, floor: 8 },
    images: ['/images/projects/ruby-towers/page01_img01.jpeg', '/images/projects/ruby-towers/page04_img01.jpeg'],
    description: `Premium office space in Ruby Towers, one of Erbil's premier commercial high-rises. This 120 sqm office offers panoramic city views, modern open-plan layout, and direct access to the building's executive lounge.

Features include floor-to-ceiling windows, high-speed fiber internet, central HVAC, dedicated executive parking, and 24/7 concierge services. Perfect for corporate headquarters, professional firms, or international company branches.`,
    features: ['Panoramic City Views', 'Open-Plan Layout', 'High-Speed Fiber', 'Central HVAC', '24/7 Concierge', 'Executive Parking', 'Modern Finishes', 'Conference Room Access'],
    isFeatured: true,
    isNew: true,
    neighborhood: { name: 'Gulan', walkScore: 88, description: 'Premium business district with international hotels and high-end retail.' },
    agent: agents[0],
    agents: [agents[0], agents[1]]
  },
  {
    id: 'ruby-towers-store-1',
    title: 'Ruby Towers - Ground Floor Retail Store (95 sqm)',
    titleKu: 'ڕووبی تاوەرز - دوکان (٩٥ م٢)',
    titleAr: 'روبي تاورز - محل تجاري (95 م٢)',
    type: 'Commercial',
    price: 0,
    status: 'For Rent',
    badges: ['New', 'Hot'],
    location: {
      address: 'Ruby Towers, Ground Floor',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq',
      coordinates: { lat: 36.2133, lng: 44.0163 },
      nearbyLandmarks: ['100 Meter Road', 'Family Mall', 'Empire World']
    },
    specs: { beds: 0, baths: 1, sqm: 95, floor: 0 },
    images: ['/images/projects/ruby-towers/page06_img01.jpeg', '/images/projects/ruby-towers/page08_img01.jpeg'],
    description: `Prime ground-floor retail space in Ruby Towers with exceptional street visibility. This 95 sqm store benefits from heavy pedestrian traffic from the building's 300+ apartment residents and office tenants.

Large display windows, double-height ceilings, modern electrical infrastructure, and flexible layout suitable for boutique retail, café, restaurant, or showroom.`,
    features: ['Street-Level Visibility', 'Heavy Foot Traffic', 'Display Windows', 'Double-Height Ceilings', 'Flexible Layout', 'Modern Infrastructure', '24/7 Security', 'Loading Access'],
    isFeatured: true,
    isNew: true,
    neighborhood: { name: 'Gulan', walkScore: 88, description: 'High-traffic commercial zone on Erbil\'s main retail corridor.' },
    agent: agents[1],
    agents: [agents[0], agents[1]]
  },

  // ─── Phoenix Tower - First Floor Offices (7 units, $10/sqm rent) ────────────
  // Gross area-based rent. Floor plan dated 13-05-2026.
  {
    id: 'phoenix-tower-office-1',
    title: 'Phoenix Tower - Office 1 (168.47 m² gross)',
    titleKu: 'فینکس تاوەر - ئۆفیس ١ (١٦٨.٤٧ م٢)',
    titleAr: 'فينيكس تاور - مكتب 1 (168.47 م²)',
    type: 'Commercial',
    price: 1685,
    status: 'For Rent',
    badges: ['New', 'Exclusive'],
    location: {
      address: 'Phoenix Tower, First Floor - Office 1',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq',
      coordinates: { lat: 36.1911, lng: 44.0084 },
      nearbyLandmarks: ['Erbil Citadel', 'Doctors Street', 'Italian Village']
    },
    specs: { beds: 0, baths: 2, sqm: 168.47, floor: 1 },
    images: ['/images/projects/phoenix-tower/tower-fullview.jpg', '/images/projects/phoenix-tower/tower-front.jpg'],
    description: `Premium first-floor office at Phoenix Tower. Office 1 spans 168.47 m² gross (145.90 m² net) with corner positioning, large windows, and direct access to the main lobby core.

Rent: $10 per m² gross = $1,685/month. The first floor offers premium accessibility, easy client reception, and shared use of the building's mechanical, restroom, and elevator services. Configurable as open plan, partitioned offices, or executive suite.`,
    features: ['Corner Position', 'Large Windows', 'First Floor Premium', 'Open-Plan Ready', 'Modern Infrastructure', 'Lobby Access', 'Elevator Bank', 'Mechanical Services Included', '$10/m² Gross Rent'],
    isFeatured: true,
    isNew: true,
    neighborhood: { name: 'Central', walkScore: 92, description: 'Erbil\'s historic and commercial heart with embassies, banks, and government offices.' },
    agent: agents[0],
    agents: [agents[0], agents[1]]
  },
  {
    id: 'phoenix-tower-office-2',
    title: 'Phoenix Tower - Office 2 (159.54 m² gross)',
    titleKu: 'فینکس تاوەر - ئۆفیس ٢ (١٥٩.٥٤ م٢)',
    titleAr: 'فينيكس تاور - مكتب 2 (159.54 م²)',
    type: 'Commercial',
    price: 1595,
    status: 'For Rent',
    badges: ['New'],
    location: {
      address: 'Phoenix Tower, First Floor - Office 2',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq',
      coordinates: { lat: 36.1911, lng: 44.0084 },
      nearbyLandmarks: ['Erbil Citadel', 'Doctors Street', 'Italian Village']
    },
    specs: { beds: 0, baths: 2, sqm: 159.54, floor: 1 },
    images: ['/images/projects/phoenix-tower/tower-night.jpg', '/images/projects/phoenix-tower/tower-aerial.jpg'],
    description: `Spacious first-floor office at Phoenix Tower. Office 2 spans 159.54 m² gross (138.17 m² net) with multiple structural columns providing natural divisions for open-plan or partitioned layouts.

Rent: $10 per m² gross = $1,595/month. Ideal for professional services, consulting firms, or growing corporate teams. Direct access to building's elevator core and shared services.`,
    features: ['Spacious Layout', 'Column-Divided', 'First Floor Premium', 'Flexible Floorplan', 'Modern Infrastructure', 'Lobby Access', 'Elevator Bank', 'Mechanical Services Included', '$10/m² Gross Rent'],
    isFeatured: true,
    isNew: true,
    neighborhood: { name: 'Central', walkScore: 92 },
    agent: agents[1],
    agents: [agents[0], agents[1]]
  },
  {
    id: 'phoenix-tower-office-3',
    title: 'Phoenix Tower - Office 3 (256.87 m² gross)',
    titleKu: 'فینکس تاوەر - ئۆفیس ٣ (٢٥٦.٨٧ م٢)',
    titleAr: 'فينيكس تاور - مكتب 3 (256.87 م²)',
    type: 'Commercial',
    price: 2569,
    status: 'For Rent',
    badges: ['Hot', 'Exclusive'],
    location: {
      address: 'Phoenix Tower, First Floor - Office 3',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq',
      coordinates: { lat: 36.1911, lng: 44.0084 },
      nearbyLandmarks: ['Erbil Citadel', 'Doctors Street', 'Italian Village']
    },
    specs: { beds: 0, baths: 3, sqm: 256.87, floor: 1 },
    images: ['/images/projects/phoenix-tower/tower-sunset.jpg', '/images/projects/phoenix-tower/tower-roofline.jpg'],
    description: `Phoenix Tower's largest first-floor office. Office 3 spans 256.87 m² gross (222.46 m² net) - the premier office suite on the floor, suitable for corporate HQ, large law firms, or banking branches.

Rent: $10 per m² gross = $2,569/month. Features expansive open floor plate with multiple window walls, executive corner positioning, and ample room for reception, multiple private offices, conference rooms, and open workstations.`,
    features: ['Largest First-Floor Office', 'Corner Premium', 'Multiple Window Walls', 'HQ-Ready', 'Conference Room Capacity', 'Executive Reception Ready', 'Lobby Access', 'Mechanical Services Included', '$10/m² Gross Rent'],
    isFeatured: true,
    isNew: true,
    neighborhood: { name: 'Central', walkScore: 92 },
    agent: agents[0],
    agents: [agents[0], agents[1]]
  },
  {
    id: 'phoenix-tower-office-4',
    title: 'Phoenix Tower - Office 4 (104.91 m² gross)',
    titleKu: 'فینکس تاوەر - ئۆفیس ٤ (١٠٤.٩١ م٢)',
    titleAr: 'فينيكس تاور - مكتب 4 (104.91 م²)',
    type: 'Commercial',
    price: 1049,
    status: 'For Rent',
    badges: ['New'],
    location: {
      address: 'Phoenix Tower, First Floor - Office 4',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq',
      coordinates: { lat: 36.1911, lng: 44.0084 },
      nearbyLandmarks: ['Erbil Citadel', 'Doctors Street']
    },
    specs: { beds: 0, baths: 1, sqm: 104.91, floor: 1 },
    images: ['/images/projects/phoenix-tower/tower-street.jpg', '/images/projects/phoenix-tower/tower-lookup.jpg'],
    description: `Compact first-floor office at Phoenix Tower. Office 4 spans 104.91 m² gross (90.86 m² net) - perfect for small to medium professional firms.

Rent: $10 per m² gross = $1,049/month. Efficient layout suitable for boutique law firms, accounting practices, design studios, or startup HQ. Modern infrastructure and shared building services included.`,
    features: ['Boutique Size', 'Efficient Layout', 'First Floor', 'Modern Infrastructure', 'Lobby Access', 'Elevator Bank', 'Mechanical Services Included', '$10/m² Gross Rent'],
    isFeatured: false,
    isNew: true,
    neighborhood: { name: 'Central', walkScore: 92 },
    agent: agents[1],
    agents: [agents[0], agents[1]]
  },
  {
    id: 'phoenix-tower-office-5',
    title: 'Phoenix Tower - Office 5 (103.00 m² gross)',
    titleKu: 'فینکس تاوەر - ئۆفیس ٥ (١٠٣ م٢)',
    titleAr: 'فينيكس تاور - مكتب 5 (103 م²)',
    type: 'Commercial',
    price: 1030,
    status: 'For Rent',
    badges: ['New'],
    location: {
      address: 'Phoenix Tower, First Floor - Office 5',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq',
      coordinates: { lat: 36.1911, lng: 44.0084 },
      nearbyLandmarks: ['Erbil Citadel', 'Doctors Street']
    },
    specs: { beds: 0, baths: 1, sqm: 103.00, floor: 1 },
    images: ['/images/projects/phoenix-tower/park-aerial.jpg', '/images/projects/phoenix-tower/skyline-aerial.jpg'],
    description: `Mid-row first-floor office at Phoenix Tower. Office 5 spans 103 m² gross (89.20 m² net) with central first-floor positioning.

Rent: $10 per m² gross = $1,030/month. Ideal for professional services, consulting, financial advisory, or medical/dental practice. Shared building services and modern infrastructure included.`,
    features: ['Mid-Row Position', 'First Floor', 'Modern Infrastructure', 'Lobby Access', 'Elevator Bank', 'Flexible Layout', 'Mechanical Services Included', '$10/m² Gross Rent'],
    isFeatured: false,
    isNew: true,
    neighborhood: { name: 'Central', walkScore: 92 },
    agent: agents[0],
    agents: [agents[0], agents[1]]
  },
  {
    id: 'phoenix-tower-office-6',
    title: 'Phoenix Tower - Office 6 (101.11 m² gross)',
    titleKu: 'فینکس تاوەر - ئۆفیس ٦ (١٠١.١١ م٢)',
    titleAr: 'فينيكس تاور - مكتب 6 (101.11 م²)',
    type: 'Commercial',
    price: 1011,
    status: 'For Rent',
    badges: ['New'],
    location: {
      address: 'Phoenix Tower, First Floor - Office 6',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq',
      coordinates: { lat: 36.1911, lng: 44.0084 },
      nearbyLandmarks: ['Erbil Citadel', 'Doctors Street']
    },
    specs: { beds: 0, baths: 1, sqm: 101.11, floor: 1 },
    images: ['/images/projects/phoenix-tower/tiltshift-aerial.jpg', '/images/projects/phoenix-tower/tower-fullview.jpg'],
    description: `Mid-row first-floor office at Phoenix Tower. Office 6 spans 101.11 m² gross (87.57 m² net) - the most affordable office on the floor at full lease.

Rent: $10 per m² gross = $1,011/month. Practical efficient layout ideal for tech startups, freelance professionals, small consulting practices, or satellite offices. Shared services included.`,
    features: ['Most Affordable On Floor', 'First Floor', 'Modern Infrastructure', 'Efficient Layout', 'Lobby Access', 'Elevator Bank', 'Mechanical Services Included', '$10/m² Gross Rent'],
    isFeatured: false,
    isNew: true,
    neighborhood: { name: 'Central', walkScore: 92 },
    agent: agents[1],
    agents: [agents[0], agents[1]]
  },
  {
    id: 'phoenix-tower-office-7',
    title: 'Phoenix Tower - Office 7 (104.91 m² gross)',
    titleKu: 'فینکس تاوەر - ئۆفیس ٧ (١٠٤.٩١ م٢)',
    titleAr: 'فينيكس تاور - مكتب 7 (104.91 م²)',
    type: 'Commercial',
    price: 1049,
    status: 'For Rent',
    badges: ['New'],
    location: {
      address: 'Phoenix Tower, First Floor - Office 7',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq',
      coordinates: { lat: 36.1911, lng: 44.0084 },
      nearbyLandmarks: ['Erbil Citadel', 'Doctors Street']
    },
    specs: { beds: 0, baths: 1, sqm: 104.91, floor: 1 },
    images: ['/images/projects/phoenix-tower/tower-aerial.jpg', '/images/projects/phoenix-tower/tower-night.jpg'],
    description: `Compact corner first-floor office at Phoenix Tower. Office 7 spans 104.91 m² gross (90.86 m² net) with end-of-row corner positioning offering additional natural light.

Rent: $10 per m² gross = $1,049/month. End corner location ideal for client-facing businesses, design studios, or boutique professional services seeking premium light. Modern infrastructure included.`,
    features: ['End Corner Position', 'Premium Natural Light', 'First Floor', 'Modern Infrastructure', 'Lobby Access', 'Elevator Bank', 'Mechanical Services Included', '$10/m² Gross Rent'],
    isFeatured: false,
    isNew: true,
    neighborhood: { name: 'Central', walkScore: 92 },
    agent: agents[0],
    agents: [agents[0], agents[1]]
  },

  // ─── Doctors Street - Medical & Professional Offices ────────────────────────
  {
    id: 'doctors-street-clinic-1',
    title: 'Doctors Street - Medical Clinic Space (85 sqm)',
    titleKu: 'شەقامی پزیشکان - کلینیک (٨٥ م٢)',
    titleAr: 'شارع الأطباء - عيادة (85 م٢)',
    type: 'Commercial',
    price: 0,
    status: 'For Rent',
    badges: ['Hot'],
    location: {
      address: 'Doctors Street, Medical Building, Floor 3',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq',
      coordinates: { lat: 36.1890, lng: 44.0102 },
      nearbyLandmarks: ['Erbil Teaching Hospital', 'Citadel', 'Medical Laboratories District', 'Pharmacy Row']
    },
    specs: { beds: 0, baths: 2, sqm: 85, floor: 3 },
    images: ['/images/projects/queen-towers/page01_img01.jpeg'],
    description: `Turnkey medical clinic space on Erbil's famous Doctors Street - the medical hub of the Kurdistan Region. This 85 sqm unit is pre-configured with 2 consultation rooms, examination area, reception, waiting room, and dedicated patient washroom.

Features include medical-grade flooring, soundproofed walls, lead-lined option for radiology, dedicated patient and staff entrances, and existing infrastructure for medical gas and imaging equipment. Building has 24/7 security, ground-floor pharmacy, and dedicated patient parking.`,
    features: ['Pre-Configured Clinic', '2 Consultation Rooms', 'Examination Area', 'Patient Waiting Area', 'Medical-Grade Flooring', 'Soundproofed', 'Medical Gas Ready', 'Patient Parking', 'Pharmacy On-Site'],
    isFeatured: true,
    isNew: true,
    neighborhood: { name: 'Central', walkScore: 95, description: 'Erbil\'s medical district - home to 200+ clinics, specialists, and pharmacies. The destination for healthcare in Kurdistan.' },
    agent: agents[0],
    agents: [agents[0], agents[1]]
  },
  {
    id: 'doctors-street-office-1',
    title: 'Doctors Street - Specialist Office Suite (140 sqm)',
    titleKu: 'شەقامی پزیشکان - ئۆفیس پسپۆڕی (١٤٠ م٢)',
    titleAr: 'شارع الأطباء - مكتب تخصصي (140 م٢)',
    type: 'Commercial',
    price: 0,
    status: 'For Sale',
    badges: ['Exclusive', 'Installment'],
    location: {
      address: 'Doctors Street, Medical Plaza, Floor 5',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq',
      coordinates: { lat: 36.1888, lng: 44.0105 },
      nearbyLandmarks: ['Erbil Teaching Hospital', 'Medical Laboratories District', 'Imaging Center']
    },
    specs: { beds: 0, baths: 2, sqm: 140, floor: 5 },
    images: ['/images/projects/queen-towers/page02_img01.jpeg'],
    description: `Premium specialist office for sale on Doctors Street. This 140 sqm suite is ideal for specialist consultations (cardiology, dermatology, pediatrics) or shared practice with multiple practitioners.

Layout: 3 consultation rooms, treatment room, large reception with patient waiting area, staff break room, and 2 washrooms. Includes flexible payment plan with 30% down, balance over 36 months. Located in the most established medical building on Doctors Street with continuous specialist tenancy for 15+ years.`,
    features: ['3 Consultation Rooms', 'Treatment Room', 'Large Reception', 'Staff Area', 'Established Medical Building', 'Installment Plan Available', '36-Month Payment', '24/7 Building Access', 'Patient Elevator'],
    isFeatured: true,
    isNew: true,
    neighborhood: { name: 'Central', walkScore: 95 },
    agent: agents[1],
    agents: [agents[0], agents[1]]
  },
  {
    id: 'doctors-street-pharmacy-1',
    title: 'Doctors Street - Pharmacy Ground Floor (110 sqm)',
    titleKu: 'شەقامی پزیشکان - دەرمانخانە (١١٠ م٢)',
    titleAr: 'شارع الأطباء - صيدلية (110 م٢)',
    type: 'Commercial',
    price: 0,
    status: 'For Rent',
    badges: ['Hot', 'New'],
    location: {
      address: 'Doctors Street, Ground Floor',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq',
      coordinates: { lat: 36.1892, lng: 44.0100 },
      nearbyLandmarks: ['Doctors Street', 'Erbil Teaching Hospital', '12 Clinics in Same Building']
    },
    specs: { beds: 0, baths: 1, sqm: 110, floor: 0 },
    images: ['/images/projects/queen-towers/page03_img01.jpeg'],
    description: `Prime pharmacy location on the busiest stretch of Doctors Street. This 110 sqm ground-floor space is purpose-built for pharmacy operations with built-in dispensary shelving, refrigerated storage area, consultation booth, and customer queueing area.

The building hosts 12 active medical clinics generating high prescription volume daily. Adjacent to imaging center and medical laboratory ensures steady walk-in traffic. Street-facing entrance with delivery vehicle access.`,
    features: ['Purpose-Built Pharmacy', 'Built-In Shelving', 'Refrigerated Storage', 'Consultation Booth', '12 Clinics in Building', 'Adjacent Imaging Center', 'Street Entrance', 'Delivery Access', 'High Prescription Volume Area'],
    isFeatured: true,
    isNew: true,
    neighborhood: { name: 'Central', walkScore: 95 },
    agent: agents[0],
    agents: [agents[0], agents[1]]
  }
];

export const featuredProperties = properties.filter(p => p.isFeatured);

export function formatPrice(price: number, currency: 'USD' | 'IQD' = 'USD'): string {
  if (currency === 'IQD') {
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)}B IQD`;
    }
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(0)}M IQD`;
    }
    return `${price.toLocaleString()} IQD`;
  }

  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(2)}M`;
  }
  return `$${price.toLocaleString()}`;
}

export function getDisplayPrice(property: Property): string {
  // For rent-only properties (price is 0 or status is 'For Rent')
  if (property.status === 'For Rent' || (property.price === 0 && property.rentPrice)) {
    if (property.rentPrice) {
      return `$${property.rentPrice.toLocaleString()}/mo`;
    }
    return 'Contact for Price';
  }
  // Price 0 means inquiry/contact for price
  if (property.price === 0) {
    return 'Inquiry';
  }
  return formatPrice(property.price);
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id);
}

export function getAgentByName(name: string): Agent | undefined {
  return agents.find(a => a.name === name);
}

export function formatArea(sqm: number): string {
  return `${sqm.toLocaleString()} m²`;
}

export function filterProperties(options: {
  type?: string;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  district?: string;
  badges?: PropertyBadge[];
}): Property[] {
  return properties.filter(p => {
    if (options.type && p.type !== options.type) return false;
    if (options.status && p.status !== options.status) return false;
    if (options.minPrice && p.price < options.minPrice) return false;
    if (options.maxPrice && p.price > options.maxPrice) return false;
    if (options.minBeds && p.specs.beds < options.minBeds) return false;
    if (options.district && p.location.district !== options.district) return false;
    if (options.badges && options.badges.length > 0) {
      if (!options.badges.some(badge => p.badges.includes(badge))) return false;
    }
    return true;
  });
}

export const propertyTypes = ['Villa', 'Apartment', 'Penthouse', 'Townhouse', 'Land', 'Commercial', 'Duplex', 'Hotel'] as const;
export const propertyStatuses = ['For Sale', 'For Rent', 'Daily Rent', 'Off Plan', 'Ready', 'Sold'] as const;
export const propertyBadges = ['Hot', 'New', 'Discount', 'Installment', 'Exclusive', 'Coming Soon'] as const;
export const furnishingStatuses = ['Fully Furnished', 'Semi-Furnished', 'Unfurnished'] as const;
export const viewTypes = ['City View', 'Garden View', 'Pool View', 'Street View', 'Mountain View', 'Park View'] as const;
export const districts = [
  'Gulan',
  'Dream City',
  'English Village',
  'Italian Village',
  'Empire World',
  'Ankawa',
  'Ainkawa',
  'Sarbasti',
  '100 Meter Road',
  '60 Meter Road',
  'Kasnazan',
  'Nawroz'
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// Slug Generation for SEO-friendly URLs
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a URL-safe slug from property title
 * Format: property-type-location-beds-sqm (e.g., "the-boulevard-1br-apartment-floor-13")
 */
export function generatePropertySlug(property: Property): string {
  return property.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Remove multiple consecutive hyphens
    .replace(/^-|-$/g, '');   // Remove leading/trailing hyphens
}

/**
 * Get property by slug (matches against generated slug or property ID)
 */
export function getPropertyBySlug(slug: string): Property | undefined {
  // First try exact ID match
  const byId = properties.find(p => p.id === slug);
  if (byId) return byId;

  // Then try slug match
  return properties.find(p => generatePropertySlug(p) === slug);
}

/**
 * Get all property slugs for sitemap generation
 */
export function getAllPropertySlugs(): string[] {
  return properties.map(p => generatePropertySlug(p));
}

/**
 * Get similar properties based on type, location, and price range
 */
export function getSimilarProperties(property: Property, limit: number = 4): Property[] {
  return properties
    .filter(p => p.id !== property.id)
    .map(p => {
      let score = 0;

      // Same type gets highest priority
      if (p.type === property.type) score += 4;

      // Same district
      if (p.location.district === property.location.district) score += 3;

      // Same status
      if (p.status === property.status) score += 2;

      // Similar price range (within 30%)
      if (property.price > 0 && p.price > 0) {
        const priceDiff = Math.abs(p.price - property.price) / property.price;
        if (priceDiff < 0.3) score += 2;
        else if (priceDiff < 0.5) score += 1;
      }

      // Similar size (within 20%)
      const sizeDiff = Math.abs(p.specs.sqm - property.specs.sqm) / property.specs.sqm;
      if (sizeDiff < 0.2) score += 1;

      // Same number of bedrooms
      if (p.specs.beds === property.specs.beds) score += 1;

      return { property: p, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.property);
}
