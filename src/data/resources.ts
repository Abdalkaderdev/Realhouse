// ═══════════════════════════════════════════════════════════════════════════
// Resource Center Data - Downloadable Guides and Expert Content
// E-E-A-T Content for Expertise and Authority
// ═══════════════════════════════════════════════════════════════════════════

// ─── Downloadable Resources ──────────────────────────────────────────────────

export interface DownloadableResource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'report' | 'checklist' | 'toolkit' | 'ebook';
  category: 'buyers' | 'sellers' | 'investors' | 'market' | 'legal';
  pageCount: number;
  downloadUrl: string;
  coverImage: string;
  lastUpdated: string;
  featured: boolean;
  tags: string[];
}

export const downloadableResources: DownloadableResource[] = [
  {
    id: 'buyers-guide-erbil',
    title: 'The Complete Erbil Property Buyer\'s Guide 2025',
    description: 'Everything you need to know about buying property in Erbil, from finding the right neighborhood to closing the deal. Includes checklists, cost breakdowns, and expert tips.',
    type: 'guide',
    category: 'buyers',
    pageCount: 42,
    downloadUrl: '/resources/buyers-guide-erbil-2025.pdf',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&fm=webp',
    lastUpdated: '2025-01-15',
    featured: true,
    tags: ['buying', 'erbil', 'guide', 'process', 'first-time buyers']
  },
  {
    id: 'investment-guide-kurdistan',
    title: 'Kurdistan Property Investment Guide',
    description: 'Comprehensive guide for investors looking to capitalize on Kurdistan\'s growing real estate market. Covers ROI analysis, risk factors, and investment strategies.',
    type: 'ebook',
    category: 'investors',
    pageCount: 58,
    downloadUrl: '/resources/investment-guide-kurdistan.pdf',
    coverImage: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80&fm=webp',
    lastUpdated: '2025-01-10',
    featured: true,
    tags: ['investment', 'ROI', 'kurdistan', 'portfolio', 'strategy']
  },
  {
    id: 'market-report-q4-2024',
    title: 'Erbil Real Estate Market Report Q4 2024',
    description: 'Quarterly analysis of Erbil\'s property market including price trends, transaction volumes, and forecasts for the coming quarter.',
    type: 'report',
    category: 'market',
    pageCount: 24,
    downloadUrl: '/resources/market-report-q4-2024.pdf',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=webp',
    lastUpdated: '2025-01-05',
    featured: true,
    tags: ['market', 'report', 'trends', 'analysis', 'prices']
  },
  {
    id: 'sellers-checklist',
    title: 'Property Seller\'s Checklist',
    description: 'Step-by-step checklist for preparing your property for sale, including staging tips, documentation requirements, and pricing strategies.',
    type: 'checklist',
    category: 'sellers',
    pageCount: 12,
    downloadUrl: '/resources/sellers-checklist.pdf',
    coverImage: 'https://images.unsplash.com/photo-1560440021-33f9b867899d?w=800&q=80&fm=webp',
    lastUpdated: '2024-12-20',
    featured: false,
    tags: ['selling', 'checklist', 'preparation', 'staging']
  },
  {
    id: 'foreign-buyers-legal',
    title: 'Legal Guide for Foreign Property Buyers',
    description: 'Essential legal information for international buyers, including ownership rights, documentation requirements, and common legal pitfalls to avoid.',
    type: 'guide',
    category: 'legal',
    pageCount: 28,
    downloadUrl: '/resources/foreign-buyers-legal-guide.pdf',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80&fm=webp',
    lastUpdated: '2024-12-15',
    featured: true,
    tags: ['legal', 'foreign buyers', 'documentation', 'ownership']
  },
  {
    id: 'neighborhood-comparison',
    title: 'Erbil Neighborhoods Comparison Guide',
    description: 'Detailed comparison of Erbil\'s top residential areas including Gulan, Dream City, Italian Village, and Ankawa. Covers amenities, prices, and lifestyle factors.',
    type: 'guide',
    category: 'buyers',
    pageCount: 32,
    downloadUrl: '/resources/neighborhood-comparison.pdf',
    coverImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80&fm=webp',
    lastUpdated: '2024-12-10',
    featured: false,
    tags: ['neighborhoods', 'comparison', 'gulan', 'dream city', 'ankawa']
  },
  {
    id: 'off-plan-buyers-toolkit',
    title: 'Off-Plan Property Buyer\'s Toolkit',
    description: 'Essential tools and templates for evaluating off-plan purchases including developer assessment checklists, payment plan calculators, and contract review guides.',
    type: 'toolkit',
    category: 'buyers',
    pageCount: 18,
    downloadUrl: '/resources/off-plan-toolkit.pdf',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&fm=webp',
    lastUpdated: '2024-11-28',
    featured: false,
    tags: ['off-plan', 'toolkit', 'developers', 'contracts']
  },
  {
    id: 'rental-investment-analysis',
    title: 'Rental Property Investment Analysis Template',
    description: 'Excel-based template for analyzing potential rental investments including yield calculations, expense projections, and ROI forecasting.',
    type: 'toolkit',
    category: 'investors',
    pageCount: 8,
    downloadUrl: '/resources/rental-investment-template.xlsx',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&fm=webp',
    lastUpdated: '2024-11-20',
    featured: false,
    tags: ['rental', 'investment', 'ROI', 'analysis', 'calculator']
  },
  {
    id: 'property-inspection-checklist',
    title: 'Property Inspection Checklist',
    description: 'Comprehensive checklist for inspecting properties before purchase, covering structural elements, systems, finishes, and red flags to watch for.',
    type: 'checklist',
    category: 'buyers',
    pageCount: 6,
    downloadUrl: '/resources/inspection-checklist.pdf',
    coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&fm=webp',
    lastUpdated: '2024-11-15',
    featured: false,
    tags: ['inspection', 'checklist', 'due diligence', 'property condition']
  },
  {
    id: 'market-report-annual-2024',
    title: 'Erbil Real Estate Annual Market Report 2024',
    description: 'Comprehensive annual review of the Erbil property market with year-over-year comparisons, major transactions, and 2025 outlook.',
    type: 'report',
    category: 'market',
    pageCount: 48,
    downloadUrl: '/resources/annual-market-report-2024.pdf',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fm=webp',
    lastUpdated: '2025-01-08',
    featured: true,
    tags: ['market', 'annual report', 'trends', '2024', 'review']
  }
];

// ─── Expert Content / Market Analysis ────────────────────────────────────────

export interface MarketAnalysis {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  category: 'price-trends' | 'predictions' | 'investment-advice' | 'legal-guide' | 'neighborhood-analysis';
  readTime: number;
  image: string;
  keyTakeaways: string[];
  relatedResources: string[];
}

export const marketAnalyses: MarketAnalysis[] = [
  {
    id: 'erbil-price-trends-2025',
    title: 'Erbil Property Price Trends: What to Expect in 2025',
    summary: 'Analysis of current price movements and projections for the Erbil real estate market in 2025.',
    content: `
The Erbil property market has demonstrated remarkable resilience and steady growth over the past year. Based on our analysis of transaction data and market indicators, here's what buyers and investors can expect in 2025.

## Current Price Landscape

As of early 2025, average property prices in Erbil's premium neighborhoods stand at:

- **Gulan District**: $1,400-$2,200 per sqm for apartments
- **Dream City**: $900-$1,400 per sqm for villas
- **Italian Village**: $850-$1,200 per sqm for townhouses
- **Empire World**: $1,200-$1,800 per sqm for new development units

Year-over-year, we've observed a 6-8% appreciation in premium locations, with new developments showing slightly higher gains due to strong demand for modern amenities.

## Key Price Drivers

Several factors continue to influence property values in Erbil:

1. **Economic Stability**: Kurdistan's relative stability attracts both local and international investment
2. **Infrastructure Development**: Ongoing road and utility improvements enhance neighborhood values
3. **Supply Constraints**: Limited new development in established areas supports prices
4. **International Interest**: Growing diaspora and foreign investor demand creates upward pressure

## 2025 Outlook

We project moderate price growth of 5-7% for 2025, with premium locations potentially exceeding this range. Key factors to watch:

- New development completions in Empire World and Gulan
- Government infrastructure projects
- Regional economic conditions
- International investment flows

## Recommendations

For buyers considering entering the market:

- **Move decisively** on quality properties in established neighborhoods
- **Consider off-plan** for potentially better entry points
- **Focus on fundamentals**: location, quality, and developer reputation remain paramount
- **Work with experienced agents** who understand local market nuances

At Real House, we help clients navigate these market dynamics with data-driven insights and 23 years of market expertise.
    `,
    author: 'Karwan Hassan',
    authorId: 'karwan-hassan',
    date: '2025-01-20',
    category: 'price-trends',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=webp',
    keyTakeaways: [
      'Premium neighborhoods seeing 6-8% annual appreciation',
      'Moderate 5-7% growth projected for 2025',
      'Limited supply in established areas supports prices',
      'Off-plan purchases offer potentially better entry points'
    ],
    relatedResources: ['market-report-q4-2024', 'buyers-guide-erbil']
  },
  {
    id: 'investment-opportunities-2025',
    title: 'Top Investment Opportunities in Erbil for 2025',
    summary: 'Expert analysis of the most promising real estate investment opportunities in Erbil for the year ahead.',
    content: `
As we enter 2025, Erbil's real estate market presents compelling opportunities for investors seeking strong returns in a growing market. Here's our expert analysis of where the best opportunities lie.

## Investment Strategy Overview

Based on current market conditions, we recommend a balanced approach focusing on:

1. **Off-Plan Residential**: Strong appreciation potential with developer payment plans
2. **Premium Rentals**: Consistent yields from expat and corporate demand
3. **Commercial Spaces**: Higher yields in high-traffic locations

## Top Investment Areas

### Gulan District
- **Property Type**: Apartments
- **Expected Yield**: 7-9% rental yield
- **Growth Potential**: Moderate to High
- **Why**: Established demand, excellent amenities, low vacancy rates

### Empire World
- **Property Type**: Mixed-use (residential and commercial)
- **Expected Yield**: 8-10% for commercial units
- **Growth Potential**: High
- **Why**: Major development with integrated amenities, growing tenant base

### Dream City
- **Property Type**: Villas
- **Expected Yield**: 6-8% rental yield
- **Growth Potential**: Moderate
- **Why**: Family-oriented community with strong expat rental demand

## Investment Considerations

### Entry Point
Current prices offer reasonable entry points compared to regional markets. Average cost per sqm in Erbil remains 40-60% below Dubai and 30-40% below Amman.

### Holding Period
We recommend a minimum 3-5 year holding period to capture appreciation and weather market fluctuations.

### Exit Strategy
Consider multiple exit options: resale, continued rental, or potential conversion (residential to commercial where regulations permit).

## Risk Factors

Investors should consider:
- Regional political dynamics
- Currency fluctuation (USD-IQD)
- Developer performance for off-plan purchases
- Tenant market shifts

## Recommendations

For investors ready to act:

1. **Diversify** across property types and neighborhoods
2. **Conduct thorough due diligence** on developers and documentation
3. **Work with established agencies** that provide ongoing support
4. **Consider property management services** for hands-off investment

Real House offers comprehensive investment advisory services, from opportunity identification through purchase completion and ongoing property management.
    `,
    author: 'Ahmad Mahmoud',
    authorId: 'ahmad-mahmoud',
    date: '2025-01-15',
    category: 'investment-advice',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80&fm=webp',
    keyTakeaways: [
      'Rental yields of 6-10% available in premium locations',
      'Off-plan purchases offer payment flexibility and appreciation potential',
      'Erbil prices 40-60% below comparable Gulf markets',
      'Diversification across property types recommended'
    ],
    relatedResources: ['investment-guide-kurdistan', 'rental-investment-analysis']
  },
  {
    id: 'foreign-buyer-legal-essentials',
    title: 'Legal Essentials for Foreign Property Buyers in Kurdistan',
    summary: 'Comprehensive legal guide for international buyers navigating property ownership in the Kurdistan Region.',
    content: `
The Kurdistan Region of Iraq welcomes foreign property investment, but understanding the legal framework is essential for a successful purchase. This guide covers the key legal aspects every international buyer should know.

## Legal Framework Overview

Property ownership in Kurdistan is governed by:

1. **Kurdistan Region Property Laws**: Specific regulations for the KRG area
2. **Iraqi Civil Code**: Underlying national property law
3. **Foreign Investment Laws**: Provisions for international buyers

## Can Foreigners Buy Property?

**Yes.** Foreign nationals can legally purchase property in the Kurdistan Region, including:

- Residential properties (apartments, villas, townhouses)
- Commercial properties (shops, offices, warehouses)
- Land (with some restrictions)

This is distinct from federal Iraq, where foreign ownership is more restricted.

## Required Documentation

Foreign buyers should prepare:

1. **Valid Passport**: Original and certified copies
2. **Visa/Residency Documentation**: If applicable
3. **Proof of Funds**: Bank statements or financial verification
4. **Power of Attorney**: If purchasing through a representative
5. **Tax Documentation**: Depending on origin country

## The Purchase Process

### Step 1: Due Diligence
- Verify property title and ownership chain
- Check for liens, encumbrances, or disputes
- Review building permits and approvals

### Step 2: Contract Negotiation
- Draft preliminary sale agreement
- Define payment terms and conditions
- Include contingencies as appropriate

### Step 3: Title Transfer
- Finalize payment arrangements
- Complete title registration at Real Estate Registration Department
- Receive official ownership documentation

## Key Legal Protections

Kurdistan law provides protections including:

- **Clear title registration**: Official government documentation
- **Contract enforceability**: Legal recourse for contract violations
- **Property rights**: Same rights as local owners (with some land exceptions)

## Common Pitfalls to Avoid

1. **Insufficient due diligence**: Always verify documentation thoroughly
2. **Unregistered transactions**: Ensure all transfers are officially recorded
3. **Unauthorized intermediaries**: Work with licensed, reputable agents
4. **Verbal agreements**: Get everything in writing

## Professional Support

We strongly recommend working with:

- **Licensed real estate agents**: To navigate the market and process
- **Local lawyers**: To review contracts and documentation
- **Registered notaries**: For official certification

## Real House Support

Our team assists foreign buyers with:

- Documentation verification and translation
- Connection to vetted legal professionals
- End-to-end transaction support
- Post-purchase services

We've helped over 300 international buyers successfully purchase property in Kurdistan, navigating the process with confidence.
    `,
    author: 'Shilan Azad',
    authorId: 'shilan-azad',
    date: '2025-01-10',
    category: 'legal-guide',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80&fm=webp',
    keyTakeaways: [
      'Foreign nationals can legally purchase property in Kurdistan',
      'Proper documentation and verification is essential',
      'Official title registration provides legal protection',
      'Professional legal support is strongly recommended'
    ],
    relatedResources: ['foreign-buyers-legal', 'buyers-guide-erbil']
  }
];

// ─── Case Studies ────────────────────────────────────────────────────────────

export interface CaseStudy {
  id: string;
  title: string;
  clientType: string;
  propertyType: string;
  location: string;
  challenge: string;
  solution: string;
  outcome: string;
  testimonialQuote: string;
  clientName: string;
  clientRole?: string;
  image: string;
  transactionValue?: string;
  timeframe: string;
  metrics: { label: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'International Investor Finds Perfect Portfolio',
    clientType: 'International Investor',
    propertyType: 'Apartment Portfolio',
    location: 'Gulan District, Erbil',
    challenge: 'A UAE-based investor wanted to diversify into Kurdistan real estate but had concerns about property verification, management from abroad, and understanding local market dynamics.',
    solution: 'Real House provided comprehensive market analysis, conducted due diligence on 15 potential properties, arranged virtual tours, connected the client with legal counsel, and offered ongoing property management services.',
    outcome: 'The client successfully acquired 3 apartments in Gulan, generating 8.5% rental yield. All properties are now under Real House management with quarterly reporting.',
    testimonialQuote: 'Real House made investing in Kurdistan from Dubai seamless. Their professionalism, transparency, and ongoing support gave me complete confidence.',
    clientName: 'Ali R.',
    clientRole: 'Investor, Dubai',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp',
    transactionValue: '$520,000',
    timeframe: '3 months',
    metrics: [
      { label: 'Properties Acquired', value: '3' },
      { label: 'Rental Yield', value: '8.5%' },
      { label: 'Time to First Tenant', value: '2 weeks' }
    ]
  },
  {
    id: 'case-2',
    title: 'Family Finds Dream Villa in Dream City',
    clientType: 'Relocating Family',
    propertyType: 'Villa',
    location: 'Dream City, Erbil',
    challenge: 'A family relocating from Europe needed a spacious, secure home near international schools with modern amenities and community facilities.',
    solution: 'After detailed consultation about family needs, our team curated 8 villa options in Dream City and Italian Village, arranged viewings, and provided neighborhood analysis including school proximity and community features.',
    outcome: 'The family purchased a 4-bedroom villa in Dream City, moving in within 6 weeks of initial contact. They praised the smooth process and family-oriented community.',
    testimonialQuote: 'The team understood exactly what our family needed. They showed us only properties that matched our criteria, saving us valuable time.',
    clientName: 'Dr. Narin M.',
    clientRole: 'Physician',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
    transactionValue: '$380,000',
    timeframe: '6 weeks',
    metrics: [
      { label: 'Properties Viewed', value: '8' },
      { label: 'Days to Close', value: '28' },
      { label: 'Move-in Time', value: '6 weeks' }
    ]
  },
  {
    id: 'case-3',
    title: 'First-Time Buyer Success Story',
    clientType: 'First-Time Buyer',
    propertyType: 'Apartment',
    location: 'Empire World, Erbil',
    challenge: 'A young professional wanted to purchase their first property but felt overwhelmed by the process, unsure about pricing, and concerned about making a sound investment decision.',
    solution: 'Our team provided step-by-step guidance through the entire process, explained market pricing, helped analyze off-plan vs. ready options, and negotiated favorable payment terms with the developer.',
    outcome: 'The client purchased a 2-bedroom apartment in Empire World with a 4-year payment plan, building equity while paying similar to rent.',
    testimonialQuote: 'As a first-time buyer, I had so many questions. The Real House team patiently guided me through everything and helped me make a decision I\'m proud of.',
    clientName: 'Soran K.',
    clientRole: 'IT Professional',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fm=webp',
    transactionValue: '$145,000',
    timeframe: '2 months',
    metrics: [
      { label: 'Payment Plan Duration', value: '4 years' },
      { label: 'Down Payment', value: '25%' },
      { label: 'Monthly Payment', value: '$2,200' }
    ]
  },
  {
    id: 'case-4',
    title: 'Commercial Expansion Success',
    clientType: 'Business Owner',
    propertyType: 'Retail Space',
    location: 'Queen Towers, Gulan',
    challenge: 'A growing retail business needed to expand to a second location in a high-traffic area with good visibility and accessibility.',
    solution: 'Our commercial team analyzed foot traffic data, identified optimal locations based on target demographics, negotiated lease terms, and coordinated fit-out timeline with the landlord.',
    outcome: 'The business secured a prime corner unit in Queen Towers with favorable lease terms and completed fit-out ahead of schedule.',
    testimonialQuote: 'Real House\'s commercial team found us a location that exceeded our expectations. Our second store outperformed projections from day one.',
    clientName: 'Hemin A.',
    clientRole: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fm=webp',
    timeframe: '5 weeks',
    metrics: [
      { label: 'Space Size', value: '120 sqm' },
      { label: 'Monthly Rent', value: '$3,500' },
      { label: 'Lease Duration', value: '5 years' }
    ]
  }
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getResourcesByCategory(category: DownloadableResource['category']): DownloadableResource[] {
  return downloadableResources.filter(r => r.category === category);
}

export function getFeaturedResources(): DownloadableResource[] {
  return downloadableResources.filter(r => r.featured);
}

export function getResourceById(id: string): DownloadableResource | undefined {
  return downloadableResources.find(r => r.id === id);
}

export function getMarketAnalysesByCategory(category: MarketAnalysis['category']): MarketAnalysis[] {
  return marketAnalyses.filter(a => a.category === category);
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.id === id);
}

export function searchResources(query: string): DownloadableResource[] {
  const lowerQuery = query.toLowerCase();
  return downloadableResources.filter(r =>
    r.title.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery) ||
    r.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
