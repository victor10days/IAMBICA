import React, { useState } from 'react';
import { COLORS, FONT, ARCHIVES_BASE } from '../styles/theme';

const ArtistCard = ({ artist, onClick, isMobile }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const size = isMobile ? '120px' : '160px';

  return (
    <div
      onClick={() => onClick(artist)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(artist)}
      style={{
        cursor: 'pointer',
        textAlign: 'center',
        padding: isMobile ? '12px' : '16px',
      }}
    >
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '0 auto 12px',
        border: `2px solid ${hovered ? COLORS.red : COLORS.dark}`,
        transition: 'border-color 0.3s',
        backgroundColor: COLORS.dark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {artist.profile_image && !imgError ? (
          <img
            src={`${ARCHIVES_BASE}/${artist.profile_image}`}
            alt={artist.name}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.3s',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        ) : (
          <span style={{
            color: COLORS.cream,
            fontFamily: FONT,
            fontSize: isMobile ? '28px' : '36px',
          }}>
            {artist.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <h4 style={{
        margin: '0 0 4px 0',
        fontSize: isMobile ? '14px' : '16px',
        color: hovered ? COLORS.red : COLORS.dark,
        fontFamily: FONT,
        transition: 'color 0.3s',
      }}>
        {artist.name}
      </h4>

      <span style={{
        fontSize: isMobile ? '10px' : '12px',
        color: COLORS.cream,
        backgroundColor: artist.type === 'visual' ? COLORS.dark : COLORS.red,
        padding: '2px 8px',
        fontFamily: FONT,
        display: 'inline-block',
      }}>
        {artist.type === 'visual' ? 'Arte Visual' : 'Música'}
      </span>
    </div>
  );
};

export default ArtistCard;
