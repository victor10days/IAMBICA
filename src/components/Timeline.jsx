import React from 'react';
import { COLORS, FONT } from '../styles/theme';
import EventCard from './EventCard';

const Timeline = ({ timeline, onEventClick, isMobile }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      {timeline.map(({ year, events }) => (
        <div key={year} style={{ marginBottom: isMobile ? '40px' : '60px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: isMobile ? '20px' : '30px',
            gap: '16px',
          }}>
            <div style={{
              width: isMobile ? '60px' : '80px',
              height: isMobile ? '60px' : '80px',
              borderRadius: '50%',
              backgroundColor: COLORS.red,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                color: COLORS.cream,
                fontFamily: FONT,
                fontSize: isMobile ? '20px' : '28px',
                fontWeight: 'bold',
              }}>
                {year}
              </span>
            </div>
            <div style={{ flex: 1, height: '1px', backgroundColor: COLORS.dark }} />
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? '16px' : '24px',
            paddingLeft: isMobile ? '0' : '96px',
          }}>
            {events.map((event) => (
              <EventCard
                key={event.slug}
                event={event}
                onClick={onEventClick}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
