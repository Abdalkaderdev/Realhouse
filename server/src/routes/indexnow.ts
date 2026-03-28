import { Router, Request, Response } from 'express';

const router = Router();

const INDEXNOW_KEY = '5srttrwsv1tfzbwmj8uqigc7jtlbi6m8';
const SITE_HOST = 'realhouseiq.com';
const BASE_URL = `https://${SITE_HOST}`;
const KEY_LOCATION = `${BASE_URL}/indexnow-key.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function submitUrls(urls: string[]): Promise<{ success: boolean; status?: number; error?: string }> {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });

    return {
      success: response.ok || response.status === 202,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Submit specific URLs
router.post('/submit', async (req: Request, res: Response) => {
  const { urls } = req.body;

  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'urls array required' });
  }

  const validUrls = urls.filter((u: string) => typeof u === 'string' && u.startsWith(`https://${SITE_HOST}`));
  if (validUrls.length === 0) {
    return res.status(400).json({ error: 'No valid URLs provided' });
  }

  const result = await submitUrls(validUrls);
  res.json({ submitted: validUrls.length, ...result });
});

// Notify about a specific page (property, project, blog)
router.post('/notify', async (req: Request, res: Response) => {
  const { type, id } = req.body;

  if (!type || !id) {
    return res.status(400).json({ error: 'type and id required' });
  }

  const urlMap: Record<string, string[]> = {
    property: [`${BASE_URL}/properties/${id}`, `${BASE_URL}/properties`],
    project: [`${BASE_URL}/projects/${id}`, `${BASE_URL}/projects`],
    blog: [`${BASE_URL}/blog/${id}`, `${BASE_URL}/blog`],
    location: [`${BASE_URL}/locations/${id}`, `${BASE_URL}/locations`],
  };

  const urls = urlMap[type];
  if (!urls) {
    return res.status(400).json({ error: `Invalid type: ${type}. Use: property, project, blog, location` });
  }

  const result = await submitUrls(urls);
  res.json({ type, id, urls, ...result });
});

// Health check / config info
router.get('/status', (_req: Request, res: Response) => {
  res.json({
    enabled: true,
    host: SITE_HOST,
    keyLocation: KEY_LOCATION,
    endpoint: ENDPOINT,
  });
});

export default router;
