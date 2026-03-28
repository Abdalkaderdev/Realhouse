# IndexNow Integration Guide

IndexNow notifies search engines (Bing, Yandex, Seznam, Naver, etc.) instantly when content changes, instead of waiting for their crawlers to discover updates.

---

## Quick Reference

```bash
# Submit all 198 URLs after deployment
npm run indexnow

# Build + submit in one step
npm run deploy
```

---

## How It Works

1. A unique key (`5srttrws...`) is stored at `https://realhouseiq.com/indexnow-key.txt`
2. When we submit URLs, the IndexNow API verifies the key matches
3. All participating search engines are notified via the shared IndexNow network
4. Submitting to one endpoint (api.indexnow.org) notifies all engines

---

## Components

### 1. Bulk Submission Script

**File:** `scripts/submit-indexnow.ts`
**Run:** `npm run indexnow`

Submits all pages at once:
- 12 main pages (home, properties, projects, blog, about, contact, etc.)
- 18 property detail pages
- 93 project detail pages
- 69 blog posts
- 6 location/neighborhood pages

**When to run:** After every deployment, or after bulk content updates.

### 2. Server API Endpoints

**Base:** `http://localhost:3001/api/indexnow`

#### POST /api/indexnow/notify
Notify search engines about a specific new/updated page.

```bash
# New property added
curl -X POST http://localhost:3001/api/indexnow/notify \
  -H "Content-Type: application/json" \
  -d '{"type": "property", "id": "new-villa-gulan"}'

# New project added
curl -X POST http://localhost:3001/api/indexnow/notify \
  -H "Content-Type: application/json" \
  -d '{"type": "project", "id": "sky-towers"}'

# New blog post published
curl -X POST http://localhost:3001/api/indexnow/notify \
  -H "Content-Type: application/json" \
  -d '{"type": "blog", "id": "erbil-market-trends-2026"}'

# Location page updated
curl -X POST http://localhost:3001/api/indexnow/notify \
  -H "Content-Type: application/json" \
  -d '{"type": "location", "id": "gulan"}'
```

**Types:** `property`, `project`, `blog`, `location`

Each notification also submits the parent listing page (e.g., `/properties` when a property is added).

#### POST /api/indexnow/submit
Submit arbitrary URLs.

```bash
curl -X POST http://localhost:3001/api/indexnow/submit \
  -H "Content-Type: application/json" \
  -d '{"urls": ["https://realhouseiq.com/properties", "https://realhouseiq.com/projects"]}'
```

#### GET /api/indexnow/status
Check IndexNow configuration.

```bash
curl http://localhost:3001/api/indexnow/status
```

### 3. Client-Side Utility (Not Currently Used)

**File:** `src/utils/indexnow.ts`

Contains browser-side functions (`submitUrl`, `submitUrls`, `notifyNewProperty`, etc.) but these won't work from browsers due to CORS. They're available if you need them in a Node.js context or if IndexNow adds CORS support in the future.

---

## Key Management

**Key file:** `public/indexnow-key.txt`
**Key in code:** `scripts/submit-indexnow.ts`, `server/src/routes/indexnow.ts`, `src/utils/indexnow.ts`

If you need to rotate the key:
1. Generate a new key (8-128 lowercase alphanumeric chars)
2. Update `public/indexnow-key.txt`
3. Update the `INDEXNOW_KEY` constant in all three files above
4. Deploy and run `npm run indexnow` to verify

---

## Integrating with CMS Workflow

When the admin CMS creates or updates content, call the notify endpoint:

```typescript
// In your CMS save handler:
async function onPropertySaved(propertyId: string) {
  await fetch('/api/indexnow/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'property', id: propertyId }),
  });
}
```

---

## Expected Response Codes

| Status | Meaning |
|--------|---------|
| 200 | URL submitted successfully |
| 202 | URL accepted for processing (most common success response) |
| 400 | Invalid request (bad key, malformed URL) |
| 403 | Key does not match key file |
| 422 | Invalid URL (not matching host) |
| 429 | Too many requests (rate limited) |

---

## Troubleshooting

**"Key file not accessible"** - Ensure `public/indexnow-key.txt` is deployed and accessible at `https://realhouseiq.com/indexnow-key.txt`

**"403 Forbidden"** - Key in code doesn't match key file content. Check both match exactly.

**"Network error"** - Check outbound HTTPS access to `api.indexnow.org`

**Verify key file manually:**
```bash
curl https://realhouseiq.com/indexnow-key.txt
# Should output: 5srttrwsv1tfzbwmj8uqigc7jtlbi6m8
```
