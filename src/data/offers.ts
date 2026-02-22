// ═══════════════════════════════════════════════════════════════════════════
// Special Offers Data - Real House Erbil
// ═══════════════════════════════════════════════════════════════════════════

export type OfferType =
  | 'Price Reduction'
  | 'Free Upgrade'
  | 'Flexible Payment'
  | 'Cashback'
  | 'Bundle Deal';

export type UrgencyIndicator =
  | 'Limited Time'
  | 'Last Units'
  | 'Ending Soon'
  | 'New Offer'
  | 'Exclusive';

export interface Offer {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  offerType: OfferType;

  // Discount details
  discountPercentage?: number;
  discountAmount?: number;
  originalPrice?: number;
  discountedPrice?: number;

  // Property/Project reference
  propertyId?: string;
  projectId?: string;
  projectName?: string;
  propertyType?: string;
  location: string;

  // Dates
  startDate: string;
  endDate: string;

  // Terms and conditions
  termsAndConditions: string[];

  // Visual
  featuredImage: string;
  images?: string[];

  // Urgency
  urgencyIndicator: UrgencyIndicator;
  unitsAvailable?: number;

  // Additional details
  highlights?: string[];
  applicableUnits?: string;
  contactPhone?: string;
  featured?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// Sample Offers Data
// ═══════════════════════════════════════════════════════════════════════════

export const offers: Offer[] = [
  {
    id: 'offer-1',
    slug: 'empire-world-launch-discount',
    title: 'Empire World Pre-Launch 15% Discount',
    description: `Secure your dream home at Empire World with an exclusive 15% pre-launch discount. This limited-time offer applies to all 2 and 3 bedroom apartments in Tower A. Empire World is Erbil's most ambitious mixed-use development, featuring world-class amenities including a shopping mall, five-star hotel, and premium fitness facilities. Don't miss this opportunity to be part of Erbil's landmark development at an unbeatable price.`,
    shortDescription: 'Exclusive 15% discount on 2 & 3 bedroom apartments in Empire World Tower A.',
    offerType: 'Price Reduction',
    discountPercentage: 15,
    originalPrice: 250000,
    discountedPrice: 212500,
    projectId: 'empire-world',
    projectName: 'Empire World',
    propertyType: 'Apartment',
    location: 'Gulan, Erbil',
    startDate: '2026-02-01',
    endDate: '2026-03-31',
    termsAndConditions: [
      'Offer valid for new bookings only',
      'Applies to 2 and 3 bedroom units in Tower A',
      '10% booking deposit required',
      'Cannot be combined with other promotions',
      'Subject to unit availability',
      'Price excludes registration and legal fees'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp'
    ],
    urgencyIndicator: 'Limited Time',
    unitsAvailable: 45,
    highlights: [
      '15% off published prices',
      'Flexible 3-year payment plan',
      'Free parking space included',
      'Premium tower location'
    ],
    applicableUnits: '2 & 3 Bedroom Apartments, Tower A',
    contactPhone: '+964 750 792 2138',
    featured: true
  },
  {
    id: 'offer-2',
    slug: 'dream-city-ready-units-cashback',
    title: 'Dream City $10,000 Cashback',
    description: `Move into Dream City today and receive $10,000 cashback on selected ready-to-move villas. This incredible offer is available on fully finished 4 and 5 bedroom villas with immediate handover. Dream City is one of Erbil's premier residential communities, offering a complete lifestyle destination with international schools, medical facilities, and shopping centers. Take advantage of this cashback offer and start your new life in Dream City.`,
    shortDescription: 'Get $10,000 cashback on ready-to-move villas in Dream City.',
    offerType: 'Cashback',
    discountAmount: 10000,
    originalPrice: 350000,
    discountedPrice: 340000,
    projectId: 'dream-city',
    projectName: 'Dream City',
    propertyType: 'Villa',
    location: 'Dream City, Erbil',
    startDate: '2026-02-15',
    endDate: '2026-04-15',
    termsAndConditions: [
      'Cashback paid within 30 days of completion',
      'Applies to selected ready villas only',
      'Full payment required within 60 days',
      'Offer limited to first 10 buyers',
      'Non-transferable offer',
      'Subject to availability'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
    urgencyIndicator: 'Last Units',
    unitsAvailable: 10,
    highlights: [
      '$10,000 direct cashback',
      'Ready to move in',
      'Fully landscaped gardens',
      'Gated community with 24/7 security'
    ],
    applicableUnits: '4 & 5 Bedroom Ready Villas',
    contactPhone: '+964 750 792 2138',
    featured: true
  },
  {
    id: 'offer-3',
    slug: 'italian-village-flexible-payment',
    title: 'Italian Village 5-Year Payment Plan',
    description: `Own a piece of Italian elegance with our exclusive 5-year interest-free payment plan at Italian Village. Pay just 20% upfront and spread the remaining balance over 60 months with zero interest. Italian Village offers Mediterranean-inspired architecture, charming streets, and a vibrant community atmosphere. This flexible payment option makes luxury living more accessible than ever.`,
    shortDescription: '5-year interest-free payment plan with only 20% down payment.',
    offerType: 'Flexible Payment',
    originalPrice: 280000,
    projectId: 'italian-village',
    projectName: 'Italian Village',
    propertyType: 'Apartment',
    location: 'Italian Village, Erbil',
    startDate: '2026-01-15',
    endDate: '2026-05-31',
    termsAndConditions: [
      '20% minimum down payment required',
      '60-month payment schedule',
      'Zero interest on installments',
      'Post-dated checks required',
      'Available on all unit types',
      'Early settlement discount of 2% available'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
    urgencyIndicator: 'New Offer',
    highlights: [
      '0% interest payment plan',
      'Only 20% down payment',
      '60-month installments',
      'Early settlement bonus'
    ],
    applicableUnits: 'All Apartments & Townhouses',
    contactPhone: '+964 750 792 2138'
  },
  {
    id: 'offer-4',
    slug: 'gulan-heights-free-upgrade',
    title: 'Free Kitchen Upgrade Worth $15,000',
    description: `Purchase any 3+ bedroom apartment at Gulan Heights and receive a complimentary premium kitchen upgrade worth $15,000. This exclusive offer includes German-brand appliances, marble countertops, and custom cabinetry. Gulan Heights offers modern living with stunning city views and premium finishes throughout. Upgrade your lifestyle without upgrading your budget.`,
    shortDescription: 'Complimentary $15,000 kitchen upgrade with any 3+ bedroom purchase.',
    offerType: 'Free Upgrade',
    discountAmount: 15000,
    originalPrice: 320000,
    projectId: 'gulan-heights',
    projectName: 'Gulan Heights',
    propertyType: 'Apartment',
    location: 'Gulan, Erbil',
    startDate: '2026-02-01',
    endDate: '2026-04-30',
    termsAndConditions: [
      'Applies to 3+ bedroom apartments only',
      'Kitchen upgrade package non-exchangeable',
      'Must complete purchase within offer period',
      'Upgrade installation during handover',
      'Cannot be combined with payment plan offers',
      'Limited to 30 units'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fm=webp',
    urgencyIndicator: 'Exclusive',
    unitsAvailable: 30,
    highlights: [
      'Bosch appliances included',
      'Marble countertops',
      'Custom cabinetry',
      'Professional installation'
    ],
    applicableUnits: '3+ Bedroom Apartments',
    contactPhone: '+964 750 792 2138',
    featured: true
  },
  {
    id: 'offer-5',
    slug: 'ankawa-bundle-deal',
    title: 'Ankawa Villa + Land Bundle',
    description: `Exclusive bundle offer in the heart of Ankawa! Purchase a luxury villa and receive an adjacent 200sqm land plot absolutely free. This rare opportunity allows you to expand your property or create the garden of your dreams. Ankawa is known for its premium location, excellent schools, and vibrant community. This bundle deal is available for a limited time on selected villa plots.`,
    shortDescription: 'Buy a villa and get a free 200sqm adjacent land plot.',
    offerType: 'Bundle Deal',
    originalPrice: 450000,
    discountedPrice: 450000,
    propertyType: 'Villa',
    location: 'Ankawa, Erbil',
    startDate: '2026-02-10',
    endDate: '2026-03-31',
    termsAndConditions: [
      'Free land plot valued at $50,000',
      'Adjacent plots only while available',
      'Full payment required for villa',
      'Land registration handled separately',
      'Limited to 5 villa plots',
      'Non-transferable offer'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
    urgencyIndicator: 'Last Units',
    unitsAvailable: 5,
    highlights: [
      'Free 200sqm land ($50K value)',
      'Prime Ankawa location',
      'Expansion potential',
      'Investment opportunity'
    ],
    applicableUnits: 'Selected Villa Plots',
    contactPhone: '+964 750 792 2138'
  },
  {
    id: 'offer-6',
    slug: 'pavilion-erbil-early-bird',
    title: 'Pavilion Erbil Early Bird 20% OFF',
    description: `Be among the first to own at Pavilion Erbil with our early bird discount of 20%. This premium development offers smart home technology, panoramic city views, and direct mall access. Early bird buyers will enjoy the best unit selections and guaranteed pre-construction pricing. Pavilion Erbil is set to become the most sought-after address in the city.`,
    shortDescription: '20% early bird discount on Pavilion Erbil pre-launch units.',
    offerType: 'Price Reduction',
    discountPercentage: 20,
    originalPrice: 380000,
    discountedPrice: 304000,
    projectId: 'pavilion-erbil',
    projectName: 'Pavilion Erbil',
    propertyType: 'Apartment',
    location: 'Pavilion Complex, Erbil',
    startDate: '2026-02-20',
    endDate: '2026-03-20',
    termsAndConditions: [
      'Early bird pricing for first 50 buyers',
      '20% minimum booking deposit',
      'Price lock guarantee until handover',
      'First selection priority for unit choice',
      'Offer non-extendable',
      'Completion expected 2028'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
    urgencyIndicator: 'Ending Soon',
    unitsAvailable: 50,
    highlights: [
      '20% below launch price',
      'Priority unit selection',
      'Price lock guarantee',
      'Smart home features included'
    ],
    applicableUnits: 'All Unit Types',
    contactPhone: '+964 750 792 2138',
    featured: true
  },
  {
    id: 'offer-7',
    slug: 'sunset-residences-rental-guarantee',
    title: 'Sunset Residences 8% Rental Guarantee',
    description: `Invest with confidence at Sunset Residences with our guaranteed 8% annual rental return for the first 3 years. This investor-focused offer includes professional property management, tenant finding services, and maintenance coverage. Sunset Residences is ideally located near business districts, making it highly attractive for professional tenants.`,
    shortDescription: 'Guaranteed 8% annual rental return for 3 years on all units.',
    offerType: 'Bundle Deal',
    originalPrice: 185000,
    projectId: 'sunset-residences',
    projectName: 'Sunset Residences',
    propertyType: 'Apartment',
    location: 'Business District, Erbil',
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    termsAndConditions: [
      '8% guaranteed rental return annually',
      '3-year rental guarantee period',
      'Property management included',
      'Returns paid quarterly',
      'Must opt-in during purchase',
      'After 3 years, market rental rates apply'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
    urgencyIndicator: 'New Offer',
    highlights: [
      '8% guaranteed annual return',
      'Professional management',
      'Zero vacancy risk for 3 years',
      'Quarterly rental payments'
    ],
    applicableUnits: 'All Investment Units',
    contactPhone: '+964 750 792 2138'
  },
  {
    id: 'offer-8',
    slug: 'english-village-vip-discount',
    title: 'English Village VIP Member Discount',
    description: `Exclusive offer for Real House VIP members! Enjoy an additional 5% discount on top of any existing promotion when purchasing at English Village. This prestigious community offers British-inspired architecture, manicured gardens, and exceptional privacy. Register as a VIP member today to unlock this exclusive benefit.`,
    shortDescription: 'VIP members get extra 5% discount at English Village.',
    offerType: 'Price Reduction',
    discountPercentage: 5,
    originalPrice: 420000,
    discountedPrice: 399000,
    projectId: 'english-village',
    projectName: 'English Village',
    propertyType: 'Villa',
    location: 'English Village, Erbil',
    startDate: '2026-02-01',
    endDate: '2026-12-31',
    termsAndConditions: [
      'VIP membership registration required',
      'Stackable with other promotions',
      'Applies to all property types',
      'One-time use per member',
      'ID verification required',
      'Must complete purchase within 90 days of registration'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fm=webp',
    urgencyIndicator: 'Exclusive',
    highlights: [
      'Stack with other offers',
      'VIP concierge service',
      'Priority viewings',
      'Exclusive access to new releases'
    ],
    applicableUnits: 'All Properties',
    contactPhone: '+964 750 792 2138'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════════════

export function getOfferBySlug(slug: string): Offer | undefined {
  return offers.find(o => o.slug === slug);
}

export function getOfferById(id: string): Offer | undefined {
  return offers.find(o => o.id === id);
}

export function getFeaturedOffers(): Offer[] {
  return offers.filter(o => o.featured);
}

export function getActiveOffers(): Offer[] {
  const now = new Date();
  return offers.filter(o => {
    const start = new Date(o.startDate);
    const end = new Date(o.endDate);
    return now >= start && now <= end;
  });
}

export function getOffersByType(type: OfferType): Offer[] {
  return offers.filter(o => o.offerType === type);
}

export function getOffersByProject(projectId: string): Offer[] {
  return offers.filter(o => o.projectId === projectId);
}

export function isOfferExpiringSoon(offer: Offer, daysThreshold: number = 7): boolean {
  const now = new Date();
  const end = new Date(offer.endDate);
  const daysRemaining = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return daysRemaining > 0 && daysRemaining <= daysThreshold;
}

export function getTimeRemaining(endDate: string): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const diff = Math.max(0, end - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  };
}

export function formatOfferPrice(price: number): string {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${price.toLocaleString()}`;
}

export function getDiscountLabel(offer: Offer): string {
  if (offer.discountPercentage) {
    return `${offer.discountPercentage}% OFF`;
  }
  if (offer.discountAmount) {
    return `$${offer.discountAmount.toLocaleString()} OFF`;
  }
  return offer.offerType;
}

export function getAllOfferSlugs(): string[] {
  return offers.map(o => o.slug);
}

export function getActiveOffersCount(): number {
  return getActiveOffers().length;
}

export const offerTypes: OfferType[] = [
  'Price Reduction',
  'Free Upgrade',
  'Flexible Payment',
  'Cashback',
  'Bundle Deal'
];
