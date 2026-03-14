#!/usr/bin/env tsx
/**
 * Dynamic Sitemap Generator for Real House
 * Generates XML sitemaps from actual data files
 *
 * Run: npx tsx scripts/generate-sitemaps.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// Import data
import { properties } from '../src/data/properties';
import { projects } from '../src/data/projects';
import { blogPosts } from '../src/data/blog';
import { neighborhoods } from '../src/data/locations';

const BASE_URL = 'https://realhouseiq.com';
const PUBLIC_DIR = join(process.cwd(), 'public');

function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate Properties Sitemap
function generatePropertiesSitemap(): string {
  const today = getCurrentDate();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Real House Properties Sitemap - Auto-generated -->
  <!-- Properties: ${properties.length} listings -->
  <!-- Generated: ${today} -->
`;

  for (const property of properties) {
    const url = `${BASE_URL}/properties/${property.id}`;
    xml += `
  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;

    // Add primary image
    if (property.images && property.images.length > 0) {
      xml += `
    <image:image>
      <image:loc>${escapeXml(property.images[0])}</image:loc>
      <image:title>${escapeXml(property.title)} - Real House Erbil</image:title>
      <image:caption>${escapeXml(`${property.type} in ${property.location.district}, Erbil - ${property.bedrooms} bed, ${property.bathrooms} bath`)}</image:caption>
    </image:image>`;
    }

    xml += `
  </url>`;
  }

  xml += `
</urlset>`;

  return xml;
}

// Generate Projects Sitemap
function generateProjectsSitemap(): string {
  const today = getCurrentDate();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Real House Projects Sitemap - Auto-generated -->
  <!-- Projects: ${projects.length} developments -->
  <!-- Generated: ${today} -->
`;

  for (const project of projects) {
    const url = `${BASE_URL}/projects/${project.id}`;
    xml += `
  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>`;

    // Add cover image
    if (project.coverImage) {
      xml += `
    <image:image>
      <image:loc>${escapeXml(project.coverImage)}</image:loc>
      <image:title>${escapeXml(project.name)} - ${escapeXml(project.developer)}</image:title>
      <image:caption>${escapeXml(`${project.name} development in ${project.location}, Erbil by ${project.developer}`)}</image:caption>
    </image:image>`;
    }

    xml += `
  </url>`;
  }

  xml += `
</urlset>`;

  return xml;
}

// Generate Blog Sitemap
function generateBlogSitemap(): string {
  const today = getCurrentDate();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Real House Blog Sitemap - Auto-generated -->
  <!-- Blog Posts: ${blogPosts.length} articles -->
  <!-- Generated: ${today} -->
`;

  for (const post of blogPosts) {
    const url = `${BASE_URL}/blog/${post.slug}`;
    xml += `
  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${post.updatedAt || post.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>`;

    if (post.featuredImage) {
      xml += `
    <image:image>
      <image:loc>${escapeXml(post.featuredImage)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>`;
    }

    xml += `
  </url>`;
  }

  xml += `
</urlset>`;

  return xml;
}

// Generate Neighborhoods Sitemap
function generateNeighborhoodsSitemap(): string {
  const today = getCurrentDate();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Real House Neighborhoods Sitemap - Auto-generated -->
  <!-- Neighborhoods: ${neighborhoods.length} areas -->
  <!-- Generated: ${today} -->
`;

  for (const neighborhood of neighborhoods) {
    const url = `${BASE_URL}/locations/${neighborhood.id}`;
    xml += `
  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>`;

    if (neighborhood.heroImage) {
      xml += `
    <image:image>
      <image:loc>${escapeXml(neighborhood.heroImage)}</image:loc>
      <image:title>${escapeXml(neighborhood.name)} - Erbil Neighborhood Guide</image:title>
    </image:image>`;
    }

    xml += `
  </url>`;
  }

  xml += `
</urlset>`;

  return xml;
}

// Generate Sitemap Index
function generateSitemapIndex(): string {
  const today = getCurrentDate();

  return `<?xml version="1.0" encoding="UTF-8"?>
<!--
  ===============================================================================
  Real House - Sitemap Index (Auto-generated)
  Luxury Real Estate in Erbil, Kurdistan Region, Iraq
  https://realhouseiq.com

  Generated: ${today}
  ===============================================================================
-->
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Main Sitemap -->
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

  <!-- Static Pages -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

  <!-- Properties (${properties.length} listings) -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-properties.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

  <!-- Projects (${projects.length} developments) -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-projects.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

  <!-- Blog Posts (${blogPosts.length} articles) -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

  <!-- Neighborhoods (${neighborhoods.length} areas) -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-neighborhoods.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

  <!-- Images -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

</sitemapindex>`;
}

// Main execution
async function main() {
  console.log('🗺️  Generating sitemaps for Real House...\n');

  // Generate and write sitemaps
  const sitemaps = [
    { name: 'sitemap-properties.xml', content: generatePropertiesSitemap() },
    { name: 'sitemap-projects.xml', content: generateProjectsSitemap() },
    { name: 'sitemap-blog.xml', content: generateBlogSitemap() },
    { name: 'sitemap-neighborhoods.xml', content: generateNeighborhoodsSitemap() },
    { name: 'sitemap-index.xml', content: generateSitemapIndex() },
  ];

  for (const sitemap of sitemaps) {
    const path = join(PUBLIC_DIR, sitemap.name);
    writeFileSync(path, sitemap.content, 'utf-8');
    console.log(`✅ Generated: ${sitemap.name}`);
  }

  console.log('\n📊 Summary:');
  console.log(`   Properties: ${properties.length}`);
  console.log(`   Projects: ${projects.length}`);
  console.log(`   Blog Posts: ${blogPosts.length}`);
  console.log(`   Neighborhoods: ${neighborhoods.length}`);
  console.log('\n✨ Sitemap generation complete!');
}

main().catch(console.error);
