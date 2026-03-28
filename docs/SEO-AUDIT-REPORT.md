# SEO Audit Report - Real House (realhouseiq.com)

**Audit Date:** March 28, 2026
**Status:** All critical/high issues fixed. Medium/low items tracked below.

---

## Fixed Issues

### Critical (All Fixed)

| Issue | Fix | Commit |
|-------|-----|--------|
| Blog sitemap: 69 posts with `undefined` lastmod | Changed `post.updatedAt` to `post.date` in `scripts/generate-sitemaps.ts` | `c33bb46` |
| Property sitemap: relative image URLs | Added `toAbsoluteUrl()` helper in sitemap generator | `c33bb46` |
| Project sitemap: wrong field names (`coverImage`, `location`) | Fixed to `image`, `location.district` | `c33bb46` |
| Hreflang missing from static HTML | Added en, ar, ku, x-default link tags to `index.html` | `c33bb46` |
| OG images generic on property pages | `src/app.ts` now uses `property.images[0]` for og:image | `c33bb46` |
| Phone number formatting inconsistent | Standardized to spaces across 15+ files | `c33bb46` |
| NAP address inconsistent | Standardized to "Queen Tower, Erbil" everywhere | `c33bb46` |
| FAQ schemas missing dates | Added datePublished/dateModified to all 12 FAQPage schemas | `c33bb46` |
| IndexNow not integrated | Key generated, bulk script, server API endpoints | `996d3f8` |
| Hero slider text not transitioning | Replaced CSS animation with transitions | `2a0a1c8` |
| Property cards: no image carousel | Added carousel with dots, arrows, swipe | `2a0a1c8` |
| Project cards: no image carousel | Added carousel with dots, arrows, swipe | `e501969` |
| No touch/swipe on any gallery | Added shared utility + swipe on all galleries | `2a0a1c8` |

---

## Current SEO Score

| Category | Score | Notes |
|----------|-------|-------|
| Page Titles | 10/10 | Unique, keyword-rich, 60 char limit |
| Meta Descriptions | 10/10 | Dynamic per page with CTAs |
| Heading Hierarchy | 9.5/10 | Proper H1>H2>H3 on all pages |
| Structured Data | 10/10 | 25+ schema types (Organization, RealEstateListing, FAQPage, BreadcrumbList, etc.) |
| Image SEO | 10/10 | Alt text, srcset, sizes, lazy loading, CLS prevention |
| Internal Linking | 10/10 | Breadcrumbs, related content, no orphan pages |
| URL Structure | 10/10 | Clean slugs, SPA routing, redirect map |
| Robots.txt | 10/10 | Bot-specific rules, AI bots blocked, social bots allowed |
| Sitemaps | 9/10 | 6 sitemaps covering all content types |
| Open Graph / Twitter | 9/10 | Dynamic per page, property-specific images |
| Canonical URLs | 9/10 | Dynamic per page |
| Mobile SEO | 10/10 | Viewport, PWA, touch targets |
| Accessibility | 10/10 | ARIA, semantic HTML, skip links, focus management |
| Security Headers | 10/10 | HSTS, CSP, X-Frame-Options |
| IndexNow | 10/10 | 198 URLs submitted, server API + deploy script |

---

## Remaining Items (Not Urgent)

### URL-Based Language Routing
- **Current:** Client-side language switching (same URL, JS changes content)
- **Ideal:** `/en/`, `/ar/`, `/ku/` URL prefixes for each language
- **Impact:** Translated content not separately indexed by search engines
- **Effort:** Major architectural change (SPA router, sitemaps, canonicals, hreflang)
- **Priority:** Low - site primarily targets English-speaking audience in Erbil

### Bundle Size Optimization
- **Current:** 2MB JS, 615KB CSS (single bundle)
- **Ideal:** Route-based code splitting, <500KB initial JS
- **How:** Vite `manualChunks` + dynamic `import()` for page renderers
- **Priority:** Medium - affects LCP/INP but site is fast on modern connections

### Additional Improvements
- Add `rel=next/prev` for paginated property listings
- Add Facebook App ID (`fb:app_id` meta tag) for Facebook analytics
- Verify 404 page returns HTTP 404 status (not 200) in production
- Add WebP/AVIF image format delivery (currently serving JPEG/PNG)
- Consider adding `prefers-reduced-motion` media query for all animations

---

## Key Files Reference

| Component | File |
|-----------|------|
| Sitemap generator | `scripts/generate-sitemaps.ts` |
| IndexNow bulk submit | `scripts/submit-indexnow.ts` |
| IndexNow server API | `server/src/routes/indexnow.ts` |
| IndexNow key | `public/indexnow-key.txt` |
| IndexNow client utility | `src/utils/indexnow.ts` |
| Schema/structured data | `src/seo/schema.ts` |
| Social meta (OG/Twitter) | `src/seo/social.ts` |
| Image SEO utilities | `src/utils/image-seo.ts` |
| SEO-friendly URLs | `src/utils/seo-urls.ts` |
| Page meta/title management | `src/app.ts` (lines 531-690, 1043-1080) |
| Robots.txt | `public/robots.txt` |
| Cache headers | `public/_headers` |
| Critical CSS | `src/styles/critical.scss` |
| Performance monitoring | `src/performance/web-vitals.ts` |
| Semantic HTML utilities | `src/utils/semantic-html.ts` |
| Internal linking | `src/components/internal-linking.ts` |
| Touch/swipe utility | `src/utils/touch-swipe.ts` |
