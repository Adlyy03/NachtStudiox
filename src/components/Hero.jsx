import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import HeroScene3D from './HeroScene3D';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-meta', {
        opacity: 0,
        y: 16,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          '.hero-title',
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          '-=0.5'
        )
        .from(
          '.hero-sub',
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.hero-actions',
          {
            opacity: 0,
            y: 16,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          '.hero-visual-wrap',
          {
            opacity: 0,
            scale: 0.94,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=0.9'
        )
        .from(
          '.hero-strip-item',
          {
            opacity: 0,
            y: 15,
            stagger: 0.1,
            duration: 0.6,
          },
          '-=0.6'
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="hero-section" id="hero" aria-label="Hero">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Editorial Content Column */}
          <div className="hero-content">
            <div className="hero-meta">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                DIGITAL PRODUCT STUDIO
              </span>
              <span className="hero-year-tag">JAKARTA / GLOBAL</span>
            </div>

            <h1 className="display-xl hero-title">
              Digital experiences, <br />
              <span className="text-highlight">crafted with intent.</span>
            </h1>

            <p className="body-large hero-sub">
              LichtCraft merancang dan mengembangkan website editorial, web application tangguh, dan mobile
              application presisi. Kami menyatukan ketelitian rekayasa piranti lunak dengan tipografi berkarakter
              untuk brand yang menolak mediokritas.
            </p>

            <div className="hero-actions">
              <a href="#work" className="btn btn-primary btn-lg">
                <span>Eksplorasi Proyek</span>
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a href="#estimator" className="btn btn-secondary btn-lg">
                <span>Konsultasi Kebutuhan</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Three.js Kinetic Visual Centerpiece */}
          <div className="hero-visual-wrap">
            <div className="hero-visual-card">
              <HeroScene3D />
              <div className="visual-caption">
                <span className="caption-tag">3D SPATIAL ARTIFACT</span>
                <span className="caption-sub">Direct GPU Shader / Interactive Kinetic Mesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Baseline Strip */}
        <div className="hero-strip">
          <div className="hero-strip-item">
            <span className="strip-num">01</span>
            <div className="strip-text">
              <strong>Arsitektur Bespoke</strong>
              <p>Zero template generik. Setiap baris kode ditulis untuk kebutuhan spesifik Anda.</p>
            </div>
          </div>

          <div className="hero-strip-item">
            <span className="strip-num">02</span>
            <div className="strip-text">
              <strong>Custom Quotation</strong>
              <p>Biaya dihitung transparan berdasarkan kompleksitas, scope, dan integrasi nyata.</p>
            </div>
          </div>

          <div className="hero-strip-item">
            <span className="strip-num">03</span>
            <div className="strip-text">
              <strong>Motion Terarah</strong>
              <p>Animasi GSAP presisi tanpa layout shift dan tetap nyaman dengan reduced motion.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: clamp(4.5rem, 8vw, 8rem);
          padding-bottom: clamp(2.5rem, 5vw, 5rem);
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .hero-section {
            padding-top: 4.5rem;
            padding-bottom: 2rem;
          }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: center;
        }

        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .hero-year-tag {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          color: var(--color-gray-500);
          border-left: 1px solid var(--color-border);
          padding-left: 0.75rem;
        }

        .hero-title {
          margin-bottom: 1.25rem;
        }

        .text-highlight {
          color: var(--color-white);
          text-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
        }

        .hero-sub {
          max-width: 580px;
          margin-bottom: 2rem;
          color: var(--color-gray-300);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.875rem;
        }

        @media (max-width: 640px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
        }

        .hero-visual-wrap {
          position: relative;
          width: 100%;
        }

        .hero-visual-card {
          position: relative;
          background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, rgba(10, 10, 10, 0.8) 80%);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          box-shadow: var(--shadow-card);
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .hero-visual-card {
            padding: 0.875rem;
            border-radius: var(--radius-md);
          }
        }

        .hero-visual-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.08), transparent 70%);
          pointer-events: none;
        }

        .visual-caption {
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
        }

        .caption-tag {
          color: var(--color-gray-300);
          letter-spacing: 0.06em;
        }

        .caption-sub {
          color: var(--color-gray-500);
        }

        @media (max-width: 640px) {
          .visual-caption {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.2rem;
          }
        }

        .hero-strip {
          margin-top: clamp(2.5rem, 5vw, 4.5rem);
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .hero-strip {
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 1.25rem;
          }
        }

        .hero-strip-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .strip-num {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-500);
          padding-top: 0.15rem;
        }

        .strip-text strong {
          display: block;
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-white);
          margin-bottom: 0.2rem;
        }

        .strip-text p {
          font-size: 0.8125rem;
          color: var(--color-gray-400);
          line-height: 1.45;
        }
      `}</style>
    </section>
  );
}
