// ═══════════════════════════════════════════════════════════════════════════
// Property Data
// ═══════════════════════════════════════════════════════════════════════════

export interface Property {
  id: string;
  title: string;
  type: 'Villa' | 'Penthouse' | 'Estate' | 'Townhouse' | 'Condominium';
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  specs: {
    beds: number;
    baths: number;
    sqft: number;
    yearBuilt: number;
  };
  images: string[];
  description: string;
  features: string[];
  isFeatured: boolean;
  isNew: boolean;
}

export const properties: Property[] = [
  {
    id: 'beverly-hills-estate',
    title: 'The Beverly Hills Estate',
    type: 'Estate',
    price: 45000000,
    location: {
      address: '1200 Hillcrest Road',
      city: 'Beverly Hills',
      state: 'California',
      country: 'USA'
    },
    specs: {
      beds: 8,
      baths: 12,
      sqft: 18500,
      yearBuilt: 2021
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
    ],
    description: 'An architectural masterpiece set on 2.5 acres of meticulously landscaped grounds.',
    features: ['Infinity Pool', 'Wine Cellar', 'Home Theater', 'Smart Home'],
    isFeatured: true,
    isNew: false
  },
  {
    id: 'miami-penthouse',
    title: 'Ocean View Penthouse',
    type: 'Penthouse',
    price: 28000000,
    location: {
      address: '1000 Biscayne Boulevard',
      city: 'Miami',
      state: 'Florida',
      country: 'USA'
    },
    specs: {
      beds: 5,
      baths: 6,
      sqft: 8200,
      yearBuilt: 2023
    },
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80'
    ],
    description: 'Breathtaking 360-degree views from this triple-level penthouse in the sky.',
    features: ['Private Elevator', 'Rooftop Terrace', 'Ocean Views', 'Concierge'],
    isFeatured: true,
    isNew: true
  },
  {
    id: 'malibu-villa',
    title: 'Malibu Beach House',
    type: 'Villa',
    price: 35000000,
    location: {
      address: '21500 Pacific Coast Highway',
      city: 'Malibu',
      state: 'California',
      country: 'USA'
    },
    specs: {
      beds: 6,
      baths: 8,
      sqft: 9500,
      yearBuilt: 2020
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80'
    ],
    description: 'Contemporary beachfront living with direct sand access and stunning sunsets.',
    features: ['Beach Access', 'Outdoor Kitchen', 'Guest House', 'Spa'],
    isFeatured: true,
    isNew: false
  },
  {
    id: 'manhattan-townhouse',
    title: 'Upper East Side Townhouse',
    type: 'Townhouse',
    price: 22000000,
    location: {
      address: '124 East 70th Street',
      city: 'New York',
      state: 'New York',
      country: 'USA'
    },
    specs: {
      beds: 5,
      baths: 6,
      sqft: 7200,
      yearBuilt: 1910
    },
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ],
    description: 'Historic charm meets modern luxury in this fully renovated landmark townhouse.',
    features: ['Private Garden', 'Library', 'Wine Room', 'Elevator'],
    isFeatured: false,
    isNew: false
  },
  {
    id: 'aspen-chalet',
    title: 'Alpine Luxury Chalet',
    type: 'Villa',
    price: 32000000,
    location: {
      address: '999 Mountain View Lane',
      city: 'Aspen',
      state: 'Colorado',
      country: 'USA'
    },
    specs: {
      beds: 7,
      baths: 9,
      sqft: 12000,
      yearBuilt: 2019
    },
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80'
    ],
    description: 'Ski-in/ski-out mountain retreat with panoramic views of the Rockies.',
    features: ['Ski Access', 'Hot Tub', 'Game Room', 'Heated Driveway'],
    isFeatured: false,
    isNew: true
  },
  {
    id: 'hamptons-estate',
    title: 'Oceanfront Hamptons Estate',
    type: 'Estate',
    price: 55000000,
    location: {
      address: '200 Dune Road',
      city: 'East Hampton',
      state: 'New York',
      country: 'USA'
    },
    specs: {
      beds: 10,
      baths: 14,
      sqft: 22000,
      yearBuilt: 2022
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80'
    ],
    description: 'The ultimate summer retreat spanning 4 acres with private beach access.',
    features: ['Tennis Court', 'Pool House', 'Beach Access', 'Staff Quarters'],
    isFeatured: false,
    isNew: false
  },
  {
    id: 'sf-penthouse',
    title: 'Pacific Heights Penthouse',
    type: 'Penthouse',
    price: 18500000,
    location: {
      address: '2500 Pacific Avenue',
      city: 'San Francisco',
      state: 'California',
      country: 'USA'
    },
    specs: {
      beds: 4,
      baths: 5,
      sqft: 5800,
      yearBuilt: 2018
    },
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80'
    ],
    description: 'Bay views and city skyline from every room in this modern masterpiece.',
    features: ['Bay Views', 'Chef Kitchen', 'Wine Storage', 'Parking'],
    isFeatured: false,
    isNew: false
  },
  {
    id: 'chicago-condo',
    title: 'Lake Shore Drive Residence',
    type: 'Condominium',
    price: 8500000,
    location: {
      address: '999 N. Lake Shore Drive',
      city: 'Chicago',
      state: 'Illinois',
      country: 'USA'
    },
    specs: {
      beds: 4,
      baths: 4,
      sqft: 4200,
      yearBuilt: 2020
    },
    images: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    ],
    description: 'Full-floor residence with sweeping lake and skyline views.',
    features: ['Lake Views', 'Doorman', 'Gym', 'Spa'],
    isFeatured: false,
    isNew: true
  },
  {
    id: 'scottsdale-villa',
    title: 'Desert Contemporary Villa',
    type: 'Villa',
    price: 12000000,
    location: {
      address: '5555 E. Mockingbird Lane',
      city: 'Scottsdale',
      state: 'Arizona',
      country: 'USA'
    },
    specs: {
      beds: 5,
      baths: 6,
      sqft: 8800,
      yearBuilt: 2021
    },
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80'
    ],
    description: 'Architectural gem blending indoor-outdoor living in the Sonoran Desert.',
    features: ['Infinity Pool', 'Mountain Views', 'Guest Casita', 'Fire Pit'],
    isFeatured: false,
    isNew: false
  }
];

export const featuredProperties = properties.filter(p => p.isFeatured);

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${price.toLocaleString()}`;
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id);
}
