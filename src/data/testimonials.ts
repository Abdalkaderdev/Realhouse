// ═══════════════════════════════════════════════════════════════════════════
// Testimonial Data - Erbil, Iraq
// Comprehensive Reviews for Testimonials Page with Video Support
// ═══════════════════════════════════════════════════════════════════════════

export interface Testimonial {
  id: string;
  name: string;
  nameKu?: string;
  nameAr?: string;
  role: string;
  company?: string;
  location: string;
  quote: string;
  quoteKu?: string;
  quoteAr?: string;
  image: string;
  rating: number;
  propertyType: string;
  serviceType: 'Buying' | 'Selling' | 'Renting' | 'Investment';
  isVerifiedBuyer: boolean;
  purchaseYear: number;
  reviewDate: string;
  videoUrl?: string;
  videoThumbnail?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Dr. Karwan Mahmoud',
    role: 'Medical Director',
    company: 'Erbil Heart Center',
    location: 'Dream City, Erbil',
    quote: 'Real House helped us find our dream villa in Dream City. Their professionalism and knowledge of the Erbil market made the entire process smooth and enjoyable. The team guided us through every step, from property selection to final paperwork. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Villa',
    serviceType: 'Buying',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-12-15',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoThumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&fm=webp'
  },
  {
    id: 'testimonial-2',
    name: 'Sara Ahmed',
    role: 'Consultant Physician',
    company: 'Kurdistan Medical Hospital',
    location: 'Italian Village, Erbil',
    quote: 'The team at Real House truly understands luxury living. They found us a beautiful townhouse in Italian Village that perfectly matches our lifestyle. Their service is exceptional. What impressed me most was their attention to detail and follow-up after the purchase.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Townhouse',
    serviceType: 'Buying',
    isVerifiedBuyer: true,
    purchaseYear: 2023,
    reviewDate: '2023-09-20'
  },
  {
    id: 'testimonial-3',
    name: 'Mohammed Hassan',
    role: 'CEO',
    company: 'Kurdistan Tech Solutions',
    location: 'Empire World, Erbil',
    quote: 'Finding the right investment property in Erbil can be challenging, but Real House made it effortless. Their market expertise and transparent approach helped me secure an excellent penthouse with amazing ROI potential. The analytics they provided were invaluable.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Penthouse',
    serviceType: 'Investment',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-11-08',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoThumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&fm=webp'
  },
  {
    id: 'testimonial-4',
    name: 'Narin Bakir',
    role: 'Senior Architect',
    company: 'Modern Design Studio',
    location: 'English Village, Erbil',
    quote: 'As an architect, I have high standards for property quality. Real House showed me only the finest homes that met my criteria. Their curated selection saved me valuable time. The properties they presented were exactly what I was looking for in terms of design and construction quality.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Villa',
    serviceType: 'Buying',
    isVerifiedBuyer: true,
    purchaseYear: 2023,
    reviewDate: '2023-07-12'
  },
  {
    id: 'testimonial-5',
    name: 'Ali Rashid',
    role: 'Investment Manager',
    company: 'Gulf Real Estate Holdings',
    location: 'Dubai, UAE',
    quote: 'Even from abroad, Real House provided outstanding service. They handled everything from property tours via video call to completing the purchase. A truly professional team. Their international client support is world-class, and they made investing in Erbil seamless.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Apartment',
    serviceType: 'Investment',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-10-25'
  },
  {
    id: 'testimonial-6',
    name: 'Layla Ibrahim',
    role: 'Managing Director',
    company: 'Ibrahim Trading Co.',
    location: 'Gulan, Erbil',
    quote: 'We were looking for an apartment near Family Mall for convenience. Real House not only found us the perfect home but also negotiated a great price. Thank you for your dedication! The entire family is thrilled with our new home.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Apartment',
    serviceType: 'Buying',
    isVerifiedBuyer: true,
    purchaseYear: 2023,
    reviewDate: '2023-11-30'
  },
  {
    id: 'testimonial-7',
    name: 'Zhala Karim',
    role: 'University Professor',
    company: 'Salahaddin University',
    location: 'Ankawa, Erbil',
    quote: 'Renting through Real House was a breeze. They understood exactly what I needed for my family and found us a beautiful apartment in Ankawa within days. The lease process was transparent, and they continue to provide excellent support as our property management company.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Apartment',
    serviceType: 'Renting',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-08-18'
  },
  {
    id: 'testimonial-8',
    name: 'Hoshyar Salih',
    role: 'Restaurant Owner',
    company: 'Erbil Cuisine Group',
    location: 'Bahirka, Erbil',
    quote: 'Selling my property through Real House exceeded all expectations. They marketed my villa professionally, brought qualified buyers, and closed the deal at a price higher than I expected. Their market knowledge and negotiation skills are unmatched in Erbil.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Villa',
    serviceType: 'Selling',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-09-05'
  },
  {
    id: 'testimonial-9',
    name: 'Dilan Mustafa',
    role: 'Interior Designer',
    company: 'Luxe Interiors Erbil',
    location: 'Roshnbiri, Erbil',
    quote: 'I purchased a penthouse in Dream City through Real House for investment purposes. Within three months, they found me reliable tenants and now manage the property excellently. The rental income has been consistent, and my investment is growing nicely.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Penthouse',
    serviceType: 'Investment',
    isVerifiedBuyer: true,
    purchaseYear: 2023,
    reviewDate: '2023-12-22',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoThumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&fm=webp'
  },
  {
    id: 'testimonial-10',
    name: 'Rebwar Aziz',
    role: 'Oil & Gas Engineer',
    company: 'Kurdistan Energy',
    location: 'Sarwaran, Erbil',
    quote: 'As an expat returning to Erbil, I needed help navigating the property market. Real House provided invaluable guidance on neighborhoods, pricing trends, and legal requirements. I now own a beautiful villa in Italian Village thanks to their expert advice.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Villa',
    serviceType: 'Buying',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-07-14'
  },
  {
    id: 'testimonial-11',
    name: 'Shirin Barzani',
    role: 'Boutique Owner',
    company: 'Fashion House Erbil',
    location: 'Ainkawa, Erbil',
    quote: 'Real House helped me find the perfect commercial space for my boutique on 100 Meter Street. Their understanding of commercial real estate and foot traffic analysis was impressive. My business has thrived in this location.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fm=webp',
    rating: 4,
    propertyType: 'Commercial',
    serviceType: 'Renting',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-06-30'
  },
  {
    id: 'testimonial-12',
    name: 'Aryan Jabbar',
    role: 'Software Developer',
    company: 'Tech Startup',
    location: 'Mamostayan, Erbil',
    quote: 'First-time buyer here, and Real House made the experience stress-free. They patiently explained every step of the buying process, helped with financing options, and found me an affordable apartment in a great neighborhood. Could not be happier!',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Apartment',
    serviceType: 'Buying',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-05-20'
  },
  {
    id: 'testimonial-13',
    name: 'Bahar Khalid',
    role: 'Pharmacist',
    company: 'Kurdistan Pharmacy Chain',
    location: 'Havalan, Erbil',
    quote: 'Selling and buying at the same time seemed overwhelming, but Real House coordinated everything perfectly. They sold my apartment in Havalan and helped me upgrade to a villa in English Village. The timing was impeccable.',
    image: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Villa',
    serviceType: 'Selling',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-04-15'
  },
  {
    id: 'testimonial-14',
    name: 'Omar Al-Qureshi',
    role: 'Regional Director',
    company: 'International Construction',
    location: 'Baghdad, Iraq',
    quote: 'Investing in Erbil real estate from Baghdad was made simple by Real House. Their virtual tours, detailed market reports, and trustworthy handling of paperwork gave me confidence. My investment portfolio in Empire World is performing excellently.',
    image: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Apartment',
    serviceType: 'Investment',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-03-28'
  },
  {
    id: 'testimonial-15',
    name: 'Rozhin Hawrami',
    role: 'Hotel Manager',
    company: 'Erbil Grand Hotel',
    location: 'Dream City, Erbil',
    quote: 'After renting for years, Real House helped me take the step to homeownership. They found a stunning villa in Dream City within my budget and guided me through the entire mortgage process. Now I wake up every day in my dream home!',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80&fm=webp',
    rating: 5,
    propertyType: 'Villa',
    serviceType: 'Buying',
    isVerifiedBuyer: true,
    purchaseYear: 2024,
    reviewDate: '2024-02-10'
  }
];

// ─── Helper Functions ─────────────────────────────────────────────────────

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find(t => t.id === id);
}

export function getTestimonialsByServiceType(serviceType: Testimonial['serviceType']): Testimonial[] {
  return testimonials.filter(t => t.serviceType === serviceType);
}

export function getTestimonialsByRating(rating: number): Testimonial[] {
  return testimonials.filter(t => t.rating === rating);
}

export function getVideoTestimonials(): Testimonial[] {
  return testimonials.filter(t => t.videoUrl);
}

export function getVerifiedTestimonials(): Testimonial[] {
  return testimonials.filter(t => t.isVerifiedBuyer);
}

export function getTestimonialStats(): {
  totalReviews: number;
  averageRating: number;
  satisfactionPercentage: number;
  fiveStarCount: number;
  fourStarCount: number;
} {
  const total = testimonials.length;
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  const avg = sum / total;
  const fiveStars = testimonials.filter(t => t.rating === 5).length;
  const fourStars = testimonials.filter(t => t.rating === 4).length;
  const satisfied = testimonials.filter(t => t.rating >= 4).length;

  return {
    totalReviews: total,
    averageRating: Math.round(avg * 10) / 10,
    satisfactionPercentage: Math.round((satisfied / total) * 100),
    fiveStarCount: fiveStars,
    fourStarCount: fourStars
  };
}
