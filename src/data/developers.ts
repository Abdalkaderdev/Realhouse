// ═══════════════════════════════════════════════════════════════════════════
// Developer/Real Estate Company Directory Data - Erbil, Kurdistan
// ═══════════════════════════════════════════════════════════════════════════

export interface DeveloperOffice {
  name: string;
  address: string;
  city: string;
  phone: string;
  email?: string;
  isHeadquarters: boolean;
}

export interface DeveloperAchievement {
  year: number;
  title: string;
  description: string;
}

export interface Developer {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  logo: string;
  logoAlt?: string;
  tagline: string;
  description: string;
  history: string;
  foundedYear: number;
  parentCompany?: string;
  website?: string;
  totalProjects: number;
  totalUnitsDelivered: number;
  unitsUnderConstruction?: number;
  specializations: string[];
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  offices: DeveloperOffice[];
  projectIds: string[]; // References to project IDs from projects.ts
  achievements: DeveloperAchievement[];
  certifications?: string[];
  awards?: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  metaTitle: string;
  metaDescription: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Developer Companies - Major Real Estate Developers in Erbil
// ═══════════════════════════════════════════════════════════════════════════

export const developers: Developer[] = [
  {
    id: 'empire-world-developers',
    slug: 'empire-world',
    name: 'Empire World',
    shortName: 'Empire',
    logo: '/images/developers/empire-world-logo.svg',
    logoAlt: 'Empire World Developer Logo - Erbil Premier Development Company',
    tagline: 'Building Kurdistan\'s Future',
    description: `Empire World is Erbil's most ambitious real estate development company, backed by DAMAC Properties - one of the Middle East's largest luxury property developers. The company is developing the landmark Empire World project, a mixed-use mega-development that will transform Erbil's skyline and establish new standards for luxury living in Kurdistan.

With a commitment to excellence and international quality standards, Empire World brings world-class development expertise to the Kurdistan Region, creating iconic properties that combine luxury, innovation, and investment value.`,
    history: `Empire World was established in 2018 as a joint venture between local Kurdish investors and DAMAC Properties, the Dubai-based luxury real estate giant founded by Hussain Sajwani. This partnership brings decades of international development experience to Erbil.

The company's flagship project, Empire World, was conceived as a transformative development that would position Erbil as a premier destination for business, luxury living, and tourism in the Middle East. Construction began in 2019, with the project designed to be completed in multiple phases through 2027.

Empire World represents the largest single real estate investment in Kurdistan's history, demonstrating confidence in the region's stability and growth potential.`,
    foundedYear: 2018,
    parentCompany: 'DAMAC Properties (Partner)',
    website: 'https://empireworld.iq',
    totalProjects: 1,
    totalUnitsDelivered: 0,
    unitsUnderConstruction: 2500,
    specializations: [
      'Mixed-Use Developments',
      'Luxury Residential Towers',
      'Five-Star Hospitality',
      'Premium Retail',
      'Class A Office Space',
      'Smart Building Technology'
    ],
    contact: {
      phone: '+964 750 123 4567',
      email: 'info@empireworld.iq',
      whatsapp: '+964750123456'
    },
    offices: [
      {
        name: 'Empire World Sales Center',
        address: 'Empire World Complex, Gulan District',
        city: 'Erbil',
        phone: '+964 750 123 4567',
        email: 'sales@empireworld.iq',
        isHeadquarters: true
      }
    ],
    projectIds: ['empire-world'],
    achievements: [
      {
        year: 2023,
        title: 'Best Mega Development Award',
        description: 'Recognized as Kurdistan\'s most ambitious real estate project at the Kurdistan Business Awards'
      },
      {
        year: 2022,
        title: 'International Quality Certification',
        description: 'Achieved ISO 9001:2015 certification for quality management systems'
      },
      {
        year: 2021,
        title: 'Green Building Initiative',
        description: 'Committed to LEED certification for sustainable building practices'
      },
      {
        year: 2019,
        title: 'Groundbreaking Ceremony',
        description: 'Official project launch with KRG officials and international partners'
      }
    ],
    certifications: ['ISO 9001:2015', 'LEED Pre-Certified'],
    awards: ['Kurdistan Business Awards 2023 - Best Development'],
    socialMedia: {
      instagram: 'https://instagram.com/empireworlderbil',
      facebook: 'https://facebook.com/empireworlderbil',
      linkedin: 'https://linkedin.com/company/empire-world-erbil'
    },
    metaTitle: 'Empire World Developer Erbil | DAMAC Partnership | Luxury Development',
    metaDescription: 'Empire World - Kurdistan\'s premier real estate developer backed by DAMAC Properties. Developing Erbil\'s largest mixed-use project with luxury apartments, shopping mall, and five-star hotel.'
  },
  {
    id: 'qaiwan-group',
    slug: 'qaiwan-group',
    name: 'Qaiwan Group',
    shortName: 'Qaiwan',
    logo: '/images/developers/qaiwan-group-logo.svg',
    logoAlt: 'Qaiwan Group Logo - Kurdistan Leading Investment Company',
    tagline: 'Investing in Kurdistan\'s Tomorrow',
    description: `Qaiwan Group is one of Kurdistan's largest and most diversified investment conglomerates, with significant interests in real estate development, energy, telecommunications, and hospitality. The group has been instrumental in shaping Erbil's modern landscape through strategic investments in premium residential and commercial projects.

As a pioneer in Kurdistan's private sector, Qaiwan Group brings financial strength, local expertise, and international partnerships to every development project.`,
    history: `Founded in 2003 by local entrepreneurs, Qaiwan Group emerged during Kurdistan's post-2003 economic revival. Starting with telecommunications and energy investments, the group expanded into real estate in 2008, recognizing the growing demand for quality housing and commercial space.

Over two decades, Qaiwan has developed a reputation for delivering quality projects on time and building strong relationships with international partners. The group's real estate portfolio includes residential communities, shopping centers, and mixed-use developments across Erbil and other Kurdistan cities.

Today, Qaiwan Group employs over 2,000 people across its various businesses and remains committed to Kurdistan's economic development.`,
    foundedYear: 2003,
    website: 'https://qaiwan.com',
    totalProjects: 8,
    totalUnitsDelivered: 3500,
    unitsUnderConstruction: 1200,
    specializations: [
      'Residential Communities',
      'Mixed-Use Developments',
      'Shopping Centers',
      'Hospitality Projects',
      'Infrastructure Development'
    ],
    contact: {
      phone: '+964 750 234 5678',
      email: 'realestate@qaiwan.com',
      whatsapp: '+9647502345678'
    },
    offices: [
      {
        name: 'Qaiwan Group Headquarters',
        address: 'Qaiwan Tower, 100m Street',
        city: 'Erbil',
        phone: '+964 750 234 5678',
        email: 'info@qaiwan.com',
        isHeadquarters: true
      },
      {
        name: 'Sulaymaniyah Office',
        address: 'Salim Street, Business District',
        city: 'Sulaymaniyah',
        phone: '+964 750 234 5679',
        isHeadquarters: false
      }
    ],
    projectIds: [],
    achievements: [
      {
        year: 2023,
        title: 'Top Investment Group',
        description: 'Ranked as Kurdistan\'s leading private investment group by Forbes Middle East'
      },
      {
        year: 2021,
        title: '3,000 Units Delivered',
        description: 'Milestone of delivering 3,000 residential units across Kurdistan'
      },
      {
        year: 2018,
        title: 'Community Development Award',
        description: 'Recognized for contributions to community infrastructure and employment'
      },
      {
        year: 2015,
        title: 'Best Developer Award',
        description: 'Kurdistan Chamber of Commerce award for real estate excellence'
      }
    ],
    socialMedia: {
      instagram: 'https://instagram.com/qaiwangroup',
      facebook: 'https://facebook.com/qaiwangroup',
      linkedin: 'https://linkedin.com/company/qaiwan-group'
    },
    metaTitle: 'Qaiwan Group Erbil | Kurdistan Real Estate Developer | Investment Leader',
    metaDescription: 'Qaiwan Group - Kurdistan\'s leading investment conglomerate with 8+ major real estate projects. Over 3,500 units delivered. Trusted developer since 2003.'
  },
  {
    id: 'darin-group',
    slug: 'darin-group',
    name: 'Darin Group',
    shortName: 'Darin',
    logo: '/images/developers/darin-group-logo.svg',
    logoAlt: 'Darin Group Logo - Erbil Quality Real Estate Developer',
    tagline: 'Quality Living, Trusted Developer',
    description: `Darin Group is a respected real estate development company known for delivering high-quality residential communities in Erbil. The company focuses on creating livable neighborhoods with modern amenities, green spaces, and family-friendly environments.

With a portfolio of successful projects including Dream City, Darin Group has earned the trust of thousands of families who have made their properties home.`,
    history: `Darin Group was established in 2005 by a group of Kurdish businessmen with a vision to address the growing housing needs in Erbil. Starting with modest townhouse developments, the company gradually expanded its capabilities and ambitions.

The successful development of Dream City, one of Erbil's largest residential communities, established Darin Group as a major player in Kurdistan's real estate sector. The project's emphasis on community amenities, security, and quality construction set new standards for residential development in the region.

Building on this success, Darin Group has continued to launch new projects, always maintaining its commitment to quality and customer satisfaction.`,
    foundedYear: 2005,
    website: 'https://daringroup.iq',
    totalProjects: 5,
    totalUnitsDelivered: 4800,
    unitsUnderConstruction: 800,
    specializations: [
      'Master-Planned Communities',
      'Residential Villas',
      'Townhouses',
      'Affordable Housing',
      'Community Development'
    ],
    contact: {
      phone: '+964 750 345 6789',
      email: 'info@daringroup.iq',
      whatsapp: '+9647503456789'
    },
    offices: [
      {
        name: 'Darin Group Headquarters',
        address: 'Dream City Main Gate, Building A',
        city: 'Erbil',
        phone: '+964 750 345 6789',
        email: 'sales@daringroup.iq',
        isHeadquarters: true
      }
    ],
    projectIds: ['dream-city'],
    achievements: [
      {
        year: 2023,
        title: 'Best Community Developer',
        description: 'Awarded for excellence in master-planned community development'
      },
      {
        year: 2022,
        title: '4,500 Families Housed',
        description: 'Celebrated milestone of housing 4,500 families in Dream City'
      },
      {
        year: 2020,
        title: 'Green Community Award',
        description: 'Recognized for sustainable landscaping and green space development'
      },
      {
        year: 2017,
        title: 'Customer Satisfaction Excellence',
        description: '95% customer satisfaction rating in annual survey'
      }
    ],
    socialMedia: {
      instagram: 'https://instagram.com/daringrouperbil',
      facebook: 'https://facebook.com/daringroup'
    },
    metaTitle: 'Darin Group Erbil | Dream City Developer | Family Residential Communities',
    metaDescription: 'Darin Group - Trusted Erbil developer behind Dream City. 4,800+ units delivered. Quality residential communities with modern amenities and family-friendly environments.'
  },
  {
    id: 'kar-group',
    slug: 'kar-group',
    name: 'Kar Group',
    shortName: 'Kar',
    logo: '/images/developers/kar-group-logo.svg',
    logoAlt: 'Kar Group Logo - Italian Village Developer Erbil',
    tagline: 'European Elegance in Kurdistan',
    description: `Kar Group is the visionary developer behind Italian Village, one of Erbil's most distinctive residential communities. The company specializes in creating European-inspired living environments that combine Mediterranean architecture, premium quality, and modern conveniences.

With a focus on lifestyle-oriented development, Kar Group creates neighborhoods that offer residents a unique living experience with restaurants, cafes, boutiques, and community spaces.`,
    history: `Kar Group was founded in 2007 by a partnership between Kurdish and Italian investors who shared a vision of bringing European design and lifestyle to Kurdistan. This unique collaboration resulted in Italian Village, a project that would become one of Erbil's most recognizable addresses.

The success of Italian Village, with its distinctive architecture, central piazza, and vibrant community atmosphere, established Kar Group as a leader in lifestyle-oriented development. The project attracted both local and expatriate residents, creating a diverse international community.

Kar Group continues to develop projects that emphasize quality of life, architectural character, and community building.`,
    foundedYear: 2007,
    website: 'https://kargroup.iq',
    totalProjects: 3,
    totalUnitsDelivered: 2100,
    unitsUnderConstruction: 400,
    specializations: [
      'European-Style Architecture',
      'Lifestyle Communities',
      'Mixed-Use Neighborhoods',
      'Hospitality Integration',
      'Retail Development'
    ],
    contact: {
      phone: '+964 750 456 7890',
      email: 'info@kargroup.iq',
      whatsapp: '+9647504567890'
    },
    offices: [
      {
        name: 'Kar Group Sales Office',
        address: 'Italian Village Central Piazza',
        city: 'Erbil',
        phone: '+964 750 456 7890',
        email: 'sales@kargroup.iq',
        isHeadquarters: true
      }
    ],
    projectIds: ['italian-village'],
    achievements: [
      {
        year: 2022,
        title: 'Best Architectural Design',
        description: 'International Property Awards recognition for distinctive Mediterranean design'
      },
      {
        year: 2020,
        title: 'Lifestyle Community Award',
        description: 'Recognized for creating Kurdistan\'s premier lifestyle neighborhood'
      },
      {
        year: 2018,
        title: 'Tourism Contribution Award',
        description: 'Acknowledged for attracting visitors and enhancing Erbil\'s appeal'
      },
      {
        year: 2015,
        title: 'Full Occupancy Achievement',
        description: 'Italian Village Phase 1 achieved 100% occupancy within 18 months'
      }
    ],
    socialMedia: {
      instagram: 'https://instagram.com/italianvillageerbil',
      facebook: 'https://facebook.com/italianvillageerbil'
    },
    metaTitle: 'Kar Group Erbil | Italian Village Developer | European-Style Living',
    metaDescription: 'Kar Group - Developer of Italian Village, Erbil\'s premier European-style community. Mediterranean architecture, lifestyle amenities, and vibrant community atmosphere.'
  },
  {
    id: 'faruk-group',
    slug: 'faruk-group',
    name: 'Faruk Group',
    shortName: 'Faruk',
    logo: '/images/developers/faruk-group-logo.svg',
    logoAlt: 'Faruk Group Logo - Kurdistan Construction & Development',
    tagline: 'Building Kurdistan Since 1995',
    description: `Faruk Group is one of Kurdistan's oldest and most established construction and development companies. With roots dating back to 1995, the company has contributed to countless infrastructure, commercial, and residential projects across the region.

Known for technical expertise and reliable delivery, Faruk Group brings engineering excellence to every project, from large-scale infrastructure to boutique residential developments.`,
    history: `Faruk Group was founded in 1995, during a challenging period in Kurdistan's history. Starting as a construction contractor, the company built roads, bridges, and public buildings, earning a reputation for quality workmanship and reliable project delivery.

As Kurdistan's economy grew in the 2000s, Faruk Group expanded into real estate development, applying its construction expertise to create residential and commercial projects. The company's deep understanding of local conditions, materials, and workforce made it a trusted partner for both local and international developers.

Today, Faruk Group operates across construction, development, and infrastructure sectors, employing over 1,500 workers and maintaining a fleet of modern construction equipment.`,
    foundedYear: 1995,
    website: 'https://farukgroup.com',
    totalProjects: 12,
    totalUnitsDelivered: 2800,
    unitsUnderConstruction: 600,
    specializations: [
      'Infrastructure Development',
      'Commercial Construction',
      'Residential Projects',
      'Industrial Facilities',
      'Design-Build Services'
    ],
    contact: {
      phone: '+964 750 567 8901',
      email: 'info@farukgroup.com',
      whatsapp: '+9647505678901'
    },
    offices: [
      {
        name: 'Faruk Group Headquarters',
        address: 'Industrial Area, 60m Road',
        city: 'Erbil',
        phone: '+964 750 567 8901',
        email: 'projects@farukgroup.com',
        isHeadquarters: true
      },
      {
        name: 'Duhok Regional Office',
        address: 'Main Boulevard',
        city: 'Duhok',
        phone: '+964 750 567 8902',
        isHeadquarters: false
      }
    ],
    projectIds: [],
    achievements: [
      {
        year: 2023,
        title: 'Infrastructure Excellence',
        description: 'Completed major highway project connecting Erbil to surrounding areas'
      },
      {
        year: 2021,
        title: '25 Years in Business',
        description: 'Celebrated 25 years of continuous operation in Kurdistan'
      },
      {
        year: 2019,
        title: 'Safety Award',
        description: '5 years without major workplace incidents'
      },
      {
        year: 2015,
        title: 'Contractor of the Year',
        description: 'Kurdistan Construction Association recognition'
      }
    ],
    certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001'],
    socialMedia: {
      linkedin: 'https://linkedin.com/company/faruk-group'
    },
    metaTitle: 'Faruk Group Erbil | Kurdistan Construction Company | Est. 1995',
    metaDescription: 'Faruk Group - Kurdistan\'s trusted construction and development company since 1995. 12+ projects, 2,800 units delivered. Infrastructure, commercial, and residential expertise.'
  },
  {
    id: 'naz-city-developers',
    slug: 'naz-city-developers',
    name: 'Naz City Developers',
    shortName: 'Naz City',
    logo: '/images/developers/naz-city-logo.svg',
    logoAlt: 'Naz City Developers Logo - Modern Urban Development Erbil',
    tagline: 'Modern Living, Smart Communities',
    description: `Naz City Developers is a progressive real estate company focused on creating modern, technology-enabled residential communities. The company's flagship Naz City project introduces smart home features, sustainable design, and contemporary architecture to Erbil's housing market.

Targeting young professionals and modern families, Naz City Developers creates communities that embrace technology while maintaining the warmth and hospitality of Kurdish culture.`,
    history: `Naz City Developers was established in 2015 by a team of young Kurdish entrepreneurs and engineers who returned from studying abroad. Bringing fresh perspectives on urban development, they set out to create housing that meets the expectations of a new generation of homebuyers.

The company's approach combines modern design, smart technology integration, and sustainable building practices. Their flagship Naz City project features solar-ready infrastructure, fiber optic connectivity, and energy-efficient construction.

Naz City Developers continues to innovate, recently partnering with technology companies to integrate smart home systems and developing a mobile app for community management.`,
    foundedYear: 2015,
    website: 'https://nazcity.iq',
    totalProjects: 3,
    totalUnitsDelivered: 1200,
    unitsUnderConstruction: 800,
    specializations: [
      'Smart Home Communities',
      'Sustainable Development',
      'Modern Architecture',
      'Technology Integration',
      'Urban Planning'
    ],
    contact: {
      phone: '+964 750 678 9012',
      email: 'info@nazcity.iq',
      whatsapp: '+9647506789012'
    },
    offices: [
      {
        name: 'Naz City Sales Center',
        address: 'Naz City Main Entrance',
        city: 'Erbil',
        phone: '+964 750 678 9012',
        email: 'sales@nazcity.iq',
        isHeadquarters: true
      }
    ],
    projectIds: ['naz-city'],
    achievements: [
      {
        year: 2023,
        title: 'Innovation in Housing Award',
        description: 'Recognized for smart home technology integration'
      },
      {
        year: 2022,
        title: 'Green Building Recognition',
        description: 'First developer in Kurdistan to achieve energy efficiency certification'
      },
      {
        year: 2021,
        title: 'Young Entrepreneurs Award',
        description: 'Founders recognized by Kurdistan Chamber of Commerce'
      },
      {
        year: 2019,
        title: 'Best New Developer',
        description: 'Kurdistan Real Estate Awards recognition'
      }
    ],
    socialMedia: {
      instagram: 'https://instagram.com/nazcityerbil',
      facebook: 'https://facebook.com/nazcityerbil',
      youtube: 'https://youtube.com/@nazcitydevelopers'
    },
    metaTitle: 'Naz City Developers Erbil | Smart Home Communities | Modern Living',
    metaDescription: 'Naz City Developers - Creating smart, sustainable communities in Erbil. 1,200+ modern units with technology integration. The future of Kurdish housing.'
  },
  {
    id: 'cihan-group',
    slug: 'cihan-group',
    name: 'Cihan Group',
    shortName: 'Cihan',
    logo: '/images/developers/cihan-group-logo.svg',
    logoAlt: 'Cihan Group Logo - Kurdistan Diversified Developer',
    tagline: 'Building Communities, Creating Value',
    description: `Cihan Group is a diversified Kurdish conglomerate with significant real estate holdings and development activities. The group develops residential communities, commercial centers, and hospitality properties across Kurdistan, bringing international standards to local projects.

With interests spanning real estate, media, education, and healthcare, Cihan Group approaches development with a holistic view of community needs.`,
    history: `Cihan Group traces its origins to the 1990s, when founder Bayan Sami Abdul Rahman established media and telecommunications businesses. The group expanded into real estate in 2004, recognizing the opportunity to contribute to Kurdistan's physical development.

Cihan Group's real estate division has since developed residential neighborhoods, shopping centers, and commercial complexes. The group's approach emphasizes creating complete communities with schools, healthcare facilities, and recreational amenities.

The group's commitment to education and healthcare extends to its real estate projects, which often incorporate community facilities and social infrastructure.`,
    foundedYear: 2004,
    website: 'https://cihangroup.com',
    totalProjects: 6,
    totalUnitsDelivered: 2400,
    unitsUnderConstruction: 500,
    specializations: [
      'Integrated Communities',
      'Commercial Development',
      'Healthcare Facilities',
      'Educational Institutions',
      'Hospitality Projects'
    ],
    contact: {
      phone: '+964 750 789 0123',
      email: 'realestate@cihangroup.com',
      whatsapp: '+9647507890123'
    },
    offices: [
      {
        name: 'Cihan Group Tower',
        address: 'Gulan Street',
        city: 'Erbil',
        phone: '+964 750 789 0123',
        email: 'info@cihangroup.com',
        isHeadquarters: true
      }
    ],
    projectIds: [],
    achievements: [
      {
        year: 2023,
        title: 'Community Impact Award',
        description: 'Recognized for integrating social facilities into residential developments'
      },
      {
        year: 2021,
        title: 'Corporate Social Responsibility',
        description: 'Award for community investment and social development programs'
      },
      {
        year: 2018,
        title: 'Best Mixed-Use Development',
        description: 'Kurdistan Real Estate Awards recognition'
      },
      {
        year: 2015,
        title: 'Diversified Company of the Year',
        description: 'Kurdistan Business Council recognition'
      }
    ],
    socialMedia: {
      instagram: 'https://instagram.com/cihangroup',
      facebook: 'https://facebook.com/cihangroup',
      linkedin: 'https://linkedin.com/company/cihan-group'
    },
    metaTitle: 'Cihan Group Erbil | Kurdistan Developer | Integrated Communities',
    metaDescription: 'Cihan Group - Kurdistan diversified developer creating integrated communities with residential, commercial, education, and healthcare facilities. 2,400+ units delivered.'
  },
  {
    id: 'rotana-developers',
    slug: 'rotana-developers',
    name: 'Rotana Developers',
    shortName: 'Rotana',
    logo: '/images/developers/rotana-developers-logo.svg',
    logoAlt: 'Rotana Developers Logo - Luxury Hospitality Real Estate Erbil',
    tagline: 'Hospitality Excellence in Real Estate',
    description: `Rotana Developers specializes in hospitality-adjacent real estate, creating residential and commercial projects that benefit from premium hotel services and amenities. Partnering with international hotel brands, the company develops branded residences and service apartments.

Rotana's projects offer residents the convenience of hotel services with the privacy of residential ownership.`,
    history: `Rotana Developers was established in 2012, capitalizing on growing demand for serviced residences and branded hospitality-real estate projects in Kurdistan. The company partnered with regional hotel groups to develop properties that combine residential comfort with hotel-quality services.

The success of early service apartment projects led to expansion into branded residences and hospitality-integrated developments. Rotana Developers has become known for projects that attract both end-users seeking premium services and investors interested in hotel-managed rental income.

The company continues to explore opportunities for hospitality-real estate integration, including partnerships with international hotel brands considering Kurdistan market entry.`,
    foundedYear: 2012,
    website: 'https://rotanadevelopers.com',
    totalProjects: 4,
    totalUnitsDelivered: 600,
    unitsUnderConstruction: 300,
    specializations: [
      'Branded Residences',
      'Service Apartments',
      'Hospitality Integration',
      'Hotel-Managed Properties',
      'Luxury Developments'
    ],
    contact: {
      phone: '+964 750 890 1234',
      email: 'info@rotanadevelopers.com',
      whatsapp: '+9647508901234'
    },
    offices: [
      {
        name: 'Rotana Developers Office',
        address: 'Rotana Hotel Complex',
        city: 'Erbil',
        phone: '+964 750 890 1234',
        email: 'sales@rotanadevelopers.com',
        isHeadquarters: true
      }
    ],
    projectIds: [],
    achievements: [
      {
        year: 2023,
        title: 'Best Service Apartment Development',
        description: 'International Property Awards Middle East recognition'
      },
      {
        year: 2021,
        title: 'Hospitality Real Estate Pioneer',
        description: 'Kurdistan Tourism Board recognition'
      },
      {
        year: 2019,
        title: 'Investment Property Award',
        description: 'Best rental yield performance in Kurdistan market'
      },
      {
        year: 2017,
        title: 'Brand Partnership Excellence',
        description: 'Successful launch of branded residence concept in Erbil'
      }
    ],
    socialMedia: {
      instagram: 'https://instagram.com/rotanadevelopers',
      linkedin: 'https://linkedin.com/company/rotana-developers'
    },
    metaTitle: 'Rotana Developers Erbil | Branded Residences | Hospitality Real Estate',
    metaDescription: 'Rotana Developers - Kurdistan\'s hospitality real estate specialist. Branded residences, service apartments, and hotel-managed properties. Premium living with hotel services.'
  },
  {
    id: 'royal-developers',
    slug: 'royal-developers',
    name: 'Royal Developers',
    shortName: 'Royal',
    logo: '/images/developers/royal-developers-logo.svg',
    logoAlt: 'Royal Developers Logo - Premium Erbil Properties',
    tagline: 'Luxury Living, Royal Standards',
    description: `Royal Developers is a premium real estate development company focused on creating exclusive residential properties for discerning buyers. The company's projects feature premium finishes, spacious layouts, and prime locations.

With an emphasis on quality over quantity, Royal Developers creates limited-unit projects that command premium prices and attract sophisticated buyers.`,
    history: `Royal Developers was founded in 2010 by a group of successful Kurdish businessmen seeking to create ultra-premium residential options in Erbil. Recognizing a gap in the market for truly luxurious properties, they set out to develop projects that would rival the best in regional capitals.

The company's first project, a boutique villa community in Ankawa, quickly sold out to high-net-worth buyers, validating the demand for premium residential options. Subsequent projects have maintained this exclusive positioning.

Royal Developers continues to focus on creating exceptional properties for a select clientele, maintaining standards that justify premium pricing and attract discerning buyers from Kurdistan and beyond.`,
    foundedYear: 2010,
    website: 'https://royaldevelopers.iq',
    totalProjects: 4,
    totalUnitsDelivered: 450,
    unitsUnderConstruction: 120,
    specializations: [
      'Ultra-Luxury Villas',
      'Premium Apartments',
      'Exclusive Communities',
      'Custom Home Building',
      'High-End Finishes'
    ],
    contact: {
      phone: '+964 750 901 2345',
      email: 'info@royaldevelopers.iq',
      whatsapp: '+9647509012345'
    },
    offices: [
      {
        name: 'Royal Developers Showroom',
        address: 'Ankawa Main Street',
        city: 'Erbil',
        phone: '+964 750 901 2345',
        email: 'sales@royaldevelopers.iq',
        isHeadquarters: true
      }
    ],
    projectIds: [],
    achievements: [
      {
        year: 2023,
        title: 'Ultra-Luxury Developer Award',
        description: 'Recognized for creating Kurdistan\'s most exclusive residential properties'
      },
      {
        year: 2021,
        title: 'Best Premium Villa Project',
        description: 'International Property Awards for villa development excellence'
      },
      {
        year: 2019,
        title: 'Quality Excellence Certificate',
        description: 'Independent certification for construction quality and finishes'
      },
      {
        year: 2016,
        title: 'Fastest Selling Project',
        description: 'Boutique villa project sold out in record time'
      }
    ],
    socialMedia: {
      instagram: 'https://instagram.com/royaldeveloperserbil',
      facebook: 'https://facebook.com/royaldeveloperserbil'
    },
    metaTitle: 'Royal Developers Erbil | Ultra-Luxury Villas | Premium Properties',
    metaDescription: 'Royal Developers - Creating Erbil\'s most exclusive luxury properties. Ultra-premium villas and apartments with exceptional finishes. For discerning buyers only.'
  },
  {
    id: 'elite-homes',
    slug: 'elite-homes',
    name: 'Elite Homes',
    shortName: 'Elite',
    logo: '/images/developers/elite-homes-logo.svg',
    logoAlt: 'Elite Homes Logo - Quality Affordable Housing Erbil',
    tagline: 'Quality Homes for Growing Families',
    description: `Elite Homes specializes in creating quality housing at accessible price points, making homeownership achievable for middle-class Kurdish families. The company focuses on efficient design, reliable construction, and family-friendly communities.

With a mission to provide quality homes without premium pricing, Elite Homes has helped thousands of families achieve their homeownership dreams.`,
    history: `Elite Homes was founded in 2011 with a clear mission: to provide quality housing that ordinary Kurdish families could afford. Founders, themselves from middle-class backgrounds, understood the challenges of finding well-built homes at reasonable prices.

The company developed efficient construction methods and standardized designs that reduced costs without compromising quality. Their first project, a townhouse development in an emerging area, attracted first-time buyers and young families.

Elite Homes has since grown to become one of Kurdistan's largest developers by unit count, while maintaining its commitment to affordability and quality. The company's payment plans and banking partnerships have made homeownership accessible to many who previously couldn't afford it.`,
    foundedYear: 2011,
    website: 'https://elitehomes.iq',
    totalProjects: 10,
    totalUnitsDelivered: 5200,
    unitsUnderConstruction: 1500,
    specializations: [
      'Affordable Housing',
      'Townhouse Communities',
      'First-Time Buyer Programs',
      'Payment Plan Solutions',
      'Family-Oriented Design'
    ],
    contact: {
      phone: '+964 750 012 3456',
      email: 'info@elitehomes.iq',
      whatsapp: '+9647500123456'
    },
    offices: [
      {
        name: 'Elite Homes Sales Center',
        address: 'Erbil New Town',
        city: 'Erbil',
        phone: '+964 750 012 3456',
        email: 'sales@elitehomes.iq',
        isHeadquarters: true
      },
      {
        name: 'Kirkuk Office',
        address: 'Central District',
        city: 'Kirkuk',
        phone: '+964 750 012 3457',
        isHeadquarters: false
      }
    ],
    projectIds: [],
    achievements: [
      {
        year: 2023,
        title: '5,000 Families Housed',
        description: 'Milestone of helping 5,000 families achieve homeownership'
      },
      {
        year: 2022,
        title: 'Affordable Housing Award',
        description: 'Kurdistan Government recognition for housing accessibility'
      },
      {
        year: 2020,
        title: 'Best Value Developer',
        description: 'Consumer choice award for price-quality balance'
      },
      {
        year: 2018,
        title: 'Community Builder Award',
        description: 'Recognition for creating family-friendly neighborhoods'
      }
    ],
    socialMedia: {
      instagram: 'https://instagram.com/elitehomesiq',
      facebook: 'https://facebook.com/elitehomesiq'
    },
    metaTitle: 'Elite Homes Erbil | Affordable Quality Housing | Family Communities',
    metaDescription: 'Elite Homes - Making homeownership achievable in Kurdistan. 5,200+ quality homes delivered at affordable prices. Payment plans available. Family-oriented communities.'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════════════

export function getDeveloperBySlug(slug: string): Developer | undefined {
  return developers.find(d => d.slug === slug);
}

export function getDeveloperById(id: string): Developer | undefined {
  return developers.find(d => d.id === id);
}

export function getAllDeveloperSlugs(): string[] {
  return developers.map(d => d.slug);
}

export function getDevelopersBySpecialization(specialization: string): Developer[] {
  return developers.filter(d =>
    d.specializations.some(s =>
      s.toLowerCase().includes(specialization.toLowerCase())
    )
  );
}

export function getTopDevelopersByUnits(count: number = 5): Developer[] {
  return [...developers]
    .sort((a, b) => b.totalUnitsDelivered - a.totalUnitsDelivered)
    .slice(0, count);
}

export function getDeveloperStats(): {
  totalDevelopers: number;
  totalUnitsDelivered: number;
  totalUnitsUnderConstruction: number;
  totalProjects: number;
} {
  return {
    totalDevelopers: developers.length,
    totalUnitsDelivered: developers.reduce((sum, d) => sum + d.totalUnitsDelivered, 0),
    totalUnitsUnderConstruction: developers.reduce((sum, d) => sum + (d.unitsUnderConstruction || 0), 0),
    totalProjects: developers.reduce((sum, d) => sum + d.totalProjects, 0)
  };
}

export function formatDeveloperYearsInBusiness(foundedYear: number): number {
  return new Date().getFullYear() - foundedYear;
}

// Generate JSON-LD Organization schema for a developer
export function generateDeveloperSchema(developer: Developer): object {
  const yearsInBusiness = formatDeveloperYearsInBusiness(developer.foundedYear);
  const headquarters = developer.offices.find(o => o.isHeadquarters);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `https://realhouseiq.com/developers/${developer.slug}#organization`,
    name: developer.name,
    alternateName: developer.shortName,
    description: developer.description.substring(0, 300),
    url: developer.website || `https://realhouseiq.com/developers/${developer.slug}`,
    logo: `https://realhouseiq.com${developer.logo}`,
    foundingDate: developer.foundedYear.toString(),
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 500
    },
    slogan: developer.tagline,
    knowsAbout: developer.specializations,
    ...(headquarters && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: headquarters.address,
        addressLocality: headquarters.city,
        addressRegion: 'Kurdistan Region',
        addressCountry: 'Iraq'
      },
      telephone: headquarters.phone,
      email: headquarters.email
    }),
    ...(developer.parentCompany && {
      parentOrganization: {
        '@type': 'Organization',
        name: developer.parentCompany
      }
    }),
    ...(developer.socialMedia && {
      sameAs: Object.values(developer.socialMedia).filter(Boolean)
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: Math.floor(developer.totalUnitsDelivered / 10)
    }
  };
}
