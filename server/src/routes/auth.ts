// ═══════════════════════════════════════════════════════════════════════════
// Authentication Routes
// ═══════════════════════════════════════════════════════════════════════════

import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db/schema.js';
import { generateToken, authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
  } | undefined;

  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});

// Get current user
router.get('/me', authenticateToken, (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const user = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
});

// Change password
router.post('/change-password', authenticateToken, (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'Current and new passwords are required' });
    return;
  }

  const user = db.prepare('SELECT password FROM users WHERE id = ?').get(req.user.id) as { password: string } | undefined;

  if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
    res.status(401).json({ error: 'Current password is incorrect' });
    return;
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(hashedPassword, req.user.id);

  res.json({ message: 'Password updated successfully' });
});

export default router;
