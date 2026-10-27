import { useState, useEffect } from 'react';
import {
  getStoredTestimonials,
  addStoredTestimonial,
  deleteStoredTestimonial,
  checkAdminSession,
} from '../data/storage';
import { ArrowLeft, Star, Send, CheckCircle2, Trash2, MessageSquarePlus } from 'lucide-react';

export default function TestimonialsPage({ onBackToHome }) {
  const [testimonials, setTestimonials] = useState(getStoredTestimonials());
  const [isAdmin, setIsAdmin] = useState(checkAdminSession());
  const [activeFilter, setActiveFilter] = useState('all');

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('Website Development');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const handleUpdate = () => {
      setTestimonials(getStoredTestimonials());
      setIsAdmin(checkAdminSession());
    };
    window.addEventListener('lichtcraft_testimonials_changed', handleUpdate);
    window.addEventListener('lichtcraft_auth_changed', handleUpdate);
    return () => {
      window.removeEventListener('lichtcraft_testimonials_changed', handleUpdate);
      window.removeEventListener('lichtcraft_auth_changed', handleUpdate);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const newTestimonial = {
      id: `testi-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Partner',
      company: company.trim() || 'Independen',
      projectType,
      year: new Date().getFullYear().toString(),
      content: content.trim(),
      rating: Number(rating),
      verified: true,
      date: new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date()),
    };

    addStoredTestimonial(newTestimonial);
    setSubmitted(true);
    setName('');
    setRole('');
    setCompany('');
    setContent('');
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2800);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus testimoni ini secara permanen?')) {
      deleteStoredTestimonial(id);
    }
  };

  const filtered =
    activeFilter === 'all'
      ? testimonials
      : testimonials.filter((t) => t.projectType === activeFilter);

  return (
    <div className="testi-page-wrapper">
      <div className="container">
        {/* Navigation Bar */}
        <div className="testi-top-bar">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onBackToHome}>
            <ArrowLeft size={14} />
            <span>Kembali ke Beranda</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setShowForm(!showForm)}
          >
            <MessageSquarePlus size={14} />
            <span>{showForm ? 'Tutup Formulir' : 'Tulis Testimoni Baru'}</span>
          </button>
        </div>

        {/* Editorial Header */}
        <header className="testi-header">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            ARSIP SUARA KLIEN & PARTNER
          </span>
          <h1 className="heading-1 testi-main-title">
            Testimoni & Evaluasi <br />
            Kualitas Kolaborasi.
          </h1>
          <p className="body-large testi-lead">
            Kami membangun reputasi studio melalui transparansi penuh. Setiap testimoni di bawah ditulis langsung oleh
            partner dan klien yang telah berkolaborasi dalam produksi produk digital bersama LichtCraft.
          </p>
        </header>

        {/* Submission Form Modal / Drawer */}
        {showForm && (
          <div className="testi-form-card surface-raised">
            <div className="form-card-header">
              <h2 className="heading-2">Tulis Testimoni Anda</h2>
              <p className="body-small">
                Bagikan pengalaman kerja, ketepatan jadwal, dan performa produk digital yang dibangun bersama LichtCraft.
              </p>
            </div>

            {submitted ? (
              <div className="testi-success-banner">
                <CheckCircle2 size={36} className="text-white" />
                <h3 className="heading-3">Terima Kasih Atas Ulasan Anda!</h3>
                <p className="body-small">
                  Testimoni Anda telah tersimpan dan langsung ditampilkan di halaman publik studio.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="testi-submit-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="client-name">
                      Nama Lengkap *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Budi Santoso"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="client-role">
                      Jabatan / Role
                    </label>
                    <input
                      id="client-role"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Founder / Engineering Lead"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="client-company">
                      Perusahaan / Brand / Organisasi
                    </label>
                    <input
                      id="client-company"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Lumina Tech"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="project-type-select">
                      Tipe Proyek
                    </label>
                    <select
                      id="project-type-select"
                      className="form-select"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile Application">Mobile Application</option>
                      <option value="Solusi Custom">Solusi Custom / Arsitektur Khusus</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tingkat Kepuasan Hasil</label>
                  <div className="star-rating-select">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        className={`star-select-btn ${rating >= starVal ? 'is-active' : ''}`}
                        onClick={() => setRating(starVal)}
                        aria-label={`Rating ${starVal} bintang`}
                      >
                        <Star size={18} fill={rating >= starVal ? '#ffffff' : 'none'} />
                      </button>
                    ))}
                    <span className="rating-label-text">{rating} dari 5 Bintang</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="testi-content">
                    Isi Evaluasi & Testimoni *
                  </label>
                  <textarea
                    id="testi-content"
                    rows={4}
                    className="form-textarea"
                    placeholder="Ceritakan bagaimana proses kerja, komunikasi, dan performa produk digital yang telah dirilis..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <span>Publikasikan Testimoni</span>
                    <Send size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setShowForm(false)}
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Filter Bar */}
        <div className="testi-filter-bar">
          <span className="filter-title">Filter Berdasarkan Layanan:</span>
          <div className="filter-pills">
            {['all', 'Website Development', 'Web Application', 'Mobile Application'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${activeFilter === cat ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'all' ? 'Semua Ulasan' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Editorial Grid */}
        <div className="testimonials-grid">
          {filtered.map((item) => (
            <article key={item.id} className="testi-card surface-card">
              <div className="testi-card-top">
                <div className="rating-stars" aria-label={`${item.rating} dari 5 bintang`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < item.rating ? 'star-filled' : 'star-empty'}
                      fill={i < item.rating ? '#ffffff' : 'none'}
                    />
                  ))}
                </div>

                <span className="testi-date">{item.date}</span>
              </div>

              <blockquote className="testi-quote">
                "{item.content}"
              </blockquote>

              <div className="testi-author-footer">
                <div>
                  <strong className="author-name">{item.name}</strong>
                  <div className="author-meta">
                    <span>{item.role}</span>
                    {item.company && <span> • {item.company}</span>}
                  </div>
                </div>

                <div className="testi-badges">
                  <span className="tag">{item.projectType}</span>
                  {isAdmin && (
                    <button
                      type="button"
                      className="testi-del-btn"
                      onClick={() => handleDelete(item.id)}
                      title="Hapus testimoni (Admin)"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .testi-page-wrapper {
          min-height: 100vh;
          padding-top: 5rem;
          padding-bottom: 7rem;
          background-color: var(--color-ink);
        }

        .testi-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .testi-header {
          max-width: 860px;
          margin-bottom: 3.5rem;
        }

        .testi-main-title {
          margin-top: 1rem;
          margin-bottom: 1.25rem;
        }

        .testi-lead {
          color: var(--color-gray-400);
        }

        .testi-form-card {
          padding: 2.75rem;
          margin-bottom: 4rem;
          background-color: var(--color-elevated);
          border: 1px solid var(--color-border-strong);
        }

        @media (max-width: 640px) {
          .testi-form-card {
            padding: 1.5rem;
          }
        }

        .form-card-header {
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--color-border);
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 1.25rem;
        }

        @media (max-width: 640px) {
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }

        .testi-submit-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .star-rating-select {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.35rem;
        }

        .star-select-btn {
          background: transparent;
          border: none;
          color: var(--color-gray-500);
          cursor: pointer;
          padding: 4px;
          display: inline-flex;
          align-items: center;
          transition: color var(--duration-fast);
        }

        .star-select-btn.is-active {
          color: var(--color-white);
        }

        .rating-label-text {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-400);
          margin-left: 0.5rem;
        }

        .form-submit-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        .testi-success-banner {
          text-align: center;
          padding: 2.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .testi-filter-bar {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .filter-title {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-500);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }

        .testi-card {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 640px) {
          .testi-card {
            padding: 1.35rem 1.15rem;
            border-radius: var(--radius-sm);
          }
          .testi-quote {
            font-size: 0.9375rem;
            margin-bottom: 1.25rem;
          }
          .testi-top-bar {
            margin-bottom: 2rem;
          }
          .testi-header {
            margin-bottom: 2rem;
          }
        }

        .testi-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .rating-stars {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .star-filled {
          color: var(--color-white);
        }

        .star-empty {
          color: var(--color-gray-700);
        }

        .testi-date {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-500);
        }

        .testi-quote {
          font-size: 1.0625rem;
          line-height: 1.65;
          color: var(--color-white);
          margin-bottom: 2rem;
          font-style: normal;
        }

        .testi-author-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--color-border-subtle);
          gap: 1rem;
        }

        .author-name {
          display: block;
          font-family: var(--font-display);
          font-size: 0.9375rem;
          color: var(--color-white);
          margin-bottom: 0.15rem;
        }

        .author-meta {
          font-size: 0.8125rem;
          color: var(--color-gray-400);
        }

        .testi-badges {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .testi-del-btn {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-xs);
          background: rgba(255, 60, 60, 0.1);
          border: 1px solid rgba(255, 60, 60, 0.3);
          color: #ff6b6b;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .testi-del-btn:hover {
          background: rgba(255, 60, 60, 0.25);
        }
      `}</style>
    </div>
  );
}
