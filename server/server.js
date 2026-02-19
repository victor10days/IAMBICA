import express from 'express';
import cors from 'cors';
import db from './db.js';
import eventsRouter from './routes/events.js';
import artistsRouter from './routes/artists.js';
import mediaRouter from './routes/media.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/events', eventsRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/media', mediaRouter);

// Timeline — events grouped by year
app.get('/api/timeline', (req, res) => {
  try {
    const events = db.prepare(`
      SELECT e.*, GROUP_CONCAT(a.name, ', ') AS artist_names
      FROM events e
      LEFT JOIN event_artists ea ON e.id = ea.event_id
      LEFT JOIN artists a ON ea.artist_id = a.id
      GROUP BY e.id
      ORDER BY e.year ASC, e.date_start ASC
    `).all();

    const grouped = {};
    for (const event of events) {
      if (!grouped[event.year]) grouped[event.year] = [];
      grouped[event.year].push(event);
    }

    const timeline = Object.entries(grouped)
      .map(([year, evts]) => ({ year: Number(year), events: evts }))
      .sort((a, b) => a.year - b.year);

    res.json(timeline);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`IAMBICA API server running on http://localhost:${PORT}`);
});
