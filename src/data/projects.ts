// ═══════════════════════════════════════════════════════════════════════════
// Project Data - Real Estate Development Projects in Erbil, Iraq
// ═══════════════════════════════════════════════════════════════════════════

export type ProjectStatus = 'Under Construction' | 'Ready' | 'Coming Soon';

export interface ConstructionMilestone {
  date: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    district: string;
    country: string;
  };
  status: ProjectStatus;
  totalUnits: number;
  priceRange: {
    min: number;
    max: number;
    currency: 'USD' | 'IQD';
  };
  completionDate: string;
  amenities: string[];
  images: string[];
  image?: string; // Main hero image (optional)
  gallery?: string[]; // 4-6 gallery images (optional)
  floorPlanImages?: string[]; // 2-3 floor plan images (optional)
  description: string;
  propertyIds: string[]; // Links to individual properties
  constructionProgress?: number; // 0-100 percentage (optional - calculated from status if not set)
  constructionMilestones?: ConstructionMilestone[]; // Optional - generated from status if not set
}

// ═══════════════════════════════════════════════════════════════════════════
// Projects - Erbil Development Projects
// ═══════════════════════════════════════════════════════════════════════════

export const projects: Project[] = [
  {
    id: 'empire-world',
    name: 'Empire World',
    location: {
      address: 'Empire World Complex',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 6000,
    priceRange: {
      min: 150000,
      max: 2500000,
      currency: 'USD'
    },
    completionDate: '2028',
    amenities: [
      'Shopping Mall',
      'Five-Star Hotel',
      'Business Center',
      'Luxury Apartments',
      'Fine Dining Restaurants',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'Swimming Pool',
      'Spa & Wellness Center',
      'Cinema',
      'Kids Play Area'
    ],
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp'
    ],
    description: `Empire World is Erbil's most ambitious mixed-use development project, setting new standards for luxury living in the Kurdistan Region. This landmark development features residential towers, a world-class shopping mall, five-star hotel, and premium office spaces.

The project spans over 500,000 square meters and will become the commercial heart of Erbil. Residential units range from elegant studio apartments to sprawling penthouses with panoramic city views. Every residence features premium finishes, smart home technology, and access to exclusive amenities.

Empire World represents the future of urban living in Iraq, combining international standards with local hospitality traditions.`,
    propertyIds: [],
    constructionProgress: 65,
    constructionMilestones: [
      { date: '2023-Q1', title: 'Foundation Complete', description: 'Foundation and underground structure completed', completed: true },
      { date: '2024-Q2', title: 'Structure 50%', description: 'Main structure reached 50% completion', completed: true },
      { date: '2025-Q4', title: 'Exterior Finishing', description: 'External facade and cladding installation', completed: false },
      { date: '2027-Q2', title: 'Final Handover', description: 'Project completion and unit handover', completed: false }
    ]
  },
  {
    id: 'dream-city',
    name: 'Dream City',
    location: {
      address: 'Dream City Complex',
      city: 'Erbil',
      district: 'Dream City',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1000,
    priceRange: {
      min: 380000,
      max: 2400000,
      currency: 'USD'
    },
    completionDate: '2007',
    amenities: [
      'Gated Community',
      'Central Park',
      'International Schools',
      'Medical Clinic',
      'Shopping Center',
      'Sports Facilities',
      'Mosque',
      'Community Center',
      '24/7 Security',
      'Landscaped Gardens',
      'Jogging Track',
      'Playground'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752734-2a0cd66c42ae?w=800&q=80&fm=webp'
    ],
    description: `Dream City is one of Erbil's premier residential communities, offering a complete lifestyle destination for families and professionals. This master-planned community combines modern architecture with thoughtful urban planning.

The project features a diverse range of housing options including villas, townhouses, and apartments, all set within beautifully landscaped grounds. Residents enjoy access to international schools, healthcare facilities, shopping centers, and recreational amenities without leaving the community.

Dream City represents the ideal blend of privacy, security, and community living, making it one of the most sought-after addresses in Erbil.`,
    propertyIds: [],
    constructionProgress: 100,
    constructionMilestones: [
      { date: '2020-Q1', title: 'Construction Started', description: 'Groundbreaking ceremony', completed: true },
      { date: '2021-Q3', title: 'Structure Complete', description: 'All structures completed', completed: true },
      { date: '2022-Q4', title: 'Interior Finishing', description: 'Interior finishing completed', completed: true },
      { date: '2023-Q2', title: 'Project Delivered', description: 'Full project handover complete', completed: true }
    ]
  },
  {
    id: 'italian-village',
    name: 'Italian Village',
    location: {
      address: 'Italian Village',
      city: 'Erbil',
      district: 'Italian Village',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 2200,
    priceRange: {
      min: 150000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2015',
    amenities: [
      'Italian-Style Architecture',
      'Central Piazza',
      'Restaurants & Cafes',
      'Boutique Shops',
      'Art Gallery',
      'Fitness Center',
      'Swimming Pool',
      '24/7 Security',
      'Covered Parking',
      'Landscaped Courtyards',
      'Children\'s Play Area',
      'Event Hall'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752734-2a0cd66c42ae?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80&fm=webp'
    ],
    description: `Italian Village brings the charm of Tuscany to the heart of Erbil. This unique residential development features authentic Italian architecture, with homes designed around picturesque courtyards and a central piazza.

The village atmosphere creates a warm, welcoming community where neighbors become friends. Cobblestone pathways wind through the property, connecting residents to charming cafes, boutique shops, and community spaces inspired by Italian lifestyle.

Each residence is crafted with attention to detail, featuring terracotta roofs, wrought-iron balconies, and arched doorways. Italian Village offers a distinctive living experience that celebrates Mediterranean elegance in Kurdistan.`,
    propertyIds: []
  },
  {
    id: 'english-village',
    name: 'English Village',
    location: {
      address: 'English Village',
      city: 'Erbil',
      district: 'English Village',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 458,
    priceRange: {
      min: 180000,
      max: 550000,
      currency: 'USD'
    },
    completionDate: '2010',
    amenities: [
      'British Colonial Architecture',
      'Private Gardens',
      'Country Club',
      'Tennis Courts',
      'Swimming Pool',
      'Spa',
      'Fine Dining Restaurant',
      'Business Center',
      '24/7 Security',
      'Valet Parking',
      'Concierge Service',
      'Golf Course Access'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752734-2a0cd66c42ae?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80&fm=webp'
    ],
    description: `English Village is an exclusive residential enclave that captures the elegance of British country living. This prestigious community features stately homes inspired by Georgian and Victorian architecture.

Residents enjoy a refined lifestyle with access to a private country club, manicured gardens, and world-class amenities. The village is designed for those who appreciate timeless elegance and seek a distinguished address in Erbil.

Each residence offers generous living spaces, quality craftsmanship, and private gardens. English Village represents the pinnacle of luxury living in Kurdistan, where tradition meets contemporary comfort.`,
    propertyIds: []
  },
  {
    id: 'boulevard',
    name: 'The Boulevard',
    location: {
      address: 'Boulevard Complex',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1300,
    priceRange: {
      min: 95000,
      max: 350000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Modern Architecture',
      'Rooftop Garden',
      'Fitness Center',
      'Swimming Pool',
      '24/7 Security',
      'Underground Parking',
      'High-Speed Elevators',
      'Smart Home Ready',
      'Concierge Service',
      'Business Center',
      'Children\'s Play Area',
      'BBQ Area'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp'
    ],
    description: `The Boulevard is a premier residential complex in the heart of Gulan, offering modern luxury apartments with stunning city views. This iconic development combines contemporary design with premium amenities.

Each apartment features spacious layouts, floor-to-ceiling windows, and high-end finishes. Residents enjoy access to a rooftop garden, fitness center, swimming pool, and 24/7 concierge service.

The Boulevard is perfectly located near shopping centers, restaurants, and entertainment venues, making it an ideal choice for professionals and families seeking a modern urban lifestyle in Erbil.`,
    propertyIds: ['boulevard-a1', 'boulevard-a2', 'boulevard-a3']
  },
  {
    id: 'cavally-tower',
    name: 'Cavally Tower',
    location: {
      address: 'Cavally Tower',
      city: 'Erbil',
      district: 'Ankawa',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 350,
    priceRange: {
      min: 110000,
      max: 420000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Luxury Tower Living',
      'Panoramic Views',
      'Sky Lounge',
      'Infinity Pool',
      'Spa & Sauna',
      'Private Cinema',
      '24/7 Security',
      'Valet Parking',
      'Concierge Service',
      'Business Center',
      'Residents\' Lounge',
      'Landscaped Terraces'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp'
    ],
    description: `Cavally Tower stands as one of Ankawa's most prestigious residential addresses. This elegant high-rise offers luxury apartments with breathtaking panoramic views of Erbil and the surrounding mountains.

The tower features world-class amenities including a sky lounge, infinity pool, spa, and private cinema. Every apartment is designed with attention to detail, featuring premium materials, smart home technology, and spacious balconies.

Cavally Tower represents the pinnacle of vertical living in Erbil, combining sophisticated design with unparalleled comfort and convenience.`,
    propertyIds: []
  },
  {
    id: 'tulip-towers',
    name: 'Tulip Towers',
    location: {
      address: 'Tulip Towers Complex',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1220,
    priceRange: {
      min: 85000,
      max: 280000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Four Tower Design',
      'Central Garden',
      'Swimming Pool',
      'Fitness Center',
      'Children\'s Play Area',
      '24/7 Security',
      'Covered Parking',
      'Shopping Arcade',
      'Cafes & Restaurants',
      'Jogging Track',
      'Basketball Court',
      'Community Center'
    ],
    images: [
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp'
    ],
    description: `Tulip Towers is a distinctive four-tower residential complex offering modern apartments in the heart of Gulan. The iconic design features four elegant towers connected by landscaped gardens and shared amenities.

Residents enjoy a variety of apartment sizes to suit different lifestyles, from cozy studios to spacious family apartments. The development includes a swimming pool, fitness center, children's play areas, and a shopping arcade at ground level.

Tulip Towers combines affordability with quality, making it an excellent choice for first-time buyers and investors looking for value in Erbil's growing real estate market.`,
    propertyIds: []
  },
  {
    id: 'london-towers',
    name: 'London Towers',
    location: {
      address: 'London Towers',
      city: 'Erbil',
      district: 'Waziran',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 400,
    priceRange: {
      min: 130000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2026',
    amenities: [
      'British-Inspired Design',
      'Rooftop Terrace',
      'Indoor Pool',
      'Fitness Center',
      'Business Lounge',
      '24/7 Security',
      'Underground Parking',
      'Concierge Service',
      'Private Gardens',
      'Children\'s Club',
      'Meeting Rooms',
      'Guest Suites'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp'
    ],
    description: `London Towers brings British elegance to Erbil's skyline. This prestigious residential development features refined architecture inspired by London's most desirable addresses, combined with modern luxury amenities.

Each apartment offers generous living spaces, premium finishes, and thoughtful layouts designed for comfortable family living. Residents have access to an indoor pool, rooftop terrace, business lounge, and private gardens.

London Towers is ideal for those seeking a sophisticated lifestyle in one of Erbil's most desirable locations, with easy access to schools, shopping, and entertainment.`,
    propertyIds: []
  },
  {
    id: 'mnw-towers',
    name: 'MNW Towers',
    location: {
      address: 'MNW Towers Complex',
      city: 'Erbil',
      district: 'Ankawa',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 800,
    priceRange: {
      min: 90000,
      max: 320000,
      currency: 'USD'
    },
    completionDate: '2026',
    amenities: [
      'Modern High-Rise Living',
      'Smart Building Technology',
      'Rooftop Pool & Lounge',
      'State-of-the-Art Gym',
      'Co-Working Space',
      '24/7 Security',
      'Electric Vehicle Charging',
      'Underground Parking',
      'Retail Podium',
      'Landscaped Plaza',
      'Children\'s Facilities',
      'Pet-Friendly Areas'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp'
    ],
    description: `MNW Towers is an upcoming landmark development in Ankawa, featuring modern high-rise apartments designed for contemporary urban living. This ambitious project combines cutting-edge architecture with sustainable design principles.

The development will offer a range of apartment sizes from studios to three-bedroom units, all featuring smart home technology, energy-efficient systems, and premium finishes. Residents will enjoy a rooftop pool, state-of-the-art fitness center, co-working spaces, and a retail podium.

Early buyers can take advantage of attractive pre-construction pricing and flexible payment plans. MNW Towers represents the future of residential living in Erbil.`,
    propertyIds: []
  },
  {
    id: 'pavilion-erbil',
    name: 'Pavilion Erbil',
    location: {
      address: 'Pavilion Erbil',
      city: 'Erbil',
      district: 'Pavilion',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 2800,
    priceRange: {
      min: 250000,
      max: 3500000,
      currency: 'USD'
    },
    completionDate: '2028',
    amenities: [
      '320,000 sqm Lagoon',
      'Private Beach',
      'Smart Home Technology',
      'Football Stadium',
      'Basketball & Volleyball Courts',
      'Shopping & Retail',
      'Healthcare Facilities',
      'International Schools',
      'Five-Star Hotels',
      '24/7 Security',
      'Landscaped Gardens',
      'Marina & Waterways'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752734-2a0cd66c42ae?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp'
    ],
    description: `Pavilion Erbil is one of the most significant and luxurious residential developments in Kurdistan and Iraq, spanning over 170 hectares with neighborhoods designed as an island escape. The centerpiece is a stunning 320,000 square meter lagoon and waterways providing a refreshing environment.

The project offers luxury villas in four collections with plot sizes ranging from 400 to over 1,000 square meters, featuring modern architecture with large balconies, expansive windows, and smart home technologies. Apartments line the green edge of the masterplan with views of the canal and lagoon.

Pavilion Erbil represents a radically new offer to contemporary luxury living, combining world-class amenities with serene waterfront living in the heart of Kurdistan.`,
    propertyIds: []
  },
  {
    id: 'lebanese-village',
    name: 'Lebanese Village',
    location: {
      address: 'Baherka Road, near Ainkawa',
      city: 'Erbil',
      district: 'Baherka',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 3400,
    priceRange: {
      min: 65000,
      max: 420000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Mixed-Use Development',
      'Health & Sports Club',
      'Outdoor Swimming Pool',
      'Clubhouse',
      'Nursery & School',
      'Medical Center',
      'Mosque',
      'Landscaped Park',
      'Retail Shops',
      'Office Spaces',
      '24/7 Security',
      'Furnished Apartments Available'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp'
    ],
    description: `Lebanese Village is a master-planned residential and commercial mixed-use development located just 10 minutes from Erbil International Airport on the new Baherka Road near Ainkawa. The project spans a built-up area of 240,000 square meters.

Featuring 3,400 residential units including spacious villas and apartments ranging from 50 to 200 square meters, the development caters to diverse lifestyle needs. The unique Lebanese-inspired architecture and large open spaces create a distinctive community atmosphere.

Residents enjoy comprehensive amenities including a health club, swimming pool, schools, medical facilities, and beautifully landscaped parks with walkways throughout the community.`,
    propertyIds: []
  },
  {
    id: 'downtown-erbil',
    name: 'Downtown Erbil',
    location: {
      address: 'Between Citadel and Airport',
      city: 'Erbil',
      district: 'Downtown',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 4500,
    priceRange: {
      min: 200000,
      max: 5000000,
      currency: 'USD'
    },
    completionDate: '2030',
    amenities: [
      'Iconic Twin Towers',
      'Three Five-Star Hotels',
      'Largest Shopping Mall',
      'Premium Office Spaces',
      'Fine Dining Restaurants',
      'Central Boulevard',
      'Parks & Green Spaces',
      'Cultural Heritage Design',
      '24/7 Security',
      'Underground Parking',
      'Business Center',
      'Entertainment District'
    ],
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752734-2a0cd66c42ae?w=800&q=80&fm=webp'
    ],
    description: `Downtown Erbil is a landmark $3 billion mixed-use development spanning 541,000 square meters, strategically located between the historic Citadel of Erbil and the modern Erbil International Airport. This ambitious project will transform the city center.

The development features iconic twin towers hosting residential apartments as its defining skyline element, along with three five-star hotels, premium office spaces, and the city's largest shopping mall. A central boulevard serves as the hub connecting all elements.

Downtown Erbil is designed to create up to 45,000 jobs and will become a major economic driver while respecting the city's rich architectural heritage. This is truly a generational investment opportunity.`,
    propertyIds: []
  },
  {
    id: 'sky-towers',
    name: 'Sky Towers',
    location: {
      address: '100m Street, beside Arjaan by Rotana',
      city: 'Erbil',
      district: '100 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1224,
    priceRange: {
      min: 120000,
      max: 480000,
      currency: 'USD'
    },
    completionDate: '2024',
    amenities: [
      'Three 38-Story Towers',
      'Duplex Apartments',
      '24/7 Electricity',
      'High-Speed Internet',
      'Playground',
      'Pre-installed AC Units',
      'Underground Parking',
      'Green Areas',
      'Fitness Center',
      'Central Air Conditioning',
      'Mosque',
      'School Nearby'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp'
    ],
    description: `Sky Towers is one of the most upscale residential projects in Kurdistan and Iraq, consisting of three impressive 38-story towers located on the prestigious 100-meter street beside the Arjaan by Rotana hotel.

The project offers 1,212 luxury apartments plus 12 exclusive duplex apartments, all built according to international standards using high-quality materials. Each unit features modern finishes, pre-installed air conditioning, and access to comprehensive building amenities.

Sky Towers combines strategic location with premium living standards, making it an ideal choice for professionals and families seeking prestigious urban living in Erbil.`,
    propertyIds: []
  },
  {
    id: 'zaniary-towers',
    name: 'Zaniary Towers',
    location: {
      address: 'Zaniary District',
      city: 'Erbil',
      district: 'Zaniary',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1600,
    priceRange: {
      min: 95000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      '48-Story Main Tower',
      'Business Center',
      'Retail Spaces',
      'Underground Parking',
      '24/7 Security',
      'High-Speed Elevators',
      'Fitness Center',
      'Rooftop Amenities',
      'Modern Architecture',
      'Premium Finishes',
      'Concierge Service',
      'Landscaped Plaza'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp'
    ],
    description: `Zaniary Towers features the tallest residential building in Iraq - the E1 Tower standing at 48 stories and 180 meters tall. The development includes four towers total, with the E1 Tower as the centerpiece and three additional 25-story towers.

Completed in 2023, this mixed-use development offers over 400 residential apartments alongside commercial spaces including a business center and retail areas. The project has transformed and revitalized the historic Zaniary district in Erbil.

Zaniary Towers represents a milestone in Kurdistan's architectural landscape, offering residents a prestigious address with panoramic city views and world-class amenities.`,
    propertyIds: []
  },
  {
    id: 'american-village',
    name: 'American Village',
    location: {
      address: 'Salahadin Road',
      city: 'Erbil',
      district: 'Salahadin',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 850,
    priceRange: {
      min: 280000,
      max: 1200000,
      currency: 'USD'
    },
    completionDate: '2018',
    amenities: [
      'American East Coast Architecture',
      'International School of Choueifat',
      'Khanzad Hotel & Resort Nearby',
      'Landscaped Gardens',
      'Mountain Views',
      '24/7 Security',
      'Water Treatment Facility',
      'Garbage Collection',
      'Playground',
      'Wide Streets',
      'Community Center',
      'Sports Facilities'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp'
    ],
    description: `American Village brings authentic American suburban living to Kurdistan, located on Salahadin Road just 15 minutes northeast of Erbil City and the International Airport. The development is an almost exact replica of an American suburb with streets named Kentucky St and Tennessee St.

The project offers American, Hawlerian, and Palace-style homes ranging from 200 to 1,800 square meters, each featuring luxurious comfort and refined design. The fully independent residential community includes its own water supply and treatment, 24-hour electricity, and comprehensive security.

American Village is home to the International School of Choueifat and enjoys spectacular mountain views, making it a premier choice for families seeking Western-style living in Erbil.`,
    propertyIds: []
  },
  {
    id: 'ankawa-4-towers',
    name: 'Ankawa 4 Towers',
    location: {
      address: 'Northwest Erbil, Ankawa Area',
      city: 'Erbil',
      district: 'Ankawa',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 240,
    priceRange: {
      min: 85000,
      max: 320000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Four 15-Story Towers',
      'Smart Apartment Systems',
      '24/7 Electricity',
      'High-Speed Internet',
      'Pre-installed Kitchens',
      'Church',
      'Supermarket',
      'Cafeteria',
      'Sports Complex',
      'Gym & Swimming Pool',
      'Security Monitoring',
      'Car Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp'
    ],
    description: `Ankawa 4 Towers is a high-end residential project located in the prestigious Ankawa district, northwest of Erbil city. The development consists of four elegant towers, each rising 15 floors.

The project offers diverse apartment configurations: 1+1 units (97-120 sqm), 2+1 units (130-150 sqm), 3+1 units (200-236 sqm), and 4+1 units (247-255 sqm). All apartments feature smart home systems, pre-installed kitchens, and modern fixtures.

Residents enjoy comprehensive amenities including a sports complex, gym, swimming pools, and 24/7 security. The location provides easy access to Ankawa's renowned restaurants, churches, and entertainment venues.`,
    propertyIds: []
  },
  {
    id: 'naz-city',
    name: 'Naz City',
    location: {
      address: '40 Meter Road',
      city: 'Erbil',
      district: 'Naz City',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 700,
    priceRange: {
      min: 180000,
      max: 350000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      '14 Residential Buildings',
      'High Security Standards',
      'Professional Maintenance',
      'Green Spaces',
      'Children\'s Playground',
      '24/7 Security',
      'Covered Parking',
      'Community Center',
      'Fitness Facilities',
      'Landscaped Gardens',
      'Shopping Nearby',
      'Easy Highway Access'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp'
    ],
    description: `Naz City is a vibrant residential community featuring 14 modern buildings located on the 40-meter road in Erbil. The development includes seven 11-story towers and seven 14-story towers, with each building offering four spacious 225 square meter apartments per floor.

Totaling approximately 700 units, Naz City is renowned for its high security and maintenance standards, creating an excellent living environment for families. The community features extensive green spaces and well-maintained common areas.

Naz City offers a perfect balance of urban convenience and residential tranquility, with easy access to major roads and city amenities while maintaining a secure, family-friendly atmosphere.`,
    propertyIds: []
  },
  {
    id: 'gulan-towers',
    name: 'Gulan Park-WTC Towers',
    location: {
      address: 'Gulan Street',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 450,
    priceRange: {
      min: 150000,
      max: 850000,
      currency: 'USD'
    },
    completionDate: '2020',
    amenities: [
      'Radisson Hotel (Floors 1-9)',
      'World Trade Center Offices',
      'Gulan Mall',
      'Mixed-Use Development',
      'Premium Residences',
      '24/7 Security',
      'Concierge Service',
      'Fitness Center',
      'Business Center',
      'Fine Dining',
      'Retail Shopping',
      'Underground Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    description: `Gulan Park-WTC is Erbil's first integrated development combining residence, office, shopping, and hotel in one prestigious location. The project features the Radisson Hotel on floors 1-9, Gulan Park Residences on floors 10-22, and 22 floors of World Trade Center offices.

Residential units range from 98 to 584 square meters, offering diverse options from compact apartments to expansive penthouses. The development includes Gulan Mall at the base, providing convenient access to retail, dining, and entertainment.

This landmark project represents the pinnacle of mixed-use urban living in Kurdistan, offering residents unparalleled convenience and prestige in the heart of Erbil's business district.`,
    propertyIds: []
  },
  {
    id: 'roya-towers',
    name: 'Roya Towers',
    location: {
      address: 'Erbil City Center',
      city: 'Erbil',
      district: 'Central Erbil',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1180,
    priceRange: {
      min: 95000,
      max: 340000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Five 29-Story Towers',
      'Ground Floor Retail',
      '3-Level Parking',
      '24/7 Security',
      'Fitness Center',
      'Swimming Pool',
      'Children\'s Play Area',
      'Landscaped Gardens',
      'High-Speed Elevators',
      'Backup Power',
      'Water Storage',
      'Central Location'
    ],
    images: [
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp'
    ],
    description: `Roya Towers is an impressive residential complex consisting of five elegant 29-story towers plus 3 additional floors for parking and ground-floor retail spaces. The development offers a total of 1,180 modern apartments in central Erbil.

Each tower features high-speed elevators, backup power systems, and comprehensive security. Residents enjoy access to fitness facilities, swimming pool, and beautifully landscaped gardens within a secure gated community.

Roya Towers combines vertical living convenience with community amenities, offering excellent value in one of Erbil's most accessible locations with easy connection to all major city destinations.`,
    propertyIds: []
  },
  {
    id: 'quattro-towers',
    name: 'Quattro Towers',
    location: {
      address: 'Gulan Street, beside Turkish Consulate',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 1240,
    priceRange: {
      min: 110000,
      max: 420000,
      currency: 'USD'
    },
    completionDate: '2026',
    amenities: [
      'Four 31-Story Towers',
      '3-Level Underground Parking',
      'Premium Finishes',
      '24/7 Security',
      'Fitness Center',
      'Swimming Pool',
      'Children\'s Facilities',
      'Green Spaces',
      'Retail Podium',
      'High-Speed Elevators',
      'Smart Home Ready',
      'Close to Airport'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp'
    ],
    description: `Quattro Towers is a prestigious development located on Gulan Street beside the General Turkish Consulate, consisting of four impressive 31-story towers with 3 floors dedicated to parking. The project is just 2 km from Erbil city center and 5 minutes from the International Airport.

Each tower offers premium apartments with modern finishes and smart home capabilities. The development includes comprehensive amenities such as fitness facilities, swimming pool, and extensive green spaces for residents to enjoy.

Quattro Towers represents an excellent investment opportunity with its prime location, quality construction, and attractive pre-construction pricing. The project offers flexible payment plans for early buyers.`,
    propertyIds: []
  },
  {
    id: 'star-towers',
    name: 'Star Towers',
    location: {
      address: 'Golden Square Area',
      city: 'Erbil',
      district: 'Golden Square',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 602,
    priceRange: {
      min: 85000,
      max: 280000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Four 14-Story Towers',
      '3 Basement Parking Floors',
      'Views of Dream City',
      '24/7 Security',
      'Fitness Center',
      'Swimming Pool',
      'Green Areas',
      'Children\'s Playground',
      'Retail Spaces',
      'High-Speed Internet',
      '24/7 Electricity',
      'Close to Airport'
    ],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp'
    ],
    description: `Star Towers is a modern residential complex in Erbil's Golden Square area, featuring four 14-story towers with three basement floors for parking. Located just 5 kilometers from Erbil International Airport, the development offers 602 apartments with stunning views of the Waziran area and Dream City.

The project was completed in 2022, offering move-in ready apartments with various size options to suit different lifestyle needs. All units feature modern finishes, 24/7 electricity, and high-speed internet connectivity.

Star Towers provides excellent value for buyers seeking quality residential units in a prime location with comprehensive community amenities and easy airport access.`,
    propertyIds: []
  },
  {
    id: 'garden-city',
    name: 'Garden City',
    location: {
      address: 'King Mahmoud Ring Road, near Shar Hospital',
      city: 'Erbil',
      district: 'King Mahmoud Ring Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1850,
    priceRange: {
      min: 120000,
      max: 480000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      '18 Residential Buildings',
      '146 Villas',
      'Extensive Green Areas',
      'Underground Garages',
      'Kindergarten & School',
      'Sports Center',
      'Playground',
      'Laundry Services',
      'Market & Pharmacy',
      '24/7 Security',
      'Landscaped Gardens',
      'Community Facilities'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp'
    ],
    description: `Garden City is a comprehensive residential development located on King Mahmoud Ring Road near Shar Hospital in Erbil. The project is divided into four zones, with Zone 1 featuring 18 residential apartment buildings with extensive green areas and underground garages.

Zone 2 offers Garden City Villas with 146 Type A villas starting from 240 square meters, each consisting of three floors. The development provides a complete living environment with kindergarten, school, sports center, and essential services within the community.

Garden City lives up to its name with beautifully landscaped gardens and green spaces throughout, creating a peaceful residential environment while remaining conveniently connected to city amenities.`,
    propertyIds: []
  },
  {
    id: 'ganjan-city',
    name: 'Ganjan City',
    location: {
      address: '150 Meter Street',
      city: 'Erbil',
      district: 'Ganjan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 2400,
    priceRange: {
      min: 150000,
      max: 650000,
      currency: 'USD'
    },
    completionDate: '2020',
    amenities: [
      '1000 Acre Development',
      '30% Green Space',
      'Single & Two-Story Villas',
      'Various Home Sizes',
      'Shopping Centers',
      'Schools & Nurseries',
      'Healthcare Facilities',
      'Sports Complex',
      'Parks & Gardens',
      '24/7 Security',
      'Community Center',
      'Mosque'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp'
    ],
    description: `Ganjan City is one of the largest residential projects in the Kurdistan region, located on the 150-meter street and extending over 1,000 acres with an impressive 30% of the area dedicated to green spaces. This master-planned community offers a complete lifestyle destination.

The development features various residential options including single-floor homes and two-story villas, with sizes ranging from 250 to 1,000 square meters. The project provides comprehensive facilities including schools, healthcare, shopping, and recreational amenities.

Ganjan City represents suburban living at its finest in Kurdistan, combining spacious homes with abundant green areas and modern conveniences in a secure, well-planned community.`,
    propertyIds: []
  },
  {
    id: 'hiwa-city',
    name: 'Hiwa City',
    location: {
      address: 'Kasnazan Koya Road',
      city: 'Erbil',
      district: 'Kasnazan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 2200,
    priceRange: {
      min: 95000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2027',
    amenities: [
      'Multiple Development Zones',
      'Villas Under 400 sqm',
      'Houses Under 200 sqm',
      'Apartments 160-200 sqm',
      'Extensive Green Spaces',
      'Private Gardens',
      'Shopping Facilities',
      'Schools',
      '24/7 Security',
      'Sports Facilities',
      'Community Center',
      'Healthy Environment'
    ],
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp'
    ],
    description: `Hiwa City is a renowned residential development on Kasnazan Koya Road, providing a healthy environment with spacious green spaces throughout. The majority of the project is dedicated to landscaping, creating a serene living atmosphere.

Built in several zones (A through G), the project offers diverse housing options: villas under 400 square meters, houses under 200 square meters, and apartments ranging from 160-200 square meters, each with private green garden areas. Zone G-2 is currently under construction.

Hiwa City is famous in Erbil for its exceptional quality, comprehensive services, and thoughtful design. The development continues to expand, offering new opportunities for buyers seeking quality residential living.`,
    propertyIds: []
  },
  {
    id: 'majidi-view',
    name: 'Majidi View',
    location: {
      address: 'Koya Road, next to Hiwa City',
      city: 'Erbil',
      district: 'Koya Street',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 1500,
    priceRange: {
      min: 85000,
      max: 320000,
      currency: 'USD'
    },
    completionDate: '2027',
    amenities: [
      'Premium Construction Materials',
      'Vast Green Spaces',
      'Scenic Views',
      'Near Majidi Mall',
      'Near Majidi Land',
      'Easy Highway Access',
      'Modern Shopping Nearby',
      'Schools Nearby',
      '24/7 Security',
      'Fitness Facilities',
      'Community Spaces',
      'Landscaped Gardens'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80&fm=webp'
    ],
    description: `Majidi View is located in the heart of Erbil's most promising area on Koya Street, adjacent to Hiwa City with easy access to Highway 120m and 150m. The project is near Majidi Mall, Majidi Land, and numerous modern shopping and educational facilities.

State-of-the-art, top-quality materials are used throughout construction, ensuring durability and premium finishes in every apartment. The vast green spaces provide residents with stunning scenery and a refreshing living environment.

Majidi View represents an excellent opportunity to own property in one of Erbil's fastest-developing neighborhoods, combining quality construction with prime location and comprehensive nearby amenities.`,
    propertyIds: []
  },
  {
    id: 'kurdistan-city',
    name: 'Kurdistan City',
    location: {
      address: '150m Street, behind Ganjan City',
      city: 'Erbil',
      district: '150 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 772,
    priceRange: {
      min: 110000,
      max: 280000,
      currency: 'USD'
    },
    completionDate: '2014',
    amenities: [
      '13 Residential Buildings',
      '408 Houses',
      '364 Apartments',
      'School & Kindergarten',
      'Hospital',
      'Football Field',
      'Police Station',
      'Parks',
      '24/7 Electricity',
      '24/7 Security',
      'Community Facilities',
      'Family-Friendly Environment'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp'
    ],
    description: `Kurdistan City is an established family residential community completed in 2014, located on 150m Street behind Ganjan City. The project consists of 13 buildings with 7 floors each, offering 4 apartments per floor, totaling 408 houses and 364 apartments.

The community provides comprehensive facilities including school, kindergarten, hospital, football field, and parks, creating a self-contained neighborhood. All residences enjoy 24/7 electricity and round-the-clock security.

Kurdistan City offers proven quality and an established community atmosphere, making it ideal for families seeking a secure, well-maintained neighborhood with all essential services within walking distance.`,
    propertyIds: []
  },
  {
    id: 'signature-towers',
    name: 'Signature Towers',
    location: {
      address: 'Central Erbil',
      city: 'Erbil',
      district: 'Central',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 680,
    priceRange: {
      min: 125000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      '20 Residential Floors per Tower',
      '2 Commercial Floors',
      '2 Underground Parking Floors',
      'High Aesthetic Design',
      'Functional Organization',
      '24/7 Security',
      'Fitness Center',
      'Swimming Pool',
      'Business Center',
      'Retail Spaces',
      'Concierge Service',
      'Landscaped Areas'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    description: `Signature Towers is a prestigious residential development featuring multiple towers, each with 20 residential floors, 2 commercial floors, and 2 underground parking levels. The project contains a total of 680 luxury apartments designed with high aesthetic quality and functional organization.

Each apartment features premium finishes, modern layouts, and attention to detail that justifies the "Signature" name. Residents enjoy comprehensive amenities including fitness center, swimming pool, and business facilities within a secure environment.

Signature Towers represents sophisticated urban living in central Erbil, offering a prestigious address with convenient access to the city's business, shopping, and entertainment districts.`,
    propertyIds: []
  },
  {
    id: 'rotana-hotel-residences',
    name: 'Rotana Hotel & Residences',
    location: {
      address: '100 Meter Road',
      city: 'Erbil',
      district: '100 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 280,
    priceRange: {
      min: 180000,
      max: 650000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      'Five-Star Hotel Services',
      'Branded Residences',
      'Infinity Pool',
      'Spa & Wellness Center',
      'Fine Dining Restaurants',
      'Business Center',
      '24/7 Concierge',
      'Valet Parking',
      'Fitness Center',
      'Room Service',
      'Housekeeping',
      'Private Lounge'
    ],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607688960-e095ff83135c?w=800&q=80&fm=webp'
    ],
    description: `Rotana Hotel & Residences brings international hospitality standards to Erbil with its branded residential tower on the prestigious 100 Meter Road. Residents enjoy all the luxury amenities of a five-star hotel combined with the privacy of home ownership.

The development features elegantly appointed apartments with premium finishes, panoramic city views, and access to world-class facilities including spa, infinity pool, and fine dining. Hotel-style services such as concierge, housekeeping, and room service are available to residents.

This is ideal for investors seeking hassle-free luxury living with the option of hotel rental programs for attractive returns.`,
    propertyIds: []
  },
  {
    id: 'divan-erbil',
    name: 'Divan Erbil',
    location: {
      address: 'Gulan Street',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 220,
    priceRange: {
      min: 200000,
      max: 580000,
      currency: 'USD'
    },
    completionDate: '2019',
    amenities: [
      'Turkish Hospitality Brand',
      'Luxury Apartments',
      'Rooftop Restaurant',
      'Spa & Hammam',
      'Indoor Pool',
      'Business Center',
      '24/7 Security',
      'Concierge Service',
      'Underground Parking',
      'Fitness Center',
      'Meeting Rooms',
      'Ballroom'
    ],
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&fm=webp'
    ],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80&fm=webp',
    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80&fm=webp'
    ],
    floorPlanImages: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607688960-e095ff83135c?w=800&q=80&fm=webp'
    ],
    description: `Divan Erbil represents Turkish hospitality excellence with luxury serviced residences in the heart of Gulan. The development combines the renowned Divan brand's service standards with premium residential living.

Each residence features sophisticated interiors, modern amenities, and access to hotel facilities including rooftop dining, traditional hammam, and indoor pool. The location offers easy access to Erbil's business district and entertainment venues.

Divan Erbil is perfect for discerning buyers who appreciate refined living with the convenience of hotel services and the security of a prestigious international brand.`,
    propertyIds: []
  },
  {
    id: 'marriott-erbil-residences',
    name: 'Marriott Erbil Residences',
    location: {
      address: 'Gulan Street, near Empire World',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 350,
    priceRange: {
      min: 250000,
      max: 850000,
      currency: 'USD'
    },
    completionDate: '2027',
    amenities: [
      'Marriott International Brand',
      'Luxury Residences',
      'Executive Lounge',
      'Infinity Pool',
      'World-Class Spa',
      'Multiple Restaurants',
      'Business Center',
      '24/7 Security',
      'Valet Parking',
      'Concierge Service',
      'Kids Club',
      'Rooftop Bar'
    ],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fm=webp'
    ],
    description: `Marriott Erbil Residences brings the world's most recognized hospitality brand to Kurdistan with luxury branded residences. This landmark development near Empire World will offer premium apartments with Marriott's signature service excellence.

Pre-construction units are available with attractive payment plans. Residents will enjoy access to infinity pool, spa, multiple dining venues, and executive lounge facilities. The Marriott brand ensures international management standards and potential rental returns.

This is a rare opportunity to own a Marriott-branded residence in Erbil's most prestigious development corridor with strong appreciation potential.`,
    propertyIds: []
  },
  {
    id: 'kempinski-erbil',
    name: 'Kempinski Erbil',
    location: {
      address: 'Ankawa',
      city: 'Erbil',
      district: 'Ankawa',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 180,
    priceRange: {
      min: 280000,
      max: 920000,
      currency: 'USD'
    },
    completionDate: '2020',
    amenities: [
      'European Luxury Brand',
      'Serviced Residences',
      'Michelin-Style Dining',
      'Luxury Spa',
      'Heated Pool',
      'Private Gardens',
      'Butler Service',
      '24/7 Concierge',
      'Limousine Service',
      'Business Center',
      'Wine Cellar',
      'Private Cinema'
    ],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80&fm=webp'
    ],
    description: `Kempinski Erbil represents the pinnacle of European luxury hospitality in Kurdistan. This exclusive development offers serviced residences with the legendary Kempinski standard of excellence that has defined luxury for over a century.

Residences feature bespoke interiors, premium materials, and access to exceptional amenities including fine dining, luxury spa, and butler service. The Ankawa location provides a sophisticated neighborhood with vibrant dining and nightlife options.

Kempinski Erbil is reserved for those who accept nothing but the finest, offering an unparalleled living experience with guaranteed service excellence.`,
    propertyIds: []
  },
  {
    id: 'royal-city',
    name: 'Royal City',
    location: {
      address: 'Pirmam Road',
      city: 'Erbil',
      district: 'Pirmam',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1200,
    priceRange: {
      min: 150000,
      max: 520000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Gated Community',
      'Luxury Villas',
      'Central Park',
      'Swimming Pool',
      'Sports Complex',
      'International School',
      'Medical Center',
      '24/7 Security',
      'Shopping Center',
      'Mosque',
      'Community Club',
      'Landscaped Gardens'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp'
    ],
    description: `Royal City is an upscale residential community on Pirmam Road offering luxury villas and apartments in a secure, master-planned environment. The development combines royal elegance with modern conveniences.

The community features diverse housing options from elegant apartments to spacious villas, all set within beautifully landscaped grounds with a central park as the focal point. Residents enjoy comprehensive amenities including international school, medical center, and sports facilities.

Royal City provides an exceptional family living environment with privacy, security, and community spirit in one of Erbil's most desirable suburban locations.`,
    propertyIds: []
  },
  {
    id: 'sarbast-heights',
    name: 'Sarbast Heights',
    location: {
      address: '60 Meter Road',
      city: 'Erbil',
      district: '60 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 480,
    priceRange: {
      min: 95000,
      max: 320000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Twin Tower Design',
      'City Views',
      'Rooftop Garden',
      'Fitness Center',
      'Swimming Pool',
      '24/7 Security',
      'Underground Parking',
      'High-Speed Elevators',
      'Children\'s Play Area',
      'Retail Podium',
      'Business Center',
      'Landscaped Plaza'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    description: `Sarbast Heights rises elegantly on the 60 Meter Road with twin residential towers offering modern apartments with stunning city views. The development combines contemporary architecture with practical living solutions.

Each apartment is designed for comfortable family living with spacious layouts, quality finishes, and access to comprehensive building amenities. The rooftop garden provides a peaceful retreat above the city bustle.

Sarbast Heights offers excellent value in a prime location, making it ideal for families and investors seeking quality residential units with strong rental potential.`,
    propertyIds: []
  },
  {
    id: 'newroz-city',
    name: 'Newroz City',
    location: {
      address: 'Kirkuk Road',
      city: 'Erbil',
      district: 'Kirkuk Road',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 2800,
    priceRange: {
      min: 80000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2028',
    amenities: [
      'Master-Planned Community',
      'Villas & Apartments',
      'Central Park',
      'Shopping Mall',
      'International Schools',
      'Healthcare Center',
      'Sports Complex',
      'Mosque',
      '24/7 Security',
      'Green Spaces',
      'Community Center',
      'Pedestrian Walkways'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp'
    ],
    description: `Newroz City is a major new residential development on Kirkuk Road bringing modern urban planning to Erbil. Named after the Kurdish New Year celebration, this community embodies new beginnings and fresh opportunities.

The master plan includes diverse housing from affordable apartments to luxury villas, ensuring options for various budgets. The development prioritizes green spaces, pedestrian-friendly design, and comprehensive community facilities.

Early buyers benefit from attractive pre-construction pricing and flexible payment plans. Newroz City represents an excellent entry point into Erbil's growing real estate market.`,
    propertyIds: []
  },
  {
    id: 'classy-tower',
    name: 'Classy Tower',
    location: {
      address: 'Gulan Street',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 320,
    priceRange: {
      min: 120000,
      max: 420000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Premium High-Rise',
      'Panoramic Views',
      'Rooftop Lounge',
      'Infinity Pool',
      'Fitness Center',
      '24/7 Security',
      'Concierge Service',
      'Underground Parking',
      'Smart Home Systems',
      'High-Speed Elevators',
      'Landscaped Terraces',
      'Retail Spaces'
    ],
    images: [
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    description: `Classy Tower lives up to its name with sophisticated residential apartments in the heart of Gulan. This premium high-rise offers elegant living spaces with panoramic views of Erbil's evolving skyline.

Each apartment features contemporary design, smart home systems, and premium finishes. The rooftop lounge and infinity pool provide exclusive spaces for residents to relax and entertain.

Classy Tower is perfectly positioned for urban professionals seeking a stylish address with convenient access to Erbil's business and entertainment districts.`,
    propertyIds: []
  },
  {
    id: 'royal-towers',
    name: 'Royal Towers',
    location: {
      address: 'Ankawa',
      city: 'Erbil',
      district: 'Ankawa',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 560,
    priceRange: {
      min: 110000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      'Three Tower Complex',
      'Royal Architecture',
      'Grand Lobby',
      'Swimming Pool',
      'Fitness Center',
      '24/7 Security',
      'Covered Parking',
      'Children\'s Play Area',
      'Landscaped Gardens',
      'Retail Arcade',
      'Business Center',
      'Guest Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp'
    ],
    description: `Royal Towers commands attention in Ankawa with its three elegant residential towers featuring distinctive royal-inspired architecture. The development offers refined living in one of Erbil's most cosmopolitan neighborhoods.

Apartments range from practical studios to spacious family units, all featuring quality finishes and functional layouts. The grand lobby sets the tone for an elevated living experience with attentive management and maintained common areas.

Royal Towers provides excellent value in Ankawa, close to restaurants, entertainment, and international schools, making it popular with families and expatriates.`,
    propertyIds: []
  },
  {
    id: 'amna-suraka-development',
    name: 'Amna Suraka Area Development',
    location: {
      address: 'Near Red Security Building',
      city: 'Erbil',
      district: 'Amna Suraka',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 650,
    priceRange: {
      min: 95000,
      max: 350000,
      currency: 'USD'
    },
    completionDate: '2027',
    amenities: [
      'Historic District Location',
      'Cultural Heritage Area',
      'Modern Apartments',
      'Landscaped Gardens',
      'Memorial Park Views',
      '24/7 Security',
      'Underground Parking',
      'Fitness Center',
      'Community Spaces',
      'Retail Podium',
      'Museum Access',
      'Cultural Center'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp'
    ],
    description: `The Amna Suraka Area Development transforms the historic district near the Red Security Building museum into a modern residential neighborhood while respecting its cultural significance. This thoughtful development honors history while creating contemporary homes.

Apartments offer views of the memorial park and surrounding gardens, with designs that complement the area's heritage character. Residents benefit from proximity to cultural institutions and the central city location.

This unique development appeals to those who appreciate history and culture, offering a meaningful address with modern comforts in a revitalized historic district.`,
    propertyIds: []
  },
  {
    id: 'family-village',
    name: 'Family Village',
    location: {
      address: 'Pirmam Road',
      city: 'Erbil',
      district: 'Pirmam',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 850,
    priceRange: {
      min: 120000,
      max: 420000,
      currency: 'USD'
    },
    completionDate: '2020',
    amenities: [
      'Family-Focused Community',
      'Villas & Townhouses',
      'Children\'s School',
      'Playground Areas',
      'Family Park',
      'Swimming Pool',
      'Sports Courts',
      '24/7 Security',
      'Medical Clinic',
      'Supermarket',
      'Mosque',
      'Community Events'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp'
    ],
    description: `Family Village is designed specifically for families seeking a safe, nurturing environment to raise children. This thoughtfully planned community on Pirmam Road prioritizes family needs in every aspect of its design.

The development features spacious villas and townhouses with private gardens, surrounded by extensive parks, playgrounds, and sports facilities. On-site school, medical clinic, and shopping provide daily convenience.

Family Village has earned its reputation as one of Erbil's premier family communities, with regular community events fostering strong neighborly bonds and a true sense of belonging.`,
    propertyIds: []
  },
  {
    id: 'sami-abdulrahman-park-residences',
    name: 'Sami Abdulrahman Park Residences',
    location: {
      address: 'Adjacent to Sami Abdulrahman Park',
      city: 'Erbil',
      district: 'Central Erbil',
      country: 'Iraq'
    },
    status: 'Coming Soon',
    totalUnits: 420,
    priceRange: {
      min: 200000,
      max: 680000,
      currency: 'USD'
    },
    completionDate: '2029',
    amenities: [
      'Park Views',
      'Luxury Apartments',
      'Direct Park Access',
      'Rooftop Gardens',
      'Wellness Center',
      'Infinity Pool',
      '24/7 Security',
      'Concierge Service',
      'Underground Parking',
      'Smart Home Technology',
      'Premium Finishes',
      'Private Terraces'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp'
    ],
    description: `Sami Abdulrahman Park Residences will offer an unparalleled living experience adjacent to Erbil's beloved central park. This premium development maximizes its exceptional location with park-facing apartments and direct access to green spaces.

Every residence will feature views of the park's lakes, gardens, and promenades, with private terraces to enjoy the scenery. The development incorporates biophilic design principles connecting indoor and outdoor living.

This rare opportunity to live beside Erbil's premier public park makes these residences highly desirable for nature lovers and those seeking tranquil urban living.`,
    propertyIds: []
  },
  {
    id: 'naz-towers',
    name: 'Naz Towers',
    location: {
      address: '40 Meter Road',
      city: 'Erbil',
      district: '40 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 380,
    priceRange: {
      min: 100000,
      max: 340000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Modern Twin Towers',
      'Elegant Design',
      'Swimming Pool',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'High-Speed Elevators',
      'Landscaped Plaza',
      'Children\'s Area',
      'Retail Spaces',
      'Backup Generator',
      'Water Storage'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp'
    ],
    description: `Naz Towers brings elegant modern living to the 40 Meter Road with its distinctive twin tower design. The development offers well-appointed apartments combining style, comfort, and practical amenities.

Each tower features high-speed elevators, backup power, and water storage ensuring uninterrupted comfortable living. The landscaped plaza between the towers provides a peaceful community gathering space.

Naz Towers appeals to buyers seeking a prestigious address with reliable infrastructure and modern amenities at competitive prices in a convenient central location.`,
    propertyIds: []
  },
  {
    id: 'park-view',
    name: 'Park View',
    location: {
      address: 'Near Shanidar Park',
      city: 'Erbil',
      district: 'Shanidar',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 290,
    priceRange: {
      min: 130000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Park Facing Location',
      'Scenic Views',
      'Modern Architecture',
      'Swimming Pool',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'Rooftop Terrace',
      'Children\'s Play Area',
      'Jogging Track',
      'BBQ Area',
      'Green Spaces'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp'
    ],
    description: `Park View lives up to its name with apartments overlooking Shanidar Park, one of Erbil's popular green spaces. The development capitalizes on its prime location to offer residents daily connection with nature.

Apartments feature large windows and private balconies designed to maximize park views. The building's own jogging track and green spaces extend the outdoor living experience within the secure compound.

Park View is perfect for health-conscious residents and families who value outdoor recreation and scenic living environments in the city.`,
    propertyIds: []
  },
  {
    id: 'ster-tower',
    name: 'Ster Tower',
    location: {
      address: '100 Meter Road',
      city: 'Erbil',
      district: '100 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 240,
    priceRange: {
      min: 140000,
      max: 480000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      'Premium High-Rise',
      'Star-Shaped Design',
      'Panoramic Views',
      'Sky Lounge',
      'Swimming Pool',
      'Spa Center',
      '24/7 Security',
      'Valet Parking',
      'Concierge Service',
      'Fitness Center',
      'Business Center',
      'Landscaped Gardens'
    ],
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp'
    ],
    description: `Ster Tower is an architectural landmark on the 100 Meter Road with its distinctive star-shaped design that maximizes natural light and views from every apartment. This premium development offers luxury living with unique character.

The sky lounge provides exclusive gathering space for residents to enjoy panoramic city views. Comprehensive amenities include spa, pool, and concierge services delivering a hotel-like living experience.

Ster Tower attracts discerning buyers who appreciate distinctive architecture and premium amenities in one of Erbil's most prestigious locations.`,
    propertyIds: []
  },
  {
    id: 'cihan-tower',
    name: 'Cihan Tower',
    location: {
      address: 'Gulan',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 310,
    priceRange: {
      min: 115000,
      max: 390000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Modern High-Rise',
      'City Views',
      'Swimming Pool',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'High-Speed Elevators',
      'Rooftop Garden',
      'Children\'s Play Area',
      'Retail Podium',
      'Business Lounge',
      'Community Room'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp'
    ],
    description: `Cihan Tower rises prominently in Gulan offering modern apartments with commanding city views. The development combines sleek contemporary design with practical living solutions for urban residents.

Each apartment features efficient layouts, quality finishes, and access to comprehensive building amenities. The rooftop garden provides a tranquil escape from city life while the retail podium offers daily conveniences.

Cihan Tower is ideal for professionals and families seeking a well-located, well-managed residential tower with reliable services and modern amenities.`,
    propertyIds: []
  },
  {
    id: 'asia-city',
    name: 'Asia City',
    location: {
      address: 'Airport Road',
      city: 'Erbil',
      district: 'Airport Road',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 1800,
    priceRange: {
      min: 75000,
      max: 320000,
      currency: 'USD'
    },
    completionDate: '2027',
    amenities: [
      'Large-Scale Development',
      'Apartments & Villas',
      'Shopping Center',
      'International School',
      'Medical Clinic',
      'Sports Facilities',
      'Central Park',
      '24/7 Security',
      'Mosque',
      'Community Center',
      'Underground Parking',
      'Bus Service'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp'
    ],
    description: `Asia City is a comprehensive residential development on Airport Road bringing affordable housing options to Erbil's growing population. This large-scale project will create a self-contained community with all essential services.

The development offers diverse housing types from starter apartments to family villas, with transparent pricing and flexible payment plans. Community amenities include school, medical facilities, shopping, and recreation.

Asia City represents accessible home ownership in Erbil with pre-construction pricing that makes real estate investment achievable for first-time buyers.`,
    propertyIds: []
  },
  {
    id: 'hawler-city',
    name: 'Hawler City',
    location: {
      address: '120 Meter Road',
      city: 'Erbil',
      district: '120 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1450,
    priceRange: {
      min: 90000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      'Named After Erbil',
      'Mixed Housing Types',
      'Central Boulevard',
      'Shopping Mall',
      'Educational Facilities',
      'Healthcare Center',
      'Parks & Gardens',
      '24/7 Security',
      'Sports Complex',
      'Mosque',
      'Community Hall',
      'Ample Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp'
    ],
    description: `Hawler City proudly carries Erbil's historical name (Hawler in Kurdish) and represents the spirit of the ancient city in a modern residential development. Located on the 120 Meter Road, this established community offers diverse housing options.

The central boulevard serves as the community's spine, connecting residential areas with shopping, education, and healthcare facilities. The thoughtful urban planning creates distinct neighborhoods while maintaining community cohesion.

Hawler City has matured into a vibrant neighborhood with an active community life, making it ideal for families seeking an established address with proven quality and services.`,
    propertyIds: []
  },
  {
    id: 'venus-tower',
    name: 'Venus Tower',
    location: {
      address: '60 Meter Road',
      city: 'Erbil',
      district: '60 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 260,
    priceRange: {
      min: 105000,
      max: 360000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Elegant High-Rise',
      'Classic Design',
      'Swimming Pool',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'Lobby Lounge',
      'High-Speed Elevators',
      'Children\'s Area',
      'Landscaped Gardens',
      'Retail Shops',
      'Management Office'
    ],
    images: [
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp'
    ],
    description: `Venus Tower brings elegance to the 60 Meter Road with its classic architectural design and refined residential offerings. The development balances aesthetic appeal with practical living requirements.

Apartments feature timeless interiors that transcend fleeting trends, with quality materials ensuring lasting value. The lobby lounge creates an impressive arrival experience befitting the Venus name.

Venus Tower attracts buyers who appreciate understated elegance and solid construction in a well-connected location with professional building management.`,
    propertyIds: []
  },
  {
    id: 'crystal-tower',
    name: 'Crystal Tower',
    location: {
      address: 'Gulan Street',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 340,
    priceRange: {
      min: 125000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Glass Facade Design',
      'Stunning City Views',
      'Crystal-Clear Windows',
      'Rooftop Pool',
      'Spa & Wellness',
      'Fitness Center',
      '24/7 Security',
      'Concierge Service',
      'Underground Parking',
      'Smart Building Systems',
      'Premium Finishes',
      'Event Space'
    ],
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    description: `Crystal Tower sparkles on Gulan Street with its striking glass facade that reflects Erbil's changing skies. The building's transparency creates light-filled interiors and unobstructed views from every apartment.

The rooftop pool and spa provide luxurious relaxation spaces while the smart building systems ensure efficient, modern living. Premium finishes throughout reflect the crystalline quality of the tower's design concept.

Crystal Tower is perfect for design-conscious buyers seeking a contemporary living environment with impressive aesthetics and top-tier amenities in central Erbil.`,
    propertyIds: []
  },
  {
    id: 'new-eskan',
    name: 'New Eskan',
    location: {
      address: 'New Eskan Complex',
      city: 'Erbil',
      district: 'Eskan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1200,
    priceRange: {
      min: 85000,
      max: 320000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Gated Community',
      'Modern Apartments',
      'Swimming Pool',
      'Fitness Center',
      '24/7 Security',
      'Covered Parking',
      'Children\'s Play Area',
      'Landscaped Gardens',
      'Shopping Center',
      'Mosque',
      'Medical Clinic',
      'Sports Facilities'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp'
    ],
    description: `New Eskan is a modern residential development offering quality apartments in the established Eskan district of Erbil. The project combines contemporary design with practical living solutions for families and professionals.

The development features well-designed apartments with efficient layouts and access to comprehensive community amenities. Residents enjoy a swimming pool, fitness center, and beautifully landscaped gardens within a secure gated environment.

New Eskan represents excellent value in a mature neighborhood with established infrastructure, schools, and shopping conveniences nearby.`,
    propertyIds: []
  },
  {
    id: 'cihan-city',
    name: 'Cihan City',
    location: {
      address: 'Cihan City Complex',
      city: 'Erbil',
      district: 'Bnaslawa',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 2800,
    priceRange: {
      min: 95000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Master-Planned Community',
      'Villas & Apartments',
      'International School',
      'Healthcare Center',
      'Shopping Mall',
      'Sports Complex',
      'Central Park',
      '24/7 Security',
      'Mosque',
      'Landscaped Gardens',
      'Underground Parking',
      'Community Center'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp'
    ],
    description: `Cihan City is a comprehensive master-planned community offering diverse housing options from apartments to luxury villas. Located in the Bnaslawa area, this development creates a self-contained neighborhood with all essential services.

The project features international standard construction with modern amenities including schools, healthcare facilities, and shopping centers. Extensive green spaces and parks provide a healthy living environment for families.

Cihan City represents the vision of modern suburban living in Kurdistan, combining quality construction with thoughtful urban planning and comprehensive community facilities.`,
    propertyIds: []
  },
  {
    id: 'mrf-towers',
    name: 'MRF Towers',
    location: {
      address: 'MRF Towers Complex',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 650,
    priceRange: {
      min: 120000,
      max: 420000,
      currency: 'USD'
    },
    completionDate: '2026',
    amenities: [
      'Twin Tower Design',
      'Modern Architecture',
      'Rooftop Pool',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'High-Speed Elevators',
      'Smart Home Systems',
      'Concierge Service',
      'Business Center',
      'Children\'s Play Area',
      'Landscaped Plaza'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    description: `MRF Towers is an upcoming premium residential development in the heart of Gulan featuring twin towers with modern architecture and comprehensive amenities. The project offers attractive pre-construction pricing for early buyers.

Each apartment will feature contemporary design, smart home technology, and premium finishes. The rooftop pool and fitness center provide luxury lifestyle amenities while the business center caters to professionals working from home.

MRF Towers represents an excellent investment opportunity in Erbil's most desirable district with flexible payment plans available.`,
    propertyIds: []
  },
  {
    id: 'the-atlantic',
    name: 'The Atlantic',
    location: {
      address: 'The Atlantic Complex',
      city: 'Erbil',
      district: 'Ankawa',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 420,
    priceRange: {
      min: 145000,
      max: 520000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Ocean-Inspired Design',
      'Luxury Apartments',
      'Infinity Pool',
      'Spa & Wellness Center',
      'Fitness Center',
      '24/7 Security',
      'Valet Parking',
      'Concierge Service',
      'Rooftop Lounge',
      'Business Center',
      'Children\'s Club',
      'Fine Dining Restaurant'
    ],
    images: [
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp'
    ],
    description: `The Atlantic brings oceanic elegance to Erbil's Ankawa district with its distinctive wave-inspired architecture and luxury amenities. This prestigious development offers premium apartments with sophisticated design throughout.

Residents enjoy access to an infinity pool, full-service spa, and rooftop lounge with panoramic views. The ocean theme carries through to the interior design with flowing spaces and natural light.

The Atlantic appeals to discerning buyers seeking a unique residential experience with international-standard amenities in the heart of Ankawa.`,
    propertyIds: []
  },
  {
    id: 'nawroz-city',
    name: 'Nawroz City',
    location: {
      address: 'Nawroz City Complex',
      city: 'Erbil',
      district: 'Kirkuk Road',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 3200,
    priceRange: {
      min: 75000,
      max: 350000,
      currency: 'USD'
    },
    completionDate: '2027',
    amenities: [
      'Large-Scale Development',
      'Mixed Housing Types',
      'International Schools',
      'Medical Center',
      'Shopping Mall',
      'Sports Facilities',
      'Central Park',
      '24/7 Security',
      'Mosque',
      'Green Spaces',
      'Community Center',
      'Bus Services'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp'
    ],
    description: `Nawroz City is a major residential development celebrating the Kurdish New Year spirit with fresh opportunities for homeownership. This large-scale project on Kirkuk Road will create a complete community with diverse housing options.

The master plan includes apartments, townhouses, and villas to suit various budgets and family sizes. Comprehensive facilities including schools, healthcare, and shopping will serve the community's daily needs.

Nawroz City offers accessible home ownership with attractive pre-construction pricing and flexible payment plans for first-time buyers and investors.`,
    propertyIds: []
  },
  {
    id: 'msy-nefes',
    name: 'MSY Nefes',
    location: {
      address: 'MSY Nefes Complex',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 380,
    priceRange: {
      min: 110000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Turkish-Style Design',
      'Modern Apartments',
      'Swimming Pool',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'Rooftop Garden',
      'High-Speed Elevators',
      'Children\'s Area',
      'Retail Spaces',
      'Cafe & Restaurant',
      'Landscaped Gardens'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp'
    ],
    description: `MSY Nefes brings Turkish residential design excellence to Erbil's Gulan district. The name "Nefes" meaning "breath" in Turkish reflects the project's focus on spacious, airy living environments.

Each apartment features open floor plans, large windows, and quality finishes that maximize natural light and ventilation. The rooftop garden provides a peaceful retreat while ground-floor retail adds daily convenience.

MSY Nefes is ideal for buyers who appreciate thoughtful design and quality construction in a prime location.`,
    propertyIds: []
  },
  {
    id: 'aram-village',
    name: 'Aram Village',
    location: {
      address: 'Aram Village',
      city: 'Erbil',
      district: 'Shaqlawa Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 950,
    priceRange: {
      min: 180000,
      max: 520000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      'Village-Style Community',
      'Luxury Villas',
      'Mountain Views',
      'Central Garden',
      'Swimming Pool',
      '24/7 Security',
      'Private Parking',
      'Sports Facilities',
      'Children\'s Playground',
      'Community Center',
      'Mosque',
      'Shopping Nearby'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp'
    ],
    description: `Aram Village offers peaceful suburban living on the scenic Shaqlawa Road with stunning mountain views. This established community features spacious villas in a village-style setting that prioritizes privacy and natural beauty.

Each villa comes with private parking and access to shared amenities including swimming pool and sports facilities. The central garden serves as a gathering space for the close-knit community.

Aram Village is perfect for families seeking tranquil living away from the city center while remaining connected to Erbil's urban amenities.`,
    propertyIds: []
  },
  {
    id: 'qaiwan-mirador',
    name: 'Qaiwan Mirador',
    location: {
      address: 'Qaiwan Mirador Tower',
      city: 'Erbil',
      district: 'Central Erbil',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 280,
    priceRange: {
      min: 150000,
      max: 550000,
      currency: 'USD'
    },
    completionDate: '2026',
    amenities: [
      'Panoramic City Views',
      'Luxury High-Rise',
      'Sky Lounge',
      'Infinity Pool',
      'Spa & Wellness',
      '24/7 Security',
      'Valet Parking',
      'Concierge Service',
      'Smart Home Technology',
      'Business Center',
      'Private Cinema',
      'Landscaped Terraces'
    ],
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    description: `Qaiwan Mirador, meaning "viewpoint" in Spanish, will offer unparalleled panoramic views of Erbil from its premium high-rise apartments. This upcoming luxury development focuses on elevated living experiences.

The sky lounge and infinity pool provide exclusive spaces for residents to enjoy breathtaking city views. Every apartment features smart home technology and premium finishes befitting the prestigious address.

Early investors benefit from attractive pre-construction pricing for this landmark project in central Erbil.`,
    propertyIds: []
  },
  {
    id: 'erbil-one-tower',
    name: 'Erbil One Tower',
    location: {
      address: 'Erbil One Tower',
      city: 'Erbil',
      district: '100 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 320,
    priceRange: {
      min: 135000,
      max: 480000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Iconic Single Tower',
      'Premium Finishes',
      'Rooftop Pool',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'High-Speed Elevators',
      'Concierge Service',
      'Business Center',
      'Sky Garden',
      'Children\'s Area',
      'Retail Podium'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp'
    ],
    description: `Erbil One Tower stands as a singular statement of luxury on the prestigious 100 Meter Road. This iconic tower offers premium apartments with city views and comprehensive lifestyle amenities.

The rooftop pool and sky garden provide exclusive relaxation spaces for residents, while the ground-floor retail podium offers daily conveniences. Premium finishes and attentive concierge service define the living experience.

Erbil One Tower appeals to buyers seeking a prestigious single-tower address with personalized service and prime location.`,
    propertyIds: []
  },
  {
    id: 'life-tower',
    name: 'Life Tower',
    location: {
      address: 'Life Tower',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 290,
    priceRange: {
      min: 105000,
      max: 360000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Wellness-Focused Living',
      'Modern Apartments',
      'Fitness Center',
      'Yoga Studio',
      'Swimming Pool',
      '24/7 Security',
      'Covered Parking',
      'Rooftop Garden',
      'Juice Bar',
      'Cycling Storage',
      'Children\'s Play Area',
      'Green Spaces'
    ],
    images: [
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp'
    ],
    description: `Life Tower is designed for health-conscious residents who prioritize wellness in their daily lives. This Gulan development integrates fitness facilities and healthy living concepts throughout.

Beyond the standard gym, residents enjoy a dedicated yoga studio, juice bar, and cycling storage encouraging active lifestyles. The rooftop garden provides fresh air and green space above the city.

Life Tower attracts buyers who value health and wellness as core aspects of their home environment.`,
    propertyIds: []
  },
  {
    id: 'miran-city',
    name: 'Miran City',
    location: {
      address: 'Miran City Complex',
      city: 'Erbil',
      district: 'Pirmam',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1800,
    priceRange: {
      min: 100000,
      max: 420000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      'Residential Community',
      'Apartments & Villas',
      'Shopping Center',
      'Schools',
      'Medical Clinic',
      'Sports Complex',
      'Parks & Gardens',
      '24/7 Security',
      'Mosque',
      'Community Hall',
      'Covered Parking',
      'Playground'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp'
    ],
    description: `Miran City is an established residential community in the Pirmam district offering diverse housing from apartments to spacious villas. The development provides a complete lifestyle with all essential services on-site.

The community features shopping, schools, and healthcare within walking distance for most residents. Parks and gardens throughout create a pleasant living environment for families.

Miran City has matured into a vibrant neighborhood with strong community bonds, ideal for families seeking an established address with proven infrastructure.`,
    propertyIds: []
  },
  {
    id: 'four-towers',
    name: 'Four Towers',
    location: {
      address: 'Four Towers Complex',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 520,
    priceRange: {
      min: 115000,
      max: 400000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Four Tower Development',
      'Central Courtyard',
      'Swimming Pool',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'High-Speed Elevators',
      'Landscaped Gardens',
      'Children\'s Play Area',
      'Retail Arcade',
      'Business Center',
      'Rooftop Terraces'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp'
    ],
    description: `Four Towers is a harmonious residential complex featuring four elegant towers arranged around a central landscaped courtyard in Gulan. The symmetrical design creates a sense of community while maintaining privacy.

Each tower offers modern apartments with quality finishes and shared access to comprehensive amenities. The central courtyard features swimming pool, gardens, and children's play areas creating a village feel within the development.

Four Towers appeals to buyers seeking community-oriented living in a modern tower environment.`,
    propertyIds: []
  },
  {
    id: 'zanko-village',
    name: 'Zanko Village',
    location: {
      address: 'Zanko Village',
      city: 'Erbil',
      district: 'Salahaddin',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 680,
    priceRange: {
      min: 200000,
      max: 650000,
      currency: 'USD'
    },
    completionDate: '2020',
    amenities: [
      'Premium Village Living',
      'Luxury Villas',
      'Mountain Views',
      'Country Club',
      'Swimming Pool',
      'Tennis Courts',
      '24/7 Security',
      'Private Gardens',
      'Golf Course Nearby',
      'Spa & Wellness',
      'Fine Dining',
      'Children\'s Academy'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp'
    ],
    description: `Zanko Village offers premium residential living in the scenic Salahaddin area with stunning mountain views. This exclusive community features luxury villas with private gardens in a secure, gated environment.

The country club lifestyle includes swimming pool, tennis courts, and proximity to golf facilities. Spa and fine dining options provide resort-style amenities for residents.

Zanko Village is reserved for those seeking prestigious suburban living with exclusive amenities and natural beauty.`,
    propertyIds: []
  },
  {
    id: 'diplomati-safiran',
    name: 'Diplomati Safiran',
    location: {
      address: 'Diplomati Safiran Complex',
      city: 'Erbil',
      district: 'Diplomatic Quarter',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 280,
    priceRange: {
      min: 180000,
      max: 600000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      'Diplomatic Area Location',
      'Premium Security',
      'Luxury Apartments',
      'Swimming Pool',
      'Fitness Center',
      '24/7 Armed Security',
      'Covered Parking',
      'Concierge Service',
      'Business Center',
      'Meeting Rooms',
      'Rooftop Lounge',
      'Landscaped Gardens'
    ],
    images: [
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp'
    ],
    description: `Diplomati Safiran is strategically located in Erbil's Diplomatic Quarter, offering premium residences with enhanced security for diplomats, executives, and high-profile residents.

The development features luxury apartments with top-tier security including armed guards, CCTV monitoring, and secure access control. Business amenities serve professionals working in the diplomatic community.

Diplomati Safiran provides peace of mind with its secure location and comprehensive facilities, ideal for international professionals and families.`,
    propertyIds: []
  },
  {
    id: 'lana-city',
    name: 'Lana City',
    location: {
      address: 'Lana City Complex',
      city: 'Erbil',
      district: 'Kasnazan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 2200,
    priceRange: {
      min: 70000,
      max: 320000,
      currency: 'USD'
    },
    completionDate: '2027',
    amenities: [
      'Affordable Housing',
      'Mixed Development',
      'Schools',
      'Medical Center',
      'Shopping Area',
      'Sports Facilities',
      'Parks & Gardens',
      '24/7 Security',
      'Mosque',
      'Community Center',
      'Parking',
      'Playground'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp'
    ],
    description: `Lana City brings affordable quality housing to the Kasnazan area with a focus on value and community. This large-scale development will create homes for thousands of families at accessible price points.

The project includes schools, healthcare, and shopping facilities to serve residents' daily needs. Parks and recreational spaces promote healthy family lifestyles.

Lana City offers an excellent entry point to home ownership with flexible payment plans and quality construction at competitive prices.`,
    propertyIds: []
  },
  {
    id: 'mnara-village',
    name: 'Mnara Village',
    location: {
      address: 'Mnara Village',
      city: 'Erbil',
      district: 'Baherka',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 750,
    priceRange: {
      min: 150000,
      max: 480000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Lighthouse-Inspired Design',
      'Villas & Townhouses',
      'Central Tower Feature',
      'Swimming Pool',
      'Sports Facilities',
      '24/7 Security',
      'Private Gardens',
      'Community Center',
      'Mosque',
      'Shopping Nearby',
      'Landscaped Pathways',
      'Children\'s Play Area'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp'
    ],
    description: `Mnara Village takes its name from the Arabic word for lighthouse, with a distinctive central tower feature guiding residents home. This Baherka development offers villas and townhouses in a village-style setting.

Each home features private garden space with access to shared pools and sports facilities. The winding pathways and landscaped common areas create a charming village atmosphere.

Mnara Village appeals to families seeking suburban tranquility with a distinctive community identity.`,
    propertyIds: []
  },
  {
    id: 'zaner-city',
    name: 'Zaner City',
    location: {
      address: 'Zaner City Complex',
      city: 'Erbil',
      district: 'Bahirka',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1400,
    priceRange: {
      min: 85000,
      max: 350000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      'Residential Community',
      'Apartments & Houses',
      'Shopping Center',
      'Schools',
      'Medical Clinic',
      'Sports Complex',
      'Central Park',
      '24/7 Security',
      'Mosque',
      'Community Hall',
      'Covered Parking',
      'Green Spaces'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp'
    ],
    description: `Zaner City is an established residential community in the Bahirka area offering diverse housing options from apartments to family houses. The development provides comprehensive facilities for daily living.

Schools, healthcare, and shopping are all within the community, creating a self-contained neighborhood. The central park serves as the community's heart with sports and recreational facilities.

Zaner City offers proven quality and an active community life, making it popular with families seeking established infrastructure.`,
    propertyIds: []
  },
  {
    id: 'zilan-city',
    name: 'Zilan City',
    location: {
      address: 'Zilan City Complex',
      city: 'Erbil',
      district: 'Airport Road',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 1900,
    priceRange: {
      min: 80000,
      max: 340000,
      currency: 'USD'
    },
    completionDate: '2026',
    amenities: [
      'Master-Planned Community',
      'Mixed Housing',
      'International School',
      'Healthcare Center',
      'Shopping Mall',
      'Sports Facilities',
      'Parks & Gardens',
      '24/7 Security',
      'Mosque',
      'Community Center',
      'Underground Parking',
      'Bus Services'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp'
    ],
    description: `Zilan City is an upcoming master-planned community on Airport Road offering diverse housing options for families of all sizes. This comprehensive development will include all essential services within the community.

The project features apartments, townhouses, and villas with flexible options for different budgets. Schools, healthcare, and shopping will serve residents without the need to travel outside the community.

Zilan City offers attractive pre-construction pricing and payment plans for early investors.`,
    propertyIds: []
  },
  {
    id: 'z-center-towers',
    name: 'Z Center Towers',
    location: {
      address: 'Z Center Complex',
      city: 'Erbil',
      district: 'Central Erbil',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 450,
    priceRange: {
      min: 125000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Central Location',
      'Twin Tower Design',
      'Shopping Mall',
      'Swimming Pool',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'High-Speed Elevators',
      'Business Center',
      'Rooftop Restaurant',
      'Children\'s Area',
      'Landscaped Plaza'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    description: `Z Center Towers combines prime central location with integrated shopping and residential living. The twin towers rise above a retail podium offering convenience for residents and visitors alike.

Apartments feature modern designs with city views while the shopping mall below provides daily necessities and entertainment. The rooftop restaurant offers panoramic dining experiences.

Z Center Towers is perfect for urban professionals seeking walkable lifestyle with shopping, dining, and entertainment at their doorstep.`,
    propertyIds: []
  },
  {
    id: 'safiran-city',
    name: 'Safiran City',
    location: {
      address: 'Safiran City Complex',
      city: 'Erbil',
      district: 'Bnaslawa',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1600,
    priceRange: {
      min: 95000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Established Community',
      'Apartments & Villas',
      'Shopping Center',
      'Schools',
      'Medical Clinic',
      'Sports Complex',
      'Central Park',
      '24/7 Security',
      'Mosque',
      'Community Hall',
      'Covered Parking',
      'Landscaped Gardens'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp'
    ],
    description: `Safiran City is an established residential community in Bnaslawa offering quality living at accessible prices. The development combines apartments and villas to suit different family needs and budgets.

Comprehensive community facilities include schools, healthcare, shopping, and sports within the secure environment. The central park provides green space for recreation and community gatherings.

Safiran City offers proven quality with an active community, making it ideal for families seeking established infrastructure and neighbors.`,
    propertyIds: []
  },
  {
    id: 'ruby-towers',
    name: 'Ruby Towers',
    location: {
      address: 'Ruby Towers Complex',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 380,
    priceRange: {
      min: 130000,
      max: 480000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Gemstone-Inspired Design',
      'Luxury Apartments',
      'Ruby-Red Accents',
      'Swimming Pool',
      'Spa & Wellness',
      'Fitness Center',
      '24/7 Security',
      'Valet Parking',
      'Concierge Service',
      'Sky Lounge',
      'Business Center',
      'Event Space'
    ],
    images: [
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp'
    ],
    description: `Ruby Towers brings gemstone luxury to Erbil's skyline with its distinctive design featuring elegant red accents throughout. This Gulan development offers premium apartments with sophisticated styling.

The sky lounge provides exclusive entertaining space while the spa and wellness facilities offer relaxation. Valet parking and concierge services ensure a seamless luxury lifestyle.

Ruby Towers attracts discerning buyers who appreciate distinctive design and premium amenities in a prestigious location.`,
    propertyIds: []
  },
  {
    id: 'four-season-park',
    name: 'Four Season Park',
    location: {
      address: 'Four Season Park',
      city: 'Erbil',
      district: 'Shaqlawa Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1100,
    priceRange: {
      min: 140000,
      max: 520000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      'Four Themed Gardens',
      'Villas & Townhouses',
      'Central Lake',
      'Swimming Pool',
      'Sports Facilities',
      '24/7 Security',
      'Private Gardens',
      'Clubhouse',
      'Seasonal Landscaping',
      'Cycling Paths',
      'Children\'s Areas',
      'Community Events'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp'
    ],
    description: `Four Season Park celebrates nature throughout the year with four distinctively themed garden areas representing spring, summer, autumn, and winter. This unique community on Shaqlawa Road offers a living experience connected to nature.

The central lake serves as the community's focal point surrounded by walking and cycling paths. Each season brings different colors and atmospheres to the beautifully landscaped grounds.

Four Season Park is ideal for families and nature lovers seeking a serene living environment with changing natural beauty year-round.`,
    propertyIds: []
  },
  {
    id: 'family-land',
    name: 'Family Land',
    location: {
      address: 'Family Land Complex',
      city: 'Erbil',
      district: 'Kasnazan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 920,
    priceRange: {
      min: 120000,
      max: 420000,
      currency: 'USD'
    },
    completionDate: '2020',
    amenities: [
      'Family-Focused Design',
      'Villas & Apartments',
      'Theme Park',
      'Water Park',
      'Schools',
      'Medical Clinic',
      '24/7 Security',
      'Sports Facilities',
      'Shopping Center',
      'Mosque',
      'Community Events',
      'Playgrounds'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp'
    ],
    description: `Family Land is designed specifically for families seeking a fun, engaging environment for children to grow. The community features a theme park and water park as its centerpiece attractions.

Beyond entertainment, the development provides schools, healthcare, and shopping for daily needs. The family-first approach extends to home designs with children's safety and play in mind.

Family Land creates lasting memories with regular community events and activities, fostering strong bonds between neighboring families.`,
    propertyIds: []
  },
  {
    id: 'firdaws-city',
    name: 'Firdaws City',
    location: {
      address: 'Firdaws City Complex',
      city: 'Erbil',
      district: '120 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 2100,
    priceRange: {
      min: 90000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Paradise-Themed Community',
      'Mixed Housing',
      'Central Gardens',
      'Water Features',
      'Shopping Center',
      'Schools',
      'Medical Center',
      '24/7 Security',
      'Mosque',
      'Sports Complex',
      'Community Hall',
      'Landscaped Parks'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp'
    ],
    description: `Firdaws City, meaning "paradise" in Arabic, lives up to its name with abundant gardens, water features, and peaceful living environments. This 120 Meter Road development creates a green oasis within the city.

The community offers diverse housing options surrounded by carefully landscaped gardens and flowing water elements. Comprehensive facilities provide for education, health, and recreation needs.

Firdaws City appeals to families seeking a serene, garden-filled living environment with modern conveniences.`,
    propertyIds: []
  },
  {
    id: 'dubai-city',
    name: 'Dubai City',
    location: {
      address: 'Dubai City Complex',
      city: 'Erbil',
      district: 'Airport Road',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 2500,
    priceRange: {
      min: 100000,
      max: 500000,
      currency: 'USD'
    },
    completionDate: '2027',
    amenities: [
      'Dubai-Inspired Design',
      'Modern Towers',
      'Luxury Villas',
      'Shopping Mall',
      'International Hotels',
      'Sports Complex',
      'Marina-Style Water Features',
      '24/7 Security',
      'Business District',
      'Entertainment Zone',
      'Parks & Gardens',
      'Premium Amenities'
    ],
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80&fm=webp'
    ],
    description: `Dubai City brings the vision of the UAE's most iconic city to Erbil with ambitious modern architecture and luxury amenities. This flagship development on Airport Road will transform the area with contemporary towers and upscale living.

The project draws inspiration from Dubai's successful mixed-use developments combining residential, commercial, and entertainment. Marina-style water features add dramatic visual appeal.

Dubai City represents the future of urban development in Kurdistan with attractive investment opportunities and pre-construction pricing.`,
    propertyIds: []
  },
  {
    id: 'bakhtyari-twin-towers',
    name: 'Bakhtyari Twin Towers',
    location: {
      address: 'Bakhtyari Twin Towers',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 420,
    priceRange: {
      min: 140000,
      max: 520000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Iconic Twin Design',
      'Sky Bridge Connection',
      'Rooftop Pool',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'Concierge Service',
      'Business Center',
      'Sky Lounge',
      'Retail Podium',
      'Children\'s Facilities',
      'Landscaped Plaza'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp'
    ],
    description: `Bakhtyari Twin Towers makes an architectural statement in Gulan with its distinctive twin tower design connected by a dramatic sky bridge. This landmark development offers premium apartments with stunning city views.

The sky bridge houses exclusive amenities including the rooftop pool and sky lounge, creating unique spaces for residents. Each tower features high-speed elevators and premium finishes throughout.

Bakhtyari Twin Towers attracts buyers seeking an iconic address with distinctive architecture and luxury amenities.`,
    propertyIds: []
  },
  {
    id: 'queen-towers',
    name: 'Queen Towers',
    location: {
      address: 'Queen Towers Complex',
      city: 'Erbil',
      district: 'Ankawa',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 360,
    priceRange: {
      min: 125000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Royal-Inspired Design',
      'Elegant Apartments',
      'Grand Lobby',
      'Swimming Pool',
      'Spa & Beauty Salon',
      'Fitness Center',
      '24/7 Security',
      'Valet Parking',
      'Concierge Service',
      'Rooftop Garden',
      'Private Cinema',
      'Event Hall'
    ],
    images: [
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp'
    ],
    description: `Queen Towers brings regal elegance to Ankawa with royal-inspired design elements and refined living spaces. This development offers apartments fit for royalty with attention to luxurious details throughout.

The grand lobby sets an impressive tone while the spa and beauty salon provide pampering amenities. The private cinema and event hall offer exclusive entertainment options for residents and their guests.

Queen Towers is perfect for those who appreciate elegant living with a touch of royal sophistication.`,
    propertyIds: []
  },
  {
    id: 'hana-city',
    name: 'Hana City',
    location: {
      address: 'Hana City Complex',
      city: 'Erbil',
      district: 'Pirmam',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1350,
    priceRange: {
      min: 85000,
      max: 340000,
      currency: 'USD'
    },
    completionDate: '2021',
    amenities: [
      'Happiness-Focused Living',
      'Apartments & Villas',
      'Wellness Center',
      'Sports Facilities',
      'Schools',
      'Medical Clinic',
      '24/7 Security',
      'Shopping Center',
      'Parks & Gardens',
      'Mosque',
      'Community Events',
      'Playground'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp'
    ],
    description: `Hana City, meaning "happiness" in Kurdish, is designed to promote joyful family living through thoughtful planning and community amenities. This Pirmam development prioritizes resident well-being.

The wellness center offers health programs while abundant parks and sports facilities encourage active lifestyles. Regular community events bring neighbors together creating lasting friendships.

Hana City appeals to families seeking a positive, supportive community environment focused on happiness and well-being.`,
    propertyIds: []
  },
  {
    id: 'asuda-city',
    name: 'Asuda City',
    location: {
      address: 'Asuda City Complex',
      city: 'Erbil',
      district: 'Bahirka',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1100,
    priceRange: {
      min: 90000,
      max: 360000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Peaceful Living',
      'Mixed Housing',
      'Central Garden',
      'Swimming Pool',
      'Sports Complex',
      'Schools',
      'Medical Center',
      '24/7 Security',
      'Shopping Area',
      'Mosque',
      'Community Hall',
      'Quiet Zones'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp'
    ],
    description: `Asuda City, meaning "peaceful" in Kurdish, delivers on its promise of tranquil living in the Bahirka district. This community is designed for those seeking calm, quiet residential environment.

The central garden provides a peaceful retreat while designated quiet zones ensure residents can enjoy undisturbed relaxation. Modern amenities are thoughtfully placed to minimize noise impact.

Asuda City is ideal for families, retirees, and professionals seeking peaceful living without sacrificing modern conveniences.`,
    propertyIds: []
  },
  {
    id: 'green-world',
    name: 'Green World',
    location: {
      address: 'Green World Complex',
      city: 'Erbil',
      district: 'Shaqlawa Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 850,
    priceRange: {
      min: 130000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Eco-Friendly Design',
      'Solar Power Systems',
      'Water Recycling',
      'Organic Gardens',
      'Nature Trails',
      'Green Buildings',
      '24/7 Security',
      'Bicycle Paths',
      'Electric Vehicle Charging',
      'Wellness Center',
      'Farm-to-Table Restaurant',
      'Environmental Education'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp'
    ],
    description: `Green World is Kurdistan's premier eco-friendly residential community, designed with sustainability at its core. This Shaqlawa Road development incorporates solar power, water recycling, and green building practices.

Nature trails wind through the community while organic gardens provide fresh produce for the farm-to-table restaurant. Electric vehicle charging and bicycle paths encourage sustainable transportation.

Green World appeals to environmentally conscious families seeking to reduce their carbon footprint while enjoying modern comforts.`,
    propertyIds: []
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════════════

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return projects.filter(p => p.status === status);
}

export function getProjectProperties(projectId: string): string[] {
  const project = getProjectById(projectId);
  return project ? project.propertyIds : [];
}

export function formatPriceRange(project: Project): string {
  const { min, max, currency } = project.priceRange;
  if (currency === 'USD') {
    const formatUSD = (price: number) => {
      if (price >= 1000000) {
        return `$${(price / 1000000).toFixed(1)}M`;
      }
      return `$${(price / 1000).toFixed(0)}K`;
    };
    return `${formatUSD(min)} - ${formatUSD(max)}`;
  }
  return `${min.toLocaleString()} - ${max.toLocaleString()} IQD`;
}

export const projectStatuses: ProjectStatus[] = ['Under Construction', 'Ready', 'Coming Soon'];

// ═══════════════════════════════════════════════════════════════════════════
// Construction Progress Helpers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate default construction milestones based on project status and completion date
 */
export function generateDefaultMilestones(project: Project): ConstructionMilestone[] {
  const completionYear = parseInt(project.completionDate) || 2025;

  if (project.status === 'Ready') {
    return [
      { date: `${completionYear - 3}-Q1`, title: 'Construction Started', description: 'Groundbreaking and foundation work began', completed: true },
      { date: `${completionYear - 2}-Q2`, title: 'Structure Complete', description: 'Main structure and framework completed', completed: true },
      { date: `${completionYear - 1}-Q3`, title: 'Interior Finishing', description: 'Interior finishing and MEP installation', completed: true },
      { date: `${completionYear}-Q4`, title: 'Project Delivered', description: 'Full project handover and occupancy', completed: true }
    ];
  } else if (project.status === 'Under Construction') {
    const progress = getProjectProgress(project);
    return [
      { date: `${completionYear - 3}-Q1`, title: 'Construction Started', description: 'Groundbreaking and foundation work', completed: true },
      { date: `${completionYear - 2}-Q2`, title: 'Foundation Complete', description: 'Foundation and basement structure', completed: progress >= 30 },
      { date: `${completionYear - 1}-Q3`, title: 'Structure Progress', description: 'Main structure and framework', completed: progress >= 60 },
      { date: `${completionYear}-Q4`, title: 'Expected Completion', description: 'Project completion and handover', completed: false }
    ];
  } else {
    // Coming Soon
    return [
      { date: `${completionYear - 2}-Q1`, title: 'Planning Phase', description: 'Design and permits acquisition', completed: true },
      { date: `${completionYear - 1}-Q2`, title: 'Construction Start', description: 'Groundbreaking ceremony expected', completed: false },
      { date: `${completionYear}-Q3`, title: 'Structure Phase', description: 'Main construction phase', completed: false },
      { date: `${completionYear + 1}-Q4`, title: 'Project Delivery', description: 'Expected project completion', completed: false }
    ];
  }
}

/**
 * Get construction progress percentage for a project
 * Returns 100 for Ready, 0-20 for Coming Soon, and varies for Under Construction
 */
export function getProjectProgress(project: Project): number {
  // If project has explicit progress defined, use it
  if (project.constructionProgress !== undefined) {
    return project.constructionProgress;
  }

  // Otherwise, generate based on status
  if (project.status === 'Ready') return 100;
  if (project.status === 'Coming Soon') return 10;

  // For Under Construction, estimate based on completion date
  const completionYear = parseInt(project.completionDate) || 2027;
  const currentYear = 2026;
  const yearsRemaining = completionYear - currentYear;

  if (yearsRemaining <= 0) return 95;
  if (yearsRemaining === 1) return 75;
  if (yearsRemaining === 2) return 55;
  if (yearsRemaining === 3) return 35;
  return 25;
}

/**
 * Get milestones for a project (uses defined ones or generates defaults)
 */
export function getProjectMilestones(project: Project): ConstructionMilestone[] {
  if (project.constructionMilestones && project.constructionMilestones.length > 0) {
    return project.constructionMilestones;
  }
  return generateDefaultMilestones(project);
}

/**
 * Get progress color class based on percentage
 */
export function getProgressColorClass(progress: number): string {
  if (progress >= 75) return 'progress--high';
  if (progress >= 40) return 'progress--medium';
  return 'progress--low';
}

// ═══════════════════════════════════════════════════════════════════════════
// Project Image Collections
// ═══════════════════════════════════════════════════════════════════════════

// Image sets organized by project type
const projectImageSets = {
  // Luxury Tower/Skyscraper Images
  tower: {
    heroes: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80&fm=webp',
    ],
    galleries: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80&fm=webp',
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp',
    ]
  },
  // Villa & Village Images
  villa: {
    heroes: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&fm=webp',
    ],
    galleries: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752734-2a0cd66c42ae?w=800&q=80&fm=webp',
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752734-2a0cd66c42ae?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80&fm=webp',
    ]
  },
  // Luxury Hotel/Branded Residences Images
  hotel: {
    heroes: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80&fm=webp',
    ],
    galleries: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80&fm=webp',
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607688960-e095ff83135c?w=800&q=80&fm=webp',
    ]
  },
  // Mixed-Use/City Development Images
  city: {
    heroes: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80&fm=webp',
    ],
    galleries: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752734-2a0cd66c42ae?w=800&q=80&fm=webp',
    ]
  },
  // Waterfront/Lagoon Development Images
  waterfront: {
    heroes: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&fm=webp',
    ],
    galleries: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600566752734-2a0cd66c42ae?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80&fm=webp',
    ]
  }
};

// Project type mapping based on project name/id patterns
type ProjectType = 'tower' | 'villa' | 'hotel' | 'city' | 'waterfront';

function getProjectType(projectId: string, projectName: string): ProjectType {
  const id = projectId.toLowerCase();
  const name = projectName.toLowerCase();

  // Hotel/Branded Residences
  if (id.includes('rotana') || id.includes('divan') || id.includes('marriott') ||
      id.includes('kempinski') || name.includes('hotel') || name.includes('residence')) {
    return 'hotel';
  }

  // Waterfront/Lagoon
  if (id.includes('pavilion') || name.includes('lagoon') || name.includes('marina') ||
      name.includes('atlantic')) {
    return 'waterfront';
  }

  // Towers
  if (id.includes('tower') || name.includes('tower') || id.includes('sky') ||
      id.includes('quattro') || id.includes('twin') || id.includes('signature') ||
      id.includes('crystal') || id.includes('ruby') || id.includes('venus') ||
      id.includes('cihan-tower') || id.includes('ster') || id.includes('life-tower') ||
      id.includes('naz-towers') || id.includes('classy') || id.includes('royal-towers') ||
      id.includes('star-towers') || id.includes('gulan-towers') || id.includes('roya') ||
      id.includes('erbil-one') || id.includes('boulevard') || id.includes('cavally') ||
      id.includes('zaniary') || id.includes('ankawa-4') || id.includes('sarbast') ||
      id.includes('mrf') || id.includes('z-center') || id.includes('bakhtyari') ||
      id.includes('queen-towers') || id.includes('four-towers') || id.includes('park-view') ||
      id.includes('qaiwan')) {
    return 'tower';
  }

  // Villas & Villages
  if (id.includes('village') || name.includes('village') || id.includes('villa') ||
      id.includes('american') || id.includes('english') || id.includes('italian') ||
      id.includes('lebanese') || id.includes('garden-city') || id.includes('ganjan') ||
      id.includes('aram') || id.includes('zanko') || id.includes('mnara') ||
      id.includes('four-season') || id.includes('family-land') || id.includes('green-world')) {
    return 'villa';
  }

  // Default to city for large mixed-use developments
  return 'city';
}

/**
 * Get image set for a project based on its type
 */
function getProjectImageSet(projectId: string, projectName: string, index: number) {
  const projectType = getProjectType(projectId, projectName);
  const imageSet = projectImageSets[projectType];

  // Use index to vary images across similar projects
  const heroIndex = index % imageSet.heroes.length;
  const galleryStart = (index * 2) % Math.max(1, imageSet.galleries.length - 5);

  return {
    image: imageSet.heroes[heroIndex],
    gallery: imageSet.galleries.slice(galleryStart, galleryStart + 6),
    floorPlanImages: imageSet.floorPlans
  };
}

/**
 * Get the main hero image for a project
 */
export function getProjectImage(project: Project): string {
  if (project.image) {
    return project.image;
  }
  const index = projects.findIndex(p => p.id === project.id);
  return getProjectImageSet(project.id, project.name, index >= 0 ? index : 0).image;
}

/**
 * Get gallery images for a project
 */
export function getProjectGallery(project: Project): string[] {
  if (project.gallery && project.gallery.length > 0) {
    return project.gallery;
  }
  const index = projects.findIndex(p => p.id === project.id);
  return getProjectImageSet(project.id, project.name, index >= 0 ? index : 0).gallery;
}

/**
 * Get floor plan images for a project
 */
export function getProjectFloorPlans(project: Project): string[] {
  if (project.floorPlanImages && project.floorPlanImages.length > 0) {
    return project.floorPlanImages;
  }
  const index = projects.findIndex(p => p.id === project.id);
  return getProjectImageSet(project.id, project.name, index >= 0 ? index : 0).floorPlanImages;
}

/**
 * Get all project images (hero + gallery + floor plans)
 */
export function getAllProjectImages(project: Project): {
  hero: string;
  gallery: string[];
  floorPlans: string[];
} {
  return {
    hero: getProjectImage(project),
    gallery: getProjectGallery(project),
    floorPlans: getProjectFloorPlans(project)
  };
}
