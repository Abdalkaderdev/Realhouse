# Real House - SEO & Search Console Setup Guide

This document provides comprehensive instructions for setting up Google Search Console, Bing Webmaster Tools, submitting sitemaps, using IndexNow for instant indexing, and tracking SEO performance.

---

## Table of Contents

1. [Google Search Console Setup](#1-google-search-console-setup)
2. [Site Verification Methods](#2-site-verification-methods)
3. [Sitemap Structure & Submission](#3-sitemap-structure--submission)
4. [Request Indexing](#4-request-indexing)
5. [IndexNow Protocol](#5-indexnow-protocol)
6. [Bing Webmaster Tools](#6-bing-webmaster-tools)
7. [Monitoring & Analytics](#7-monitoring--analytics)
8. [Structured Data Validation](#8-structured-data-validation)
9. [Page Experience Optimization](#9-page-experience-optimization)
10. [Troubleshooting](#10-troubleshooting)
11. [Quick Reference Checklist](#11-quick-reference-checklist)

---

## 1. Google Search Console Setup

### Step 1: Access Search Console

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Sign in with your Google account (use a business account for team access)
3. Click "Add property"

### Step 2: Add Your Property

Choose one of these options:

**Domain Property (Recommended)**
- Enter: `realhouseiq.com`
- This covers all subdomains and protocols (http, https, www, non-www)

**URL Prefix Property**
- Enter: `https://realhouseiq.com`
- This only covers exact URL pattern

### Step 3: Verify Ownership

See [Site Verification Methods](#2-site-verification-methods) below.

---

## 2. Site Verification Methods

We have prepared multiple verification methods. Choose one:

### Method A: HTML File Upload (Recommended)

1. Download the verification file from Search Console
2. Rename it and place it in the `/public` folder
3. The file should be accessible at: `https://realhouseiq.com/googleXXXXXXXX.html`

**Current placeholder file:** `/public/google8a7b3c9d2e1f.html`

> **Action Required:** Replace this placeholder with your actual Google verification file. The filename should match what Google provides (e.g., `google1234567890abcdef.html`).

### Method B: HTML Meta Tag

1. In Search Console, choose "HTML tag" verification
2. Copy the verification code (e.g., `abc123xyz`)
3. Update the meta tag in `index.html`:

```html
<!-- Current placeholder in index.html (line ~96) -->
<meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE_HERE" />

<!-- Replace with your actual code -->
<meta name="google-site-verification" content="abc123xyz" />
```

### Method C: DNS TXT Record

1. In Search Console, choose "Domain name provider"
2. Copy the TXT record value
3. Add it to your DNS settings:
   - Type: TXT
   - Host: @ (or leave blank)
   - Value: `google-site-verification=XXXXXXXX`

**DNS providers for common hosts:**
- Vercel: Project Settings > Domains > DNS Records
- Cloudflare: DNS > Records > Add Record
- GoDaddy: My Products > DNS > Add TXT Record
- Namecheap: Domain List > Manage > Advanced DNS > Add New Record

---

## 3. Sitemap Structure & Submission

### Sitemap Architecture

We use a sitemap index strategy for better organization and faster crawling:

```
sitemap-index.xml          (Master index - submit this to Search Console)
├── sitemap-pages.xml      (Static pages: Home, About, Contact, FAQ, etc.)
├── sitemap-properties.xml (All property listings with images)
├── sitemap-projects.xml   (25+ development projects with images)
├── sitemap-blog.xml       (Blog posts with Google News markup)
└── sitemap-images.xml     (Dedicated image sitemap for Google Images)
```

### Available Sitemaps

| Sitemap | URL | Contents | Update Frequency |
|---------|-----|----------|------------------|
| Index | `/sitemap-index.xml` | Master sitemap index | When children update |
| Pages | `/sitemap-pages.xml` | 40+ static & filter pages | Weekly |
| Properties | `/sitemap-properties.xml` | All property listings | Daily |
| Projects | `/sitemap-projects.xml` | 25+ development projects | Weekly |
| Blog | `/sitemap-blog.xml` | 10+ blog articles | Weekly |
| Images | `/sitemap-images.xml` | Property & project images | Weekly |
| Legacy | `/sitemap.xml` | Combined (backward compat) | Daily |

### How to Submit Sitemaps

1. In Search Console, go to **Sitemaps** in the left menu
2. Enter: `sitemap-index.xml`
3. Click **Submit**
4. Wait for Google to process (usually within 24-48 hours)

**One-time submission is sufficient** - Google will automatically discover and re-crawl all child sitemaps referenced in the index.

### Verify Sitemap Status

After submission, check:
- Status should show "Success"
- "Discovered URLs" count should match expected
- "Last read" date should be recent

### Automatic Sitemap Discovery

Sitemaps are already referenced in `robots.txt` for automatic discovery:

```
Sitemap: https://realhouseiq.com/sitemap-index.xml
Sitemap: https://realhouseiq.com/sitemap-pages.xml
Sitemap: https://realhouseiq.com/sitemap-properties.xml
Sitemap: https://realhouseiq.com/sitemap-projects.xml
Sitemap: https://realhouseiq.com/sitemap-blog.xml
Sitemap: https://realhouseiq.com/sitemap-images.xml
```

---

## 4. Request Indexing

### Individual URL Indexing

1. In Search Console, go to **URL Inspection**
2. Enter the URL you want indexed (e.g., `https://realhouseiq.com/properties/new-villa`)
3. Click **Request Indexing**
4. Wait for confirmation

**Daily Limits:** ~10-20 URLs per day (unofficial limit, varies by site authority)

### Priority URLs to Index First

Request indexing in this order:

1. `https://realhouseiq.com/` - Homepage
2. `https://realhouseiq.com/properties` - Properties listing
3. `https://realhouseiq.com/projects` - Projects listing
4. `https://realhouseiq.com/contact` - Contact page
5. `https://realhouseiq.com/about` - About page
6. `https://realhouseiq.com/blog` - Blog listing
7. Top projects (Empire World, Dream City, Pavilion, etc.)

### Bulk Indexing via Sitemap

After sitemap submission, Google will automatically discover and index URLs. This is faster than individual requests for large sites.

**Pro Tip:** Use IndexNow (see below) for instant indexing on Bing, Yandex, and other participating search engines.

---

## 5. IndexNow Protocol

IndexNow provides **instant indexing** notification to Bing, Yandex, and other participating search engines.

### Current Setup

- **Key file:** `/public/indexnow-key.txt`
- **Key value:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
- **Utility:** `/src/utils/indexnow.ts`

> **Action Required:** Generate your own unique key and update both files.

### Generate Your Own Key

1. Create a unique alphanumeric key (8-128 characters, lowercase)
   - Example: `r3alh0us3iq2024s3cr3tk3y`
2. Update `/public/indexnow-key.txt` with the key (just the key, no other text)
3. Update `/src/utils/indexnow.ts` - change `INDEXNOW_KEY` constant

### Using IndexNow Programmatically

```typescript
import { submitUrl, notifyNewProperty, notifyNewProject, notifyNewBlogPost } from './utils/indexnow';

// Submit a single URL
await submitUrl('https://realhouseiq.com/properties/new-property');

// Notify when adding a new property (submits both listing and properties page)
await notifyNewProperty('new-property-id');

// Notify when adding a new project
await notifyNewProject('new-project-id');

// Notify when publishing a new blog post
await notifyNewBlogPost('my-blog-slug');

// Submit all main pages (after major site update)
await submitAllPages();
```

### Manual IndexNow Submission

For one-off submissions, visit this URL in your browser:

```
https://api.indexnow.org/indexnow?url=https://realhouseiq.com/properties/new-listing&key=YOUR_KEY
```

Success responses:
- `200 OK` - URL submitted successfully
- `202 Accepted` - URL received and will be processed

### Supported Search Engines

IndexNow currently notifies:
- **Bing** (api.indexnow.org, www.bing.com)
- **Yandex** (yandex.com)
- **Seznam** (search.seznam.cz)
- **Naver** (searchadvisor.naver.com)

Google does not currently support IndexNow but crawls submitted URLs from sitemaps.

---

## 6. Bing Webmaster Tools

### Setup

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Sign in with Microsoft account
3. Add site: `https://realhouseiq.com`

### Import from Google Search Console (Easiest)

1. Choose "Import from Google Search Console"
2. Authorize access to your Google account
3. Select your property - verification is automatic

### Manual Verification

Update the meta tag in `index.html`:

```html
<!-- Current placeholder (line ~99) -->
<meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE_HERE" />

<!-- Replace with your actual code -->
<meta name="msvalidate.01" content="ABC123DEF456" />
```

### Submit Sitemaps

1. Go to **Sitemaps** in Bing Webmaster
2. Enter `https://realhouseiq.com/sitemap-index.xml`
3. Click Submit

### URL Submission API

Bing also supports bulk URL submission via API. Configure in:
Bing Webmaster > Configure My Site > URL Submission

---

## 7. Monitoring & Analytics

### Google Analytics 4 Setup

1. Create GA4 property at [Google Analytics](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add tracking code to `index.html` before `</head>`:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Key Metrics to Monitor

**Search Console - Weekly Review:**
- Total clicks (trending up?)
- Total impressions (visibility)
- Average CTR (target: >3%)
- Average position (target: <20 for main keywords)
- Index coverage status
- Core Web Vitals

**Google Analytics:**
- Sessions by source (organic vs direct)
- User engagement (time on site, pages/session)
- Conversion events (contact form, phone clicks)
- Top landing pages
- Bounce rate by page

### Recommended Reporting Schedule

| Report | Frequency | Key Metrics |
|--------|-----------|-------------|
| Performance | Weekly | Clicks, CTR, Position |
| Coverage | Weekly | Indexed pages, Errors |
| Core Web Vitals | Monthly | LCP, INP, CLS |
| Keyword rankings | Bi-weekly | Top 10 keywords |
| Backlinks | Monthly | New links, Referring domains |

---

## 8. Structured Data Validation

### Test Your Structured Data

1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema Markup Validator](https://validator.schema.org/)

### Implemented Schema Types

| Schema Type | Location | Purpose |
|-------------|----------|---------|
| RealEstateAgent | index.html | Organization info, Google Knowledge Panel |
| WebSite | index.html | Site search box in SERPs |
| LocalBusiness | index.html | Google Maps, Local pack |
| BreadcrumbList | All pages | Navigation breadcrumbs in search results |
| FAQPage | Home, FAQ pages | FAQ rich results |
| RealEstateListing | Property pages | Property listings in search |
| Product | Property pages | Price display |
| Place | Project pages | Development projects |
| ItemList | List pages | Collection/carousel results |
| MobileApplication | index.html | PWA info |

### Validate Individual Pages

Test these priority URLs in Rich Results Test:

1. `https://realhouseiq.com/` - Organization, LocalBusiness, FAQ
2. `https://realhouseiq.com/properties` - ItemList
3. `https://realhouseiq.com/properties/[id]` - RealEstateListing, Product
4. `https://realhouseiq.com/projects/[id]` - Place
5. `https://realhouseiq.com/contact` - LocalBusiness

---

## 9. Page Experience Optimization

### Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | ≤2.5s | 2.5-4s | >4s |
| INP (Interaction to Next Paint) | ≤200ms | 200-500ms | >500ms |
| CLS (Cumulative Layout Shift) | ≤0.1 | 0.1-0.25 | >0.25 |

### Already Implemented

- [x] HTTPS (via Vercel)
- [x] Mobile-responsive design
- [x] No intrusive interstitials
- [x] Proper viewport meta tag
- [x] Accessible navigation (skip links)
- [x] Touch-friendly elements (48px minimum)
- [x] Safe browsing compliant
- [x] Critical CSS inlined
- [x] Font preloading
- [x] Image optimization (WebP format)
- [x] Lazy loading for below-fold images

### Testing Tools

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Lighthouse](chrome://extensions) (Chrome DevTools)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

---

## 10. Troubleshooting

### Common Issues

**"URL is not on Google"**
1. Check robots.txt doesn't block the URL
2. Ensure canonical URL is correct
3. Submit via URL Inspection and request indexing
4. Check for `noindex` meta tag

**"Indexed, not submitted in sitemap"**
1. Add URL to appropriate sitemap
2. Resubmit sitemap in Search Console
3. This is informational, not an error

**"Crawled - currently not indexed"**
1. Check content quality and uniqueness
2. Add more internal links to the page
3. Improve page content depth
4. Verify page has unique title and description

**"Blocked by robots.txt"**
1. Review robots.txt rules
2. Test URL at Search Console > robots.txt Tester
3. Update robots.txt if incorrectly blocking

**Structured data errors**
1. Use Rich Results Test to identify issues
2. Check for missing required fields
3. Validate JSON-LD syntax (commas, brackets)
4. Ensure URLs are fully qualified

### Useful Diagnostic Tools

- [Google Search Console URL Inspection](https://search.google.com/search-console/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Ahrefs Site Audit](https://ahrefs.com/site-audit)
- [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/)

---

## 11. Quick Reference Checklist

### Before Launch

- [ ] Replace Google verification placeholder (`google8a7b3c9d2e1f.html`) with actual file
- [ ] Replace Google meta tag verification code in `index.html`
- [ ] Replace Bing verification code in `index.html`
- [ ] Generate and update IndexNow key (both files)
- [ ] Add Google Analytics tracking code
- [ ] Test all pages in Rich Results Test
- [ ] Run PageSpeed Insights check (target: 90+ mobile)
- [ ] Verify all sitemaps are accessible (no 404s)

### After Launch

- [ ] Submit site to Google Search Console
- [ ] Verify ownership via chosen method
- [ ] Submit `sitemap-index.xml`
- [ ] Request indexing for top 10 priority pages
- [ ] Set up Bing Webmaster Tools
- [ ] Submit sitemaps to Bing
- [ ] Configure Google Analytics 4
- [ ] Set up GA4 conversion events (contact form, phone clicks)

### Weekly Maintenance

- [ ] Check Search Console for crawl errors
- [ ] Review coverage report (aim for 100% valid)
- [ ] Monitor Core Web Vitals trends
- [ ] Update sitemaps if new content added
- [ ] Submit new URLs via IndexNow
- [ ] Review keyword rankings (track top 20)

### Monthly Review

- [ ] Full Search Console performance analysis
- [ ] Core Web Vitals audit
- [ ] Backlink profile review
- [ ] Competitor keyword analysis
- [ ] Content gap analysis
- [ ] Update structured data if needed

---

## File Reference

| File | Location | Purpose |
|------|----------|---------|
| `robots.txt` | `/public/robots.txt` | Crawler instructions, sitemap references |
| `sitemap-index.xml` | `/public/sitemap-index.xml` | Master sitemap index |
| `sitemap-pages.xml` | `/public/sitemap-pages.xml` | Static pages |
| `sitemap-properties.xml` | `/public/sitemap-properties.xml` | Property listings |
| `sitemap-projects.xml` | `/public/sitemap-projects.xml` | Development projects |
| `sitemap-blog.xml` | `/public/sitemap-blog.xml` | Blog posts |
| `sitemap-images.xml` | `/public/sitemap-images.xml` | Image sitemap |
| `sitemap.xml` | `/public/sitemap.xml` | Legacy combined sitemap |
| `indexnow-key.txt` | `/public/indexnow-key.txt` | IndexNow API key |
| `google*.html` | `/public/google*.html` | Google verification file |
| `indexnow.ts` | `/src/utils/indexnow.ts` | IndexNow utility functions |
| `index.html` | `/index.html` | Meta tags, structured data |

---

## Support & Resources

**Official Documentation:**
- Google Search Central: https://developers.google.com/search
- Bing Webmaster Help: https://www.bing.com/webmasters/help
- IndexNow Protocol: https://www.indexnow.org/documentation
- Schema.org: https://schema.org/docs/full.html

**Community Resources:**
- Google Search Central Help: https://support.google.com/webmasters/
- r/SEO on Reddit: https://www.reddit.com/r/SEO/
- SEO-focused Discord communities

---

*Last updated: February 2026*
*Version: 2.0*
