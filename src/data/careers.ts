// ═══════════════════════════════════════════════════════════════════════════
// Careers Data - Real House Job Listings
// Job opportunities at Real House with comprehensive details
// ═══════════════════════════════════════════════════════════════════════════

export type Department = 'Sales' | 'Marketing' | 'Operations' | 'IT';
export type JobType = 'Full-time' | 'Part-time' | 'Contract';
export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior';

export interface JobListing {
  id: string;
  slug: string;
  title: string;
  department: Department;
  location: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline?: string;
  isActive: boolean;
}

export const jobListings: JobListing[] = [
  {
    id: 'job-1',
    slug: 'real-estate-agent',
    title: 'Real Estate Agent',
    department: 'Sales',
    location: 'Erbil, Kurdistan',
    type: 'Full-time',
    experienceLevel: 'Mid',
    salaryRange: {
      min: 1500,
      max: 4000,
      currency: 'USD'
    },
    description: 'We are seeking an experienced and motivated Real Estate Agent to join our dynamic sales team at Real House. The ideal candidate will have a passion for luxury real estate and excellent communication skills. You will be responsible for assisting clients in buying, selling, and renting premium properties across Erbil and the Kurdistan Region.',
    responsibilities: [
      'Generate and qualify leads through various marketing channels and networking',
      'Conduct property viewings and provide expert guidance to potential buyers and renters',
      'Negotiate offers and contracts on behalf of clients to achieve optimal outcomes',
      'Build and maintain strong relationships with property owners and developers',
      'Stay updated on market trends, property values, and real estate regulations',
      'Prepare accurate property listings with compelling descriptions and professional photography',
      'Achieve monthly and quarterly sales targets',
      'Provide exceptional customer service throughout the entire transaction process',
      'Maintain detailed records of all client interactions and transactions in CRM system',
      'Attend industry events and represent Real House professionally'
    ],
    requirements: [
      '2+ years of experience in real estate sales or similar sales role',
      'Fluent in Kurdish, Arabic, and English (additional languages are a plus)',
      'Valid driver\'s license and access to a vehicle',
      'Strong negotiation and closing skills',
      'Excellent interpersonal and communication abilities',
      'Self-motivated with a results-driven attitude',
      'Proficiency in Microsoft Office and CRM software',
      'Knowledge of Erbil neighborhoods and property market',
      'Professional appearance and demeanor',
      'Willingness to work flexible hours including weekends'
    ],
    benefits: [
      'Competitive base salary plus commission structure',
      'Health insurance coverage',
      'Annual performance bonuses',
      'Professional development and training opportunities',
      'Company-sponsored real estate certifications',
      'Flexible working hours',
      'Modern office environment in Dream City',
      'Career advancement opportunities',
      'Annual leave and paid holidays',
      'Transportation allowance'
    ],
    postedDate: '2026-02-01',
    applicationDeadline: '2026-03-31',
    isActive: true
  },
  {
    id: 'job-2',
    slug: 'marketing-coordinator',
    title: 'Marketing Coordinator',
    department: 'Marketing',
    location: 'Erbil, Kurdistan',
    type: 'Full-time',
    experienceLevel: 'Entry',
    salaryRange: {
      min: 800,
      max: 1500,
      currency: 'USD'
    },
    description: 'Real House is looking for a creative and organized Marketing Coordinator to support our marketing team. This role involves executing marketing campaigns, managing social media presence, and creating engaging content that showcases our premium property portfolio to potential clients across Kurdistan and internationally.',
    responsibilities: [
      'Create and schedule engaging social media content across Instagram, Facebook, LinkedIn, and YouTube',
      'Coordinate professional photography and videography shoots for property listings',
      'Design marketing materials including brochures, flyers, and digital ads',
      'Assist in planning and executing marketing events and open houses',
      'Monitor and report on marketing campaign performance metrics',
      'Manage email marketing campaigns and newsletter distribution',
      'Maintain and update the company website with new listings and content',
      'Coordinate with external agencies for advertising and PR activities',
      'Research market trends and competitor activities',
      'Support the marketing team with administrative tasks and project coordination'
    ],
    requirements: [
      'Bachelor\'s degree in Marketing, Communications, or related field',
      '1+ years of experience in marketing or related role',
      'Proficiency in graphic design tools (Canva, Adobe Creative Suite)',
      'Strong understanding of social media platforms and best practices',
      'Excellent written and verbal communication in English and Arabic',
      'Experience with email marketing platforms (Mailchimp, HubSpot)',
      'Basic knowledge of SEO and Google Analytics',
      'Creative mindset with attention to detail',
      'Ability to multitask and meet deadlines',
      'Photography and video editing skills are a plus'
    ],
    benefits: [
      'Competitive salary package',
      'Health insurance',
      'Professional training and development',
      'Creative and dynamic work environment',
      'Opportunity to work with luxury brands',
      'Modern office in Dream City',
      'Team building activities',
      'Career growth opportunities',
      'Annual leave and paid holidays',
      'Performance bonuses'
    ],
    postedDate: '2026-02-10',
    applicationDeadline: '2026-03-15',
    isActive: true
  },
  {
    id: 'job-3',
    slug: 'property-manager',
    title: 'Property Manager',
    department: 'Operations',
    location: 'Erbil, Kurdistan',
    type: 'Full-time',
    experienceLevel: 'Mid',
    salaryRange: {
      min: 1200,
      max: 2500,
      currency: 'USD'
    },
    description: 'We are seeking an experienced Property Manager to oversee our growing portfolio of managed properties. You will be responsible for ensuring the smooth operation of residential and commercial properties, maintaining tenant satisfaction, and maximizing property values for our clients.',
    responsibilities: [
      'Manage day-to-day operations of residential and commercial properties',
      'Handle tenant inquiries, complaints, and maintenance requests promptly',
      'Conduct regular property inspections and prepare detailed reports',
      'Coordinate maintenance and repair work with contractors and service providers',
      'Collect rent and manage property financial records',
      'Screen and onboard new tenants following company procedures',
      'Ensure compliance with local regulations and lease agreements',
      'Prepare monthly financial reports for property owners',
      'Negotiate and manage vendor contracts',
      'Develop and implement property improvement strategies'
    ],
    requirements: [
      '3+ years of experience in property management or facilities management',
      'Strong organizational and time management skills',
      'Excellent problem-solving abilities',
      'Fluent in Kurdish, Arabic, and English',
      'Experience with property management software',
      'Knowledge of building maintenance and repair',
      'Strong financial acumen and attention to detail',
      'Excellent customer service skills',
      'Valid driver\'s license',
      'Ability to handle emergency situations professionally'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance coverage',
      'Performance-based bonuses',
      'Professional development opportunities',
      'Flexible working arrangements',
      'Company vehicle for property visits',
      'Annual leave and paid holidays',
      'Career advancement path',
      'Modern office environment',
      'Supportive team culture'
    ],
    postedDate: '2026-02-05',
    applicationDeadline: '2026-04-05',
    isActive: true
  },
  {
    id: 'job-4',
    slug: 'it-support-specialist',
    title: 'IT Support Specialist',
    department: 'IT',
    location: 'Erbil, Kurdistan',
    type: 'Full-time',
    experienceLevel: 'Entry',
    salaryRange: {
      min: 700,
      max: 1200,
      currency: 'USD'
    },
    description: 'Real House is looking for an IT Support Specialist to maintain and support our technology infrastructure. You will be responsible for providing technical support to staff, managing our systems, and ensuring our digital platforms run smoothly to support our real estate operations.',
    responsibilities: [
      'Provide first-line technical support to all staff members',
      'Install, configure, and maintain hardware and software systems',
      'Manage and troubleshoot network connectivity issues',
      'Maintain website content and ensure optimal performance',
      'Set up and manage user accounts and access permissions',
      'Perform regular system backups and security updates',
      'Document technical procedures and maintain IT inventory',
      'Support virtual tour and digital marketing platforms',
      'Coordinate with external IT vendors when needed',
      'Train staff on new software and technology tools'
    ],
    requirements: [
      'Bachelor\'s degree in IT, Computer Science, or related field',
      '1+ years of experience in IT support or help desk role',
      'Strong knowledge of Windows and Mac operating systems',
      'Experience with networking, routers, and firewalls',
      'Familiarity with website management and CMS platforms',
      'Good understanding of cybersecurity best practices',
      'Excellent troubleshooting and problem-solving skills',
      'Strong communication skills in English',
      'Ability to explain technical concepts to non-technical users',
      'Knowledge of cloud services (Google Workspace, Microsoft 365) is a plus'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Technical training and certifications',
      'Modern technology environment',
      'Career growth opportunities',
      'Flexible working hours',
      'Annual leave and paid holidays',
      'Team activities and events',
      'Professional development budget',
      'Supportive work culture'
    ],
    postedDate: '2026-02-15',
    applicationDeadline: '2026-03-30',
    isActive: true
  },
  {
    id: 'job-5',
    slug: 'receptionist-office-coordinator',
    title: 'Receptionist / Office Coordinator',
    department: 'Operations',
    location: 'Erbil, Kurdistan',
    type: 'Full-time',
    experienceLevel: 'Entry',
    salaryRange: {
      min: 500,
      max: 800,
      currency: 'USD'
    },
    description: 'We are looking for a friendly and professional Receptionist / Office Coordinator to be the first point of contact for our clients and visitors. You will manage front desk operations, provide administrative support, and ensure a welcoming atmosphere at our Dream City office.',
    responsibilities: [
      'Greet and welcome clients and visitors in a professional manner',
      'Answer and direct phone calls, emails, and inquiries',
      'Schedule appointments and manage meeting room bookings',
      'Maintain a clean and organized reception area',
      'Handle incoming and outgoing mail and deliveries',
      'Assist with administrative tasks such as data entry and filing',
      'Coordinate office supplies and inventory management',
      'Support the sales team with client communications',
      'Prepare beverages for clients and maintain kitchen area',
      'Assist with event coordination and office activities'
    ],
    requirements: [
      'High school diploma or equivalent; college degree preferred',
      'Previous experience in reception or customer service role',
      'Excellent communication skills in Kurdish, Arabic, and English',
      'Professional appearance and positive attitude',
      'Strong organizational skills and attention to detail',
      'Proficiency in Microsoft Office (Word, Excel, Outlook)',
      'Ability to multitask in a fast-paced environment',
      'Reliable and punctual with strong work ethic',
      'Basic computer skills and ability to learn new software',
      'Friendly and welcoming personality'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Professional work environment',
      'Training and development opportunities',
      'Opportunities for career advancement',
      'Annual leave and paid holidays',
      'Team events and activities',
      'Modern office in Dream City',
      'Supportive team atmosphere',
      'Performance bonuses'
    ],
    postedDate: '2026-02-20',
    applicationDeadline: '2026-03-20',
    isActive: true
  }
];

// ─── Company Benefits ────────────────────────────────────────────────────────

export interface CompanyBenefit {
  icon: string;
  title: string;
  description: string;
}

export const companyBenefits: CompanyBenefit[] = [
  {
    icon: 'icon-shield',
    title: 'Health Insurance',
    description: 'Comprehensive health coverage for you and your family, including dental and vision care.'
  },
  {
    icon: 'icon-chart',
    title: 'Career Growth',
    description: 'Clear advancement paths and opportunities to grow within the company.'
  },
  {
    icon: 'icon-award',
    title: 'Performance Bonuses',
    description: 'Competitive commission and bonus structures that reward your hard work.'
  },
  {
    icon: 'icon-school',
    title: 'Training & Development',
    description: 'Regular training programs, certifications, and professional development opportunities.'
  },
  {
    icon: 'icon-clock',
    title: 'Flexible Hours',
    description: 'Work-life balance with flexible scheduling options for eligible positions.'
  },
  {
    icon: 'icon-users',
    title: 'Team Culture',
    description: 'Collaborative and supportive work environment with regular team activities.'
  }
];

// ─── Company Culture Values ──────────────────────────────────────────────────

export interface CultureValue {
  title: string;
  description: string;
}

export const cultureValues: CultureValue[] = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from client service to property presentation.'
  },
  {
    title: 'Integrity',
    description: 'We operate with honesty and transparency in all our dealings with clients and colleagues.'
  },
  {
    title: 'Innovation',
    description: 'We embrace new technologies and approaches to stay ahead in the real estate market.'
  },
  {
    title: 'Teamwork',
    description: 'We believe in collaboration and supporting each other to achieve shared goals.'
  },
  {
    title: 'Client Focus',
    description: 'Our clients are at the heart of everything we do - their success is our success.'
  }
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getJobBySlug(slug: string): JobListing | undefined {
  return jobListings.find(job => job.slug === slug);
}

export function getJobById(id: string): JobListing | undefined {
  return jobListings.find(job => job.id === id);
}

export function getAllJobSlugs(): string[] {
  return jobListings.map(job => job.slug);
}

export function getActiveJobs(): JobListing[] {
  return jobListings.filter(job => job.isActive);
}

export function getJobsByDepartment(department: Department): JobListing[] {
  return jobListings.filter(job => job.department === department && job.isActive);
}

export function getJobsByType(type: JobType): JobListing[] {
  return jobListings.filter(job => job.type === type && job.isActive);
}

export function getAllDepartments(): Department[] {
  return ['Sales', 'Marketing', 'Operations', 'IT'];
}

export function getAllJobTypes(): JobType[] {
  return ['Full-time', 'Part-time', 'Contract'];
}

export function formatSalaryRange(job: JobListing): string {
  if (!job.salaryRange) return 'Competitive';
  const { min, max, currency } = job.salaryRange;
  return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()} / month`;
}

export function formatPostedDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function isDeadlineSoon(deadline: string | undefined): boolean {
  if (!deadline) return false;
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 && diffDays <= 7;
}

// ─── JSON-LD Schema Generation ───────────────────────────────────────────────

export function generateJobPostingSchema(job: JobListing): object {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': job.title,
    'description': job.description,
    'datePosted': job.postedDate,
    'employmentType': job.type.toUpperCase().replace('-', '_'),
    'hiringOrganization': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'sameAs': 'https://realhouseiq.com',
      'logo': 'https://realhouseiq.com/logo.png'
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Queen Tower',
        'addressLocality': 'Erbil',
        'addressRegion': 'Kurdistan Region',
        'postalCode': '44001',
        'addressCountry': 'IQ'
      }
    },
    'identifier': {
      '@type': 'PropertyValue',
      'name': 'Real House',
      'value': job.id
    },
    'responsibilities': job.responsibilities.join('. '),
    'qualifications': job.requirements.join('. '),
    'jobBenefits': job.benefits.join('. '),
    'industry': 'Real Estate',
    'occupationalCategory': job.department
  };

  if (job.applicationDeadline) {
    schema.validThrough = job.applicationDeadline;
  }

  if (job.salaryRange) {
    schema.baseSalary = {
      '@type': 'MonetaryAmount',
      'currency': job.salaryRange.currency,
      'value': {
        '@type': 'QuantitativeValue',
        'minValue': job.salaryRange.min,
        'maxValue': job.salaryRange.max,
        'unitText': 'MONTH'
      }
    };
  }

  if (job.experienceLevel === 'Entry') {
    schema.experienceRequirements = 'Entry level';
  } else if (job.experienceLevel === 'Mid') {
    schema.experienceRequirements = '2-5 years';
  } else if (job.experienceLevel === 'Senior') {
    schema.experienceRequirements = '5+ years';
  }

  return schema;
}
