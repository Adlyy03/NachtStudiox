import { useState, useRef } from 'react';
import { Check, Copy, Send, CheckCircle2, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ScopeEstimator() {
  const containerRef = useRef(null);

  // Estimator State
  const [platform, setPlatform] = useState('webapp');
  const [tier, setTier] = useState('production');
  const [selectedModules, setSelectedModules] = useState([
    'auth',
    'motion',
    'api',
  ]);
  const [timeline, setTimeline] = useState('standard');

  // Contact Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.estimator-reveal', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const platforms = [
    { id: 'website', label: 'Website / Landing Page', desc: 'Editorial, company profile, atau katalog performa tinggi' },
    { id: 'webapp', label: 'Web Application', desc: 'Dashboard analitik, portal internal, SaaS multi-role' },
    { id: 'mobile', label: 'Mobile Application', desc: 'Aplikasi iOS & Android cross-platform berkinerja tinggi' },
    { id: 'custom', label: 'Multi-Platform Suite', desc: 'Integrasi terpadu Web App + Mobile App + Public Web' },
  ];

  const tiers = [
    { id: 'mvp', label: 'Tahap MVP / Prototipe', sprint: '2 – 3 Sprint' },
    { id: 'production', label: 'Produksi Standar', sprint: '4 – 6 Sprint' },
    { id: 'enterprise', label: 'Skala Penuh / High-Throughput', sprint: '7+ Sprint' },
  ];

  const modulesList = [
    { id: 'auth', label: 'Autentikasi & RBAC (Role-Based Access)' },
    { id: 'motion', label: 'GSAP Motion & Interaktivitas UI' },
    { id: 'cms', label: 'Headless CMS (Sanity / Strapi / Custom)' },
    { id: 'api', label: 'Integrasi Third-Party API & Payment Gateway' },
    { id: 'realtime', label: 'Real-time WebSocket & Live Data Stream' },
    { id: 'offline', label: 'Offline Sync & Local Encrypted Storage' },
  ];

  const toggleModule = (id) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const getPlatformLabel = () => {
    const p = platforms.find((item) => item.id === platform);
    return p ? p.label : platform;
  };

  const getTierLabel = () => {
    const t = tiers.find((item) => item.id === tier);
    return t ? `${t.label} (${t.sprint})` : tier;
  };

  // Generate specification summary text
  const generateBriefingText = () => {
    const selectedLabels = modulesList
      .filter((m) => selectedModules.includes(m.id))
      .map((m) => `- ${m.label}`)
      .join('\n');

    return `[BRIEFING PROYEK NATCH STUDIO]
Nama Klien / Tim: ${clientName || '(Belum diisi)'}
Kontak Email: ${clientEmail || '(Belum diisi)'}
Platform: ${getPlatformLabel()}
Tingkat Kompleksitas: ${getTierLabel()}
Timeline Diharapkan: ${timeline === 'express' ? 'Express (2-3 minggu)' : timeline === 'standard' ? 'Standar (4-6 minggu)' : 'Fleksibel'}
Modul yang Dipilih:
${selectedLabels || '- Kebutuhan custom'}
Catatan Tambahan:
${projectNote || 'Tidak ada catatan tambahan.'}
------------------------------------
Disusun melalui Natch Studio Scope Engine`;
  };

  const handleCopyBriefing = () => {
    const text = generateBriefingText();
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientEmail) {
      alert('Silakan masukkan email Anda untuk menerima respon konsultasi.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <section ref={containerRef} id="estimator" className="section estimator-section" aria-label="Estimasi Scope & Diskusi Proyek">
      <div className="container">
        {/* Header */}
        <div className="estimator-header estimator-reveal">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            PENDEKATAN CUSTOM QUOTATION
          </span>
          <h2 className="heading-1 estimator-title">
            Susun spesifikasi lingkup kerja, <br />
            dapatkan kalkulasi transparan.
          </h2>
          <p className="body-large estimator-lead">
            Natch Studio tidak menggunakan biaya seragam palsu. Gunakan konfigurator di bawah untuk merumuskan parameter
            produk digital Anda. Tim engineering kami akan meninjau dan mengirimkan proposal teknis yang presisi.
          </p>
        </div>

        {/* Main Estimator Panel */}
        <div className="estimator-panel surface-raised estimator-reveal">
          <div className="panel-grid">
            {/* Left: Configuration Steps */}
            <div className="config-column">
              {/* Step 1: Platform */}
              <div className="config-group">
                <span className="group-label">01. Tipe Platform Digital</span>
                <div className="radio-cards-grid">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`radio-card ${platform === p.id ? 'is-active' : ''}`}
                      onClick={() => setPlatform(p.id)}
                    >
                      <span className="card-radio-dot" />
                      <div>
                        <strong className="radio-card-title">{p.label}</strong>
                        <p className="radio-card-desc">{p.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Complexity Tier */}
              <div className="config-group">
                <span className="group-label">02. Skala & Kesiapan Arsitektur</span>
                <div className="tier-pills-row">
                  {tiers.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`tier-pill ${tier === t.id ? 'is-active' : ''}`}
                      onClick={() => setTier(t.id)}
                    >
                      <strong>{t.label}</strong>
                      <span className="tier-sprint">{t.sprint}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Modules */}
              <div className="config-group">
                <span className="group-label">03. Fitur & Modul Kunci</span>
                <div className="modules-checkbox-grid">
                  {modulesList.map((mod) => {
                    const isChecked = selectedModules.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        className={`module-checkbox-btn ${isChecked ? 'is-checked' : ''}`}
                        onClick={() => toggleModule(mod.id)}
                        aria-pressed={isChecked}
                      >
                        <span className="checkbox-square">{isChecked && <Check size={12} />}</span>
                        <span className="module-text">{mod.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Timeline */}
              <div className="config-group">
                <span className="group-label">04. Kecepatan Target Rilis</span>
                <div className="tier-pills-row">
                  {[
                    { id: 'express', label: 'Express Sprint', time: '2–3 Minggu' },
                    { id: 'standard', label: 'Standar Terjadwal', time: '4–6 Minggu' },
                    { id: 'flexible', label: 'Fase Bertahap', time: 'Fleksibel' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`tier-pill ${timeline === t.id ? 'is-active' : ''}`}
                      onClick={() => setTimeline(t.id)}
                    >
                      <strong>{t.label}</strong>
                      <span className="tier-sprint">{t.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Real-time Briefing Summary & Consultation Form */}
            <div className="summary-column">
              <div className="summary-card surface-card">
                <div className="summary-header">
                  <FileText size={18} className="summary-icon" />
                  <h3 className="heading-3 summary-title">Ringkasan Spesifikasi Lingkup</h3>
                </div>

                <div className="summary-metrics">
                  <div className="metric-row">
                    <span className="metric-label">Platform:</span>
                    <strong className="metric-val">{getPlatformLabel()}</strong>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">Skala:</span>
                    <strong className="metric-val">{getTierLabel()}</strong>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">Modul Terpilih:</span>
                    <strong className="metric-val">{selectedModules.length} Fitur Terdefinisi</strong>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">Model Biaya:</span>
                    <strong className="metric-val">Custom SOW & Milestone Delivery</strong>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="submitted-banner">
                    <CheckCircle2 size={36} className="check-success-icon" />
                    <h4 className="heading-3">Spesifikasi Berhasil Disusun</h4>
                    <p className="body-small">
                      Brief proyek untuk <strong>{clientName || 'Partner'}</strong> siap dikirimkan langsung ke tim teknis
                      Natch Studio via WhatsApp atau Email resmi kami.
                    </p>

                    <div className="direct-contact-action-box">
                      <a
                        href={`https://wa.me/62895321217645?text=${encodeURIComponent(generateBriefingText())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                      >
                        <span>Kirim Langsung ke WA (0895-3212-17645)</span>
                      </a>
                      <a
                        href={`mailto:natchstudio@gmail.com?subject=${encodeURIComponent(
                          `Pengajuan Proyek ${getPlatformLabel()} - ${clientName || 'Klien'}`
                        )}&body=${encodeURIComponent(generateBriefingText())}`}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', marginTop: '0.5rem' }}
                      >
                        <span>Kirim Salinan ke natchstudio@gmail.com</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      style={{ marginTop: '0.75rem' }}
                      onClick={() => setIsSubmitted(false)}
                    >
                      Ubah Parameter / Hitung Ulang
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="inquiry-form">
                    <div className="form-group">
                      <label htmlFor="name-input" className="form-label">
                        Nama / Nama Organisasi
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        placeholder="e.g. Studio Arsitektur Jakarta"
                        className="form-input"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email-input" className="form-label">
                        Alamat Email Kerja
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        placeholder="nama@perusahaan.com"
                        className="form-input"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="note-input" className="form-label">
                        Catatan Singkat atau Target Peluncuran (Opsional)
                      </label>
                      <textarea
                        id="note-input"
                        rows={3}
                        placeholder="Ceritakan gambaran umum produk atau timeline spesifik yang Anda harapkan..."
                        className="form-textarea"
                        value={projectNote}
                        onChange={(e) => setProjectNote(e.target.value)}
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                        <span>Lanjut & Kirim ke WhatsApp/Email</span>
                        <Send size={16} />
                      </button>

                      <div className="direct-links-row">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ flex: 1 }}
                          onClick={handleCopyBriefing}
                          title="Salin teks ringkasan untuk catatan Anda"
                        >
                          <Copy size={13} />
                          <span>{isCopied ? 'Tersalin!' : 'Salin Brief'}</span>
                        </button>

                        <a
                          href={`https://wa.me/62895321217645?text=${encodeURIComponent(generateBriefingText())}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{ flex: 1 }}
                        >
                          <span>Direct WA ↗</span>
                        </a>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .estimator-section {
          background-color: var(--color-ink);
          border-top: 1px solid var(--color-border);
        }

        .estimator-header {
          max-width: 860px;
          margin-bottom: 3.5rem;
        }

        .estimator-title {
          margin-top: 1rem;
          margin-bottom: 1.25rem;
        }

        .estimator-lead {
          color: var(--color-gray-400);
        }

        .estimator-panel {
          padding: 3rem;
          background-color: var(--color-charcoal);
        }

        @media (max-width: 768px) {
          .estimator-panel {
            padding: 1.25rem 1rem;
            border-radius: var(--radius-md);
          }
          .summary-card {
            padding: 1.25rem 1rem;
            border-radius: var(--radius-md);
          }
          .radio-card {
            padding: 0.875rem 0.75rem;
          }
          .radio-card-title {
            font-size: 0.875rem;
          }
          .radio-card-desc {
            font-size: 0.6875rem;
          }
          .module-checkbox-btn {
            padding: 0.625rem 0.75rem;
          }
          .module-text {
            font-size: 0.75rem;
          }
          .tier-pill {
            padding: 0.75rem 0.625rem;
          }
        }

        .panel-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.95fr;
          gap: 3.5rem;
        }

        @media (max-width: 992px) {
          .panel-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .config-group {
          margin-bottom: 2.25rem;
        }

        .group-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-gray-400);
          margin-bottom: 1rem;
        }

        .radio-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.875rem;
        }

        @media (max-width: 640px) {
          .radio-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }
          .radio-card {
            padding: 0.625rem 0.5rem;
            gap: 0.5rem;
          }
          .radio-card-title {
            font-size: 0.75rem;
            margin-bottom: 0.125rem;
          }
          .radio-card-desc {
            font-size: 0.625rem;
            line-height: 1.25;
          }
          .card-radio-dot {
            width: 10px;
            height: 10px;
            margin-top: 0.15rem;
          }
          .tier-pills-row {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.375rem;
          }
          .tier-pill {
            padding: 0.5rem 0.375rem;
            gap: 0.15rem;
          }
          .tier-pill strong {
            font-size: 0.6875rem;
          }
          .tier-sprint {
            font-size: 0.5625rem;
          }
          .modules-checkbox-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.375rem;
          }
          .module-checkbox-btn {
            padding: 0.5rem 0.375rem;
            gap: 0.375rem;
          }
          .checkbox-square {
            width: 12px;
            height: 12px;
          }
          .module-text {
            font-size: 0.625rem;
            line-height: 1.2;
          }
          .summary-card {
            padding: 1rem 0.875rem;
          }
          .summary-title {
            font-size: 0.9375rem;
          }
          .metric-row {
            font-size: 0.75rem;
          }
          .form-label {
            font-size: 0.6875rem;
          }
        }

        .radio-card {
          text-align: left;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 1.125rem;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .radio-card:hover {
          border-color: var(--color-border-strong);
          background: rgba(255, 255, 255, 0.04);
        }

        .radio-card.is-active {
          border-color: var(--color-white);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
        }

        .card-radio-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid var(--color-border-strong);
          margin-top: 0.2rem;
          flex-shrink: 0;
          display: inline-block;
          position: relative;
        }

        .radio-card.is-active .card-radio-dot {
          border-color: var(--color-white);
        }

        .radio-card.is-active .card-radio-dot::after {
          content: '';
          position: absolute;
          inset: 3px;
          background: var(--color-white);
          border-radius: 50%;
        }

        .radio-card-title {
          display: block;
          font-family: var(--font-display);
          font-size: 0.9375rem;
          color: var(--color-white);
          margin-bottom: 0.25rem;
        }

        .radio-card-desc {
          font-size: 0.75rem;
          color: var(--color-gray-400);
          line-height: 1.4;
        }

        .tier-pills-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .tier-pill {
          padding: 1rem 0.875rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: left;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .tier-pill:hover {
          border-color: var(--color-border-strong);
        }

        .tier-pill.is-active {
          border-color: var(--color-white);
          background: rgba(255, 255, 255, 0.08);
        }

        .tier-pill strong {
          font-size: 0.875rem;
          color: var(--color-white);
        }

        .tier-sprint {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-400);
        }

        .modules-checkbox-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.625rem;
        }

        .module-checkbox-btn {
          text-align: left;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xs);
          padding: 0.75rem 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .module-checkbox-btn:hover {
          border-color: var(--color-border-strong);
        }

        .module-checkbox-btn.is-checked {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.06);
        }

        .checkbox-square {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          border: 1px solid var(--color-border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-white);
          flex-shrink: 0;
        }

        .module-checkbox-btn.is-checked .checkbox-square {
          background-color: var(--color-white);
          color: var(--color-black);
          border-color: var(--color-white);
        }

        .module-text {
          font-size: 0.8125rem;
          color: var(--color-gray-300);
          line-height: 1.35;
        }

        /* Summary Column */
        .summary-card {
          padding: 2.25rem 2rem;
          background-color: var(--color-elevated);
          border-color: var(--color-border);
        }

        .summary-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 1.5rem;
        }

        .summary-icon {
          color: var(--color-white);
        }

        .summary-title {
          font-size: 1.125rem;
        }

        .summary-metrics {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
          margin-bottom: 1.75rem;
        }

        .metric-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .metric-label {
          color: var(--color-gray-400);
        }

        .metric-val {
          color: var(--color-white);
          font-weight: 500;
          text-align: right;
        }

        .inquiry-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-gray-400);
        }

        .direct-links-row {
          display: flex;
          gap: 0.5rem;
          width: 100%;
        }

        .direct-contact-action-box {
          width: 100%;
          margin-top: 1rem;
        }

        .form-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .copy-btn {
          width: 100%;
          justify-content: center;
        }

        .submitted-banner {
          text-align: center;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.875rem;
        }

        .check-success-icon {
          color: var(--color-white);
        }
      `}</style>
    </section>
  );
}
