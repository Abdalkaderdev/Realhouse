// ═══════════════════════════════════════════════════════════════════════════
// Team Member Data with E-E-A-T Author Bios
// Experience, Expertise, Authoritativeness, Trustworthiness
// ═══════════════════════════════════════════════════════════════════════════

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  email: string;
}

export interface Credential {
  title: string;
  issuer: string;
  year: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  department: 'leadership' | 'sales' | 'investment' | 'operations' | 'marketing';
  image: string;
  phone: string;
  email: string;
  languages: string[];
  yearsExperience: number;
  yearsWithCompany: number;
  specializations: string[];
  bio: string;
  fullBio: string;
  credentials: Credential[];
  education: string[];
  awards: string[];
  transactionCount: number;
  transactionVolume: number;
  socialLinks: SocialLinks;
  isFounder: boolean;
  isLeadership: boolean;
}

export const teamMembers: TeamMember[] = [
  // ─── Leadership Team ─────────────────────────────────────────────────────────
  {
    id: 'karwan-hassan',
    name: 'Karwan Hassan',
    role: 'CEO & Co-Founder',
    title: 'Chief Executive Officer',
    department: 'leadership',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fm=webp',
    phone: '+964 750 792 2138',
    email: 'karwan@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English', 'Turkish'],
    yearsExperience: 28,
    yearsWithCompany: 23,
    specializations: ['Strategic Planning', 'High-Net-Worth Clients', 'Commercial Development', 'Market Analysis'],
    bio: 'Co-founder of Real House with 28 years in Kurdistan real estate. Expert in luxury properties and commercial development.',
    fullBio: `Karwan Hassan co-founded Real House in 2001 with a vision to bring international standards of service to Kurdistan's real estate market. With 28 years of experience in property development and sales, Karwan has been instrumental in shaping the luxury real estate landscape in Erbil.

Before founding Real House, Karwan worked with leading development companies in Kurdistan and completed advanced real estate training in Dubai. His deep understanding of market dynamics, combined with an extensive network of developers, investors, and government officials, has enabled Real House to become the region's most trusted name in luxury property.

Karwan personally oversees major transactions and maintains relationships with the agency's most valued clients. His commitment to ethical practice and transparency has established the foundational principles that guide Real House to this day.

Outside of work, Karwan is actively involved in community development initiatives and serves on the board of the Kurdistan Real Estate Association.`,
    credentials: [
      { title: 'Certified Commercial Investment Member (CCIM)', issuer: 'CCIM Institute', year: 2015 },
      { title: 'Licensed Real Estate Broker', issuer: 'Kurdistan Regional Government', year: 2001 },
      { title: 'Advanced Property Valuation Certificate', issuer: 'RICS Middle East', year: 2012 }
    ],
    education: [
      'MBA, Business Administration - University of Salahaddin, 1998',
      'Advanced Real Estate Program - Dubai Real Estate Institute, 2008',
      'Executive Leadership Program - American University of Iraq, 2016'
    ],
    awards: [
      'Kurdistan Business Leader of the Year (2022)',
      'Lifetime Achievement Award - KREA (2020)',
      'Excellence in Real Estate Leadership (2018)'
    ],
    transactionCount: 420,
    transactionVolume: 52000000,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/karwanhassan',
      email: 'karwan@realhouseiq.com'
    },
    isFounder: true,
    isLeadership: true
  },
  {
    id: 'ahmad-mahmoud',
    name: 'Ahmad Mahmoud',
    role: 'Managing Director & Co-Founder',
    title: 'Managing Director',
    department: 'leadership',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fm=webp',
    phone: '+964 751 441 5003',
    email: 'ahmad@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English', 'Persian'],
    yearsExperience: 26,
    yearsWithCompany: 23,
    specializations: ['Investment Properties', 'International Clients', 'Off-Plan Development', 'Market Strategy'],
    bio: 'Co-founder specializing in investment properties and international client relations. 26 years of real estate expertise.',
    fullBio: `Ahmad Mahmoud is the co-founder and Managing Director of Real House, bringing 26 years of real estate expertise to the organization. His vision for serving international buyers and investors has been fundamental to Real House's growth into a globally connected agency.

Ahmad's career began in property development before transitioning to sales and agency management. His experience spans residential, commercial, and mixed-use developments across Kurdistan. He has been particularly instrumental in establishing relationships with developers for off-plan sales and creating investment packages for diaspora buyers.

As Managing Director, Ahmad oversees daily operations, team development, and strategic partnerships. He has cultivated relationships with financial institutions, legal firms, and government bodies that enable smooth transactions for all clients.

Ahmad is a frequent speaker at real estate conferences and has been quoted extensively in regional media on property market trends and investment opportunities.`,
    credentials: [
      { title: 'Licensed Real Estate Broker', issuer: 'Kurdistan Regional Government', year: 2001 },
      { title: 'Investment Property Specialist', issuer: 'National Association of Realtors', year: 2016 },
      { title: 'International Real Estate Certificate', issuer: 'FIABCI', year: 2018 }
    ],
    education: [
      'Bachelor of Commerce - University of Mosul, 1996',
      'Real Estate Development Certificate - Dubai, 2006',
      'International Property Investment - London School of Business, 2014'
    ],
    awards: [
      'Top Real Estate Professional - Kurdistan (2023)',
      'International Client Excellence Award (2021)',
      'Investment Advisory Excellence (2019)'
    ],
    transactionCount: 380,
    transactionVolume: 48000000,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ahmadmahmoud',
      email: 'ahmad@realhouseiq.com'
    },
    isFounder: true,
    isLeadership: true
  },
  {
    id: 'shilan-azad',
    name: 'Shilan Azad',
    role: 'Director of Operations',
    title: 'Director of Operations',
    department: 'leadership',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fm=webp',
    phone: '+964 750 792 2138',
    email: 'shilan@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 15,
    yearsWithCompany: 12,
    specializations: ['Operations Management', 'Client Experience', 'Process Optimization', 'Team Development'],
    bio: 'Oversees all operational aspects of Real House, ensuring seamless client experiences and team excellence.',
    fullBio: `Shilan Azad joined Real House in 2012 and has risen to become Director of Operations, responsible for the agency's operational excellence and client experience standards.

With 15 years in real estate operations, Shilan has transformed Real House's processes to deliver consistent, high-quality service. She implemented the agency's digital transformation, including virtual tour capabilities and the online transaction management system.

Shilan manages a team of administrative and support staff, coordinates between departments, and ensures that every client interaction meets Real House's exacting standards. Her focus on process improvement has reduced average transaction times by 40% while increasing client satisfaction scores.

She holds certifications in project management and customer experience and regularly participates in international real estate operations forums.`,
    credentials: [
      { title: 'Project Management Professional (PMP)', issuer: 'PMI', year: 2017 },
      { title: 'Certified Customer Experience Professional', issuer: 'CCXP', year: 2019 },
      { title: 'Six Sigma Green Belt', issuer: 'ASQ', year: 2020 }
    ],
    education: [
      'Bachelor of Business Administration - University of Kurdistan Hawler, 2009',
      'Executive Management Certificate - American University of Iraq, 2018'
    ],
    awards: [
      'Operations Excellence Award - Real House (2022)',
      'Process Innovation Award (2020)'
    ],
    transactionCount: 0, // Operations role
    transactionVolume: 0,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/shilanazad',
      email: 'shilan@realhouseiq.com'
    },
    isFounder: false,
    isLeadership: true
  },

  // ─── Sales Team ──────────────────────────────────────────────────────────────
  {
    id: 'abdalkader-hussein',
    name: 'Abdalkader Hussein',
    role: 'Senior Property Consultant',
    title: 'Senior Property Consultant',
    department: 'sales',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fm=webp',
    phone: '+964 750 792 2138',
    email: 'abdalkader@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 12,
    yearsWithCompany: 10,
    specializations: ['Luxury Villas & Estates', 'High-End Residential', 'Dream City Properties', 'Client Advisory'],
    bio: 'Specialized in high-end residential properties across Erbil\'s premier neighborhoods. Expert in luxury villas and estates.',
    fullBio: `Abdalkader Hussein is one of Real House's most accomplished consultants, with 12 years of experience in the Kurdistan luxury property market. He has developed deep expertise in high-end residential properties, particularly villas and estates in Dream City, Italian Village, and English Village.

Known for his meticulous attention to client needs and extensive property knowledge, Abdalkader has guided over 180 families to their dream homes. His approach combines thorough market analysis with personalized service, ensuring each client finds a property that perfectly matches their lifestyle and investment goals.

Abdalkader contributes regular market insights to the Real House blog and is frequently consulted by media outlets for expert commentary on the luxury property sector.`,
    credentials: [
      { title: 'Certified Luxury Home Marketing Specialist', issuer: 'Institute for Luxury Home Marketing', year: 2018 },
      { title: 'Licensed Real Estate Agent', issuer: 'Kurdistan Regional Government', year: 2012 }
    ],
    education: [
      'Bachelor of Engineering - University of Salahaddin, 2010',
      'Luxury Real Estate Marketing - Dubai Real Estate Institute, 2016'
    ],
    awards: [
      'Top Sales Consultant - Real House (2023)',
      'Client Excellence Award (2022)',
      'Rising Star Award (2015)'
    ],
    transactionCount: 180,
    transactionVolume: 22000000,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/abdalkaderhussein',
      instagram: 'https://instagram.com/abdalkader_realhouse',
      email: 'abdalkader@realhouseiq.com'
    },
    isFounder: false,
    isLeadership: false
  },
  {
    id: 'mahmood-ali',
    name: 'Mahmood Ali',
    role: 'Investment Specialist',
    title: 'Senior Investment Consultant',
    department: 'investment',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fm=webp',
    phone: '+964 751 441 5003',
    email: 'mahmood@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 10,
    yearsWithCompany: 8,
    specializations: ['Commercial & Investment', 'Off-Plan Properties', 'ROI Analysis', 'Portfolio Advisory'],
    bio: 'Expert in commercial real estate and investment opportunities in Kurdistan. Specialist in off-plan and ROI optimization.',
    fullBio: `Mahmood Ali leads Real House's investment advisory services, helping clients identify and capitalize on the best property investment opportunities in Kurdistan. With 10 years of experience focused specifically on investment properties, Mahmood brings sophisticated financial analysis to every client engagement.

His expertise spans commercial properties, off-plan developments, and residential investment portfolios. Mahmood has developed proprietary ROI analysis tools that help investors understand potential returns and risks, making informed decisions backed by data.

He works extensively with international investors, guiding them through the nuances of the Kurdistan property market and facilitating seamless cross-border transactions.`,
    credentials: [
      { title: 'Certified Commercial Investment Member (CCIM)', issuer: 'CCIM Institute', year: 2019 },
      { title: 'Licensed Real Estate Agent', issuer: 'Kurdistan Regional Government', year: 2014 },
      { title: 'Financial Analysis Certificate', issuer: 'CFA Institute', year: 2017 }
    ],
    education: [
      'MBA, Finance - Lebanese American University, 2013',
      'Bachelor of Economics - University of Salahaddin, 2011'
    ],
    awards: [
      'Investment Consultant of the Year (2023)',
      'Commercial Sales Leader (2021)'
    ],
    transactionCount: 145,
    transactionVolume: 28000000,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mahmoodali',
      email: 'mahmood@realhouseiq.com'
    },
    isFounder: false,
    isLeadership: false
  },
  {
    id: 'sara-ahmed',
    name: 'Sara Ahmed',
    role: 'Client Relations Manager',
    title: 'Client Relations Manager',
    department: 'sales',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fm=webp',
    phone: '+964 750 792 2138',
    email: 'sara@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English', 'Turkish'],
    yearsExperience: 8,
    yearsWithCompany: 6,
    specializations: ['Penthouses & Apartments', 'Client Relations', 'International Buyers', 'Gulan Properties'],
    bio: 'Dedicated to providing personalized service for discerning clients seeking urban luxury. Expert in penthouses and apartments.',
    fullBio: `Sara Ahmed brings warmth, professionalism, and exceptional attention to detail to her role as Client Relations Manager at Real House. With 8 years of real estate experience, she has become the go-to consultant for clients seeking premium apartments and penthouses in Erbil's most desirable locations.

Sara excels at understanding client preferences and lifestyle needs, curating property selections that exceed expectations. Her multilingual capabilities and cross-cultural sensitivity make her particularly effective with international buyers and the diplomatic community.

She manages ongoing relationships with key clients, ensuring their complete satisfaction from initial inquiry through purchase and beyond.`,
    credentials: [
      { title: 'Licensed Real Estate Agent', issuer: 'Kurdistan Regional Government', year: 2016 },
      { title: 'Customer Relationship Management Certificate', issuer: 'CRM Academy', year: 2019 }
    ],
    education: [
      'Bachelor of Business Administration - University of Kurdistan Hawler, 2014',
      'International Business Certificate - British Council, 2017'
    ],
    awards: [
      'Client Satisfaction Excellence Award (2023)',
      'Top Customer Reviews (2022)'
    ],
    transactionCount: 120,
    transactionVolume: 15000000,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/saraahmed',
      instagram: 'https://instagram.com/sara_realhouse',
      email: 'sara@realhouseiq.com'
    },
    isFounder: false,
    isLeadership: false
  },
  {
    id: 'karwan-rashid',
    name: 'Karwan Rashid',
    role: 'Property Consultant',
    title: 'Property Consultant',
    department: 'sales',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&fm=webp',
    phone: '+964 751 441 5003',
    email: 'karwan.r@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 6,
    yearsWithCompany: 4,
    specializations: ['New Developments', 'Off-Plan Properties', 'First-Time Buyers', 'Empire World'],
    bio: 'Specializes in off-plan properties and new development projects across Erbil. Expert guide for first-time buyers.',
    fullBio: `Karwan Rashid joined Real House in 2020 and has quickly established himself as a specialist in new development properties. His deep knowledge of off-plan projects, payment plans, and developer offerings makes him invaluable for clients interested in modern, newly constructed properties.

Karwan has developed strong relationships with major developers in Erbil, giving him early access to new projects and the best unit selections. He is particularly skilled at guiding first-time buyers through the purchase process, explaining complex concepts in accessible terms.

He maintains detailed knowledge of ongoing construction progress and takes pride in keeping clients informed throughout their purchase journey.`,
    credentials: [
      { title: 'Licensed Real Estate Agent', issuer: 'Kurdistan Regional Government', year: 2020 },
      { title: 'New Development Sales Certification', issuer: 'Real House Academy', year: 2021 }
    ],
    education: [
      'Bachelor of Architecture - University of Duhok, 2018',
      'Property Sales Certificate - Erbil Business School, 2020'
    ],
    awards: [
      'Fastest Growing Consultant (2022)',
      'Off-Plan Sales Excellence (2023)'
    ],
    transactionCount: 95,
    transactionVolume: 9500000,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/karwanrashid',
      email: 'karwan.r@realhouseiq.com'
    },
    isFounder: false,
    isLeadership: false
  },
  {
    id: 'hana-jalal',
    name: 'Hana Jalal',
    role: 'Commercial Property Specialist',
    title: 'Commercial Property Consultant',
    department: 'investment',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fm=webp',
    phone: '+964 751 441 5003',
    email: 'hana@realhouseiq.com',
    languages: ['Kurdish', 'Arabic', 'English'],
    yearsExperience: 7,
    yearsWithCompany: 5,
    specializations: ['Retail Spaces', 'Office Properties', 'Commercial Leasing', 'Business Location Advisory'],
    bio: 'Commercial real estate specialist focusing on retail and office spaces for businesses of all sizes.',
    fullBio: `Hana Jalal leads Real House's commercial property services, helping businesses find the perfect locations for their operations. With 7 years of commercial real estate experience, she understands the unique needs of retail businesses, professional services, and corporate clients.

Hana provides comprehensive market analysis, lease negotiation support, and location advisory services. Her clients range from small local businesses to international companies establishing their Kurdistan presence.

She maintains extensive data on commercial property performance, foot traffic patterns, and rental trends, enabling data-driven recommendations for every client.`,
    credentials: [
      { title: 'Licensed Real Estate Agent', issuer: 'Kurdistan Regional Government', year: 2017 },
      { title: 'Commercial Real Estate Certificate', issuer: 'IREM', year: 2020 }
    ],
    education: [
      'Bachelor of Business Administration - University of Salahaddin, 2016',
      'Commercial Property Management - Online Certificate, 2019'
    ],
    awards: [
      'Commercial Transaction Leader (2023)',
      'Business Development Excellence (2022)'
    ],
    transactionCount: 85,
    transactionVolume: 12000000,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/hanajalal',
      email: 'hana@realhouseiq.com'
    },
    isFounder: false,
    isLeadership: false
  }
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find(member => member.id === id);
}

export function getLeadershipTeam(): TeamMember[] {
  return teamMembers.filter(member => member.isLeadership);
}

export function getSalesTeam(): TeamMember[] {
  return teamMembers.filter(member => member.department === 'sales');
}

export function getInvestmentTeam(): TeamMember[] {
  return teamMembers.filter(member => member.department === 'investment');
}

export function getTeamByDepartment(department: TeamMember['department']): TeamMember[] {
  return teamMembers.filter(member => member.department === department);
}

export function getFounders(): TeamMember[] {
  return teamMembers.filter(member => member.isFounder);
}

// ─── Author Schema Generation ────────────────────────────────────────────────

export function generateAuthorSchema(member: TeamMember): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': member.name,
    'jobTitle': member.title,
    'worksFor': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': 'https://realhouseiq.com'
    },
    'description': member.fullBio.substring(0, 500),
    'image': member.image,
    'telephone': member.phone,
    'email': member.email,
    'knowsLanguage': member.languages.map(lang => ({ '@type': 'Language', 'name': lang })),
    'hasCredential': member.credentials.map(cred => ({
      '@type': 'EducationalOccupationalCredential',
      'credentialCategory': 'Professional Certification',
      'name': cred.title,
      'recognizedBy': {
        '@type': 'Organization',
        'name': cred.issuer
      }
    })),
    'alumniOf': member.education.map(edu => {
      const parts = edu.split(' - ');
      return {
        '@type': 'EducationalOrganization',
        'name': parts[1] || edu
      };
    }),
    'award': member.awards,
    'sameAs': [
      member.socialLinks.linkedin,
      member.socialLinks.instagram,
      member.socialLinks.twitter
    ].filter(Boolean)
  };
}
