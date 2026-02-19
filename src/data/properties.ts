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

export type PropertyStatus = 'For Sale' | 'For Rent' | 'Off Plan' | 'Ready' | 'Sold';
export type PropertyBadge = 'Hot' | 'New' | 'Discount' | 'Installment' | 'Exclusive';

export interface Property {
  id: string;
  title: string;
  titleKu?: string; // Kurdish title
  titleAr?: string; // Arabic title
  type: 'Villa' | 'Apartment' | 'Penthouse' | 'Townhouse' | 'Land' | 'Commercial' | 'Duplex';
  price: number; // Price in USD
  priceIQD?: number; // Price in Iraqi Dinar
  rentPrice?: number; // Monthly rent in USD
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
  };
  images: string[];
  description: string;
  features: string[];
  isFeatured: boolean;
  isNew: boolean;
  status: PropertyStatus;
  badges: PropertyBadge[];
  virtualTourUrl?: string;
  floorPlanUrl?: string;
  lotSize?: number;
  neighborhood?: Neighborhood;
  agent: Agent;
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
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Properties - Erbil Real Estate
// ═══════════════════════════════════════════════════════════════════════════

export const properties: Property[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Real House - Exclusive Listings
  // ═══════════════════════════════════════════════════════════════════════════

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
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80&fm=webp'
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
    agent: agents[1]
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
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80&fm=webp'
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
    agent: agents[1]
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
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80&fm=webp'
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
    agent: agents[1]
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
    agent: agents[1]
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

export const propertyTypes = ['Villa', 'Apartment', 'Penthouse', 'Townhouse', 'Land', 'Commercial', 'Duplex'] as const;
export const propertyStatuses = ['For Sale', 'For Rent', 'Off Plan', 'Ready', 'Sold'] as const;
export const propertyBadges = ['Hot', 'New', 'Discount', 'Installment', 'Exclusive'] as const;
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
