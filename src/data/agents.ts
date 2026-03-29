// ═══════════════════════════════════════════════════════════════════════════
// Agent Data - Real House Team
// Individual agent profiles with comprehensive E-E-A-T data
// ═══════════════════════════════════════════════════════════════════════════

export interface SocialLinks {
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientLocation: string;
  rating: number;
  text: string;
  date: string;
  propertyType?: string;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  role: string;
  title: string;
  specialization: string;
  specializations: string[];
  image: string;
  phone: string;
  email: string;
  whatsapp: string;
  languages: string[];
  yearsExperience: number;
  yearsWithCompany: number;
  propertiesSold: number;
  totalSalesVolume: number;
  activeListings: number;
  bio: string;
  fullBio: string;
  certifications: string[];
  awards: string[];
  socialLinks: SocialLinks;
  testimonials: Testimonial[];
  featuredAreas: string[];
  isLeadership: boolean;
}

export const agents: Agent[] = [
  {
    id: 'agent-1',
    slug: 'abdalkader',
    name: 'Abdalkader',
    role: 'Senior Property Consultant',
    title: 'Senior Property Consultant',
    specialization: 'Luxury Villas & Estates',
    specializations: ['Luxury Villas', 'High-End Residential', 'Dream City Properties', 'Waterfront Properties'],
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80&fm=webp',
    phone: '+964 750 792 2138',
    email: 'abdalkader@realhouseiq.com',
    whatsapp: '9647507922138',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 12,
    yearsWithCompany: 10,
    propertiesSold: 180,
    totalSalesVolume: 22000000,
    activeListings: 24,
    bio: 'Specialized in high-end residential properties across Erbil\'s premier neighborhoods.',
    fullBio: `Abdalkader Hussein is one of Real House's most accomplished consultants, with 12 years of experience in the Kurdistan luxury property market. He has developed deep expertise in high-end residential properties, particularly villas and estates in Dream City, Italian Village, and English Village.

Known for his meticulous attention to client needs and extensive property knowledge, Abdalkader has guided over 180 families to their dream homes. His approach combines thorough market analysis with personalized service, ensuring each client finds a property that perfectly matches their lifestyle and investment goals.

Abdalkader's understanding of construction quality, architectural styles, and market valuations makes him an invaluable resource for discerning buyers. He maintains relationships with top developers and often has access to exclusive listings before they hit the market.

Outside of work, Abdalkader is passionate about architecture and regularly attends international property exhibitions to stay current with global real estate trends.`,
    certifications: [
      'Certified Luxury Home Marketing Specialist (ILHM)',
      'Licensed Real Estate Agent (KRG)',
      'Advanced Property Valuation Certificate'
    ],
    awards: [
      'Top Sales Consultant - Real House (2023)',
      'Client Excellence Award (2022)',
      'Rising Star Award (2015)'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/abdalkaderhussein',
      instagram: 'https://instagram.com/abdalkader_realhouse'
    },
    testimonials: [
      {
        id: 'test-ah-1',
        clientName: 'Mohammed K.',
        clientLocation: 'Dubai, UAE',
        rating: 5,
        text: 'Abdalkader made our dream of owning a villa in Dream City come true. His knowledge of the area and attention to detail was exceptional. Highly recommend!',
        date: '2024-01',
        propertyType: 'Villa'
      },
      {
        id: 'test-ah-2',
        clientName: 'Sarah M.',
        clientLocation: 'London, UK',
        rating: 5,
        text: 'As an overseas buyer, I needed someone I could trust. Abdalkader handled everything professionally, from property selection to final handover.',
        date: '2023-11',
        propertyType: 'Penthouse'
      },
      {
        id: 'test-ah-3',
        clientName: 'Dr. Ahmad R.',
        clientLocation: 'Erbil, Iraq',
        rating: 5,
        text: 'Abdalkader\'s expertise in luxury properties is unmatched. He found us the perfect family home with all the amenities we wanted.',
        date: '2023-08',
        propertyType: 'Villa'
      }
    ],
    featuredAreas: ['Dream City', 'Italian Village', 'English Village', 'Empire World'],
    isLeadership: false
  },
  {
    id: 'agent-2',
    slug: 'mahmood',
    name: 'Mahmood',
    role: 'Investment Specialist',
    title: 'Senior Investment Consultant',
    specialization: 'Commercial & Investment',
    specializations: ['Commercial Properties', 'Investment Advisory', 'Off-Plan Properties', 'ROI Analysis'],
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80&fm=webp',
    phone: '+964 751 441 5003',
    email: 'mahmood@realhouseiq.com',
    whatsapp: '9647514415003',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 10,
    yearsWithCompany: 8,
    propertiesSold: 145,
    totalSalesVolume: 28000000,
    activeListings: 18,
    bio: 'Expert in commercial real estate and investment opportunities in Kurdistan.',
    fullBio: `Mahmood Ali leads Real House's investment advisory services, helping clients identify and capitalize on the best property investment opportunities in Kurdistan. With 10 years of experience focused specifically on investment properties, Mahmood brings sophisticated financial analysis to every client engagement.

His expertise spans commercial properties, off-plan developments, and residential investment portfolios. Mahmood has developed proprietary ROI analysis tools that help investors understand potential returns and risks, making informed decisions backed by data.

He works extensively with international investors, guiding them through the nuances of the Kurdistan property market and facilitating seamless cross-border transactions. His network includes major developers, financial institutions, and legal experts.

Mahmood holds an MBA in Finance and regularly contributes market analysis articles to regional business publications.`,
    certifications: [
      'Certified Commercial Investment Member (CCIM)',
      'Licensed Real Estate Agent (KRG)',
      'Financial Analysis Certificate (CFA Institute)'
    ],
    awards: [
      'Investment Consultant of the Year (2023)',
      'Commercial Sales Leader (2021)',
      'Top Revenue Generator (2020)'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mahmoodali'
    },
    testimonials: [
      {
        id: 'test-ma-1',
        clientName: 'Hassan Group LLC',
        clientLocation: 'Erbil, Iraq',
        rating: 5,
        text: 'Mahmood\'s investment analysis helped us make a $2M commercial property decision with confidence. His ROI projections were accurate within 2%.',
        date: '2024-02',
        propertyType: 'Commercial'
      },
      {
        id: 'test-ma-2',
        clientName: 'Investor from Germany',
        clientLocation: 'Berlin, Germany',
        rating: 5,
        text: 'Outstanding service for international investors. Mahmood understood our investment goals and found perfect off-plan opportunities.',
        date: '2023-09',
        propertyType: 'Off-Plan'
      },
      {
        id: 'test-ma-3',
        clientName: 'Ali F.',
        clientLocation: 'Sulaymaniyah, Iraq',
        rating: 5,
        text: 'Mahmood helped us build a rental property portfolio that now generates excellent passive income. Highly professional.',
        date: '2023-06',
        propertyType: 'Apartment'
      }
    ],
    featuredAreas: ['Empire World', 'City Center', 'Gulan', 'Ankawa'],
    isLeadership: false
  }
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getAgentById(id: string): Agent | undefined {
  return agents.find(a => a.id === id);
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find(a => a.slug === slug);
}

export function getAllAgentSlugs(): string[] {
  return agents.map(a => a.slug);
}

export function getAgentsBySpecialization(specialization: string): Agent[] {
  return agents.filter(a =>
    a.specializations.some(s =>
      s.toLowerCase().includes(specialization.toLowerCase())
    )
  );
}

export function getLeadershipTeam(): Agent[] {
  return agents.filter(a => a.isLeadership);
}

export function getSalesAgents(): Agent[] {
  return agents.filter(a => !a.isLeadership);
}

export function getAgentStats(): { totalAgents: number; totalSales: number; totalVolume: number; avgExperience: number } {
  return {
    totalAgents: agents.length,
    totalSales: agents.reduce((sum, a) => sum + a.propertiesSold, 0),
    totalVolume: agents.reduce((sum, a) => sum + a.totalSalesVolume, 0),
    avgExperience: Math.round(agents.reduce((sum, a) => sum + a.yearsExperience, 0) / agents.length)
  };
}

export function formatSalesVolume(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

// ─── JSON-LD Schema Generation ───────────────────────────────────────────────

export function generateAgentSchema(agent: Agent): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `https://realhouseiq.com/agents/${agent.slug}`,
    'name': agent.name,
    'jobTitle': agent.title,
    'description': agent.fullBio.substring(0, 500),
    'image': agent.image,
    'telephone': agent.phone,
    'email': agent.email,
    'knowsLanguage': agent.languages.map(lang => ({
      '@type': 'Language',
      'name': lang
    })),
    'worksFor': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': 'https://realhouseiq.com',
      'telephone': '+964 750 792 2138',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Queen Tower, Erbil',
        'addressLocality': 'Erbil',
        'addressRegion': 'Kurdistan Region',
        'addressCountry': 'IQ'
      }
    },
    'award': agent.awards,
    'hasCredential': agent.certifications.map(cert => ({
      '@type': 'EducationalOccupationalCredential',
      'credentialCategory': 'Professional Certification',
      'name': cert
    })),
    'sameAs': Object.values(agent.socialLinks).filter(Boolean)
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Trust Badges Data
// ═══════════════════════════════════════════════════════════════════════════

export interface TrustBadge {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const trustBadges: TrustBadge[] = [
  {
    id: 'badge-licensed',
    icon: 'icon-shield',
    title: 'Licensed Real Estate',
    description: 'Fully licensed and regulated by Kurdistan authorities'
  },
  {
    id: 'badge-support',
    icon: 'icon-clock',
    title: '24/7 Support',
    description: 'Round-the-clock assistance for all your needs'
  },
  {
    id: 'badge-secure',
    icon: 'icon-lock',
    title: '100% Secure',
    description: 'Your transactions and data are fully protected'
  },
  {
    id: 'badge-experience',
    icon: 'icon-award',
    title: '23+ Years',
    description: 'Over 23 years of trusted service in Kurdistan'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Stats Data for Animated Counters
// ═══════════════════════════════════════════════════════════════════════════

export interface StatItem {
  number: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

export const enhancedStats: StatItem[] = [
  {
    number: 500,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Satisfied homeowners across Kurdistan'
  },
  {
    number: 50,
    suffix: 'M+',
    prefix: '$',
    label: 'Properties Sold',
    description: 'In total transaction value'
  },
  {
    number: 15,
    suffix: '+',
    label: 'Years Experience',
    description: 'Serving the Kurdistan market'
  },
  {
    number: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Based on customer reviews'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Partner Logos / Media Features
// ═══════════════════════════════════════════════════════════════════════════

export interface MediaLogo {
  id: string;
  name: string;
  logo: string;
}

export const featuredInMedia: MediaLogo[] = [
  { id: 'media-1', name: 'Kurdistan 24', logo: 'K24' },
  { id: 'media-2', name: 'Rudaw', logo: 'RUDAW' },
  { id: 'media-3', name: 'NRT', logo: 'NRT' },
  { id: 'media-4', name: 'Kurdistan TV', logo: 'KTV' },
  { id: 'media-5', name: 'Al Jazeera', logo: 'AJ' },
  { id: 'media-6', name: 'Arab News', logo: 'AN' }
];

export const partnerLogos: MediaLogo[] = [
  { id: 'partner-1', name: 'Empire World', logo: 'EW' },
  { id: 'partner-2', name: 'Dream City', logo: 'DC' },
  { id: 'partner-3', name: 'Italian Village', logo: 'IV' },
  { id: 'partner-4', name: 'English Village', logo: 'EV' },
  { id: 'partner-5', name: 'Gulan Group', logo: 'GG' }
];
