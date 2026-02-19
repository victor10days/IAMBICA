import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/artists — list all, optional ?type= filter
router.get('/', (req, res) => {
  try {
    const { type } = req.query;
    let sql = 'SELECT * FROM artists';
    const params = [];

    if (type) { sql += ' WHERE type = ?'; params.push(type); }
    sql += ' ORDER BY name ASC';

    res.json(db.prepare(sql).all(...params));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/artists/:slug — single artist with events and media
router.get('/:slug', (req, res) => {
  try {
    const artist = db.prepare('SELECT * FROM artists WHERE slug = ?').get(req.params.slug);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });

    const events = db.prepare(`
      SELECT e.*, ea.role FROM events e
      JOIN event_artists ea ON e.id = ea.event_id
      WHERE ea.artist_id = ?
      ORDER BY e.year ASC
    `).all(artist.id);

    const media = db.prepare(
      'SELECT * FROM media WHERE artist_id = ? ORDER BY sort_order ASC, id ASC'
    ).all(artist.id);

    res.json({ artist, events, media });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/artists — create
router.post('/', (req, res) => {
  const { slug, name, type, bio, profile_image } = req.body;
  if (!slug || !name) {
    return res.status(400).json({ error: 'slug and name are required' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO artists (slug, name, type, bio, profile_image)
      VALUES (?, ?, ?, ?, ?)
    `).run(slug, name, type || 'music', bio || null, profile_image || null);

    res.status(201).json(db.prepare('SELECT * FROM artists WHERE id = ?').get(result.lastInsertRowid));
  } catch (err) {
    if (err.message.includes('UNIQUE constraint')) {
      return res.status(409).json({ error: 'An artist with this slug already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/artists/:slug — update
router.put('/:slug', (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM artists WHERE slug = ?').get(req.params.slug);
    if (!existing) return res.status(404).json({ error: 'Artist not found' });

    const fields = {
      name: req.body.name ?? existing.name,
      type: req.body.type ?? existing.type,
      bio: req.body.bio ?? existing.bio,
      profile_image: req.body.profile_image ?? existing.profile_image,
    };

    db.prepare(`
      UPDATE artists SET
        name = ?, type = ?, bio = ?, profile_image = ?,
        updated_at = datetime('now')
      WHERE slug = ?
    `).run(fields.name, fields.type, fields.bio, fields.profile_image, req.params.slug);

    res.json(db.prepare('SELECT * FROM artists WHERE slug = ?').get(req.params.slug));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/artists/:slug
router.delete('/:slug', (req, res) => {
  const result = db.prepare('DELETE FROM artists WHERE slug = ?').run(req.params.slug);
  if (result.changes === 0) return res.status(404).json({ error: 'Artist not found' });
  res.json({ deleted: true });
});

export default router;
