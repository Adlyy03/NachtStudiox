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
} from 'lucide-react';

const ADMIN_DEFAULT_PASS = 'lichtcraft2024';
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
    window.addEventListener('lichtcraft_projects_changed', refreshData);
    window.addEventListener('lichtcraft_testimonials_changed', refreshData);
    window.addEventListener('lichtcraft_auth_changed', refreshData);
    return () => {
      window.removeEventListener('lichtcraft_projects_changed', refreshData);
      window.removeEventListener('lichtcraft_testimonials_changed', refreshData);
      window.removeEventListener('lichtcraft_auth_changed', refreshData);
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
              <h1 className="heading-2">Admin Studio LichtCraft</h1>
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
                  Default pass: <code>lichtcraft2024</code> atau <code>admin</code>
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
                  ? 'Perbarui spesifikasi arsitektur dan ringkasan deliverables proyek.'
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
                    <label className="form-label">Nama Proyek *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Nexa Engine"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tahun Rilis</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formYear}
                      onChange={(e) => setFormYear(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subjudul / Karakter Arsitektur</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. High-Throughput Telemetry Platform"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Kategori Layanan</label>
                    <select
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
                    <label className="form-label">Badge Status</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-section-header" style={{ marginTop: '1.5rem' }}>
                  <h2 className="heading-3">Uraian Teknis & Solusi</h2>
                </div>

                <div className="form-group">
                  <label className="form-label">Ringkasan Eksekutif (Summary)</label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    placeholder="Jelaskan peran sistem ini secara umum..."
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Tantangan Rekayasa (Challenge)</label>
                    <textarea
                      rows={3}
                      className="form-textarea"
                      value={formChallenge}
                      onChange={(e) => setFormChallenge(e.target.value)}
                      placeholder="Apa masalah spesifik yang harus diselesaikan?"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Solusi Arsitektur (Solution)</label>
                    <textarea
                      rows={3}
                      className="form-textarea"
                      value={formSolution}
                      onChange={(e) => setFormSolution(e.target.value)}
                      placeholder="Pendekatan teknis yang diambil studio..."
                    />
                  </div>
                </div>

                <div className="form-section-header" style={{ marginTop: '1.5rem' }}>
                  <h2 className="heading-3">Stack & Metrik</h2>
                </div>

                <div className="form-group">
                  <label className="form-label">Tech Stack (pisahkan koma)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formStack}
                    onChange={(e) => setFormStack(e.target.value)}
                    placeholder="React, TypeScript, GSAP, Node.js"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Deliverables Kunci (pisahkan koma)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formDeliverables}
                    onChange={(e) => setFormDeliverables(e.target.value)}
                    placeholder="Custom Product Inspector, Cart Slide Drawer, Keyboard Navigation"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Metrik / Highlights (pisahkan koma)</label>
                  <input
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
              <span className="preview-label">Live Preview Kartu Publik</span>
              <div className="work-card surface-card preview-card">
                <div className="work-visual-frame preview-frame">
                  <div className="work-wireframe-art">
                    <div className="art-topbar">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                      <span className="art-route">/lichtcraft/spec/{formId || 'draft'}</span>
                    </div>
                    <div className="art-body">
                      <div className="art-grid-lines">
                        <div className="art-box box-1" />
                        <div className="art-box box-2" />
                        <div className="art-box box-3" />
                      </div>
                    </div>
                  </div>
                  <div className="visual-badge-overlay">
                    <span className="tag">{formBadge || 'Preview'}</span>
                    <span className="tag">{formYear || '2024'}</span>
                  </div>
                </div>

                <div className="work-card-body" style={{ padding: '1.25rem 1rem' }}>
                  <div className="work-card-top" style={{ marginBottom: '0.5rem' }}>
                    <span className="work-category">{formCategory}</span>
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                  <h3 className="heading-3" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {formTitle || 'Judul Proyek Preview'}
                  </h3>
                  <p className="body-small text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                    {formSummary || 'Ringkasan singkat proyek akan tampil di sini saat pengunjung menelusuri portofolio.'}
                  </p>
                  <div className="work-stack-list">
                    {formStack
                      .split(',')
                      .slice(0, 3)
                      .map((s, idx) => (
                        <span key={idx} className="tag tag-active" style={{ fontSize: '0.625rem' }}>
                          {s.trim() || 'Tech'}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .admin-form-page-wrapper {
            min-height: 100vh;
            padding-top: 4.5rem;
            padding-bottom: 7rem;
            background-color: var(--color-ink);
          }
          .form-page-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 1.25rem;
            border-bottom: 1px solid var(--color-border);
            margin-bottom: 2rem;
          }
          .page-mode-badge {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            color: var(--color-white);
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid var(--color-border);
            padding: 0.25rem 0.625rem;
            border-radius: var(--radius-xs);
          }
          .form-page-title-row {
            margin-bottom: 2.5rem;
          }
          .editor-grid {
            display: grid;
            grid-template-columns: 1.35fr 0.65fr;
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
            padding: 2.25rem;
            background-color: var(--color-charcoal);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
          }
          @media (max-width: 640px) {
            .dedicated-form-card {
              padding: 1.25rem;
            }
          }
          .form-section-header {
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--color-border-subtle);
            margin-bottom: 1.25rem;
          }
          .dedicated-form-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--color-border);
          }
          @media (max-width: 640px) {
            .dedicated-form-actions {
              flex-direction: column;
              width: 100%;
            }
            .dedicated-form-actions .btn {
              width: 100%;
            }
          }
          .editor-preview-col {
            position: sticky;
            top: 6rem;
          }
          .preview-label {
            display: block;
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            color: var(--color-gray-500);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 0.75rem;
          }
          .preview-card {
            pointer-events: none;
          }
          .preview-frame {
            min-height: 140px;
          }
        `}</style>
      </div>
    );
  }

  // 3. MAIN DASHBOARD VIEW (currentView === 'list')
  return (
    <div className="admin-dashboard-wrapper">
      <div className="container">
        {/* Top Control Bar */}
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
            <h1 className="heading-1">Pusat Kendali Portofolio & Konten</h1>
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
                    <th>Judul Proyek</th>
                    <th>Kategori</th>
                    <th>Tahun</th>
                    <th>Status Badge</th>
                    <th>Tech Stack</th>
                    <th style={{ textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((proj) => (
                    <tr key={proj.id}>
                      <td>
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
                        <div className="table-chips">
                          {Array.isArray(proj.stack) &&
                            proj.stack.slice(0, 3).map((st) => (
                              <span key={st} className="tag tag-active" style={{ fontSize: '0.625rem' }}>
                                {st}
                              </span>
                            ))}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="action-buttons-cell">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => goToEditPage(proj)}
                            title="Edit data proyek di halaman penuh"
                          >
                            <Pencil size={13} />
                            <span>Edit Halaman</span>
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
                        <span className="table-mono">{testi.date || testi.year}</span>
                      </td>
                      <td>
                        <p className="table-quote-preview">"{testi.content}"</p>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => requestDeleteTestimonial(testi)}
                          title="Hapus testimoni via pop-up"
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

        {/* CUSTOM IN-APP DELETE CONFIRMATION POP-UP (NO BROWSER ALERT) */}
        {deleteTarget && (
          <div className="popup-backdrop" onClick={cancelDelete} role="dialog" aria-modal="true">
            <div className="popup-dialog surface-raised" onClick={(e) => e.stopPropagation()}>
              <div className="popup-icon-box">
                <AlertTriangle size={24} className="text-red" />
              </div>

              <h3 className="heading-3 popup-title">
                {deleteTarget.type === 'reset'
                  ? 'Konfirmasi Reset Seluruh Data?'
                  : 'Konfirmasi Penghapusan Permanen'}
              </h3>

              <p className="body-small popup-message">
                {deleteTarget.type === 'reset'
                  ? 'Tindakan ini akan mengembalikan seluruh portofolio ke cetak biru bawaan studio.'
                  : `Anda yakin ingin menghapus "${deleteTarget.title}"? Data akan dihapus secara permanen dari penyimpanan.`}
              </p>

              <div className="popup-action-row">
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
        }

        .table-responsive {
          overflow-x: auto;
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
        }

        .table-mono {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--color-gray-400);
        }

        .table-badge {
          font-size: 0.75rem;
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
          padding: 0.45rem 0.65rem;
          border-radius: var(--radius-xs);
          background: rgba(255, 60, 60, 0.08);
          border: 1px solid rgba(255, 60, 60, 0.25);
          color: #ff8080;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
        }

        .btn-delete-row:hover {
          background: rgba(255, 60, 60, 0.2);
        }

        .table-quote-preview {
          font-size: 0.8125rem;
          color: var(--color-gray-300);
          max-width: 380px;
          line-height: 1.4;
        }

        /* CUSTOM POP-UP DIALOG */
        .popup-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          animation: popupFadeIn 200ms var(--ease-out);
        }

        @keyframes popupFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .popup-dialog {
          width: 100%;
          max-width: 440px;
          padding: 2rem 1.75rem;
          background-color: var(--color-charcoal);
          border: 1px solid var(--color-border-strong);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-floating);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .popup-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 60, 60, 0.12);
          border: 1px solid rgba(255, 60, 60, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .text-red {
          color: #ff6b6b;
        }

        .popup-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--color-white);
        }

        .popup-message {
          color: var(--color-gray-400);
          margin-bottom: 1.75rem;
          line-height: 1.5;
        }

        .popup-action-row {
          display: flex;
          gap: 0.75rem;
          width: 100%;
        }

        .popup-action-row .btn {
          flex: 1;
        }

        .btn-danger {
          background-color: #d32f2f;
          color: #ffffff;
          border: 1px solid #ff4d4d;
        }

        .btn-danger:hover {
          background-color: #b71c1c;
        }
      `}</style>
    </div>
  );
}
