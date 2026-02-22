// =============================================================================
// TRANSLATIONS - Real House Multi-language Support
// Languages: English (en), Arabic (ar), Central Kurdish/Sorani (ckb)
// =============================================================================

export type Language = 'en' | 'ar' | 'ckb';

export interface TranslationStrings {
  // Navigation
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

  // Service submenu
  services: {
    all: string;
    sell: string;
    buy: string;
    management: string;
    valuation: string;
    investment: string;
    legal: string;
  };

  // Resources submenu
  resources: {
    buyerGuide: string;
    investorGuide: string;
    renterGuide: string;
    marketReport: string;
  };

  // Buttons
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

  // Form labels
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

  // Property related
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

  // Property types
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

  // Common phrases
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

  // Footer
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

  // Hero section
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };

  // About page
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

  // Contact page
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

  // Language names (for the selector)
  languages: {
    en: string;
    ar: string;
    ckb: string;
  };

  // Accessibility
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
}

// =============================================================================
// ENGLISH TRANSLATIONS (Default)
// =============================================================================

export const en: TranslationStrings = {
  nav: {
    home: 'Home',
    properties: 'Properties',
    services: 'Services',
    projects: 'Projects',
    resources: 'Resources',
    about: 'About',
    contact: 'Contact',
    blog: 'Blog',
    faq: 'FAQ',
    favorites: 'Favorites',
  },

  services: {
    all: 'All Services',
    sell: 'Sell Property',
    buy: 'Buy Property',
    management: 'Property Management',
    valuation: 'Free Valuation',
    investment: 'Investment Consulting',
    legal: 'Legal Assistance',
  },

  resources: {
    buyerGuide: "Buyer's Guide",
    investorGuide: "Investor's Guide",
    renterGuide: "Renter's Guide",
    marketReport: 'Market Report 2025',
  },

  buttons: {
    getInTouch: 'Get in Touch',
    viewDetails: 'View Details',
    scheduleViewing: 'Schedule Viewing',
    sendMessage: 'Send Message',
    loadMore: 'Load More',
    viewAll: 'View All',
    compare: 'Compare',
    addToCompare: 'Add to Compare',
    removeFromCompare: 'Remove from Compare',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    search: 'Search',
    filter: 'Filter',
    clearFilters: 'Clear Filters',
    apply: 'Apply',
    cancel: 'Cancel',
    submit: 'Submit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    showMore: 'Show More',
    showLess: 'Show Less',
    download: 'Download',
    share: 'Share',
    call: 'Call',
    whatsapp: 'WhatsApp',
    email: 'Email',
  },

  forms: {
    name: 'Name',
    fullName: 'Full Name',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    subject: 'Subject',
    propertyType: 'Property Type',
    priceRange: 'Price Range',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    area: 'Area',
    location: 'Location',
    district: 'District',
    status: 'Status',
    date: 'Date',
    time: 'Time',
    preferredContact: 'Preferred Contact Method',
    budget: 'Budget',
    comments: 'Comments',
    required: 'Required',
    optional: 'Optional',
  },

  property: {
    forSale: 'For Sale',
    forRent: 'For Rent',
    offPlan: 'Off-Plan',
    ready: 'Ready',
    underConstruction: 'Under Construction',
    price: 'Price',
    priceOnRequest: 'Price on Request',
    perMonth: '/month',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    sqm: 'sqm',
    sqft: 'sqft',
    floor: 'Floor',
    yearBuilt: 'Year Built',
    features: 'Features',
    amenities: 'Amenities',
    description: 'Description',
    location: 'Location',
    virtualTour: 'Virtual Tour',
    floorPlan: 'Floor Plan',
    gallery: 'Gallery',
    similarProperties: 'Similar Properties',
    newListing: 'New',
    featured: 'Featured',
    exclusive: 'Exclusive',
    reduced: 'Price Reduced',
    hot: 'Hot',
  },

  propertyTypes: {
    villa: 'Villa',
    apartment: 'Apartment',
    penthouse: 'Penthouse',
    townhouse: 'Townhouse',
    duplex: 'Duplex',
    commercial: 'Commercial',
    land: 'Land',
    office: 'Office',
    retail: 'Retail',
  },

  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    noResults: 'No results found',
    viewAll: 'View All',
    seeAll: 'See All',
    moreInfo: 'More Info',
    learnMore: 'Learn More',
    contactUs: 'Contact Us',
    getStarted: 'Get Started',
    readMore: 'Read More',
    exploreMore: 'Explore More',
    discoverMore: 'Discover More',
    findYourHome: 'Find Your Home',
    startSearch: 'Start Search',
    ourServices: 'Our Services',
    ourProjects: 'Our Projects',
    ourTeam: 'Our Team',
    whyChooseUs: 'Why Choose Us',
    testimonials: 'Testimonials',
    successStories: 'Success Stories',
    latestNews: 'Latest News',
    recentPosts: 'Recent Posts',
    subscribe: 'Subscribe',
    newsletter: 'Newsletter',
    followUs: 'Follow Us',
    stayConnected: 'Stay Connected',
    quickLinks: 'Quick Links',
    usefulLinks: 'Useful Links',
    propertyTypes: 'Property Types',
    popularLocations: 'Popular Locations',
    resourceCenter: 'Resource Center',
    helpCenter: 'Help Center',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    sitemap: 'Sitemap',
    copyright: 'Copyright',
    allRightsReserved: 'All rights reserved',
    erbilKurdistanIraq: 'Erbil, Kurdistan Region, Iraq',
  },

  footer: {
    tagline: 'Your trusted partner for luxury real estate in Erbil, Kurdistan. We help you find the perfect home, apartment, or investment property with personalized service and local expertise.',
    quickLinks: 'Quick Links',
    propertyTypes: 'Property Types',
    browseProperties: 'Browse Properties',
    popularLocations: 'Popular Locations',
    resources: 'Resources',
    connectWithUs: 'Connect With Us',
    copyright: '2025 Real House Real Estate LLC. All rights reserved.',
    allRightsReserved: 'All rights reserved',
  },

  hero: {
    title: 'Discover Luxury Living in Erbil',
    subtitle: 'Your trusted partner for premium real estate in Kurdistan',
    cta: 'Explore Properties',
  },

  about: {
    title: 'About Real House',
    subtitle: "Kurdistan's Premier Real Estate Agency",
    ourStory: 'Our Story',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    ourValues: 'Our Values',
    meetTheTeam: 'Meet the Team',
    experience: 'Experience',
    yearsExperience: 'Years of Experience',
    propertiesSold: 'Properties Sold',
    happyClients: 'Happy Clients',
    awardsWon: 'Awards Won',
  },

  contact: {
    title: 'Contact Us',
    subtitle: "We'd love to hear from you",
    getInTouch: 'Get in Touch',
    visitUs: 'Visit Us',
    callUs: 'Call Us',
    emailUs: 'Email Us',
    workingHours: 'Working Hours',
    sendMessage: 'Send Message',
    messageSent: 'Message sent successfully!',
    messageError: 'Failed to send message. Please try again.',
  },

  languages: {
    en: 'English',
    ar: 'العربية',
    ckb: 'کوردی',
  },

  a11y: {
    skipToContent: 'Skip to main content',
    skipToNavigation: 'Skip to navigation',
    skipToFooter: 'Skip to footer',
    toggleMenu: 'Toggle menu',
    toggleTheme: 'Toggle dark/light theme',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    selectLanguage: 'Select language',
    currentLanguage: 'Current language',
  },
};

// =============================================================================
// ARABIC TRANSLATIONS
// =============================================================================

export const ar: TranslationStrings = {
  nav: {
    home: 'الرئيسية',
    properties: 'العقارات',
    services: 'الخدمات',
    projects: 'المشاريع',
    resources: 'الموارد',
    about: 'من نحن',
    contact: 'اتصل بنا',
    blog: 'المدونة',
    faq: 'الأسئلة الشائعة',
    favorites: 'المفضلة',
  },

  services: {
    all: 'جميع الخدمات',
    sell: 'بيع العقارات',
    buy: 'شراء العقارات',
    management: 'إدارة العقارات',
    valuation: 'تقييم مجاني',
    investment: 'استشارات الاستثمار',
    legal: 'المساعدة القانونية',
  },

  resources: {
    buyerGuide: 'دليل المشتري',
    investorGuide: 'دليل المستثمر',
    renterGuide: 'دليل المستأجر',
    marketReport: 'تقرير السوق 2025',
  },

  buttons: {
    getInTouch: 'تواصل معنا',
    viewDetails: 'عرض التفاصيل',
    scheduleViewing: 'حجز معاينة',
    sendMessage: 'إرسال رسالة',
    loadMore: 'تحميل المزيد',
    viewAll: 'عرض الكل',
    compare: 'مقارنة',
    addToCompare: 'إضافة للمقارنة',
    removeFromCompare: 'إزالة من المقارنة',
    addToFavorites: 'إضافة للمفضلة',
    removeFromFavorites: 'إزالة من المفضلة',
    search: 'بحث',
    filter: 'تصفية',
    clearFilters: 'مسح الفلاتر',
    apply: 'تطبيق',
    cancel: 'إلغاء',
    submit: 'إرسال',
    close: 'إغلاق',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    showMore: 'عرض المزيد',
    showLess: 'عرض أقل',
    download: 'تحميل',
    share: 'مشاركة',
    call: 'اتصال',
    whatsapp: 'واتساب',
    email: 'بريد إلكتروني',
  },

  forms: {
    name: 'الاسم',
    fullName: 'الاسم الكامل',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    message: 'الرسالة',
    subject: 'الموضوع',
    propertyType: 'نوع العقار',
    priceRange: 'نطاق السعر',
    bedrooms: 'غرف النوم',
    bathrooms: 'الحمامات',
    area: 'المساحة',
    location: 'الموقع',
    district: 'المنطقة',
    status: 'الحالة',
    date: 'التاريخ',
    time: 'الوقت',
    preferredContact: 'طريقة الاتصال المفضلة',
    budget: 'الميزانية',
    comments: 'التعليقات',
    required: 'مطلوب',
    optional: 'اختياري',
  },

  property: {
    forSale: 'للبيع',
    forRent: 'للإيجار',
    offPlan: 'قيد الإنشاء',
    ready: 'جاهز',
    underConstruction: 'قيد البناء',
    price: 'السعر',
    priceOnRequest: 'السعر عند الطلب',
    perMonth: '/شهر',
    bedrooms: 'غرف النوم',
    bathrooms: 'الحمامات',
    sqm: 'م²',
    sqft: 'قدم²',
    floor: 'الطابق',
    yearBuilt: 'سنة البناء',
    features: 'المميزات',
    amenities: 'المرافق',
    description: 'الوصف',
    location: 'الموقع',
    virtualTour: 'جولة افتراضية',
    floorPlan: 'مخطط الطابق',
    gallery: 'معرض الصور',
    similarProperties: 'عقارات مشابهة',
    newListing: 'جديد',
    featured: 'مميز',
    exclusive: 'حصري',
    reduced: 'تخفيض السعر',
    hot: 'رائج',
  },

  propertyTypes: {
    villa: 'فيلا',
    apartment: 'شقة',
    penthouse: 'بنتهاوس',
    townhouse: 'تاون هاوس',
    duplex: 'دوبلكس',
    commercial: 'تجاري',
    land: 'أرض',
    office: 'مكتب',
    retail: 'محل تجاري',
  },

  common: {
    loading: 'جار التحميل...',
    error: 'حدث خطأ',
    noResults: 'لم يتم العثور على نتائج',
    viewAll: 'عرض الكل',
    seeAll: 'مشاهدة الكل',
    moreInfo: 'مزيد من المعلومات',
    learnMore: 'اعرف المزيد',
    contactUs: 'اتصل بنا',
    getStarted: 'ابدأ الآن',
    readMore: 'اقرأ المزيد',
    exploreMore: 'استكشف المزيد',
    discoverMore: 'اكتشف المزيد',
    findYourHome: 'ابحث عن منزلك',
    startSearch: 'ابدأ البحث',
    ourServices: 'خدماتنا',
    ourProjects: 'مشاريعنا',
    ourTeam: 'فريقنا',
    whyChooseUs: 'لماذا تختارنا',
    testimonials: 'آراء العملاء',
    successStories: 'قصص النجاح',
    latestNews: 'آخر الأخبار',
    recentPosts: 'أحدث المقالات',
    subscribe: 'اشترك',
    newsletter: 'النشرة الإخبارية',
    followUs: 'تابعنا',
    stayConnected: 'ابق على تواصل',
    quickLinks: 'روابط سريعة',
    usefulLinks: 'روابط مفيدة',
    propertyTypes: 'أنواع العقارات',
    popularLocations: 'المواقع الشائعة',
    resourceCenter: 'مركز الموارد',
    helpCenter: 'مركز المساعدة',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    sitemap: 'خريطة الموقع',
    copyright: 'حقوق النشر',
    allRightsReserved: 'جميع الحقوق محفوظة',
    erbilKurdistanIraq: 'أربيل، إقليم كردستان، العراق',
  },

  footer: {
    tagline: 'رواد العقارات في أربيل. متخصصون في عقارات أربيل ونقدم بيوت للبيع في أربيل، شقق أربيل العراق، فلل أربيل العراق، بنتهاوس أربيل، ومنازل فاخرة في كردستان. أفضل وكيل عقارات أربيل لشراء منزل أربيل والاستثمار العقاري في كردستان العراق.',
    quickLinks: 'روابط سريعة',
    propertyTypes: 'أنواع العقارات',
    browseProperties: 'تصفح العقارات',
    popularLocations: 'المواقع الشائعة',
    resources: 'الموارد',
    connectWithUs: 'تواصل معنا',
    copyright: '2025 ريل هاوس للعقارات ذ.م.م. جميع الحقوق محفوظة.',
    allRightsReserved: 'جميع الحقوق محفوظة',
  },

  hero: {
    title: 'اكتشف الحياة الفاخرة في أربيل',
    subtitle: 'شريكك الموثوق للعقارات الفاخرة في كردستان',
    cta: 'استكشف العقارات',
  },

  about: {
    title: 'عن ريل هاوس',
    subtitle: 'وكالة العقارات الرائدة في كردستان',
    ourStory: 'قصتنا',
    ourMission: 'مهمتنا',
    ourVision: 'رؤيتنا',
    ourValues: 'قيمنا',
    meetTheTeam: 'تعرف على الفريق',
    experience: 'الخبرة',
    yearsExperience: 'سنوات الخبرة',
    propertiesSold: 'العقارات المباعة',
    happyClients: 'العملاء السعداء',
    awardsWon: 'الجوائز المحققة',
  },

  contact: {
    title: 'اتصل بنا',
    subtitle: 'نحب أن نسمع منك',
    getInTouch: 'تواصل معنا',
    visitUs: 'زرنا',
    callUs: 'اتصل بنا',
    emailUs: 'راسلنا',
    workingHours: 'ساعات العمل',
    sendMessage: 'إرسال رسالة',
    messageSent: 'تم إرسال الرسالة بنجاح!',
    messageError: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.',
  },

  languages: {
    en: 'English',
    ar: 'العربية',
    ckb: 'کوردی',
  },

  a11y: {
    skipToContent: 'انتقل إلى المحتوى الرئيسي',
    skipToNavigation: 'انتقل إلى التنقل',
    skipToFooter: 'انتقل إلى التذييل',
    toggleMenu: 'تبديل القائمة',
    toggleTheme: 'تبديل السمة الداكنة/الفاتحة',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    selectLanguage: 'اختر اللغة',
    currentLanguage: 'اللغة الحالية',
  },
};

// =============================================================================
// CENTRAL KURDISH / SORANI TRANSLATIONS
// =============================================================================

export const ckb: TranslationStrings = {
  nav: {
    home: 'سەرەتا',
    properties: 'خانووبەرە',
    services: 'خزمەتگوزاری',
    projects: 'پڕۆژەکان',
    resources: 'سەرچاوەکان',
    about: 'دەربارەی ئێمە',
    contact: 'پەیوەندی',
    blog: 'بلۆگ',
    faq: 'پرسیارە باوەکان',
    favorites: 'دڵخوازەکان',
  },

  services: {
    all: 'هەموو خزمەتگوزارییەکان',
    sell: 'فرۆشتنی خانووبەرە',
    buy: 'کڕینی خانووبەرە',
    management: 'بەڕێوەبردنی خانووبەرە',
    valuation: 'نرخاندنی بەخۆڕایی',
    investment: 'ڕاوێژکاری وەبەرهێنان',
    legal: 'یارمەتی یاسایی',
  },

  resources: {
    buyerGuide: 'ڕێنمایی کڕیار',
    investorGuide: 'ڕێنمایی وەبەرهێنەر',
    renterGuide: 'ڕێنمایی کرێچی',
    marketReport: 'ڕاپۆرتی بازاڕ ٢٠٢٥',
  },

  buttons: {
    getInTouch: 'پەیوەندیمان پێوە بکە',
    viewDetails: 'وردەکاری ببینە',
    scheduleViewing: 'کاتی سەردان دابنێ',
    sendMessage: 'پەیام بنێرە',
    loadMore: 'زیاتر ببینە',
    viewAll: 'هەموو ببینە',
    compare: 'بەراوردکردن',
    addToCompare: 'زیادبکە بۆ بەراورد',
    removeFromCompare: 'لابردن لە بەراورد',
    addToFavorites: 'زیادبکە بۆ دڵخوازەکان',
    removeFromFavorites: 'لابردن لە دڵخوازەکان',
    search: 'گەڕان',
    filter: 'فلتەر',
    clearFilters: 'سڕینەوەی فلتەرەکان',
    apply: 'جێبەجێکردن',
    cancel: 'هەڵوەشاندنەوە',
    submit: 'ناردن',
    close: 'داخستن',
    back: 'گەڕانەوە',
    next: 'دواتر',
    previous: 'پێشتر',
    showMore: 'زیاتر نیشانبدە',
    showLess: 'کەمتر نیشانبدە',
    download: 'داگرتن',
    share: 'هاوبەشکردن',
    call: 'پەیوەندی',
    whatsapp: 'واتساپ',
    email: 'ئیمەیڵ',
  },

  forms: {
    name: 'ناو',
    fullName: 'ناوی تەواو',
    firstName: 'ناوی یەکەم',
    lastName: 'ناوی خێزان',
    email: 'ئیمەیڵ',
    phone: 'تەلەفۆن',
    message: 'پەیام',
    subject: 'بابەت',
    propertyType: 'جۆری خانووبەرە',
    priceRange: 'بواری نرخ',
    bedrooms: 'ژووری نووستن',
    bathrooms: 'حەمام',
    area: 'ڕووبەر',
    location: 'شوێن',
    district: 'ناوچە',
    status: 'دۆخ',
    date: 'بەروار',
    time: 'کات',
    preferredContact: 'ڕێگای پەیوەندی دڵخواز',
    budget: 'بودجە',
    comments: 'تێبینی',
    required: 'پێویستە',
    optional: 'بەدڵخوازی',
  },

  property: {
    forSale: 'بۆ فرۆشتن',
    forRent: 'بۆ کرێ',
    offPlan: 'لەژێر دروستکردن',
    ready: 'ئامادەیە',
    underConstruction: 'لەژێر بیناکردن',
    price: 'نرخ',
    priceOnRequest: 'نرخ بە داواکردن',
    perMonth: '/مانگ',
    bedrooms: 'ژووری نووستن',
    bathrooms: 'حەمام',
    sqm: 'م²',
    sqft: 'فووت²',
    floor: 'نهۆم',
    yearBuilt: 'ساڵی بیناکردن',
    features: 'تایبەتمەندییەکان',
    amenities: 'ئامرازەکان',
    description: 'وەسف',
    location: 'شوێن',
    virtualTour: 'گەشتی ڤیرتواڵ',
    floorPlan: 'پلانی نهۆم',
    gallery: 'گەلەری',
    similarProperties: 'خانووبەرەی هاوشێوە',
    newListing: 'نوێ',
    featured: 'تایبەت',
    exclusive: 'تایبەتی',
    reduced: 'داشکاندنی نرخ',
    hot: 'باو',
  },

  propertyTypes: {
    villa: 'ڤیلا',
    apartment: 'شووقە',
    penthouse: 'پێنتهاوس',
    townhouse: 'تاون هاوس',
    duplex: 'دووپلێکس',
    commercial: 'بازرگانی',
    land: 'زەوی',
    office: 'ئۆفیس',
    retail: 'دوکان',
  },

  common: {
    loading: 'چاوەڕوان بە...',
    error: 'هەڵەیەک ڕوویدا',
    noResults: 'هیچ ئەنجامێک نەدۆزرایەوە',
    viewAll: 'هەموو ببینە',
    seeAll: 'هەموو ببینە',
    moreInfo: 'زانیاری زیاتر',
    learnMore: 'زیاتر بزانە',
    contactUs: 'پەیوەندیمان پێوە بکە',
    getStarted: 'دەستپێبکە',
    readMore: 'زیاتر بخوێنەوە',
    exploreMore: 'زیاتر بگەڕێ',
    discoverMore: 'زیاتر بدۆزەوە',
    findYourHome: 'ماڵەکەت بدۆزەوە',
    startSearch: 'گەڕان دەستپێبکە',
    ourServices: 'خزمەتگوزارییەکانمان',
    ourProjects: 'پڕۆژەکانمان',
    ourTeam: 'تیمەکەمان',
    whyChooseUs: 'بۆچی ئێمە هەڵبژێرە',
    testimonials: 'بۆچوونی کڕیاران',
    successStories: 'چیرۆکی سەرکەوتن',
    latestNews: 'تازەترین هەواڵەکان',
    recentPosts: 'تازەترین بابەتەکان',
    subscribe: 'بەشداری بکە',
    newsletter: 'نامەی هەواڵی',
    followUs: 'بمان بەدوادابەوە',
    stayConnected: 'لە پەیوەندیدا بمێنەوە',
    quickLinks: 'لینکی خێرا',
    usefulLinks: 'لینکی سوودمەند',
    propertyTypes: 'جۆرەکانی خانووبەرە',
    popularLocations: 'شوێنە باوەکان',
    resourceCenter: 'ناوەندی سەرچاوەکان',
    helpCenter: 'ناوەندی یارمەتی',
    privacyPolicy: 'سیاسەتی تایبەتمەندی',
    termsOfService: 'مەرجەکانی خزمەتگوزاری',
    sitemap: 'نەخشەی ماڵپەڕ',
    copyright: 'مافی چاپ',
    allRightsReserved: 'هەموو مافەکان پارێزراون',
    erbilKurdistanIraq: 'هەولێر، هەرێمی کوردستان، عێراق',
  },

  footer: {
    tagline: 'پێشەنگانی خانووبەرە لە هەولێر. پسپۆڕی خانووبەرەی هەولێر و پێشکەشکردنی خانوو بۆ فرۆشتن لە هەولێر، شووقە لە هەولێر عێراق، ڤیلا لە هەولێر عێراق، پێنتهاوس هەولێر، و ماڵی لوکس لە کوردستان. باشترین بریکاری خانووبەرە لە هەولێر بۆ کڕینی ماڵ لە هەولێر و وەبەرهێنانی خانووبەرە لە کوردستان عێراق.',
    quickLinks: 'لینکی خێرا',
    propertyTypes: 'جۆرەکانی خانووبەرە',
    browseProperties: 'گەڕان لە خانووبەرەکان',
    popularLocations: 'شوێنە باوەکان',
    resources: 'سەرچاوەکان',
    connectWithUs: 'پەیوەندیمان پێوە بکە',
    copyright: '٢٠٢٥ ڕیەڵ هاوس بۆ خانووبەرە. هەموو مافەکان پارێزراون.',
    allRightsReserved: 'هەموو مافەکان پارێزراون',
  },

  hero: {
    title: 'ژیانی لوکس لە هەولێر بدۆزەوە',
    subtitle: 'هاوبەشی متمانەپێکراوی تۆ بۆ خانووبەرەی سەرچاو لە کوردستان',
    cta: 'خانووبەرەکان بگەڕێ',
  },

  about: {
    title: 'دەربارەی ڕیەڵ هاوس',
    subtitle: 'بریکاری خانووبەرەی پێشەنگ لە کوردستان',
    ourStory: 'چیرۆکەکەمان',
    ourMission: 'ئەرکەکەمان',
    ourVision: 'بینینەکەمان',
    ourValues: 'بەهاکانمان',
    meetTheTeam: 'تیمەکەمان بناسە',
    experience: 'ئەزموون',
    yearsExperience: 'ساڵی ئەزموون',
    propertiesSold: 'خانووبەرەی فرۆشراو',
    happyClients: 'کڕیاری دڵخۆش',
    awardsWon: 'خەڵاتی بەدەستهێنراو',
  },

  contact: {
    title: 'پەیوەندیمان پێوە بکە',
    subtitle: 'حەز دەکەین لێت بیستین',
    getInTouch: 'پەیوەندیمان پێوە بکە',
    visitUs: 'سەردانمان بکە',
    callUs: 'پەیوەندیمان پێوە بکە',
    emailUs: 'ئیمەیڵمان بنێرە',
    workingHours: 'کاتی کارکردن',
    sendMessage: 'پەیام بنێرە',
    messageSent: 'پەیامەکە بە سەرکەوتوویی نێردرا!',
    messageError: 'ناردنی پەیام سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەوە.',
  },

  languages: {
    en: 'English',
    ar: 'العربية',
    ckb: 'کوردی',
  },

  a11y: {
    skipToContent: 'بڕۆ بۆ ناوەڕۆکی سەرەکی',
    skipToNavigation: 'بڕۆ بۆ ڕێدۆزی',
    skipToFooter: 'بڕۆ بۆ پێپەڕە',
    toggleMenu: 'گۆڕینی پێڕست',
    toggleTheme: 'گۆڕینی تاریک/ڕووناک',
    openMenu: 'کردنەوەی پێڕست',
    closeMenu: 'داخستنی پێڕست',
    selectLanguage: 'زمان هەڵبژێرە',
    currentLanguage: 'زمانی ئێستا',
  },
};

// =============================================================================
// TRANSLATIONS MAP
// =============================================================================

export const translations: Record<Language, TranslationStrings> = {
  en,
  ar,
  ckb,
};

// =============================================================================
// RTL LANGUAGES
// =============================================================================

export const RTL_LANGUAGES: Language[] = ['ar', 'ckb'];

// =============================================================================
// LANGUAGE METADATA
// =============================================================================

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string; // Emoji flag or icon identifier
  hreflang: string; // For SEO hreflang tags
}

export const LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
    hreflang: 'en',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇮🇶',
    hreflang: 'ar',
  },
  {
    code: 'ckb',
    name: 'Kurdish (Sorani)',
    nativeName: 'کوردی',
    dir: 'rtl',
    flag: '🏴',
    hreflang: 'ku', // Using ku for Kurdish in hreflang (ckb is the specific code for Sorani)
  },
];

export function getLanguageInfo(code: Language): LanguageInfo | undefined {
  return LANGUAGES.find(lang => lang.code === code);
}
