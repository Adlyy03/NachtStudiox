import { useEffect } from 'react';
import { X, Check, ExternalLink, Globe } from 'lucide-react';

function GithubIcon({ size = 15, className = '' }) {
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

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-container surface-raised" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-top">
          <div className="modal-heading-group">
            <div className="modal-tags">
              <span className="tag tag-active">{project.category}</span>
              <span className="tag">{project.badge}</span>
              <span className="tag">{project.year}</span>
            </div>
            <h3 id="modal-title" className="heading-1 modal-heading">
              {project.title}
            </h3>
            <p className="modal-sub">{project.subtitle}</p>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup detail proyek"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="modal-content-scroll">
          {/* Visual Banner Preview */}
          {project.image && (
            <div className="modal-preview-banner">
              <img
                src={project.image}
                alt={`Preview visual sistem ${project.title}`}
                className="modal-banner-img"
              />
            </div>
          )}

          {/* Quick Action Link Pills (if links available) */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="modal-action-links-row">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm modal-link-btn"
                >
                  <Globe size={14} />
                  <span>Kunjungi Website / Live Preview</span>
                  <ExternalLink size={12} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm modal-link-btn"
                >
                  <GithubIcon size={14} />
                  <span>Repositori GitHub</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          )}

          <div className="modal-grid">
            <div className="modal-col-main">
              {/* Summary Block */}
              <div className="case-block">
                <span className="case-label">Ringkasan Sistem</span>
                <p className="body-regular">{project.summary}</p>
              </div>

              {/* Problem Statement */}
              <div className="case-block">
                <span className="case-label">Tantangan Rekayasa</span>
                <p className="body-regular">{project.challenge}</p>
              </div>

              {/* Solution */}
              <div className="case-block">
                <span className="case-label">Solusi Arsitektur</span>
                <p className="body-regular">{project.solution}</p>
              </div>

              {/* Key Deliverables */}
              {Array.isArray(project.deliverables) && project.deliverables.length > 0 && (
                <div className="case-block">
                  <span className="case-label">Komponen Deliverables</span>
                  <ul className="modal-deliverables">
                    {project.deliverables.map((del, i) => (
                      <li key={i} className="modal-deliverable-item">
                        <span className="del-dot" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="modal-col-side">
              {/* Stack Used */}
              <div className="side-card">
                <span className="case-label">Tech Stack</span>
                <div className="stack-chips">
                  {Array.isArray(project.stack) &&
                    project.stack.map((item) => (
                      <span key={item} className="tag tag-active">
                        {item}
                      </span>
                    ))}
                </div>
              </div>

              {/* Highlights */}
              {Array.isArray(project.highlights) && project.highlights.length > 0 && (
                <div className="side-card">
                  <span className="case-label">Metrik / Performa</span>
                  <ul className="highlights-list">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="highlight-item">
                        <Check size={14} className="hl-check" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="side-action">
                <a
                  href="#estimator"
                  onClick={onClose}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <span>Minta Scope Seperti Ini</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: modalFadeIn 220ms var(--ease-out);
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .modal-container {
          background-color: #111114;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-floating);
          width: 100%;
          max-width: 900px;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .modal-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1.75rem 2rem 1.25rem;
          border-bottom: 1px solid var(--color-border);
          background-color: #141418;
          gap: 1.5rem;
        }

        .modal-heading-group {
          flex: 1;
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 0.6rem;
        }

        .modal-heading {
          font-size: 1.75rem;
          color: var(--color-white);
          margin-bottom: 0.25rem;
        }

        .modal-sub {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-gray-400);
        }

        .modal-close-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xs);
          color: var(--color-gray-300);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all var(--duration-fast);
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: var(--color-white);
        }

        .modal-content-scroll {
          padding: 1.75rem 2rem 2.25rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .modal-preview-banner {
          width: 100%;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--color-border);
          background-color: #0c0c0e;
          max-height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .modal-action-links-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 0.5rem;
        }

        .modal-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 2rem;
          align-items: flex-start;
        }

        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .modal-top {
            padding: 1.25rem 1rem 1rem;
          }
          .modal-content-scroll {
            padding: 1.25rem 1rem 1.75rem;
          }
          .modal-heading {
            font-size: 1.35rem;
          }
        }

        .modal-col-main {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .case-block {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-sm);
          padding: 1.15rem 1.25rem;
        }

        .case-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gray-400);
          margin-bottom: 0.6rem;
        }

        .modal-deliverables {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .modal-deliverable-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.875rem;
          color: var(--color-gray-300);
        }

        .del-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-white);
          flex-shrink: 0;
        }

        .modal-col-side {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .side-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-sm);
          padding: 1.15rem 1.25rem;
        }

        .stack-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--color-gray-300);
        }

        .hl-check {
          color: var(--color-white);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .side-action {
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
