import { useRef } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-meta', {
        opacity: 0,
        y: 12,
        duration: 0.6,
        delay: 0.1,
      })
        .from(
          '.hero-title',
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          '-=0.4'
        )
        .from(
          '.hero-sub',
          {
            opacity: 0,
            y: 14,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.hero-actions',
          {
            opacity: 0,
            y: 10,
            duration: 0.5,
          },
          '-=0.4'
        )
        .from(
          '.hero-spec-card',
          {
            opacity: 0,
            scale: 0.98,
            duration: 0.7,
          },
          '-=0.4'
        )
        .from(
          '.hero-strip-item',
          {
            opacity: 0,
            y: 8,
            stagger: 0.08,
            duration: 0.4,
          },
          '-=0.3'
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="hero-section" id="hero" aria-label="Hero">
      {/* Atmospheric Anime Wallpaper Backdrop */}
      <div className="hero-wallpaper-backdrop" aria-hidden="true">
        <div className="hero-wallpaper-img" />
        <div className="hero-wallpaper-overlay" />
      </div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Essential Introduction Column */}
          <div className="hero-content">
            <div className="hero-meta">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                LICHTCRAFT // DIGITAL STUDIO
              </span>
            </div>

            <h1 className="display-xl hero-title">
              Digital products, <br />
              <span className="text-highlight">crafted with intent.</span>
            </h1>

            <p className="body-large hero-sub">
              Studio independen pengembang Website performa tinggi, Web Application kompleks, dan Mobile App presisi.
            </p>

            <div className="hero-actions">
              <a href="#work" className="btn btn-primary btn-sm">
                <span>Lihat Portofolio</span>
                <ArrowDown size={14} aria-hidden="true" />
              </a>
              <a href="#estimator" className="btn btn-secondary btn-sm">
                <span>Konsultasi Scope</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Minimalist Profile Card */}
          <div className="hero-visual-wrap">
            <div className="hero-spec-card surface-card">
              <div className="spec-card-header">
                <div className="spec-logo-box">
                  <img
                    src="/logo-transparent.png"
                    alt="LichtCraft"
                    className="spec-emblem-img"
                    width="36"
                    height="36"
                  />
                </div>
                <div>
                  <strong className="spec-brand-name">LichtCraft</strong>
                  <span className="spec-brand-sub">Software & Design Studio</span>
                </div>
              </div>

              <div className="spec-pill-list">
                <span className="tag tag-active">Website Development</span>
                <span className="tag tag-active">Web Application</span>
                <span className="tag tag-active">Mobile App</span>
              </div>

              <div className="spec-status-bar">
                <span className="status-live-dot" />
                <span className="status-live-text">Terbuka untuk Proyek Q4 / Q1</span>
              </div>

              <a href="https://wa.me/62895321217645" target="_blank" rel="noopener noreferrer" className="spec-direct-link">
                <span>Hubungi via WhatsApp</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* 3 Pillars Compact Micro-Strip */}
        <div className="hero-strip">
          <div className="hero-strip-item">
            <span className="strip-num">01</span>
            <div className="strip-text">
              <strong>Website</strong>
              <p>Editorial & Showcase</p>
            </div>
          </div>

          <div className="hero-strip-item">
            <span className="strip-num">02</span>
            <div className="strip-text">
              <strong>Web App</strong>
              <p>Dashboard & SaaS</p>
            </div>
          </div>

          <div className="hero-strip-item">
            <span className="strip-num">03</span>
            <div className="strip-text">
              <strong>Mobile App</strong>
              <p>iOS & Android</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: clamp(4.5rem, 7vw, 7rem);
          padding-bottom: clamp(2rem, 3.5vw, 3.5rem);
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .hero-section {
            padding-top: 4rem;
            padding-bottom: 1.5rem;
          }
        }

        .hero-wallpaper-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .hero-wallpaper-img {
          position: absolute;
          inset: 0;
          background-image: url('/hero-bg.jpg');
          background-position: center 25%;
          background-size: cover;
          background-repeat: no-repeat;
          opacity: 0.40;
          filter: contrast(110%) brightness(85%);
          transform: scale(1.02);
        }

        .hero-wallpaper-overlay {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 65% 30%, transparent 20%, #080808 85%),
            linear-gradient(180deg, rgba(8, 8, 8, 0.4) 0%, rgba(8, 8, 8, 0.8) 65%, #080808 100%);
        }

        .hero-container {
          position: relative;
          z-index: 1;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          align-items: center;
        }

        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.875rem;
        }

        .hero-title {
          margin-bottom: 0.875rem;
        }

        .text-highlight {
          color: var(--color-white);
          text-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
        }

        .hero-sub {
          max-width: 520px;
          margin-bottom: 1.5rem;
          color: var(--color-gray-300);
          font-size: clamp(0.9375rem, 1.1vw, 1.125rem);
          line-height: 1.55;
        }

        @media (max-width: 640px) {
          .hero-sub {
            font-size: 0.8125rem;
            margin-bottom: 1.25rem;
            line-height: 1.4;
          }
        }

        .hero-actions {
          display: flex;
          gap: 0.625rem;
          align-items: center;
        }

        @media (max-width: 640px) {
          .hero-actions {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            width: 100%;
          }
          .hero-actions .btn {
            flex: 1;
            padding: 0.55rem 0.75rem;
            font-size: 0.75rem;
            justify-content: center;
          }
        }

        .hero-visual-wrap {
          position: relative;
          width: 100%;
        }

        .hero-spec-card {
          padding: 1.35rem;
          background-color: rgba(17, 17, 17, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-card);
        }

        @media (max-width: 640px) {
          .hero-spec-card {
            padding: 0.875rem 0.75rem;
          }
        }

        .spec-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 0.875rem;
          border-bottom: 1px solid var(--color-border-subtle);
          margin-bottom: 0.875rem;
        }

        .spec-logo-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .spec-logo-box {
            width: 32px;
            height: 32px;
          }
          .spec-emblem-img {
            width: 22px;
            height: 22px;
          }
        }

        .spec-brand-name {
          display: block;
          font-family: var(--font-display);
          font-size: 0.9375rem;
          color: var(--color-white);
        }

        .spec-brand-sub {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-400);
        }

        .spec-pill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 0.875rem;
        }

        .spec-pill-list .tag {
          font-size: 0.6875rem;
          padding: 0.25rem 0.5rem;
        }

        @media (max-width: 640px) {
          .spec-pill-list .tag {
            font-size: 0.5625rem;
            padding: 2px 4px;
          }
        }

        .spec-status-bar {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.625rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-xs);
          margin-bottom: 0.875rem;
        }

        .status-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
        }

        .status-live-text {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-300);
        }

        @media (max-width: 640px) {
          .status-live-text {
            font-size: 0.625rem;
          }
        }

        .spec-direct-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-white);
          padding-top: 0.5rem;
          border-top: 1px solid var(--color-border-subtle);
          transition: opacity var(--duration-fast);
        }

        .spec-direct-link:hover {
          opacity: 0.8;
        }

        /* 3 Columns Side-by-side Micro-Strip */
        .hero-strip {
          margin-top: clamp(2rem, 3.5vw, 3rem);
          padding-top: 1.25rem;
          border-top: 1px solid var(--color-border);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 640px) {
          .hero-strip {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
            margin-top: 1.25rem;
            padding-top: 0.875rem;
          }
        }

        .hero-strip-item {
          display: flex;
          gap: 0.625rem;
          align-items: flex-start;
        }

        @media (max-width: 640px) {
          .hero-strip-item {
            gap: 0.25rem;
            flex-direction: column;
          }
        }

        .strip-num {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-500);
        }

        .strip-text strong {
          display: block;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-white);
          margin-bottom: 0.1rem;
        }

        @media (max-width: 640px) {
          .strip-text strong {
            font-size: 0.6875rem;
          }
        }

        .strip-text p {
          font-size: 0.75rem;
          color: var(--color-gray-400);
        }

        @media (max-width: 640px) {
          .strip-text p {
            font-size: 0.5625rem;
          }
        }
      `}</style>
    </section>
  );
}
