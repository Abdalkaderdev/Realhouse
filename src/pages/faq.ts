// ═══════════════════════════════════════════════════════════════════════════
// Comprehensive FAQ Page for Real House
// SEO-optimized with FAQPage schema for each category
// Targets keywords: buy property erbil, foreigners buy property kurdistan, etc.
// ═══════════════════════════════════════════════════════════════════════════

// ─── Helper Functions ─────────────────────────────────────────────────────
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

function createSVG(paths: string[], viewBox: string = '0 0 24 24'): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  paths.forEach(d => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  });

  return svg;
}

// ─── FAQ Data Types ─────────────────────────────────────────────────────────
export interface FAQ {
  question: string;
  answer: string;
  keywords?: string[];
}

export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  faqs: FAQ[];
}

// ═══════════════════════════════════════════════════════════════════════════
// FAQ DATA - 50+ Questions organized by category
// ═══════════════════════════════════════════════════════════════════════════

// Buying Property FAQs
export const buyingFAQs: FAQ[] = [
  {
    question: 'How do I buy property in Erbil, Iraq?',
    answer: 'Buying property in Erbil involves several straightforward steps: 1) Contact Real House for an initial consultation to discuss your requirements and budget. 2) Browse our curated property listings or let our agents find matching properties. 3) Schedule viewings with our expert agents. 4) Once you find your ideal property, we assist with price negotiation. 5) Conduct due diligence including legal verification of ownership. 6) Sign the purchase agreement and complete payment. 7) Register the property at the Real Estate Registration Department. The entire process typically takes 2-4 weeks for ready properties.',
    keywords: ['how to buy property in erbil', 'buying property erbil iraq', 'property purchase erbil']
  },
  {
    question: 'Can foreigners buy property in Kurdistan Region, Iraq?',
    answer: 'Yes, foreign nationals can legally purchase property in the Kurdistan Region of Iraq. The Kurdistan Regional Government (KRG) has favorable laws allowing foreign ownership of both residential and commercial properties. Requirements include: valid passport, entry visa or residence permit, and proper documentation. Some restrictions may apply for properties near military zones or borders. Real House specializes in assisting international buyers with the entire process, including legal guidance, translation services, and documentation.',
    keywords: ['can foreigners buy property in kurdistan', 'foreign property ownership erbil', 'international buyers iraq']
  },
  {
    question: 'What is the average property price in Erbil?',
    answer: 'Property prices in Erbil vary significantly by location and type. In premium areas like Dream City, Gulan, and Italian Village: Apartments range from $85,000 to $350,000 USD. Villas typically cost $200,000 to $800,000 USD. Luxury penthouses can exceed $500,000 USD. In developing areas, prices can be 30-50% lower. Off-plan properties often offer competitive pricing with 10-40% down payment and installment plans. Contact Real House for current market rates and personalized property recommendations within your budget.',
    keywords: ['average property price erbil', 'how much are apartments erbil', 'erbil property prices']
  },
  {
    question: 'How much deposit is needed to buy a house in Erbil?',
    answer: 'Deposit requirements depend on the payment method and property type. For cash purchases, you may negotiate with the seller for flexible terms. For installment plans (common with new developments): Typically 10-40% upfront deposit. Remaining balance paid over 2-5 years. Some developers offer 0% interest installments. Off-plan properties often have the most flexible payment terms. Real House can connect you with developers offering attractive payment plans suited to your financial situation.',
    keywords: ['how much deposit needed to buy house erbil', 'down payment property erbil', 'property deposit kurdistan']
  },
  {
    question: 'What documents do I need to buy property in Erbil?',
    answer: 'Required documents for property purchase in Erbil include: 1) Valid passport or Iraqi national ID (original and copies). 2) Entry visa or residence permit for foreigners. 3) Recent photographs (passport size). 4) Proof of funds or bank statements. 5) Power of attorney (if purchasing through a representative). 6) Tax identification number (can be obtained locally). Real House provides full documentation support, ensuring all paperwork is properly prepared and filed.',
    keywords: ['documents needed buy property erbil', 'property purchase requirements kurdistan']
  },
  {
    question: 'Is it safe to buy property in Erbil?',
    answer: 'Erbil is considered one of the safest cities in Iraq and the Middle East. The Kurdistan Region has maintained stability and security, attracting significant foreign investment. Property transactions are legally protected through the Real Estate Registration system. To ensure a safe purchase: Work with licensed agencies like Real House. Verify property ownership through official channels. Conduct thorough due diligence. Use escrow services for large transactions. Our team guides you through every step to ensure a secure transaction.',
    keywords: ['is erbil safe to buy property', 'property security erbil', 'safe real estate investment iraq']
  },
  {
    question: 'What are the best areas to buy property in Erbil?',
    answer: 'Top residential areas in Erbil include: Dream City - Modern gated community with international schools, shopping centers, and family amenities. Gulan - Premium district known for high-rise towers and proximity to business centers. Italian Village - Charming Mediterranean-style architecture with community facilities. English Village - Exclusive British colonial-style homes in a secure environment. Ankawa - Vibrant Christian neighborhood with restaurants, shops, and cultural attractions. Empire World - Upcoming mega-development with mixed-use facilities. Each area offers unique advantages depending on your lifestyle and investment goals.',
    keywords: ['best areas to buy property erbil', 'where to buy property erbil', 'erbil neighborhoods']
  },
  {
    question: 'Can I buy property in Erbil remotely?',
    answer: 'Yes, remote property purchases are possible in Erbil. Real House offers comprehensive virtual services: Virtual property tours via video call. Detailed photo and video documentation. Online document signing capabilities. Power of attorney arrangements for local representation. Secure international payment processing. Regular updates and communication throughout the process. Many international investors have successfully purchased properties without visiting in person, though we recommend at least one visit if possible.',
    keywords: ['buy property erbil remotely', 'online property purchase iraq', 'virtual property buying']
  },
  {
    question: 'What are the closing costs when buying property in Erbil?',
    answer: 'Typical closing costs in Erbil include: Registration fees: 3-5% of property value. Legal fees: 1-2% for attorney services. Agency commission: Usually paid by seller, but verify. Title search and verification: Minimal fees. Translation and notarization: $100-500 depending on complexity. Total additional costs typically range from 5-8% of property value. Real House provides a detailed cost breakdown before you commit to any purchase.',
    keywords: ['closing costs erbil property', 'fees buying property iraq', 'property transaction costs kurdistan']
  },
  {
    question: 'How long does it take to complete a property purchase in Erbil?',
    answer: 'The timeline for property purchase in Erbil varies: Ready properties with clear title: 2-4 weeks. New development handovers: Depends on construction completion. Off-plan purchases: Initial agreement in days, handover upon completion. Complex transactions or properties requiring documentation updates may take longer. Our team works efficiently to minimize delays and keep you informed throughout the process.',
    keywords: ['how long to buy property erbil', 'property purchase timeline kurdistan']
  },
  {
    question: 'What is the process for buying off-plan property in Erbil?',
    answer: 'Buying off-plan property in Erbil follows these steps: 1) Research reputable developers with Real House guidance. 2) Review project plans, specifications, and completion timeline. 3) Negotiate pricing and payment plan (typically 10-40% down, rest in installments). 4) Sign preliminary purchase agreement with developer. 5) Make initial payment and receive booking confirmation. 6) Continue payments as per agreed schedule. 7) Attend final inspection upon completion. 8) Complete handover and register property. Real House vets all developers and protects your interests throughout.',
    keywords: ['off-plan property erbil', 'buy new construction erbil', 'pre-construction property kurdistan']
  },
  {
    question: 'Can I negotiate the price when buying property in Erbil?',
    answer: 'Yes, price negotiation is common and expected in Erbil real estate. Typical negotiation room is 5-15% off asking price depending on: Property time on market (longer = more negotiable). Seller motivation and urgency. Market conditions and competing offers. Payment method (cash buyers often get better deals). Property condition and any required repairs. Real House agents are skilled negotiators who leverage market knowledge to secure favorable prices for our clients.',
    keywords: ['negotiate property price erbil', 'property bargaining iraq', 'get discount on property']
  },
  {
    question: 'What should I check before buying property in Erbil?',
    answer: 'Essential pre-purchase checks include: 1) Title Deed (Sanad) verification at Tabu office. 2) Confirm seller is legal owner with right to sell. 3) Check for mortgages, liens, or legal disputes. 4) Verify building permits and compliance. 5) Inspect property condition thoroughly. 6) Review utility bills and connection status. 7) Understand HOA fees and compound rules if applicable. 8) Assess neighborhood, noise, and traffic. 9) Confirm accurate measurements match documents. Real House conducts comprehensive due diligence for all transactions.',
    keywords: ['property due diligence erbil', 'what to check before buying property', 'property inspection kurdistan']
  },
  {
    question: 'Do I need an agent to buy property in Erbil?',
    answer: 'While not legally required, using a licensed real estate agent is highly recommended in Erbil. Benefits include: Expert market knowledge and fair pricing guidance. Access to more property options including off-market listings. Language support and cultural navigation. Due diligence and legal verification assistance. Skilled negotiation for better terms. Transaction management and paperwork handling. Protection from common pitfalls and scams. Real House services are typically free for buyers as we earn commission from sellers.',
    keywords: ['real estate agent erbil', 'need agent buy property iraq', 'property broker kurdistan']
  },
  {
    question: 'What are the hidden costs of buying property in Erbil?',
    answer: 'Beyond purchase price, budget for these additional costs: Registration/transfer fees: 3-5% of property value. Legal fees: 1-2% for attorney services. Property inspection: $200-500 if desired. Utility connection/transfer: varies by property. Moving expenses: depends on distance and belongings. Renovation/repairs: budget 5-15% if needed. Furnishing: $10,000-50,000 for quality furniture. Annual maintenance fees: varies by compound. We recommend budgeting 8-12% above purchase price for all associated costs.',
    keywords: ['hidden costs buying property erbil', 'additional fees property purchase iraq', 'total cost buying home']
  }
];

// Property Prices and Costs FAQs
export const pricesFAQs: FAQ[] = [
  {
    question: 'What is the price per square meter in Erbil?',
    answer: 'Price per square meter in Erbil varies by location: Premium areas (Dream City, Gulan, Italian Village): $1,200-2,500 per sqm. Developing areas: $600-1,200 per sqm. Commercial properties: $1,500-4,000 per sqm. Land plots: $200-800 per sqm depending on zoning. These are general ranges; actual prices depend on property condition, amenities, and exact location within each district.',
    keywords: ['price per square meter erbil', 'sqm price erbil', 'erbil property price per meter']
  },
  {
    question: 'Are property prices in Erbil negotiable?',
    answer: 'Yes, property prices in Erbil are generally negotiable. Typical negotiation room is 5-15% depending on: Market conditions and property demand. Seller motivation and urgency. Payment method (cash buyers often get better deals). Property condition and time on market. Real House agents are expert negotiators who consistently secure favorable terms for our clients.',
    keywords: ['negotiate property price erbil', 'erbil property bargaining']
  },
  {
    question: 'What additional costs should I budget for when buying property?',
    answer: 'Beyond the purchase price, budget for: Registration and transfer fees (3-5%). Legal and documentation fees (1-2%). Property inspection if desired ($200-500). Moving and furnishing costs. Utility connection fees. Annual property maintenance fees (for apartments/compounds). Property insurance (optional but recommended). We recommend budgeting an additional 8-10% of property value for all associated costs.',
    keywords: ['additional costs buying property erbil', 'hidden costs property purchase iraq']
  },
  {
    question: 'How do property prices in Erbil compare to other Iraqi cities?',
    answer: 'Erbil generally has higher property prices than other Iraqi cities due to: Greater political stability and security. Stronger economy and international investment. Better infrastructure and amenities. Higher quality construction standards. Compared to Baghdad, Erbil premium areas are 20-40% more expensive, but offer better value considering safety and quality of life. Sulaymaniyah and Duhok have lower prices but smaller markets.',
    keywords: ['erbil property prices vs baghdad', 'compare property prices iraq cities']
  },
  {
    question: 'What are typical rental yields in Erbil?',
    answer: 'Rental yields in Erbil are attractive for investors: Residential properties: 6-10% annual yield. Commercial properties: 8-14% annual yield. Furnished apartments (short-term): 10-15% with good occupancy. Premium locations with expat demand typically achieve higher yields. Real House can provide detailed yield analysis for specific properties you are considering.',
    keywords: ['rental yield erbil', 'roi property erbil', 'erbil property investment returns']
  }
];

// Legal Requirements FAQs
export const legalFAQs: FAQ[] = [
  {
    question: 'What are the legal requirements for foreigners buying property in Kurdistan?',
    answer: 'Foreign buyers must meet these requirements: Valid passport with at least 6 months validity. Entry visa or residency permit (tourist visa acceptable for purchase, residency for extended stays). No criminal record in Kurdistan. Property must not be in restricted zones (military areas, border regions). Standard documentation including photographs and proof of funds. Real House guides you through all legal requirements and connects you with experienced property lawyers.',
    keywords: ['legal requirements foreigners buy property kurdistan', 'foreign ownership laws erbil']
  },
  {
    question: 'How is property ownership registered in Erbil?',
    answer: 'Property ownership is registered at the Real Estate Registration Department (Tabu). The process involves: Verification of seller ownership and clear title. Drafting and signing the purchase contract. Payment of registration fees (3-5% of value). Submission of documents to Tabu office. Issuance of new title deed (Sanad) in buyer name. The entire registration typically takes 1-2 weeks. Real House handles all registration procedures on your behalf.',
    keywords: ['property registration erbil', 'tabu office kurdistan', 'title deed erbil']
  },
  {
    question: 'Do I need a lawyer to buy property in Erbil?',
    answer: 'While not legally required, having a lawyer is strongly recommended for: Title verification and due diligence. Contract review and negotiation. Identifying potential issues or encumbrances. Representing your interests during registration. Legal costs are typically 1-2% of property value. Real House partners with trusted property lawyers who specialize in real estate transactions.',
    keywords: ['lawyer needed buy property erbil', 'property attorney kurdistan']
  },
  {
    question: 'What property taxes exist in Kurdistan Region?',
    answer: 'Property taxation in Kurdistan is relatively favorable: No annual property tax for residential properties. Capital gains tax may apply on sale (currently minimal). Rental income tax: 5-10% depending on amount. No inheritance tax on property. Commercial properties may have business-related taxes. Tax laws are subject to change, so consult with a local tax advisor for current regulations.',
    keywords: ['property tax erbil', 'tax on property kurdistan', 'real estate taxes iraq']
  },
  {
    question: 'Can I get residency through property investment in Kurdistan?',
    answer: 'Property investment can support residency applications in Kurdistan: Investors may qualify for investor residency permits. Significant investments (typically $100,000+) strengthen applications. Residency provides long-term stay rights and business opportunities. The process involves the Residency Department and may require additional documentation. Real House can connect you with immigration specialists for detailed guidance.',
    keywords: ['residency through property investment kurdistan', 'investor visa erbil', 'property investment residency iraq']
  },
  {
    question: 'What happens if there is a property dispute?',
    answer: 'Property disputes in Kurdistan are resolved through: Mediation and negotiation (preferred first step). Civil courts for unresolved disputes. The Real Estate Registration system provides legal framework. Proper due diligence before purchase minimizes dispute risk. To protect yourself: Always verify ownership through official channels. Use escrow for payments when possible. Work with licensed agents and lawyers. Keep all documentation properly filed.',
    keywords: ['property dispute erbil', 'real estate legal issues kurdistan']
  },
  {
    question: 'What is a Tabu (Title Deed) in Kurdistan?',
    answer: 'The Tabu (Arabic for title deed, also called Sanad) is the official document proving property ownership in Kurdistan. It is issued by the Real Estate Registration Department and contains: Owner name and ID information. Property location and boundaries. Property size in square meters. Registration number and date. Any encumbrances or mortgages. The Tabu is essential for any property transaction. Real House verifies Tabu authenticity as part of our due diligence process.',
    keywords: ['tabu title deed kurdistan', 'sanad property document', 'property ownership proof erbil']
  },
  {
    question: 'Are there any restrictions on property ownership in Kurdistan?',
    answer: 'Property ownership restrictions in Kurdistan include: Military Zones - Properties near military installations restricted. Border Areas - Some restrictions near international borders. Agricultural Land - May require special approvals for conversion. Historic Areas - Heritage protection zones have limitations. Large Land Holdings - May require government approval. For standard residential and commercial properties in urban areas, restrictions are minimal. Real House identifies any restrictions during property search and due diligence.',
    keywords: ['property restrictions kurdistan', 'ownership limitations erbil', 'restricted property zones']
  },
  {
    question: 'How do I verify property ownership in Erbil?',
    answer: 'Property ownership verification involves: Tabu Office Search - Check registration records for current owner. Title Deed Review - Examine original Sanad document. Encumbrance Check - Verify no mortgages or liens exist. Legal Opinion - Lawyer review of ownership history. Survey Confirmation - Verify boundaries match documents. Previous Transactions - Review sale history for red flags. This due diligence typically takes 3-7 days. Real House conducts thorough verification for all properties we represent.',
    keywords: ['verify property ownership erbil', 'check property title kurdistan', 'due diligence property']
  },
  {
    question: 'What inheritance laws apply to property in Kurdistan?',
    answer: 'Property inheritance in Kurdistan follows Iraqi civil law with some regional considerations: No inheritance tax currently applies. Islamic inheritance rules generally apply for Muslim-owned property. Non-Muslims may specify inheritance through wills. Foreign owners should consider: Preparing a valid will. Consulting with Iraqi/Kurdish legal counsel. Understanding succession implications. Naming beneficiaries clearly. Real House can connect you with legal experts for inheritance planning related to your property investments.',
    keywords: ['property inheritance kurdistan', 'inheritance law erbil', 'property will iraq']
  }
];

// Neighborhoods and Areas FAQs
export const neighborhoodsFAQs: FAQ[] = [
  {
    question: 'What is Dream City Erbil like?',
    answer: 'Dream City is Erbil\'s premier gated community featuring: Modern infrastructure with 24/7 security. International schools including American and British curricula. Shopping centers, restaurants, and entertainment. Parks, sports facilities, and community centers. Mix of villas, apartments, and townhouses. Expatriate-friendly with diverse international community. Property prices range from $150,000 to $800,000+. Ideal for families seeking Western-style amenities.',
    keywords: ['dream city erbil', 'dream city properties', 'living in dream city erbil']
  },
  {
    question: 'Is Gulan a good area to invest in?',
    answer: 'Gulan is one of Erbil\'s most desirable investment areas: Central location with excellent accessibility. High-rise residential and commercial towers. Strong rental demand from professionals and companies. Modern infrastructure and amenities. Appreciation potential due to ongoing development. Properties range from $100,000 apartments to $500,000+ penthouses. Rental yields of 7-10% make it attractive for investors.',
    keywords: ['gulan erbil investment', 'gulan district properties', 'invest in gulan erbil']
  },
  {
    question: 'What is Italian Village Erbil?',
    answer: 'Italian Village is a distinctive residential development offering: Mediterranean-style architecture and design. Peaceful, family-oriented community. Well-maintained common areas and landscaping. Mix of villas and townhouses. Good schools and amenities nearby. Secure gated environment. Properties typically range from $180,000 to $450,000. Popular with families seeking charm and community atmosphere.',
    keywords: ['italian village erbil', 'italian village properties', 'mediterranean style homes erbil']
  },
  {
    question: 'What is Ankawa known for?',
    answer: 'Ankawa is Erbil\'s vibrant Christian neighborhood known for: Rich cultural heritage and historic churches. Excellent restaurants, cafes, and nightlife. Diverse shopping options and markets. Mix of traditional and modern properties. Welcoming atmosphere for all backgrounds. Strong community spirit. Properties range from affordable apartments ($60,000+) to larger homes ($250,000+). Popular with young professionals and those seeking an active social scene.',
    keywords: ['ankawa erbil', 'ankawa neighborhood', 'properties in ankawa']
  },
  {
    question: 'What is Empire World Erbil?',
    answer: 'Empire World is Erbil\'s largest mixed-use development: Mega-project spanning hundreds of hectares. Residential towers, villas, and apartments. Commercial spaces, offices, and retail. Hotels, entertainment, and leisure facilities. Modern infrastructure and smart city features. Off-plan opportunities with installment plans. Prices vary widely based on unit type and completion stage. Represents significant investment in Erbil\'s future.',
    keywords: ['empire world erbil', 'empire world project', 'empire world investment']
  },
  {
    question: 'Which areas in Erbil are best for families?',
    answer: 'Best family-friendly areas in Erbil include: Dream City - Top choice with international schools and family amenities. Italian Village - Quiet, safe community atmosphere. English Village - Exclusive with excellent facilities. Gulan - Central with good schools nearby. Havalan - Upcoming area with modern family housing. Key factors: Proximity to schools, safety, parks, and healthcare facilities. Real House specializes in matching families with ideal neighborhoods.',
    keywords: ['family friendly areas erbil', 'best neighborhoods families erbil']
  }
];

// Property Types FAQs
export const propertyTypesFAQs: FAQ[] = [
  {
    question: 'What types of properties are available in Erbil?',
    answer: 'Real House offers diverse property types: Apartments - Studios to 4+ bedrooms in modern towers. Villas - Standalone luxury homes with gardens and parking. Penthouses - Premium top-floor residences with terraces. Townhouses - Multi-story homes in gated communities. Duplexes - Two-level apartments with extra space. Commercial - Retail stores, offices, and warehouses. Land - Residential and commercial plots. Off-plan - New developments with attractive pricing.',
    keywords: ['property types erbil', 'types of real estate erbil', 'housing options kurdistan']
  },
  {
    question: 'What is the difference between a villa and a townhouse in Erbil?',
    answer: 'Villas and townhouses differ in several ways: Villas: Fully detached, private garden, typically larger (200-600 sqm), more privacy, higher maintenance, prices from $200,000-800,000. Townhouses: Semi-attached or row houses, shared walls, smaller gardens, lower maintenance, community living, prices from $120,000-350,000. Both offer more space than apartments and are popular with families.',
    keywords: ['villa vs townhouse erbil', 'difference villa townhouse']
  },
  {
    question: 'Are off-plan properties a good investment in Erbil?',
    answer: 'Off-plan properties offer several advantages: Lower entry prices (10-30% below completed properties). Flexible payment plans over construction period. Potential capital appreciation upon completion. Ability to customize finishes in some cases. Risks include: Construction delays. Developer reliability concerns. Market changes during construction. Real House only represents reputable developers with track records. We help you evaluate off-plan opportunities carefully.',
    keywords: ['off-plan property erbil', 'buy off-plan erbil', 'new development investment']
  },
  {
    question: 'What are the best apartments to buy in Erbil?',
    answer: 'Top apartment options in Erbil include: Luxury high-rises in Gulan with city views. Family apartments in Dream City compounds. Modern units in Italian Village. Serviced apartments for rental investment. Penthouse units for premium living. Consider: Location, building quality, amenities, parking, security, and management. Real House helps you find the perfect apartment matching your criteria and budget.',
    keywords: ['best apartments erbil', 'buy apartment erbil', 'erbil apartment investment']
  },
  {
    question: 'Can I buy commercial property in Erbil?',
    answer: 'Yes, commercial property investment is available: Retail stores and shops. Office spaces in business districts. Warehouses and industrial units. Mixed-use developments. Commercial land for development. Benefits: Higher rental yields (8-14%). Growing business environment. Diverse tenant options. Real House has a dedicated commercial property division to assist with these investments.',
    keywords: ['commercial property erbil', 'buy office erbil', 'retail space kurdistan']
  }
];

// Financing Options FAQs
export const financingFAQs: FAQ[] = [
  {
    question: 'Can I get a mortgage to buy property in Erbil?',
    answer: 'Mortgage financing in Erbil is limited but developing: Local banks offer home financing for Iraqi residents. International financing options may be available for qualified buyers. Developer financing (installment plans) is most common. Some properties accept cryptocurrency payments. Cash purchases remain predominant. Real House can connect you with banking partners offering financing solutions and advise on payment structuring.',
    keywords: ['mortgage erbil', 'home loan kurdistan', 'property financing iraq']
  },
  {
    question: 'What are the payment options for buying property in Erbil?',
    answer: 'Common payment methods include: Cash Payment - Full amount at closing, often with negotiation leverage. Bank Transfer - Local and international wire transfers accepted. Installment Plans - 10-40% down, balance over 2-5 years (mainly new developments). Post-dated Checks - Series of checks for installment payments. Escrow Services - For added security on large transactions. Most transactions use a combination of methods. Real House advises on the best approach for your situation.',
    keywords: ['payment options property erbil', 'how to pay for property iraq', 'installment property erbil']
  },
  {
    question: 'Do developers in Erbil offer payment plans?',
    answer: 'Yes, most developers offer attractive payment plans: Typical down payment: 10-40% of property value. Payment period: 2-5 years during or after construction. Many offer 0% interest on installments. Some plans extend beyond handover. Payment milestones tied to construction progress. Popular developers with plans include: Empire World, Darin Group, Qaiwan Group, and others. Real House provides detailed payment plan comparisons.',
    keywords: ['developer payment plans erbil', 'installment buying property', 'zero interest property plans']
  },
  {
    question: 'What currencies are accepted for property purchases in Erbil?',
    answer: 'Property transactions in Erbil commonly use: US Dollars (USD) - Most common for property transactions. Iraqi Dinar (IQD) - Accepted but USD preferred for larger transactions. Euro (EUR) - Sometimes accepted. Bank transfers in major currencies can be converted locally. Exchange rates are competitive at authorized dealers. Real House can advise on currency considerations and reputable exchange services.',
    keywords: ['currency property purchase erbil', 'USD property iraq', 'paying for property kurdistan']
  },
  {
    question: 'Are there any government incentives for property buyers in Kurdistan?',
    answer: 'Kurdistan offers some buyer-friendly conditions: No annual property tax on residential properties. Relatively low registration fees compared to region. Investment-friendly policies for foreign buyers. Some developments offer government-backed financing. Infrastructure investment improving property values. Policies evolve, so consult with Real House for current incentives and opportunities.',
    keywords: ['government incentives property kurdistan', 'property buyer benefits erbil']
  }
];

// Real House Services FAQs
export const servicesFAQs: FAQ[] = [
  {
    question: 'What services does Real House offer?',
    answer: 'Real House provides comprehensive real estate services: Property Sales - Buying and selling residential and commercial properties. Property Rentals - Long and short-term rental management. Property Management - Full service for investors and absentee owners. Investment Advisory - Market analysis and portfolio guidance. Legal Support - Partner lawyers for transactions. Relocation Services - Help with moving and settling in Erbil. Virtual Tours - Remote property viewing via video. After-Sales Support - Ongoing assistance post-purchase.',
    keywords: ['real house services', 'erbil real estate agency services', 'what does real house do']
  },
  {
    question: 'Why should I use Real House instead of other agencies?',
    answer: 'Real House stands out through: Expertise - 24+ years of luxury real estate experience. Curated Listings - Quality over quantity, personally vetted properties. International Focus - Specialized in serving foreign buyers. Full Service - End-to-end support from search to settlement. Transparency - Clear communication and honest advice. Network - Connections with developers, lawyers, and service providers. Technology - Virtual tours, online documentation, modern platform. Reputation - Trusted by hundreds of satisfied clients.',
    keywords: ['why choose real house', 'best real estate agency erbil', 'real house vs other agencies']
  },
  {
    question: 'Does Real House help with property management?',
    answer: 'Yes, our property management services include: Tenant Finding - Marketing, screening, and lease management. Rent Collection - Timely collection and accounting. Maintenance - Coordinating repairs and upkeep. Inspections - Regular property condition reports. Utility Management - Bill payment and coordination. Legal Compliance - Ensuring lease agreements meet requirements. Financial Reporting - Monthly/quarterly statements for owners. Ideal for investors seeking passive income from Erbil properties.',
    keywords: ['property management erbil', 'real house property management', 'rental management kurdistan']
  },
  {
    question: 'Can Real House help me sell my property?',
    answer: 'Absolutely! Our selling services include: Professional Photography - High-quality images and videos. Marketing - Listing on our platform and partner sites. Virtual Tours - 3D tours for remote buyers. Pricing Strategy - Market analysis for optimal pricing. Buyer Qualification - Screening serious buyers. Negotiation - Expert representation for best terms. Transaction Management - Paperwork and closing support. Our properties typically sell faster than market average.',
    keywords: ['sell property erbil', 'real house selling services', 'list property kurdistan']
  },
  {
    question: 'Does Real House offer relocation assistance?',
    answer: 'Yes, we help with complete relocation: Property search aligned with your needs. Neighborhood orientation and tours. School and healthcare facility guidance. Utility setup assistance. Local service recommendations. Cultural orientation for newcomers. Ongoing support after you settle. We understand the challenges of moving to a new city and provide personalized assistance.',
    keywords: ['relocation assistance erbil', 'moving to erbil help', 'real house relocation']
  }
];

// Viewing and Purchasing Process FAQs
export const processFAQs: FAQ[] = [
  {
    question: 'How do I schedule a property viewing in Erbil?',
    answer: 'Scheduling a viewing is easy: Phone - Call +964 750 792 2138 or +964 751 441 5003. Email - Send inquiry to info@realhouseiq.com. Website - Use "Schedule Viewing" on any property listing. WhatsApp - Message us directly for quick response. In Person - Visit our office in Dream City, Erbil. We offer flexible timing including evenings and weekends. Virtual tours are available for remote viewers.',
    keywords: ['schedule viewing erbil', 'property viewing appointment', 'how to view property erbil']
  },
  {
    question: 'What should I look for when viewing a property?',
    answer: 'Key inspection points include: Structure - Walls, floors, ceilings for cracks or damage. Plumbing - Water pressure, drainage, leaks. Electrical - Outlets, switches, wiring condition. Windows/Doors - Proper closure, security features. HVAC - Heating/cooling systems functionality. Natural Light - Sun exposure and ventilation. Noise - Check during different times of day. Neighborhood - Nearby amenities, traffic, safety. Our agents guide you through comprehensive property assessments.',
    keywords: ['property viewing tips erbil', 'what to check when buying property']
  },
  {
    question: 'How long does the property purchasing process take?',
    answer: 'Timeline varies by property type: Ready Properties - 2-4 weeks for straightforward transactions. Properties with Issues - May take 4-8 weeks for resolution. Off-Plan - Agreement in days, handover upon completion (1-3 years). Key phases: Search (1-4 weeks), Negotiation (3-7 days), Due Diligence (1-2 weeks), Registration (1-2 weeks). Real House streamlines each phase for efficient completion.',
    keywords: ['property purchase timeline erbil', 'how long to buy property iraq']
  },
  {
    question: 'What happens after I make an offer?',
    answer: 'After your offer: 1) Seller consideration (24-72 hours typically). 2) Counter-offer negotiation if applicable. 3) Agreement on price and terms. 4) Preliminary contract signing. 5) Due diligence period begins. 6) Final contract preparation. 7) Payment arrangements finalized. 8) Registration and transfer. 9) Key handover and possession. Real House represents you throughout, ensuring your interests are protected.',
    keywords: ['property offer process erbil', 'after making offer on house']
  },
  {
    question: 'Can I negotiate the property price?',
    answer: 'Yes, negotiation is expected in Erbil real estate: Typical negotiation room: 5-15% of asking price. Factors affecting negotiation: Market conditions, property demand, seller motivation, payment method, property condition. Cash buyers often achieve better terms. Our agents are skilled negotiators who secure favorable deals. We research comparable sales to support your position.',
    keywords: ['negotiate property price erbil', 'bargaining property iraq']
  },
  {
    question: 'What due diligence should I conduct before buying?',
    answer: 'Essential due diligence includes: Title Verification - Confirm seller ownership at Tabu office. Encumbrance Check - Ensure no mortgages or liens. Building Permits - Verify legal construction. Survey - Confirm boundaries and measurements. Utility Status - Check outstanding bills or issues. HOA/Compound Rules - Understand community regulations. Inspection - Professional assessment if concerns. Real House coordinates comprehensive due diligence with trusted partners.',
    keywords: ['property due diligence erbil', 'checks before buying property iraq']
  }
];

// Investment FAQs
export const investmentFAQs: FAQ[] = [
  {
    question: 'Is Erbil real estate a good investment?',
    answer: 'Erbil real estate offers compelling investment potential: Stable Market - Kurdistan Region maintains political and economic stability. Growing Economy - Oil revenues and diversification driving growth. Infrastructure Development - Major projects improving the city. Rental Demand - Strong demand from expats, companies, and locals. Competitive Prices - Lower entry point than regional peers. Appreciation Potential - Historical value growth in prime areas. Challenges include currency fluctuations and regional dynamics. Real House provides detailed market analysis for informed decisions.',
    keywords: ['is erbil real estate a good investment', 'invest in erbil property', 'erbil property investment']
  },
  {
    question: 'What are the risks of investing in Erbil real estate?',
    answer: 'Investment risks to consider: Regional Dynamics - Broader Iraq situation can impact sentiment. Currency Risk - USD/IQD fluctuations affect returns. Oil Dependency - Economy tied to oil prices. Legal Complexity - Different from Western systems. Liquidity - Market less liquid than major cities. Development Delays - Off-plan projects may face delays. Mitigation strategies: Diversify across property types, work with established developers, maintain local representation, conduct thorough due diligence. Real House helps you understand and manage risks.',
    keywords: ['risks property investment erbil', 'erbil real estate risks']
  },
  {
    question: 'What is the expected return on investment for Erbil property?',
    answer: 'ROI expectations in Erbil: Rental Yield: 6-10% for residential, 8-14% for commercial. Capital Appreciation: 5-15% annually in prime areas (variable). Total Return: 12-20% potential combining rental and appreciation. Factors affecting returns: Location, property quality, management efficiency, market conditions. Premium areas like Dream City and Gulan historically perform well. Real House provides detailed projections for specific investments.',
    keywords: ['roi property erbil', 'return on investment erbil real estate', 'property yield kurdistan']
  },
  {
    question: 'Should I invest in residential or commercial property in Erbil?',
    answer: 'Both offer advantages: Residential: Lower entry point, easier management, stable tenant pool, 6-10% yields. Commercial: Higher yields (8-14%), longer leases, business tenant stability, but higher entry cost and vacancy risk. Consider: Your budget, risk tolerance, management capacity, and investment goals. Many investors combine both for diversification. Real House advises on optimal portfolio mix.',
    keywords: ['residential vs commercial investment erbil', 'best property type to invest erbil']
  },
  {
    question: 'How can I earn passive income from Erbil property?',
    answer: 'Passive income strategies: Long-term Rentals - Stable monthly income from residential tenants. Short-term Rentals - Higher returns with furnished apartments. Commercial Leases - Longer terms with business tenants. Property Management - Let Real House handle everything for you. Key success factors: Quality property, prime location, competitive pricing, professional management. Our management services enable truly passive investment.',
    keywords: ['passive income erbil property', 'rental income kurdistan', 'hands-off property investment']
  },
  {
    question: 'What are the best properties for investment in Erbil?',
    answer: 'Top investment property types: 2-3 Bedroom Apartments - High rental demand, good yields. Furnished Units - Premium rents from expats and business travelers. New Developments - Off-plan discounts with appreciation potential. Commercial Spaces - Strong yields in business districts. Villas in Compounds - Family rental market. Location priorities: Dream City, Gulan, Ankawa, Italian Village. Real House identifies specific opportunities matching your investment criteria.',
    keywords: ['best investment properties erbil', 'where to invest in erbil property']
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // NEW: Competitor & Comparison Keyword Targeted FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  {
    question: 'Is Kurdistan good for property investment?',
    answer: 'Yes, Kurdistan, particularly Erbil, offers compelling property investment opportunities. Key advantages include: attractive rental yields of 6-10% in prime locations, lower entry prices compared to Gulf markets, relative political stability in the Kurdistan Region, growing demand from expatriates and rising middle class, clear legal framework for foreign ownership, and ongoing infrastructure development. Success requires working with experienced local partners, focusing on quality properties, and maintaining a long-term investment horizon.',
    keywords: ['is kurdistan good for property investment', 'kurdistan real estate investment', 'invest in kurdistan']
  },
  {
    question: 'What is the best city to invest in Iraq?',
    answer: 'Erbil is definitively the best city to invest in Iraq for most investors. Erbil ranks highest across key criteria: foreign ownership accessibility (clear legal framework), security (safest city in Iraq), market transparency (professional real estate services), property quality (modern developments), rental demand (international tenants), and infrastructure. Sulaymaniyah ranks second with lower prices. Baghdad offers market potential but significant barriers for foreigners. For accessible, secure investment in Iraq, Erbil should be the primary focus.',
    keywords: ['best city to invest in iraq', 'iraq property investment city', 'where to invest iraq']
  },
  {
    question: 'How does Erbil compare to Baghdad for property investment?',
    answer: 'Erbil is strongly preferred over Baghdad for property investment, especially for foreign buyers. Erbil advantages: foreigners can legally purchase property with clear procedures, highest security standards in Iraq, transparent market with professional services, modern property developments, strong rental demand from internationals. Baghdad challenges: significant foreign ownership restrictions, higher security considerations, less market transparency, complex bureaucracy. While Baghdad is larger, Erbil offers far superior conditions for property investment.',
    keywords: ['erbil vs baghdad property', 'compare erbil baghdad investment', 'erbil or baghdad real estate']
  },
  {
    question: 'Is Sulaymaniyah or Erbil better for real estate?',
    answer: 'For most investors, Erbil is better than Sulaymaniyah for real estate investment. Erbil offers: larger market with more options, strongest international tenant demand, best infrastructure and amenities, most professional real estate services, and highest liquidity. Sulaymaniyah advantages: 15-25% lower property prices, university presence creating rental demand, cultural appeal, less competition. First-time Kurdistan investors should typically start with Erbil; Sulaymaniyah is better for diversification or budget-conscious buyers.',
    keywords: ['sulaymaniyah vs erbil real estate', 'erbil or sulaymaniyah investment', 'compare kurdistan cities property']
  },
  {
    question: 'What makes Real House the best real estate company in Erbil?',
    answer: 'Real House stands out as a leading real estate company in Erbil through: 23+ years of experience in the Kurdistan market, specialization in premium and luxury properties, extensive expertise serving foreign buyers, transparent and honest advice even when recommending not to buy, curated property selection focused on quality over quantity, full-service support from search through post-purchase, trusted relationships with property lawyers and developers, and ongoing commitment to client success beyond the transaction.',
    keywords: ['best real estate company erbil', 'top property agents erbil', 'real house erbil']
  },
  {
    question: 'What is the Erbil property market forecast for 2025?',
    answer: 'The Erbil property market in 2025 shows stable fundamentals: rental yields of 6-10% in prime locations, 5-10% annual appreciation expected in quality properties, continued demand from diplomatic and corporate tenants, new developments adding modern inventory, and off-plan opportunities with competitive pricing. Market supported by economic diversification efforts and infrastructure investment. While not a boom market, Erbil offers steady returns for investors focused on quality properties with long-term horizons.',
    keywords: ['erbil property market 2025', 'erbil real estate forecast', 'kurdistan housing market 2025']
  }
];

// Renting FAQs
export const rentingFAQs: FAQ[] = [
  {
    question: 'What is the rental market like in Erbil?',
    answer: 'Erbil\'s rental market is active and diverse: Strong Demand - From expats, companies, and local professionals. Premium Rents - International-standard properties command higher rates. Furnished Popular - Many tenants prefer move-in ready units. Typical Terms - 12-month leases standard, flexible options available. Rent Payment - Usually annual or semi-annual upfront. Yields - 6-10% residential, 8-14% commercial. Real House has extensive rental inventory and tenant network.',
    keywords: ['erbil rental market', 'renting in erbil', 'erbil rent prices']
  },
  {
    question: 'How much are rental prices in Erbil?',
    answer: 'Monthly rental ranges by property type: Studio/1-bed apartment: $400-800. 2-bedroom apartment: $600-1,200. 3-bedroom apartment: $800-1,800. Villas: $1,200-3,500. Penthouses: $1,500-4,000. Prices vary by location, furnishing, and amenities. Premium areas like Dream City and Gulan command higher rents. Real House helps you find rental properties within your budget.',
    keywords: ['rental prices erbil', 'how much rent erbil', 'apartment rent kurdistan']
  },
  {
    question: 'What should I know about renting out my property in Erbil?',
    answer: 'Key considerations for landlords: Tenant Selection - Screen carefully, verify employment and references. Lease Agreement - Clear terms on rent, duration, maintenance, and termination. Rent Collection - Establish clear payment schedule and method. Property Condition - Document with photos before and after tenancy. Maintenance - Define landlord vs tenant responsibilities. Legal Compliance - Ensure proper registration and tax compliance. Real House property management handles all these aspects for you.',
    keywords: ['renting out property erbil', 'landlord tips erbil', 'property rental management']
  },
  {
    question: 'Is it better to rent or buy in Erbil?',
    answer: 'The decision depends on your situation: Buy if: Long-term residency planned (3+ years), investment goals, building equity priority, stable income. Rent if: Short-term stay, testing areas before committing, flexibility needed, limited upfront capital. Financial comparison: Buying builds equity but requires larger initial investment. Renting offers flexibility but no asset accumulation. Real House can model scenarios for your specific situation.',
    keywords: ['rent or buy erbil', 'should i buy or rent kurdistan']
  },
  {
    question: 'How do I find tenants for my property in Erbil?',
    answer: 'Tenant finding strategies: Real House Listing - We market to our extensive client database. Online Platforms - Property listed on major websites. Corporate Connections - We work with companies seeking staff housing. Expat Networks - Reaching international community. Referrals - Our tenant network often refers others. Key success factors: Competitive pricing, good property condition, responsive management. Our average time to tenant is under 30 days.',
    keywords: ['find tenants erbil', 'rent out property quickly', 'tenant finding kurdistan']
  },
  {
    question: 'What is a typical rental lease in Erbil?',
    answer: 'Standard lease terms in Erbil: Duration: 12 months is standard, 6-month and 2-year options available. Payment: Annual or semi-annual upfront common, monthly rare for long-term. Deposit: 1-2 months rent as security deposit. Notice: 1-2 months notice for termination. Inclusions: Clarify what is covered (furnished, utilities, maintenance). Renewal: Automatic renewal terms or renegotiation. Real House provides standard lease templates and legal review for our managed properties.',
    keywords: ['rental lease erbil', 'rental agreement kurdistan', 'lease terms iraq']
  },
  {
    question: 'Can foreigners rent property in Erbil?',
    answer: 'Yes, foreigners can easily rent property in Erbil. Requirements: Valid passport. Entry visa or residence permit. Employment or business verification for some properties. Security deposit (1-2 months). Rental payment upfront (typically 6-12 months). The process is straightforward and foreigners make up a significant portion of the rental market. Real House has extensive experience helping international tenants find suitable accommodation.',
    keywords: ['foreigners rent erbil', 'expat rental erbil', 'international tenant kurdistan']
  },
  {
    question: 'What are the best areas to rent in Erbil?',
    answer: 'Best rental areas depend on your priorities: Dream City - Best for families, international schools, safety, premium amenities. Gulan - Central business location, modern towers, professional tenants. Ankawa - Vibrant social scene, restaurants, cultural activities. Italian Village - Quiet family community, Mediterranean style. Empire World - New development, modern facilities. Considerations: Proximity to work, school access, security requirements, budget, lifestyle preferences.',
    keywords: ['best areas rent erbil', 'where to rent erbil', 'rental neighborhoods kurdistan']
  },
  {
    question: 'What is included in furnished rentals in Erbil?',
    answer: 'Furnished rentals in Erbil typically include: Basic furniture (beds, sofas, dining set, wardrobes). Kitchen appliances (refrigerator, stove, microwave). Air conditioning units. Water heater. Some include: Washing machine, dishwasher, TV, internet. Usually not included: Linens, kitchenware, personal items. Premium furnished units may include: Full kitchen equipment, bedding, towels, premium appliances. Clarify exact inclusions before signing lease.',
    keywords: ['furnished rental erbil', 'what included furnished apartment', 'furnished vs unfurnished']
  }
];

// Selling FAQs
export const sellingFAQs: FAQ[] = [
  {
    question: 'How do I sell my property in Erbil?',
    answer: 'Steps to sell your property: 1) Contact Real House for free valuation. 2) Sign listing agreement with competitive commission. 3) Professional photography and marketing preparation. 4) Property listed on our platform and networks. 5) Buyer inquiries handled and viewings arranged. 6) Offer negotiation with your approval. 7) Contract preparation and signing. 8) Registration transfer at Tabu office. 9) Payment receipt and key handover. We guide you through every step.',
    keywords: ['how to sell property erbil', 'selling property kurdistan', 'list property for sale erbil']
  },
  {
    question: 'How long does it take to sell a property in Erbil?',
    answer: 'Average selling times: Well-priced apartments: 1-3 months. Villas and larger properties: 2-6 months. Commercial properties: 3-12 months. Factors affecting time: Pricing accuracy, property condition, location desirability, market conditions, marketing quality. Real House properties typically sell faster than market average due to our marketing reach and qualified buyer network.',
    keywords: ['how long to sell property erbil', 'property selling time kurdistan']
  },
  {
    question: 'What is my property worth in Erbil?',
    answer: 'Property value depends on: Location - District, specific street, proximity to amenities. Size - Square meters and room count. Condition - Age, maintenance, recent upgrades. Features - Parking, garden, view, security. Market Conditions - Supply, demand, economic factors. Comparable Sales - Recent transactions for similar properties. Real House provides free, no-obligation property valuations using comprehensive market analysis.',
    keywords: ['property valuation erbil', 'how much is my property worth', 'erbil property appraisal']
  },
  {
    question: 'What fees are involved in selling a property in Erbil?',
    answer: 'Typical selling costs: Agency Commission - Competitive rates, discussed upfront. Legal Fees - If using attorney, 0.5-1% of value. Registration Transfer - Typically split with buyer or negotiated. Capital Gains Tax - Currently minimal in Kurdistan. Marketing Costs - Usually included in agency services. Total selling costs typically range from 3-6% of sale price. Real House provides transparent fee structure before you commit.',
    keywords: ['selling fees property erbil', 'cost to sell property iraq', 'real estate commission kurdistan']
  },
  {
    question: 'Should I renovate before selling my property?',
    answer: 'Renovation considerations: Worth Doing: Fresh paint, minor repairs, deep cleaning, landscaping - high ROI. Consider Carefully: Kitchen/bathroom updates - depending on condition and market. Usually Not Worth It: Major structural changes, luxury additions for mid-range properties. Key principle: Make the property presentable and fix obvious issues, but avoid over-investing. Real House advises on improvements that genuinely increase sale value.',
    keywords: ['renovate before selling erbil', 'property improvements to sell']
  },
  {
    question: 'How do I price my property correctly in Erbil?',
    answer: 'Correct pricing is crucial for a successful sale. Key factors: Comparable sales - What similar properties sold for recently. Current market conditions - Supply and demand balance. Location advantages or disadvantages. Property condition and age. Unique features and upgrades. Urgency of sale. Avoid overpricing which leads to stale listings, or underpricing which loses value. Real House provides professional comparative market analysis (CMA) free of charge to determine optimal listing price.',
    keywords: ['price my property erbil', 'property pricing strategy', 'how much to sell house for']
  },
  {
    question: 'What marketing does Real House provide for sellers?',
    answer: 'Our comprehensive marketing package includes: Professional photography with wide-angle lenses. 4K video tours showcasing every room. Virtual 3D walkthrough experience. Featured listing on Real House website. Syndication to major property portals. Social media promotion to targeted audiences. Email marketing to qualified buyer database. Agent network sharing across our partner offices. Premium listings with highlight features. Analytics and feedback reports on buyer interest.',
    keywords: ['property marketing erbil', 'sell property marketing', 'real house marketing services']
  },
  {
    question: 'Can I sell my property if I live abroad?',
    answer: 'Yes, international sellers can successfully sell property in Erbil. Process includes: Grant Power of Attorney to trusted representative or Real House. Remote document signing via notarized courier or digital platforms. Virtual consultation and approval for offers. Secure international payment transfer to your account. Real House handles: Viewings, negotiations, and buyer communications. Marketing and photography coordination. Legal paperwork and registration process. We represent numerous international sellers annually.',
    keywords: ['sell property abroad erbil', 'international seller iraq', 'sell property remotely']
  },
  {
    question: 'How do I handle multiple offers on my property?',
    answer: 'When receiving multiple offers: Review all offers comprehensively - not just price but terms, timeline, and buyer qualification. Consider buyer financing status - cash buyers are more reliable. Evaluate contingencies and conditions. Request best and final offers from serious buyers. Consider backup offers in case primary falls through. Real House guides you through offer comparison, helps you negotiate effectively, and protects your interests throughout the decision process.',
    keywords: ['multiple offers property erbil', 'negotiate best offer', 'choose buyer property sale']
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// NEW: Comparison & Market Analysis FAQs (Competitor Keywords)
// ═══════════════════════════════════════════════════════════════════════════

export const comparisonFAQs: FAQ[] = [
  {
    question: 'How do Erbil and Baghdad property prices compare?',
    answer: 'Erbil and Baghdad property prices are relatively comparable in premium areas. Erbil premium apartments: $1,200-2,000 per sqm. Baghdad premium areas (Mansour, Karrada): $1,000-1,800 per sqm. However, Erbil offers significantly better value when considering: foreign ownership accessibility, security, market transparency, and rental demand. Erbil is strongly preferred for foreign investors despite similar price points because of superior investment conditions and legal clarity.',
    keywords: ['erbil vs baghdad property prices', 'compare erbil baghdad prices', 'baghdad real estate prices']
  },
  {
    question: 'How does Sulaymaniyah compare to Erbil for real estate?',
    answer: 'Sulaymaniyah property prices are typically 15-25% lower than Erbil. Sulaymaniyah premium apartments: $900-1,500 per sqm. Erbil premium apartments: $1,200-2,000 per sqm. Erbil offers: larger market, more property options, stronger international demand, better infrastructure. Sulaymaniyah offers: lower prices, university demand, cultural appeal. Most investors should prioritize Erbil for first investments, with Sulaymaniyah as a secondary market for diversification.',
    keywords: ['sulaymaniyah vs erbil real estate', 'compare sulaymaniyah erbil', 'sulaymaniyah property prices']
  },
  {
    question: 'What is the best city to invest in Iraq for property?',
    answer: 'Erbil is the best city to invest in Iraq for property. Ranking by investment criteria: 1) Erbil - best for foreign ownership, security, market maturity, rental demand; 2) Sulaymaniyah - lower prices, university market, good stability; 3) Duhok - smaller but growing, tourism potential; 4) Baghdad - large market but foreign ownership restricted; 5) Basra - oil sector niche but limited foreign access. For accessible, secure investment, Erbil should be the primary focus.',
    keywords: ['best city invest iraq', 'best iraqi city property', 'iraq city comparison']
  },
  {
    question: 'How does Kurdistan compare to Dubai for property investment?',
    answer: 'Kurdistan vs Dubai property investment comparison: Kurdistan offers higher rental yields (6-10% vs 3-5%), lower entry prices ($1,500/sqm vs $4,000+/sqm), and growth potential in developing market. Dubai offers: established market, high liquidity, proven track record, global recognition. Kurdistan is better for yield-focused investors willing to accept less liquidity. Dubai is better for investors prioritizing liquidity and established market conditions.',
    keywords: ['kurdistan vs dubai property', 'compare kurdistan dubai investment', 'middle east property markets']
  },
  {
    question: 'How does Kurdistan compare to Turkey for real estate investment?',
    answer: 'Kurdistan vs Turkey real estate comparison: Kurdistan offers simpler foreign ownership (no restrictions vs citizenship requirements in Turkey), higher rental yields, lower prices in similar quality. Turkey offers: larger market, citizenship-by-investment program, more developed tourism. Kurdistan is better for straightforward investment with higher yields. Turkey offers citizenship benefits and larger market scale. Both have currency considerations (USD common in Kurdistan, TRY fluctuations in Turkey).',
    keywords: ['kurdistan vs turkey real estate', 'compare kurdistan turkey property', 'middle east turkey investment']
  },
  {
    question: 'Why is Erbil considered the safest investment location in Iraq?',
    answer: 'Erbil is the safest investment location in Iraq due to: robust security infrastructure maintained by regional forces, 40+ foreign consulates demonstrating international confidence, large expatriate community living safely, international companies operating openly, maintained stability through regional conflicts, low crime rates, functioning legal and business systems, and a welcoming environment for foreign investors. These factors combine to make Erbil the only viable option for most foreign property investors in Iraq.',
    keywords: ['erbil safest iraq', 'safe investment iraq', 'erbil security investment']
  },
  {
    question: 'What are the pros and cons of investing in Kurdistan vs other Iraqi regions?',
    answer: 'Kurdistan pros: foreign ownership allowed, high security, transparent market, modern properties, strong rental demand, professional services. Kurdistan cons: smaller market than Baghdad, oil-dependent economy, emerging market characteristics. Other Iraqi regions pros: larger markets, potentially lower prices. Cons: foreign ownership restricted, security concerns, less transparency, limited professional services. For foreign investors, Kurdistan is clearly preferred despite smaller market size.',
    keywords: ['kurdistan vs iraq investment', 'pros cons kurdistan property', 'kurdistan iraq comparison']
  },
  {
    question: 'How do rental yields in Erbil compare to other markets?',
    answer: 'Erbil rental yields compare favorably to major markets: Erbil premium residential: 6-10% gross. Dubai: 3-5%. London: 2-4%. Istanbul: 4-6%. Riyadh: 4-6%. Cairo: 5-8%. Erbil achieves higher yields due to strong international tenant demand (diplomatic, corporate), competitive property prices, and limited new supply in premium segments. While liquidity is lower than mature markets, yield-focused investors find Erbil attractive.',
    keywords: ['erbil rental yields comparison', 'erbil vs other markets yields', 'compare rental returns']
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// FAQ Categories Export
// ═══════════════════════════════════════════════════════════════════════════

export const faqCategories: FAQCategory[] = [
  {
    id: 'buying',
    title: 'Buying Property',
    description: 'Everything you need to know about purchasing property in Erbil, Kurdistan',
    icon: 'home',
    faqs: buyingFAQs
  },
  {
    id: 'prices',
    title: 'Prices & Costs',
    description: 'Property prices, fees, and financial considerations in Erbil',
    icon: 'dollar',
    faqs: pricesFAQs
  },
  {
    id: 'legal',
    title: 'Legal Requirements',
    description: 'Legal aspects of property ownership for locals and foreigners',
    icon: 'document',
    faqs: legalFAQs
  },
  {
    id: 'neighborhoods',
    title: 'Neighborhoods & Areas',
    description: 'Guide to Erbil\'s districts and residential areas',
    icon: 'map',
    faqs: neighborhoodsFAQs
  },
  {
    id: 'property-types',
    title: 'Property Types',
    description: 'Understanding different property options in Erbil',
    icon: 'building',
    faqs: propertyTypesFAQs
  },
  {
    id: 'financing',
    title: 'Financing Options',
    description: 'Payment methods, mortgages, and financial planning',
    icon: 'bank',
    faqs: financingFAQs
  },
  {
    id: 'services',
    title: 'Real House Services',
    description: 'How Real House can help with your real estate needs',
    icon: 'service',
    faqs: servicesFAQs
  },
  {
    id: 'process',
    title: 'Viewing & Purchase Process',
    description: 'Step-by-step guide to the buying process',
    icon: 'steps',
    faqs: processFAQs
  },
  {
    id: 'investment',
    title: 'Investment FAQs',
    description: 'Real estate investment guidance and opportunities',
    icon: 'chart',
    faqs: investmentFAQs
  },
  {
    id: 'renting',
    title: 'Renting FAQs',
    description: 'Information about renting properties in Erbil',
    icon: 'key',
    faqs: rentingFAQs
  },
  {
    id: 'selling',
    title: 'Selling FAQs',
    description: 'Guide to selling your property in Erbil',
    icon: 'sale',
    faqs: sellingFAQs
  },
  {
    id: 'comparison',
    title: 'Market Comparisons',
    description: 'Compare Erbil with other Iraqi cities and regional markets',
    icon: 'chart',
    faqs: comparisonFAQs
  }
];

// Get all FAQs combined
export function getAllFAQs(): FAQ[] {
  return faqCategories.flatMap(category => category.faqs);
}

// Get FAQs by category ID
export function getFAQsByCategory(categoryId: string): FAQ[] {
  const category = faqCategories.find(c => c.id === categoryId);
  return category ? category.faqs : [];
}

// Get featured FAQs for homepage (5 key questions)
export function getHomepageFAQs(): FAQ[] {
  return [
    buyingFAQs[0], // How to buy property in Erbil
    buyingFAQs[1], // Can foreigners buy property
    buyingFAQs[2], // Average property price
    investmentFAQs[0], // Is Erbil real estate good investment
    processFAQs[0] // How to schedule viewing
  ];
}

// Get about page FAQs
export function getAboutPageFAQs(): FAQ[] {
  return [
    servicesFAQs[0], // What services does Real House offer
    servicesFAQs[1], // Why choose Real House
    servicesFAQs[2], // Property management
    servicesFAQs[4]  // Relocation assistance
  ];
}

// Get contact page FAQs
export function getContactPageFAQs(): FAQ[] {
  return [
    processFAQs[0], // How to schedule viewing
    processFAQs[2], // How long does purchase take
    processFAQs[3], // What happens after offer
    buyingFAQs[7]   // Can I buy remotely
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// FAQ ACCORDION COMPONENT
// Reusable accordion for FAQ sections
// ═══════════════════════════════════════════════════════════════════════════

export function createFAQAccordion(faqs: FAQ[], containerClass: string = 'faq-accordion'): HTMLElement {
  const accordion = createElement('div', containerClass);
  accordion.setAttribute('role', 'presentation');

  const questionButtons: HTMLButtonElement[] = [];

  faqs.forEach((faq, index) => {
    const item = createElement('div', 'faq-item');
    item.setAttribute('data-faq-item', '');
    item.setAttribute('itemscope', '');
    item.setAttribute('itemprop', 'mainEntity');
    item.setAttribute('itemtype', 'https://schema.org/Question');

    const question = createElement('button', 'faq-item__question') as HTMLButtonElement;
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('data-faq-trigger', '');
    const answerId = `faq-answer-${containerClass}-${index}`;
    question.setAttribute('aria-controls', answerId);
    question.id = `faq-question-${containerClass}-${index}`;

    const questionText = createElement('span', 'faq-item__question-text', faq.question);
    questionText.setAttribute('itemprop', 'name');
    question.appendChild(questionText);

    const icon = createElement('span', 'faq-item__icon');
    icon.setAttribute('aria-hidden', 'true');
    // Plus icon using SVG
    const plusSvg = createSVG(['M12 5v14', 'M5 12h14']);
    icon.appendChild(plusSvg);
    question.appendChild(icon);

    const answer = createElement('div', 'faq-item__answer');
    answer.id = answerId;
    answer.setAttribute('data-faq-answer', '');
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-labelledby', question.id);
    answer.setAttribute('itemscope', '');
    answer.setAttribute('itemprop', 'acceptedAnswer');
    answer.setAttribute('itemtype', 'https://schema.org/Answer');

    const answerContent = createElement('div', 'faq-item__answer-content');
    const answerP = createElement('p', undefined, faq.answer);
    answerP.setAttribute('itemprop', 'text');
    answerContent.appendChild(answerP);
    answer.appendChild(answerContent);

    // Toggle function
    const toggleAccordion = (expand: boolean) => {
      // Close all other items in this accordion
      accordion.querySelectorAll('.faq-item').forEach(otherItem => {
        const otherQuestion = otherItem.querySelector('.faq-item__question');
        const otherAnswer = otherItem.querySelector('.faq-item__answer') as HTMLElement;
        if (otherQuestion && otherAnswer && otherQuestion !== question) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherAnswer.style.maxHeight = '0';
          otherItem.classList.remove('active');
        }
      });

      if (expand) {
        question.setAttribute('aria-expanded', 'true');
        (answer as HTMLElement).style.maxHeight = answer.scrollHeight + 'px';
        item.classList.add('active');
      } else {
        question.setAttribute('aria-expanded', 'false');
        (answer as HTMLElement).style.maxHeight = '0';
        item.classList.remove('active');
      }
    };

    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      toggleAccordion(!isExpanded);
    });

    // Keyboard navigation
    question.addEventListener('keydown', (e) => {
      const currentIndex = questionButtons.indexOf(question);
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < questionButtons.length - 1) {
            questionButtons[currentIndex + 1].focus();
          } else {
            questionButtons[0].focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            questionButtons[currentIndex - 1].focus();
          } else {
            questionButtons[questionButtons.length - 1].focus();
          }
          break;
        case 'Home':
          e.preventDefault();
          questionButtons[0].focus();
          break;
        case 'End':
          e.preventDefault();
          questionButtons[questionButtons.length - 1].focus();
          break;
      }
    });

    questionButtons.push(question);
    item.appendChild(question);
    item.appendChild(answer);
    accordion.appendChild(item);
  });

  return accordion;
}

// ═══════════════════════════════════════════════════════════════════════════
// FAQ PAGE SECTION COMPONENT
// Section with category title and accordion
// ═══════════════════════════════════════════════════════════════════════════

// Get SVG icon element for category
function getCategoryIcon(iconName: string): SVGSVGElement {
  const iconPaths: Record<string, string[]> = {
    home: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
    dollar: ['M12 1v22', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
    document: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8'],
    map: ['M1 6l7-4 8 4 7-4v18l-7 4-8-4-7 4z', 'M8 2v18', 'M16 6v18'],
    building: ['M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M9 6h.01', 'M15 6h.01', 'M9 10h.01', 'M15 10h.01', 'M9 14h.01', 'M15 14h.01', 'M9 18h6'],
    bank: ['M3 21h18', 'M3 10h18', 'M12 3l9 7H3l9-7z', 'M6 10v11', 'M10 10v11', 'M14 10v11', 'M18 10v11'],
    service: ['M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0'],
    steps: ['M9 11l3 3L22 4', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'],
    chart: ['M12 20V10', 'M18 20V4', 'M6 20v-4'],
    key: ['M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4'],
    sale: ['M19 5L5 19', 'M6.5 6.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0', 'M17.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0']
  };

  return createSVG(iconPaths[iconName] || iconPaths.home);
}

export function createFAQSection(category: FAQCategory): HTMLElement {
  const section = createElement('section', 'faq-section');
  section.id = `faq-${category.id}`;
  section.setAttribute('itemscope', '');
  section.setAttribute('itemtype', 'https://schema.org/FAQPage');

  const header = createElement('div', 'faq-section__header');

  const icon = createElement('span', 'faq-section__icon');
  icon.appendChild(getCategoryIcon(category.icon));
  header.appendChild(icon);

  const titleWrapper = createElement('div', 'faq-section__title-wrapper');
  const title = createElement('h2', 'faq-section__title', category.title);
  const description = createElement('p', 'faq-section__description', category.description);
  titleWrapper.appendChild(title);
  titleWrapper.appendChild(description);
  header.appendChild(titleWrapper);

  section.appendChild(header);
  section.appendChild(createFAQAccordion(category.faqs, `faq-accordion-${category.id}`));

  return section;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN FAQ PAGE RENDERER
// ═══════════════════════════════════════════════════════════════════════════

export function renderComprehensiveFAQPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const page = createElement('div', 'faq-page faq-page--comprehensive');
  const container = createElement('div', 'container');

  // Hero Header
  const header = createElement('div', 'faq-page__header');

  const title = createElement('h1', 'faq-page__title');
  title.textContent = 'Real Estate Erbil FAQ — ';
  const em = createElement('em', undefined, 'Property Erbil Questions');
  title.appendChild(em);
  header.appendChild(title);

  const subtitle = createElement('p', 'faq-page__subtitle', 'Find answers about houses for sale Erbil, apartments Erbil Iraq, villas Erbil Iraq, and luxury homes Kurdistan. Best real estate agent Erbil guidance to buy house Erbil in the Erbil property market. Real estate Kurdistan expertise.');
  header.appendChild(subtitle);

  // Search box
  const searchWrapper = createElement('div', 'faq-page__search');
  const searchIcon = createElement('span', 'faq-page__search-icon');
  searchIcon.appendChild(createSVG(['M11 11m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0', 'M21 21l-4.35-4.35']));
  searchWrapper.appendChild(searchIcon);

  const searchInput = createElement('input', 'faq-page__search-input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search FAQs...';
  searchInput.setAttribute('aria-label', 'Search frequently asked questions');
  searchWrapper.appendChild(searchInput);
  header.appendChild(searchWrapper);

  container.appendChild(header);

  // Category Navigation
  const nav = createElement('nav', 'faq-page__nav');
  nav.setAttribute('aria-label', 'FAQ Categories');

  const navList = createElement('ul', 'faq-page__nav-list');
  faqCategories.forEach(category => {
    const navItem = createElement('li', 'faq-page__nav-item');
    const navLink = createElement('a', 'faq-page__nav-link');
    navLink.href = `#faq-${category.id}`;
    navLink.textContent = category.title;
    navLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(`faq-${category.id}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    navItem.appendChild(navLink);
    navList.appendChild(navItem);
  });
  nav.appendChild(navList);
  container.appendChild(nav);

  // FAQ Count Badge
  const countBadge = createElement('div', 'faq-page__count');
  const totalFAQs = getAllFAQs().length;
  const countNumber = createElement('span', 'faq-page__count-number', `${totalFAQs}+`);
  const countText = createElement('span', 'faq-page__count-text', 'Questions Answered');
  countBadge.appendChild(countNumber);
  countBadge.appendChild(countText);
  container.appendChild(countBadge);

  // All FAQ Sections
  const sectionsWrapper = createElement('div', 'faq-page__sections');
  sectionsWrapper.id = 'faq-sections';

  faqCategories.forEach(category => {
    sectionsWrapper.appendChild(createFAQSection(category));
  });

  container.appendChild(sectionsWrapper);

  // Search functionality
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    const allItems = sectionsWrapper.querySelectorAll('.faq-item');
    const allSections = sectionsWrapper.querySelectorAll('.faq-section');

    if (query === '') {
      // Show all
      allItems.forEach(item => {
        (item as HTMLElement).style.display = '';
      });
      allSections.forEach(section => {
        (section as HTMLElement).style.display = '';
      });
      return;
    }

    // Filter items
    allItems.forEach(item => {
      const questionText = item.querySelector('.faq-item__question-text')?.textContent?.toLowerCase() || '';
      const answerText = item.querySelector('.faq-item__answer-content')?.textContent?.toLowerCase() || '';
      const matches = questionText.includes(query) || answerText.includes(query);
      (item as HTMLElement).style.display = matches ? '' : 'none';
    });

    // Hide sections with no visible items
    allSections.forEach(section => {
      const visibleItems = section.querySelectorAll('.faq-item:not([style*="display: none"])');
      (section as HTMLElement).style.display = visibleItems.length > 0 ? '' : 'none';
    });
  });

  // Contact CTA
  const cta = createElement('div', 'faq-page__cta');
  const ctaContent = createElement('div', 'faq-page__cta-content');

  const ctaTitle = createElement('h3', 'faq-page__cta-title', 'Still Have Questions?');
  const ctaText = createElement('p', 'faq-page__cta-text', 'Our expert team is ready to provide personalized assistance for your property needs in Erbil.');

  const ctaActions = createElement('div', 'faq-page__cta-actions');

  const ctaBtn = createElement('a', 'btn btn--primary', 'Contact Us');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');

  const ctaPhone = createElement('a', 'btn btn--outline faq-page__cta-phone', '+964 750 792 2138');
  ctaPhone.href = 'tel:+9647507922138';

  ctaActions.appendChild(ctaBtn);
  ctaActions.appendChild(ctaPhone);

  ctaContent.appendChild(ctaTitle);
  ctaContent.appendChild(ctaText);
  ctaContent.appendChild(ctaActions);
  cta.appendChild(ctaContent);
  container.appendChild(cta);

  page.appendChild(container);
  fragment.appendChild(page);

  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// INLINE FAQ COMPONENT FOR OTHER PAGES
// Smaller FAQ section to embed in other pages
// ═══════════════════════════════════════════════════════════════════════════

export function createInlineFAQSection(
  faqs: FAQ[],
  title: string = 'Frequently Asked Questions',
  showViewAll: boolean = true
): HTMLElement {
  const section = createElement('section', 'inline-faq');
  section.setAttribute('itemscope', '');
  section.setAttribute('itemtype', 'https://schema.org/FAQPage');

  const container = createElement('div', 'container');

  const header = createElement('div', 'inline-faq__header');
  const sectionTitle = createElement('h2', 'inline-faq__title', title);
  header.appendChild(sectionTitle);

  if (showViewAll) {
    const viewAllLink = createElement('a', 'inline-faq__view-all', 'View All FAQs');
    viewAllLink.href = '/faq';
    viewAllLink.setAttribute('data-route', '');
    const arrowSvg = createSVG(['M5 12h14', 'M12 5l7 7-7 7']);
    viewAllLink.appendChild(arrowSvg);
    header.appendChild(viewAllLink);
  }

  container.appendChild(header);
  container.appendChild(createFAQAccordion(faqs, 'inline-faq-accordion'));
  section.appendChild(container);

  return section;
}
