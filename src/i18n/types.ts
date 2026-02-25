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
    tagline: string;
    quickLinks: string;
    propertyTypes: string;
    browseProperties: string;
    popularLocations: string;
    resources: string;
    connectWithUs: string;
    copyright: string;
    allRightsReserved: string;
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
    happyClients: string;
    awardsWon: string;
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
