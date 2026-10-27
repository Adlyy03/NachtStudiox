import { useState, useRef } from 'react';
import { servicesData } from '../data/services';
import { Check, ArrowRight, Terminal, Smartphone, Globe, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);
  const containerRef = useRef(null);

  const activeService = servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.service-card-anim', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const getServiceIcon = (id) => {
    switch (id) {
      case 'website':
        return <Globe size={22} />;
      case 'webapp':
        return <Terminal size={22} />;
      case 'mobile':
        return <Smartphone size={22} />;
      default:
        return <Cpu size={22} />;
    }
  };

  return (
    <section ref={containerRef} id="services" className="section services-section" aria-label="Layanan LichtCraft">
      <div className="container">
        {/* Section Header */}
        <div className="services-header">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              KAPABILITAS & DISIPLIN
            </span>
            <h2 className="heading-1 services-title">
              Layanan digital dibangun dari dasar, <br />
              bukan template rakitan.
            </h2>
          </div>
          <p className="body-large services-lead">
            Kami memfokuskan keahlian pada tiga pilar inti produk digital. Setiap pilar ditangani dengan standar arsitektur
            tinggi, kode teruji, dan dokumentasi yang jelas.
          </p>
        </div>

        {/* 3 Pillars Editorial Cards */}
        <div className="services-grid">
          {servicesData.map((service) => {
            const isSelected = service.id === activeServiceId;
            return (
              <div
                key={service.id}
                className={`service-card surface-card service-card-anim ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setActiveServiceId(service.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveServiceId(service.id);
                  }
                }}
                aria-pressed={isSelected}
              >
                <div className="card-top">
                  <div className="service-icon-wrap">{getServiceIcon(service.id)}</div>
                  <span className="service-index">{service.number}</span>
                </div>

                <h3 className="heading-2 service-name">{service.title}</h3>
                <p className="service-tagline">{service.tagline}</p>
                <p className="body-small service-desc">{service.description}</p>

                <div className="service-metrics-badge">
                  <span>{service.metrics}</span>
                </div>

                <div className="service-footer-cta">
                  <span className="cta-label">{isSelected ? 'Melihat Detail Spesifikasi' : 'Pilih untuk Inspect'}</span>
                  <ArrowRight size={16} className="cta-arrow" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Service Specification Inspector */}
        <div className="service-inspector surface-raised">
          <div className="inspector-header">
            <div>
              <span className="inspector-eyebrow">SPESIFIKASI TEKNIS & DELIVERABLES</span>
              <h4 className="heading-2 inspector-title">
                {activeService.number} — {activeService.title}
              </h4>
            </div>
            <a href="#estimator" className="btn btn-primary btn-sm">
              <span>Konsultasi {activeService.title}</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="inspector-content-grid">
            {/* Deliverables Column */}
            <div className="inspector-col">
              <span className="col-label">Deliverables Standar</span>
              <ul className="deliverables-list">
                {activeService.deliverables.map((item, idx) => (
                  <li key={idx} className="deliverable-item">
                    <span className="check-box" aria-hidden="true">
                      <Check size={13} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack & Target Column */}
            <div className="inspector-col">
              <div className="stack-block">
                <span className="col-label">Teknologi & Framework Teruji</span>
                <div className="tags-wrap">
                  {activeService.technologies.map((tech) => (
                    <span key={tech} className="tag tag-active">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="target-block">
                <span className="col-label">Sangat Cocok Untuk</span>
                <p className="body-small">{activeService.idealFor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .services-section {
          background-color: var(--color-ink);
          border-top: 1px solid var(--color-border);
        }

        .services-header {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: flex-end;
          margin-bottom: clamp(3rem, 5vw, 4.5rem);
        }

        @media (max-width: 900px) {
          .services-header {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .services-title {
          margin-top: 1rem;
        }

        .services-lead {
          color: var(--color-gray-400);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 960px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .service-card {
          padding: 2.25rem 2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          border-color: var(--color-border);
          outline: none;
        }

        @media (max-width: 640px) {
          .service-card {
            padding: 1.35rem 1.15rem;
            border-radius: var(--radius-sm);
          }
        }

        .service-card:focus-visible {
          outline: 2px solid var(--color-white);
          outline-offset: 3px;
        }

        .service-card.is-selected {
          border-color: var(--color-white);
          background-color: var(--color-elevated);
          box-shadow: var(--shadow-floating);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        @media (max-width: 640px) {
          .card-top {
            margin-bottom: 1.25rem;
          }
        }

        .service-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-white);
        }

        @media (max-width: 640px) {
          .service-icon-wrap {
            width: 38px;
            height: 38px;
          }
        }

        .service-index {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--color-gray-500);
        }

        .service-name {
          font-size: 1.625rem;
          margin-bottom: 0.35rem;
          color: var(--color-white);
        }

        @media (max-width: 640px) {
          .service-name {
            font-size: 1.25rem;
          }
        }

        .service-tagline {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-400);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 1.25rem;
        }

        @media (max-width: 640px) {
          .service-tagline {
            font-size: 0.6875rem;
            margin-bottom: 0.875rem;
          }
        }

        .service-desc {
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .service-metrics-badge {
          padding: 0.5rem 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-xs);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-300);
          margin-bottom: 1.75rem;
        }

        .service-footer-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border-subtle);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--color-gray-400);
          transition: color var(--duration-fast) var(--ease-out);
        }

        .service-card:hover .service-footer-cta,
        .service-card.is-selected .service-footer-cta {
          color: var(--color-white);
        }

        .service-card:hover .cta-arrow,
        .service-card.is-selected .cta-arrow {
          transform: translateX(4px);
        }

        .cta-arrow {
          transition: transform var(--duration-fast) var(--ease-out);
        }

        /* Inspector */
        .service-inspector {
          padding: 2.5rem;
          background-color: var(--color-elevated);
        }

        @media (max-width: 640px) {
          .service-inspector {
            padding: 1.5rem;
          }
        }

        .inspector-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 2rem;
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .inspector-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .inspector-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.1em;
          color: var(--color-gray-500);
          display: block;
          margin-bottom: 0.35rem;
        }

        .inspector-title {
          font-size: clamp(1.35rem, 2.2vw, 1.85rem);
          color: var(--color-white);
        }

        .inspector-content-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
        }

        @media (max-width: 860px) {
          .inspector-content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .col-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-gray-400);
          margin-bottom: 1rem;
        }

        .deliverables-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .deliverable-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9375rem;
          color: var(--color-gray-300);
          line-height: 1.5;
        }

        .check-box {
          margin-top: 0.2rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-white);
          flex-shrink: 0;
        }

        .stack-block {
          margin-bottom: 2rem;
        }

        .tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .target-block {
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border-subtle);
        }
      `}</style>
    </section>
  );
}
