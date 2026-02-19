// ═══════════════════════════════════════════════════════════════════════════
// Content Management Routes (Testimonials, Team, FAQs, Agents)
// ═══════════════════════════════════════════════════════════════════════════

import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../db/schema.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// ─── Testimonials ────────────────────────────────────────────────────────────

router.get('/testimonials', (req, res) => {
  const { published } = req.query;
  let query = 'SELECT * FROM testimonials';

  if (published === 'true') {
    query += ' WHERE published = 1';
  }

  query += ' ORDER BY created_at DESC';
  res.json(db.prepare(query).all());
});

router.post('/testimonials', authenticateToken, (req: AuthRequest, res: Response) => {
  const { name, role, location, quote, image, rating, propertyType, published } = req.body;

  if (!name || !role || !location || !quote) {
    res.status(400).json({ error: 'Name, role, location, and quote are required' });
    return;
  }

  const id = uuid();
  db.prepare(`
    INSERT INTO testimonials (id, name, role, location, quote, image, rating, property_type, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, role, location, quote, image || null, rating || 5, propertyType || null, published !== false ? 1 : 0);

  res.status(201).json({ id, message: 'Testimonial created successfully' });
});

router.put('/testimonials/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const { name, role, location, quote, image, rating, propertyType, published } = req.body;
  const { id } = req.params;

  db.prepare(`
    UPDATE testimonials SET
      name = COALESCE(?, name),
      role = COALESCE(?, role),
      location = COALESCE(?, location),
      quote = COALESCE(?, quote),
      image = COALESCE(?, image),
      rating = COALESCE(?, rating),
      property_type = COALESCE(?, property_type),
      published = COALESCE(?, published),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(name, role, location, quote, image, rating, propertyType, published !== undefined ? (published ? 1 : 0) : null, id);

  res.json({ message: 'Testimonial updated successfully' });
});

router.delete('/testimonials/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const result = db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    res.status(404).json({ error: 'Testimonial not found' });
    return;
  }
  res.json({ message: 'Testimonial deleted successfully' });
});

// ─── Team Members ────────────────────────────────────────────────────────────

router.get('/team', (req, res) => {
  const { published } = req.query;
  let query = 'SELECT * FROM team_members';

  if (published === 'true') {
    query += ' WHERE published = 1';
  }

  query += ' ORDER BY display_order ASC, created_at DESC';
  res.json(db.prepare(query).all());
});

router.post('/team', authenticateToken, (req: AuthRequest, res: Response) => {
  const { name, role, bio, image, email, linkedin, displayOrder, published } = req.body;

  if (!name || !role) {
    res.status(400).json({ error: 'Name and role are required' });
    return;
  }

  const id = uuid();
  db.prepare(`
    INSERT INTO team_members (id, name, role, bio, image, email, linkedin, display_order, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, role, bio || null, image || null, email || null, linkedin || null, displayOrder || 0, published !== false ? 1 : 0);

  res.status(201).json({ id, message: 'Team member created successfully' });
});

router.put('/team/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const { name, role, bio, image, email, linkedin, displayOrder, published } = req.body;
  const { id } = req.params;

  db.prepare(`
    UPDATE team_members SET
      name = COALESCE(?, name),
      role = COALESCE(?, role),
      bio = COALESCE(?, bio),
      image = COALESCE(?, image),
      email = COALESCE(?, email),
      linkedin = COALESCE(?, linkedin),
      display_order = COALESCE(?, display_order),
      published = COALESCE(?, published),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(name, role, bio, image, email, linkedin, displayOrder, published !== undefined ? (published ? 1 : 0) : null, id);

  res.json({ message: 'Team member updated successfully' });
});

router.delete('/team/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const result = db.prepare('DELETE FROM team_members WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    res.status(404).json({ error: 'Team member not found' });
    return;
  }
  res.json({ message: 'Team member deleted successfully' });
});

// ─── FAQs ────────────────────────────────────────────────────────────────────

router.get('/faqs', (req, res) => {
  const { published, category } = req.query;
  let query = 'SELECT * FROM faqs WHERE 1=1';
  const params: string[] = [];

  if (published === 'true') {
    query += ' AND published = 1';
  }

  if (category) {
    query += ' AND category = ?';
    params.push(category as string);
  }

  query += ' ORDER BY display_order ASC, created_at DESC';
  res.json(db.prepare(query).all(...params));
});

router.post('/faqs', authenticateToken, (req: AuthRequest, res: Response) => {
  const { question, answer, category, displayOrder, published } = req.body;

  if (!question || !answer) {
    res.status(400).json({ error: 'Question and answer are required' });
    return;
  }

  const id = uuid();
  db.prepare(`
    INSERT INTO faqs (id, question, answer, category, display_order, published)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, question, answer, category || 'General', displayOrder || 0, published !== false ? 1 : 0);

  res.status(201).json({ id, message: 'FAQ created successfully' });
});

router.put('/faqs/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const { question, answer, category, displayOrder, published } = req.body;
  const { id } = req.params;

  db.prepare(`
    UPDATE faqs SET
      question = COALESCE(?, question),
      answer = COALESCE(?, answer),
      category = COALESCE(?, category),
      display_order = COALESCE(?, display_order),
      published = COALESCE(?, published),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(question, answer, category, displayOrder, published !== undefined ? (published ? 1 : 0) : null, id);

  res.json({ message: 'FAQ updated successfully' });
});

router.delete('/faqs/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const result = db.prepare('DELETE FROM faqs WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    res.status(404).json({ error: 'FAQ not found' });
    return;
  }
  res.json({ message: 'FAQ deleted successfully' });
});

// ─── Agents ──────────────────────────────────────────────────────────────────

router.get('/agents', (req, res) => {
  res.json(db.prepare('SELECT * FROM agents ORDER BY name ASC').all());
});

router.post('/agents', authenticateToken, (req: AuthRequest, res: Response) => {
  const { name, title, email, phone, image, bio } = req.body;

  if (!name || !title || !email || !phone) {
    res.status(400).json({ error: 'Name, title, email, and phone are required' });
    return;
  }

  const id = uuid();
  db.prepare(`
    INSERT INTO agents (id, name, title, email, phone, image, bio)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, title, email, phone, image || null, bio || null);

  res.status(201).json({ id, message: 'Agent created successfully' });
});

router.put('/agents/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const { name, title, email, phone, image, bio } = req.body;
  const { id } = req.params;

  db.prepare(`
    UPDATE agents SET
      name = COALESCE(?, name),
      title = COALESCE(?, title),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      image = COALESCE(?, image),
      bio = COALESCE(?, bio),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(name, title, email, phone, image, bio, id);

  res.json({ message: 'Agent updated successfully' });
});

router.delete('/agents/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const result = db.prepare('DELETE FROM agents WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    res.status(404).json({ error: 'Agent not found' });
    return;
  }
  res.json({ message: 'Agent deleted successfully' });
});

export default router;
