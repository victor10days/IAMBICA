import React from 'react';
import { COLORS, ARCHIVES_BASE } from '../styles/theme';

const PhotoGrid = ({ photos, onPhotoClick, isMobile }) => {
  if (!photos || photos.length === 0) return null;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '130px' : '180px'}, 1fr))`,
      gap: isMobile ? '8px' : '12px',
      width: '100%',
    }}>
      {photos.map((photo, index) => (
        <div
          key={photo.id || index}
          onClick={() => onPhotoClick(index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onPhotoClick(index)}
          style={{
            cursor: 'pointer',
            overflow: 'hidden',
            backgroundColor: COLORS.dark,
            aspectRatio: '1',
          }}
        >
          <img
            src={`${ARCHIVES_BASE}/${photo.filepath}`}
            alt={photo.caption || photo.filename}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.3s, opacity 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
