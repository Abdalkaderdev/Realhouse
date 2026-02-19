// ═══════════════════════════════════════════════════════════════════════════
// Inquiries/Leads CRM Routes
// ═══════════════════════════════════════════════════════════════════════════

import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../db/schema.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Submit inquiry (public - from contact form)
router.post('/', (req: Request, res: Response) => {
  const { name, email, phone, message, propertyId } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required' });
    return;
  }

  const id = uuid();

  db.prepare(`
    INSERT INTO inquiries (id, name, email, phone, message, property_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, name, email, phone || null, message || null, propertyId || null);

  res.status(201).json({ id, message: 'Inquiry submitted successfully' });
});

// Get all inquiries (protected)
router.get('/', authenticateToken, (req: AuthRequest, res: Response) => {
  const { status, limit, offset } = req.query;

  let query = 'SELECT i.*, p.title as property_title FROM inquiries i LEFT JOIN properties p ON i.property_id = p.id WHERE 1=1';
  const params: (string | number)[] = [];

  if (status) {
    query += ' AND i.status = ?';
    params.push(status as string);
  }

  query += ' ORDER BY i.created_at DESC';

  if (limit) {
    query += ' LIMIT ?';
    params.push(parseInt(limit as string, 10));
  }

  if (offset) {
    query += ' OFFSET ?';
    params.push(parseInt(offset as string, 10));
  }

  const inquiries = db.prepare(query).all(...params);
  const total = db.prepare('SELECT COUNT(*) as count FROM inquiries').get() as { count: number };

  res.json({ inquiries, total: total.count });
});

// Get single inquiry (protected)
router.get('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const inquiry = db.prepare(`
    SELECT i.*, p.title as property_title
    FROM inquiries i
    LEFT JOIN properties p ON i.property_id = p.id
    WHERE i.id = ?
  `).get(req.params.id);

  if (!inquiry) {
    res.status(404).json({ error: 'Inquiry not found' });
    return;
  }

  res.json(inquiry);
});

// Update inquiry status/notes (protected)
router.put('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const { status, notes, assignedTo } = req.body;
  const { id } = req.params;

  const existing = db.prepare('SELECT id FROM inquiries WHERE id = ?').get(id);
  if (!existing) {
    res.status(404).json({ error: 'Inquiry not found' });
    return;
  }

  db.prepare(`
    UPDATE inquiries SET
      status = COALESCE(?, status),
      notes = COALESCE(?, notes),
      assigned_to = COALESCE(?, assigned_to),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(status, notes, assignedTo, id);

  res.json({ message: 'Inquiry updated successfully' });
});

// Delete inquiry (protected)
router.delete('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const result = db.prepare('DELETE FROM inquiries WHERE id = ?').run(req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Inquiry not found' });
    return;
  }

  res.json({ message: 'Inquiry deleted successfully' });
});

// Get inquiry stats (protected)
router.get('/stats/summary', authenticateToken, (req: AuthRequest, res: Response) => {
  const stats = {
    total: (db.prepare('SELECT COUNT(*) as count FROM inquiries').get() as { count: number }).count,
    new: (db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'").get() as { count: number }).count,
    contacted: (db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'contacted'").get() as { count: number }).count,
    qualified: (db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'qualified'").get() as { count: number }).count,
    closed: (db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'closed'").get() as { count: number }).count
  };

  res.json(stats);
});

export default router;
