// ═══════════════════════════════════════════════════════════════════════════
// Settings & Analytics Routes
// ═══════════════════════════════════════════════════════════════════════════

import { Router, Response } from 'express';
import db from '../db/schema.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// ─── Site Settings ─────────────────────────────────────────────────────────

router.get('/', authenticateToken, (req: AuthRequest, res: Response) => {
  const settings = db.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[];
  const result: Record<string, string> = {};
  settings.forEach(s => {
    result[s.key] = s.value;
  });
  res.json(result);
});

router.put('/', authenticateToken, (req: AuthRequest, res: Response) => {
  const updates = req.body;

  const stmt = db.prepare(`
    INSERT INTO settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `);

  for (const [key, value] of Object.entries(updates)) {
    stmt.run(key, String(value));
  }

  res.json({ message: 'Settings updated successfully' });
});

// ─── Analytics ─────────────────────────────────────────────────────────────

router.get('/analytics', authenticateToken, (req: AuthRequest, res: Response) => {
  // Property stats by type
  const propertyByType = db.prepare(`
    SELECT type, COUNT(*) as count FROM properties GROUP BY type
  `).all();

  // Property stats by status
  const propertyByStatus = db.prepare(`
    SELECT status, COUNT(*) as count FROM properties GROUP BY status
  `).all();

  // Price statistics
  const priceStats = db.prepare(`
    SELECT
      MIN(price_value) as min_price,
      MAX(price_value) as max_price,
      AVG(price_value) as avg_price,
      SUM(price_value) as total_value
    FROM properties WHERE published = 1
  `).get();

  // Inquiry stats by status
  const inquiryByStatus = db.prepare(`
    SELECT status, COUNT(*) as count FROM inquiries GROUP BY status
  `).all();

  // Recent activity (last 30 days)
  const recentInquiries = db.prepare(`
    SELECT DATE(created_at) as date, COUNT(*) as count
    FROM inquiries
    WHERE created_at >= datetime('now', '-30 days')
    GROUP BY DATE(created_at)
    ORDER BY date DESC
  `).all();

  // Top properties by inquiries
  const topProperties = db.prepare(`
    SELECT p.id, p.title, p.price, COUNT(i.id) as inquiry_count
    FROM properties p
    LEFT JOIN inquiries i ON p.id = i.property_id
    GROUP BY p.id
    ORDER BY inquiry_count DESC
    LIMIT 5
  `).all();

  res.json({
    propertyByType,
    propertyByStatus,
    priceStats,
    inquiryByStatus,
    recentInquiries,
    topProperties
  });
});

// ─── Export Data ───────────────────────────────────────────────────────────

router.get('/export/properties', authenticateToken, (req: AuthRequest, res: Response) => {
  const properties = db.prepare('SELECT * FROM properties ORDER BY created_at DESC').all();
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=properties.json');
  res.json(properties);
});

router.get('/export/inquiries', authenticateToken, (req: AuthRequest, res: Response) => {
  const inquiries = db.prepare(`
    SELECT i.*, p.title as property_title
    FROM inquiries i
    LEFT JOIN properties p ON i.property_id = p.id
    ORDER BY i.created_at DESC
  `).all();
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=inquiries.json');
  res.json(inquiries);
});

// ─── Activity Log ──────────────────────────────────────────────────────────

// Create activity_log table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    details TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

router.get('/activity', authenticateToken, (req: AuthRequest, res: Response) => {
  const { limit = 50 } = req.query;
  const activities = db.prepare(`
    SELECT al.*, u.name as user_name
    FROM activity_log al
    LEFT JOIN users u ON al.user_id = u.id
    ORDER BY al.created_at DESC
    LIMIT ?
  `).all(Number(limit));
  res.json(activities);
});

export function logActivity(userId: string | undefined, action: string, entityType?: string, entityId?: string, details?: string) {
  db.prepare(`
    INSERT INTO activity_log (user_id, action, entity_type, entity_id, details)
    VALUES (?, ?, ?, ?, ?)
  `).run(userId || null, action, entityType || null, entityId || null, details || null);
}

export default router;
