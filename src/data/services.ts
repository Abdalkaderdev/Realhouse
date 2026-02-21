// ═══════════════════════════════════════════════════════════════════════════
// Services Data - Real House Erbil
// SEO-Optimized Service Definitions for Real Estate Agency
// Target URLs:
//   /services/property-sales - Selling properties in Erbil
//   /services/property-buying - Buying assistance
//   /services/property-management - Management services
//   /services/property-valuation - Free valuations
//   /services/investment-consulting - Investment advice
//   /services/legal-assistance - Legal support
// ═══════════════════════════════════════════════════════════════════════════

export interface ServiceFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceTestimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  h1Title: string; // SEO-optimized H1 with target keyword
  titleKu?: string;
  titleAr?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroImage: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: ServiceFeature[];
  benefits: string[];
  process: { step: number; title: string; description: string; duration?: string }[];
  faqs: ServiceFAQ[];
  testimonials: ServiceTestimonial[];
  relatedServices: string[];
  ctaTitle: string;
  ctaDescription: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Service Definitions
// ═══════════════════════════════════════════════════════════════════════════

export const services: Service[] = [
  // ─── Property Sales Service ─────────────────────────────────────────────
  {
    id: 'property-sales',
    slug: 'property-sales',
    title: 'Property Sales Services',
    h1Title: 'Sell Property in Erbil - Professional Real Estate Sales Services',
    titleKu: 'فرۆشتنی موڵک لە هەولێر',
    titleAr: 'بيع العقارات في أربيل',
    metaTitle: 'Sell Property Erbil | List Your Home | Real House Kurdistan',
    metaDescription: 'Sell your property in Erbil with Real House. Professional marketing, expert pricing, and access to 500+ qualified buyers. Free property valuation. Sell faster, get more.',
    keywords: ['sell property erbil', 'list property kurdistan', 'sell house erbil', 'property listing erbil', 'real estate marketing erbil', 'sell apartment erbil', 'sell villa erbil', 'property for sale erbil'],
    heroImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80&fm=webp',
    icon: 'icon-arrow-right',
    shortDescription: 'Professional property selling services with expert marketing, pricing strategy, and access to qualified buyers in Erbil\'s thriving real estate market.',
    fullDescription: `
      <p>When it's time to <strong>sell property in Erbil</strong>, you need a partner who understands the local market dynamics and can connect you with serious, qualified buyers. Real House provides comprehensive property sales services designed to maximize your property's value while minimizing time on the market.</p>

      <h2>Why Choose Real House to Sell Your Property in Erbil?</h2>
      <p>The Erbil real estate market continues to attract growing demand from local buyers, expats working in the Kurdistan Region, and international investors seeking opportunities in one of the Middle East's most stable property markets. Our established network of over 500 active buyers and proven marketing strategies ensure your property reaches the right audience at the optimal price point.</p>

      <p>We combine decades of traditional real estate expertise with cutting-edge digital marketing techniques to create maximum exposure for your listing. From professional HDR photography to immersive 360-degree virtual tours, drone footage, and targeted social media campaigns, every detail is meticulously handled to present your property in its best light and attract serious buyers.</p>

      <h2>Our Property Sales Process</h2>
      <p>Selling property can feel overwhelming, but our streamlined six-step process makes it straightforward and stress-free. We begin with a comprehensive comparative market analysis (CMA) to determine optimal pricing based on recent sales data, current inventory, and market trends. Then we create a tailored marketing plan that showcases your property's unique features and reaches your ideal buyer demographic.</p>

      <h2>Professional Property Marketing That Delivers Results</h2>
      <p>Your property deserves exceptional presentation that stands out in a competitive market. Our comprehensive marketing services include:</p>
      <ul>
        <li><strong>Professional HDR Photography:</strong> High-quality images captured at optimal times with professional lighting to highlight your property's best features</li>
        <li><strong>360-Degree Virtual Tours:</strong> Interactive tours allowing buyers anywhere in the world to explore your property remotely</li>
        <li><strong>Drone Aerial Photography:</strong> Stunning aerial views showcasing location, surroundings, and neighborhood amenities</li>
        <li><strong>Cinematic Video Walkthroughs:</strong> Engaging video content optimized for social media platforms and property portals</li>
        <li><strong>Targeted Digital Marketing:</strong> Data-driven campaigns reaching qualified buyers on Google, Facebook, Instagram, and property websites</li>
        <li><strong>International Exposure:</strong> Listings shared with our global partner network spanning the Middle East, Europe, and North America</li>
        <li><strong>Premium Property Portals:</strong> Featured listings on leading regional and international real estate platforms</li>
        <li><strong>Direct Buyer Outreach:</strong> Personalized contact with our database of pre-qualified buyers matching your property criteria</li>
      </ul>

      <h2>Accurate Property Valuation - The Foundation of a Successful Sale</h2>
      <p>Pricing your property correctly from day one is crucial for a successful sale. Overpricing leads to extended market time and eventual price reductions that can stigmatize your listing. Underpricing leaves money on the table. Our experienced valuers provide detailed comparative market analysis, considering recent sales of similar properties, current active listings, days on market trends, and broader economic factors to recommend an optimal asking price that attracts serious buyers while maximizing your return.</p>

      <h2>Our Qualified Buyer Network</h2>
      <p>Real House maintains an extensive database of pre-qualified, active buyers specifically seeking properties in Erbil and across Kurdistan. When you list with us, your property is immediately presented to buyers whose requirements match what you're offering. This targeted approach often results in faster sales at better prices compared to passive marketing alone.</p>

      <h2>Types of Properties We Sell</h2>
      <p>We have successfully sold every type of property across Erbil's diverse real estate landscape:</p>
      <ul>
        <li><strong>Luxury Villas:</strong> Standalone homes in premium gated communities including Dream City, Italian Village, English Village, and Gulan</li>
        <li><strong>Modern Apartments:</strong> Units in high-rise towers throughout the city center and emerging districts</li>
        <li><strong>Penthouses:</strong> Exclusive top-floor residences with panoramic views and premium finishes</li>
        <li><strong>Townhouses & Duplexes:</strong> Family-friendly multi-story homes in established neighborhoods</li>
        <li><strong>Commercial Properties:</strong> Retail spaces, offices, warehouses, and mixed-use buildings</li>
        <li><strong>Land:</strong> Residential plots, commercial land, and development sites</li>
      </ul>
    `,
    features: [
      {
        title: 'Free Property Valuation',
        description: 'Comprehensive comparative market analysis using recent sales data and current trends to determine optimal pricing.',
        icon: 'icon-star'
      },
      {
        title: 'Professional Photography',
        description: 'HDR photography, 360-degree virtual tours, drone footage, and cinematic video to showcase your property beautifully.',
        icon: 'icon-area'
      },
      {
        title: 'Qualified Buyer Network',
        description: 'Immediate exposure to our database of 500+ pre-qualified, actively searching buyers.',
        icon: 'icon-shield'
      },
      {
        title: 'Expert Negotiation',
        description: 'Skilled negotiators with 23+ years experience ensuring you achieve the best possible price and terms.',
        icon: 'icon-award'
      }
    ],
    benefits: [
      'Free professional property valuation worth $200',
      'Professional HDR photography and virtual tours included',
      'Featured listing on major property portals',
      'Access to 500+ qualified buyer database',
      'Expert price negotiation on your behalf',
      'Complete transaction management to closing',
      'International marketing reach',
      'No upfront costs - pay only when sold'
    ],
    process: [
      { step: 1, title: 'Free Property Valuation', description: 'Our expert valuers conduct a comprehensive market analysis to determine optimal pricing for your property.', duration: '1-2 days' },
      { step: 2, title: 'Listing Agreement', description: 'Simple, transparent agreement outlining our services, marketing plan, and competitive commission structure.', duration: 'Same day' },
      { step: 3, title: 'Property Preparation', description: 'Professional photography, virtual tours, drone footage, and compelling property descriptions prepared.', duration: '3-5 days' },
      { step: 4, title: 'Multi-Channel Marketing', description: 'Your property launches across digital platforms, property portals, social media, and our buyer network.', duration: 'Ongoing' },
      { step: 5, title: 'Buyer Viewings & Negotiation', description: 'We qualify all inquiries, conduct viewings, and negotiate offers to secure the best price and terms.', duration: 'Varies' },
      { step: 6, title: 'Closing & Handover', description: 'Complete assistance through contracts, legal requirements, and smooth property handover to buyer.', duration: '2-4 weeks' }
    ],
    faqs: [
      {
        question: 'How much does it cost to sell my property with Real House?',
        answer: 'We charge a competitive commission based on the final sale price, typically 2-3% depending on property type and value. There are no upfront costs - you only pay when your property sells successfully. Our marketing package including professional photography and virtual tours is included at no additional charge.'
      },
      {
        question: 'How long does it typically take to sell a property in Erbil?',
        answer: 'Average time to sale varies by property type, price point, and location. Well-priced properties in popular areas like Dream City and Gulan typically sell within 30-60 days. Luxury properties and unique listings may take longer to find the right buyer. We provide realistic timeframe expectations during your initial consultation.'
      },
      {
        question: 'Do you help with property preparation before listing?',
        answer: 'Yes, we provide staging advice and can recommend trusted contractors for any repairs, painting, or improvements that could increase your property\'s appeal and value. Our team advises on cost-effective improvements that deliver the best return on investment.'
      },
      {
        question: 'Can I sell my property if I live abroad?',
        answer: 'Absolutely. Many of our sellers are based overseas in the US, UK, Europe, and Gulf countries. We handle everything locally including photography, viewings, negotiations, and paperwork. You can grant power of attorney to a local representative for document signing, or we can arrange virtual signing where permitted.'
      },
      {
        question: 'What happens if my property doesn\'t sell?',
        answer: 'If your property hasn\'t received offers within an agreed timeframe, we\'ll review market feedback with you and recommend adjustments to pricing or presentation. Our goal is always to achieve a successful sale, and we\'ll work with you to find the right strategy. You can also cancel your listing agreement with reasonable notice.'
      },
      {
        question: 'How do you market properties to international buyers?',
        answer: 'We leverage digital marketing across platforms popular with international buyers, list on global property portals, and share listings with our network of partner agencies in Europe, Gulf states, and North America. Many Kurdistan diaspora buyers find properties through our targeted campaigns.'
      }
    ],
    testimonials: [
      {
        quote: 'Real House sold our villa in Dream City within 45 days at full asking price. Their marketing was exceptional - the virtual tour brought buyers from Dubai who purchased without a second visit.',
        name: 'Ahmad Hassan',
        role: 'Villa Seller, Dream City',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      },
      {
        quote: 'After months with another agency, we switched to Real House. They revalued our apartment, adjusted the price, and found a buyer within 3 weeks. Professional service throughout.',
        name: 'Sarah Abdullah',
        role: 'Apartment Seller, Gulan',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      },
      {
        quote: 'Selling from the UK seemed daunting, but Real House made it seamless. They handled everything locally and kept me informed every step of the way. Highly recommended.',
        name: 'Karwan Mohammed',
        role: 'Overseas Seller, UK',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      }
    ],
    relatedServices: ['property-valuation', 'property-buying', 'legal-assistance'],
    ctaTitle: 'Get Your Free Property Valuation',
    ctaDescription: 'Discover what your property is worth in today\'s Erbil market. Our expert valuers provide accurate, no-obligation assessments within 48 hours.'
  },

  // ─── Property Buying Service ─────────────────────────────────────────────
  {
    id: 'property-buying',
    slug: 'property-buying',
    title: 'Property Buying Assistance',
    h1Title: 'Buy Property in Erbil - Expert Buying Assistance & Guidance',
    titleKu: 'خزمەتگوزاری کڕینی موڵک لە هەولێر',
    titleAr: 'خدمات شراء العقارات في أربيل',
    metaTitle: 'Buy Property Erbil | Real Estate Agent Kurdistan | Real House',
    metaDescription: 'Looking to buy property in Erbil? Real House provides expert buyer assistance with access to 500+ listings, negotiation support, and complete transaction guidance. Find your dream home.',
    keywords: ['buy property erbil', 'real estate agent erbil', 'houses for sale erbil', 'apartments erbil', 'villas for sale kurdistan', 'property investment erbil', 'buy house erbil', 'property buyer agent'],
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&fm=webp',
    icon: 'icon-area',
    shortDescription: 'Expert guidance for buying your dream property in Erbil with personalized service, exclusive access to listings, and professional negotiation support.',
    fullDescription: `
      <p>Finding the perfect property in Erbil requires local expertise, deep market knowledge, and a trusted partner committed to your interests. As the leading <strong>real estate agent in Erbil</strong> with over 23 years of experience, Real House offers comprehensive property buying services tailored to your unique needs, preferences, and investment goals.</p>

      <h2>Why Choose Real House to Buy Property in Erbil?</h2>
      <p>The Erbil real estate market offers exceptional opportunities for homeowners and investors alike. With our deep understanding of the Kurdistan property landscape - from emerging neighborhoods to established luxury communities - we guide you through every step of the buying process, from initial consultation through to receiving your keys.</p>

      <p>Whether you're searching for a luxury villa in Dream City's gated community, a modern apartment in Gulan with city views, a family townhouse in English Village, or a strategic investment property with rental potential, our dedicated team provides personalized service that matches your requirements with the best available properties in the market - including exclusive off-market opportunities you won't find elsewhere.</p>

      <h2>Our Property Buying Process</h2>
      <p>We've streamlined the property buying experience to make your journey seamless and stress-free, whether you're a first-time buyer, relocating expat, or experienced investor. Our proven six-step process begins with understanding your needs, budget, lifestyle preferences, and timeline. We then curate a selection of properties matching your criteria, arrange private viewings (in-person or virtual), and provide expert negotiation support to secure the best possible deal.</p>

      <h2>Expert Market Analysis & Guidance</h2>
      <p>Our team continuously monitors the Erbil property market, tracking price trends by neighborhood, analyzing new developments and off-plan opportunities, and identifying investment hotspots. This real-time market intelligence allows us to advise you on:</p>
      <ul>
        <li><strong>Best areas for capital appreciation:</strong> Neighborhoods with strong growth potential</li>
        <li><strong>Rental yield analysis:</strong> Properties suited for buy-to-let investment</li>
        <li><strong>Fair market value:</strong> Ensuring you don't overpay</li>
        <li><strong>Negotiation strategy:</strong> When to push and when to hold</li>
        <li><strong>Future development impact:</strong> How upcoming projects affect values</li>
      </ul>

      <h2>Types of Properties Available</h2>
      <p>Real House offers access to an exclusive portfolio of over 500 properties across Erbil's most desirable neighborhoods:</p>
      <ul>
        <li><strong>Luxury Villas:</strong> Standalone homes in gated communities like Dream City, Italian Village, English Village, and Gulan - from $150K to $2M+</li>
        <li><strong>Modern Apartments:</strong> High-rise living in premium towers throughout Gulan and city center - from $75K</li>
        <li><strong>Penthouses:</strong> Exclusive top-floor residences with panoramic views and premium finishes</li>
        <li><strong>Townhouses & Duplexes:</strong> Family-friendly multi-story homes in established neighborhoods</li>
        <li><strong>Commercial Properties:</strong> Retail spaces, offices, warehouses, and investment units</li>
        <li><strong>Off-Plan Properties:</strong> Pre-construction opportunities with flexible payment plans and early-bird pricing</li>
        <li><strong>Land:</strong> Residential plots and development sites</li>
      </ul>

      <h2>Financing & Payment Assistance</h2>
      <p>Understanding that property purchases require significant investment, we provide comprehensive guidance on available financing options. This includes connecting you with partner banks offering mortgages, explaining developer payment plans with installment options, and advising on the most advantageous payment structures based on your situation. Our relationships with leading financial institutions help ensure you get competitive terms.</p>

      <h2>Support for International Buyers</h2>
      <p>Many of our clients are based overseas - whether Kurdistan diaspora returning home, international investors, or expats relocating for work. We specialize in supporting remote buyers with virtual property tours, detailed video walkthroughs, comprehensive property reports, and coordination with legal representatives for documentation. Our multilingual team speaks English, Arabic, and Kurdish to ensure clear communication throughout your journey.</p>
    `,
    features: [
      {
        title: 'Curated Property Selection',
        description: 'Access to 500+ verified listings including exclusive off-market properties matching your specific requirements.',
        icon: 'icon-area'
      },
      {
        title: 'Expert Negotiation',
        description: 'Skilled negotiators with 23+ years experience securing the best possible price and terms on your behalf.',
        icon: 'icon-award'
      },
      {
        title: 'Legal Support',
        description: 'Complete assistance with contracts, due diligence, documentation, and property registration.',
        icon: 'icon-shield'
      },
      {
        title: 'Virtual Tours',
        description: '360-degree virtual property tours and detailed video walkthroughs for remote buyers and busy professionals.',
        icon: 'icon-calendar'
      }
    ],
    benefits: [
      'Access to 500+ verified property listings',
      'Exclusive off-market opportunities',
      'Multilingual support (English, Arabic, Kurdish)',
      'Free property valuation reports',
      'Expert price negotiation saving you money',
      'Due diligence and legal document review',
      'Post-purchase support and guidance',
      'Investment return analysis for buy-to-let'
    ],
    process: [
      { step: 1, title: 'Initial Consultation', description: 'Discuss your requirements, budget, preferred locations, and timeline with our expert buyer agents.', duration: '30-60 mins' },
      { step: 2, title: 'Property Search', description: 'We curate a personalized selection of properties matching your criteria from our extensive database.', duration: '1-3 days' },
      { step: 3, title: 'Private Viewings', description: 'Schedule in-person or virtual tours of shortlisted properties at your convenience with our agents.', duration: 'Flexible' },
      { step: 4, title: 'Price Negotiation', description: 'Once you find your property, our team negotiates on your behalf to secure the best possible deal.', duration: '1-7 days' },
      { step: 5, title: 'Due Diligence', description: 'Complete property verification, title deed checks, legal review, and documentation preparation.', duration: '1-2 weeks' },
      { step: 6, title: 'Closing & Handover', description: 'Finalize the purchase, complete registration, and receive your property keys with full support.', duration: '1-2 weeks' }
    ],
    faqs: [
      {
        question: 'Can foreigners buy property in Erbil?',
        answer: 'Yes, foreign nationals can purchase property in the Kurdistan Region of Iraq. The KRG has created a welcoming environment for international buyers. Real House provides full support for foreign buyers, including legal guidance, documentation assistance, and coordination with relevant authorities.'
      },
      {
        question: 'What documents do I need to buy property in Erbil?',
        answer: 'Required documents typically include: valid passport or Iraqi ID, proof of funds (bank statements), and power of attorney if buying through a representative. For foreigners, residency documents may be helpful but are not always required. We guide you through all documentation requirements specific to your situation.'
      },
      {
        question: 'How long does the property buying process take?',
        answer: 'The typical property purchase process takes 2-4 weeks from offer acceptance to completion, depending on property type, ownership structure, and whether financing is involved. Off-plan purchases with payment plans may have different timelines. We provide realistic expectations during your initial consultation.'
      },
      {
        question: 'Do you offer property financing assistance?',
        answer: 'While we don\'t provide direct financing, we connect you with partner banks offering mortgage products and help you explore payment plan options offered by developers on off-plan properties. Many developers offer 2-5 year installment plans with competitive terms.'
      },
      {
        question: 'What are typical property prices in Erbil?',
        answer: 'Property prices vary significantly by type and location. Modern apartments start from $75,000-$100,000 in good areas. Villas in gated communities like Dream City range from $150,000 to $500,000+. Luxury villas and penthouses can exceed $1 million. We help you find the best value within your budget.'
      },
      {
        question: 'Can I buy property remotely without visiting Erbil?',
        answer: 'Yes, many of our international clients purchase remotely. We provide detailed virtual tours, comprehensive property reports with photos and videos, neighborhood information, and can arrange video calls during viewings. Legal representatives can handle document signing on your behalf.'
      }
    ],
    testimonials: [
      {
        quote: 'As a first-time buyer, I was nervous about the process. Real House made everything clear and simple. They found me the perfect apartment in Gulan within my budget and handled all the paperwork.',
        name: 'Dilan Rashid',
        role: 'First-Time Buyer',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
      },
      {
        quote: 'Living in Germany, I relied entirely on Real House to find and secure my investment property. Their virtual tours and constant communication gave me complete confidence. Excellent service.',
        name: 'Rebwar Amin',
        role: 'International Investor',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      },
      {
        quote: 'Real House negotiated 15% off the asking price on our Dream City villa. Their market knowledge and negotiation skills saved us a significant amount. We couldn\'t be happier with our new home.',
        name: 'Naz & Salar Mahmoud',
        role: 'Villa Buyers',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
      }
    ],
    relatedServices: ['property-valuation', 'investment-consulting', 'legal-assistance'],
    ctaTitle: 'Ready to Find Your Dream Property?',
    ctaDescription: 'Contact our expert team today for a personalized consultation. Share your requirements and let us find your perfect property in Erbil.'
  },

  // ─── Property Management Service ─────────────────────────────────────────
  {
    id: 'property-management',
    slug: 'property-management',
    title: 'Property Management Services',
    h1Title: 'Property Management Erbil - Full-Service Rental Management',
    titleKu: 'بەڕێوەبردنی موڵک لە هەولێر',
    titleAr: 'خدمات إدارة العقارات أربيل',
    metaTitle: 'Property Management Erbil | Rental Management Kurdistan | Real House',
    metaDescription: 'Professional property management services in Erbil. Complete rental management, tenant screening, maintenance, rent collection & reporting. Maximize your rental income hassle-free.',
    keywords: ['property management erbil', 'rental management kurdistan', 'property maintenance erbil', 'landlord services erbil', 'investment property management iraq', 'tenant management', 'rent collection erbil'],
    heroImage: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&q=80&fm=webp',
    icon: 'icon-shield',
    shortDescription: 'Full-service property management for investors seeking hassle-free rental income from Erbil properties. We handle everything so you can relax.',
    fullDescription: `
      <p>Maximize your rental income while minimizing hassle with Real House <strong>property management services in Erbil</strong>. We handle every aspect of managing your investment property - from finding qualified tenants to collecting rent and coordinating maintenance - allowing you to enjoy passive income without the day-to-day responsibilities and headaches of being a landlord.</p>

      <h2>Complete Property Management Solutions</h2>
      <p>Our comprehensive <strong>property management service in Erbil</strong> is designed for property investors who want professional oversight of their real estate assets. Whether you're based locally, elsewhere in Iraq, or overseas in Europe, America, or the Gulf, we act as your trusted representative on the ground, ensuring your property generates consistent returns while maintaining its value and condition.</p>

      <h2>What Our Property Management Covers</h2>
      <p>Our all-inclusive <strong>property management in Erbil</strong> handles everything:</p>
      <ul>
        <li><strong>Tenant Finding & Screening:</strong> Marketing, showing, thorough background checks, and reference verification to find reliable tenants</li>
        <li><strong>Lease Management:</strong> Preparing legally compliant rental agreements, renewals, and ensuring tenant adherence to terms</li>
        <li><strong>Rent Collection:</strong> Timely collection with direct deposit to your bank account anywhere in the world</li>
        <li><strong>Maintenance Coordination:</strong> 24/7 emergency response, scheduled maintenance, and coordination with vetted contractors</li>
        <li><strong>Property Inspections:</strong> Regular condition assessments with detailed photo documentation</li>
        <li><strong>Financial Reporting:</strong> Detailed monthly statements and annual summaries for easy tax preparation</li>
        <li><strong>Legal Compliance:</strong> Ensuring adherence to local rental regulations and handling any tenant disputes</li>
        <li><strong>Utility Management:</strong> Monitoring and coordinating utility payments if required</li>
      </ul>

      <h2>For International & Overseas Investors</h2>
      <p>Many of our property management clients are overseas investors who rely on us to manage their Erbil properties remotely. Whether you're in the UK, Germany, America, or the Gulf states, we provide complete transparency through:</p>
      <ul>
        <li>Online owner portal with real-time access to documents and statements</li>
        <li>Regular video updates and property inspection reports</li>
        <li>Responsive communication across time zones via WhatsApp, email, and video calls</li>
        <li>Direct bank transfers to your international account</li>
        <li>Annual tax documentation for your home country requirements</li>
      </ul>

      <h2>Tenant Relations Excellence</h2>
      <p>Happy tenants mean longer tenancies, better property care, and higher returns for you. We maintain professional relationships with all tenants, responding promptly to concerns, coordinating repairs efficiently, and ensuring a positive rental experience that encourages lease renewals. Our average tenant retention rate exceeds 85%, significantly reducing costly turnover periods.</p>

      <h2>Financial Performance Optimization</h2>
      <p>Beyond day-to-day management, we actively work to maximize your property's returns. This includes:</p>
      <ul>
        <li>Annual rent reviews benchmarked against current market rates</li>
        <li>Identifying value-add improvements that justify rent increases</li>
        <li>Minimizing vacancy periods through proactive marketing</li>
        <li>Advising on optimal market timing for potential sale</li>
        <li>Cost-effective maintenance to preserve property value</li>
      </ul>

      <h2>Property Types We Manage</h2>
      <p>Our experienced team manages all types of investment properties:</p>
      <ul>
        <li>Apartments in towers and residential complexes</li>
        <li>Villas in gated communities</li>
        <li>Townhouses and duplexes</li>
        <li>Commercial retail and office spaces</li>
        <li>Multi-unit residential buildings</li>
        <li>Furnished properties for short-term executive rentals</li>
      </ul>
    `,
    features: [
      {
        title: 'Tenant Management',
        description: 'Complete tenant lifecycle from finding and screening to move-out, including lease management and issue resolution.',
        icon: 'icon-shield'
      },
      {
        title: 'Rent Collection',
        description: 'Reliable rent collection with direct international deposit, late payment follow-up, and financial reporting.',
        icon: 'icon-star'
      },
      {
        title: 'Maintenance Coordination',
        description: '24/7 emergency response and scheduled maintenance with vetted, reliable contractors at competitive rates.',
        icon: 'icon-check'
      },
      {
        title: 'Financial Reporting',
        description: 'Detailed monthly statements, annual summaries, and tax documentation for easy record-keeping.',
        icon: 'icon-area'
      }
    ],
    benefits: [
      'Maximized rental income through professional management',
      'Reduced vacancy periods with proactive marketing',
      'Professional tenant screening and verification',
      'Regular property inspections with photo reports',
      'Transparent monthly financial statements',
      '24/7 emergency maintenance response',
      'Peace of mind for overseas property owners',
      'Single point of contact for all property matters'
    ],
    process: [
      { step: 1, title: 'Property Assessment', description: 'We evaluate your property condition and recommend any improvements to maximize rental value.', duration: '1-2 days' },
      { step: 2, title: 'Management Agreement', description: 'Clear agreement outlining services, fees, responsibilities, and communication expectations.', duration: 'Same day' },
      { step: 3, title: 'Tenant Placement', description: 'Professional marketing, viewings, thorough screening, and lease signing with qualified tenants.', duration: '2-4 weeks' },
      { step: 4, title: 'Ongoing Management', description: 'Rent collection, maintenance coordination, regular inspections, and tenant relations.', duration: 'Continuous' },
      { step: 5, title: 'Monthly Reporting', description: 'Detailed financial statements and property updates delivered to your inbox.', duration: 'Monthly' },
      { step: 6, title: 'Lease Renewal / Turnover', description: 'Negotiating renewals with existing tenants or managing smooth transitions.', duration: 'As needed' }
    ],
    faqs: [
      {
        question: 'What does property management cost?',
        answer: 'Our management fees are a percentage of monthly rent collected, typically 8-10% depending on property type, location, and services required. There are no fees during vacancy periods - we only earn when you earn. Contact us for a customized quote based on your specific property.'
      },
      {
        question: 'Can you manage multiple properties for me?',
        answer: 'Yes, we offer portfolio management with volume discounts for clients with multiple properties. Many investors trust us with their entire Kurdistan property portfolio. We provide consolidated reporting and coordinated management across all your assets.'
      },
      {
        question: 'How do you handle maintenance emergencies?',
        answer: 'We provide 24/7 emergency response for urgent issues like water leaks, electrical problems, or security concerns. Our team acts immediately within pre-authorized spending limits (typically $200-500 for emergencies). For larger issues, we contact you for approval before proceeding.'
      },
      {
        question: 'Do I need to be in Erbil to use your services?',
        answer: 'Not at all. Many of our clients are international investors based in Europe, America, and Gulf countries. We handle everything locally and keep you informed through regular reports, video calls, and our online owner portal. You never need to visit unless you want to.'
      },
      {
        question: 'How do you find and screen tenants?',
        answer: 'We market properties across multiple channels, conduct thorough background checks including employment verification, reference checks, and financial assessment. We verify identity documents, employment status, and contact previous landlords. Only qualified, vetted tenants are presented for your property.'
      },
      {
        question: 'What happens if a tenant stops paying rent?',
        answer: 'We have established procedures for rent arrears including formal notices, payment plans where appropriate, and legal proceedings if necessary. Our thorough screening minimizes this risk, but when issues arise, we handle them professionally while keeping you informed.'
      }
    ],
    testimonials: [
      {
        quote: 'Living in London, I needed someone I could trust to manage my two apartments in Erbil. Real House has been excellent - never missed a rent payment to my UK account, and their monthly reports are detailed and professional.',
        name: 'Karwan Salih',
        role: 'Overseas Investor, UK',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      },
      {
        quote: 'After a bad experience managing my property myself, I switched to Real House. They found better tenants, increased my rent by 20%, and I haven\'t had to worry about anything since. Worth every penny.',
        name: 'Shirin Jamal',
        role: 'Property Investor',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      },
      {
        quote: 'As a busy professional, I don\'t have time for landlord duties. Real House handles everything for my villa rental - from finding tenants to fixing leaky taps. Their communication is excellent.',
        name: 'Dr. Hemin Aziz',
        role: 'Villa Owner',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      }
    ],
    relatedServices: ['property-sales', 'property-valuation', 'investment-consulting'],
    ctaTitle: 'Maximize Your Investment Returns',
    ctaDescription: 'Let us handle the details while you enjoy passive rental income from your Erbil property. Contact us for a free management consultation.'
  },

  // ─── Property Valuation Service ──────────────────────────────────────────
  {
    id: 'property-valuation',
    slug: 'property-valuation',
    title: 'Property Valuation Services',
    h1Title: 'Free Property Valuation Erbil - Professional Home Appraisals',
    titleKu: 'خزمەتگوزاری نرخاندنی موڵک لە هەولێر',
    titleAr: 'خدمات تقييم العقارات أربيل',
    metaTitle: 'Property Valuation Erbil | Free Home Appraisal Kurdistan | Real House',
    metaDescription: 'Get a free property valuation in Erbil. Professional appraisals for selling, buying, financing, or investment decisions. Accurate market valuations from experienced experts.',
    keywords: ['property valuation erbil', 'home appraisal erbil', 'property value erbil', 'real estate valuation iraq', 'house valuation kurdistan', 'property assessment erbil', 'free property valuation'],
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&fm=webp',
    icon: 'icon-award',
    shortDescription: 'Accurate, professional property valuations for selling, buying, financing, or investment decisions. Free initial consultations available.',
    fullDescription: `
      <p>Understanding your property's true market value is essential for making informed real estate decisions. Real House provides professional <strong>property valuation services in Erbil</strong> using comprehensive market analysis, industry-standard methodologies, and 23+ years of local expertise to deliver accurate, reliable valuations you can trust.</p>

      <h2>Why Property Valuation Matters</h2>
      <p>Accurate <strong>property valuation in Erbil</strong> is crucial for multiple scenarios:</p>
      <ul>
        <li><strong>Selling:</strong> Set the right asking price to attract buyers quickly and maximize your return - avoid overpricing that leads to stale listings or underpricing that leaves money on the table</li>
        <li><strong>Buying:</strong> Verify you're paying fair market value for a property and identify negotiation leverage</li>
        <li><strong>Financing:</strong> Support mortgage applications with professional appraisals that banks trust</li>
        <li><strong>Insurance:</strong> Ensure adequate coverage based on accurate replacement values</li>
        <li><strong>Investment Analysis:</strong> Calculate realistic ROI projections and portfolio performance</li>
        <li><strong>Legal Matters:</strong> Documentation for inheritance, divorce settlements, or property disputes</li>
        <li><strong>Tax Planning:</strong> Accurate values for capital gains calculations and tax obligations</li>
      </ul>

      <h2>Our Professional Valuation Process</h2>
      <p>Every Real House property valuation follows a rigorous, transparent methodology that combines multiple approaches for maximum accuracy:</p>

      <h3>1. Property Inspection</h3>
      <p>Our experienced valuers conduct thorough on-site inspections, documenting property condition, unique features, quality of finishes, any defects or required repairs, and factors affecting value positively or negatively. We take detailed photographs and measurements.</p>

      <h3>2. Comparative Market Analysis (CMA)</h3>
      <p>We analyze recent sales of comparable properties in the area, adjusting for differences in size, condition, location, amenities, and other value-affecting factors. This provides a market-based indication of fair value.</p>

      <h3>3. Income Approach (Investment Properties)</h3>
      <p>For rental properties, we calculate value based on potential income generation, considering current rental rates in the area, typical occupancy levels, operating expenses, and investor yield expectations.</p>

      <h3>4. Cost Approach (New/Unique Properties)</h3>
      <p>For new constructions or unique properties lacking direct comparables, we estimate replacement cost minus depreciation plus land value.</p>

      <h3>5. Comprehensive Report</h3>
      <p>You receive a detailed valuation report including full property description, methodology explanation, supporting market data, comparable sales analysis, and final value conclusion with confidence range. Reports are professionally formatted and suitable for bank submissions.</p>

      <h2>Types of Valuations We Provide</h2>
      <p>We provide professional valuations for all property types across Kurdistan:</p>
      <ul>
        <li>Residential properties: villas, apartments, townhouses, duplexes</li>
        <li>Commercial properties: offices, retail stores, warehouses, restaurants</li>
        <li>Land and development sites</li>
        <li>Mixed-use properties</li>
        <li>Portfolio valuations for multiple properties</li>
        <li>Off-plan properties (development value assessment)</li>
      </ul>

      <h2>Free Valuation for Sellers</h2>
      <p>If you're considering selling your property with Real House, we provide comprehensive market valuations completely free of charge. This includes on-site inspection, full market analysis, and written report - no obligation to list with us. It's our way of demonstrating the value we provide.</p>
    `,
    features: [
      {
        title: 'Expert Valuers',
        description: 'Experienced professionals with 20+ years and deep knowledge of the Erbil property market across all neighborhoods.',
        icon: 'icon-award'
      },
      {
        title: 'Comprehensive Analysis',
        description: 'Multiple valuation methods combined - comparative, income, and cost approaches for maximum accuracy.',
        icon: 'icon-area'
      },
      {
        title: 'Detailed Reports',
        description: 'Professional documentation with market data, comparable analysis, and clear methodology - suitable for banks.',
        icon: 'icon-check'
      },
      {
        title: 'Fast Turnaround',
        description: 'Standard valuations completed within 5-7 business days. Expedited options available for urgent requirements.',
        icon: 'icon-clock'
      }
    ],
    benefits: [
      'Accurate market value assessment you can trust',
      'Professional reports accepted by banks and institutions',
      'Multiple valuation methodologies for accuracy',
      'Experienced local valuers with market expertise',
      'Confidential and independent service',
      'Free valuation for sellers listing with us',
      'Fast turnaround with expedited options',
      'Clear, understandable reporting'
    ],
    process: [
      { step: 1, title: 'Inquiry & Briefing', description: 'Discuss your valuation needs, purpose, and timeline. We explain the process and provide a quote.', duration: 'Same day' },
      { step: 2, title: 'Documentation', description: 'Provide property documents including title deed, floor plans, and any relevant permits or certificates.', duration: '1-2 days' },
      { step: 3, title: 'Site Inspection', description: 'Our valuer inspects the property inside and out, documenting condition, features, and surroundings.', duration: '1-2 hours' },
      { step: 4, title: 'Market Research', description: 'Analysis of comparable sales, current listings, market conditions, and economic factors.', duration: '2-3 days' },
      { step: 5, title: 'Valuation Calculation', description: 'Application of appropriate valuation methodologies with adjustments for property-specific factors.', duration: '1-2 days' },
      { step: 6, title: 'Report Delivery', description: 'Comprehensive valuation report delivered with supporting data and clear conclusions.', duration: 'Day 5-7' }
    ],
    faqs: [
      {
        question: 'How much does a property valuation cost?',
        answer: 'Valuation fees depend on property type, size, and complexity. Standard residential valuations start from $150-200 USD. Commercial and complex valuations are quoted individually. Valuations are free for sellers planning to list with Real House. Contact us for a specific quote.'
      },
      {
        question: 'How long does a valuation take?',
        answer: 'Standard valuations are completed within 5-7 business days from inspection. Expedited 48-72 hour service is available for urgent requirements at an additional fee. We always confirm realistic timelines when you book.'
      },
      {
        question: 'Is your valuation accepted by banks?',
        answer: 'Yes, our valuation reports are professionally prepared according to industry standards and are accepted by major banks and financial institutions operating in Kurdistan for mortgage and financing purposes.'
      },
      {
        question: 'Can you value properties I\'m considering buying?',
        answer: 'Absolutely. Pre-purchase valuations help ensure you\'re paying fair market value and can strengthen your negotiating position. Knowing the true value before making an offer protects you from overpaying.'
      },
      {
        question: 'What factors affect property value in Erbil?',
        answer: 'Key factors include location (neighborhood, proximity to amenities), property size and layout, condition and quality of finishes, building age, security features, parking, views, and market conditions. We explain all relevant factors in your report.'
      },
      {
        question: 'How is your valuation different from online estimates?',
        answer: 'Online estimates use algorithms with limited data and cannot account for property-specific factors like condition, finishes, layout, and recent renovations. Our valuations involve physical inspection, local market expertise, and professional analysis for significantly greater accuracy.'
      }
    ],
    testimonials: [
      {
        quote: 'Needed a bank valuation for my mortgage application. Real House delivered a professional report within a week that the bank accepted immediately. Very thorough and well-documented.',
        name: 'Zana Ismail',
        role: 'Mortgage Applicant',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      },
      {
        quote: 'Their free valuation convinced me to sell - the price was higher than I expected! They knew exactly what my villa was worth in today\'s market. Professional service.',
        name: 'Layla Hassan',
        role: 'Villa Owner',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
      },
      {
        quote: 'Used Real House for pre-purchase valuation. Discovered the asking price was 10% above market value - saved me significant money in negotiations. Invaluable service.',
        name: 'Omar Rashid',
        role: 'Property Buyer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      }
    ],
    relatedServices: ['property-sales', 'property-buying', 'investment-consulting'],
    ctaTitle: 'Get Your Free Property Valuation',
    ctaDescription: 'Request a professional property valuation from Erbil\'s trusted real estate experts. Free for sellers, competitive rates for all other purposes.'
  },

  // ─── Investment Consulting Service ───────────────────────────────────────
  {
    id: 'investment-consulting',
    slug: 'investment-consulting',
    title: 'Investment Consulting Services',
    h1Title: 'Property Investment Consulting Erbil - Expert ROI Analysis & Advice',
    titleKu: 'ڕاوێژکاری وەبەرهێنانی خانووبەرە لە هەولێر',
    titleAr: 'استشارات الاستثمار العقاري أربيل',
    metaTitle: 'Investment Property Erbil | Real Estate Investment Kurdistan | Real House',
    metaDescription: 'Expert real estate investment consulting in Erbil. Discover high-ROI investment opportunities in Kurdistan with professional analysis, market insights, and portfolio guidance.',
    keywords: ['investment property erbil', 'real estate investment kurdistan', 'property investment iraq', 'roi property erbil', 'buy to let erbil', 'real estate investment consulting', 'property investment advice'],
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80&fm=webp',
    icon: 'icon-star',
    shortDescription: 'Strategic real estate investment advice for maximizing returns in Erbil\'s growing property market. Expert analysis, opportunity identification, and portfolio guidance.',
    fullDescription: `
      <p>Erbil's real estate market offers exceptional opportunities for investors seeking strong rental yields, capital appreciation, and portfolio diversification. Real House provides expert <strong>investment property consulting in Erbil</strong> to help you make informed decisions, identify the best opportunities, and build a profitable property portfolio in one of the Middle East's most stable markets.</p>

      <h2>Why Invest in Erbil Real Estate?</h2>
      <p>The Kurdistan Region has experienced significant economic growth and stability, driving sustained demand for quality housing and commercial spaces. Key factors making Erbil an attractive <strong>investment property</strong> destination include:</p>
      <ul>
        <li><strong>Growing economy:</strong> Kurdistan's GDP growth and infrastructure development create property demand</li>
        <li><strong>Political stability:</strong> The KRG offers one of the most stable environments in the region</li>
        <li><strong>Increasing foreign investment:</strong> International companies establishing Kurdistan operations</li>
        <li><strong>Growing expat population:</strong> Professionals seeking quality accommodation</li>
        <li><strong>Competitive prices:</strong> Lower entry points compared to Dubai, Riyadh, or other regional markets</li>
        <li><strong>Strong rental demand:</strong> High occupancy rates in desirable locations</li>
        <li><strong>Foreign ownership rights:</strong> Non-Iraqis can buy property in Kurdistan</li>
        <li><strong>Tax advantages:</strong> Favorable property taxation compared to many markets</li>
      </ul>

      <h2>Our Investment Consulting Services</h2>
      <p>Our investment advisory team provides comprehensive guidance for both first-time property investors and experienced portfolio builders looking to expand into Kurdistan:</p>

      <h3>Market Intelligence & Analysis</h3>
      <p>We provide detailed, data-driven insights into Erbil's property market, including price trends by neighborhood, rental yield analysis by property type, development pipeline assessment, demographic trends, and economic indicators affecting real estate values. Our research gives you the knowledge to make confident investment decisions.</p>

      <h3>Investment Strategy Development</h3>
      <p>Whether you're seeking capital appreciation, rental income, or a balanced approach, we help develop a personalized investment strategy aligned with your goals, risk tolerance, investment timeline, and available capital. We consider your tax situation, currency exposure, and exit requirements.</p>

      <h3>Opportunity Identification</h3>
      <p>Using our market knowledge, extensive network, and early access to developments, we identify investment opportunities before they reach the general market. This includes off-plan projects at launch pricing, undervalued properties, distressed sales, and exclusive opportunities from our developer relationships.</p>

      <h3>Financial Analysis & Due Diligence</h3>
      <p>Every investment opportunity is thoroughly analyzed for projected ROI, cash flow modeling, capital requirements, financing options, and exit strategies. We provide clear financial projections with sensitivity analysis to support your decision-making.</p>

      <h2>Investment Property Types</h2>
      <p>We specialize in various investment categories with proven track records:</p>
      <ul>
        <li><strong>Buy-to-Let Apartments:</strong> Steady rental income from residential tenants - yields of 6-10%</li>
        <li><strong>Off-Plan Projects:</strong> Capital appreciation during construction phase - potential 15-30% gains</li>
        <li><strong>Commercial Properties:</strong> Higher yields from retail and office spaces - 8-12% returns</li>
        <li><strong>Furnished Short-Term Rentals:</strong> Premium returns from executive and corporate lets</li>
        <li><strong>Land Investment:</strong> Long-term appreciation in developing areas</li>
        <li><strong>Development Partnerships:</strong> Higher returns through joint ventures with developers</li>
      </ul>

      <h2>Portfolio Management Support</h2>
      <p>For existing investors, we provide ongoing portfolio review services including performance analysis, rebalancing recommendations, exit timing advice, and reinvestment strategies. Our goal is to help you continuously optimize your Kurdistan property portfolio.</p>
    `,
    features: [
      {
        title: 'Market Intelligence',
        description: 'In-depth market analysis, trend forecasting, and data-driven insights for informed investment decisions.',
        icon: 'icon-star'
      },
      {
        title: 'ROI Analysis',
        description: 'Detailed financial projections including rental yields, capital growth potential, and cash flow modeling.',
        icon: 'icon-area'
      },
      {
        title: 'Portfolio Strategy',
        description: 'Personalized investment strategies aligned with your goals, risk profile, and financial situation.',
        icon: 'icon-award'
      },
      {
        title: 'Exclusive Access',
        description: 'Early access to off-market deals, pre-launch developments, and exclusive investment opportunities.',
        icon: 'icon-shield'
      }
    ],
    benefits: [
      'Expert market insights from 23+ years experience',
      'Access to exclusive off-market opportunities',
      'Detailed ROI projections and financial modeling',
      'Portfolio diversification guidance',
      'Ongoing investment performance monitoring',
      'Exit strategy planning and timing advice',
      'Developer relationship access',
      'Risk assessment and mitigation strategies'
    ],
    process: [
      { step: 1, title: 'Investment Consultation', description: 'Understanding your investment goals, available capital, risk tolerance, and timeline.', duration: '1-2 hours' },
      { step: 2, title: 'Market Briefing', description: 'Comprehensive briefing on Erbil market conditions, trends, and current opportunities.', duration: '1-2 hours' },
      { step: 3, title: 'Strategy Development', description: 'Creating a tailored investment strategy document aligned with your objectives.', duration: '3-5 days' },
      { step: 4, title: 'Opportunity Identification', description: 'Sourcing specific investment properties that match your criteria and strategy.', duration: 'Ongoing' },
      { step: 5, title: 'Financial Due Diligence', description: 'Detailed analysis of each opportunity including ROI projections and risk assessment.', duration: 'Per property' },
      { step: 6, title: 'Acquisition & Beyond', description: 'Complete support through purchase and optional ongoing property management.', duration: 'As needed' }
    ],
    faqs: [
      {
        question: 'What returns can I expect from Erbil property investment?',
        answer: 'Rental yields in Erbil typically range from 6-10% depending on property type, location, and management. Capital appreciation varies but has historically been 5-15% annually in premium areas. Off-plan investments can achieve 15-30% gains between purchase and completion. We provide realistic projections based on current market data.'
      },
      {
        question: 'Is Erbil real estate a safe investment?',
        answer: 'The Kurdistan Region offers relative political and economic stability compared to other parts of Iraq. Erbil has not experienced the security challenges affecting other Iraqi cities. We advise on risk factors and help identify properties in the most stable, high-demand areas with strong fundamentals.'
      },
      {
        question: 'Can I invest remotely from abroad?',
        answer: 'Yes, many of our investment clients are based internationally in Europe, America, and Gulf countries. We handle all aspects locally including property identification, due diligence, acquisition, and ongoing management. You can build a profitable Kurdistan portfolio without visiting.'
      },
      {
        question: 'What is the minimum investment amount?',
        answer: 'Investment opportunities start from around $75,000 for apartments in good locations. Villas typically require $150,000+, while commercial properties and development opportunities vary widely. We can advise on options within your budget and discuss financing possibilities.'
      },
      {
        question: 'Should I invest in ready or off-plan properties?',
        answer: 'Both have advantages. Ready properties generate immediate rental income with lower risk. Off-plan offers lower entry prices and capital appreciation potential but with construction risk and delayed income. The right choice depends on your goals, timeline, and risk tolerance. We help you decide.'
      },
      {
        question: 'How do I manage my investment property from abroad?',
        answer: 'Our property management service handles everything: tenant finding, rent collection, maintenance, and reporting. You receive monthly statements and rent transfers to your international bank account. Many overseas investors use our full-service management for hassle-free passive income.'
      }
    ],
    testimonials: [
      {
        quote: 'Real House identified an off-plan opportunity that appreciated 25% by completion. Their market knowledge and developer relationships gave me access to pricing others didn\'t get.',
        name: 'Mohammed Al-Rashid',
        role: 'Investment Client, Dubai',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      },
      {
        quote: 'As a first-time property investor, I needed guidance. Real House developed a clear strategy, found suitable properties, and now manages my two apartments. Returns are exceeding projections.',
        name: 'Haval Mahmoud',
        role: 'First-Time Investor',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      },
      {
        quote: 'Their quarterly portfolio reviews helped me optimize my holdings - sold one underperformer and reinvested in a better opportunity. True investment partners, not just agents.',
        name: 'Renas Ali',
        role: 'Portfolio Investor',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      }
    ],
    relatedServices: ['property-buying', 'property-management', 'property-valuation'],
    ctaTitle: 'Explore Investment Opportunities',
    ctaDescription: 'Schedule a consultation to discover how Erbil real estate can grow your wealth. Expert guidance for first-time and experienced investors alike.'
  },

  // ─── Legal Assistance Service ────────────────────────────────────────────
  {
    id: 'legal-assistance',
    slug: 'legal-assistance',
    title: 'Legal Assistance Services',
    h1Title: 'Property Legal Services Erbil - Real Estate Legal Assistance',
    titleKu: 'خزمەتگوزاری یاسایی موڵک لە هەولێر',
    titleAr: 'خدمات قانونية عقارية أربيل',
    metaTitle: 'Property Legal Services Erbil | Real Estate Lawyer Kurdistan | Real House',
    metaDescription: 'Property legal assistance in Erbil. Title deed verification, contract review, foreign buyer guidance, and complete documentation support. Protect your investment with expert legal guidance.',
    keywords: ['property legal services erbil', 'real estate lawyer kurdistan', 'property lawyer erbil', 'title deed verification', 'property contract review', 'foreign buyer legal erbil', 'real estate legal assistance'],
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80&fm=webp',
    icon: 'icon-shield',
    shortDescription: 'Comprehensive legal assistance for property transactions in Erbil. Title verification, contract review, foreign buyer support, and complete documentation guidance.',
    fullDescription: `
      <p>Navigating property legalities in a foreign market can be challenging and risky without proper guidance. Real House provides comprehensive <strong>property legal assistance in Erbil</strong> to protect your interests, ensure transaction security, and give you peace of mind throughout your property journey. Working with our network of experienced property lawyers, we handle all legal aspects of your transaction.</p>

      <h2>Why Legal Assistance Matters in Property Transactions</h2>
      <p>Property transactions involve significant financial commitments and complex legal processes. Proper legal guidance helps you:</p>
      <ul>
        <li><strong>Verify ownership:</strong> Confirm the seller has clear title and legal right to sell</li>
        <li><strong>Identify encumbrances:</strong> Discover any mortgages, liens, or claims against the property</li>
        <li><strong>Understand your rights:</strong> Know your legal protections as a buyer or seller</li>
        <li><strong>Ensure compliance:</strong> Meet all regulatory requirements for legal transfer</li>
        <li><strong>Protect your investment:</strong> Avoid costly legal disputes and complications</li>
        <li><strong>Navigate foreign ownership:</strong> Understand rules for non-Iraqi property ownership</li>
      </ul>

      <h2>Our Legal Assistance Services</h2>
      <p>We provide comprehensive legal support for all property transactions:</p>

      <h3>Title Deed Verification</h3>
      <p>Our legal team conducts thorough due diligence on property ownership, verifying the title deed (Tabu) at the relevant land registry office. We confirm seller identity, ownership history, property boundaries, and any registered claims or encumbrances. This critical step protects you from purchasing disputed or encumbered property.</p>

      <h3>Contract Review & Preparation</h3>
      <p>All contracts and agreements are prepared or reviewed by qualified property lawyers to ensure your interests are protected. This includes sale and purchase agreements, preliminary contracts, payment schedules, and any special conditions. We explain all terms clearly before you sign anything.</p>

      <h3>Foreign Buyer Guidance</h3>
      <p>Non-Iraqi nationals can purchase property in the Kurdistan Region, but there are specific procedures to follow. We guide foreign buyers through:</p>
      <ul>
        <li>Eligibility requirements and documentation needed</li>
        <li>Power of attorney arrangements for remote buyers</li>
        <li>Currency transfer and payment procedures</li>
        <li>Registration requirements with relevant authorities</li>
        <li>Residency implications of property ownership</li>
      </ul>

      <h3>Documentation Support</h3>
      <p>We assist with preparing and obtaining all necessary documentation including:</p>
      <ul>
        <li>Sale and purchase agreements</li>
        <li>Power of attorney documents</li>
        <li>Property transfer applications</li>
        <li>Tax clearance certificates</li>
        <li>Municipality approvals</li>
        <li>Utility transfer documents</li>
      </ul>

      <h3>Dispute Resolution</h3>
      <p>In the event of property disputes, boundary disagreements, or contract issues, our legal network provides representation and resolution services. Prevention is better than cure - our thorough due diligence minimizes dispute risk from the start.</p>

      <h2>Property Registration Process</h2>
      <p>Proper property registration with the land registry office (Tabu) is essential for legal ownership transfer. We manage this process including:</p>
      <ul>
        <li>Preparing registration applications</li>
        <li>Coordinating with land registry offices</li>
        <li>Calculating and paying transfer taxes</li>
        <li>Obtaining updated title deeds in buyer's name</li>
        <li>Verifying completed registration</li>
      </ul>

      <h2>Legal Support for All Transaction Types</h2>
      <p>Our legal assistance covers all property transaction types:</p>
      <ul>
        <li>Residential purchases and sales</li>
        <li>Commercial property transactions</li>
        <li>Off-plan purchases from developers</li>
        <li>Land acquisition</li>
        <li>Property inheritance and succession</li>
        <li>Partnership and investment structures</li>
      </ul>
    `,
    features: [
      {
        title: 'Title Verification',
        description: 'Thorough due diligence confirming clear ownership, boundaries, and absence of claims or encumbrances.',
        icon: 'icon-shield'
      },
      {
        title: 'Contract Review',
        description: 'Qualified lawyers reviewing all agreements to protect your interests before you sign anything.',
        icon: 'icon-check'
      },
      {
        title: 'Foreign Buyer Support',
        description: 'Specialized guidance for non-Iraqi nationals navigating Kurdistan property ownership requirements.',
        icon: 'icon-area'
      },
      {
        title: 'Registration Assistance',
        description: 'Complete support through the property registration process with land registry authorities.',
        icon: 'icon-award'
      }
    ],
    benefits: [
      'Protection against title disputes and fraud',
      'Contracts reviewed by qualified property lawyers',
      'Foreign buyer legal guidance included',
      'Complete documentation preparation',
      'Land registry registration support',
      'Power of attorney arrangements for remote buyers',
      'Clear explanation of legal processes',
      'Ongoing legal support after purchase'
    ],
    process: [
      { step: 1, title: 'Initial Consultation', description: 'Understanding your transaction type, timeline, and any specific legal concerns or requirements.', duration: '1 hour' },
      { step: 2, title: 'Document Collection', description: 'Gathering property documents, owner information, and any existing agreements for review.', duration: '1-3 days' },
      { step: 3, title: 'Title Search & Verification', description: 'Conducting official searches at land registry and verifying ownership, boundaries, and encumbrances.', duration: '3-5 days' },
      { step: 4, title: 'Contract Preparation/Review', description: 'Drafting or reviewing all transaction agreements to ensure your interests are protected.', duration: '2-3 days' },
      { step: 5, title: 'Transaction Support', description: 'Attending key meetings, explaining documents, and coordinating with all parties.', duration: 'As needed' },
      { step: 6, title: 'Registration & Completion', description: 'Managing the property registration process and ensuring legal transfer is complete.', duration: '1-2 weeks' }
    ],
    faqs: [
      {
        question: 'Can foreigners legally buy property in Erbil?',
        answer: 'Yes, foreign nationals can purchase property in the Kurdistan Region of Iraq. The KRG has established clear procedures for foreign ownership. Our legal team guides you through all requirements including documentation, registration, and any residency implications.'
      },
      {
        question: 'What is a Tabu and why is it important?',
        answer: 'The Tabu is the official property title deed registered with the land registry office. It proves legal ownership and includes property details, boundaries, and ownership history. Verifying the Tabu is essential before any purchase to confirm clear title and avoid disputes.'
      },
      {
        question: 'Do I need to be present for property transactions?',
        answer: 'Not necessarily. If you cannot be present, you can grant power of attorney to a representative (often our team or your lawyer) to act on your behalf for viewing, signing documents, and completing registration. We arrange notarized power of attorney documents.'
      },
      {
        question: 'What are the typical legal costs for property transactions?',
        answer: 'Legal costs vary by transaction complexity but typically include title search fees, contract preparation, registration taxes (usually 3-5% of property value), and legal representation fees. We provide clear cost breakdowns before you proceed.'
      },
      {
        question: 'How long does property registration take?',
        answer: 'Standard registration typically takes 1-2 weeks after all documents are prepared and submitted. Complex cases or properties with unclear histories may take longer. We manage the process and keep you informed of progress.'
      },
      {
        question: 'What if there\'s a dispute after purchase?',
        answer: 'Our thorough due diligence minimizes dispute risk, but if issues arise, our legal network provides representation and resolution services. Many disputes can be resolved through negotiation; court proceedings are a last resort.'
      }
    ],
    testimonials: [
      {
        quote: 'As a foreign buyer from Sweden, the legal requirements seemed overwhelming. Real House\'s legal team made it straightforward, handling everything from title verification to registration. Now I own property in Erbil with complete confidence.',
        name: 'Erik Andersson',
        role: 'Foreign Buyer, Sweden',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      },
      {
        quote: 'Their legal review found an unregistered claim on a property I almost bought. Could have been a disaster. Worth every penny for the peace of mind their due diligence provides.',
        name: 'Darin Salih',
        role: 'Property Buyer',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      },
      {
        quote: 'Handled my inheritance property transfer smoothly. Complex situation with multiple heirs, but their legal team navigated it professionally. Now everything is properly registered in my name.',
        name: 'Nazanin Hussein',
        role: 'Property Inheritor',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      }
    ],
    relatedServices: ['property-buying', 'property-sales', 'investment-consulting'],
    ctaTitle: 'Protect Your Property Investment',
    ctaDescription: 'Get expert legal guidance for your property transaction. Contact us for a consultation and ensure your investment is fully protected.'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════════════

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id);
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedServices
    .map(id => getServiceById(id))
    .filter((s): s is Service => s !== undefined);
}

export function getAllServiceSlugs(): string[] {
  return services.map(s => s.slug);
}

export function getAllServices(): Service[] {
  return services;
}
