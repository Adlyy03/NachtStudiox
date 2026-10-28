import { useState, useEffect, useRef } from 'react';
import { getStoredProjects } from '../data/storage';
import ProjectModal from './ProjectModal';
import { ArrowUpRight, Inbox, Shield, Globe, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Authentic GitHub vector icon
function GithubIcon({ size = 13, className = '' }) {
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

export default function SelectedWork({ onNavigateToAdmin }) {
  const [projects, setProjects] = useState(getStoredProjects());
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(getStoredProjects());
    };
    window.addEventListener('natch_projects_changed', handleUpdate);
    return () => window.removeEventListener('natch_projects_changed', handleUpdate);
  }, []);

  const categories = [
    { key: 'all', label: 'Semua Proyek' },
    { key: 'website', label: 'Website' },
    { key: 'webapp', label: 'Web Application' },
    { key: 'mobile', label: 'Mobile App' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.categoryKey === activeCategory);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.work-card-anim', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      });
    },
    { scope: containerRef, dependencies: [activeCategory] }
  );

  return (
    <section ref={containerRef} id="work" className="section work-section" aria-label="Portofolio & Showcase Studio">
      <div className="container">
        {/* Section Header */}
        <div className="work-header">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              PORTOFOLIO TERPILIH
            </span>
            <h2 className="heading-1 work-title">
              Bukti kapabilitas, <br />
              terukur secara teknis.
            </h2>
          </div>

          <div className="work-header-meta">
            <p className="body-regular work-subtitle">
              Setiap proyek di bawah adalah sistem produksi nyata dengan arsitektur kode bersih, performa tinggi, dan
              dokumentasi spesifikasi teknis lengkap.
            </p>
            {/* Category Filter Pills & Admin Shortcut */}
            <div className="filter-and-admin-row">
              <div className="filter-bar" role="tablist" aria-label="Filter kategori portofolio">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === cat.key}
                    className={`filter-btn ${activeCategory === cat.key ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {onNavigateToAdmin && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm admin-trigger-btn"
                  onClick={onNavigateToAdmin}
                  title="Masuk panel admin untuk kelola portofolio"
                >
                  <Shield size={13} />
                  <span>Admin CRUD</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Projects Gallery */}
        {filteredProjects.length === 0 ? (
          <div className="empty-state surface-card">
            <Inbox size={36} className="empty-icon" />
            <h3 className="heading-3">Belum Ada Proyek Dalam Kategori Ini</h3>
            <p className="body-small">
              Tidak ada arsip yang cocok dengan filter yang dipilih. Silakan pilih kategori lain atau reset ke &quot;Semua Proyek&quot;.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '1rem' }}
              onClick={() => setActiveCategory('all')}
            >
              Tampilkan Semua Proyek
            </button>
          </div>
        ) : (
          <div className="work-grid">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="work-card surface-card work-card-anim"
                onClick={() => setSelectedProject(project)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                aria-label={`Buka case study untuk ${project.title}`}
              >
                {/* 1. Visual Preview Frame (Crisp Mockup / Image with zero badge collision) */}
                <div className="work-visual-frame">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`Preview antarmuka ${project.title}`}
                      className="work-preview-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="work-wireframe-art">
                      <div className="art-topbar">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                        <span className="art-route">/natch/spec/{project.id}</span>
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

                  {/* Clean corner floating tags */}
                  <div className="visual-tags-bar" aria-hidden="true">
                    <span className="visual-badge">{project.badge || 'Showcase'}</span>
                    <span className="visual-year">{project.year}</span>
                  </div>
                </div>

                {/* 2. Structured Card Content */}
                <div className="work-card-body">
                  {/* Category & Quick Trigger */}
                  <div className="work-card-header-row">
                    <span className="work-category-badge">{project.category}</span>
                    <div className="card-top-action">
                      <span className="detail-hint">Case Study</span>
                      <ArrowUpRight size={15} className="work-arrow" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="heading-2 work-item-title">{project.title}</h3>
                  <p className="work-item-sub">{project.subtitle}</p>

                  {/* Summary */}
                  <p className="body-small work-item-summary">{project.summary}</p>

                  {/* Tech Stack Chips */}
                  <div className="work-stack-list">
                    {Array.isArray(project.stack) &&
                      project.stack.slice(0, 4).map((st) => (
                        <span key={st} className="tag tag-active">
                          {st}
                        </span>
                      ))}
                    {Array.isArray(project.stack) && project.stack.length > 4 && (
                      <span className="tag">+{project.stack.length - 4}</span>
                    )}
                  </div>

                  {/* Quick External Links Row */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="card-links-row" onClick={(e) => e.stopPropagation()}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-link"
                          title="Buka website/preview di tab baru"
                        >
                          <Globe size={13} />
                          <span>Live Preview</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-link"
                          title="Buka kode di GitHub"
                        >
                          <GithubIcon size={13} />
                          <span>GitHub</span>
                        </a>
                      )}
                      <button
                        type="button"
                        className="btn-card-drawer"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Layers size={13} />
                        <span>Spesifikasi Lengkap</span>
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal Case Study Drawer */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>

      <style>{`
        .work-section {
          background-color: var(--color-ink);
          border-top: 1px solid var(--color-border);
          padding-top: clamp(4rem, 6vw, 6.5rem);
          padding-bottom: clamp(4rem, 6vw, 6.5rem);
        }

        .work-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: flex-end;
          margin-bottom: 3.5rem;
        }

        @media (max-width: 900px) {
          .work-header {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .work-title {
          margin-top: 1rem;
        }

        .work-subtitle {
          color: var(--color-gray-400);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .filter-and-admin-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .filter-and-admin-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }
          .admin-trigger-btn {
            width: 100%;
            justify-content: center;
          }
        }

        .filter-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter-btn {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 500;
          padding: 0.45rem 0.875rem;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border);
          color: var(--color-gray-400);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .filter-btn:hover {
          color: var(--color-white);
          border-color: var(--color-border-strong);
        }

        .filter-btn.is-active {
          background: var(--color-white);
          color: var(--color-black);
          border-color: var(--color-white);
          box-shadow: 0 2px 10px rgba(255, 255, 255, 0.15);
        }

        /* Responsive Grid: Generous 2-column on desktop, clean 1-column on mobile/tablet */
        .work-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.25rem;
        }

        @media (max-width: 860px) {
          .work-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }

        /* Work Card */
        .work-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          outline: none;
          background-color: var(--color-charcoal);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: border-color var(--duration-fast) var(--ease-out),
                      transform var(--duration-base) var(--ease-out),
                      box-shadow var(--duration-base) var(--ease-out);
        }

        .work-card:hover {
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-3px);
          box-shadow: var(--shadow-floating);
        }

        .work-card:focus-visible {
          outline: 2px solid var(--color-white);
          outline-offset: 3px;
        }

        /* Visual Frame */
        .work-visual-frame {
          position: relative;
          background: #0d0d10;
          border-bottom: 1px solid var(--color-border);
          aspect-ratio: 16 / 9.5;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .work-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform var(--duration-slow) var(--ease-out);
        }

        .work-card:hover .work-preview-img {
          transform: scale(1.03);
        }

        /* Wireframe fallback */
        .work-wireframe-art {
          width: 88%;
          max-width: 440px;
          background-color: var(--color-ink);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-card);
          overflow: hidden;
        }

        .art-topbar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background-color: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .art-topbar .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-gray-700);
        }

        .art-route {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--color-gray-500);
          margin-left: 6px;
        }

        .art-body {
          padding: 1.25rem;
        }

        .art-grid-lines {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .art-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px;
          height: 48px;
        }

        .box-3 {
          grid-column: span 2;
          height: 64px;
        }

        /* Visual Tags Overlay (Clean top corner, never overlaps text) */
        .visual-tags-bar {
          position: absolute;
          top: 0.875rem;
          left: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          z-index: 2;
        }

        .visual-badge {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          letter-spacing: 0.04em;
          color: var(--color-white);
          background: rgba(14, 14, 18, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-xs);
        }

        .visual-year {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--color-gray-300);
          background: rgba(14, 14, 18, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-xs);
        }

        /* Card Content Body */
        .work-card-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        @media (max-width: 640px) {
          .work-card-body {
            padding: 1.25rem 1rem;
          }
        }

        .work-card-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .work-category-badge {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-gray-400);
        }

        .card-top-action {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--color-gray-400);
          transition: color var(--duration-fast);
        }

        .detail-hint {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
        }

        .work-arrow {
          transition: transform var(--duration-fast) var(--ease-out);
        }

        .work-card:hover .card-top-action {
          color: var(--color-white);
        }

        .work-card:hover .work-arrow {
          transform: translate(2px, -2px);
        }

        .work-item-title {
          font-size: 1.35rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--color-white);
        }

        .work-item-sub {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          color: var(--color-gray-400);
          margin-bottom: 0.875rem;
          line-height: 1.45;
        }

        .work-item-summary {
          color: var(--color-gray-300);
          line-height: 1.55;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .work-stack-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
          margin-bottom: 1.25rem;
          margin-top: auto;
        }

        /* Card Links Row */
        .card-links-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border-subtle);
        }

        .btn-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-white);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          padding: 0.4rem 0.65rem;
          border-radius: var(--radius-xs);
          text-decoration: none;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .btn-card-link:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .btn-card-drawer {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-gray-400);
          background: transparent;
          border: 1px solid transparent;
          padding: 0.4rem 0.65rem;
          border-radius: var(--radius-xs);
          cursor: pointer;
          margin-left: auto;
          transition: all var(--duration-fast);
        }

        .btn-card-drawer:hover {
          color: var(--color-white);
          background: rgba(255, 255, 255, 0.04);
        }

        @media (max-width: 640px) {
          .btn-card-drawer {
            margin-left: 0;
            width: 100%;
            justify-content: center;
          }
          .card-links-row {
            justify-content: flex-start;
          }
        }

        .empty-state {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 600px;
          margin-inline: auto;
        }

        .empty-icon {
          color: var(--color-gray-500);
          margin-bottom: 1.25rem;
        }
      `}</style>
    </section>
  );
}
