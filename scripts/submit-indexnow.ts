/**
 * IndexNow Bulk Submission Script
 * Run after deployment to notify search engines of all pages.
 *
 * Usage: npx tsx scripts/submit-indexnow.ts
 */

import { properties } from '../src/data/properties';
import { projects } from '../src/data/projects';
import { blogPosts } from '../src/data/blog';
import { districts } from '../src/data/locations';

const INDEXNOW_KEY = '5srttrwsv1tfzbwmj8uqigc7jtlbi6m8';
const SITE_HOST = 'realhouseiq.com';
const BASE_URL = `https://${SITE_HOST}`;
const KEY_LOCATION = `${BASE_URL}/indexnow-key.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

function collectAllUrls(): string[] {
  const urls: string[] = [];

  // Main pages
  urls.push(
    `${BASE_URL}/`,
    `${BASE_URL}/properties`,
    `${BASE_URL}/projects`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/faq`,
    `${BASE_URL}/locations`,
    `${BASE_URL}/services`,
    `${BASE_URL}/gallery`,
    `${BASE_URL}/favorites`,
    `${BASE_URL}/compare`,
  );

  // Property pages
  for (const property of properties) {
    urls.push(`${BASE_URL}/properties/${property.id}`);
  }

  // Project pages
  for (const project of projects) {
    urls.push(`${BASE_URL}/projects/${project.id}`);
  }

  // Blog posts
  for (const post of blogPosts) {
    urls.push(`${BASE_URL}/blog/${post.slug}`);
  }

  // Location/district pages
  for (const district of districts) {
    urls.push(`${BASE_URL}/locations/${district.id}`);
  }

  return urls;
}

async function submitToIndexNow(urls: string[]): Promise<void> {
  console.log(`\n📡 IndexNow: Submitting ${urls.length} URLs to search engines...\n`);

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      console.log(`✅ Success! ${urls.length} URLs submitted to IndexNow`);
      console.log(`   Status: ${response.status} ${response.statusText}`);
      console.log(`   Endpoint: ${ENDPOINT}`);
    } else {
      const body = await response.text().catch(() => '');
      console.error(`❌ IndexNow returned ${response.status}: ${response.statusText}`);
      if (body) console.error(`   Response: ${body}`);
    }
  } catch (error) {
    console.error(`❌ Network error:`, error instanceof Error ? error.message : error);
  }
}

async function main() {
  console.log('🗂️  IndexNow Bulk Submission');
  console.log(`   Host: ${SITE_HOST}`);
  console.log(`   Key: ${INDEXNOW_KEY.slice(0, 8)}...`);

  const urls = collectAllUrls();

  console.log(`\n📊 URL Breakdown:`);
  console.log(`   Main pages:  12`);
  console.log(`   Properties:  ${properties.length}`);
  console.log(`   Projects:    ${projects.length}`);
  console.log(`   Blog posts:  ${blogPosts.length}`);
  console.log(`   Locations:   ${districts.length}`);
  console.log(`   ─────────────────`);
  console.log(`   Total:       ${urls.length}`);

  await submitToIndexNow(urls);

  console.log('\n✨ Done!\n');
}

main().catch(console.error);
