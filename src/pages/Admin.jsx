import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { COLORS, FONT, API_BASE } from '../styles/theme';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [artists, setArtists] = useState([]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('events');

  // Form states
  const [eventForm, setEventForm] = useState({
    slug: '', name: '', series: '', edition: '', year: '', location: '', description: '', date_start: '',
  });
  const [artistForm, setArtistForm] = useState({
    slug: '', name: '', type: 'music', bio: '',
  });
  const [uploadForm, setUploadForm] = useState({
    event_id: '', artist_id: '', media_type: 'photo', subdir: 'uploads', caption: '',
  });
  const [uploadFile, setUploadFile] = useState(null);

  const fetchData = () => {
    fetch(`${API_BASE}/events`).then(r => r.json()).then(setEvents).catch(() => {});
    fetch(`${API_BASE}/artists`).then(r => r.json()).then(setArtists).catch(() => {});
  };

  useEffect(fetchData, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const body = { ...eventForm };
    if (body.edition) body.edition = Number(body.edition);
    if (body.year) body.year = Number(body.year);
    Object.keys(body).forEach(k => { if (!body[k]) delete body[k]; });

    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    if (res.ok) {
      showMessage('Evento creado');
      setEventForm({ slug: '', name: '', series: '', edition: '', year: '', location: '', description: '', date_start: '' });
      fetchData();
    } else {
      const err = await res.json();
      showMessage(`Error: ${err.error}`);
    }
  };

  const handleCreateArtist = async (e) => {
    e.preventDefault();
    const body = { ...artistForm };
    Object.keys(body).forEach(k => { if (!body[k]) delete body[k]; });

    const res = await fetch(`${API_BASE}/artists`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    if (res.ok) {
      showMessage('Artista creado');
      setArtistForm({ slug: '', name: '', type: 'music', bio: '' });
      fetchData();
    } else {
      const err = await res.json();
      showMessage(`Error: ${err.error}`);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return showMessage('Selecciona un archivo');

    const formData = new FormData();
    formData.append('image', uploadFile);
    Object.entries(uploadForm).forEach(([k, v]) => { if (v) formData.append(k, v); });

    const res = await fetch(`${API_BASE}/media/upload`, { method: 'POST', body: formData });
    if (res.ok) {
      showMessage('Multimedia subida');
      setUploadFile(null);
    } else {
      const err = await res.json();
      showMessage(`Error: ${err.error}`);
    }
  };

  const handleDeleteEvent = async (slug) => {
    if (!confirm(`¿Eliminar evento "${slug}"?`)) return;
    const res = await fetch(`${API_BASE}/events/${slug}`, { method: 'DELETE' });
    if (res.ok) { showMessage('Evento eliminado'); fetchData(); }
  };

  const handleDeleteArtist = async (slug) => {
    if (!confirm(`¿Eliminar artista "${slug}"?`)) return;
    const res = await fetch(`${API_BASE}/artists/${slug}`, { method: 'DELETE' });
    if (res.ok) { showMessage('Artista eliminado'); fetchData(); }
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    fontFamily: FONT,
    border: `1px solid ${COLORS.dark}`,
    backgroundColor: COLORS.cream,
    boxSizing: 'border-box',
    marginBottom: '12px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    color: COLORS.dark,
    marginBottom: '4px',
    fontFamily: FONT,
  };

  const buttonStyle = {
    padding: '10px 24px',
    fontSize: '14px',
    fontFamily: FONT,
    backgroundColor: COLORS.red,
    color: COLORS.cream,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const tabStyle = (active) => ({
    padding: '10px 20px',
    fontSize: '14px',
    fontFamily: FONT,
    backgroundColor: active ? COLORS.dark : 'transparent',
    color: active ? COLORS.cream : COLORS.dark,
    border: `1px solid ${COLORS.dark}`,
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ fontFamily: FONT, minHeight: '100vh', backgroundColor: COLORS.cream }}>
      <Header />

      <div style={{ padding: '80px 20px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', color: COLORS.dark, marginBottom: '8px', fontFamily: FONT }}>Administración</h1>
        <p style={{ color: COLORS.textLight, fontSize: '14px', marginBottom: '24px', fontFamily: FONT }}>Administrar eventos, artistas y archivos multimedia.</p>

        {message && (
          <div style={{
            padding: '10px 16px',
            backgroundColor: message.startsWith('Error') ? COLORS.red : COLORS.dark,
            color: COLORS.cream,
            marginBottom: '20px',
            fontSize: '14px',
            fontFamily: FONT,
          }}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '30px' }}>
          <button style={tabStyle(activeTab === 'events')} onClick={() => setActiveTab('events')}>Eventos</button>
          <button style={tabStyle(activeTab === 'artists')} onClick={() => setActiveTab('artists')}>Artistas</button>
          <button style={tabStyle(activeTab === 'upload')} onClick={() => setActiveTab('upload')}>Subir Multimedia</button>
        </div>

        {/* Event Form */}
        {activeTab === 'events' && (
          <div>
            <h2 style={{ fontSize: '20px', color: COLORS.dark, marginBottom: '16px', fontFamily: FONT }}>Crear Evento</h2>
            <form onSubmit={handleCreateEvent}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Nombre *</label>
                  <input style={inputStyle} value={eventForm.name} onChange={e => setEventForm(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div>
                  <label style={labelStyle}>Slug *</label>
                  <input style={inputStyle} value={eventForm.slug} onChange={e => setEventForm(f => ({ ...f, slug: e.target.value }))} placeholder="ej. iambica-3" required />
                </div>
                <div>
                  <label style={labelStyle}>Año *</label>
                  <input style={inputStyle} type="number" value={eventForm.year} onChange={e => setEventForm(f => ({ ...f, year: e.target.value }))} required />
                </div>
                <div>
                  <label style={labelStyle}>Fecha</label>
                  <input style={inputStyle} type="date" value={eventForm.date_start} onChange={e => setEventForm(f => ({ ...f, date_start: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Serie</label>
                  <input style={inputStyle} value={eventForm.series} onChange={e => setEventForm(f => ({ ...f, series: e.target.value }))} placeholder="ej. iambica, modula" />
                </div>
                <div>
                  <label style={labelStyle}>Edición</label>
                  <input style={inputStyle} type="number" value={eventForm.edition} onChange={e => setEventForm(f => ({ ...f, edition: e.target.value }))} />
                </div>
              </div>
              <label style={labelStyle}>Ubicación</label>
              <input style={inputStyle} value={eventForm.location} onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))} />
              <label style={labelStyle}>Descripción</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={eventForm.description} onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))} />
              <button type="submit" style={buttonStyle}>Crear Evento</button>
            </form>

            <h3 style={{ fontSize: '18px', color: COLORS.dark, margin: '40px 0 16px', fontFamily: FONT }}>Eventos Existentes ({events.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {events.map(ev => (
                <div key={ev.slug} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', border: `1px solid ${COLORS.dark}`, backgroundColor: COLORS.tan,
                }}>
                  <div>
                    <strong>{ev.name}</strong>
                    <span style={{ color: COLORS.textLight, marginLeft: '8px', fontSize: '13px' }}>{ev.year}{ev.series ? ` (${ev.series})` : ''}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(ev.slug)}
                    style={{ ...buttonStyle, padding: '4px 12px', fontSize: '12px' }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Artist Form */}
        {activeTab === 'artists' && (
          <div>
            <h2 style={{ fontSize: '20px', color: COLORS.dark, marginBottom: '16px', fontFamily: FONT }}>Crear Artista</h2>
            <form onSubmit={handleCreateArtist}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Nombre *</label>
                  <input style={inputStyle} value={artistForm.name} onChange={e => setArtistForm(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div>
                  <label style={labelStyle}>Slug *</label>
                  <input style={inputStyle} value={artistForm.slug} onChange={e => setArtistForm(f => ({ ...f, slug: e.target.value }))} placeholder="ej. nombre-artista" required />
                </div>
              </div>
              <label style={labelStyle}>Tipo</label>
              <select style={inputStyle} value={artistForm.type} onChange={e => setArtistForm(f => ({ ...f, type: e.target.value }))}>
                <option value="music">Música</option>
                <option value="visual">Arte Visual</option>
              </select>
              <label style={labelStyle}>Biografía</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={artistForm.bio} onChange={e => setArtistForm(f => ({ ...f, bio: e.target.value }))} />
              <button type="submit" style={buttonStyle}>Crear Artista</button>
            </form>

            <h3 style={{ fontSize: '18px', color: COLORS.dark, margin: '40px 0 16px', fontFamily: FONT }}>Artistas Existentes ({artists.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {artists.map(ar => (
                <div key={ar.slug} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', border: `1px solid ${COLORS.dark}`, backgroundColor: COLORS.tan,
                }}>
                  <div>
                    <strong>{ar.name}</strong>
                    <span style={{ color: COLORS.textLight, marginLeft: '8px', fontSize: '13px' }}>{ar.type}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteArtist(ar.slug)}
                    style={{ ...buttonStyle, padding: '4px 12px', fontSize: '12px' }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Form */}
        {activeTab === 'upload' && (
          <div>
            <h2 style={{ fontSize: '20px', color: COLORS.dark, marginBottom: '16px', fontFamily: FONT }}>Subir Multimedia</h2>
            <form onSubmit={handleUpload}>
              <label style={labelStyle}>Archivo de Imagen *</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={e => setUploadFile(e.target.files[0])}
                style={{ ...inputStyle, padding: '8px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Evento</label>
                  <select style={inputStyle} value={uploadForm.event_id} onChange={e => setUploadForm(f => ({ ...f, event_id: e.target.value }))}>
                    <option value="">Ninguno</option>
                    {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name} ({ev.year})</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Artista</label>
                  <select style={inputStyle} value={uploadForm.artist_id} onChange={e => setUploadForm(f => ({ ...f, artist_id: e.target.value }))}>
                    <option value="">Ninguno</option>
                    {artists.map(ar => <option key={ar.id} value={ar.id}>{ar.name}</option>)}
                  </select>
                </div>
              </div>
              <label style={labelStyle}>Tipo de Multimedia</label>
              <select style={inputStyle} value={uploadForm.media_type} onChange={e => setUploadForm(f => ({ ...f, media_type: e.target.value }))}>
                <option value="photo">Foto</option>
                <option value="promo">Promo</option>
                <option value="poster">Póster</option>
                <option value="portrait">Retrato</option>
              </select>
              <label style={labelStyle}>Subdirectorio</label>
              <input style={inputStyle} value={uploadForm.subdir} onChange={e => setUploadForm(f => ({ ...f, subdir: e.target.value }))} placeholder="ej. uploads, photos/nuevo-evento" />
              <label style={labelStyle}>Leyenda</label>
              <input style={inputStyle} value={uploadForm.caption} onChange={e => setUploadForm(f => ({ ...f, caption: e.target.value }))} />
              <button type="submit" style={buttonStyle}>Subir</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
