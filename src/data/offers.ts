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

// No active offers currently - offers will be added when available
export const offers: Offer[] = [];

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
