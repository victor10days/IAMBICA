import React, { useState } from 'react';
import { COLORS, FONT, ARCHIVES_BASE } from '../styles/theme';

const EventCard = ({ event, onClick, isMobile }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imgHeight = isMobile ? '180px' : '200px';

  return (
    <div
      onClick={() => onClick(event)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(event)}
      style={{
        backgroundColor: COLORS.cream,
        border: `1px solid ${hovered ? COLORS.red : COLORS.dark}`,
        cursor: 'pointer',
        transition: 'border-color 0.3s',
        overflow: 'hidden',
        width: isMobile ? '100%' : '280px',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '100%',
        height: imgHeight,
        overflow: 'hidden',
        backgroundColor: COLORS.dark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {event.poster_image && !imgError ? (
          <img
            src={`${ARCHIVES_BASE}/${event.poster_image}`}
            alt={event.name}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.3s',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : (
          <span style={{
            color: COLORS.cream,
            fontFamily: FONT,
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: 'bold',
          }}>
            {event.name}
          </span>
        )}
      </div>

      <div style={{ padding: isMobile ? '12px' : '16px' }}>
        <h3 style={{
          margin: '0 0 6px 0',
          fontSize: isMobile ? '16px' : '18px',
          color: COLORS.dark,
          fontFamily: FONT,
        }}>
          {event.name}
        </h3>
        <div style={{
          fontSize: isMobile ? '12px' : '13px',
          color: COLORS.red,
          fontFamily: FONT,
          marginBottom: '8px',
        }}>
          {event.year}{event.location ? ` — ${event.location}` : ''}
        </div>
        {event.artist_names && (
          <div style={{
            fontSize: isMobile ? '11px' : '12px',
            color: COLORS.textLight,
            fontFamily: FONT,
            lineHeight: '1.4',
          }}>
            {event.artist_names}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
