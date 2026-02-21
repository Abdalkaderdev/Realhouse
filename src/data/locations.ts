// ═══════════════════════════════════════════════════════════════════════════
// Location Data - Erbil Districts for Local SEO
// Optimized for "real estate erbil" searches
// ═══════════════════════════════════════════════════════════════════════════

import { properties, type Property } from './properties';

export interface DistrictLocation {
  id: string;
  name: string;
  nameKu: string; // Kurdish
  nameAr: string; // Arabic
  slug: string;
  description: string;
  longDescription: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapZoom: number;
  image: string;
  averagePrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  propertyTypes: string[];
  highlights: string[];
  nearbyLandmarks: string[];
  amenities: string[];
  transportLinks: string[];
  demographics: {
    population?: string;
    lifestyle: string;
    targetBuyers: string[];
  };
  seoKeywords: string[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Erbil Districts
// ═══════════════════════════════════════════════════════════════════════════

export const districts: DistrictLocation[] = [
  {
    id: 'gulan',
    name: 'Gulan',
    nameKu: 'گوڵان',
    nameAr: 'جولان',
    slug: 'gulan',
    description: 'Premium residential and commercial district with modern towers, upscale shopping centers, and fine dining restaurants.',
    longDescription: `Gulan is Erbil's most prestigious address, representing the pinnacle of modern urban living in Kurdistan. This vibrant district seamlessly blends luxury residential towers with world-class commercial facilities, creating an environment where sophistication meets convenience.

The area is home to some of Erbil's tallest and most architecturally striking buildings, including The Boulevard Tower and Queen Towers. Residents enjoy panoramic city views, state-of-the-art amenities, and immediate access to Family Mall - one of the largest shopping destinations in the region.

Gulan's strategic location places it within minutes of major business centers, international schools, and healthcare facilities. The district has become a magnet for young professionals, expatriates, and families seeking premium urban living with all modern conveniences at their doorstep.

Real estate in Gulan commands premium prices due to its unmatched location, quality of construction, and the prestige associated with the address. Properties here are considered among the best investments in Erbil's real estate market.`,
    coordinates: {
      lat: 36.2085,
      lng: 44.0093
    },
    mapZoom: 15,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
    averagePrice: 100000,
    priceRange: {
      min: 80000,
      max: 500000
    },
    propertyTypes: ['Apartment', 'Penthouse', 'Commercial'],
    highlights: [
      'Most prestigious address in Erbil',
      'Modern high-rise towers',
      'Walking distance to Family Mall',
      'Premium restaurants and cafes',
      '24/7 security in most buildings',
      'High rental demand from expats'
    ],
    nearbyLandmarks: [
      'Family Mall',
      'Gulan Park',
      'Erbil Citadel (10 min)',
      'Majidi Mall',
      'International Hotels'
    ],
    amenities: [
      'Shopping Centers',
      'Fine Dining',
      'Fitness Centers',
      'Banks',
      'Medical Clinics',
      'International Schools nearby'
    ],
    transportLinks: [
      '100 Meter Road access',
      '60 Meter Road connection',
      '15 min to Airport',
      'Major taxi stands'
    ],
    demographics: {
      lifestyle: 'Urban Professional',
      targetBuyers: ['Young Professionals', 'Expats', 'Investors', 'Business Owners']
    },
    seoKeywords: [
      'apartments Gulan Erbil',
      'Gulan properties for sale',
      'luxury apartment Gulan',
      'Boulevard Tower apartments',
      'real estate Gulan Erbil',
      'penthouse Gulan Kurdistan'
    ]
  },
  {
    id: 'ankawa',
    name: 'Ankawa',
    nameKu: 'عەنکاوا',
    nameAr: 'عنكاوا',
    slug: 'ankawa',
    description: 'Historic Christian neighborhood known for its vibrant nightlife, diverse restaurants, and welcoming international community.',
    longDescription: `Ankawa is one of Erbil's most historically significant and culturally rich neighborhoods. As the historic Christian quarter, it has evolved into a cosmopolitan hub that welcomes people of all backgrounds while maintaining its unique cultural identity.

The district is famous for its vibrant social scene, featuring an eclectic mix of restaurants, cafes, bars, and entertainment venues. This makes it particularly popular among expatriates, young professionals, and anyone seeking a more liberal lifestyle within Kurdistan.

Ankawa offers a diverse range of properties, from traditional homes to modern apartments in new developments like Cavally Tower and MNW Towers. The area combines the charm of established neighborhoods with the convenience of new construction and modern amenities.

The district's international atmosphere, combined with its safety and quality of life, makes it one of the most sought-after locations for foreign residents working in Erbil. Property values have shown consistent growth, making it an attractive investment destination.`,
    coordinates: {
      lat: 36.2220,
      lng: 43.9950
    },
    mapZoom: 15,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
    averagePrice: 120000,
    priceRange: {
      min: 75000,
      max: 400000
    },
    propertyTypes: ['Apartment', 'Villa', 'Townhouse', 'Commercial'],
    highlights: [
      'Historic Christian quarter',
      'Vibrant nightlife and dining',
      'International community',
      'Cultural diversity',
      'Safe and welcoming',
      'Popular with expats'
    ],
    nearbyLandmarks: [
      'St. Joseph Cathedral',
      'Ankawa Mall',
      'Dream City (adjacent)',
      'International restaurants',
      'Cultural centers'
    ],
    amenities: [
      'International Restaurants',
      'Cafes and Bars',
      'Churches',
      'Supermarkets',
      'Schools',
      'Medical Centers'
    ],
    transportLinks: [
      'Direct airport road access',
      '10 min to City Center',
      'Easy taxi access',
      'Public transport routes'
    ],
    demographics: {
      population: '30,000+',
      lifestyle: 'Cosmopolitan',
      targetBuyers: ['Expats', 'Young Professionals', 'Families', 'Investors']
    },
    seoKeywords: [
      'apartments Ankawa Erbil',
      'Ankawa real estate',
      'property for sale Ankawa',
      'expat housing Erbil',
      'villas Ankawa Kurdistan',
      'Ankawa neighborhood Erbil'
    ]
  },
  {
    id: 'dream-city',
    name: 'Dream City',
    nameKu: 'شاری خەون',
    nameAr: 'مدينة الأحلام',
    slug: 'dream-city',
    description: 'Premier gated community offering family-oriented living with international schools, parks, and comprehensive amenities.',
    longDescription: `Dream City represents the gold standard for family living in Erbil. This masterfully planned gated community provides residents with an unparalleled quality of life, combining security, convenience, and a true sense of community.

The development features over 3,200 residential units ranging from comfortable apartments to spacious villas, all designed with modern families in mind. The community is anchored by excellent educational facilities, including international schools that follow British and American curricula.

Residents enjoy extensive green spaces, dedicated children's play areas, sports facilities, and a commercial center that meets daily needs without leaving the community. The 24/7 security and controlled access give families peace of mind while allowing children the freedom to play safely.

Dream City has become the address of choice for families with children, diplomatic personnel, and executives who prioritize quality of life and security. Property values have shown strong appreciation, reflecting the consistent demand for homes in this exceptional community.`,
    coordinates: {
      lat: 36.2150,
      lng: 43.9800
    },
    mapZoom: 14,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
    averagePrice: 250000,
    priceRange: {
      min: 150000,
      max: 800000
    },
    propertyTypes: ['Villa', 'Apartment', 'Townhouse', 'Duplex'],
    highlights: [
      'Gated community',
      '24/7 security',
      'International schools',
      'Family-friendly environment',
      'Parks and green spaces',
      'Community amenities'
    ],
    nearbyLandmarks: [
      'International Schools',
      'Dream City Mall',
      'Community Parks',
      'Sports Facilities',
      'Medical Center'
    ],
    amenities: [
      'International Schools',
      'Shopping Center',
      'Parks',
      'Gym/Fitness',
      'Swimming Pools',
      'Children Playgrounds'
    ],
    transportLinks: [
      '20 min to Airport',
      '15 min to City Center',
      'Private roads',
      'Dedicated transport services'
    ],
    demographics: {
      population: '15,000+',
      lifestyle: 'Family-Oriented',
      targetBuyers: ['Families', 'Diplomats', 'Executives', 'Long-term Investors']
    },
    seoKeywords: [
      'Dream City Erbil',
      'villas Dream City',
      'family housing Erbil',
      'gated community Kurdistan',
      'Dream City properties',
      'houses for sale Dream City Erbil'
    ]
  },
  {
    id: 'italian-village',
    name: 'Italian Village',
    nameKu: 'گوندی ئیتالی',
    nameAr: 'القرية الإيطالية',
    slug: 'italian-village',
    description: 'Charming Mediterranean-style residential community inspired by Tuscan architecture and lifestyle.',
    longDescription: `Italian Village offers a unique living experience in Erbil, transporting residents to the romantic ambiance of Tuscany through its authentic Mediterranean architecture and landscaping. This thoughtfully designed community has become one of the most distinctive addresses in Kurdistan.

The development features 1,800 residential units, each designed with attention to Italian architectural details including terracotta roofs, wrought-iron balconies, and earth-tone facades. The winding streets and piazzas create an intimate village atmosphere that sets it apart from typical Middle Eastern developments.

Residents enjoy a lifestyle centered around outdoor living, with numerous cafes, restaurants, and social spaces designed for gathering and community interaction. The landscaping incorporates Mediterranean plants and features, creating a green oasis that feels worlds away from the urban environment.

Italian Village appeals to those seeking something different - buyers who appreciate architecture, design, and a community with character. Properties here maintain strong value due to the unique nature of the development and its limited supply.`,
    coordinates: {
      lat: 36.1950,
      lng: 43.9700
    },
    mapZoom: 15,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
    averagePrice: 180000,
    priceRange: {
      min: 120000,
      max: 450000
    },
    propertyTypes: ['Villa', 'Townhouse', 'Apartment'],
    highlights: [
      'Authentic Italian architecture',
      'Mediterranean landscaping',
      'Village atmosphere',
      'Unique design features',
      'Community piazzas',
      'Outdoor lifestyle focus'
    ],
    nearbyLandmarks: [
      'Italian Village Mall',
      'Central Piazza',
      'Community Gardens',
      'Restaurants',
      'Art galleries'
    ],
    amenities: [
      'Italian Restaurants',
      'Cafes',
      'Shopping',
      'Community Center',
      'Gardens',
      'Sports facilities'
    ],
    transportLinks: [
      '25 min to Airport',
      '20 min to City Center',
      'Good road connections',
      'Taxi services'
    ],
    demographics: {
      lifestyle: 'Mediterranean Living',
      targetBuyers: ['Design Enthusiasts', 'Couples', 'Retirees', 'Lifestyle Buyers']
    },
    seoKeywords: [
      'Italian Village Erbil',
      'villas Italian Village',
      'Mediterranean homes Kurdistan',
      'Italian Village properties',
      'unique homes Erbil',
      'Tuscan style houses Erbil'
    ]
  },
  {
    id: 'english-village',
    name: 'English Village',
    nameKu: 'گوندی ئینگلیزی',
    nameAr: 'القرية الإنجليزية',
    slug: 'english-village',
    description: 'Exclusive British colonial-style community offering prestigious living with country club amenities.',
    longDescription: `English Village represents the epitome of prestigious living in Erbil, drawing inspiration from the elegance of British colonial architecture and the refined lifestyle of English country estates. This exclusive community is designed for discerning buyers who appreciate heritage, quality, and exclusivity.

With only 1,200 carefully designed homes, English Village maintains an air of exclusivity that many other developments cannot match. Each property features distinctive British architectural elements including Georgian facades, manicured gardens, and interior layouts that emphasize comfort and entertaining.

The community's crown jewel is its country club, offering tennis courts, swimming pools, a golf practice area, and clubhouse facilities for social gatherings. Private gardens and tree-lined streets create a serene environment that feels removed from the bustle of the city while remaining conveniently accessible.

English Village attracts a distinguished clientele including senior executives, diplomats, and established families who value privacy, prestige, and a traditional approach to luxury living. Property values here are among the highest in Erbil, reflecting the exclusive nature of the community.`,
    coordinates: {
      lat: 36.1880,
      lng: 43.9650
    },
    mapZoom: 15,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
    averagePrice: 350000,
    priceRange: {
      min: 250000,
      max: 1200000
    },
    propertyTypes: ['Villa', 'Mansion'],
    highlights: [
      'British colonial architecture',
      'Country club with tennis courts',
      'Exclusive and private',
      'Large private gardens',
      'Premium construction quality',
      'Limited number of homes'
    ],
    nearbyLandmarks: [
      'English Village Country Club',
      'Tennis Courts',
      'Golf Practice Area',
      'Community Pool',
      'Private Gardens'
    ],
    amenities: [
      'Country Club',
      'Tennis Courts',
      'Swimming Pool',
      'Golf facilities',
      'Clubhouse',
      'Private Gardens'
    ],
    transportLinks: [
      '30 min to Airport',
      '25 min to City Center',
      'Private security patrols',
      'Exclusive access roads'
    ],
    demographics: {
      lifestyle: 'Prestigious',
      targetBuyers: ['Senior Executives', 'Diplomats', 'High Net Worth Individuals', 'Established Families']
    },
    seoKeywords: [
      'English Village Erbil',
      'luxury villas Erbil',
      'exclusive homes Kurdistan',
      'English Village properties',
      'mansion Erbil',
      'premium real estate Erbil'
    ]
  },
  {
    id: 'empire-world',
    name: 'Empire World',
    nameKu: 'ئێمپایەر وۆرڵد',
    nameAr: 'إمباير وورلد',
    slug: 'empire-world',
    description: 'Erbil\'s largest mixed-use development featuring residential towers, shopping mall, and five-star hotel.',
    longDescription: `Empire World is the most ambitious real estate development in Kurdistan's history, representing a $3 billion investment that will transform Erbil's skyline and redefine urban living in the region. This integrated mixed-use development brings together residential, commercial, hospitality, and entertainment in one spectacular location.

The development will feature multiple residential towers offering 2,500+ units ranging from studio apartments to luxury penthouses. Residents will enjoy unparalleled amenities including direct access to a world-class shopping mall, five-star hotel services, and entertainment facilities rivaling the best in the Middle East.

Currently under construction with completion planned for 2027, Empire World represents the future of Erbil. Early investors have the opportunity to secure properties at pre-completion prices with attractive payment plans, making this an exceptional investment opportunity.

The project's scale and ambition have attracted significant international attention, positioning it as a landmark development that will put Erbil on the global map. Property values are expected to appreciate significantly upon completion, making early investment particularly attractive.`,
    coordinates: {
      lat: 36.1970,
      lng: 44.0200
    },
    mapZoom: 15,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
    averagePrice: 200000,
    priceRange: {
      min: 85000,
      max: 2000000
    },
    propertyTypes: ['Apartment', 'Penthouse', 'Commercial'],
    highlights: [
      'Largest development in Kurdistan',
      '$3 billion investment',
      'Five-star hotel integrated',
      'World-class shopping mall',
      'Entertainment complex',
      'Attractive payment plans'
    ],
    nearbyLandmarks: [
      'Empire World Mall (integrated)',
      'Five-Star Hotel',
      'Entertainment Complex',
      'Business Center',
      'Conference Facilities'
    ],
    amenities: [
      'Shopping Mall',
      'Five-Star Hotel',
      'Multiple Restaurants',
      'Cinema',
      'Fitness Centers',
      'Business Facilities'
    ],
    transportLinks: [
      '20 min to Airport',
      'City center location',
      'Major road access',
      'Future metro connection'
    ],
    demographics: {
      lifestyle: 'Urban Luxury',
      targetBuyers: ['Investors', 'Young Professionals', 'Business Travelers', 'International Buyers']
    },
    seoKeywords: [
      'Empire World Erbil',
      'off-plan properties Erbil',
      'new development Kurdistan',
      'Empire World apartments',
      'investment property Erbil',
      'luxury apartments Erbil'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════════════

export function getDistrictBySlug(slug: string): DistrictLocation | undefined {
  return districts.find(d => d.slug === slug);
}

export function getDistrictById(id: string): DistrictLocation | undefined {
  return districts.find(d => d.id === id);
}

export function getPropertiesByDistrict(districtName: string): Property[] {
  return properties.filter(p =>
    p.location.district.toLowerCase() === districtName.toLowerCase()
  );
}

export function getPropertyCountByDistrict(districtName: string): number {
  return getPropertiesByDistrict(districtName).length;
}

export function getAveragePriceByDistrict(districtName: string): number {
  const districtProperties = getPropertiesByDistrict(districtName);
  if (districtProperties.length === 0) return 0;

  const prices = districtProperties.filter(p => p.price > 0).map(p => p.price);
  if (prices.length === 0) return 0;

  return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
}

export function getAllDistrictSlugs(): string[] {
  return districts.map(d => d.slug);
}

// ═══════════════════════════════════════════════════════════════════════════
// NAP (Name, Address, Phone) Consistency Data
// ═══════════════════════════════════════════════════════════════════════════

export const businessNAP = {
  name: 'Real House',
  legalName: 'Real House Real Estate LLC',
  address: {
    street: 'Dream City Complex, Building A3',
    district: 'Dream City',
    city: 'Erbil',
    region: 'Kurdistan Region',
    postalCode: '44001',
    country: 'Iraq',
    countryCode: 'IQ',
    formatted: 'Dream City Complex, Building A3, Erbil, Kurdistan Region 44001, Iraq'
  },
  phones: [
    {
      number: '+964 750 792 2138',
      type: 'sales',
      agent: 'Abdalkader'
    },
    {
      number: '+964 751 441 5003',
      type: 'customer service',
      agent: 'Mahmood'
    }
  ],
  email: 'info@realhouseiq.com',
  website: 'https://realhouseiq.com',
  coordinates: {
    lat: 36.1901,
    lng: 44.0091
  },
  openingHours: {
    weekdays: {
      days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      open: '09:00',
      close: '18:00'
    },
    friday: {
      day: 'Friday',
      note: 'By Appointment Only'
    }
  },
  social: {
    instagram: 'https://instagram.com/realhouseiq',
    facebook: 'https://facebook.com/realhouseiq',
    linkedin: 'https://linkedin.com/company/realhouseiq',
    twitter: 'https://twitter.com/realhouseiq',
    youtube: 'https://youtube.com/@realhouseiq'
  },
  businessDetails: {
    priceRange: '$$$',
    currenciesAccepted: ['USD', 'IQD'],
    paymentMethods: ['Cash', 'Bank Transfer', 'Installments', 'Developer Financing'],
    languages: ['English', 'Arabic', 'Kurdish'],
    established: '2020'
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// Service Areas
// ═══════════════════════════════════════════════════════════════════════════

export const serviceAreas = [
  {
    name: 'Erbil City',
    type: 'primary',
    districts: districts.map(d => d.name)
  },
  {
    name: 'Kurdistan Region',
    type: 'secondary',
    cities: ['Erbil', 'Sulaymaniyah', 'Duhok']
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Area Statistics for SEO
// ═══════════════════════════════════════════════════════════════════════════

export function getDistrictStats() {
  return districts.map(district => ({
    name: district.name,
    slug: district.slug,
    propertyCount: getPropertyCountByDistrict(district.name),
    averagePrice: getAveragePriceByDistrict(district.name) || district.averagePrice,
    priceRange: district.priceRange,
    propertyTypes: district.propertyTypes
  }));
}
