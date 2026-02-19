// ═══════════════════════════════════════════════════════════════════════════
// Authentication Middleware
// ═══════════════════════════════════════════════════════════════════════════

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// SECRET_KEY must be set in production environment
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY && process.env.NODE_ENV === 'production') {
  throw new Error('SECRET_KEY environment variable is required in production');
}
const SECRET_KEY = SECRET_KEY || 'dev-only-secret-key';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string; email: string; role: string };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}

export function generateToken(user: { id: string; email: string; role: string }): string {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '24h' });
}
