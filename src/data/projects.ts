// ═══════════════════════════════════════════════════════════════════════════
// Project Data - Real Estate Development Projects in Erbil, Iraq
// ═══════════════════════════════════════════════════════════════════════════

export type ProjectStatus = 'Under Construction' | 'Ready' | 'Coming Soon';

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
  availableUnits: number;
  priceRange: {
    min: number;
    max: number;
    currency: 'USD' | 'IQD';
  };
  completionDate: string;
  amenities: string[];
  images: string[];
  description: string;
  propertyIds: string[]; // Links to individual properties
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
    totalUnits: 2500,
    availableUnits: 850,
    priceRange: {
      min: 150000,
      max: 2500000,
      currency: 'USD'
    },
    completionDate: '2027',
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
    description: `Empire World is Erbil's most ambitious mixed-use development project, setting new standards for luxury living in the Kurdistan Region. This landmark development features residential towers, a world-class shopping mall, five-star hotel, and premium office spaces.

The project spans over 500,000 square meters and will become the commercial heart of Erbil. Residential units range from elegant studio apartments to sprawling penthouses with panoramic city views. Every residence features premium finishes, smart home technology, and access to exclusive amenities.

Empire World represents the future of urban living in Iraq, combining international standards with local hospitality traditions.`,
    propertyIds: []
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
    totalUnits: 3200,
    availableUnits: 420,
    priceRange: {
      min: 85000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2023',
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
    description: `Dream City is one of Erbil's premier residential communities, offering a complete lifestyle destination for families and professionals. This master-planned community combines modern architecture with thoughtful urban planning.

The project features a diverse range of housing options including villas, townhouses, and apartments, all set within beautifully landscaped grounds. Residents enjoy access to international schools, healthcare facilities, shopping centers, and recreational amenities without leaving the community.

Dream City represents the ideal blend of privacy, security, and community living, making it one of the most sought-after addresses in Erbil.`,
    propertyIds: []
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
    totalUnits: 1800,
    availableUnits: 180,
    priceRange: {
      min: 120000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2022',
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
    totalUnits: 1200,
    availableUnits: 95,
    priceRange: {
      min: 180000,
      max: 550000,
      currency: 'USD'
    },
    completionDate: '2021',
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
    totalUnits: 500,
    availableUnits: 85,
    priceRange: {
      min: 95000,
      max: 350000,
      currency: 'USD'
    },
    completionDate: '2024',
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
    availableUnits: 45,
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
    totalUnits: 600,
    availableUnits: 120,
    priceRange: {
      min: 85000,
      max: 280000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Twin Tower Design',
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
    description: `Tulip Towers is a distinctive twin-tower residential complex offering modern apartments in the heart of Gulan. The iconic design features two elegant towers connected by landscaped gardens and shared amenities.

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
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 400,
    availableUnits: 60,
    priceRange: {
      min: 130000,
      max: 380000,
      currency: 'USD'
    },
    completionDate: '2023',
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
    availableUnits: 650,
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
