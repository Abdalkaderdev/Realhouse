// ===============================================================================
// Neighborhood Guide Data - Comprehensive Area Information for Erbil
// SEO-optimized for local searches: "real estate [area] erbil", "buy property [area]"
// ===============================================================================

import { businessNAP } from './locations';

export interface NeighborhoodAmenity {
  name: string;
  type: 'school' | 'hospital' | 'shopping' | 'restaurant' | 'park' | 'mosque' | 'church' | 'gym' | 'bank' | 'other';
  distance: string;
  description?: string;
}

export interface NeighborhoodTransport {
  type: 'airport' | 'highway' | 'public' | 'taxi';
  name: string;
  distance: string;
  details?: string;
}

export interface NeighborhoodProperty {
  type: string;
  priceMin: number;
  priceMax: number;
  availability: string;
}

export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  nameKu: string;
  nameAr: string;
  tagline: string;
  description: string;
  longDescription: string;
  highlights: string[];
  image: string;
  galleryImages: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  mapZoom: number;

  // Price Information
  priceRange: {
    min: number;
    max: number;
    average: number;
    currency: string;
    pricePerSqm: {
      min: number;
      max: number;
    };
  };

  // Property Types Available
  propertyTypes: NeighborhoodProperty[];

  // Amenities
  amenities: {
    schools: NeighborhoodAmenity[];
    hospitals: NeighborhoodAmenity[];
    shopping: NeighborhoodAmenity[];
    restaurants: NeighborhoodAmenity[];
    recreation: NeighborhoodAmenity[];
  };

  // Transportation
  transportation: NeighborhoodTransport[];

  // Lifestyle
  lifestyle: {
    type: string;
    description: string;
    targetResidents: string[];
    communityVibe: string;
    safetyRating: number; // 1-5
    familyFriendly: boolean;
    petFriendly: boolean;
    expatFriendly: boolean;
  };

  // Statistics
  stats: {
    population?: string;
    yearEstablished?: string;
    totalProperties?: number;
    avgRentalYield?: string;
  };

  // SEO
  seoKeywords: string[];
  metaTitle: string;
  metaDescription: string;

  // Featured Projects in Area
  featuredProjects?: string[];
}

// ===============================================================================
// Erbil Neighborhoods Data
// ===============================================================================

export const neighborhoods: Neighborhood[] = [
  // 1. Empire World
  {
    id: 'empire-world',
    slug: 'empire-world',
    name: 'Empire World',
    nameKu: 'ئێمپایەر وۆرڵد',
    nameAr: 'إمباير وورلد',
    tagline: 'The Future of Urban Living in Kurdistan',
    description: 'Empire World is Erbil\'s most ambitious mixed-use development, featuring residential towers, a world-class shopping mall, and five-star hotel facilities.',
    longDescription: `Empire World represents the pinnacle of modern urban development in Kurdistan Region. This $3 billion mega-project is transforming Erbil's skyline and setting new standards for luxury living in the Middle East.

The development spans over 500,000 square meters and includes residential towers offering over 2,500 luxury units, from studio apartments to sprawling penthouses. Residents enjoy direct access to a 150,000 sqm shopping mall featuring international brands, a multiplex cinema, and diverse dining options.

Empire World's integration of residential, commercial, hospitality, and entertainment spaces creates a self-contained urban ecosystem. The development includes a five-star Marriott hotel, making it ideal for investors seeking rental income from business travelers and tourists.

With flexible payment plans and competitive pre-completion pricing, Empire World offers exceptional investment opportunities. The project's scale and ambition have attracted international attention, positioning it as a landmark development that will define Erbil's future.`,
    highlights: [
      'Kurdistan\'s largest mixed-use development',
      '$3 billion investment project',
      'Integrated five-star Marriott hotel',
      '150,000 sqm shopping mall',
      'Flexible payment plans available',
      'Prime central location',
      'World-class amenities',
      'High rental income potential'
    ],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp'
    ],
    coordinates: { lat: 36.1970, lng: 44.0200 },
    mapZoom: 15,
    priceRange: {
      min: 85000,
      max: 2000000,
      average: 200000,
      currency: 'USD',
      pricePerSqm: { min: 1200, max: 3500 }
    },
    propertyTypes: [
      { type: 'Studio Apartment', priceMin: 85000, priceMax: 120000, availability: 'Available' },
      { type: '1 Bedroom Apartment', priceMin: 120000, priceMax: 180000, availability: 'Available' },
      { type: '2 Bedroom Apartment', priceMin: 180000, priceMax: 300000, availability: 'Available' },
      { type: '3 Bedroom Apartment', priceMin: 300000, priceMax: 550000, availability: 'Limited' },
      { type: 'Penthouse', priceMin: 800000, priceMax: 2000000, availability: 'Exclusive' }
    ],
    amenities: {
      schools: [
        { name: 'International School of Erbil', type: 'school', distance: '10 min', description: 'British curriculum' },
        { name: 'American International School', type: 'school', distance: '15 min', description: 'American curriculum' }
      ],
      hospitals: [
        { name: 'PAR Hospital', type: 'hospital', distance: '8 min', description: '24/7 emergency services' },
        { name: 'Erbil Heart Center', type: 'hospital', distance: '12 min', description: 'Specialized cardiac care' }
      ],
      shopping: [
        { name: 'Empire World Mall', type: 'shopping', distance: 'On-site', description: '150,000 sqm integrated mall' },
        { name: 'Family Mall', type: 'shopping', distance: '15 min', description: 'Major retail destination' }
      ],
      restaurants: [
        { name: 'International Hotel Restaurants', type: 'restaurant', distance: 'On-site', description: 'Fine dining options' },
        { name: 'Mall Food Court', type: 'restaurant', distance: 'On-site', description: '50+ dining options' }
      ],
      recreation: [
        { name: 'Multiplex Cinema', type: 'other', distance: 'On-site', description: '12-screen cinema' },
        { name: 'Fitness Center', type: 'gym', distance: 'On-site', description: 'State-of-the-art gym' },
        { name: 'Rooftop Pool', type: 'other', distance: 'On-site', description: 'Infinity pool with city views' }
      ]
    },
    transportation: [
      { type: 'airport', name: 'Erbil International Airport', distance: '20 min', details: 'Direct highway access' },
      { type: 'highway', name: '100 Meter Road', distance: '2 min', details: 'Main arterial road' },
      { type: 'taxi', name: 'Taxi Stand', distance: 'On-site', details: '24/7 availability' }
    ],
    lifestyle: {
      type: 'Urban Luxury',
      description: 'Empire World offers an unparalleled urban luxury lifestyle with everything at your doorstep. Perfect for professionals and investors seeking premium modern living.',
      targetResidents: ['Young Professionals', 'Investors', 'Business Travelers', 'Expats', 'Couples'],
      communityVibe: 'Cosmopolitan and dynamic',
      safetyRating: 5,
      familyFriendly: true,
      petFriendly: true,
      expatFriendly: true
    },
    stats: {
      totalProperties: 2500,
      avgRentalYield: '8-12%'
    },
    seoKeywords: [
      'Empire World Erbil apartments',
      'Empire World property for sale',
      'luxury apartments Erbil',
      'off-plan properties Kurdistan',
      'Empire World investment',
      'Erbil new development'
    ],
    metaTitle: 'Empire World Erbil | Luxury Apartments & Investment Properties',
    metaDescription: 'Discover Empire World - Kurdistan\'s largest mixed-use development. Luxury apartments from $85K with 5-star hotel, mall & flexible payment plans. Book viewing today!',
    featuredProjects: ['empire-world-tower-a', 'empire-world-tower-b']
  },

  // 2. Dream City
  {
    id: 'dream-city',
    slug: 'dream-city',
    name: 'Dream City',
    nameKu: 'شاری خەون',
    nameAr: 'مدينة الأحلام',
    tagline: 'Kurdistan\'s Premier Family Community',
    description: 'Dream City is Erbil\'s most established gated community, offering world-class family living with international schools, parks, and comprehensive amenities.',
    longDescription: `Dream City stands as Kurdistan's gold standard for family-oriented living. This masterfully planned gated community has evolved over two decades to become the most sought-after residential address in Erbil.

Spanning over 3,200 residential units, Dream City offers everything from modern apartments to spacious villas, all designed with families in mind. The community is anchored by excellent educational facilities, including the prestigious International School of Choueifat and multiple nurseries following international curricula.

Security is paramount in Dream City. The community features 24/7 manned security gates, CCTV surveillance, and dedicated patrol teams. Children can safely walk to school, play in numerous parks, and enjoy the community's extensive recreational facilities.

The commercial center within Dream City provides daily conveniences without leaving the community - supermarkets, pharmacies, cafes, and restaurants cater to residents' needs. Property values have consistently appreciated, making Dream City not just a home but a sound investment.`,
    highlights: [
      '24/7 gated security',
      'International schools within community',
      'Over 3,200 residential units',
      'Extensive parks and green spaces',
      'Community shopping center',
      'Sports and recreational facilities',
      'Strong property value appreciation',
      'Diplomatic and executive community'
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp'
    ],
    coordinates: { lat: 36.2150, lng: 43.9800 },
    mapZoom: 14,
    priceRange: {
      min: 150000,
      max: 800000,
      average: 320000,
      currency: 'USD',
      pricePerSqm: { min: 1000, max: 2200 }
    },
    propertyTypes: [
      { type: '2 Bedroom Apartment', priceMin: 150000, priceMax: 220000, availability: 'Limited' },
      { type: '3 Bedroom Apartment', priceMin: 220000, priceMax: 300000, availability: 'Available' },
      { type: 'Townhouse', priceMin: 280000, priceMax: 400000, availability: 'Available' },
      { type: 'Villa', priceMin: 400000, priceMax: 650000, availability: 'Available' },
      { type: 'Luxury Villa', priceMin: 650000, priceMax: 800000, availability: 'Limited' }
    ],
    amenities: {
      schools: [
        { name: 'International School of Choueifat', type: 'school', distance: '5 min', description: 'SABIS curriculum' },
        { name: 'Dream City Nursery', type: 'school', distance: '3 min', description: 'Early childhood education' },
        { name: 'Kurdistan International School', type: 'school', distance: '8 min', description: 'British curriculum' }
      ],
      hospitals: [
        { name: 'Dream City Medical Center', type: 'hospital', distance: '5 min', description: 'Community clinic' },
        { name: 'PAR Hospital', type: 'hospital', distance: '15 min', description: 'Full hospital services' }
      ],
      shopping: [
        { name: 'Dream City Mall', type: 'shopping', distance: '3 min', description: 'Community shopping center' },
        { name: 'Carrefour Supermarket', type: 'shopping', distance: '5 min', description: 'Large grocery store' }
      ],
      restaurants: [
        { name: 'Various Cafes & Restaurants', type: 'restaurant', distance: '3-5 min', description: 'Diverse dining options' },
        { name: 'Pizza Hut', type: 'restaurant', distance: '5 min', description: 'Family dining' }
      ],
      recreation: [
        { name: 'Community Parks', type: 'park', distance: 'Throughout', description: 'Multiple green spaces' },
        { name: 'Swimming Pools', type: 'other', distance: 'Various', description: 'Community and private pools' },
        { name: 'Sports Courts', type: 'gym', distance: '5 min', description: 'Basketball, tennis, football' },
        { name: 'Children\'s Playgrounds', type: 'park', distance: 'Throughout', description: 'Safe play areas' }
      ]
    },
    transportation: [
      { type: 'airport', name: 'Erbil International Airport', distance: '20 min', details: 'Easy access via 60m road' },
      { type: 'highway', name: '60 Meter Road', distance: '5 min', details: 'Main city connection' },
      { type: 'public', name: 'School Buses', distance: 'On-site', details: 'Community transport' },
      { type: 'taxi', name: 'Taxi Services', distance: 'On-site', details: 'Multiple taxi stands' }
    ],
    lifestyle: {
      type: 'Family-Oriented',
      description: 'Dream City offers the ideal environment for raising a family, with safety, education, and community at its core. The perfect blend of security and suburban comfort.',
      targetResidents: ['Families with Children', 'Diplomats', 'Executives', 'Long-term Residents'],
      communityVibe: 'Safe, family-friendly, and community-oriented',
      safetyRating: 5,
      familyFriendly: true,
      petFriendly: true,
      expatFriendly: true
    },
    stats: {
      population: '15,000+',
      yearEstablished: '2005',
      totalProperties: 3200,
      avgRentalYield: '6-8%'
    },
    seoKeywords: [
      'Dream City Erbil',
      'family homes Erbil',
      'villas Dream City',
      'gated community Kurdistan',
      'international school Erbil',
      'expat housing Erbil'
    ],
    metaTitle: 'Dream City Erbil | Premier Gated Community & Family Homes',
    metaDescription: 'Dream City - Kurdistan\'s premier family community. Secure villas & apartments near international schools. 24/7 gated security. Book your viewing today!',
    featuredProjects: ['dream-city-villas', 'dream-city-gardens']
  },

  // 3. Ankawa
  {
    id: 'ankawa',
    slug: 'ankawa',
    name: 'Ankawa',
    nameKu: 'عەنکاوا',
    nameAr: 'عنكاوا',
    tagline: 'Erbil\'s Cosmopolitan Heart',
    description: 'Ankawa is the historic Christian quarter of Erbil, known for its vibrant nightlife, diverse restaurants, and welcoming international community.',
    longDescription: `Ankawa represents the cosmopolitan spirit of modern Kurdistan. This historic Christian neighborhood has evolved into Erbil's most culturally diverse and socially vibrant district, attracting residents from around the world.

The district's unique character comes from its blend of traditional churches and modern developments, local markets and international restaurants, historic streets and contemporary towers. Ankawa's nightlife scene is unmatched in Kurdistan, with rooftop bars, live music venues, and diverse entertainment options.

Real estate in Ankawa ranges from renovated traditional homes to modern tower apartments like those in MNW Towers and Cavally Tower. The area's international atmosphere and liberal lifestyle make it particularly popular among expatriates, young professionals, and anyone seeking a more cosmopolitan living experience.

Property values in Ankawa have shown consistent growth, driven by its unique cultural appeal and high demand from the international community. Whether seeking a lively urban lifestyle or a sound investment, Ankawa delivers on both fronts.`,
    highlights: [
      'Historic Christian quarter',
      'Vibrant nightlife and dining scene',
      'International community',
      'Cultural diversity and tolerance',
      'Mix of traditional and modern properties',
      'Strong expat presence',
      'Entertainment and social venues',
      'Consistent property appreciation'
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp'
    ],
    coordinates: { lat: 36.2220, lng: 43.9950 },
    mapZoom: 15,
    priceRange: {
      min: 75000,
      max: 400000,
      average: 150000,
      currency: 'USD',
      pricePerSqm: { min: 900, max: 2000 }
    },
    propertyTypes: [
      { type: '1 Bedroom Apartment', priceMin: 75000, priceMax: 120000, availability: 'Available' },
      { type: '2 Bedroom Apartment', priceMin: 120000, priceMax: 180000, availability: 'Available' },
      { type: '3 Bedroom Apartment', priceMin: 180000, priceMax: 280000, availability: 'Available' },
      { type: 'Townhouse', priceMin: 200000, priceMax: 350000, availability: 'Limited' },
      { type: 'Villa', priceMin: 300000, priceMax: 400000, availability: 'Rare' }
    ],
    amenities: {
      schools: [
        { name: 'American International School', type: 'school', distance: '10 min', description: 'American curriculum' },
        { name: 'Mar Qardakh School', type: 'school', distance: '5 min', description: 'Local education' }
      ],
      hospitals: [
        { name: 'CMC Hospital', type: 'hospital', distance: '8 min', description: 'Full medical services' },
        { name: 'Ankawa Medical Center', type: 'hospital', distance: '5 min', description: 'Community clinic' }
      ],
      shopping: [
        { name: 'Ankawa Mall', type: 'shopping', distance: '5 min', description: 'Shopping center' },
        { name: 'Ankawa Bazaar', type: 'shopping', distance: '3 min', description: 'Traditional market' },
        { name: 'Metro Supermarket', type: 'shopping', distance: '5 min', description: 'Large grocery' }
      ],
      restaurants: [
        { name: 'International Restaurant Row', type: 'restaurant', distance: '1-5 min', description: '50+ restaurants' },
        { name: 'Rooftop Bars', type: 'restaurant', distance: '5 min', description: 'Nightlife venues' },
        { name: 'Traditional Cafes', type: 'restaurant', distance: '3 min', description: 'Local coffee culture' }
      ],
      recreation: [
        { name: 'St. Joseph Cathedral', type: 'church', distance: '5 min', description: 'Historic cathedral' },
        { name: 'Fitness Centers', type: 'gym', distance: '5 min', description: 'Multiple gyms' },
        { name: 'Entertainment Venues', type: 'other', distance: 'Throughout', description: 'Live music, bars' }
      ]
    },
    transportation: [
      { type: 'airport', name: 'Erbil International Airport', distance: '10 min', details: 'Closest district to airport' },
      { type: 'highway', name: 'Airport Road', distance: '2 min', details: 'Direct airport access' },
      { type: 'taxi', name: 'Taxi Stands', distance: 'Throughout', details: '24/7 availability' }
    ],
    lifestyle: {
      type: 'Cosmopolitan',
      description: 'Ankawa offers a liberal, international lifestyle unique in the region. Its vibrant social scene, diverse community, and cultural openness attract those seeking a cosmopolitan experience.',
      targetResidents: ['Expats', 'Young Professionals', 'Singles', 'International Workers', 'Artists'],
      communityVibe: 'Liberal, diverse, and socially active',
      safetyRating: 4,
      familyFriendly: true,
      petFriendly: true,
      expatFriendly: true
    },
    stats: {
      population: '30,000+',
      yearEstablished: 'Historic',
      avgRentalYield: '7-10%'
    },
    seoKeywords: [
      'Ankawa Erbil apartments',
      'Ankawa property for sale',
      'expat housing Erbil',
      'nightlife Erbil Ankawa',
      'international community Kurdistan',
      'Ankawa real estate'
    ],
    metaTitle: 'Ankawa Erbil | Cosmopolitan Living & Expat Community',
    metaDescription: 'Ankawa - Erbil\'s vibrant international district. Apartments & villas in the historic Christian quarter. Diverse dining, nightlife & community. View properties!',
    featuredProjects: ['mnw-towers', 'cavally-tower']
  },

  // 4. Gulan
  {
    id: 'gulan',
    slug: 'gulan',
    name: 'Gulan',
    nameKu: 'گوڵان',
    nameAr: 'جولان',
    tagline: 'Erbil\'s Most Prestigious Address',
    description: 'Gulan is Erbil\'s premier residential and commercial district, home to modern high-rise towers, luxury shopping, and fine dining.',
    longDescription: `Gulan represents the pinnacle of urban prestige in Kurdistan. This dynamic district combines luxury residential towers with world-class commercial facilities, creating an environment where sophistication meets convenience.

The area is home to some of Erbil's most iconic buildings, including The Boulevard Tower and Queen Towers. Residents enjoy panoramic city views, state-of-the-art amenities, and immediate access to Family Mall - one of the largest shopping destinations in the Middle East.

Gulan's strategic location places it at the heart of Erbil's business district. Within walking distance, residents find international banks, corporate offices, five-star hotels, and premium dining establishments. The district has become a magnet for professionals, executives, and investors seeking prime real estate.

Property values in Gulan command premium prices, reflecting the unmatched location, construction quality, and prestige of the address. Rental demand remains consistently high, driven by business travelers and professionals, making it an excellent investment destination.`,
    highlights: [
      'Most prestigious address in Erbil',
      'Walking distance to Family Mall',
      'Modern high-rise towers',
      'Premium restaurants and cafes',
      '24/7 security in buildings',
      'High rental demand from professionals',
      'Central business district location',
      'Panoramic city views'
    ],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp'
    ],
    coordinates: { lat: 36.2085, lng: 44.0093 },
    mapZoom: 15,
    priceRange: {
      min: 80000,
      max: 500000,
      average: 150000,
      currency: 'USD',
      pricePerSqm: { min: 1100, max: 2800 }
    },
    propertyTypes: [
      { type: 'Studio', priceMin: 80000, priceMax: 110000, availability: 'Available' },
      { type: '1 Bedroom Apartment', priceMin: 110000, priceMax: 160000, availability: 'Available' },
      { type: '2 Bedroom Apartment', priceMin: 160000, priceMax: 250000, availability: 'Available' },
      { type: '3 Bedroom Apartment', priceMin: 250000, priceMax: 380000, availability: 'Limited' },
      { type: 'Penthouse', priceMin: 380000, priceMax: 500000, availability: 'Exclusive' }
    ],
    amenities: {
      schools: [
        { name: 'Gulan International School', type: 'school', distance: '10 min', description: 'International curriculum' },
        { name: 'British School Erbil', type: 'school', distance: '15 min', description: 'British curriculum' }
      ],
      hospitals: [
        { name: 'Gulan Medical Center', type: 'hospital', distance: '5 min', description: 'Private clinic' },
        { name: 'Rizgary Teaching Hospital', type: 'hospital', distance: '12 min', description: 'Major hospital' }
      ],
      shopping: [
        { name: 'Family Mall', type: 'shopping', distance: '5 min walk', description: 'Largest mall in region' },
        { name: 'Majidi Mall', type: 'shopping', distance: '8 min', description: 'Premium shopping' },
        { name: 'Gulan Street Retail', type: 'shopping', distance: 'On-site', description: 'High-end boutiques' }
      ],
      restaurants: [
        { name: 'Five-Star Hotel Restaurants', type: 'restaurant', distance: '5 min', description: 'Fine dining' },
        { name: 'International Cuisine Strip', type: 'restaurant', distance: '1-5 min', description: 'Diverse options' },
        { name: 'Rooftop Lounges', type: 'restaurant', distance: '5 min', description: 'Premium venues' }
      ],
      recreation: [
        { name: 'Gulan Park', type: 'park', distance: '5 min', description: 'Green space' },
        { name: 'Fitness Centers', type: 'gym', distance: 'In buildings', description: 'Tower amenities' },
        { name: 'Swimming Pools', type: 'other', distance: 'In buildings', description: 'Building pools' }
      ]
    },
    transportation: [
      { type: 'airport', name: 'Erbil International Airport', distance: '15 min', details: 'Via 100m road' },
      { type: 'highway', name: '100 Meter Road', distance: '2 min', details: 'Main highway access' },
      { type: 'highway', name: '60 Meter Road', distance: '3 min', details: 'City connection' },
      { type: 'taxi', name: 'Taxi Stands', distance: 'On-site', details: 'Multiple stands' }
    ],
    lifestyle: {
      type: 'Urban Professional',
      description: 'Gulan caters to ambitious professionals who demand the best. The district offers a sophisticated urban lifestyle with premium amenities, convenience, and prestige.',
      targetResidents: ['Young Professionals', 'Executives', 'Business Travelers', 'Investors', 'Expats'],
      communityVibe: 'Sophisticated, professional, and dynamic',
      safetyRating: 5,
      familyFriendly: true,
      petFriendly: true,
      expatFriendly: true
    },
    stats: {
      avgRentalYield: '8-11%'
    },
    seoKeywords: [
      'Gulan Erbil apartments',
      'luxury apartments Gulan',
      'Boulevard Tower',
      'Family Mall property',
      'Gulan real estate',
      'premium apartments Erbil'
    ],
    metaTitle: 'Gulan Erbil | Premium Apartments & Luxury Living',
    metaDescription: 'Gulan - Erbil\'s most prestigious address. Luxury apartments near Family Mall with panoramic views. Premium towers & professional lifestyle. Book viewing now!',
    featuredProjects: ['boulevard-tower', 'queen-towers']
  },

  // 5. Italian Village
  {
    id: 'italian-village',
    slug: 'italian-village',
    name: 'Italian Village',
    nameKu: 'گوندی ئیتالی',
    nameAr: 'القرية الإيطالية',
    tagline: 'Mediterranean Elegance in Kurdistan',
    description: 'Italian Village brings Tuscan charm to Erbil with its authentic Mediterranean architecture, landscaping, and lifestyle-focused community design.',
    longDescription: `Italian Village offers a unique living experience that transports residents to the romantic ambiance of Tuscany. This thoughtfully designed community has become one of the most distinctive and desirable addresses in Kurdistan.

The development features over 1,800 residential units, each designed with meticulous attention to Italian architectural details. Terracotta roofs, wrought-iron balconies, earth-tone facades, and cobblestone streets create an authentic Mediterranean atmosphere unlike anything else in the region.

Life in Italian Village centers around the central piazza - a community gathering space inspired by traditional Italian town squares. Residents enjoy outdoor cafes, restaurants, and social spaces designed for the kind of community interaction that defines Mediterranean lifestyle.

The village's distinctive character attracts buyers who appreciate architecture, design, and a community with personality. Properties maintain strong value due to the development's uniqueness and the limited supply of such distinctive homes in Erbil.`,
    highlights: [
      'Authentic Tuscan architecture',
      'Mediterranean landscaping',
      'Central piazza community space',
      'Outdoor lifestyle focus',
      'Unique design features',
      '1,800 residential units',
      'Italian-inspired cafes and restaurants',
      'Strong property value retention'
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp'
    ],
    coordinates: { lat: 36.1950, lng: 43.9700 },
    mapZoom: 15,
    priceRange: {
      min: 120000,
      max: 450000,
      average: 220000,
      currency: 'USD',
      pricePerSqm: { min: 950, max: 1800 }
    },
    propertyTypes: [
      { type: '2 Bedroom Apartment', priceMin: 120000, priceMax: 180000, availability: 'Available' },
      { type: '3 Bedroom Apartment', priceMin: 180000, priceMax: 250000, availability: 'Available' },
      { type: 'Townhouse', priceMin: 220000, priceMax: 320000, availability: 'Available' },
      { type: 'Villa', priceMin: 320000, priceMax: 450000, availability: 'Limited' }
    ],
    amenities: {
      schools: [
        { name: 'International School Erbil', type: 'school', distance: '15 min', description: 'International curriculum' },
        { name: 'Village Nursery', type: 'school', distance: '5 min', description: 'Early education' }
      ],
      hospitals: [
        { name: 'Village Medical Center', type: 'hospital', distance: '5 min', description: 'Community clinic' },
        { name: 'PAR Hospital', type: 'hospital', distance: '20 min', description: 'Full services' }
      ],
      shopping: [
        { name: 'Italian Village Mall', type: 'shopping', distance: '5 min', description: 'Community center' },
        { name: 'Village Supermarket', type: 'shopping', distance: '3 min', description: 'Daily needs' }
      ],
      restaurants: [
        { name: 'Piazza Restaurants', type: 'restaurant', distance: '3 min', description: 'Italian dining' },
        { name: 'Outdoor Cafes', type: 'restaurant', distance: 'Throughout', description: 'Alfresco dining' },
        { name: 'International Cuisine', type: 'restaurant', distance: '5 min', description: 'Diverse options' }
      ],
      recreation: [
        { name: 'Central Piazza', type: 'park', distance: 'On-site', description: 'Community gathering' },
        { name: 'Village Gardens', type: 'park', distance: 'Throughout', description: 'Landscaped spaces' },
        { name: 'Sports Facilities', type: 'gym', distance: '5 min', description: 'Community sports' },
        { name: 'Community Pool', type: 'other', distance: '5 min', description: 'Swimming facility' }
      ]
    },
    transportation: [
      { type: 'airport', name: 'Erbil International Airport', distance: '25 min', details: 'Via main roads' },
      { type: 'highway', name: 'City Center', distance: '20 min', details: 'Good connections' },
      { type: 'taxi', name: 'Taxi Services', distance: 'On-site', details: 'Village entrance' }
    ],
    lifestyle: {
      type: 'Mediterranean Living',
      description: 'Italian Village offers a relaxed, outdoor-focused lifestyle inspired by Mediterranean traditions. Perfect for those who appreciate architecture, community, and al fresco living.',
      targetResidents: ['Design Enthusiasts', 'Couples', 'Retirees', 'Lifestyle Buyers', 'Art Lovers'],
      communityVibe: 'Relaxed, artistic, and community-focused',
      safetyRating: 4,
      familyFriendly: true,
      petFriendly: true,
      expatFriendly: true
    },
    stats: {
      totalProperties: 1800,
      avgRentalYield: '5-7%'
    },
    seoKeywords: [
      'Italian Village Erbil',
      'Mediterranean homes Kurdistan',
      'Tuscan architecture Erbil',
      'Italian Village property',
      'unique homes Erbil',
      'European style houses'
    ],
    metaTitle: 'Italian Village Erbil | Mediterranean Villas & Unique Homes',
    metaDescription: 'Italian Village - Tuscan-inspired living in Erbil. Unique Mediterranean villas & apartments. Central piazza, outdoor lifestyle. Discover your dream home!',
    featuredProjects: ['italian-village-phase-2']
  },

  // 6. Baharka
  {
    id: 'baharka',
    slug: 'baharka',
    name: 'Baharka',
    nameKu: 'بەهارکە',
    nameAr: 'بحركة',
    tagline: 'Emerging Investment Opportunity',
    description: 'Baharka is a rapidly developing district on the northern outskirts of Erbil, offering affordable property options and strong investment potential.',
    longDescription: `Baharka represents one of Erbil's most promising areas for property investment. Located on the northern outskirts of the city, this developing district offers significantly more affordable prices while benefiting from ongoing infrastructure improvements.

The area has seen substantial development in recent years, with new residential compounds, commercial facilities, and improved road networks. Baharka's proximity to the agricultural regions provides a greener environment while remaining connected to central Erbil.

Property prices in Baharka remain attractive compared to established districts, making it ideal for first-time buyers and investors seeking entry-level opportunities with growth potential. As Erbil continues to expand northward, Baharka is positioned to benefit from urban development.

The district appeals to families seeking larger plots at affordable prices, as well as investors recognizing the area's appreciation potential. New housing projects are bringing modern amenities while maintaining competitive pricing.`,
    highlights: [
      'Affordable property prices',
      'Strong investment growth potential',
      'Larger plot sizes available',
      'Ongoing development and infrastructure',
      'Green and spacious environment',
      'Entry-level investment opportunity',
      'New residential compounds',
      'Family-friendly community'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp'
    ],
    coordinates: { lat: 36.2500, lng: 44.0100 },
    mapZoom: 14,
    priceRange: {
      min: 50000,
      max: 250000,
      average: 100000,
      currency: 'USD',
      pricePerSqm: { min: 400, max: 900 }
    },
    propertyTypes: [
      { type: 'Land Plot', priceMin: 50000, priceMax: 120000, availability: 'Available' },
      { type: '2 Bedroom House', priceMin: 70000, priceMax: 110000, availability: 'Available' },
      { type: '3 Bedroom House', priceMin: 100000, priceMax: 160000, availability: 'Available' },
      { type: 'Villa', priceMin: 150000, priceMax: 250000, availability: 'Available' }
    ],
    amenities: {
      schools: [
        { name: 'Baharka School', type: 'school', distance: '5 min', description: 'Local school' },
        { name: 'International Schools', type: 'school', distance: '25 min', description: 'In central Erbil' }
      ],
      hospitals: [
        { name: 'Baharka Health Center', type: 'hospital', distance: '5 min', description: 'Basic healthcare' },
        { name: 'Major Hospitals', type: 'hospital', distance: '25 min', description: 'In central Erbil' }
      ],
      shopping: [
        { name: 'Local Markets', type: 'shopping', distance: '5 min', description: 'Daily needs' },
        { name: 'Family Mall', type: 'shopping', distance: '30 min', description: 'Major shopping' }
      ],
      restaurants: [
        { name: 'Local Restaurants', type: 'restaurant', distance: '5 min', description: 'Kurdish cuisine' },
        { name: 'Cafes', type: 'restaurant', distance: '5 min', description: 'Local cafes' }
      ],
      recreation: [
        { name: 'Open Spaces', type: 'park', distance: 'Throughout', description: 'Green areas' },
        { name: 'Sports Fields', type: 'other', distance: '10 min', description: 'Football pitches' }
      ]
    },
    transportation: [
      { type: 'airport', name: 'Erbil International Airport', distance: '35 min', details: 'Via main road' },
      { type: 'highway', name: 'Mosul Road', distance: '10 min', details: 'Northern highway' },
      { type: 'public', name: 'Public Transport', distance: '5 min', details: 'To city center' }
    ],
    lifestyle: {
      type: 'Suburban Development',
      description: 'Baharka offers a quieter, more spacious lifestyle at affordable prices. Ideal for families seeking value and investors recognizing growth potential.',
      targetResidents: ['First-time Buyers', 'Families', 'Investors', 'Value Seekers'],
      communityVibe: 'Developing, spacious, and community-oriented',
      safetyRating: 3,
      familyFriendly: true,
      petFriendly: true,
      expatFriendly: false
    },
    stats: {
      avgRentalYield: '5-8%'
    },
    seoKeywords: [
      'Baharka Erbil property',
      'affordable homes Erbil',
      'land for sale Baharka',
      'investment property Kurdistan',
      'cheap houses Erbil',
      'Baharka real estate'
    ],
    metaTitle: 'Baharka Erbil | Affordable Property & Investment Opportunities',
    metaDescription: 'Baharka - Affordable property in Erbil\'s developing north. Land plots, houses & villas at entry-level prices. Strong growth potential. Explore options!',
    featuredProjects: []
  },

  // 7. American Village
  {
    id: 'american-village',
    slug: 'american-village',
    name: 'American Village',
    nameKu: 'گوندی ئەمریکی',
    nameAr: 'القرية الأمريكية',
    tagline: 'Western-Style Suburban Living',
    description: 'American Village offers spacious suburban-style homes with large yards, inspired by American residential neighborhoods.',
    longDescription: `American Village brings the spacious comfort of American suburban living to Erbil. This well-planned community features wide streets, large residential lots, and homes designed with the open floor plans and outdoor spaces characteristic of American neighborhoods.

The development caters to families who prioritize space, privacy, and a quieter pace of life. Properties in American Village typically feature large yards, driveways, and generous lot sizes rarely found in Erbil's more urban districts.

The community maintains a residential character with homes set back from tree-lined streets. Residents enjoy a sense of neighborhood with the space and privacy that larger lots provide. The area is particularly popular among families with children who appreciate the safe streets and room to play.

American Village appeals to those seeking the American suburban lifestyle - space, comfort, and community - while remaining accessible to Erbil's amenities. Property values reflect the premium placed on larger lots and Western-style construction.`,
    highlights: [
      'Spacious suburban-style lots',
      'American architectural design',
      'Large yards and outdoor space',
      'Tree-lined residential streets',
      'Family-friendly environment',
      'Private driveways',
      'Community atmosphere',
      'Western construction standards'
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp'
    ],
    coordinates: { lat: 36.2050, lng: 43.9600 },
    mapZoom: 15,
    priceRange: {
      min: 200000,
      max: 600000,
      average: 350000,
      currency: 'USD',
      pricePerSqm: { min: 700, max: 1400 }
    },
    propertyTypes: [
      { type: '3 Bedroom House', priceMin: 200000, priceMax: 320000, availability: 'Available' },
      { type: '4 Bedroom House', priceMin: 300000, priceMax: 450000, availability: 'Available' },
      { type: 'Villa', priceMin: 400000, priceMax: 550000, availability: 'Limited' },
      { type: 'Executive Villa', priceMin: 500000, priceMax: 600000, availability: 'Rare' }
    ],
    amenities: {
      schools: [
        { name: 'American International School', type: 'school', distance: '15 min', description: 'American curriculum' },
        { name: 'International School of Choueifat', type: 'school', distance: '20 min', description: 'SABIS curriculum' }
      ],
      hospitals: [
        { name: 'PAR Hospital', type: 'hospital', distance: '15 min', description: 'Full services' },
        { name: 'Community Clinic', type: 'hospital', distance: '5 min', description: 'Basic care' }
      ],
      shopping: [
        { name: 'Local Supermarket', type: 'shopping', distance: '5 min', description: 'Daily needs' },
        { name: 'Family Mall', type: 'shopping', distance: '20 min', description: 'Major shopping' }
      ],
      restaurants: [
        { name: 'Community Restaurants', type: 'restaurant', distance: '5-10 min', description: 'Local dining' },
        { name: 'Ankawa Dining', type: 'restaurant', distance: '15 min', description: 'Diverse options' }
      ],
      recreation: [
        { name: 'Community Park', type: 'park', distance: '5 min', description: 'Green space' },
        { name: 'Sports Facilities', type: 'gym', distance: '10 min', description: 'Basketball, tennis' },
        { name: 'Children\'s Playgrounds', type: 'park', distance: '5 min', description: 'Play areas' }
      ]
    },
    transportation: [
      { type: 'airport', name: 'Erbil International Airport', distance: '20 min', details: 'Via main roads' },
      { type: 'highway', name: '60 Meter Road', distance: '10 min', details: 'City connection' },
      { type: 'taxi', name: 'Taxi Services', distance: '5 min', details: 'On-call service' }
    ],
    lifestyle: {
      type: 'Suburban Family',
      description: 'American Village delivers the spacious suburban lifestyle families dream of - large yards, safe streets, and room to grow. Perfect for those who value space and privacy.',
      targetResidents: ['Families', 'Americans/Expats', 'Professionals', 'Nature Lovers'],
      communityVibe: 'Quiet, spacious, and family-oriented',
      safetyRating: 4,
      familyFriendly: true,
      petFriendly: true,
      expatFriendly: true
    },
    stats: {
      avgRentalYield: '5-7%'
    },
    seoKeywords: [
      'American Village Erbil',
      'suburban homes Kurdistan',
      'family houses Erbil',
      'large yard property Erbil',
      'Western style homes',
      'American Village real estate'
    ],
    metaTitle: 'American Village Erbil | Suburban Homes & Family Villas',
    metaDescription: 'American Village - Spacious suburban living in Erbil. Large yards, family homes & Western-style villas. Perfect for families seeking space. View properties!',
    featuredProjects: []
  },

  // 8. Havalan City
  {
    id: 'havalan-city',
    slug: 'havalan-city',
    name: 'Havalan City',
    nameKu: 'شاری هەڤاڵان',
    nameAr: 'مدينة هفالان',
    tagline: 'Modern Living Near the Airport',
    description: 'Havalan City is a modern residential development strategically located near Erbil International Airport, ideal for frequent travelers.',
    longDescription: `Havalan City offers contemporary living in one of Erbil's most strategically located areas. Situated near the International Airport, this modern development is ideal for business travelers, airline staff, and anyone requiring frequent airport access.

The development features modern apartment towers and townhouses with contemporary designs and finishes. Residents enjoy the convenience of being just minutes from the airport while still having access to essential amenities and services.

Havalan City's architecture reflects modern urban design principles with clean lines, efficient layouts, and quality construction. The development includes commercial areas, parks, and community facilities that create a self-contained neighborhood.

For investors, Havalan City's proximity to the airport creates consistent rental demand from business travelers, airline employees, and contractors working in the area. The strategic location ensures strong occupancy rates and rental returns.`,
    highlights: [
      'Minutes from International Airport',
      'Modern architecture and design',
      'Ideal for frequent travelers',
      'Strong rental demand',
      'Contemporary amenities',
      'Commercial facilities included',
      'Growing development area',
      'Investment opportunity'
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp'
    ],
    coordinates: { lat: 36.2350, lng: 43.9650 },
    mapZoom: 14,
    priceRange: {
      min: 70000,
      max: 280000,
      average: 130000,
      currency: 'USD',
      pricePerSqm: { min: 800, max: 1500 }
    },
    propertyTypes: [
      { type: '1 Bedroom Apartment', priceMin: 70000, priceMax: 100000, availability: 'Available' },
      { type: '2 Bedroom Apartment', priceMin: 100000, priceMax: 150000, availability: 'Available' },
      { type: '3 Bedroom Apartment', priceMin: 150000, priceMax: 200000, availability: 'Available' },
      { type: 'Townhouse', priceMin: 180000, priceMax: 280000, availability: 'Limited' }
    ],
    amenities: {
      schools: [
        { name: 'International Schools', type: 'school', distance: '20 min', description: 'In Ankawa area' },
        { name: 'Local Schools', type: 'school', distance: '10 min', description: 'Nearby education' }
      ],
      hospitals: [
        { name: 'Airport Medical Services', type: 'hospital', distance: '5 min', description: 'Emergency care' },
        { name: 'PAR Hospital', type: 'hospital', distance: '20 min', description: 'Full hospital' }
      ],
      shopping: [
        { name: 'Local Supermarket', type: 'shopping', distance: '5 min', description: 'Daily needs' },
        { name: 'Family Mall', type: 'shopping', distance: '20 min', description: 'Major shopping' }
      ],
      restaurants: [
        { name: 'Airport Hotels Dining', type: 'restaurant', distance: '5 min', description: 'Hotel restaurants' },
        { name: 'Local Cafes', type: 'restaurant', distance: '5 min', description: 'Quick dining' }
      ],
      recreation: [
        { name: 'Community Park', type: 'park', distance: '5 min', description: 'Green space' },
        { name: 'Fitness Center', type: 'gym', distance: '5 min', description: 'Modern gym' }
      ]
    },
    transportation: [
      { type: 'airport', name: 'Erbil International Airport', distance: '5 min', details: 'Primary advantage' },
      { type: 'highway', name: 'Airport Road', distance: '2 min', details: 'Direct access' },
      { type: 'taxi', name: 'Airport Taxis', distance: '2 min', details: '24/7 service' }
    ],
    lifestyle: {
      type: 'Modern Convenience',
      description: 'Havalan City is designed for modern professionals who value convenience and connectivity. Perfect for those who travel frequently or work near the airport.',
      targetResidents: ['Business Travelers', 'Airline Staff', 'Contractors', 'Investors'],
      communityVibe: 'Modern, convenient, and professional',
      safetyRating: 4,
      familyFriendly: true,
      petFriendly: true,
      expatFriendly: true
    },
    stats: {
      avgRentalYield: '8-12%'
    },
    seoKeywords: [
      'Havalan City Erbil',
      'airport property Erbil',
      'apartments near airport',
      'Erbil airport housing',
      'Havalan real estate',
      'modern apartments Erbil'
    ],
    metaTitle: 'Havalan City Erbil | Modern Living Near Airport',
    metaDescription: 'Havalan City - 5 minutes from Erbil Airport. Modern apartments & townhouses. Ideal for travelers & investors. High rental demand. Explore options!',
    featuredProjects: ['havalan-towers']
  },

  // 9. Central Erbil
  {
    id: 'central-erbil',
    slug: 'central-erbil',
    name: 'Central Erbil',
    nameKu: 'ناوەندی هەولێر',
    nameAr: 'وسط أربيل',
    tagline: 'The Heart of Kurdistan\'s Capital',
    description: 'Central Erbil is the bustling commercial and cultural hub of the city, offering a dynamic urban lifestyle with historic charm.',
    longDescription: `Central Erbil represents the vibrant heart of Kurdistan's capital. This dynamic area encompasses the main commercial districts, government buildings, and the iconic Citadel - one of the oldest continuously inhabited sites in the world.

Living in Central Erbil means being at the center of everything. Within walking distance, residents find the main bazaars, banks, government offices, hotels, and countless restaurants and cafes. The area pulses with energy from morning until late at night.

Properties in Central Erbil range from apartments in modern commercial buildings to renovated traditional structures. The area offers excellent rental potential due to consistent demand from businesses, government workers, and visitors.

While Central Erbil may lack the quiet of suburban areas, it compensates with unmatched convenience and urban energy. For those who thrive in dynamic environments and value being at the center of the action, Central Erbil is the ideal choice.`,
    highlights: [
      'Heart of Erbil city',
      'Walking distance to everything',
      'Historic Citadel nearby',
      'Main bazaar and shopping',
      'Government and business hub',
      'Strong rental demand',
      'Cultural attractions',
      'Urban energy and convenience'
    ],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp'
    ],
    coordinates: { lat: 36.1911, lng: 44.0091 },
    mapZoom: 15,
    priceRange: {
      min: 60000,
      max: 300000,
      average: 120000,
      currency: 'USD',
      pricePerSqm: { min: 800, max: 1800 }
    },
    propertyTypes: [
      { type: 'Studio', priceMin: 60000, priceMax: 90000, availability: 'Available' },
      { type: '1 Bedroom Apartment', priceMin: 80000, priceMax: 130000, availability: 'Available' },
      { type: '2 Bedroom Apartment', priceMin: 120000, priceMax: 200000, availability: 'Available' },
      { type: 'Commercial Space', priceMin: 150000, priceMax: 300000, availability: 'Limited' }
    ],
    amenities: {
      schools: [
        { name: 'Various Schools', type: 'school', distance: '10-20 min', description: 'Multiple options' }
      ],
      hospitals: [
        { name: 'Rizgary Teaching Hospital', type: 'hospital', distance: '10 min', description: 'Major hospital' },
        { name: 'Multiple Clinics', type: 'hospital', distance: '5 min', description: 'Medical services' }
      ],
      shopping: [
        { name: 'Erbil Grand Bazaar', type: 'shopping', distance: '5 min', description: 'Historic market' },
        { name: 'Majidi Mall', type: 'shopping', distance: '10 min', description: 'Modern shopping' },
        { name: 'Local Shops', type: 'shopping', distance: '1-5 min', description: 'Everything nearby' }
      ],
      restaurants: [
        { name: 'Traditional Kurdish Restaurants', type: 'restaurant', distance: '5 min', description: 'Local cuisine' },
        { name: 'International Dining', type: 'restaurant', distance: '5-10 min', description: 'Diverse options' },
        { name: 'Street Food', type: 'restaurant', distance: '1 min', description: 'Quick bites' }
      ],
      recreation: [
        { name: 'Erbil Citadel', type: 'other', distance: '10 min', description: 'UNESCO site' },
        { name: 'Shar Park', type: 'park', distance: '15 min', description: 'Main city park' },
        { name: 'Mosques', type: 'mosque', distance: '5 min', description: 'Historic mosques' }
      ]
    },
    transportation: [
      { type: 'airport', name: 'Erbil International Airport', distance: '20 min', details: 'Via main road' },
      { type: 'taxi', name: 'Taxi Stands', distance: 'Everywhere', details: 'Abundant taxis' },
      { type: 'public', name: 'Public Transport Hub', distance: '5 min', details: 'All routes' }
    ],
    lifestyle: {
      type: 'Urban Dynamic',
      description: 'Central Erbil offers an energetic urban lifestyle for those who want to be in the thick of things. Ideal for professionals, business owners, and those who love city living.',
      targetResidents: ['Business Owners', 'Young Professionals', 'Urban Enthusiasts', 'Investors'],
      communityVibe: 'Energetic, bustling, and diverse',
      safetyRating: 3,
      familyFriendly: false,
      petFriendly: false,
      expatFriendly: true
    },
    stats: {
      population: '200,000+',
      avgRentalYield: '7-10%'
    },
    seoKeywords: [
      'Central Erbil property',
      'downtown Erbil apartments',
      'city center real estate',
      'Erbil bazaar property',
      'commercial property Erbil',
      'urban apartments Kurdistan'
    ],
    metaTitle: 'Central Erbil | Urban Apartments & Commercial Property',
    metaDescription: 'Central Erbil - Heart of Kurdistan\'s capital. Apartments & commercial spaces near Citadel, bazaar & business hub. High rental demand. View listings!',
    featuredProjects: []
  },

  // 10. Citadel Area
  {
    id: 'citadel-area',
    slug: 'citadel-area',
    name: 'Citadel Area',
    nameKu: 'قەڵاچی',
    nameAr: 'منطقة القلعة',
    tagline: 'Living History in the World\'s Oldest City',
    description: 'The Citadel Area surrounds the UNESCO World Heritage Erbil Citadel, offering a unique blend of historical significance and modern urban living.',
    longDescription: `The Citadel Area offers a living experience unlike any other in Erbil - or the world. Surrounding the UNESCO World Heritage Erbil Citadel, this district places residents at the heart of one of the oldest continuously inhabited sites in human history.

The iconic Citadel, standing proudly above the city for over 6,000 years, dominates the skyline and provides a constant connection to humanity's ancient past. The surrounding area has undergone careful development that respects the historical significance while providing modern amenities.

Properties near the Citadel range from renovated historic buildings to modern apartments with Citadel views. The area attracts those who appreciate history, culture, and the prestige of living near such an iconic landmark.

The district offers excellent tourism-related investment opportunities. Short-term rentals perform well given the constant stream of visitors to the Citadel. For those seeking a home with meaning and character, the Citadel Area delivers a truly unique proposition.`,
    highlights: [
      'UNESCO World Heritage Site',
      '6,000+ years of history',
      'Iconic Citadel views',
      'Cultural significance',
      'Tourism investment potential',
      'Historic atmosphere',
      'Renovated historic properties',
      'Walking distance to attractions'
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp'
    ],
    coordinates: { lat: 36.1919, lng: 44.0086 },
    mapZoom: 16,
    priceRange: {
      min: 80000,
      max: 350000,
      average: 150000,
      currency: 'USD',
      pricePerSqm: { min: 1000, max: 2200 }
    },
    propertyTypes: [
      { type: 'Studio Apartment', priceMin: 80000, priceMax: 120000, availability: 'Limited' },
      { type: '1 Bedroom Apartment', priceMin: 100000, priceMax: 160000, availability: 'Available' },
      { type: '2 Bedroom Apartment', priceMin: 150000, priceMax: 250000, availability: 'Available' },
      { type: 'Historic Property', priceMin: 200000, priceMax: 350000, availability: 'Rare' }
    ],
    amenities: {
      schools: [
        { name: 'Various Schools', type: 'school', distance: '15 min', description: 'In central area' }
      ],
      hospitals: [
        { name: 'Rizgary Teaching Hospital', type: 'hospital', distance: '10 min', description: 'Major hospital' },
        { name: 'Central Clinics', type: 'hospital', distance: '5 min', description: 'Medical services' }
      ],
      shopping: [
        { name: 'Erbil Grand Bazaar', type: 'shopping', distance: '5 min', description: 'Historic market' },
        { name: 'Souvenir Shops', type: 'shopping', distance: '2 min', description: 'Tourist shopping' }
      ],
      restaurants: [
        { name: 'Citadel View Restaurants', type: 'restaurant', distance: '5 min', description: 'Scenic dining' },
        { name: 'Traditional Kurdish Restaurants', type: 'restaurant', distance: '5 min', description: 'Local cuisine' },
        { name: 'Rooftop Cafes', type: 'restaurant', distance: '5 min', description: 'Citadel views' }
      ],
      recreation: [
        { name: 'Erbil Citadel', type: 'other', distance: 'Adjacent', description: 'UNESCO World Heritage' },
        { name: 'Kurdish Textile Museum', type: 'other', distance: '5 min', description: 'Cultural museum' },
        { name: 'Shar Park', type: 'park', distance: '10 min', description: 'City park' }
      ]
    },
    transportation: [
      { type: 'airport', name: 'Erbil International Airport', distance: '20 min', details: 'Via main road' },
      { type: 'taxi', name: 'Taxi Stands', distance: '5 min', details: 'Readily available' },
      { type: 'public', name: 'Central Hub', distance: '5 min', details: 'All connections' }
    ],
    lifestyle: {
      type: 'Historic Urban',
      description: 'Living near the Citadel means being surrounded by history every day. Ideal for history enthusiasts, cultural appreciators, and investors in tourism properties.',
      targetResidents: ['History Enthusiasts', 'Airbnb Investors', 'Culture Lovers', 'Photographers'],
      communityVibe: 'Historic, cultural, and touristic',
      safetyRating: 4,
      familyFriendly: false,
      petFriendly: false,
      expatFriendly: true
    },
    stats: {
      yearEstablished: '4000+ BCE',
      avgRentalYield: '10-15% (short-term)'
    },
    seoKeywords: [
      'Citadel Erbil property',
      'historic Erbil apartments',
      'UNESCO heritage living',
      'Erbil Citadel real estate',
      'tourism property Erbil',
      'Airbnb investment Kurdistan'
    ],
    metaTitle: 'Citadel Area Erbil | Historic Properties Near UNESCO Site',
    metaDescription: 'Citadel Area - Live near Erbil\'s 6,000-year-old UNESCO site. Historic apartments with Citadel views. Tourism investment potential. Discover unique properties!',
    featuredProjects: []
  }
];

// ===============================================================================
// Helper Functions
// ===============================================================================

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return neighborhoods.find(n => n.slug === slug);
}

export function getNeighborhoodById(id: string): Neighborhood | undefined {
  return neighborhoods.find(n => n.id === id);
}

export function getAllNeighborhoodSlugs(): string[] {
  return neighborhoods.map(n => n.slug);
}

export function getNeighborhoodsForSitemap(): Array<{ slug: string; name: string; lastmod: string }> {
  return neighborhoods.map(n => ({
    slug: n.slug,
    name: n.name,
    lastmod: new Date().toISOString().split('T')[0]
  }));
}

export function formatNeighborhoodPrice(price: number): string {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${(price / 1000).toFixed(0)}K`;
}

export function getNeighborhoodPriceDisplay(neighborhood: Neighborhood): string {
  return `${formatNeighborhoodPrice(neighborhood.priceRange.min)} - ${formatNeighborhoodPrice(neighborhood.priceRange.max)}`;
}
