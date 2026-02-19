import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/events — list all, optional ?year= or ?series= filter
router.get('/', (req, res) => {
  try {
    const { year, series } = req.query;
    let sql = 'SELECT * FROM events';
    const conditions = [];
    const params = [];

    if (year) { conditions.push('year = ?'); params.push(Number(year)); }
    if (series) { conditions.push('series = ?'); params.push(series); }
    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
    sql += ' ORDER BY year ASC, date_start ASC';

    res.json(db.prepare(sql).all(...params));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/events/:slug — single event with artists and media
router.get('/:slug', (req, res) => {
  try {
    const event = db.prepare('SELECT * FROM events WHERE slug = ?').get(req.params.slug);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const artists = db.prepare(`
      SELECT a.*, ea.role FROM artists a
      JOIN event_artists ea ON a.id = ea.artist_id
      WHERE ea.event_id = ?
      ORDER BY a.name ASC
    `).all(event.id);

    const media = db.prepare(
      'SELECT * FROM media WHERE event_id = ? ORDER BY sort_order ASC, id ASC'
    ).all(event.id);

    res.json({ event, artists, media });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/events — create
router.post('/', (req, res) => {
  const { slug, name, series, edition, date_start, date_end, year, location, description, poster_image } = req.body;
  if (!slug || !name || !year) {
    return res.status(400).json({ error: 'slug, name, and year are required' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO events (slug, name, series, edition, date_start, date_end, year, location, description, poster_image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      slug, name, series || null, Number(edition) || null,
      date_start || null, date_end || null, Number(year),
      location || null, description || null, poster_image || null
    );
    res.status(201).json(db.prepare('SELECT * FROM events WHERE id = ?').get(result.lastInsertRowid));
  } catch (err) {
    if (err.message.includes('UNIQUE constraint')) {
      return res.status(409).json({ error: 'An event with this slug already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/events/:slug — update
router.put('/:slug', (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM events WHERE slug = ?').get(req.params.slug);
    if (!existing) return res.status(404).json({ error: 'Event not found' });

    const fields = {
      name: req.body.name ?? existing.name,
      series: req.body.series ?? existing.series,
      edition: req.body.edition != null ? Number(req.body.edition) : existing.edition,
      date_start: req.body.date_start ?? existing.date_start,
      date_end: req.body.date_end ?? existing.date_end,
      year: req.body.year != null ? Number(req.body.year) : existing.year,
      location: req.body.location ?? existing.location,
      description: req.body.description ?? existing.description,
      poster_image: req.body.poster_image ?? existing.poster_image,
    };

    db.prepare(`
      UPDATE events SET
        name = ?, series = ?, edition = ?, date_start = ?, date_end = ?,
        year = ?, location = ?, description = ?, poster_image = ?,
        updated_at = datetime('now')
      WHERE slug = ?
    `).run(
      fields.name, fields.series, fields.edition, fields.date_start, fields.date_end,
      fields.year, fields.location, fields.description, fields.poster_image,
      req.params.slug
    );

    res.json(db.prepare('SELECT * FROM events WHERE slug = ?').get(req.params.slug));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/events/:slug
router.delete('/:slug', (req, res) => {
  const result = db.prepare('DELETE FROM events WHERE slug = ?').run(req.params.slug);
  if (result.changes === 0) return res.status(404).json({ error: 'Event not found' });
  res.json({ deleted: true });
});

// POST /api/events/:slug/artists — link artist to event
router.post('/:slug/artists', (req, res) => {
  try {
    const event = db.prepare('SELECT id FROM events WHERE slug = ?').get(req.params.slug);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const { artist_slug, role } = req.body;
    if (!artist_slug) return res.status(400).json({ error: 'artist_slug is required' });

    const artist = db.prepare('SELECT id FROM artists WHERE slug = ?').get(artist_slug);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });

    db.prepare(
      'INSERT INTO event_artists (event_id, artist_id, role) VALUES (?, ?, ?)'
    ).run(event.id, artist.id, role || 'performer');
    res.status(201).json({ linked: true });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint') || err.message.includes('PRIMARY')) {
      return res.status(409).json({ error: 'Artist already linked to this event' });
    }
    res.status(500).json({ error: err.message });
  }
});

export default router;
