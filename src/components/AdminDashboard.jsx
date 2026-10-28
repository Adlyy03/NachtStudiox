import { useState, useEffect } from 'react';
import {
  getStoredProjects,
  saveStoredProjects,
  resetStoredProjects,
  checkAdminSession,
  setAdminSession,
  getStoredTestimonials,
  deleteStoredTestimonial,
} from '../data/storage';
import {
  Lock,
  Unlock,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  ArrowLeft,
  Check,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  Globe,
  Image as ImageIcon,
} from 'lucide-react';

// Authentic GitHub vector icon
function GithubIcon({ size = 12, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const ADMIN_DEFAULT_PASS = 'natch2024';
const DEFAULT_YEAR = new Date().getFullYear().toString();

export default function AdminDashboard({ onBackToHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAdminSession());
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Data state
  const [projects, setProjects] = useState(getStoredProjects());
  const [testimonials, setTestimonials] = useState(getStoredTestimonials());
  const [activeTab, setActiveTab] = useState('projects');

  // Page View state: 'list' | 'create' | 'edit'
  const [currentView, setCurrentView] = useState('list');
  const [editingProjectId, setEditingProjectId] = useState(null);

  // In-app Delete Confirmation Pop-up state (NO native alert/confirm)
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, title, type: 'project' | 'testi' }

  // Form Fields
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState('Website Development');
  const [formCategoryKey, setFormCategoryKey] = useState('website');
  const [formYear, setFormYear] = useState(DEFAULT_YEAR);
  const [formBadge, setFormBadge] = useState('Studio Production Project');
  const [formImage, setFormImage] = useState('');
  const [formLiveUrl, setFormLiveUrl] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formChallenge, setFormChallenge] = useState('');
  const [formSolution, setFormSolution] = useState('');
  const [formStack, setFormStack] = useState('React, TypeScript, GSAP');
  const [formDeliverables, setFormDeliverables] = useState('Bespoke Layout, Lighthouse 99+, Schema SEO');
  const [formHighlights, setFormHighlights] = useState('Sub-detik render, Zero layout shift');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const refreshData = () => {
      setProjects(getStoredProjects());
      setTestimonials(getStoredTestimonials());
      setIsAuthenticated(checkAdminSession());
    };
    window.addEventListener('natch_projects_changed', refreshData);
    window.addEventListener('natch_testimonials_changed', refreshData);
    window.addEventListener('natch_auth_changed', refreshData);
    return () => {
      window.removeEventListener('natch_projects_changed', refreshData);
      window.removeEventListener('natch_testimonials_changed', refreshData);
      window.removeEventListener('natch_auth_changed', refreshData);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_DEFAULT_PASS || passwordInput === 'admin') {
      setAdminSession(true);
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setAdminSession(false);
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Open Create Page
  const goToCreatePage = () => {
    setEditingProjectId(null);
    setFormId(`proj-${Date.now()}`);
    setFormTitle('');
    setFormSubtitle('');
    setFormCategory('Website Development');
    setFormCategoryKey('website');
    setFormYear(DEFAULT_YEAR);
    setFormBadge('Studio Production Project');
    setFormImage('');
    setFormLiveUrl('');
    setFormGithubUrl('');
    setFormSummary('');
    setFormChallenge('');
    setFormSolution('');
    setFormStack('React, TypeScript, GSAP');
    setFormDeliverables('Bespoke Layout, Lighthouse 99+, Schema SEO');
    setFormHighlights('Sub-detik render, Zero layout shift');
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Edit Page
  const goToEditPage = (proj) => {
    setEditingProjectId(proj.id);
    setFormId(proj.id);
    setFormTitle(proj.title);
    setFormSubtitle(proj.subtitle);
    setFormCategory(proj.category);
    setFormCategoryKey(proj.categoryKey || 'website');
    setFormYear(proj.year);
    setFormBadge(proj.badge);
    setFormImage(proj.image || '');
    setFormLiveUrl(proj.liveUrl || '');
    setFormGithubUrl(proj.githubUrl || '');
    setFormSummary(proj.summary);
    setFormChallenge(proj.challenge);
    setFormSolution(proj.solution);
    setFormStack(Array.isArray(proj.stack) ? proj.stack.join(', ') : proj.stack);
    setFormDeliverables(
      Array.isArray(proj.deliverables) ? proj.deliverables.join(', ') : proj.deliverables
    );
    setFormHighlights(
      Array.isArray(proj.highlights) ? proj.highlights.join(', ') : proj.highlights
    );
    setCurrentView('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const parsedStack = formStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const parsedDeliverables = formDeliverables
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);
    const parsedHighlights = formHighlights
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);

    const projectPayload = {
      id: formId || `proj-${Date.now()}`,
      title: formTitle.trim(),
      subtitle: formSubtitle.trim(),
      category: formCategory,
      categoryKey: formCategoryKey,
      year: formYear.trim(),
      badge: formBadge.trim(),
      image: formImage.trim() || undefined,
      liveUrl: formLiveUrl.trim() || undefined,
      githubUrl: formGithubUrl.trim() || undefined,
      summary: formSummary.trim(),
      challenge: formChallenge.trim(),
      solution: formSolution.trim(),
      stack: parsedStack.length ? parsedStack : ['React', 'TypeScript'],
      deliverables: parsedDeliverables.length ? parsedDeliverables : ['Arsitektur Kode Bersih'],
      highlights: parsedHighlights.length ? parsedHighlights : ['Performa Terverifikasi'],
    };

    let updated;
    if (currentView === 'edit' && editingProjectId) {
      updated = projects.map((p) => (p.id === editingProjectId ? projectPayload : p));
    } else {
      updated = [projectPayload, ...projects];
    }

    saveStoredProjects(updated);
    setProjects(updated);
    setCurrentView('list');
  };

  // Trigger custom delete pop-up
  const requestDeleteProject = (proj) => {
    setDeleteTarget({ id: proj.id, title: proj.title, type: 'project' });
  };

  const requestDeleteTestimonial = (testi) => {
    setDeleteTarget({ id: testi.id, title: `Testimoni dari ${testi.name}`, type: 'testi' });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'project') {
      const updated = projects.filter((p) => p.id !== deleteTarget.id);
      saveStoredProjects(updated);
      setProjects(updated);
    } else if (deleteTarget.type === 'testi') {
      deleteStoredTestimonial(deleteTarget.id);
    }

    setDeleteTarget(null);
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  const handleResetData = () => {
    setDeleteTarget({
      id: 'RESET_ALL',
      title: 'Reset Seluruh Portofolio ke Default Studio',
      type: 'reset',
    });
  };

  const confirmReset = () => {
    resetStoredProjects();
    setDeleteTarget(null);
  };

  // 1. LOGIN VIEW
  if (!isAuthenticated) {
    return (
      <div className="admin-page-wrapper">
        <div className="container" style={{ maxWidth: '440px' }}>
          <div className="admin-login-card surface-raised">
            <div className="login-top">
              <div className="login-icon-box">
                <Lock size={20} className="text-white" />
              </div>
              <h1 className="heading-2">Admin Natch Studio</h1>
              <p className="body-small text-muted">
                Autentikasi sesi untuk mengelola portofolio proyek dan testimoni klien.
              </p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="admin-pass">
                  Password Akses
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  className="form-input"
                  placeholder="Masukkan password admin..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus
                  required
                />
                <span className="pass-hint">
                  Default pass: <code>natch2024</code> atau <code>admin</code>
                </span>
              </div>

              {loginError && (
                <div className="login-error-alert">
                  Password tidak valid. Silakan coba kembali.
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <span>Buka Panel Manajemen</span>
                <Unlock size={15} />
              </button>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ marginTop: '0.5rem', width: '100%' }}
                onClick={onBackToHome}
              >
                ← Kembali ke Website
              </button>
            </form>
          </div>
        </div>

        <style>{`
          .admin-page-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
            background-color: var(--color-ink);
          }
          .admin-login-card {
            padding: 2.25rem 1.75rem;
            background-color: var(--color-charcoal);
            border: 1px solid var(--color-border-strong);
            box-shadow: var(--shadow-floating);
            border-radius: var(--radius-md);
          }
          .login-top {
            text-align: center;
            margin-bottom: 1.5rem;
          }
          .login-icon-box {
            width: 44px;
            height: 44px;
            border-radius: var(--radius-xs);
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--color-border);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .pass-hint {
            font-family: var(--font-mono);
            font-size: 0.625rem;
            color: var(--color-gray-500);
            margin-top: 0.35rem;
            display: block;
          }
          .pass-hint code {
            color: var(--color-white);
            background: rgba(255, 255, 255, 0.08);
            padding: 2px 5px;
            border-radius: 3px;
          }
          .login-error-alert {
            padding: 0.625rem;
            background: rgba(255, 60, 60, 0.1);
            border: 1px solid rgba(255, 60, 60, 0.3);
            border-radius: var(--radius-xs);
            color: #ff8585;
            font-size: 0.75rem;
          }
        `}</style>
      </div>
    );
  }

  // 2. CREATE OR EDIT DEDICATED FULL-PAGE VIEW
  if (currentView === 'create' || currentView === 'edit') {
    const isEditing = currentView === 'edit';
    return (
      <div className="admin-form-page-wrapper">
        <div className="container">
          <div className="form-page-top">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentView('list')}
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Daftar Proyek</span>
            </button>

            <span className="page-mode-badge">
              {isEditing ? 'MODE: EDIT PROYEK' : 'MODE: TAMBAH PROYEK BARU'}
            </span>
          </div>

          <div className="form-page-title-row">
            <div>
              <h1 className="heading-1">
                {isEditing ? `Edit Proyek: ${formTitle || 'Tanpa Judul'}` : 'Buat Proyek Portofolio Baru'}
              </h1>
              <p className="body-regular text-muted">
                {isEditing
                  ? 'Perbarui spesifikasi arsitektur, gambar preview, dan tautan live/github proyek.'
                  : 'Tambahkan cetak biru atau proyek produksi studio baru ke galeri portofolio publik.'}
              </p>
            </div>
          </div>

          {/* Form Page Grid: Editor on Left, Live Card Preview on Right */}
          <div className="editor-grid">
            <div className="editor-form-col">
              <form onSubmit={handleSaveProject} className="surface-raised dedicated-form-card">
                <div className="form-section-header">
                  <h2 className="heading-3">Parameter Dasar</h2>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="f-title">Nama Proyek *</label>
                    <input
                      id="f-title"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Nexa Engine"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="f-year">Tahun Rilis</label>
                    <input
                      id="f-year"
                      type="text"
                      className="form-input"
                      value={formYear}
                      onChange={(e) => setFormYear(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="f-subtitle">Subjudul / Karakter Arsitektur</label>
                  <input
                    id="f-subtitle"
                    type="text"
                    className="form-input"
                    placeholder="e.g. High-Throughput Telemetry Platform"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="f-category">Kategori Layanan</label>
                    <select
                      id="f-category"
                      className="form-select"
                      value={formCategory}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormCategory(val);
                        if (val === 'Website Development') setFormCategoryKey('website');
                        else if (val === 'Web Application') setFormCategoryKey('webapp');
                        else if (val === 'Mobile Application') setFormCategoryKey('mobile');
                        else setFormCategoryKey('custom');
                      }}
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile Application">Mobile Application</option>
                      <option value="Solusi Custom">Solusi Custom</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="f-badge">Badge Status</label>
                    <input
                      id="f-badge"
                      type="text"
                      className="form-input"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                    />
                  </div>
                </div>

                {/* Media & Tautan Luar (Opsional) */}
                <div className="form-section-header" style={{ marginTop: '1.75rem' }}>
                  <h2 className="heading-3">Media &amp; Tautan Luar (Opsional)</h2>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="f-image">
                    URL Gambar Preview Portofolio (Opsional)
                  </label>
                  <input
                    id="f-image"
                    type="text"
                    className="form-input"
                    placeholder="e.g. /projects/kroma-os.svg atau https://..."
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                  />
                  <span className="field-hint">
                    Bisa berupa path lokal (contoh: <code>/projects/kroma-os.svg</code>) atau link gambar web. Kosongkan jika ingin pakai wireframe otomatis.
                  </span>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="f-live">
                      URL Domain Live Preview / Website (Opsional)
                    </label>
                    <input
                      id="f-live"
                      type="url"
                      className="form-input"
                      placeholder="https://example.com"
                      value={formLiveUrl}
                      onChange={(e) => setFormLiveUrl(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="f-github">
                      URL Repositori GitHub (Opsional)
                    </label>
                    <input
                      id="f-github"
                      type="url"
                      className="form-input"
                      placeholder="https://github.com/natch-studio/repo"
                      value={formGithubUrl}
                      onChange={(e) => setFormGithubUrl(e.target.value)}
                    />
                  </div>
                </div>

                {/* Technical Description & Solutions */}
                <div className="form-section-header" style={{ marginTop: '1.75rem' }}>
                  <h2 className="heading-3">Uraian Teknis &amp; Solusi</h2>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="f-summary">Ringkasan Eksekutif (Summary)</label>
                  <textarea
                    id="f-summary"
                    rows={2}
                    className="form-textarea"
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    placeholder="Jelaskan peran sistem ini secara umum..."
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="f-challenge">Tantangan Rekayasa (Challenge)</label>
                    <textarea
                      id="f-challenge"
                      rows={3}
                      className="form-textarea"
                      value={formChallenge}
                      onChange={(e) => setFormChallenge(e.target.value)}
                      placeholder="Apa masalah spesifik yang harus diselesaikan?"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="f-solution">Solusi Arsitektur (Solution)</label>
                    <textarea
                      id="f-solution"
                      rows={3}
                      className="form-textarea"
                      value={formSolution}
                      onChange={(e) => setFormSolution(e.target.value)}
                      placeholder="Pendekatan teknis yang diambil studio..."
                    />
                  </div>
                </div>

                <div className="form-section-header" style={{ marginTop: '1.75rem' }}>
                  <h2 className="heading-3">Stack &amp; Metrik</h2>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="f-stack">Tech Stack (pisahkan koma)</label>
                  <input
                    id="f-stack"
                    type="text"
                    className="form-input"
                    value={formStack}
                    onChange={(e) => setFormStack(e.target.value)}
                    placeholder="React, TypeScript, GSAP, Node.js"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="f-deliverables">Deliverables Kunci (pisahkan koma)</label>
                  <input
                    id="f-deliverables"
                    type="text"
                    className="form-input"
                    value={formDeliverables}
                    onChange={(e) => setFormDeliverables(e.target.value)}
                    placeholder="Custom Product Inspector, Cart Slide Drawer, Keyboard Navigation"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="f-highlights">Metrik / Highlights (pisahkan koma)</label>
                  <input
                    id="f-highlights"
                    type="text"
                    className="form-input"
                    value={formHighlights}
                    onChange={(e) => setFormHighlights(e.target.value)}
                    placeholder="Lighthouse 99/100, Waktu peluncuran dingin < 1.2s"
                  />
                </div>

                <div className="dedicated-form-actions">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <Check size={16} />
                    <span>{isEditing ? 'Simpan & Publikasikan Perubahan' : 'Buat & Rilis Proyek'}</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={() => setCurrentView('list')}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Column */}
            <div className="editor-preview-col">
              <span className="preview-label">Live Preview Kartu Portofolio</span>
              <div className="work-card surface-card preview-card">
                <div className="work-visual-frame preview-frame">
                  {formImage ? (
                    <img
                      src={formImage}
                      alt="Preview"
                      className="work-preview-img"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="work-wireframe-art">
                      <div className="art-topbar">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                        <span className="art-route">/natch/spec/{formId || 'draft'}</span>
                      </div>
                      <div className="art-body">
                        <div className="art-grid-lines">
                          <div className="art-box box-1" />
                          <div className="art-box box-2" />
                          <div className="art-box box-3" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="visual-tags-bar">
                    <span className="visual-badge">{formBadge || 'Preview'}</span>
                    <span className="visual-year">{formYear || '2024'}</span>
                  </div>
                </div>

                <div className="work-card-body" style={{ padding: '1.25rem' }}>
                  <div className="work-card-header-row">
                    <span className="work-category-badge">{formCategory}</span>
                    <div className="card-top-action">
                      <span className="detail-hint">Preview</span>
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>

                  <h3 className="heading-3" style={{ fontSize: '1.15rem', marginBottom: '0.2rem', color: '#fff' }}>
                    {formTitle || 'Judul Proyek Preview'}
                  </h3>
                  <p className="work-item-sub" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    {formSubtitle || 'Karakter arsitektur dan spesifikasi subjudul sistem'}
                  </p>
                  <p className="body-small text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                    {formSummary || 'Ringkasan singkat proyek akan tampil di sini saat pengunjung menelusuri portofolio.'}
                  </p>

                  <div className="work-stack-list" style={{ marginBottom: '0.75rem' }}>
                    {formStack
                      .split(',')
                      .slice(0, 3)
                      .map((s, idx) => (
                        <span key={idx} className="tag tag-active" style={{ fontSize: '0.625rem' }}>
                          {s.trim() || 'Tech'}
                        </span>
                      ))}
                  </div>

                  {(formLiveUrl || formGithubUrl) && (
                    <div className="card-links-row" style={{ paddingTop: '0.6rem' }}>
                      {formLiveUrl && (
                        <span className="btn-card-link" style={{ fontSize: '0.6875rem', padding: '0.25rem 0.5rem' }}>
                          <Globe size={11} />
                          <span>Live Demo</span>
                        </span>
                      )}
                      {formGithubUrl && (
                        <span className="btn-card-link" style={{ fontSize: '0.6875rem', padding: '0.25rem 0.5rem' }}>
                          <GithubIcon size={11} />
                          <span>GitHub</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .admin-form-page-wrapper {
            min-height: 100vh;
            padding-top: 4.5rem;
            padding-bottom: 6rem;
            background-color: var(--color-ink);
          }
          .form-page-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .page-mode-badge {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            color: var(--color-white);
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid var(--color-border);
            padding: 0.35rem 0.75rem;
            border-radius: var(--radius-xs);
            letter-spacing: 0.08em;
          }
          .form-page-title-row {
            margin-bottom: 2.5rem;
          }
          .editor-grid {
            display: grid;
            grid-template-columns: 1.35fr 0.85fr;
            gap: 2.5rem;
            align-items: flex-start;
          }
          @media (max-width: 960px) {
            .editor-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }
          }
          .dedicated-form-card {
            padding: 2.25rem 2rem;
            background-color: var(--color-charcoal);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
          }
          @media (max-width: 640px) {
            .dedicated-form-card {
              padding: 1.5rem 1rem;
            }
          }
          .form-section-header {
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--color-border-subtle);
            margin-bottom: 1.25rem;
          }
          .form-row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          @media (max-width: 640px) {
            .form-row-2 {
              grid-template-columns: 1fr;
            }
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            margin-bottom: 1.15rem;
          }
          .form-label {
            font-family: var(--font-body);
            font-size: 0.8125rem;
            font-weight: 500;
            color: var(--color-white);
          }
          .form-input, .form-select, .form-textarea {
            width: 100%;
            background-color: #0d0d10;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-xs);
            padding: 0.65rem 0.85rem;
            color: var(--color-white);
            font-family: var(--font-body);
            font-size: 0.875rem;
            transition: border-color var(--duration-fast);
          }
          .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--color-white);
          }
          .field-hint {
            font-size: 0.6875rem;
            color: var(--color-gray-400);
            line-height: 1.4;
          }
          .field-hint code {
            color: var(--color-white);
            background: rgba(255, 255, 255, 0.08);
            padding: 1px 4px;
            border-radius: 3px;
          }
          .dedicated-form-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--color-border);
          }
          @media (max-width: 640px) {
            .dedicated-form-actions {
              flex-direction: column;
            }
          }
          .editor-preview-col {
            position: sticky;
            top: 5rem;
          }
          .preview-label {
            display: block;
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            color: var(--color-gray-400);
            letter-spacing: 0.06em;
            text-transform: uppercase;
            margin-bottom: 0.75rem;
          }
          .preview-card {
            background-color: var(--color-charcoal);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            overflow: hidden;
            box-shadow: var(--shadow-floating);
          }
          .preview-frame {
            aspect-ratio: 16 / 9.5;
            background: #0d0d10;
            border-bottom: 1px solid var(--color-border);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }

  // 3. MAIN DASHBOARD VIEW (LIST VIEW)
  return (
    <div className="admin-dashboard-wrapper">
      <div className="container">
        {/* Top Header Bar */}
        <div className="admin-header-bar">
          <div className="admin-brand-status">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onBackToHome}>
              <ArrowLeft size={14} />
              <span>Lihat Website</span>
            </button>
            <span className="admin-badge">
              <ShieldCheck size={14} />
              <span>SESI ADMIN AKTIF</span>
            </span>
          </div>

          <div className="admin-header-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
              <span>Kunci Sesi / Keluar</span>
            </button>
          </div>
        </div>

        {/* Admin Title */}
        <div className="admin-title-row">
          <div>
            <h1 className="heading-1">Pusat Kendali Portofolio &amp; Konten</h1>
            <p className="body-regular text-muted">
              Kelola entri portofolio yang ditampilkan di halaman depan dan moderasi testimoni partner.
            </p>
          </div>

          <div className="title-action-buttons">
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleResetData}>
              <RotateCcw size={14} />
              <span>Reset Data Default</span>
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={goToCreatePage}>
              <Plus size={16} />
              <span>Tambah Proyek Baru</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="admin-tab-nav">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'projects' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span>Daftar Proyek Portofolio ({projects.length})</span>
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'testimonials' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            <span>Moderasi Testimoni ({testimonials.length})</span>
          </button>
        </div>

        {/* Tab 1: Projects Management */}
        {activeTab === 'projects' && (
          <div className="projects-table-card surface-raised">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Judul &amp; Informasi</th>
                    <th>Kategori</th>
                    <th>Tahun</th>
                    <th>Status Badge</th>
                    <th>Tautan &amp; Media</th>
                    <th>Tech Stack</th>
                    <th style={{ textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((proj) => (
                    <tr key={proj.id}>
                      <td style={{ minWidth: '220px' }}>
                        <strong className="table-title">{proj.title}</strong>
                        <span className="table-sub">{proj.subtitle}</span>
                      </td>
                      <td>
                        <span className="tag">{proj.category}</span>
                      </td>
                      <td>
                        <span className="table-mono">{proj.year}</span>
                      </td>
                      <td>
                        <span className="table-badge">{proj.badge}</span>
                      </td>
                      <td>
                        <div className="table-links-group">
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-link-pill"
                              title={proj.liveUrl}
                            >
                              <Globe size={11} />
                              <span>Live</span>
                            </a>
                          )}
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-link-pill"
                              title={proj.githubUrl}
                            >
                              <GithubIcon size={11} />
                              <span>Repo</span>
                            </a>
                          )}
                          {proj.image && (
                            <span className="admin-link-pill image-pill" title={proj.image}>
                              <ImageIcon size={11} />
                              <span>Image</span>
                            </span>
                          )}
                          {!proj.liveUrl && !proj.githubUrl && !proj.image && (
                            <span className="text-muted" style={{ fontSize: '0.6875rem' }}>
                              -
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="table-chips">
                          {Array.isArray(proj.stack) &&
                            proj.stack.slice(0, 3).map((st) => (
                              <span key={st} className="tag tag-active" style={{ fontSize: '0.625rem' }}>
                                {st}
                              </span>
                            ))}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div className="action-buttons-cell">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => goToEditPage(proj)}
                            title="Edit data proyek di halaman penuh"
                          >
                            <Pencil size={13} />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            className="btn-delete-row"
                            onClick={() => requestDeleteProject(proj)}
                            title="Hapus proyek via pop-up konfirmasi"
                          >
                            <Trash2 size={13} />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Testimonials Moderation */}
        {activeTab === 'testimonials' && (
          <div className="projects-table-card surface-raised">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Klien / Penulis</th>
                    <th>Perusahaan</th>
                    <th>Layanan</th>
                    <th>Tanggal</th>
                    <th>Isi Testimoni</th>
                    <th style={{ textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testi) => (
                    <tr key={testi.id}>
                      <td>
                        <strong className="table-title">{testi.name}</strong>
                        <span className="table-sub">{testi.role}</span>
                      </td>
                      <td>{testi.company}</td>
                      <td>
                        <span className="tag">{testi.projectType}</span>
                      </td>
                      <td>
                        <span className="table-mono">{testi.date}</span>
                      </td>
                      <td>
                        <p className="table-testi-quote">&quot;{testi.quote}&quot;</p>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => requestDeleteTestimonial(testi)}
                          title="Hapus testimoni via pop-up konfirmasi"
                        >
                          <Trash2 size={13} />
                          <span>Hapus</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Custom Confirmation Dialog Modal */}
        {deleteTarget && (
          <div className="modal-backdrop" role="dialog" aria-modal="true">
            <div className="delete-confirm-card surface-raised">
              <div className="delete-icon-box">
                <AlertTriangle size={24} className="text-danger" />
              </div>

              <h2 className="heading-3 delete-confirm-title">Konfirmasi Penghapusan</h2>

              <p className="body-small text-muted" style={{ marginBottom: '1.25rem' }}>
                Apakah Anda yakin ingin menghapus <strong>&quot;{deleteTarget.title}&quot;</strong>?
                Tindakan ini akan menghapus entri dari penyimpanan lokal browser secara permanen.
              </p>

              <div className="delete-dialog-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={cancelDelete}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={deleteTarget.type === 'reset' ? confirmReset : confirmDelete}
                  autoFocus
                >
                  <Trash2 size={14} />
                  <span>{deleteTarget.type === 'reset' ? 'Ya, Reset Data' : 'Ya, Hapus Permanen'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .admin-dashboard-wrapper {
          min-height: 100vh;
          padding-top: 4.5rem;
          padding-bottom: 7rem;
          background-color: var(--color-ink);
        }

        .admin-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 2.5rem;
        }

        .admin-brand-status {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          color: var(--color-white);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--color-border);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-xs);
        }

        .admin-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 2rem;
        }

        @media (max-width: 860px) {
          .admin-title-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .title-action-buttons {
          display: flex;
          align-items: center;
          gap: 0.875rem;
        }

        @media (max-width: 640px) {
          .title-action-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            gap: 0.5rem;
          }
          .title-action-buttons button {
            width: 100%;
            justify-content: center;
            font-size: 0.75rem;
            padding: 0.5rem;
          }
          .admin-dashboard-wrapper {
            padding-top: 3.5rem;
            padding-bottom: 4rem;
          }
          .projects-table-card {
            padding: 0.75rem 0.5rem;
            border-radius: var(--radius-sm);
          }
        }

        .admin-tab-nav {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.75rem;
        }

        .admin-tab-btn {
          background: transparent;
          border: 1px solid transparent;
          color: var(--color-gray-400);
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-xs);
          cursor: pointer;
          transition: all var(--duration-fast);
        }

        .admin-tab-btn:hover {
          color: var(--color-white);
        }

        .admin-tab-btn.is-active {
          color: var(--color-black);
          background: var(--color-white);
          border-color: var(--color-white);
        }

        .projects-table-card {
          padding: 1.5rem;
          background-color: var(--color-charcoal);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }

        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.875rem;
        }

        .admin-table th {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-gray-500);
          padding: 0.875rem 1rem;
          border-bottom: 1px solid var(--color-border);
          white-space: nowrap;
        }

        .admin-table td {
          padding: 1.125rem 1rem;
          border-bottom: 1px solid var(--color-border-subtle);
          vertical-align: middle;
        }

        .table-title {
          display: block;
          font-family: var(--font-display);
          color: var(--color-white);
          font-size: 0.9375rem;
        }

        .table-sub {
          font-size: 0.75rem;
          color: var(--color-gray-400);
          display: block;
        }

        .table-mono {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--color-gray-400);
        }

        .table-badge {
          font-size: 0.75rem;
          color: var(--color-gray-400);
          white-space: nowrap;
        }

        .table-links-group {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .admin-link-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          padding: 0.2rem 0.45rem;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--color-border);
          color: var(--color-gray-300);
          text-decoration: none;
          transition: all var(--duration-fast);
        }

        .admin-link-pill:hover {
          color: var(--color-white);
          background: rgba(255, 255, 255, 0.15);
        }

        .image-pill {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
          color: var(--color-gray-400);
        }

        .table-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .action-buttons-cell {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-delete-row {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: transparent;
          border: 1px solid rgba(255, 80, 80, 0.2);
          color: #ff8585;
          padding: 0.45rem 0.75rem;
          border-radius: var(--radius-xs);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all var(--duration-fast);
        }

        .btn-delete-row:hover {
          background: rgba(255, 80, 80, 0.15);
          border-color: rgba(255, 80, 80, 0.4);
          color: #ff9999;
        }

        .table-testi-quote {
          font-size: 0.8125rem;
          color: var(--color-gray-300);
          max-width: 420px;
          line-height: 1.45;
        }

        /* Delete Modal Backdrop */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(8px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .delete-confirm-card {
          width: 100%;
          max-width: 440px;
          padding: 2rem;
          background-color: var(--color-charcoal);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-floating);
          text-align: center;
        }

        .delete-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 80, 80, 0.1);
          border: 1px solid rgba(255, 80, 80, 0.25);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .text-danger {
          color: #ff6b6b;
        }

        .delete-confirm-title {
          font-size: 1.25rem;
          color: var(--color-white);
          margin-bottom: 0.5rem;
        }

        .delete-dialog-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }

        .btn-danger {
          background-color: #d32f2f;
          color: #ffffff;
          border: 1px solid #e53935;
          padding: 0.55rem 1rem;
          border-radius: var(--radius-xs);
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: background-color var(--duration-fast);
        }

        .btn-danger:hover {
          background-color: #b71c1c;
        }
      `}</style>
    </div>
  );
}
