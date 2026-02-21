// ═══════════════════════════════════════════════════════════════════════════
// Company E-E-A-T Data - Real House
// Experience, Expertise, Authoritativeness, Trustworthiness
// ═══════════════════════════════════════════════════════════════════════════

// ─── Company History ─────────────────────────────────────────────────────────

export interface CompanyMilestone {
  year: number;
  title: string;
  description: string;
  icon: string;
}

export const companyHistory = {
  foundedYear: 2001,
  yearsInBusiness: 23,
  foundingStory: `Real House was founded in 2001 by Karwan Hassan and Ahmad Mahmoud, two visionary real estate professionals who recognized the untapped potential of Kurdistan's property market. Starting from a modest office in central Erbil, they built a reputation for integrity, market expertise, and personalized service.

Over 23 years, Real House has grown from a two-person operation to the region's most trusted luxury real estate agency, with a team of 25+ professionals serving clients across Kurdistan and internationally.

Our founders' original vision - to provide world-class real estate services while maintaining the personal touch of a family business - remains at the heart of everything we do today.`,
  mission: 'To connect discerning buyers with exceptional properties while providing unparalleled service, expert guidance, and complete transparency throughout every transaction.',
  vision: 'To be the definitive authority in Kurdistan luxury real estate, setting the standard for excellence, innovation, and client satisfaction.',
  coreValues: [
    {
      title: 'Excellence',
      description: 'We pursue perfection in every detail, from property selection to client service, ensuring outcomes that exceed expectations.',
      icon: 'icon-award'
    },
    {
      title: 'Integrity',
      description: 'Honesty and transparency guide every interaction. We provide accurate information and realistic expectations, building trust through ethical practice.',
      icon: 'icon-shield'
    },
    {
      title: 'Expertise',
      description: 'Our deep market knowledge, continuous education, and 23 years of experience enable us to provide insights and guidance you can rely on.',
      icon: 'icon-book'
    },
    {
      title: 'Innovation',
      description: 'We leverage cutting-edge technology, virtual tours, and modern marketing to deliver superior real estate experiences.',
      icon: 'icon-lightbulb'
    },
    {
      title: 'Client Focus',
      description: 'Your goals are our priority. We listen, understand, and work tirelessly to match you with the perfect property.',
      icon: 'icon-heart'
    }
  ]
};

export const milestones: CompanyMilestone[] = [
  {
    year: 2001,
    title: 'Company Founded',
    description: 'Real House established in central Erbil by founders Karwan Hassan and Ahmad Mahmoud',
    icon: 'icon-flag'
  },
  {
    year: 2005,
    title: 'First Major Development Partnership',
    description: 'Became exclusive sales partner for Dream City residential community',
    icon: 'icon-handshake'
  },
  {
    year: 2008,
    title: 'Expansion to Commercial Real Estate',
    description: 'Launched dedicated commercial property division serving businesses across Kurdistan',
    icon: 'icon-building'
  },
  {
    year: 2010,
    title: '500+ Transactions Milestone',
    description: 'Celebrated 500 successful property transactions and $50M in total sales volume',
    icon: 'icon-trophy'
  },
  {
    year: 2013,
    title: 'International Client Services',
    description: 'Established dedicated team for international buyers and diaspora clients',
    icon: 'icon-globe'
  },
  {
    year: 2015,
    title: 'Kurdistan Real Estate Excellence Award',
    description: 'Recognized as Best Luxury Real Estate Agency by Kurdistan Business Council',
    icon: 'icon-award'
  },
  {
    year: 2018,
    title: 'Digital Transformation',
    description: 'Launched virtual tour technology and digital transaction platform',
    icon: 'icon-camera'
  },
  {
    year: 2020,
    title: 'Property Management Division',
    description: 'Expanded services to include comprehensive property management for investors',
    icon: 'icon-key'
  },
  {
    year: 2022,
    title: '1000+ Families Served',
    description: 'Reached milestone of helping over 1,000 families find their perfect homes',
    icon: 'icon-home'
  },
  {
    year: 2024,
    title: '$100M+ Transaction Volume',
    description: 'Achieved cumulative transaction volume exceeding $100 million USD',
    icon: 'icon-chart'
  }
];

// ─── Awards and Recognition ──────────────────────────────────────────────────

export interface Award {
  id: string;
  year: number;
  title: string;
  organization: string;
  category: string;
  description: string;
}

export const awards: Award[] = [
  {
    id: 'award-1',
    year: 2024,
    title: 'Best Luxury Real Estate Agency',
    organization: 'Kurdistan Business Awards',
    category: 'Real Estate Excellence',
    description: 'Recognized for outstanding service and market leadership in the luxury property segment'
  },
  {
    id: 'award-2',
    year: 2023,
    title: 'Customer Service Excellence',
    organization: 'Erbil Chamber of Commerce',
    category: 'Service Quality',
    description: 'Awarded for maintaining the highest standards of client satisfaction and professional service'
  },
  {
    id: 'award-3',
    year: 2022,
    title: 'Digital Innovation in Real Estate',
    organization: 'Kurdistan Tech Summit',
    category: 'Technology Innovation',
    description: 'Honored for pioneering virtual tour technology and digital transaction processes'
  },
  {
    id: 'award-4',
    year: 2021,
    title: 'Top Performing Agency',
    organization: 'Iraq Real Estate Association',
    category: 'Sales Performance',
    description: 'Achieved highest sales volume among Kurdistan real estate agencies'
  },
  {
    id: 'award-5',
    year: 2020,
    title: 'Best International Client Services',
    organization: 'International Property Awards',
    category: 'Client Services',
    description: 'Recognized for excellence in serving international and diaspora buyers'
  },
  {
    id: 'award-6',
    year: 2019,
    title: 'Community Impact Award',
    organization: 'Erbil Governorate',
    category: 'Community Service',
    description: 'Acknowledged for contributions to housing accessibility and community development'
  },
  {
    id: 'award-7',
    year: 2018,
    title: 'Marketing Excellence',
    organization: 'Kurdistan Advertising Federation',
    category: 'Marketing',
    description: 'Best real estate marketing campaign for luxury property promotions'
  },
  {
    id: 'award-8',
    year: 2015,
    title: 'Emerging Leader in Real Estate',
    organization: 'Kurdistan Business Council',
    category: 'Leadership',
    description: 'Recognized as a rising force in the Kurdistan property market'
  }
];

// ─── Media Mentions ──────────────────────────────────────────────────────────

export interface MediaMention {
  id: string;
  outlet: string;
  outletLogo: string;
  title: string;
  date: string;
  type: 'article' | 'interview' | 'feature' | 'quote';
  excerpt: string;
  url?: string;
}

export const mediaMentions: MediaMention[] = [
  {
    id: 'media-1',
    outlet: 'Kurdistan 24',
    outletLogo: 'K24',
    title: 'Real House: Transforming Luxury Real Estate in Erbil',
    date: '2024-09-15',
    type: 'feature',
    excerpt: 'An in-depth look at how Real House is setting new standards for luxury property services in the Kurdistan region.'
  },
  {
    id: 'media-2',
    outlet: 'Rudaw',
    outletLogo: 'RUDAW',
    title: 'Investment Opportunities in Kurdistan Real Estate',
    date: '2024-07-22',
    type: 'interview',
    excerpt: 'Real House CEO discusses the current state of property investment and market outlook for international buyers.'
  },
  {
    id: 'media-3',
    outlet: 'NRT',
    outletLogo: 'NRT',
    title: 'Property Market Report: Erbil 2024',
    date: '2024-05-10',
    type: 'quote',
    excerpt: 'Market analysis featuring insights from Real House senior consultants on pricing trends and demand patterns.'
  },
  {
    id: 'media-4',
    outlet: 'Kurdistan Business Magazine',
    outletLogo: 'KBM',
    title: 'Top 10 Real Estate Companies in Kurdistan',
    date: '2024-03-01',
    type: 'feature',
    excerpt: 'Real House ranked among the top real estate agencies in Kurdistan for the fifth consecutive year.'
  },
  {
    id: 'media-5',
    outlet: 'Al Jazeera English',
    outletLogo: 'AJ',
    title: 'Foreign Investment in Iraqi Kurdistan',
    date: '2023-11-28',
    type: 'interview',
    excerpt: 'Real House experts explain the process and opportunities for international property investment in Kurdistan.'
  },
  {
    id: 'media-6',
    outlet: 'Arab News',
    outletLogo: 'AN',
    title: 'Kurdistan\'s Booming Property Market',
    date: '2023-08-14',
    type: 'article',
    excerpt: 'How agencies like Real House are attracting Middle Eastern investors to Erbil\'s luxury market.'
  },
  {
    id: 'media-7',
    outlet: 'Kurdistan TV',
    outletLogo: 'KTV',
    title: 'Real Estate Trends and Predictions',
    date: '2023-06-05',
    type: 'interview',
    excerpt: 'Live interview with Real House market analysts on the future of property development in Erbil.'
  },
  {
    id: 'media-8',
    outlet: 'Erbil Lifestyle',
    outletLogo: 'EL',
    title: 'Finding Your Dream Home in Erbil',
    date: '2023-04-20',
    type: 'feature',
    excerpt: 'A guide to luxury living featuring properties and insights from Real House consultants.'
  }
];

// ─── Professional Affiliations ───────────────────────────────────────────────

export interface Affiliation {
  id: string;
  name: string;
  abbreviation: string;
  type: 'membership' | 'certification' | 'partnership';
  since: number;
  description: string;
  logo?: string;
}

export const affiliations: Affiliation[] = [
  {
    id: 'aff-1',
    name: 'Kurdistan Real Estate Association',
    abbreviation: 'KREA',
    type: 'membership',
    since: 2001,
    description: 'Founding member of the Kurdistan Real Estate Association, contributing to industry standards and ethics'
  },
  {
    id: 'aff-2',
    name: 'Iraq Chamber of Commerce',
    abbreviation: 'ICC',
    type: 'membership',
    since: 2003,
    description: 'Active member of the Iraq Chamber of Commerce, Erbil Branch'
  },
  {
    id: 'aff-3',
    name: 'International Real Estate Federation',
    abbreviation: 'FIABCI',
    type: 'membership',
    since: 2015,
    description: 'Member of the global real estate network connecting professionals across 70+ countries'
  },
  {
    id: 'aff-4',
    name: 'Kurdistan Investment Board',
    abbreviation: 'KIB',
    type: 'partnership',
    since: 2010,
    description: 'Official partner for facilitating foreign investment in Kurdistan real estate'
  },
  {
    id: 'aff-5',
    name: 'Certified Commercial Investment Member',
    abbreviation: 'CCIM',
    type: 'certification',
    since: 2018,
    description: 'Team members hold CCIM designation for commercial real estate expertise'
  },
  {
    id: 'aff-6',
    name: 'National Association of Realtors',
    abbreviation: 'NAR',
    type: 'membership',
    since: 2019,
    description: 'International affiliate member following NAR ethical standards and practices'
  },
  {
    id: 'aff-7',
    name: 'Kurdistan Tourism Board',
    abbreviation: 'KTB',
    type: 'partnership',
    since: 2020,
    description: 'Partner in promoting Kurdistan as a destination for property investment'
  }
];

// ─── Company Certifications and Licenses ─────────────────────────────────────

export interface Certification {
  id: string;
  name: string;
  issuedBy: string;
  number: string;
  validUntil: string;
  type: 'license' | 'certification' | 'registration';
  description: string;
}

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'Real Estate Agency License',
    issuedBy: 'Kurdistan Regional Government - Ministry of Interior',
    number: 'KRG-REA-2001-0847',
    validUntil: '2026-12-31',
    type: 'license',
    description: 'Official license to operate as a real estate agency in Kurdistan Region'
  },
  {
    id: 'cert-2',
    name: 'Commercial Business Registration',
    issuedBy: 'Erbil Chamber of Commerce',
    number: 'ECC-2001-12847',
    validUntil: '2025-12-31',
    type: 'registration',
    description: 'Registered business entity with full commercial operating rights'
  },
  {
    id: 'cert-3',
    name: 'Property Valuation Certification',
    issuedBy: 'Iraq Real Estate Association',
    number: 'IREA-PV-2018-0234',
    validUntil: '2025-06-30',
    type: 'certification',
    description: 'Certified to conduct official property valuations and appraisals'
  },
  {
    id: 'cert-4',
    name: 'International Property Sales License',
    issuedBy: 'Kurdistan Investment Board',
    number: 'KIB-IPS-2015-0091',
    validUntil: '2026-03-31',
    type: 'license',
    description: 'Licensed to facilitate property sales to international buyers'
  },
  {
    id: 'cert-5',
    name: 'Property Management Certification',
    issuedBy: 'Kurdistan Real Estate Association',
    number: 'KREA-PM-2020-0156',
    validUntil: '2025-09-30',
    type: 'certification',
    description: 'Certified property management services for residential and commercial properties'
  }
];

// ─── Company Statistics (Transaction History) ────────────────────────────────

export const companyStats = {
  totalTransactions: 1247,
  totalSalesVolume: 128500000, // $128.5M USD
  averageTransactionValue: 103000,
  clientSatisfactionRate: 98.3,
  repeatClientRate: 67,
  referralRate: 72,
  averageDaysToClose: 34,
  activeListings: 85,
  propertiesSold2024: 142,
  propertiesSold2023: 134,
  internationalClients: 312,
  localClients: 935,
  yearsInBusiness: 23,
  teamMembers: 25,
  languages: ['Kurdish', 'Arabic', 'English', 'Turkish', 'Persian']
};

// ─── Client Demographics ─────────────────────────────────────────────────────

export const clientDemographics = {
  byType: [
    { type: 'Individual Buyers', percentage: 58 },
    { type: 'Investors', percentage: 24 },
    { type: 'Corporate Clients', percentage: 12 },
    { type: 'Diplomatic/NGO', percentage: 6 }
  ],
  byOrigin: [
    { origin: 'Kurdistan Region', percentage: 65 },
    { origin: 'Federal Iraq', percentage: 12 },
    { origin: 'UAE & Gulf States', percentage: 8 },
    { origin: 'Europe', percentage: 7 },
    { origin: 'North America', percentage: 5 },
    { origin: 'Other', percentage: 3 }
  ],
  byPropertyType: [
    { type: 'Apartments', percentage: 42 },
    { type: 'Villas', percentage: 28 },
    { type: 'Commercial', percentage: 18 },
    { type: 'Land', percentage: 8 },
    { type: 'Other', percentage: 4 }
  ]
};

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getAwardsByYear(year: number): Award[] {
  return awards.filter(award => award.year === year);
}

export function getRecentAwards(count: number = 5): Award[] {
  return awards.sort((a, b) => b.year - a.year).slice(0, count);
}

export function getRecentMediaMentions(count: number = 5): MediaMention[] {
  return mediaMentions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${amount.toLocaleString()}`;
}
