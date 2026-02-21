// ═══════════════════════════════════════════════════════════════════════════
// Agent Data - Real House Team
// ═══════════════════════════════════════════════════════════════════════════

export interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  image: string;
  phone: string;
  email: string;
  languages: string[];
  yearsExperience: number;
  propertiesSold: number;
  bio: string;
}

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Abdalkader Hussein',
    role: 'Senior Property Consultant',
    specialization: 'Luxury Villas & Estates',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fm=webp',
    phone: '+964 750 792 2138',
    email: 'abdalkader@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 12,
    propertiesSold: 180,
    bio: 'Specialized in high-end residential properties across Erbil\'s premier neighborhoods.'
  },
  {
    id: 'agent-2',
    name: 'Mahmood Ali',
    role: 'Investment Specialist',
    specialization: 'Commercial & Investment',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fm=webp',
    phone: '+964 751 441 5003',
    email: 'mahmood@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 10,
    propertiesSold: 145,
    bio: 'Expert in commercial real estate and investment opportunities in Kurdistan.'
  },
  {
    id: 'agent-3',
    name: 'Sara Ahmed',
    role: 'Client Relations Manager',
    specialization: 'Penthouses & Apartments',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fm=webp',
    phone: '+964 750 792 2138',
    email: 'sara@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English', 'Turkish'],
    yearsExperience: 8,
    propertiesSold: 120,
    bio: 'Dedicated to providing personalized service for discerning clients seeking urban luxury.'
  },
  {
    id: 'agent-4',
    name: 'Karwan Rashid',
    role: 'Property Consultant',
    specialization: 'New Developments',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fm=webp',
    phone: '+964 751 441 5003',
    email: 'karwan@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 6,
    propertiesSold: 95,
    bio: 'Specializes in off-plan properties and new development projects across Erbil.'
  }
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find(a => a.id === id);
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
