// =============================================================================
// Social Media SEO Module for Real House
// Comprehensive Open Graph, Twitter Card, Pinterest, and LinkedIn Tags
// Dynamic OG Images and Social Sharing Optimization
// =============================================================================

import { type Property } from '../data/properties';
import { type Project } from '../data/projects';
import { type BlogPost } from '../data/blog';

const BASE_URL = 'https://realhouseiq.com';
const SITE_NAME = 'Real House';
const TWITTER_HANDLE = '@realhouseiq';
const FB_APP_ID = 'your-fb-app-id'; // Replace with actual FB App ID

// =============================================================================
// Types
// =============================================================================

export interface SocialMetaConfig {
  title: string;
  description: string;
  url: string;
  image: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type: 'website' | 'article' | 'product' | 'place' | 'profile';
  locale?: string;
  siteName?: string;
  // Article-specific
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  // Product-specific
  price?: number;
  currency?: string;
  availability?: 'in stock' | 'out of stock' | 'preorder';
  // Pinterest-specific
  pinId?: string;
  // LinkedIn-specific
  linkedInAuthor?: string;
}

// =============================================================================
// Open Graph Tag Generators
// =============================================================================

/**
 * Generate comprehensive Open Graph meta tags
 */
export function generateOpenGraphTags(config: SocialMetaConfig): Record<string, string> {
  const tags: Record<string, string> = {
    'og:title': config.title,
    'og:description': config.description.slice(0, 300),
    'og:url': config.url,
    'og:image': config.image,
    'og:image:secure_url': config.image.replace('http://', 'https://'),
    'og:image:type': getImageType(config.image),
    'og:image:width': (config.imageWidth || 1200).toString(),
    'og:image:height': (config.imageHeight || 630).toString(),
    'og:image:alt': config.imageAlt || config.title,
    'og:type': config.type,
    'og:site_name': config.siteName || SITE_NAME,
    'og:locale': config.locale || 'en_US',
    'og:locale:alternate': 'ar_IQ',
  };

  // Article-specific tags
  if (config.type === 'article') {
    if (config.author) {
      tags['article:author'] = config.author;
    }
    if (config.publishedTime) {
      tags['article:published_time'] = config.publishedTime;
    }
    if (config.modifiedTime) {
      tags['article:modified_time'] = config.modifiedTime;
    }
    if (config.section) {
      tags['article:section'] = config.section;
    }
    if (config.tags && config.tags.length > 0) {
      config.tags.slice(0, 6).forEach((tag, index) => {
        tags[`article:tag:${index}`] = tag;
      });
    }
  }

  // Product-specific tags (for properties)
  if (config.type === 'product') {
    if (config.price) {
      tags['product:price:amount'] = config.price.toString();
      tags['product:price:currency'] = config.currency || 'USD';
    }
    if (config.availability) {
      tags['product:availability'] = config.availability;
    }
    tags['product:retailer_item_id'] = config.url.split('/').pop() || '';
    tags['product:brand'] = SITE_NAME;
    tags['product:condition'] = 'new';
  }

  return tags;
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(config: SocialMetaConfig): Record<string, string> {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:site': TWITTER_HANDLE,
    'twitter:creator': TWITTER_HANDLE,
    'twitter:title': config.title.slice(0, 70),
    'twitter:description': config.description.slice(0, 200),
    'twitter:image': config.image,
    'twitter:image:alt': config.imageAlt || config.title,
    'twitter:domain': 'realhouseiq.com',
  };
}

/**
 * Generate Pinterest Rich Pins meta tags
 */
export function generatePinterestTags(config: SocialMetaConfig): Record<string, string> {
  const tags: Record<string, string> = {
    'pinterest-rich-pin': 'true',
  };

  // For product pins (properties)
  if (config.type === 'product' && config.price) {
    tags['og:price:amount'] = config.price.toString();
    tags['og:price:currency'] = config.currency || 'USD';
  }

  // Article pins
  if (config.type === 'article') {
    tags['article:author'] = config.author || SITE_NAME;
  }

  return tags;
}

/**
 * Generate LinkedIn Article tags for blog posts
 */
export function generateLinkedInTags(config: SocialMetaConfig): Record<string, string> {
  const tags: Record<string, string> = {
    'linkedin:owner': 'realhouseiq',
  };

  if (config.type === 'article') {
    tags['article:published_time'] = config.publishedTime || new Date().toISOString();
    tags['article:author'] = config.linkedInAuthor || 'https://linkedin.com/company/realhouseiq';
  }

  return tags;
}

// =============================================================================
// Page-Specific Social Meta Generators
// =============================================================================

/**
 * Generate social meta for property pages
 */
export function generatePropertySocialMeta(property: Property): SocialMetaConfig {
  const priceText = property.price > 0
    ? `$${property.price.toLocaleString()}`
    : 'Contact for Price';

  const title = `${property.title} | ${priceText} | Luxury ${property.type} in ${property.location.district}, Erbil`;

  const description = `${property.type} for ${property.status.toLowerCase()} in ${property.location.district}, ${property.location.city}. ` +
    `${property.specs.beds > 0 ? `${property.specs.beds} bedrooms, ` : ''}` +
    `${property.specs.baths} bathrooms, ${property.specs.sqm.toLocaleString()} m\u00B2. ` +
    `Features include: ${property.features.slice(0, 4).join(', ')}. ` +
    `Contact Real House for viewings and more information.`;

  return {
    title: title.slice(0, 95),
    description,
    url: `${BASE_URL}/properties/${property.id}`,
    image: property.images[0],
    imageAlt: `${property.type} in ${property.location.district}, ${property.location.city} - ${property.specs.beds} beds, ${property.specs.baths} baths`,
    imageWidth: 1200,
    imageHeight: 630,
    type: 'product',
    price: property.price > 0 ? property.price : undefined,
    currency: 'USD',
    availability: property.status === 'Sold' ? 'out of stock' : 'in stock',
  };
}

/**
 * Generate social meta for project pages
 */
export function generateProjectSocialMeta(project: Project): SocialMetaConfig {
  const priceRange = project.priceRange.min > 0
    ? `$${(project.priceRange.min / 1000).toFixed(0)}K - $${(project.priceRange.max / 1000000).toFixed(1)}M`
    : 'Contact for Pricing';

  const title = `${project.name} | ${project.status} | Real Estate Development in ${project.location.district}, Erbil`;

  const description = `${project.name} - ${project.status} real estate development in ${project.location.district}, ${project.location.city}. ` +
    `${project.availableUnits} of ${project.totalUnits} units available. ` +
    `Prices from ${priceRange}. ` +
    `Amenities: ${project.amenities.slice(0, 4).join(', ')}. Completion: ${project.completionDate}.`;

  return {
    title: title.slice(0, 95),
    description,
    url: `${BASE_URL}/projects/${project.id}`,
    image: project.images[0],
    imageAlt: `${project.name} development project in ${project.location.district}, ${project.location.city}`,
    imageWidth: 1200,
    imageHeight: 630,
    type: 'place',
    price: project.priceRange.min,
    currency: 'USD',
    availability: project.availableUnits > 0 ? 'in stock' : 'out of stock',
  };
}

/**
 * Generate social meta for blog posts
 */
export function generateBlogSocialMeta(post: BlogPost): SocialMetaConfig {
  const title = `${post.title} | Real House Blog`;

  return {
    title: title.slice(0, 95),
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.title,
    imageWidth: 1200,
    imageHeight: 630,
    type: 'article',
    author: post.author.name,
    publishedTime: post.date,
    modifiedTime: post.date,
    section: post.category,
    tags: post.tags,
    linkedInAuthor: 'https://linkedin.com/company/realhouseiq',
  };
}

/**
 * Generate social meta for static pages
 */
export function generatePageSocialMeta(page: 'home' | 'properties' | 'projects' | 'blog' | 'about' | 'contact' | 'favorites'): SocialMetaConfig {
  const pageConfigs: Record<string, { title: string; description: string; path: string }> = {
    home: {
      title: 'Real House | Luxury Real Estate in Erbil, Kurdistan | Properties for Sale & Rent',
      description: 'Discover premium luxury real estate in Erbil, Iraq. Browse exclusive villas, apartments, penthouses & commercial properties. Expert property investment guidance in Kurdistan Region.',
      path: '/',
    },
    properties: {
      title: 'Luxury Properties for Sale & Rent in Erbil | Real House Kurdistan',
      description: 'Browse our collection of premium properties in Erbil, Kurdistan. Luxury villas, modern apartments, penthouses, and commercial spaces. Find your perfect property today.',
      path: '/properties',
    },
    projects: {
      title: 'Real Estate Development Projects in Erbil | New Developments Kurdistan',
      description: 'Explore premier real estate development projects in Erbil. Off-plan properties, new apartments, villas in Dream City, Empire World, Italian Village & more.',
      path: '/projects',
    },
    blog: {
      title: 'Real Estate Blog | Erbil Property Insights & Market Trends | Real House',
      description: 'Expert real estate insights, market trends, and buying guides for property in Erbil, Kurdistan. Tips for buyers, investors, and expats.',
      path: '/blog',
    },
    about: {
      title: 'About Real House | Premium Real Estate Agency in Erbil, Kurdistan',
      description: 'Learn about Real House, Erbil\'s trusted luxury real estate agency. Our team of experts helps you find the perfect property in Kurdistan Region.',
      path: '/about',
    },
    contact: {
      title: 'Contact Real House | Schedule Property Viewing in Erbil',
      description: 'Get in touch with Real House for property viewings, investment advice, and real estate services in Erbil, Kurdistan. Call +964 750 792 2138.',
      path: '/contact',
    },
    favorites: {
      title: 'My Favorite Properties | Saved Listings | Real House Erbil',
      description: 'View your saved favorite properties from Real House. Compare and manage your shortlisted luxury properties in Erbil, Kurdistan.',
      path: '/favorites',
    },
  };

  const config = pageConfigs[page];

  return {
    title: config.title,
    description: config.description,
    url: `${BASE_URL}${config.path}`,
    image: `${BASE_URL}/og-image.jpg`,
    imageAlt: 'Real House - Luxury Real Estate in Erbil, Kurdistan',
    imageWidth: 1200,
    imageHeight: 630,
    type: 'website',
  };
}

// =============================================================================
// DOM Manipulation Functions
// =============================================================================

/**
 * Update or create a meta tag
 */
function updateMetaTag(
  selector: string,
  attrType: 'name' | 'property',
  attrValue: string,
  content: string
): void {
  let tag = document.querySelector(selector);
  if (tag) {
    tag.setAttribute('content', content);
  } else if (content) {
    tag = document.createElement('meta');
    tag.setAttribute(attrType, attrValue);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  }
}

/**
 * Apply all social meta tags to the document
 */
export function applySocialMeta(config: SocialMetaConfig): void {
  // Generate all tag sets
  const ogTags = generateOpenGraphTags(config);
  const twitterTags = generateTwitterCardTags(config);
  const pinterestTags = generatePinterestTags(config);
  const linkedInTags = generateLinkedInTags(config);

  // Apply Open Graph tags
  Object.entries(ogTags).forEach(([key, value]) => {
    if (key.includes(':')) {
      const baseKey = key.split(':').slice(0, 2).join(':');
      updateMetaTag(`meta[property="${key}"]`, 'property', key, value);
    } else {
      updateMetaTag(`meta[property="${key}"]`, 'property', key, value);
    }
  });

  // Apply Twitter Card tags
  Object.entries(twitterTags).forEach(([key, value]) => {
    updateMetaTag(`meta[name="${key}"]`, 'name', key, value);
  });

  // Apply Pinterest tags
  Object.entries(pinterestTags).forEach(([key, value]) => {
    if (key.startsWith('og:')) {
      updateMetaTag(`meta[property="${key}"]`, 'property', key, value);
    } else {
      updateMetaTag(`meta[name="${key}"]`, 'name', key, value);
    }
  });

  // Apply LinkedIn tags
  Object.entries(linkedInTags).forEach(([key, value]) => {
    if (key.startsWith('article:')) {
      updateMetaTag(`meta[property="${key}"]`, 'property', key, value);
    } else {
      updateMetaTag(`meta[name="${key}"]`, 'name', key, value);
    }
  });

  // Update document title
  document.title = config.title;

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', config.url);
  }

  // Update meta description
  updateMetaTag('meta[name="description"]', 'name', 'description', config.description);
}

/**
 * Apply social meta for a property page
 */
export function applyPropertySocialMeta(property: Property): void {
  const config = generatePropertySocialMeta(property);
  applySocialMeta(config);
}

/**
 * Apply social meta for a project page
 */
export function applyProjectSocialMeta(project: Project): void {
  const config = generateProjectSocialMeta(project);
  applySocialMeta(config);
}

/**
 * Apply social meta for a blog post
 */
export function applyBlogSocialMeta(post: BlogPost): void {
  const config = generateBlogSocialMeta(post);
  applySocialMeta(config);
}

/**
 * Apply social meta for a static page
 */
export function applyPageSocialMeta(page: 'home' | 'properties' | 'projects' | 'blog' | 'about' | 'contact' | 'favorites'): void {
  const config = generatePageSocialMeta(page);
  applySocialMeta(config);
}

// =============================================================================
// Social Proof Schema Generators
// =============================================================================

/**
 * Generate AggregateRating schema for social proof
 */
export function generateAggregateRatingSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    'itemReviewed': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': BASE_URL,
    },
    'ratingValue': '4.9',
    'bestRating': '5',
    'worstRating': '1',
    'ratingCount': '127',
    'reviewCount': '89',
  };
}

/**
 * Generate Review schema with social proof elements
 */
export function generateSocialProofReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  text: string;
  date?: string;
}>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Real House',
    'url': BASE_URL,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': reviews.length.toString(),
      'bestRating': '5',
      'worstRating': '1',
    },
    'review': reviews.map(review => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': review.author,
      },
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': review.rating.toString(),
        'bestRating': '5',
        'worstRating': '1',
      },
      'reviewBody': review.text,
      'datePublished': review.date || new Date().toISOString().split('T')[0],
    })),
  };
}

/**
 * Generate Organization schema with social proof
 */
export function generateOrganizationSocialProofSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${BASE_URL}/#organization`,
    'name': 'Real House',
    'alternateName': ['Real House Erbil', 'Real House Kurdistan'],
    'url': BASE_URL,
    'logo': `${BASE_URL}/logo.png`,
    'image': `${BASE_URL}/og-image.jpg`,
    'description': 'Premium luxury real estate agency in Erbil, Kurdistan Region, Iraq.',
    'foundingDate': '2020',
    'numberOfEmployees': {
      '@type': 'QuantitativeValue',
      'value': 25,
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '127',
      'bestRating': '5',
      'worstRating': '1',
    },
    'sameAs': [
      'https://instagram.com/realhouseiq',
      'https://facebook.com/realhouseiq',
      'https://linkedin.com/company/realhouseiq',
      'https://twitter.com/realhouseiq',
      'https://youtube.com/@realhouseiq',
    ],
    'interactionStatistic': [
      {
        '@type': 'InteractionCounter',
        'interactionType': 'https://schema.org/FollowAction',
        'userInteractionCount': 15000,
        'interactionService': {
          '@type': 'WebSite',
          'name': 'Instagram',
          'url': 'https://instagram.com/realhouseiq',
        },
      },
      {
        '@type': 'InteractionCounter',
        'interactionType': 'https://schema.org/FollowAction',
        'userInteractionCount': 8500,
        'interactionService': {
          '@type': 'WebSite',
          'name': 'Facebook',
          'url': 'https://facebook.com/realhouseiq',
        },
      },
      {
        '@type': 'InteractionCounter',
        'interactionType': 'https://schema.org/FollowAction',
        'userInteractionCount': 2200,
        'interactionService': {
          '@type': 'WebSite',
          'name': 'LinkedIn',
          'url': 'https://linkedin.com/company/realhouseiq',
        },
      },
    ],
    'slogan': 'Where luxury meets living',
    'knowsAbout': [
      'Luxury Real Estate',
      'Property Investment',
      'Real Estate in Kurdistan',
      'Erbil Properties',
      'Commercial Real Estate',
    ],
  };
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get image MIME type from URL
 */
function getImageType(url: string): string {
  const extension = url.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    default:
      return 'image/jpeg';
  }
}

/**
 * Generate dynamic OG image URL (placeholder for server-side generation)
 * In production, this would point to an image generation service
 */
export function generateDynamicOGImageUrl(options: {
  type: 'property' | 'project' | 'blog';
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
}): string {
  // For now, return the original image or fallback
  // In production, this could use a service like Vercel OG or Cloudinary
  if (options.image) {
    return options.image;
  }
  return `${BASE_URL}/og-image.jpg`;
}

/**
 * Get share URL for different platforms
 */
export function getShareUrl(platform: 'facebook' | 'twitter' | 'linkedin' | 'pinterest' | 'whatsapp' | 'telegram', options: {
  url: string;
  title: string;
  description?: string;
  image?: string;
}): string {
  const encodedUrl = encodeURIComponent(options.url);
  const encodedTitle = encodeURIComponent(options.title);
  const encodedDesc = encodeURIComponent(options.description || '');
  const encodedImage = encodeURIComponent(options.image || '');

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'linkedin':
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDesc}`;
    case 'pinterest':
      return `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
    case 'telegram':
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
    default:
      return options.url;
  }
}
