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
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fm=webp',
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
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fm=webp',
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
  },
  {
    id: 'agent-8',
    slug: 'tareq',
    name: 'Tareq',
    role: 'Commercial Property Specialist',
    title: 'Commercial Property Consultant',
    specialization: 'Commercial Properties',
    specializations: ['Commercial Properties', 'Retail Spaces', 'Office Spaces', 'Queen Towers'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fm=webp',
    phone: '+964 750 445 5822',
    email: 'tareq@realhouseiq.com',
    whatsapp: '9647504455822',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 7,
    yearsWithCompany: 5,
    propertiesSold: 95,
    totalSalesVolume: 12000000,
    activeListings: 15,
    bio: 'Specialized in commercial properties and retail spaces in Erbil.',
    fullBio: `Tareq is Real House's specialist for commercial properties, with particular expertise in retail spaces, office buildings, and mixed-use developments. His 7 years of experience in the commercial real estate sector have given him deep insights into business location strategy and commercial lease negotiations.

He works closely with entrepreneurs, retailers, and investors looking for prime commercial spaces in Erbil's busiest areas. Tareq is known for his ability to match businesses with locations that maximize foot traffic and visibility.`,
    certifications: [
      'Licensed Real Estate Agent (KRG)',
      'Commercial Property Specialist'
    ],
    awards: [
      'Commercial Sales Leader (2023)'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/tareq-realhouse'
    },
    testimonials: [
      {
        id: 'test-t-1',
        clientName: 'Omar S.',
        clientLocation: 'Erbil, Iraq',
        rating: 5,
        text: 'Tareq found us the perfect retail space in Queen Towers. His knowledge of commercial properties is excellent.',
        date: '2024-01',
        propertyType: 'Commercial'
      }
    ],
    featuredAreas: ['Queen Towers', 'Gulan', 'City Center', 'Empire World'],
    isLeadership: false
  },
  {
    id: 'agent-3',
    slug: 'sara',
    name: 'Sara',
    role: 'Client Relations Manager',
    title: 'Client Relations Manager',
    specialization: 'Penthouses & Apartments',
    specializations: ['Penthouses', 'Luxury Apartments', 'International Buyers', 'Client Relations'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fm=webp',
    phone: '+964 750 792 2138',
    email: 'sara@realhouseiq.com',
    whatsapp: '9647507922138',
    languages: ['Kurdish', 'Arabic', 'English', 'Turkish'],
    yearsExperience: 8,
    yearsWithCompany: 6,
    propertiesSold: 120,
    totalSalesVolume: 15000000,
    activeListings: 22,
    bio: 'Dedicated to providing personalized service for discerning clients seeking urban luxury.',
    fullBio: `Sara Ahmed brings warmth, professionalism, and exceptional attention to detail to her role as Client Relations Manager at Real House. With 8 years of real estate experience, she has become the go-to consultant for clients seeking premium apartments and penthouses in Erbil's most desirable locations.

Sara excels at understanding client preferences and lifestyle needs, curating property selections that exceed expectations. Her multilingual capabilities (Kurdish, Arabic, English, and Turkish) and cross-cultural sensitivity make her particularly effective with international buyers and the diplomatic community.

She manages ongoing relationships with key clients, ensuring their complete satisfaction from initial inquiry through purchase and beyond. Many of her clients return for additional properties or refer friends and family.

Sara is known for her patience, responsiveness, and ability to manage complex transactions with multiple stakeholders smoothly.`,
    certifications: [
      'Licensed Real Estate Agent (KRG)',
      'Customer Relationship Management Certificate',
      'International Business Certificate'
    ],
    awards: [
      'Client Satisfaction Excellence Award (2023)',
      'Top Customer Reviews (2022)',
      'Best Client Retention (2021)'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/saraahmed',
      instagram: 'https://instagram.com/sara_realhouse'
    },
    testimonials: [
      {
        id: 'test-sa-1',
        clientName: 'Diplomatic Family',
        clientLocation: 'Ankara, Turkey',
        rating: 5,
        text: 'Sara made our relocation to Erbil seamless. Her understanding of what international families need was invaluable.',
        date: '2024-01',
        propertyType: 'Apartment'
      },
      {
        id: 'test-sa-2',
        clientName: 'Young Professional',
        clientLocation: 'Erbil, Iraq',
        rating: 5,
        text: 'Found my perfect penthouse with Sara\'s help. She understood my style and showed me exactly what I was looking for.',
        date: '2023-10',
        propertyType: 'Penthouse'
      },
      {
        id: 'test-sa-3',
        clientName: 'Returning Diaspora',
        clientLocation: 'Stockholm, Sweden',
        rating: 5,
        text: 'Sara helped us navigate the Erbil property market from abroad. Her communication was excellent throughout.',
        date: '2023-07',
        propertyType: 'Apartment'
      }
    ],
    featuredAreas: ['Empire World', 'Gulan', 'Ankawa', 'City Center'],
    isLeadership: false
  },
  {
    id: 'agent-4',
    slug: 'karwan',
    name: 'Karwan',
    role: 'Property Consultant',
    title: 'Property Consultant',
    specialization: 'New Developments',
    specializations: ['New Developments', 'Off-Plan Properties', 'First-Time Buyers', 'Empire World'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fm=webp',
    phone: '+964 751 441 5003',
    email: 'karwan.r@realhouseiq.com',
    whatsapp: '9647514415003',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 6,
    yearsWithCompany: 4,
    propertiesSold: 95,
    totalSalesVolume: 9500000,
    activeListings: 28,
    bio: 'Specializes in off-plan properties and new development projects across Erbil.',
    fullBio: `Karwan Rashid joined Real House in 2020 and has quickly established himself as a specialist in new development properties. His deep knowledge of off-plan projects, payment plans, and developer offerings makes him invaluable for clients interested in modern, newly constructed properties.

Karwan has developed strong relationships with major developers in Erbil, giving him early access to new projects and the best unit selections. He is particularly skilled at guiding first-time buyers through the purchase process, explaining complex concepts in accessible terms.

His background in architecture gives him unique insights into construction quality, floor plan efficiency, and building systems. He maintains detailed knowledge of ongoing construction progress and takes pride in keeping clients informed throughout their purchase journey.

Karwan is known for his energy, enthusiasm, and dedication to finding the perfect property for each client, regardless of budget.`,
    certifications: [
      'Licensed Real Estate Agent (KRG)',
      'New Development Sales Certification',
      'Architecture Background (University of Duhok)'
    ],
    awards: [
      'Off-Plan Sales Excellence (2023)',
      'Fastest Growing Consultant (2022)',
      'New Development Specialist Recognition (2021)'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/karwanrashid'
    },
    testimonials: [
      {
        id: 'test-kr-1',
        clientName: 'First-Time Buyer',
        clientLocation: 'Erbil, Iraq',
        rating: 5,
        text: 'Karwan made buying my first home so much easier. He explained everything clearly and helped me choose the best payment plan.',
        date: '2024-02',
        propertyType: 'Apartment'
      },
      {
        id: 'test-kr-2',
        clientName: 'Young Couple',
        clientLocation: 'Erbil, Iraq',
        rating: 5,
        text: 'Karwan\'s knowledge of new developments is impressive. He helped us find an off-plan unit in Empire World at a great price.',
        date: '2023-11',
        propertyType: 'Off-Plan'
      },
      {
        id: 'test-kr-3',
        clientName: 'Growing Family',
        clientLocation: 'Duhok, Iraq',
        rating: 5,
        text: 'We needed more space for our family. Karwan found us a perfect new apartment with all the features we wanted.',
        date: '2023-08',
        propertyType: 'Apartment'
      }
    ],
    featuredAreas: ['Empire World', 'Dream City', 'Italian Village', 'Gulan'],
    isLeadership: false
  },
  {
    id: 'agent-5',
    slug: 'hana',
    name: 'Hana',
    role: 'Commercial Property Specialist',
    title: 'Commercial Property Consultant',
    specialization: 'Commercial Properties',
    specializations: ['Retail Spaces', 'Office Properties', 'Commercial Leasing', 'Business Location Advisory'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fm=webp',
    phone: '+964 751 441 5003',
    email: 'hana@realhouseiq.com',
    whatsapp: '9647514415003',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 7,
    yearsWithCompany: 5,
    propertiesSold: 85,
    totalSalesVolume: 12000000,
    activeListings: 15,
    bio: 'Commercial real estate specialist focusing on retail and office spaces for businesses of all sizes.',
    fullBio: `Hana Jalal leads Real House's commercial property services, helping businesses find the perfect locations for their operations. With 7 years of commercial real estate experience, she understands the unique needs of retail businesses, professional services, and corporate clients.

Hana provides comprehensive market analysis, lease negotiation support, and location advisory services. Her clients range from small local businesses to international companies establishing their Kurdistan presence.

She maintains extensive data on commercial property performance, foot traffic patterns, and rental trends, enabling data-driven recommendations for every client. Her analytical approach combined with strong negotiation skills helps clients secure favorable lease terms.

Hana is also experienced in sale-leaseback transactions and build-to-suit arrangements for businesses with specific requirements.`,
    certifications: [
      'Licensed Real Estate Agent (KRG)',
      'Commercial Real Estate Certificate (IREM)',
      'Retail Property Management Specialist'
    ],
    awards: [
      'Commercial Transaction Leader (2023)',
      'Business Development Excellence (2022)',
      'Rising Star - Commercial Division (2020)'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/hanajalal'
    },
    testimonials: [
      {
        id: 'test-hj-1',
        clientName: 'Restaurant Chain',
        clientLocation: 'Erbil, Iraq',
        rating: 5,
        text: 'Hana found us three prime retail locations for our restaurant expansion. Her knowledge of foot traffic and demographics was invaluable.',
        date: '2024-01',
        propertyType: 'Commercial'
      },
      {
        id: 'test-hj-2',
        clientName: 'Tech Startup',
        clientLocation: 'Erbil, Iraq',
        rating: 5,
        text: 'We needed modern office space for our growing team. Hana understood our needs and negotiated an excellent lease deal.',
        date: '2023-09',
        propertyType: 'Office'
      },
      {
        id: 'test-hj-3',
        clientName: 'International Retailer',
        clientLocation: 'Dubai, UAE',
        rating: 5,
        text: 'Hana managed our Kurdistan market entry perfectly. She identified the best locations and handled all the local requirements.',
        date: '2023-05',
        propertyType: 'Retail'
      }
    ],
    featuredAreas: ['City Center', 'Empire World', 'Family Mall Area', 'Ankawa'],
    isLeadership: false
  },
  {
    id: 'agent-6',
    slug: 'karwan-h',
    name: 'Karwan H.',
    role: 'CEO & Co-Founder',
    title: 'Chief Executive Officer',
    specialization: 'Strategic Advisory',
    specializations: ['Strategic Planning', 'High-Net-Worth Clients', 'Commercial Development', 'Market Analysis'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fm=webp',
    phone: '+964 750 792 2138',
    email: 'karwan@realhouseiq.com',
    whatsapp: '9647507922138',
    languages: ['Kurdish', 'Arabic', 'English', 'Turkish'],
    yearsExperience: 28,
    yearsWithCompany: 23,
    propertiesSold: 420,
    totalSalesVolume: 52000000,
    activeListings: 5,
    bio: 'Co-founder of Real House with 28 years in Kurdistan real estate. Expert in luxury properties and commercial development.',
    fullBio: `Karwan Hassan co-founded Real House in 2001 with a vision to bring international standards of service to Kurdistan's real estate market. With 28 years of experience in property development and sales, Karwan has been instrumental in shaping the luxury real estate landscape in Erbil.

Before founding Real House, Karwan worked with leading development companies in Kurdistan and completed advanced real estate training in Dubai. His deep understanding of market dynamics, combined with an extensive network of developers, investors, and government officials, has enabled Real House to become the region's most trusted name in luxury property.

Karwan personally oversees major transactions and maintains relationships with the agency's most valued clients. His commitment to ethical practice and transparency has established the foundational principles that guide Real House to this day.

Outside of work, Karwan is actively involved in community development initiatives and serves on the board of the Kurdistan Real Estate Association.`,
    certifications: [
      'Certified Commercial Investment Member (CCIM)',
      'Licensed Real Estate Broker (KRG)',
      'Advanced Property Valuation Certificate (RICS)'
    ],
    awards: [
      'Kurdistan Business Leader of the Year (2022)',
      'Lifetime Achievement Award - KREA (2020)',
      'Excellence in Real Estate Leadership (2018)'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/karwanhassan'
    },
    testimonials: [
      {
        id: 'test-kh-1',
        clientName: 'VIP Client',
        clientLocation: 'Erbil, Iraq',
        rating: 5,
        text: 'Karwan personally handled our major property acquisition. His expertise and connections made a complex deal smooth.',
        date: '2023-12',
        propertyType: 'Commercial'
      },
      {
        id: 'test-kh-2',
        clientName: 'Long-time Client',
        clientLocation: 'Erbil, Iraq',
        rating: 5,
        text: 'We have worked with Real House and Karwan for over 15 years. Unmatched integrity and professionalism.',
        date: '2023-06',
        propertyType: 'Multiple'
      }
    ],
    featuredAreas: ['All Erbil Districts', 'Kurdistan Region'],
    isLeadership: true
  },
  {
    id: 'agent-7',
    slug: 'ahmad',
    name: 'Ahmad',
    role: 'Managing Director & Co-Founder',
    title: 'Managing Director',
    specialization: 'Investment Properties',
    specializations: ['Investment Properties', 'International Clients', 'Off-Plan Development', 'Market Strategy'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&fm=webp',
    phone: '+964 751 441 5003',
    email: 'ahmad@realhouseiq.com',
    whatsapp: '9647514415003',
    languages: ['Kurdish', 'Arabic', 'English', 'Persian'],
    yearsExperience: 26,
    yearsWithCompany: 23,
    propertiesSold: 380,
    totalSalesVolume: 48000000,
    activeListings: 8,
    bio: 'Co-founder specializing in investment properties and international client relations. 26 years of real estate expertise.',
    fullBio: `Ahmad Mahmoud is the co-founder and Managing Director of Real House, bringing 26 years of real estate expertise to the organization. His vision for serving international buyers and investors has been fundamental to Real House's growth into a globally connected agency.

Ahmad's career began in property development before transitioning to sales and agency management. His experience spans residential, commercial, and mixed-use developments across Kurdistan. He has been particularly instrumental in establishing relationships with developers for off-plan sales and creating investment packages for diaspora buyers.

As Managing Director, Ahmad oversees daily operations, team development, and strategic partnerships. He has cultivated relationships with financial institutions, legal firms, and government bodies that enable smooth transactions for all clients.

Ahmad is a frequent speaker at real estate conferences and has been quoted extensively in regional media on property market trends and investment opportunities.`,
    certifications: [
      'Licensed Real Estate Broker (KRG)',
      'Investment Property Specialist (NAR)',
      'International Real Estate Certificate (FIABCI)'
    ],
    awards: [
      'Top Real Estate Professional - Kurdistan (2023)',
      'International Client Excellence Award (2021)',
      'Investment Advisory Excellence (2019)'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ahmadmahmoud'
    },
    testimonials: [
      {
        id: 'test-am-1',
        clientName: 'International Investor',
        clientLocation: 'London, UK',
        rating: 5,
        text: 'Ahmad\'s understanding of the Kurdish market and international investor needs is exceptional. He helped us build a significant property portfolio.',
        date: '2024-01',
        propertyType: 'Multiple'
      },
      {
        id: 'test-am-2',
        clientName: 'Diaspora Family',
        clientLocation: 'Canada',
        rating: 5,
        text: 'We trusted Ahmad to handle our family property investments. His professionalism and integrity are beyond reproach.',
        date: '2023-08',
        propertyType: 'Investment'
      }
    ],
    featuredAreas: ['All Erbil Districts', 'Kurdistan Region', 'International'],
    isLeadership: true
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
      'telephone': '+964-750-792-2138',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Dream City',
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
