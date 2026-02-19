import React, { useEffect, useCallback, useState } from 'react';
import { COLORS, FONT, ARCHIVES_BASE } from '../styles/theme';

const SWIPE_THRESHOLD = 50;

const PhotoGallery = ({ photos, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [touchStartX, setTouchStartX] = useState(null);

  const goNext = useCallback(() => {
    setCurrentIndex(i => (i + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(i => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const photo = photos[currentIndex];

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      diff > 0 ? goPrev() : goNext();
    }
    setTouchStartX(null);
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(250, 243, 225, 0.15)',
    color: COLORS.cream,
    border: 'none',
    fontSize: '36px',
    cursor: 'pointer',
    padding: '16px',
    zIndex: 10,
    fontFamily: FONT,
    lineHeight: 1,
    transition: 'background 0.2s',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(34, 34, 34, 0.95)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        aria-label="Cerrar galería"
        style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'none', border: 'none', color: COLORS.cream,
          fontSize: '32px', cursor: 'pointer', zIndex: 10, fontFamily: FONT, padding: '8px',
        }}
      >
        &times;
      </button>

      {photos.length > 1 && (
        <button
          onClick={goPrev}
          aria-label="Foto anterior"
          style={{ ...arrowStyle, left: '8px' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(210, 43, 43, 0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(250, 243, 225, 0.15)'}
        >
          &#8249;
        </button>
      )}

      <img
        src={`${ARCHIVES_BASE}/${photo.filepath}`}
        alt={photo.caption || photo.filename}
        style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
      />

      {photos.length > 1 && (
        <button
          onClick={goNext}
          aria-label="Foto siguiente"
          style={{ ...arrowStyle, right: '8px' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(210, 43, 43, 0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(250, 243, 225, 0.15)'}
        >
          &#8250;
        </button>
      )}

      <div style={{
        position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
        color: COLORS.cream, fontFamily: FONT, fontSize: '14px', opacity: 0.7,
      }}>
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  );
};

export default PhotoGallery;
