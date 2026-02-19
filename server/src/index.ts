// ═══════════════════════════════════════════════════════════════════════════
// Real House CMS/CRM Server
// ═══════════════════════════════════════════════════════════════════════════

import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { initDatabase } from './db/schema.js';
import authRoutes from './routes/auth.js';
import propertiesRoutes from './routes/properties.js';
import inquiriesRoutes from './routes/inquiries.js';
import contentRoutes from './routes/content.js';
import uploadRoutes from './routes/upload.js';
import settingsRoutes from './routes/settings.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database
initDatabase();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for now to allow inline scripts in admin
  crossOriginEmbedderPolicy: false
}));

// Rate limiting - prevent brute force and spam
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: { error: 'Too many login attempts, please try again later.' }
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 contact form submissions per hour
  message: { error: 'Too many inquiries submitted, please try again later.' }
});

// Apply rate limiters
app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/inquiries', contactLimiter);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:3000', 'http://localhost:3001', 'https://realhouseiq.com'],
  credentials: true
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);

// Serve admin panel
const adminPath = path.join(process.cwd(), 'admin');
console.log('Admin path:', adminPath);
app.get('/admin', (_req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});
app.use('/admin/', express.static(adminPath));

// Dashboard stats endpoint
app.get('/api/dashboard/stats', (_req, res) => {
  // Import db dynamically to avoid circular dependencies
  import('./db/schema.js').then(({ default: db }) => {
    const stats = {
      properties: (db.prepare('SELECT COUNT(*) as count FROM properties').get() as { count: number }).count,
      publishedProperties: (db.prepare('SELECT COUNT(*) as count FROM properties WHERE published = 1').get() as { count: number }).count,
      inquiries: (db.prepare('SELECT COUNT(*) as count FROM inquiries').get() as { count: number }).count,
      newInquiries: (db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'").get() as { count: number }).count,
      testimonials: (db.prepare('SELECT COUNT(*) as count FROM testimonials').get() as { count: number }).count,
      teamMembers: (db.prepare('SELECT COUNT(*) as count FROM team_members').get() as { count: number }).count
    };
    res.json(stats);
  }).catch(err => {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ error: 'Failed to load stats' });
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve admin panel in production
if (process.env.NODE_ENV === 'production') {
  app.use('/admin', express.static(path.join(process.cwd(), 'dist-admin')));
  app.get('/admin/*', (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist-admin', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                     Real House CMS/CRM Server                             ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  Server running on: http://localhost:${PORT}                                ║
║  API Base URL:      http://localhost:${PORT}/api                            ║
║                                                                           ║
║  Default Admin:     admin@realhouseiq.com / admin123                      ║
║                                                                           ║
║  Endpoints:                                                               ║
║    POST /api/auth/login          - Login                                  ║
║    GET  /api/properties          - List properties                        ║
║    POST /api/properties          - Create property                        ║
║    GET  /api/inquiries           - List inquiries (CRM)                   ║
║    GET  /api/content/testimonials- List testimonials                      ║
║    GET  /api/content/team        - List team members                      ║
║    GET  /api/content/faqs        - List FAQs                              ║
║    POST /api/upload/image        - Upload image                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
  `);
});
