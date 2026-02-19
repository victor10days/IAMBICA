import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import ArtistCard from '../components/ArtistCard';
import PhotoGrid from '../components/PhotoGrid';
import PhotoGallery from '../components/PhotoGallery';
import { useApi } from '../hooks/useApi';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT, ARCHIVES_BASE, API_BASE } from '../styles/theme';

const History = () => {
  const { isMobile } = useMobile();

  const { data: timeline, loading: timelineLoading } = useApi('/timeline');
  const { data: artists, loading: artistsLoading } = useApi('/artists');

  // Detail views
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [eventDetail, setEventDetail] = useState(null);
  const [artistDetail, setArtistDetail] = useState(null);

  // Photo gallery
  const [galleryPhotos, setGalleryPhotos] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Fetch event detail when selected
  useEffect(() => {
    if (!selectedEvent) { setEventDetail(null); return; }
    fetch(`${API_BASE}/events/${selectedEvent.slug}`)
      .then(r => r.json())
      .then(setEventDetail)
      .catch(() => setEventDetail(null));
  }, [selectedEvent]);

  // Fetch artist detail when selected
  useEffect(() => {
    if (!selectedArtist) { setArtistDetail(null); return; }
    fetch(`${API_BASE}/artists/${selectedArtist.slug}`)
      .then(r => r.json())
      .then(setArtistDetail)
      .catch(() => setArtistDetail(null));
  }, [selectedArtist]);

  const handleEventClick = (event) => {
    setSelectedArtist(null);
    setSelectedEvent(event);
    setTimeout(() => {
      document.getElementById('detail-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleArtistClick = (artist) => {
    setSelectedEvent(null);
    setSelectedArtist(artist);
    setTimeout(() => {
      document.getElementById('detail-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const openGallery = useCallback((photos, index) => {
    setGalleryPhotos(photos);
    setGalleryIndex(index);
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryPhotos(null);
  }, []);

  return (
    <div style={{
      fontFamily: FONT,
      minHeight: '100vh',
      width: '100%',
      backgroundColor: COLORS.cream,
    }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        minHeight: isMobile ? '50vh' : '60vh',
        backgroundColor: COLORS.dark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '80px 20px 40px' : '100px 40px 60px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: isMobile ? '32px' : '56px',
          color: COLORS.cream,
          margin: '0 0 16px 0',
          letterSpacing: '2px',
          fontFamily: FONT,
        }}>
          ARCHIVO <span style={{ color: COLORS.red }}>2001-2003</span>
        </h1>
        <p style={{
          fontSize: isMobile ? '14px' : '20px',
          color: COLORS.tan,
          maxWidth: '700px',
          lineHeight: '1.7',
          margin: 0,
          fontFamily: FONT,
        }}>
          Un registro vivo del Festival Iámbica — documentando los orígenes del movimiento
          de arte experimental, música electrónica y medios digitales de Puerto Rico.
        </p>
      </section>

      {/* Timeline Section */}
      <section style={{
        padding: isMobile ? '40px 16px' : '80px 40px',
        backgroundColor: COLORS.cream,
      }}>
        <h2 style={{
          fontSize: isMobile ? '28px' : '42px',
          color: COLORS.dark,
          textAlign: 'center',
          marginBottom: isMobile ? '30px' : '50px',
          fontFamily: FONT,
        }}>
          Eventos
        </h2>

        {timelineLoading ? (
          <div style={{ textAlign: 'center', color: COLORS.textLight, padding: '40px', fontFamily: FONT }}>
            Cargando eventos...
          </div>
        ) : (
          <Timeline
            timeline={timeline}
            onEventClick={handleEventClick}
            isMobile={isMobile}
          />
        )}
      </section>

      {/* Artists Section */}
      <section style={{
        padding: isMobile ? '40px 16px' : '80px 40px',
        backgroundColor: COLORS.tan,
      }}>
        <h2 style={{
          fontSize: isMobile ? '28px' : '42px',
          color: COLORS.dark,
          textAlign: 'center',
          marginBottom: isMobile ? '30px' : '50px',
          fontFamily: FONT,
        }}>
          Artistas
        </h2>

        {artistsLoading ? (
          <div style={{ textAlign: 'center', color: COLORS.textLight, padding: '40px', fontFamily: FONT }}>
            Cargando artistas...
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isMobile ? '8px' : '16px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}>
            {artists?.map((artist) => (
              <ArtistCard
                key={artist.slug}
                artist={artist}
                onClick={handleArtistClick}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </section>

      {/* Detail Section — shows when event or artist is selected */}
      {(selectedEvent || selectedArtist) && (
        <section
          id="detail-section"
          style={{
            padding: isMobile ? '40px 16px' : '80px 40px',
            backgroundColor: COLORS.cream,
            borderTop: `2px solid ${COLORS.dark}`,
          }}
        >
          {/* Close button */}
          <div style={{ textAlign: 'right', maxWidth: '1000px', margin: '0 auto 20px' }}>
            <button
              onClick={() => { setSelectedEvent(null); setSelectedArtist(null); }}
              style={{
                background: 'none',
                border: `1px solid ${COLORS.dark}`,
                color: COLORS.dark,
                padding: '6px 16px',
                cursor: 'pointer',
                fontFamily: FONT,
                fontSize: '14px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = COLORS.red; e.currentTarget.style.color = COLORS.cream; e.currentTarget.style.borderColor = COLORS.red; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = COLORS.dark; e.currentTarget.style.borderColor = COLORS.dark; }}
            >
              Cerrar
            </button>
          </div>

          {/* Event Detail */}
          {eventDetail && selectedEvent && (
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                gap: isMobile ? '20px' : '40px',
                flexDirection: isMobile ? 'column' : 'row',
                marginBottom: '40px',
              }}>
                {eventDetail.event.poster_image && (
                  <div style={{ flexShrink: 0 }}>
                    <img
                      src={`${ARCHIVES_BASE}/${eventDetail.event.poster_image}`}
                      alt={eventDetail.event.name}
                      style={{
                        width: isMobile ? '100%' : '300px',
                        maxHeight: '400px',
                        objectFit: 'cover',
                        display: 'block',
                        border: `1px solid ${COLORS.dark}`,
                      }}
                    />
                  </div>
                )}
                <div>
                  <h3 style={{
                    fontSize: isMobile ? '24px' : '36px',
                    margin: '0 0 8px 0',
                    color: COLORS.dark,
                    fontFamily: FONT,
                  }}>
                    {eventDetail.event.name}
                  </h3>
                  <div style={{
                    fontSize: isMobile ? '14px' : '16px',
                    color: COLORS.red,
                    marginBottom: '16px',
                    fontFamily: FONT,
                  }}>
                    {eventDetail.event.year}
                    {eventDetail.event.date_start ? ` — ${eventDetail.event.date_start}` : ''}
                    {eventDetail.event.location ? ` — ${eventDetail.event.location}` : ''}
                  </div>
                  {eventDetail.event.description && (
                    <p style={{
                      fontSize: isMobile ? '14px' : '16px',
                      lineHeight: '1.7',
                      color: COLORS.text,
                      margin: '0 0 20px 0',
                      fontFamily: FONT,
                    }}>
                      {eventDetail.event.description}
                    </p>
                  )}
                  {eventDetail.artists.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '16px', color: COLORS.dark, margin: '0 0 8px 0', fontFamily: FONT }}>Artistas</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {eventDetail.artists.map(a => (
                          <span
                            key={a.slug}
                            onClick={() => handleArtistClick(a)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleArtistClick(a)}
                            style={{
                              padding: '4px 12px',
                              backgroundColor: COLORS.dark,
                              color: COLORS.cream,
                              fontSize: '13px',
                              fontFamily: FONT,
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.red}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.dark}
                          >
                            {a.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Event photos */}
              {eventDetail.media.length > 0 && (
                <div>
                  <h4 style={{
                    fontSize: isMobile ? '18px' : '20px',
                    color: COLORS.dark,
                    marginBottom: '16px',
                    fontFamily: FONT,
                  }}>
                    Fotos ({eventDetail.media.length})
                  </h4>
                  <PhotoGrid
                    photos={eventDetail.media}
                    onPhotoClick={(idx) => openGallery(eventDetail.media, idx)}
                    isMobile={isMobile}
                  />
                </div>
              )}
            </div>
          )}

          {/* Artist Detail */}
          {artistDetail && selectedArtist && (
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                gap: isMobile ? '20px' : '40px',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'center' : 'flex-start',
                marginBottom: '40px',
              }}>
                {artistDetail.artist.profile_image && (
                  <div style={{
                    width: isMobile ? '150px' : '200px',
                    height: isMobile ? '150px' : '200px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `2px solid ${COLORS.dark}`,
                    flexShrink: 0,
                  }}>
                    <img
                      src={`${ARCHIVES_BASE}/${artistDetail.artist.profile_image}`}
                      alt={artistDetail.artist.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                )}
                <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                  <h3 style={{
                    fontSize: isMobile ? '24px' : '36px',
                    margin: '0 0 8px 0',
                    color: COLORS.dark,
                    fontFamily: FONT,
                  }}>
                    {artistDetail.artist.name}
                  </h3>
                  <span style={{
                    fontSize: '13px',
                    color: COLORS.cream,
                    backgroundColor: artistDetail.artist.type === 'visual' ? COLORS.dark : COLORS.red,
                    padding: '3px 10px',
                    fontFamily: FONT,
                    display: 'inline-block',
                    marginBottom: '16px',
                  }}>
                    {artistDetail.artist.type === 'visual' ? 'Arte Visual' : 'Música'}
                  </span>
                  {artistDetail.artist.bio && (
                    <p style={{
                      fontSize: isMobile ? '14px' : '16px',
                      lineHeight: '1.7',
                      color: COLORS.text,
                      margin: '0 0 20px 0',
                      fontFamily: FONT,
                    }}>
                      {artistDetail.artist.bio}
                    </p>
                  )}
                  {artistDetail.events.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '16px', color: COLORS.dark, margin: '0 0 8px 0', fontFamily: FONT }}>Eventos</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                        {artistDetail.events.map(ev => (
                          <span
                            key={ev.slug}
                            onClick={() => handleEventClick(ev)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleEventClick(ev)}
                            style={{
                              padding: '4px 12px',
                              backgroundColor: COLORS.dark,
                              color: COLORS.cream,
                              fontSize: '13px',
                              fontFamily: FONT,
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.red}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.dark}
                          >
                            {ev.name} ({ev.year})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Artist photos */}
              {artistDetail.media.length > 0 && (
                <div>
                  <h4 style={{
                    fontSize: isMobile ? '18px' : '20px',
                    color: COLORS.dark,
                    marginBottom: '16px',
                    fontFamily: FONT,
                  }}>
                    Fotos ({artistDetail.media.length})
                  </h4>
                  <PhotoGrid
                    photos={artistDetail.media}
                    onPhotoClick={(idx) => openGallery(artistDetail.media, idx)}
                    isMobile={isMobile}
                  />
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer style={{
        backgroundColor: COLORS.dark,
        color: COLORS.cream,
        padding: '40px 20px',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: FONT,
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          © 2026 Festival Iámbica. Puerto Rico.
        </p>
      </footer>

      {/* Photo Gallery Overlay */}
      {galleryPhotos && (
        <PhotoGallery
          photos={galleryPhotos}
          initialIndex={galleryIndex}
          onClose={closeGallery}
        />
      )}
    </div>
  );
};

export default History;
