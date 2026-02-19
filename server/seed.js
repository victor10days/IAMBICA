/**
 * Seeds the SQLite database with archive data from public/archives/.
 * Run: node server/seed.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARCHIVES_DIR = path.join(__dirname, '..', 'public', 'archives');

// ─── Data ─────────────────────────────────────────────────────

const events = [
  { slug: 'iambica-1', name: 'IAMBICA 1', series: 'iambica', edition: 1, year: 2001,
    location: 'San Juan, Puerto Rico',
    description: 'The inaugural edition of Festival Iámbica — an experimental convergence of electronic music, sound art, and digital media in Puerto Rico.' },
  { slug: 'iambica-2', name: 'IAMBICA 2', series: 'iambica', edition: 2, year: 2002,
    location: 'San Juan, Puerto Rico', poster_image: 'promos/iambica-2/seri2.jpg',
    description: 'The second edition of Festival Iámbica continued to push the boundaries of experimental art and electronic music in Puerto Rico.' },
  { slug: 'modula', name: 'Modula', series: 'modula', edition: 1, year: 2002,
    location: 'San Juan, Puerto Rico', poster_image: 'promos/modula/modula.jpg',
    description: 'The first in the Modula series — intimate electronic music events curated by Iámbica.' },
  { slug: 'modula-2', name: 'Modula 2', series: 'modula', edition: 2, year: 2003,
    date_start: '2003-07-17', location: 'Don Pablo, San Juan', poster_image: 'promos/modula-2/m2poster.jpg',
    description: 'Emotional Rescue presents IAMBICA #modula_2. Featuring Parasolar, Table, Balloon, Sinkfield, and DJ sets by Noel Villegas. Free entrance.' },
  { slug: 'modula-3', name: 'Modula 3', series: 'modula', edition: 3, year: 2003,
    date_start: '2003-11-27', location: 'San Juan, Puerto Rico',
    description: 'The third installment of the Modula electronic music series.' },
  { slug: 'parasolar', name: 'Parasolar', year: 2002,
    location: 'San Juan, Puerto Rico', poster_image: 'promos/parasolar/parasolar-poster.jpg',
    description: 'A collaborative live performance project blending electronic sound and experimental composition.' },
  { slug: 'outopia', name: 'Outopia', year: 2002,
    location: 'San Juan, Puerto Rico', poster_image: 'promos/outopia/ou-poster.jpg',
    description: 'An exploration of utopian and dystopian sonic landscapes through electronic and experimental performance.' },
  { slug: 'hesychia', name: 'Hesychia', year: 2002,
    location: 'San Juan, Puerto Rico', poster_image: 'promos/hesychia/hesychia-poster.jpg',
    description: 'Named after the Greek concept of inner stillness — an event exploring the intersection of silence, ambient sound, and contemplative art.' },
  { slug: 'noetic', name: 'Noetic', year: 2002,
    location: 'San Juan, Puerto Rico', poster_image: 'promos/noetic/noetic.jpg',
    description: 'An event inspired by the realm of consciousness and inner knowing — combining experimental sound and visual art.' },
  { slug: 'eo', name: 'Eo', year: 2002,
    location: 'San Juan, Puerto Rico', poster_image: 'promos/eo/eo.jpg',
    description: 'A focused, stripped-back event from the Iámbica collective exploring the roots of electronic expression.' },
  { slug: 'subter-melodia', name: 'SubTer Melodía', year: 2003,
    location: 'San Juan, Puerto Rico', poster_image: 'promos/subter-melodia/melodia.jpg',
    description: 'An underground melodic journey — an Iámbica event delving into the subterranean currents of experimental music.' },
  { slug: 'sono', name: 'SONO', year: 2003,
    date_start: '2003-11-28', location: 'M&M Proyectos, Viejo San Juan',
    description: 'Festival de arte sonoro featuring an experimental cinema section curated within the "Sala Iambica" installation.' },
];

const artists = [
  { slug: '214',                  name: '214',                  type: 'music',  profile_image: 'artists/214/214_01.jpg' },
  { slug: 'amck',                 name: 'AMCK',                 type: 'music',  profile_image: 'artists/amck/amck_01.jpg' },
  { slug: 'balloon',              name: 'Balloon',              type: 'music',  profile_image: 'artists/balloon/balloon_01.jpg' },
  { slug: 'cornucopia',           name: 'Cornucopia',           type: 'music',  profile_image: 'artists/cornucopia/cornucopia_01.jpg' },
  { slug: 'frecuencias-alternas', name: 'Frecuencias Alternas', type: 'music',  profile_image: 'artists/frecuencias-alternas/stel01.jpg' },
  { slug: 'jorge-castro',         name: 'Jorge Castro',         type: 'music',  profile_image: 'artists/jorge-castro/castro_01.jpg' },
  { slug: 'kleptik',              name: 'Kleptik',              type: 'music',  profile_image: 'artists/kleptik/kleptik_01.jpg' },
  { slug: 'shhh',                 name: 'Shhh',                 type: 'music',  profile_image: 'artists/shhh/shhhcd.gif' },
  { slug: 'sinkfield',            name: 'Sinkfield',            type: 'music',  profile_image: 'artists/sinkfield/nx1_01.jpg' },
  { slug: 'synesthesia',          name: 'Synesthesia',          type: 'music',  profile_image: 'artists/synesthesia/syne01.jpg' },
  { slug: 'thomas-ekelund',       name: 'Thomas Ekelund',       type: 'visual', profile_image: 'artists/thomas-ekelund/thomas.jpg' },
];

const eventArtistLinks = [
  // All artists participated in IAMBICA 1 & 2
  ...artists.map(a => ({ event: 'iambica-1', artist: a.slug, role: a.type === 'visual' ? 'exhibitor' : 'performer' })),
  ...artists.map(a => ({ event: 'iambica-2', artist: a.slug, role: a.type === 'visual' ? 'exhibitor' : 'performer' })),
  // Modula 2 lineup (from original HTML)
  { event: 'modula-2', artist: 'balloon', role: 'performer' },
  { event: 'modula-2', artist: 'sinkfield', role: 'performer' },
  { event: 'modula-2', artist: 'synesthesia', role: 'performer' },
];

// ─── Helpers ──────────────────────────────────────────────────

function scanImages(dir) {
  const fullPath = path.join(ARCHIVES_DIR, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath)
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .sort()
    .map(f => `${dir}/${f}`);
}

function insertMediaBatch(insertStmt, getIdStmt, images, mediaType, idField, slug) {
  const row = slug ? getIdStmt.get(slug) : null;
  const idValue = row ? row.id : null;

  for (let i = 0; i < images.length; i++) {
    insertStmt.run({
      filename: path.basename(images[i]),
      filepath: images[i],
      media_type: mediaType,
      sort_order: i,
      event_id: idField === 'event' ? idValue : null,
      artist_id: idField === 'artist' ? idValue : null,
    });
  }
  return images.length;
}

// ─── Seed ─────────────────────────────────────────────────────

function seedDB() {
  console.log('Seeding database...\n');

  // Clear existing data (order matters for foreign keys)
  db.exec('DELETE FROM event_artists; DELETE FROM media; DELETE FROM events; DELETE FROM artists;');

  // Prepared statements
  const insertEvent = db.prepare(`
    INSERT INTO events (slug, name, series, edition, date_start, date_end, year, location, description, poster_image)
    VALUES (@slug, @name, @series, @edition, @date_start, @date_end, @year, @location, @description, @poster_image)
  `);
  const insertArtist = db.prepare(`
    INSERT INTO artists (slug, name, type, bio, profile_image)
    VALUES (@slug, @name, @type, @bio, @profile_image)
  `);
  const insertLink = db.prepare(`
    INSERT OR IGNORE INTO event_artists (event_id, artist_id, role)
    VALUES ((SELECT id FROM events WHERE slug = @event), (SELECT id FROM artists WHERE slug = @artist), @role)
  `);
  const insertMedia = db.prepare(`
    INSERT INTO media (filename, filepath, media_type, sort_order, event_id, artist_id)
    VALUES (@filename, @filepath, @media_type, @sort_order, @event_id, @artist_id)
  `);
  const getEventId = db.prepare('SELECT id FROM events WHERE slug = ?');
  const getArtistId = db.prepare('SELECT id FROM artists WHERE slug = ?');

  // Use a transaction for speed and atomicity
  const seed = db.transaction(() => {
    // Events
    for (const e of events) {
      insertEvent.run({
        slug: e.slug, name: e.name, series: e.series || null,
        edition: e.edition || null, date_start: e.date_start || null,
        date_end: e.date_end || null, year: e.year,
        location: e.location || null, description: e.description || null,
        poster_image: e.poster_image || null,
      });
    }
    console.log(`  ${events.length} events`);

    // Artists
    for (const a of artists) {
      insertArtist.run({
        slug: a.slug, name: a.name, type: a.type,
        bio: a.bio || null, profile_image: a.profile_image || null,
      });
    }
    console.log(`  ${artists.length} artists`);

    // Event-artist links
    let linkCount = 0;
    for (const link of eventArtistLinks) {
      const r = insertLink.run({ event: link.event, artist: link.artist, role: link.role });
      if (r.changes) linkCount++;
    }
    console.log(`  ${linkCount} event-artist links`);

    // Media — event photos, promos, artist portraits
    let mediaCount = 0;

    const photoMaps = { 'photos/iambica-1': 'iambica-1', 'photos/iambica-2': 'iambica-2' };
    for (const [dir, slug] of Object.entries(photoMaps)) {
      mediaCount += insertMediaBatch(insertMedia, getEventId, scanImages(dir), 'photo', 'event', slug);
    }

    const promoSlugs = events.map(e => e.slug);
    for (const slug of promoSlugs) {
      mediaCount += insertMediaBatch(insertMedia, getEventId, scanImages(`promos/${slug}`), 'promo', 'event', slug);
    }

    for (const a of artists) {
      mediaCount += insertMediaBatch(insertMedia, getArtistId, scanImages(`artists/${a.slug}`), 'portrait', 'artist', a.slug);
    }

    console.log(`  ${mediaCount} media records`);
  });

  seed();
  console.log('\nSeeding complete!');
}

seedDB();
