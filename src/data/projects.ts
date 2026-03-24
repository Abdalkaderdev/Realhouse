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

export interface UnitType {
  type: string;
  grossArea: number;
  netArea: number;
  bedrooms: number;
  bathrooms: number;
}

export interface Project {
  id: string;
  name: string;
  developer?: string;
  location: {
    address: string;
    city: string;
    district: string;
    country: string;
  };
  status: ProjectStatus;
  totalUnits: number | string;
  buildings?: number;
  floors?: number;
  unitTypes?: UnitType[];
  priceRange: {
    min: number;
    max: number;
    currency: 'USD' | 'IQD';
  };
  completionDate?: string;
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
      address: 'Empire World Complex, near Erbil International Airport',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 8000,
    priceRange: {
      min: 150000,
      max: 2500000,
      currency: 'USD'
    },
    completionDate: '2028',
    amenities: [
      'JW Marriott Hotel (207 rooms)',
      'JW Marriott Executive Apartments (96 units)',
      '5 Empire Business Towers',
      'Empire Avenue Pedestrian Walkway',
      'Luxury Restaurants (East & West)',
      'Swimming Pools',
      'Tennis Courts',
      'Fitness Center',
      '24/7 Security',
      'Underground Parking',
      'Majid Agha Mosque',
      'Welat Statue Monument'
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
    description: `Empire World is Iraq's most ambitious real estate project, spanning over 1.25 million square meters near Erbil International Airport and adjacent to Sami Abdulrahman Park. Awarded "Most Innovative Mixed-Use Real Estate Project - Iraq 2025" by International Finance.

The development includes multiple components: Royal Villas (900 modern villas across 3 phases), Royal Apartments (2,412 units in European-style buildings of 10-13 floors), Empire Wings East & West (3,856 apartments in 30 buildings of 9-31 floors), Empire Square (720 residential and commercial units), and Empire Diamond towers.

Commercial facilities include the JW Marriott Hotel with 207 rooms, 96 JW Marriott Executive Apartments, 5 Empire Business Towers (the main tower rises 27 floors with 24,000 sqm), and 6 Empire Business Complexes. The project creates a self-sustained community combining luxury living, business, hospitality, and retail.`,
    propertyIds: [],
    constructionProgress: 70,
    constructionMilestones: [
      { date: '2019-Q1', title: 'Groundbreaking', description: 'Official project launch with KRG officials', completed: true },
      { date: '2023-Q1', title: 'Foundation Complete', description: 'Foundation and underground structure completed', completed: true },
      { date: '2024-Q2', title: 'Structure 70%', description: 'Main structures reaching completion', completed: true },
      { date: '2026-Q4', title: 'Phase 1 Handover', description: 'First residential units ready for handover', completed: false },
      { date: '2028-Q2', title: 'Full Completion', description: 'All phases complete and operational', completed: false }
    ]
  },
  {
    id: 'dream-city',
    name: 'Dream City',
    location: {
      address: '100 Meter Street, 2km northwest of city center',
      city: 'Erbil',
      district: 'Dream City',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1200,
    priceRange: {
      min: 380000,
      max: 2400000,
      currency: 'USD'
    },
    completionDate: '2006',
    amenities: [
      'Gated Community (4 entries)',
      '4,000m Security Fence',
      'SABIS International School',
      'Health Center & Clinic',
      'Shopping Mall',
      'Commercial Plazas (2)',
      'Mosque',
      'Social Center',
      '24/7 Security',
      'Kids Play Areas',
      'Playgrounds',
      'Green Areas & Parks'
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
    description: `Dream City is Erbil's most luxurious residential complex, built on approximately 1 million square meters on 100 Meter Street, just 5 minutes from Erbil International Airport. Developed by Nasri Group of Companies (NGC), the project started operating in 2006.

The community features 1,200 separate villas ranging from 250 to 900 square meters. Villa sizes include 250m², 350m², 450m², 600m², 800m², and 900m² options, with larger villas featuring private pools. All homes were designed by architects in Erbil, Baghdad, Beirut, and Dubai.

Residents enjoy excellent infrastructure including 24-hour electricity, reliable water supply, complete sewerage systems, and fast internet. The complex has 4 gated entries and a 4,000-meter security fence ensuring privacy. Amenities include SABIS International School, health center, two commercial plazas, mosque, cafes, shops, and extensive green areas.`,
    propertyIds: [],
    constructionProgress: 100,
    constructionMilestones: [
      { date: '2004-Q1', title: 'Project Launch', description: 'Dream City development announced', completed: true },
      { date: '2005-Q3', title: 'Infrastructure Complete', description: 'Roads, utilities, and security infrastructure', completed: true },
      { date: '2006-Q2', title: 'First Phase Delivered', description: 'Initial villas ready for residents', completed: true },
      { date: '2008-Q4', title: 'Full Completion', description: 'All 1,200 villas completed and occupied', completed: true }
    ]
  },
  {
    id: 'italian-village',
    name: 'Italian City 1',
    location: {
      address: 'Italian City 1, 120m Ring Street',
      city: 'Erbil',
      district: 'Italian Village',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 720,
    priceRange: {
      min: 150000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2015',
    amenities: [
      'Italian-Style Architecture',
      '5-Star Hotel (121 rooms)',
      '8 Suites & 4 King Suites',
      'Restaurants & Ballroom',
      'Outdoor Swimming Pools',
      'Recreational Facilities',
      'Landscaped Leisure Areas',
      'Large Car Park',
      '24/7 Security',
      'Boutique Shops',
      'Multiple Neighborhoods',
      'Distinctive Design Styles'
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
    description: `Italian City 1 is one of Erbil's most attractive residential communities, developed by Hemn Group. This mixed-use development features 640 residential units and 80 commercial units arranged in tiered townhouses and villas across different neighborhoods, each with distinctive architectural styles.

Residential options include Type A houses (212 units at 320 sqm each) and Type B houses (160 units at 240 sqm each). The community features a 5-star hotel spanning 4,554 sqm with 13 floors, 121 rooms, 8 suites, and 4 King suites.

The hotel includes restaurants, a ballroom, recreational facilities, outdoor swimming pools, large car park, and landscaped leisure areas. Italian City 1 brings Mediterranean elegance to Kurdistan with authentic Italian architecture and a vibrant community atmosphere.`,
    propertyIds: []
  },
  {
    id: 'english-village',
    name: 'English Village',
    location: {
      address: 'Western Erbil',
      city: 'Erbil',
      district: 'English Village',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 420,
    priceRange: {
      min: 400000,
      max: 600000,
      currency: 'USD'
    },
    completionDate: '2006',
    amenities: [
      'British-Built Construction',
      'Identical Villa Design',
      '235 sqm Floor Space (each)',
      '5 Bedrooms Per Villa',
      'Full Air Conditioning',
      'Fitted Kitchens',
      'Eastern & Western Bathrooms',
      'Reliable Electricity Supply',
      'Modern Sanitation System',
      'School',
      '5-Story Shopping Centre',
      '24/7 Security'
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
    description: `English Village is a British-built luxury housing compound located in western Erbil, covering 26 hectares (64 acres). The compound contains 420 identical villas, now predominantly used as residences and offices for international companies.

Each villa offers 235 square meters (2,530 sq ft) of floor space on two floors with 5 bedrooms, full air conditioning, fitted kitchens, and 2 bathrooms with combined Eastern and Western toilets. The compound features reliable electricity supply and modern sanitation systems, setting it apart from other areas of Erbil.

Amenities include a school and a five-story shopping centre. The complex is populated mostly by upper-class locals, foreign businesspeople, and aid workers. Villa prices have appreciated significantly: $125,000 in 2006, $200,000 in 2008, and $500,000+ by 2011, with rentals around $3,400/month.`,
    propertyIds: []
  },
  {
    id: 'boulevard',
    name: 'The Boulevard',
    developer: '4Bridges',
    location: {
      address: 'Ainkawa Intersection, Gulan Street',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1600,
    priceRange: {
      min: 69500,
      max: 350000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      '10 Residential Towers',
      '53,000 sqm Total Area',
      '10,000 sqm Gardens',
      '60% Open to Air',
      'Central Heating System',
      'Central Gas System',
      'Earthquake Resistant (6+ Richter)',
      'Indoor Swimming Pool',
      'Outdoor Swimming Pool',
      'Outdoor Gymnasium',
      'Cinema',
      'Tennis Courts',
      'Basketball Court',
      'Handball Court',
      'Mini Football Pitch',
      'Jogging Tracks',
      'Children\'s Playground',
      'Prayer Areas',
      '24/7 Security & CCTV',
      'Tree-Lined Boulevard',
      '5-Year Installment Plan'
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
    description: `The Boulevard by 4Bridges is a landmark mixed-use development at Ainkawa Intersection on Gulan Street, spanning 53,000 sqm with 10 residential towers offering 1,600 units and 10,000 sqm of landscaped gardens.

Unit types include Studios (69.5 sqm), 1-Bedroom (97 sqm), 2-Bedroom (148-169 sqm), 3-Bedroom with service room (235 sqm), and 4-Bedroom with service room (298.5 sqm). Select units include villas with private gardens. Buildings reach up to 20 floors with 60% of project area open to air.

First-ever features in Erbil include central heating with continuous hot water, centralized gas supply, and earthquake-resistant construction rated above 6 on the Richter scale (vs standard 5.5). Privacy design separates smaller units from family apartments.

Recreation includes indoor and outdoor pools, outdoor gym, cinema, jogging tracks, tennis, basketball, handball courts, mini football pitch, and children's playground. The tree-lined boulevard creates spaces for shopping, entertainment, and relaxation. 5-year installment plans available.`,
    propertyIds: ['boulevard-apt-floor-13', 'boulevard-apt-floor-14', 'boulevard-apt-floor-17']
  },
  {
    id: 'cavalli-tower',
    name: 'Cavalli Tower',
    developer: 'SHAHAN',
    location: {
      address: 'Gulan Street (40 Meter Street)',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 745,
    priceRange: {
      min: 62000,
      max: 420000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      '48 Floors (149m tall)',
      '4,644 sqm Land Area',
      'Penthouse Floor',
      '6th Floor Garden Apartments',
      'DDK Restaurant',
      'MV Cafe',
      'Supermarket',
      'Bakery & Dessert Shop',
      'Kids Indoor Playground',
      'Sport Center',
      'Laundry Services',
      'Barber Shop',
      '4 Parking Floors',
      '2 Underground Parking Levels',
      'CCTV Security',
      'Public Lifts',
      'Podium Amenities',
      'Landscaped Public Realm'
    ],
    images: [
      '/images/projects/cavalli-tower/page01_img01.jpeg',
      '/images/projects/cavalli-tower/page02_img01.jpeg',
      '/images/projects/cavalli-tower/page03_img01.jpeg'
    ],
    image: '/images/projects/cavalli-tower/page01_img01.jpeg',
    gallery: [
      '/images/projects/cavalli-tower/page01_img01.jpeg',
      '/images/projects/cavalli-tower/page02_img01.jpeg',
      '/images/projects/cavalli-tower/page03_img01.jpeg',
      '/images/projects/cavalli-tower/page04_img01.jpeg',
      '/images/projects/cavalli-tower/page05_img01.jpeg',
      '/images/projects/cavalli-tower/page06_img01.jpeg',
      '/images/projects/cavalli-tower/page07_img01.jpeg',
      '/images/projects/cavalli-tower/page09_img01.jpeg',
      '/images/projects/cavalli-tower/page13_img01.jpeg',
      '/images/projects/cavalli-tower/page14_img01.jpeg',
      '/images/projects/cavalli-tower/page15_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/cavalli-tower/page08_img01.jpeg',
      '/images/projects/cavalli-tower/page10_img01.jpeg',
      '/images/projects/cavalli-tower/page11_img01.jpeg',
      '/images/projects/cavalli-tower/page12_img01.jpeg',
      '/images/projects/cavalli-tower/page12_img02.jpeg'
    ],
    description: `Cavalli Tower by SHAHAN is a landmark 48-storey residential tower standing 149 meters tall on Gulan Street (40m Street) in central Erbil. Built on 4,644 sqm, the tower contains 745 residential apartments across levels 6-47, plus an exclusive penthouse floor.

Unit types include Studios (59 sqm), 1-Bedroom (85-108 sqm), 3-Bedroom (162-209 sqm), and 4-Bedroom (235-238 sqm). The 6th floor features special garden apartments with private terraces ranging from 35 sqm to an impressive 310 sqm.

The twin-block tower (Block 1 and Block 2) features modern glass curtain wall architecture designed by SEVENSTUDIO. Views include Erbil Citadel (3.5km), Sami Abdulrahman Park (1.2km), Parliament (2.4km), and Gulan Mall (1.2km).

Two full amenity floors house DDK Restaurant, MV Cafe, market, bakery, dessert shop, kids indoor playground, sport center, laundry, and barber. Parking includes 4 floors with 2 underground levels for commercial spaces. "Cavalli is for people whose lives never slow down."`,
    propertyIds: []
  },
  {
    id: 'tulip-towers',
    name: 'Tulip Towers',
    location: {
      address: 'Gulan Street, Erbil Golden Zone',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 1243,
    priceRange: {
      min: 95000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      '4 Towers (Blocks A, B, C, D)',
      '44 Floors Per Tower',
      '300,976 sqm Total Construction',
      '24,295 sqm Commercial Space',
      '1,602 Vehicle Parking',
      '5,700 sqm Green Area',
      'Earthquake Resistant (8.0 Richter)',
      'Studios to 4+1 Apartments',
      'Duplex Apartments',
      'Penthouses',
      'Smart Home System',
      'Sports Center',
      'Pharmacy',
      'Day Nursery',
      'Pet Friendly',
      'Supermarket & Cafes',
      'Fire Fighting Station',
      'Roof Garden Social Floor',
      'Spa & Fitness Center',
      'EV Charging Stations',
      '24/7 Security & CCTV'
    ],
    images: [
      '/images/projects/tulip-towers/page01_img01.jpeg',
      '/images/projects/tulip-towers/page04_img01.jpeg',
      '/images/projects/tulip-towers/page06_img01.jpeg'
    ],
    image: '/images/projects/tulip-towers/page01_img01.jpeg',
    gallery: [
      '/images/projects/tulip-towers/page03_img01.jpeg',
      '/images/projects/tulip-towers/page05_img01.jpeg',
      '/images/projects/tulip-towers/page07_img01.jpeg',
      '/images/projects/tulip-towers/page09_img01.jpeg',
      '/images/projects/tulip-towers/page17_img01.jpeg',
      '/images/projects/tulip-towers/page18_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/tulip-towers/page25_img01.jpeg',
      '/images/projects/tulip-towers/page27_img01.jpeg',
      '/images/projects/tulip-towers/page29_img01.jpeg'
    ],
    description: `Tulip Towers is a landmark 4-tower development on Gulan Street in Erbil's Golden Zone, featuring 44 floors per tower and 1,243 apartments plus penthouses. Walking distance to Sami Abdulrahman Park, 10 minutes to airport, 3 minutes to World Trade Center.

Unit types include Studios (95 sqm), 1+1 (103-113 sqm), 2+1 (145-155 sqm), 3+1 (230 sqm), and 4+1 (237-255 sqm). Duplex apartments range from 1+1 (96-159 sqm) to 3+1 (228-238 sqm) with balconies up to 75 sqm.

Total construction spans 300,976 sqm with 24,295 sqm commercial, 1,602 parking spaces, and 5,700 sqm green areas. Earthquake protection uses nailing system technology withstanding magnitude 8.0.

Amenities include roof garden social floor, spa, fitness center, sports center, pharmacy, nursery, pet-friendly facilities, supermarket, cafes, restaurants, and EV charging stations. Smart home system and 24/7 security throughout.`,
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
    name: 'Pavilion by Rams',
    location: {
      address: 'Pavilion Erbil, 170+ hectares',
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
      '320,000 sqm Lagoon & Canals',
      'Villas & High-Rise Towers',
      'Smart Home Technology',
      'Automated Lighting & Temperature',
      'Shopping Mall',
      'Hotel',
      'School & Kindergarten',
      'Mosque',
      'Health Center',
      'Gym & Fitness Center',
      'Underground Car Park',
      'Pre-installed ACs & Kitchen Appliances'
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
    description: `Pavilion by Rams commenced construction in early 2022 as one of the most significant and luxurious residential developments in Kurdistan and Iraq. Spanning over 170 hectares, the project transforms land into villas, apartments, green areas, water canals, hotels, shopping malls, and more.

The centerpiece is a stunning 320,000 sqm lagoon and canals creating a serene atmosphere. Apartment buildings line the green edge of the masterplan, while luxury villas are situated along the canal side around the lagoon. All residences feature smart home technologies including automated lighting, temperature control, and security systems.

Amenities include 24hr electricity, internet, playground, pre-installed ACs, security, parking, gym, underground car park, fitness center, supermarket, mosque, school, central A/C, concierge, built-in wardrobes, and kitchen appliances. Pets allowed.`,
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
    description: `Lebanese Village is a master-planned residential and commercial mixed-use development by LDRS Chehab & Partners, located just 10 minutes from Erbil International Airport on the new Baherka Road near Ainkawa. The project spans a built-up area of 240,000 square meters organized into 8 zones (A-H).

The development features 3,400 residential units including 48 villas (Type A: 336 sqm with ground floor, first floor, and attic) and apartments: studios (40 sqm), 1-bed (50-56 sqm), 2-bed (107-110 sqm), 3-bed (160 sqm), and 4-bed (200 sqm). Also includes a 200-room motel/chalet, offices, and furnished apartment units.

Amenities include 24-hour electricity, central gas, underground parking, health & sports club with outdoor swimming pool, fitness center, kindergarten, school, medical center, supermarket, mosque, restaurants, and landscaped green areas with walkways adhering to international design standards.`,
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
      address: '40 Meter Street (Gulan), 5 minutes from city center',
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
    completionDate: '2007',
    amenities: [
      '14 Residential Buildings',
      '7 Buildings with 11 Floors',
      '7 Buildings with 14 Floors',
      '4 Apartments Per Floor',
      '225 sqm Per Apartment',
      'High Security Standards',
      'Professional Maintenance',
      'Green Spaces',
      'Children\'s Playground',
      '24/7 Security',
      'Covered Parking',
      'Easy Highway Access'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp'
    ],
    description: `Naz City is one of Erbil's premier luxury residential projects, implemented in 2007 in cooperation with Nassouri and Brian Company. Located on 40 Meter Street (Gulan), about 5 minutes from Erbil city center.

The project consists of 14 buildings - seven with 11 floors and seven with 14 floors - with 4 apartments per floor totaling approximately 700 units. Each apartment spans 225 sqm and includes 2 bedrooms, sitting room, kitchen, reception room, 2 bathrooms, and a toilet.

Naz City offers a perfect balance of urban convenience and residential tranquility, known for its high security and maintenance standards. The community features extensive green spaces and well-maintained common areas, creating an excellent environment for families.`,
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
      address: 'Gulan Street, opposite Dream City, Golden Square',
      city: 'Erbil',
      district: 'Golden Square',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 602,
    priceRange: {
      min: 52000,
      max: 700000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Four 14-Story Blocks',
      '3 Basement Parking Floors',
      'Ground Floor Commercial',
      'Restaurants & Cafeterias',
      'Views of Dream City',
      '24/7 Security',
      'Fitness Center',
      'Swimming Pool',
      'Green Areas',
      'Children\'s Playground',
      'High-Speed Internet',
      '5km from Airport'
    ],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp'
    ],
    description: `Star Towers is a modern residential complex by MRFGroup located on Gulan Street opposite Dream City in Erbil's Golden Square area. The project started in 2019 and features four 14-story blocks with three basement floors for parking.

The development offers 602 apartments with ground floor commercial spaces including restaurants and cafeterias. Located just 5km from Erbil International Airport and near the park, units range from studios (62 sqm, from $52,000) to larger apartments. Rentals available from $400-$1,100/month.

Star Towers provides excellent value for buyers and investors seeking quality residential units with comprehensive community amenities, panoramic views of Dream City, and easy airport access.`,
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
    name: 'Erbil Arjaan by Rotana',
    location: {
      address: '10 minutes from Erbil International Airport',
      city: 'Erbil',
      district: '100 Meter Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 168,
    priceRange: {
      min: 180000,
      max: 650000,
      currency: 'USD'
    },
    completionDate: '2015',
    amenities: [
      '168 Serviced Hotel Apartments',
      'Studios to 2-Bedroom Suites',
      'Fully Equipped Kitchens',
      'Bodylines Fitness & Wellness Club',
      'Relaxing Spa Treatments',
      'Free On-Site Parking',
      '24/7 Security & CCTV',
      'Uniformed Security',
      'Maid Service',
      'Business Center Nearby',
      'Near International Fairground',
      '10 min to Downtown Citadel'
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
    description: `Erbil Arjaan by Rotana is an upscale property featuring 168 modern, fully-furnished serviced hotel apartments. Conveniently located 10 minutes from Erbil International Airport, the main international fairground, business centers, and downtown citadel.

The property offers studios to spacious two-bedroom suites, each with fully-equipped kitchens, contemporary furnishings, and home-from-home comfort. Designed for business travelers, long stays, and family comfort, all apartments feature modern amenities and state-of-the-art connectivity.

Residents enjoy the Bodylines Fitness & Wellness Club with gym and spa treatments, free on-site parking, and high security with uniformed guards and CCTV surveillance. Payment accepted in US Dollars.`,
    propertyIds: []
  },
  {
    id: 'divan-erbil',
    name: 'Divan Erbil',
    location: {
      address: 'Gulan Street, opposite Sami Abdul-Rahman Park',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 250,
    priceRange: {
      min: 200000,
      max: 580000,
      currency: 'USD'
    },
    completionDate: '2014',
    amenities: [
      'Highest Tower in Erbil',
      '250+ Luxurious Rooms/Suites',
      'Presidential Suites & Penthouses',
      'Apartments with Kitchenette',
      'Qi 21 Restaurant (21st Floor)',
      'Seasons Restaurant (Buffet)',
      'Spa & Wellness Center',
      'Marble Bathrooms',
      'Large LCD Satellite TV',
      'High-Speed Internet',
      '24hr Laundry Service',
      '10 min from Airport'
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
    description: `Divan Erbil is the most visually modern structure and highest tower in Erbil, a local landmark spreading over 25,000 sqm on Gulan Street opposite Sami Abdul-Rahman Park (the largest park in Iraq). Just 10 minutes from the Airport.

The complex features over 250 luxurious accommodations including King and Twin Rooms, Club Floor Rooms, various Suites, Presidential Suites, Penthouses, and Apartments with kitchenettes. All rooms include marble bathrooms, large LCD satellite TV, and some suites have terraces overlooking the Park and city.

Dining includes Seasons Restaurant (breakfast, lunch, dinner buffets) and Qi 21 Restaurant on the 21st floor serving authentic Sushi and Far Eastern cuisine. Features the latest 5-star standard in leisure and business technology with high-speed internet and 24-hour laundry service.`,
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
    developer: 'GK Architects',
    location: {
      address: 'Ruby Towers Complex',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 'TBD',
    buildings: 6,
    floors: 32,
    unitTypes: [
      { type: '1+1A', grossArea: 88, netArea: 65.5, bedrooms: 1, bathrooms: 1 },
      { type: '1+1B', grossArea: 93, netArea: 69, bedrooms: 1, bathrooms: 1 },
      { type: '2+1', grossArea: 127, netArea: 94, bedrooms: 2, bathrooms: 2 },
      { type: '3+1', grossArea: 200, netArea: 150, bedrooms: 3, bathrooms: 2 },
      { type: 'VIP A1 Duplex', grossArea: 508, netArea: 389, bedrooms: 4, bathrooms: 4 },
      { type: 'VIP A2 Duplex', grossArea: 518, netArea: 398, bedrooms: 4, bathrooms: 4 },
      { type: 'VIP A3 Duplex', grossArea: 693, netArea: 523, bedrooms: 5, bathrooms: 5 },
      { type: 'VIP B1', grossArea: 460, netArea: 359, bedrooms: 3, bathrooms: 3 },
      { type: 'VIP B2 Duplex', grossArea: 729, netArea: 556, bedrooms: 4, bathrooms: 4 }
    ],
    priceRange: {
      min: 130000,
      max: 480000,
      currency: 'USD'
    },
    amenities: [
      '6 Towers (A1, A2, A3, B1, B2, B3)',
      '32 Floors per Tower',
      '4-Floor Underground Parking',
      'Smart Parking System',
      '24/7 Security System',
      'Digital Surveillance',
      'Fire Protection System',
      'Central Heating/Cooling',
      'Water Purification System',
      'Central Generator',
      'Shopping Mall',
      'Restaurant',
      'Cafe',
      'Fitness Center',
      'Kindergarten',
      'Central Garden with Fountains',
      'Green Landscaped Areas',
      'Modern Lobby with Living Wall'
    ],
    images: [
      '/images/projects/ruby-towers/page03_img01.jpeg',
      '/images/projects/ruby-towers/page04_img01.jpeg',
      '/images/projects/ruby-towers/page05_img01.jpeg'
    ],
    image: '/images/projects/ruby-towers/page03_img01.jpeg',
    gallery: [
      '/images/projects/ruby-towers/page25_img01.jpeg',
      '/images/projects/ruby-towers/page26_img01.jpeg',
      '/images/projects/ruby-towers/page27_img01.jpeg',
      '/images/projects/ruby-towers/page28_img01.jpeg',
      '/images/projects/ruby-towers/page29_img01.jpeg',
      '/images/projects/ruby-towers/page30_img01.jpeg',
      '/images/projects/ruby-towers/page31_img01.jpeg',
      '/images/projects/ruby-towers/page34_img01.jpeg',
      '/images/projects/ruby-towers/page35_img01.jpeg',
      '/images/projects/ruby-towers/page36_img01.jpeg',
      '/images/projects/ruby-towers/page37_img01.jpeg',
      '/images/projects/ruby-towers/page38_img01.jpeg',
      '/images/projects/ruby-towers/page39_img01.jpeg',
      '/images/projects/ruby-towers/page40_img01.jpeg',
      '/images/projects/ruby-towers/page41_img01.jpeg',
      '/images/projects/ruby-towers/page42_img01.jpeg',
      '/images/projects/ruby-towers/page43_img01.jpeg',
      '/images/projects/ruby-towers/page44_img01.jpeg',
      '/images/projects/ruby-towers/page45_img01.jpeg',
      '/images/projects/ruby-towers/page46_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/ruby-towers/page06_img01.jpeg',
      '/images/projects/ruby-towers/page07_img01.jpeg',
      '/images/projects/ruby-towers/page08_img01.jpeg',
      '/images/projects/ruby-towers/page09_img01.jpeg',
      '/images/projects/ruby-towers/page10_img01.jpeg',
      '/images/projects/ruby-towers/page11_img01.jpeg',
      '/images/projects/ruby-towers/page12_img01.jpeg',
      '/images/projects/ruby-towers/page13_img01.jpeg',
      '/images/projects/ruby-towers/page14_img01.jpeg',
      '/images/projects/ruby-towers/page15_img01.jpeg',
      '/images/projects/ruby-towers/page16_img01.jpeg',
      '/images/projects/ruby-towers/page17_img01.jpeg',
      '/images/projects/ruby-towers/page18_img01.jpeg',
      '/images/projects/ruby-towers/page19_img01.jpeg',
      '/images/projects/ruby-towers/page20_img01.jpeg',
      '/images/projects/ruby-towers/page21_img01.jpeg',
      '/images/projects/ruby-towers/page22_img01.jpeg',
      '/images/projects/ruby-towers/page23_img01.jpeg',
      '/images/projects/ruby-towers/page24_img01.jpeg',
      '/images/projects/ruby-towers/page32_img01.jpeg',
      '/images/projects/ruby-towers/page33_img01.jpeg'
    ],
    description: `Ruby Towers - "A Brilliant Life Begins" - is a prestigious development in Erbil designed by GK Architects. The complex features 6 towers (A1, A2, A3, B1, B2, B3) rising 32 floors each.

Unit options range from compact 1+1 apartments (88-93 sqm) to spacious 3+1 units (200 sqm), plus exclusive VIP duplex penthouses on floors 28-31 reaching up to 729 sqm. Each tower features carefully designed floor plans maximizing space and natural light.

Located 3.7 km from city center and 19.8 km from the airport, with easy access to universities (2.8 km) and malls (4 km). The complex includes 4 floors of underground parking with smart guidance systems, shopping mall, restaurant, cafe, fitness center, kindergarten, and beautiful central gardens with fountains.`,
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
    name: 'Queen Tower',
    location: {
      address: 'Queen Tower, NazNaz Area',
      city: 'Erbil',
      district: 'NazNaz',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 570,
    priceRange: {
      min: 63000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2022',
    amenities: [
      'Twin Tower Design (Building A & B)',
      '30 Typical Floors Per Building',
      '36 Total Floors',
      'Building A: 11 Units/Floor',
      'Building B: 8 Units/Floor',
      'Studios to 4-Bedroom Units',
      'Hot Kitchen in Large Units',
      'En-Suite Bathrooms',
      'Multiple Balconies',
      'Laundry Rooms',
      '24/7 Security',
      '24/7 Services',
      'Elevator Access',
      'Covered Parking',
      'Near The Boulevard'
    ],
    images: [
      '/images/projects/queen-towers/page01_img01.jpeg',
      '/images/projects/queen-towers/page04_img01.jpeg',
      '/images/projects/queen-towers/page17_img01.jpeg'
    ],
    image: '/images/projects/queen-towers/page01_img01.jpeg',
    gallery: [
      '/images/projects/queen-towers/page01_img01.jpeg',
      '/images/projects/queen-towers/page04_img01.jpeg',
      '/images/projects/queen-towers/page06_img01.jpeg',
      '/images/projects/queen-towers/page07_img01.jpeg',
      '/images/projects/queen-towers/page08_img01.jpeg',
      '/images/projects/queen-towers/page11_img01.jpeg',
      '/images/projects/queen-towers/page16_img01.jpeg',
      '/images/projects/queen-towers/page17_img01.jpeg',
      '/images/projects/queen-towers/page22_img01.jpeg',
      '/images/projects/queen-towers/page25_img01.jpeg',
      '/images/projects/queen-towers/page26_img01.jpeg',
      '/images/projects/queen-towers/page27_img01.jpeg',
      '/images/projects/queen-towers/page39_img01.jpeg',
      '/images/projects/queen-towers/page40_img01.jpeg',
      '/images/projects/queen-towers/page41_img01.jpeg',
      '/images/projects/queen-towers/page51_img01.jpeg',
      '/images/projects/queen-towers/page53_img01.jpeg',
      '/images/projects/queen-towers/page58_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/queen-towers/page28_img02.jpeg',
      '/images/projects/queen-towers/page30_img02.jpeg',
      '/images/projects/queen-towers/page31_img02.jpeg',
      '/images/projects/queen-towers/page32_img02.jpeg',
      '/images/projects/queen-towers/page34_img02.jpeg',
      '/images/projects/queen-towers/page35_img02.jpeg',
      '/images/projects/queen-towers/page36_img02.jpeg',
      '/images/projects/queen-towers/page43_img01.jpeg',
      '/images/projects/queen-towers/page44_img02.jpeg',
      '/images/projects/queen-towers/page45_img02.jpeg',
      '/images/projects/queen-towers/page46_img02.jpeg',
      '/images/projects/queen-towers/page47_img02.jpeg'
    ],
    description: `Queen Tower is a modern twin-tower residential development in NazNaz area featuring Building A (11 units per floor) and Building B (8 units per floor), totaling approximately 570 apartments across 30 typical floors per building.

Building A offers 11 unit types: Studios (0+1) at 63 sqm, 1-Bedroom (1+1) from 77-115 sqm, 2-Bedroom (2+1) from 126-156 sqm, 3-Bedroom (3+1) from 175-206 sqm, and 4-Bedroom (4+1) at 240 sqm with 50 sqm balcony. Building B features 8 unit types with similar configurations.

Larger units (3+1 and 4+1) include separate hot kitchens for cooking odor separation, a common Middle Eastern design feature. Master bedrooms feature en-suite bathrooms, and most units have generous balconies (8-50 sqm). Net-to-gross efficiency is 80-85%.

With its prime location near The Boulevard and comprehensive facilities, Queen Tower offers diverse options from investment studios to spacious family apartments.`,
    propertyIds: [
      'queen-towers-store-1',
      'queen-towers-store-2',
      'queen-towers-store-3',
      'queen-towers-store-4',
      'queen-towers-studio-floor-25-rent',
      'queen-towers-studio-floor-25-sale',
      'queen-towers-studio-floor-29-rent',
      'queen-towers-studio-floor-29-sale'
    ]
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
  },
  {
    id: 'salam-residences',
    name: 'Salam Residences',
    developer: 'Salam Group',
    location: {
      address: 'Salam Residences Complex',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 800,
    priceRange: {
      min: 84000,
      max: 189000,
      currency: 'USD'
    },
    completionDate: '2025',
    amenities: [
      'Multiple High-Rise Towers',
      '1+1, 2+1, 3+1 Apartments',
      'Boulevard-Facing Units',
      'Inner Courtyard Units',
      'Modern Open-Plan Living',
      'Fitted Kitchens',
      'En-Suite Bathrooms',
      'Private Balconies',
      '5-Year Payment Plans',
      'Low Monthly Installments',
      '24/7 Security',
      'Covered Parking',
      'Landscaped Gardens',
      'Children\'s Play Area'
    ],
    images: [
      '/images/projects/salam-residences/page04_img01.jpeg',
      '/images/projects/salam-residences/page06_img01.jpeg',
      '/images/projects/salam-residences/page16_img01.jpeg'
    ],
    image: '/images/projects/salam-residences/page04_img01.jpeg',
    gallery: [
      '/images/projects/salam-residences/page04_img01.jpeg',
      '/images/projects/salam-residences/page05_img01.jpeg',
      '/images/projects/salam-residences/page06_img01.jpeg',
      '/images/projects/salam-residences/page07_img01.jpeg',
      '/images/projects/salam-residences/page08_img01.jpeg',
      '/images/projects/salam-residences/page15_img01.jpeg',
      '/images/projects/salam-residences/page16_img01.jpeg',
      '/images/projects/salam-residences/page19_img01.jpeg',
      '/images/projects/salam-residences/page21_img01.jpeg',
      '/images/projects/salam-residences/page26_img01.jpeg',
      '/images/projects/salam-residences/page28_img01.jpeg',
      '/images/projects/salam-residences/page33_img01.jpeg',
      '/images/projects/salam-residences/page38_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/salam-residences/page17_img01.jpeg',
      '/images/projects/salam-residences/page18_img01.jpeg',
      '/images/projects/salam-residences/page20_img01.jpeg',
      '/images/projects/salam-residences/page22_img01.jpeg',
      '/images/projects/salam-residences/page23_img01.jpeg',
      '/images/projects/salam-residences/page24_img01.jpeg',
      '/images/projects/salam-residences/page25_img01.jpeg',
      '/images/projects/salam-residences/page27_img01.jpeg',
      '/images/projects/salam-residences/page29_img01.jpeg',
      '/images/projects/salam-residences/page30_img01.jpeg',
      '/images/projects/salam-residences/page31_img01.jpeg',
      '/images/projects/salam-residences/page32_img01.jpeg',
      '/images/projects/salam-residences/page34_img01.jpeg',
      '/images/projects/salam-residences/page35_img01.jpeg',
      '/images/projects/salam-residences/page36_img01.jpeg',
      '/images/projects/salam-residences/page37_img01.jpeg'
    ],
    description: `Salam Residences is a modern high-rise residential development offering affordable luxury apartments with flexible payment plans. Multiple towers provide a range of unit types across Blocks A, B, C, and D.

Unit configurations include 1+1 (75-81 sqm, from $84,000), 2+1 (102-125 sqm, from $119,000-$145,000), and 3+1 (132-155 sqm, from $159,000-$189,000). Boulevard-facing units command premium pricing while inner courtyard units offer value options.

Payment plans make ownership accessible: deposits from $20,000-$40,000, monthly installments from $500-$1,400 over approximately 80 months. All units feature modern open-plan layouts, fitted kitchens, en-suite bathrooms, and private balconies.

Salam Residences appeals to first-time buyers and investors seeking quality apartments with manageable payment terms in a growing Erbil neighborhood.`,
    propertyIds: []
  },
  {
    id: 'rami-towers',
    name: 'Rami Towers',
    developer: 'Rami Holding',
    location: {
      address: '100m Street, next to English Village',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 2872,
    priceRange: {
      min: 70000,
      max: 400000,
      currency: 'USD'
    },
    completionDate: '2025',
    amenities: [
      '10 Blocks (A1-A5, B1-B3, C1-C2)',
      '31 Floors Per Block',
      '38,450 sqm Land Area',
      '11,500 sqm Commercial Space',
      '17,857 sqm Terrace Gardens',
      '18,000 sqm Landscape Areas',
      'Swimming Pool',
      'Fitness Center',
      'Cafes & Restaurants',
      'Nursery & Kindergarten',
      'Children\'s Playground',
      'Walking & Cycling Trails',
      'Electric Car Charging',
      'Water Purification System',
      'Fire Detection Systems',
      'CCTV & 24/7 Security',
      'Private Parking Per Unit',
      'Roof Terrace Gardens',
      'Interior Gardens'
    ],
    images: [
      '/images/projects/rami-towers/page04_img02.jpeg',
      '/images/projects/rami-towers/page10_img02.jpeg',
      '/images/projects/rami-towers/page20_img02.jpeg'
    ],
    image: '/images/projects/rami-towers/page04_img02.jpeg',
    gallery: [
      '/images/projects/rami-towers/page04_img02.jpeg',
      '/images/projects/rami-towers/page10_img02.jpeg',
      '/images/projects/rami-towers/page11_img02.jpeg',
      '/images/projects/rami-towers/page18_img02.jpeg',
      '/images/projects/rami-towers/page20_img02.jpeg',
      '/images/projects/rami-towers/page22_img02.jpeg',
      '/images/projects/rami-towers/page24_img02.jpeg',
      '/images/projects/rami-towers/page30_img01.jpeg',
      '/images/projects/rami-towers/page34_img01.jpeg',
      '/images/projects/rami-towers/page40_img02.jpeg',
      '/images/projects/rami-towers/page76_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/rami-towers/page57_img01.jpeg',
      '/images/projects/rami-towers/page59_img01.jpeg',
      '/images/projects/rami-towers/page65_img01.jpeg',
      '/images/projects/rami-towers/page67_img01.jpeg',
      '/images/projects/rami-towers/page73_img01.jpeg'
    ],
    description: `Rami Towers by Rami Holding (operating since 2011) is a landmark 10-block residential development on 38,450 sqm, featuring 2,872 residences across 31 floors per block. Located on the 100m Street next to English Village, near Sami Abdulrahman Park, Italian Village, Roya Tower, Empire World, and Dream City.

Unit types include Studios (1+0) at 70-80 sqm, 1-Bedroom (1+1) at 90-115 sqm, 2-Bedroom (2+1) at 160-170 sqm, and 3-Bedroom (3+1) at 210-225 sqm. Contemporary luxury interiors feature marble floors, fitted kitchens, floor-to-ceiling windows, and modern bathrooms.

The development includes 11,500 sqm of commercial retail, 17,857 sqm of terrace gardens, and 18,000 sqm of landscapes. Amenities include swimming pool, fitness center, nursery, kindergarten, playgrounds, walking/cycling trails, cafes, and restaurants.

Smart features include automatic irrigation, water purification, fire detection, EV charging stations, and 24/7 CCTV security. "Life is Better with Frames That Suit You."`,
    propertyIds: []
  },
  {
    id: 'spanish-village',
    name: 'Spanish Village',
    developer: 'Alcor Group',
    location: {
      address: '150m Ring Road Street',
      city: 'Erbil',
      district: 'Pirmam',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 327,
    priceRange: {
      min: 280000,
      max: 550000,
      currency: 'USD'
    },
    completionDate: '2025',
    amenities: [
      '327 Luxury Villas',
      'Spanish Architecture',
      '3 Villa Types (A, B, C)',
      '4 Bedrooms Per Villa',
      'Type A & B: 430 sqm',
      'Type C: 610 sqm',
      '15,000+ sqm Central Park',
      'Swimming Pool',
      'BBQ Zone',
      'Walking & Jogging Track',
      'Children Playground',
      'Picnic Lawns',
      'Retail Outlets',
      'Shopping Areas',
      'Football Field',
      'Tennis Courts',
      'Panoramic Erbil Views',
      '30 min to City Center',
      '20 min to Airport'
    ],
    images: [
      '/images/projects/spanish-village/page03_img01.jpeg',
      '/images/projects/spanish-village/page05_img01.jpeg',
      '/images/projects/spanish-village/page06_img01.jpeg'
    ],
    image: '/images/projects/spanish-village/page03_img01.jpeg',
    gallery: [
      '/images/projects/spanish-village/page07_img01.jpeg',
      '/images/projects/spanish-village/page08_img01.jpeg',
      '/images/projects/spanish-village/page10_img01.jpeg',
      '/images/projects/spanish-village/page14_img01.jpeg',
      '/images/projects/spanish-village/page18_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/spanish-village/page11_img27.png',
      '/images/projects/spanish-village/page15_img01.jpeg',
      '/images/projects/spanish-village/page19_img01.jpeg'
    ],
    description: `Spanish Village by Alcor Group is a luxury villa community of 327 units on the 150m ring road, featuring authentic Spanish architecture with panoramic views of Erbil.

Three villa types available: Type A (430 sqm on 320 sqm plot) and Type B (430 sqm) feature 4 bedrooms, 5 bathrooms, garage, garden, and balconies up to 30 sqm. Type C (610 sqm on 500 sqm plot) includes servant room, multiple terraces, and 4+ balconies totaling 40+ sqm.

All villas feature ground + first floor layouts with master bedrooms, hot kitchens, living rooms, laundry, and walk-in closets. Gardens range from 7m wide to 16+ sqm private outdoor spaces.

Community amenities include 15,000+ sqm central park, swimming pool, BBQ zone, jogging tracks, playgrounds, retail outlets, football field, and tennis courts. Located 30 min to city center, 20 min to airport.`,
    propertyIds: []
  },
  {
    id: 'aram-towers',
    name: 'Aram Towers',
    developer: 'Aram Group',
    location: {
      address: '150m Street, opposite Erbil Hills',
      city: 'Erbil',
      district: 'Ankawa',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 700,
    priceRange: {
      min: 108000,
      max: 500000,
      currency: 'USD'
    },
    completionDate: '2026',
    amenities: [
      '5 Residential Towers (30 floors)',
      '2 Business Towers (18 floors)',
      '32,000 sqm Total Area',
      '14,000 sqm Landscape',
      '200 Luxury Offices',
      '1,400 Parking Spaces',
      '40+ Amenities',
      '3m Ceiling Height',
      '5-Year Warranty (First in Iraq)',
      'Smart Home Technology',
      'Indoor Infinity Pool',
      'SPA & Gym',
      'Rooftop Dining 360°',
      'Nursery & Kindergarten',
      'Pet-Friendly Spaces',
      'EV Charging Points',
      'Golf Course Views',
      'Arabia Awards Winner 2025-2026'
    ],
    images: [
      '/images/projects/aram-towers/page04_img03.jpeg',
      '/images/projects/aram-towers/page05_img01.jpeg',
      '/images/projects/aram-towers/page06_img01.jpeg'
    ],
    image: '/images/projects/aram-towers/page04_img03.jpeg',
    gallery: [
      '/images/projects/aram-towers/page07_img01.jpeg',
      '/images/projects/aram-towers/page13_img01.jpeg',
      '/images/projects/aram-towers/page15_img01.jpeg',
      '/images/projects/aram-towers/page17_img01.jpeg',
      '/images/projects/aram-towers/page28_img01.jpeg',
      '/images/projects/aram-towers/page29_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/aram-towers/page23_img03.png',
      '/images/projects/aram-towers/page24_img01.png',
      '/images/projects/aram-towers/page25_img01.png'
    ],
    description: `Aram Towers by Aram Group is "The Paramount of Erbil" - an award-winning mixed-use development featuring 5 residential towers (30 floors) and 2 business towers (18 floors) on 32,000 sqm opposite Erbil Hills Golf Course.

Winner of Arabia Property Awards 2025-2026 for Mixed-Use, Office, and Residential High-Rise Development (Iraq). The first project in Iraq with 5-year warranty coverage.

Residential units include 1+1 (108-153 sqm), 2+1 (170-234 sqm), 3+1 (240-281 sqm), 3+2 (340 sqm), and 4+1 (345 sqm) with balconies up to 42 sqm. Type A towers (A, B, D) and Type B towers (C, E) offer different configurations. 200 offices range from 99-260 sqm.

40+ amenities include indoor infinity pool, spa, gym, 360° rooftop dining, nursery, kindergarten, pet-friendly spaces, EV charging, and panoramic golf course views. 5 min to airport, 10 min to Sami Abdulrahman Park.`,
    propertyIds: []
  },
  {
    id: 'empire-square',
    name: 'Empire Square',
    developer: 'Empire World',
    location: {
      address: 'Northwest of Empire World, near 100M Street',
      city: 'Erbil',
      district: 'Empire',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 720,
    priceRange: {
      min: 130000,
      max: 280000,
      currency: 'USD'
    },
    completionDate: '2025',
    amenities: [
      '4 Buildings (ES1, ES2, ES3, ES4)',
      '168,497 sqm Total Area',
      '720 Apartments',
      '3.3m Ceiling Height',
      '1+1, 2+1, 4+1 Units',
      'LPG Central Gas System',
      'Garbage Chute System',
      'Linear Grill AC',
      'Large Windows',
      'Luxury Restaurants',
      'Commercial Spaces',
      'Near Erbil Airport',
      'Near Sami Abdulrahman Park',
      'Views of Empire World'
    ],
    images: [
      '/images/projects/empire-square/page01_img01.jpeg',
      '/images/projects/empire-square/page14_img01.jpeg',
      '/images/projects/empire-square/page56_img01.jpeg'
    ],
    image: '/images/projects/empire-square/page01_img01.jpeg',
    gallery: [
      '/images/projects/empire-square/page17_img01.jpeg',
      '/images/projects/empire-square/page50_img01.jpeg',
      '/images/projects/empire-square/page51_img01.jpeg',
      '/images/projects/empire-square/page58_img01.jpeg',
      '/images/projects/empire-square/page60_img01.jpeg',
      '/images/projects/empire-square/page61_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/empire-square/page23_img01.png',
      '/images/projects/empire-square/page35_img01.png',
      '/images/projects/empire-square/page43_img01.png'
    ],
    description: `Empire Square by Empire World is a premium residential development of 4 buildings (ES1-ES4) on 168,497 sqm northwest of the main Empire World project, offering 720 apartments with views of Empire World, 100M Street, and Zagros Road.

Unit distribution: 40 one-bedroom (1+1, 131 sqm), 600 two-bedroom (2+1, 140-178 sqm), and 80 four-bedroom (4+1, 212-217 sqm). ES1 & ES2 share 15.8% common areas while ES3 & ES4 have 15.1%. All units feature 3.3m ceilings.

Buildings ES1 & ES2 offer Types 01-05 (2+1, 143-151 sqm). ES3 & ES4 add Types 06-13 including 1+1 (131 sqm), larger 2+1 (141-178 sqm), and 4+1 (212-217 sqm with maid rooms).

Features include centralized LPG gas, garbage chute system, linear grill AC, separate kitchens, and large windows. Near Erbil Airport, Sami Abdulrahman Park, and Erbil Citadel.`,
    propertyIds: []
  },
  {
    id: 'erbil-garden',
    name: 'Erbil Garden',
    developer: 'Erbil Garden Development',
    location: {
      address: 'Erbil Garden Complex',
      city: 'Erbil',
      district: 'Pirmam Road',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 500,
    priceRange: {
      min: 150000,
      max: 500000,
      currency: 'USD'
    },
    completionDate: '2026',
    amenities: [
      'Garden Villas',
      'Modern Apartments',
      'Landscaped Gardens',
      'Swimming Pool',
      'Fitness Center',
      'Children\'s Playground',
      '24/7 Security',
      'Covered Parking',
      'Community Center',
      'Walking Paths',
      'Green Spaces',
      'Commercial Area'
    ],
    images: [
      '/images/projects/erbil-garden/page06_img01.jpeg',
      '/images/projects/erbil-garden/page09_img01.jpeg',
      '/images/projects/erbil-garden/page10_img01.jpeg'
    ],
    image: '/images/projects/erbil-garden/page06_img01.jpeg',
    gallery: [
      '/images/projects/erbil-garden/page09_img01.jpeg',
      '/images/projects/erbil-garden/page10_img01.jpeg',
      '/images/projects/erbil-garden/page11_img01.jpeg',
      '/images/projects/erbil-garden/page13_img01.jpeg',
      '/images/projects/erbil-garden/page16_img01.jpeg',
      '/images/projects/erbil-garden/page30_img01.jpeg',
      '/images/projects/erbil-garden/page31_img01.jpeg',
      '/images/projects/erbil-garden/page32_img01.jpeg',
      '/images/projects/erbil-garden/page39_img01.jpeg',
      '/images/projects/erbil-garden/page42_img01.jpeg',
      '/images/projects/erbil-garden/page49_img01.jpeg',
      '/images/projects/erbil-garden/page50_img01.jpeg',
      '/images/projects/erbil-garden/page51_img01.jpeg',
      '/images/projects/erbil-garden/page53_img01.jpeg',
      '/images/projects/erbil-garden/page54_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/erbil-garden/page21_img02.jpeg',
      '/images/projects/erbil-garden/page22_img02.jpeg',
      '/images/projects/erbil-garden/page25_img01.jpeg',
      '/images/projects/erbil-garden/page26_img01.jpeg',
      '/images/projects/erbil-garden/page28_img01.jpeg',
      '/images/projects/erbil-garden/page40_img01.jpeg'
    ],
    description: `Erbil Garden is a premium residential development offering a blend of garden villas and modern apartments in a beautifully landscaped setting. The project emphasizes green living with extensive gardens, walking paths, and outdoor amenities.

The development features multiple housing options from compact apartments to spacious villas, all surrounded by lush landscaping and mature trees. Residents enjoy access to community facilities including swimming pool, fitness center, and children's play areas.

Located on Pirmam Road with easy access to Erbil's city center, Erbil Garden offers a peaceful retreat while remaining connected to urban conveniences.`,
    propertyIds: []
  },
  {
    id: 'north-holland',
    name: 'North Holland',
    developer: 'North Holland Development',
    location: {
      address: 'North Holland Village',
      city: 'Erbil',
      district: 'North Erbil',
      country: 'Iraq'
    },
    status: 'Under Construction',
    totalUnits: 300,
    priceRange: {
      min: 180000,
      max: 450000,
      currency: 'USD'
    },
    completionDate: '2026',
    amenities: [
      'Dutch-Inspired Architecture',
      'Villas & Townhouses',
      'Canal-Side Living',
      'Windmill Features',
      'Tulip Gardens',
      'Cycling Paths',
      'Community Center',
      'Swimming Pool',
      '24/7 Security',
      'Private Gardens',
      'Underground Parking',
      'Children\'s Areas'
    ],
    images: [
      '/images/projects/north-holland/page02_img02.jpeg',
      '/images/projects/north-holland/page03_img01.jpeg',
      '/images/projects/north-holland/page04_img02.jpeg'
    ],
    image: '/images/projects/north-holland/page02_img02.jpeg',
    gallery: [
      '/images/projects/north-holland/page02_img02.jpeg',
      '/images/projects/north-holland/page03_img01.jpeg',
      '/images/projects/north-holland/page04_img02.jpeg',
      '/images/projects/north-holland/page06_img01.jpeg',
      '/images/projects/north-holland/page07_img01.jpeg',
      '/images/projects/north-holland/page08_img02.jpeg',
      '/images/projects/north-holland/page09_img01.jpeg',
      '/images/projects/north-holland/page10_img02.jpeg',
      '/images/projects/north-holland/page11_img02.jpeg',
      '/images/projects/north-holland/page12_img01.jpeg',
      '/images/projects/north-holland/page13_img01.jpeg',
      '/images/projects/north-holland/page14_img01.jpeg'
    ],
    floorPlanImages: [
      '/images/projects/north-holland/page05_img02.jpeg'
    ],
    description: `North Holland brings European charm to Erbil with Dutch-inspired architecture featuring distinctive canal-side living, windmill accents, and tulip gardens. This unique development offers a taste of Netherlands living in Kurdistan.

The community features villas and townhouses with traditional Dutch design elements including gabled roofs, brick facades, and private gardens. Cycling paths wind through the development, connecting residents to community amenities.

North Holland appeals to those seeking a distinctive European aesthetic combined with modern Middle Eastern hospitality and premium residential standards.`,
    propertyIds: []
  },
  {
    id: 'spanish-village-2',
    name: 'Spanish Village 2',
    developer: 'Chukargroup',
    location: {
      address: 'Outer Ring Road Street (150m Road)',
      city: 'Erbil',
      district: 'Outer Ring Road',
      country: 'Iraq'
    },
    status: 'Ready',
    totalUnits: 120,
    priceRange: {
      min: 300000,
      max: 950000,
      currency: 'USD'
    },
    completionDate: '2023',
    amenities: [
      'Spanish-Inspired Architecture',
      '430 sqm & 610 sqm Villas',
      '15,000 sqm Central Park',
      'Panoramic City Views',
      'Private Garden Per Villa',
      'Azure Swimming Pool',
      'Pedestrian Walkways',
      'Jogging Tracks',
      'Children\'s Playground',
      'BBQ Zones & Lawns',
      'Retail Outlets',
      'Entertainment Zones',
      '24-Hour Electricity',
      '24-Hour Water Supply',
      'Private Parking Per Villa',
      'Schools Nearby',
      'Health Centres Nearby',
      'Markets, Restaurants & Cafes Nearby'
    ],
    images: [
      '/images/projects/spanish-village-2/sv2_img01.jpg',
      '/images/projects/spanish-village-2/sv2_img02.jpg',
      '/images/projects/spanish-village-2/sv2_img03.jpg'
    ],
    image: '/images/projects/spanish-village-2/sv2_img02.jpg',
    gallery: [
      '/images/projects/spanish-village-2/sv2_img01.jpg',
      '/images/projects/spanish-village-2/sv2_img02.jpg',
      '/images/projects/spanish-village-2/sv2_img03.jpg',
      '/images/projects/spanish-village-2/sv2_img04.jpg',
      '/images/projects/spanish-village-2/sv2_img05.jpg'
    ],
    floorPlanImages: [
      '/images/projects/spanish-village-2/sv2_img03.jpg',
      '/images/projects/spanish-village-2/sv2_img04.jpg'
    ],
    description: `Spanish Village 2 (Phase II) is a prestigious independent villa community developed by Chukargroup, ideally situated in Erbil's fastest-growing area on Outer Ring Road Street. The project is just 30 minutes from Erbil city center, 20 minutes from Erbil International Airport, and 10 minutes from the main highway (120M St Road).

The community features spacious villas in two sizes — 430 sqm and 610 sqm — each boasting panoramic city views and an exquisite touch of authentic Spanish architecture. Unlike typical brick-dominated developments, Spanish Village 2 is designed around lush greenery, with vibrant private gardens for each villa and a sprawling 15,000 sqm central park at its heart.

Villa options include 4 en-suite bedrooms, multiple living and dining areas, private kitchens, dedicated parking, and generous outdoor garden space. The 430 sqm villa features a 320 sqm built area with 110 sqm allocated for an extra garden and garage.

The master plan prioritizes a pedestrian-friendly lifestyle with dedicated walkways, jogging tracks, children's playgrounds, BBQ zones, lawns, and an azure swimming pool. Retail outlets and entertainment zones are integrated within the community. Residents also benefit from proximity to schools, health centres, markets, restaurants, and cafes, making Spanish Village 2 a perfect habitat for a balanced, luxurious lifestyle in Kurdistan.`,
    propertyIds: [],
    constructionProgress: 100,
    constructionMilestones: [
      { date: '2019-Q2', title: 'Project Launch', description: 'Spanish Village Phase II launched by Chukargroup', completed: true },
      { date: '2020-Q3', title: 'Foundation Complete', description: 'Land development and foundation works completed', completed: true },
      { date: '2022-Q1', title: 'Villa Construction', description: 'Individual villa construction and landscaping underway', completed: true },
      { date: '2023-Q2', title: 'Central Park & Amenities', description: '15,000 sqm central park and community amenities finished', completed: true },
      { date: '2023-Q4', title: 'Handover Complete', description: 'All villas handed over to residents', completed: true }
    ]
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
  const completionYear = parseInt(project.completionDate || '2025') || 2025;

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
  const completionYear = parseInt(project.completionDate || '2027') || 2027;
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
      id.includes('erbil-one') || id.includes('boulevard') || id.includes('cavalli') ||
      id.includes('zaniary') || id.includes('ankawa-4') || id.includes('sarbast') ||
      id.includes('mrf') || id.includes('z-center') || id.includes('bakhtyari') ||
      id.includes('queen-towers') || id.includes('four-towers') || id.includes('park-view') ||
      id.includes('qaiwan') || id.includes('salam') || id.includes('rami') ||
      id.includes('aram-towers') || id.includes('empire-square') || id.includes('tulip')) {
    return 'tower';
  }

  // Villas & Villages
  if (id.includes('village') || name.includes('village') || id.includes('villa') ||
      id.includes('american') || id.includes('english') || id.includes('italian') ||
      id.includes('lebanese') || id.includes('garden-city') || id.includes('ganjan') ||
      id.includes('aram-village') || id.includes('zanko') || id.includes('mnara') ||
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
