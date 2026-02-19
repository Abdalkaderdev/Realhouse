// ═══════════════════════════════════════════════════════════════════════════
// Project Data - Real Estate Development Projects in Erbil, Iraq
// ═══════════════════════════════════════════════════════════════════════════

export type ProjectStatus = 'Under Construction' | 'Ready' | 'Coming Soon';

export interface Project {
  id: string;
  name: string;
  developer: string;
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
    developer: 'Faruk Group',
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
      'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800&q=80'
    ],
    description: `Empire World is Erbil's most ambitious mixed-use development project, setting new standards for luxury living in the Kurdistan Region. This landmark development by Faruk Group features residential towers, a world-class shopping mall, five-star hotel, and premium office spaces.

The project spans over 500,000 square meters and will become the commercial heart of Erbil. Residential units range from elegant studio apartments to sprawling penthouses with panoramic city views. Every residence features premium finishes, smart home technology, and access to exclusive amenities.

Empire World represents the future of urban living in Iraq, combining international standards with local hospitality traditions.`,
    propertyIds: []
  },
  {
    id: 'dream-city',
    name: 'Dream City',
    developer: 'Qaiwan Group',
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
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    ],
    description: `Dream City is one of Erbil's premier residential communities, offering a complete lifestyle destination for families and professionals. Developed by Qaiwan Group, this master-planned community combines modern architecture with thoughtful urban planning.

The project features a diverse range of housing options including villas, townhouses, and apartments, all set within beautifully landscaped grounds. Residents enjoy access to international schools, healthcare facilities, shopping centers, and recreational amenities without leaving the community.

Dream City represents the ideal blend of privacy, security, and community living, making it one of the most sought-after addresses in Erbil.`,
    propertyIds: []
  },
  {
    id: 'italian-village',
    name: 'Italian Village',
    developer: 'Darin Group',
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
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80'
    ],
    description: `Italian Village brings the charm of Tuscany to the heart of Erbil. This unique residential development by Darin Group features authentic Italian architecture, with homes designed around picturesque courtyards and a central piazza.

The village atmosphere creates a warm, welcoming community where neighbors become friends. Cobblestone pathways wind through the property, connecting residents to charming cafes, boutique shops, and community spaces inspired by Italian lifestyle.

Each residence is crafted with attention to detail, featuring terracotta roofs, wrought-iron balconies, and arched doorways. Italian Village offers a distinctive living experience that celebrates Mediterranean elegance in Kurdistan.`,
    propertyIds: []
  },
  {
    id: 'english-village',
    name: 'English Village',
    developer: 'Faruk Group',
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
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80'
    ],
    description: `English Village is an exclusive residential enclave that captures the elegance of British country living. Developed by Faruk Group, this prestigious community features stately homes inspired by Georgian and Victorian architecture.

Residents enjoy a refined lifestyle with access to a private country club, manicured gardens, and world-class amenities. The village is designed for those who appreciate timeless elegance and seek a distinguished address in Erbil.

Each residence offers generous living spaces, quality craftsmanship, and private gardens. English Village represents the pinnacle of luxury living in Kurdistan, where tradition meets contemporary comfort.`,
    propertyIds: []
  },
  {
    id: 'dilan-city',
    name: 'Dilan City',
    developer: 'Dilan Company',
    location: {
      address: 'Dilan City',
      city: 'Erbil',
      district: 'Dilan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 2800,
    availableUnits: 1200,
    priceRange: {
      min: 75000,
      max: 320000,
      currency: 'USD'
    },
    completionDate: '2026',
    amenities: [
      'Mixed-Use Development',
      'Commercial Center',
      'Residential Towers',
      'Public Park',
      'Schools',
      'Healthcare Center',
      'Mosque',
      'Sports Complex',
      '24/7 Security',
      'Smart City Infrastructure',
      'Electric Vehicle Charging',
      'Recycling Center'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80'
    ],
    description: `Dilan City is an innovative urban development project that reimagines city living for the modern era. Developed by Dilan Company, this forward-thinking community incorporates smart city technology and sustainable design principles.

The project features a harmonious blend of residential, commercial, and recreational spaces, creating a self-contained urban environment. Residents will enjoy easy access to schools, healthcare, shopping, and entertainment within walking distance of their homes.

Dilan City is designed with sustainability in mind, featuring green spaces, energy-efficient buildings, and eco-friendly infrastructure. This is the future of urban development in Kurdistan.`,
    propertyIds: []
  },
  {
    id: 'park-view-towers',
    name: 'Park View Towers',
    developer: 'Vista Development',
    location: {
      address: 'Park View Complex',
      city: 'Erbil',
      district: 'Ankawa',
      country: 'Iraq'
    },
    status: 'Coming Soon',
    totalUnits: 450,
    availableUnits: 450,
    priceRange: {
      min: 95000,
      max: 280000,
      currency: 'USD'
    },
    completionDate: '2028',
    amenities: [
      'Park Views',
      'Rooftop Pool',
      'Sky Lounge',
      'Fitness Center',
      'Co-Working Space',
      'Private Cinema',
      'Concierge Service',
      '24/7 Security',
      'Electric Vehicle Charging',
      'Smart Home Systems',
      'Package Lockers',
      'Pet-Friendly Areas'
    ],
    images: [
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
    ],
    description: `Park View Towers is an upcoming luxury residential development in the vibrant Ankawa district. Developed by Vista Development, this contemporary tower will offer stunning views of Erbil's largest public park.

The development will feature modern apartments designed for urban professionals and young families, with emphasis on natural light, efficient layouts, and premium finishes. Residents will enjoy resort-style amenities including a rooftop pool, sky lounge, and state-of-the-art fitness center.

Pre-sales for Park View Towers will begin soon, offering early investors attractive pricing and flexible payment plans. Register your interest now to secure your place in Erbil's most anticipated new development.`,
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
