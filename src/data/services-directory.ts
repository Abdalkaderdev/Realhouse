// ═══════════════════════════════════════════════════════════════════════════
// Home Services Directory Data - Real House IQ
// Service Providers for Property Owners in Erbil, Kurdistan
// Similar to Paya Real Estate Directory
// ═══════════════════════════════════════════════════════════════════════════

export interface ServiceProvider {
  id: string;
  name: string;
  nameKu?: string;
  nameAr?: string;
  category: string;
  description: string;
  shortDescription: string;
  contact: {
    phone: string;
    whatsapp?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  image: string;
  services: string[];
  workingHours?: string;
  priceRange?: 'budget' | 'mid-range' | 'premium';
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  titleKu?: string;
  titleAr?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  icon: string;
  heroImage: string;
  description: string;
  longDescription: string;
  whyNeedThis: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  relatedCategories: string[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Service Categories
// ═══════════════════════════════════════════════════════════════════════════

export const serviceCategories: ServiceCategory[] = [
  // ─── Interior Design ────────────────────────────────────────────────────
  {
    id: 'interior-design',
    slug: 'interior-design',
    title: 'Interior Design',
    titleKu: 'دیزاینی ناوخۆ',
    titleAr: 'التصميم الداخلي',
    metaTitle: 'Interior Design Services Erbil | Home Design Kurdistan | Real House IQ',
    metaDescription: 'Find the best interior designers in Erbil, Kurdistan. Professional home design, renovation consultants, and interior decorators. Get quotes from verified providers.',
    keywords: ['interior design erbil', 'home design kurdistan', 'interior decorator erbil', 'home renovation erbil', 'interior designers iraq'],
    icon: 'icon-home',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80&fm=webp',
    description: 'Professional interior design services to transform your home or office into a beautiful, functional space.',
    longDescription: `
      <p>Transform your property with professional <strong>interior design services in Erbil</strong>. Whether you've just purchased a new home, are renovating an existing property, or want to refresh your office space, our directory connects you with Kurdistan's most talented interior designers and decorators.</p>

      <h2>Complete Interior Design Solutions</h2>
      <p>Interior design in Erbil has evolved dramatically, with designers now offering comprehensive services from initial concept development through final installation. Today's designers blend international trends with local preferences, creating spaces that are both contemporary and culturally resonant.</p>

      <h2>Types of Interior Design Services</h2>
      <p>Our listed interior designers offer a wide range of services:</p>
      <ul>
        <li><strong>Residential Design:</strong> Complete home interiors including living rooms, bedrooms, kitchens, and bathrooms</li>
        <li><strong>Commercial Design:</strong> Office spaces, retail stores, restaurants, and hospitality venues</li>
        <li><strong>Kitchen & Bath Design:</strong> Specialized design for these high-impact spaces</li>
        <li><strong>Furniture Selection:</strong> Curated furniture packages and custom pieces</li>
        <li><strong>Color Consultation:</strong> Expert advice on color schemes and paint selection</li>
        <li><strong>Lighting Design:</strong> Functional and decorative lighting plans</li>
        <li><strong>Space Planning:</strong> Optimal layout and furniture arrangement</li>
        <li><strong>Project Management:</strong> Coordinating contractors and installations</li>
      </ul>
    `,
    whyNeedThis: [
      'Professional designers save time by managing your entire project',
      'Access to exclusive furniture and materials not available to retail customers',
      'Expert space planning maximizes functionality of your property',
      'Design increases property value and resale appeal',
      'Avoid costly mistakes with professional guidance',
      'Cohesive design vision throughout your entire space'
    ],
    benefits: [
      'Save 20-30% on furniture through designer trade discounts',
      'Increase property value by 10-15% with professional design',
      'Reduce project timeline with experienced project management',
      'Access to local craftsmen and trusted contractors',
      'Custom solutions tailored to your lifestyle and budget'
    ],
    faqs: [
      {
        question: 'How much does interior design cost in Erbil?',
        answer: 'Interior design fees in Erbil typically range from $50-150 per square meter for full design services, or designers may charge $500-2000 for consultation packages. Many work on a percentage of project budget (10-20%) for furnishing projects.'
      },
      {
        question: 'How long does an interior design project take?',
        answer: 'Timeline varies by scope: a single room refresh might take 4-6 weeks, while a complete home design typically requires 3-6 months. Complex renovation projects may extend to 9-12 months.'
      },
      {
        question: 'Do I need an interior designer for a new apartment?',
        answer: 'While not required, a designer helps maximize your new space, coordinate furniture purchases, and create a cohesive look from day one. Many new property owners find designer consultation invaluable for avoiding costly mistakes.'
      }
    ],
    relatedCategories: ['furniture', 'painting-services', 'home-renovation']
  },

  // ─── Cleaning Services ──────────────────────────────────────────────────
  {
    id: 'cleaning-services',
    slug: 'cleaning-services',
    title: 'Cleaning Services',
    titleKu: 'خزمەتگوزاری پاککردنەوە',
    titleAr: 'خدمات التنظيف',
    metaTitle: 'Cleaning Services Erbil | Home & Office Cleaning Kurdistan | Real House IQ',
    metaDescription: 'Professional cleaning services in Erbil. Home cleaning, deep cleaning, move-in/move-out cleaning, and office cleaning. Trusted & verified providers.',
    keywords: ['cleaning services erbil', 'home cleaning kurdistan', 'maid service erbil', 'office cleaning erbil', 'deep cleaning iraq'],
    icon: 'icon-star',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&fm=webp',
    description: 'Reliable home and office cleaning services to keep your property spotless and healthy.',
    longDescription: `
      <p>Find trusted <strong>cleaning services in Erbil</strong> for your home, apartment, villa, or office. Our directory features verified cleaning companies and independent cleaners offering regular maintenance, deep cleaning, and specialized services throughout Kurdistan.</p>

      <h2>Professional Cleaning You Can Trust</h2>
      <p>A clean home is essential for health, comfort, and property maintenance. Whether you need regular weekly cleaning, a one-time deep clean, or specialized services before moving into a new property, our listed providers deliver reliable, professional results.</p>

      <h2>Cleaning Services Available</h2>
      <ul>
        <li><strong>Regular Home Cleaning:</strong> Weekly, bi-weekly, or monthly maintenance cleaning</li>
        <li><strong>Deep Cleaning:</strong> Thorough top-to-bottom cleaning including areas often missed</li>
        <li><strong>Move-In/Move-Out Cleaning:</strong> Professional cleaning for property transitions</li>
        <li><strong>Post-Construction Cleaning:</strong> Specialized cleaning after renovation work</li>
        <li><strong>Office Cleaning:</strong> Commercial cleaning for workspaces of all sizes</li>
        <li><strong>Carpet & Upholstery Cleaning:</strong> Deep cleaning for soft furnishings</li>
        <li><strong>Window Cleaning:</strong> Interior and exterior window washing</li>
        <li><strong>Disinfection Services:</strong> Sanitization and deep disinfection</li>
      </ul>
    `,
    whyNeedThis: [
      'Maintain a healthy living environment for your family',
      'Preserve your property investment with regular maintenance',
      'Save time for activities you enjoy',
      'Professional equipment and products achieve better results',
      'Essential service for property handovers and rentals',
      'Regular cleaning prevents costly repairs from neglect'
    ],
    benefits: [
      'Flexible scheduling to fit your lifestyle',
      'Trained and vetted cleaning professionals',
      'Eco-friendly cleaning options available',
      'Insurance coverage for peace of mind',
      'Consistent quality with regular cleaning teams'
    ],
    faqs: [
      {
        question: 'How much does home cleaning cost in Erbil?',
        answer: 'Regular home cleaning typically costs $30-80 per visit depending on property size (1-4 bedrooms). Deep cleaning ranges from $100-300. Many services offer monthly packages at reduced rates.'
      },
      {
        question: 'Should I be home during cleaning?',
        answer: 'It\'s your choice. Many clients provide keys or access codes for convenience. All our listed providers are vetted, but you can arrange to be present if preferred.'
      },
      {
        question: 'How often should I deep clean my home?',
        answer: 'We recommend deep cleaning 2-4 times per year, with more frequent regular cleaning in between. Homes with children, pets, or allergy sufferers may benefit from more frequent deep cleaning.'
      }
    ],
    relatedCategories: ['pest-control', 'ac-hvac-services', 'painting-services']
  },

  // ─── Electrical Services ────────────────────────────────────────────────
  {
    id: 'electrical-services',
    slug: 'electrical-services',
    title: 'Electrical Services',
    titleKu: 'خزمەتگوزاری کارەبایی',
    titleAr: 'خدمات الكهرباء',
    metaTitle: 'Electrician Services Erbil | Electrical Contractors Kurdistan | Real House IQ',
    metaDescription: 'Licensed electricians in Erbil for installation, repair, and maintenance. Home wiring, generator installation, smart home systems. 24/7 emergency service.',
    keywords: ['electrician erbil', 'electrical services kurdistan', 'home wiring erbil', 'generator installation erbil', 'electrical contractor iraq'],
    icon: 'icon-star',
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80&fm=webp',
    description: 'Licensed electricians for all your residential and commercial electrical needs.',
    longDescription: `
      <p>Connect with qualified <strong>electricians in Erbil</strong> for safe, reliable electrical work. From routine repairs to complete rewiring, generator installations, and smart home systems, our directory features licensed professionals serving residential and commercial properties throughout Kurdistan.</p>

      <h2>Professional Electrical Services</h2>
      <p>Electrical work requires expertise for safety and compliance. Whether you're building a new home, renovating, or dealing with an emergency, our listed electricians deliver quality workmanship with proper safety standards.</p>

      <h2>Electrical Services Available</h2>
      <ul>
        <li><strong>Electrical Repairs:</strong> Outlet repair, circuit breaker issues, wiring fixes</li>
        <li><strong>New Installations:</strong> Additional outlets, lighting fixtures, ceiling fans</li>
        <li><strong>Complete Rewiring:</strong> Upgrading old wiring in existing properties</li>
        <li><strong>Generator Installation:</strong> Backup power systems for homes and businesses</li>
        <li><strong>Panel Upgrades:</strong> Electrical panel replacement and capacity upgrades</li>
        <li><strong>Smart Home Wiring:</strong> Automation systems, smart switches, integrated controls</li>
        <li><strong>Security Systems:</strong> CCTV wiring, alarm system installation</li>
        <li><strong>Emergency Services:</strong> 24/7 response for electrical emergencies</li>
      </ul>
    `,
    whyNeedThis: [
      'Ensure safety with professional electrical work',
      'Comply with building codes and insurance requirements',
      'Prevent fire hazards from faulty wiring',
      'Optimize electrical system for modern appliance demands',
      'Professional installation warranty protection',
      'Emergency support when you need it most'
    ],
    benefits: [
      'Licensed and insured professionals',
      '24/7 emergency service availability',
      'Warranty on all work performed',
      'Proper safety certifications',
      'Fair and transparent pricing'
    ],
    faqs: [
      {
        question: 'How much does an electrician charge in Erbil?',
        answer: 'Electrician rates in Erbil typically range from $30-80 per hour, with most common repairs costing $50-200. Larger projects like panel upgrades ($500-1500) or rewiring ($2000-8000) are quoted separately.'
      },
      {
        question: 'When should I call an emergency electrician?',
        answer: 'Call immediately for: sparking outlets, burning smells, complete power loss, exposed wiring, or after water damage to electrical systems. These situations pose fire and shock hazards.'
      },
      {
        question: 'How often should electrical systems be inspected?',
        answer: 'We recommend electrical inspection every 5-10 years for homes, or when purchasing property, after major renovations, or if you notice issues like flickering lights or tripping breakers.'
      }
    ],
    relatedCategories: ['plumbing-services', 'ac-hvac-services', 'cctv-security']
  },

  // ─── Plumbing Services ──────────────────────────────────────────────────
  {
    id: 'plumbing-services',
    slug: 'plumbing-services',
    title: 'Plumbing Services',
    titleKu: 'خزمەتگوزاری لوولەکێشی',
    titleAr: 'خدمات السباكة',
    metaTitle: 'Plumbing Services Erbil | Plumber Kurdistan | Real House IQ',
    metaDescription: 'Professional plumbers in Erbil for installation, repair, and maintenance. Water heaters, bathroom fixtures, drain cleaning. Emergency plumbing 24/7.',
    keywords: ['plumber erbil', 'plumbing services kurdistan', 'water heater installation erbil', 'drain cleaning erbil', 'plumbing contractor iraq'],
    icon: 'icon-area',
    heroImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200&q=80&fm=webp',
    description: 'Expert plumbers for installations, repairs, and emergency services throughout Erbil.',
    longDescription: `
      <p>Find reliable <strong>plumbers in Erbil</strong> for all your water and drainage needs. From leaky faucets to complete bathroom renovations, water heater installations to emergency repairs, our directory connects you with skilled professionals serving homes and businesses across Kurdistan.</p>

      <h2>Comprehensive Plumbing Solutions</h2>
      <p>Plumbing issues can quickly escalate from minor inconveniences to major problems causing water damage and health concerns. Our listed plumbers provide prompt, professional service to keep your property's water systems functioning properly.</p>

      <h2>Plumbing Services Available</h2>
      <ul>
        <li><strong>Leak Repair:</strong> Faucet, pipe, and fixture leak repairs</li>
        <li><strong>Drain Cleaning:</strong> Clogged drain clearing and maintenance</li>
        <li><strong>Water Heater Services:</strong> Installation, repair, and replacement</li>
        <li><strong>Bathroom Installation:</strong> Toilets, sinks, showers, bathtubs</li>
        <li><strong>Kitchen Plumbing:</strong> Sink installation, garbage disposal, dishwasher connections</li>
        <li><strong>Pipe Installation:</strong> New piping for construction and renovation</li>
        <li><strong>Water Filtration:</strong> Whole-house and point-of-use filtration systems</li>
        <li><strong>Emergency Repairs:</strong> 24/7 response for urgent plumbing issues</li>
      </ul>
    `,
    whyNeedThis: [
      'Prevent water damage that can cost thousands in repairs',
      'Maintain healthy water supply and drainage',
      'Professional work ensures proper function and longevity',
      'Code compliance for insurance and property sales',
      'Emergency services prevent disasters',
      'Upgrade fixtures for water efficiency and savings'
    ],
    benefits: [
      'Experienced licensed plumbers',
      '24/7 emergency response',
      'Warranty on parts and labor',
      'Upfront pricing with no surprises',
      'Clean and respectful service'
    ],
    faqs: [
      {
        question: 'How much does a plumber charge in Erbil?',
        answer: 'Plumber rates typically range from $30-70 per hour in Erbil. Common repairs like fixing a leaky faucet cost $40-100, while larger jobs like water heater installation range from $200-600 plus equipment.'
      },
      {
        question: 'What is a plumbing emergency?',
        answer: 'Emergencies include: burst pipes, major leaks causing flooding, no water supply, sewage backups, or gas line leaks. These require immediate professional attention.'
      },
      {
        question: 'How can I prevent plumbing problems?',
        answer: 'Regular maintenance helps: don\'t pour grease down drains, use drain screens, address small leaks promptly, know your main shutoff location, and schedule annual inspections for older homes.'
      }
    ],
    relatedCategories: ['electrical-services', 'home-renovation', 'cleaning-services']
  },

  // ─── Landscaping & Gardening ────────────────────────────────────────────
  {
    id: 'landscaping-gardening',
    slug: 'landscaping-gardening',
    title: 'Landscaping & Gardening',
    titleKu: 'باخچەوانی و دیزاینی دەرەوە',
    titleAr: 'تنسيق الحدائق',
    metaTitle: 'Landscaping Services Erbil | Garden Design Kurdistan | Real House IQ',
    metaDescription: 'Professional landscaping and gardening services in Erbil. Garden design, lawn maintenance, irrigation systems, and outdoor living spaces. Transform your outdoor area.',
    keywords: ['landscaping erbil', 'garden design kurdistan', 'lawn maintenance erbil', 'outdoor landscaping iraq', 'garden services erbil'],
    icon: 'icon-area',
    heroImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&q=80&fm=webp',
    description: 'Transform your outdoor spaces with professional landscaping and garden maintenance services.',
    longDescription: `
      <p>Create beautiful outdoor spaces with professional <strong>landscaping services in Erbil</strong>. From villa gardens to apartment balconies, commercial grounds to community parks, our directory features skilled landscapers and gardeners who understand Kurdistan's climate and create stunning, sustainable outdoor environments.</p>

      <h2>Outdoor Living Excellence</h2>
      <p>Your property's outdoor space is an extension of your living area. Professional landscaping enhances curb appeal, increases property value, and creates enjoyable spaces for relaxation and entertainment. Our listed providers combine design expertise with knowledge of plants that thrive in Erbil's climate.</p>

      <h2>Landscaping Services Available</h2>
      <ul>
        <li><strong>Garden Design:</strong> Complete landscape planning and design</li>
        <li><strong>Lawn Installation:</strong> Sodding, seeding, and synthetic turf</li>
        <li><strong>Irrigation Systems:</strong> Drip irrigation, sprinkler installation</li>
        <li><strong>Hardscaping:</strong> Patios, walkways, retaining walls</li>
        <li><strong>Planting:</strong> Trees, shrubs, flowers, and ornamental plants</li>
        <li><strong>Regular Maintenance:</strong> Lawn mowing, pruning, fertilization</li>
        <li><strong>Outdoor Lighting:</strong> Garden and pathway lighting design</li>
        <li><strong>Water Features:</strong> Fountains, ponds, and pools</li>
      </ul>
    `,
    whyNeedThis: [
      'Increase property value by 15-20% with professional landscaping',
      'Create outdoor living spaces for family enjoyment',
      'Proper plant selection ensures survival in local climate',
      'Efficient irrigation systems save water and money',
      'Regular maintenance preserves your landscape investment',
      'Enhance curb appeal for property sales or rentals'
    ],
    benefits: [
      'Expert knowledge of local climate and plants',
      'Design services for complete outdoor transformation',
      'Flexible maintenance packages',
      'Quality plants and materials',
      'Water-efficient irrigation solutions'
    ],
    faqs: [
      {
        question: 'How much does landscaping cost in Erbil?',
        answer: 'Basic landscaping design starts from $500-1500 for planning. Installation costs vary widely based on scope: simple gardens from $1000, comprehensive villa landscaping $5000-20000+. Monthly maintenance runs $100-300.'
      },
      {
        question: 'What plants grow well in Erbil?',
        answer: 'Erbil\'s climate suits Mediterranean and drought-tolerant plants: olive trees, oleander, rosemary, lavender, pomegranate, and various ornamental grasses. Professional landscapers select appropriate species for your microclimate.'
      },
      {
        question: 'How often should I water my garden in summer?',
        answer: 'Summer irrigation needs vary by plant type: lawns typically need daily watering, established trees 2-3 times weekly, drought-tolerant plants weekly. Drip irrigation systems optimize water use and reduce costs.'
      }
    ],
    relatedCategories: ['swimming-pool-maintenance', 'interior-design', 'painting-services']
  },

  // ─── Packers & Movers ───────────────────────────────────────────────────
  {
    id: 'packers-movers',
    slug: 'packers-movers',
    title: 'Packers & Movers',
    titleKu: 'خزمەتگوزاری گواستنەوە',
    titleAr: 'شركات النقل والتغليف',
    metaTitle: 'Packers and Movers Erbil | Moving Services Kurdistan | Real House IQ',
    metaDescription: 'Professional packers and movers in Erbil. Local and long-distance moving, packing services, furniture assembly. Trusted moving companies in Kurdistan.',
    keywords: ['packers movers erbil', 'moving services kurdistan', 'furniture movers erbil', 'relocation services iraq', 'moving company erbil'],
    icon: 'icon-arrow-right',
    heroImage: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1200&q=80&fm=webp',
    description: 'Professional moving services for stress-free relocations within Erbil and across Kurdistan.',
    longDescription: `
      <p>Relocate with confidence using professional <strong>packers and movers in Erbil</strong>. Whether you're moving to a new apartment, relocating your office, or transferring across Kurdistan, our directory connects you with experienced moving companies that handle your belongings with care.</p>

      <h2>Professional Moving Services</h2>
      <p>Moving is one of life's most stressful events, but professional movers make it manageable. From careful packing to safe transport and setup at your new location, our listed providers deliver comprehensive relocation services.</p>

      <h2>Moving Services Available</h2>
      <ul>
        <li><strong>Local Moving:</strong> Same-city relocations within Erbil</li>
        <li><strong>Long Distance:</strong> Moves across Kurdistan and Iraq</li>
        <li><strong>International Moving:</strong> Overseas relocations with customs handling</li>
        <li><strong>Packing Services:</strong> Professional packing of all belongings</li>
        <li><strong>Furniture Disassembly/Assembly:</strong> Expert handling of complex furniture</li>
        <li><strong>Specialty Items:</strong> Pianos, artwork, antiques, safes</li>
        <li><strong>Storage Solutions:</strong> Short and long-term storage facilities</li>
        <li><strong>Office Relocation:</strong> Commercial moves with minimal business disruption</li>
      </ul>
    `,
    whyNeedThis: [
      'Professional packing prevents damage during transport',
      'Save time and physical strain on moving day',
      'Experienced handling of fragile and valuable items',
      'Proper equipment for safe furniture moving',
      'Insurance coverage protects your belongings',
      'Efficient moves minimize disruption to your life'
    ],
    benefits: [
      'Trained and vetted moving crews',
      'Full insurance coverage options',
      'Professional packing materials',
      'Flexible scheduling including weekends',
      'Transparent pricing with no hidden fees'
    ],
    faqs: [
      {
        question: 'How much does moving cost in Erbil?',
        answer: 'Local moves within Erbil typically cost $200-500 for apartments, $400-1000 for villas depending on size and floors. Long-distance moves are quoted based on volume, distance, and services required.'
      },
      {
        question: 'How far in advance should I book movers?',
        answer: 'We recommend booking 2-4 weeks ahead for local moves, 4-6 weeks for long-distance. End of month dates fill quickly, so earlier booking is advisable.'
      },
      {
        question: 'Should I pack myself or use packing services?',
        answer: 'Professional packing ensures proper protection and can make insurance claims easier if damage occurs. Self-packing saves money but requires proper materials and technique. Many people pack non-fragile items themselves and hire pros for fragile items.'
      }
    ],
    relatedCategories: ['cleaning-services', 'furniture', 'interior-design']
  },

  // ─── Pest Control ───────────────────────────────────────────────────────
  {
    id: 'pest-control',
    slug: 'pest-control',
    title: 'Pest Control',
    titleKu: 'کۆنتڕۆڵی مێرووەکان',
    titleAr: 'مكافحة الحشرات',
    metaTitle: 'Pest Control Services Erbil | Exterminator Kurdistan | Real House IQ',
    metaDescription: 'Professional pest control in Erbil. Insect control, rodent removal, termite treatment. Safe and effective pest management for homes and businesses.',
    keywords: ['pest control erbil', 'exterminator kurdistan', 'insect control erbil', 'rodent control iraq', 'termite treatment erbil'],
    icon: 'icon-shield',
    heroImage: 'https://images.unsplash.com/photo-1632317527584-75f6f3fb8fbb?w=1200&q=80&fm=webp',
    description: 'Safe and effective pest control services to protect your property from unwanted invaders.',
    longDescription: `
      <p>Protect your property with professional <strong>pest control services in Erbil</strong>. From common household insects to rodents and termites, our directory features licensed pest control companies using safe, effective methods to eliminate infestations and prevent future problems.</p>

      <h2>Comprehensive Pest Management</h2>
      <p>Pest problems can damage your property, pose health risks, and make your home uncomfortable. Professional pest control combines immediate elimination with long-term prevention strategies to keep your property pest-free.</p>

      <h2>Pest Control Services Available</h2>
      <ul>
        <li><strong>General Pest Control:</strong> Cockroaches, ants, spiders, flies</li>
        <li><strong>Rodent Control:</strong> Mice and rat elimination</li>
        <li><strong>Termite Treatment:</strong> Inspection, treatment, and prevention</li>
        <li><strong>Bed Bug Treatment:</strong> Complete elimination programs</li>
        <li><strong>Mosquito Control:</strong> Yard treatment and prevention</li>
        <li><strong>Bee & Wasp Removal:</strong> Safe nest removal</li>
        <li><strong>Bird Control:</strong> Deterrent systems for buildings</li>
        <li><strong>Commercial Pest Management:</strong> Business-specific solutions</li>
      </ul>
    `,
    whyNeedThis: [
      'Protect family health from pest-borne diseases',
      'Prevent structural damage from termites and rodents',
      'Maintain property value and appeal',
      'Professional treatments more effective than DIY',
      'Regular service prevents infestations',
      'Required for food businesses and rentals'
    ],
    benefits: [
      'Licensed and certified technicians',
      'Safe treatments for families and pets',
      'Guaranteed results with follow-up service',
      'Preventive maintenance programs',
      'Discreet service for businesses'
    ],
    faqs: [
      {
        question: 'How much does pest control cost in Erbil?',
        answer: 'One-time treatments range from $50-200 depending on property size and pest type. Termite treatments cost $500-2000. Monthly prevention packages run $30-100/month and offer the best long-term value.'
      },
      {
        question: 'Are pest control chemicals safe for my family?',
        answer: 'Modern pest control uses targeted treatments that are safe when applied by professionals. Most require only 2-4 hours before re-entry. Discuss concerns with your provider for alternative eco-friendly options.'
      },
      {
        question: 'How often should I have pest control service?',
        answer: 'Preventive treatments every 3-6 months are recommended for most homes. Properties with previous infestations or in pest-prone areas may benefit from monthly service.'
      }
    ],
    relatedCategories: ['cleaning-services', 'landscaping-gardening', 'home-renovation']
  },

  // ─── CCTV & Security Systems ────────────────────────────────────────────
  {
    id: 'cctv-security',
    slug: 'cctv-security',
    title: 'CCTV & Security Systems',
    titleKu: 'سیستەمی چاودێری و پاراستن',
    titleAr: 'كاميرات المراقبة وأنظمة الأمان',
    metaTitle: 'CCTV Installation Erbil | Security Systems Kurdistan | Real House IQ',
    metaDescription: 'Professional CCTV and security system installation in Erbil. Home security cameras, alarm systems, access control. Protect your property with expert installation.',
    keywords: ['cctv installation erbil', 'security systems kurdistan', 'home security erbil', 'alarm system iraq', 'security cameras erbil'],
    icon: 'icon-shield',
    heroImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&q=80&fm=webp',
    description: 'Comprehensive security solutions including CCTV cameras, alarm systems, and access control.',
    longDescription: `
      <p>Secure your property with professional <strong>CCTV and security system installation in Erbil</strong>. From residential cameras to comprehensive commercial security systems, our directory connects you with experienced installers who design, install, and maintain security solutions throughout Kurdistan.</p>

      <h2>Complete Security Solutions</h2>
      <p>Modern security systems offer more than simple cameras. Today's solutions integrate video surveillance, alarm systems, access control, and remote monitoring into comprehensive security packages that protect your property 24/7.</p>

      <h2>Security Services Available</h2>
      <ul>
        <li><strong>CCTV Installation:</strong> Indoor and outdoor camera systems</li>
        <li><strong>Alarm Systems:</strong> Intrusion detection and alerts</li>
        <li><strong>Access Control:</strong> Keycard, biometric, and smart locks</li>
        <li><strong>Video Intercom:</strong> Door entry systems with video</li>
        <li><strong>Remote Monitoring:</strong> Mobile app access and cloud recording</li>
        <li><strong>Perimeter Security:</strong> Fencing alarms and motion sensors</li>
        <li><strong>Fire Detection:</strong> Smoke and heat alarm systems</li>
        <li><strong>System Integration:</strong> Unified security management</li>
      </ul>
    `,
    whyNeedThis: [
      'Deter crime with visible security presence',
      'Document incidents for evidence if needed',
      'Monitor property remotely from anywhere',
      'Protect family, employees, and assets',
      'Insurance benefits for secured properties',
      'Peace of mind when traveling or at work'
    ],
    benefits: [
      'Expert system design for optimal coverage',
      'Professional installation with clean wiring',
      'Quality equipment with warranties',
      'Remote access setup included',
      'Ongoing maintenance and support'
    ],
    faqs: [
      {
        question: 'How much does CCTV installation cost in Erbil?',
        answer: 'Basic 4-camera home systems start from $400-800 installed. Comprehensive villa systems with 8-16 cameras and DVR range from $1000-3000. Commercial systems are quoted based on specific requirements.'
      },
      {
        question: 'Can I view cameras from my phone?',
        answer: 'Yes, modern systems include mobile app access for live viewing and playback. We recommend systems with cloud backup options for added security and convenience.'
      },
      {
        question: 'How long is CCTV footage stored?',
        answer: 'Storage duration depends on recording quality and hard drive size. Typical systems store 15-30 days. Many providers now offer cloud storage options for longer retention.'
      }
    ],
    relatedCategories: ['electrical-services', 'home-renovation', 'ac-hvac-services']
  },

  // ─── Painting Services ──────────────────────────────────────────────────
  {
    id: 'painting-services',
    slug: 'painting-services',
    title: 'Painting Services',
    titleKu: 'خزمەتگوزاری بۆیەکردن',
    titleAr: 'خدمات الدهان',
    metaTitle: 'Painting Services Erbil | House Painters Kurdistan | Real House IQ',
    metaDescription: 'Professional painting services in Erbil. Interior and exterior painting, wallpaper installation, decorative finishes. Quality painters for homes and offices.',
    keywords: ['painting services erbil', 'house painters kurdistan', 'interior painting erbil', 'exterior painting iraq', 'wall painting erbil'],
    icon: 'icon-star',
    heroImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80&fm=webp',
    description: 'Quality painting services for interior and exterior transformations of your property.',
    longDescription: `
      <p>Refresh your property with professional <strong>painting services in Erbil</strong>. Whether you need interior walls repainted, exterior facades renewed, or decorative finishes applied, our directory features skilled painters delivering quality results for homes and businesses throughout Kurdistan.</p>

      <h2>Transform Your Space with Color</h2>
      <p>A fresh coat of paint is one of the most impactful and cost-effective ways to transform your property. Professional painters ensure proper preparation, quality application, and beautiful, long-lasting results.</p>

      <h2>Painting Services Available</h2>
      <ul>
        <li><strong>Interior Painting:</strong> Walls, ceilings, trim, and doors</li>
        <li><strong>Exterior Painting:</strong> Building facades, fences, gates</li>
        <li><strong>Decorative Finishes:</strong> Textures, faux finishes, accent walls</li>
        <li><strong>Wallpaper:</strong> Installation and removal</li>
        <li><strong>Cabinet Painting:</strong> Kitchen and bathroom cabinetry</li>
        <li><strong>Epoxy Coating:</strong> Garage floors and commercial spaces</li>
        <li><strong>Pressure Washing:</strong> Surface preparation and cleaning</li>
        <li><strong>Color Consultation:</strong> Expert advice on color selection</li>
      </ul>
    `,
    whyNeedThis: [
      'Transform appearance at fraction of renovation cost',
      'Professional preparation ensures lasting results',
      'Protect surfaces from weather and wear',
      'Increase property value with fresh paint',
      'Proper paint selection for each application',
      'Clean, efficient work with minimal disruption'
    ],
    benefits: [
      'Experienced professional painters',
      'Quality paints and materials',
      'Proper surface preparation',
      'Clean work areas during and after',
      'Color consultation available'
    ],
    faqs: [
      {
        question: 'How much does house painting cost in Erbil?',
        answer: 'Interior painting typically costs $2-5 per square meter, so a standard apartment (100-150 sqm) runs $300-800. Exterior painting costs $3-8 per sqm depending on height and condition. Prices include preparation and two coats.'
      },
      {
        question: 'How long does painting a house take?',
        answer: 'A typical apartment interior takes 2-4 days. Villa interiors require 5-10 days. Exterior painting depends on size and access but typically 3-7 days for average homes. Weather can affect exterior timelines.'
      },
      {
        question: 'Should I paint before selling my property?',
        answer: 'Yes, fresh paint is one of the highest-ROI improvements for selling. Neutral colors appeal to most buyers. A professional paint job can significantly improve first impressions and potentially increase offers.'
      }
    ],
    relatedCategories: ['interior-design', 'home-renovation', 'cleaning-services']
  },

  // ─── Furniture ──────────────────────────────────────────────────────────
  {
    id: 'furniture',
    slug: 'furniture',
    title: 'Furniture (Home & Office)',
    titleKu: 'کەلوپەل (ماڵ و ئۆفیس)',
    titleAr: 'الأثاث (المنزل والمكتب)',
    metaTitle: 'Furniture Stores Erbil | Home & Office Furniture Kurdistan | Real House IQ',
    metaDescription: 'Best furniture stores in Erbil. Home furniture, office furniture, custom designs, imported brands. Quality furniture for every room and budget.',
    keywords: ['furniture stores erbil', 'home furniture kurdistan', 'office furniture erbil', 'custom furniture iraq', 'furniture shops erbil'],
    icon: 'icon-home',
    heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80&fm=webp',
    description: 'Quality furniture providers for homes and offices, from budget-friendly to luxury options.',
    longDescription: `
      <p>Find the perfect furniture with our directory of <strong>furniture providers in Erbil</strong>. From ready-made pieces to custom designs, imported brands to local craftsmen, our listed providers offer quality furniture for every room, style, and budget in Kurdistan.</p>

      <h2>Furnishing Your Property</h2>
      <p>Whether you're furnishing a new home, upgrading your office, or replacing worn pieces, quality furniture makes a significant difference in comfort, appearance, and longevity. Our directory features diverse providers catering to all styles and budgets.</p>

      <h2>Furniture Categories Available</h2>
      <ul>
        <li><strong>Living Room:</strong> Sofas, sectionals, coffee tables, entertainment centers</li>
        <li><strong>Bedroom:</strong> Beds, mattresses, wardrobes, dressers</li>
        <li><strong>Dining:</strong> Tables, chairs, buffets, bar furniture</li>
        <li><strong>Office:</strong> Desks, chairs, filing, conference furniture</li>
        <li><strong>Outdoor:</strong> Patio furniture, garden sets</li>
        <li><strong>Custom Furniture:</strong> Made-to-measure pieces</li>
        <li><strong>Import Services:</strong> International brand sourcing</li>
        <li><strong>Delivery & Assembly:</strong> Professional setup</li>
      </ul>
    `,
    whyNeedThis: [
      'Quality furniture lasts longer and looks better',
      'Proper furniture sizing for your spaces',
      'Access to variety beyond retail showrooms',
      'Custom options for unique requirements',
      'Professional delivery and assembly',
      'Warranty and after-sales service'
    ],
    benefits: [
      'Wide selection of styles and prices',
      'Custom design capabilities',
      'Delivery and assembly included',
      'Warranty on quality products',
      'Interior design consultation available'
    ],
    faqs: [
      {
        question: 'Where can I buy quality furniture in Erbil?',
        answer: 'Erbil has diverse options from local showrooms in Gulan and city center to international brands in malls. Custom furniture workshops in industrial areas offer made-to-measure options. Our directory helps you find the right provider for your needs.'
      },
      {
        question: 'How long does custom furniture take?',
        answer: 'Custom furniture typically requires 2-6 weeks depending on complexity and materials. Simple pieces like shelving may be faster, while complex bedroom sets or office furniture take longer. Imported materials may add to timelines.'
      },
      {
        question: 'Is imported furniture worth the extra cost?',
        answer: 'Imported furniture often offers unique designs and specific quality standards. However, local manufacturers have improved significantly and offer better value for many items. Consider imported for specialty items and local for basics.'
      }
    ],
    relatedCategories: ['interior-design', 'packers-movers', 'home-renovation']
  },

  // ─── Legal & Property Documentation ─────────────────────────────────────
  {
    id: 'legal-documentation',
    slug: 'legal-documentation',
    title: 'Legal & Property Documentation',
    titleKu: 'خزمەتگوزاری یاسایی و بەڵگەنامەکان',
    titleAr: 'الخدمات القانونية والتوثيق',
    metaTitle: 'Property Legal Services Erbil | Documentation Kurdistan | Real House IQ',
    metaDescription: 'Property legal services in Erbil. Title deed services, property documentation, contract preparation, notary services. Expert legal support for property owners.',
    keywords: ['property lawyer erbil', 'legal services kurdistan', 'title deed erbil', 'property documentation iraq', 'notary services erbil'],
    icon: 'icon-shield',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80&fm=webp',
    description: 'Expert legal services for property documentation, transactions, and compliance.',
    longDescription: `
      <p>Navigate property legal matters with professional <strong>legal and documentation services in Erbil</strong>. From title deed verification to contract preparation, our directory connects you with experienced property lawyers and documentation specialists serving Kurdistan.</p>

      <h2>Professional Property Legal Services</h2>
      <p>Property transactions and ownership involve complex legal requirements. Professional legal support ensures your interests are protected, documents are properly prepared, and transactions comply with all regulations.</p>

      <h2>Legal Services Available</h2>
      <ul>
        <li><strong>Title Deed Services:</strong> Verification, transfer, and registration</li>
        <li><strong>Contract Preparation:</strong> Sale, purchase, and rental agreements</li>
        <li><strong>Due Diligence:</strong> Property ownership verification</li>
        <li><strong>Notary Services:</strong> Document authentication</li>
        <li><strong>Power of Attorney:</strong> Property management authorization</li>
        <li><strong>Dispute Resolution:</strong> Property-related legal issues</li>
        <li><strong>Foreign Buyer Services:</strong> Special requirements for non-Iraqis</li>
        <li><strong>Estate Planning:</strong> Property inheritance documentation</li>
      </ul>
    `,
    whyNeedThis: [
      'Protect your property investment legally',
      'Ensure proper documentation for transactions',
      'Verify ownership before purchasing',
      'Comply with local property regulations',
      'Handle complex foreign ownership requirements',
      'Resolve property disputes professionally'
    ],
    benefits: [
      'Experienced property law specialists',
      'Document preparation and review',
      'Multi-language services',
      'Liaison with government offices',
      'Ongoing legal support available'
    ],
    faqs: [
      {
        question: 'What documents do I need to buy property in Erbil?',
        answer: 'Requirements include valid ID (passport for foreigners), proof of funds, and the property\'s title deed (Tabu). Additional documents may be required for foreign buyers. A property lawyer ensures all documentation is complete.'
      },
      {
        question: 'How much do property legal services cost?',
        answer: 'Legal consultation typically costs $50-150 per hour. Contract preparation runs $200-500. Complete transaction support including registration ranges from $500-2000 depending on property value and complexity.'
      },
      {
        question: 'Can foreigners own property in Kurdistan?',
        answer: 'Yes, foreign nationals can purchase property in the Kurdistan Region. Specific procedures and documentation requirements apply. A property lawyer experienced with foreign buyers ensures smooth transactions.'
      }
    ],
    relatedCategories: ['home-renovation', 'packers-movers', 'interior-design']
  },

  // ─── Home Renovation ────────────────────────────────────────────────────
  {
    id: 'home-renovation',
    slug: 'home-renovation',
    title: 'Home Renovation',
    titleKu: 'نۆژەنکردنەوەی ماڵ',
    titleAr: 'تجديد المنازل',
    metaTitle: 'Home Renovation Erbil | Contractors Kurdistan | Real House IQ',
    metaDescription: 'Professional home renovation services in Erbil. Kitchen remodeling, bathroom renovation, complete home makeovers. Trusted contractors in Kurdistan.',
    keywords: ['home renovation erbil', 'contractors kurdistan', 'kitchen remodeling erbil', 'bathroom renovation iraq', 'house renovation erbil'],
    icon: 'icon-home',
    heroImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80&fm=webp',
    description: 'Complete home renovation services from minor updates to full property transformations.',
    longDescription: `
      <p>Transform your property with professional <strong>home renovation services in Erbil</strong>. From kitchen and bathroom remodeling to complete home makeovers, our directory features experienced contractors and renovation specialists serving Kurdistan.</p>

      <h2>Comprehensive Renovation Solutions</h2>
      <p>Whether you're updating a dated property, customizing a new purchase, or expanding your living space, professional renovation ensures quality results that enhance your home's value and enjoyment.</p>

      <h2>Renovation Services Available</h2>
      <ul>
        <li><strong>Kitchen Remodeling:</strong> Cabinets, countertops, appliances, layout changes</li>
        <li><strong>Bathroom Renovation:</strong> Fixtures, tiling, layout, accessibility upgrades</li>
        <li><strong>Complete Home Renovation:</strong> Full property transformation</li>
        <li><strong>Room Additions:</strong> Extending living space</li>
        <li><strong>Flooring:</strong> Tile, wood, vinyl, marble installation</li>
        <li><strong>Wall Modifications:</strong> Opening, closing, or moving walls</li>
        <li><strong>Ceiling Work:</strong> False ceilings, repairs, upgrades</li>
        <li><strong>Exterior Renovation:</strong> Facades, balconies, outdoor spaces</li>
      </ul>
    `,
    whyNeedThis: [
      'Update dated properties to modern standards',
      'Customize new purchases to your preferences',
      'Increase property value significantly',
      'Improve functionality and layout',
      'Address maintenance issues comprehensively',
      'Create spaces that match your lifestyle'
    ],
    benefits: [
      'Experienced licensed contractors',
      'Design assistance included',
      'Project management and coordination',
      'Quality materials and workmanship',
      'Warranty on completed work'
    ],
    faqs: [
      {
        question: 'How much does home renovation cost in Erbil?',
        answer: 'Renovation costs vary widely: kitchen remodels $5000-20000, bathroom renovations $2000-8000, complete apartment renovation $15000-50000. Factors include scope, materials, and finishes selected.'
      },
      {
        question: 'How long does a home renovation take?',
        answer: 'Timeline depends on scope: bathroom renovation 2-4 weeks, kitchen remodel 4-8 weeks, complete home renovation 3-6 months. Professional contractors provide detailed schedules before starting.'
      },
      {
        question: 'Do I need permits for renovation in Erbil?',
        answer: 'Permits are typically required for structural changes, electrical upgrades, or plumbing modifications. Cosmetic updates usually don\'t require permits. Your contractor should advise on requirements.'
      }
    ],
    relatedCategories: ['interior-design', 'electrical-services', 'plumbing-services']
  },

  // ─── AC & HVAC Services ─────────────────────────────────────────────────
  {
    id: 'ac-hvac-services',
    slug: 'ac-hvac-services',
    title: 'AC & HVAC Services',
    titleKu: 'خزمەتگوزاری فێنکە و سیستەمی گەرمکردن',
    titleAr: 'خدمات التكييف والتدفئة',
    metaTitle: 'AC Repair Erbil | HVAC Services Kurdistan | Real House IQ',
    metaDescription: 'Professional AC and HVAC services in Erbil. Installation, repair, maintenance of air conditioning, heating systems, ventilation. Expert technicians.',
    keywords: ['ac repair erbil', 'hvac services kurdistan', 'air conditioning erbil', 'ac installation iraq', 'heating systems erbil'],
    icon: 'icon-star',
    heroImage: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80&fm=webp',
    description: 'Expert air conditioning and heating services for year-round comfort in your property.',
    longDescription: `
      <p>Stay comfortable year-round with professional <strong>AC and HVAC services in Erbil</strong>. From installation to repair and maintenance, our directory features experienced technicians serving residential and commercial properties throughout Kurdistan.</p>

      <h2>Climate Control Excellence</h2>
      <p>Erbil's extreme temperatures make reliable climate control essential. Professional HVAC services ensure efficient operation, proper installation, and prompt repairs to keep your property comfortable regardless of outdoor conditions.</p>

      <h2>HVAC Services Available</h2>
      <ul>
        <li><strong>AC Installation:</strong> Split systems, central air, VRF systems</li>
        <li><strong>AC Repair:</strong> All brands and types</li>
        <li><strong>AC Maintenance:</strong> Regular servicing and filter cleaning</li>
        <li><strong>Heating Systems:</strong> Radiator, underfloor, and central heating</li>
        <li><strong>Ventilation:</strong> Fresh air systems and exhaust fans</li>
        <li><strong>Duct Work:</strong> Installation and cleaning</li>
        <li><strong>Emergency Repairs:</strong> 24/7 service for urgent issues</li>
        <li><strong>Energy Audits:</strong> Efficiency assessments and upgrades</li>
      </ul>
    `,
    whyNeedThis: [
      'Essential comfort in Erbil\'s extreme temperatures',
      'Professional installation ensures efficiency',
      'Regular maintenance extends equipment life',
      'Prompt repairs prevent comfort emergencies',
      'Proper sizing ensures optimal performance',
      'Energy-efficient systems reduce bills'
    ],
    benefits: [
      'Experienced certified technicians',
      '24/7 emergency service availability',
      'All brands serviced',
      'Maintenance contracts available',
      'Quality replacement parts'
    ],
    faqs: [
      {
        question: 'How much does AC installation cost in Erbil?',
        answer: 'Split system installation ranges from $800-2000 including unit and installation. Central systems for villas cost $5000-15000 depending on capacity. Prices include equipment, installation, and commissioning.'
      },
      {
        question: 'How often should AC be serviced?',
        answer: 'We recommend servicing AC units twice yearly: before summer cooling season and before winter heating season. Regular maintenance improves efficiency, reduces breakdowns, and extends equipment life.'
      },
      {
        question: 'Why is my AC not cooling properly?',
        answer: 'Common causes include dirty filters (clean monthly), low refrigerant, blocked outdoor unit, or compressor issues. Professional diagnosis identifies the problem quickly. Some fixes are simple, others require expert repair.'
      }
    ],
    relatedCategories: ['electrical-services', 'home-renovation', 'cleaning-services']
  },

  // ─── Swimming Pool Maintenance ──────────────────────────────────────────
  {
    id: 'swimming-pool-maintenance',
    slug: 'swimming-pool-maintenance',
    title: 'Swimming Pool Maintenance',
    titleKu: 'چاودێری مەلەوانگە',
    titleAr: 'صيانة حمامات السباحة',
    metaTitle: 'Pool Maintenance Erbil | Swimming Pool Services Kurdistan | Real House IQ',
    metaDescription: 'Professional swimming pool maintenance in Erbil. Pool cleaning, water treatment, equipment repair. Keep your pool safe and sparkling year-round.',
    keywords: ['pool maintenance erbil', 'swimming pool services kurdistan', 'pool cleaning erbil', 'pool repair iraq', 'pool water treatment erbil'],
    icon: 'icon-area',
    heroImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80&fm=webp',
    description: 'Professional pool maintenance services to keep your swimming pool safe, clean, and ready for use.',
    longDescription: `
      <p>Keep your pool pristine with professional <strong>swimming pool maintenance services in Erbil</strong>. From regular cleaning to equipment repair and water treatment, our directory connects you with experienced pool technicians serving residential and commercial properties across Kurdistan.</p>

      <h2>Expert Pool Care</h2>
      <p>Swimming pools require regular maintenance to remain safe, clean, and enjoyable. Professional pool services handle chemical balance, filtration systems, and equipment upkeep to ensure your pool is always ready for use.</p>

      <h2>Pool Services Available</h2>
      <ul>
        <li><strong>Regular Cleaning:</strong> Skimming, vacuuming, brushing, tile cleaning</li>
        <li><strong>Water Treatment:</strong> Chemical balancing, chlorination, sanitization</li>
        <li><strong>Filter Maintenance:</strong> Cleaning, repair, replacement</li>
        <li><strong>Pump Services:</strong> Repair and replacement</li>
        <li><strong>Pool Heating:</strong> Heater installation and maintenance</li>
        <li><strong>Leak Detection:</strong> Finding and repairing leaks</li>
        <li><strong>Pool Opening/Closing:</strong> Seasonal preparation</li>
        <li><strong>Equipment Upgrades:</strong> Energy-efficient pumps and systems</li>
      </ul>
    `,
    whyNeedThis: [
      'Proper chemistry keeps swimmers safe and healthy',
      'Regular maintenance extends pool life',
      'Professional equipment care prevents costly repairs',
      'Clean pools enhance property enjoyment',
      'Maintain property value with well-kept pools',
      'Expert knowledge prevents common pool problems'
    ],
    benefits: [
      'Trained pool technicians',
      'Flexible service schedules',
      'Quality chemicals and parts',
      'Emergency repair service',
      'Maintenance contracts available'
    ],
    faqs: [
      {
        question: 'How much does pool maintenance cost in Erbil?',
        answer: 'Weekly pool maintenance typically costs $100-200/month depending on pool size. One-time cleaning runs $50-150. Major repairs like pump replacement cost $300-800. Full seasonal opening/closing service is $200-400.'
      },
      {
        question: 'How often should pools be cleaned?',
        answer: 'Pools require weekly maintenance at minimum: skimming daily or every other day, vacuuming weekly, chemical testing 2-3 times per week, and filter cleaning monthly. More frequent service may be needed during heavy use.'
      },
      {
        question: 'Can I maintain my pool myself?',
        answer: 'Basic maintenance like skimming can be done yourself, but proper chemical balance requires expertise. Many pool problems stem from incorrect DIY chemical treatment. Professional maintenance ensures safety and prevents costly damage.'
      }
    ],
    relatedCategories: ['landscaping-gardening', 'cleaning-services', 'electrical-services']
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Sample Service Providers (Placeholder data)
// ═══════════════════════════════════════════════════════════════════════════

export const serviceProviders: ServiceProvider[] = [
  // Interior Design Providers
  {
    id: 'design-studio-erbil',
    name: 'Design Studio Erbil',
    category: 'interior-design',
    description: 'Full-service interior design firm specializing in luxury residential and commercial spaces. Our team of experienced designers creates stunning, functional interiors tailored to your lifestyle.',
    shortDescription: 'Luxury residential and commercial interior design',
    contact: {
      phone: '+964 750 123 4567',
      whatsapp: '+964 750 123 4567',
      email: 'info@designstudioerbil.com',
      address: 'Gulan, Erbil'
    },
    rating: 4.8,
    reviewCount: 45,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80&fm=webp',
    services: ['Residential Design', 'Commercial Design', 'Kitchen & Bath', 'Furniture Selection'],
    workingHours: 'Sun-Thu 9AM-6PM',
    priceRange: 'premium'
  },
  {
    id: 'modern-interiors-krd',
    name: 'Modern Interiors Kurdistan',
    category: 'interior-design',
    description: 'Contemporary interior design solutions for modern living. We blend international trends with local sensibilities to create unique, personalized spaces.',
    shortDescription: 'Contemporary design for modern spaces',
    contact: {
      phone: '+964 750 234 5678',
      whatsapp: '+964 750 234 5678',
      address: 'Ankawa, Erbil'
    },
    rating: 4.6,
    reviewCount: 32,
    verified: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80&fm=webp',
    services: ['Residential Design', 'Space Planning', 'Color Consultation', 'Project Management'],
    workingHours: 'Sun-Thu 10AM-7PM',
    priceRange: 'mid-range'
  },

  // Cleaning Services Providers
  {
    id: 'sparkle-clean-erbil',
    name: 'Sparkle Clean Erbil',
    category: 'cleaning-services',
    description: 'Professional residential and commercial cleaning services. Our trained staff use eco-friendly products to deliver spotless results every time.',
    shortDescription: 'Professional home and office cleaning',
    contact: {
      phone: '+964 750 345 6789',
      whatsapp: '+964 750 345 6789',
      email: 'book@sparkleclean.iq',
      address: 'City Center, Erbil'
    },
    rating: 4.7,
    reviewCount: 89,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80&fm=webp',
    services: ['Regular Cleaning', 'Deep Cleaning', 'Move-in/Move-out', 'Office Cleaning'],
    workingHours: '7 Days 7AM-9PM',
    priceRange: 'mid-range'
  },

  // Electrical Services Providers
  {
    id: 'elite-electrical-krd',
    name: 'Elite Electrical Kurdistan',
    category: 'electrical-services',
    description: 'Licensed electricians providing safe, reliable electrical services for homes and businesses. Available 24/7 for emergencies.',
    shortDescription: 'Licensed electricians - 24/7 emergency service',
    contact: {
      phone: '+964 750 456 7890',
      whatsapp: '+964 750 456 7890',
      address: 'Erbil'
    },
    rating: 4.9,
    reviewCount: 67,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80&fm=webp',
    services: ['Electrical Repairs', 'New Installations', 'Generator Installation', 'Smart Home'],
    workingHours: '24/7 Emergency Available',
    priceRange: 'mid-range'
  },

  // Plumbing Services Providers
  {
    id: 'rapid-plumbing-erbil',
    name: 'Rapid Plumbing Erbil',
    category: 'plumbing-services',
    description: 'Fast, reliable plumbing services for all your needs. From leaky faucets to complete bathroom installations, we handle it all.',
    shortDescription: 'Fast, reliable plumbing - emergency service',
    contact: {
      phone: '+964 750 567 8901',
      whatsapp: '+964 750 567 8901',
      address: 'Erbil'
    },
    rating: 4.5,
    reviewCount: 54,
    verified: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&q=80&fm=webp',
    services: ['Leak Repair', 'Drain Cleaning', 'Water Heaters', 'Bathroom Installation'],
    workingHours: '24/7 Available',
    priceRange: 'budget'
  },

  // Landscaping Providers
  {
    id: 'green-oasis-gardens',
    name: 'Green Oasis Gardens',
    category: 'landscaping-gardening',
    description: 'Transform your outdoor space into a beautiful oasis. Complete landscaping services from design to maintenance.',
    shortDescription: 'Professional landscaping and garden design',
    contact: {
      phone: '+964 750 678 9012',
      whatsapp: '+964 750 678 9012',
      email: 'info@greenoasis.iq',
      address: 'Gulan, Erbil'
    },
    rating: 4.8,
    reviewCount: 38,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&q=80&fm=webp',
    services: ['Garden Design', 'Lawn Installation', 'Irrigation Systems', 'Regular Maintenance'],
    workingHours: 'Sun-Fri 7AM-5PM',
    priceRange: 'premium'
  },

  // Packers & Movers Providers
  {
    id: 'safe-move-kurdistan',
    name: 'Safe Move Kurdistan',
    category: 'packers-movers',
    description: 'Professional moving services with care for your belongings. Local and long-distance moves handled with expertise.',
    shortDescription: 'Professional packing and moving services',
    contact: {
      phone: '+964 750 789 0123',
      whatsapp: '+964 750 789 0123',
      address: 'Erbil'
    },
    rating: 4.6,
    reviewCount: 92,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=400&q=80&fm=webp',
    services: ['Local Moving', 'Long Distance', 'Packing Services', 'Storage'],
    workingHours: '7 Days 7AM-8PM',
    priceRange: 'mid-range'
  },

  // Pest Control Providers
  {
    id: 'shield-pest-control',
    name: 'Shield Pest Control',
    category: 'pest-control',
    description: 'Safe, effective pest control for homes and businesses. Licensed technicians using modern methods and products.',
    shortDescription: 'Safe, effective pest control solutions',
    contact: {
      phone: '+964 750 890 1234',
      whatsapp: '+964 750 890 1234',
      address: 'Erbil'
    },
    rating: 4.7,
    reviewCount: 61,
    verified: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1632317527584-75f6f3fb8fbb?w=400&q=80&fm=webp',
    services: ['General Pest Control', 'Termite Treatment', 'Rodent Control', 'Commercial Services'],
    workingHours: 'Sun-Thu 8AM-6PM',
    priceRange: 'mid-range'
  },

  // CCTV & Security Providers
  {
    id: 'secure-vision-erbil',
    name: 'Secure Vision Erbil',
    category: 'cctv-security',
    description: 'Complete security solutions from design to installation. CCTV, alarms, access control, and monitoring services.',
    shortDescription: 'Complete CCTV and security system solutions',
    contact: {
      phone: '+964 750 901 2345',
      whatsapp: '+964 750 901 2345',
      email: 'security@securevision.iq',
      address: 'Gulan, Erbil'
    },
    rating: 4.8,
    reviewCount: 43,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80&fm=webp',
    services: ['CCTV Installation', 'Alarm Systems', 'Access Control', 'Remote Monitoring'],
    workingHours: 'Sun-Thu 9AM-6PM',
    priceRange: 'mid-range'
  },

  // Painting Services Providers
  {
    id: 'perfect-finish-painters',
    name: 'Perfect Finish Painters',
    category: 'painting-services',
    description: 'Quality painting services for interior and exterior projects. Professional preparation and premium paints for lasting results.',
    shortDescription: 'Quality interior and exterior painting',
    contact: {
      phone: '+964 750 012 3456',
      whatsapp: '+964 750 012 3456',
      address: 'Erbil'
    },
    rating: 4.5,
    reviewCount: 78,
    verified: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80&fm=webp',
    services: ['Interior Painting', 'Exterior Painting', 'Decorative Finishes', 'Wallpaper'],
    workingHours: 'Sun-Fri 7AM-6PM',
    priceRange: 'budget'
  },

  // Furniture Providers
  {
    id: 'home-elegance-furniture',
    name: 'Home Elegance Furniture',
    category: 'furniture',
    description: 'Quality furniture for every room and budget. Custom designs, imported brands, and professional delivery.',
    shortDescription: 'Quality home and office furniture',
    contact: {
      phone: '+964 750 111 2222',
      whatsapp: '+964 750 111 2222',
      email: 'sales@homeelegance.iq',
      address: 'Gulan Showroom, Erbil'
    },
    rating: 4.6,
    reviewCount: 56,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80&fm=webp',
    services: ['Living Room', 'Bedroom', 'Office Furniture', 'Custom Design'],
    workingHours: 'Sun-Sat 10AM-9PM',
    priceRange: 'mid-range'
  },

  // Legal Services Providers
  {
    id: 'property-law-erbil',
    name: 'Property Law Erbil',
    category: 'legal-documentation',
    description: 'Expert property legal services including title verification, contract preparation, and transaction support.',
    shortDescription: 'Expert property legal services',
    contact: {
      phone: '+964 750 222 3333',
      whatsapp: '+964 750 222 3333',
      email: 'legal@propertylaw.iq',
      address: 'Gulan, Erbil'
    },
    rating: 4.9,
    reviewCount: 34,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80&fm=webp',
    services: ['Title Deed Services', 'Contract Preparation', 'Due Diligence', 'Foreign Buyer Support'],
    workingHours: 'Sun-Thu 9AM-5PM',
    priceRange: 'premium'
  },

  // Home Renovation Providers
  {
    id: 'transform-renovations',
    name: 'Transform Renovations',
    category: 'home-renovation',
    description: 'Complete home renovation services from kitchens and bathrooms to full property makeovers. Quality workmanship guaranteed.',
    shortDescription: 'Complete home renovation specialists',
    contact: {
      phone: '+964 750 333 4444',
      whatsapp: '+964 750 333 4444',
      email: 'info@transformreno.iq',
      address: 'Erbil'
    },
    rating: 4.7,
    reviewCount: 48,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&q=80&fm=webp',
    services: ['Kitchen Remodeling', 'Bathroom Renovation', 'Complete Renovation', 'Flooring'],
    workingHours: 'Sun-Fri 8AM-6PM',
    priceRange: 'mid-range'
  },

  // AC & HVAC Providers
  {
    id: 'cool-comfort-hvac',
    name: 'Cool Comfort HVAC',
    category: 'ac-hvac-services',
    description: 'Expert AC installation, repair, and maintenance. All brands serviced. Emergency repairs available 24/7.',
    shortDescription: 'Expert AC and HVAC services - 24/7',
    contact: {
      phone: '+964 750 444 5555',
      whatsapp: '+964 750 444 5555',
      address: 'Erbil'
    },
    rating: 4.8,
    reviewCount: 103,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80&fm=webp',
    services: ['AC Installation', 'AC Repair', 'Maintenance', 'Heating Systems'],
    workingHours: '24/7 Emergency Available',
    priceRange: 'mid-range'
  },

  // Pool Maintenance Providers
  {
    id: 'aqua-care-pools',
    name: 'Aqua Care Pools',
    category: 'swimming-pool-maintenance',
    description: 'Professional pool maintenance to keep your pool safe and sparkling. Regular service and emergency repairs.',
    shortDescription: 'Professional pool cleaning and maintenance',
    contact: {
      phone: '+964 750 555 6666',
      whatsapp: '+964 750 555 6666',
      email: 'service@aquacare.iq',
      address: 'Erbil'
    },
    rating: 4.6,
    reviewCount: 29,
    verified: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&q=80&fm=webp',
    services: ['Regular Cleaning', 'Water Treatment', 'Equipment Repair', 'Pool Opening/Closing'],
    workingHours: 'Sun-Sat 7AM-7PM',
    priceRange: 'mid-range'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════════════

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find(c => c.slug === slug);
}

export function getCategoryById(id: string): ServiceCategory | undefined {
  return serviceCategories.find(c => c.id === id);
}

export function getProvidersByCategory(categoryId: string): ServiceProvider[] {
  return serviceProviders.filter(p => p.category === categoryId);
}

export function getFeaturedProviders(categoryId?: string): ServiceProvider[] {
  let providers = serviceProviders.filter(p => p.featured);
  if (categoryId) {
    providers = providers.filter(p => p.category === categoryId);
  }
  return providers;
}

export function getAllCategorySlugs(): string[] {
  return serviceCategories.map(c => c.slug);
}

export function getAllCategories(): ServiceCategory[] {
  return serviceCategories;
}

export function getRelatedCategories(category: ServiceCategory): ServiceCategory[] {
  return category.relatedCategories
    .map(id => getCategoryById(id))
    .filter((c): c is ServiceCategory => c !== undefined);
}

export function getProviderById(id: string): ServiceProvider | undefined {
  return serviceProviders.find(p => p.id === id);
}

export function searchProviders(query: string): ServiceProvider[] {
  const lowerQuery = query.toLowerCase();
  return serviceProviders.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.services.some(s => s.toLowerCase().includes(lowerQuery))
  );
}
