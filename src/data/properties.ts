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
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
  },
  {
    name: 'Mahmood',
    phone: '+964 751 441 5003',
    email: 'info@realhouseiq.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Properties - Erbil Real Estate
// ═══════════════════════════════════════════════════════════════════════════

export const properties: Property[] = [
  {
    id: 'empire-world-penthouse',
    title: 'Empire World Luxury Penthouse',
    titleKu: 'پێنتھاوسی لوکسی ئێمپایەر وۆرڵد',
    titleAr: 'بنتهاوس فاخر امباير وورلد',
    type: 'Penthouse',
    price: 850000,
    priceIQD: 1250000000,
    status: 'Ready',
    badges: ['Hot', 'Exclusive'],
    location: {
      address: 'Empire World Tower A, Floor 35',
      city: 'Erbil',
      district: 'Ankawa',
      country: 'Iraq'
    },
    specs: {
      beds: 4,
      baths: 5,
      sqm: 420,
      yearBuilt: 2023,
      floor: 35,
      totalFloors: 40
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80'
    ],
    description: `Experience unparalleled luxury living at the iconic Empire World Tower, Erbil's premier address. This stunning penthouse offers panoramic views of the Citadel and the city skyline from the 35th floor, featuring floor-to-ceiling windows, imported Italian marble flooring, and designer finishes throughout.

The open-plan living and dining area showcases double-height ceilings and a stunning chandelier, flowing seamlessly to a private terrace perfect for entertaining. The gourmet kitchen features Miele appliances, custom cabinetry, and a large island with breakfast bar.

Four luxurious bedroom suites include a spectacular master with walk-in closet, spa-inspired bathroom with jacuzzi, and private balcony. Building amenities include 24/7 security, concierge service, infinity pool, fully-equipped gym, and underground parking.`,
    features: [
      'Panoramic City Views',
      'Private Terrace',
      'Italian Marble',
      'Smart Home System',
      '24/7 Security',
      'Concierge Service',
      'Infinity Pool',
      'Gym Access',
      'Underground Parking',
      'Central AC'
    ],
    isFeatured: true,
    isNew: true,
    virtualTourUrl: 'https://my.matterport.com/show/?m=EW2023Penthouse',
    neighborhood: {
      name: 'Ankawa',
      walkScore: 75,
      description: 'Erbil\'s most cosmopolitan neighborhood, known for its diverse community, international restaurants, and vibrant nightlife.'
    },
    agent: agents[0],
    projectName: 'Empire World'
  },
  {
    id: 'dream-city-villa',
    title: 'Dream City Modern Villa',
    titleKu: 'ڤیلای مۆدێرن دریم سیتی',
    titleAr: 'فيلا حديثة دريم سيتي',
    type: 'Villa',
    price: 650000,
    priceIQD: 955000000,
    status: 'Ready',
    badges: ['New'],
    location: {
      address: 'Block D, House 45',
      city: 'Erbil',
      district: 'Dream City',
      country: 'Iraq'
    },
    specs: {
      beds: 5,
      baths: 6,
      sqm: 550,
      yearBuilt: 2024
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80'
    ],
    description: `Stunning contemporary villa in the exclusive Dream City gated community, offering the perfect blend of luxury and family-friendly living. This newly built residence features clean lines, expansive windows, and premium finishes throughout.

The ground floor offers an open-concept living area with designer kitchen featuring Bosch appliances, a formal dining room, and a cozy family room opening to the landscaped garden. A guest suite with en-suite bathroom provides privacy for visitors.

Upstairs, four spacious bedrooms include a master suite with walk-in closet, luxury bathroom, and private balcony overlooking the garden. The basement features a home theater, gym, and additional storage. Outdoor amenities include a private swimming pool, BBQ area, and two-car garage.`,
    features: [
      'Private Pool',
      'Home Theater',
      'Private Gym',
      'Landscaped Garden',
      'Two-Car Garage',
      'Gated Community',
      '24/7 Security',
      'Central AC',
      'BBQ Area',
      'Smart Home'
    ],
    isFeatured: true,
    isNew: true,
    lotSize: 800,
    neighborhood: {
      name: 'Dream City',
      walkScore: 45,
      description: 'An exclusive gated community offering world-class amenities, international schools, and a family-friendly environment.'
    },
    agent: agents[1]
  },
  {
    id: 'italian-village-townhouse',
    title: 'Italian Village Townhouse',
    titleKu: 'خانووی گوندی ئیتاڵی',
    titleAr: 'تاون هاوس القرية الإيطالية',
    type: 'Townhouse',
    price: 380000,
    priceIQD: 558000000,
    status: 'For Sale',
    badges: ['Installment'],
    location: {
      address: 'Via Roma 28',
      city: 'Erbil',
      district: 'Italian Village',
      country: 'Iraq'
    },
    specs: {
      beds: 4,
      baths: 4,
      sqm: 320,
      yearBuilt: 2022
    },
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752734-c2e1ea1a42c0?w=800&q=80'
    ],
    description: `Charming Mediterranean-style townhouse in the prestigious Italian Village, where European elegance meets Kurdish hospitality. This beautifully designed home features traditional Italian architecture with terracotta roofs, arched doorways, and wrought-iron details.

The main level showcases a bright living room with fireplace, formal dining room, and modern kitchen with granite countertops and European appliances. French doors lead to a private courtyard with fountain and mature landscaping.

Three bedrooms upstairs include a master suite with en-suite bathroom and balcony overlooking the piazza. A rooftop terrace offers stunning views of the surrounding neighborhood. The community features Italian-style cafes, restaurants, and a central plaza for community gatherings.`,
    features: [
      'Private Courtyard',
      'Rooftop Terrace',
      'Fireplace',
      'European Design',
      'Community Plaza',
      'Walking Trails',
      'Restaurant Access',
      'Central Location',
      'Parking Space',
      'Storage Room'
    ],
    isFeatured: true,
    isNew: false,
    paymentPlan: '50% down, 50% over 24 months',
    neighborhood: {
      name: 'Italian Village',
      walkScore: 82,
      description: 'A unique Mediterranean-themed community with Italian architecture, piazzas, and a vibrant café culture.'
    },
    agent: agents[2]
  },
  {
    id: 'gulan-tower-apartment',
    title: 'Gulan Tower Luxury Apartment',
    titleKu: 'ئاپارتمانی لوکسی بورجی گوڵان',
    titleAr: 'شقة فاخرة برج جولان',
    type: 'Apartment',
    price: 185000,
    priceIQD: 272000000,
    rentPrice: 1500,
    status: 'For Sale',
    badges: ['Hot'],
    location: {
      address: 'Gulan Tower, Floor 18',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    specs: {
      beds: 3,
      baths: 2,
      sqm: 180,
      yearBuilt: 2021,
      floor: 18,
      totalFloors: 28
    },
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752227-652a51f4a5b5?w=800&q=80'
    ],
    description: `Modern high-rise living in the heart of Gulan, one of Erbil's most sought-after neighborhoods. This elegant apartment offers breathtaking city views and premium finishes throughout.

The spacious open-plan layout features a contemporary living room with floor-to-ceiling windows, a dining area for eight guests, and a fully-equipped kitchen with modern appliances. Porcelain tile flooring and recessed lighting create a sophisticated ambiance.

Three comfortable bedrooms include a master with en-suite bathroom and walk-in closet. Building amenities include 24-hour reception, fitness center, children's play area, and secure underground parking. Close proximity to Family Mall, restaurants, and international schools.`,
    features: [
      'City Views',
      '24/7 Reception',
      'Fitness Center',
      'Underground Parking',
      'Children\'s Play Area',
      'Near Family Mall',
      'Central AC',
      'Modern Kitchen',
      'Balcony',
      'Storage Unit'
    ],
    isFeatured: false,
    isNew: false,
    neighborhood: {
      name: 'Gulan',
      walkScore: 88,
      description: 'A bustling commercial and residential district with shopping centers, restaurants, and excellent connectivity.'
    },
    agent: agents[0]
  },
  {
    id: 'dilan-luxury-villa',
    title: 'Dilan Residence Executive Villa',
    titleKu: 'ڤیلای جێبەجێکار دیلان',
    titleAr: 'فيلا تنفيذية ديلان ريزيدنس',
    type: 'Villa',
    price: 520000,
    priceIQD: 764000000,
    status: 'Ready',
    badges: ['Exclusive', 'New'],
    location: {
      address: 'Dilan Residence, Phase 2',
      city: 'Erbil',
      district: 'Dilan',
      country: 'Iraq'
    },
    specs: {
      beds: 4,
      baths: 5,
      sqm: 420,
      yearBuilt: 2024
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80'
    ],
    description: `Experience refined living in this stunning executive villa at Dilan Residence, one of Erbil's most prestigious gated communities. This newly completed home combines contemporary design with timeless elegance.

The ground floor features an impressive entrance foyer, formal living room with coffered ceilings, elegant dining room, and a state-of-the-art kitchen with island and premium appliances. A family room and guest suite complete the main level.

Upstairs offers three spacious bedrooms including a luxurious master suite with sitting area, dual vanity bathroom, and private balcony. The landscaped garden features a covered outdoor living area, lawn, and two-car garage. Community amenities include parks, jogging trails, and 24/7 security.`,
    features: [
      'Gated Community',
      'Landscaped Garden',
      'Two-Car Garage',
      'Central AC',
      'Smart Home',
      '24/7 Security',
      'Jogging Trails',
      'Community Parks',
      'Premium Finishes',
      'Maid\'s Room'
    ],
    isFeatured: true,
    isNew: true,
    lotSize: 600,
    neighborhood: {
      name: 'Dilan',
      walkScore: 52,
      description: 'A premium residential area known for its spacious villas, green spaces, and family-oriented community.'
    },
    agent: agents[1]
  },
  {
    id: 'majidi-mall-commercial',
    title: 'Majidi Mall Commercial Space',
    titleKu: 'شوێنی بازرگانی ماجیدی مۆڵ',
    titleAr: 'مساحة تجارية ماجدي مول',
    type: 'Commercial',
    price: 450000,
    priceIQD: 661000000,
    rentPrice: 4500,
    status: 'For Sale',
    badges: ['Hot', 'Installment'],
    location: {
      address: 'Majidi Mall, Ground Floor',
      city: 'Erbil',
      district: '100 Meter Road',
      country: 'Iraq'
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 120,
      yearBuilt: 2020
    },
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&q=80',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=80',
      'https://images.unsplash.com/photo-1606836576983-8b458e75221d?w=800&q=80',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80'
    ],
    description: `Prime retail opportunity in Majidi Mall, Erbil's premier shopping destination. This ground-floor unit offers excellent visibility and high foot traffic, perfect for retail, F&B, or service businesses.

The space features an open layout with 4-meter ceiling height, modern electrical and plumbing infrastructure, and central air conditioning. Large storefront windows provide excellent natural light and visibility.

Located near the main entrance with direct access from the parking area. The mall attracts over 50,000 visitors weekly and houses international brands, restaurants, and entertainment options. Ideal for investors seeking stable rental income or business owners.`,
    features: [
      'High Foot Traffic',
      'Ground Floor',
      'Near Main Entrance',
      'Central AC',
      'Modern Infrastructure',
      'Parking Access',
      '24/7 Security',
      'Loading Area',
      'Fire Safety System',
      'Flexible Layout'
    ],
    isFeatured: false,
    isNew: false,
    paymentPlan: '40% down, 60% over 36 months',
    neighborhood: {
      name: '100 Meter Road',
      walkScore: 92,
      description: 'Erbil\'s main commercial artery, home to major malls, hotels, and business centers.'
    },
    agent: agents[2]
  },
  {
    id: 'city-star-duplex',
    title: 'City Star Duplex Apartment',
    titleKu: 'دووپلێکس سیتی ستار',
    titleAr: 'شقة دوبلكس سيتي ستار',
    type: 'Duplex',
    price: 295000,
    priceIQD: 433000000,
    status: 'For Sale',
    badges: ['New', 'Discount'],
    location: {
      address: 'City Star Tower, Floors 22-23',
      city: 'Erbil',
      district: 'Nawroz',
      country: 'Iraq'
    },
    specs: {
      beds: 4,
      baths: 3,
      sqm: 280,
      yearBuilt: 2023,
      floor: 22,
      totalFloors: 30
    },
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80'
    ],
    description: `Unique duplex living in the prestigious City Star Tower, offering the space and privacy of a house with the convenience of apartment living. This stunning two-level home spans floors 22 and 23 with breathtaking views.

The lower level features an open living and dining area with double-height ceiling, modern kitchen with breakfast bar, and a powder room. Floor-to-ceiling windows flood the space with natural light and frame stunning city views.

A sculptural staircase leads to the upper level with three bedrooms including a spacious master suite with walk-in closet and luxury bathroom. A private balcony on each level offers outdoor living space. Special 15% discount for cash buyers.`,
    features: [
      'Duplex Layout',
      'Double-Height Ceiling',
      'City Views',
      'Modern Design',
      'Two Balconies',
      '24/7 Security',
      'Gym Access',
      'Swimming Pool',
      'Underground Parking',
      'Storage Room'
    ],
    isFeatured: false,
    isNew: true,
    neighborhood: {
      name: 'Nawroz',
      walkScore: 78,
      description: 'A rapidly developing area with modern high-rises, parks, and excellent connectivity to the city center.'
    },
    agent: agents[0]
  },
  {
    id: 'shorsh-land',
    title: 'Shorsh Investment Land',
    titleKu: 'زەوی وەبەرهێنان شۆڕش',
    titleAr: 'أرض استثمارية شورش',
    type: 'Land',
    price: 180000,
    priceIQD: 265000000,
    status: 'For Sale',
    badges: ['Hot'],
    location: {
      address: 'Shorsh District, Block 5',
      city: 'Erbil',
      district: 'Shorsh',
      country: 'Iraq'
    },
    specs: {
      beds: 0,
      baths: 0,
      sqm: 400,
      yearBuilt: 0
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80',
      'https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=800&q=80',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80'
    ],
    description: `Excellent investment opportunity in the rapidly developing Shorsh district. This prime residential plot offers the perfect canvas for building your dream home or investment property.

The land features a regular shape ideal for construction, with all utilities available including electricity, water, and sewage connections. Located in a well-established neighborhood with paved roads and street lighting.

Surrounded by quality residential developments with easy access to schools, mosques, and shopping areas. The area has seen significant appreciation in recent years and continues to attract families seeking quality housing.`,
    features: [
      'Residential Zoning',
      'All Utilities Available',
      'Regular Shape',
      'Paved Roads',
      'Near Schools',
      'Growing Area',
      'Clear Title',
      'Immediate Transfer',
      'Corner Plot',
      'Future Potential'
    ],
    isFeatured: false,
    isNew: false,
    lotSize: 400,
    neighborhood: {
      name: 'Shorsh',
      walkScore: 65,
      description: 'An established residential area experiencing significant development and infrastructure improvements.'
    },
    agent: agents[1]
  },
  {
    id: 'english-village-villa',
    title: 'English Village Premium Villa',
    titleKu: 'ڤیلای پریمیۆم گوندی ئینگلیزی',
    titleAr: 'فيلا فاخرة القرية الإنجليزية',
    type: 'Villa',
    price: 720000,
    priceIQD: 1058000000,
    status: 'Ready',
    badges: ['Exclusive'],
    location: {
      address: 'English Village, Phase 1',
      city: 'Erbil',
      district: 'English Village',
      country: 'Iraq'
    },
    specs: {
      beds: 5,
      baths: 6,
      sqm: 600,
      yearBuilt: 2022
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
      'https://images.unsplash.com/photo-1600563438938-a9a27215b72e?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80',
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&q=80'
    ],
    description: `Magnificent villa in the prestigious English Village, an exclusive community inspired by traditional British architecture. This exceptional residence offers timeless elegance combined with modern comfort.

The grand entrance leads to a formal living room with fireplace, elegant dining room, and a study/library. The chef's kitchen features custom cabinetry, marble countertops, and premium appliances opening to a family room with garden views.

Five luxurious bedroom suites include a master wing with sitting area, spa-like bathroom, and private terrace. The basement offers a home cinema, wine cellar, and additional storage. The landscaped garden features a covered pergola, fountain, and private pool.`,
    features: [
      'Private Pool',
      'Home Cinema',
      'Wine Cellar',
      'Fireplace',
      'Study/Library',
      'Maid\'s Quarter',
      'Three-Car Garage',
      'Landscaped Garden',
      'British Architecture',
      'Premium Location'
    ],
    isFeatured: false,
    isNew: false,
    lotSize: 900,
    neighborhood: {
      name: 'English Village',
      walkScore: 42,
      description: 'An upscale gated community featuring British-style architecture, manicured gardens, and a refined atmosphere.'
    },
    agent: agents[2]
  },
  {
    id: 'rotana-serviced-apartment',
    title: 'Rotana Serviced Apartment',
    titleKu: 'ئاپارتمانی خزمەتگوزاری ڕۆتانا',
    titleAr: 'شقة فندقية روتانا',
    type: 'Apartment',
    price: 220000,
    priceIQD: 323000000,
    rentPrice: 2500,
    status: 'For Sale',
    badges: ['Hot', 'Installment'],
    location: {
      address: 'Rotana Hotel & Residences',
      city: 'Erbil',
      district: 'Gulan',
      country: 'Iraq'
    },
    specs: {
      beds: 2,
      baths: 2,
      sqm: 140,
      yearBuilt: 2019,
      floor: 12,
      totalFloors: 25
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80'
    ],
    description: `Investment opportunity in the iconic Rotana Hotel & Residences, offering hotel-grade amenities with the benefits of ownership. This fully furnished apartment provides hassle-free living or excellent rental income.

Elegantly appointed with designer furniture, high-quality finishes, and a fully equipped kitchen. The open living and dining area offers city views, while two comfortable bedrooms provide restful retreats.

Enjoy access to Rotana's world-class amenities including multiple restaurants, spa, fitness center, swimming pool, and 24-hour room service. Professional property management ensures strong rental returns for investors.`,
    features: [
      'Fully Furnished',
      'Hotel Amenities',
      'Room Service',
      'Swimming Pool',
      'Spa Access',
      'Fitness Center',
      'Multiple Restaurants',
      'Concierge Service',
      'Valet Parking',
      'Rental Management'
    ],
    isFeatured: false,
    isNew: false,
    paymentPlan: '30% down, 70% over 48 months',
    neighborhood: {
      name: 'Gulan',
      walkScore: 88,
      description: 'A bustling commercial and residential district with shopping centers, restaurants, and excellent connectivity.'
    },
    agent: agents[0]
  },
  {
    id: 'lawan-city-offplan',
    title: 'Lawan City Off-Plan Villa',
    titleKu: 'ڤیلای لەوان سیتی',
    titleAr: 'فيلا لاوان سيتي قيد الإنشاء',
    type: 'Villa',
    price: 280000,
    priceIQD: 411000000,
    status: 'Off Plan',
    badges: ['New', 'Installment', 'Discount'],
    location: {
      address: 'Lawan City, Phase 1',
      city: 'Erbil',
      district: 'Airport Road',
      country: 'Iraq'
    },
    specs: {
      beds: 4,
      baths: 4,
      sqm: 350,
      yearBuilt: 2025
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
      'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752421-20ac6c6a4c84?w=800&q=80'
    ],
    description: `Invest in the future with this off-plan villa in the upcoming Lawan City development, a new master-planned community featuring modern infrastructure and world-class amenities.

Designed for contemporary family living, this villa will feature an open-plan living and dining area, modern kitchen with quality appliances, and a private garden. Four bedrooms include a master suite with en-suite bathroom.

Lawan City will offer residents parks, playgrounds, a community center, mosque, and commercial facilities. Early buyers benefit from attractive pricing and flexible payment plans. Completion expected Q4 2025.`,
    features: [
      'Off-Plan Pricing',
      'Payment Plan',
      'Master-Planned Community',
      'Modern Design',
      'Private Garden',
      'Community Parks',
      'Commercial Facilities',
      'Central Location',
      'Quality Construction',
      'Title Deed'
    ],
    isFeatured: false,
    isNew: true,
    lotSize: 300,
    paymentPlan: '20% booking, 30% during construction, 50% on handover',
    completionDate: 'Q4 2025',
    projectName: 'Lawan City',
    neighborhood: {
      name: 'Airport Road',
      walkScore: 55,
      description: 'A rapidly developing corridor connecting the city to Erbil International Airport with new residential and commercial projects.'
    },
    agent: agents[1]
  },
  {
    id: 'citadel-view-apartment',
    title: 'Citadel View Premium Apartment',
    titleKu: 'ئاپارتمانی پریمیۆم بینینی قەڵا',
    titleAr: 'شقة فاخرة بإطلالة القلعة',
    type: 'Apartment',
    price: 165000,
    priceIQD: 242000000,
    rentPrice: 1200,
    status: 'For Sale',
    badges: ['Hot'],
    location: {
      address: 'Mustawfi Street',
      city: 'Erbil',
      district: 'Mustawfi',
      country: 'Iraq'
    },
    specs: {
      beds: 3,
      baths: 2,
      sqm: 160,
      yearBuilt: 2020,
      floor: 8,
      totalFloors: 12
    },
    images: [
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    ],
    description: `Rare opportunity to own an apartment with stunning views of the UNESCO World Heritage Erbil Citadel, one of the world's oldest continuously inhabited settlements. This premium residence combines history with modern comfort.

The thoughtfully designed layout features a spacious living room with large windows framing the iconic citadel views, a separate dining area, and a modern kitchen with quality finishes. Natural light floods the space throughout the day.

Three well-proportioned bedrooms include a master with en-suite bathroom. The building offers 24-hour security, elevator access, and covered parking. Located in the cultural heart of Erbil with easy access to the bazaar, restaurants, and government offices.`,
    features: [
      'Citadel Views',
      'Historic Location',
      'Modern Finishes',
      '24/7 Security',
      'Elevator Access',
      'Covered Parking',
      'Near Bazaar',
      'Cultural District',
      'Central Location',
      'Investment Potential'
    ],
    isFeatured: false,
    isNew: false,
    neighborhood: {
      name: 'Mustawfi',
      walkScore: 95,
      description: 'The historic heart of Erbil, surrounding the ancient Citadel with traditional markets, cultural sites, and government buildings.'
    },
    agent: agents[1]
  },

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
      country: 'Iraq'
    },
    specs: {
      beds: 1,
      baths: 1,
      sqm: 92.5,
      floor: 13
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
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
      country: 'Iraq'
    },
    specs: {
      beds: 1,
      baths: 1,
      sqm: 92.5,
      floor: 14
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
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
      country: 'Iraq'
    },
    specs: {
      beds: 1,
      baths: 1,
      sqm: 92.5,
      floor: 17
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
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
      country: 'Iraq'
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 128,
      floor: 0
    },
    images: [
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80'
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
      country: 'Iraq'
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 81,
      floor: 0
    },
    images: [
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80'
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
      country: 'Iraq'
    },
    specs: {
      beds: 0,
      baths: 2,
      sqm: 182,
      floor: 0
    },
    images: [
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80'
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
      country: 'Iraq'
    },
    specs: {
      beds: 0,
      baths: 1,
      sqm: 63,
      floor: 0
    },
    images: [
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80'
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
  'Ankawa',
  'Dream City',
  'Italian Village',
  'Gulan',
  'Dilan',
  '100 Meter Road',
  'Nawroz',
  'Shorsh',
  'English Village',
  'Airport Road',
  'Mustawfi'
] as const;
