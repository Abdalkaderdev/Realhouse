// ═══════════════════════════════════════════════════════════════════════════
// Nearby Amenities Data - Erbil Districts
// ═══════════════════════════════════════════════════════════════════════════

export interface Amenity {
  name: string;
  category: 'school' | 'restaurant' | 'shopping' | 'healthcare' | 'park';
  distance: string; // e.g., "5 min walk", "2 km"
}

export interface DistrictAmenities {
  schools: Amenity[];
  restaurants: Amenity[];
  shopping: Amenity[];
  healthcare: Amenity[];
  parks: Amenity[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Amenities by District
// ═══════════════════════════════════════════════════════════════════════════

export const districtAmenities: Record<string, DistrictAmenities> = {
  'Gulan': {
    schools: [
      { name: 'Gulan International School', category: 'school', distance: '5 min walk' },
      { name: 'British International School', category: 'school', distance: '1.2 km' }
    ],
    restaurants: [
      { name: 'The Grill House', category: 'restaurant', distance: '3 min walk' },
      { name: 'Citadel Cafe & Restaurant', category: 'restaurant', distance: '800 m' }
    ],
    shopping: [
      { name: 'Family Mall Erbil', category: 'shopping', distance: '10 min walk' },
      { name: 'Majidi Mall', category: 'shopping', distance: '1.5 km' }
    ],
    healthcare: [
      { name: 'PAR Hospital', category: 'healthcare', distance: '2 km' }
    ],
    parks: [
      { name: 'Gulan Park', category: 'park', distance: '7 min walk' }
    ]
  },
  'Dream City': {
    schools: [
      { name: 'Dream City International Academy', category: 'school', distance: '5 min walk' },
      { name: 'American International School', category: 'school', distance: '1 km' }
    ],
    restaurants: [
      { name: 'Dream City Lounge', category: 'restaurant', distance: '2 min walk' },
      { name: 'La Terrace Restaurant', category: 'restaurant', distance: '600 m' }
    ],
    shopping: [
      { name: 'Dream City Mall', category: 'shopping', distance: '5 min walk' },
      { name: 'Empire World', category: 'shopping', distance: '2 km' }
    ],
    healthcare: [
      { name: 'West Erbil Emergency Hospital', category: 'healthcare', distance: '1.5 km' }
    ],
    parks: [
      { name: 'Dream City Central Park', category: 'park', distance: '3 min walk' }
    ]
  },
  'Italian Village': {
    schools: [
      { name: 'Italian Village International School', category: 'school', distance: '8 min walk' },
      { name: 'Erbil International School', category: 'school', distance: '1.8 km' }
    ],
    restaurants: [
      { name: 'La Piazza Italian Restaurant', category: 'restaurant', distance: '5 min walk' },
      { name: 'Village Bistro', category: 'restaurant', distance: '400 m' }
    ],
    shopping: [
      { name: 'Italian Village Market', category: 'shopping', distance: '5 min walk' },
      { name: 'Family Mall Erbil', category: 'shopping', distance: '3 km' }
    ],
    healthcare: [
      { name: 'CMC Hospital', category: 'healthcare', distance: '2.5 km' }
    ],
    parks: [
      { name: 'Italian Village Garden', category: 'park', distance: '2 min walk' }
    ]
  },
  'English Village': {
    schools: [
      { name: 'English Village Academy', category: 'school', distance: '5 min walk' },
      { name: 'Cambridge International School', category: 'school', distance: '1.2 km' }
    ],
    restaurants: [
      { name: 'The English Pub', category: 'restaurant', distance: '3 min walk' },
      { name: 'Garden Terrace Cafe', category: 'restaurant', distance: '500 m' }
    ],
    shopping: [
      { name: 'English Village Shopping Center', category: 'shopping', distance: '5 min walk' },
      { name: 'Majidi Mall', category: 'shopping', distance: '4 km' }
    ],
    healthcare: [
      { name: 'Zheen International Hospital', category: 'healthcare', distance: '2 km' }
    ],
    parks: [
      { name: 'English Village Park', category: 'park', distance: '3 min walk' }
    ]
  },
  'Ankawa': {
    schools: [
      { name: 'Ankawa School for Girls', category: 'school', distance: '10 min walk' },
      { name: 'Mar Qardakh High School', category: 'school', distance: '1 km' }
    ],
    restaurants: [
      { name: 'Ankawa Palace Restaurant', category: 'restaurant', distance: '5 min walk' },
      { name: 'Classic Restaurant & Cafe', category: 'restaurant', distance: '700 m' }
    ],
    shopping: [
      { name: 'Ankawa Street Shops', category: 'shopping', distance: '5 min walk' },
      { name: 'Royal Mall', category: 'shopping', distance: '2 km' }
    ],
    healthcare: [
      { name: 'Rizgary Teaching Hospital', category: 'healthcare', distance: '3 km' }
    ],
    parks: [
      { name: 'Ankawa Park', category: 'park', distance: '8 min walk' }
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════════════

export function getAmenitiesForDistrict(district: string): DistrictAmenities | null {
  return districtAmenities[district] || null;
}

export function getAllAmenitiesForDistrict(district: string): Amenity[] {
  const amenities = getAmenitiesForDistrict(district);
  if (!amenities) return [];

  return [
    ...amenities.schools,
    ...amenities.restaurants,
    ...amenities.shopping,
    ...amenities.healthcare,
    ...amenities.parks
  ];
}

export function getCategoryIcon(category: Amenity['category']): string {
  switch (category) {
    case 'school':
      return 'icon-school';
    case 'restaurant':
      return 'icon-restaurant';
    case 'shopping':
      return 'icon-shopping';
    case 'healthcare':
      return 'icon-healthcare';
    case 'park':
      return 'icon-park';
    default:
      return 'icon-location';
  }
}

export function getCategoryLabel(category: Amenity['category']): string {
  switch (category) {
    case 'school':
      return 'Schools';
    case 'restaurant':
      return 'Restaurants';
    case 'shopping':
      return 'Shopping';
    case 'healthcare':
      return 'Healthcare';
    case 'park':
      return 'Parks';
    default:
      return 'Nearby';
  }
}
