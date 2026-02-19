// ═══════════════════════════════════════════════════════════════════════════
// Testimonial Data - Erbil, Iraq
// ═══════════════════════════════════════════════════════════════════════════

export interface Testimonial {
  id: string;
  name: string;
  nameKu?: string;
  nameAr?: string;
  role: string;
  location: string;
  quote: string;
  quoteKu?: string;
  quoteAr?: string;
  image: string;
  rating: number;
  propertyType?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Dr. Karwan Mahmoud',
    role: 'Business Owner',
    location: 'Dream City, Erbil',
    quote: 'Real House IQ helped us find our dream villa in Dream City. Their professionalism and knowledge of the Erbil market made the entire process smooth and enjoyable. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    rating: 5,
    propertyType: 'Villa'
  },
  {
    id: 'testimonial-2',
    name: 'Sara Ahmed',
    role: 'Medical Doctor',
    location: 'Italian Village, Erbil',
    quote: 'The team at Real House IQ truly understands luxury living. They found us a beautiful townhouse in Italian Village that perfectly matches our lifestyle. Their service is exceptional.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    rating: 5,
    propertyType: 'Townhouse'
  },
  {
    id: 'testimonial-3',
    name: 'Mohammed Hassan',
    role: 'CEO, Tech Company',
    location: 'Empire World, Erbil',
    quote: 'Finding the right investment property in Erbil can be challenging, but Real House IQ made it effortless. Their market expertise and transparent approach helped me secure an excellent penthouse.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    rating: 5,
    propertyType: 'Penthouse'
  },
  {
    id: 'testimonial-4',
    name: 'Narin Bakir',
    role: 'Architect',
    location: 'English Village, Erbil',
    quote: 'As an architect, I have high standards for property quality. Real House IQ showed me only the finest homes that met my criteria. Their curated selection saved me valuable time.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    rating: 5,
    propertyType: 'Villa'
  },
  {
    id: 'testimonial-5',
    name: 'Ali Rashid',
    role: 'International Investor',
    location: 'Dubai, UAE',
    quote: 'Even from abroad, Real House IQ provided outstanding service. They handled everything from property tours via video call to completing the purchase. A truly professional team.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    rating: 5,
    propertyType: 'Apartment'
  },
  {
    id: 'testimonial-6',
    name: 'Layla Ibrahim',
    role: 'Family Business',
    location: 'Gulan, Erbil',
    quote: 'We were looking for an apartment near Family Mall for convenience. Real House IQ not only found us the perfect home but also negotiated a great price. Thank you for your dedication!',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    rating: 5,
    propertyType: 'Apartment'
  }
];

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find(t => t.id === id);
}
