import { useEffect } from 'react';
import { X, Check, ExternalLink } from 'lucide-react';

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
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-container surface-raised" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div>
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

        {/* Modal Body */}
        <div className="modal-content-scroll">
          <div className="modal-grid">
            <div className="modal-col-main">
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
            </div>

            <div className="modal-col-side">
              {/* Stack Used */}
              <div className="side-card">
                <span className="case-label">Tech Stack</span>
                <div className="stack-chips">
                  {project.stack.map((item) => (
                    <span key={item} className="tag tag-active">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
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
          background-color: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: modalFadeIn 240ms var(--ease-out);
        }

        @media (max-width: 640px) {
          .modal-backdrop {
            padding: 0.75rem;
          }
          .modal-container {
            border-radius: var(--radius-md) !important;
            max-height: 92vh !important;
          }
          .modal-top {
            padding: 1.25rem 1rem 1rem !important;
          }
          .modal-content-scroll {
            padding: 1.25rem 1rem 1.5rem !important;
          }
          .modal-heading {
            font-size: 1.35rem !important;
          }
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-container {
          width: 100%;
          max-width: 900px;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          background-color: var(--color-elevated);
          border: 1px solid var(--color-border-strong);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-floating);
          animation: modalSlideUp 280ms var(--ease-out);
        }

        @keyframes modalSlideUp {
          from {
            transform: translateY(20px) scale(0.98);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .modal-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 2.25rem 2.5rem 1.5rem;
          border-bottom: 1px solid var(--color-border);
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .modal-top {
            padding: 1.5rem 1.5rem 1.25rem;
          }
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .modal-heading {
          font-size: clamp(1.75rem, 3.2vw, 2.75rem);
          margin-bottom: 0.25rem;
        }

        .modal-sub {
          font-size: 0.9375rem;
          color: var(--color-gray-400);
        }

        .modal-close-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          color: var(--color-white);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
          flex-shrink: 0;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--color-white);
        }

        .modal-content-scroll {
          padding: 2rem 2.5rem 2.5rem;
          overflow-y: auto;
        }

        @media (max-width: 640px) {
          .modal-content-scroll {
            padding: 1.5rem;
          }
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 2.5rem;
        }

        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .case-block {
          margin-bottom: 1.75rem;
        }

        .case-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-gray-400);
          margin-bottom: 0.625rem;
        }

        .modal-deliverables {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .modal-deliverable-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.875rem;
          color: var(--color-gray-300);
        }

        .del-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-white);
        }

        .side-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .stack-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
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
          margin-top: 0.15rem;
          flex-shrink: 0;
        }

        .side-action {
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
}
