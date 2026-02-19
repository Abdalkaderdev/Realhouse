// ═══════════════════════════════════════════════════════════════════════════
// File Upload Routes
// ═══════════════════════════════════════════════════════════════════════════

import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuid()}${ext}`;
    cb(null, filename);
  }
});

// File filter for images only
const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Upload single image
router.post('/image', authenticateToken, upload.single('image'), (req: AuthRequest, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  res.json({
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

// Upload multiple images
router.post('/images', authenticateToken, upload.array('images', 10), (req: AuthRequest, res: Response) => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    res.status(400).json({ error: 'No files uploaded' });
    return;
  }

  const uploadedFiles = files.map(file => ({
    filename: file.filename,
    url: `/uploads/${file.filename}`,
    size: file.size,
    mimetype: file.mimetype
  }));

  res.json(uploadedFiles);
});

// Delete image
router.delete('/:filename', authenticateToken, (req: AuthRequest, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(uploadsDir, filename);

  // Prevent directory traversal
  if (!filePath.startsWith(uploadsDir)) {
    res.status(400).json({ error: 'Invalid filename' });
    return;
  }

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'File not found' });
    return;
  }

  fs.unlinkSync(filePath);
  res.json({ message: 'File deleted successfully' });
});

export default router;
