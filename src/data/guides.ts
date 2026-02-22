// =============================================================================
// Comprehensive Guide Content for Real House
// SEO-Optimized Informational Content for Property Buyers, Investors, Renters
// =============================================================================

// --- Guide Types ---
export interface GuideSection {
  id: string;
  title: string;
  content: string;
  tips?: string[];
  warnings?: string[];
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  introduction: string;
  lastUpdated: string;
  readTime: number;
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  relatedGuides: string[];
  ctaTitle: string;
  ctaText: string;
  keywords: string[];
}

// =============================================================================
// BUYER'S GUIDE
// =============================================================================
export const buyersGuide: Guide = {
  id: 'buying-property-erbil',
  slug: 'buying-property-erbil',
  title: "Complete Buyer's Guide to Property in Erbil",
  metaTitle: "Buyer's Guide Erbil 2025 | How to Buy Property Kurdistan",
  metaDescription: 'Step-by-step guide to buying property in Erbil, Kurdistan. Legal requirements, documentation, financing options & tips for first-time buyers. Expert advice from Real House.',
  heroImage: '/images/guides/buyers-guide-hero.jpg',
  introduction: 'Buying property in Erbil, Kurdistan can be a straightforward and rewarding experience when you understand the process. This comprehensive guide walks you through every step, from initial research to receiving your keys. Whether you are a first-time buyer, returning Iraqi, or international investor, Real House is here to help you navigate the Erbil real estate market with confidence.',
  lastUpdated: '2025-02-22',
  readTime: 12,
  sections: [
    {
      id: 'step-1-preparation',
      title: 'Step 1: Preparation & Research',
      content: `<p>Before you start viewing properties, take time to prepare. Define your budget, preferred locations, and must-have features. Research current market prices in areas like Dream City, Gulan, Italian Village, and Ankawa to understand what you can afford.</p>
<p><strong>Budget Considerations:</strong></p>
<ul>
<li>Property purchase price</li>
<li>Registration fees (3-5% of property value)</li>
<li>Legal fees (1-2%)</li>
<li>Moving and furnishing costs</li>
<li>Reserve fund for repairs/renovations</li>
</ul>
<p><strong>Location Factors:</strong></p>
<ul>
<li>Proximity to schools and workplaces</li>
<li>Security and gated community options</li>
<li>Access to shopping and healthcare</li>
<li>Future development plans in the area</li>
</ul>`,
      tips: [
        'Create a realistic budget including all associated costs (add 8-12% to purchase price)',
        'Research neighborhoods online before visiting in person',
        'Make a list of non-negotiable features vs. nice-to-haves'
      ]
    },
    {
      id: 'step-2-find-agent',
      title: 'Step 2: Choose a Licensed Real Estate Agent',
      content: `<p>Working with a professional real estate agent is highly recommended in Erbil. A good agent provides market expertise, access to more properties, negotiation skills, and guidance through the legal process.</p>
<p><strong>What to Look for in an Agent:</strong></p>
<ul>
<li>Licensed and experienced in Kurdistan market</li>
<li>Good communication in your preferred language</li>
<li>Knowledge of your target neighborhoods</li>
<li>Transparent about fees and process</li>
<li>Positive reviews and references</li>
</ul>
<p>Real House has served buyers in Erbil for over 23 years with a team of expert agents who specialize in luxury properties and international clients.</p>`,
      tips: [
        'Buyer agent services are typically free - agents earn commission from sellers',
        'Ask for references from previous clients',
        'Choose an agent who listens to your needs, not just pushes listings'
      ]
    },
    {
      id: 'step-3-property-search',
      title: 'Step 3: Property Search & Viewings',
      content: `<p>Once you have an agent, they will present properties matching your criteria. Schedule viewings at different times of day to assess natural light, noise levels, and neighborhood activity.</p>
<p><strong>During Property Viewings, Check:</strong></p>
<ul>
<li>Structural condition (walls, floors, ceilings)</li>
<li>Plumbing and water pressure</li>
<li>Electrical systems and outlets</li>
<li>Windows, doors, and security features</li>
<li>HVAC and heating/cooling systems</li>
<li>Natural light and ventilation</li>
<li>Storage space and room layouts</li>
<li>Parking and outdoor areas</li>
</ul>`,
      tips: [
        'Visit properties at least twice before making a decision',
        'Take photos and videos during viewings for later comparison',
        'Ask about utility costs and HOA/maintenance fees'
      ],
      warnings: [
        'Never transfer money before verifying property ownership',
        'Be cautious of deals that seem too good to be true'
      ]
    },
    {
      id: 'step-4-make-offer',
      title: 'Step 4: Making an Offer & Negotiation',
      content: `<p>When you find the right property, your agent will help you make a competitive offer. Negotiation is common and expected in Erbil real estate.</p>
<p><strong>Negotiation Tips:</strong></p>
<ul>
<li>Typical negotiation room is 5-15% of asking price</li>
<li>Cash buyers often get better terms</li>
<li>Longer time on market = more negotiable</li>
<li>Request repairs or furniture inclusion</li>
<li>Consider payment timeline flexibility</li>
</ul>
<p>Your agent will communicate with the seller and reach an agreement on price, payment terms, and included items.</p>`,
      tips: [
        'Know the recent sales prices of comparable properties',
        'Be prepared to walk away if terms are not right',
        'Get all agreements in writing before proceeding'
      ]
    },
    {
      id: 'step-5-due-diligence',
      title: 'Step 5: Due Diligence & Legal Verification',
      content: `<p>This is the most critical step. Before signing any contract, conduct thorough due diligence to protect your investment.</p>
<p><strong>Essential Checks:</strong></p>
<ul>
<li><strong>Title Deed (Tabu/Sanad) Verification:</strong> Confirm at the Real Estate Registration Department that the seller is the legal owner</li>
<li><strong>Encumbrance Check:</strong> Ensure no mortgages, liens, or legal disputes</li>
<li><strong>Building Permits:</strong> Verify construction was legally permitted</li>
<li><strong>Survey:</strong> Confirm boundaries and measurements match documents</li>
<li><strong>Utility Status:</strong> Check for outstanding bills or connection issues</li>
<li><strong>HOA Rules:</strong> Understand compound regulations if applicable</li>
</ul>
<p>We strongly recommend hiring a property lawyer to conduct these checks and review all documentation.</p>`,
      warnings: [
        'Never skip due diligence - even for properties from trusted sources',
        'Verify all documents are originals, not copies',
        'Check that the person selling has the legal right to do so'
      ]
    },
    {
      id: 'step-6-contracts',
      title: 'Step 6: Contract Signing & Payment',
      content: `<p>Once due diligence is complete, you will sign the purchase agreement and arrange payment.</p>
<p><strong>Contract Elements:</strong></p>
<ul>
<li>Full names and identification of buyer and seller</li>
<li>Complete property description and address</li>
<li>Agreed purchase price and payment schedule</li>
<li>Deposit amount and conditions</li>
<li>Completion date and handover terms</li>
<li>What is included (furniture, fixtures, appliances)</li>
<li>Penalty clauses for breach</li>
</ul>
<p><strong>Payment Methods:</strong></p>
<ul>
<li>Cash payment with negotiated terms</li>
<li>Bank transfer (local or international)</li>
<li>Installment plans for new developments</li>
<li>Escrow services for added security</li>
</ul>`,
      tips: [
        'Have a lawyer review the contract before signing',
        'Use secure payment methods with documentation',
        'Keep copies of all signed documents'
      ]
    },
    {
      id: 'step-7-registration',
      title: 'Step 7: Property Registration & Transfer',
      content: `<p>The final step is registering the property in your name at the Real Estate Registration Department (Tabu office).</p>
<p><strong>Registration Process:</strong></p>
<ol>
<li>Both parties attend Tabu office (or via power of attorney)</li>
<li>Submit signed contract and required documents</li>
<li>Pay registration fees (typically 3-5% of value)</li>
<li>Tabu office verifies and processes transfer</li>
<li>New title deed (Sanad) issued in buyer name</li>
</ol>
<p>This process typically takes 1-2 weeks. Your agent or lawyer can handle the paperwork on your behalf.</p>`,
      tips: [
        'Bring original passport/ID and all required documents',
        'Registration fees are usually split between buyer and seller',
        'Get a certified copy of your new title deed'
      ]
    },
    {
      id: 'documents-required',
      title: 'Required Documents for Buyers',
      content: `<p>Prepare these documents before starting your property purchase:</p>
<p><strong>For Iraqi Citizens:</strong></p>
<ul>
<li>Valid Iraqi national ID card (original and copies)</li>
<li>Civil Status Identity Card</li>
<li>Recent photographs (passport size)</li>
<li>Proof of funds or income</li>
</ul>
<p><strong>For Foreign Buyers:</strong></p>
<ul>
<li>Valid passport (minimum 6 months validity)</li>
<li>Entry visa or residence permit</li>
<li>Recent photographs</li>
<li>Proof of funds (bank statements)</li>
<li>Power of attorney (if purchasing remotely)</li>
<li>Tax identification number (can be obtained locally)</li>
</ul>`
    },
    {
      id: 'foreign-buyers',
      title: 'Guide for Foreign Buyers',
      content: `<p>Good news: foreign nationals can legally purchase property in the Kurdistan Region of Iraq. The Kurdistan Regional Government (KRG) welcomes foreign investment and has clear regulations for property ownership.</p>
<p><strong>Key Points for International Buyers:</strong></p>
<ul>
<li>No restrictions on residential property purchases</li>
<li>Some limitations near military zones and borders</li>
<li>Process is similar to local buyers with additional documentation</li>
<li>Remote purchases possible via power of attorney</li>
<li>Property ownership can support residency applications</li>
</ul>
<p>Real House specializes in assisting international buyers with translation, legal guidance, and remote purchase arrangements.</p>`
    },
    {
      id: 'financing-options',
      title: 'Financing & Payment Options',
      content: `<p>Understanding your financing options helps you plan your purchase effectively.</p>
<p><strong>Available Options:</strong></p>
<ul>
<li><strong>Cash Purchase:</strong> Most common method, often with negotiation leverage</li>
<li><strong>Developer Payment Plans:</strong> 10-40% down, balance over 2-5 years (0% interest common)</li>
<li><strong>Bank Financing:</strong> Limited but available for qualified residents</li>
<li><strong>International Financing:</strong> Some international banks offer cross-border mortgages</li>
</ul>
<p><strong>Typical Payment Plan Structure:</strong></p>
<ul>
<li>Down payment: 10-40% at signing</li>
<li>During construction: Monthly/quarterly installments</li>
<li>Handover: Final balance (10-30%)</li>
</ul>`
    }
  ],
  faqs: [
    {
      question: 'Can foreigners buy property in Erbil?',
      answer: 'Yes, foreign nationals can legally purchase property in the Kurdistan Region. The process is straightforward with proper documentation including passport, visa/residence permit, and proof of funds.'
    },
    {
      question: 'How much deposit is needed?',
      answer: 'For cash purchases, terms are negotiable. For new developments with payment plans, typically 10-40% deposit is required upfront.'
    },
    {
      question: 'What are the total costs beyond purchase price?',
      answer: 'Budget an additional 8-12% for registration fees (3-5%), legal fees (1-2%), and other costs like moving and furnishing.'
    },
    {
      question: 'How long does the buying process take?',
      answer: 'Ready properties with clear titles typically complete in 2-4 weeks. Off-plan purchases require initial agreement quickly, with handover upon construction completion.'
    },
    {
      question: 'Do I need a lawyer?',
      answer: 'While not legally required, we strongly recommend hiring a property lawyer for due diligence, contract review, and registration assistance. Costs are typically 1-2% of property value.'
    }
  ],
  relatedGuides: ['real-estate-investment-erbil', 'renting-in-erbil'],
  ctaTitle: 'Ready to Start Your Property Search?',
  ctaText: 'Contact Real House today for a free consultation. Our expert agents will help you find the perfect property in Erbil.',
  keywords: ['buy property erbil', 'buying guide erbil', 'how to buy house kurdistan', 'foreign buyers erbil', 'property purchase process iraq']
};

// =============================================================================
// INVESTOR'S GUIDE
// =============================================================================
export const investorsGuide: Guide = {
  id: 'real-estate-investment-erbil',
  slug: 'real-estate-investment-erbil',
  title: "Complete Investor's Guide to Erbil Real Estate",
  metaTitle: "Investment Guide Erbil 2025 | Real Estate ROI Kurdistan",
  metaDescription: 'Expert guide to real estate investment in Erbil, Kurdistan. ROI expectations, best areas, property types & market analysis. Maximize returns with Real House.',
  heroImage: '/images/guides/investors-guide-hero.jpg',
  introduction: 'Erbil, the capital of Iraqi Kurdistan, offers compelling real estate investment opportunities. With political stability, growing economy, and attractive rental yields, the city has become a destination for regional and international investors. This guide provides the insights you need to make informed investment decisions in the Kurdistan property market.',
  lastUpdated: '2025-02-22',
  readTime: 15,
  sections: [
    {
      id: 'why-invest-erbil',
      title: 'Why Invest in Erbil Real Estate?',
      content: `<p>Erbil stands out as the premier investment destination in Iraq for several compelling reasons:</p>
<p><strong>Political Stability:</strong> The Kurdistan Region has maintained stability and security, with 40+ foreign consulates and major international companies operating in Erbil.</p>
<p><strong>Economic Growth:</strong> Oil revenues, diversification efforts, and infrastructure investment are driving economic expansion.</p>
<p><strong>Strong Rental Demand:</strong> A large expatriate community, diplomatic presence, and corporate tenants create consistent rental demand.</p>
<p><strong>Competitive Prices:</strong> Entry prices are lower than comparable regional markets like Dubai or Riyadh, with higher yield potential.</p>
<p><strong>Foreign-Friendly:</strong> Clear legal framework allows foreign property ownership with full rights.</p>
<p><strong>Infrastructure Development:</strong> Major projects including new highways, international airport expansion, and commercial developments are enhancing property values.</p>`
    },
    {
      id: 'roi-expectations',
      title: 'ROI & Rental Yield Expectations',
      content: `<p>Erbil real estate offers attractive returns compared to many regional markets:</p>
<p><strong>Rental Yields (Annual):</strong></p>
<ul>
<li>Residential properties: 6-10%</li>
<li>Commercial properties: 8-14%</li>
<li>Furnished short-term rentals: 10-15% (with good occupancy)</li>
</ul>
<p><strong>Capital Appreciation:</strong></p>
<ul>
<li>Premium areas: 5-15% annual appreciation</li>
<li>Emerging areas: 10-20% potential over 3-5 years</li>
<li>Off-plan appreciation: 10-30% from purchase to completion</li>
</ul>
<p><strong>Factors Affecting Returns:</strong></p>
<ul>
<li>Location quality and desirability</li>
<li>Property condition and amenities</li>
<li>Professional management efficiency</li>
<li>Market conditions and economic factors</li>
<li>Tenant quality and occupancy rates</li>
</ul>`,
      tips: [
        'Premium locations like Dream City and Gulan consistently outperform',
        'Furnished properties targeting expats achieve higher yields',
        'Factor in vacancy periods and management costs when calculating returns'
      ]
    },
    {
      id: 'best-areas-investment',
      title: 'Best Areas for Property Investment',
      content: `<p>Location is the primary driver of investment success. Here are the top areas for investors:</p>
<p><strong>Dream City</strong></p>
<ul>
<li>Premium gated community with international schools</li>
<li>Strong expat rental demand</li>
<li>Yields: 6-8% | Appreciation: High</li>
<li>Best for: Family housing, long-term rentals</li>
</ul>
<p><strong>Gulan District</strong></p>
<ul>
<li>Central business location with modern towers</li>
<li>Corporate tenant demand</li>
<li>Yields: 7-10% | Appreciation: High</li>
<li>Best for: Professional tenants, commercial investment</li>
</ul>
<p><strong>Empire World</strong></p>
<ul>
<li>Massive mixed-use development</li>
<li>Off-plan opportunities with payment plans</li>
<li>Yields: TBD | Appreciation: Very High potential</li>
<li>Best for: Long-term capital growth</li>
</ul>
<p><strong>Italian Village</strong></p>
<ul>
<li>Mediterranean-style family community</li>
<li>Lower entry prices, stable demand</li>
<li>Yields: 6-8% | Appreciation: Moderate</li>
<li>Best for: Family tenants, value investing</li>
</ul>
<p><strong>Ankawa</strong></p>
<ul>
<li>Vibrant neighborhood with restaurants and nightlife</li>
<li>Young professional tenant base</li>
<li>Yields: 7-9% | Appreciation: Moderate</li>
<li>Best for: Smaller units, short-term rentals</li>
</ul>`
    },
    {
      id: 'investment-property-types',
      title: 'Types of Investment Properties',
      content: `<p>Choose the right property type based on your investment goals:</p>
<p><strong>Residential Properties</strong></p>
<ul>
<li><strong>Apartments (2-3 bedrooms):</strong> Highest demand, easiest to manage, 6-10% yields</li>
<li><strong>Villas:</strong> Premium rents, family tenants, longer lease terms</li>
<li><strong>Furnished units:</strong> Higher yields but more management required</li>
<li><strong>Off-plan apartments:</strong> Lower entry price, capital appreciation focus</li>
</ul>
<p><strong>Commercial Properties</strong></p>
<ul>
<li><strong>Retail spaces:</strong> 8-12% yields, location critical</li>
<li><strong>Office spaces:</strong> Growing demand, 8-14% yields</li>
<li><strong>Mixed-use developments:</strong> Diversified income streams</li>
</ul>
<p><strong>Land</strong></p>
<ul>
<li>Pure appreciation play</li>
<li>Development potential</li>
<li>Lower ongoing costs</li>
</ul>`,
      tips: [
        '2-3 bedroom apartments offer the best balance of demand and yield',
        'Commercial properties require more expertise but deliver higher returns',
        'Off-plan offers the best entry pricing with developer payment plans'
      ]
    },
    {
      id: 'investment-strategies',
      title: 'Investment Strategies',
      content: `<p>Choose a strategy aligned with your goals, capital, and involvement level:</p>
<p><strong>Buy & Hold (Long-term Rental)</strong></p>
<ul>
<li>Purchase quality property in established area</li>
<li>Lease to long-term tenants (12+ months)</li>
<li>Benefit from rental income + appreciation</li>
<li>Best for: Passive income seekers, 5+ year horizon</li>
</ul>
<p><strong>Value-Add</strong></p>
<ul>
<li>Purchase undervalued or dated property</li>
<li>Renovate and improve</li>
<li>Increase rental value or sell for profit</li>
<li>Best for: Hands-on investors, local presence</li>
</ul>
<p><strong>Off-Plan Investment</strong></p>
<ul>
<li>Purchase during construction at lower prices</li>
<li>Benefit from appreciation during build</li>
<li>Flexible payment plans reduce capital requirements</li>
<li>Best for: Capital growth, longer timeline</li>
</ul>
<p><strong>Short-Term Rental</strong></p>
<ul>
<li>Furnished units for business travelers</li>
<li>Higher yields (10-15%) but more management</li>
<li>Best in central locations (Gulan, Ankawa)</li>
<li>Best for: Active investors, local management</li>
</ul>`
    },
    {
      id: 'investment-risks',
      title: 'Understanding Investment Risks',
      content: `<p>Every investment carries risk. Understanding and mitigating these risks is essential:</p>
<p><strong>Market Risks:</strong></p>
<ul>
<li>Oil price dependency affecting economy</li>
<li>Regional political developments</li>
<li>Currency fluctuations (USD/IQD)</li>
<li>Supply/demand imbalances</li>
</ul>
<p><strong>Property-Specific Risks:</strong></p>
<ul>
<li>Vacancy periods</li>
<li>Maintenance and repair costs</li>
<li>Problem tenants</li>
<li>Development delays (off-plan)</li>
</ul>
<p><strong>Risk Mitigation Strategies:</strong></p>
<ul>
<li>Diversify across property types and locations</li>
<li>Work with established developers and agents</li>
<li>Maintain cash reserves for unexpected costs</li>
<li>Use professional property management</li>
<li>Conduct thorough due diligence</li>
<li>Focus on quality properties in prime locations</li>
</ul>`,
      warnings: [
        'Never invest money you cannot afford to lose',
        'Avoid overleveraging - maintain liquidity',
        'Be skeptical of guaranteed return promises'
      ]
    },
    {
      id: 'tax-legal-considerations',
      title: 'Tax & Legal Considerations',
      content: `<p>Kurdistan offers a favorable tax environment for property investors:</p>
<p><strong>Tax Situation:</strong></p>
<ul>
<li>No annual property tax on residential properties</li>
<li>Rental income tax: 5-10% depending on amount</li>
<li>Capital gains: Currently minimal</li>
<li>No inheritance tax</li>
</ul>
<p><strong>Legal Considerations:</strong></p>
<ul>
<li>Full foreign ownership rights in most areas</li>
<li>Some restrictions near military/border zones</li>
<li>Clear title registration system (Tabu)</li>
<li>Standard lease agreements enforceable in courts</li>
</ul>
<p>Tax laws can change. Consult with a local tax advisor for current regulations and planning strategies.</p>`
    },
    {
      id: 'property-management',
      title: 'Property Management Options',
      content: `<p>For investors not based in Erbil, professional property management is essential:</p>
<p><strong>Full-Service Management Includes:</strong></p>
<ul>
<li>Tenant finding and screening</li>
<li>Rent collection and accounting</li>
<li>Maintenance coordination</li>
<li>Regular property inspections</li>
<li>Legal compliance and lease management</li>
<li>Monthly reporting to owners</li>
</ul>
<p><strong>Management Fees:</strong></p>
<ul>
<li>Typical fees: 8-12% of rental income</li>
<li>Additional fees may apply for tenant placement</li>
<li>Maintenance costs are separate</li>
</ul>
<p>Real House offers comprehensive property management services for investors, enabling truly passive income from your Erbil investments.</p>`,
      tips: [
        'Choose managers with proven track records and references',
        'Request regular reporting and transparent accounting',
        'Visit your properties periodically if possible'
      ]
    }
  ],
  faqs: [
    {
      question: 'What is the minimum investment for Erbil property?',
      answer: 'You can start with apartments from $60,000-80,000 in developing areas. Premium locations and larger properties typically start from $120,000+. Off-plan options often require just 10-20% down.'
    },
    {
      question: 'Is Erbil real estate a good investment in 2025?',
      answer: 'Yes, Erbil offers attractive rental yields (6-10%), appreciation potential, and a stable environment. Focus on quality properties in prime locations for best results.'
    },
    {
      question: 'Can I manage my investment remotely?',
      answer: 'Absolutely. Real House offers full property management services including tenant finding, rent collection, maintenance, and reporting. Many international investors own properties without visiting frequently.'
    },
    {
      question: 'What returns can I realistically expect?',
      answer: 'Residential properties typically yield 6-10% annually from rent, plus 5-10% capital appreciation in good locations. Total returns of 12-18% are achievable with quality properties.'
    },
    {
      question: 'Should I invest in off-plan or ready properties?',
      answer: 'Off-plan offers lower prices and payment plans but carries development risk. Ready properties provide immediate rental income with less risk. Consider your timeline and risk tolerance.'
    }
  ],
  relatedGuides: ['buying-property-erbil', 'renting-in-erbil'],
  ctaTitle: 'Explore Investment Opportunities',
  ctaText: 'Contact our investment specialists for personalized property recommendations and market analysis.',
  keywords: ['invest erbil real estate', 'property investment kurdistan', 'roi real estate erbil', 'rental yield iraq', 'buy to let erbil']
};

// =============================================================================
// RENTER'S GUIDE
// =============================================================================
export const rentersGuide: Guide = {
  id: 'renting-in-erbil',
  slug: 'renting-in-erbil',
  title: "Complete Renter's Guide to Erbil",
  metaTitle: "Renting Guide Erbil 2025 | Apartments & Villas for Rent Kurdistan",
  metaDescription: 'Everything you need to know about renting in Erbil. Rental prices by area, tenant rights, what to expect & tips for finding the perfect home. Real House guide.',
  heroImage: '/images/guides/renters-guide-hero.jpg',
  introduction: 'Whether you are relocating for work, starting a new chapter in Kurdistan, or simply exploring the area before buying, renting in Erbil offers flexibility and access to quality housing. This guide covers everything from finding the right property to understanding your rights as a tenant.',
  lastUpdated: '2025-02-22',
  readTime: 10,
  sections: [
    {
      id: 'rental-market-overview',
      title: 'Erbil Rental Market Overview',
      content: `<p>Erbil has an active rental market serving diverse tenants including expatriates, diplomats, corporate employees, and local residents.</p>
<p><strong>Market Characteristics:</strong></p>
<ul>
<li>Strong demand in premium areas</li>
<li>Furnished options widely available</li>
<li>International-standard properties in gated compounds</li>
<li>Growing supply of modern apartments</li>
<li>Professional landlords and agencies</li>
</ul>
<p><strong>Typical Lease Terms:</strong></p>
<ul>
<li>Standard duration: 12 months</li>
<li>Payment: Annual or semi-annual upfront (most common)</li>
<li>Monthly payment available in some cases</li>
<li>Security deposit: 1-2 months rent</li>
<li>Notice period: 1-2 months</li>
</ul>`
    },
    {
      id: 'rental-prices',
      title: 'Rental Prices by Area & Property Type',
      content: `<p>Monthly rental prices in Erbil (USD) vary by location and property type:</p>
<p><strong>Dream City</strong></p>
<ul>
<li>1-2 bedroom apartment: $600 - $1,000</li>
<li>3 bedroom apartment: $900 - $1,500</li>
<li>Villa: $1,500 - $3,000</li>
</ul>
<p><strong>Gulan District</strong></p>
<ul>
<li>1-2 bedroom apartment: $500 - $900</li>
<li>3 bedroom apartment: $800 - $1,400</li>
<li>Penthouse: $1,200 - $2,500</li>
</ul>
<p><strong>Italian Village</strong></p>
<ul>
<li>2-3 bedroom townhouse: $800 - $1,400</li>
<li>Villa: $1,200 - $2,200</li>
</ul>
<p><strong>Ankawa</strong></p>
<ul>
<li>Studio/1 bedroom: $350 - $600</li>
<li>2-3 bedroom apartment: $500 - $1,000</li>
<li>Villa: $1,000 - $2,000</li>
</ul>
<p><strong>Empire World (New Development)</strong></p>
<ul>
<li>1-2 bedroom apartment: $500 - $800</li>
<li>3 bedroom apartment: $700 - $1,200</li>
</ul>
<p>Prices are approximate and vary based on condition, furnishing, and specific location within each area.</p>`
    },
    {
      id: 'finding-rental',
      title: 'How to Find the Right Rental',
      content: `<p>Follow these steps to find your ideal rental property:</p>
<p><strong>Step 1: Define Your Requirements</strong></p>
<ul>
<li>Budget (include utilities and maintenance fees)</li>
<li>Location priorities (work commute, schools, amenities)</li>
<li>Property size and type</li>
<li>Furnished vs. unfurnished</li>
<li>Parking and outdoor space needs</li>
</ul>
<p><strong>Step 2: Search Methods</strong></p>
<ul>
<li>Work with a real estate agent (recommended)</li>
<li>Online property portals</li>
<li>Compound management offices</li>
<li>Word of mouth and expat communities</li>
</ul>
<p><strong>Step 3: Schedule Viewings</strong></p>
<ul>
<li>View multiple properties to compare</li>
<li>Check at different times of day</li>
<li>Meet the landlord or property manager</li>
<li>Ask about maintenance response times</li>
</ul>`,
      tips: [
        'Real estate agents help for free - landlords pay their commission',
        'Join expat groups on social media for recommendations',
        'Ask other tenants about their experience with the landlord/management'
      ]
    },
    {
      id: 'what-to-look-for',
      title: 'What to Look for When Viewing',
      content: `<p>During property viewings, inspect these key areas:</p>
<p><strong>Interior Checks:</strong></p>
<ul>
<li>Water pressure and hot water availability</li>
<li>Air conditioning and heating systems</li>
<li>Electrical outlets and lighting</li>
<li>Windows and door security</li>
<li>Kitchen appliances (if furnished)</li>
<li>Storage space and closets</li>
<li>Internet connectivity options</li>
</ul>
<p><strong>Building/Compound:</strong></p>
<ul>
<li>Security (guards, cameras, access control)</li>
<li>Parking availability</li>
<li>Common area maintenance</li>
<li>Gym, pool, and other amenities</li>
<li>Garbage collection</li>
<li>Generator availability (power backup)</li>
</ul>
<p><strong>Neighborhood:</strong></p>
<ul>
<li>Proximity to supermarkets and shops</li>
<li>Restaurants and cafes</li>
<li>Schools and healthcare facilities</li>
<li>Traffic and noise levels</li>
<li>Safety and street lighting</li>
</ul>`,
      tips: [
        'Test all appliances during the viewing',
        'Ask about generator schedule and costs',
        'Check mobile phone signal strength'
      ]
    },
    {
      id: 'rental-process',
      title: 'The Rental Process',
      content: `<p>Once you find the right property, here is what to expect:</p>
<p><strong>Step 1: Application</strong></p>
<ul>
<li>Submit basic information and employment details</li>
<li>Provide passport/ID copy</li>
<li>Some landlords request employer reference</li>
</ul>
<p><strong>Step 2: Agreement</strong></p>
<ul>
<li>Negotiate terms (price, duration, inclusions)</li>
<li>Review lease agreement carefully</li>
<li>Clarify maintenance responsibilities</li>
<li>Confirm what is included (utilities, internet, furnishing)</li>
</ul>
<p><strong>Step 3: Payment & Move-In</strong></p>
<ul>
<li>Pay first rent period (typically 6-12 months upfront)</li>
<li>Pay security deposit (1-2 months)</li>
<li>Sign lease agreement</li>
<li>Conduct move-in inspection</li>
<li>Document existing condition with photos</li>
<li>Collect keys and access cards</li>
</ul>`,
      tips: [
        'Document everything with photos before moving in',
        'Get a signed inventory list of furnished items',
        'Keep copies of all signed documents and payment receipts'
      ]
    },
    {
      id: 'tenant-rights',
      title: 'Tenant Rights & Responsibilities',
      content: `<p>Understanding your rights and responsibilities helps ensure a smooth tenancy:</p>
<p><strong>Tenant Rights:</strong></p>
<ul>
<li>Peaceful enjoyment of the property</li>
<li>Privacy (landlord must give notice for visits)</li>
<li>Essential repairs and maintenance by landlord</li>
<li>Return of security deposit (minus legitimate deductions)</li>
<li>Proper notice before lease termination</li>
<li>Safe and habitable living conditions</li>
</ul>
<p><strong>Tenant Responsibilities:</strong></p>
<ul>
<li>Pay rent on time as agreed</li>
<li>Maintain property in good condition</li>
<li>Report maintenance issues promptly</li>
<li>Follow building/compound rules</li>
<li>Give proper notice when leaving</li>
<li>Return property in same condition (normal wear excepted)</li>
</ul>`,
      warnings: [
        'Read your lease agreement carefully before signing',
        'Never pay rent without getting a receipt',
        'Document any property damage when you move in'
      ]
    },
    {
      id: 'utilities-costs',
      title: 'Utilities & Additional Costs',
      content: `<p>Budget for these costs beyond your monthly rent:</p>
<p><strong>Typical Monthly Utilities:</strong></p>
<ul>
<li>Electricity: $100-400 (depending on A/C usage)</li>
<li>Water: Often included or minimal cost</li>
<li>Internet: $30-50 for standard broadband</li>
<li>Gas (if applicable): $20-50</li>
<li>Generator fees: $50-150 (for backup power)</li>
</ul>
<p><strong>Other Potential Costs:</strong></p>
<ul>
<li>Maintenance/HOA fees: May be included or $50-200/month</li>
<li>Parking: Often included, sometimes extra</li>
<li>Satellite TV: $20-50/month</li>
<li>Renter's insurance: Recommended, $100-200/year</li>
</ul>`,
      tips: [
        'Clarify which utilities are included in rent before signing',
        'Summer electricity bills are significantly higher due to A/C',
        'Ask about generator fuel costs and schedule'
      ]
    },
    {
      id: 'foreigners-renting',
      title: 'Guide for Foreign Renters',
      content: `<p>Renting as a foreigner in Erbil is straightforward:</p>
<p><strong>Requirements:</strong></p>
<ul>
<li>Valid passport</li>
<li>Entry visa or residence permit</li>
<li>Employment letter or proof of income</li>
<li>Security deposit and upfront rent</li>
</ul>
<p><strong>Tips for Expats:</strong></p>
<ul>
<li>Companies often assist with housing search and lease negotiation</li>
<li>Many landlords prefer expat tenants for reliability</li>
<li>Premium compounds are designed for international standards</li>
<li>English-speaking agents and managers are common</li>
<li>Join expat Facebook groups for advice and recommendations</li>
</ul>
<p>Real House has extensive experience helping international tenants find suitable accommodation in Erbil.</p>`
    }
  ],
  faqs: [
    {
      question: 'Do I need to pay rent upfront?',
      answer: 'Yes, most landlords require 6-12 months rent upfront. Some accept semi-annual payments. Monthly payment is rare but may be negotiable with certain landlords.'
    },
    {
      question: 'Can foreigners rent in Erbil?',
      answer: 'Yes, foreigners can easily rent in Erbil with a valid passport and visa/residence permit. Expats make up a significant portion of the rental market.'
    },
    {
      question: 'What is included in furnished rentals?',
      answer: 'Typically includes furniture, beds, kitchen appliances, air conditioning. Some include linens, kitchenware, and electronics. Always clarify before signing.'
    },
    {
      question: 'How do I get my deposit back?',
      answer: 'Security deposits are returned after lease ends, minus any legitimate deductions for damage beyond normal wear. Document property condition at move-in and move-out.'
    },
    {
      question: 'Who pays for repairs?',
      answer: 'Generally, landlords cover major repairs and maintenance (plumbing, A/C, structure). Tenants typically handle minor issues and damage they cause.'
    }
  ],
  relatedGuides: ['buying-property-erbil', 'real-estate-investment-erbil'],
  ctaTitle: 'Find Your Perfect Rental',
  ctaText: 'Browse our selection of quality rental properties in Erbil or contact us for personalized assistance.',
  keywords: ['rent erbil', 'apartments for rent erbil', 'houses for rent kurdistan', 'expat housing erbil', 'rental prices erbil']
};

// =============================================================================
// MARKET REPORT DATA
// =============================================================================
export interface MarketReportSection {
  id: string;
  title: string;
  content: string;
  stats?: { label: string; value: string; change?: string }[];
  chartData?: { area: string; avgPrice: number; priceChange: number }[];
}

export interface MarketReport {
  id: string;
  slug: string;
  year: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  introduction: string;
  lastUpdated: string;
  sections: MarketReportSection[];
  keyFindings: string[];
  outlook: string;
  methodology: string;
}

export const marketReport2025: MarketReport = {
  id: 'erbil-2025',
  slug: 'erbil-2025',
  year: 2025,
  title: 'Erbil Real Estate Market Report 2025',
  metaTitle: 'Erbil Property Market Report 2025 | Prices, Trends & Analysis',
  metaDescription: 'Comprehensive 2025 Erbil real estate market analysis. Property prices by area, market trends, supply & demand, and future outlook. Data-driven insights from Real House.',
  heroImage: '/images/market-report/erbil-2025-hero.jpg',
  introduction: 'The Erbil real estate market enters 2025 with stable fundamentals and cautious optimism. After years of steady growth, the market is maturing with increased professionalism, more diverse property options, and continued demand from both local and international buyers. This comprehensive report provides data-driven insights into current market conditions, pricing trends, and future outlook.',
  lastUpdated: '2025-02-22',
  sections: [
    {
      id: 'market-overview',
      title: 'Market Overview',
      content: `<p>The Erbil property market in 2025 demonstrates resilience and gradual maturation. Key market indicators show healthy fundamentals:</p>
<ul>
<li>Transaction volumes remain stable year-over-year</li>
<li>International buyer interest continues, particularly from the diaspora</li>
<li>New development supply is balanced with demand</li>
<li>Rental market remains active with strong expatriate demand</li>
<li>Premium areas maintain price stability while emerging areas show appreciation</li>
</ul>`,
      stats: [
        { label: 'Total Market Transactions', value: '2,850+', change: '+5%' },
        { label: 'Average Price per sqm (Premium)', value: '$1,650', change: '+3%' },
        { label: 'Average Rental Yield', value: '7.5%', change: 'Stable' },
        { label: 'New Units Delivered', value: '3,200', change: '+12%' }
      ]
    },
    {
      id: 'price-analysis',
      title: 'Price Analysis by Area',
      content: `<p>Property prices vary significantly across Erbil districts. Premium areas command higher prices per square meter while emerging areas offer value opportunities:</p>`,
      chartData: [
        { area: 'Dream City', avgPrice: 1850, priceChange: 4 },
        { area: 'Gulan', avgPrice: 1750, priceChange: 3 },
        { area: 'Empire World', avgPrice: 1600, priceChange: 8 },
        { area: 'Italian Village', avgPrice: 1400, priceChange: 2 },
        { area: 'English Village', avgPrice: 1500, priceChange: 2 },
        { area: 'Pavilion', avgPrice: 1350, priceChange: 5 },
        { area: 'Ankawa', avgPrice: 1200, priceChange: 3 },
        { area: 'American Village', avgPrice: 1100, priceChange: 4 },
        { area: 'Lebanese Village', avgPrice: 1050, priceChange: 3 }
      ]
    },
    {
      id: 'property-types',
      title: 'Analysis by Property Type',
      content: `<p><strong>Apartments</strong> remain the most actively traded property type, accounting for 55% of transactions. The 2-3 bedroom segment shows strongest demand from both end-users and investors.</p>
<p><strong>Villas</strong> represent 25% of the market, with continued preference for gated community locations. Prices range from $200,000 to $800,000+ depending on size and location.</p>
<p><strong>Off-Plan</strong> properties account for approximately 20% of sales, with payment plans making property accessible to more buyers. Major developments like Empire World and new Gulan towers drive this segment.</p>
<p><strong>Commercial</strong> property demand is growing, particularly for retail and office space in central locations, driven by economic diversification efforts.</p>`,
      stats: [
        { label: 'Apartment Share', value: '55%', change: '+2%' },
        { label: 'Villa Share', value: '25%', change: '-1%' },
        { label: 'Off-Plan Share', value: '20%', change: '+3%' },
        { label: 'Avg. Apartment Price', value: '$145,000', change: '+4%' }
      ]
    },
    {
      id: 'rental-market',
      title: 'Rental Market Analysis',
      content: `<p>The rental market remains robust, supported by continued expatriate presence and corporate demand:</p>
<ul>
<li>Average vacancy rates: 8-12% in premium areas</li>
<li>Furnished rentals command 20-35% premium over unfurnished</li>
<li>Corporate tenants prefer Dream City and Gulan for staff housing</li>
<li>Short-term rental segment growing with business travel recovery</li>
</ul>
<p><strong>Rental Yields by Area:</strong></p>
<ul>
<li>Dream City: 6-8%</li>
<li>Gulan: 7-9%</li>
<li>Ankawa: 7-10%</li>
<li>Italian Village: 6-8%</li>
<li>Commercial: 8-12%</li>
</ul>`,
      stats: [
        { label: 'Avg. 2BR Apartment Rent', value: '$800/mo', change: '+5%' },
        { label: 'Avg. Villa Rent', value: '$1,800/mo', change: '+3%' },
        { label: 'Expat Tenant Share', value: '35%', change: 'Stable' },
        { label: 'Avg. Lease Length', value: '12 months', change: 'Stable' }
      ]
    },
    {
      id: 'supply-demand',
      title: 'Supply & Demand Dynamics',
      content: `<p><strong>New Supply:</strong> Approximately 3,200 new units were delivered in 2024, with another 4,000+ expected in 2025. Major contributions from:</p>
<ul>
<li>Empire World phases (residential towers)</li>
<li>Gulan high-rise developments</li>
<li>Pavilion expansion</li>
<li>Various boutique projects</li>
</ul>
<p><strong>Demand Drivers:</strong></p>
<ul>
<li>Iraqi diaspora returning or investing</li>
<li>Local population growth and household formation</li>
<li>Corporate relocations and expansion</li>
<li>Investment demand for rental income</li>
<li>Development of infrastructure and amenities</li>
</ul>
<p>Overall, supply and demand are relatively balanced, preventing significant price volatility in either direction.</p>`
    },
    {
      id: 'foreign-investment',
      title: 'Foreign Investment Trends',
      content: `<p>International investor participation remains an important market segment:</p>
<ul>
<li>Iraqi diaspora (US, UK, Europe, Australia) represents largest foreign buyer group</li>
<li>Regional investors (Gulf states, Turkey) active in commercial and larger residential</li>
<li>Focus on premium properties with strong rental potential</li>
<li>Growing interest in off-plan opportunities with payment plans</li>
</ul>
<p><strong>Foreign Buyer Preferences:</strong></p>
<ul>
<li>Dream City: Families seeking international school proximity</li>
<li>Gulan: Investors targeting professional tenant market</li>
<li>Off-plan: Capital appreciation and flexible payments</li>
</ul>`
    }
  ],
  keyFindings: [
    'Erbil property market shows stable fundamentals with moderate price appreciation (3-5% average)',
    'Premium areas (Dream City, Gulan) maintain value while emerging areas offer growth potential',
    'Rental yields remain attractive at 6-10% for well-located properties',
    'Off-plan sales account for growing share as developers offer competitive payment plans',
    'Foreign buyer participation remains strong, particularly from Iraqi diaspora',
    'Supply pipeline is healthy but balanced with demand, preventing oversupply concerns',
    'Professional property management services are expanding, supporting investor confidence'
  ],
  outlook: `<p>Looking ahead, the Erbil real estate market is expected to maintain stability with opportunities for measured growth:</p>
<p><strong>Positive Factors:</strong></p>
<ul>
<li>Political stability in Kurdistan Region</li>
<li>Infrastructure investment (roads, airport, utilities)</li>
<li>Economic diversification efforts</li>
<li>Growing professional services sector</li>
<li>International business presence expansion</li>
</ul>
<p><strong>Watch Points:</strong></p>
<ul>
<li>Oil price volatility affecting broader economy</li>
<li>Regional geopolitical developments</li>
<li>Pace of new supply delivery</li>
<li>Interest rates in global markets affecting investor capital</li>
</ul>
<p><strong>2025 Forecast:</strong></p>
<ul>
<li>Price appreciation: 3-6% in premium areas, 5-10% in emerging areas</li>
<li>Rental yields: Stable at 6-10%</li>
<li>Transaction volume: Moderate increase expected</li>
<li>New supply: 4,000+ units projected</li>
</ul>`,
  methodology: 'This report is based on Real House transaction data, market observations, developer information, and analysis of over 1,000 property listings and 500+ transactions. Price data represents asking and transaction prices from Q4 2024 through Q1 2025. All figures are in USD unless otherwise noted.'
};

// =============================================================================
// EXPORTS
// =============================================================================
export const allGuides: Guide[] = [buyersGuide, investorsGuide, rentersGuide];

export function getGuideBySlug(slug: string): Guide | undefined {
  return allGuides.find(g => g.slug === slug);
}

export function getMarketReportBySlug(slug: string): MarketReport | undefined {
  if (slug === 'erbil-2025') return marketReport2025;
  return undefined;
}
