import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARCHIVES_DIR = path.resolve(__dirname, '..', '..', 'public', 'archives');

// Validate subdir to prevent directory traversal
function sanitizeSubdir(subdir) {
  const cleaned = (subdir || 'uploads').replace(/\.\./g, '').replace(/^\/+/, '');
  const resolved = path.resolve(ARCHIVES_DIR, cleaned);
  if (!resolved.startsWith(ARCHIVES_DIR)) return 'uploads';
  return cleaned;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subdir = sanitizeSubdir(req.body.subdir);
    const dest = path.join(ARCHIVES_DIR, subdir);
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, path.extname(file.originalname))
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-');
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
});

const router = Router();

// GET /api/media — list media, optional ?event_id= or ?artist_id=
router.get('/', (req, res) => {
  try {
    const { event_id, artist_id } = req.query;
    let sql = 'SELECT * FROM media';
    const conditions = [];
    const params = [];

    if (event_id) { conditions.push('event_id = ?'); params.push(Number(event_id)); }
    if (artist_id) { conditions.push('artist_id = ?'); params.push(Number(artist_id)); }
    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
    sql += ' ORDER BY sort_order ASC, id ASC';

    res.json(db.prepare(sql).all(...params));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/media/upload — upload image and create media record
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No valid image file uploaded' });
  }

  try {
    const { media_type, caption, event_id, artist_id } = req.body;
    const subdir = sanitizeSubdir(req.body.subdir);
    const filepath = `${subdir}/${req.file.filename}`;

    const result = db.prepare(`
      INSERT INTO media (filename, filepath, media_type, caption, event_id, artist_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      req.file.filename, filepath, media_type || 'photo', caption || null,
      event_id ? Number(event_id) : null, artist_id ? Number(artist_id) : null
    );

    res.status(201).json(db.prepare('SELECT * FROM media WHERE id = ?').get(result.lastInsertRowid));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/media/:id — delete record and file
router.delete('/:id', (req, res) => {
  try {
    const media = db.prepare('SELECT * FROM media WHERE id = ?').get(Number(req.params.id));
    if (!media) return res.status(404).json({ error: 'Media not found' });

    db.prepare('DELETE FROM media WHERE id = ?').run(media.id);

    // Remove file from disk if it exists
    const filePath = path.join(ARCHIVES_DIR, media.filepath);
    if (filePath.startsWith(ARCHIVES_DIR) && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
