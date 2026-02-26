// =============================================================================
// i18n TYPES - Shared Type Definitions
// =============================================================================

/**
 * Supported language codes
 */
export type Language = 'en' | 'ar' | 'ckb';

/**
 * Text direction
 */
export type TextDirection = 'ltr' | 'rtl';

/**
 * Language information
 */
export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  dir: TextDirection;
  flag: string;
  hreflang: string;
}

/**
 * Core UI translation strings structure
 */
export interface CoreTranslations {
  nav: {
    home: string;
    properties: string;
    services: string;
    projects: string;
    resources: string;
    about: string;
    contact: string;
    blog: string;
    faq: string;
    favorites: string;
  };

  services: {
    all: string;
    sell: string;
    buy: string;
    management: string;
    valuation: string;
    investment: string;
    legal: string;
  };

  resources: {
    buyerGuide: string;
    investorGuide: string;
    renterGuide: string;
    marketReport: string;
  };

  buttons: {
    getInTouch: string;
    viewDetails: string;
    scheduleViewing: string;
    sendMessage: string;
    loadMore: string;
    viewAll: string;
    compare: string;
    addToCompare: string;
    removeFromCompare: string;
    addToFavorites: string;
    removeFromFavorites: string;
    search: string;
    filter: string;
    clearFilters: string;
    apply: string;
    cancel: string;
    submit: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    showMore: string;
    showLess: string;
    download: string;
    share: string;
    call: string;
    whatsapp: string;
    email: string;
  };

  forms: {
    name: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    subject: string;
    propertyType: string;
    priceRange: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    location: string;
    district: string;
    status: string;
    date: string;
    time: string;
    preferredContact: string;
    budget: string;
    comments: string;
    required: string;
    optional: string;
  };

  property: {
    forSale: string;
    forRent: string;
    offPlan: string;
    ready: string;
    underConstruction: string;
    price: string;
    priceOnRequest: string;
    perMonth: string;
    bedrooms: string;
    bathrooms: string;
    sqm: string;
    sqft: string;
    floor: string;
    yearBuilt: string;
    features: string;
    amenities: string;
    description: string;
    location: string;
    virtualTour: string;
    floorPlan: string;
    gallery: string;
    similarProperties: string;
    newListing: string;
    featured: string;
    exclusive: string;
    reduced: string;
    hot: string;
  };

  propertyTypes: {
    villa: string;
    apartment: string;
    penthouse: string;
    townhouse: string;
    duplex: string;
    commercial: string;
    land: string;
    office: string;
    retail: string;
  };

  common: {
    loading: string;
    error: string;
    noResults: string;
    viewAll: string;
    seeAll: string;
    moreInfo: string;
    learnMore: string;
    contactUs: string;
    getStarted: string;
    readMore: string;
    exploreMore: string;
    discoverMore: string;
    findYourHome: string;
    startSearch: string;
    ourServices: string;
    ourProjects: string;
    ourTeam: string;
    whyChooseUs: string;
    testimonials: string;
    successStories: string;
    latestNews: string;
    recentPosts: string;
    subscribe: string;
    newsletter: string;
    followUs: string;
    stayConnected: string;
    quickLinks: string;
    usefulLinks: string;
    propertyTypes: string;
    popularLocations: string;
    resourceCenter: string;
    helpCenter: string;
    privacyPolicy: string;
    termsOfService: string;
    sitemap: string;
    copyright: string;
    allRightsReserved: string;
    erbilKurdistanIraq: string;
  };

  footer: {
    realHouse: string;
    tagline: string;
    followUsOn: string;
    quickLinks: string;
    propertyTypes: string;
    browseProperties: string;
    popularLocations: string;
    resources: string;
    connectWithUs: string;
    copyright: string;
    allRightsReserved: string;
    featuredProjects: string;
    recentArticles: string;
    home: string;
    allProperties: string;
    developmentProjects: string;
    realEstateBlog: string;
    aboutUs: string;
    contactUs: string;
    faq: string;
    siteMap: string;
    apartmentsForSale: string;
    villasInErbil: string;
    penthouses: string;
    townhouses: string;
    commercialProperties: string;
    duplexApartments: string;
    landForSale: string;
    propertiesForSale: string;
    propertiesForRent: string;
    investmentProperties: string;
    luxuryProperties: string;
    newListings: string;
    hotDeals: string;
    compareProperties: string;
    propertiesInGulan: string;
    propertiesInDreamCity: string;
    propertiesInAnkawa: string;
    italianVillageHomes: string;
    englishVillageHomes: string;
    empireWorldProperties: string;
  };

  internalLinks: {
    youMayAlsoLike: string;
    viewAllArticles: string;
    popularProperties: string;
    featuredProjects: string;
    recentArticles: string;
    quickLinks: string;
    exploreRelatedProperties: string;
    viewAllProperties: string;
    viewAllProjects: string;
    youMightAlsoBeInterestedIn: string;
    explorePropertiesByLocation: string;
    properties: string;
    contactForPrice: string;
    minRead: string;
    // Sitemap links
    home: string;
    propertiesPage: string;
    projects: string;
    blog: string;
    about: string;
    contact: string;
    faq: string;
    gallery: string;
    servicesPage: string;
    locations: string;
    buy: string;
    rent: string;
    invest: string;
    luxury: string;
    privacyPolicy: string;
    termsOfService: string;
    sitemap: string;
    // Quick nav
    forSale: string;
    forRent: string;
    // Sidebar quick links
    propertiesForSale: string;
    propertiesForRent: string;
    investmentProperties: string;
    luxuryProperties: string;
    allProjects: string;
    contactUs: string;
  };

  breadcrumbs: {
    home: string;
    properties: string;
    propertiesForSaleRent: string;
    developmentProjectsErbil: string;
    projects: string;
    realEstateBlog: string;
    blog: string;
    aboutRealHouse: string;
    contactUs: string;
    faq: string;
    mySavedProperties: string;
    compareProperties: string;
    privacyPolicy: string;
    termsOfService: string;
    sitemap: string;
    propertiesForSaleErbil: string;
    propertiesForRentErbil: string;
    investmentPropertiesErbil: string;
    luxuryPropertiesErbil: string;
    ourServices: string;
    services: string;
    locations: string;
    photoGallery: string;
  };

  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };

  about: {
    title: string;
    subtitle: string;
    ourStory: string;
    ourMission: string;
    ourVision: string;
    ourValues: string;
    meetTheTeam: string;
    experience: string;
    yearsExperience: string;
    propertiesSold: string;
    propertiesSoldDesc: string;
    happyClients: string;
    happyClientsDesc: string;
    internationalClients: string;
    internationalClientsDesc: string;
    transactionVolume: string;
    transactionVolumeDesc: string;
    clientSatisfaction: string;
    clientSatisfactionDesc: string;
    repeatClients: string;
    repeatClientsDesc: string;
    awardsWon: string;
    ourJourney: string;
    journeySubtitle: string;
    expertTeam: string;
    consultants: string;
    teamSubtitle: string;
    coFounder: string;
    yearsExp: string;
    sales: string;
    languages: string;
    credentials: string;
    recognition: string;
    recognitionSubtitle: string;
    inThe: string;
    media: string;
    mediaSubtitle: string;
    professional: string;
    affiliations: string;
    affiliationsSubtitle: string;
    memberSince: string;
    licensesAnd: string;
    certifications: string;
    certificationsSubtitle: string;
    license: string;
    validUntil: string;
    client: string;
    testimonials: string;
    verifiedBuyer: string;
    successStories: string;
    storiesSubtitle: string;
    challenge: string;
    outcome: string;
    resourceCenter: string;
    resourceCenterSubtitle: string;
    pages: string;
    updated: string;
    downloadFree: string;
    contactUs: string;
    contactSubtitle: string;
    viewOnMap: string;
    officeHours: string;
    getInTouch: string;
    followUs: string;
    responseCommitment: string;
    ctaTitle: string;
    ctaSubtitle: string;
    browseProperties: string;
    ourServices: string;
    professionalServices: string;
  };

  contact: {
    title: string;
    subtitle: string;
    getInTouch: string;
    visitUs: string;
    callUs: string;
    emailUs: string;
    workingHours: string;
    sendMessage: string;
    messageSent: string;
    messageError: string;
  };

  languages: {
    en: string;
    ar: string;
    ckb: string;
  };

  a11y: {
    skipToContent: string;
    skipToNavigation: string;
    skipToFooter: string;
    toggleMenu: string;
    toggleTheme: string;
    openMenu: string;
    closeMenu: string;
    selectLanguage: string;
    currentLanguage: string;
  };

  map: {
    bedsShort: string;
    bathsShort: string;
    viewProperty: string;
    propertyIn: string;
  };

  filters: {
    viewMode: string;
    grid: string;
    list: string;
    map: string;
    viewAsGrid: string;
    viewAsList: string;
    viewOnMap: string;
    all: string;
    any: string;
    bedrooms: string;
    status: string;
    advancedFilters: string;
    priceRange: string;
    priceRangeUSD: string;
    areaSqm: string;
    yearBuilt: string;
    district: string;
    allDistricts: string;
    furnishingStatus: string;
    anyFurnishing: string;
    fullyFurnished: string;
    semiFurnished: string;
    unfurnished: string;
    viewType: string;
    anyView: string;
    cityView: string;
    gardenView: string;
    poolView: string;
    streetView: string;
    mountainView: string;
    parkView: string;
    numberOfFloors: string;
    propertyFeatures: string;
    centralAC: string;
    balcony: string;
    parking: string;
    security: string;
    pool: string;
    gym: string;
    garden: string;
    elevator: string;
    smartHome: string;
    maidsRoom: string;
    storage: string;
    petFriendly: string;
    propertyBadges: string;
    hot: string;
    new: string;
    exclusive: string;
    discount: string;
    installment: string;
    clearAllFilters: string;
    resetAdvancedFilters: string;
    propertiesFound: string;
    noPropertiesFound: string;
    tryAdjustingFilters: string;
    min: string;
    max: string;
    to: string;
    dailyRent: string;
  };

  cta: {
    needHelpFinding: string;
    ourExpertsHelp: string;
    contactOurExperts: string;
    viewDevelopmentProjects: string;
  };

  mortgage: {
    title: string;
    propertyPrice: string;
    downPayment: string;
    loanAmount: string;
    loanTerm: string;
    interestRate: string;
    interestRateShort: string;
    monthlyPayment: string;
    totalPayment: string;
    totalInterest: string;
    calculate: string;
    recalculate: string;
    print: string;
    reset: string;
    loanSummary: string;
    amortizationSchedule: string;
    yearlyAmortization: string;
    monthly: string;
    yearly: string;
    year: string;
    month: string;
    principal: string;
    interest: string;
    balance: string;
    years: string;
    perAnnum: string;
    downPaymentError: string;
    showAllMonths: string;
    typicalRates: string;
    resultsTitle: string;
    pageTitle: string;
    generatedOn: string;
    disclaimer: string;
    poweredBy: string;
    contactForPrice: string;
  };

  servicesPage: {
    heroTitle: string;
    heroBadge: string;
    heroSubtitle: string;
    whyChooseTitle: string;
    whyChooseSubtitle: string;
    testimonialsTitle: string;
    ctaTitle: string;
    ctaText: string;
    viewProperties: string;
    viewAllServices: string;
    serviceNotFound: string;
    serviceNotFoundText: string;
    serviceFeatures: string;
    howItWorks: string;
    keyBenefits: string;
    relatedServices: string;
    featuredProperties: string;
    viewAllProperties: string;
    whatClientsSay: string;
    readyToStart: string;
    contactForAssistance: string;
    propertiesListed: string;
    happyClients: string;
    yearsExperience: string;
    clientSatisfaction: string;
  };

  faqPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    searchAriaLabel: string;
    questionsAnswered: string;
    stillHaveQuestions: string;
    expertTeamReady: string;
    viewAllFaqs: string;
  };

  share: {
    share: string;
    shareThis: string;
    shareOptions: string;
    openShareMenu: string;
    shareOnFacebook: string;
    shareOnTwitter: string;
    shareOnLinkedIn: string;
    shareOnPinterest: string;
    shareOnWhatsApp: string;
    shareOnTelegram: string;
    copyLink: string;
    linkCopied: string;
    separator: string;
    whatsApp: string;
    email: string;
    // Platform names
    platforms: {
      facebook: string;
      x: string;
      linkedin: string;
      pinterest: string;
      telegram: string;
    };
  };

  testimonials: {
    verifiedBuyer: string;
    verified: string;
    watchVideo: string;
  };

  errors: {
    pageNotFound: string;
    serviceNotFound: string;
    propertyNotFound: string;
    goBack: string;
    backToHome: string;
  };

  calendar: {
    months: {
      january: string;
      february: string;
      march: string;
      april: string;
      may: string;
      june: string;
      july: string;
      august: string;
      september: string;
      october: string;
      november: string;
      december: string;
    };
    days: {
      sun: string;
      mon: string;
      tue: string;
      wed: string;
      thu: string;
      fri: string;
      sat: string;
      sunday: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
    };
    time: {
      am: string;
      pm: string;
    };
  };

  appointment: {
    scheduleViewing: string;
    closeModal: string;
    selectDate: string;
    selectTime: string;
    yourDetails: string;
    continue: string;
    back: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    notesOptional: string;
    confirmAppointment: string;
    appointmentConfirmed: string;
    confirmationNote: string;
    done: string;
    date: string;
    time: string;
    property: string;
    previousMonth: string;
    nextMonth: string;
    fillAllFields: string;
    invalidEmail: string;
    invalidPhone: string;
    selectDateTime: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    notesPlaceholder: string;
  };

  modals: {
    videoTour: string;
    propertyVideoTour: string;
    clickToWatch: string;
    closeVideo: string;
    playVideoTour: string;
    watchVideoTour: string;
    floorPlan: string;
    samplePlan: string;
    zoomIn: string;
    zoomOut: string;
    resetView: string;
    downloadPdf: string;
    toggleFullscreen: string;
    closeFloorPlan: string;
    loadingFloorPlan: string;
    floorPlanInstructions: string;
    virtualTour: string;
    demoTour: string;
    closeVirtualTour: string;
    loading3DTour: string;
    virtualTourInstructions: string;
  };

  leadCapture: {
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    emailAriaLabel: string;
    subscribe: string;
    subscribing: string;
    subscribed: string;
    enterEmail: string;
    invalidEmail: string;
    successMessage: string;
    privacyNote: string;
    scheduleConsultation: string;
    scheduleConsultationAria: string;
  };

  inquiry: {
    quickInquiry: string;
    closeForm: string;
    fullName: string;
    enterFullName: string;
    phoneNumber: string;
    phonePlaceholder: string;
    emailAddress: string;
    emailPlaceholder: string;
    message: string;
    optional: string;
    messagePlaceholder: string;
    preferredContact: string;
    phoneCall: string;
    whatsapp: string;
    email: string;
    sendInquiry: string;
    contactViaWhatsApp: string;
    callNow: string;
    callUsDirectly: string;
    inquirySent: string;
    thankYouMessage: string;
    continueOnWhatsApp: string;
    close: string;
    somethingWentWrong: string;
    tryAgainMessage: string;
    tryAgain: string;
    tooManyAttempts: string;
    sessionExpired: string;
    inquire: string;
    getInfo: string;
    invalidName: string;
    invalidPhone: string;
    invalidEmailAddress: string;
    fieldRequired: string;
    enterValidEmail: string;
    enterValidPhone: string;
  };

  agentsPage: {
    title: string;
    subtitle: string;
    breadcrumbAgents: string;
    leadership: string;
    yearsExp: string;
    propertiesSold: string;
    languages: string;
    viewProfile: string;
    specialization: string;
    allSpecializations: string;
    luxuryVillas: string;
    investment: string;
    commercial: string;
    penthousesApartments: string;
    newDevelopments: string;
    sortBy: string;
    experienceHighToLow: string;
    propertiesSoldSort: string;
    nameAZ: string;
    expertAgents: string;
    totalSales: string;
    avgYearsExperience: string;
    leadershipTeam: string;
    propertyConsultants: string;
    ctaTitle: string;
    ctaText: string;
  };

  agentProfile: {
    // Breadcrumbs
    home: string;
    ourAgents: string;
    // 404
    agentNotFound: string;
    agentNotFoundMessage: string;
    viewAllAgents: string;
    // Badge
    leadership: string;
    // Stats
    yearsExperience: string;
    propertiesSold: string;
    totalSales: string;
    activeListings: string;
    yearsWithRealHouse: string;
    languagesSpoken: string;
    // Labels
    languages: string;
    // Buttons
    callNow: string;
    whatsApp: string;
    email: string;
    sendMessage: string;
    backToAllAgents: string;
    viewAllProperties: string;
    // Section titles
    about: string;
    specializations: string;
    featuredAreas: string;
    certificationsAwards: string;
    certifications: string;
    awards: string;
    clientReviews: string;
    listings: string;
    contactInformation: string;
    connectOnSocialMedia: string;
    performanceStats: string;
    // Social
    linkedin: string;
    instagram: string;
    facebook: string;
    // Form
    yourName: string;
    enterYourName: string;
    phoneNumber: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    // Rating
    outOf5: string;
    reviews: string;
    // Property
    priceOnRequest: string;
    beds: string;
    baths: string;
  };

  projectsPage: {
    title: string;
    titleEmphasis: string;
    subtitle: string;
    construction: string;
    constructionMilestones: string;
    complete: string;
    all: string;
    ready: string;
    underConstruction: string;
    comingSoon: string;
    totalUnits: string;
    priceRange: string;
    viewProject: string;
    status: string;
    ctaTitle: string;
    ctaText: string;
    contactOurTeam: string;
    browseProperties: string;
    noProjectsFound: string;
    tryDifferentFilter: string;
    projectNotFound: string;
    projectNotFoundMessage: string;
    browseAllProjects: string;
    projectOverview: string;
    constructionProgress: string;
    keyMilestones: string;
    aboutThisProject: string;
    amenitiesFeatures: string;
    interestedInProject: string;
    contactForUnits: string;
    callUs: string;
    whatsappUs: string;
    location: string;
    shareThisProject: string;
    lookingForSimilar: string;
    browseCollection: string;
    viewAllProperties: string;
    backToProjects: string;
    completion: string;
  };

  propertyDetail: {
    propertyNotFound: string;
    propertyNotFoundMessage: string;
    browseAllProperties: string;
    share: string;
    monthlyRent: string;
    askingPrice: string;
    propertyDetails: string;
    description: string;
    featuresAmenities: string;
    location: string;
    clickToViewMap: string;
    mapUponRequest: string;
    interestedInProperty: string;
    contactForInfo: string;
    sendInquiry: string;
    yourName: string;
    emailAddress: string;
    phoneNumber: string;
    message: string;
    listedBy: string;
    realEstateAgent: string;
    viewProfile: string;
    similarProperties: string;
    viewAllProperties: string;
    // Categories
    categories: {
      interior: string;
      exterior: string;
      security: string;
      amenities: string;
      other: string;
    };
    // Specs
    bedrooms: string;
    bathrooms: string;
    area: string;
    type: string;
    yearBuilt: string;
    floors: string;
    // Contact
    callNow: string;
    whatsApp: string;
    // Form placeholders
    enterYourName: string;
    enterYourEmail: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    thankYouMessage: string;
  };

  recentlyViewed: {
    title: string;
    subtitle: string;
    clearHistory: string;
    label: string;
  };

  trustSignals: {
    trustedByPrefix: string;
    trustedByEmphasis: string;
    trustedBySuffix: string;
    developerSubtitle: string;
    meetOurPrefix: string;
    meetOurEmphasis: string;
    meetOurSuffix: string;
    teamSubtitle: string;
  };

  print: {
    officeAddress: string;
    licensedAgency: string;
    propertyReference: string;
    generated: string;
    disclaimer: string;
    viewOnline: string;
    qrCodeAlt: string;
    printAriaLabel: string;
    printPdf: string;
    downloadAriaLabel: string;
    downloadPdf: string;
  };

  projectCompare: {
    compareProjects: string;
    clearAll: string;
    removeFromComparison: string;
    addProject: string;
    addToComparison: string;
    compare: string;
    maxProjectsMessage: string;
    viewDetails: string;
    pricing: string;
    startingFrom: string;
    maximumPrice: string;
    priceRange: string;
    unitsAvailability: string;
    totalUnits: string;
    projectDetails: string;
    status: string;
    completion: string;
    district: string;
    city: string;
    amenitiesFeatures: string;
    totalAmenities: string;
    features: string;
    noProjects: string;
    emptyStateDescription: string;
    browseProjects: string;
    shareComparison: string;
    copyLink: string;
    copied: string;
    bestValue: string;
    best: string;
  };

  compareProjects: {
    // Breadcrumbs
    home: string;
    projects: string;
    compareProjects: string;
    // Title
    compareDevelopmentProjects: string;
    comparingProjects: string;
    compareUpTo3: string;
    // Buttons
    clearAll: string;
    contactOurTeam: string;
    browseMoreProjects: string;
    backToProjects: string;
    // CTA
    needHelpDeciding: string;
    expertHelpText: string;
  };

  projectInquiry: {
    whatsAppGreeting: string;
    whatsAppInterested: string;
    whatsAppName: string;
    whatsAppPhone: string;
    whatsAppEmail: string;
    whatsAppMessage: string;
    whatsAppContactMe: string;
    formDescription: string;
  };

  blog: {
    heroTitle: string;
    heroTitleEmphasis: string;
    heroSubtitle: string;
    pageSubtitle: string;
    featuredArticles: string;
    allArticles: string;
    searchPlaceholder: string;
    searchAriaLabel: string;
    filterAll: string;
    stayUpdated: string;
    stayUpdatedText: string;
    noArticlesFound: string;
    tryAdjustingFilters: string;
    articleNotFound: string;
    articleNotFoundText: string;
    backToBlog: string;
    tags: string;
    credentials: string;
    viewFullProfile: string;
    connectOnLinkedIn: string;
    relatedArticles: string;
    lookingForProperty: string;
    lookingForPropertyText: string;
    viewProperties: string;
    readArticle: string;
    readArticleAria: string;
    minRead: string;
    metaTitle: string;
    metaDescription: string;
    yearsExperience: string;
    // CTA section
    readyToFindDreamProperty: string;
    exploreOurSelection: string;
    browseProperties: string;
    viewProjects: string;
  };

  notFound: {
    pageTitle: string;
    metaDescription: string;
    breadcrumbHome: string;
    breadcrumbNotFound: string;
    heading: string;
    description: string;
    returnHome: string;
    browseProperties: string;
    searchOurSite: string;
    searchPlaceholder: string;
    search: string;
    popularSearches: string;
    popularPages: string;
    needHelp: string;
    helpText: string;
    callUs: string;
    whatsApp: string;
    contactForm: string;
    allProperties: string;
    luxuryVillas: string;
    apartments: string;
    newProjects: string;
    realEstateBlog: string;
    contactUs: string;
    // Search suggestions
    searchSuggestions: {
      villaForSale: string;
      apartmentErbil: string;
      dreamCity: string;
      penthouse: string;
      commercialProperty: string;
    };
  };

  locations: {
    pageTitle: string;
    pageSubtitle: string;
    breadcrumbHome: string;
    breadcrumbLocations: string;
    mapSectionTitle: string;
    mapSectionSubtitle: string;
    statsTitle: string;
    statsActiveListings: string;
    statsPrimeDistricts: string;
    statsStartingFrom: string;
    statsHappyClients: string;
    ctaTitle: string;
    ctaText: string;
    ctaContactUs: string;
    ctaViewAllProperties: string;
    realEstateInErbil: string;
    districtProperties: string;
    propertiesAvailable: string;
    averagePrice: string;
    propertyTypes: string;
    aboutDistrict: string;
    whyChooseDistrict: string;
    nearbyLandmarks: string;
    pointsOfInterest: string;
    amenities: string;
    transportLinks: string;
    districtLocation: string;
    quickFacts: string;
    priceRange: string;
    lifestyle: string;
    idealFor: string;
    viewDistrictProperties: string;
    interestedInDistrict: string;
    contactExpertsText: string;
    scheduleConsultation: string;
    exploreOtherAreas: string;
    viewAllLocations: string;
    properties: string;
    availablePropertiesIn: string;
    viewAll: string;
    districtNotFound: string;
    districtNotFoundText: string;
    browseProperties: string;
    propertiesCount: string;
    fromPrice: string;
  };

  servicesDirectory: {
    // Hero section
    badge: string;
    heroTitle: string;
    heroTitleLocation: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    searchButton: string;

    // Categories section
    serviceCategoriesTitle: string;
    serviceCategoriesSubtitle: string;
    providerCount: string;
    providerCountPlural: string;
    viewProviders: string;

    // Featured providers section
    featuredProvidersTitle: string;
    featuredProvidersSubtitle: string;

    // Provider card
    featured: string;
    verified: string;
    reviewCount: string;
    moreServices: string;
    priceBudget: string;
    priceMidRange: string;
    pricePremium: string;
    callNow: string;
    whatsApp: string;

    // Why use directory section
    whyUseTitle: string;
    whyVerifiedTitle: string;
    whyVerifiedDesc: string;
    whyRatingsTitle: string;
    whyRatingsDesc: string;
    whyQuotesTitle: string;
    whyQuotesDesc: string;
    whyContactTitle: string;
    whyContactDesc: string;

    // Provider CTA section
    providerCtaTitle: string;
    providerCtaText: string;
    listYourBusiness: string;

    // Quote form
    requestQuoteTitle: string;
    requestQuoteDesc: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    propertyTypeLabel: string;
    selectPropertyType: string;
    propertyApartment: string;
    propertyVilla: string;
    propertyTownhouse: string;
    propertyOffice: string;
    propertyCommercial: string;
    propertyOther: string;
    projectDetailsLabel: string;
    projectDetailsPlaceholder: string;
    submitRequest: string;

    // Quote success
    requestSubmittedTitle: string;
    requestSubmittedText: string;

    // Category page
    breadcrumbHome: string;
    breadcrumbServicesDirectory: string;
    whyYouNeedTitle: string;
    benefitsTitle: string;
    recommendedProvidersTitle: string;
    noProvidersTitle: string;
    noProvidersText: string;
    faqTitle: string;
    relatedServicesTitle: string;
    needHelpTitle: string;
    needHelpText: string;

    // Bottom CTA
    needCategoryServiceTitle: string;
    getConnectedText: string;
    requestFreeQuote: string;
    viewAllServices: string;

    // 404
    categoryNotFoundTitle: string;
    categoryNotFoundText: string;
    viewAllServicesBtn: string;
  };

  pwa: {
    updateAvailable: string;
    updateNow: string;
    later: string;
  };

  listProperty: {
    // Hero
    freeListing: string;
    listYourProperty: string;
    withUs: string;
    heroSubtitle: string;
    propertiesSold: string;
    averageResponse: string;
    clientSatisfaction: string;

    // Progress steps
    stepOf: string;
    steps: {
      type: string;
      details: string;
      location: string;
      pricing: string;
      photos: string;
      contact: string;
      review: string;
    };

    // Step 1: Property Type
    step1Title: string;
    step1Subtitle: string;
    propertyTypes: {
      apartment: string;
      villa: string;
      house: string;
      land: string;
      commercial: string;
    };

    // Step 2: Property Details
    step2Title: string;
    step2Subtitle: string;
    bedrooms: string;
    bathrooms: string;
    areaSqm: string;
    areaPlaceholder: string;
    yearBuilt: string;
    yearBuiltPlaceholder: string;
    floors: string;
    parkingSpaces: string;
    furnishingStatus: string;
    furnishing: {
      unfurnished: string;
      semiFurnished: string;
      fullyFurnished: string;
    };
    propertyFeatures: string;
    features: {
      centralAC: string;
      balcony: string;
      garden: string;
      pool: string;
      gym: string;
      elevator: string;
      security: string;
      electricity24_7: string;
      solarPanels: string;
      smartHome: string;
      storageRoom: string;
      maidRoom: string;
      driverRoom: string;
      rooftopAccess: string;
      seaLakeView: string;
      cityView: string;
      mountainView: string;
    };

    // Step 3: Location
    step3Title: string;
    step3Subtitle: string;
    city: string;
    cityPlaceholder: string;
    neighborhoodDistrict: string;
    selectNeighborhood: string;
    fullAddress: string;
    addressPlaceholder: string;
    nearbyLandmarks: string;
    landmarksPlaceholder: string;

    // Step 4: Pricing
    step4Title: string;
    step4Subtitle: string;
    listingType: string;
    forSale: string;
    forRent: string;
    price: string;
    pricePlaceholder: string;
    currency: string;
    currencyUSD: string;
    currencyIQD: string;
    paymentTerms: string;
    paymentTermsPlaceholder: string;
    priceNegotiable: string;

    // Step 5: Photos
    step5Title: string;
    step5Subtitle: string;
    dragDropPhotos: string;
    or: string;
    browseFiles: string;
    supportedFormats: string;
    mainPhoto: string;
    photoNote: string;

    // Step 6: Contact
    step6Title: string;
    step6Subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    phoneNumber: string;
    phonePlaceholder: string;
    emailAddress: string;
    emailPlaceholder: string;
    preferredContactMethod: string;
    contactMethods: {
      whatsapp: string;
      phone: string;
      email: string;
    };
    bestTimeToContact: string;
    bestTimePlaceholder: string;

    // Step 7: Review
    step7Title: string;
    step7Subtitle: string;
    edit: string;
    propertyType: string;
    propertyDetails: string;
    location: string;
    pricing: string;
    photos: string;
    contactInfo: string;
    noPhotosUploaded: string;
    more: string;
    area: string;
    furnishingLabel: string;
    landmarks: string;
    preferredContact: string;
    available: string;
    negotiable: string;
    termsAgree: string;
    termsOfService: string;
    and: string;
    privacyPolicy: string;

    // Navigation
    back: string;
    continue: string;
    submitListing: string;

    // Validation errors
    errors: {
      selectPropertyType: string;
      enterValidArea: string;
      specifyBedrooms: string;
      enterCity: string;
      selectNeighborhood: string;
      provideAddress: string;
      selectListingType: string;
      enterValidPrice: string;
      enterName: string;
      enterPhone: string;
      enterValidEmail: string;
      agreeTerms: string;
    };

    // Success
    successTitle: string;
    referenceNumber: string;
    successMessage: string;
    backToHome: string;
    listAnotherProperty: string;
    questionsContact: string;

    // Trust signals
    trustSignals: {
      freeService: string;
      freeServiceDesc: string;
      fastResponse: string;
      fastResponseDesc: string;
      expertAgents: string;
      expertAgentsDesc: string;
      wideReach: string;
      wideReachDesc: string;
    };
  };

  areas: {
    // Business hours
    businessHours: string;
    satToThu: string;
    friday: string;
    // Map directions
    getDrivingDirections: string;
    // Visit office section
    visitOurOffice: string;
    visitOurOfficeSubtitle: string;
    // District guide
    completeGuideTo: string;
    aboutDistrict: string;
    everythingYouNeedToKnow: string;
    locationAccessibility: string;
    nearbyAmenities: string;
    pointsOfInterest: string;
    idealFor: string;
    whyChooseDistrict: string;
    // Location text
    erbilKurdistanRegionIraq: string;
    // Hero stats labels
    availableProperties: string;
    averagePrice: string;
    propertyTypes: string;
    lifestyle: string;
    // Properties section
    propertiesForSaleIn: string;
    propertiesAvailableStartingFrom: string;
    viewAllPropertiesIn: string;
    browseDistrictProperties: string;
    // Contact button
    call: string;
    // Map section
    districtLocation: string;
    exploreDistrictAndSurrounding: string;
    // Breadcrumbs
    home: string;
    locations: string;
    // Sidebar quick facts
    quickFacts: string;
    priceRange: string;
    // Sidebar CTA
    interestedIn: string;
    ourLocalExpertsCanHelp: string;
    scheduleFreeConsultation: string;
    // Other areas
    exploreOtherAreasInErbil: string;
    viewAllErbilLocations: string;
    properties: string;
    // Bottom CTA
    readyToFindYourProperty: string;
    contactRealHouseToday: string;
    scheduleViewing: string;
    whatsAppUs: string;
    // 404 area page
    areaNotFound: string;
    areaNotFoundMessage: string;
    viewAllLocations: string;
    browseProperties: string;
    // Real estate suffix
    realEstate: string;
    propertiesForSaleAndRentInErbil: string;
  };

  marketReport: {
    avgPricePerSqm: string;
    keyFindings: string;
    reportContents: string;
    marketOutlook: string;
    reportNotFound: string;
    reportNotFoundMessage: string;
    viewProperties: string;
    yearMarketReport: string;
    lastUpdated: string;
    methodology: string;
    getFullReport: string;
    getFullReportText: string;
    requestFullReport: string;
    investmentConsultation: string;
    investmentConsultationText: string;
    scheduleConsultation: string;
    exploreMore: string;
    buyerGuide: string;
    investorGuide: string;
    browseProperties: string;
    viewProjects: string;
    makeInformedDecisions: string;
    makeInformedDecisionsText: string;
    viewAvailableProperties: string;
    // Breadcrumbs
    home: string;
    marketReports: string;
    // Stats
    stable: string;
  };

  neighborhoodGuide: {
    // Hero
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    // Stats labels
    neighborhoods: string;
    properties: string;
    priceRange: string;
    // Breadcrumbs
    home: string;
    neighborhoodsLabel: string;
    // Intro section
    findYourPerfectNeighborhood: string;
    introText: string;
    // CTA section
    needHelpFindingRightArea: string;
    ctaExpertsText: string;
    getExpertAdvice: string;
    // Card strings
    fromPrice: string;
    exploreArea: string;
    propertyTypesCount: string;
    highSecurity: string;
    goodSecurity: string;
    // Location badge
    erbilKurdistanIraq: string;
    // Detail page stats
    lifestyle: string;
    safetyRating: string;
    // Buttons
    viewProperties: string;
    // Section titles
    aboutNeighborhood: string;
    whyChooseNeighborhood: string;
    propertyPrices: string;
    currentMarketPrices: string;
    nearbyAmenities: string;
    amenitiesSubtitle: string;
    transportationAccessibility: string;
    gettingAroundFrom: string;
    lifestyleCommunity: string;
    whatItsLikeToLive: string;
    // Price section
    startingFrom: string;
    upTo: string;
    averagePrice: string;
    pricePerSqm: string;
    // Table headers
    propertyType: string;
    priceRangeHeader: string;
    availability: string;
    // Lifestyle section
    communityVibe: string;
    idealFor: string;
    features: string;
    familyFriendly: string;
    petFriendly: string;
    expatFriendly: string;
    yes: string;
    no: string;
    // Map section
    neighborhoodLocation: string;
    exploreAreaOnMap: string;
    getDrivingDirections: string;
    // Properties section
    propertiesInNeighborhood: string;
    featuredListingsAvailable: string;
    viewAllProperties: string;
    // Projects section
    developmentProjectsIn: string;
    newDevelopmentsOpportunities: string;
    viewAllProjects: string;
    // Sidebar
    quickFacts: string;
    avgPrice: string;
    propertyTypesLabel: string;
    interestedInNeighborhood: string;
    localExpertsHelp: string;
    scheduleFreeConsultation: string;
    // CTA section
    readyToFindProperty: string;
    contactTodayForGuidance: string;
    scheduleViewing: string;
    whatsappUs: string;
    // Other neighborhoods
    exploreOtherNeighborhoods: string;
    viewAllNeighborhoods: string;
    // 404
    neighborhoodNotFound: string;
    couldntFindNeighborhood: string;
    browseProperties: string;
    // Amenity categories
    schoolsEducation: string;
    healthcare: string;
    shopping: string;
    dining: string;
    recreation: string;
  };

  gallery: {
    viewFullSize: string;
    closeLightbox: string;
    pageTitle: string;
    pageSubtitle: string;
  };
}

/**
 * Data content translation structure (lazy loaded)
 */
export interface DataTranslations {
  services?: Record<string, ServiceTranslation>;
  neighborhoods?: Record<string, NeighborhoodTranslation>;
  guides?: Record<string, GuideTranslation>;
  blog?: Record<string, BlogPostTranslation>;
  projects?: Record<string, ProjectTranslation>;
}

/**
 * Service translation structure
 */
export interface ServiceTranslation {
  title: string;
  description: string;
  shortDescription?: string;
  features?: string[];
  benefits?: string[];
  process?: ProcessStepTranslation[];
}

export interface ProcessStepTranslation {
  title: string;
  description: string;
}

/**
 * Neighborhood translation structure
 */
export interface NeighborhoodTranslation {
  name: string;
  description: string;
  shortDescription?: string;
  highlights?: string[];
  amenities?: string[];
}

/**
 * Guide translation structure
 */
export interface GuideTranslation {
  title: string;
  description: string;
  content: string;
  sections?: GuideSectionTranslation[];
  tips?: string[];
}

export interface GuideSectionTranslation {
  title: string;
  content: string;
}

/**
 * Blog post translation structure
 */
export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  content: string;
  tags?: string[];
}

/**
 * Project translation structure
 */
export interface ProjectTranslation {
  name: string;
  description: string;
  shortDescription?: string;
  features?: string[];
  amenities?: string[];
  locationDescription?: string;
}

/**
 * Full translation set (core + data)
 */
export interface TranslationSet {
  core: CoreTranslations;
  data?: DataTranslations;
}

/**
 * Translation options for interpolation
 */
export interface TranslationOptions {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Localized item interface for data objects
 */
export interface LocalizedItem {
  name: string;
  nameAr?: string;
  nameKu?: string;
}

/**
 * Localized item with description
 */
export interface LocalizedDescriptionItem extends LocalizedItem {
  description?: string;
  descriptionAr?: string;
  descriptionKu?: string;
}
