import { useState, useEffect, useRef } from 'react';
import { getStoredProjects } from '../data/storage';
import ProjectModal from './ProjectModal';
import { ArrowUpRight, Inbox, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork({ onNavigateToAdmin }) {
  const [projects, setProjects] = useState(getStoredProjects());
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(getStoredProjects());
    };
    window.addEventListener('lichtcraft_projects_changed', handleUpdate);
    return () => window.removeEventListener('lichtcraft_projects_changed', handleUpdate);
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
        stagger: 0.12,
        duration: 0.8,
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
              Sesuai panduan etika studio, seluruh proyek di bawah adalah arsitektur riil yang kami bangun sebagai
              prototipe produksi dan cetak biru sistem.
            </p>
            {/* Category Filter Pills */}
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
              Tidak ada arsip yang cocok dengan filter yang dipilih. Silakan pilih kategori lain atau reset ke "Semua Proyek".
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
            {filteredProjects.map((project, index) => {
              const isLarge = index === 0 && activeCategory === 'all';
              return (
                <article
                  key={project.id}
                  className={`work-card surface-card work-card-anim ${isLarge ? 'work-card-large' : ''}`}
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
                  {/* Visual Preview Graphic */}
                  <div className="work-visual-frame">
                    <div className="work-wireframe-art">
                      <div className="art-topbar">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                        <span className="art-route">/lichtcraft/spec/{project.id}</span>
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
                      <span className="tag">{project.badge}</span>
                      <span className="tag">{project.year}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="work-card-body">
                    <div className="work-card-top">
                      <span className="work-category">{project.category}</span>
                      <ArrowUpRight size={18} className="work-arrow" aria-hidden="true" />
                    </div>

                    <h3 className="heading-2 work-item-title">{project.title}</h3>
                    <p className="body-small work-item-summary">{project.summary}</p>

                    <div className="work-stack-list">
                      {project.stack.slice(0, 3).map((st) => (
                        <span key={st} className="tag">
                          {st}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="tag">+{project.stack.length - 3}</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
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

        .work-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }

        @media (max-width: 768px) {
          .work-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.625rem;
          }
        }

        .work-card-large {
          grid-column: span 2;
        }

        @media (max-width: 768px) {
          .work-card-large {
            grid-column: span 2;
          }
        }

        .work-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          outline: none;
        }

        .work-card:focus-visible {
          outline: 2px solid var(--color-white);
          outline-offset: 3px;
        }

        .work-card-large {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
        }

        @media (max-width: 768px) {
          .work-card-large {
            display: flex;
            flex-direction: column;
          }
        }

        .work-visual-frame {
          position: relative;
          background: radial-gradient(circle at 50% 50%, #151515 0%, #0a0a0a 100%);
          border-bottom: 1px solid var(--color-border);
          min-height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          overflow: hidden;
        }

        .work-card-large .work-visual-frame {
          border-bottom: none;
          border-right: 1px solid var(--color-border);
          min-height: 340px;
        }

        @media (max-width: 768px) {
          .work-card-large .work-visual-frame {
            border-right: none;
            border-bottom: 1px solid var(--color-border);
          }
          .work-visual-frame {
            min-height: 120px !important;
            padding: 0.75rem !important;
          }
          .work-card-large .work-visual-frame {
            min-height: 130px !important;
          }
        }

        /* Abstract Monochrome System Mockup Art */
        .work-wireframe-art {
          width: 88%;
          max-width: 440px;
          background-color: var(--color-ink);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          transition: transform var(--duration-base) var(--ease-out);
        }

        .work-card:hover .work-wireframe-art {
          transform: translateY(-4px) scale(1.02);
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

        .visual-badge-overlay {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          gap: 0.375rem;
        }

        .work-card-body {
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 768px) {
          .work-card-body {
            padding: 0.875rem 0.75rem !important;
          }
          .work-category {
            font-size: 0.5625rem !important;
          }
          .work-item-title {
            font-size: 0.875rem !important;
            margin-bottom: 0.2rem !important;
          }
          .work-item-summary {
            font-size: 0.6875rem !important;
            line-height: 1.35 !important;
            margin-bottom: 0.5rem !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .visual-badge-overlay .tag {
            font-size: 0.5rem !important;
            padding: 2px 4px !important;
          }
          .work-stack-list .tag {
            font-size: 0.5625rem !important;
            padding: 2px 5px !important;
          }
        }

        .work-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .work-category {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-gray-400);
        }

        .work-arrow {
          color: var(--color-gray-400);
          transition: transform var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
        }

        .work-card:hover .work-arrow {
          transform: translate(3px, -3px);
          color: var(--color-white);
        }

        .work-item-title {
          font-size: 1.5rem;
          margin-bottom: 0.625rem;
          color: var(--color-white);
        }

        .work-item-summary {
          margin-bottom: 1.5rem;
          color: var(--color-gray-300);
        }

        .work-stack-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
          margin-top: auto;
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
