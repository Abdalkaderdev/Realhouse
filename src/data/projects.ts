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
    availableUnits: 1450,
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
    availableUnits: 380,
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
    availableUnits: 3200,
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
    availableUnits: 185,
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
    availableUnits: 220,
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
    availableUnits: 45,
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
    availableUnits: 35,
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
    availableUnits: 55,
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
    availableUnits: 40,
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
    availableUnits: 145,
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
    availableUnits: 680,
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
    availableUnits: 75,
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
    availableUnits: 165,
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
    availableUnits: 280,
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
    availableUnits: 520,
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
    availableUnits: 890,
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
    availableUnits: 45,
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
    availableUnits: 85,
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
