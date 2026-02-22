// ═══════════════════════════════════════════════════════════════════════════
// Contact Information - E-E-A-T Transparency Data
// Experience, Expertise, Authoritativeness, Trustworthiness
// ═══════════════════════════════════════════════════════════════════════════

// ─── Office Locations ────────────────────────────────────────────────────────

export interface OfficeLocation {
  id: string;
  name: string;
  type: 'headquarters' | 'branch' | 'satellite';
  address: {
    street: string;
    district: string;
    city: string;
    region: string;
    country: string;
    postalCode: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  phone: string[];
  fax?: string;
  email: string;
  hours: OfficeHours;
  parking: string;
  publicTransport?: string;
  googleMapsUrl: string;
}

export interface OfficeHours {
  saturday: string;
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  holidays?: string;
}

export const offices: OfficeLocation[] = [
  {
    id: 'headquarters',
    name: 'Real House Headquarters',
    type: 'headquarters',
    address: {
      street: 'Dream City Main Boulevard, Building A3',
      district: 'Dream City',
      city: 'Erbil',
      region: 'Kurdistan Region',
      country: 'Iraq',
      postalCode: '44001'
    },
    coordinates: {
      latitude: 36.1901,
      longitude: 44.0091
    },
    phone: ['+964 750 792 2138', '+964 751 441 5003'],
    fax: '+964 66 223 4567',
    email: 'info@realhouseiq.com',
    hours: {
      saturday: '09:00 - 18:00',
      sunday: '09:00 - 18:00',
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: '09:00 - 18:00',
      thursday: '09:00 - 18:00',
      friday: 'By Appointment Only',
      holidays: 'Closed on official Kurdistan/Iraq holidays'
    },
    parking: 'Free on-site parking available for visitors',
    publicTransport: 'Located 5 minutes from Dream City main gate. Taxi and rideshare services available.',
    googleMapsUrl: 'https://maps.google.com/?q=36.1901,44.0091'
  },
  {
    id: 'gulan-office',
    name: 'Real House Gulan Office',
    type: 'branch',
    address: {
      street: 'Family Mall Road, Gulan Tower, Floor 3',
      district: 'Gulan',
      city: 'Erbil',
      region: 'Kurdistan Region',
      country: 'Iraq',
      postalCode: '44003'
    },
    coordinates: {
      latitude: 36.1890,
      longitude: 44.0120
    },
    phone: ['+964 750 345 6789'],
    email: 'gulan@realhouseiq.com',
    hours: {
      saturday: '10:00 - 19:00',
      sunday: '10:00 - 19:00',
      monday: '10:00 - 19:00',
      tuesday: '10:00 - 19:00',
      wednesday: '10:00 - 19:00',
      thursday: '10:00 - 19:00',
      friday: 'Closed'
    },
    parking: 'Paid parking available at Family Mall',
    googleMapsUrl: 'https://maps.google.com/?q=36.1890,44.0120'
  }
];

// ─── Contact Methods ─────────────────────────────────────────────────────────

export interface ContactMethod {
  id: string;
  type: 'phone' | 'email' | 'whatsapp' | 'social' | 'form';
  label: string;
  value: string;
  description: string;
  icon: string;
  priority: number;
  responseTime?: string;
  availability?: string;
}

export const contactMethods: ContactMethod[] = [
  {
    id: 'phone-main',
    type: 'phone',
    label: 'Main Office',
    value: '+964 750 792 2138',
    description: 'Call our main office for general inquiries and appointments',
    icon: 'icon-phone',
    priority: 1,
    responseTime: 'Immediate during office hours',
    availability: 'Sat-Thu 09:00-18:00'
  },
  {
    id: 'phone-sales',
    type: 'phone',
    label: 'Sales Team',
    value: '+964 751 441 5003',
    description: 'Direct line to our sales team for property inquiries',
    icon: 'icon-phone',
    priority: 2,
    responseTime: 'Immediate during office hours',
    availability: 'Sat-Thu 09:00-18:00'
  },
  {
    id: 'whatsapp',
    type: 'whatsapp',
    label: 'WhatsApp',
    value: '+964 750 792 2138',
    description: 'Message us on WhatsApp for quick responses',
    icon: 'icon-whatsapp',
    priority: 3,
    responseTime: 'Within 1 hour',
    availability: '24/7 (response during business hours)'
  },
  {
    id: 'email-general',
    type: 'email',
    label: 'General Inquiries',
    value: 'info@realhouseiq.com',
    description: 'Email us for detailed inquiries and documentation',
    icon: 'icon-email',
    priority: 4,
    responseTime: 'Within 4 hours during business days'
  },
  {
    id: 'email-sales',
    type: 'email',
    label: 'Property Sales',
    value: 'sales@realhouseiq.com',
    description: 'Direct email for property-related inquiries',
    icon: 'icon-email',
    priority: 5,
    responseTime: 'Within 2 hours during business days'
  },
  {
    id: 'email-investment',
    type: 'email',
    label: 'Investment Inquiries',
    value: 'investment@realhouseiq.com',
    description: 'For investment opportunities and portfolio advisory',
    icon: 'icon-email',
    priority: 6,
    responseTime: 'Within 4 hours during business days'
  }
];

// ─── Social Media Links ──────────────────────────────────────────────────────

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username: string;
  icon: string;
  followers?: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    platform: 'Instagram',
    url: 'https://instagram.com/realhouseiq',
    username: '@realhouseiq',
    icon: 'icon-instagram',
    followers: '12.5K'
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    url: 'https://facebook.com/realhouseiq',
    username: 'Real House Erbil',
    icon: 'icon-facebook',
    followers: '8.2K'
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/realhouseiq',
    username: 'Real House',
    icon: 'icon-linkedin',
    followers: '3.1K'
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    url: 'https://youtube.com/@realhouseiq',
    username: 'Real House Erbil',
    icon: 'icon-youtube',
    followers: '2.4K'
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    url: 'https://tiktok.com/@realhouseiq',
    username: '@realhouseiq',
    icon: 'icon-tiktok',
    followers: '5.8K'
  }
];

// ─── Response Time Commitments ───────────────────────────────────────────────

export interface ResponseCommitment {
  channel: string;
  responseTime: string;
  description: string;
  icon: string;
}

export const responseCommitments: ResponseCommitment[] = [
  {
    channel: 'Phone Calls',
    responseTime: 'Immediate',
    description: 'All calls answered within 3 rings during business hours',
    icon: 'icon-phone'
  },
  {
    channel: 'WhatsApp Messages',
    responseTime: 'Within 1 hour',
    description: 'Quick responses during business hours, next business day for after-hours messages',
    icon: 'icon-whatsapp'
  },
  {
    channel: 'Email Inquiries',
    responseTime: 'Within 4 hours',
    description: 'Detailed responses within 4 business hours, preliminary acknowledgment within 1 hour',
    icon: 'icon-email'
  },
  {
    channel: 'Website Forms',
    responseTime: 'Within 2 hours',
    description: 'Web form submissions receive priority response',
    icon: 'icon-form'
  },
  {
    channel: 'Property Viewing Requests',
    responseTime: 'Same day',
    description: 'Viewing appointments confirmed within the same business day',
    icon: 'icon-calendar'
  },
  {
    channel: 'Documentation Requests',
    responseTime: 'Within 24 hours',
    description: 'Property documents and information packets prepared within one business day',
    icon: 'icon-document'
  }
];

// ─── Department Contacts ─────────────────────────────────────────────────────

export interface DepartmentContact {
  id: string;
  department: string;
  description: string;
  email: string;
  phone?: string;
  manager: string;
  managerId: string;
}

export const departments: DepartmentContact[] = [
  {
    id: 'sales',
    department: 'Property Sales',
    description: 'For buying or selling residential and commercial properties',
    email: 'sales@realhouseiq.com',
    phone: '+964 751 441 5003',
    manager: 'Abdalkader Hussein',
    managerId: 'abdalkader-hussein'
  },
  {
    id: 'investment',
    department: 'Investment Advisory',
    description: 'For investment opportunities, portfolio advisory, and ROI analysis',
    email: 'investment@realhouseiq.com',
    manager: 'Mahmood Ali',
    managerId: 'mahmood-ali'
  },
  {
    id: 'commercial',
    department: 'Commercial Properties',
    description: 'For retail, office, and commercial space inquiries',
    email: 'commercial@realhouseiq.com',
    manager: 'Hana Jalal',
    managerId: 'hana-jalal'
  },
  {
    id: 'rentals',
    department: 'Rentals & Property Management',
    description: 'For rental inquiries and property management services',
    email: 'rentals@realhouseiq.com',
    manager: 'Sara Ahmed',
    managerId: 'sara-ahmed'
  },
  {
    id: 'international',
    department: 'International Buyers',
    description: 'Dedicated support for international and diaspora buyers',
    email: 'international@realhouseiq.com',
    manager: 'Ahmad Mahmoud',
    managerId: 'ahmad-mahmoud'
  },
  {
    id: 'media',
    department: 'Media & Press',
    description: 'For media inquiries, interviews, and press requests',
    email: 'media@realhouseiq.com',
    manager: 'Shilan Azad',
    managerId: 'shilan-azad'
  }
];

// ─── FAQ Categories for Contact ──────────────────────────────────────────────

export interface ContactFAQ {
  question: string;
  answer: string;
}

export const contactFAQs: ContactFAQ[] = [
  {
    question: 'What are your office hours?',
    answer: 'Our headquarters is open Saturday through Thursday from 10:00 AM to 6:00 PM. Friday visits are by appointment only.'
  },
  {
    question: 'Do you offer virtual consultations?',
    answer: 'Yes, we offer video consultations for clients who cannot visit in person. We use Zoom, Google Meet, or WhatsApp video calls. Contact us to schedule a virtual meeting at your convenience.'
  },
  {
    question: 'Can I schedule property viewings outside office hours?',
    answer: 'Yes, we can arrange viewings during evenings or on Fridays by prior arrangement. Please contact us at least 24 hours in advance to schedule an after-hours viewing.'
  },
  {
    question: 'What languages do your team speak?',
    answer: 'Our team is fluent in Kurdish, Arabic, and English. Several team members also speak Turkish and Persian. We can accommodate most language preferences.'
  },
  {
    question: 'How quickly will you respond to my inquiry?',
    answer: 'We commit to responding to all inquiries within 4 hours during business hours. Phone calls are answered immediately, WhatsApp within 1 hour, and emails within 4 hours. Weekend inquiries receive responses on the next business day.'
  },
  {
    question: 'Do you have parking at your office?',
    answer: 'Yes, free parking is available at our Dream City headquarters. Our Gulan office visitors can use the paid parking at Family Mall.'
  }
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getMainOffice(): OfficeLocation {
  return offices.find(o => o.type === 'headquarters') || offices[0];
}

export function getContactMethodsByType(type: ContactMethod['type']): ContactMethod[] {
  return contactMethods.filter(cm => cm.type === type).sort((a, b) => a.priority - b.priority);
}

export function getDepartmentById(id: string): DepartmentContact | undefined {
  return departments.find(d => d.id === id);
}

export function formatOfficeHours(hours: OfficeHours): string[] {
  return [
    `Saturday - Thursday: ${hours.saturday}`,
    `Friday: ${hours.friday}`,
    hours.holidays ? `Holidays: ${hours.holidays}` : ''
  ].filter(Boolean);
}

// ─── Schema Generation ───────────────────────────────────────────────────────

export function generateContactPageSchema(): object {
  const mainOffice = getMainOffice();

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Real House',
    'alternateName': 'Real House Erbil',
    'description': 'Premier luxury real estate agency in Erbil, Kurdistan Region, Iraq. 23 years of trusted service.',
    'url': 'https://realhouseiq.com',
    'logo': 'https://realhouseiq.com/logo.svg',
    'image': 'https://realhouseiq.com/office.jpg',
    'telephone': mainOffice.phone,
    'email': mainOffice.email,
    'faxNumber': mainOffice.fax,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': mainOffice.address.street,
      'addressLocality': mainOffice.address.city,
      'addressRegion': mainOffice.address.region,
      'postalCode': mainOffice.address.postalCode,
      'addressCountry': 'IQ'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': mainOffice.coordinates.latitude,
      'longitude': mainOffice.coordinates.longitude
    },
    'hasMap': mainOffice.googleMapsUrl,
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        'opens': '09:00',
        'closes': '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Friday',
        'opens': '00:00',
        'closes': '00:00',
        'description': 'By Appointment Only'
      }
    ],
    'priceRange': '$$$',
    'currenciesAccepted': 'USD, IQD',
    'paymentAccepted': 'Cash, Bank Transfer',
    'sameAs': socialLinks.map(s => s.url),
    'contactPoint': departments.map(dept => ({
      '@type': 'ContactPoint',
      'contactType': dept.department,
      'email': dept.email,
      'telephone': dept.phone || mainOffice.phone[0],
      'availableLanguage': ['English', 'Arabic', 'Kurdish']
    }))
  };
}
