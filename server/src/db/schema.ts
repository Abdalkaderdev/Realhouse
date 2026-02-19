// ═══════════════════════════════════════════════════════════════════════════
// Database Schema and Initialization
// ═══════════════════════════════════════════════════════════════════════════

import Database from 'better-sqlite3';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

const db = new Database('realhouse.db');

export function initDatabase(): void {
  // Users table (for admin authentication)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Properties table
  db.exec(`
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      price TEXT NOT NULL,
      price_value INTEGER NOT NULL,
      type TEXT NOT NULL,
      status TEXT DEFAULT 'For Sale',
      beds INTEGER NOT NULL,
      baths INTEGER NOT NULL,
      sqft TEXT NOT NULL,
      lot_size TEXT,
      year_built INTEGER,
      neighborhood TEXT,
      description TEXT NOT NULL,
      short_description TEXT,
      images TEXT NOT NULL,
      features TEXT NOT NULL,
      virtual_tour_url TEXT,
      floor_plan_url TEXT,
      agent_id TEXT,
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Agents table
  db.exec(`
    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      image TEXT,
      bio TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Testimonials table
  db.exec(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      location TEXT NOT NULL,
      quote TEXT NOT NULL,
      image TEXT,
      rating INTEGER DEFAULT 5,
      property_type TEXT,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Team members table
  db.exec(`
    CREATE TABLE IF NOT EXISTS team_members (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT,
      image TEXT,
      email TEXT,
      linkedin TEXT,
      display_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // FAQs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS faqs (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT DEFAULT 'General',
      display_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Inquiries/Leads table (CRM)
  db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT,
      property_id TEXT,
      status TEXT DEFAULT 'new',
      notes TEXT,
      assigned_to TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create default admin user if none exists
  const adminExists = db.prepare('SELECT id FROM users WHERE role = ?').get('admin');
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare(`
      INSERT INTO users (id, email, password, name, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(uuid(), 'admin@realhouseiq.com', hashedPassword, 'Admin', 'admin');
    console.log('Default admin user created: admin@realhouseiq.com / admin123');
  }
}

export default db;
