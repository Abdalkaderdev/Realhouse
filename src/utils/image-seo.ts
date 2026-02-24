// ═══════════════════════════════════════════════════════════════════════════
// Image SEO Utilities for Google Images Optimization
// Optimized for: Google Images, Pinterest, Social Media, Core Web Vitals
// ═══════════════════════════════════════════════════════════════════════════

import type { Property } from '../data/properties';
import type { Project } from '../data/projects';
import type { BlogPost } from '../data/blog';

// ─── Image Dimensions for SEO (Prevents CLS) ──────────────────────────────
export const IMAGE_DIMENSIONS = {
  card: { width: 400, height: 300 },
  detail: { width: 800, height: 600 },
  thumbnail: { width: 100, height: 75 },
  og: { width: 1200, height: 630 },
  gallery: { width: 800, height: 600 },
  hero: { width: 1920, height: 1080 },
  avatar: { width: 64, height: 64 },
};

// ─── SEO-Friendly Filename Generator ──────────────────────────────────────
// Converts titles to SEO-friendly filenames with keywords and hyphens
export function generateSEOFilename(
  title: string,
  type: 'property' | 'project' | 'blog',
  location?: string
): string {
  // Base keywords for SEO
  const keywords = {
    property: 'property-erbil',
    project: 'real-estate-development-erbil',
    blog: 'erbil-property-market-blog',
  };

  // Clean and format the title
  let filename = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple hyphens
    .substring(0, 50); // Limit length

  // Add location if provided
  if (location) {
    const cleanLocation = location
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    filename = `${filename}-${cleanLocation}`;
  }

  // Add type-specific keyword
  filename = `${filename}-${keywords[type]}`;

  return filename;
}

// ─── Blur Placeholder Generator ───────────────────────────────────────────
// Generates a low-quality placeholder for progressive image loading
export function generateBlurPlaceholder(baseUrl: string): string {
  // For Unsplash images, we can request a tiny version
  if (baseUrl.includes('unsplash.com')) {
    return baseUrl.replace(/w=\d+/, 'w=20').replace(/q=\d+/, 'q=10');
  }
  // For other images, append quality/size parameters
  if (baseUrl.includes('?')) {
    return `${baseUrl}&w=20&q=10&blur=10`;
  }
  return `${baseUrl}?w=20&q=10&blur=10`;
}

// ─── Progressive Image Loading with Blur Effect ───────────────────────────
export function createProgressiveImage(options: {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width: number;
  height: number;
}): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = `progressive-image-wrapper ${options.className || ''}`;
  wrapper.style.position = 'relative';
  wrapper.style.width = `${options.width}px`;
  wrapper.style.height = `${options.height}px`;
  wrapper.style.overflow = 'hidden';
  wrapper.style.backgroundColor = '#1a1a1a';

  // Create blur placeholder
  const placeholder = document.createElement('img');
  placeholder.src = generateBlurPlaceholder(options.src);
  placeholder.alt = '';
  placeholder.setAttribute('aria-hidden', 'true');
  placeholder.style.cssText = `
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(20px);
    transform: scale(1.1);
    transition: opacity 0.3s ease-out;
  `;
  wrapper.appendChild(placeholder);

  // Create main image
  const mainImage = document.createElement('img');
  mainImage.src = options.src;
  mainImage.alt = options.alt;
  if (options.title) mainImage.title = options.title;
  mainImage.width = options.width;
  mainImage.height = options.height;
  mainImage.loading = 'lazy';
  mainImage.decoding = 'async';
  mainImage.style.cssText = `
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease-in;
  `;

  // Handle image load
  mainImage.onload = () => {
    mainImage.style.opacity = '1';
    placeholder.style.opacity = '0';
    setTimeout(() => placeholder.remove(), 300);
  };

  wrapper.appendChild(mainImage);
  return wrapper;
}

// ─── Generate SEO-Optimized Alt Text ──────────────────────────────────────
export function generatePropertyAltText(
  property: Property,
  imageIndex: number = 0,
  context: 'card' | 'detail' | 'gallery' | 'thumbnail' = 'card'
): string {
  // SEO Keywords integrated naturally
  const propertyType = property.type.toLowerCase() === 'villa' ? 'villa Erbil Iraq' :
                       property.type.toLowerCase() === 'apartment' ? 'apartment Erbil' :
                       `${property.type} property Erbil`;
  const baseInfo = `${propertyType} for ${property.status.toLowerCase()} in ${property.location.district}, ${property.location.city}`;
  const specs = `${property.specs.beds} bedroom${property.specs.beds !== 1 ? 's' : ''}, ${property.specs.baths} bathroom${property.specs.baths !== 1 ? 's' : ''}, ${property.specs.sqm.toLocaleString()} sqm`;
  const price = property.price > 0 ? `$${property.price.toLocaleString()}` : 'Contact for price';

  if (context === 'card') {
    return `${property.title} - Real estate Erbil ${baseInfo}. ${specs}. ${price}. Houses for sale Erbil.`;
  }

  if (context === 'detail' && imageIndex === 0) {
    return `${property.title} - ${property.type} main exterior view in ${property.location.district}, ${property.location.city}, Kurdistan. Property Erbil ${specs}. Listed at ${price}. Luxury homes Kurdistan.`;
  }

  if (context === 'gallery') {
    const imageDescriptions = [
      'main exterior view',
      'interior living room',
      'modern kitchen',
      'master bedroom',
      'bathroom',
      'outdoor area',
    ];
    const description = imageDescriptions[imageIndex] || `gallery image ${imageIndex + 1}`;
    return `${property.title} - ${description} in ${property.location.district}, Erbil property market. Real estate Erbil ${property.type} ${property.status.toLowerCase()}.`;
  }

  return `${property.title} - Property Erbil in ${property.location.district}, real estate Kurdistan`;
}

export function generatePropertyTitle(property: Property): string {
  return `${property.title} - ${property.type} ${property.status} in ${property.location.district}, ${property.location.city} | Property Erbil | Real Estate Erbil`;
}

export function generateProjectAltText(
  project: Project,
  imageIndex: number = 0,
  context: 'card' | 'detail' | 'gallery' = 'card'
): string {
  const baseInfo = `${project.name} - ${project.status} real estate Erbil development with houses for sale Erbil and apartments Erbil in ${project.location.district}, ${project.location.city}`;
  const unitInfo = `${project.totalUnits} total units`;

  if (context === 'card') {
    return `${baseInfo}. Property Erbil ${unitInfo}. Real estate Kurdistan completion: ${project.completionDate}. Villas Erbil Iraq.`;
  }

  if (context === 'detail' && imageIndex === 0) {
    return `${project.name} - ${project.status} property Erbil project in ${project.location.district}, ${project.location.city}, Kurdistan. ${unitInfo}. Property investment Kurdistan Iraq. Expected completion ${project.completionDate}. Luxury homes Kurdistan.`;
  }

  if (context === 'gallery') {
    const imageDescriptions = [
      'exterior view',
      'amenities',
      'interior design',
      'community area',
      'landscape view',
    ];
    const description = imageDescriptions[imageIndex] || `project image ${imageIndex + 1}`;
    return `${project.name} ${description} - ${project.location.district}, Erbil property market development. Real estate Erbil.`;
  }

  return `${project.name} - Property Erbil in ${project.location.district}, real estate Kurdistan`;
}

export function generateProjectTitle(project: Project): string {
  return `${project.name} - ${project.status} Development Project in ${project.location.district}, ${project.location.city} | Property Erbil | Real Estate Kurdistan`;
}

export function generateBlogImageAlt(post: BlogPost): string {
  return `${post.title} - Real estate Erbil blog article about ${post.category.toLowerCase()} in Erbil property market. Property Erbil insights for houses for sale Erbil and apartments Erbil.`;
}

// Alias for consistency with naming convention
export function generateBlogAltText(post: BlogPost, context: 'card' | 'detail' | 'hero' = 'card'): string {
  const baseAlt = `${post.title} - Real estate Erbil blog`;
  const categoryInfo = `${post.category.toLowerCase()} article`;
  const keywords = 'Property Erbil, houses for sale Erbil, apartments Erbil';

  if (context === 'hero' || context === 'detail') {
    return `${post.title} - Featured ${categoryInfo} about Erbil property market and real estate Kurdistan. ${keywords}. Expert insights from Real House.`;
  }

  if (context === 'card') {
    return `${baseAlt} ${categoryInfo}. ${keywords}. Read time: ${post.readTime} minutes.`;
  }

  return baseAlt;
}

export function generateBlogImageTitle(post: BlogPost): string {
  return `${post.title} - ${post.category} | Real Estate Erbil | Property Erbil Blog`;
}

// ─── Generate srcset for Responsive Images ───────────────────────────────
export function generateSrcSet(baseUrl: string, sizes: number[] = [400, 800, 1200]): string {
  return sizes.map(size => {
    const url = baseUrl.replace(/w=\d+/, `w=${size}`);
    return `${url} ${size}w`;
  }).join(', ');
}

export function generateSizes(context: 'card' | 'detail' | 'gallery' | 'hero' = 'card'): string {
  switch (context) {
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'detail':
      return '(max-width: 768px) 100vw, 60vw';
    case 'gallery':
      return '(max-width: 640px) 100vw, 800px';
    case 'hero':
      return '100vw';
    default:
      return '100vw';
  }
}

// ─── Create SEO-Optimized Image Element ───────────────────────────────────
export interface SEOImageOptions {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  srcset?: string;
  sizes?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export function createSEOImage(options: SEOImageOptions): HTMLImageElement {
  const img = document.createElement('img');

  img.src = options.src;
  img.alt = options.alt;

  if (options.title) {
    img.title = options.title;
  }

  if (options.className) {
    img.className = options.className;
  }

  img.loading = options.loading || 'lazy';

  if (options.width) {
    img.width = options.width;
  }

  if (options.height) {
    img.height = options.height;
  }

  if (options.srcset) {
    img.srcset = options.srcset;
  }

  if (options.sizes) {
    img.sizes = options.sizes;
  }

  if (options.fetchPriority) {
    img.setAttribute('fetchpriority', options.fetchPriority);
  }

  // Add decoding attribute for better performance
  img.decoding = 'async';

  return img;
}

// ─── Generate Structured Data for ImageObject ─────────────────────────────
export interface ImageObjectSchema {
  '@type': 'ImageObject';
  url: string;
  name: string;
  description: string;
  width?: number;
  height?: number;
  contentUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
  representativeOfPage?: boolean;
}

export function generateImageObjectSchema(
  imageUrl: string,
  name: string,
  description: string,
  width?: number,
  height?: number
): ImageObjectSchema {
  return {
    '@type': 'ImageObject',
    url: imageUrl,
    name,
    description,
    ...(width && { width }),
    ...(height && { height }),
    contentUrl: imageUrl,
    caption: description,
  };
}

export function generatePropertyImageSchema(property: Property): ImageObjectSchema[] {
  return property.images.map((image, index) => ({
    '@type': 'ImageObject' as const,
    url: image,
    name: `${property.title} - Image ${index + 1}`,
    description: generatePropertyAltText(property, index, 'gallery'),
    contentUrl: image,
    caption: `${property.title} in ${property.location.district}, ${property.location.city}`,
    width: 800,
    height: 600,
  }));
}

export function generateProjectImageSchema(project: Project): ImageObjectSchema[] {
  return project.images.map((image, index) => ({
    '@type': 'ImageObject' as const,
    url: image,
    name: `${project.name} - Image ${index + 1}`,
    description: generateProjectAltText(project, index, 'gallery'),
    contentUrl: image,
    caption: `${project.name} in ${project.location.district}, ${project.location.city}`,
    width: 800,
    height: 600,
  }));
}

// ─── Gallery Page Data ────────────────────────────────────────────────────
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: 'property' | 'project' | 'interior' | 'exterior' | 'amenity';
  propertyId?: string;
  projectId?: string;
  location: string;
}

export function generateGalleryData(
  properties: Property[],
  projects: Project[]
): GalleryImage[] {
  const galleryImages: GalleryImage[] = [];

  // Add property images
  properties.forEach(property => {
    property.images.forEach((image, index) => {
      galleryImages.push({
        id: `property-${property.id}-${index}`,
        src: image,
        alt: generatePropertyAltText(property, index, 'gallery'),
        title: `${property.title} - ${property.type}`,
        caption: `${property.title} in ${property.location.district}, ${property.location.city}. ${property.specs.beds} beds, ${property.specs.baths} baths.`,
        category: index === 0 ? 'exterior' : 'interior',
        propertyId: property.id,
        location: `${property.location.district}, ${property.location.city}`,
      });
    });
  });

  // Add project images
  projects.forEach(project => {
    project.images.forEach((image, index) => {
      galleryImages.push({
        id: `project-${project.id}-${index}`,
        src: image,
        alt: generateProjectAltText(project, index, 'gallery'),
        title: `${project.name} - ${project.status}`,
        caption: `${project.name} development in ${project.location.district}. ${project.totalUnits} units, completion ${project.completionDate}.`,
        category: 'project',
        projectId: project.id,
        location: `${project.location.district}, ${project.location.city}`,
      });
    });
  });

  return galleryImages;
}

// ─── Update Meta Tags for Images ──────────────────────────────────────────
export function updateImageMetaTags(
  imageUrl: string,
  imageAlt: string,
  type: 'property' | 'project' | 'blog' | 'gallery' = 'property'
): void {
  // Open Graph Image
  let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
  if (!ogImage) {
    ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    document.head.appendChild(ogImage);
  }
  ogImage.content = imageUrl;

  // OG Image Alt
  let ogImageAlt = document.querySelector('meta[property="og:image:alt"]') as HTMLMetaElement;
  if (!ogImageAlt) {
    ogImageAlt = document.createElement('meta');
    ogImageAlt.setAttribute('property', 'og:image:alt');
    document.head.appendChild(ogImageAlt);
  }
  ogImageAlt.content = imageAlt;

  // OG Image Dimensions
  const updateOrCreateMeta = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  updateOrCreateMeta('og:image:width', '1200');
  updateOrCreateMeta('og:image:height', '630');
  updateOrCreateMeta('og:image:type', 'image/jpeg');

  // Twitter Card Image
  let twitterImage = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement;
  if (!twitterImage) {
    twitterImage = document.createElement('meta');
    twitterImage.setAttribute('name', 'twitter:image');
    document.head.appendChild(twitterImage);
  }
  twitterImage.content = imageUrl;

  // Twitter Image Alt
  let twitterImageAlt = document.querySelector('meta[name="twitter:image:alt"]') as HTMLMetaElement;
  if (!twitterImageAlt) {
    twitterImageAlt = document.createElement('meta');
    twitterImageAlt.setAttribute('name', 'twitter:image:alt');
    document.head.appendChild(twitterImageAlt);
  }
  twitterImageAlt.content = imageAlt;
}

// ─── Add ImageGallery Schema ──────────────────────────────────────────────
export function addImageGallerySchema(images: GalleryImage[]): void {
  // Remove existing gallery schema
  const existingSchema = document.querySelector('script[data-schema="image-gallery"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Real Estate Erbil Gallery - Property Erbil | Houses for Sale Erbil | Apartments Erbil',
    description: 'Browse stunning photos of real estate Erbil properties including villas Erbil Iraq, apartments Erbil, and luxury homes Kurdistan. Property Erbil gallery featuring houses for sale Erbil in the Erbil property market.',
    url: 'https://realhouseiq.com/gallery',
    image: images.slice(0, 50).map(img => ({
      '@type': 'ImageObject',
      url: img.src,
      name: img.title,
      description: img.alt,
      caption: img.caption,
      contentUrl: img.src,
    })),
    publisher: {
      '@type': 'Organization',
      name: 'Real House',
      url: 'https://realhouseiq.com',
    },
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'image-gallery');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ─── Blog Image Schema ────────────────────────────────────────────────────
export function generateBlogImageSchema(post: BlogPost): ImageObjectSchema {
  return {
    '@type': 'ImageObject',
    url: post.image,
    name: `${post.title} - Featured Image`,
    description: generateBlogAltText(post, 'hero'),
    contentUrl: post.image,
    caption: `${post.title} - ${post.category} article about real estate Erbil`,
    width: IMAGE_DIMENSIONS.og.width,
    height: IMAGE_DIMENSIONS.og.height,
  };
}

// ─── Add Blog Article Image Schema ────────────────────────────────────────
export function addBlogImageSchema(post: BlogPost): void {
  const existingSchema = document.querySelector('script[data-schema="blog-image"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: post.image,
    name: `${post.title} - Real Estate Erbil Blog`,
    description: generateBlogAltText(post, 'hero'),
    width: IMAGE_DIMENSIONS.og.width,
    height: IMAGE_DIMENSIONS.og.height,
    contentUrl: post.image,
    caption: `${post.title} by ${post.author.name}`,
    creator: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Real House',
      url: 'https://realhouseiq.com',
    },
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'blog-image');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ─── Image Sitemap Entry Generator ────────────────────────────────────────
export interface ImageSitemapEntry {
  pageUrl: string;
  images: {
    loc: string;
    title: string;
    caption: string;
    geoLocation?: string;
    license?: string;
  }[];
}

export function generatePropertyImageSitemapEntries(properties: Property[]): ImageSitemapEntry[] {
  return properties.map(property => ({
    pageUrl: `https://realhouseiq.com/properties/${property.id}`,
    images: property.images.map((image, index) => ({
      loc: image,
      title: `${property.title} - ${property.type} ${index === 0 ? 'Exterior' : `Interior ${index}`}`,
      caption: generatePropertyAltText(property, index, 'gallery'),
      geoLocation: `${property.location.district}, ${property.location.city}, Kurdistan Region, Iraq`,
    })),
  }));
}

export function generateProjectImageSitemapEntries(projects: Project[]): ImageSitemapEntry[] {
  return projects.map(project => ({
    pageUrl: `https://realhouseiq.com/projects/${project.id}`,
    images: project.images.map((image, index) => ({
      loc: image,
      title: `${project.name} - ${project.status} Development ${index === 0 ? 'Overview' : `View ${index}`}`,
      caption: generateProjectAltText(project, index, 'gallery'),
      geoLocation: `${project.location.district}, ${project.location.city}, Kurdistan Region, Iraq`,
    })),
  }));
}

export function generateBlogImageSitemapEntries(posts: BlogPost[]): ImageSitemapEntry[] {
  return posts.map(post => ({
    pageUrl: `https://realhouseiq.com/blog/${post.slug}`,
    images: [{
      loc: post.image,
      title: `${post.title} - ${post.category}`,
      caption: generateBlogAltText(post, 'hero'),
      geoLocation: 'Erbil, Kurdistan Region, Iraq',
    }],
  }));
}

// ─── Lazy Loading with Intersection Observer ──────────────────────────────
export function initLazyLoadingWithBlur(): void {
  if (typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const wrapper = img.parentElement;

          // Load the full image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.onload = () => {
              img.style.opacity = '1';
              img.classList.add('loaded');
              // Remove blur placeholder if exists
              const placeholder = wrapper?.querySelector('.blur-placeholder');
              if (placeholder) {
                placeholder.remove();
              }
            };
          }

          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );

  // Observe all lazy images
  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
}

// ─── Add Property Image Schema to Page ────────────────────────────────────
export function addPropertyImageSchemaToPage(property: Property): void {
  const existingSchema = document.querySelector('script[data-schema="property-images"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const imageSchemas = generatePropertyImageSchema(property);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': imageSchemas.map((img, index) => ({
      ...img,
      representativeOfPage: index === 0,
      license: 'https://realhouseiq.com/terms',
      acquireLicensePage: 'https://realhouseiq.com/contact',
      creditText: 'Real House - Real Estate Erbil',
      creator: {
        '@type': 'Organization',
        name: 'Real House',
        url: 'https://realhouseiq.com',
      },
    })),
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'property-images');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ─── Add Project Image Schema to Page ─────────────────────────────────────
export function addProjectImageSchemaToPage(project: Project): void {
  const existingSchema = document.querySelector('script[data-schema="project-images"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const imageSchemas = generateProjectImageSchema(project);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': imageSchemas.map((img, index) => ({
      ...img,
      representativeOfPage: index === 0,
      license: 'https://realhouseiq.com/terms',
      acquireLicensePage: 'https://realhouseiq.com/contact',
      creditText: 'Real House - Real Estate Erbil',
      creator: {
        '@type': 'Organization',
        name: 'Real House',
        url: 'https://realhouseiq.com',
      },
    })),
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'project-images');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
