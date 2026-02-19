// ═══════════════════════════════════════════════════════════════════════════
// API Service - Connect frontend to backend
// ═══════════════════════════════════════════════════════════════════════════

const API_BASE = import.meta.env.PROD
  ? 'https://realhouseiq.com/api'
  : 'http://localhost:3001/api';

export interface APIProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  price_value: number;
  type: string;
  status: string;
  beds: number;
  baths: number;
  sqft: number;
  lot_size?: number;
  year_built?: number;
  neighborhood?: string;
  description: string;
  short_description?: string;
  images: string[];
  features: string[];
  virtual_tour_url?: string;
  floor_plan_url?: string;
  featured: number;
  published: number;
  created_at: string;
  updated_at: string;
}

export interface APITestimonial {
  id: string;
  name: string;
  role?: string;
  location?: string;
  quote: string;
  rating: number;
  property_type?: string;
  image_url?: string;
}

// Fetch all published properties
export async function fetchProperties(options?: {
  featured?: boolean;
  type?: string;
  limit?: number;
}): Promise<APIProperty[]> {
  const params = new URLSearchParams();
  params.append('published', 'true');

  if (options?.featured) params.append('featured', 'true');
  if (options?.type) params.append('type', options.type);
  if (options?.limit) params.append('limit', options.limit.toString());

  try {
    const response = await fetch(`${API_BASE}/properties?${params}`);
    if (!response.ok) throw new Error('Failed to fetch properties');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

// Fetch single property by ID
export async function fetchProperty(id: string): Promise<APIProperty | null> {
  try {
    const response = await fetch(`${API_BASE}/properties/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

// Fetch testimonials
export async function fetchTestimonials(): Promise<APITestimonial[]> {
  try {
    const response = await fetch(`${API_BASE}/content/testimonials`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

// Submit contact inquiry
export async function submitInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        message: data.message,
        property_id: data.propertyId || null,
        property_title: data.propertyTitle || 'General Inquiry'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, message: error.error || 'Failed to submit inquiry' };
    }

    return { success: true, message: 'Thank you! We will contact you soon.' };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
}
