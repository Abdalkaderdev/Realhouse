// ═══════════════════════════════════════════════════════════════════════════
// Properties CRUD Routes
// ═══════════════════════════════════════════════════════════════════════════

import { Router, Response } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../db/schema.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get all properties (public)
router.get('/', (req, res) => {
  const { published, featured, type, limit } = req.query;

  let query = 'SELECT * FROM properties WHERE 1=1';
  const params: (string | number)[] = [];

  if (published !== undefined) {
    query += ' AND published = ?';
    params.push(published === 'true' ? 1 : 0);
  }

  if (featured !== undefined) {
    query += ' AND featured = ?';
    params.push(featured === 'true' ? 1 : 0);
  }

  if (type) {
    query += ' AND type = ?';
    params.push(type as string);
  }

  query += ' ORDER BY created_at DESC';

  if (limit) {
    query += ' LIMIT ?';
    params.push(parseInt(limit as string, 10));
  }

  const properties = db.prepare(query).all(...params);

  // Parse JSON fields
  const parsed = (properties as Record<string, unknown>[]).map(p => ({
    ...p,
    images: JSON.parse(p.images as string),
    features: JSON.parse(p.features as string)
  }));

  res.json(parsed);
});

// Get single property (public)
router.get('/:id', (req, res) => {
  const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(req.params.id) as Record<string, unknown> | undefined;

  if (!property) {
    res.status(404).json({ error: 'Property not found' });
    return;
  }

  res.json({
    ...property,
    images: JSON.parse(property.images as string),
    features: JSON.parse(property.features as string)
  });
});

// Create property (protected)
router.post('/', authenticateToken, (req: AuthRequest, res: Response) => {
  const {
    title, location, price, priceValue, type, status, beds, baths, sqft,
    lotSize, yearBuilt, neighborhood, description, shortDescription,
    images, features, virtualTourUrl, floorPlanUrl, agentId, featured, published
  } = req.body;

  if (!title || !location || !price || !priceValue || !type || !beds || !baths || !sqft || !description || !images) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const id = uuid();

  db.prepare(`
    INSERT INTO properties (
      id, title, location, price, price_value, type, status, beds, baths, sqft,
      lot_size, year_built, neighborhood, description, short_description,
      images, features, virtual_tour_url, floor_plan_url, agent_id, featured, published
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, title, location, price, priceValue, type, status || 'For Sale',
    beds, baths, sqft, lotSize || null, yearBuilt || null, neighborhood || null,
    description, shortDescription || null, JSON.stringify(images || []),
    JSON.stringify(features || []), virtualTourUrl || null, floorPlanUrl || null,
    agentId || null, featured ? 1 : 0, published !== false ? 1 : 0
  );

  res.status(201).json({ id, message: 'Property created successfully' });
});

// Update property (protected)
router.put('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT id FROM properties WHERE id = ?').get(id);

  if (!existing) {
    res.status(404).json({ error: 'Property not found' });
    return;
  }

  const {
    title, location, price, priceValue, type, status, beds, baths, sqft,
    lotSize, yearBuilt, neighborhood, description, shortDescription,
    images, features, virtualTourUrl, floorPlanUrl, agentId, featured, published
  } = req.body;

  db.prepare(`
    UPDATE properties SET
      title = COALESCE(?, title),
      location = COALESCE(?, location),
      price = COALESCE(?, price),
      price_value = COALESCE(?, price_value),
      type = COALESCE(?, type),
      status = COALESCE(?, status),
      beds = COALESCE(?, beds),
      baths = COALESCE(?, baths),
      sqft = COALESCE(?, sqft),
      lot_size = COALESCE(?, lot_size),
      year_built = COALESCE(?, year_built),
      neighborhood = COALESCE(?, neighborhood),
      description = COALESCE(?, description),
      short_description = COALESCE(?, short_description),
      images = COALESCE(?, images),
      features = COALESCE(?, features),
      virtual_tour_url = COALESCE(?, virtual_tour_url),
      floor_plan_url = COALESCE(?, floor_plan_url),
      agent_id = COALESCE(?, agent_id),
      featured = COALESCE(?, featured),
      published = COALESCE(?, published),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    title, location, price, priceValue, type, status, beds, baths, sqft,
    lotSize, yearBuilt, neighborhood, description, shortDescription,
    images ? JSON.stringify(images) : null, features ? JSON.stringify(features) : null,
    virtualTourUrl, floorPlanUrl, agentId, featured !== undefined ? (featured ? 1 : 0) : null,
    published !== undefined ? (published ? 1 : 0) : null, id
  );

  res.json({ message: 'Property updated successfully' });
});

// Delete property (protected)
router.delete('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const result = db.prepare('DELETE FROM properties WHERE id = ?').run(req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Property not found' });
    return;
  }

  res.json({ message: 'Property deleted successfully' });
});

export default router;
