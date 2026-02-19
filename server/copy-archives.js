/**
 * Copies web-servable images from "Archives 2001/" to "public/archives/"
 * organized by category (photos, promos, artists).
 *
 * Run: node server/copy-archives.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const ARCHIVES_SRC = path.join(PROJECT_ROOT, 'Archives 2001');
const ARCHIVES_DEST = path.join(PROJECT_ROOT, 'public', 'archives');

const WEB_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

function isWebImage(filename) {
  return WEB_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function normalizeName(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Recursively copies web-servable images from srcDir into destDir.
 * Flattens subdirectories — all images end up in the same destDir.
 * Skips duplicates (same normalized filename).
 */
function copyImages(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`  Warning: source not found: ${srcDir}`);
    return 0;
  }
  fs.mkdirSync(destDir, { recursive: true });
  let count = 0;

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (entry.isFile() && isWebImage(entry.name)) {
      const destPath = path.join(destDir, normalizeName(entry.name));
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(path.join(srcDir, entry.name), destPath);
        count++;
      }
    } else if (entry.isDirectory()) {
      count += copyImages(path.join(srcDir, entry.name), destDir);
    }
  }
  return count;
}

// ─── Mappings ─────────────────────────────────────────────────

const photoMappings = [
  { src: 'photos/iambica', dest: 'photos/iambica-1' },
  { src: 'photos/iambica 2', dest: 'photos/iambica-2' },
];

const promoMappings = [
  { folder: 'eo' },
  { folder: 'hesychia' },
  { folder: 'iambica1', slug: 'iambica-1' },
  { folder: 'iambica2', slug: 'iambica-2' },
  { folder: 'modula' },
  { folder: 'modula2', slug: 'modula-2' },
  { folder: 'modula3', slug: 'modula-3' },
  { folder: 'noetic' },
  { folder: 'outopia' },
  { folder: 'parasolar' },
  { folder: 'subter_melodia', slug: 'subter-melodia' },
];

const artistMappings = [
  { folder: '214', bio: 'musica' },
  { folder: 'AMCK', slug: 'amck', bio: 'musica' },
  { folder: 'Balloon', slug: 'balloon', bio: 'musica' },
  { folder: 'Cornucopia', slug: 'cornucopia', bio: 'musica' },
  { folder: 'Frecuencias Alternas', slug: 'frecuencias-alternas', bio: 'musica' },
  { folder: 'Jorge Castro', slug: 'jorge-castro', bio: 'musica' },
  { folder: 'Kleptik', slug: 'kleptik', bio: 'musica' },
  { folder: 'Shhh', slug: 'shhh', bio: 'musica' },
  { folder: 'sinkfield', bio: 'musica' },
  { folder: 'Synesthesia', slug: 'synesthesia', bio: 'musica' },
  { folder: 'Thomas Ekelund', slug: 'thomas-ekelund', bio: 'arte' },
];

// ─── Execute ──────────────────────────────────────────────────

if (!fs.existsSync(ARCHIVES_SRC)) {
  console.error(`Error: Archives source not found: ${ARCHIVES_SRC}`);
  process.exit(1);
}

console.log('Copying archive images to public/archives/...\n');
let total = 0;

for (const { src, dest } of photoMappings) {
  const count = copyImages(path.join(ARCHIVES_SRC, src), path.join(ARCHIVES_DEST, dest));
  console.log(`  ${dest}: ${count} images`);
  total += count;
}

for (const { folder, slug } of promoMappings) {
  const destSlug = slug || folder;
  const count = copyImages(
    path.join(ARCHIVES_SRC, 'promos', folder),
    path.join(ARCHIVES_DEST, 'promos', destSlug)
  );
  console.log(`  promos/${destSlug}: ${count} images`);
  total += count;
}

for (const { folder, slug, bio } of artistMappings) {
  const destSlug = slug || folder.toLowerCase();
  const count = copyImages(
    path.join(ARCHIVES_SRC, 'docs', 'bios', bio, folder),
    path.join(ARCHIVES_DEST, 'artists', destSlug)
  );
  console.log(`  artists/${destSlug}: ${count} images`);
  total += count;
}

fs.mkdirSync(path.join(ARCHIVES_DEST, 'uploads'), { recursive: true });

console.log(`\nDone! ${total} images copied to public/archives/`);
